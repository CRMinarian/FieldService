# Field Service Nerd — Motion Graphics Kit (kinetic typography for video)

The channel's on-screen text system.  Ties video motion graphics to the locked "Field
Manual" brand so every episode reads as unmistakably FSN.  Built for the "small person in a
big outdoor space, words in the negative space" intro style (Burke blocking + modern motion
graphics — ref: @thechrisgoor).

## Content principle (Chris Goor) — READ FIRST, it governs everything
- **"Try This," not "Look at This."**  Every beat hands the viewer something to *do*, not
  something to admire.  Reframe spectacle into action.  ("70% fail" → "Did you fix the
  process first?")  This is the difference between value and noise.
- **The question is always specific, and ONE thing.**  One idea per card.  One question per
  beat.  Never a wall, never two ideas fighting.  If a card has two thoughts, split it.
- Tone is **helpful, not dramatic.**  We're handing the viewer a tool, calm and direct.

## Core rule
**The empty space is the stage; the words are the set.**  Shoot wide and outdoor with big
negative space (sky above / ground below / beside), keep the subject to one side, place the
graphics in the void.  **Never put text over Pierre's face** — anchor to the empty side.

## Primary overlay — the VALUE PILL (Chris Goor style)
The workhorse graphic.  A rounded-full card floating in the open space beside Pierre, one
idea each, usually numbered, often headed by an orange **TRY THIS** tag.  Reference:
`youtube/style-pill-value.png`.
- **Pill:** dark olive-black `#14170F`, `border-radius: 100px`, soft drop shadow.
- **Text:** bone `#EDE6D6`, bold, Title Case (friendly, not shouting).  ~38px at 1080p.
- **Number:** Alfa Slab One, safety orange `#E36B2C`.
- **TRY THIS tag:** orange pill, Oswald caps, tracked, sits above the stack.
- **Motion:** each pill slides/fades up in sequence, one per beat, keyed to the VO.  They
  can check off / dim as Pierre moves past each one.
- Use for: frameworks, checklists, the diagnostic questions, "3 things," CTAs.

The dramatic **sky-stamp** (big Alfa Slab stat, e.g. `70% FAIL`) still exists for the rare
genuine gut-punch — but it's the exception.  Default to the value pill.

## Type
- **Oswald** (display words / phrases) — uppercase, tracked `+0.05em`.  The workhorse.
- **Alfa Slab One** (the ONE big punch stat only, e.g. `70% FAIL`) — use sparingly, one per beat.
- **JetBrains Mono** (data ticks, sub-labels, numbers, timestamps) — the "instrument readout" voice.

## Color (from `web/tokens`)
- **Bone `#EDE6D6`** — neutral words, the default.
- **Safety orange `#E36B2C`** — the punch word / the stat.  One orange hit at a time.
- **Steel** — secondary/quiet labels.
- **Warning yellow** — rare, only for a genuine "caution" beat.

## Motion
- **Words:** rise + fade in over ~0.3s, hold, fade or hard-cut out on the next stressed word.
- **The big stat:** *stamps* in — scale 1.06 → 1.0 with a tiny rotate (−1.5°) — echoes the
  patch/thumbnail stamp.  Optional count-up on the number.
- **Mono ticks:** type on character-by-character.
- **Undercut beat:** when Pierre contradicts the words ("but it does…"), the graphics
  **crack / glitch / fall.**
- **Sync:** one or two words at a time, each keyed to a stressed word in the VO.  Never a wall.

## Restraint
Graphics go **silent** the moment Pierre is in close/medium framing.  The negative-space text
is for the wide "small person" shots; when we're intimate, his eyes carry it.

## Signature motif
**Linked nodes** (small dots joined by thin lines) animating across the lower third — a
running visual nod to *Connections*.  Use as a recurring transition/lower-third device.

## Reference frame
`youtube/ep01-intro-comp.png` — composition mock: small figure, dusk fleet yard, `70% FAIL`
in the sky in brand type.  (Placement/type guide, not final footage.)
