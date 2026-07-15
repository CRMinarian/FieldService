# D365 Field Service AI Feature Status | verified mid-2026

Verified against live Microsoft Learn pages (ms.date stamps 2025-2026).  Source of truth for the ebook's feature claims and screenshot captions.

| Feature | 2020 form | Mid-2026 status | Notes |
|---|---|---|---|
| Predictive work duration | Preview dashboard, predicted vs allocated duration | **RETIRED** (deprecated Sept 2024, removed after Nov 2024) | No direct replacement; reporting points at Fabric |
| Predictive travel time | RSO goal "Bing Maps with historical traffic" | **ALIVE, re-worded** | Still an RSO goal option ("include historical traffic information"); Bing branding removed; only RSO uses traffic, base schedule board does not |
| Incident type suggestions | Preview, Intelligence tab | **RETIRED** (removed after Nov 2024) | Copilot summaries/side pane are the current AI surface |
| IoT alert suggestions | Suggested priority/score/incident type + setup wizard | **RETIRED** (removed after Nov 2024) | IoT alerts remain in CFS, minus the AI layer |
| Connected Field Service | IoT Hub → Stream Analytics → Service Bus → Logic Apps → D365 | **CURRENT, GA** (architecture doc ms.date 2025-09-02, same stack) | Time Series Insights chart removed (TSI retired July 2024); IoT Central no longer a documented connection option |
| RSO | Paid add-in, batch optimization | **CURRENT, GA, actively updated** | Not superseded; Scheduling Operations Agent is a complement, still preview.  RSO Power BI reports retired Aug 2025 → Fabric |
| Copilot in Field Service | n/a | **Mixed GA + preview** | GA: side pane chat, work order summaries (web + mobile).  Preview: mobile AI work order update (voice/text), inspection template creation from PDFs, Copilot Studio customization, Scheduling Operations Agent.  Killed: Teams Copilot plugin (Jan 2025), Outlook add-in (Oct 2025).  **Copilot service report generation: NOT found in docs | do not claim it** |
| Schedule Assistant | Availability search | **CURRENT, GA** | Semi-automated single-job scheduling |
| Bing Maps for Enterprise | FS geocoding/travel | **RETIRING** (free tier dead June 2025; enterprise until June 2028) | Azure Maps is successor.  FS docs now say "first-party provider."  Word as "Microsoft's first-party mapping service (Azure Maps platform)" |

## Do-not-state-as-fact flags

1. **Azure IoT Central retirement**: the 2027 retirement message was retracted by Microsoft.  Say: future uncertain, investment is in IoT Hub/Edge, CFS docs no longer list IoT Central.  No date.
2. **Copilot service report generation**: not documented as shipped.  Do not claim.
3. **Exact map engine behind FS travel time**: "first-party mapping (Azure Maps platform)" | never stated verbatim in FS docs.

## Key Learn URLs

- learn.microsoft.com/en-us/dynamics365/field-service/deprecations-field-service
- learn.microsoft.com/en-us/dynamics365/field-service/rso-overview
- learn.microsoft.com/en-us/dynamics365/field-service/rso-optimization-goal
- learn.microsoft.com/en-us/dynamics365/field-service/connected-field-service-architecture
- learn.microsoft.com/en-us/dynamics365/field-service/copilot-overview
- learn.microsoft.com/en-us/dynamics365/field-service/soa-overview
- learn.microsoft.com/en-us/dynamics365/field-service/schedule-assistant
- learn.microsoft.com/en-us/azure/azure-maps/migrate-bing-maps-overview
