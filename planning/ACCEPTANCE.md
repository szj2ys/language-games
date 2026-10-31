# Acceptance criteria: Language Games

Written by the independent acceptor before the build (2026-10-31). The builder does not edit this file.

## 1. Build verdict

- Problem: intermediate English learners (e.g. Chinese speakers) drill vocabulary out of context;
  Wittgenstein's core idea, meaning is use inside a language game, is the best available theory of
  why that fails. Games where the learner uses English to get something done teach both at once.
- Cheaper way: a reading list or a quiz deck exists already and teaches neither by playing. No
  existing free product combines the two, so there is no cheaper equal.
- Verdict: **build smaller**. Ship 3-4 polished games (not 6+ thin ones) in one short core flow.
  The 8-hour floor buys depth and rounds of fixing, not more game count.
- Flaw that decides success: philosophy turned into trivia ("Which § says X?"). Every game must make
  the player *do* the idea (follow a rule, play a builder's game, find a family resemblance), or it fails.

## 2. Done-criteria and how each is checked

### A. Process (the user's "independent plans, critique, borrow")

| # | Criterion | Check |
|---|-----------|-------|
| A1 | Three independent plans exist: Claude, Codex CLI, Copilot CLI, each answering all 5 BRIEF sections | Files in `planning/` (e.g. `plan-claude.md`, `plan-codex.md`, `plan-copilot.md`); each has 6+ concepts with § citations |
| A2 | Plans were made independently | Run logs (`codex-run.log`, `copilot-run.log`) show each tool got only BRIEF.md, not another plan; file mtimes precede the critiques. Note: `copilot-run.log` was empty when this file was written |
| A3 | Each planner critiques the other two | Files `planning/critique-<author>-of-<target>.md` (or one per author covering both); each names at least 3 concrete flaws and 2 ideas worth borrowing, with section references |
| A4 | Critiques come from the real tools, not the builder impersonating them | Log of the CLI invocation (command, model, timestamp) for each Codex and Copilot critique |
| A5 | A merged decision record | `planning/DECISIONS.md`: for each choice (games, IA, content model, art, stack) which plan it came from, what was rejected and why |
| A6 | At least 8 hours of real work | First to last substantive commit/log entry spans >= 8 h; git log shows steady commits across the span, no gap > 90 min of idle waiting padded as work; a `logs/` worklog with timestamps |

### B. Product

| # | Criterion | Check |
|---|-----------|-------|
| B1 | Next.js App Router + TypeScript + Tailwind + shadcn/ui in D:/githubprojects/language-games | `package.json`, `components.json`, `app/` dir |
| B2 | `lint`, `typecheck` (`tsc --noEmit`), `build` all exit 0 | Acceptor runs them fresh; output captured |
| B3 | 3-4 games playable end to end in the production build | `next build && next start`; acceptor plays every game start -> finish -> result screen on desktop and phone viewport (Playwright, 390x844 and 1440x900); no console errors |
| B4 | Each game is a mechanic, not a quiz about the philosophy | Acceptor judges per game: the player performs the idea (e.g. builder's game PI §2, rule-following PI §§185-201, family resemblance PI §§66-67, beetle in a box PI §293). A multiple-choice "which philosopher said" round fails |
| B5 | Philosophy accurate with citations | Every in-game claim links to a source passage (work + § or proposition number); acceptor spot-checks at least 8 citations against the text (PI, Tractatus, On Certainty, Blue Book); zero misattributions; no invented quotes |
| B6 | English learning is real | Each game names its English target (vocab / grammar / pragmatics); feedback explains *why* an answer is wrong in English terms; content is CEFR B1-B2 level and natural; acceptor checks 10 random items for correct English |
| B7 | Enough content | At least ~20 rounds per v1 game, held as typed data (schema from the content model), not hard-coded JSX |
| B8 | Tests for game logic | Unit tests for scoring, round validation and state transitions of each game; `test` exits 0; a content test validates every round against the schema and that every round has a citation |
| B9 | gpt-image-2 art is actually used | Images generated through Codex image generation (log shows the command/model and prompts); files in `public/`; referenced by components; visible in the acceptor's screenshots; consistent art direction; optimised (`next/image`, sensible sizes) |
| B10 | Owner preferences | No login; progress and in-progress input survive reload (localStorage); one UI language (English); core flow short, mostly one screen; PostHog only and env-gated; no ads, streak guilt or dark patterns |
| B11 | Accessible | Keyboard playable; visible focus; alt text on art; contrast AA; axe (or Lighthouse a11y >= 95) with no serious violations; works with reduced motion |
| B12 | SEO/GEO basics | Per-page title/description, OG image, sitemap, robots, semantic headings, JSON-LD for the site |
| B13 | Secure | No secrets in repo; security headers (CSP or at least frame/content-type); `npm audit` no high/critical in production deps |
| B14 | Phone and desktop | No horizontal scroll at 360 px; touch targets >= 44 px; layout reviewed in screenshots at both sizes |
| B15 | jobs-review passed | A fresh reviewer used the running site on phone and desktop; its findings and the fixes are recorded; final round satisfied |
| B16 | README | How to run, test, build; where content and art live; how to add a round |

## 3. Status rule

PASS only when every row above passes with evidence captured in the verdict turn. Any failed row
is FAIL. A row with no reachable evidence after trying every route is UNVERIFIED with the exact blocker.

## 4. Not covered by these checks

- Whether real learners actually improve their English: no learner study, only expert judgment.
- Whether the games are fun for the target audience over time: the jobs-review and acceptor are
  proxies, not players from the target group.
- Full philosophical depth: spot checks of citations catch misquotes, not every subtle misreading.
- The 8-hour check proves elapsed, active work, not that every hour was well spent.
- Independence of the plans relies on logs; it cannot rule out a model's prior knowledge overlapping.
- Production hosting, real PostHog data, performance on low-end devices and slow networks, and
  browsers other than the Chromium used by Playwright.
- Licensing nuance of AI-generated art and of quoted translations (Anscombe's PI translation is
  under copyright; short quotes assumed fair use, not legally reviewed).
