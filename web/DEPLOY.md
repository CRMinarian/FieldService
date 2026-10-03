# Field Service Nerd — Deploy & Handoff Notes

The site is a Firebase-hosted, Babel-in-browser app (cloned from the Tech Sales 110
plumbing, dressed in the Field Manual identity). The browser compiles the `.jsx`
files at runtime. Hosting is the `dist/` tree from `npm run build`, which copies
`web/` and explicitly stages `tokens/*.css` next to `styles.css` (the file HTML
links). `firebase deploy` runs that build via `hosting.predeploy`.

```bash
npm run build      # web/ → dist/, including dist/tokens/*.css
npm run preview    # serve dist/ at http://127.0.0.1:4173
```

## Pages
| URL | File |
|---|---|
| `/` | `web/index.html` |
| `/community` | `web/community.html` (gated post-signup hub) |
| `/consulting` | `web/consulting.html` |
| `/about` | `web/about.html` |
| `/kb` | `web/kb.html` |

Clean URLs come from `firebase.json` (`cleanUrls: true`). Component files are versioned
`?v=N` in the HTML — **bump the number whenever you change a `.jsx`** so returning
visitors get the new file.

---

## Before it can go live — manual prerequisites (Pierre, in the consoles)

These require Google/Firebase console access and can't be scripted from the repo.

1. **Create the Firebase project** `field-service-nerd` (Blaze plan — Functions need it).
2. **Enable APIs** in that project: Firestore, Cloud Functions, Hosting, and the
   **Gmail / Sheets / Drive** APIs.
3. **Domain-wide delegation:** add the new project's **Compute Engine default service
   account client ID** to the SAME nukasoft.ai Admin console DWD entry that Tech Sales 110
   uses, scopes: `gmail.send, spreadsheets, drive.file`. (We reuse the `skippy@nukasoft.ai`
   sender — no new mailbox.)
4. **`firebase login`** as `pierre@nukasoft.ai`.

## Fill in these placeholders (they're marked with TODO in the code)

- `web/Sections.jsx` → `FIRESTORE_KEY` — the field-service-nerd **Web API key**
  (Firebase console → Project settings → General → Web API key). The form writes to
  Firestore via REST with this key; Firestore rules gate it to create-only.
- `functions/index.js` → `SA_EMAIL` — replace `<PROJECT_NUMBER>` with the new project's
  number (`<number>-compute@developer.gserviceaccount.com`).
- `functions/index.js` → `SPREADSHEET_ID` — left empty on purpose. Fill it AFTER the
  one-time sheet-creation run (below), then redeploy `functions`.

## First-time subscriber-sheet bootstrap

After the function is deployed, create ONE Firestore doc in `subscribers` with
`source: '__init_sheet__'` (Firebase console → Firestore, or a REST write). The function
creates the "Field Service Nerd — Subscribers" sheet, shares it to `pierre@nukasoft.ai`,
and logs the `spreadsheetId` (Functions logs). Pin that id into `SPREADSHEET_ID` and
redeploy. Maintenance (strip test rows): create a doc with `source: '__sheet_maintenance__'`.

---

## Deploy

```bash
# from repo root
cd functions && npm install && cd ..   # first time only
npm run build                          # required — stages dist/tokens/*.css
firebase deploy                        # hosting + functions + firestore rules
# or narrow it:
npm run deploy:hosting
firebase deploy --only functions
```

## Ebook (the AI primer PDF)

```bash
npm install                    # first time — installs puppeteer
npm run ebook                  # regenerates web/ebook/fs-ai-primer.pdf from fs-ai-primer.html
```

The primer is currently a **structured outline (v1)** — the funnel is wired end-to-end;
the full prose is a later content pass.

## DNS (cutover, when ready)

Point `fieldservicenerd.com` at Firebase Hosting; 301 `fieldservicerocks.com` → primary.
Leave `equiptive.ai` alone.

## What's parked

The old Jekyll-from-root Pages workflow is gone. `.github/workflows/pages.yml`
now builds `dist/` (with `tokens/`) and deploys that tree. Notion sync stays
disabled. Merging to `main` publishes hosting — do not merge a draft PR to test.

## Interim links to swap when live
- Podcast: `LINKS.podcast` in `web/Sections.jsx` currently points at YouTube — swap for the
  Buzzsprout show URL once the feed is published.
- YouTube handle assumed `@FieldServiceNerd` (used in Nav/Sections/About) — correct if different.
- Consulting call: `CALENDLY` in `web/Consulting.jsx` = `calendly.com/pierre-nukasoft`.
