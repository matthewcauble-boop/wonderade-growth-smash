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
| `fruit-arena-v2` | `cad64a70-fad6-45dd-8383-0a1ae414454a` | **USE THIS** — QA-passed EMPTY arena master, single broadcast perspective. Honey-wood court, navy+orange markings, orange-slice center logo, hoops w/ transparent backboards, berry stands, scoreboard cube w/ NUMERALS ONLY, navy banners, golden spotlights |
| `fruit-arena` (v1) | `036e9007-5bcf-4e04-a4f1-1964fcd51d70` | ⚠ DEPRECATED — built from a multi-panel model SHEET; feeding a multi-view sheet as an environment reference makes generations blend perspectives into impossible geometry. Kept only as a design record |
| `wonderade-beach-family` | `74220ba5-b89a-430f-a664-92dfb9f1eaa0` | Beach scene w/ family (May 2026) |
| `bamboo-courtyard` | `9524b906-b80f-4474-885a-d4c764a4763c` | Misty bamboo courtyard at dawn (PP kung-fu set) — stone floor, jade bamboo, gold lanterns, shrine step, wooden dummy frame-right. Master job `9594f6bf` |

**Environment reference rule (learned the hard way): an environment element's
media must be ONE single-perspective establishing shot, never a multi-panel
sheet.** Character elements tolerate sheets; environments do not.

(Add rows as new locations get locked — the bamboo courtyard, the park
lawn, etc. do NOT exist as elements yet.)

## Known recurring locations (from produced content — not yet locked)

- **Sunny park lawn** — mixed-reality workout set (live-action look).
- **Dawn city / gym** — Rocky-montage set: charcoal/slate blue, hot orange
  accents, golden dawn.

## Game-action shooting style (user direction, 2026-07-27)

Shoot basketball action FROM INSIDE THE GAME, like real broadcast sideline
cameras: court-level, characters filling most of the frame height,
background = glossy floor + spotlight pool + dark crowd bokeh ONLY. Never
show the full court, the far hoop, or the arena vista behind action shots —
wide full-court framings were explicitly rejected ("don't like the wide
shots"). Use the court-level backdrop master (job
`52c2129f-04b1-4a6a-a8e7-0dcce993fa9d`, dark night-game grade) as the
background reference for dark-mood game shots.

## World rules (apply everywhere)

- Limb rule: heroes/players = fruit WITH arms and legs; crowds = round
  LIMBLESS berries with simple happy faces (generic description, no IP
  names). Pip is always limbless.
- Product cartons and the cooler are fixed props — use their registered
  elements, never redraw from memory.
- Backgrounds during action beats collapse into speed-line/radial-burst
  abstraction (see style.md); the locked environment is for establishing and
  neutral shots.
