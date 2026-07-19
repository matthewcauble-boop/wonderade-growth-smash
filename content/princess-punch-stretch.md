# Princess Punch Calm Stretch Tape

A gentle companion piece to the Major Orange workout remix: Princess Punch
leads a slow stretching sequence in the same 2D-cartoon-on-grainy-VHS
treatment — flat cel animation in her original art style, soft tape grain,
scan lines, chroma bleed and tracking wobble — set to mellow, dreamy 1990s
synth relaxation music. Music only, no dialogue.

Generated 2026-07-19 with Higgsfield (Seedance 2.0, 1080p, 16:9), using
`public/characters/princess-punch.png` as the character reference.

## Scenes

| # | Scene | Length | Clip | Job ID |
|---|-------|--------|------|--------|
| 1 | Welcome breath | 10s | [p1](https://d8j0ntlcm91z4.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH/hf_20260719_152854_a2f5a4b2-33fe-4c60-a2c3-cfc53ed519a6.mp4) | a2f5a4b2-33fe-4c60-a2c3-cfc53ed519a6 |
| 2 | Neck + shoulder rolls | 10s | [p2](https://d8j0ntlcm91z4.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH/hf_20260719_152858_7e563737-e941-4121-84c8-06d9e50f8d3b.mp4) | 7e563737-e941-4121-84c8-06d9e50f8d3b |
| 3 | Standing side stretch | 10s | [p3](https://d8j0ntlcm91z4.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH/hf_20260719_152903_83b8e810-2597-4f3a-ab3a-8b98c1b3216e.mp4) | 83b8e810-2597-4f3a-ab3a-8b98c1b3216e |
| 4 | Gentle toe touch | 10s | [p4](https://d8j0ntlcm91z4.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH/hf_20260719_152909_182dc5bd-44c5-46be-a477-12cd738bea7f.mp4) | 182dc5bd-44c5-46be-a477-12cd738bea7f |
| 5 | Seated reach + snoozing bottle | 10s | [p5](https://d8j0ntlcm91z4.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH/hf_20260719_152937_6191a294-e9d1-4ebf-8985-adffa716de00.mp4) | 6191a294-e9d1-4ebf-8985-adffa716de00 |
| 6 | Farewell wave + fade | 8s | [p6](https://d8j0ntlcm91z4.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH/hf_20260719_153904_74ea773d-93b6-45e1-b5e9-686dca4e17c1.mp4) | 74ea773d-93b6-45e1-b5e9-686dca4e17c1 |

Total: ~58 seconds.

## Stitching

Download the clips as `p1.mp4` … `p6.mp4` and run:

```bash
printf "file 'p%d.mp4'\n" 1 2 3 4 5 6 > plist.txt
ffmpeg -f concat -safe 0 -i plist.txt \
  -c:v libx264 -crf 18 -preset medium -c:a aac -b:a 192k \
  princess-punch-stretch.mp4
```

Each clip carries its own music; for one continuous soundtrack, mute the
clips (`-an`) and lay a single track over the joined cut in any editor.
