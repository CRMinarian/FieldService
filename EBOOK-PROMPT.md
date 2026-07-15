# Fable Prompt | FS AI Primer → 20-Page Ultimate Guide

Paste everything below the line into a fresh Claude Code session rooted in `Z:/Projects/FieldService`, checked out on `build/fsn-site` (or after PR #1 merges, on `main`).

---

## Mission

Grow `web/ebook/fs-ai-primer.html` from its 5-chapter skeleton into the flagship Field Service Nerd lead magnet: a 20-page ebook that is the definitive guide for anyone adding AI workloads to a field service operation.  It is free, gated behind email capture, and it has to earn that email.  Working title: **"The Field Service AI Playbook | A Field Manual for Adding AI to Your Service Operation."**  Confirm or beat that title during the interview.

This book is written by Pierre Hulsebus, an operator who ran a service department for four years and now consults on Microsoft D365 Field Service implementations.  The book is **platform agnostic**: any service org on any FSM system should get full value.  Pierre's D365 depth shows up as the worked examples, the war stories, and the "here is what it actually looks like in a real deployment" sidebars.  Never let it read like Microsoft marketing.  The brand promise is the honest take.

## Read these first

1. `FIELD-SERVICE-BRIEF.md` | project ground truth.
2. `web/ebook/fs-ai-primer.html` | the existing skeleton.  Its five chapters survive into the new outline.
3. `web/brand/brand-kit.css` and `web/tokens/*.css` | Field Manual v3 design system (olive drab, weathered safety orange, bone text, Alfa Slab One wordmark, Oswald heads, Inter body).
4. `web/brand/ebook-cover.html` | the cover template.
5. `scripts/generate-ebook-pdf.js` | the Paged.js → Puppeteer PDF pipeline.  This is how the book ships.  Do not invent a new pipeline.
6. `frameworks/`, `lexicon/`, `decks/`, `references/AI_Terminology_Lexicon_Blueprint_v3_1.pdf`, `course/`, `podcast/` | supporting source material.  Use for accuracy and vocabulary, not as a substitute for the interview.
7. `references/d365-ai-screens/` | 15 real D365 Field Service screenshots extracted from Pierre's deck (the original `AI In Field Service.pptx` is in the same folder).  See "Visual assets" below for the map and the rules.
8. `Z:\Projects\_WIKI\projects\ai-in-d365-field-service.md` | **the knowledge backbone.**  Pierre's wiki page on AI in D365 Field Service: six AI capability layers, the AI governance framework (his core IP), the RSO decision framework, ROI anchors, and named proof points.  Treat this as the authoritative technical skeleton; the interview adds the stories and voice on top of it.

## The knowledge backbone | use the wiki page's structure

The wiki page defines six AI capability layers plus a governance layer.  The book's spine follows it:

- **The distinction that matters most:** batch AI (RSO) vs. real-time suggestions (Schedule Assistant) vs. generative AI (Copilot) are three different things.  Buyers conflate all three.  Making this distinction clear early is the book's biggest single service to the reader.
- **The six layers:** RSO | Connected Field Service | Copilot for Field Service | intelligent case-to-work-order routing | predictive service plans | custom agents via Copilot Studio.  These map onto the workload-map chapter.
- **Governance is the differentiator chapter.**  Pierre's three questions (alert governance, scheduling override rules, Copilot trust calibration) and his line: organizations that skip governance get AI-generated noise, not AI-generated value.  Most failed deployments fail here, not in the technology.  No competing free ebook has this chapter.
- **ROI anchors to carry into the ROI chapter:** RSO cutting drive time 20 to 40% for large teams; the "detect-before-dispatch" trap where CFS alert volume drowns dispatchers without suppression and triage rules.
- **Phasing model for the roadmap chapter:** RSO + Copilot first (fast value), CFS second (needs IoT investment), custom agents third.
- **Proof points to confirm in the interview before naming in print:** CFS on oil rigs (Exxon/XTO Titanium Award), Komatsu, Lexmark.  Ask Pierre what is public and citable vs. anonymize.

## Visual assets | the D365 screenshot library

`references/d365-ai-screens/` holds real product screenshots of AI in D365 Field Service.  These are the ebook's illustrations.  The map, by chapter:

- **Scheduling and RSO chapter:** `predictive-work-duration-dashboard.png` (predicted vs. allocated duration with confidence and prediction factors), `predictive-duration-unscheduled-requirements.png`, `rso-optimization-goal-travel-time.jpeg` (optimization objectives + travel time from historical traffic), `schedule-board-predictive-travel-1.png` and `-2.png` (same tech, same day, AI-adjusted durations and drive times).
- **Copilot and assistants chapter:** `incident-type-suggestions-setup.png`, `suggestion-work-order-product.png`, `suggestion-work-order-service.png` | the "66 of 80 work orders with this incident type also include this product" screen is the single best illustration in the library of what grounded AI suggestions look like.  Use it.
- **IoT-to-work-order chapter:** `connected-field-service-reference-architecture.png` (the full Azure IoT Hub → Stream Analytics → Service Bus → Logic Apps → D365 flow), `prioritized-iot-alerts-view.png` (AI-scored alert priority), `iot-alert-suggestions-recalibration.png` and `iot-alert-suggestions-inspect-boiler.png` (alert record with suggested priority, score, and incident type), plus the three `iot-suggestions-setup-*.png` wizard steps.

Rules for using them:

1. **Verify feature status before presenting any screen as current.**  Several of these captures are 2020-era previews.  Check Microsoft Learn for what shipped, what got renamed, and what got retired.  Where a feature died, say so | "Microsoft has been shipping AI into Field Service since 2020; some of it survived, some of it did not" is exactly the honest-take angle this book runs on.  Never present a retired preview as a feature the reader can turn on today.
2. **Crop out red annotation boxes.**  Some screenshots carry red highlight rectangles.  Pierre does not ship red.  Crop them out, or re-frame the crop so the highlight is unnecessary.
3. Screenshots go in the D365 sidebar callouts, captioned with what the reader is looking at and why it matters, not just the feature name.
4. The book must render as a PDF, so reference the images with relative paths that resolve from `web/ebook/` | copy the needed images into `web/ebook/assets/` as part of the build.

## The reader

A service leader or systems specifier in manufacturing or mechanical services.  They own trucks, techs, SLAs, and a backlog.  They are being pitched AI from every direction and cannot tell the real workloads from the demos.  They are smart, skeptical, and short on time.  They do not want a vendor pitch.  They want someone who has done the work to tell them what is real, what it costs, and what to do first.

## Step 1 | Interview Pierre first

Before writing a single page of prose, interview Pierre.  One question per message, specific, never generic.  Mine for the things only he knows:

- War stories from four years running a service department | the dispatch board disasters, the tech who gamed the system, the customer call that changed a process.
- D365 Field Service deployments he has seen succeed and fail, and the one variable that decided it.
- His honest take on Copilot in field service | where it earns its seat, where it embarrasses itself.
- Real numbers he trusts: scheduling and RSO gains, first-time-fix impact, truck-roll costs, what a wasted dispatch actually costs.
- The IoT-to-work-order pattern | a real case where it held, and one where the alerts drowned the dispatcher.
- What buyers consistently get wrong when they evaluate AI for field service.
- His hot takes | the opinions that would start an argument at a field service conference.  The book needs at least three of these.

Keep interviewing until every chapter has at least one story or number that could not have come from a Google search.  That is the bar.

## Step 2 | Lock the outline

Propose a 10-chapter outline at roughly 2 pages per chapter and get Pierre's approval before writing.  Anchor it on the existing skeleton and fill the gaps.  Suggested shape:

1. The honest state of AI in field service *(existing)*
2. The AI workload map | batch AI vs. real-time suggestions vs. generative AI, laid over the six capability layers.  This chapter kills the biggest buyer confusion first.
3. Data readiness | why your work order history matters more than the model
4. Copilot and assistants | where they earn their seat *(existing)*
5. Scheduling and RSO intelligence *(existing)* | includes the RSO vs. Schedule Assistant vs. manual decision framework
6. IoT-to-work-order | the pattern that holds *(existing)* | includes the detect-before-dispatch trap
7. Predictive maintenance without the hype | predictive service plans, and why an empty asset record makes them useless
8. AI governance | the three questions that decide whether you get value or noise.  Pierre's core IP chapter.
9. The ROI math and the first 90 days | numbers a CFO will sign, phased RSO + Copilot → CFS → custom agents
10. The buyer's checklist *(existing, expanded)*

Every chapter ends with a **"Try This"** box | one concrete action the reader can take this week with the system they already own.  Teach by invitation, not by lecture.

## Step 3 | Write the prose

Voice rules are hard requirements.  Run `check_voice` from the pierre-voice MCP server on every chapter if the tool is available.

- **No dashes.  Ever.**  No em dash, no en dash, no hyphen as a separator.  Use the pipe `|` or restructure the sentence.
- **Double space after every period.**
- Direct, punchy, active voice.  Short paragraphs.  Writes like he talks.
- Banned words: fostering, championing, leveraging, encapsulate, synergistic, thought leader, visionary, passionate, dynamic, innovative solutions, transformative, robust, cutting-edge, at the intersection of.
- Keep Pierre's spellings: `catalogue`, `thru`.
- Skeptical-operator stance throughout.  Name what does not work.  The credibility of the whole book rests on the honest chapters.
- D365 examples appear as clearly labeled sidebars or callouts ("From a real D365 deployment:") so agnostic readers never feel sold to.

## Step 4 | Build and verify

1. Write the full prose into `web/ebook/fs-ai-primer.html` using the existing Paged.js structure and Field Manual v3 tokens.  Part tags (FSN-001 style), stencil rules, and one "APPROVED FOR FIELD USE" stamp are on brand.  **No red text anywhere.**
2. Update the cover from `web/brand/ebook-cover.html` with the final title.
3. Run `node scripts/generate-ebook-pdf.js` and confirm the PDF lands at 20 pages, plus or minus 2.  If it runs long, cut prose before shrinking type.
4. Open the PDF and visually check: no orphaned headings, no broken "Try This" boxes across page breaks, cover renders, page numbers present.
5. Last page: a soft CTA back to fieldservicenerd.com and the consulting track.  One page maximum, no hard sell.

## Definition of done

- Interview completed and every chapter carries at least one Pierre-only story, number, or hot take.
- Outline approved by Pierre before drafting; final prose approved by Pierre before the PDF is called final.
- `fs-ai-primer.pdf` regenerated at ~20 pages in Field Manual v3, voice-clean, zero dashes, no red text.
- Committed on a branch with a PR against `build/fsn-site` (or `main` if merged), not pushed to main directly.
