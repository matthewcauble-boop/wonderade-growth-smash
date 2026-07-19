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
