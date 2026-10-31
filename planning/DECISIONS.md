# Decisions: merging the three plans

Inputs: `plan-claude.md`, `plan-codex.md`, `plan-copilot.md` (each written from `BRIEF.md` alone), then
`critique-claude.md`, `critique-codex.md`, `critique-copilot.md`. "Source" says whose idea won; "Against"
records who disagreed and why it was overruled or deferred.

| # | Decision | Source | Against / note |
|---|----------|--------|----------------|
| D1 | Every round must change a shared situation (stones arrive, a window closes, a pupil's answers change); no round is a quiz with a red ✗. | Codex | — all three agree on the risk; Codex stated the test most sharply. |
| D2 | Five games in v1: **Slab!**, **Picture Theatre**, **The Café**, **Go On!**, **Family Threads**. | Claude (merge) | Codex wanted exactly three (Slab!, Café, Family) and to defer Picture Theatre as overlapping with Slab!. Kept: it is the only game carrying the *Tractatus* (TLP 2.1, 2.21, 4.01) and the early/late contrast, and it trains a different skill (prepositions and truth-checking) with a different verb (arrange/judge). Copilot wanted three plus a gated fourth. With 8 hours, five were built; each has tests proving every authored round is winnable. |
| D3 | Slab! has two roles: fetch (listen) then call (speak through tiles); a literal-minded assistant asks "Which one?" when a call is genuinely unclear, never when it is merely short. "Slab!" alone is a complete order (PI §§19–20). | All three | — |
| D4 | No timers, lives, streaks or leaderboards. | Codex, Copilot | Claude's plan had a countdown in Slab!; dropped. |
| D5 | **Score the communicative outcome; coach English form separately.** "Two pillar — there!" still builds the gate and earns a one-line note ("After *two*, English needs the plural"). | Copilot (coaching), Codex (fought for it) | Claude's first Slab! auto-pluralised tiles and so never practised the plural it claimed; fixed by offering singular and plural tiles. A note costs no mark in Slab!'s outcome. |
| D6 | Speech is optional: browser text-to-speech reads calls and replies; the text is always on screen. | Claude | Codex: no audio in v1. Overruled: the builders' game is a game of calls, TTS costs nothing, and nothing depends on hearing. |
| D7 | The Café pairs identical words in changed situations ("It's a bit cold in here" with the window open / with the cup empty; "Do you know what time it is?" asked by someone in a hurry / by the owner with the keys). "Ask first" is always free. | Codex | Copilot's relationship meter (*Would You Mind?*) rejected per Codex critique: it silently rewards the author's favourite wording. |
| D8 | Go On!: the pupil holds a few authored "ways of going on"; examples rule them out (§185). **Two** explanation cards: a loose one the pupil misreads (§198) and a precise one it can follow *only after* an example has shown what its key word means. | Copilot (mechanic), Codex (fairness fix) | Codex: a single vague Explain card "rigs the argument against explanation". Fixed as above; the source note says the hypothesis list is a toy model and that the point is practice, not scepticism (§§198–202, 217). |
| D9 | Family Threads checks claims about **these** cards ("Most of these games have a winner"), never about all games; blurred features (is chess amusing? §66) count neither way; no feature runs through every card (content test). Second session uses Wittgenstein's own tool-box (§11) and his ruler counterexample (§14). | Copilot (claims), Claude (chain), Codex (scope fix) | Codex caught that Copilot's "Most games have a winner" generalised from six cards. |
| D10 | Hinge/certainty game and Beetle in a Box deferred. | Codex, Copilot | Claude's "Must, Might, Can't" treated a hinge as a fourth confidence setting, which Codex showed misreads OC §§23–25, 96–99. |
| D11 | Copy says the games are *inspired by* Wittgenstein's investigations, and quotes §43 with its "though not for all". | Codex | Claude's plan said the later philosophy "is a theory of language learning" — an overclaim (PI §109). |
| D12 | Art: one paper-theatre style for everything, generated with gpt-image-2 through Codex; sprites drawn on flat magenta and keyed to alpha; backgrounds and sprites generated separately so art never decides a mark. | Codex (separation), Claude (style) | Three UI directions were mocked up with image2 and published for the owner to choose; B ("Puzzle Desk") was built, with C's § margin notes. |
| D13 | Progress and half-done rounds live in localStorage, versioned, merged across tabs, never overwriting a newer save; no account. | Codex | — |
| D15 | When every round is done the home page ends the journey with TLP 6.54 (throw away the ladder) paired with PI §133 (being able to stop) — no streaks or "come back tomorrow". | Claude (ladder), Copilot (§133 pairing) | — |
| D16 | Copilot's critique of Claude's plan: Slab! as timed recognition was A1 and failed WCAG 2.2.1; the shipped Slab! has no timer and a calling role with real form choices. Its OC §115 misattribution in the hinge concept is moot (concept deferred); the shipped §115 quote was checked against the German ("Das Spiel des Zweifelns selbst setzt schon die Gewißheit voraus"). | Copilot | — |
| D17 | Static export rejected: `next start`, security headers and the default image optimiser need a server build. | Copilot (critique of Codex §6) | Codex proposed static export. |
| D18 | Picture Theatre stays despite Copilot's objection that it teaches the early view that PI §23 corrects: its source notes say so explicitly ("Wittgenstein later criticised this picture view"), and the contrast with the Café is itself a lesson. | Claude | Copilot, Codex would defer it to v1.1. |
| D14 | Each game page serves its name, how-to-play, the English it trains and the passage in the HTML (SEO/GEO), plus JSON-LD. | Copilot (`/notes`), harness web defaults | Separate `/notes` articles deferred. |

## Deferred, with the reason
- Logical Space (Copilot): Picture Theatre already carries the Tractatus.
- Aspect Flip / Duck–Rabbit (Claude): Codex judged it a paraphrase quiz as specified; needs a consequential goal first.
- Look at the Use / glorp (Copilot): closest to a quiz; candidate for v1.1 if the use-test stays a test of use.
- Learner playtests (Codex's five-learner gate): not possible in this session; recommended to the owner before promotion.
