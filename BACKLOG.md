# Field Service Nerd — Backlog

Post-launch enhancements. None of these block the live site
(https://field-service-nerd.web.app) — the core site + signup funnel are live and verified.

## Site Upgrade (v2 — plan as content + the database grow)

Collected tasks for the next real site iteration.  Add here as they surface; batch into one
upgrade pass rather than one-off edits.

- [ ] **Fix the credentials mismatch (site vs LinkedIn launch post).**  The site says
  "30 years / 30+ yrs / CRM since 2002" (About headline + body, hero, FAQ); the launch post
  says **40 years / CRM and sales ops since the mid 90's** (accurate | XT sale 1988, U.P.
  deploys 1994, pre-Salesforce CRM).  Update all four spots to match the post.
- [ ] **Restore the Knowledge Base** (gated on formatted content).  `web/kb.html` is parked
  on disk, unlinked.  Revert list: nav link (`Nav.jsx`), hero CTA (`Hero.jsx`), homepage
  pillar ("Two signals" → "Three signals" in `Sections.jsx`), footer link, About CTA,
  community card.  `index.html` meta still mentions "knowledge base" | fine, it returns.
- [ ] **Interactive Work Order Quality Quiz** (parked below | becomes the community hook once
  the database exists).
- [ ] **Database layer.**  Firestore already holds `subscribers`; the quiz, saved scores, and
  community access all want structured collections + rules.  Design the schema once, before
  the quiz ships, not per-feature.
- [ ] **Content surfaces for the flywheel output.**  As EP videos + podcast episodes ship,
  the site needs: an episodes page (or KB section) listing videos with thumbnails, and the
  podcast section pointed at real episodes instead of the placeholder playlist.
- [ ] **Welcome-email sender to `@fieldservicenerd.com`** once the domain is in Google
  Workspace (currently sends as skippy@nukasoft.ai).
- [ ] **OG/social cards per page** | `web/brand/six-layer-model.png` and
  `work-order-quality-quiz.png` are sized for it (per the e-book session handoff).

## Open

- [ ] **Interactive Work Order Quality Quiz → community access (parked by Pierre 2026-07-15).**
  Web version of the book's page-6 scoresheet on fieldservicenerd.com: visitor scores up to
  twenty closed work orders in the browser (three measures, 0 to 3 apiece), gets the persona
  verdict per order (Documentation Darling | Almost-There Operator | "Fixed." Philosopher) and
  the 180-max band for the pull (140+ AI-ready | 90 to 139 closure discipline first | under 90
  training budget).  The score screen is the community hook: enter email via the existing
  subscribers funnel to save the score and unlock community access.  Rubric, personas, and copy
  are LOCKED in the ebook (branch `Skippy/field-service-ai-ebook-57c092`, asset
  `web/brand/work-order-quality-quiz.png`, FSN-QUIZ-03) | reuse verbatim.  Related but separate:
  the daily D365 scoring-agent design (also parked) at
  `docs/superpowers/specs/2026-07-15-work-order-quality-quiz-agent-design.md` on
  `Skippy/sad-brahmagupta-adab08`.

- [ ] **Restore the Knowledge Base (gated on the e-book refresh).**
  KB was pulled from the live site 2026-07-15 (no formatted content yet). `web/kb.html`
  is parked on disk, just unlinked. When the e-book refresh and KB content are ready,
  re-add: nav link (`Nav.jsx`), hero CTA (`Hero.jsx`), the homepage pillar (revert
  "Two signals" → "Three signals" in `Sections.jsx`), footer link, About CTA, and the
  community page card. Also revisit `index.html` meta (still mentions "knowledge base").

- [x] **Redirect `Hulsebus.net` → Consulting page.** DONE 2026-07-15.
  GoDaddy Domain Forwarding, 301 → `https://fieldservicenerd.com/consulting` (verified
  live). Set via browser (GoDaddy forwarding API is deprecated). Email untouched
  (MX/SPF/DMARC on Google Workspace preserved). Fully resolves once the
  fieldservicenerd.com SSL cert finishes provisioning.

- [ ] **Add a personal introduction video.**
  Short, personal "who I am / what this is" video from Pierre. Likely placement: the
  homepage hero or the About page. Record → host (YouTube embed to match the existing
  `Videos` pattern, or self-host) → wire into a component.

- [ ] **Pro headshot on the Consulting page.**
  Pull Pierre's professional headshot from the Tech Sales 110 brand assets
  (`Z:/Skippy/Dev/TechSeller/brand/assets/`) and place it on `/consulting` — the
  consulting hero currently has no photo. (Distinct from the field/patch headshot
  already used on About + the podcast thumbnail.)

- [ ] **YouTube channel launch (in progress).**
  Channel is **LIVE: https://www.youtube.com/@FieldServiceNerd** (`@FieldServiceNerd`).
  1. ✅ **Channel created** (Brand Account).
  2. [ ] **Apply branding** — banner `youtube/fsn-yt-banner.png` (2560×1440), avatar
     `web/assets/fsn-avatar-circle.png` (circle NERD patch, 800×800 — circle-native so it
     reads small). Paste the About description + the three links.
  3. [ ] **Create 4 playlists** — The Builders · Fundamentals · From The Field · The
     Honest Take (descriptions in `youtube/CHANNEL-PLAN.md`).
  4. [ ] **Download the old videos** from the existing channel/playlist
     (`PLD2JXXb9_ku0`). (yt-dlp on owned content.)
  5. [ ] **New thumbnails** — batch-generate from the locked master template
     (`web/brand/yt-thumb-master.html`); EP01+EP02 already rendered in
     `youtube/thumbnails/`.
  6. [ ] **Re-upload** the first videos with new thumbnails into the right playlists.
  - [ ] **`pierre@fieldservicenerd.com` mailbox** (independent now, no longer gates
     the channel) — add `fieldservicenerd.com` to **nukasoft.ai Google Workspace** +
     create the user (`gws-admin`). Bonus: switch the site's welcome-email sender from
     `skippy@nukasoft.ai` to an `@fieldservicenerd.com` address.

- [ ] **Per-episode production package (the content flywheel — next-phase target).**
  Systematize the **script → recording → Descript** handoff so idea → published video
  goes from days to hours. The pipeline: **Grok** does interview → spoken script;
  **Claude** turns the finished script into a full production package; **Descript**
  handles editing + B-roll + post. Claude's package per episode:
  1. **Teleprompter script** — spoken cadence, formatted for Descript import.
  2. **B-roll / shot cue sheet** — each script line → suggested visual + on-screen
     text / lower-third, so B-roll placement is paint-by-numbers in the edit.
  3. **Chapter markers + timestamp skeleton** — for YouTube chapters.
  4. **Packaging** — title, video description, tags, pinned comment.
  5. **Thumbnail** — already an automated Script+Title → PNG pipeline (see
     `youtube/THUMBNAIL-STYLE.md`).
  Build a reusable package template first, prove it on one episode, then batch.

## Done
- Field Manual redesign + official patch logo, real headshot, live deploy, verified
  email funnel (see git history on `build/fsn-site`).
