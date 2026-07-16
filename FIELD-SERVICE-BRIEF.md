# Field Service Nerd — Build Kickoff Brief

_Handoff from the Tech Sales 110 session, 2026-07-01.  Read this first, then let's build.  The point of this brief: clone the Tech Sales 110 infrastructure, not rebuild it._

---

## What we're building

**Field Service Nerd** | a hybrid site that does two jobs at once:

1. **Audience / community** | free ebook, email capture, community page, podcast/video, the knowledge base.  Build a following of field service pros.
2. **Consulting track** | the "companies call when their D365 Field Service implementation is broken" positioning becomes the hire-me path inside the same site.

One site, one URL, audience flows into the consulting funnel.  No hop to a separate domain.

---

## Decisions already locked (don't relitigate)

- **Brand:** Field Service Nerd.
- **Domain:** `fieldservicenerd.com` (owned) is primary.  `fieldservicerocks.com` → 301 redirect to primary.  `equiptive.ai` reserved | do NOT co-mingle, it's a future separate product.  (Source: `web/domain/domain-strategy.md`.)
- **Model:** hybrid (audience + consulting), per above.
- **Design:** its own identity | **"Signal & Grit"** (navy / electric orange / cold cyan, control-room aesthetic, dot grids, monospace-as-data).  Full philosophy in `web/assets/fsn-design-philosophy.md`.  **Do NOT reuse Tech Sales 110's maroon/gold varsity look.**  We clone TS110's plumbing, not its skin.
- **Build home:** this repo, `Z:/Projects/FieldService`.  It already holds the content, the domain strategy, the brand `CLAUDE.md`, and the FSN assets.  The separate Vite scaffold at `Z:/Skippy/Dev/PierreHulsebus` gets cannibalized for parts or retired.

---

## What already exists in this repo (assets to use)

- `CLAUDE.md` | brand instructions (Field Service Nerd, audience, D365 FS depth).
- `course/` | modules, quizzes, scripts (Kajabi course IP).
- `podcast/` | episodes, guests, templates.
- `blog/` + `_posts/` | Jekyll blog (one welcome post so far).
- `frameworks/`, `lexicon/`, `decks/`, `diagrams/`, `references/` | the knowledge base.
- `web/domain/domain-strategy.md` | domain plan.
- `web/assets/` | `fsn-design-philosophy.md`, YouTube channel art, thumbnails, LinkedIn banner.
- Currently published as a **Jekyll** site (`_config.yml`, theme minima) at `crminarian.github.io/FieldService`.

---

## Clone this infrastructure (pointers into `Z:/Skippy/Dev/TechSeller`)

Tech Sales 110 already proved out the full stack.  Reuse these patterns file-for-file, repointed at Field Service Nerd.  **We are not building new infrastructure.**

### Firebase Hosting + multi-page site
- `firebase.json` | hosting `public: web`, `cleanUrls: true`, `trailingSlash: false`; `firestore.rules`; `functions` codebase.
- `.firebaserc` | `default` project.  FSN gets its **own** Firebase project (e.g. `field-service-nerd`), same config shape.
- Multi-page pattern: `web/index.html`, `web/community.html`, `web/about.html` | clean URLs (`/community`, `/about`) | per-page SEO head blocks | `sitemap.xml` | cache-bust `?v=N` on component scripts (bump on every change).
- Deploy: `firebase deploy --only hosting` authenticated as `pierre@nukasoft.ai`.

### Subscriptions / email capture (the core reuse)
- **Form → Firestore REST API** (no Firebase SDK | avoids the module-timing bug).  Collection `subscribers`, fields `firstName / email / source / createdAt`.  Model: `web/Sections.jsx` `EmailSection`.
- **Cloud Function `sendWelcomeEmail`** in `functions/index.js` | `onDocumentCreated('subscribers/{docId}')` does two things:
  1. Sends a welcome email via the **Gmail API impersonating `skippy@nukasoft.ai`** (domain-wide delegation + IAM `signJwt`).  **No stored secrets** | IAM mints the token.
  2. **Appends a row to a live Google Sheet** so subscribers land in a file Pierre can open.
- **Google Sheet capture** | columns `Date Added | First Name | Last Name | Email`.  Created, seeded, and shared by the function.  Control docs: create a `subscribers` doc with `source: '__init_sheet__'` (create+seed+share) or `source: '__sheet_maintenance__'` (strip test rows).  Full detail: TS110 memory `project-subscriber-sheet.md`.
- **Shared infra to reuse (not rebuild):** the nukasoft.ai Google Workspace, the `skippy@nukasoft.ai` sender, and the domain-wide delegation.  For the new Firebase project: add its Compute Engine service-account **client ID** to the **same** Admin console domain-wide-delegation entry with scopes `gmail.send, spreadsheets, drive.file`, and enable the Gmail / Sheets / Drive APIs in the new project.  (Open option: a dedicated `hello@fieldservicenerd.com` sender instead of skippy.)

### Podcast / video
- Link out to a Buzzsprout show page (TS110 model: `buzzsprout.com/<showId>`).  FSN already has `podcast/episodes`.

### Ebook lead magnet
- HTML + Paged.js → Puppeteer PDF.  TS110 model: `web/ebook/` + `scripts/generate-ebook-pdf.js`.

### TS110 reference memories (in the TechSeller project memory dir)
`project-subscriber-sheet.md`, `feedback-deploy-lessons.md`, `reference-services.md`, `project-techseller-overview.md`.

---

## Open questions to settle in the build brainstorm (carried forward, not yet decided)

1. **Stack** | keep Vite/React + Firebase Hosting (recommended | modern, and it lets us migrate the Jekyll content into a real app) vs TS110's Babel-in-browser approach.
2. **Knowledge base** | keep the existing Jekyll KB as a `/kb` section, or migrate it into the app.
3. **Repo reconciliation** | fold everything into this repo (`Z:/Projects/FieldService`); decide the fate of the `PierreHulsebus` Vite scaffold.
4. **Sender identity** | reuse `skippy@nukasoft.ai` vs a new `hello@fieldservicenerd.com`.
5. **First lead magnet** | free ebook topic + the first community content drop (course + podcast material already exist to pull from).

---

## How to start

You are already rooted in `Z:/Projects/FieldService`.  Kick off with:

> "Read FIELD-SERVICE-BRIEF.md and let's build the Field Service Nerd site."

Then run the brainstorming flow on the open questions above, write the spec, and clone the TS110 infrastructure pointers.
