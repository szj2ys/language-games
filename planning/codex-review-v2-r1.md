VERDICT: NOT SATISFIED

The decisive failure is that Following a rule still teaches and scores English grammar. Two lessons also overstate Wittgenstein's claims, the final two games substitute illustrated questionnaires for enacted activities, and major design and interaction defects remain. Completing the flows does not satisfy the philosophy-learning brief. There are **8 major and 6 minor findings** below; no blocker is needed to reject this build.

Reviewed on 2026-11-01 against `planning/BRIEF-v2.md` and the chosen `art/ui-v2/a.png` (The Notebook). The target was the existing production server at **http://localhost:3417**. Python Playwright Chromium was used at **390x844 with touch/mobile enabled** and **1440x900 desktop**. Findings judge that served build, not a proposed fix.

**R1 - major - Following a rule remains an English course.**

Where: http://localhost:3417/play/pupil, all three sessions, `p-1` through `p-8`; `src/games/pupil/levels.ts:8`, `:44`, `:72`, `:113`, `:156`, `:196`, `:242`, `:277`, and `:346`. Evidence: `qa/codex-review-r1/phone/007-pupil-initial.png`, `phone/035-pupil-an-honest-man.png`, `phone/057-session-rules-with-no-rule.png`, `desktop/056-pupil-final.png`.

The tasks explicitly teach articles, plurals, past-tense spelling, comparatives, verb patterns, countability, third-person endings and -ing spelling. Correctness depends on English forms. The recap and notebook retain grammar rules. Philosophy added after the exercise does not change the assessed subject. This violates the brief's explicit exclusion of English as a learning goal or scored item.

Concrete fix: retain the training/interpretation mechanism but replace the grammar syllabus with visible rule-following problems: continue a sequence, encounter a rival continuation beyond a boundary, distinguish a rule's expression from its application, and establish a correction practice. Assess and recap those distinctions. Preserve the explicit warning that a finite simulated pupil cannot establish the whole argument of PI sections 185-202.

**R2 - major - A unique solution to a puzzle is presented as a requirement of propositions.**

Where: http://localhost:3417/play/scene, session `scene-3` (Say where it is), `s3-1` through `s3-6`, especially its end card; `src/games/scene/rounds.ts:168`. Evidence: `qa/codex-review-r1/phone-endcards/scene-session-3.png`.

The summary says that one sentence must leave one possibility, attributing this to Tractatus 4.023. Determinate truth conditions do not require a unique remaining arrangement: different arrangements can satisfy the same proposition. The earlier lamp-left-of-cup task already demonstrates this. This is an over-claim, not a misquotation. See [Ogden 1922, 4.023-4.024 and 4.2](https://wittgensteinproject.org/w/index.php/Tractatus_Logico-Philosophicus_%28English%29#4.023).

Concrete fix: distinguish the philosophical point from the extra communication-puzzle constraint: a proposition determines conditions under which it is true; this particular partner additionally needs enough information to choose one position. Retain multiple satisfying arrangements elsewhere and explicitly compare the two cases.

**R3 - major - The explanation of doubt wrongly requires the disputed thing to exist.**

Where: http://localhost:3417/play/hinges, Doubt it, `h1-4`; `src/games/hinges/rounds.ts:79`. Evidence: `qa/codex-review-r1/runtime-findings/hinges-h1-4-wrong.png` and `runtime-findings/findings.json`.

Choose the answer that unlimited doubting is possible. The feedback says the doubter must trust "that the things she doubts about exist". Ordinary doubts about existence contradict this criterion. OC section 20 expressly distinguishes a question about a planet's existence from wholesale external-world doubt; section 115 requires some certainty, not acceptance of the object or proposition being disputed. See [Paul and Anscombe, On Certainty, sections 20 and 115](https://prawfsblawg.blogs.com/files/wittgenstein-on-certainty.pdf); indexed-source access and limitations are recorded in the philosophy ledger.

Concrete fix: explain that some uses of words and practices of checking must stand fast for a particular doubt to operate. Add an ordinary existence question to demonstrate that this is not a ban on doubting whether something exists.

**R4 - major - The beetle and hinges are quizzes about activities the player never performs.**

Where: http://localhost:3417/play/beetle (`bb1-1` through `bb2-5`) and http://localhost:3417/play/hinges (`h1-1` through `h2-5`); `src/games/choice/ChoiceGame.tsx:59`. Evidence: `qa/codex-review-r1/phone/062-session-the-beetle.png`, `064-session-the-diary.png`, `065-session-doubt-it.png`, `066-session-the-river-bed.png`; desktop equivalents in `desktop/journey.json`.

Across all four sessions, the player selects an approved sentence beneath a static illustration. Box contents, diary entries, checking procedures and changing background commitments are narrated rather than operated. The repeated loop can test recognition of the supplied explanation, but it does not meet the brief's requirement to make each idea something the learner does before naming it.

Concrete fix: make the core argument playable. For the beetle, let a public task continue while inaccessible contents vary; for the diary, let the player attempt consistent correction under different criteria; for certainty, let them conduct a check and discover what that check relies on. Use the current questions as reflection after those actions.

**R5 - major - The implementation does not carry through the selected Notebook composition.**

Where: http://localhost:3417/ and the seven game pages; `src/app/page.tsx:34`, `:44`, `:47`, `:59`; shared game layout in `src/components/game/chrome.tsx:274`. Compare `art/ui-v2/a.png` with `qa/codex-review-r1/desktop/001-home.png`, `desktop/initial-builder.png`, `phone/001-home-fresh.png`, `phone/004-builder-initial.png` and `phone/007-pupil-initial.png`.

At 1440x900, the oversized two-line title, four-line introduction and rectangular landscape push most detail in the seven illustrated choices below the first viewport. The selected mock-up makes its compact title, portrait collage and complete illustrated path one composition. In games, full-scene storybook artwork and dominant pill navigation replace the mock-up's lighter paper collage and editorial hierarchy. On the phone, the initial builder scene alone occupies 390 vertical pixels; four stone choices become a two-row block, and the idea card is pushed out of the first screen. Matching paper, navy and red is insufficient.

Concrete fix: implement the chosen composition: compact desktop title/deck, portrait cutout and paper edges, visible seven-stop illustrated path, restrained scene height, and the same editorial typography and illustration treatment across games, completion cards and reading pages. Adapt this to the phone without shrinking readable text or touch targets. No alternative direction is being requested by this review.

**R6 - major - Phone success and feedback are placed after the content they should explain.**

Where: all `/play/*` end cards; `src/components/game/chrome.tsx:153` puts art and the full source note before the completion summary and actions. Evidence: `qa/codex-review-r1/phone-endcards/measurements.json`, `phone-endcards/beetle-session-1.png`, `phone-endcards/family-session-3.png`, `phone-endcards/pupil-session-3.png`.

At 390x844, the next action begins below the viewport in **18 of 23** end cards. In The beetle, the idea heading begins at y=1014 and Next at y=1173. The first screen is a long quotation, with no visible completion heading or next action. Desktop puts the same elements beside the quote. Separately, after the wrong first beetle answer, its explanation starts exactly at y=844 while scrollY remains 0: `qa/codex-review-r1/runtime-findings/beetle-bb1-1-wrong.png` and `findings.json`. The live build hides the response just outside the phone viewport.

Concrete fix: order phone completion content as completion state, concise learned idea, next/replay actions, then the passage and detailed recap. Keep feedback adjacent to the selection and reveal it after an answer while preserving focus. Check long quotations as well as short ones. A working-tree scroll change exists, but its presence is not evidence that the served build is fixed.

**R7 - major - Enter overrides the focused control and records an unintended wrong answer.**

Where: http://localhost:3417/play/builder, Sessions > Two slabs -- there!, `b2-1`; `src/components/game/shortcuts.tsx:17` and `:27`, `src/games/builder/BuilderGame.tsx:422`. Evidence: `qa/codex-review-r1/a11y/keyboard.json`, `a11y/builder-enter-on-increment.png`.

Focus the slab button and press Enter: it stays unselected; Space selects it. Then focus One more and press Enter: the count remains one, the game delivers one slab, and the learner is marked wrong. The global Enter handler prevents native button activation and submits the delivery instead.

Concrete fix: preserve native Enter/Space behavior on buttons, links, summary controls and radios. Scope game-level Enter to the noninteractive background or explicit primary action. Verify stones, quantity controls, destinations, hints and retries. Also expose the shortcut-disable setting in the empty notebook; its current early return hides it from newcomers.

**R8 - major - Reset progress does not survive another open tab.**

Where: http://localhost:3417/notebook; `src/lib/use-save.ts:19` through `:24`, especially the merge at `:23`; `src/components/notebook.tsx:93`. Evidence: `qa/codex-review-r1/a11y/edges.json`, `notebook-reset-tab-one.png`, `notebook-reset-tab-two.png`, `notebook-reset-resurrected.png` in that folder.

Complete a session and open Notebook in two tabs. Reset in A and confirm: A becomes empty. B retains the old entries. Select Play again in B, then reload A: the deleted progress returns. Merging storage events preserves records that reset was supposed to remove.

Concrete fix: persist a reset generation or equivalent tombstone. Receiving tabs must replace stale saves and discard drafts, and a stale write must not reintroduce pre-reset records. Recheck the exact two-tab sequence.

**R9 - minor - Pupil's first-time accuracy label actually includes teaching efficiency.**

Where: http://localhost:3417/play/pupil, Teach the pupil end card; `src/games/pupil/PupilGame.tsx:84` and `:85`. Evidence: `qa/codex-review-r1/desktop/056-pupil-final.png`; screenshots `048`, `050`, `052`, `054` in the same folder show the four correct first decisions.

All four final decisions were correct on their first submission, but the card reports 0 of 4 right first time because the metric also requires minimum example-card use. Concrete fix: measure first submitted decision correctness separately, or explicitly label teaching efficiency. Do not describe exploring examples as answering incorrectly.

**R10 - minor - Notebook retains answers without the philosophical explanation or passage.**

Where: http://localhost:3417/notebook; `src/components/notebook.tsx:64`, `src/content/notebook.ts:14`, `src/games/scene/rounds.ts:282`, `src/games/pupil/levels.ts:346`. Evidence: `qa/codex-review-r1/phone/068-notebook-after-games.png` and `phone/notebook-full.png`.

The scene entries repeat generic task descriptions followed by spatial sentences; pupil entries retain grammar rules. There is no associated passage link or concise account of what the action illustrated. The page cannot reliably serve as a review of the ideas promised by its empty state. Concrete fix: retain the answer but group records under the learned distinction, cite its section, and link to the relevant source and session. Keep details collapsible rather than repeating long lesson text in every row.

**R11 - minor - The first beetle answer requires an unstated restriction.**

Where: http://localhost:3417/play/beetle, `bb1-1`; `src/games/beetle/rounds.ts:17`, `:28`, `:31`; `qa/codex-review-r1/phone/008-beetle-initial.png`.

Forbidding looking inside another box does not by itself rule out shared measuring or reporting procedures. Yet asking for a description is rejected and no possible check is allowed. The stronger own-case condition only appears later. Concrete fix: state the full stipulated privacy condition before the question, including the absence of a shared comparison procedure, and make the conclusion conditional on it. Check against [Anscombe, PI section 293](https://static1.squarespace.com/static/54889e73e4b0a2c1f9891289/t/564b61a4e4b04eca59c4d232/1447780772744/Ludwig.Wittgenstein.-.Philosophical.Investigations.pdf).

**R12 - minor - English quotations lead to German-only source texts.**

Where: http://localhost:3417/sources, PI and OC entries; `src/content/sources.ts:20` and `:22`. The linked [Investigations](https://www.wittgensteinproject.org/w/index.php/Philosophische_Untersuchungen) and [On Certainty](https://www.wittgensteinproject.org/w/index.php/%C3%9Cber_Gewi%C3%9Fheit) are German texts. Concrete fix: supply the named English edition or precise bibliographic/page guidance and label the retained links German original. An English-speaking beginner should be able to check the words being quoted.

**R13 - minor - One quotation silently modernizes the checked edition's spelling.**

Where: http://localhost:3417/sources#pi-270; `src/content/sources.ts:370`. The catalog uses `shows`; the checked Anscombe edition has `shews` (printed page 95e). Meaning is unchanged. Concrete fix: restore that spelling or identify the exact edition and disclose modernization. [Anscombe scan, PDF page 52](https://static1.squarespace.com/static/54889e73e4b0a2c1f9891289/t/564b61a4e4b04eca59c4d232/1447780772744/Ludwig.Wittgenstein.-.Philosophical.Investigations.pdf#page=52).

**R14 - minor - Demonstrative reference and teaching a new name are conflated.**

Where: http://localhost:3417/play/builder, `b3-5` and `b3-6`; `src/content/sources.ts:48`, `src/games/builder/rounds.ts:167`. Evidence: `qa/codex-review-r1/phone/027-builder-ostension.png`.

Pointing and using the already-understood demonstrative `this` is described as growing the vocabulary; the game then introduces `arch`. Concrete fix: explicitly stage the naming/training of `arch`, and distinguish that from the demonstrative's role in the existing activity. Compare [PI sections 6-9 and 27-30](https://static1.squarespace.com/static/54889e73e4b0a2c1f9891289/t/564b61a4e4b04eca59c4d232/1447780772744/Ludwig.Wittgenstein.-.Philosophical.Investigations.pdf).

**Coverage and evidence**

Both device journeys completed every authored round through visible controls, including later sessions selected through the Sessions navigation. Wrong-answer and mid-round reload checks were performed in all seven games. Home, sources, empty and populated notebook, replay and all session end cards were inspected. Screenshots were viewed, not merely collected.

| Game | Sessions | Rounds | Phone / desktop completion |
|---|---:|---:|---|
| Pictures of facts | 4 | 24 | 24 / 24 |
| The builders | 4 | 24 | 24 / 24 |
| Meaning is use | 4 | 24 | 24 / 24 |
| Family resemblance | 4 | 19 | 19 / 19 |
| Following a rule | 3 | 8 | 8 / 8 |
| The beetle in the box | 2 | 10 | 10 / 10 |
| Hinges of certainty | 2 | 10 | 10 / 10 |
| Total | 23 | 119 | 119 / 119 |

- `python qa/codex-review-r1/phone_review.py`: all seven journey groups completed; 119 completed records in `phone/completed-storage.json`; no captured page/console errors. `phone/observations.json` records rendered text and screenshots. `phone_edges.py` used touch taps: wrong/partial state text survived reload in all seven games. Its initial exact-label selector failure was a script issue; the corrected remaining cases completed and are recorded in `phone-edges/reloads.json`.
- `python qa/codex-review-r1/desktop/review.py`: all seven groups completed, `ERRORS []`, 193 observations, 119 completed records. `desktop/journey.json`, `desktop/storage.json`, supplemental wrong/reload evidence and `desktop/builder-session2-end.png` cover the desktop flows and all 23 end cards.
- `python qa/codex-review-r1/phone_endcards.py`: 23 end-card inspections and measured action positions. This restored only the navigation cursor over already completed, unchanged journey records for visual inspection; it did not manufacture completed rounds. Main journeys supply completion evidence.
- `python qa/codex-review-r1/a11y/audit.py`, `edges.py`, `phone_states.py`, and `keyboard.py`: 20 initial route/device axe scans and eight additional wrong/solved/end/notebook scans returned no axe violations. Initial routes had no horizontal overflow or broken loaded images. Manual use nevertheless exposed R7 and R8. A real passage link reached `/sources#pi-293`; notebook replay returned to the first round on both devices. These results are not a WCAG-conformance claim.
- [Philosophy ledger](../qa/codex-review-r1/philosophy/audit.md): **44 catalog quotations, every gloss/limit, 23 session claims and all 119 unique authored rounds/levels** checked against Ogden 1922, Anscombe, and Paul/Anscombe. The ledger gives each source ID and round ID a result and primary reference; `coverage.json` preserves the count. No material misquotation or wrong author/work attribution was identified. The one lexical variance is R13; R2/R3 are teaching over-claims. Limits and the ladder are principally explanatory/end text, not independently enacted lessons; completion is not evidence of learning them.

Source boundary: initial HEAD was `3ed495bef852b9c03e8d02fb28d165df8b6594d0`. Another actor changed `src/games/cafe/rounds.ts` and `src/games/choice/ChoiceGame.tsx` between the opening status and the later file baseline. Reviewers made no application edits. The 679 protected files hashed in `phone/protected-files-baseline.json` remained unchanged after that baseline. The server was never started, stopped or rebuilt. Runtime evidence governs live behavior; the philosophy ledger identifies its later source snapshot. Unserved changes are not accepted as fixes.

Also done: retained reproducible review scripts, screenshots, completion snapshots and source/coverage manifests under `qa/codex-review-r1/`. Undo: remove that review-evidence folder and this report; no product rollback is needed. Browser contexts opened for this review were closed. No HTML report was created because the requested deliverable is this Markdown file.

The supplied Jackson wiki pages were checked and have no applicable philosophy or website evidence: [APEX MCP](C:/Users/Administrator/Documents/projects/LLMwiki/APEX/APEX-MCP.md), [result copying](C:/Users/Administrator/Documents/projects/LLMwiki/APEX/APEX-SUT-Results-Copy-Mechanism.md), [PAPI2 conversion](C:/Users/Administrator/Documents/projects/LLMwiki/APEX/PAPI2-Script-to-APEX-HostScript-Guide.md). They do not support any finding above. The harness reported an unrelated `SyntaxError` at `core/runtime.py:1250` and used its last tested fallback; it was not edited.

Not covered: physical iOS/Android devices; Safari/Firefox; screen-reader speech or voice synthesis; complete keyboard-only journeys in every session; every answer permutation; zoom/forced-colors/offline/storage-denied modes; performance under mobile-network throttling; statistical learning or retention; linguistic-frequency claims; legal quotation permissions; every competing scholarly interpretation; and whether concurrent source edits match the served production bundle. No server build, rebuild, unit-test, typecheck or lint run was performed for this read-only runtime/content review.
