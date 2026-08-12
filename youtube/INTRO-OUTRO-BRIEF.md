# Intro / Outro / B-Roll | Grok (x.ai) Video Brief

The division of labor: **Grok generates cinematic plates.  The edit pipeline composites the
brand layer** (wordmark, pills, end-card text) in ffmpeg, where type stays razor sharp.  Never
ask Grok to render brand text | AI video mangles letters.

Brand look (Field Manual): workshop / garage / field yard settings, olive-drab and graphite
tones, one weathered safety-orange accent in frame, warm practical light, film grain, no neon,
no cyber-tech, no glossy corporate offices.

---

## 1 | INTRO BUMPER (target 6-8s final)

**What the pipeline adds on top:** FSN wordmark stamp-in (Alfa Slab One), orange rule line,
episode title lower-third.  Audio: a single impact hit + room tone (source separately).

**Grok prompt (generate 2-3 candidates, pick the best):**

> Cinematic 16:9 shot inside a worn workshop garage at golden hour.  Slow push-in past a
> pegboard of well-used wrenches and hand tools toward a heavy steel workbench.  A weathered
> safety-orange toolbox sits center frame.  Dust motes in warm side light.  Olive drab and
> graphite color palette with one orange accent.  Shallow depth of field, 35mm film grain,
> practical tungsten light.  No people, no text, no logos.  Slow, confident camera movement.

**Alt flavor (field yard):**

> Cinematic 16:9 drone-low tracking shot across a service fleet yard at dawn.  White utility
> trucks with ladder racks in a row, light fog, warm sun flare breaking over the trucks.
> Olive and graphite tones, one orange traffic cone in the foreground.  35mm film grain,
> anamorphic feel.  No people, no readable text, no logos.

## 2 | OUTRO PLATE (target 12-15s, calm loopable)

**What the pipeline adds on top:** end-card layout | "New video every Tuesday," subscribe
zone (YouTube end-screen element), next-video zone, fieldservicenerd.com.  The plate must be
CALM with low detail on the right two-thirds so end-screen elements read.

**Grok prompt:**

> Cinematic 16:9 static-tripod shot of a workshop wall at dusk, soft warm light from a single
> work lamp on the left side of frame.  Left third: edge of a pegboard with tools, slightly
> out of focus.  Right two-thirds: clean dark olive-graphite wall in soft shadow, empty and
> uncluttered.  Subtle dust in the light beam, gentle light flicker, otherwise still.  35mm
> film grain.  No people, no text, no logos.  Loopable, minimal motion.

## 3 | B-ROLL STARTER SET (6 clips, 6-10s each | cutaways for episodes)

Same look rules for every prompt: 16:9, cinematic, olive/graphite + one orange accent, film
grain, no readable text, no logos, no identifiable faces.

1. **Truck roll-out** | utility van pulling out of a service yard at dawn, low angle.
2. **Hands + work order** | gloved hands flipping thru a worn clipboard on a tailgate,
   shallow focus (cutaway for process/work-order talk).
3. **Dispatch wall** | out-of-focus wall of monitors with abstract map glow in a dark room,
   silhouette foreground (RSO/scheduling talk | keep screens unreadable).
4. **Tech in the field** | technician silhouette from behind, hard hat, walking toward an
   industrial unit with a tablet, heat shimmer (mobile/adoption talk).
5. **Parts shelf** | slow dolly along a warehouse parts shelf, bins and coiled cable, one
   orange bin (inventory talk).
6. **One bar of signal** | phone on a truck dashboard, blurred industrial lot beyond the
   windshield, harsh sun (connectivity/offline talk).

## 4 | Pipeline integration (my side, once clips exist)

- Drop Grok outputs in `youtube/bumpers/` (intro-*.mp4, outro-*.mp4) and `youtube/broll/`.
- **Intro:** trim to 6-8s, grade-match, composite wordmark stamp + episode lower-third,
  replace the static title card in the `finalize` stage.
- **Outro:** trim/loop to 12-15s, composite end-card text, replace the static end card.
  Keep right two-thirds clear for YouTube end-screen elements (subscribe + next video).
- **B-roll:** new `broll.json` manifest (clip, tStart, duration) on the cut timeline | same
  pattern as pills.  Cutaways keep YOUR audio, swap picture only.
- EP02 can ship with intro/outro even if b-roll waits | bumpers are one render each.

## Delivery specs (tell Grok or export at)
- 16:9, 1920x1080 minimum, highest quality/bitrate offered, MP4/MOV.
- No text, no logos, no faces | everything branded gets composited here.
