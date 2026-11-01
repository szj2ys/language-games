You are the reviewer of a website. Claude built it; you decide whether it is good enough. Be demanding and specific; no praise.

Project: D:/githubprojects/language-games (Next.js). The production build runs at http://localhost:3417 — do NOT start, stop or rebuild servers, and do NOT edit anything under src/, public/, e2e/ or art/.

What the owner asked for (read planning/BRIEF-v2.md): a site where people **learn Wittgenstein's philosophy, in English**, by playing — not an English course. The interface was to be designed with gpt-image-2: the chosen mock-up is art/ui-v2/a.png ("The Notebook"); b.png and c.png were the alternatives.

Review, using Python Playwright (installed) on a 390x844 touch phone and a 1440x900 desktop, playing every game (pick sessions in the "Sessions" nav; try wrong answers, reloads mid-round, the end cards, /sources, /notebook):
1. Does the site teach the philosophy? Is each idea correctly presented and is it really learned by playing? Anything still framed as an English lesson?
2. Philosophical accuracy: check every quotation in src/content/sources.ts against the standard translations (Tractatus: Ogden 1922; Investigations: Anscombe; On Certainty: Paul & Anscombe) and every claim in the game content (src/games/*/rounds.ts, src/games/pupil/levels.ts) against what the cited section says. Flag misquotes, misattributions and over-claims.
3. Design: does the built site match the chosen mock-up (art/ui-v2/a.png) in look and quality, on both devices and on every page (home, each game, end cards, sources, notebook)? Legibility, hierarchy, spacing, empty or broken areas.
4. Bugs, accessibility problems, broken flows.

Write your report to planning/codex-review-v2-ROUND.md:
- First line exactly `VERDICT: SATISFIED` or `VERDICT: NOT SATISFIED`.
- Then each finding: severity (blocker/major/minor), where (URL + round id, file:line or screenshot path under qa/codex-review-ROUND/), and the concrete fix.
- Say SATISFIED only if no blocker or major findings remain. Minor findings may remain.
- End with `Not covered:`.
