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
- [ ] **Subscriber dedup.**  Same email can sign up twice and gets two sheet rows + two
  welcome emails (verified 2026-07-16: pierre@hustleisthehack.com twice).  Fix in the
  Cloud Function: check for an existing subscriber doc by email before sending/appending,
  or upsert keyed on email.
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
- [ ] **Hero image on the landing page.**  The hero is currently type-only on a dark ground |
  no visual anchor.  Candidates: a real photo of Pierre in the field (matches the About/podcast
  headshot treatment), a fleet-yard/dispatch-board environmental shot, or a branded composite
  from the motion-graphics kit (`youtube/ep01-intro-comp.png` shows the "small person, big
  space" direction).  Must hold at mobile widths and in both themes; keep the orange accent
  discipline (one orange hit).  Ties into the intro-video work | a video hero thumbnail could
  serve both.

## Social Autoposting Pipeline (draft here → approve → post)

Goal: replace the old scheduling tools with the stack we already have.  **No from-scratch build
needed** | Zapier MCP is already connected to this project's sessions.

- [ ] **Pierre: add 3 actions to the Zapier MCP** at
  https://mcp.zapier.com/mcp/servers/19e99c4d-3a68-47b3-9ece-8430e91707d4/config :
  LinkedIn → Create Share Update · Facebook Pages → Create Page Post · Instagram for
  Business → Publish Photo.  (One OAuth click each; tools then appear in-session.)
- [x] **YouTube posting works today** | Zapier `youtube_upload_video` (title, description,
  tags, thumbnail, privacy) + `youtube_update_video_thumbnail`.
- [ ] **Queue convention:** drafts live in `social/queue/` (one file per post: platform,
  copy, image path, target slot).  Voice-checked via pierre-voice MCP before approval.
- [ ] **Scheduling:** approved posts fire via the `scheduled-tasks` MCP (e.g. Tue 8:30 AM ET)
  or post immediately on "approve."
- **Cadence (locked with Pierre 2026-07-16):** LinkedIn Tue/Thu mornings 8:30-9:00 AM ET,
  2-3 posts/week.  Launch post: Thu 2026-07-16 AM (manual).  Follow-up: Tue 2026-07-21,
  e-book angle.

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

- [ ] **Welcome video (NEXT UP — Pierre, 2026-07-16).**
  One recording, three jobs:
  1. **Channel trailer** on @FieldServiceNerd (plays for non-subscribers | "who I am,
     what this channel is, subscribe if you run Field Service").
  2. **Site intro** — embed on the homepage or About (existing `Videos` pattern).
  3. **Candidate hero visual** — a video hero or its thumbnail could double as the
     landing-page hero image (see Site Upgrade section).
  Claude produces the package first: teleprompter script (Pierre voice, "Try This"
  framing, 60-90 seconds), shot suggestion, thumbnail. Then record → upload → set as
  channel trailer → wire into the site in the v2 pass.

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
  4. [ ] **Migrate existing videos (NEXT UP — Pierre, 2026-07-16).**  Download from the
     old channel/playlist (`PLD2JXXb9_ku0`) via yt-dlp (owned content), inventory what's
     worth migrating vs. retiring, then per keeper: new title (keyword bank in
     `youtube/CHANNEL-KEYWORDS.md`), new description, fresh thumbnail from the locked
     master template (`web/brand/yt-thumb-master.html`), assign to one of the four
     playlists, upload.  EP01+EP02 thumbnails already rendered in `youtube/thumbnails/`.
  5. [ ] **Batch remaining thumbnails** for the keepers + EP03-EP10 in one pass.
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
