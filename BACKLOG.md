# Field Service Nerd — Backlog

Post-launch enhancements. None of these block the live site
(https://field-service-nerd.web.app) — the core site + signup funnel are live and verified.

## Open

- [ ] **Redirect `Hulsebus.net` → Consulting page.**
  Point Pierre's personal domain `Hulsebus.net` at the consulting landing page
  (`fieldservicenerd.com/consulting`, or the `.web.app` URL until the custom domain
  is cut over) with a 301 redirect. DNS at whichever registrar holds `Hulsebus.net`
  — use the `domain-manager` skill.

- [ ] **Add a personal introduction video.**
  Short, personal "who I am / what this is" video from Pierre. Likely placement: the
  homepage hero or the About page. Record → host (YouTube embed to match the existing
  `Videos` pattern, or self-host) → wire into a component.

- [ ] **Pro headshot on the Consulting page.**
  Pull Pierre's professional headshot from the Tech Sales 110 brand assets
  (`Z:/Skippy/Dev/TechSeller/brand/assets/`) and place it on `/consulting` — the
  consulting hero currently has no photo. (Distinct from the field/patch headshot
  already used on About + the podcast thumbnail.)

- [ ] **Set up `pierre@fieldservicenerd.com` + FSN YouTube channel.**
  Create a branded mailbox `pierre@fieldservicenerd.com` — cleanest path is adding
  `fieldservicenerd.com` as a secondary domain in the existing **nukasoft.ai Google
  Workspace** and creating the user/alias (use the `gws-admin` skill; requires the
  domain's MX/verification records at the registrar). Then create the **Field Service
  Nerd YouTube channel** (Brand Account) under that account and upload the brand assets
  already built: banner, thumbnail, avatar, logo — from `web/brand/` +
  `web/assets/fsn-logo-*.png`.

## Done
- Field Manual redesign + official patch logo, real headshot, live deploy, verified
  email funnel (see git history on `build/fsn-site`).
