#!/bin/bash
# Generate the v2 illustrations (gpt-image-2 via Codex), at most three at a time.
cd "$(dirname "$0")/../.." || exit 1
STYLE="Hand-cut paper illustration with subtle screen-print grain, charcoal #1C2A44 ink outlines, muted cobalt #42649A, terracotta #B0553E, sage #64775A, ochre #C9A24A and a little vermilion #C23B22, on a plain warm off-white #F7F2E8 paper background; soft light from upper left; calm, adult, friendly picture-book style, like the reference image. No text, letters, logos or watermarks; numbers only where the description asks for them."
gen() {
  local id=$1 shape=$2 desc=$3
  local fmt="Square 1:1, one clear centred vignette with plenty of empty paper around it."
  [ "$shape" = wide ] && fmt="Wide landscape 16:9 scene with a clear focal point in the middle 70% of the width."
  [ "$shape" = portrait ] && fmt="Portrait 3:4, the figure filling most of the height."
  printf 'Use your built-in image generation tool (gpt-image-2) to create ONE image using the attached reference image for style, then copy the resulting PNG to art/v2/%s.png in the current directory. Do nothing else.\n\nImage prompt: %s %s %s\n' "$id" "$desc" "$STYLE" "$fmt" > "art/v2/$id.prompt.txt"
  codex exec --skip-git-repo-check --dangerously-bypass-approvals-and-sandbox -C . -i art/covers/family.png -- "$(cat art/v2/$id.prompt.txt)" < /dev/null > "art/v2/$id.log" 2>&1
  echo "$id exit $?"
}
n=0
while IFS='|' read -r id shape desc; do
  [ -z "$id" ] && continue
  [ -f "art/v2/$id.png" ] && continue
  gen "$id" "$shape" "$desc" &
  n=$((n + 1))
  if [ $((n % 3)) -eq 0 ]; then wait; fi
done < art/v2/list.txt
wait
