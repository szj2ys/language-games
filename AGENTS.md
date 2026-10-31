<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project

Five browser games that teach intermediate English through Wittgenstein's language-games (Slab!,
Picture Theatre, The Café, Go On!, Family Threads). No accounts; progress lives in `localStorage`.

- Run: `npm run dev`; production check: `npm run build && npm start`. Gates: `npm test`, `npm run typecheck`,
  `npm run lint`, then `python e2e/play_all.py <url>` (and `--desktop`) and `python e2e/a11y.py <url>`.
- Stack: Next.js 16 (cacheComponents, Turbopack), React 19, Tailwind v4, shadcn (Base UI), Vitest, Playwright (Python).
- Layout: `src/games/<game>/engine.ts` pure logic, `rounds.ts`/`levels.ts` authored content validated by tests,
  `<Game>.tsx` UI; shared chrome in `src/components/game/`; passages in `src/content/sources.ts`.
- Art: gpt-image-2 via Codex CLI; raw renders and prompts in `art/`, WebP in `public/art/` (`scripts/art.py`).
  Every authored round needs its picture (`src/content/__tests__/art.test.ts`). Run at most three image jobs at once.
- Decisions and review history: `planning/DECISIONS.md`. One UI language (English).
- State (2026-11-01): all games playable on phone and desktop; not deployed; the Jobs taste review stopped
  after five rounds on an owner decision (phone layout bands), see DECISIONS R22.
