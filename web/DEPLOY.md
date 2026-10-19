# Field Service Nerd — Deploy & Handoff Notes

The site is a Firebase-hosted, Babel-in-browser app dressed in the Field Manual
identity. The browser compiles the `.jsx` files at runtime. Hosting is the
`dist/` tree from `npm run build`, which copies `web/` and explicitly stages
`tokens/*.css` next to `styles.css` (the file HTML links). `firebase deploy`
runs that build via `hosting.predeploy`, then the asset guard fails the deploy
if any file referenced by HTML/CSS (including `@import`) is missing.

Field Service Nerd is a non-paid education / portfolio site. There is no rate
card, hire-me funnel, or consulting solicitation. `/consulting`,
`/consulting/**`, and `/go/consult` 301 to `/` in `firebase.json`.

```bash
npm run build      # web/ → dist/, including dist/tokens/*.css + asset check
npm run preview    # serve dist/ at http://127.0.0.1:4173 (cleanUrls, real 404)
```

## Pages
| URL | File |
|---|---|
| `/` | `web/index.html` |
| `/about` | `web/about.html` |
| `/kb` | `web/kb.html` |
| `/community` | `web/community.html` (gated post-signup hub) |
| `/blog` | `web/blog/index.html` |
| `/ebook/fs-ai-primer.pdf` | `web/ebook/fs-ai-primer.pdf` |
| `/robots.txt` | `web/robots.txt` |
| `/sitemap.xml` | `web/sitemap.xml` |
| `/consulting` | 301 → `/` (`firebase.json` only; no consulting page) |
| missing file | `web/404.html` (HTTP 404 — no catch-all rewrite to index) |

Clean URLs come from `firebase.json` (`cleanUrls: true`). There is **no**
`** → /index.html` rewrite. Missing CSS/JS/images return 404 instead of HTML.
Component files are versioned `?v=N` in the HTML — **bump the number whenever
you change a `.jsx`** so returning visitors get the new file.

---

## Before it can go live — manual prerequisites (Pierre, in the consoles)

These require Google/Firebase console access and can't be scripted from the repo.

1. **Firebase project** `field-service-nerd` already exists (Blaze).
2. **Domain** already points at Firebase Hosting. Do not change DNS from this repo.
3. **`firebase login`** as `pierre@nukasoft.ai`.

## Fill in these placeholders (they're marked with TODO in the code)

- `web/Sections.jsx` → `FIRESTORE_KEY` — the field-service-nerd **Web API key**
  (Firebase console → Project settings → General → Web API key). The form writes to
  Firestore via REST with this key; Firestore rules gate it to create-only.

---

## Deploy (Pierre publishes — do not deploy from a PR)

```bash
# from repo root
npm run build
firebase deploy --only hosting --project field-service-nerd
```

Or: `npm run deploy:hosting`

Do **not** merge a draft PR just to test. The GitHub Pages workflow is disabled
(`.github/workflows/pages.yml.disabled`) because the domain does not point at
Pages. Merging to `main` does not publish the live site.

## Ebook (the AI primer PDF)

```bash
npm install                    # first time — installs puppeteer
npm run ebook                  # regenerates web/ebook/fs-ai-primer.pdf from fs-ai-primer.html
```

## Regenerators (source → web/)

```bash
node scripts/build-blog.mjs            # blog/posts/*.md → web/blog/
node scripts/build-episode-pages.mjs   # youtube/scripts → web/ep/
node scripts/build-go-links.mjs        # redirects/go-links.json → web/go/
```

## DNS

Leave DNS alone. Apex A records → Firebase; `www` CNAME →
`field-service-nerd.web.app`.

## What's parked

- `.github/workflows/pages.yml` is disabled. Production is Firebase only.
- Notion sync stays disabled.
- `/consulting` is a redirect, not a rate card.
