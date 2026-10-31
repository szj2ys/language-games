# Codex cross-critique

**Go: merge three games—Slab!, Repair Café, and Family Threads.** Claude has the clearest pitch; Copilot has the most concrete English coaching; my plan has the strongest repair and transfer requirements. None has demonstrated that its games are fun or teach anything yet.

Basis: [BRIEF](BRIEF.md), [Claude](plan-claude.md), [Codex](plan-codex.md), and [Copilot](plan-copilot.md), read on 2026-10-31. Copilot was being revised during review: sections 0–3 were available, including its corrected quantifier table; sections 4–5 were absent. Missing art and architecture sections are unknowns, not evidence of bad designs. Plan references name sections rather than unstable line numbers.

## 1. Claude: three ideas to borrow

1. **Make the mechanic carry the idea.** The thesis says the English skill must be what wins, and asks whether someone can play without reading the philosophy panel (Thesis). Keep that as a necessary design test. My longer specification obscured this simple promise; successful play still needs a changed-context check to demonstrate learning.

2. **Make family resemblance physically visible.** The chain from chess through football to ring-a-roses, with overlapping features rather than one continuous feature, gives PI §§66–67 a visible payoff (Game concepts, #2). Borrow the chain itself, then require comparison sentences to make the English indispensable. This deserves v1 more than another spatial-placement game.

3. **Give games different verbs and memorable reveals.** “Act fast / connect / flip / judge” is a better variety test than merely assigning different vocabulary (v1 scope). Duck–Rabbit's perceptual surprise and Beetle's irrelevant box contents offer moments players could remember (concepts #3–4). Borrow that appetite for surprise and distinct actions; a timer is not necessary to achieve it.

## Claude: three serious flaws

1. **The thesis overclaims the philosophy.** “Later philosophy *is* a theory of language learning” turns our educational adaptation into Wittgenstein's doctrine. Its unqualified “meaning is use” also loses §43's restriction. PI §109 explicitly rejects theory-building in these investigations. Rewrite the premise as games inspired by his investigations of language in practice. [Primary text: PI §§43, 109](https://www.wittgensteinproject.org/w/index.php/Philosophische_Untersuchungen).

2. **Must, Might, Can't teaches the wrong relationship between doubt and certainty.** Concept #5 makes doubting “I have two hands” a mistake; `CertaintyItem` makes `hinge` a fixed answer beside modal answers. That treats an inquiry's background as a fourth confidence setting. OC §§23–25 allow practical doubt about hands; §§96–99 allow propositions' roles to change. Drop this from v1. A future version must make the *activity* establish what stands fast, rather than reward choosing an allegedly unquestionable sentence. [Primary text: OC §§23–25, 96–99, 341–343](https://www.wittgensteinproject.org/w/index.php/%C3%9Cber_Gewi%C3%9Fheit).

3. **The proposed v1 still contains quizzes and lacks the specification needed to rescue them.** Duck–Rabbit asks players to “pick the paraphrase”; the certainty game asks for a slider answer (concepts #3, #5). Neither supplies a consequential goal beyond correctness. Slab! adds timed dragging, making a listening result depend on motor speed (#1). The approximately 60 items have no worked scored rounds or recovery rules (Content model), despite the brief requiring examples and scoring for each concept. Keep the concise pitch, but supply one complete action → consequence → repair → transfer round per game before commissioning content or art. The brief also asks for image prompts; an aesthetic and asset list alone do not provide them.

## 2. Copilot: three ideas to borrow

1. **Let communication work, then coach the form.** “Put two red pillar there” successfully builds the gate; the coach explains the missing plural (§1.1). This is the clearest English-teaching moment in any plan. Borrow the separation between achieving the task and improving the sentence. Do not make every correction reduce the learner's game reward.

2. **Turn family resemblance into several useful English actions.** Claim, Thread, and Edge combine counterexamples, comparison sentences, and boundaries for a particular purpose (§1.3). The two-player tournament makes a boundary useful without pretending it defines every game. Keep the explicit caveat “none of these features,” and borrow the revised true/false/open handling of uncertain features (§3.3).

3. **Reverse the teacher–learner roles.** Selecting “a unicorn” to expose the pupil's vowel-letter mistake is a real puzzle, with a visible causal result (§1.2). It is much more distinctive than my parcel-routing Rule Workshop. Borrow the teacher role and the choice of diagnostic examples; the philosophical explanation needs repair before this becomes a shipping game.

## Copilot: three serious flaws

1. **Family Likeness still confuses the displayed sample with the category.** Four selected cards support “Most of these six games have a winner,” not an unrestricted “Most games have a winner” (§1.3, round example). Yet the latter gets full marks. This directly undermines its promise to teach honest generalisation. The revised §3.3 table correctly separates literal `some` from `not all`; the earlier truth-table defect is no longer a finding. Finish the repair by making the domain explicit in every claim. Keep literal truth separate from conversational informativeness: “some but not all” is a contextual inference, not an invariant meaning of *some*. [Primary linguistic research](https://pmc.ncbi.nlm.nih.gov/articles/PMC2882503/).

2. **Go On! rigs the argument against explanation.** Its Explain card says “before a vowel,” leaves sound versus letter unresolved, and then credits examples “not a formula” for success (§1.2; §3.3 worked record). That is an unfair comparison between precise examples and an imprecise explanation. Eliminating a finite catalogue of programmed hypotheses also does not settle the philosophical rule-following problem. The anti-scepticism warning and later twist help, but cannot fix this mechanic by themselves. Allow “vowel sound,” demonstration, correction, and further practice; label the hypothesis catalogue as the toy model it is. [Primary text: PI §§198–202](https://www.wittgensteinproject.org/w/index.php/Philosophische_Untersuchungen).

3. **The scoring trusts the author's English judgments too readily.** In the backlog's Would You Mind?, “Can I send it on Monday?” damages the relationship while “I was wondering…” does not, with no contextual reason supplied (§1.5). This teaches a deference ladder instead of situated pragmatics. More broadly, §3.6 proposes ten sampled editorial reviews per game and a developer replay of every round, but no explicit unfamiliar-task test with target learners. Seventy-two rounds across eight morphology families and eight concepts (§3.5) multiply that editorial risk. Require visible reasons for reactions, accept reasonable alternatives, and test learner transfer before expanding volume. The missing sections prevent a responsible verdict on the advertised build-hour-7 gate.

## 3. Where my plan was weaker—and what I would change

1. **I was conservative in the wrong place.** I deferred Family Resemblance for content complexity (§2.D), while committing to a Café with at least 36 success-route and 18 repair walkthroughs (§4). Claude and Copilot show a bounded card-and-relation approach worth testing. Promote Family Threads; defer Scene Machine, whose prepositions and object manipulation overlap with Workshop (§§2.A–B).

2. **I specified semantic tolerance better than actual English instruction.** My Workshop rewards material, quantity, and destination (§2.A), but never shows what happens to a successful “two slab.” Copy Copilot's concise correction, then ask for the same construction in a new setting. Preserve success; record the form separately. Otherwise players can finish without improving the English the game claims to teach.

3. **I described pleasant simulations more convincingly than compelling puzzles.** “Tactile placement” and “small comic misunderstandings” (§§2.A, 2.C) are promises. Claude's flips and Copilot's diagnostic-card choice identify the actual surprise. My Café already changes intentions between rounds; add two visitors with visible, competing needs so one obvious fix cannot satisfy both. Give Family Threads a newcomer that disrupts the obvious chain. These are hypotheses to playtest. Optional economy challenges can reward an elegant solution, but clarification and necessary repair must remain free.

4. **My document makes the important choices harder to find.** It spends 277 lines on a three-game proposal, versus Claude's 65. Section 7 already puts learner tests before production, so the problem is presentation, not a missing gate: 54 rounds and 21 image outputs (§§4–5) overshadow the unsettled game choices. Lead with three worked rounds and the evidence that would change the shortlist; compress the production detail. Copilot's compact correction example is more decision-useful than another page of my infrastructure prose.

## 4. Recommended merged v1: exactly three games

| Game | Play, English, and philosophical distinction | What earns its place |
|---|---|---|
| **Slab! / Builder's Workshop** | Alternate delivering and directing a build; compose quantities, plurals, referents, and destinations. The identical “Five slabs” becomes an order or stock report in a visibly different activity (PI §§2, 8, 20–21). | Codex's repair paths plus Copilot's role variant and form coaching. Complete the build without a timer; accept short calls when the practice makes them sufficient. |
| **Repair Café** | Resolve needs through clues, clarification, and action. “It's cold” concerns the room in one scene and the drink in another; different supported routes succeed (PI §§23, 43). | The strongest everyday pragmatics and comic consequences. No relationship meter that silently rewards the author's favourite wording. |
| **Family Threads** | Connect six cards with “both,” “unlike,” or “although”; incorporate a surprising newcomer, then test claims about **these** cards (PI §§66–71). | Claude's visible chain plus Copilot's counterexamples and purpose-dependent boundary. Reward supported links and revisions; do not demand a universal definition. |

Use one shared session shell, with three different activities: build, negotiate, connect. Prototype one guided/transfer pair per game before setting the shipping content count. Retain Codex's unfamiliar-situation learner checks; test interpretations through actions before the debrief.

Defer Scene Machine/Logical Space and a repaired Go On!; drop hinges, beetles, and ambiguity quizzes from this release. Early Wittgenstein can wait: the brief requires cited philosophy, not coverage of every period. Three good games beat four partly justified ones.

**The one decision I would fight for: score the supported communicative outcome; coach English form separately.** A workable “two red pillar” builds the gate and receives a correction. A reasonable clarification costs nothing. A less informative but true claim is not false. This is the common constraint that protects the philosophy, the English, and the freedom to play.

## Evidence and limits

The comparisons above are close-reading judgments, checked against the named plan sections and linked primary sources. A second reader challenged the analysis; no learner study or implementation acceptance is claimed. Copilot's corrected table was checked again before writing, so this critique does not preserve the superseded quantifier bug as an accusation.

Required wiki check: [Jackson wiki index, AI tools entries](C:/Users/Administrator/Documents/projects/LLMwiki/index.md) lists `Cursor/PROPOSAL`, `Codex/PROPOSAL`, and `Codex-Multi-Agent-Handoff-Proposal`; those pages are listed in the wiki index but not on this machine. Their summaries concern agent coordination and supply no evidence about these games.

**Also done:** distinguished the live correction from the remaining sample-scope defect, and specified transfer checks for the merged shortlist. Undo: remove those passages from this critique; no source plan was edited.

**Not covered:** actual enjoyment, durable English learning, accessibility in use, delivery estimates, and Copilot sections 4–5. These require evidence beyond the documents available here.
