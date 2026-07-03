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

- [ ] **YouTube channel launch (sequenced — gated on the email).**
  1. **`pierre@fieldservicenerd.com` mailbox** — add `fieldservicenerd.com` as a
     secondary domain in the **nukasoft.ai Google Workspace** + create the user
     (use `gws-admin`; needs verification/MX records at the registrar). **Everything
     below is blocked until this exists.**
  2. **Create the channel** (Brand Account) under that Google account. Apply channel
     art from `web/brand/yt-banner.html` + avatar `web/assets/fsn-logo-avatar.png`.
  3. **Set up playlists** — structure by theme (e.g. AI in FS, Scheduling/RSO,
     Copilot, Field Notes).
  4. **Download the old videos** from the existing channel/playlist
     (`PLD2JXXb9_ku0`) — source of "the old videos." (yt-dlp on owned content.)
  5. **New thumbnails** — batch-generate on-brand thumbnails from the Field Manual
     kit (`web/brand/yt-thumbnail.html` is the template). Claude can produce these.
  6. **Re-upload** the first 5 videos with new thumbnails into the right playlists.
     (YouTube upload tools exist but need auth to the new channel.)
  - Bonus once the domain's in Workspace: switch the site's welcome-email sender
    from `skippy@nukasoft.ai` to an `@fieldservicenerd.com` address (on-brand).

## Done
- Field Manual redesign + official patch logo, real headshot, live deploy, verified
  email funnel (see git history on `build/fsn-site`).
