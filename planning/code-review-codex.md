# Concrete defects, worst first

1. **P2 — Concurrent saves can erase earned progress.** `src/lib/progress.ts:130–134`; `src/lib/use-save.ts:22`.
   Input: two tabs finish different rounds while both read the same previous save. A reads, B reads and writes its completion, then A writes its completion; A's merge never sees B's record. The storage listener subsequently replaces B's in-memory save with A's snapshot.
   Evidence: an interleaved execution of the actual `writeSave` function left only A's record after B had successfully saved. Local storage offers no transaction across these operations ([HTML Standard](https://html.spec.whatwg.org/multipage/webstorage.html#introduction-16)).
   Fix: serialize the entire read/merge/write across tabs, or use an IndexedDB transaction; reconcile incoming saves with live progress rather than replacing it blindly.

2. **P2 — Notebook reset and replay retain solved drafts.** `src/components/notebook.tsx:17–18,83–84`; `src/lib/progress.ts:141–143`.
   Input: solve Café `c1-1`, leave before Next, then choose Notebook → Play again. It reopens already solved, with Next and no answer choices; this was reproduced in the browser. Reset progress → Yes, start over also leaves `language-games:draft:c1-1:chosen=0` behind while emptying the completion records.
   Consequence: after reset, Next skips this round without recording it, leaving the notebook incomplete despite the solved screen. The reset sequence reproduced the surviving draft in an isolated storage fixture.
   Fix: clear the selected session's drafts before replay; clear every game draft when resetting all progress, through a shared reset operation.

3. **P2 — A malformed saved position crashes the game instead of recovering.** `src/lib/progress.ts:82–83`; `src/components/game/use-sessions.ts:14–18`.
   Input: save `{"version":1,"positions":{"builder":{"session":-1,"round":0}}}` under `language-games:v1`, then open Slab! The parser accepts it, and `sessions[-1].rounds` throws. A browser reload reproduced “Cannot read properties of undefined (reading 'rounds')”; a negative round similarly selects an undefined round.
   Fix: reject negative positions during parsing and validate/clamp both bounds against the current session data before indexing.

4. **P2 — Global character shortcuts cannot be disabled or restricted to game focus.** `src/components/game/shortcuts.tsx:16–28`.
   Input: on Café `c1-1`, focus the All games navigation link and press `1`. The game solves and saves the round even though no game control is focused; reproduced in the browser. The global digit shortcuts have no disable/remap option, violating [WCAG 2.1.4](https://www.w3.org/WAI/WCAG22/Understanding/character-key-shortcuts.html).
   Fix: activate shortcuts only while the relevant game component has focus, or provide a persistent disable/remap control.

5. **P2 — Successful communication loses a mark for a grammar note.** `src/games/builder/BuilderGame.tsx:519`.
   Input: in `b3-2`, choose `two`, singular `pillar`, `there`, point left, and Call. The correct first-try delivery saves `marks:2,max:3,firstTry:true`; the plural wording earns 3. Browser reproduction confirmed the saved record. This contradicts `planning/DECISIONS.md:13`, which explicitly says an English note costs no outcome mark.
   Fix: calculate outcome marks independently of `englishSlips`, while retaining the English correction separately.

6. **P2 — Plural tool names receive singular English.** `src/games/family/rounds.ts:115`; `src/games/family/FamilyGame.tsx:375,386,409,465–470`.
   Input: round `f2-5` introduces `nails`. The prompt says “Does nails belong”; choosing Unlike + handle accepts and saves “Unlike most of these tools, nails doesn't have a handle.” Other feedback also combines `nails` with singular verbs.
   Fix: represent grammatical number on cards and select matching auxiliaries and verb forms in prompts, feedback, negation, and saved sentences.

7. **P2 — The builder teaches the incorrect plural “archs.”** `src/games/builder/BuilderGame.tsx:533`; `src/games/builder/engine.ts:108,132`.
   Input: open `b3-6`, whose numbered word bank includes `arch`. The browser displays an `archs` tile; the same naive suffix also affects generated utterances and correction text.
   Fix: use one plural-form mapping, including `arch → arches`, for tiles, sentences, and coaching.

8. **P2 — Reload removes the grammar correction from a restored result.** `src/games/builder/BuilderGame.tsx:472,630`.
   Input: finish the singular “Two pillar there!” call above, then reload before Next. The English-notes status disappears, although the solved outcome and correction remain in storage; browser verification found one notes status before reload and zero afterward.
   Cause/fix: `reply` resets to null while notes render only for `reply.kind === "acts"`. Derive their visibility from the persisted outcome, or restore the response together with the result.

9. **P3 — Exactly half is described as fewer than half.** `src/games/family/FamilyGame.tsx:386`.
   Input: in tools newcomer round `f2-5`, choose Unlike + join. Three of the six tools join things together, so `Most` correctly returns false, but the feedback says “fewer than half.”
   Fix: say “at most half,” or report the actual count; false `Most` does not imply strictly less than half.

10. **P3 — A past-tense rule describes the wrong transformation.** `src/games/pupil/levels.ts:72`.
    Input: applying “Drop a final e, then -d” to `like` produces `likd`, and to `hope` produces `hopd`. The engine correctly appends `d` without dropping `e`; this erroneous authored label currently has no UI consumer.
    Fix: change the label to “Keep the final e and add -d,” or “Drop the final e, then add -ed.”
