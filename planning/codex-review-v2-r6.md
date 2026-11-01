VERDICT: SATISFIED

**R4-1 — FIXED on both devices.** Re-ran R5's `migration_followup.py` journey using the same genuine round-3 saves, at **390×844 phone/touch** and **1440×900 desktop**, against http://localhost:3417 (HEAD `6be9117`). Home → Continue now opens **Doubt it / h1-checks**, with the bakery-check controls available, instead of **Done · The river-bed**. Saved position becomes `{session: 0, round: 0}`; unrelated progress and settings survive. Evidence: [phone](../qa/codex-review-r6/phone/continue-to-doubt-it.png), [desktop](../qa/codex-review-r6/desktop/continue-to-doubt-it.png), [recorded states](../qa/codex-review-r6/results.json).

**End-card regression: passed.** Actually played both sessions in fresh contexts on each device. Completing **Doubt it** with the later session unplayed, or **The river-bed** with the earlier session unplayed, retains its end card and allows expanding its passages. Evidence: `qa/codex-review-r6/{phone,desktop}/fresh-{first,later}-end-retained.png`. Inspected all 20 captured screenshots.

**New major/blocker findings: none in this scoped pass.** `python -B qa/codex-review-r6/verify.py` passed all six device/scenario journeys; zero captured runtime/console errors, broken images or horizontal overflow. Servers were untouched; [hash comparison](../qa/codex-review-r6/integrity.json) confirms no changes under `src/`, `public/`, `e2e/` or `art/`.

**Also done:** obsolete-draft rejection, replacement completion persistence, reload routing to unfinished work, and fully completed end-card retention passed. Isolated browser contexts were closed; undo extra evidence by removing `qa/codex-review-r6/`.

Not covered: full-site regression, physical devices, Safari/Firefox, accessibility audit, build/test/typecheck/lint gates, deployment, or every saved-state permutation. No automatic check validates the conclusions of `planning/codex-review-v2-r6.md`; its format and evidence links were checked only.
