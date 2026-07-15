# Ebook Interview Notes | Pierre Hulsebus

Raw capture from the content interview.  Source of truth for the Pierre-only stories and numbers in the prose.  Do not publish verbatim | these get shaped in the chapters.

---

## Q1 | Worst week on the dispatch board (1990s service department)

**Setting:** ~15 technicians and installers, computer networks + bank systems, across three states.  1990s.

**Three fires in one week:**

1. **The destroyed laptop.**  A technician broke a customer's laptop and the hard drive inside it.  Dealt with the customer anger (rightful), paid for data recovery and shipping to recovery sites.  Response: instituted a non-destructive inspection protocol and handling rules for technicians.
2. **The crushed pallet.**  A hi-lo driver backed into a pallet of ~30 computers | roughly $100,000 of hardware.  Every unit had to be unboxed, powered on, and set up ahead of schedule to avoid filing blind claims.  About 20% were bad.  Ate about a week of scheduled capacity.  Pure firefighting; nothing preventable about it.
3. **The licensing gap that became a product.**  The architected solution used telnet over TCP/IP to mainframe terminals (not common in the 90s).  The Hummingbird / Attachmate style gateway apps were not licensed for resale on the deal.  Became early adopters of open source telnet apps on Windows for mainframe green-screen access, packaged it, and sold it as a service | eliminating the need for high-end terminal applications.

**Impact:** scheduling was disrupted for the next three weeks.

**The lesson (chapter thesis material):** in one week your plan can go sideways through zero fault of your own.  Dispatch and management can have everything set up right, and it does not matter.  If the org has no spare capacity for emergencies and unplanned slippage, it breaks.  As director, the save was stepping in and adding resources during the firefighting.

**Book placement:**
- Chapter 1 (honest state) | the chaos predates AI; AI does not remove it.
- Scheduling/RSO chapter | the case against tuning AI schedulers to max utilization.  An optimizer with zero slack is one hi-lo driver away from three weeks of chaos.  Pairs with TSIA's utilization caution from the benchmark doc.

---

## Q2 | The one variable | a deployment that worked, one that failed

### Success: Japanese mining equipment manufacturer (multi-country deployment)

**The variable that decided it: senior leadership alignment.**  Japanese business culture | senior leaders set pace, tone, direction; enforced through consensus with real pressure from the top to align.

**The signature insight: jobs to be scheduled vs. jobs to be done.**
- Scheduling engines are great at getting people from one place to another.  They are bad at managing the technician's time once on site | the work breakdown structure, the assets, the tasks, the standard operating procedures.
- Most FSM products treat on-site execution as the secondary piece.  Getting a person to the site is treated as the job.  It is not.  The job is the job.
- The deployment initially optimized for time on task, not for the tasks to be done.  That was the wrong target.

**The language dimension:** nine languages.  Not all technical manuals translated into all of them.  Real maintenance crews mixed technicians from Japan, the US, and the target country, bridging the language gap by standing around the official manufacturer documentation together.
- Fix: the system was changed to track technician language AND location language needs, with manuals portable and **on-device for every language potentially needed at a site | fully offline, because the job site is a mine with no internet.**
- AI was genuinely useful for translating the manuals.

**The AI caution:** AI can overbuild capacity and schedule too tight, with no allowance for the variability in a technician's real day.

**Book placement:** scheduling chapter (jobs to be scheduled vs. jobs to be done framework), data-readiness chapter (manuals/knowledge as deployment-critical data), Copilot chapter (translation as an unglamorous win), honest-state chapter (leadership alignment as the real success variable).

### Failure: propane delivery company (fuel delivery, tank inspections, tank installs)

**The variable that decided it: dispatcher trust.**
- Customer's scheduling world was spreadsheets.  They never got their heads around RSO.
- The project team fell in love with RSO and built a sophisticated system | nine scheduling rule sets enforced across the service lines of business.
- **On paper it beat the human dispatchers' schedule every single day.  The dispatchers did not trust it, would not try it at scale, and the project fell apart after nine months.**
- Compounding factor: the RSO UI made it very hard to show "their schedule vs. our schedule" side by side, so proving the ROI to the people who needed convincing was nearly impossible.

**The lesson: do the hard thing first.**  The team followed the standard best practice | defer RSO until everything else is configured.  That sequencing sank the project: the highest-value, highest-complexity piece arrived last, with no user buy-in built, and became the blocker that killed nine months of work.  The value was never in travel time math.  It was in whether users trusted the output.

**Book placement:** governance chapter (trust calibration is Pierre's third governance question | this is its story), roadmap chapter (nuance the phasing model: phase the tech, but socialize the hard thing from day one), honest-state chapter.

---

## Q3 | Copilot honest take

**The quotable frame: "Copilot in field service has been a great conference room pilot demo."**  Microsoft keeps iterating on field feedback, and the investment is real.  But it is not the hottest thing yet.

**Why it underdelivers today:**
- It is a standalone assistant talking to one application.  It lacks the context of everything else in a technician's life: email, what is next on the schedule after this job, "do I have all the stuff I need to get this done," "what is the first and most important thing on this job."  Those are the questions a technician actually needs answered.
- Within its own context it does pretty good.  The gap is the surrounding context, not the model.
- Architecture concern: Copilot skills have to be deployed deterministically | prompts structured to pass values in so the fetching works.  That is a decision-tree model, decision trees do not scale, and LLMs are a better fit than the rigid skill-plumbing pattern.  A boatload of challenges lives there.
- **The job site is not a conference room:** audio output is a real problem.  A technician wearing a helmet needs a headset to hear Copilot | that is a safety hazard.  Workplace environmental constraints (noise, gloves, hardware the assistant runs on) are unaddressed.

**Book placement:** Copilot chapter is built on this | the conference-room-vs-job-site frame, the context gap as the real limitation, and the field-conditions sidebar.  Also feeds the workload-map chapter (assistive AI is only as good as the context it can see).

---

## Q4 | The numbers and the economics he defends across a table

### The Permian Basin | windshield time as a safety and money problem

- In the Permian Basin oil counties of Texas, truck traffic runs around 70% of road traffic and accounts for a huge share of highway deaths (Pierre cites ~40%).  **[VERIFY exact statistics against TxDOT / published sources before print | Pierre invited the fact-check.]**
- The under-told reason: many field workers are not classified as drivers, so they are exempt from DOT hours rules.  People drive after 13-hour shifts.  Accidents come from inattention and fatigue, not just road conditions.
- Business miles are more dangerous and more expensive than personal miles.
- **A 10% reduction in driving time is the number to shoot for** | it is a large amount of money, a real risk reduction, and converts directly to wrench time revenue.

### The Domino's Pizza economics (signature IP for the ROI chapter)

- Delivery cost is baked into the price of every quoted job, the way the ~$2 delivery cost is buried in the P&L of a $15 pizza.  Domino's rarely gets to deliver two pizzas in one run | which is why they experiment with trucks full of hot pizzas | because a second order on the same drive is nearly pure profit.
- **RSO's under-appreciated win is not cutting drive time.  It is work density:** finding the low-priority maintenance work order 10 miles away instead of driving 60 to the next scheduled job.  The customer already paid for the drive when the job was quoted.  Filling the nearby slot means **the technician drives for free.**
- The framing everyone misses: it is not just "five work orders a day instead of four."  That marginal, drive-free work order may be **the most profitable work the company can do.**

**Book placement:** ROI chapter opens with the pizza economics.  Scheduling chapter gets the density argument (RSO finds free trips, not just shorter ones).  Honest-state or governance chapter gets the Permian safety angle | AI scheduling as a safety intervention, not just a cost lever.

---

## Q5 | IoT-to-work-order | where it held and where it drowned

### Where it held: ATM servicing, UAE

- Customer services ATMs across the UAE; IoT device inside each ATM pings when it needs a refill or service.  Detect-before-dispatch working as designed.
- Pierre believes the company is "Swift" (or similar) and that it is a **public reference on their website and Microsoft's.  [VERIFY the exact company name and the public case study before naming in print.]**

### Where it drowned: self-serve propane and natural gas filling stations (clean energy customer)

- Unstaffed self-serve fueling sites.  IoT sensors watch for leaks and hazards.  Regulatory/SLA reality: if there is a leak or danger signal, a technician must be on site within a defined time window to remediate.
- **The failure mode: a power outage in an area knocks out site connectivity, and the dispatch board floods with identical "cannot ping the location" errors.**  That one alert signature means one of two things: the station is on fire, or the site lost internet for 20 to 30 minutes while happy customers pump gas.  Without connectivity you literally cannot tell drop-everything hazard from transient noise.  It happened more than once.
- **The fix was not more AI.  It was out-of-band eyes:** solar-and-battery powered cameras with LTE connections on a *different carrier* | deliberately NOT integrated into Dynamics, generating no telemetry.  Just a way for a human to look at the site before dispatching.  Physical diversity for mission-critical monitoring | a discipline Pierre learned at AT&T.

**Book placement:** IoT-to-work-order chapter carries both.  The trap story is the governance chapter's alert-triage question made concrete: the answer to "who has authority to dismiss an alert" starts with "can you even verify what the alert means."  The out-of-band camera fix is a Try This candidate.

---

## Q6 | The hot takes

### A. "The mortgage you pay is the moat." (build-vs-buy | the custom agents chapter)

- Agentic AI partners want to rebuild field service with an LLM in the middle.  Look at the scheduling schema for five minutes: it is not two tables and a query away.  That is a gross oversimplification of what they are proposing to replace.
- What the Microsoft / Salesforce "mortgage" actually buys: security infrastructure, multi-language deployment at scale, auditing, mobile device management, and a roadmap backed by millions in committed development.  Nearly impossible to rebuild from scratch with Codex or Claude and then support for the long run.
- The moat runs both directions: it keeps you as a customer (the gilded cage | Pierre's phrase), AND it protects your business.  Your data sits in a sovereign cloud.  **You are not training OpenAI or Anthropic how to run your service business.**
- SaaS has survived because it is the fastest way to see value today.
- Second layer: dispatchers and owners in growth mode do not yet know enough about scheduling optimization as it applies to their own business.  They know how to fix and install what they build; they do not know how to use the same resources to do more work in their customer base.

### B. The technician's happy path: show up, do the work, go home. (the book's North Star)

- A technician's best day: leave home, wrench time on a job site, go home.  No meetings, no phone calls, no emails.  The last person they want to hear from is admin, billing, scheduling, or anyone asking about next week Tuesday.
- The people interrupting them ARE the dispatchers, IT, and administration | different happy paths, competing interests.
- **Everything a field service deployment does that is not focused on wrench time and the on-stage event with the customer is where the friction comes from.**
- These companies run a safety culture: meetings open and close with safety talks, they back into parking spots, they cone their own lot.  IT and service management have no equivalent single-focus culture.  Vendors walk into that safety culture as foreigners speaking LLM and data-governance.  The lack of common ground is a humongous barrier.
- **The real benchmark of a deployment: does it make the technician's job easier.**

### C. Pierre's refined five (his own edit pass | language to calibrate in draft; keep the edge, profanity decision at prose approval)

1. **Physical diversity beats elegant digital governance.**  One alert signature, two truths (fire or dropped ping).  The fix was out-of-band cameras on a different carrier, not more AI.  Most teams throw AI at symptoms instead of engineering for ambiguity.
2. **Copilot is a great conference room pilot demo.**  Shines when the sales engineer controls the room and the data is pristine.  On a truck at 2pm with dirty work order history and a stressed dispatcher, it is expensive autocomplete that confidently hallucinates SLAs.  Stop selling the demo as the product.
3. **Do the hard thing first.**  "Start with low-hanging fruit and build momentum" is how the propane project died: easy stuff first, momentum faded, stakeholders lost faith, the hard foundational piece arrived last and torpedoed nine months.  Eat the biggest risk on day one.
4. **Dispatchers are not the problem | they are the last line of defense** against bad data and over-engineered AI.  The best dispatchers do heroic manual overrides every shift because the optimization is garbage and the data lies.  Stop trying to automate them out; build tools that make them 10x faster.  Remove the human override and SLA compliance dies.
5. **Most "mature" D365 Field Service implementations are theater.**  Half the orgs run spreadsheets next to the fancy dashboard because out-of-box scheduling cannot handle real constraints: certifications, traffic, customer politics.  True maturity is ruthless simplification.  Connected field service is 80% change management and 20% tech.

**Book placement:** the moat take anchors the custom-agents / build-vs-buy chapter.  The happy path anchors chapter 1 and recurs as the book's yardstick.  Takes 1 to 5 distribute across their chapters (IoT, Copilot, roadmap, scheduling/governance, honest state).

---

## Q7 | Locked production decisions

1. **Title:** "The Field Service AI Playbook | A Field Manual for Adding AI to Your Service Operation."  LOCKED.
2. **Naming: anonymize every story.**  Pierre has NDAs with 3 more years to run.  All war stories run as "a mining equipment manufacturer," "a propane distributor," "an ATM servicing company in the Gulf," etc.  **Add a References section** at the back citing case studies and customer stories *as published by Microsoft* (public material only) plus the benchmark sources (Aquant, Geotab, IBM, TSIA, McKinsey).  The public citations carry the names; Pierre's stories carry the truth.  Never connect a named public case study to a Pierre story in a way that implies he worked on it.
3. **Language:** full edge, zero profanity.

---

## Q8 | Post-draft revision: the Work Order Cosmo Quiz (Pierre's annotation on the PDF)

- The chapter 03 scoring exercise is now a **named framework: the Work Order Cosmo Quiz.**  Three measures (real problem description, real resolution notes, correct asset attached), **0 to 3 points apiece**, so every work order scores on a roughly 10-point scale.  Quiz-style verdicts: 8 or 9 frame it, 5 to 7 coaching fixes it, 4 or under the AI is reading a blank page.  Rank the sample; the best-to-worst spread points at which crews, forms, and incident types to fix first.
- **Agent idea (Pierre: "This would be a good Agent to Build"):** a daily agent that inspects every closed work order, scores it on the quiz, and trends the number over time.  Closure discipline becomes a dashboard.  Baked into the book as the reader's ideal first custom agent (layer six).  Candidate FSN build: content asset + consulting deliverable + possible product.
