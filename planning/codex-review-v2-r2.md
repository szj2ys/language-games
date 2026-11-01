VERDICT: NOT SATISFIED

The diary now has an activity, but its conclusion contradicts the player's result: even **0 of 5 matches** is presented as evidence that a sign predicts rising blood pressure. The chosen Notebook design remains only partly implemented, and a returning browser can skip the replacement rule-following lessons. **Three major and three minor findings remain.**

Reviewed on 2026-11-01 against `planning/BRIEF-v2.md`, `art/ui-v2/a.png`, and round 1. HEAD was `32eee0c`. Runtime judgments concern the existing production build at **http://localhost:3417**, operated with Python Playwright Chromium at **390x844, mobile/touch enabled**, and **1440x900 desktop**. No server was started, stopped or rebuilt. No application files were edited.

**Round 1 recheck**

These statuses address the earlier findings; fixed findings are not repeated below. Screenshot paths in this table are relative to `qa/codex-review-r2/`.

| Earlier finding | Status | Evidence from the served build |
|---|---|---|
| R1: Pupil assesses English grammar | **fixed** | Four replacement rounds teach rival continuations and signpost customs. `late-games/phone/001-pupil-initial.png`, `007-pupil-twist.png`, `020-pupil-signposts-twist.png`; both-device completed records in `late-games/coverage.json`. |
| R2: Propositions require one unique arrangement | **fixed** | Scene session 3 now distinguishes truth conditions from this partner's need to identify a position. `early-games/phone/134-after-next.png`. |
| R3: Doubt requires the disputed thing to exist | **fixed** | `h1-4` now refers to language and checking practices; `h1-4b` permits an ordinary astronomical existence question. `late-games/phone/060-question-answer.png`, `063-next.png`. |
| R4: Beetle/hinges are solely narrated quizzes | **fixed** | All four sessions now include operated activities: changing private contents, making diary entries, following checks, and comparing propositions across eras. `late-games/observations.json`. The diary's new inference defect is R2-1 below. |
| R5: Selected Notebook composition not carried through | **partly** | Desktop title/path and session tabs changed, but the rectangular scene treatment and phone builder composition remain. R2-2 below. |
| R6: Phone completion/feedback below the relevant content | **partly** | All 22 end cards now lead with completion, idea and next/replay actions. Beetle wrong-answer feedback is revealed. Café feedback still falls below the viewport; R2-6 below. |
| R7: Enter hijacks focused controls | **fixed** | Enter selects the slab and increments quantity without submitting an unintended answer. `early-games/phone/007-prior-R7-enter-select-and-increment.png`, plus desktop edge evidence. Empty Notebook exposes the shortcut setting: `root/phone/notebook-viewport.png`. |
| R8: Another tab resurrects reset progress | **fixed** | Reset emptied both Notebook tabs, reset an active game and remained empty after reload on both devices. `root/edges.json`, `root/phone-reset-tab-b.png`, `root/desktop-reset-after-reload.png`. |
| R9: Pupil accuracy conflates teaching efficiency | **fixed** | Going on reports 3/3 first decisions correct despite using 5, 4 and 4 teaching cards. `late-games/phone/018-pupil-going-on-end.png` and both-device storage snapshots. |
| R10: Notebook lacks philosophical explanations/references | **fixed** | Entries group answers beneath the session's philosophical claim and working passage link; answers collapse. `root/phone-notebook-completed.png`, `root/phone-notebook-expanded.png`; link reached `/sources#pi-2`. |
| R11: Beetle privacy restriction unstated | **fixed** | `bb1-1` now rules out shared comparison procedures before the question. `late-games/phone/026-next.png`. |
| R12: English quotations link to unlabelled German texts | **fixed** | German links are labelled; named English editions and section guidance are supplied, as the earlier fix allowed. `philosophy/live-sources.json`, `philosophy/phone-pi-bibliography.png`. |
| R13: PI §270 spelling silently modernized | **fixed** | Served quotation restores Anscombe's spelling. `philosophy/phone-pi-270.png`. |
| R14: Demonstrative confused with teaching a new name | **fixed** | Builder distinguishes an existing use of “this” from subsequently teaching “arch” by pointing. `early-games/phone/039-builder-ostension.png`. |

**R2-1 — major — The diary asserts a predictive relationship that the player's results refute.**

Where: http://localhost:3417/play/beetle, Sessions → The diary, `bb2-0`; `src/games/choice/activities.tsx:266`, `:267`, `:275`; `src/games/beetle/rounds.ts:135`. Evidence: `qa/codex-review-r2/late-games/phone-edges/diary-zero-matches-completed.png`, `desktop-edges/diary-zero-matches.png`, and `edges.json` in that directory.

On days 2–6, choose Not S, Write S, Not S, Write S, Not S; check the diary and fit the gauge. The site reports **0 of 5 matches**, then says S tells the player their blood pressure is rising without the gauge. “What changed?” still awards full marks and first-time correctness. This is an unconditional scripted conclusion, not learning from the experiment.

PI §270 introduces a discovered correlation with the manometer; merely adding a measuring device does not establish this particular predictive use. The quotation itself is accurate; the activity over-claims what its result supports. See the [Anscombe edition, §270, printed 94e–95e](https://static1.squarespace.com/static/54889e73e4b0a2c1f9891289/t/564b61a4e4b04eca59c4d232/1447780772744/Ludwig.Wittgenstein.-.Philosophical.Investigations.pdf#page=51).

Concrete fix: make the conclusion depend on the observed relation. With these entries, explain that S does not indicate a rise; let the learner calibrate/correct the criterion and test fresh cases before claiming predictive use. Distinguish having a public check from successfully predicting its result; successful prediction does not verify the identity of a private sensation. Explicitly limit the visible-shape analogy: the retained Day 1 specimen is already publicly comparable, unlike the stipulated private diary. Do not award a correct first inference regardless of the data.

**R2-2 — major — The selected Notebook design remains incompletely implemented (R5 continued).**

Where: http://localhost:3417/, http://localhost:3417/play/builder (`b1-1`), http://localhost:3417/play/pupil (`r-1`), and their completion cards; `src/app/page.tsx:34`, `:60`, `:80`; `src/games/builder/BuilderGame.tsx:438`. Compare `art/ui-v2/a.png` with `qa/codex-review-r2/root/desktop/home-viewport.png`, `root/phone/home-viewport.png`, `early-games/phone/003-prior-initial-builder.png`, `late-games/desktop/001-pupil-initial.png`, and `late-games/desktop/023-pupil-signposts-end.png`.

The home page now has the one-line desktop title and seven-stop rail, but its rectangular landscape and separate explanatory blocks do not reproduce the selected compact portrait collage. At 1440x900, path descriptions and entry arrows extend below the first viewport. On the phone, the first screen still contains no actual game choice.

The clearest unresolved mismatch is the builder: its scene occupies **y=202–592**, followed by a two-row stone selector ending around **y=839**. The chosen mock-up fits a restrained scene, one row of choices and an explanatory idea card into its phone composition. The built page instead spends nearly the entire viewport on chrome, scenery and choices, with the idea hidden in a disclosure above. Pupil still uses an enclosed classroom landscape; its end card retains the old apple-teaching illustration after the grammar syllabus was removed. Paper/navy/red colours alone do not fulfill the selected art direction. Sources and Notebook use readable paper cards, but do not resolve this inconsistent treatment across the product.

Concrete fix: carry the chosen portrait cutouts, paper edges, compact hierarchy and illustrated path into the actual assets/layout. Reduce builder scene height and arrange four readable, touch-sized choices in one row; place a concise idea card adjacent to the activity. Replace obsolete pupil completion art with the current sequence/signpost activity. Check the resulting home, game and completion compositions at both required sizes; do not solve this by shrinking type or controls.

**R2-3 — major — Existing progress can skip all replacement rule-following content.**

Where: http://localhost:3417/play/pupil; `src/components/game/use-sessions.ts:16–22`, `src/lib/progress.ts:4–5`. Evidence: `qa/codex-review-r2/root/returning-save.json`, `root/returning-play-pupil.png`, `root/desktop-returning-play-pupil.png`.

Restore the real, unmodified browser state captured in round 1 (`qa/codex-review-r1/phone/completed-storage.json`) and visit Pupil. On both devices it opens **Done · Signposts**, offers the next idea, and reports 0/1 first-time correct. There are **no completed `r-*` rounds** in that save. The old grammar position `{session:2, round:2}` is clamped into the new final session; the old round index is then treated as completion. A returning learner is directed past the replacement philosophy lessons without playing any of them.

Concrete fix: migrate positions when a game's authored session/round identities change. Resume at a valid unfinished current round and require current completion records before displaying an end card. Preserve unaffected games' progress. Add a regression check using this actual old save, not merely an empty save or an out-of-range integer.

**R2-4 — minor — An English-grammar lesson remains in the builder hint.**

Where: http://localhost:3417/play/builder, Sessions → Two slabs — there!, `b2-1`; `src/games/builder/rounds.ts:84`. Evidence: `qa/codex-review-r2/early-games/edges/phone-builder-b2-1-plural-hint-visible.png` and its text capture.

The hint still teaches the English plural suffix: “Most nouns add -s for the plural: slabs.” It does not determine the score, so this is not the former Pupil defect, but it is residual English-course instruction under an explicitly philosophical brief.

Concrete fix: explain the roles of number, stone word and destination in this shared building practice. Remove the grammar instruction.

**R2-5 — minor — Signposts' completion passage uses stale session indexing.**

Where: http://localhost:3417/play/pupil, Signposts end card after `r-4`; `src/games/pupil/PupilGame.tsx:18–21`, `:39`. Evidence: `qa/codex-review-r2/late-games/desktop/023-pupil-signposts-end.png` and corresponding phone screenshot.

The conclusion names the signpost/custom argument of §198, while the main passage is §217 and the additional passage is §202. The old three-entry source array remains for a two-session syllabus; the intended §198 pair is stranded at index 2. This is a mismatched teaching reference, not a misquotation.

Concrete fix: key completion passages by session identity, lead Signposts with §198, and attach §217 to Going on's regress-of-reasons case.

**R2-6 — minor — Café's phone correction still starts below the viewport (R6 residual).**

Where: http://localhost:3417/play/cafe, Same words, new job, `c1-1`; `src/games/cafe/CafeGame.tsx:203–207`. Evidence: `qa/codex-review-r2/early-games/edges/phone-cafe-wrong-1000ms.png`, `phone-cafe-feedback-revealed.png`, and `feedback.json`.

Answer with the November remark. The speech bubble reacts, but the explicit correction/retry guidance begins at **y=841.5**, height **61**, in an 844px viewport; scrollY remains 0 after one second. Almost all of that explanation is invisible. This is minor because the bubble provides an immediate contextual response and the answer controls remain usable. The earlier end-card and beetle defects are fixed.

Concrete fix: reveal the correction near the selected answer, using the same feedback handling now applied to the choice games, while retaining keyboard focus and the available answers.

**Philosophy, learning and coverage**

The [philosophy ledger](../qa/codex-review-r2/philosophy/audit.md) checks **45 catalog quotations, their glosses/limits, 22 sessions and 111 authored rounds/levels** against Ogden 1922, Anscombe, and Paul & Anscombe. No material catalog misquotation or wrong author/work attribution was found. The new diary inference and Signposts passage mapping are identified above. The ledger records the primary editions, individual IDs and scope of the comparison; the old review's conclusions were not simply copied.

The games now assess philosophical tasks rather than an English syllabus: manipulating truth conditions, responding within a practice, comparing overlapping cases, teaching rival continuations, varying private contents and tracing checks. This does not establish that players retain the ideas. The Tractatus limits/ladder remain principally explanatory text rather than independently enacted lessons. The diary currently teaches the wrong inference when the learner explores a permitted alternative.

| Game | Sessions | Completed rounds, phone / desktop |
|---|---:|---:|
| Pictures of facts | 4 | 24 / 24 |
| The builders | 4 | 24 / 24 |
| Meaning is use | 4 | 24 / 24 |
| Family resemblance | 4 | 19 / 19 |
| Following a rule | 2 | 4 / 4 |
| The beetle in the box | 2 | 7 / 7 |
| Hinges of certainty | 2 | 9 / 9 |
| Total | 22 | 111 / 111 |

- `python qa/codex-review-r2/early-games/review.py` and `late-games/review.py`: every round completed through controls on both devices, later sessions selected through Sessions, all 22 end cards per device inspected. Wrong answers and mid-round reloads were exercised in all seven games. Device storage snapshots, journey logs and inspected screenshot sheets retain the evidence.
- `python qa/codex-review-r2/root_audit.py`: home, all seven game routes, sources and empty Notebook returned HTTP 200 on both devices; **20 axe scans found no violations**, no captured page errors, no horizontal overflow, and no broken loaded images. This is not a WCAG-conformance claim.
- `python qa/codex-review-r2/root_edges.py`: real completed Notebook entries, expanded answers, source anchors and multi-tab reset operated on both devices; two populated-Notebook axe scans found no violations. Initial selector/measurement failures in this review script were corrected before the completed run; they were not product findings.
- `python qa/codex-review-r2/returning_save.py`: reproduced the old-save/new-syllabus completion defect on phone and desktop. This test deliberately restores an actual prior save; the clean journeys do not inject completion state.
- Source integrity and evidence validation are recorded in `qa/codex-review-r2/integrity.json`. Authored files under `src/`, `public/`, `e2e/` and `art/` are unchanged. One incidental directory change occurred: importing the existing gameplay helper refreshed `e2e/__pycache__/play_all.cpython-310.pyc`. Its previous bytes were not captured, so that generated cache was not restored. Browser contexts created for the review were closed.

Also done: tested a returning browser after the syllabus replacement, beyond ordinary same-build reloads, and retained reproducible review scripts, screenshots and coverage under `qa/codex-review-r2/`. Undo: remove that evidence directory and this report; no product rollback is needed.

The requested Markdown file is the report; no HTML copy or public publication was created. The required Jackson wiki check supplied no applicable philosophy/site evidence: [APEX MCP](C:/Users/Administrator/Documents/projects/LLMwiki/APEX/APEX-MCP.md), [PAPI2 conversion](C:/Users/Administrator/Documents/projects/LLMwiki/APEX/PAPI2-Script-to-APEX-HostScript-Guide.md), and [result copying](C:/Users/Administrator/Documents/projects/LLMwiki/APEX/APEX-SUT-Results-Copy-Mechanism.md) concern unrelated lab workflows.

Not covered: physical phones; Safari/Firefox; screen-reader speech or voice synthesis; complete keyboard-only journeys; every answer permutation or hinge-graph branch; zoom/forced-colors; offline, storage-denied and throttled-network operation; measured learning/retention; every scholarly interpretation; quotation licensing; deployment; or unit-test/typecheck/lint/build gates. No server or production bundle was rebuilt, and no claim is made about code that was not served.
