# Wonderade Character Bible

Canonical designs, registered Higgsfield asset IDs, and model sheets for every
recurring character. When generating, always reference the element by
`<<<uuid>>>` in the prompt AND restate the key design facts (colors, outfit,
limb rule) — the element carries the look, the text guards against drift.

## Major Orange (hero mascot)

- **Design:** muscular anthropomorphic orange; green two-leaf sprig on top;
  green pants; brown belt with gold buckle; purple boots with yellow stars.
  Body `#F68C1E` (accent `#F57D14`), navy outlines `#374191`.
- **Personality:** confident showman, genuinely happy/positive, coach energy.
  Expressions must vary (grin → focus → effort → beaming) — never frozen.
- **Element:** `major-orange` — `64cc873a-ca24-4ff4-810b-d4bb12e483db`
- **Canonical PNG (media input):** `7f7000fe-d597-4774-b5ae-137a50bf8463`
  (source: `public/characters/major-orange.png`)
- **Model sheet (job `41d6cff1-6829-4f36-ba1e-628e0aabf185`):**
  https://d8j0ntlcm91z4.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH/hf_20260727_011630_41d6cff1-6829-4f36-ba1e-628e0aabf185.png
  — 4-view turnaround + 5 expression studies, 2K.

## Princess Punch (mascot #2)

- **CANON — the WEBSITE design (user decision, 2026-07-27):** pink unicorn; magenta braided mane and
  tail; small striped horn; yellow jumpsuit with belt; purple boots + purple
  gloves with yellow stars. Pinks `#F499C1`/`#E56CA9`, purple `#7F489C`,
  navy outlines `#374191`.
- **Personality:** playful martial-arts energy; fierce focus in action, warm
  otherwise.
- **Element:** `princess-punch` — `9e52b08b-35cf-4213-924f-0e98aaadb3e8`
- **Canonical PNG (media input):** `f92885ef-a702-480c-8216-7c2cb194630b`
  (source: `public/characters/princess-punch.png`)
- **Model sheet (job `dd6dac24-265e-4238-8aaa-0c0b140a92d0`):**
  https://d8j0ntlcm91z4.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH/hf_20260727_011635_dd6dac24-265e-4238-8aaa-0c0b140a92d0.png

### Design conflict — RESOLVED (2026-07-27)

A second, DIFFERENT Princess Punch design exists from the May 2026 carton
work: `princess-punch-v2` (`a5832d4a-1645-42f7-a56b-c289798a429e`) — white/
pink chibi unicorn, gold horn, yellow crop-top + shorts, purple boxing
gloves. This matches the printed carton art, not the website PNG.

**User decision: the WEBSITE design is canon.** Use element `princess-punch`
(`9e52b08b-…`) for Princess Punch as a character in all content. Do NOT use
`princess-punch-v2` to render her — it is retired for character use. (The
carton design still appears in-world only as printed artwork on the product
carton props, which is fine — a package illustration differing from the
"real" character is normal cartoon logic.) Never mix the two designs as
walking characters in one piece.

## Pip (star mascot)

- **Design:** five-pointed golden-yellow star, `#FBD02E` body with `#FFD246`
  highlights, navy outlines `#374191`. Simple happy face (big navy-pupil
  eyes, expressive brows, open smile). **NO ARMS, NO LEGS — ever.** Moves by
  bouncing, tilting, squash-and-stretch.
- **Element:** `pip-star` — `a6e36c5a-5bf4-42a9-8b85-94721210a76c`
- **Canonical PNG (media input):** `4d8dcabe-c131-4ec2-b6e7-ef5ffbc91af7`
  (source: `public/characters/pip.png`)
- **Model sheet (job `cc2b9a44-a87c-4ef5-856f-48bfb1e6bf28`):**
  https://d8j0ntlcm91z4.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH/hf_20260727_011637_cc2b9a44-a87c-4ef5-856f-48bfb1e6bf28.png
  — turnaround incl. squash-and-stretch bounce pose + 5 expressions.

## Basketball-story cast (registered 2026-07-27, user-approved sheets)

| Element | ID | Role |
|---|---|---|
| `wonderade-teammates` | `28192230-440d-482c-9734-11ef68084ff7` | Home team: STRAWBERRY (flat red, leaf-cap hair) + tall lanky BANANA (flat yellow, stem tip), navy jerseys w/ orange trim, both with limbs |
| `rival-fruit-team` | `aaf3c457-28b6-4cf5-8dad-1682bbfa0559` | Rivals in dark-green/purple jerseys: TALL smug PINEAPPLE captain, lean cocky LIME, burly purple GRAPE |
| `berry-crowd` | `cebcc241-c4e8-409b-b66f-8175e42a9644` | Limbless round berry spectators (blueberries, raspberries, cherries, blackberry, tiny strawberry) — bounce/tilt only |
| `lemon-referee` | `d3fdcb6d-08d4-4fcd-bf73-d270a98cde70` | Lemon ref: striped shirt, whistle, comedic no-nonsense face |

Design notes: the teammates sheet went through two retakes — texture detail
(strawberry seeds, kiwi fuzz) caused style drift, so all fruit bodies are
SMOOTH AND FLAT with no texture; the kiwi was replaced by a banana at the
user's request. When drawing any new fruit character, pass Major Orange's
model sheet as an image reference AND write "same character designer, same
studio" language into the prompt — that's what fixed the drift.

## Supporting cast & props (May 2026 elements)

| Element | ID | Role |
|---|---|---|
| `wonderade-major-orange-carton` | `f1ed3aa1-53f8-4afc-a62c-47cfbf527f49` | Product carton prop — render exactly as shown, never restyle |
| `wonderade-princess-punch-carton` | `b305d54a-f8df-4427-9b1f-e917fcfb78ef` | Product carton prop |
| `cartoon-boy` | `db009952-c0ac-40c9-842a-3acf91d86544` | Recurring kid |
| `cartoon-girl-v2` | `6ab17d2c-df2f-45fd-8504-a77da5d59d75` | Recurring kid |
| `wonderade-cooler-prop` | `85207a94-39c6-461f-97ae-fa69d9ae5230` | Cooler prop |
| `wonderade-beach-family` | `74220ba5-b89a-430f-a664-92dfb9f1eaa0` | Beach family scene |

Older sheets also on the account (superseded by the July 2026 sheets above,
kept for reference): `Major-Orange-character-sheet`
`4ff8c1c2-a7ad-4086-a1ff-d75dae650fa3`, `Major-Orange-corrected-sheet`
`7ab68286-5c55-4111-b628-9f8b788368e3`, `Major-Orange-side-arm-sheet`
`346ba912-09e4-4542-a286-65e80ace65fa`, `Princess-Punch-character-sheet`
`05f13164-440f-4165-b900-49de7a36ae63`.

## Fruit-world extras (not yet registered)

For crowd/opponent scenes: players and named heroes are anthropomorphic fruit
WITH arms and legs (lime, grape, pineapple, strawberry — contrasting team
colors); crowds are round LIMBLESS berries with simple happy cartoon faces,
described generically (no existing-IP names). If a specific fruit character
recurs across scenes, board it, get user approval, and register it as an
element before animating — same rule as the mascots.

## Consistency test results (2026-07-27)

Both passed generation with the registered elements:

- Major Orange 3/4 jump shot (job `b71678b7-180e-45e6-98db-a45f53873847`):
  https://d8j0ntlcm91z4.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH/hf_20260727_011917_b71678b7-180e-45e6-98db-a45f53873847.png
- Three-mascot beach group (job `79e39d7e-bae1-4484-b691-090706d664d5`):
  https://d8j0ntlcm91z4.cloudfront.net/user_3DKBAe57ZcyV2yY1mT8pAZmbUyH/hf_20260727_011920_79e39d7e-bae1-4484-b691-090706d664d5.png

## Pip performance note (user canon, 2026-07-28)

Pip is a ZEN TEACHER: serene half-closed eyes, tiny knowing smile, calm
sensei energy. Never scared, worried, or anxious. (And as always: NO limbs.)
