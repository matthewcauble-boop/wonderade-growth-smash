# Major Orange + Kids Mixed-Reality Workout

Roger-Rabbit-style mixed reality: real live-action footage (sunny park lawn,
cinema-camera look, golden light) with 2D cel-animated Major Orange composited
into the real world — hand-drawn flat-color character with contact shadows —
leading three real kids through the workout routine. Upbeat funk-pop
instrumental, music only, no dialogue.

Generated 2026-07-19 with Higgsfield (Seedance 2.0, 1080p, 16:9), using
`public/characters/major-orange.png` as the character reference.

## Scenes

| # | Scene | Length | Clip | Job ID |
|---|-------|--------|------|--------|
| 1 | Intro — Major Orange bounces in, kids light up | 10s | [k1](https://d8j0ntlcm91z4.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH/hf_20260719_224515_9795ac74-9975-45bc-9121-6e960d3fc26d.mp4) | 9795ac74-9975-45bc-9121-6e960d3fc26d |
| 2 | Side-lunge steps — kids follow in a row | 10s | [k2](https://d8j0ntlcm91z4.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH/hf_20260719_224520_713cd4f0-6235-47e1-ac45-878328cd8884.mp4) | 713cd4f0-6235-47e1-ac45-878328cd8884 |
| 3 | Tap-step footwork, arms out and in | 10s | [k3](https://d8j0ntlcm91z4.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH/hf_20260719_224526_0fd5e57e-02a7-465e-b86d-cf71d0c08882.mp4) | 0fd5e57e-02a7-465e-b86d-cf71d0c08882 |
| 4 | Hip twists — giggles, one kid topples and pops back up | 10s | [k4](https://d8j0ntlcm91z4.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH/hf_20260719_224532_8a662225-d40c-4fe1-84e2-f302b5fa1d5d.mp4) | 8a662225-d40c-4fe1-84e2-f302b5fa1d5d |
| 5 | Full routine finale — the whole gang | 12s | [k5](https://d8j0ntlcm91z4.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH/hf_20260719_224536_521dc0fd-1c08-423d-86f9-f20152b6fce4.mp4) | 521dc0fd-1c08-423d-86f9-f20152b6fce4 |
| 6 | High-five goodbye with cartoon spark | 8s | [k6](https://d8j0ntlcm91z4.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH/hf_20260719_224541_b6fcdebe-1671-4132-903b-7810205f991f.mp4) | b6fcdebe-1671-4132-903b-7810205f991f |

Total: ~60 seconds.

## Stitching

One command (requires ffmpeg + curl); downloads the clips and blends the six
scores into one continuous soundtrack with synced crossfades:

```bash
./scripts/stitch-mixed-reality-kids.sh
```

Or lay a single music track over the whole cut:

```bash
./scripts/stitch-mixed-reality-kids.sh --music yourtrack.mp3
```

Note: the "kids" in these clips are AI-generated people, not real minors —
fine for concept/testing, but check your ad-platform policies on synthetic
people before running this as paid creative.
