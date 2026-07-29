# "Training Day" — Major Orange x Princess Punch buddy comedy

30-second wordless buddy-comedy montage. Princess Punch invites Major Orange
to train at her bamboo courtyard; the piece runs a strict A/B rhythm — a
serene PP beat, then MO attempting the same thing and destroying it — with
Pip deadpan through the wreckage. A single unbroken bamboo-flute bed never
reacts to the chaos, which is where most of the comedy lives. No dialogue.
User picked the premise and approved the script 2026-07-29.

Sequel to [The Master](./wonderade-the-master.md); reuses the locked
bamboo-courtyard environment and the zen-teacher Pip canon established there.

## ★ FINAL DELIVERABLE (v5, 30.0s, 1280x720, 16:9)

https://d2ol7oe51mr4n9.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH/35ad5a15-465e-473e-b59e-5319defba3ed.mp4

(v3 `3bf7d237-…` was superseded — see "Major Orange is always confident" below.)

## Approved shot script

| # | Len | Shot | Beat |
|---|-----|------|------|
| 1 | 2.0 | Wide: PP calm and centered, MO stretching way too eagerly | setup |
| 2 | 2.5 | PP balances one-legged atop a bamboo pole, petals drifting | grace |
| 3 | 3.0 | MO's pole bends double and flings him out of frame, whooping | crash 1 |
| 4 | 2.0 | CU Pip, serene; MO arcs across the sky behind him | deadpan |
| 5 | 2.5 | PP flows through silk-smooth tai chi | grace |
| 6 | 3.0 | MO copies it at 10x and blasts the dummy into straw | crash 2 |
| 7 | 2.0 | MO beside the wreckage, fists on hips, proud of himself | reaction |
| 8 | 2.5 | PP waters a bonsai — one perfect drop | grace |
| 9 | 3.0 | MO "helps" with a barrel and floods the courtyard | crash 3 |
| 10 | 2.0 | CU Pip, water at the pedestal top, entirely unbothered | deadpan |
| 11 | 3.5 | Sunset: both on the step, toasting with their cartons | payoff |
| 12 | 2.0 | End card: the two cartons in golden light | brand |

## Production record (2026-07-29)

### Board (12 frames, nano banana, 16:9 2K)

| # | board job | # | board job |
|---|---|---|---|
| 1 | `23f9505e` | 7 | `bc95b2cc` |
| 2 | `5beedf43` | 8 | `8c282784` |
| 3 | `ff06528b` | 9 | `6981c0f7` |
| 4 | `26914fa4` | 10 | `dbbea5d5` |
| 5 | `77e74a54` | 11 | `65a29bdd` |
| 6 | `d2867fe4` | 12 | `a762df7b` |

Six frames needed retakes before the board passed (QA analyses `7472131d` →
`3ee6970d` → `74d36d37`, 12/12 clean):

- **S3 the bent pole did not render at all** — the model drew MO leaping
  through empty air and the entire gag was gone. Fixed by describing the pole
  as a physical object first ("bent ALL THE WAY OVER into a deep C-shaped
  curve like a drawn bow, its tip almost touching the ground") before
  mentioning the character.
- **S2** came back a fist power pose instead of a serene balance; **S5** came
  back in warm golden light, which would have pre-empted the sunset ending,
  plus a combat crouch instead of a tai-chi flow.
- **S6** rendered MO angry — canon is that he is never angry; the joke is that
  he is delighted and oblivious.
- **S7 took four attempts.** Every "embarrassed close-up" came back either
  flexing proudly or gritting his teeth in strain, because his canonical PNG
  is a flexing pose and any prompt near his arms collapses into it. Solved by
  changing the STAGING rather than the face: medium-wide, full body, wreckage
  pile on the floor, one tiny splinter pinched between two fingertips.
  (Superseded at v5 — the user cut the sheepish beat entirely. Worth keeping
  as the record of *why* the model resisted: it was defending canon.)

### Animation (12 × 5s Seedance 2.0 @720p, start-frame anchored)

| # | video job | # | video job |
|---|---|---|---|
| 1 | `a2193e0a` | 7 | `fd10ba84` |
| 2 | `7444ca1d` | 8 | `a4d2c922` |
| 3 | `ce0d03d0` | 9 | `e31ef8b6` |
| 4 | `c49c94b4` | 10 | `711cec5b` |
| 5 | `940ffd70` | 11 | `f21ab3a6` |
| 6 | `19ec6c99` | 12 | `e8103a78` (silent) |

### Major Orange is ALWAYS confident (user note, v3 → v5)

The user rejected the v3 cut: *"he should be smiling and confident at all
times not scared looking."* This retired the entire sheepish-reaction design
— including the shot-7 beat that had taken four board attempts to get
"embarrassed" right. Three shots were reboarded and re-animated:

| # | was | now |
|---|-----|-----|
| 3 | panicked grin, shocked eyes on the launch | whooping with joy, "like a kid on a rollercoaster" (board `72c56741` → clip `ce0d03d0`) |
| 7 | slumped, apologetic, holding a splinter | fists on hips, chest out, proud of the wreckage (board `0975f542` → clip `fd10ba84`) |
| 9 | sheepish "oops" grin while flooding | laughing, handling the barrel effortlessly (board `5db2748f` → clip `e31ef8b6`) |

The spot is funnier for it: the gag is now the gap between his enthusiasm and
the damage, never him feeling bad about it. Canon recorded in
`characters.md` — he is never sad, scared, worried, or apologetic.
Verified by `video_analysis` `3142ee9c`.

Pip reads as a stone statue in still frames, so S4 and S10 explicitly animate
him alive — a gentle squash-and-stretch bob plus one slow deliberate blink.

**Music bed:** `c7eaf452` (bamboo flute + koto, 15s on the static courtyard
master). A second segment `e2e5ab7a` was generated as the resolve but drifted
into upbeat electronic, so the final mix crossfades segment A with itself
(`asplit` → `acrossfade=d=3`) to guarantee one consistent instrument across
the whole 30s.

### Audio design — the fix that mattered

The first assembly mixed every clip's diegetic track under the bed. QA came
back describing a different score in almost every scene: the clips had leaked
their own background music despite an explicit ban, and they were fighting
each other and the flute.

The fix was to keep clip audio ONLY on the four beats where a loud effect
masks any leaked music — S3 (the pole twang), S6 (the wood shatter), S7 (the
reaction), S9 (the flood) — and replace every other clip's track with
`anullsrc` silence, letting the flute bed carry the rest uninterrupted. Each
kept segment gets a 0.12s fade at both ends so the splices don't click.
Final mix: clip SFX at 0.8–1.0, bed at 0.85, `amix … normalize=0` into an
`alimiter`.

**Reusable lesson:** when Seedance leaks music into clips, do not try to
balance it — mute the clips wholesale and reintroduce audio only under
effects loud enough to hide the leak.

### Assembly

Single ffmpeg pass in the Higgsfield sandbox: per-clip `trim` windows (clips
ramp up from their still start frame, so every cut lands 0.3–1.0s in),
12-way video concat, 0.6s fade to black over the end card, the audio graph
above. Verified by `video_analysis` `96a1fe0a` — all 12 beats in order, one
continuous flute bed, effects punctuating.

Total spend ≈ 480 credits including 6 board retakes and one discarded bed.
