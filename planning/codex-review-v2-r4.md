VERDICT: SATISFIED

No blocker or major finding remains in the reviewed build. Four minor findings remain: two saved-state compatibility defects and two Sources-reference defects. The round-3 corrections work for fresh play; returning saved states need the limited fixes below.

Reviewed on 2026-11-01 against `planning/BRIEF-v2.md`, `planning/codex-review-v2-r3.md`, and `art/ui-v2/a.png` (The Notebook). Repository HEAD: `bc535e1ab91f33fdc2a5f3e3eb7724eaddad51bf`. Runtime verdict concerns **http://localhost:3417**, using headless Python Playwright Chromium at **390×844 with mobile/touch enabled** and **1440×900 desktop**. No server was started, stopped, or rebuilt. No files under `src/`, `public/`, `e2e/`, or `art/` were edited.

**Round 3 re-check**

Each affected game was rechecked before its full journeys. Fixed fresh-play behavior is not repeated as an open finding.

| Earlier finding | Status | Evidence from the served build |
|---|---|---|
| R3-1: a circular check establishes a hinge | **partly** | **Fresh activity fixed on both devices.** The optician and word-meaning checks use other resources. Only the explicit “Doubt everything at once” action removes all checks; the fresh Notebook records what was checked. Reload preserves the local eye-test state. `qa/codex-review-r4/late-games/recheck.json` and the device-recheck screenshots document this. Genuine R3 completed saves retain obsolete results without requiring the replacement activity: minor R4-1 below. |
| R3-2: written sign language rejected | **partly** | **Fresh selection fixed on both devices.** In `f3-3`, English → sign language → can be written down is accepted. `qa/codex-review-r4/early-games/edges/sign-probe.json` and `phone-signlanguage-written.png` document this. A pending card restored from the previous data still rejects the link: minor R4-2 below. |

**R4-1 — minor — Obsolete certainty completion is credited to the replacement activity.**

Where: http://localhost:3417/play/hinges, `h1-0`, and http://localhost:3417/notebook. `src/games/hinges/rounds.ts:15`, `src/lib/progress.ts:175`, `src/components/notebook.tsx:85`. Evidence: `qa/codex-review-r4/late-games/migration.json`, `qa/codex-review-r4/late-games/phone-migration/returning-notebook.png`, and `qa/codex-review-r4/late-games/desktop-migration/returning-notebook.png`.

Loading the genuine round-3 browser saves resumes at the completed Hinges end card. The Notebook puts the new activity explanation above the old “Stands fast: My eyes are working” and word-meaning results, still marked “Right first time.” Those answers came from the superseded exercise and do not establish that the player encountered the new distinction. Manually selecting Sessions → Doubt it opens the corrected activity, so the new lesson remains reachable. This residual migration issue does not repeat the former fresh-user major finding.

Concrete fix: version or replace `h1-0` and invalidate its obsolete completion and drafts. Resume the replacement exercise for affected saves while preserving unrelated progress. Do not present old earned answers as completion of the new lesson.

**R4-2 — minor — A saved Family card preserves the corrected factual error.**

Where: http://localhost:3417/play/family, Sessions → What is a language?, `f3-3`. `src/games/family/FamilyGame.tsx:301`, `src/games/family/FamilyGame.tsx:327`, `src/lib/use-draft.ts:15`. Evidence: `qa/codex-review-r4/early-games/edges/touch-and-upgrade.json`, `qa/codex-review-r4/early-games/edges/phone-family-previous-version-draft.png`, and `qa/codex-review-r4/early-games/edges/desktop-family-previous-version-draft.png`.

Thread saves entire Card objects. Restoring a pending sign-language card with the exact previous-version feature data retains `written: false`, overriding the corrected authored card. After reload, the English/sign-language written link is still rejected. This reproduction used a constructed previous-version draft, not an invented completed answer. Reselecting the card recovers.

Concrete fix: persist card IDs and resolve them against current session data. Alternatively, migrate or clear the affected drafts. Apply the same resolution to the saved chain and pending card; clearing only the pending selection leaves another route for stale features.

**R4-3 — minor — The Investigations bibliography excludes a part it quotes.**

Where: http://localhost:3417/sources, `#w-PI` and `#pi-ppf-118`. `src/app/sources/page.tsx:14`, `src/content/sources.ts:229`. Evidence: `qa/codex-review-r4/philosophy/phone-pi-bibliography.png` and `qa/codex-review-r4/philosophy/phone-pi-ppf-118.png`; desktop counterparts are retained.

The group introduction labels the Anscombe quotations “Part I,” but the aspect-seeing extract is from Part II, xi. The individual card identifies Part II correctly. This is a bibliography inconsistency, not a misquotation.

Concrete fix: name **Parts I and II** in the group bibliography and retain the individual Part II/PPF cross-reference.

**R4-4 — minor — Section ranges sort as concatenated numbers.**

Where: http://localhost:3417/sources, Investigations list. `src/app/sources/page.tsx:23`. Evidence: `qa/codex-review-r4/philosophy/live-sources.json`, `qa/codex-review-r4/philosophy/phone-pi-ppf-118.png`, and `qa/codex-review-r4/philosophy/desktop-pi-ppf-118.png`.

The list places §§19–20 after §293 and §§201–202 after Part II. Removing all punctuation turns these ranges into 1920 and 201202, disrupting section order.

Concrete fix: sort Part I by the first section number, with Part II explicitly grouped after Part I. Do not concatenate range endpoints.

**Philosophy and learning**

The [philosophy audit](../qa/codex-review-r4/philosophy/audit.md) and [per-ID ledger](../qa/codex-review-r4/philosophy/coverage.json) cover **all 45 catalog quotations, every gloss and limitation, all 22 sessions, and all 111 authored rounds/levels**. Comparison used [Ogden's 1922 Tractatus](https://www.wittgensteinproject.org/w/index.php/Tractatus_Logico-Philosophicus_(English)), [Anscombe's Investigations](https://static1.squarespace.com/static/54889e73e4b0a2c1f9891289/t/564b61a4e4b04eca59c4d232/1447780772744/Ludwig.Wittgenstein.-.Philosophical.Investigations.pdf), and [Paul and Anscombe's On Certainty](https://www.circuitdebater.org/circuitdebater/archive/w/file/view/On%20Certainty.pdf/507953768/On%20Certainty.pdf). The primary editions were reopened this turn; stable cached texts and scans supplied the detailed comparison. Thirty-nine quotations matched normalized text; six OCR/layout cases were rechecked against scans. All 45 served quotations matched the catalog on both devices. No material quotation, attribution, or new claim-level overstatement was found.

The rewarded actions concern philosophy: arranging a scene tests truth conditions; builders and café distinguish uses within activities; Family constructs overlapping comparisons; Pupil tests competing continuations and practices; Beetle/Diary separate private contents from usable criteria; Hinges now contrasts local checks with simultaneous radical doubt. Wrong-answer corrections concern these distinctions. No residual English-course learning objective or English-proficiency score was found. The limits of language and the ladder remain chiefly explanatory passages, rather than independent enacted lessons. Successful play is evidence that the activities work, not proof of retained philosophical understanding.

**Design and complete journeys**

The implementation carries the chosen Notebook design across home, games, end cards, Sources, and Notebook: paper ground, navy type, serif headings, vermilion controls, illustrated path, and bordered idea cards. It is not a pixel reproduction: several game scenes remain enclosed paintings rather than torn-paper compositions. No new major mismatch, illegible passage, overlapping control, missing artwork, or broken/empty layout was observed at the required sizes. The previously resolved round-2 composition finding is not reopened.

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

`qa/codex-review-r4/early-games/coverage.json` and `qa/codex-review-r4/late-games/coverage.json` enumerate completed IDs. Sessions were selected through the Sessions navigation. Each game received wrong-answer and mid-round reload checks. All 22 end cards per device were reached, their lower content inspected, and replay/next controls exercised. Screenshots were inspected, including the full-page reading content in `qa/codex-review-r4/root/sheets/`.

**Browser and accessibility evidence**

- `python -B qa/codex-review-r4/root_audit.py`: all ten routes returned HTTP 200 on both devices, with zero collected page errors, broken images, horizontal overflow, or axe violations in those initial states.
- `python -B qa/codex-review-r4/root_edges.py`: populated Notebook, expanded answers, source links, and reset across three tabs operated on both devices; reset survived reload. Populated Notebook axe scans found no violations.
- `python -B qa/codex-review-r4/root_deep.py`: actual touch operation, Notebook replay, visible keyboard skip link, persistent shortcut disabling, storage denial/corruption, slow arrival, and offline recovery exercised. Storage denial warns while play continues. Already-loaded offline play works; offline reload returns `net::ERR_INTERNET_DISCONNECTED`, and reconnection restores the saved position. Full offline support is not claimed.
- `python -B qa/codex-review-r4/final_checks.py`: combines the genuinely earned game saves, asserts all 111 current IDs, displays the all-complete closing passage, checks all 22 Notebook session entries and all 45 source anchors on both devices. Results: `qa/codex-review-r4/root/final-checks.json`.
- Supplemental `web-check.py` used its own 375×812 mobile preset, 150 ms RTT, 1.6 Mbps and 4× CPU slowdown. Its full run returned FAIL: the scene crossed its LCP threshold at 3535 ms after first byte; it also applied a CTA rule to the Sources reading page and objected to Notebook's intentional `noindex`. An isolated scene recheck returned PASS at 3292 ms, still a speed warning. These measurements do not establish consistently fast cold loads. No measured contrast failure was reported; text over images and certain unresolvable backgrounds are outside that probe. The Sources CTA and personal Notebook indexing rules are not product defects here. Raw results: `qa/codex-review-r4/web-check/web-check.json` and `qa/codex-review-r4/scene-performance/web-check.json`. No blanket harness PASS is claimed.

Decision review: coordinator-owned. Separate leaf reviewers audited the philosophy, early games, and late games; the root reviewer reconciled their evidence and assigned the four minor severities. The final product verdict follows the requested threshold of no remaining blocker or major, not a claim that every possible check passed.

Also done: tested old-save compatibility, the combined all-complete state, multi-tab reset, storage failure, and offline recovery beyond the basic journeys. Undo: remove `qa/codex-review-r4/` and this report; no product rollback is needed. `qa/codex-review-r4/integrity.json` records protected-file hashes and report/coverage checks. Browser contexts opened for the review were closed.

The requested Markdown file is the deliverable; nothing was published. The mandatory wiki check provided no relevant philosophy or website evidence: [APEX MCP](C:/Users/Administrator/Documents/projects/LLMwiki/APEX/APEX-MCP.md), [PAPI2 conversion](C:/Users/Administrator/Documents/projects/LLMwiki/APEX/PAPI2-Script-to-APEX-HostScript-Guide.md), and [result copying](C:/Users/Administrator/Documents/projects/LLMwiki/APEX/APEX-SUT-Results-Copy-Mechanism.md) concern unrelated lab workflows.

Not covered: physical phones; Safari/Firefox; screen-reader speech or voice synthesis; complete keyboard-only journeys; every answer permutation or check-graph branch; zoom/forced-colors; every storage/network failure; measured learning or retention; exhaustive scholarly interpretations; quotation licensing; deployment; unit-test/typecheck/lint/build gates; or code not present in the served production bundle. No server or bundle was rebuilt. No automatic check judges the substantive correctness of `planning/codex-review-v2-r4.md`; the custom integrity check covers only format, references, hashes, and coverage counts.
