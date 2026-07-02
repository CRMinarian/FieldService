const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const { initializeApp } = require('firebase-admin/app');
const { GoogleAuth } = require('google-auth-library');
const { google } = require('googleapis');

initializeApp();

// The field-service-nerd project's Compute Engine default service account.
// TODO: replace <PROJECT_NUMBER> with the new project's number (Firebase console →
// Project settings). This SA's client ID must be added to the SAME nukasoft.ai Admin
// domain-wide-delegation entry (scopes: gmail.send, spreadsheets, drive.file).
const SA_EMAIL = '<PROJECT_NUMBER>-compute@developer.gserviceaccount.com';
// Reuse the proven skippy sender — no new Workspace mailbox needed.
const FROM_EMAIL = 'skippy@nukasoft.ai';

// Subscriber capture sheet — owned by skippy@nukasoft.ai, shared to Pierre.
// Empty until the one-time creation run (create a subscribers doc with
// source: '__init_sheet__'); then pin the logged spreadsheetId here and redeploy.
const SPREADSHEET_ID = '';
const SHARE_WITH = 'pierre@nukasoft.ai';
const SHEET_TAB = 'Subscribers';

const GMAIL_SCOPE = 'https://www.googleapis.com/auth/gmail.send';
const SHEETS_SCOPE = 'https://www.googleapis.com/auth/spreadsheets';
const DRIVE_FILE_SCOPE = 'https://www.googleapis.com/auth/drive.file';

// No existing subscriber base for Field Service Nerd — seed is empty. Add any
// migrated rows here as ['YYYY-MM-DD', 'First', 'Last', 'email'] before the init run.
const SEED_ROWS = [];

const WELCOME_HTML = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0A0E17;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0A0E17;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <tr>
          <td style="background:#0A0E17;border-bottom:2px solid #FF6A1A;padding:26px 40px;">
            <span style="font-family:Arial Black,Arial,sans-serif;font-weight:900;font-size:20px;letter-spacing:.02em;color:#F1F5FB;">
              FIELD SERVICE <span style="color:#FF6A1A;">NERD</span>
            </span>
          </td>
        </tr>

        <tr>
          <td style="background:#0D121C;padding:44px 40px 32px;">
            <p style="margin:0 0 10px;font-family:'Courier New',monospace;font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#24D3E6;">// Access granted</p>
            <h1 style="margin:0 0 18px;font-family:Arial Black,Arial,sans-serif;font-weight:900;font-size:30px;color:#F1F5FB;line-height:1.12;">
              You're in.<br>
              <span style="color:#FF6A1A;">Welcome to the signal.</span>
            </h1>
            <p style="margin:0 0 28px;font-size:16px;color:rgba(241,245,251,.72);line-height:1.6;">
              Your free Field Service AI Primer and the knowledge base are right here. No paywall. No upsell. Just the good stuff.
            </p>
            <a href="https://fieldservicenerd.com/community"
               style="display:inline-block;background:#FF6A1A;color:#060910;font-family:Arial Black,Arial,sans-serif;font-weight:900;font-size:15px;text-transform:uppercase;letter-spacing:.04em;padding:15px 30px;border-radius:6px;text-decoration:none;">
              Go to Your Community Page &rarr;
            </a>
          </td>
        </tr>

        <tr>
          <td style="background:#F6F9FE;padding:36px 40px;">
            <p style="margin:0 0 20px;font-family:Arial Black,Arial,sans-serif;font-weight:900;font-size:13px;text-transform:uppercase;letter-spacing:.08em;color:#0A0E17;">
              What's waiting for you:
            </p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:0 12px 16px 0;width:50%;vertical-align:top;">
                  <div style="background:#fff;border:1px solid #D2DBEA;border-radius:8px;padding:20px;">
                    <p style="margin:0 0 4px;font-family:Arial Black,Arial,sans-serif;font-weight:900;font-size:14px;text-transform:uppercase;color:#0A0E17;">The AI Primer</p>
                    <p style="margin:0;font-size:13px;color:#566076;line-height:1.5;">What's real, what's hype, and where AI actually pays off in field service operations.</p>
                  </div>
                </td>
                <td style="padding:0 0 16px 12px;width:50%;vertical-align:top;">
                  <div style="background:#fff;border:1px solid #D2DBEA;border-radius:8px;padding:20px;">
                    <p style="margin:0 0 4px;font-family:Arial Black,Arial,sans-serif;font-weight:900;font-size:14px;text-transform:uppercase;color:#0A0E17;">The Knowledge Base</p>
                    <p style="margin:0;font-size:13px;color:#566076;line-height:1.5;">Decks, lexicon, frameworks, and references on D365 Field Service — no vendor gloss.</p>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="background:#F6F9FE;padding:0 40px 40px;border-top:1px solid #D2DBEA;">
            <p style="margin:0 0 12px;font-size:15px;color:#10192B;line-height:1.65;">
              Bookmark the community page — that link is yours to keep.
            </p>
            <p style="margin:0;font-size:15px;color:#10192B;">
              <strong>Pierre</strong><br>
              <span style="color:#566076;font-size:13px;">Field Service Nerd</span>
            </p>
          </td>
        </tr>

        <tr>
          <td style="background:#0A0E17;padding:20px 40px;text-align:center;">
            <p style="margin:0;font-family:'Courier New',monospace;font-size:12px;color:rgba(241,245,251,.4);">
              Field Service Nerd &bull; fieldservicenerd.com &bull;
              <a href="https://fieldservicenerd.com/community" style="color:#24D3E6;text-decoration:none;">your community page</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
`;

// Mint an access token that acts as skippy@nukasoft.ai (domain-wide delegation),
// scoped to whatever Google APIs we pass in. No private key needed — IAM signs.
async function getSkippyToken(scopes) {
  const auth = new GoogleAuth({ scopes: ['https://www.googleapis.com/auth/iam'] });
  const client = await auth.getClient();

  const now = Math.floor(Date.now() / 1000);
  const jwtClaim = JSON.stringify({
    iss: SA_EMAIL,
    sub: FROM_EMAIL,
    scope: scopes.join(' '),
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  });

  const signRes = await client.request({
    url: `https://iam.googleapis.com/v1/projects/-/serviceAccounts/${SA_EMAIL}:signJwt`,
    method: 'POST',
    data: { payload: jwtClaim },
  });

  const params = new URLSearchParams({
    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
    assertion: signRes.data.signedJwt,
  });
  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    body: params,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
  const tokenData = await tokenRes.json();
  if (!tokenData.access_token) {
    throw new Error('Token exchange failed: ' + JSON.stringify(tokenData));
  }
  return tokenData.access_token;
}

function oauthClientFor(token) {
  const c = new google.auth.OAuth2();
  c.setCredentials({ access_token: token });
  return c;
}

async function getImpersonatedGmailClient() {
  const token = await getSkippyToken([GMAIL_SCOPE]);
  return google.gmail({ version: 'v1', auth: oauthClientFor(token) });
}

// One-time: create the subscriber sheet, seed any migrated rows, share it to Pierre.
// Logs the spreadsheetId so we can pin it into SPREADSHEET_ID and redeploy.
async function createSubscriberSheet() {
  const token = await getSkippyToken([SHEETS_SCOPE, DRIVE_FILE_SCOPE]);
  const auth = oauthClientFor(token);
  const sheets = google.sheets({ version: 'v4', auth });
  const drive = google.drive({ version: 'v3', auth });

  const created = await sheets.spreadsheets.create({
    requestBody: {
      properties: { title: 'Field Service Nerd — Subscribers' },
      sheets: [{ properties: { title: SHEET_TAB } }],
    },
  });
  const spreadsheetId = created.data.spreadsheetId;

  const header = ['Date Added', 'First Name', 'Last Name', 'Email'];
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `${SHEET_TAB}!A1`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [header, ...SEED_ROWS] },
  });

  await drive.permissions.create({
    fileId: spreadsheetId,
    sendNotificationEmail: true,
    requestBody: { type: 'user', role: 'writer', emailAddress: SHARE_WITH },
  });

  console.log('SHEET_CREATED spreadsheetId=' + spreadsheetId +
    ' url=https://docs.google.com/spreadsheets/d/' + spreadsheetId + '/edit');
  return spreadsheetId;
}

// Append one subscriber row to the sheet. No-op until SPREADSHEET_ID is pinned.
async function appendSubscriberRow(row) {
  if (!SPREADSHEET_ID) return;
  const token = await getSkippyToken([SHEETS_SCOPE]);
  const sheets = google.sheets({ version: 'v4', auth: oauthClientFor(token) });
  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_TAB}!A:D`,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    requestBody: { values: [row] },
  });
}

function buildRawEmail(to, subject, html) {
  const boundary = 'boundary_fsn_' + Date.now();
  const lines = [
    `From: Pierre Hulsebus | Field Service Nerd <${FROM_EMAIL}>`,
    `To: ${to}`,
    `Bcc: ${FROM_EMAIL}`,
    `Subject: ${subject}`,
    'MIME-Version: 1.0',
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    '',
    `--${boundary}`,
    'Content-Type: text/html; charset=utf-8',
    'Content-Transfer-Encoding: quoted-printable',
    '',
    html,
    '',
    `--${boundary}--`,
  ];
  return Buffer.from(lines.join('\r\n')).toString('base64url');
}

exports.sendWelcomeEmail = onDocumentCreated('subscribers/{docId}', async (event) => {
  const data = event.data?.data() || {};
  const email = data.email;
  const source = data.source || '';

  // One-time bootstrap: create + seed + share the subscriber sheet.
  if (source === '__init_sheet__') {
    try {
      await createSubscriberSheet();
    } catch (e) {
      console.error('Sheet creation failed:', e.message);
    }
    return;
  }

  // Maintenance: strip test rows and log the resulting sheet contents.
  if (source === '__sheet_maintenance__') {
    try {
      const token = await getSkippyToken([SHEETS_SCOPE]);
      const sheets = google.sheets({ version: 'v4', auth: oauthClientFor(token) });
      const res = await sheets.spreadsheets.values.get({ spreadsheetId: SPREADSHEET_ID, range: `${SHEET_TAB}!A:D` });
      const rows = res.data.values || [];
      const kept = rows.filter((r) => (r[3] || '').toLowerCase() !== 'sheet-test-delete@example.com');
      await sheets.spreadsheets.values.clear({ spreadsheetId: SPREADSHEET_ID, range: `${SHEET_TAB}!A:D` });
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID, range: `${SHEET_TAB}!A1`,
        valueInputOption: 'USER_ENTERED', requestBody: { values: kept },
      });
      console.log('SHEET_MAINT rows_now=' + kept.length);
    } catch (e) {
      console.error('Sheet maintenance failed:', e.message);
    }
    return;
  }

  if (!email) return;

  // Welcome email
  try {
    const gmail = await getImpersonatedGmailClient();
    const result = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: buildRawEmail(email, "You're in — your Field Service AI Primer", WELCOME_HTML),
      },
    });
    console.log('Welcome email sent to:', email, '| messageId:', result.data.id);
  } catch (e) {
    console.error('Welcome email failed for', email, ':', e.message);
  }

  // Append to the subscriber sheet (Date | First | Last | Email)
  try {
    const created = data.createdAt;
    let dateStr;
    if (created && typeof created.toDate === 'function') dateStr = created.toDate().toISOString().slice(0, 10);
    else if (typeof created === 'string') dateStr = created.slice(0, 10);
    else dateStr = new Date().toISOString().slice(0, 10);
    const firstName = data.firstName || '';
    await appendSubscriberRow([dateStr, firstName, '', email]);
    console.log('Sheet row appended for:', email);
  } catch (e) {
    console.error('Sheet append failed for', email, ':', e.message);
  }
});
