# Language Games

Five short browser games that teach English to intermediate learners through Ludwig Wittgenstein's
idea of *language-games*: words get their meaning in what people do with them.

| Game | You… | English | Wittgenstein |
|---|---|---|---|
| **Slab!** (`/play/builder`) | fetch stones for a builder, give the orders, tell orders from reports | orders, numbers, plurals, *this/there*, asking "Which one?" | PI §§2, 6, 8, 19–21, 27 |
| **Picture Theatre** (`/play/scene`) | build what a sentence says, fix false reports, describe a stage | *in, on, behind, next to, to the left of* | TLP 2.1, 2.21, 4.01 |
| **The Café** (`/play/cafe`) | read the room and respond | requests, hints, polite refusals, *Excuse me?* | PI §§21, 23, 43 |
| **Go On!** (`/play/pupil`) | teach a pupil a rule with as few examples as possible | *a/an*, plurals, *-ed*, comparatives, *-ing/to*, uncountables | PI §§84, 185, 198–202, 217 |
| **Family Threads** (`/play/family`) | test claims about games and tools, thread them by resemblance | *all/most/some/none of these*, *both … and*, *unlike* | PI §§11, 14, 66–67 |

No account and no server state: progress and half-finished rounds are kept in `localStorage`.
Every quoted passage, with its translation and the limits of each game's analogy, is on `/sources`.

## How it was planned

Three agents planned independently from the same brief, critiqued each other and merged:
`planning/plan-{claude,codex,copilot}.md` → `planning/critique-*.md` → `planning/DECISIONS.md`.
After the build, Codex reviewed the code (`planning/code-review-codex.md`), Copilot the English and the
citations (`planning/content-review-copilot.md`), and fresh "Steve Jobs" reviewers played the running site
round after round (`reports/language-games-2026-10-31/jobs/jobs-review.json`). Every finding and the change it
caused is in `planning/DECISIONS.md`.

## Run

```bash
npm install
npm run dev          # http://localhost:3000
npm test             # game engines and content checks (Vitest)
npm run build && npm start
python e2e/play_all.py http://localhost:3000            # plays every game end to end (Playwright)
python e2e/play_all.py http://localhost:3000 --desktop
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
