# Handoff Log

Last updated at end of session.  Read this first.

<!--
MEP Protocol | Baton v1.0 | Newest entry ALWAYS on top.
Three sections per entry: What happened / What's pending / Watch out for
-->

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
