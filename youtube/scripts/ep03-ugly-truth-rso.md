# EP03 | The Ugly Truth About Resource Scheduling Optimization (RSO)

- **Status: DRAFT FOR PIERRE'S ANNOTATION** | war-story slots marked `[YOUR STORY]`.  The iPad
  pass replaces the Grok interview for this one.
- **Playlist:** Fundamentals
- **Target length:** ~14 minutes
- **Launch:** Week 3 (Tue Aug 4, 10:00 AM ET)
- **Thumbnail:** from master template | headline idea: `The Ugly Truth` + orange `Field Service
  Scheduling` (2 lines, 7 words | render at package time)
- **Feature claims verified** against `references/d365-ai-feature-status-2026.md` (RSO GA and
  actively updated; Scheduling Operations Agent is a complement, still preview; RSO Power BI
  reports retired Aug 2025 toward Fabric; historical-traffic travel time is an RSO goal option).

---

## COLD OPEN  *(to camera)*

Last week I told you the most expensive mistake in Field Service is turning on RSO too early.
This week I owe you the full story.

`[SKY: THE UGLY TRUTH]`

Resource Scheduling Optimization is real, it's powerful, and it's the single most
misunderstood thing in Dynamics 365 Field Service.  Most companies buy it as a magic button.
It is not a magic button.  It's an economics engine, and if you don't understand the economics,
it will optimize you straight into a wall.

I'm Pierre Hulsebus.  Forty years in this industry, and I've watched RSO save companies
millions, and I've watched it get switched off in week two.  Both for the same reason.  Let's
get into it.

`[TITLE]`

---

## PART 1  `[PILL: 1 · What RSO actually is (and is not)]`

First, let's get the definitions straight, because Microsoft gives you three different
scheduling tools and people mix them up constantly.

The schedule board is manual.  A human drags work onto people.

The Schedule Assistant is semi automated.  A dispatcher picks one job, and the system suggests
who could do it and when.  One job at a time, human in charge.  It ships with the product, and
it's where most companies should live for a long while.

RSO is the third thing, and it's a different animal entirely.  It's a paid add on that takes
whole batches of work orders, whole territories, whole days, and reshuffles all of it against
goals you define.  Minimize travel.  Maximize utilization.  Honor skills and priorities.  It
runs on a schedule, it moves things a human never touched, and it does it at a scale no
dispatcher can match.

That's the power.  And that's also the problem.  Because you just handed the keys to an engine,
and the engine only knows what you told it.

`[YOUR STORY: a moment a customer confused Schedule Assistant with RSO, or bought RSO thinking
it was a checkbox | 30-60 seconds]`

---

## PART 2  `[PILL: 2 · The economics of scheduling]`

Here's the part nobody explains.  Scheduling is an economics problem, not a software problem.

Every schedule is a pile of costs and a pile of value.  A truck roll costs real money.  An hour
of windshield time costs real money.  An expired SLA costs real money and a customer.  And a
technician's day only holds so many hours.  A schedule is just how you spend those hours.

When a human dispatcher builds the schedule, they're doing economics in their head.  They know
Jimmy hates the north route.  They know the hospital job always runs long.  They know which
customer screams the loudest.  That knowledge is real, and it's also invisible, and it walks
out the door when the dispatcher does.

RSO does the same economics explicitly.  Travel time, work time, skills, priorities, SLAs, all
weighted in goals you configure.  It'll even use historical traffic data on travel time if you
turn that goal on.

So here's the question that decides everything.  Can you write down what a good day looks like?
Because if you can't define it, the engine can't optimize for it.  RSO doesn't fail because the
math is wrong.  It fails because nobody in the building agreed on what "best schedule" means
before they turned on a machine that delivers exactly what you asked for.

`[YOUR STORY: your economics framing | the numbers you use to show what one optimized hour or
mile is worth across a fleet | this is the segment your EP02 teaser promised]`

---

## PART 3  `[PILL: 3 · Why your dispatchers don't trust it]`

Now the human part.  Your dispatchers will not trust RSO on day one, and honestly, they
shouldn't.

First, it threatens their expertise.  Everything they know about Jimmy and the north route,
the system doesn't know unless somebody encoded it.  When the engine produces a schedule that
ignores all of that invisible knowledge, they're not wrong to call it dumb.  They're early.

Second, RSO is non deterministic.  Run it twice, and you can get two different answers, both
technically great.  Humans hate that.  A dispatcher wants to know WHY Jimmy got moved, and
"the optimizer found a better global solution" is not an answer a human accepts at 7 AM with
trucks rolling.

So you don't win trust with a rollout email.  You win it the same way I told you last week
with the pod approach.  Run RSO on one territory.  Let the dispatchers compare its schedule to
theirs.  Let them catch its dumb moves, and encode what they know into the rules.  The day a
dispatcher says "huh, I wouldn't have found that," you've turned the corner.

`[YOUR STORY: a dispatcher who fought it and came around, or one who never did | 45-90 seconds]`

---

## PART 4  `[PILL: 4 · Are you actually ready?  The checklist]`

So how do you know you're ready?  Four questions.  Try these against your own operation.

One.  Can your team schedule a good day by hand?  If humans can't do it manually, the engine
can't do it for you.  You can't automate a process you can't perform.

Two.  Would you bet money on your data?  Skills, certifications, territories, service
durations, addresses.  RSO consumes all of it.  Garbage in, optimized garbage out, at scale,
automatically, every night.

Three.  Have you written down your goals and their order?  Travel versus utilization versus
SLA.  If leadership hasn't agreed on the tradeoffs, the fight just moves inside the software.

Four.  Do you have a scoreboard?  You need before-and-after numbers.  Miles per work order.
Jobs per tech per day.  First time fix.  And a heads up: the old RSO Power BI reports were
retired in twenty twenty five, so plan your measurement in Fabric or your own reporting.  No
scoreboard, no proof, and no proof means the first loud complaint kills the project.

`[PILLS check off as answered: BY HAND? · DATA? · GOALS? · SCOREBOARD?]`

---

## PART 5  `[PILL: 5 · When RSO actually pays]`

So when is it worth it?  Because it genuinely is, for the right operation.

RSO pays when the scale is real.  Dozens of techs and hundreds of daily work orders, where a
few percent of travel time is real money.  It pays when the work is dense enough that
reshuffling matters.  It pays when SLAs genuinely force sequencing that humans struggle to
juggle.  And it pays AFTER Schedule Assistant has already made your dispatchers comfortable
letting the system suggest.

And a current note, mid twenty twenty six.  RSO is GA and actively updated, and Microsoft is
building a Scheduling Operations Agent alongside it.  That agent is a complement to RSO, and
it's still in preview.  So don't let anyone tell you RSO is legacy, and don't bet your
rollout on the preview agent either.  The engine is the workhorse.  It just needs a fed,
watered, and honest operation underneath it.

`[YOUR STORY: the win | the deployment where RSO earned real money, with the number if you can
say it | 60 seconds]`

---

## CLOSE / CTA

So here's the ugly truth in one line.  RSO works.  It's your operation that has to be ready.

`[PILL HEADER: THIS WEEK]  [PILL: Ask the four questions.  Out loud.]`

Your challenge this week.  Take the four readiness questions, by hand, data, goals,
scoreboard, and ask them in your next ops meeting.  Out loud.  Then come back and tell me in
the comments which one made the room go quiet.  I read every single one.

If this helped, hit like, and subscribe for the no BS version of Field Service.  Next week:
Copilot in Field Service.  The honest review.  What's real, what's preview, and what quietly
got killed.

Have a super day.  I'll see you in the next one.

---

## Upload metadata (draft | finalize at package time)
- **Title:** The Ugly Truth About Field Service Scheduling (RSO)
- **Chapters:** 0:00 Not a magic button · 1:30 The three scheduling tools · 4:00 The economics
  of scheduling · 7:00 Why dispatchers don't trust it · 9:30 The readiness checklist · 12:00
  When RSO actually pays · 13:30 Your challenge
- **Pinned comment:** Which readiness question made the room go quiet | by hand, data, goals,
  or scoreboard?  I read every one.
- **Shorts:** "RSO is not a magic button" (Part 1) · "Run it twice, two different answers" (Part 3)
