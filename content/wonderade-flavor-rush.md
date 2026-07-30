# "Flavor Rush" — inside the drink

15-second trippy action short. Major Orange takes a sip and the camera dives
*into* the carton: a liquid dimension of citrus tunnels, kaleidoscope mandalas
and zero-gravity juice spheres, with aspirational symbols streaming past.
Hard cut back to the courtyard on the product. No dialogue.

Brief was "a really crazy trippy cartoon with a lot of action". User approved
the script 2026-07-30 and added the symbol layer mid-board.

## ★ FINAL DELIVERABLES

- **16:9** (15.0s, 1280x720) — *big-band jazz bed*:
  https://d2ol7oe51mr4n9.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH/652443b5-647d-43ea-9af0-b1d8a0058f90.mp4
- **9:16 TikTok** (15.0s, 720x1280, reframe `2cfbac82`) — *modern synth bed*:
  https://d2ol7oe51mr4n9.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH/bcb87924-ad06-4b1d-b8a4-49689cb4061f.mp4

The two masters deliberately differ in score — see *Two beds* below. (The
jazz-bed vertical `2c5e70db-…` is superseded.)

At 15s the reframe returned a SINGLE segment (no split/concat needed, unlike
the 30s Training Day cut) — another reason to keep shorts at or under 15s.

## Shot script

| # | Len | Shot |
|---|-----|------|
| 1 | 2.0 | Courtyard. Big sip through the straw; the carton's glow swells toward camera |
| 2 | 2.5 | Inside: a citrus tunnel at extreme speed, he tears down it like a torpedo |
| 3 | 2.5 | Orange-slice kaleidoscope mandala rotating; he dives through the centre |
| 4 | 2.5 | Zero-G: shoves off a giant juice sphere, impact rings bursting |
| 5 | 3.0 | Surfs the outside of a spiral juice tube, arms wide (peak) |
| 6 | 2.5 | Hard cut back to the courtyard, carton held up, big open grin |

Total 15.0s exactly — which means the music bed needed only ONE 15s clip
instead of two crossfaded.

## The cheap-abstraction trick

Shots 2–5 have no locked environment element, because they are abstract.
Consistency is held instead by a **fixed palette instruction** repeated
verbatim in every prompt: *vivid orange and gold against deep teal,
hard-edged cel shapes, NO gradients, NO haze*. QA confirmed all four read as
one continuous world.

This is why the idea was affordable: an abstract interior costs nothing to
lock, where a new physical location would have needed its own boarded,
approved, registered master. Worth reaching for when the budget is tight.

## The symbol layer (user note, mid-board)

> "inside of the liquid should be more aspirational symbols shooting around
> that demonstrate strength and curiosity"

A tight, repeating vocabulary of six flat gold-and-white glyphs with navy
outlines — **strength:** lightning bolts, upward chevron arrows, five-pointed
stars; **curiosity:** comets with sparkle trails, tiny rockets, compass roses.
The same six recur in every interior shot so they read as a designed language
rather than random decoration, and they behave differently per shot: streaking
past in the tunnel, arranged into the mandala rings, bursting from the sphere
impact, streaming upward on the surf.

**Deliberately NOT using question marks** — the obvious "curiosity" glyph, but
punctuation reads as typography and makes the model spawn garbled letters,
breaking the no-text rule. Every symbol prompt ends with: *NO letters, NO
numbers, NO words, NO question marks, NO punctuation of any kind — symbols
ONLY.* QA confirmed zero text across all shots.

## Production record (2026-07-30)

### Board — 14 renders, three QA rounds

| # | board job | # | board job |
|---|---|---|---|
| 1 | `d01e9fa4` | 4 | `43bf27d3` |
| 2 | `9d98f826` | 5 | `7caf592f` |
| 3 | `b5302bba` | 6 | `878734f3` |

Defects caught and fixed before the board was shown:

- **Speed read as floating.** Shot 2 first came back with him spread-eagle in
  the tunnel — technically inside a speed effect but posed as if drifting.
  Naming the velocity is not enough; the model defaults to a symmetrical
  floating T-pose. Fixed by specifying the LIMBS: arms pinned back, legs
  together, body angled like a torpedo, and banning spread-eagle.
- **One arm.** Shot 1 rendered Major Orange with a single arm (QA: "a single,
  extremely muscular arm on its right side"), corroborated by shot 4 noting
  his arms were "now appearing bilateral". His reference art is a one-arm
  flex, so the model sometimes drops the other entirely. "Exactly two arms" is
  insufficient — name the sides and say what each hand is doing.
- **Action replaced by a pose.** Shot 4 had him standing on top of a sphere
  flexing instead of rebounding off it. Re-specified as airborne mid-bounce.
- **Closed-mouth smile** on shot 6 — my own prompt error, not model drift.
  Retaken with the open teeth-showing grin; recorded as canon in
  `characters.md`.

### Animation — 6 × 5s Seedance 2.0 @720p

| # | video job | # | video job |
|---|---|---|---|
| 1 | `4d5c0904` | 4 | `7fa1a565` |
| 2 | `4d1bd768` (silent) | 5 | `40cbf6ec` |
| 3 | `c9f107e6` (silent) | 6 | `38602101` (silent) |

`generate_audio` was set FALSE up front on the three shots that would be muted
at mix anyway — cheaper than fighting leaked music later.

**Music bed:** `95eda0c8`, one 15s clip on a static frame. Prompted for bright
modern electronic; **came back as upbeat big-band jazz with brass**. A genre
miss, but internally consistent and high-energy — user accepted it ("the music
is fine") rather than spend ~67 credits regenerating.

### Two beds — how to actually get synth out of Seedance

The user later asked for modern synth on the vertical cut, so a second bed was
generated: `ff0848fa`. The first attempt had politely asked for "bright
high-energy modern electronic, punchy drums, arpeggiated synth" and got a
brass section. What worked the second time was being explicit in both
directions at once:

- **Name the instruments, not the genre.** "Fast bright arpeggiated analog
  synth sequence, thick warm analog pad chords, drum machine with a snap snare
  and deep sub bass, soaring lead synth." Genre words alone ("electronic")
  leave the model room to pick any upbeat arrangement it likes.
- **Ban the specific instruments you got last time**, by name — no brass, no
  horns, no trumpet, no sax, no big band, no swing, no acoustic kit, no piano,
  no guitar, no orchestra — and close with "synthesizers and electronic drums
  ONLY."

Generic negatives ("not jazzy") do nothing. The named-instrument ban is what
moves it.

Because the bed is a separate clip, swapping the score costs one bed
generation (~67cr) and a free ffmpeg re-mix — the clips and the reframe are
untouched. Worth remembering: **score is the cheapest thing in the pipeline to
change**, so never re-render picture over a music note.

### Assembly

Single ffmpeg pass: per-clip trim windows (clips ramp up from the still start
frame, so every cut lands 0.5–1.0s in), 6-way concat, 0.5s fade to black.
Audio keeps clip SFX only on shots 1, 4 and 5 (slurp, bounce, splash) with
`anullsrc` silence elsewhere so the bed runs unbroken; bed at 0.85 under an
`alimiter`. Verified by `video_analysis` `f2873821` — all six beats in order,
glyphs present, no text.

### Rebuilding the vertical mix

The vertical is not a re-render — the reframed picture (`2cfbac82`, silent as
all reframes come back) is muxed against a fresh audio mix built from the
original clip trims plus the new bed:

```
segments  1:0.8-2.8  2:silence  3:silence  4:0.8-3.3  5:0.5-3.5  6:silence
kept SFX  S1 @0.9, S4 @1.0, S5 @1.0 (0.12s fades both ends)
bed       atrim 0:15, afade in 0.3 / out st=13.2 d=1.8, volume 0.85
mix       amix normalize=0 -> alimiter=limit=0.95
mux       -map 0:v (reframe) -map 1:a (new mix) -c:v copy -shortest
```

Only three clips need downloading — the three muted shots contribute
`anullsrc` silence, so they never have to be fetched at all.

Total spend ≈ 300 credits (14 boards, 6 clips, 2 beds) plus 75 for the
reframe.
