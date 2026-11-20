# ADCC Georgia – admin backend (Google Sheet + Apps Script)

`Code.gs` runs inside the Google Sheet **“ADCC Georgia – Website data”**. It

* stores every website form (Notify me, Join the team, Partners) as a row in the Sheet,
* checks admin logins for www.adcc.ge/admin (email + password, passwords stored hashed),
* saves admin changes to this GitHub repository, so admins never handle a GitHub token,
* counts website visits (tab *Visits*, no cookies) for the Visitor statistics page,
* sends an automatic thank-you email to everyone who fills in a form,
* sends announcements to the Notify me list from the admin panel (tab *Announcements*, about 100 emails a day on a free Gmail account; the rest go out automatically every hour), with an unsubscribe link.

## One-time setup (about 10 minutes)

1. Open the Sheet → **Extensions → Apps Script**. Delete what is there, paste all of `Code.gs`, press **Save**.
2. **Deploy → New deployment** → gear icon → **Web app**.
   * Execute as: **Me**
   * Who has access: **Anyone**
   * Press **Deploy**, allow access (Google shows “unverified app” for your own scripts: **Advanced → Go to … (unsafe)** is expected), and copy the **Web app URL** (ends in `/exec`).
3. Admin logins – either way works:
   * **Script Properties** (Apps Script → Project Settings → Script Properties): add `ADMIN_EMAIL` and `ADMIN_PASSWORD`.
     More admins: `ADMIN_EMAIL_2` + `ADMIN_PASSWORD_2`, `_3`, … Changing a password there logs that admin out everywhere.
   * or the **ADCC Admin** menu in the Sheet (stores the password scrambled):
   1. **Set up the tabs**
   2. **Add or reset an admin** – your email and a password (10+ characters, letters and numbers)
   3. **Connect the website (GitHub token)** – a fine-grained token for this repository with *Contents: Read and write*
4. Open www.adcc.ge/admin → **Connection settings** → paste the Web app URL → log in.
   The first login connects the website forms to the Sheet automatically.

## Later

* Add / remove admins, reset a password, log everyone out: **ADCC Admin** menu in the Sheet.
* After editing `Code.gs`: **Deploy → Manage deployments → edit → Version: New version** (keeps the same URL).
* Email alerts for each form still come from Web3Forms, as before.
