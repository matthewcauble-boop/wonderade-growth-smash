#!/usr/bin/env bash
# Stitch the six Princess Punch kung fu montage clips (1080p) into one video.
#
# Default mode blends the six per-clip scores into one continuous-feeling
# soundtrack with 1.5s audio crossfades, trimming a matching 0.75s of video
# on each side of every junction so audio and video stay in sync.
#
#   ./scripts/stitch-princess-punch-kungfu.sh
#   ./scripts/stitch-princess-punch-kungfu.sh --music mytrack.mp3   # single music file over the whole cut
#
# Requires ffmpeg + ffprobe (any release from the last decade) and curl.
set -euo pipefail

XFADE=1.5
OUT=princess-punch-kung-fu.mp4
BASE=https://d8j0ntlcm91z4.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH
CLIPS=(
  "hf_20260720_011108_25425a41-8407-48c3-84a8-9213f9f154f9.mp4"
  "hf_20260720_011114_25cd89d8-9ef8-4ba0-a716-e3d352aaffe3.mp4"
  "hf_20260720_011119_11be93b5-9811-4e3a-9057-5583659ffd56.mp4"
  "hf_20260720_011124_1c714d46-122e-4d2b-9332-9abb657a8790.mp4"
  "hf_20260720_011130_c4f99e68-0eeb-4f11-bf03-24c5aa563e57.mp4"
  "hf_20260720_011048_e5e09768-9f55-46cb-b699-0ff036d6e4d6.mp4"
)

MUSIC=""
if [[ "${1:-}" == "--music" ]]; then
  MUSIC="${2:?usage: $0 --music <audiofile>}"
fi

for i in "${!CLIPS[@]}"; do
  f="q$((i+1)).mp4"
  [[ -f "$f" ]] || curl -fL -o "$f" "$BASE/${CLIPS[$i]}"
done

N=${#CLIPS[@]}
declare -a DUR
for ((i=1; i<=N; i++)); do
  DUR[$i]=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "q$i.mp4")
done

INPUTS=()
for ((i=1; i<=N; i++)); do INPUTS+=(-i "q$i.mp4"); done

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
