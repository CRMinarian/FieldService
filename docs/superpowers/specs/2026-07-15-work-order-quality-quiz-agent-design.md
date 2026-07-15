# Work Order Quality Quiz Agent | Design

_2026-07-15.  Design spec for the daily agent that scores every closed work order on the Work Order Quality Quiz and turns closure discipline into a dashboard.  Source framework: "The Field Service AI Playbook," chapter 03.  ("Cosmo Quiz" was the drafting name; the book shipped it as the **Work Order Quality Quiz**, full-page scoresheet on page 6, standalone asset `web/brand/work-order-quality-quiz.png`, part tag FSN-QUIZ-03, all on branch `Skippy/field-service-ai-ebook-57c092`.)  Interview context: Q8 in `references/ebook-interview-notes.md` on that branch.  This is three things at once: an FSN content asset (public build log), a consulting deliverable (drops into a client tenant), and the book's "ideal first custom agent" made real._

---

## 1.  What it does

Every day the agent pulls the work orders that closed in Dynamics 365 Field Service, scores each one on the Work Order Quality Quiz, stores the scores, and regenerates a trend dashboard plus a short daily report.  Best and worst crews, work order types, and incident types surface with verbatim evidence quotes and a coaching note, so a service manager knows exactly what to fix first.

The quiz, locked as shipped in the book:

| Measure | Points |
|---|---|
| Real problem description | 0 to 3 |
| Real resolution notes | 0 to 3 |
| Correct asset attached | 0 to 3 |

Per-work-order verdicts use the scoresheet personas verbatim.  **These names appear in every agent output** | digest, dashboard, coaching notes:

| Points | Verdict | Read |
|---|---|---|
| 8 or 9 | **The Documentation Darling** | Frame it.  Your techs write like the next tech matters. |
| 5 to 7 | **The Almost-There Operator** | There's a story in there, it just mumbles.  One toolbox talk pays for itself. |
| 0 to 4 | **The "Fixed." Philosopher** | One word, zero context, total confidence.  Your AI will be exactly as informative. |

The scoresheet also grades a 20-order sample pull as a total, 180 max: **140+** AI-ready, buy the workload.  **90 to 139** run 90 days of closure discipline first, then buy.  **Under 90** the next AI dollar is a training dollar.  The agent speaks the same units: its headline metric is the rolling **book-scale total** (mean score × 20), so a manager who took the quiz on paper reads the dashboard with no conversion table.

One design principle governs everything below: **no evidence, no seat.**  The retired 2020 D365 incident type suggestions showed their work ("of the 80 work orders with this incident type, 66 also include this product").  This agent holds itself to the same standard.  Every score ships with the verbatim quote that earned it.

---

## 2.  Architecture

Five small components, one clear job each, talking thru plain data records:

```
Source adapter  →  Normalizer  →  Scorer  →  Store  →  Reporter
(Dataverse API |    (one canonical   (gates +   (SQLite)   (HTML dashboard
 CSV export |        WorkOrderClosure  LLM judge)             + daily digest)
 synthetic gen)      record)
```

A daily runner (cron) executes the chain.  The adapter boundary is the load-bearing wall: the scorer never knows whether a record came from a live tenant, a CSV export, or the synthetic generator.  That is what makes one codebase serve the public build log (synthetic data), a quick client assessment (CSV), and a production deployment (live API).

---

## 3.  Decision: data access path

| Option | Pros | Cons |
|---|---|---|
| **A. Dataverse Web API, server-to-server auth (recommended)** | Live, daily, no premium infra, portable to any client tenant, one app registration | Needs an Entra app registration + application user per tenant; API throttling to respect |
| B. Synapse Link / Fabric link export | Great at massive scale, no API load | Heavy setup, premium licensing, overkill for a daily read of yesterday's closures |
| C. Manual CSV / FetchXML export | Zero tenant setup, works in a locked-down assessment | Not daily, not an agent; someone has to click export |

**Recommendation: A as the primary adapter, C as a free second adapter (it is nearly the same normalizer), B never.**  Client conversations often start at C (one-time assessment on an export) and graduate to A (the daily agent).  That is the consulting funnel in code form.

Mechanics for adapter A:

- Entra app registration, client credentials flow, an application user in the environment with a minimal read-only security role (work orders, bookings, incident types, assets, resources, annotations).
- Daily delta query: work orders whose system status reached Completed or Posted and whose `modifiedon` falls in the last N days (N defaults to 2 for late edits; idempotency in section 6 makes overlap harmless).
- **Per-org field map as config, not code.**  Where the "real resolution notes" actually live varies wildly per implementation: booking resolution fields, service task notes, closure annotations, custom fields on the work order.  The adapter reads a `fieldmap.yaml` that names the source columns for problem text, resolution text, asset lookup, crew, work order type, and incident type.  Exact schema names (`msdyn_workorder` and friends) get verified against the target org during implementation, not hardcoded from memory.  Same fact-check discipline as the ebook.

The **synthetic generator** is the third adapter and it is not optional.  The public build log cannot show client data, so the generator produces a few hundred realistic closures across the full quality spectrum: "fixed" one-worders, decent-but-vague notes, and frame-it closures, spread across fake crews and incident types.  It doubles as the test fixture.

---

## 4.  Decision: scoring rubric implementation

**Hybrid: mechanical gates first, LLM judgment second.**  Cheap deterministic checks catch the obvious zeros; the model only grades what deserves grading.

Mechanical gates (code, not model):

- Blank, whitespace, or boilerplate text ("fixed," "done," "complete," "n/a," under ~15 characters) → that measure scores 0, no LLM call needed for it.
- No asset lookup on the work order → asset measure scores 0.

LLM rubric (one call per work order, temperature 0, JSON schema enforced):

| Measure | 1 | 2 | 3 |
|---|---|---|---|
| Problem description | Vague ("unit down") | Specific symptom | Symptom plus context: what, where, when, observed behavior |
| Resolution notes | Action named, no detail | What was done plus parts/steps | Cause, action, and verification it worked |
| Asset | Attached but contradicted by the notes or location | Attached and consistent with the work | Attached, consistent, and referenced in the notes |

Output per work order: three sub-scores, total, verdict persona (Documentation Darling | Almost-There Operator | "Fixed." Philosopher), **one verbatim evidence quote per measure**, and a one-line coaching note ("resolution says what, never why | ask techs to name the cause").

Evidence integrity is enforced mechanically: each quote must be a verbatim substring of the source text.  Fails validation → one retry → still fails → the work order is flagged `unverified` and excluded from trends until rerun.  The agent never gets to invent its receipts.

Calibration: a hand-scored set of ~20 example closures (Pierre scores them once) rides in the prompt as few-shot anchors and doubles as the regression test.  Rubric changes bump a `prompt_version` stamp stored with every score, so trend charts can annotate when the yardstick moved.

Model: Claude Haiku 4.5 by default.  A day of 200 closures at roughly 1.5k tokens in / 300 out per work order lands well under a dollar a day.  The field map config can point at Sonnet for orgs that want heavier judgment; scores are stamped with the model either way.

---

## 5.  Decision: storage

| Option | Pros | Cons |
|---|---|---|
| **A. SQLite, one file (recommended)** | Zero infra, trivially portable, queryable, survives being emailed | Single-writer, but the agent is the single writer |
| B. Dataverse custom table (write-back) | Scores live in the client tenant, Power BI and model-driven apps see them natively | Solution to build and ship, per-tenant deploy cost |
| C. Firestore (FSN stack) | Already wired for the site | Wrong tenant boundary for client data; consulting data does not belong in FSN's Firebase |

**Recommendation: A as the canonical store everywhere, B as a v2 upgrade for production client deployments.**  C never for client data.

One table, one row per scored work order:

```
scores(
  workorder_id, wo_number, closed_on, run_date,
  crew, work_order_type, incident_type,
  score_problem, score_resolution, score_asset, score_total, verdict,
  evidence_json, coaching_note,
  model, prompt_version, source_hash,
  UNIQUE(workorder_id, source_hash)
)
```

`source_hash` is a hash of the normalized input text.  Daily aggregates are computed at report time, never stored; the row level is the source of truth and re-slicing (new crew rollup, new date window) costs nothing.

---

## 6.  Idempotency and error handling

- The unique key `(workorder_id, source_hash)` makes reruns free: unchanged work orders skip, edited or reopened-then-reclosed work orders rescore, and the newest row per work order wins in trends.
- Dataverse throttling → exponential backoff, resume from the last page; a partial day completes on tomorrow's overlap window.
- LLM call failure → retry twice → flag `unscored`, keep going.  A bad work order never kills the run.
- The daily digest always reports its own coverage: "scored 187 of 191 closures, 4 flagged."  A dashboard that silently drops data is exactly the demo-ware the book rails against.

---

## 7.  Decision: output surface

| Option | Pros | Cons |
|---|---|---|
| **A. Static HTML dashboard + daily digest (recommended)** | Zero hosting dependencies, on-brand, doubles as the public demo | Not interactive drill-down |
| B. Power BI over the Dataverse table | Native for enterprise clients | Needs the Dataverse write-back table first; licensing; nothing to show publicly |
| C. Digest only | Cheapest | "Closure discipline becomes a dashboard" is the whole pitch; a report is not a dashboard |

**Recommendation: A now, B as the paid upgrade path once a client wants write-back.**

The dashboard is one self-contained HTML file regenerated per run, styled in the locked **Field Manual v3** direction (olive/orange, Alfa Slab stamp), visually keyed to the page-6 scoresheet (`web/brand/work-order-quality-quiz.png`, FSN-QUIZ-03) so the paper quiz and the dashboard read as one artifact:

- Headline: rolling book-scale total (mean × 20) with its band (AI-ready | closure discipline first | training dollar), 30-day delta, and the persona mix (Darling / Almost-There / Philosopher) as a stacked bar over time.
- Leaderboards: crews, work order types, incident types | best and worst, minimum sample size gate so a one-job crew cannot top the chart.
- **Fix-first panel:** the lowest-scoring cluster with its evidence quotes and coaching notes.  This is the money pixel: not "crew B is bad" but "crew B's resolution notes on HVAC PMs average 0.8 of 3 | here are three verbatim examples."
- Yesterday's worst three closures, quotes attached | the standing coaching queue.

The daily digest is the same story in ~20 lines of markdown, mailable thru the existing skippy@nukasoft.ai sending infra or droppable in Teams.  Digest in v1; wiring the sender is a config step, not new plumbing.

---

## 8.  Runtime and scheduling

- **Language:** Python 3, matching the repo's existing `tools/` scripts.  Lives at `agents/quality-quiz/` with one module per component (adapter, normalize, score, store, report) plus `fieldmap.yaml` and `run.py`.
- **FSN demo instance:** GitHub Actions cron, daily, synthetic adapter, dashboard artifact published to the FSN site as the public demo page.
- **Client instance:** the same package on an Azure Functions timer or a plain scheduled task inside the client's boundary.  Secrets (tenant URL, client id/secret, Anthropic key) via environment variables, never in the repo.

---

## 9.  The public build log

The build itself is FSN content.  Three-post arc, each shippable alone:

1. **"Score your work orders like a magazine quiz"** | the framework, the synthetic generator, hand-run scoring on 20 fake closures.  (Mirrors the book's Try This exercise exactly.)
2. **"Making the AI show its work"** | the scorer: gates, rubric, evidence-quote validation, the no-evidence-no-seat lineage back to the retired D365 suggestion feature.
3. **"Closure discipline becomes a dashboard"** | trends, leaderboards, fix-first panel, live demo page.

Rule for everything public: synthetic data only, and every screenshot re-checkable against the generator.

---

## 10.  Not building (v1)

- No write-back to Dataverse, no Power BI (v2, first paying client).
- No real-time scoring on close (daily batch is the book's pitch and it is cheaper).
- No auto-coaching messages to technicians (the manager coaches; the agent hands them receipts).
- No multi-tenant SaaS anything.  `equiptive.ai` stays untouched per the brief.

---

## 11.  Verification

- Calibration set doubles as the regression test: rubric or prompt changes must keep scored output within ±1 point of Pierre's hand scores on all 20 anchors.
- Evidence quotes machine-validated as substrings, every run.
- Synthetic generator emits known-band closures ("this one is a 9, this one is a 2"), so end-to-end runs assert the pipeline lands each in the right verdict band.
- Dashboard smoke test: regenerate from a fixture DB, diff the numbers in the HTML against SQL computed directly.

---

## 12.  Open questions for Pierre

1. **First live tenant:** which D365 environment gets adapter A first | your demo org, or straight to a client assessment via the CSV adapter?
2. **Digest delivery:** email via the skippy@nukasoft.ai delegation, or dashboard-only until a client asks?
3. **Public demo page:** does the synthetic-data dashboard get a URL on fieldservicenerd.com (strong lead magnet next to the ebook), or stay in the build-log posts?
4. **Calibration session:** need ~30 minutes of your hand scores on 20 synthetic closures to anchor the rubric.
