#!/usr/bin/env bash
# Stitch the six "timeless" Princess Punch stretch clips into one video.
#
# Default mode blends the six per-clip scores into one continuous-feeling
# soundtrack with 1.5s audio crossfades, trimming a matching 0.75s of video
# on each side of every junction so audio and video stay in sync.
#
#   ./scripts/stitch-princess-punch-timeless.sh
#   ./scripts/stitch-princess-punch-timeless.sh --music mytrack.mp3   # single music file over the whole cut
#
# Requires ffmpeg + ffprobe (any release from the last decade) and curl.
set -euo pipefail

XFADE=1.5
OUT=princess-punch-stretch-timeless.mp4
BASE=https://d8j0ntlcm91z4.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH
CLIPS=(
  "hf_20260719_160620_82f13bbf-943f-4ab4-9db8-95a3b08d33a4.mp4"
  "hf_20260719_160624_36ec1a5a-66f7-4674-9995-127e17d443ee.mp4"
  "hf_20260719_160630_981fa8f1-b3e1-4988-b985-69b6d3e1d87b.mp4"
  "hf_20260719_160635_78f4c960-9645-4a66-a031-2e86637511c5.mp4"
  "hf_20260719_161151_40da507e-35b8-4b9c-88e4-092a435f42e9.mp4"
  "hf_20260719_160639_5b261338-cf5d-4342-a7b6-d38f4bac95c8.mp4"
)

MUSIC=""
if [[ "${1:-}" == "--music" ]]; then
  MUSIC="${2:?usage: $0 --music <audiofile>}"
fi

for i in "${!CLIPS[@]}"; do
  f="t$((i+1)).mp4"
  [[ -f "$f" ]] || curl -fL -o "$f" "$BASE/${CLIPS[$i]}"
done

N=${#CLIPS[@]}
declare -a DUR
for ((i=1; i<=N; i++)); do
  DUR[$i]=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "t$i.mp4")
done

INPUTS=()
for ((i=1; i<=N; i++)); do INPUTS+=(-i "t$i.mp4"); done

if [[ -n "$MUSIC" ]]; then
  # Single provided music track: full-length video concat, clips muted,
  # music trimmed to fit with a 2s fade-out.
  TOTAL=$(awk "BEGIN{t=0; $(for ((i=1;i<=N;i++)); do printf 't+=%s;' "${DUR[$i]}"; done) print t}")
  FADE_AT=$(awk "BEGIN{print $TOTAL-2}")
  FC=""
  for ((i=0; i<N; i++)); do FC+="[$i:v]"; done
  FC+="concat=n=$N:v=1:a=0[v];"
  FC+="[$N:a]atrim=0:$TOTAL,afade=t=out:st=$FADE_AT:d=2[a]"
  ffmpeg -y "${INPUTS[@]}" -i "$MUSIC" -filter_complex "$FC" \
    -map "[v]" -map "[a]" -c:v libx264 -crf 18 -preset medium -c:a aac -b:a 192k "$OUT"
else
  # Continuous-flow mode: 1.5s audio crossfades between the clips' own
  # scores; video trimmed HALF=0.75s per junction side to stay in sync.
  HALF=$(awk "BEGIN{print $XFADE/2}")
  FC=""
  for ((i=1; i<=N; i++)); do
    st=0; en=${DUR[$i]}
    (( i > 1 )) && st=$HALF
    (( i < N )) && en=$(awk "BEGIN{print ${DUR[$i]}-$HALF}")
    FC+="[$((i-1)):v]trim=start=$st:end=$en,setpts=PTS-STARTPTS[v$i];"
  done
  for ((i=1; i<=N; i++)); do FC+="[v$i]"; done
  FC+="concat=n=$N:v=1:a=0[v];"
  prev="1:a"
  FC+="[0:a]anull[a1];"
  prev="a1"
  for ((i=2; i<=N; i++)); do
    FC+="[$prev][$((i-1)):a]acrossfade=d=$XFADE[a$i];"
    prev="a$i"
  done
  FC="${FC%;}"
  ffmpeg -y "${INPUTS[@]}" -filter_complex "$FC" \
    -map "[v]" -map "[$prev]" -c:v libx264 -crf 18 -preset medium -c:a aac -b:a 192k "$OUT"
fi

echo "Done: $OUT"
