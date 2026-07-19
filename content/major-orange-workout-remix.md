# Major Orange Workout Remix

A whimsical vintage-cartoon remake of the workout video (https://youtu.be/rPoeFCjPHe4),
starring Major Orange. Hand-drawn 1930s rubber-hose animation style, orange-dominated
palette, jaunty ragtime/jazz instrumental soundtrack — music only, no dialogue.

Generated 2026-07-19 with Higgsfield (Seedance 2.0, 1080p, 16:9), using
`public/characters/major-orange.png` as the character reference.

## Scenes

| # | Scene | Length | Mirrors original | Clip |
|---|-------|--------|------------------|------|
| 1 | Opening — Major Orange bounds in, winks, flexes, beckons | 10s | 0:00–0:17 intro | [s1](https://d8j0ntlcm91z4.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH/hf_20260719_134640_45141cc1-8675-44f7-bb56-2ec0661e286b.mp4) |
| 2 | Move 1 — bouncy side-lunge steps, two left / two right | 10s | 0:17–0:35 side steps | [s2](https://d8j0ntlcm91z4.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH/hf_20260719_134645_75564c05-011b-4ed2-996c-2c9a28ec5f37.mp4) |
| 3 | Move 2 — ball-change footwork, arms out and in | 10s | 0:35–0:59 ball change | [s3](https://d8j0ntlcm91z4.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH/hf_20260719_134650_57c50a12-fe5b-4bc1-8df6-0ed6eee8afa8.mp4) |
| 4 | Move 3 — hip twists; bottle characters watch from a red sofa | 10s | 0:59–1:24 hip twists + TV hosts | [s4](https://d8j0ntlcm91z4.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH/hf_20260719_134717_b27e6447-7d8c-406f-8c92-8f7435581465.mp4) |
| 5 | Grand finale — full routine at speed, confetti + notes | 12s | 1:24–2:19 full routine | [s5](https://d8j0ntlcm91z4.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH/hf_20260719_134725_f42ac25c-0c58-4049-8cc1-a1a06d7f4193.mp4) |
| 6 | Goodbye — thumbs up, wave, iris-out ending | 8s | 2:19–2:34 sign-off | [s6](https://d8j0ntlcm91z4.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH/hf_20260719_134703_d1ecedfc-4a6b-48e9-a456-041e0b2bf15c.mp4) |

Total: ~60 seconds.

## Vertical 9:16 versions (TikTok / Reels / Shorts)

Each 16:9 scene was run through Higgsfield Reframe to a 1080p vertical canvas:

| # | Scene | Vertical clip | Reframe job ID |
|---|-------|---------------|----------------|
| 1 | Opening | [v1](https://d8j0ntlcm91z4.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH/hf_20260719_140139_8f4bd6b9-b47d-46d5-8b68-c772dd979c3d.mp4) | 8f4bd6b9-b47d-46d5-8b68-c772dd979c3d |
| 2 | Side-lunge steps | [v2](https://d8j0ntlcm91z4.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH/hf_20260719_140146_cc421ce0-8c4a-40ef-8b37-b27af8b53c8c.mp4) | cc421ce0-8c4a-40ef-8b37-b27af8b53c8c |
| 3 | Ball-change | [v3](https://d8j0ntlcm91z4.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH/hf_20260719_140152_96e4d438-fd53-4def-ae1b-80f3d2219ea8.mp4) | 96e4d438-fd53-4def-ae1b-80f3d2219ea8 |
| 4 | Hip twists + sofa audience | [v4](https://d8j0ntlcm91z4.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH/hf_20260719_140158_879ac645-510a-49a2-aba8-ef51de64667b.mp4) | 879ac645-510a-49a2-aba8-ef51de64667b |
| 5 | Grand finale | [v5](https://d8j0ntlcm91z4.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH/hf_20260719_140205_88994107-8b27-4722-a0d3-5f82d98642f9.mp4) | 88994107-8b27-4722-a0d3-5f82d98642f9 |
| 6 | Goodbye | [v6](https://d8j0ntlcm91z4.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH/hf_20260719_140211_a97b6cf0-8349-486c-8c0d-03c727b2e2a0.mp4) | a97b6cf0-8349-486c-8c0d-03c727b2e2a0 |

To build the vertical cut, download v1–v6 as `v1.mp4` … `v6.mp4` and run:

```bash
printf "file 'v%d.mp4'\n" 1 2 3 4 5 6 > vlist.txt
ffmpeg -f concat -safe 0 -i vlist.txt \
  -c:v libx264 -crf 18 -preset medium -c:a aac -b:a 192k \
  major-orange-workout-remix-vertical.mp4
```

## Stitching into one video

The remote session's network policy blocks CDN downloads, so join the clips locally:

```bash
for i in 1 2 3 4 5 6; do echo "download s$i.mp4 from the table above"; done

# after downloading s1.mp4 … s6.mp4 into one folder:
printf "file 's%d.mp4'\n" 1 2 3 4 5 6 > list.txt
ffmpeg -f concat -safe 0 -i list.txt \
  -c:v libx264 -crf 18 -preset medium -c:a aac -b:a 192k \
  major-orange-workout-remix.mp4
```

Each clip carries its own instrumental music, so cuts land on music changes. For a
single continuous soundtrack, mute the clips (`-an`) and lay one music track over
the joined video in any editor.

## Higgsfield job IDs

| Scene | Job ID |
|-------|--------|
| 1 | 45141cc1-8675-44f7-bb56-2ec0661e286b |
| 2 | 75564c05-011b-4ed2-996c-2c9a28ec5f37 |
| 3 | 57c50a12-fe5b-4bc1-8df6-0ed6eee8afa8 |
| 4 | b27e6447-7d8c-406f-8c92-8f7435581465 |
| 5 | f42ac25c-0c58-4049-8cc1-a1a06d7f4193 |
| 6 | d1ecedfc-4a6b-48e9-a456-041e0b2bf15c |
