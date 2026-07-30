# Research Log — Consistency Pipeline

Findings from the 2026-07-27 research loop (external research + controlled
experiment). Fold new lessons in here as they're learned.

## External research findings (applied to this skill)

1. **Describe the MOTION, not the frame.** With a start-frame anchor, the
   prompt should describe how to travel from the frame — motion, camera,
   pacing — never re-describe what the frame looks like; re-describing
   invites the model to re-invent the scene.
2. **Pass the character sheet ALONGSIDE the start frame** (Seedance accepts
   `start_image` + multiple `image_references`).
3. **Bracket with end frames when possible.** Anchoring both `start_image`
   and `end_image` nearly eliminates drift — and the cel-composite pipeline
   can manufacture QA-passed END frames as cheaply as start frames. Use
   start+end bracketing for any clip with a critical final pose (e.g. the
   buzzer-beater release → celebration).
4. **Consistency is a workflow property, not a model setting** — lock
   identity first, then animate; keep style singular; wire the same
   canonical reference into every downstream node. (This is exactly the
   board → lock → animate architecture.)
5. **"Animate background and character separately, then composite"** is a
   recognized pro technique for drift reduction — validates the
   cel-composite approach.

Sources: seedance.tv first/last-frame guide, magichour.ai Seedance 2.0
reference guide + character-consistency guide, wavespeed.ai Seedance 2.0
guide, neolemon.com consistent-character guides, flick.art img2img
comparison, kling.ai drift-fix guide, kittl.com first/end-frame workflow.

## Controlled experiment (job `14cd1a4c-3a0b-46c9-a73a-8e550e5d700f`)

10s Seedance 2.0 @720p from the QA-passed ankle-breaker composite
(`start_image`) + canonical PNG + rival sheet (`image_references`), motion-
only prompt, announcer audio requested.

**Held:** arena layout/scoreboard/crowd/spotlights; static camera; both
characters recognizable throughout; the scripted play beat (crossover →
grape falls → drive) fully legible; **announcer play-by-play works** ("Oh,
what a crossover!… He's got him beat!… Driving to the lane!") with crowd
roar, characters never speak; scale consistent with the start frame.

**Drifted / deviated — mitigations now required in every video prompt:**
1. *Music genre*: got 8-bit chiptune. Always specify "modern synthwave —
   warm analog synth arpeggios, NOT chiptune, NOT 8-bit, NOT retro game
   music".
2. *Outfit details in motion*: footwear morphed to generic sneakers and a
   jersey appeared. Add one compact canon line per character to video
   prompts ("the orange wears green pants, brown belt, purple star boots —
   no jersey, no sneakers") even though the prompt otherwise describes only
   motion; keep it to identity anchors, not scene description.
3. *Unscripted extra beats*: the model added an opening dunk flourish and a
   soft reset. Add "no other plays, no extra cuts — one continuous action
   only" (or explicitly script the wanted beats) to keep the clip on-script.

## QA loop notes

- The scene-by-scene video analysis reliably reports: characters present,
  action beats, camera behavior, audio content (including commentator
  lines!), scoreboard digits, crowd. It CANNOT measure precise size ratios —
  treat scale as solved by construction (cel-composite), not by QA.
- Analysis of a still = wrap it in a 3-4s mp4 (see SKILL.md QA loop).
- Video QA of a real clip catches audio-genre misses and unscripted beats —
  always QA the first clip of any new scene family before batch-producing.
