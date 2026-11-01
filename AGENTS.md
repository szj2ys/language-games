<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project

Browser games for learning **Wittgenstein's philosophy, in English** (owner, 2026-11-01). The subject is the
philosophy; English is only the site's language, never a learning goal (v1 got this backwards — see
`planning/BRIEF-v2.md`). No accounts; progress lives in `localStorage`.

- Run: `npm run dev`; production check: `npm run build && npm start`. Gates: `npm test`, `npm run typecheck`,
  `npm run lint`, then `python e2e/play_all.py <url>` (and `--desktop`) and `python e2e/a11y.py <url>`.
- Stack: Next.js 16 (cacheComponents, Turbopack), React 19, Tailwind v4, shadcn (Base UI), Vitest, Playwright (Python).
  If a production build serves stale CSS, delete `.next/cache` and `.next/static` before `next build`.
- Layout: `src/games/<game>/engine.ts` pure logic, `rounds.ts`/`levels.ts` authored content validated by tests,
  `<Game>.tsx` UI; shared chrome in `src/components/game/`; passages in `src/content/sources.ts`.
- Art: gpt-image-2 via Codex CLI; raw renders and prompts in `art/`, WebP in `public/art/` (`scripts/art.py`).
  Every authored round needs its picture (`src/content/__tests__/art.test.ts`). Run at most three image jobs at once.
- Decisions and review history: `planning/DECISIONS.md`. One UI language (English).
- State (2026-11-01, v2): seven idea games, design "The Notebook" (from gpt-image-2 mock-ups in `art/ui-v2/`);
  Codex reviewed the running site until satisfied (`planning/codex-review-v2-r1..r6.md`, DECISIONS V1–V8). Not deployed.
- Changing authored rounds: give a replaced round a new id, so old completions and drafts do not count for it.
