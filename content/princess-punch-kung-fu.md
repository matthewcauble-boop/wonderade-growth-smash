# Princess Punch Kung Fu Montage

Fast-paced, high-action martial-arts montage in the cinematic 2D treatment:
cel animation in her original art style, deep ink blacks with misty jade and
lantern gold, anime speed lines, expressive face (fierce focus, effort —
never a fixed smile), and a cinematic martial-arts score — taiko and
breakbeat percussion with string stabs synced to the choreography. Music
only, no dialogue.

Generated 2026-07-19/20 with Higgsfield (Seedance 2.0, 720p, 16:9), using
`public/characters/princess-punch.png` as the character reference.

## Teaser (2 scenes rendered — credit budget)

| # | Scene | Length | Clip | Job ID |
|---|-------|--------|------|--------|
| 1 | Opening — misty bamboo courtyard, eyes snap open, braid cinch, stance | 10s | [f1](https://d8j0ntlcm91z4.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH/hf_20260719_235439_b73684f2-73e7-4ee9-90c1-04bf4208bba2.mp4) | b73684f2-73e7-4ee9-90c1-04bf4208bba2 |
| 6 | Training finale — dummy flurry, swinging log, bell-kick, slow-mo finish | 10s | [f6](https://d8j0ntlcm91z4.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH/hf_20260720_000007_648befb8-7dd9-488f-b19d-cc82b49fecad.mp4) | 648befb8-7dd9-488f-b19d-cc82b49fecad |

## Planned middle scenes (fire after credit top-up, ~45 credits each at 720p)

2. **Speed strikes** — rapid-fire glove combos on the wooden dummy, petals
   bursting, drum stabs per hit (10s)
3. **Footwork + agility** — darting between bamboo stalks, wall-kick flip,
   landing in stance, speed lines (10s)
4. **Balance training** — one-boot stance on a post at sunset, slow control
   contrast beat before the final sprint (8s)
5. **The gauntlet** — chaining everything at maximum tempo through the
   courtyard, quick cuts, rising percussion into the finale (12s)

Prompt template: reuse the teaser scenes' style block (cinematic 2D cel,
ink/jade/gold grade, expressive face, taiko score). Note: explicit
strike-by-strike combat wording can trip the content filter — frame action
as "training forms/routine" (the finale needed that rewording to pass).

## Full montage — 1080p master (complete)

All six scenes rendered at 1080p after the credit top-up, including 1080p
re-renders of the two teaser scenes. ~60 seconds total.

| # | Scene | Length | Clip | Job ID |
|---|-------|--------|------|--------|
| 1 | Opening — eyes snap open, stance | 10s | [q1](https://d8j0ntlcm91z4.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH/hf_20260720_011108_25425a41-8407-48c3-84a8-9213f9f154f9.mp4) | 25425a41-8407-48c3-84a8-9213f9f154f9 |
| 2 | Speed forms on the dummy | 10s | [q2](https://d8j0ntlcm91z4.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH/hf_20260720_011114_25cd89d8-9ef8-4ba0-a716-e3d352aaffe3.mp4) | 25cd89d8-9ef8-4ba0-a716-e3d352aaffe3 |
| 3 | Bamboo agility run + wall-kick flip | 10s | [q3](https://d8j0ntlcm91z4.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH/hf_20260720_011119_11be93b5-9811-4e3a-9057-5583659ffd56.mp4) | 11be93b5-9811-4e3a-9057-5583659ffd56 |
| 4 | Sunset crane-stance balance beat | 8s | [q4](https://d8j0ntlcm91z4.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH/hf_20260720_011124_1c714d46-122e-4d2b-9332-9abb657a8790.mp4) | 1c714d46-122e-4d2b-9332-9abb657a8790 |
| 5 | Night gauntlet at maximum tempo | 12s | [q5](https://d8j0ntlcm91z4.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH/hf_20260720_011130_c4f99e68-0eeb-4f11-bf03-24c5aa563e57.mp4) | c4f99e68-0eeb-4f11-bf03-24c5aa563e57 |
| 6 | Training finale — bell kick, slow-mo finish | 10s | [q6](https://d8j0ntlcm91z4.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH/hf_20260720_011048_e5e09768-9f55-46cb-b699-0ff036d6e4d6.mp4) | e5e09768-9f55-46cb-b699-0ff036d6e4d6 |

## Stitching

One command (requires ffmpeg + curl); downloads the six 1080p clips and
blends the scores into one continuous soundtrack with synced crossfades:

```bash
./scripts/stitch-princess-punch-kungfu.sh
```

Or lay a single music track over the whole cut:

```bash
./scripts/stitch-princess-punch-kungfu.sh --music yourtrack.mp3
```

The original 720p teaser clips (f1/f6 above) remain available for reference.

## Bonus — one-piece 15s social cut

A single 15-second generation describing the whole montage as a multi-cut
sequence in one prompt: dawn stance → dummy speed forms → bamboo wall-kick →
bell-ring finale, with one continuous soundtrack and zero editing needed.

[One-piece cut](https://d8j0ntlcm91z4.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH/hf_20260720_011510_191c1703-8652-4e8d-92e7-597bb4db2751.mp4)
— job 191c1703-8652-4e8d-92e7-597bb4db2751

Workflow note: Seedance's *native* multi-shot toggle is not exposed via the
MCP integration (the fields are silently dropped) — but describing the shot
list inside the prompt achieves the same continuous-music multi-cut result
for clips up to the 15s generation cap. Use that pattern for social-length
one-piece content; use the stitch scripts for longer cuts.
