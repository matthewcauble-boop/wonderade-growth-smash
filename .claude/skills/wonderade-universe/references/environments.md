# Wonderade Environment Bible

Environments drift exactly like characters do — four clips of "a basketball
arena" produce four different arenas unless the arena itself is locked. The
rule: **any location that appears in more than one shot gets boarded,
approved, and registered as a reference element before animation.**

## How to lock an environment

1. BOARD: generate an empty or near-empty establishing still of the location
   (nano banana, 16:9, 2K) in the house style — flat cel, navy `#374191`
   outlines, flat colors, bright palette. No characters, or one small
   character for scale.
2. Get user approval on the still.
3. Register it: `show_reference_elements` action=create, category
   environment/scene, media = the approved still (`image_job` type), with a
   description that pins the layout ("hoop on the left, berry crowd stands
   behind, scoreboard upper right").
4. Reference `<<<env-uuid>>>` in every shot set in that location, and ALSO
   restate 1–2 anchor details in the text ("the same golden fruit-arena,
   scoreboard upper right") so per-shot prompts can't relocate things.

## Registered environments

| Element | ID | Notes |
|---|---|---|
| `fruit-arena` | `036e9007-5bcf-4e04-a4f1-1964fcd51d70` | LOCKED basketball arena (2026-07-27, user-approved): honey-wood court, navy+orange markings, orange-slice center logo, transparent backboards w/ orange rims, berry-packed tiered stands, hanging scoreboard cube w/ orange numerals + clock, navy rafter banners, warm golden spotlights |
| `wonderade-beach-family` | `74220ba5-b89a-430f-a664-92dfb9f1eaa0` | Beach scene w/ family (May 2026) |

(Add rows as new locations get locked — the bamboo courtyard, the park
lawn, etc. do NOT exist as elements yet.)

## Known recurring locations (from produced content — not yet locked)

- **Misty bamboo courtyard** — Princess Punch kung-fu set: ink blacks, jade
  mist, lantern gold, wooden training dummy.
- **Sunny park lawn** — mixed-reality workout set (live-action look).
- **Dawn city / gym** — Rocky-montage set: charcoal/slate blue, hot orange
  accents, golden dawn.

## World rules (apply everywhere)

- Limb rule: heroes/players = fruit WITH arms and legs; crowds = round
  LIMBLESS berries with simple happy faces (generic description, no IP
  names). Pip is always limbless.
- Product cartons and the cooler are fixed props — use their registered
  elements, never redraw from memory.
- Backgrounds during action beats collapse into speed-line/radial-burst
  abstraction (see style.md); the locked environment is for establishing and
  neutral shots.
