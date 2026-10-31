> **Superseded on 2026-11-01 by the owner.** This brief was misread as "teach English through
> Wittgenstein". The owner's request is the reverse: **learn Wittgenstein's philosophy, in English**.
> The subject is the philosophy; English is only the language of the site. The current brief is
> `planning/BRIEF-v2.md`; the text below is kept as the historical record of the first build.

# Brief: Language Games

Build a Next.js web app of small games that teach **English** (to non-native learners, intermediate,
e.g. Chinese speakers) **through Ludwig Wittgenstein's philosophy** — and teach the philosophy
through the English. Both must be learned by *playing*, not by reading quizzes.

Constraints from the owner:
- Next.js (App Router, TypeScript), Tailwind, shadcn/ui. No login, no backend required for v1;
  progress kept in localStorage. Analytics: PostHog only (optional, env-gated).
- UI language: English only. One clear core flow; each game playable in a few minutes, on phone and desktop.
- Visual identity will be produced with gpt-image-2 (Codex image generation): illustrations,
  backgrounds, game art. Plan which images are needed and the art direction.
- Must be genuinely fun and philosophically correct (cite the source passages: Tractatus,
  Philosophical Investigations §§, On Certainty, Blue Book, etc.).
- No ads, no dark patterns, no engagement hooks such as streak guilt.

Deliverable for this planning step: an independent plan in Markdown with
1. Game concepts (at least 6), each: the Wittgenstein idea (with § citation), the English skill it
   trains (vocab / grammar / pragmatics / pronunciation...), the core mechanic, one round example,
   why it is fun, and how it is scored.
2. Which 3-4 games make v1 and why; the information architecture and screens.
3. Content model (data schema for rounds) and how much content v1 needs.
4. Art direction and the list of images to generate with gpt-image-2 (with prompts).
5. Technical architecture, risks, and what would make this fail.
Be concrete and opinionated. Write your plan to the file named in your instructions only.
