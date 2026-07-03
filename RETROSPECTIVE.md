# Retrospective — Field Service Nerd build (2026-07-03)

Two perspectives folded in: Claude's self-review and Gronk's session feedback. Both landed on the
same biggest problem — **the thumbnail phase burned too much time.**

**Shipped today (cold start → live):** the site (5 pages, Field Manual brand, patch logo, real
headshot), a verified signup → welcome-email → Google Sheet funnel, the design system synced to
Claude Design, and a YouTube kit (channel plan, locked thumbnail style, EP01+EP02 thumbnails +
scripts). PR #1 open.

---

## What went well
- **It shipped and it works.** Live site, funnel verified in production — not assumed, tested.
- **Reused proven infrastructure** (TS110) instead of architecting fresh. The main reason this
  was a day, not a week.
- **The visual-iteration rhythm** — once going, thumbnails moved fast and produced genuinely
  distinctive work (patch logo, final thumbnail).
- **Pierre's direction was crisp** — clear "this looks generic" calls, and he caught the rule
  Claude missed: **"Field Service" must be in every headline.**
- **The "interview me" approach for scripts clicked** (Gronk) — Pierre talking naturally, turned
  into script quickly. Far smoother than generating cold.
- **Nothing's lost** — memory, backlog, scripts, style guide, PR all captured.

## What went poorly
- **The thumbnail was over-cooked.** ~25+ messages iterating on essentially one asset. "Good
  enough" should have been locked far earlier so the time went to actual video content. This was
  the single biggest self-inflicted slowdown of the day. (Both retros agree.)
- **Claude drowned Pierre in text** — repeatedly, to a dyslexic user, *after* being told to go
  visual. Worst recurring failure.
- **Claude narrated limitations instead of solving** — on the design-sync login wall, handed over
  commands and explained what it couldn't do for several rounds before just launching the session.
- **The conversation got fragmented** (Gronk) — jumping between thumbnail feedback, scripts, and
  side topics made it hard to stay focused.
- **Avoidable bugs shipped:** an empty-pathspec `git reset` pushed an empty branch; a bad `sed`
  (`\&`) clobbered the favicon on four pages; the nav pointed at a just-deleted file.
- **Config trusted without verification** — the wrong service-account client ID (`111860…`) cost a
  full failed deploy + propagation wait before it was caught as the wrong account.
- **Firebase deploy was reactive** — Eventarc propagation, Cloud Build role, Token Creator grant,
  function-shape conflict discovered serially instead of pre-flighted.
- **Two Claude sessions in one repo** created collision risk and confusion over whose edits were whose.

## Key lessons learned
- **Lock "good enough" on visuals fast.** Design is iterative, but 3–4 passes max, then move on.
  Time saved goes to content, which is what actually grows the channel.
- **Default to visual + terse** with this user — image first, ≤3 lines of text, no walls.
- **"Interview me" beats "generate cold"** for content. Pull the material out of Pierre by talking.
- **When blocked, exhaust what's doable before surfacing an ask;** never lead with a command.
- **Verify externally-supplied values** (IDs, keys) against a second source before acting.
- **Pre-flight known platform gotchas** instead of hitting them one at a time.
- **One agent per working tree.**

## Recommendations for next time
1. **Batch EP03–EP10 thumbnails in ONE pass** — style's locked, it's mechanical. No per-thumbnail
   round trips.
2. **Script via interview.** Claude asks Pierre questions on camera-topic; Pierre talks; Claude
   drafts. Don't paste cold-generated scripts.
3. **Keep sessions focused** — finish a lane (thumbnails, or scripts, or infra) before switching.
4. **Firebase-from-scratch pre-flight checklist** (before first deploy): enable cloudbuild +
   eventarc + run + iamcredentials + gmail/sheets/drive; grant the compute SA **Cloud Build Service
   Account** + **Token Creator**; confirm the DWD client ID = the **compute SA's** unique ID.
5. **Echo-verify pasted config** before running with it.
6. **Second parallel session → use a git worktree,** never the same checkout.

## Bottom line
Productive day — a real product shipped. But too much time went into polishing one thumbnail.
Tomorrow: be stricter about "good enough" on visuals, and spend the reclaimed time on the actual
video content via interviews.
