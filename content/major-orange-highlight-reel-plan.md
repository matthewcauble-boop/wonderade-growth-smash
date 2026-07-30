# Major Orange Highlight Reel — Edit Script (v1, pre-production)

60-second SportsCenter-style commentated highlight package of the closing
two minutes: Orange up 2 → rivals tie it → down 1 → buzzer-beater dagger.
Produced as 4 × 15s Seedance segments, each internally MULTI-CUT via the
proven prompt-described hard-cut technique (the same structure as the
approved buzzer-beater clip `af98999b`), then stitched with the verified
crossfade script pattern.

## Pacing rules (why the last test felt flat)

- **A cut every 2–4 seconds.** Never hold one composition longer than 4s
  except the single slow-mo money shot (max 5s).
- **Every shot is a different committed angle** — wide → court-level →
  close-up → replay angle. No two consecutive shots from the same camera.
- **Basketball must be scripted as basketball**: name the move, the ball
  path, and the finish in each shot (crossover left-to-right, step-back,
  high-arc jumper, ball through net, net whip). Generic "plays energetically"
  produces mush.
- **Escalation curve**: each segment ends on a beat change (score change,
  momentum flip) that the commentator calls.

## Shot-by-shot script

### Segment 1 — "Two minutes, Orange by two" (15s, 5 shots)
| # | Len | Camera | Action | Announcer |
|---|-----|--------|--------|-----------|
| 1 | 2s | High wide (broadcast master) | Scoreboard 95–93, clock 2:00, arena buzzing | "Two minutes to go — Orange by two!" |
| 2 | 3s | Court-level behind MO | MO dribbles at the top, surveys; strawberry & banana cut along the wings | "Major Orange surveying..." |
| 3 | 2s | Close-up | MO's eyes flick left, sly grin — he's seen the banana cutting | — |
| 4 | 4s | Side court-level | No-look behind-the-back pass zips LEFT while MO looks RIGHT; ball threads to the banana in stride | "OH — the no-look dime!" |
| 5 | 4s | Under-basket cam | Banana catches and lays it in off the glass; berry crowd bounces; scoreboard flips 97–93 | "Banana with the finish!" |

### Segment 2 — "The Denial" (15s, 5 shots)
| # | Len | Camera | Action | Announcer |
|---|-----|--------|--------|-----------|
| 1 | 3s | Court-level | Lime drives baseline hard, ball low | "Lime with a full head of steam—" |
| 2 | 3s | Under-rim looking up | MO rises from the weak side, palm meets ball, clean swat off the glass | "REJECTED! Get that outta here!" |
| 3 | 2s | Stands close-up | Berry crowd erupts, one blueberry bounces clean out of its seat | — |
| 4 | 4s | SLOW-MO replay, reverse angle | The block again from behind the backboard, ball pinned against glass | "Look at this timing — clean as a whistle" |
| 5 | 3s | Wide master | Rivals inbound fast, pineapple buries a mid-range J; scoreboard 97–95 | "But the rivals answer right back!" |

### Segment 3 — "The Poster... and the gut punch" (15s, 4 shots)
| # | Len | Camera | Action | Announcer |
|---|-----|--------|--------|-----------|
| 1 | 3s | Baseline cam | MO attacks the baseline, gathers off two feet | "Orange to the baseline—" |
| 2 | 5s | Low hero angle, SLOW-MO | Windmill dunk over the crouching pineapple, golden radial burst, rim rattles | "OHHHH! PUT HIM ON A POSTER!" |
| 3 | 3s | Bench/crowd cam | Teammates leap off the bench, towels flying, berries in hysterics; 99–97 | — |
| 4 | 4s | Wide master | Pineapple walks it up and CALMLY buries a deep three at 0:15; scoreboard 99–100; crowd goes dead silent | "...and the captain answers. Orange down ONE." |

### Segment 4 — "Nine seconds. Down one." (15s, 5 shots)
| # | Len | Camera | Action | Announcer |
|---|-----|--------|--------|-----------|
| 1 | 2s | Scoreboard insert → wide | Clock 0:09, 99–100; MO takes the inbound | "Nine seconds... season on the line..." |
| 2 | 3s | Court-level tight | Ankle-breaker crossover — grape lunges, tangles, sits down hard | "Oh he SAT him down!" |
| 3 | 4s | Low hero, TIME SLOWS | Step-back rise over the recovering lime, high-arc release at the apex | "For the win......" |
| 4 | 2s | Behind-the-net cam | Ball drops clean through, net whips, red buzzer light flares, 101–100 | "BANG! ARE YOU KIDDING ME?!" |
| 5 | 4s | Wide master | MO mobbed by strawberry & banana at center court, confetti, berries airborne | "MAJOR ORANGE WINS IT AT THE BUZZER!" |

## Production technique per segment

- **Anchors:** each segment gets a cel-composite START frame (cast + arena
  at verified scale). Segment 4 additionally gets an END-frame composite
  (celebration) — start+end bracketing for the money clip.
- **Multi-cut**: the shot table above goes INTO the prompt as a hard-cut
  list ("HARD CUT:" separated), the technique behind the approved
  buzzer-beater clip. One continuous audio bed per segment.
- **Identity lines** per character + "modern synthwave, NOT chiptune" +
  "only these shots, no extra plays" per the research findings.
- **Validation order:** produce SEGMENT 4 FIRST at 720p (~65cr) — it's the
  emotional core and the hardest (slow-mo + bracket). Machine-QA it, get
  user sign-off on pacing/excitement, THEN batch the other three at 1080p.
- **Stitch:** new `scripts/stitch-highlight-reel.sh` from the verified
  crossfade pattern; `--music` mode available for a licensed synthwave bed.

## Cost estimate

Seg 4 test @720p ≈ 65cr → 4 segments @1080p ≈ 540cr + retakes ≈ 650–750cr
total. Balance at plan time: ~2,490cr.

## Open options (not in v1)

- `video_references`: feeding a real basketball highlight clip as a motion
  reference could sharpen choreography further — needs a source clip file
  (YouTube links can't be imported directly as media).
- Vertical 9:16 reframe of the finished reel for TikTok/Reels.
