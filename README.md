# Wittgenstein, played

Seven short browser games for learning **Ludwig Wittgenstein's philosophy, in English**, early to late.
Each game makes one idea something you do, then names the idea, quotes the passage and says where the
game's analogy stops. (Version 1 of this project taught English *through* Wittgenstein; the owner corrected
that on 2026-11-01 — see `planning/BRIEF-v2.md`.)

| # | Idea (route) | You… | Wittgenstein |
|---|---|---|---|
| 1 | **Pictures of facts** (`/play/scene`) | build the scene a sentence describes, catch false reports, pin a fact down in one sentence | TLP 2.1, 2.21, 4.01, 4.023, 4.0621 |
| 2 | **The builders** (`/play/builder`) | fetch stones for a four-word language, give the orders, tell orders from reports | PI §§2, 6, 8, 19–21 |
| 3 | **Meaning is use** (`/play/cafe`) | answer the same words doing different jobs in a café | PI §§21, 23, 43, 87 |
| 4 | **Family resemblance** (`/play/family`) | test claims about games, tools, languages and numbers; thread them by overlapping features | PI §§11, 18, 66–67 |
| 5 | **Following a rule** (`/play/pupil`) | teach a pupil a rule with examples and explanations, and see neither fixes it alone | PI §§185, 198–202, 217 |
| 6 | **The beetle in the box** (`/play/beetle`) | talk about beetles nobody else can see; keep a private diary of “S” | PI §§244–270, 293 |
| 7 | **Hinges of certainty** (`/play/hinges`) | try to doubt; find what doubting turns on; watch the river-bed shift | On Certainty §§94–125, 282, 341–343 |

Design: "The Notebook" — warm paper, ink-blue type, one vermilion accent, proposition numbers as structure —
chosen from three gpt-image-2 mock-ups (`art/ui-v2/a.png`, `b.png`, `c.png`).

No account and no server state: progress and half-finished rounds are kept in `localStorage`.
Every quoted passage, with its translation and the limits of each game's analogy, is on `/sources`.

## How it was planned

Three agents planned independently from the same brief, critiqued each other and merged:
`planning/plan-{claude,codex,copilot}.md` → `planning/critique-*.md` → `planning/DECISIONS.md`.
After the build, Codex reviewed the code (`planning/code-review-codex.md`), Copilot the English and the
citations (`planning/content-review-copilot.md`), and fresh "Steve Jobs" reviewers played the running site
round after round (`reports/language-games-2026-10-31/jobs/jobs-review.json`). Every finding and the change it
caused is in `planning/DECISIONS.md`.
Copilot also authored the café's fourth session (`planning/proposed-cafe-4.ts`), and Codex play-tested the
newest sessions (`planning/playtest-codex.md`, `planning/playtest-codex-2.md`).

## Run

```bash
npm install
npm run dev          # http://localhost:3000
npm test             # game engines, content checks, every round has its picture (Vitest)
npm run build && npm start
python e2e/play_all.py http://localhost:3000            # plays every session of all seven games end to end (Playwright)
python e2e/play_all.py http://localhost:3000 --desktop
python e2e/a11y.py http://localhost:3000             # axe-core, phone and desktop
```

Optional environment:

| Variable | Effect |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | canonical URLs, sitemap, Open Graph |
| `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST` | PostHog page views and explicit learning events (no autocapture, no replay). Unset = no analytics requests. |

## Structure

- `src/games/<game>/engine.ts` — pure game logic, unit-tested; `rounds.ts` — authored content, validated
  by tests (every round winnable, every false report fixable by one listed word, no feature common to all
  cards…); `<Game>.tsx` — the UI.
- `src/content/sources.ts` — every passage, with gloss and limits; `src/content/games.ts` — the catalogue.
- `src/lib/progress.ts` — versioned, tab-safe save format; `use-draft.ts` — round state that survives reload.
- `art/` — raw gpt-image-2 renders and the exact prompts (`*.prompt.txt`); `scripts/art.py` keys the
  magenta backgrounds to alpha and writes the WebP files in `public/art/`.

## Art

All illustrations were generated with gpt-image-2 through the Codex CLI (prompts kept next to each raw
file in `art/`). Sprites are drawn on flat `#FF00FF` and keyed; backgrounds are separate, so no image ever
decides whether an answer is right.
