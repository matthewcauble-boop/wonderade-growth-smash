#!/usr/bin/env bash
# Stitch the six mixed-reality Major Orange + kids clips into one video.
#
# Default mode blends the six per-clip scores into one continuous-feeling
# soundtrack with 1.5s audio crossfades, trimming a matching 0.75s of video
# on each side of every junction so audio and video stay in sync.
#
#   ./scripts/stitch-mixed-reality-kids.sh
#   ./scripts/stitch-mixed-reality-kids.sh --music mytrack.mp3   # single music file over the whole cut
#
# Requires ffmpeg + ffprobe (any release from the last decade) and curl.
set -euo pipefail

XFADE=1.5
OUT=major-orange-kids-mixed-reality.mp4
BASE=https://d8j0ntlcm91z4.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH
CLIPS=(
  "hf_20260719_233119_93542b60-98f5-4e58-9249-eb57c92260da.mp4"
  "hf_20260719_230527_dc327177-8336-4002-b416-95d624e3bd0d.mp4"
  "hf_20260719_230534_4a7e907c-28bd-4407-a33f-018961c78446.mp4"
  "hf_20260719_233126_4c2e3600-a6eb-4ce7-8af2-b387efcc9efb.mp4"
  "hf_20260719_230549_badff489-e458-4e95-80c8-9b2595406bda.mp4"
  "hf_20260719_233136_88c14978-21be-4dcf-999c-14c66561eedf.mp4"
)

MUSIC=""
if [[ "${1:-}" == "--music" ]]; then
  MUSIC="${2:?usage: $0 --music <audiofile>}"
fi

for i in "${!CLIPS[@]}"; do
  f="k$((i+1)).mp4"
  [[ -f "$f" ]] || curl -fL -o "$f" "$BASE/${CLIPS[$i]}"
done

N=${#CLIPS[@]}
declare -a DUR
for ((i=1; i<=N; i++)); do
  DUR[$i]=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "k$i.mp4")
done

INPUTS=()
for ((i=1; i<=N; i++)); do INPUTS+=(-i "k$i.mp4"); done

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
