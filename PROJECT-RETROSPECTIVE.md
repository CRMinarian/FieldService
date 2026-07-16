# Field Service Nerd | Project Retrospective

A working retrospective on the whole build, kept so we retain the learnings.  Covers the arc
from cold start to live launch (site, email funnel, e-book, YouTube channel, brand, voice,
domains).  For the single day-one session write-up, see `RETROSPECTIVE.md`.

Last updated 2026-07-16.

---

# 2026-07-16 | Insight Retro: "We Have Doors for Reasons" (context isolation by design)

> Type: Insight (scoped `/retro now`) | Scope: the context-isolation thread of the 2026-07-16
> session | Author: Skippy (Claude Code) on behalf of Pierre Hulsebus

## Summary

Pierre articulated the operating theory behind the whole multi-repo architecture: giant hungry
models ingest everything, and everything-context is a recipe for hallucination, so the system
has doors on purpose.  Each desk is its own repo, MEP batons are the only interface, and
missing information is a fact to respect, not a gap to fill.  The wiki ingester's confabulation
bug is the proof case, and the three-desk system stood up this session is the pattern working
at scale.  Bounded context is not a workaround for model limits.  It is the design that makes a
fleet of agents trustworthy.

## What Shipped (the insight made operational)

- **Three-desk charter, each behind its own door:** content desk (`FieldService`), Web Master /
  SCO (TechSeller `seo/nukasoft-action-plan-refresh`), Wiki / RAG engine (`_WIKI`
  `wiki/backfill-index-rows`, which also owns `/retro`).
- **Two cross-repo MEP batons written and pushed** (TechSeller `a5f0ee4`, _WIKI `3f181ca`),
  each staged as the single baton file against a dirty working tree, never touching the
  resident session's work.
- **A pipeline contract, not shared context:** the wiki's Field Service Radar feeds the content
  desk via a Wednesday read written into `social/CONTENT-CALENDAR.md`.  Insight flows through a
  named interface, not through an agent reading everything.
- The principle banked to memory with its proof case, so future sessions inherit the why.

## Rules Extracted

| # | Observation | Rule | Skill Target |
|---|---|---|---|
| 1 | Pierre: "You are awesome, but you ingest EVERYTHING.  In the real world we have doors for reasons." | Load only what the task needs.  Treat missing information as a fact ("behind another door"), not a gap to fill.  File a baton ask instead of wandering repos for context. | memory (banked) + every crew skill's instructions |
| 2 | The wiki ingester fed a model 1,500 chars, asked for a whole page back, and it confabulated the tail three times in six hours without flagging uncertainty. | Never ask a model to return more than it was given.  Partial context in, partial output out.  Any generator that expands input must mark inferred content as inferred. | wiki ingest tooling (that branch owns it) |
| 3 | Two cross-repo batons were hand-built this session (locate repo, establish `machines/handoff.md`, newest-on-top entry, stage ONLY the baton against a dirty tree, push, record the send on both ends). | The baton write is now a repeatable mechanical procedure.  Package it. | new: `/baton` |
| 4 | The insights → content handoff nearly became "content desk reads the wiki whenever."  It became a Wednesday Radar read with a "new since last week" convention instead. | Cross-desk flows get a named interface and a cadence, not ambient access.  Contract = what flows, which direction, when, and where it lands. | MEP protocol docs |
| 5 | The desks only work because each repo carries its own baton, backlog, and retro.  A desk without a baton (TechSeller, _WIKI before today) is a door with no mail slot. | Standing rule: every desk repo gets `machines/handoff.md` at charter time, day one. | MEP protocol docs |

## Skill / Agent Candidates

- **`/baton`** | Write a MEP baton to a target repo/branch.  In: target repo or branch name +
  the ask.  Out: `machines/handoff.md` established or prepended (newest on top, three
  sections), staged alone, committed, pushed, and the send recorded in the source repo's baton.
  Bakes in: locate the branch by search, never disturb a dirty working tree, respect the
  receiving repo's conventions.  Priority: **Tier 2** | it ran twice today by hand, identical
  shape both times.

## Bottom Line

The doors are the architecture, not an inconvenience.  A model that respects them hallucinates
less, hands off cleaner, and scales to a fleet.  The one thing to remember: when information is
missing, the correct move is a baton ask through the door, never a reach around it.

---

# 2026-07-15 | Launch Session (merge, deploy, DNS, redirect)

> Type: Session | Scope: this conversation | Author: Skippy (Claude Code) on behalf of Pierre Hulsebus

## Summary

Took FSN from "built but not shipped" to fully launched: merged the cloud e-book branch, deployed,
cut `fieldservicenerd.com` over to Firebase, and moved the `hulsebus.net` redirect.  The biggest
multiplier was multi-agent parallelism | a cloud agent's 14-commit e-book branch merged with zero
conflicts.  The biggest drag was self-inflicted: I handed Pierre admin work I could have automated,
and I asserted a wrong diagnosis from a single vantage point.

## What Shipped

- Merged `origin/build/fsn-site` (14 commits: 21-page Playbook, Six-Layer diagram, Quality Quiz,
  MEP baton) into local.  Zero conflicts.
- Deployed to Firebase Hosting.  Verified live: `/ebook/fs-ai-primer.pdf` serves the 3.6 MB,
  21-page build (3,601,780 bytes), not the old 277 KB stub.
- `fieldservicenerd.com` cut over: TXT `hosting-site=field-service-nerd` verified, apex
  `A → 199.36.158.100`, Google SSL cert issued.
- `hulsebus.net` → 301 → `fieldservicenerd.com/consulting` via the GoDaddy console, driven in
  Pierre's browser.  Email MX, SPF, and DMARC untouched.
- Ran `/vox-pierre:enforce-voice` across all site copy: 48 em-dashes to pipes.  Saved
  `.claude/brand-voice-guidelines.md` for instant reload.
- Removed KB entry points site-wide; homepage reframed to "Two signals"; community KB card swapped
  to the live YouTube show.  `web/kb.html` parked, not deleted.
- `PROJECT-RETROSPECTIVE.md` and the MEP EOL baton.

## What Worked | Keep Doing

| Pattern | Why It Worked |
|---|---|
| Merge first, then deploy once | E-book, KB removal, and the voice sweep all shipped in a single release |
| Content-length as proof | 3,601,780 bytes matched the build exactly.  No guessing whether the new PDF was live |
| Browser automation for a dead API | GoDaddy forwarding API is gone.  Driving the console finished the job anyway |
| `form_input` by ref over keystrokes | Setting the field directly worked after a keyboard approach failed |
| Diagnose before reacting | A cert read plus five edge hits correctly identified propagation, not breakage |
| Read the baton on arrival | `machines/handoff.md` handed this session a clean, accurate punch list |

## What Did Not Work | Fix or Avoid

| Anti-Pattern | Fix |
|---|---|
| Handed Pierre console steps I could automate | When the API is dead, drive his browser.  Hand over only true security gates |
| Asserted "it's your cache" from one vantage | Never name a client-side cause from a single vantage point |
| Guessed at a named visual style for three rounds | Ask for the actual reference image or link before designing |
| Substituted my own idea for the named asset | He said NERD; I built an FSN monogram.  Build exactly what was named |
| Left the scratch render server running | It later broke `preview_start` with a port conflict.  Kill it when the batch ends |
| Trusted `firebase login:list` | It reported the account while the token was already expired.  The deploy failed |
| Re-broadcast a timed-out browser pairing | Fall back to `select_browser` by deviceId instead of re-sending |

## Rules Extracted

| # | Observation | Rule | Skill Target |
|---|---|---|---|
| 1 | Pierre: "why am I doing this admin work?  You have access and can make the changes."  I had handed him GoDaddy console steps after the forwarding API 404'd. | When an API is dead or absent, default to driving the vendor console in his browser.  Never hand Pierre a step list as a first resort.  Hand over only what is cryptographically his: pairing consent, 2FA, password entry. | new: `/console-drive` |
| 2 | I told Pierre the domain failure was his browser cache.  He replied he was on another computer with the same result.  My conclusion came from one curl plus one browser. | Never assert a client-side cause (cache, DNS, local state) from a single vantage point.  Either test from an independent vantage or state it as a hypothesis, not a cause. | `domain-manager` |
| 3 | GoDaddy forwarding API returned 404 on `/forwards`, `/domains/forwards/{d}`, and `/domains/{d}/forwards/{fqdn}`.  Three attempts burned. | GoDaddy Domain Forwarding is console-only.  The DNS records API works; the forwarding API is deprecated.  Go straight to browser automation for any forwarding change. | `domain-manager` |
| 4 | `firebase login:list` printed "Logged in as pierre@nukasoft.ai" while the token was expired.  The deploy failed mid-run with an auth error and a confusing cascading assertion. | `firebase login:list` reports the stored account, not token validity.  Before a deploy sequence, verify auth with a real authenticated call (e.g. `firebase projects:list`).  Expect `--reauth` as a routine gate. | `/preflight` |
| 5 | Style direction took three rounds (Neistat, then Burke, then Chris Goor) until Pierre pasted an actual frame.  Every round before the image was a guess. | When Pierre names a style or creator, ask for the reference (image, frame, or channel link) before designing anything.  One reference beats three interpretive rounds. | `/episode-package` |
| 6 | Pierre asked for a NERD oval.  I proposed an FSN monogram avatar, then an oval with extra text, then had to come back to a NERD circle patch. | Build exactly the asset named, in the shape named, with the words named.  Propose alternatives only after the literal ask is on screen. | `/episode-package` |
| 7 | `Ctrl+A` in a browser form selected the whole page instead of the focused field, closed the modal, and cost a full cycle. | In web forms, set values with `form_input` by ref.  Never use keyboard select-all to clear a field. | new: `/console-drive` |
| 8 | I left a `python -m http.server` on 8791 after a Puppeteer render batch.  It later blocked `preview_start` with a port conflict. | Kill scratch servers when the render batch finishes.  Any port opened for a one-off render is torn down in the same step. | `webmaster` |
| 9 | The Read tool could not render PDF pages (poppler absent), so page-level verification of the 21-page e-book was impossible locally. | Verify PDFs by byte-length against the expected build plus provenance, or on the live URL.  Do not promise page-level PDF inspection on this machine. | `webmaster` |
| 10 | `check_voice` and friends were absent again.  I concluded "fourth consecutive outage, the MCP is broken."  **That was wrong**, and it repeated the exact error of rule 2: a cause asserted without evidence.  The wiki's counter-claim ("they are deferred, fetch by exact name") was also wrong.  The real cause: **`.mcp.json` is project-scoped, and `Z:\Projects\FieldService` had no `.mcp.json` at all.**  pierre-voice was registered only in `Z:\Skippy\Dev\skippy-brain\.mcp.json`, so it loads there and can never load here. | Before concluding an MCP tool is unavailable or broken, check for `.mcp.json` **in the current project root**.  A tool present in project A and absent in project B is a registration-scope fact, not an outage.  Five sessions blamed a healthy server. | `/update-config` |
| 11 | The pierre-voice server lives at an absolute path (`Z:/Skippy/Dev/skippy-brain/skills/pierre-voice/server.js`), so it is registerable from any project.  Nothing was ever broken. | **Fixed this session:** added `Z:\Projects\FieldService\.mcp.json` registering pierre-voice.  Takes effect next session (MCP servers load at startup).  Consider promoting pierre-voice to user scope so every project gets it. | `/update-config` |

## Skill / Agent Candidates

- **`/console-drive`** | Drive a vendor console in Pierre's browser when the API cannot do the job.
  In: vendor + target change.  Out: the change made and verified.  Bakes in: try the API first and
  say plainly when it is dead | `select_browser` by deviceId if the pairing broadcast times out |
  `form_input` by ref, never keyboard select-all | expect and pause only for 2FA | never hand Pierre
  a step list.  Priority: **Tier 2** (cross-signal with the standing "Pierre clicks only security
  gates" rule).

## Open Threads

- [ ] Confirm `www.fieldservicenerd.com` is registered in Firebase (redirect to root).
- [ ] Let fieldservicenerd.com edge propagation finish globally.
- [x] **Fixed:** pierre-voice MCP.  Root cause was scope, not breakage | `.mcp.json` is
      per-project and FieldService had none.  Added one registering pierre-voice; live next session.
- [ ] Consider promoting pierre-voice to **user scope** so every project inherits it, and correct
      the wiki entries that recorded five sessions of a false "MCP is broken" conclusion.
- [ ] Batch EP02 through EP10; record EP01 from the teleprompter.
- [ ] Restore the KB when content is ready (`BACKLOG.md` has the revert list).

## Bottom Line

The platform launched: e-book downloadable, site voice-clean, both domains pointing home.  The one
thing to remember: when a tool path dies, automate around it instead of handing Pierre the manual
steps.  He called that out, and he was right.

---

## What shipped

- **Live site** on Firebase Hosting (Field Manual brand, patch logo, real headshot, five pages).
- **Verified email funnel** | signup to welcome email to Google Sheet, tested in production.
- **The Field Service AI Playbook** | 21-page lead magnet, downloadable, voice-clean.
- **YouTube channel** live at @FieldServiceNerd | branding, four playlists, keyword strategy.
- **Locked brand kits** | thumbnail style, motion-graphics kit, value pills, circle/oval/patch logos.
- **EP01 fully packaged** | Pierre-voice teleprompter, upload metadata, thumbnail, shot list.
- **Domains** | fieldservicenerd.com pointed at Firebase (SSL live), hulsebus.net 301 to /consulting.

---

## What Works (keep doing)

1. **Clone proven infrastructure, do not rebuild.**  Cloning the Tech Sales 110 plumbing turned
   an estimated three days into about six hours.  This was the single biggest multiplier of the
   whole project.  Reuse the funnel, the hosting pattern, the auth.

2. **Divide content by strength: Grok interviews, Claude executes, Descript edits.**  Grok pulls
   the script out of Pierre's head.  Claude turns the finished script into assets (teleprompter,
   thumbnails, descriptions, shot lists).  Descript handles post.  Clean handoffs, no overlap.

3. **Do design R&D once, then make it mechanical.**  The thumbnail took many passes, but it
   produced a locked, reusable template.  Now a thumbnail is Script plus Title in, PNG out.  Same
   pattern won on the motion-graphics kit and the value pills.  The up-front cost buys speed forever.

4. **Value-first content wins.**  The Chris Goor rule ("Try This," not "Look at This," one specific
   question per beat) turned EP01 from a doom video into a tool the viewer leaves with.  That is
   what earns the subscribe.

5. **Voice as a saved skill plus a guidelines file.**  `/vox-pierre:enforce-voice` plus
   `.claude/brand-voice-guidelines.md` made the site copy and the scripts sound like Pierre, fast,
   and loads instantly next time.  Zero dashes, double space, contractions on.

6. **Memory, backlog, and handoff discipline.**  Nothing was lost between sessions.  The MEP baton
   (`machines/handoff.md`) let a cloud agent hand the site session a clean punch list.

7. **Multi-agent parallelism.**  A cloud agent built the entire e-book in parallel while other work
   continued, then merged into `build/fsn-site` with zero conflicts.  Parallel tracks that touch
   different files compose cleanly.

8. **Automate what APIs allow, drive the browser for what they do not.**  DNS records went through
   the GoDaddy API.  When the forwarding API turned out to be deprecated, we drove the GoDaddy
   console in Pierre's own browser.  Pierre clicked only the security gates (pairing, 2FA); the
   agent did the rest.

9. **Verify on the live artifact, never assume.**  The e-book was confirmed by content-length on
   the live PDF (3.6 MB build, not the old 277 KB stub).  The domain was checked with real edge
   hits and a cert read, which correctly diagnosed propagation lag instead of a fake "it's broken."

10. **Lead visual and terse with Pierre.**  Screenshots and mockups over walls of text.  He is
    dyslexic and design-driven; show, do not tell.

11. **Start with a local folder on the Dev Drive, then point the tools at it.**  Proven workflow.

---

## What Does Not Work (fix or avoid)

1. **Over-iterating on visuals.**  The thumbnail ran 25-plus messages.  The avatar churned through
   monogram, circle, oval, and back to circle.  Even when the iteration builds a reusable system,
   lock "good enough" in three or four passes, and check the asset at the size people actually see
   it (the 48px avatar test caught a blur late).

2. **Claude Code and Claude Design fall out of sync.**  The two tools drifted on the design system
   and forced manual terminal work.  Treat the repo as the source of truth and sync deliberately;
   do not rely on the integration staying consistent.

3. **Context switching fragments the work.**  Jumping between thumbnails, scripts, and infra made
   it harder to finish anything.  Finish one lane before opening the next.

4. **Auth and token walls break momentum.**  Firebase token expired mid-deploy, GoDaddy threw 2FA,
   browser pairing timed out twice.  These gates are unavoidable, but they cost flow.  Expect them,
   surface the one irreducible ask minimally, and never hand Pierre a wall of steps.

5. **Rushed shell one-liners ship avoidable bugs.**  An empty-pathspec `git reset` pushed an empty
   branch, a bad `sed` clobbered the favicon on four pages, and the nav once pointed at a deleted
   file.  Slow down on `sed`, `git reset`, and anything that writes in bulk.

6. **Config trusted without a second check.**  A wrong service-account client ID cost a full failed
   deploy before it was caught.  Echo-verify pasted IDs, keys, and records before acting.

7. **First-time platform gotchas hit one at a time.**  Firebase from scratch surfaced Eventarc
   propagation, a Cloud Build role, and the DWD client ID serially.  Keep a pre-flight checklist.

8. **Propagation windows look like failures.**  "Site Not Found" during Firebase edge rollout read
   as a break when the domain was actually connected (valid cert, content serving from other
   edges).  Diagnose before reacting: valid cert plus real content on some edges equals connected
   and propagating.  Explain the window up front so it does not read as broken.

9. **The handoff protocol is not auto-loaded.**  `/hello` (MEP) was not wired as a skill in the
   session, so the handoff had to be found by hand.  The baton lived in the repo; the trigger did
   not.  Wire the protocol, or state where the baton lives at session start.

---

## The Playbook (durable learnings)

- **Infrastructure:** clone, do not rebuild.
- **Design:** lock in three or four passes, build reusable kits, check at real display size.
- **Content:** Grok interviews, Claude assets, Descript edits.  "Try This," one question per beat.
- **Voice:** saved guidelines plus the enforce-voice skill.  Zero dashes, double space.
- **Ops:** local Dev Drive folder first.  Repo is the source of truth, especially against Claude
  Design.  Memory, backlog, and handoff every session.
- **Deploy and DNS:** verify on the live artifact.  The domain-manager skill owns DNS.  Browser-
  automate what the APIs cannot do.  Expect auth gates and minimize the ask.
- **Working with Pierre:** visual and terse.  He clicks the security gates; the agent does the rest.

## Bottom line

The project went from nothing to a live, branded platform with a downloadable lead magnet, a
YouTube channel, and two domains pointing home.  The wins were reuse, systematized design, and a
content pipeline that plays to each tool's strength.  The drag was over-polishing visuals and
losing momentum at auth gates.  Keep the systems, tighten the "good enough" call, and expect the
security walls instead of being surprised by them.
