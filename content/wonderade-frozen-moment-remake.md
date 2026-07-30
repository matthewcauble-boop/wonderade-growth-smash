# "The Whole World Stops" — Wonderade Frozen-Moment Remake

~30s remake of the classic "Frozen Moment" Air Jordan spot
(https://www.youtube.com/watch?v=NseKug63naM), recreated concept-for-concept
in the Wonderade fruit universe: the world literally stops to watch Major
Orange play. Dramatic operatic soprano against cartoon sports carries the
piece; no dialogue anywhere. User approved this script 2026-07-27.

## Approved shot script

| # | Time | Shot | Audio |
|---|------|------|-------|
| 1 | 0–1 | Wide: MO crouched dribbling vs grape, dark dramatic arena, hard spotlight | Crowd rumble, ball thumps → opera soprano begins |
| 2 | 1–3 | CU: MO advancing, fierce focus, rivals blurred behind | Opera builds |
| 3 | 3–5 | ECU: his hand maneuvering the ball, high contrast | Bass boom on the bounce |
| 4 | 5–6 | Row of berries bouncing on tiny treadmills, gym TVs overhead | — |
| 5 | 6–8 | Princess Punch on a treadmill, head tilted up, stunned admiration | Soprano sustains |
| 6 | 8–9 | Over PP's shoulder: TV showing MO's game | — |
| 7 | 9–10 | ECU: MO's eyes flick up to the hoop | — |
| 8 | 10–12 | The crossover past the lime | Strings join |
| 9 | 12–14 | Lemon at a Wonderade juice stand, cup long full, juice cascading over the counter, staring at unseen TV | Splash under opera |
| 10 | 14–15 | CU: purple star boots hard pivot | Squeak in the music |
| 11 | 15–16 | MO walled by pineapple + lime + grape, dark spotlight isolation | — |
| 12 | 16–19 | Berry family on red sofa, puppy scratching at the glass door, nobody moves | Muted scratching |
| 13 | 19–21 | Berry kid on dark sidewalk gazing up at store window of synchronized TVs | — |
| 14 | 21–24 | MO rises over the pineapple, apex, ready to slam | Crescendo |
| 15 | 24–25 | Two elderly raisins in a dark den, mouths in a perfect "O" | Brass peak |
| 16 | 25–27 | CU: the berry kid's wide, screen-lit eyes | High note held |
| 17 | 27–28 | Straight-down-through-the-net POV: the slam | Rim crack + swish |
| 18 | 28–31 | Fade to black → the Wonderade Major Orange carton, centered | Final note resolves → silence |

## Production process (per the wonderade-universe skill)

1. Board all 18 frames as stills (~1.5cr each): shared masters first (dark
   dramatic arena; treadmill gym; juice stand; living room; TV-store
   window; raisin den), then character shots via cel-composite / anchored
   generation. Machine-QA every frame.
2. User approves the complete 18-frame board.
3. Animate shot-by-shot from approved frames (start-frame anchored, some
   start+end bracketed), assemble the cut with ffmpeg — cuts land exactly
   where the board says.
4. Audio: operatic soprano bed; per-shot diegetic accents; end in silence
   on the carton card.

## Asset ledger

Existing: fruit-arena-v2 master + all five ballplayers + Princess Punch +
Major Orange carton element (`f1ed3aa1-…`). New builds required: dark-grade
arena master, 5 watcher-vignette environments, elderly-raisin characters,
berry-kid, puppy, and per-shot poses.

## Production record (completed 2026-07-27)

**★ FINAL DELIVERABLES (v5 picture lock, no announcer, no horn):**
- 16:9 (26.4s, 1280x720):
  https://d2ol7oe51mr4n9.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH/ec6c459e-2a8c-4e93-8e35-0cba0dd1cfeb.mp4
- 9:16 TikTok (26.1s, 720x1280, AI content-aware reframe `c5a8dc1a`+`c74ec5b2`
  stitched, original audio re-laid):
  https://d2ol7oe51mr4n9.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH/bc4d78f9-bc79-4025-bbf1-903fab678d6e.mp4

### Revision history (all user-directed, same picture assets re-cut)

- **v3** re-pace 31s→26.4s: every shot trimmed to its liveliest window
  (cut in mid-motion, never at the static first frame); S1 re-shot as a
  one-hand DRIVE past the grape (`e7c43f3e`) after a two-hand dribble read.
- **v4** S8 re-shot as crossover-AND-drive-past-the-lime (`458fc23e`) —
  "dribbling in place" reads flat; drives read exciting.
- **v5** S17 re-shot from the SIDE (new board `9f2ca32a` → clip `c556312f`,
  QA `99ef4be8` confirmed the make; original take's music-free audio kept).
- **v6–v9 (audio experiments, superseded)**: radio announcer VO (seed_audio
  then qwen_audio_tts w/ style instruction), broadcast chain (300–3400Hz +
  6:1 comp + limiter), courtside crowd bed inside the VO channel, sox-synth
  arena horn. User verdict: drop announcer + horn entirely → v5 audio is
  final. Lessons: TTS announcer reads uncanny against this opera treatment;
  Seedance ALWAYS leaks a music bed into dunk clips (splice proven clean
  audio instead); crowd-in-mic + shared compressor is the right courtside
  recipe if VO ever returns.

**FINAL CUT v2 (31.0s, 1280x720):**
https://d2ol7oe51mr4n9.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH/33750a91-ddef-49ae-a203-0928b1dd7300.mp4
(media `33750a91-…`. v1 `aff0d12b-…` / QA `df2b16f8` verified all 18 beats,
but the user caught shot 17's dunk MISSING the basket — machine QA
described "slams through the net" for a rim-out. Retake `90c6382f` scripted
the make explicitly ("does NOT hit the rim, does NOT bounce out"); its own
QA `863e1154` confirmed the ball passing through the net. v2 splices the
retake's t=2–3s (the slam beat) with the ORIGINAL take's audio, because the
retake leaked an electronic music bed despite the music ban. Lesson: QA
scene descriptions narrate intent, not outcome — for a make-or-miss beat,
verify the result shot-specifically and script the outcome in the prompt.)

All 18 shots animated as 5s Seedance 2.0 clips @720p (~23cr each) from the
approved board frames (start-frame anchored, motion-only prompts, diegetic
audio only, `NO music` so the bed mixes cleanly). Shot job IDs:

| # | video job | # | video job |
|---|---|---|---|
| 1 | `d1a5e7a2` | 10 | `9b59a522` |
| 2 | `d46aac2f` | 11 | `3ae6b6fe` |
| 3 | `86e3898a` | 12 | `444216ae` |
| 4 | `9ad0111d` | 13 | `d1323d05` |
| 5 | `0fc3e170` | 14 | `e2cb9324` |
| 6 | `6d8a95f1` | 15 | `f0251366` |
| 7 | `55d8f792` | 16 | `44601c98` |
| 8 | `c88bd13b` (pilot v3, one-hand dribble fix) | 17 | `6aafc518` |
| 9 | `632cdbc3` (pilot B) | 18 | `84f7f101` (generate_audio false — silent) |

**Opera bed:** `generate_audio` is speech-only, so the aria was produced as
two 15s Seedance clips on the static dark-arena master, audio extracted at
assembly: build `e3604f9a` + finale `51338fb0` (first finale attempt
`b009d2f3` was NSFW-flagged for the word "CLIMAX" — reworded to "FINALE").

**Assembly (Higgsfield sandbox, single ffmpeg pass):** each clip trimmed
from t=0 to its script length (1/2/3s), 18-way video concat with
fade-to-black into the carton card; audio = 17-clip diegetic concat at 0.7
+ opera bed (`acrossfade d=2`, delayed 1s, fade-in 1.5s, fade-out 27–29s)
mixed on top; ends in true silence. Total spend ≈ 500cr incl. the bed and
one pilot retake.
