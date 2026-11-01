VERDICT: SATISFIED

No blocker or major finding remains in this confirmation pass. **Three round-4 fixes are confirmed; R4-1 is not fully fixed and remains minor.**

Reviewed 2026-11-01: served production build at http://localhost:3417, repository HEAD `3d4bd881bdcc48caf3bf36ba598bc2ff205ca7ca`. Python Playwright Chromium: **390×844 mobile/touch** and **1440×900 desktop**. No server was started, stopped or rebuilt; no files under `src/`, `public/`, `e2e/` or `art/` were edited.

**R4-1 — minor — NOT FIXED in full: returning players still skip the replacement activity on resume.**

Where: http://localhost:3417/ → Continue → http://localhost:3417/play/hinges, replacement round `h1-checks`; `src/lib/progress.ts:175`. Evidence: `qa/codex-review-r5/late-games/migration-followup.json`, `qa/codex-review-r5/late-games/phone-migration/home-continue-still-complete.png` and its desktop counterpart.

Genuine round-3 saves now show **8/9** on the home tile, omit the obsolete answer from Notebook, and ignore old drafts. Unrelated progress survives. But Continue still opens **Done · The river-bed**, because the saved later session is complete. Selecting Sessions → Doubt it reaches the required replacement. This is a residual resume defect, not false completion credit or a fresh-player teaching failure.

Concrete fix: migrate the Hinges resume position to `h1-checks` when obsolete `h1-0` exists and its replacement is unfinished; preserve other progress. Renaming the round alone does not override a completed later-session position.

**R4-2 — minor — FIXED on both devices.**

Where: http://localhost:3417/play/family, `f3-3`; `src/games/family/FamilyGame.tsx:302`. Restored stale sign-language data in both the pending card and saved chain now resolves against current cards. The written-language link succeeds after reload in both cases. Evidence: `qa/codex-review-r5/early-games/upgrade.json` and `phone/upgrade-pending.png`, `phone/upgrade-chain.png` beneath that folder, with desktop counterparts. No further fix required for the reported case.

**R4-3 — minor — FIXED on both devices.**

Where: http://localhost:3417/sources#w-PI; `src/app/sources/page.tsx:14`. The bibliography now names Parts I and II; the aspect-seeing card retains its Part II/PPF reference. Evidence: `qa/codex-review-r5/philosophy/phone-pi-bibliography.png` and desktop counterpart. No further fix required.

**R4-4 — minor — FIXED on both devices.**

Where: http://localhost:3417/sources; `src/app/sources/page.tsx:24`. All 28 Investigations entries follow section order: §§19–20 before §21, §§201–202 between §198 and §217, Part II last. Evidence: `qa/codex-review-r5/philosophy/live-sources.json` and both devices' `*-pi-19-order.png`, `*-pi-202-order.png`, `*-pi-part2-last.png`. No further fix required.

**Confirmation coverage**

- Played **all 111 rounds and 22 sessions per device**, selecting sessions through the navigation, trying wrong answers, reloading mid-round, and exercising expanded end cards/replay. Evidence: [early journeys](../qa/codex-review-r5/early-games/result.md), [late journeys](../qa/codex-review-r5/late-games/audit.md). No new major/blocker or recorded game runtime errors.
- Rechecked **45 quotations and all authored claims** against Ogden, Anscombe, and Paul & Anscombe; primary editions, scan exceptions, hashes and per-ID coverage are in the [philosophy audit](../qa/codex-review-r5/philosophy/audit.md). No material misquotation, misattribution or new over-claim found. Play concerns philosophical distinctions, with no English-proficiency objective. Limits and ladder remain chiefly explanatory; play completion does not establish retained learning.
- Inspected home, every game, end cards, Sources and empty/populated Notebook against `art/ui-v2/a.png`. Paper/navy/serif/vermilion styling persists on both devices; illustrations and desktop arrangements differ from the mock-up. No new major legibility, spacing, broken-area or hierarchy defect found.
- `python -B qa/codex-review-r5/root_audit.py`: all ten routes HTTP 200 on both devices; zero captured page errors, broken images, horizontal overflow or axe violations. `final_checks.py` confirmed 111 earned IDs, 22 Notebook entries and 45 source anchors per device. Evidence: `qa/codex-review-r5/root/audit.json`, `final-checks.json`, and inspected screenshots in `root/sheets/` and `root/final-sheets/`.

**Also done:** adjacent cross-tab reset and persisted shortcut-preference checks passed (`root_edges.py`, `root_touch.py`; evidence in `qa/codex-review-r5/root/edges.json` and `deep.json`). Test contexts were closed; undo the extra evidence by removing those QA artifacts. No application changes.

Not covered: physical devices; Safari/Firefox; screen-reader speech; full keyboard-only journeys; every answer, storage or network permutation; throttled performance; measured learning/retention; exhaustive contested scholarship or quotation licensing; deployment; build/test/typecheck/lint gates. No automated check validates the substantive correctness of `planning/codex-review-v2-r5.md`; the final integrity check covers only format, evidence presence and protected-file hashes.
