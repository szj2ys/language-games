# Play-test — Copilot (phone pass, stopped at the time limit)

**Verdict: hold.** Fix the major (1) before release. 0 blockers, 1 major, 10 minor. No round blocked progress. This is a partial
pass: 49 of the 87 live rounds were played, all on a 390×844 touch phone. Desktop, Café after c2-1, Go On!, Family Threads,
/notebook and /sources were not reached, so this is not a release verdict for the whole app (see Not covered).

- Build played: `http://localhost:3417`, production build `I7-ysaztguE2_d1peiaQl` (03:55), older than HEAD `f35c8db` (04:32).
  Every finding was re-checked in HEAD source and is still there. One live item is already fixed in source and is not reported:
  the home page says Go On! teaches "a spelling rule".
- Method: Python Playwright, Chromium, 390×844 touch emulation. Coverage included:
  - wrong answers in every played round;
  - the Hint (b1-2) and Ask first (c1-1, c1-2, c2-1);
  - reloads mid-round (b2-1, s1-4; state was kept);
  - Slab! session 3 variants: "two pillar there", "there" without pointing, pointing without "there", "this" without pointing.
- Sessions are picked in the Sessions nav, so the URL carries no session; each finding names the round id instead. All
  screenshot paths are under `qa/playtest-copilot/`.

## Findings

### Major

1. **Picture Theatre, "Say where it is" (s3-1–s3-6), phone: after telling, the result and the only button are off-screen.**
   - What happens: after **Tell your partner**, the partner's stage (~370 px) is inserted and the page stays at the top. The
     learner sees two stages and nothing else.
   - What is hidden: the verdict ("Done — but that's not where it is on your stage.", "✗ Not true of your stage.", "✓ Leaves
     only one place.") and **Change it** / **Next** sit 200–430 px below the fold. Every tell round uses this layout.
   - Evidence: `/play/scene` s3-1, `phone/s3-1-wrong.png` (what the screen shows) vs `phone/s3-1-wrong-full.png` (full page).
     `src/games/scene/SceneGame.tsx:628-633` renders the partner's stage above the verdict, and the file has no
     `scrollIntoView`.
   - **Fix:** after telling, scroll the verdict into view (`scrollIntoView({ block: "nearest" })`). Or, on phones, put the
     verdict and Change it/Next above the partner's stage.

### Minor

2. **Slab! b3-4: pointing without "there" is ignored, and nothing says why.**
   - What happens: the plan is "Three slabs on the right platform." The call "three slabs" plus **Point at the right
     platform** gets the slabs put down in front of the builder, with the chips "✓ slab ✓ three ✗ not here".
   - Why it confuses: the learner did point right, and a learner can defend the call (the gesture carries the "there"). The
     engine explains the opposite slips ("There? Point to where.", "This? Which one — point at it.") but not this one.
   - Evidence: `phone/b3-4-point-no-there.png`. In `src/games/builder/engine.ts`, `interpret()` keeps
     `place = "builder"` unless a "there" tile was used.
   - **Fix:** when `pointAt` is a platform and no "there" tile was used, return
     `{ kind: "asks", question: "Here, or over there? Say 'there' when you point." }`.

3. **Slab! b3-3: the picture contradicts the plan.**
   - The plan says "One beam across the pillars on the left." But the left platform is empty: the two pillars delivered in
     b3-2 are gone, and the ghost beam lies flat on the bare platform.
   - Evidence: `phone/b3-3-start.png`, `phone/b3-3-start-leftzoom.png`, `sheet-b3-left.png`;
     `src/games/builder/rounds.ts:151`.
   - **Fix:** start b3-3 with b3-2's two pillars standing on the left platform and the ghost beam across them. Cheaper: change
     the plan to "One beam on the left platform."

4. **Slab! b3-5 and b3-6, phone: the yard strip hides the stone the round is about, and its cards overlap.**
   - The yard is a horizontal scroller (`src/games/builder/BuilderGame.tsx:708`). Each card is ~116 px wide in a 96 px slot
     (`w-24 shrink-0`, line 713), so neighbouring cards overlap by ~12 px.
   - In b3-5 ("this" + point at the curved stone), the curved stone starts off-screen (x≈428 on a 390 px screen), and the
     first 844 px of the page do not show **Call**.
   - Evidence: `phone/b3-5-start.png`, `phone/b3-5-yard-zoom.png`, `phone/b3-5-yard-scrolled.png`.
   - **Fix:** make the slot as wide as the card, and on phones lay the yard out as a wrapping 3-column grid
     (`max-sm:grid max-sm:grid-cols-3`) so every stone is visible.

5. **Picture Theatre, "Say where it is", phone: R30's band fix was never applied to tell rounds (R30 incomplete).**
   - There are 110–155 px of blank paper between the stage and the instruction.
   - R30 says the stage takes the spare height, but only BuildPlay got `max-sm:aspect-auto max-sm:min-h-[100vw] max-sm:flex-1`
     (`SceneGame.tsx:425`). TellPlay's wrapper `flex flex-1 flex-col gap-2` (`SceneGame.tsx:628`) still opens the band.
   - Evidence: `phone/s3-1-start.png`, `phone/s3-4-start.png`.
   - **Fix:** give TellPlay's stage the same `max-sm:` classes, or drop `flex-1` from the line-628 wrapper.

6. **Slab!, all sessions, phone: R30 was not extended to Slab!, so the docked controls leave an empty band.**
   - Size of the band between the clue or plan and the controls:

     | Rounds | Band |
     |---|---|
     | b1-3, b2-1 | ~70–85 px |
     | b3-1, b3-4, b4-1 | ~125–140 px |

   - R30 settled R22's band question (the answers follow the content) but applied it to Café, Family and Picture Theatre only.
     Slab! session 4 (an option list) has the layout Café had before R30.
   - Evidence: `phone/b1-3-start.png`, `phone/b2-1-start.png`, `phone/b3-1-start.png`, `phone/b4-1-start.png`.
   - **Fix:** apply R30's rule. On phones, drop `flex-1` from the picture column and `mt-auto` from the controls
     (`BuilderGame.tsx:437/457`, `685/704`, `873/916`), at least in session 4.

7. **End card: "You practised …" pastes the session's `english` field into a sentence, which gives mis-punctuated and
   awkward copy** (`src/components/game/chrome.tsx:122`).
   - Metadata inside the sentence. Slab! 1 (`phone/b1-end.png`): "You practised warm-up (A2): one-word orders; a bare noun as
     a whole request." Slab! 2 and Picture Theatre 1 follow the same pattern ("warm-up (A2): …").
   - Two end marks. Slab! 4 (`phone/b4-end.png`): "…asking 'Which one?'." Café 2's string (`src/games/cafe/rounds.ts:135`,
     ending "'The other what, sorry?'") will render the same way.
   - A mixed word list. Picture Theatre 2 (`phone/s2-end.png`): "You practised behind, in front of, 'is not'; checking a
     description against the facts." It quotes "is not" but not "behind" or "in front of", so it reads "practised behind".
     Better: "You practised the position words 'behind' and 'in front of', the negative 'is not', and checking a description
     against the facts."
   - **Fix:** show "Warm-up (A2)" as a separate tag, not inside the sentence. Add no full stop when the text already ends in
     "?" or "!" (quoted or not). Quote the word lists in the strings, as in the suggestion above.

8. **Café, Ask first after a wrong pick (R23 fix incomplete): the answer appears, but the stale rejection stays under it.**
   - What happens: after a wrong option, **Ask first** shows the answer in the speech bubble ("I thought you'd never ask." in
     c1-2; "The lemon one, please." in c2-1). The message "Not quite what Rosa/Tom meant. Look at the clues and try another
     response." stays just below it, so a good question reads as rejected.
   - This is the scenario of playtest-codex #2 (fixed per R23). The answer now shows, but the stale message from the wrong
     pick stays.
   - Evidence: `phone/c1-2-ask.png`, `phone/c2-1-ask.png`. `src/games/cafe/CafeGame.tsx` renders the message whenever
     `pick && !pick.fits`.
   - **Fix:** render the message only while the bubble still shows that option's reaction:
     `pick && !pick.fits && lastSaid === pick.reaction`.

9. **End card: using a hint costs "right first time".**
   - Slab! session 1 with one wrong pick and one hint (b1-2, right on the first pick after the hint) ended "4 of 6 right first
     time". The label does not say that using a hint disqualifies an otherwise first-pick round.
   - `BuilderGame.tsx:397` and `:659` require `!hint`. Café does not count Ask first against "first time", so the two games
     disagree.
   - Evidence: `phone/b1-end.png`, `phone/b1-2-hint.png`.
   - **Fix:** name what is counted ("4 of 6 right first time, without a hint"), or stop counting hints.

10. **Slab! b2-1, phone: stone pictures spill over their cards** in the row of four; the slab and the beam cross the card
    borders. Evidence: `phone/b2-1-cards-zoom.png`, `phone/b2-1-start.png`. **Fix:** `max-w-full object-contain` with inner
    padding, or the 2×2 grid that session 1 uses.

11. **Picture Theatre tell rounds: space before the full stop** in the told sentence: "The key is on the box ." Evidence:
    `phone/s3-1-wrong-full.png`. **Fix:** render the full stop inside the last word's element, so no flex gap comes before it.

**Not covered:**
- Desktop 1280×860: nothing was played. That means the home page; Slab! sessions 1–4; Picture Theatre sessions 1–3; Café
  sessions 1–4; Go On! sessions 1–2; Family Threads sessions 1–3; /notebook; /sources.
- Phone 390×844:
  - Café: session 2 "Which one?" after c2-1 (c2-2–c2-6), session 3 "Excuse me?", session 4 "Sorry, thanks, no problem".
  - Go On!: session 1 "Teach the pupil", session 2 "Rules with no rule".
  - Family Threads: sessions 1–3 ("What is a game?", "What is a tool?", "What is a language?").
  - /notebook and /sources.
- Not in the running build, so not played on either device: Picture Theatre session 4 "Not here", Go On! session 3 "Old rules,
  new words", Family Threads session 4 "What is a number?".
- Not tested anywhere: real phones; Safari and Firefox (only emulated Chromium); audio; keyboard shortcuts; the back button
  and two tabs; reloads other than b2-1 and s1-4; every alternative answer.
- Console and network errors were not captured systematically.
- The B1 judgments are editorial.
