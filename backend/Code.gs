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
var SITE_URL = 'https://www.adcc.ge';
var INSTAGRAM = '@adccgeorgia';
var MAIL_RESERVE = 15;          // daily emails kept free for thank-you messages while an announcement is sending
var VISITS = { tab: 'Visits', first: ['Date', 'Page', 'Source', 'Device', 'Language', 'Time zone', 'Visit', 'New visit'] };
var ANN = { tab: 'Announcements', first: ['Date', 'Announcement', 'Email', 'Language', 'Status'] };
var FORMS = {
  notify:  { tab: 'Notify me',     first: ['Date', 'Email', 'Name', 'Site language'] },
  join:    { tab: 'Join the team', first: ['Date', 'Application for', 'Full name', 'Email', 'Phone / WhatsApp', 'City'] },
  sponsor: { tab: 'Partners',      first: ['Date', 'Company name', 'Contact person', 'Email', 'Phone'] }
};

/* ------------------------------------------------------------------ web app */

function doGet(e) {
  var p = (e && e.parameter) || {};
  if (p.unsub) return unsubscribe_(String(p.unsub), String(p.s || ''));
  return out_({ ok: true, service: 'ADCC Georgia website API' });
}

function doPost(e) {
  var req;
  try { req = JSON.parse((e && e.postData && e.postData.contents) || '{}'); }
  catch (err) { return out_({ ok: false, error: 'Bad request' }); }
  try {
    switch (req.action) {
      case 'submit':   return out_(submit_(req));
      case 'visit':    return out_(visit_(req));
      case 'login':    return out_(login_(req));
      case 'stats':    return out_(withAdmin_(req, function () { return stats_(req); }));
      case 'announce': return out_(withAdmin_(req, function (who) { return announce_(req, who); }));
      case 'annStatus':return out_(withAdmin_(req, function () { return annStatus_(); }));
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
  if (email) { try { thankYou_(req.form, email, clean); } catch (err) { console.warn('thank-you email failed: ' + err); } }
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


/* ------------------------------------------------------------- emails */

function lang_(fields) { return /georgian|ქართ/i.test(String(fields['Site language'] || '')) ? 'ka' : 'en'; }
function esc_(t) { return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function plainCell_(v) { v = String(v || ''); return v.charAt(0) === "'" ? v.slice(1) : v; }

function mailHtml_(title, paragraphs, button, footer) {
  var ps = paragraphs.map(function (p) { return '<p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#222">' + esc_(p).replace(/\n/g, '<br>') + '</p>'; }).join('');
  var btn = button && button.url ? '<p style="margin:26px 0 8px"><a href="' + esc_(button.url) + '" style="background:#d4202f;color:#fff;text-decoration:none;font-weight:bold;padding:13px 26px;border-radius:6px;display:inline-block;font-family:Arial,sans-serif">' + esc_(button.text || button.url) + '</a></p>' : '';
  return '<div style="background:#f3f3f3;padding:24px 12px;font-family:Arial,Helvetica,sans-serif">' +
    '<div style="max-width:560px;margin:0 auto;background:#fff;border-radius:10px;overflow:hidden">' +
    '<div style="background:#0b0b0c;padding:18px 26px;border-bottom:4px solid #d4202f"><span style="color:#fff;font:bold 20px Arial,sans-serif;letter-spacing:3px">ADCC <span style="color:#d4202f">GEORGIA</span></span></div>' +
    '<div style="padding:28px 26px 12px">' + (title ? '<h1 style="margin:0 0 18px;font-size:22px;color:#111">' + esc_(title) + '</h1>' : '') + ps + btn + '</div>' +
    '<div style="padding:16px 26px 22px;color:#888;font-size:12px;line-height:1.6;border-top:1px solid #eee">' + footer + '</div></div></div>';
}

function send_(to, subject, html, text) {
  MailApp.sendEmail({ to: to, subject: subject, htmlBody: html, body: text, name: 'ADCC Georgia' });
}

var THANKS = {
  notify: {
    en: { s: 'You are on the list – ADCC Georgia', t: 'Thank you for signing up!', p: ['We will email you as soon as the date and registration for the next ADCC Georgia event are announced.', 'Until then, follow us on Instagram ' + INSTAGRAM + ' for news.'] },
    ka: { s: 'თქვენ სიაში ხართ – ADCC Georgia', t: 'გმადლობთ რეგისტრაციისთვის!', p: ['შემდეგი ADCC Georgia-ს ღონისძიების თარიღისა და რეგისტრაციის გამოცხადებისთანავე მოგწერთ ელფოსტაზე.', 'მანამდე სიახლეებისთვის გამოგვყევით Instagram-ზე ' + INSTAGRAM + '.'] }
  },
  join: {
    en: { s: 'We received your application – ADCC Georgia', t: 'Thank you for applying!', p: ['We have received your application to join the ADCC Georgia team{role}.', 'We read every application and will contact you by email or WhatsApp.'] },
    ka: { s: 'თქვენი განაცხადი მიღებულია – ADCC Georgia', t: 'გმადლობთ განაცხადისთვის!', p: ['ADCC Georgia-ს გუნდში გაწევრიანების თქვენი განაცხადი მიღებულია{role}.', 'ყველა განაცხადს ვკითხულობთ და დაგიკავშირდებით ელფოსტით ან WhatsApp-ით.'] }
  },
  sponsor: {
    en: { s: 'Thank you for your interest – ADCC Georgia', t: 'Thank you for reaching out!', p: ['We have received your partnership inquiry{company} and will get back to you soon.', 'If anything is urgent, simply reply to this email.'] },
    ka: { s: 'გმადლობთ დაინტერესებისთვის – ADCC Georgia', t: 'გმადლობთ, რომ დაგვიკავშირდით!', p: ['თქვენი თანამშრომლობის მოთხოვნა მიღებულია{company} და მალე დაგიკავშირდებით.', 'თუ საკითხი სასწრაფოა, უბრალოდ უპასუხეთ ამ წერილს.'] }
  }
};

function thankYou_(form, email, fields) {
  var T = THANKS[form]; if (!T) return;
  if (MailApp.getRemainingDailyQuota() < 2) return;
  var L = lang_(fields), m = T[L];
  var role = plainCell_(fields['Application for']), company = plainCell_(fields['Company name']);
  var ps = m.p.map(function (p) {
    return p.replace('{role}', role ? (L === 'ka' ? ' (' + role + ')' : ' as ' + role) : '').replace('{company}', company ? (L === 'ka' ? ' (' + company + ')' : ' for ' + company) : '');
  });
  var foot = (L === 'ka' ? 'ეს წერილი მიიღეთ, რადგან ფორმა შეავსეთ ' : 'You received this because you filled in a form on ') + '<a href="' + SITE_URL + '" style="color:#888">www.adcc.ge</a>.';
  send_(email, m.s, mailHtml_(m.t, ps, null, foot), m.t + '\n\n' + ps.join('\n\n') + '\n\nADCC Georgia – ' + SITE_URL);
}

/* ----------------------------------------------------------- announcements */

function annSig_(email) { return Utilities.base64EncodeWebSafe(Utilities.computeHmacSha256Signature('unsub|' + email, secret_())).slice(0, 22); }
function unsubUrl_(email) {
  var base = ScriptApp.getService().getUrl() || PropertiesService.getScriptProperties().getProperty('WEBAPP_URL') || '';
  return base + '?unsub=' + encodeURIComponent(email) + '&s=' + annSig_(email);
}

function subscribers_() {
  var sh = tab_(FORMS.notify), lr = sh.getLastRow(), lc = Math.max(sh.getLastColumn(), 1);
  if (lr < 2) return [];
  var vals = sh.getRange(1, 1, lr, lc).getValues(), head = vals.shift().map(String);
  var ei = head.indexOf('Email'), li = head.indexOf('Site language'), ui = head.indexOf('Unsubscribed'), seen = {}, out = [];
  vals.forEach(function (r) {
    var e = plainCell_(r[ei]).trim().toLowerCase();
    if (!e || seen[e] || (ui >= 0 && String(r[ui]).toLowerCase() === 'yes')) return;
    seen[e] = 1; out.push({ email: e, lang: /georgian|ქართ/i.test(String(r[li] || '')) ? 'ka' : 'en' });
  });
  return out;
}

function annMail_(a, L, email, test) {
  var subj = (L === 'ka' && a.subject.ka) ? a.subject.ka : a.subject.en;
  var body = (L === 'ka' && a.body.ka) ? a.body.ka : a.body.en;
  var btnText = (L === 'ka' && a.button.ka) ? a.button.ka : a.button.en;
  var paras = String(body).split(/\n\s*\n/).map(function (x) { return x.trim(); }).filter(String);
  var un = test ? '#' : unsubUrl_(email);
  var foot = (L === 'ka'
    ? 'ეს წერილი მიიღეთ, რადგან www.adcc.ge-ზე მოითხოვეთ შეტყობინება. <a href="' + un + '" style="color:#888">გამოწერის გაუქმება</a>'
    : 'You received this because you asked to be notified on www.adcc.ge. <a href="' + un + '" style="color:#888">Unsubscribe</a>');
  var html = mailHtml_('', paras, a.link ? { url: a.link, text: btnText || (L === 'ka' ? 'დეტალები' : 'Details') } : null, foot);
  var text = paras.join('\n\n') + (a.link ? '\n\n' + a.link : '') + '\n\n' + (test ? '' : (L === 'ka' ? 'გამოწერის გაუქმება: ' : 'Unsubscribe: ') + un);
  send_(email, (test ? '[TEST] ' : '') + subj, html, text);
}

function announce_(req, who) {
  var a = {
    subject: { en: String(req.subjectEn || '').trim().slice(0, 150), ka: String(req.subjectKa || '').trim().slice(0, 150) },
    body: { en: String(req.bodyEn || '').trim().slice(0, 8000), ka: String(req.bodyKa || '').trim().slice(0, 8000) },
    button: { en: String(req.buttonEn || '').trim().slice(0, 60), ka: String(req.buttonKa || '').trim().slice(0, 60) },
    link: String(req.link || '').trim()
  };
  if (!a.subject.en || !a.body.en) return { ok: false, error: 'Write at least the English subject and message.' };
  if (a.link && !/^https?:\/\/\S+$/i.test(a.link)) return { ok: false, error: 'The button link must start with https://' };
  var url = ScriptApp.getService().getUrl(); if (url) PropertiesService.getScriptProperties().setProperty('WEBAPP_URL', url);
  if (req.test) {
    if (MailApp.getRemainingDailyQuota() < 2) return { ok: false, error: 'The daily email limit is used up. Try again tomorrow.' };
    annMail_(a, 'en', who, true);
    if (a.subject.ka && a.body.ka) annMail_(a, 'ka', who, true);
    return { ok: true, test: true, to: who };
  }
  var props = PropertiesService.getScriptProperties(), job = JSON.parse(props.getProperty('ANN_JOB') || 'null');
  if (job && !job.done) return { ok: false, error: 'The previous announcement is still being sent (' + job.sent + ' of ' + job.total + '). Wait until it finishes.' };
  var list = subscribers_();
  if (!list.length) return { ok: false, error: 'Nobody is on the Notify me list yet.' };
  var lock = LockService.getScriptLock(); lock.waitLock(20000);
  try {
    var id = Utilities.formatDate(new Date(), 'Asia/Tbilisi', 'yyyyMMdd-HHmm'), now = new Date(), sh = tab_(ANN);
    sh.getRange(sh.getLastRow() + 1, 1, list.length, 5).setValues(list.map(function (x) { return [now, id, x.email, x.lang, 'waiting']; }));
    job = { id: id, a: a, total: list.length, sent: 0, failed: 0, by: who, started: now.toISOString(), done: false };
    props.setProperty('ANN_JOB', JSON.stringify(job));
  } finally { lock.releaseLock(); }
  sendAnnouncementQueue();
  job = JSON.parse(props.getProperty('ANN_JOB'));
  if (!job.done) ensureTrigger_();
  return { ok: true, job: jobInfo_(job) };
}

// runs right after "Send" and then every hour (trigger) until everyone has received the announcement
function sendAnnouncementQueue() {
  var props = PropertiesService.getScriptProperties(), job = JSON.parse(props.getProperty('ANN_JOB') || 'null');
  if (!job || job.done) { removeTrigger_(); return; }
  var lock = LockService.getScriptLock(); if (!lock.tryLock(10000)) return;
  try {
    var sh = tab_(ANN), lr = sh.getLastRow();
    if (lr < 2) { job.done = true; props.setProperty('ANN_JOB', JSON.stringify(job)); return; }
    var vals = sh.getRange(2, 1, lr - 1, 5).getValues(), t0 = Date.now();
    for (var i = 0; i < vals.length; i++) {
      if (vals[i][1] !== job.id || vals[i][4] !== 'waiting') continue;
      if (MailApp.getRemainingDailyQuota() <= MAIL_RESERVE || Date.now() - t0 > 240000) break;
      var status;
      try { annMail_(job.a, vals[i][3], vals[i][2], false); status = 'sent'; job.sent++; }
      catch (err) { status = 'failed: ' + String(err.message || err).slice(0, 80); job.failed++; }
      sh.getRange(i + 2, 5).setValue(status);
    }
    if (job.sent + job.failed >= job.total) { job.done = true; job.finished = new Date().toISOString(); }
    props.setProperty('ANN_JOB', JSON.stringify(job));
  } finally { lock.releaseLock(); }
  if (job.done) removeTrigger_();
}

function ensureTrigger_() {
  var has = ScriptApp.getProjectTriggers().some(function (t) { return t.getHandlerFunction() === 'sendAnnouncementQueue'; });
  if (!has) ScriptApp.newTrigger('sendAnnouncementQueue').timeBased().everyHours(1).create();
}
function removeTrigger_() {
  ScriptApp.getProjectTriggers().forEach(function (t) { if (t.getHandlerFunction() === 'sendAnnouncementQueue') ScriptApp.deleteTrigger(t); });
}

function jobInfo_(job) {
  if (!job) return null;
  return { id: job.id, subject: job.a.subject.en, total: job.total, sent: job.sent, failed: job.failed, done: job.done, started: job.started, finished: job.finished || null, by: job.by };
}

function annStatus_() {
  var job = JSON.parse(PropertiesService.getScriptProperties().getProperty('ANN_JOB') || 'null');
  return { ok: true, job: jobInfo_(job), subscribers: subscribers_().length, quota: MailApp.getRemainingDailyQuota(), reserve: MAIL_RESERVE };
}

function unsubscribe_(email, sig) {
  email = email.trim().toLowerCase();
  var good = email && same_(sig, annSig_(email)), done = false;
  if (good) {
    var lock = LockService.getScriptLock(); lock.waitLock(20000);
    try {
      var sh = tab_(FORMS.notify), lc = Math.max(sh.getLastColumn(), 1), head = sh.getRange(1, 1, 1, lc).getValues()[0].map(String);
      var ui = head.indexOf('Unsubscribed');
      if (ui < 0) { head.push('Unsubscribed'); ui = head.length - 1; sh.getRange(1, ui + 1).setValue('Unsubscribed').setFontWeight('bold'); }
      var ei = head.indexOf('Email'), lr = sh.getLastRow();
      if (lr > 1) sh.getRange(2, ei + 1, lr - 1, 1).getValues().forEach(function (r, i) {
        if (plainCell_(r[0]).trim().toLowerCase() === email) { sh.getRange(i + 2, ui + 1).setValue('yes'); done = true; }
      });
    } finally { lock.releaseLock(); }
  }
  var msg = good
    ? '<h1>You are unsubscribed</h1><p>' + esc_(email) + ' will no longer receive ADCC Georgia announcements.</p><p>' + esc_(email) + ' აღარ მიიღებს ADCC Georgia-ს შეტყობინებებს.</p>'
    : '<h1>This link is not valid</h1><p>Please write to us and we will remove you from the list.</p>';
  return HtmlService.createHtmlOutput('<div style="font-family:Arial,sans-serif;max-width:520px;margin:60px auto;padding:0 20px;color:#222">' + msg + '<p><a href="' + SITE_URL + '">www.adcc.ge</a></p></div>').setTitle('ADCC Georgia');
}

/* ------------------------------------------------------------ visitor stats */

function clip_(v, n) { return safeCell_(String(v === null || v === undefined ? '' : v).replace(/[\r\n\t]/g, ' ').slice(0, n)); }

function visit_(req) {
  var path = String(req.path || '/').slice(0, 120);
  if (!/^\/[\w\/.\-]*$/.test(path)) path = '/';
  var cache = CacheService.getScriptCache(), sid = String(req.sid || '').replace(/[^\w]/g, '').slice(0, 24);
  if (sid) { var ck = 'v:' + sid, n = Number(cache.get(ck) || 0); if (n > 60) return { ok: true }; cache.put(ck, String(n + 1), 3600); }
  tab_(VISITS).appendRow([new Date(), path, clip_(req.source, 60), clip_(req.device, 20), clip_(req.lang, 10), clip_(req.zone, 40), sid, req.first ? 'yes' : '']);
  return { ok: true };
}

var ZONES = { 'Asia/Tbilisi': 'Georgia', 'Asia/Yerevan': 'Armenia', 'Asia/Baku': 'Azerbaijan', 'Europe/Istanbul': 'Türkiye', 'Europe/Moscow': 'Russia', 'Europe/Kiev': 'Ukraine', 'Europe/Kyiv': 'Ukraine', 'Asia/Dubai': 'UAE', 'Asia/Almaty': 'Kazakhstan', 'Asia/Tashkent': 'Uzbekistan', 'Europe/London': 'UK', 'Europe/Berlin': 'Germany', 'Europe/Warsaw': 'Poland', 'Asia/Jerusalem': 'Israel', 'Asia/Riyadh': 'Saudi Arabia' };

function stats_(req) {
  var days = Math.min(Math.max(Number(req.days) || 30, 7), 365);
  var sh = tab_(VISITS), lr = sh.getLastRow(), tz = 'Asia/Tbilisi';
  var now = new Date(), fmt = function (d) { return Utilities.formatDate(d, tz, 'yyyy-MM-dd'); };
  var series = {}, labels = [];
  for (var i = days - 1; i >= 0; i--) { var k = fmt(new Date(now.getTime() - i * 864e5)); labels.push(k); series[k] = { views: 0, visits: {} }; }
  var today = fmt(now), d7 = fmt(new Date(now.getTime() - 6 * 864e5));
  var tot = { today: 0, week: 0, period: 0 }, vis = { today: {}, week: {}, period: {} };
  var pages = {}, sources = {}, devices = {}, langs = {}, countries = {}, seen = {};
  if (lr > 1) {
    sh.getRange(2, 1, lr - 1, 8).getValues().forEach(function (r) {
      if (!(r[0] instanceof Date)) return;
      var k = fmt(r[0]); if (!series[k]) return;
      var sid = String(r[6] || ('row' + Math.random()));
      series[k].views++; series[k].visits[sid] = 1;
      tot.period++; vis.period[sid] = 1;
      if (k >= d7) { tot.week++; vis.week[sid] = 1; }
      if (k === today) { tot.today++; vis.today[sid] = 1; }
      var pg = plainCell_(r[1]) || '/'; pages[pg] = (pages[pg] || 0) + 1;
      if (!seen[sid]) {   // per visit: where they came from, device, language, country
        seen[sid] = 1;
        var src = plainCell_(r[2]) || 'Direct', dev = plainCell_(r[3]) || 'Unknown', lg = plainCell_(r[4]) || '?', zn = plainCell_(r[5]);
        sources[src] = (sources[src] || 0) + 1; devices[dev] = (devices[dev] || 0) + 1;
        langs[lg] = (langs[lg] || 0) + 1;
        var c = ZONES[zn] || (zn ? zn.split('/').pop().replace(/_/g, ' ') : 'Unknown'); countries[c] = (countries[c] || 0) + 1;
      }
    });
  }
  var top = function (o, n) { return Object.keys(o).map(function (k) { return [k, o[k]]; }).sort(function (a, b) { return b[1] - a[1]; }).slice(0, n || 10); };
  var n = function (o) { return Object.keys(o).length; };
  return { ok: true, days: days,
    totals: { viewsToday: tot.today, viewsWeek: tot.week, viewsPeriod: tot.period, visitsToday: n(vis.today), visitsWeek: n(vis.week), visitsPeriod: n(vis.period) },
    daily: labels.map(function (k) { return [k, series[k].views, n(series[k].visits)]; }),
    pages: top(pages, 12), sources: top(sources, 10), devices: top(devices, 5), languages: top(langs, 5), countries: top(countries, 10) };
}
