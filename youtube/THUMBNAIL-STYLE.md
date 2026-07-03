# FSN YouTube Thumbnail Style — OFFICIAL (locked 2026-07-02)

Pierre's directive: **use this exact style for all FSN YouTube thumbnails. Do not deviate.**

## The spec
- **Dark charcoal/black background** (deep olive-charcoal `#242A24 → #151812`, worn grain,
  quiet vignette — strong Figure-Ground so the two figures pop)
- **Face large and prominent** — close-up, ~45–50% of the canvas on the RIGHT side
- **Orange stitched/patch border** around the photo (merrow-edge conic gradient), hung
  slightly crooked (~1.6°)
- **Bright safety-yellow tape accents** (`#FFD23F` with orange ends) at the corners —
  angled to guide the eye toward the face; never covering the face or the text
- **Text: bold, high-contrast, white + orange**
  - Main headline: very large and dominant — Oswald 700 uppercase, white, tight block
    (~.87 leading), hard drop shadow + dark halo, slight −1.2° rotation
  - Punch word: Alfa Slab One, hot orange `#FF5A1F`, dark stroke, in a safety-yellow
    stamp border, rotated ~−2.5°, tight beneath the headline
- **Top left: FIELD SERVICE NERD** — smaller wordmark, Alfa Slab, white + orange
- **No episode numbers, no extra text**
- Bottom edge: thin hazard-stripe strip

## The template
`web/brand/yt-thumb-master.html` — the canonical implementation (1280×720).
Per-episode: swap the headline lines + the stamp word, re-render.

Render command (preview server on :8791):
```js
// puppeteer: goto /brand/yt-thumb-master.html, wait for fonts, screenshot '.t'
```
Output PNGs → `youtube/thumbnails/ep##-slug.png`.

## Done
- EP01 "Most Field Service Projects FAIL" → `youtube/thumbnails/ep01-most-fs-projects-fail.png`
