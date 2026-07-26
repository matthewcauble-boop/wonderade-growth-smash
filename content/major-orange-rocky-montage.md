# Major Orange Rocky-Style Training Montage

High-energy training montage in the timeless 2D treatment: cinematic cel
animation, charcoal/slate-blue palette with hot orange accents and golden
dawn light, subtle film grain, and a driving 1980s-style montage score that
builds from a brooding pulse to a triumphant fanfare. Music only, no dialogue.

Generated 2026-07-19 with Higgsfield (Seedance 2.0, 1080p, 16:9), using
`public/characters/major-orange.png` as the character reference.

## Scenes

| # | Scene | Length | Clip | Job ID |
|---|-------|--------|------|--------|
| 1 | Cold-dawn gym opening — belt tug, game face | 10s | [m1](https://d8j0ntlcm91z4.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH/hf_20260719_171818_c1d7b049-d3fa-4787-8041-089370cce86a.mp4) | c1d7b049-d3fa-4787-8041-089370cce86a |
| 2 | Jump rope at blistering speed | 10s | [m2](https://d8j0ntlcm91z4.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH/hf_20260719_171822_fd3b5fc4-7504-4be5-8934-d349fe235426.mp4) | fd3b5fc4-7504-4be5-8934-d349fe235426 |
| 3 | Strength grind — one-arm push-ups, squat jumps, jug lift | 10s | [m3](https://d8j0ntlcm91z4.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH/hf_20260719_171828_3adc60b4-c8cc-4d1d-a41f-f09cec255cd1.mp4) | 3adc60b4-c8cc-4d1d-a41f-f09cec255cd1 |
| 4 | Dawn sprint through the city | 10s | [m4](https://d8j0ntlcm91z4.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH/hf_20260719_171833_f9992808-8c37-4917-b0b0-77f2ca3c5ad9.mp4) | f9992808-8c37-4917-b0b0-77f2ca3c5ad9 |
| 5 | The steps — sunrise summit, fists raised | 12s | [m5](https://d8j0ntlcm91z4.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH/hf_20260719_171838_002bf1ad-7880-4643-8dd1-e1d10dc5106d.mp4) | 002bf1ad-7880-4643-8dd1-e1d10dc5106d |
| 6 | Victory — shadow-boxing jabs, hero pose, fade | 8s | [m6](https://d8j0ntlcm91z4.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH/hf_20260719_171844_fc084038-ba85-4781-8352-366cebae078f.mp4) | fc084038-ba85-4781-8352-366cebae078f |

Total: ~60 seconds.

## Bonus — one-piece 15s social cut (1080p)

The montage compressed into a single generation with four prompt-described
cuts and one continuous soundtrack — zero editing needed: belt tug at dawn →
blur-speed jump rope → low-tracking city sprint → sunrise steps leap with
fists raised.

[One-piece cut](https://d8j0ntlcm91z4.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH/hf_20260720_014214_70e8fd7f-7124-4eca-8c8b-60079ce93f13.mp4)
— job 70e8fd7f-7124-4eca-8c8b-60079ce93f13

## Anime-refined one-piece cuts (less "AI", 15s, 1080p)

Refinement pass targeting three feedback notes: (1) fix the floaty AI camera
with deliberate LOCKED angles and hard cuts between distinct compositions
(low hero angle, Dutch tilt, side-profile track, ECU on the eyes); (2) fix
the eerie smooth frame rate by asking for authentic anime cadence — LIMITED
ANIMATION ON TWOS (~12fps), stepped motion with held key poses and smear /
impact frames instead of smooth morphing; (3) lean hard into the anime
SPEED-LINE / radial-blur rush backgrounds. Two variants to compare cadence:

| Variant | Emphasis | Clip | Job ID |
|---------|----------|------|--------|
| A | ECU eyes → belt → speed-line sprint → Dutch impact → summit leap | [anime-A](https://d8j0ntlcm91z4.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH/hf_20260726_145431_61a2a211-25a9-4a7d-8302-807f980ed99a.mp4) | 61a2a211-25a9-4a7d-8302-807f980ed99a |
| B | gym silhouette → jump-rope ECU → side-profile speed-line jog → Dutch push-in → stairs summit | [anime-B](https://d8j0ntlcm91z4.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH/hf_20260726_150039_811862ab-eeac-40a8-83fe-4cde2be99a63.mp4) | 811862ab-eeac-40a8-83fe-4cde2be99a63 |

Prompt levers that moved the needle: "animated on twos ~12fps", "held key
poses, NOT smooth morphing", "hard cuts between locked committed angles, no
drifting camera", "anime speed-line / radial-blur rush backgrounds", "smear
frames and impact/emphasis-frame flashes". Combat verbs ("punch", "power up")
still trip the content filter — frame action as effort/training instead.

## Stitching

One command (requires ffmpeg + curl); downloads the clips and blends the six
scores into one continuous soundtrack with synced crossfades:

```bash
./scripts/stitch-major-orange-montage.sh
```

Or lay a single music track over the whole cut:

```bash
./scripts/stitch-major-orange-montage.sh --music yourtrack.mp3
```
