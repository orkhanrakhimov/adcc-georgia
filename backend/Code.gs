/**
 * ADCC Georgia – website backend (Google Apps Script)
 *
 * Lives inside the "ADCC Georgia – Website data" Google Sheet (Extensions → Apps Script).
 * It does three jobs:
 *   1. Saves form submissions from the website into tabs of this Sheet
 *      (Notify me, Join the team, Partners).
 *   2. Lets admins log in to www.adcc.ge/admin with email + password.
 *   3. Saves admin changes to the website (GitHub) on the admins' behalf,
 *      so nobody has to handle a GitHub token in the browser.
 *
 * Setup and admin management: use the "ADCC Admin" menu in the Sheet.
 * Nothing secret is stored in this code: passwords (hashed) and the GitHub token
 * are kept in Script Properties.
 */

var REPO = 'orkhanrakhimov/adcc-georgia';
var BRANCH = 'main';
var SESSION_DAYS = 7;
var FORMS = {
  notify:  { tab: 'Notify me',     first: ['Date', 'Email', 'Name', 'Site language'] },
  join:    { tab: 'Join the team', first: ['Date', 'Application for', 'Full name', 'Email', 'Phone / WhatsApp', 'City'] },
  sponsor: { tab: 'Partners',      first: ['Date', 'Company name', 'Contact person', 'Email', 'Phone'] }
};

/* ------------------------------------------------------------------ web app */

function doGet() {
  return out_({ ok: true, service: 'ADCC Georgia website API' });
}

function doPost(e) {
  var req;
  try { req = JSON.parse((e && e.postData && e.postData.contents) || '{}'); }
  catch (err) { return out_({ ok: false, error: 'Bad request' }); }
  try {
    switch (req.action) {
      case 'submit':   return out_(submit_(req));
      case 'login':    return out_(login_(req));
      case 'me':       return out_(withAdmin_(req, function (who) { return { ok: true, email: who, sheetUrl: sheetUrl_() }; }));
      case 'list':     return out_(withAdmin_(req, function () { return list_(req); }));
      case 'commit':   return out_(withAdmin_(req, function (who) { return commit_(req, who); }));
      case 'password': return out_(withAdmin_(req, function (who) { return changePassword_(who, req); }));
      default:         return out_({ ok: false, error: 'Unknown action' });
    }
  } catch (err) {
    return out_({ ok: false, error: String((err && err.message) || err) });
  }
}

function out_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

/* ------------------------------------------------------- form submissions */

function submit_(req) {
  var form = FORMS[req.form];
  if (!form) return { ok: false, error: 'Unknown form' };
  var f = req.fields || {};
  if (typeof f !== 'object' || Array.isArray(f)) return { ok: false, error: 'Bad fields' };
  var keys = Object.keys(f).slice(0, 40);
  var clean = {};
  keys.forEach(function (k) {
    var name = String(k).slice(0, 80).trim();
    if (!name || name === 'Date') return;
    clean[name] = safeCell_(String(f[k] === null || f[k] === undefined ? '' : f[k]).slice(0, 3000));
  });
  var email = String(clean['Email'] || '').replace(/^'/, '').trim().toLowerCase();
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: 'Bad email' };

  // light flood protection: max 5 submissions per form per email per 10 minutes
  var cache = CacheService.getScriptCache();
  if (email) {
    var ck = 'sub:' + req.form + ':' + email, n = Number(cache.get(ck) || 0);
    if (n >= 5) return { ok: false, error: 'Too many submissions, try again later' };
    cache.put(ck, String(n + 1), 600);
  }

  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var sh = tab_(form);
    var head = sh.getRange(1, 1, 1, Math.max(sh.getLastColumn(), 1)).getValues()[0].map(String);
    Object.keys(clean).forEach(function (k) {
      if (head.indexOf(k) < 0) { head.push(k); sh.getRange(1, head.length).setValue(k).setFontWeight('bold'); }
    });
    if (req.form === 'notify' && email) {   // the notify list keeps each email only once
      var ei = head.indexOf('Email'), last = sh.getLastRow();
      if (ei >= 0 && last > 1) {
        var have = sh.getRange(2, ei + 1, last - 1, 1).getValues().some(function (r) { return String(r[0]).trim().toLowerCase() === email; });
        if (have) return { ok: true, duplicate: true };
      }
    }
    var row = head.map(function (h) { return h === 'Date' ? new Date() : (clean[h] !== undefined ? clean[h] : ''); });
    sh.appendRow(row);
  } finally { lock.releaseLock(); }
  return { ok: true };
}

function safeCell_(s) {
  s = s.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '');
  return /^[=+\-@\t\r]/.test(s) ? "'" + s : s;   // never let a submission become a formula
}

function tab_(form) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(form.tab);
  if (!sh) {
    sh = ss.insertSheet(form.tab);
    sh.getRange(1, 1, 1, form.first.length).setValues([form.first]).setFontWeight('bold');
    sh.setFrozenRows(1);
    sh.getRange('A:A').setNumberFormat('yyyy-mm-dd hh:mm');
  }
  return sh;
}

function sheetUrl_() { return SpreadsheetApp.getActiveSpreadsheet().getUrl(); }

/* ------------------------------------------------------------- admin data */

function list_(req) {
  var form = FORMS[req.form];
  if (!form) return { ok: false, error: 'Unknown form' };
  var sh = tab_(form), lr = sh.getLastRow(), lc = Math.max(sh.getLastColumn(), 1);
  var vals = sh.getRange(1, 1, Math.max(lr, 1), lc).getValues();
  var head = vals.shift().map(String);
  var rows = vals.filter(function (r) { return r.join('') !== ''; }).map(function (r) {
    return r.map(function (v) {
      if (v instanceof Date) return v.toISOString();
      v = String(v); return v.charAt(0) === "'" ? v.slice(1) : v;
    });
  });
  return { ok: true, headers: head, rows: rows, sheetUrl: sheetUrl_() };
}

/* -------------------------------------------------- save website (GitHub) */

function commit_(req, who) {
  var path = String(req.path || '');
  if (!(path === 'data.json' || /^photos\/[\w.\-]{1,80}\.(jpg|jpeg|png|webp)$/i.test(path))) return { ok: false, error: 'This file cannot be changed from the admin panel' };
  var content = String(req.content || '');
  if (!content || content.length > 14000000 || !/^[A-Za-z0-9+\/=]+$/.test(content)) return { ok: false, error: 'Bad file content' };
  var token = PropertiesService.getScriptProperties().getProperty('GITHUB_TOKEN');
  if (!token) return { ok: false, error: 'The website connection is not set up yet. In the Sheet use ADCC Admin → Connect the website (GitHub token).' };
  var base = 'https://api.github.com/repos/' + REPO + '/contents/' + path.split('/').map(encodeURIComponent).join('/');
  var hdr = { Authorization: 'Bearer ' + token, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' };
  var cur = UrlFetchApp.fetch(base + '?ref=' + BRANCH, { headers: hdr, muteHttpExceptions: true });
  var sha = null;
  if (cur.getResponseCode() === 200) sha = JSON.parse(cur.getContentText()).sha;
  else if (cur.getResponseCode() !== 404) return { ok: false, error: ghError_(cur) };
  var body = { message: String(req.message || 'Update from admin panel').slice(0, 120) + ' (by ' + who + ')', content: content, branch: BRANCH };
  if (sha) body.sha = sha;
  var put = UrlFetchApp.fetch(base, { method: 'put', contentType: 'application/json', headers: hdr, payload: JSON.stringify(body), muteHttpExceptions: true });
  if (put.getResponseCode() !== 200 && put.getResponseCode() !== 201) return { ok: false, error: ghError_(put) };
  return { ok: true };
}

function ghError_(r) {
  var c = r.getResponseCode(), m = '';
  try { m = JSON.parse(r.getContentText()).message || ''; } catch (e) {}
  if (c === 401) return 'GitHub rejected the saved token (expired?). Use ADCC Admin → Connect the website again with a new token.';
  if (c === 403) return 'The saved GitHub token is not allowed to change the website. It needs Contents: Read and write. (' + m + ')';
  if (c === 409) return 'Someone else saved at the same moment. Reload the admin page and try again.';
  return 'GitHub error ' + c + ': ' + m;
}

/* ------------------------------------------------------------------- login */

function login_(req) {
  var email = String(req.email || '').trim().toLowerCase(), pw = String(req.password || '');
  var cache = CacheService.getScriptCache(), fk = 'fail:' + email;
  var fails = Number(cache.get(fk) || 0);
  if (fails >= 5) return { ok: false, error: 'Too many wrong attempts. Wait 15 minutes and try again.' };
  var admins = admins_(), a = admins[email];
  if (!pwOk_(a, pw)) {
    cache.put(fk, String(fails + 1), 900);
    Utilities.sleep(600);
    return { ok: false, error: 'Wrong email or password.' };
  }
  cache.remove(fk);
  var exp = Date.now() + SESSION_DAYS * 864e5;
  return { ok: true, token: sign_(email + '|' + exp + '|' + (a.v || 1)), email: email, sheetUrl: sheetUrl_() };
}

function withAdmin_(req, fn) {
  var who = verify_(String(req.token || ''));
  if (!who) return { ok: false, error: 'Your session has ended. Please log in again.', auth: false };
  return fn(who);
}

function sign_(payload) {
  var p = Utilities.base64EncodeWebSafe(payload, Utilities.Charset.UTF_8);
  var s = Utilities.base64EncodeWebSafe(Utilities.computeHmacSha256Signature(p, secret_()));
  return p + '.' + s;
}

function verify_(tok) {
  var i = tok.indexOf('.');
  if (i < 1) return null;
  var p = tok.slice(0, i), s = tok.slice(i + 1);
  var good = Utilities.base64EncodeWebSafe(Utilities.computeHmacSha256Signature(p, secret_()));
  if (!same_(s, good)) return null;
  var parts = Utilities.newBlob(Utilities.base64DecodeWebSafe(p)).getDataAsString().split('|');
  var email = parts[0], exp = Number(parts[1]), v = String(parts[2] || '1');
  var a = admins_()[email];
  if (!a || !(exp > Date.now()) || String(a.v || 1) !== v) return null;   // removed admin, expired, or password changed
  return email;
}

function same_(a, b) {
  if (a.length !== b.length) return false;
  var d = 0;
  for (var i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}

function hash_(pw, salt) {
  var h = salt + '|' + pw;
  for (var i = 0; i < 2000; i++) {
    h = Utilities.base64Encode(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, h + '|' + salt, Utilities.Charset.UTF_8));
  }
  return h;
}

function secret_() {
  var props = PropertiesService.getScriptProperties(), s = props.getProperty('SESSION_SECRET');
  if (!s) { s = Utilities.getUuid() + Utilities.getUuid(); props.setProperty('SESSION_SECRET', s); }
  return s;
}

// Admins come from two places:
//  - Script Properties ADMIN_EMAIL + ADMIN_PASSWORD (and ADMIN_EMAIL_2 + ADMIN_PASSWORD_2, _3 …), typed in by hand
//  - the "Add or reset an admin" menu, which stores passwords scrambled (these win if both exist)
function admins_() {
  var props = PropertiesService.getScriptProperties(), all = props.getProperties(), out = {};
  Object.keys(all).forEach(function (k) {
    var m = /^ADMIN_EMAIL(_\w+)?$/.exec(k); if (!m) return;
    var email = String(all[k]).trim().toLowerCase(), pw = all['ADMIN_PASSWORD' + (m[1] || '')];
    if (email && pw) out[email] = { plain: String(pw), v: 'p' + Utilities.base64Encode(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, String(pw), Utilities.Charset.UTF_8)).slice(0, 10) };
  });
  try { var h = JSON.parse(props.getProperty('ADMINS') || '{}'); Object.keys(h).forEach(function (e) { out[e] = h[e]; }); } catch (e) {}
  return out;
}
function pwOk_(a, pw) {
  if (!a) return false;
  if (a.plain !== undefined) return same_(String(pw), a.plain);
  return hash_(pw, a.salt) === a.hash;
}

function setAdmin_(email, pw) {
  var props = PropertiesService.getScriptProperties(), hashed = {};
  try { hashed = JSON.parse(props.getProperty('ADMINS') || '{}'); } catch (e) {}
  var old = hashed[email], salt = Utilities.getUuid();
  hashed[email] = { salt: salt, hash: hash_(pw, salt), v: old ? (Number(old.v) || 1) + 1 : 1 };
  props.setProperty('ADMINS', JSON.stringify(hashed));
}

function changePassword_(who, req) {
  var a = admins_()[who], cur = String(req.current || ''), nw = String(req.next || '');
  if (!pwOk_(a, cur)) return { ok: false, error: 'Your current password is wrong.' };
  var why = weak_(nw); if (why) return { ok: false, error: why };
  setAdmin_(who, nw);
  return { ok: true, token: sign_(who + '|' + (Date.now() + SESSION_DAYS * 864e5) + '|' + admins_()[who].v) };
}

function weak_(pw) {
  if (pw.length < 10) return 'Use at least 10 characters.';
  if (!/[A-Za-z]/.test(pw) || !/[0-9]/.test(pw)) return 'Use both letters and numbers.';
  return '';
}

/* --------------------------------------------------- Sheet menu (setup) */

function onOpen() {
  SpreadsheetApp.getUi().createMenu('ADCC Admin')
    .addItem('1. Set up the tabs', 'menuSetup')
    .addItem('2. Add or reset an admin', 'menuAddAdmin')
    .addItem('3. Connect the website (GitHub token)', 'menuToken')
    .addSeparator()
    .addItem('List admins', 'menuListAdmins')
    .addItem('Remove an admin', 'menuRemoveAdmin')
    .addItem('Log everyone out', 'menuLogoutAll')
    .addToUi();
}

function menuSetup() {
  Object.keys(FORMS).forEach(function (k) { tab_(FORMS[k]); });
  secret_();
  var ss = SpreadsheetApp.getActiveSpreadsheet(), keep = Object.keys(FORMS).map(function (k) { return FORMS[k].tab; });
  ss.getSheets().forEach(function (sh) {   // remove the empty starter tab
    if (keep.indexOf(sh.getName()) < 0 && sh.getLastRow() <= 1 && ss.getSheets().length > 1) ss.deleteSheet(sh);
  });
  SpreadsheetApp.getUi().alert('Done. The tabs Notify me, Join the team and Partners are ready.');
}

function menuAddAdmin() {
  var ui = SpreadsheetApp.getUi();
  var r1 = ui.prompt('Add or reset an admin', 'Email address of the admin:', ui.ButtonSet.OK_CANCEL);
  if (r1.getSelectedButton() !== ui.Button.OK) return;
  var email = r1.getResponseText().trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { ui.alert('That email address does not look right.'); return; }
  var r2 = ui.prompt('Password for ' + email, 'At least 10 characters, letters and numbers. Note it down: it is stored only as a scrambled code and cannot be shown again.', ui.ButtonSet.OK_CANCEL);
  if (r2.getSelectedButton() !== ui.Button.OK) return;
  var pw = r2.getResponseText(), why = weak_(pw);
  if (why) { ui.alert(why + ' Nothing was changed.'); return; }
  setAdmin_(email, pw);
  ui.alert(email + ' can now log in at www.adcc.ge/admin');
}

function menuToken() {
  var ui = SpreadsheetApp.getUi();
  var r = ui.prompt('Connect the website', 'Paste a GitHub fine-grained token for ' + REPO + ' with "Contents: Read and write":', ui.ButtonSet.OK_CANCEL);
  if (r.getSelectedButton() !== ui.Button.OK) return;
  var t = r.getResponseText().trim();
  var test = UrlFetchApp.fetch('https://api.github.com/repos/' + REPO, { headers: { Authorization: 'Bearer ' + t, Accept: 'application/vnd.github+json' }, muteHttpExceptions: true });
  if (test.getResponseCode() !== 200) { ui.alert('GitHub did not accept this token (' + test.getResponseCode() + '). Nothing was saved.'); return; }
  var perm = JSON.parse(test.getContentText()).permissions || {};
  if (perm.push === false) { ui.alert('This token can only read. Give it Contents: Read and write. Nothing was saved.'); return; }
  PropertiesService.getScriptProperties().setProperty('GITHUB_TOKEN', t);
  ui.alert('Connected. Admins can now save the website from www.adcc.ge/admin.');
}

function menuListAdmins() {
  var list = Object.keys(admins_());
  SpreadsheetApp.getUi().alert(list.length ? 'Admins:\n' + list.join('\n') : 'No admins yet. Use “Add or reset an admin”.');
}

function menuRemoveAdmin() {
  var ui = SpreadsheetApp.getUi();
  var r = ui.prompt('Remove an admin', 'Email address to remove:', ui.ButtonSet.OK_CANCEL);
  if (r.getSelectedButton() !== ui.Button.OK) return;
  var email = r.getResponseText().trim().toLowerCase(), props = PropertiesService.getScriptProperties(), admins = {};
  try { admins = JSON.parse(props.getProperty('ADMINS') || '{}'); } catch (e) {}
  if (!admins[email]) { ui.alert('No admin with that email in the menu list. If you added them in Script Properties, delete their ADMIN_EMAIL / ADMIN_PASSWORD there.'); return; }
  delete admins[email];
  props.setProperty('ADMINS', JSON.stringify(admins));
  ui.alert(email + ' was removed and logged out.');
}

function menuLogoutAll() {
  PropertiesService.getScriptProperties().setProperty('SESSION_SECRET', Utilities.getUuid() + Utilities.getUuid());
  SpreadsheetApp.getUi().alert('Everyone has been logged out of the admin panel.');
}
