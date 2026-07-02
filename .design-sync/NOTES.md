# Field Service Nerd — design-sync notes

Continuity notes for a future `/design-sync` run. Read before starting.

## Status — SYNCED (2026-07-02)
- First off-script sync **complete**. Project: **Field Service Nerd**
  (`8580f095-aac2-4392-ad30-c3d11f8aac56`), 24 components, validate exit 0,
  render check 24/24, uploaded 108 files. Design is **Field Manual v3-final**
  (see repo `web/tokens/` + `web/app.css`; NOT the old Signal & Grit look).

## Shape: package, but OFF-ENVELOPE
This repo is **not** a standard buildable design system. No Storybook, no
component-library `dist/`. Components are Babel-in-browser JSX served from
`web/`, each assigning to `window` (primitives to `window.FSN`, page components
to `window.<Name>`). `package-build.mjs` auto-discovery will NOT find them.
So the layout is produced **off-script** by a custom generator.

## Reproducible off-script build (how this sync was made)
Generator is committed at **`.design-sync/off-script-build.mjs`**. It:
1. esbuild-transforms each `web/*.jsx` (loader jsx, jsxFactory React.createElement),
   wraps each file in its own IIFE (so per-file `const {Button}=window.FSN` don't
   collide), concatenates in load order (_ds first), and appends a normalizer that
   folds every page component into `window.FSN.<Name>`.
2. Emits `_ds_bundle.js` with a first-line `/* @ds-bundle: {...} */` header whose
   required fields are `namespace` (string "FSN"), `components` (array of `{name}`),
   `sourceHashes`, `inlinedExternals`.
3. Emits `_ds_bundle.css` = `web/app.css`; copies `web/tokens/*` ; writes
   `styles.css` that `@import`s tokens + `_ds_bundle.css` (fonts are a remote
   Google `@import` → `[FONT_REMOTE]`, expected).
4. Vendors React 18.3.1 UMD as **`_vendor/react.js`** and **`_vendor/react-dom.js`**
   — filenames MUST be exactly those (the validator's export-smoke loads them).
5. Emits per component: `<Name>.jsx` stub, hand-written `<Name>.d.ts`,
   `<Name>.prompt.md`, and a `<Name>.html` card (first line `<!-- @dsCard group=.. -->`)
   that loads `_vendor` React + `_ds_bundle.js`, links `styles.css`, and renders
   `window.FSN.<Name>` via `React.createElement`.
6. Writes `.ds-build-meta.json` (`{componentCount, shape:"package"}`).

Run it, then validate, then upload:
```sh
cd .ds-sync && node ds-build.mjs            # (cp .design-sync/off-script-build.mjs first)
cd .. && DS_CHROMIUM_PATH="C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" \
  node .ds-sync/package-validate.mjs ./ds-bundle --render-sample 0
```
- Deps staged in `.ds-sync/` (gitignored): `npm i esbuild playwright` with
  `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1` (no 200MB download — drive **system Chrome**
  via `DS_CHROMIUM_PATH`). This machine has Chrome at the path above.
- No `_ds_sync.json` anchor (off-script) → every re-sync re-verifies everything.
- Upload localDir must be **absolute** (`Z:/Projects/FieldService/ds-bundle`) — a
  relative `./ds-bundle` got doubled by the DesignSync tool.

## Component inventory (24, groups)
Primitives: Button, Eyebrow, Pill, SectionHead, Section · Navigation: Nav ·
Hero: Hero, TrustBar · Home: Pillars, LeadMagnet, Podcast, Videos,
ConsultingTeaser, EmailSection, Faq, Footer · Consulting: ConsultHero,
ConsultServices, ConsultApproach, ConsultContact · About: AboutHero,
AboutCredentials, AboutBio, AboutConnect.

## Known render warns / triaged
- `[FONT_REMOTE]` for Alfa Slab One / Oswald / Inter / JetBrains Mono — fonts load
  from Google at runtime; expected, not a miss.
- All 24 cards render non-empty; Videos/Podcast pull live YouTube (render fine).

## Re-sync risks (watch-list)
- **Component load order matters**: `_ds.jsx` MUST bundle first (page files destructure
  `window.FSN` at eval time). The generator hardcodes the order — keep it if files are added.
- **`_ds.jsx` references `React` at eval time** (`const e = React.createElement`). The
  export-smoke loads the bundle with `_vendor/react.js` present, so it's fine — but if
  React vendoring breaks, `window.FSN` never sets and all 24 read as "not a component".
- **Leftover navy** in `LeadMagnet` primer-cover mock (`#0f1626` gradient) is old
  Signal & Grit; renders but is slightly off-palette. Fix in `web/Sections.jsx` if it bugs you.
- If new components are added to `web/*.jsx`, add them to the generator's `PAGE` list
  and the per-component `M` map (group + dts props + preview expr).
- The standalone `web/ebook/fs-ai-primer.html` is NOT token-driven (own Space Grotesk vars) —
  it did not change with the redesign.
