# Field Service Nerd | Project Retrospective

A working retrospective on the whole build, kept so we retain the learnings.  Covers the arc
from cold start to live launch (site, email funnel, e-book, YouTube channel, brand, voice,
domains).  For the single day-one session write-up, see `RETROSPECTIVE.md`.

Last updated 2026-07-15.

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
