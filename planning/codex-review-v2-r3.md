VERDICT: NOT SATISFIED

The certainty activity teaches an invalid shortcut: a circular check is treated as sufficient to establish a hinge. Family resemblance also rejects a valid comparison involving written sign language. **One major and one minor finding remain. All six round-2 findings are fixed on re-check.**

Reviewed on 2026-11-01 against `planning/BRIEF-v2.md`, `art/ui-v2/a.png` (The Notebook), and `planning/codex-review-v2-r2.md`. Repository HEAD: `9985432f6dbb17b5975ab0d9b63eebb59b5801d1`. Runtime findings concern the existing production build at **http://localhost:3417**, operated with Python Playwright Chromium at **390×844 with mobile/touch enabled** and **1440×900 desktop**. No server was started, stopped or rebuilt. No files under `src/`, `public/`, `e2e/` or `art/` were changed.

**Round 2 re-check**

Earlier findings were checked before the full journeys. Fixed findings are not repeated as open findings. Evidence paths below are relative to `qa/codex-review-r3/`; corresponding desktop captures are retained alongside phone captures.

| Earlier finding | Status | Served-build evidence |
|---|---|---|
| R2-1: Diary asserts prediction despite failed matches | **fixed** | Zero of five calibration matches now says S does not track the gauge. Three fresh test days follow; zero of three predictions says it is not yet reliable, records 1/2 and `firstTry: false`. The drawn-sensation limitation is explicit. `late-games/phone-edges/diary-zero-matches.png`, `diary-zero-predictions.png`, `edges.json`. |
| R2-2: Notebook composition incompletely implemented | **fixed** | Desktop home now has the compact portrait cutout and illustrated rail, with all seven entry arrows inside 900px. Phone home exposes actual game choices. Builder's scene is approximately y=140–433, four choices occupy one row at y=445–560, and its idea card fits at y=680–827. Pupil completion art now depicts sequences/signposts. `root/desktop/home-viewport.png`, `root/phone/home-viewport.png`, `root/phone/play-builder-viewport.png`, `late-games/desktop/023-pupil-signposts-end.png`. |
| R2-3: Old progress skips the replacement Pupil syllabus | **fixed** | The actual round-1 saved state now opens Going on with zero teaching cards used, rather than the Signposts end card. Checked on both devices. `late-games/phone-edges/returning-play-pupil.png`, `late-games/desktop-edges/returning-play-pupil.png`, `late-games/edges.json`. |
| R2-4: Builder hint teaches English plurals | **fixed** | `b2-1` now explains the number word's role in the building activity; the plural-suffix lesson is absent. `early-games/edges/phone-builder-b2-1-hint.png`. |
| R2-5: Signposts completion uses stale passage indexing | **fixed** | Signposts leads with PI §198 and also supplies §202. Going on includes §217. Both end cards were reached through play. `late-games/phone/018-pupil-going-on-end.png`, `late-games/phone-edges/signposts-expanded.png`. |
| R2-6: Café correction is below the phone viewport | **fixed** | After the November answer in `c1-1`, the complete correction is visible at y=780.5–841.5 in the 844px viewport. `early-games/edges/phone-cafe-wrong.png`, `early-games/edges/edges.json`. |

**R3-1 — major — The certainty game turns a circular checking menu into proof of hinge status.**

Where: http://localhost:3417/play/hinges, Sessions → Doubt it, `h1-0`; `src/games/hinges/rounds.ts:18`, `:38`, `:45`, `:52`; `src/games/choice/activities.tsx:434`. Evidence: `qa/codex-review-r3/philosophy/phone-eyes-circular.png`, `desktop-eyes-circular.png`, and `hinges-live.json`.

Choose **Read the sign → My eyes are working → Read the small print**. The activity counts a hinge found and declares “It stands fast” because the offered test uses eyesight. Its instruction says to find something that could *only* be checked by relying on itself. Particular word meanings receive the same treatment through dictionary/asking branches.

This conflates an ordinary, corrigible eyesight or word-meaning question with radical doubt about the resources of checking. A restricted menu of self-referential tests does not establish that a claim is a hinge. OC §125 considers a doubt that would already undermine the offered visual confirmation; §349 explicitly discusses ordinary eyesight testing, and §345 concerns what cannot be questioned simultaneously during an inquiry. The game does not literally assert infallibility, but it teaches the wrong criterion through the rewarded action. The general source-card caveat about context does not repair that action. See [Paul & Anscombe, §§125, 345, 349, printed 18e–19e and 44e–45e](https://www.circuitdebater.org/circuitdebater/archive/w/file/view/On%20Certainty.pdf/507953768/On%20Certainty.pdf#page=21); inspected scans are `philosophy/oc-page-21.png`, `oc-page-22.png`, `oc-page-47.png`, and `oc-page-48.png` under the evidence directory.

Concrete fix: first allow a local eyesight or word-meaning check against an independently supplied target or another person's response, while other checking practices remain fixed. Then explicitly introduce radical doubt about those resources together and show what checking loses. Award the distinction between these contexts. Do not award hinge status merely for finding a loop in the authored graph; update the stored Notebook conclusion accordingly.

**R3-2 — minor — Family resemblance rejects written sign language.**

Where: http://localhost:3417/play/family, Sessions → What is a language?, `f3-3`; `src/games/family/rounds.ts:75`, `:88`, `:192`. Evidence: `qa/codex-review-r3/early-games/edges/phone-signlanguage-written.png`, `desktop-signlanguage-written.png`, and `sign-probe.json`.

Select **English → sign language → can be written down**. Both devices reject the link with “It isn't true that both English and sign language can be written down.” The generic sign-language card excludes `written` in its feature data. That categorical judgment is false: writing systems for signed languages exist, including [SignWriting](https://www.signwriting.org/about/what/what02.html). This is an authored factual error, not a claim made by PI §18. Other links permit completion, hence minor severity.

Concrete fix: accept the written-sign-language link. If the intended distinction concerns how commonly a language is written, qualify the feature and identify the practice being compared. Re-check the chain and its no-common-feature constraint after correcting the data; do not penalize this valid example of overlap.

**Philosophy and learning**

The [complete philosophy ledger](../qa/codex-review-r3/philosophy/audit.md) and [per-ID coverage](../qa/codex-review-r3/philosophy/coverage.json) cover **45 catalog quotations and their glosses/limits, 22 sessions, and all 111 authored rounds/levels**. Primary editions were retrieved during this review: [Ogden 1922](https://www.wittgensteinproject.org/w/index.php/Tractatus_Logico-Philosophicus_(English)), [Anscombe's Investigations](https://static1.squarespace.com/static/54889e73e4b0a2c1f9891289/t/564b61a4e4b04eca59c4d232/1447780772744/Ludwig.Wittgenstein.-.Philosophical.Investigations.pdf), and [Paul & Anscombe's On Certainty](https://www.circuitdebater.org/circuitdebater/archive/w/file/view/On%20Certainty.pdf/507953768/On%20Certainty.pdf). Thirty-nine quotations matched normalized text; six OCR/layout cases were checked against rendered scans. All 45 served quotations matched the catalog on both devices. **No material quotation or work/translator-attribution error was found.** The two content findings above remain.

The games assess philosophical activities rather than English proficiency: scene changes truth conditions; builder distinguishes uses within a practice; café changes the appropriate response with context; family constructs overlapping comparisons; pupil tests rival continuations; beetle varies private contents and tests a diary's public use; hinges traces dependencies and changes historical context. No residual English-course instruction was found after the builder hint correction. The hinge inference prevents an unqualified claim that each lesson teaches its idea correctly. The Tractatus limits and ladder remain primarily explanatory material, not separate enacted lessons. Playing these sessions is not evidence of retained understanding.

**Design and use on both devices**

Home, all seven games, all 22 end cards per device, Sources, and empty/populated Notebook were inspected. The R2 composition defects are resolved. The implementation is not a pixel reproduction of the mock-up: builder, café and pupil retain enclosed painted scenes. With the compact home, cutout path art, adjacent idea cards and revised completion artwork, that residual difference does not justify repeating the old major finding. Sources and Notebook retain the paper, navy type, serif headings and bordered-note treatment. No additional major legibility, clipping or empty/broken-layout defect was observed at the required sizes.

| Game | Sessions | Completed rounds: phone / desktop |
|---|---:|---:|
| Pictures of facts | 4 | 24 / 24 |
| The builders | 4 | 24 / 24 |
| Meaning is use | 4 | 24 / 24 |
| Family resemblance | 4 | 19 / 19 |
| Following a rule | 2 | 4 / 4 |
| The beetle in the box | 2 | 7 / 7 |
| Hinges of certainty | 2 | 9 / 9 |
| Total | 22 | 111 / 111 |

- `python -B qa/codex-review-r3/early-games/review.py` and `late-games/review.py`: all rounds completed through controls, later sessions selected through Sessions, wrong answers and mid-round reloads exercised in every game. Coverage manifests contain no missing round IDs. Saved screenshots were inspected, including all end states; journey and edge scripts retain reproducible inputs. Review-script selector failures were corrected and are not counted as product defects.
- `python -B qa/codex-review-r3/root_audit.py`: all ten routes returned HTTP 200 on both devices; 20 axe scans reported no violations, no captured page errors, no horizontal overflow, and no broken loaded images. Two additional populated-Notebook scans in `root_edges.py` also reported no violations. This is not a WCAG-conformance claim.
- `python -B qa/codex-review-r3/root_edges.py`: Notebook entries, expanded answers, source anchors, and multi-tab reset operated on both devices. Reset remained effective after reload and did not resurrect progress.
- `python -B qa/codex-review-r3/root_deep.py`: touch operation, Notebook replay, visible keyboard skip links, persistent shortcut disabling, and storage-denied/corrupt-state play were exercised. Storage denial displays a warning while play continues. Slow-network arrival retained readable content. An already-loaded round worked offline; an offline reload failed with `net::ERR_INTERNET_DISCONNECTED`, and reconnecting restored the saved position. Full offline support is not claimed.
- The supplemental harness `web-check.py` run used its own 375×812 phone preset plus 1440×900. It returned FAIL solely because its generic first-screen CTA rule was applied to `/sources`; reading that page is the task, and its first passage is present. That rule is not a product finding here. It also reported performance and touch-comfort warnings, with no measured contrast failure. The raw result and inspected screenshots are in `qa/codex-review-r3/web-check/`; no blanket harness PASS is claimed.
- `qa/codex-review-r3/integrity.json` records the final comparison against the protected-file hash baseline and validates report evidence paths. Browser contexts created for this review were closed.

Also done: tested storage denial/corruption, shortcut persistence, multi-tab reset and offline recovery beyond the requested journeys; retained the reproducible evidence under `qa/codex-review-r3/`. Undo: remove that evidence directory and this report. No product rollback is required.

The requested Markdown file is the deliverable; no public publication was made. The required wiki check supplied no relevant philosophy/site evidence: [APEX MCP](C:/Users/Administrator/Documents/projects/LLMwiki/APEX/APEX-MCP.md), [PAPI2 conversion](C:/Users/Administrator/Documents/projects/LLMwiki/APEX/PAPI2-Script-to-APEX-HostScript-Guide.md), and [result copying](C:/Users/Administrator/Documents/projects/LLMwiki/APEX/APEX-SUT-Results-Copy-Mechanism.md) concern unrelated lab workflows.

Not covered: physical phones; Safari/Firefox; screen-reader speech or voice synthesis; complete keyboard-only journeys; every answer permutation or dependency-graph branch; zoom/forced-colors; every storage/network failure; the combined all-games-complete home state; measured learning/retention; exhaustive scholarly interpretations; quotation licensing; deployment; or unit-test/typecheck/lint/build gates. The server and production bundle were not rebuilt; code not served is not covered by the runtime verdict.
