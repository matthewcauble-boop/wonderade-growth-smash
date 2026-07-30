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

## Version 2 — candid retake (720p)

Retake after feedback that v1 felt uncanny (fixed smiles, stiff character).
Direction changes: kids written as candid documentary subjects — varied
genuine expressions, imperfect timing, never posing at the camera — and
Major Orange animated with springy squash-and-stretch, anticipation, and
follow-through on his leaf and belt. Rendered at 720p to fit remaining
credits; keepers can be upscaled with Higgsfield upscale_video. The stitch
script now points at these v2 clips.

| # | Scene | Length | Clip | Job ID |
|---|-------|--------|------|--------|
| 1 | Opening — bouncy leap, genuine surprise | 10s | [k1v2](https://d8j0ntlcm91z4.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH/hf_20260719_231057_1d4e7213-970b-45e1-82ea-2012d40f0453.mp4) | 1d4e7213-970b-45e1-82ea-2012d40f0453 |
| 2 | Side-lunge steps — kids out of sync, tongue-out focus | 10s | [k2v2](https://d8j0ntlcm91z4.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH/hf_20260719_230527_dc327177-8336-4002-b416-95d624e3bd0d.mp4) | dc327177-8336-4002-b416-95d624e3bd0d |
| 3 | Tap-step footwork — counting, wobbling, proud glances | 10s | [k3v2](https://d8j0ntlcm91z4.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH/hf_20260719_230534_4a7e907c-28bd-4407-a33f-018961c78446.mp4) | 4a7e907c-28bd-4407-a33f-018961c78446 |
| 4 | Hip twists — real-kid chaos, grass flop and recovery | 10s | [k4v2](https://d8j0ntlcm91z4.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH/hf_20260719_230542_c2177d5c-2c8d-42a7-bff6-fda101419cac.mp4) | c2177d5c-2c8d-42a7-bff6-fda101419cac |
| 5 | Full routine — loose joyful chaos, push-in | 12s | [k5v2](https://d8j0ntlcm91z4.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH/hf_20260719_230549_badff489-e458-4e95-80c8-9b2595406bda.mp4) | badff489-e458-4e95-80c8-9b2595406bda |
| 6 | Goodbye — kids flop on grass, wind-up high-five | 8s | [k6v2](https://d8j0ntlcm91z4.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH/hf_20260719_230556_30b02638-35dd-4959-b764-af6be1800f89.mp4) | 30b02638-35dd-4959-b764-af6be1800f89 |

## Version 3 — natural facial animation (scenes 1, 4, 6)

Retake after feedback that Major Orange's face was stuck on a permanent
smile. His expressions now change with the action: curious eyebrows,
focused concentration, puffed-cheek effort, encouraging nods, and a grin
only at earned moments. Remaining credits covered the three most
face-forward scenes; 2, 3, and 5 keep their v2 takes. The stitch script
uses these v3 clips for scenes 1, 4, and 6.

| # | Scene | Length | Clip | Job ID |
|---|-------|--------|------|--------|
| 1 | Opening — determined landing, raised-brow scan, one warm nod | 10s | [k1v3](https://d8j0ntlcm91z4.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH/hf_20260719_233119_93542b60-98f5-4e58-9249-eb57c92260da.mp4) | 93542b60-98f5-4e58-9249-eb57c92260da |
| 4 | Hip twists — effort face, chuckle at the grass flop | 10s | [k4v3](https://d8j0ntlcm91z4.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH/hf_20260719_233126_4c2e3600-a6eb-4ce7-8af2-b387efcc9efb.mp4) | 4c2e3600-a6eb-4ce7-8af2-b387efcc9efb |
| 6 | Goodbye — winded exhale, proud look, one genuine smile | 8s | [k6v3](https://d8j0ntlcm91z4.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH/hf_20260719_233136_88c14978-21be-4dcf-999c-14c66561eedf.mp4) | 88c14978-21be-4dcf-999c-14c66561eedf |
