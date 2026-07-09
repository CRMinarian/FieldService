# Field Service Nerd — YouTube Channel Plan

Launch playbook for the FSN YouTube channel.

**Channel is LIVE (2026-07-03):** https://www.youtube.com/@FieldServiceNerd (handle
`@FieldServiceNerd`). **Owned by the `skippy@nukasoft.ai` Google Workspace account** (same
identity as the site's welcome-email DWD) — so any future YouTube API automation (uploads,
thumbnail updates) authenticates as `skippy@nukasoft.ai`. Upload-ready assets: banner
`youtube/fsn-yt-banner.png` (2560×1440), avatar `web/assets/fsn-avatar-circle.png` (circle NERD patch, 800×800 — circle-native so it
reads at 48/88px where the rectangular patch clipped to mush; the square `fsn-logo-avatar.png`
stays as favicon/social).
Remaining: apply branding, paste the About description + links, create the 4 playlists, upload videos.

## Video length
- **Target: 12–15 minutes** (sweet spot for technical content).
- Under 10 min feels too light for this audience; over 20 min tanks completion rate.

## Posting cadence (first 60–90 days)
- **1 video per week — maximum.** Quality over quantity while establishing the channel.
- **Every Tuesday, 10:00 AM Eastern.** Pick the day and hold it religiously for 2–3 months.
- Focus effort heavily on the **first 4 videos** — they matter most.

## 8-week launch schedule
| Week | Title | Length |
|---|---|---|
| 1 | Why Most Dynamics Field Service Implementations Fail | 15 min |
| 2 | What I Wish I Knew Before My First Field Service Project | 12 min |
| 3 | The Ugly Truth About Resource Scheduling Optimization (RSO) | 14 min |
| 4 | Copilot in Field Service — Honest Review After 3 Months | 13 min |
| 5 | The Biggest Mistake Companies Make With Field Service Scheduling | 12 min |
| 6 | 5 Things Microsoft Won't Tell You About Field Service | 14 min |
| 7 | How to Actually Make Money as a Field Service Consultant | 13 min |
| 8 | The Real Difference Between Good and Bad Field Service Dispatchers | 12 min |

## Playlists (official — Pierre, 2026-07-03)
The four content lanes, by who the video is about:

1. **The Builders** — the people who make Field Service work behind the scenes.  ISVs,
   Microsoft product folks, partners, and the wider ecosystem we all build alongside.
   Conversations with the players shaping the platform.
2. **Fundamentals** — the technical bedrock.  KPIs, systems, architecture, and what
   makers and builders actually do and measure.  Where to start to understand how Field
   Service really works.
3. **From The Field** — the people actually using these systems.  Techs, engineers,
   dispatchers, and customers, and the real ways they get the job done.  Ground truth
   from the field, not the slide deck.
4. **The Honest Take** — Pierre's thoughts, no filter.  Shorts and quick bites (the old
   "Public Comment" / Equal Time / Andy Rooney style commentary) on what's happening in
   Field Service and the industry.

## Video structure (every video)
1. **Hook (0:00–0:12)** — one strong statement. *"90% of Field Service implementations are failing… and most people don't even realize it."*
2. **Intro (0:12–0:45)** — what you'll cover and why it matters.
3. **Main content** — 4–5 clear sections with simple on-screen text.
4. **Conclusion** — strong takeaway + CTA (*"If you're struggling with X, comment 'Help' below"*).

## Thumbnail style — TWO options (decision pending)
Pierre's click-optimization notes vs. the built brand kit differ; pick a lane:

**A) Click-optimized (generic YouTube best practice)** — bold red/orange background,
face with a strong expression, big **white text with black outline**, max 5–6 words.
Example thumbnail text: "Most FS Projects FAIL" · "The Truth About RSO" · "Copilot Is Lying To You".

**B) On-brand Field Manual** — the built template (`web/brand/yt-thumbnail.html`): dark
olive/graphite ground, Oswald hook with an orange punch word, headshot + "FIELD TESTED"
stamp. Cohesive with the site/brand. (Sample rendered during build.)

**Recommended: a hybrid** — high-contrast + short punchy text + strong-expression face
(from A) rendered with FSN brand type/patch/orange (from B). Loud enough to click, still
unmistakably Field Service Nerd.
