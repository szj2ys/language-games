# Critique of the Claude and Codex plans, by Copilot

Author: GitHub Copilot CLI 1.0.105, model claude-opus-5.5, 2026-10-31.
Order of work: `plan-copilot.md` was last written at 23:04:16 and its sha256 (`E39D8593…D717D`) was pinned at 23:08:03,
before I opened either plan; it is unchanged. I have not read `DECISIONS.md` or any other critique.
Checks: quotations against the German texts (Wittgenstein Project wikitext of PI and OC; Klement's TLP edition); Next.js
claims against the installed `node_modules/next`. Claude's plan has no numbered sections, so I cite its headings and
concept-table rows; Codex and I are cited by §.

## 1. plan-claude.md

### Three ideas worth borrowing

1. **The no-panel test** (Thesis): "can a learner who never reads the philosophy panel still win and still learn the
   English? If yes, the mechanic carries the idea." It is the cheapest check of B4, and someone who did not build the
   game can run it in minutes. Codex's equivalent needs five learners (§7).
2. **The Beetle reveal** (concept 4): "Twist reveal: the boxes held different things, some nothing — you still played
   perfectly." That stages PI §293 ("denn die Schachtel könnte auch leer sein"): the player's own perfect score shows
   that the beetle cancels out. My §1.7 has a "Look inside" button instead, a joke the player may never press.
3. **An ending instead of a loop** (Information architecture): "completing games climbs the ladder; final screen 'throw
   away the ladder' — no streaks" (TLP 6.54, "die Leiter wegwerfen"). It turns the brief's ban on engagement hooks into
   one screen of content. Present it as the Tractatus's image and pair it with the later version in PI §133: the
   discovery that lets one stop, "das Philosophieren abzubrechen, wann ich will".

### Three most serious flaws

1. **Slab! is A1 recognition against a clock** (concept 1): "Builder shouts (TTS) 'Slab!' → drag the right block to him
   within a timer". The player never produces English; the decision is which of four nouns (later a number and
   "there") was heard. That is below the brief's intermediate learner and B6's B1-B2, and the timer works against B11
   (keyboard, reduced motion) and WCAG 2.2.1 (Timing Adjustable). TTS voices vary by browser, and the text fallback
   (Tech) turns the game into a reading drill. Codex (§2A) and I (§1.1) both have the player give the orders.
2. **Its On Certainty game gets On Certainty wrong twice** (concept 5, Content model):
   - "doubt itself rests on what is beyond doubt" is credited to OC §115, but those words are §519 ("der Zweifel beruht
     nur auf dem, was außer Zweifel ist"); §115 says "Das Spiel des Zweifelns selbst setzt schon die Gewißheit voraus".
     B5 allows zero misattributions, and this one sits inside a v1 game.
   - `answer: 'cant'|'might'|'must'|'hinge'` fixes hinge status per statement, while OC §98 says the same proposition
     can be treated "einmal als von der Erfahrung zu prüfen, einmal als Regel der Prüfung". The answer key would score
     a misreading; Codex's Doubt Desk (§2F) gets this right.
   - The Thesis shows the same habit: "meaning is use (PI §43)" drops §43's "für eine große Klasse von Fällen … – wenn
     auch nicht für alle", and "*is* a theory of language learning" runs into §109: "wir dürfen keinerlei Theorie aufstellen".
3. **The content model cannot hold what the plan promises** (Content model, Failure modes): no round type has an `id`
   or a citation (only `ResemblanceSet` cards have ids). `why` exists only on `CertaintyItem`, yet Failure modes
   promises "every English answer has a gloss". `Citation.quote` is mandatory, so every PI citation needs a quotation
   from an in-copyright translation (Anscombe, Hacker & Schulte; see ACCEPTANCE §4). "~60 items total" across four games
   is ~15 per game against B7's ~20. B6's "why" and B8's "every round has a citation" have no field to attach to, and
   saved progress would key on array positions that shift whenever content is edited.

## 2. plan-codex.md

### Three ideas worth borrowing

1. **Repair is a learner move, and it is free** (§2C, §2A): the café teaches "clarification, pronoun reference, and
   repair: 'Do you mean…?', 'Which one?', 'Could you…?', 'I meant…'", and establishing the referent earns a mark.
   "Marks remain obtainable after repair; no penalty for questions"; "Record first-attempt success and hint use
   separately". In my Slab! only the assistant asks "Which slab?" (§1.1); the learner never practises asking.
2. **Transfer rounds as data** (§4 "Transfer" row and allocation table; §2C): "Paired round IDs, which wording or context
   changes, and what behaviour would demonstrate transfer rather than memorization", 6 of 18 rounds per game. Example:
   "In the paired transfer round, the window is shut and the visitor touches the mug; offer a fresh drink." It is the
   only plan with a testable defence against memorised answers.
3. **Every round states the limits of its analogy** (§4 "Philosophy" row; §2B; §9): "editorial paraphrase, and a note
   describing the analogy's limits", e.g. "a deliberately limited spatial analogy, not a complete account of the
   Tractatus"; explanations are "paraphrases, not quotations from an English translation". This answers B5 and Codex's
   own §8 risk ("'All meaning is use' … appears in feedback") in the data. Its TLP numbers (2.15, 2.182, 2.221–2.225,
   4.01) all check out against the text.

### Three most serious flaws

1. **Static export breaks how the app is run and secured** (§6 "Static delivery"): "Use static export … the default
   runtime image optimizer and request-dependent server features do not fit this choice." `next start` refuses an
   export (`"next start" does not work with "output: export" configuration`, `next/dist/server/next.js:260`), and Next's
   static-export guide lists Headers and default-loader Image Optimization as unsupported. That fails B3 (`next build &&
   next start`) and B13 (headers from `next.config`) as written, and takes B9's `next/image` off its default optimiser.
   Codex worked from BRIEF.md alone (§9), so this is a merge hazard rather than carelessness.
2. **English form can never go wrong, so it is never explained** (§1, §3, §4): "Model useful language rather than
   penalizing every deviation"; the Language field holds "grammatical combinations, … equivalent forms, clarification
   prompts, and consequences"; the authored feedback is hints, consequence summaries, session explanations and the
   explanation for "a failed precondition", none tied to an English form. Nothing says what happens to *two slab* or
   *the key is in box*. So the named targets "count nouns and plurals" (§2A) and "articles" (§2B) are never at stake,
   B6's "why … in English terms" has no home, and "four to six visible components" invites the "Guessing through
   components" risk that §8 itself lists.
3. **v1 trades the later core for the early view** (§3; §2B, §2D, §2E): Scene Machine ships; Family Resemblance Club
   and Rule Workshop wait. Codex flags the period difference (§1), but its own café cites PI §23, which sets the many
   uses of language against what logicians said about its structure, "(Und auch der Verfasser der Logisch-Philosophischen
   Abhandlung.)". So a third of v1 teaches a view that another v1 game's source corrects, spatial phrases are drilled
   twice (§2A "spatial phrases", §2B "Prepositions"), and rule-following, which the acceptance names, gets no play. The
   stated reason, "This risks becoming ordinary instruction practice" (§2E), indicts the parcel-routing mechanic, which
   never stages §185's deviant pupil; it is not a reason to drop rule-following.

## 3. Where my own plan was weaker

- **Bulk.** 1,366 lines, with eight concepts specified to round level (§1.1–§1.8) when three or four ship (§2.1). Codex
  makes its decisions in 277 lines. A builder has to dig mine out.
- **No transfer stage.** The round fields (§3.2) have `level` and `order` but no stage or paired-round link; context
  shifts exist only inside two games (§1.1 "Report or order?", §1.5 reverse rounds).
- **No pragmatics in v1.** §2.1 sends Would You Mind? to v1.1. Codex's café enacts PI §§21, 23 through action and is
  its first prototype.
- **Storage.** One `current` slot serves every game, and across tabs "the last write wins" (§5.6). Nothing protects a
  newer version's save: whatever the schema rejects is backed up and replaced. Codex: "Do not overwrite an unknown newer
  save", with snapshots scoped per game.
- **Casting.** §4.4 makes the assistant, who obeys an older male builder, "a young East Asian woman … The target
  learners are mostly Chinese". That ties the subordinate role to the audience's ethnicity and gender. Codex has the
  right rule: "Vary appearance without coding competence or temperament by identity."
- **Fun graded by the doer.** Gate G4 (§5.11) and the kill rule (§5.14) rest on my own "would I play a second session?".
  Claude's no-panel test can be run by someone else, and Codex's test (§7) by learners.
- **Pronunciation without sound.** Go On! teaches "-ed pronunciation (/t/, /d/, /ɪd/)" (§1.2, §3.5), yet the plan never
  mentions audio. Codex states and justifies its exclusion (§6, "No audio dependency").
- **Analytics on by default.** PostHog loads unless the user switches it off (§5.7); Codex keeps it off until opt-in.

## 4. Recommended merged v1

Four games, in this order. Each round carries Codex's analogy-limits note; about a quarter of each game's 20+ rounds
(B7) are transfer rounds; each game should pass Claude's no-panel test before it ships.

| # | Game (source) | What the player does: the idea, enacted | English target | From |
|---|---|---|---|---|
| 1 | **Slab!** (PI §§2, 8, 19–21) | Gives orders from word tiles to a literal assistant; an unpointed "that slab" gets "Which one?"; later the same "Five slabs" is an order or a report, depending on who says it (§21) | Imperatives, plural after numbers, *a/the*, *this/these*, place prepositions | Copilot §1.1; Codex §2A |
| 2 | **Go On!** (PI §§185, 198–202) | Teaches a pupil a form rule by choosing example cards; the pupil goes on in a deviant way that every card shown fits (§185) and reads a rule card its own way (§198) | *a/an* by sound, plural and *-ed* spelling, comparatives, uncountables | Copilot §1.2, minus "-ed sounds" until there is audio |
| 3 | **Family Likeness** (PI §§66–67, 71) | Claims "All games have a winner", sees which cards light up, meets the Objector's counterexample (§66), fixes the quantifier, then links the cards into a rope of overlapping fibres (§67) | Quantifiers, scope of negation, comparison, hedging | Copilot §1.3; Codex §2D |
| 4 | **Repair Café** (PI §§21, 23, 43) | Hears "It's a bit cold here", asks or acts, and repairs a wrong guess; the paired round reuses the words in a changed situation | Indirect requests, clarification, reference, repair phrases | Codex §2C; Copilot §1.5 |

If only three fit, drop Repair Café; Slab!'s "Report or order?" level keeps PI §21. For v1.1: Scene Machine (keep its
relation scoring), Beetle in a Box with Claude's reveal, Hinges with OC §98 built in, Aspect Flip, Logical Space.

## 5. The one decision I would fight for

**Learners can make the real B1 form errors, and every slip gets an honest answer.**

- The tray offers wrong forms beside right ones (*pillar/pillars, a/an, this/these, do/does*), as my §5.5 does: never a
  tray that can build only grammatical sentences, and never a bare ✗.
- If the slip changes what a hearer would do (*the slab* with two in view), the world shows it ("Which one?") and the
  player repairs it (Codex §1, §2A).
- If a real hearer would understand (*two pillar*), the partner acts on it with no faked breakdown, and one line says
  why: "After *two*, English needs the plural" (my §1.1 round example).
- Why this one: it is where the three plans disagree, and it decides B6 and whether the English is learned or merely
  clicked. A faked misunderstanding would also contradict the builders' game itself: PI §2 asks us to take four bare
  calls as a "vollständige primitive Sprache".
- Cost: a deterministic tile parser with slip detection over at most 12 tokens (my §5.5), spiked first on 20 fixture
  sentences that include slips (§5.11 M0).
