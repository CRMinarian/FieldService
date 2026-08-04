# Handoff Log

Last updated at end of session.  Read this first.

<!--
MEP Protocol | Baton v1.0 | Newest entry ALWAYS on top.
Three sections per entry: What happened / What's pending / Watch out for
-->

---

## 2026-08-03 — Blog sub-site LIVE at /blog | sitemap + indexing needed (→ WM/SCO)

> From the **content desk** (this repo).  New public surface shipped; WM/SCO owns
> sitemap/robots/indexing per the 2026-07-16 charter.

### What happened
- **/blog is live** on fieldservicenerd.com (Field Manual style, in the site nav).  Static
  generator: `scripts/build-blog.mjs` reads `blog/posts/*.md` → `web/blog/*.html` + index +
  `web/blog/rss.xml`.  Draft posts render noindex + unlisted; published posts are live.
- **2 published posts:** `/blog/why-field-service-implementations-fail` (2026-08-03) and
  `/blog/power-platform-cli-lies` (2026-08-03, "Seven Ways the Power Platform CLI Lies to
  You").  The CLI post is being promoted on LinkedIn today (Pierre, manual) and links out to
  Nick Doelman (readyxrm.blog) + github.com/NukaSoft/agentic-powerplatform-pipeline.

### What's pending (for WM/SCO)
- **Add to `web/sitemap.xml`:** `/blog`, `/blog/why-field-service-implementations-fail`,
  `/blog/power-platform-cli-lies` (extensionless, absolute, real lastmod | 2026-08-03).
- Consider Search Console: request indexing on the CLI post (it has a live traffic moment
  today; being indexed while the LinkedIn push runs is the win).
- FYI `web/blog/rss.xml` exists | link it wherever the SEO program wants feed discovery.

### Watch out for
- The CLI post is a **living document** (title number will change | currently "Seven Ways").
  URL slug is stable: `power-platform-cli-lies`.  Do not key anything to the title text.
- Blog HTML is GENERATED.  Never hand-edit `web/blog/*.html`; source of truth is
  `blog/posts/*.md` + `scripts/build-blog.mjs` (content desk owns both).
- Deploys from `build/fsn-site` | branch and production are in sync as of today.

---

## 2026-07-16 — Traffic instrumentation: GA4 + SEO baseline live, deploys unblocked

> Executed from the **TechSeller** repo (`seo/nukasoft-action-plan-refresh`), which owns the SEO/traffic program per the 2026-07-16 cross-repo baton.  Edits landed **here** because the files live here.  Plumbing only | **no IP or content was touched.**

### What happened
- **GA4 `G-L1S6DQHF4Z` is live on all 6 pages** (`index`, `about`, `consulting`, `community`, `kb`, `ebook/fs-ai-primer`).  Verified live: 200 + 2 gtag refs + canonical + og:title intact on every page.  The property **already existed** | Firebase auto-created it when Analytics was enabled.  Pulled the ID from `firebase apps:sdkconfig WEB`; nothing new was created.  Commit `601b29f`.
- **SEO baseline live** (`490845d`): `web/robots.txt` (disallows `/brand/` + the render canvas under `/assets/`), `web/sitemap.xml` (6 absolute extensionless URLs, real `lastmod` from git), and the ebook reader's head (was a bare `<title>`; now description + canonical + OG + twitter-card).  Paged.js untouched, PDF pipeline unaffected.
- Both merged to **`build/fsn-site`** and deployed.  Production and that branch match | a deploy from `build/fsn-site` would otherwise have silently reverted robots/sitemap.
- **Deploys no longer need Pierre.**  Service-account key at `C:\Users\PierreHulsebus\.claude\fsn-admin-key.json`.  Set `GOOGLE_APPLICATION_CREDENTIALS` to it, then `firebase deploy --only hosting --project field-service-nerd`.
- **Remote moved HTTPS → SSH.**  This repo was the last one still on HTTPS (skippy-brain, TechSeller, nukasoft.ai were converted long ago).  That is why the 2026-07-15 push was blocked.  Root cause fixed, not worked around.

### What's pending
- [ ] **`www.fieldservicenerd.com` is DEAD** (HTTP 000, no DNS, no cert).  **CLI v15.21.0 has no custom-domain command | console only, confirmed.**  Add it as a redirect to apex, then hand the DNS records to the TechSeller branch to place.
- [ ] GSC Domain property (Pierre's Google account).  `sitemap.xml` is live and ready to submit.
- [ ] Event/CTA tracking would have to live in the `.jsx` components; the head snippet only covers pageviews and referrers.

### Watch out for
- **`firebase login:list` LIES.**  It reported "Logged in as pierre@nukasoft.ai" while the token was dead.  Test with `firebase hosting:sites:list`, never `login:list`.
- **A stale user token BEATS the service account.**  The CLI errored on the dead token before ever reading `GOOGLE_APPLICATION_CREDENTIALS`.  `firebase logout` cleared it and the SA worked instantly.
- **`web/seo/` is deploy-ignored** by `firebase.json`.  A sitemap placed there would never ship.  Root `web/` only.
- **No shared head.**  Any head change is 6 hand edits.  Do not `sed` it.
- **`check_voice` false positive:** flags "dynamic" by substring-matching **"Dynamics"** in "Dynamics 365 Field Service."  It will fire on every page this site ever publishes.
- A service-account key was exposed in a chat transcript 2026-07-16 (`770141dbfc…`), rotated to `38620423c219…` and the old key deleted.  **Never paste or `@` a key file | path only.**

---

## 2026-07-15 — Site session (build/fsn-site: merge, deploy, DNS launch)

### What happened
- **Merged** the e-book branch into `build/fsn-site` (21-page Playbook + assets + this session's
  KB removal + zero-dash voice sweep).  Clean merge, no conflicts.
- **Deployed to Firebase Hosting** (`field-service-nerd`).  Verified live:
  `/ebook/fs-ai-primer.pdf` serves the 3.6 MB / 21-page build; homepage clean (KB gone, "Two
  signals", pipes not dashes).
- **fieldservicenerd.com** pointed at Firebase: apex `A → 199.36.158.100`, TXT
  `hosting-site=field-service-nerd` verified, Google SSL cert issued.  Serving on updated edges.
- **hulsebus.net → 301 → fieldservicenerd.com/consulting** via GoDaddy Domain Forwarding
  (browser-driven; the forwarding API is deprecated).  Email MX/SPF/DMARC untouched.
- Ran `/vox-pierre:enforce-voice` across all site copy (48 em-dashes to pipes); saved
  `.claude/brand-voice-guidelines.md` for instant reload.
- Added `PROJECT-RETROSPECTIVE.md` (What Works / What Doesn't / the Playbook).

### What's pending
- [ ] Confirm `www.fieldservicenerd.com` is registered in Firebase (redirect to root) | check console.
- [ ] Let fieldservicenerd.com edge propagation finish globally (some machines still saw "Site Not
  Found" | that is edge lag, the domain is connected with a valid cert).
- [ ] EP02 through EP10 scripts + thumbnails (batch); record EP01 from `youtube/scripts/ep01-teleprompter.md`.
- [ ] Personal intro video; pro headshot on the Consulting page.
- [ ] Restore the KB when content is ready (`BACKLOG.md` has the exact revert list).

### Watch out for
- Firebase custom-domain "Site Not Found" during rollout is **edge lag, not a break** (valid cert +
  content serving on some edges = connected + propagating).
- Firebase login token expires | may need `firebase login --reauth` before a deploy.
- **GoDaddy forwarding API is deprecated (404).**  Forwarding changes go through the console/browser.
- `web/` is the Firebase public dir | keep `references/ebook-interview-notes.md` OUT of it (NDA).
- DNS is owned by the `domain-manager` skill; never change records ad hoc.

### Insight retro (2026-07-16)
- `/retro now` scoped to the "doors for reasons" insight: context isolation is the architecture
  (each desk its own repo, batons the only interface, missing info is a fact not a gap).
  Section at the top of `PROJECT-RETROSPECTIVE.md`; ingested to the wiki; **`/baton`** added to
  the skill queue (Tier 2 | the cross-repo handoff write ran twice by hand today).

### Episode pages shipped (2026-07-16, content desk)
- **`/ep/` staging pages live** for EP01-EP04 (noindex + banner, unlinked, NOT in the
  sitemap).  Generator `scripts/build-episode-pages.mjs`.  Deployed via the SA key path.
- **WM/SCO:** keep `/ep/` OUT of sitemap.xml while pages carry noindex.  When an episode
  publishes (status flag flips), add its URL to the sitemap | one URL per published episode.
- Future: gated subscriber access to these pages (backlogged with the database layer).

### Go-links + QR kit shipped (2026-07-16, content desk)
- **`/go/<slug>` short-link redirector live** (9 links: home, playbook, consult, youtube,
  linkedin, ep01-ep04).  Static pages, noindex, GA4 `go_click` event with `link_slug` +
  `link_dest` params, then instant redirect.  Source of truth `redirects/go-links.json`.
- **QR codes** in `web/brand/qr/` encode the go-links (destinations editable behind printed
  codes forever).
- **WM/SCO:** keep `/go/` out of the sitemap (noindex).  In GA4, the `go_click` event is
  the click ledger | consider registering `link_slug` as a custom dimension when you wire
  reporting.

### Cross-repo batons sent (2026-07-16)
- **→ `Z:\Projects\_WIKI` branch `wiki/backfill-index-rows`** (commit `3f181ca`, pushed):
  established that repo's baton and handed off the RAG ask | Field Service attention layer
  (conferences, movers/shakers, ISVs, competitors → a "Field Service Radar" synthesis page)
  + the insights → content pipeline contract (content desk reads the wiki every Wednesday
  for episode topics and post fuel).  That branch owns the wiki + `/retro`; we consume,
  never author pages there.
- **→ `Z:\Skippy\Dev\TechSeller` branch `seo/nukasoft-action-plan-refresh`** (commit `a5f0ee4`,
  pushed): established `machines/handoff.md` there and handed off the traffic/SEO ask |
  GSC verification for fieldservicenerd.com (DNS TXT via domain-manager), the GA4 vs
  privacy-light analytics decision + install, baseline SEO pass (sitemap/robots/OG), and
  folding FSN into the cross-site traffic monitoring.  That branch owns traffic insight now;
  do not duplicate the work here.

### Retro addendum (`/retro now`, same day)
- Wrote a dated launch-session section at the top of `PROJECT-RETROSPECTIVE.md` (11 rules), ingested
  to `_WIKI/projects/fsn-retrospectives.md`, logged to `_WIKI/log.md`.
- **Queue:** added `/console-drive` (Tier 2) to `_WIKI/projects/repeatable-patterns.md` | driving a
  vendor console when the API is dead.  Came from Pierre's correction: *"why am I doing this admin work?"*
- **Solved a five-session mystery:** the pierre-voice MCP was never broken.  **`.mcp.json` is
  per-project and FieldService had none** | it was registered only in `skippy-brain`.  Added
  `Z:\Projects\FieldService\.mcp.json`; **pierre-voice loads next session.**
- **Durable rule:** check `.mcp.json` in the current project root before concluding an MCP tool is
  absent or broken.  Present in project A, absent in project B is scope, not an outage.

---

## 2026-07-15 — Hot Rod (Skippy/field-service-ai-ebook-57c092 → build/fsn-site)

### What happened
- **The Field Service AI Playbook shipped.**  `web/ebook/fs-ai-primer.html` + PDF rebuilt from the 8-page skeleton into the full 21-page lead magnet, Field Manual v3 skin.  Pierre approved the prose.
- Ten chapters built from Pierre's interview (`references/ebook-interview-notes.md`), the wiki six-layer backbone, and the benchmark research (`references/ai-fs-benchmarking-extract.md`).  Every chapter opens on a hook and closes with a Try This.
- **Page 6 is the Work Order Quality Quiz** (FSN-QUIZ-03): full-page fill-out scoresheet, persona verdicts, Site/Scored by/Date line.  Standalone asset: `web/brand/work-order-quality-quiz.png`.
- **Page 4 carries the Six-Layer Model blueprint** (FSN-DIAG-02): exploded isometric stack, drafting title block.  Standalone asset: `web/brand/six-layer-model.png`.
- Feature claims verified against Microsoft Learn (`references/d365-ai-feature-status-2026.md`): 2020 previews (predictive duration, incident type suggestions, IoT alert suggestions) retired 2024 and the book says so honestly; CFS architecture, RSO, Schedule Assistant current GA.
- All D365 screenshots de-redded to brand orange (`references/d365-ai-screens/`).
- Voice-clean per `.claude/brand-voice-guidelines.md`: zero dashes, double spaces, contractions on, no banned words.
- Branch commits: f913805 thru fd89287 (ebook prompt, sources, prose, quiz, diagram, branding, vendor roll call).

### What's pending
- [ ] **Pierre** Push the branch (`git push -u origin Skippy/field-service-ai-ebook-57c092`) | session permission gate blocked push.  Then PR against `build/fsn-site`.
- [ ] **Site session** After merge: `firebase deploy --only hosting`, then verify `field-service-nerd.web.app/ebook/fs-ai-primer.pdf` serves the 21-page build (page counter says 21, page 4 has the blueprint diagram, NOT the plain table).
- [ ] **Site session** Cache-bust any page referencing the ebook (`?v=N` convention) and check the email-capture download slot points at the PDF.
- [ ] **Site session** Optional: use `web/brand/six-layer-model.png` and `web/brand/work-order-quality-quiz.png` for social/OG cards | they are sized and branded for it.

### Watch out for
- **`web/` is the Firebase public dir.**  `references/ebook-interview-notes.md` holds NDA-adjacent war stories and was deliberately moved OUT of `web/`.  Never move it back.
- Regenerating the PDF needs network (Paged.js from unpkg + Google Fonts): `node scripts/generate-ebook-pdf.js`.  The committed PDF is current; only rebuild after HTML edits.
- Do not reintroduce 2020 preview features as current | check `references/d365-ai-feature-status-2026.md` before adding any AI feature claim.
- The book must stay at 20 pages plus or minus 2 and zero red pixels, zero dashes (see `EBOOK-PROMPT.md` for the standing rules).
