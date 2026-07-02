# Field Service Nerd — Project Instructions for Claude

## Who You're Working With
Pierre Hulsebus — 30+ year IT/sales veteran, former Microsoft Director Global Black Belt for Dynamics 365 Field Service. Deep expertise in D365 Field Service, Power Platform, RSO, IoT/Connected Field Service, and enterprise CRM (since 2002). Currently building the **Field Service Nerd** brand as an independent content and education platform.

Contact: infuseme@gmail.com | Blog: hustleisthehack.com

---

## What This Project Is

**Field Service Nerd** is Pierre's independent platform for:

1. **Knowledge Base** — canonical public documentation on Dynamics 365 Field Service, AI in field service, Copilot architecture, and enterprise scheduling
2. **Online Course** — Kajabi-based course(s) targeting field service practitioners, architects, and technical sellers; built from Pierre's real-world IP
3. **Podcast** — "The Technical Seller" or Field Service Nerd-branded episodes; scripts and show notes live here
4. **Website / Domain** — Primary domain: **fieldservicenerd.com** (owned). Platform TBD. Also owns fieldservicerocks.com (redirect) and equiptive.ai (reserved for future product).

The target audience is: field service architects, D365 practitioners, technical sellers, and operations leaders working at the intersection of AI and service operations.

---

## Folder Structure

```
/FieldService
├── CLAUDE.md               ← You are here — project instructions
├── README.md               ← Public-facing repo description
├── index.md                ← Homepage content
│
├── /lexicon                ← Canonical D365 FS / AI terminology
├── /frameworks             ← Architecture models, operating patterns
├── /decks                  ← Published presentation assets (by year)
│   ├── /2025
│   ├── /2026
│   └── /Legacy
├── /diagrams               ← System diagrams, architecture visuals
├── /references             ← Supporting links, citations, PDFs
│
├── /course                 ← Kajabi course content
│   ├── /modules            ← Individual course modules (one folder per module)
│   ├── /assets             ← Images, diagrams, downloads used in the course
│   ├── /scripts            ← Video/lesson scripts
│   └── /quizzes            ← Quiz questions and answer keys
│
├── /podcast                ← Podcast production
│   ├── /episodes           ← One file per episode (script + show notes)
│   ├── /guests             ← Guest bios and prep docs
│   └── /templates          ← Reusable script and show notes templates
│
├── /web                    ← Website and domain management
│   ├── /copy               ← Page copy (homepage, about, course landing pages)
│   ├── /seo                ← Keyword research, meta descriptions, page titles
│   └── /domain             ← Domain notes, DNS records, platform research
│
└── /tools                  ← Automation scripts (notion-sync, publish, etc.)
```

---

## How to Work in This Project

### Tone & Voice
- Direct, technically credible, no fluff
- "Old school geek with 30 years of battle scars" — not academic, not corporate speak
- Practical over theoretical; always tie concepts to real implementation and ROI
- The audience has seen bad deployments — earn their trust with specificity

### Content Standards
- All documentation should be written as if it will be published publicly
- Use precise D365 terminology (Work Order, Bookable Resource, Resource Requirement, RSO, IoT Connected FS, etc.)
- Frameworks should be usable by practitioners, not just readable by executives
- Course content should be modular — each lesson should stand alone

### Course Structure (Kajabi)
- Platform: Kajabi (or TBD — check `/web/domain/` for latest platform decision)
- Each module = a folder under `/course/modules/`
- Each lesson = a markdown file with: title, learning objectives, script/outline, quiz questions
- Assets (screenshots, diagrams) go in `/course/assets/` with clear naming
- Think: Microsoft Learn meets real-world war stories

### Podcast Workflow
- Episodes live in `/podcast/episodes/` named `EP###-title-slug.md`
- Each episode file contains: title, guest (if any), key topics, full script or detailed outline, show notes, links
- Templates for solo vs. guest episodes are in `/podcast/templates/`

### Website / Domain
- Platform not yet decided — research and notes in `/web/domain/`
- Page copy drafts go in `/web/copy/`
- SEO research goes in `/web/seo/`
- When platform is chosen, update this file

---

## Key Priorities (as of May 2026)

1. **Organize existing content** — audit and categorize the PDFs, decks, and reference materials already in the repo
2. **Stand up course architecture** — define modules, lesson count, and learning objectives for the first Kajabi course
3. **Decide web/domain platform** — evaluate Kajabi-native site vs. separate CMS; choose a domain
4. **Build podcast template and first episode** — establish format, record first solo episode script

---

## Tools & Integrations
- **Git / GitHub** — this repo is version-controlled; content is considered published once committed
- **GitHub Actions** — `notion-sync.yml` and `pages.yml` workflows in `.github/workflows/`
- **Python tools** — `/tools/` has notion-sync.py, publish.py, update-index.py
- **Kajabi** — online course platform (account TBD)
- **Skills available in Cowork**: pptx, docx, pdf, xlsx, technical-seller-content, d365-field-service-estimator, profit-zone

---

## What Claude Should NOT Do in This Project
- Don't rename or restructure published files in `/decks/`, `/references/`, or `/lexicon/` without asking — these are link-stable
- Don't simplify technical content for a general audience — the audience knows D365
- Don't add corporate hedging language to content — Pierre's voice is direct and opinionated
- Don't create README files for every subfolder unless asked
