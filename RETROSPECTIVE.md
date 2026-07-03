# Retrospective | Field Service Nerd Build

## Summary

In a single working session we took Field Service Nerd from cold start to live.  We cloned the proven Tech Sales 110 infrastructure instead of rebuilding, which turned an estimated three days of work into roughly six hours.  Shipped: the site (five pages, Field Manual brand, patch logo, real headshot), a verified signup to welcome email to Google Sheet funnel, the design system synced to Claude Design, and a YouTube kit (channel plan, locked thumbnail style, two episodes with thumbnails and scripts).  PR #1 is open.  The session also produced two durable process wins: a locked, systematic thumbnail pipeline, and a clear Grok plus Claude plus Descript content workflow.

## What Went Well

- **It shipped and it works.**  The live site and the signup funnel were tested in production, not assumed.
- **Reusing proven infrastructure was the biggest multiplier.**  Cloning TS110 is the main reason this was a day and not a week.
- **Branding got locked.**  Patch logo, Field Manual palette, and the safety yellow thumbnail style are final and consistent.
- **A repeatable workflow emerged.**  Start with one local folder on the Dev Drive, then point both Claude Code and Claude Cowork at it.
- **The thumbnail work paid off as a system.**  The iteration was one time R&D that produced a locked style and a reusable template.  Future thumbnails are now mechanical.
- **Nothing was lost.**  Memory, backlog, scripts, and the style guide are all captured in one clean project folder.

## What Went Poorly

- **The thumbnail took too many passes to converge** (~25 messages on one asset).  It produced a real system, but we should have recognized "good enough" sooner.
- **The Claude Code and Claude Design handoff is weak.**  The tools drifted out of sync on the design system and forced manual work in the terminal.  This was the single most cited friction of the day.
- **The conversation fragmented.**  Jumping between thumbnails, scripts, and infrastructure made it harder to stay focused.
- **Avoidable bugs shipped from rushed shell commands.**  An empty pathspec `git reset` pushed an empty branch, a bad `sed` clobbered the favicon on four pages, and the nav pointed at a deleted file.
- **Config was trusted without verification.**  A wrong service account client ID cost a full failed deploy before it was caught.

## Key Lessons Learned

- **Start every project with a local folder on the Dev Drive,** then point the tools at it.
- **Treat the repo as the source of truth for the design system.**  The Claude Design integration is weak, so sync deliberately and plan around it.
- **Lock "good enough" on visuals fast,** then move on.  Reclaimed time goes to content, which is what grows the channel.
- **Lead visual and terse,** especially given dyslexia.  Image first, short text, no walls.
- **Divide the content pipeline by strength.**  Grok runs the interview to script stage.  Claude executes the finished script into final assets.
- **Verify externally supplied values** before acting on them.
- **Run parallel work in a git worktree,** never a shared checkout.

## Recommendations for Next Time

1. **Thumbnails are now a mechanical pipeline.**  Pierre supplies Script plus Title.  Claude shortens the title to a compliant headline (two lines, seven words max, "Field Service" in orange), renders 1280x720 from `web/brand/yt-thumb-master.html` to `youtube/thumbnails/`, and shows the PNG.  Batch EP03 through EP10 in one pass.
2. **Content pipeline: Grok interviews, Claude executes.**  Grok produces the spoken script.  Claude turns it into the production package (markdown, thumbnails, video descriptions, Descript ready) and does not re-interview or regenerate the script.
3. **Build the per episode production package** to close the script to recording to Descript gap: teleprompter script, B-roll cue sheet, chapter markers, and packaging.  Prove it on one episode, then batch.
4. **Keep sessions focused.**  Finish one lane before switching.
5. **Pre-flight known platform gotchas** rather than hitting them one at a time.

## Bottom Line

A productive session that shipped a real product and, more importantly, established repeatable systems.  The thumbnail pipeline and the Grok plus Claude plus Descript workflow are the start of a genuine content flywheel.  Tomorrow: batch the remaining episodes, script by interview, and begin the domain cutover.
