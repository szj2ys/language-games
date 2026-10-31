# Plan (Claude, written before reading the Codex and Copilot plans)

## Thesis
Wittgenstein's later philosophy *is* a theory of language learning: meaning is use (PI §43),
words are learned by training inside "language-games" (PI §§2–7), concepts hang together by
family resemblance (§§66–67), rules live in practice, not in a formula (§§185–202). So each game's
**mechanic must be the idea**, and the English skill must be what you do to win. A quiz about
Wittgenstein fails both goals.

The decisive risk: it becomes a reading app with buttons. Test: can a learner who never reads the
philosophy panel still win and still learn the English? If yes, the mechanic carries the idea.

## Game concepts

| # | Game | Wittgenstein idea | English skill | Core mechanic |
|---|------|-------------------|---------------|---------------|
| 1 | **Slab!** | Builder's language, PI §2, §8, §19–20 | listening, imperatives, numbers, deixis (this/there) | Builder shouts (TTS) "Slab!" → drag the right block to him within a timer; later "Five slabs — there!" adds numerals and pointing. |
| 2 | **Family Resemblance** | PI §66–67 "Don't think, but look!", the thread of overlapping fibres | category vocabulary, describing features with adjectives/verbs | Build a chain of cards (chess → football → ring-a-roses …) where neighbours must share a feature; prove no single feature runs through all. |
| 3 | **Duck–Rabbit** | Seeing-as, PI II xi (§118 ff. in 4th ed. "Philosophy of Psychology – A Fragment") | structural ambiguity, homographs, garden-path sentences | Each card has two readings; tap to "flip the aspect" and pick the paraphrase for each reading ("I saw her duck"). |
| 4 | **Beetle in a Box** | Private language, PI §293, §244 | sensation/emotion vocabulary, idioms | Nobody sees inside boxes; you can only match public behaviour (pictures, sentences) to words. Twist reveal: the boxes held different things, some nothing — you still played perfectly. |
| 5 | **Must, Might, Can't** | On Certainty §§1–4, 115 "doubt itself rests on what is beyond doubt", hinges | modal verbs of certainty | Evidence cards appear; set a certainty slider labelled can't / might / must; some statements are hinges ("I have two hands") where doubting is the mistake. |
| 6 | **Plus or Quus** | Rule-following, PI §185, §201 | irregular morphology (plurals, past tense) | Eleusis-style: a hidden rule judges your word forms; induce it. Ends with the deviant pupil (+2 → 1004) twist. |
| 7 | **Picture Theory** | Tractatus 2.1, 2.12, 4.01 | prepositions, articles, there is/are | A composed scene; build a sentence from tiles that pictures it; the game checks truth against the scene model. |
| 8 | **The Fly-Bottle** | PI §309, §38 "philosophical problems arise when language goes on holiday" | idioms and literal vs figurative meaning | Grammatical confusions ("Where does the lap go when I stand up?") — pick the use that dissolves the puzzle. |

## v1 scope: 4 games
1, 2, 3, 5. Reasons: each has a distinct verb (act fast / connect / flip / judge), each trains a
different English skill (listening, vocabulary, syntax, modality), and none needs a server.
Beetle in a Box is the best "aha" but the hardest to make fair; v1.1.

## Information architecture
- `/` Home: hero illustration, the ladder of 4 games (TLP 6.54 ladder metaphor), "Play" directly
  into the first unfinished game. No login. Progress in localStorage.
- `/play/[game]` one game screen: round area, a short "What Wittgenstein said" drawer after a round
  (quote + plain-English gloss + citation), score.
- `/about` sources and method. Optionally `/glossary` of words learned.
- Progression: completing games climbs the ladder; final screen "throw away the ladder" — no streaks.

## Content model
```ts
type Citation = { work: 'PI'|'TLP'|'OC'|'BB'; ref: string; quote: string; gloss: string };
type SlabRound = { calls: { text: string; target: {kind: Block; count: number; place?: Zone} }[] };
type ResemblanceSet = { cards: {id; word; image?; features: string[]}[]; solutionChains?: string[][] };
type AmbiguityItem = { sentence; readings: [Reading, Reading]; distractors: string[]; level };
type CertaintyItem = { evidence: string[]; statement; answer: 'cant'|'might'|'must'|'hinge'; why };
```
v1 content: ~12 levels across games, ~60 items total, hand-written and checked.

## Art direction (gpt-image-2)
Vienna 1920s–Cambridge 1940s: warm paper, ink line, a muted palette (oxblood, slate blue, ochre),
flat gouache shapes with letterpress texture. Not cartoonish emoji. Images:
hero (ladder into a sky of words), builder scene background, 4 block sprites (block, pillar, slab,
beam) on transparent/flat background, duck-rabbit, game cover cards ×4, beetle box, OG image.

## Tech
Next.js (App Router, TS), Tailwind, shadcn/ui, framer-motion only if needed. Game logic as pure
functions in `lib/games/*` with unit tests (Vitest). Web Speech API for TTS (fallback: text).
Static export-friendly. PostHog env-gated.

## Failure modes
- Philosophy misquoted → every quote checked against a recognised translation (Anscombe / Hacker &
  Schulte for PI; Ogden or Pears–McGuinness for TLP), cited by §.
- Too hard for learners → levels start trivial; every English answer has a gloss.
- Art inconsistent → one style prompt prefix for every image.
- TTS missing on some browsers → show the call as text too.
