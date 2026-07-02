# Field Service Nerd — design-sync notes

Continuity notes for a future `/design-sync` run. Read before starting.

## Status
- First-time import, NOT yet done. Attempted 2026-07-01 from an embedded Claude
  Desktop / claude.ai-code session — **DesignSync auth is unavailable there**
  (`/design-login` needs a real interactive terminal). Re-run from a standalone
  `claude` terminal (`/design-login` then `/design-sync`) or a Claude Code Web
  session seeded via Claude Design's "Send to Claude Code Web."
- Scope chosen by Pierre: **full sync** (primitives + all page components + tokens).

## Shape: package, but OFF-ENVELOPE
This repo is **not** a standard buildable design system. No Storybook, no
component-library package/`dist/`. The components are **Babel-in-browser JSX**
served at runtime from `web/`, each assigning to `window` (primitives to
`window.FSN`). The `package.json` at root is for Firebase/puppeteer scripts, not a
component build. So `package-build.mjs`'s auto-discovery will NOT find a buildable
component surface — expect an **off-script** layout build (compile the `web/*.jsx`
to JS, bundle to `_ds_bundle.js` exposing the `window.*` globals, wire `styles.css`
to the token @import closure, author cards, verify).

## Component inventory (all in `web/`)
- **Primitives** — `_ds.jsx` (plain `React.createElement`, no JSX syntax), exposes
  `window.FSN = { Button, Eyebrow, Pill, SectionHead, Section }` (Button variants:
  primary/ghost/data/dark, sizes sm/md; Eyebrow; Pill tone data/signal; SectionHead
  eyebrow/title/sub/center/onDark; Section id/alt).
- **Nav.jsx** — `window.Nav` (props: onJoin, theme, onToggleTheme).
- **Hero.jsx** — `window.Hero` (onJoin) + `window.TrustBar`.
- **Sections.jsx** — `window.{Pillars, LeadMagnet, Podcast, Videos, ConsultingTeaser,
  EmailSection, Faq, Footer}`. Holds `PLAYLIST_ID` + `FIRESTORE_KEY` placeholder.
- **Consulting.jsx** — `window.{ConsultHero, ConsultServices, ConsultApproach, ConsultContact}`.
- **About.jsx** — `window.{AboutHero, AboutCredentials, AboutBio, AboutConnect}`.
- All components depend on `window.FSN` primitives + `React` (UMD) at runtime.

## Tokens / styling (the Signal & Grit look)
- `web/styles.css` aggregates `web/tokens/{fonts,colors,typography,spacing,effects}.css`
  via `@import`. `web/app.css` holds the signature treatments (dot-grid, schematic,
  draw-rule, data-mark, status-dot) + responsive rules — must also be in the
  `styles.css` @import closure for designs to receive it.
- Fonts via Google Fonts `@import` (Space Grotesk / Inter / JetBrains Mono).
- Dark is the default theme; `[data-theme="light"]` flips. Hero sections carry
  `data-theme="dark"` and use literal-navy `--hero-ground` (not a theme token).

## Gotchas learned
- Nested `var()` inside a custom property doesn't re-resolve under a local
  `data-theme` context — that's why `--hero-ground` uses literal navy.
- Component load order matters: `_ds.jsx` MUST load before the components that
  destructure `window.FSN`.
