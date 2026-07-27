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
