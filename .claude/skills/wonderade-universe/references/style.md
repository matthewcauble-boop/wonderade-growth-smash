# Wonderade Style Bible

The locked look-and-sound recipe. It was earned through ~10 rounds of user
feedback — deviations re-introduce the exact "AI look" problems that were
already rejected, so treat every bullet as load-bearing.

## Brand palette (from site code)

| Use | Hex |
|---|---|
| Navy outline (everything) | `#374191` |
| Major Orange body | `#F68C1E` / accent `#F57D14` |
| Pip / star yellow | `#FBD02E` / highlight `#FFD246` |
| Princess Punch pinks | `#F499C1` / `#E56CA9` |
| Purple (boots, gloves, accents) | `#7F489C` |

## Animation recipe (video prompts — include these levers verbatim-ish)

These exact phrases moved the needle in testing; keep using them:

- "flat 2D cel animation in the character's exact art style, bold navy
  outlines, flat colors"
- "limited animation ON TWOS (~12fps), stepped motion with held key poses"
- "smear frames and white impact/emphasis-frame flashes"
- "NOT smooth AI interpolation / not smooth morphing" ← kills the uncanny
  liquid-morph tell; always include some form of this negation
- "locked static camera, hard cuts between distinct committed compositions
  (low hero angle, ECU on eyes, side profile) — no drifting camera"
- "anime speed-line / radial-burst rush background, subject held crisp"

## Emotion direction

Genuinely happy, positive, showman energy — but the expression must SHIFT
shot to shot (grin → mid-air awe → effort → beaming celebration). A single
held smile across a clip was rejected twice ("creepy", "robotic",
"face stuck on smile"). Write a distinct expression into every shot of the
prompt's shot list.

## Music & audio

- Uplifting **modern synthwave**: warm arpeggios, bright pads, feel-good
  groove. NOT the 80s/90s montage sound (explicitly rejected).
- **Music only.** No voice, no dialogue, no lyrics, no narration.
- No on-screen text, captions, or title cards. One exception: diegetic
  in-world numbers (e.g. an arena scoreboard/game clock) when story-critical.

## Story legibility

Wordless stories must read through sports-movie visual language: stakes shot
(scoreboard/clock), reaction cutaways (crowd), setback beat, rally, slow-mo
climax, eruption. If a beat isn't legible in a still storyboard frame, it
won't be legible animated — fix it at the BOARD stage.

## Prompt skeleton (video)

```
[STYLE BLOCK — cel/on-twos/locked-camera/speed-lines levers above]
[SHOT LIST — "HARD CUT:" separated, one composition + one expression each,
 <<<element-uuid>>> at each character mention]
[MUSIC — modern synthwave description; "music only, no voice, no text"]
```

Keep every clip ≤15s (model cap); longer pieces = multiple clips + stitch
script (see SKILL.md gotchas).
