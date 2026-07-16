# EP02 — What I Wish I Knew Before My First Field Service Project

- **Playlist:** From The Field
- **Target length:** ~13–14 minutes
- **Launch:** Week 2 (Tue Jul 28, 10:00 AM ET) — see `social/CONTENT-CALENDAR.md`
- **Thumbnail:** `youtube/thumbnails/ep02-what-i-wish-i-knew.png` (two-line headline)
- **Teleprompter (record from this):** `youtube/scripts/ep02-teleprompter.md`

---

## Production Package (upload metadata)

**Title:** What I Wish I Knew Before My First Field Service Project

**Description:**
```
I've done over 30 Dynamics 365 Field Service implementations.  I did it wrong the first six times.  These are the five things I wish someone had told me before my very first project.

Real lessons from the field: documenting processes with AI, the data quality that makes or breaks your KPIs, why Field Service change management is nothing like ERP, the RSO mistake that costs the most, and how to pick a partner in a channel being disrupted by AI.

CHAPTERS
0:00 I did it wrong the first six times
2:00 #1 Document your processes first (with AI now)
4:30 #2 Data quality is everything
7:00 #3 Change management is not optional
9:30 #4 Don't turn on RSO too early
11:30 #5 Choose your partner wisely
13:30 Your challenge this week

New video every Tuesday.  Subscribe for no-BS Field Service content.

Free 21-page Field Service AI Playbook: https://fieldservicenerd.com
Stuck on an implementation? https://fieldservicenerd.com/consulting
LinkedIn: https://linkedin.com/in/nukasoft

#Dynamics365 #FieldService #D365
```
*(Chapter times from the outline — adjust to the final cut; first stays 0:00.)*

**Tags:** Dynamics 365 Field Service, D365 Field Service, field service implementation, field service management, field service best practices, RSO, Resource Scheduling Optimization, change management, data quality, field service KPIs, implementation partner, Microsoft Dynamics 365, Field Service Nerd, Pierre Hulsebus

**Pinned comment:** Which of the five made you wince | process docs, data, change management, RSO, or your partner?  Drop it below.  I read every one.

**Shorts to cut (Wed + Fri per the calendar):**
1. "Your technicians will game whatever you measure" (Point 2, ~45s)
2. "RSO is not a magic button" (Point 4, ~45s | doubles as the EP03 teaser)

---

## Hook (0:00–0:20)
> "I've done over 30 Field Service implementations in my career… and I can tell you honestly — I did it wrong the first six times. Here are the things I really wish someone had told me before I started my very first project."

## Structure
1. Document Your Processes First — 2:00–4:30
2. Data Quality is Everything — 4:30–7:00
3. Change Management is Not Optional — 7:00–9:30
4. Don't Turn On RSO Too Early — 9:30–11:30
5. Choose Your Partner Wisely — 11:30–13:30
6. Closing + CTA — 13:30–end

---

## Point 1 · Document Your Processes First (2:00–4:30)
> "The very first thing I wish someone had told me is this: you must document your processes before you ever touch the software.
>
> Back in the day, we used to do what we called 'ride-alongs' or envisioning workshops. We'd interview people, map out how they actually work, and help them define what the future should look like. That process wasn't just about documentation — it was about building consensus and understanding how people felt about their jobs.
>
> Here's what's changed: You can now do a much more powerful version of this with AI.
>
> If you have existing Standard Operating Procedures, upload them to SharePoint or Teams and have an agent compare them directly to Microsoft's official Business Process Catalog for Field Service. It'll give you a gap-fit analysis in hours instead of weeks.
>
> Even if you don't have documentation, you can run a few workshops, record the meetings, transcribe them, and drop all those transcripts into SharePoint. Then you can literally ask AI to 'create standard operating procedures based on these conversations and tell me the sentiment in the room.'
>
> That whole process is now both a technical exercise and a team-building exercise."

## Point 2 · Data Quality is Everything (4:30–7:00)
> "Second thing I wish I knew: Data quality is everything.
>
> If you want to actually measure whether your Field Service implementation is successful, you need good KPIs — things like First Time Fix Rate, Mean Time Between Failures, and utilization. But KPIs are worthless without clean, consistent data.
>
> The biggest mistake I see is companies not taking data quality seriously enough. You can easily waste 10% of your technicians' time just because of bad processes and bad data.
>
> Here's the key: Don't start by picking KPIs. Start by deciding what business outcomes you actually want, then figure out which KPIs will tell you if you're getting those outcomes.
>
> Once you start measuring something, people will manage to it. So you have to choose your metrics carefully. Report the positive things you want to encourage, and one or two negative things you want to stop — like returns, complaints, or low CSAT scores.
>
> And here's something important: your technicians are smart. They will game whatever you measure. So choose your KPIs wisely.
>
> The good news is Microsoft Dynamics has a semantic data layer built in. If you shape your data correctly from day one, you get much better insights automatically. Even if you have to pull some data from ERP systems, starting with clean data makes a massive difference.
>
> Bottom line: Good data isn't nice to have — it's the foundation of whether your entire implementation succeeds or fails."

## Point 3 · Change Management is Not Optional (7:00–9:30)
> "The hardest part of any Field Service implementation isn't the technology — it's change management.
>
> One of the biggest mistakes people make is treating a Field Service implementation like an ERP project. With ERP, you can do a big bang cutover over a weekend. Field Service doesn't work that way. You're running a live service business every single day while trying to change it.
>
> Too often, the project is driven by IT and senior leadership, with very few actual service people in the room making decisions. Then they build this beautiful new system and try to roll it out all at once to the technicians and dispatchers.
>
> That almost never goes well.
>
> My strong recommendation is to use a pod approach — start small with a pilot team, give them new tools and processes, and let them prove it works. When that pod starts outperforming the old way, the rest of the organization sees the results with their own eyes.
>
> You can also start from the bottom up — find the old, painful processes that nobody likes doing anymore and fix those first. Or start with your maintenance-heavy work, because new technicians don't want those jobs anyway, but your experienced guys can optimize them beautifully.
>
> The key is this: real change happens in small, measured steps with visible wins — not in one giant rip-and-replace."

## Point 4 · Don't Turn On RSO Too Early (9:30–11:30)
> "Number four is one of the most expensive mistakes I see companies make: turning on Resource Scheduling Optimization (RSO) way too early.
>
> Here's the truth — scheduling is incredibly complex, and most people dramatically underestimate just how complex it is. RSO isn't a simple checkbox. It's a completely different way of doing scheduling.
>
> Most dispatchers are rightfully skeptical of it because it threatens their expertise, and the system is non-deterministic — it gives you different results every time you run it. That's very hard for people to trust.
>
> The biggest mistake is treating RSO like a magic button. You cannot just flip it on. If your underlying data isn't clean, your processes aren't solid, and your team doesn't understand the economics of scheduling, RSO will make your problems worse, not better.
>
> This is actually such an important topic that I'm going to do a full dedicated video just on the economics of scheduling and how to properly prepare for RSO." *(→ EP03)*

## Point 5 · Choose Your Partner Wisely (11:30–13:30)
> "Finally, number five — choose your implementation partner very carefully. This is more important now than it's ever been.
>
> Here's the reality in 2026: The partner channel is going through massive disruption because of AI. Things that used to take months can now be done much faster — especially discovery, documentation, and data work. This is creating real pressure on the big partners, especially the publicly traded ones.
>
> Because of this, I'm seeing extremely high turnover on delivery teams. You cannot assume the people who start your project will be there when it ends.
>
> My advice is this:
> Don't lock yourself into one big long-term contract with a single partner. Consider a tiered approach. Bring in a highly experienced person (an MVP or senior consultant) to guide the strategy and act as a bridge. Then be willing to use multiple partners for different phases of the project.
>
> Most importantly — focus on who is actually going to be doing the work, not just the company name. Ask hard questions about team continuity, knowledge handoff, and how they plan to keep the same people on your project from beginning to end.
>
> Because right now, the power in the partner ecosystem is shifting back toward the customer."

## Closing (13:30–end)
> "Those are the five things I wish I knew before my very first Field Service project.
>
> If you're about to start a Field Service implementation, or you're in the middle of one right now and things feel off, drop a comment below. I read every single one.
>
> If this video helped you, hit the like button — it really helps the channel grow.
>
> And if you want more no-BS Field Service content, subscribe and hit the bell. I'm just getting started.
>
> Thanks for watching. I'll see you in the next one."
