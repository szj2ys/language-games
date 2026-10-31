# Language Games — independent Codex plan

## Decision

**Go: build three small, authored simulations, with Repair Café as the first feasibility test.** The decisive risk is producing English quizzes decorated with Wittgenstein. A correct answer must change a shared situation: a partner brings something, a scene becomes describable, or a misunderstanding is repaired. Philosophy should explain something the player has already experienced.

The attainable v1 is a polished collection for intermediate English learners, approximately B1–B2, with three distinct games, 54 authored rounds, and sessions lasting two to four minutes. It should demonstrate transfer to unfamiliar situations, not claim to certify English proficiency or mastery of Wittgenstein.

This document is a proposal, not an implementation. It was developed from `planning/BRIEF.md`, primary philosophical texts, and official framework documentation. No other `plan-*.md` was consulted. All game situations, dialogue, scoring, budgets, and acceptance thresholds below are original design proposals.

## 1. Product and learning contract

Working title: **Words at Work**. The promise: **“Make things happen with English.”**

The core loop is: **see a situation → act with English → observe the consequence → repair or try another approach → play a changed situation.** After a three-round session, an optional short explanation connects the experience to a cited passage. No preliminary philosophy lesson, definition recall, or multiple-choice philosophy test.

- Every round has one practical goal, one primary English target, and one philosophical contrast. If a round can be solved equally well after removing its English, redesign it.
- Text is English only, including help, errors, accessibility labels, and source commentary. Use short sentences, visual demonstrations, and optional plain-English word explanations. Do not assume all Chinese-speaking learners have the same difficulties.
- Model useful language rather than penalizing every deviation from one preferred sentence. V1 uses authored phrase components and object actions; it does not grade unrestricted writing or speech.
- Experimentation is safe: unlimited undo, restart, and clarification. No lives, countdowns, daily obligations, leaderboards, random rewards, or locked progression.
- Explain the historical distinction: the Tractatus game explores an early representational model; the other v1 games investigate uses of language in activities. Do not present them as one timeless doctrine.

## 2. Six game concepts

### A. Builder's Workshop — v1

**Idea and passage.** Commands acquire their role within a coordinated activity; expanded combinations change what the partner does. Source: *Philosophical Investigations* (PI), §§2, 8, 20. [Primary text](https://wittgensteinproject.org/w/index.php/Philosophische_Untersuchungen).

**English.** Imperatives, count nouns and plurals, quantities, demonstratives, and spatial phrases. Begin with block, pillar, slab, and beam; later transfer the construction to everyday objects.

**Mechanic.** First play the assistant delivering materials. Then switch roles: only the player sees the building goal and must direct an animated partner using movable phrase components and pointing. The partner can act, request clarification, or deliver the wrong thing when the instruction genuinely licenses it. Every ambiguous instruction has a visible basis for ambiguity.

**One round.** Two pillars support an unfinished roof. The player assembles “Bring two slabs to the platform.” The partner carries two slabs to the marked area. “Bring that slab” without selecting a referent prompts “Which one?” The player points and repairs the instruction; the roof can now be completed.

**Why it is fun.** Cooperative toy construction, tactile placement, and understandable physical consequences. Role reversal makes familiar vocabulary newly demanding. A new context can give the same short call a different job.

**Scoring.** One completion mark each for the required material, quantity, and destination, maximum three per round. Marks remain obtainable after repair; no penalty for questions. Record first-attempt success and hint use separately for learning feedback. Accept a short call when the demonstrated practice makes it sufficient: brevity is not bad English.

### B. Scene Machine — v1

**Idea and passage.** A representation can describe a possible arrangement yet disagree with actuality. The relevant relation is structural, not necessarily visual resemblance. Source: *Tractatus Logico-Philosophicus*, propositions 2.1, 2.15, 2.182, 2.221–2.225, and 4.01. [Primary text](https://www.wittgensteinproject.org/w/index.php/Tractatus_Logico-Philosophicus_%28English%29). Tractatus references are proposition numbers, rather than PI-style section numbers.

**English.** Prepositions, relational descriptions, articles, negation, and simple conjunctions.

**Mechanic.** Build a miniature stage from a message, then open a shutter to reveal the actual reference scene. Adjust the report or the model according to the round's explicit task. Later reverse the direction: compose a description that lets a partner reconstruct the scene. A finite set of named positions makes touch interaction precise.

**One round.** The message says “The cup is to the left of the box. The key is inside the box. The lamp is behind the cup.” The player builds that possible scene. The shutter reveals the key beside the box instead; the other two relations match. The player changes “inside” to “beside”; all three clauses now fit. The original report was understandable even though one clause was false of the revealed scene.

**Why it is fun.** A miniature theatre with a reveal, reversible experiments, and several valid solutions. Moving one object can satisfy one relation while breaking another.

**Scoring.** One mark per authored relation satisfied, three per round. Compare logical relations, not screenshot coordinates; all layouts satisfying the description count. In report rounds, marks attach to true clauses about the revealed scene. Unmentioned properties do not affect scoring. This is a deliberately limited spatial analogy, not a complete account of the Tractatus.

### C. Repair Café — v1 and first prototype

**Idea and passage.** Utterances have varied uses; meaning-as-use is qualified, not a universal slogan. Source: PI §§23, 43. [Primary text](https://wittgensteinproject.org/w/index.php/Philosophische_Untersuchungen).

**English.** Requests, indirect requests, clarification, pronoun reference, and repair: “Do you mean…?”, “Which one?”, “Could you…?”, “I meant…”. No universal ranking of politeness.

**Mechanic.** Work in a café where people coordinate small tasks. Compose questions or responses from phrase components, inspect visible clues, and manipulate objects. Each utterance changes the information available or the world. Multiple conversational routes can reach agreement. Characters have authored states, not runtime AI personalities.

**One round.** A visitor beside a window says “It's a bit cold here.” A drink and an open window are both visible. Ask “Do you mean your drink or the room?” The visitor indicates the room; close the window and receive confirmation. In the paired transfer round, the window is shut and the visitor touches the mug; offer a fresh drink. Direct action can also succeed where the clues make it reasonable. Asking is always allowed.

**Why it is fun.** Small comic misunderstandings, recurring characters, and discovery through conversation. The same words cause different practical responses as the situation changes. The player can repair a bad guess instead of being expelled from the scene.

**Scoring.** Three marks: establish the relevant referent or need, carry out an appropriate action, and confirm the agreed result. Confirmation can be supplied by a visible character response; do not force an unnecessary question. Several phrase forms and action sequences earn full credit. A failed guess produces a consequence and a repair opportunity, not a red “wrong English” label.

### D. Family Resemblance Club — later

**Idea and passage.** Related uses can form overlapping similarities without a single shared essence. Source: PI §§66–71. [Primary text](https://wittgensteinproject.org/w/index.php/Philosophische_Untersuchungen).

**English.** Comparatives, similarity and contrast, relative clauses, “both,” “unlike,” and “although.”

**Mechanic.** Build a network of activities for a community club. Link cards by observable similarities using short English constructions. New arrivals challenge the current arrangement, so players revise connections rather than guess a secret definition.

**One round.** Connect chess and tennis with “Both have opponents.” Solitaire arrives: connect it to chess through rules, then a child's solo ball play to tennis through equipment. The resulting chain works even though the first connection does not apply to every activity.

**Why it is fun.** A growing visual network, surprising bridges, and freedom to find different routes.

**Scoring.** Award one point per distinct supported connection and a two-point completion bonus for incorporating a counterexample by revising the network. Count each link once. Score evidence for the selected relation, never conformity to an essential definition of “game.” Authored relation labels bound the evaluator; the debrief admits the simulation's limited vocabulary.

**Why later.** Its language composition and non-exclusive categories need more content testing; a sortable card quiz would miss the idea.

### E. The Rule Workshop — later

**Idea and passage.** Applying a rule involves an established practice, not interpretations alone. Source: PI §§198–202. [Primary text](https://wittgensteinproject.org/w/index.php/Philosophische_Untersuchungen).

**English.** Conditionals, sequencing, “unless,” “except,” and clarification of instructions.

**Mechanic.** Join a parcel-routing team. Watch demonstrations, operate the shared workflow, and ask for another example when the instruction is unclear. Apply the practice to new cases; feedback comes from what the team actually does with the parcel.

**One round.** The demonstrated convention is “Send fragile parcels to the padded shelf unless they are marked urgent.” Route an urgent glass parcel to the staffed counter, then instruct a new colleague using the same convention in a changed layout.

**Why it is fun.** A cooperative logistics puzzle with visible downstream effects, rather than an arbitrary next-number riddle.

**Scoring.** One point per correctly routed parcel, plus one for successfully directing the colleague in a new case. Demonstrations and clarification cost nothing. Never conclude that any action can count as following the rule.

**Why later.** This risks becoming ordinary instruction practice. It needs a stronger playtest showing why the established practice matters before it deserves production.

### F. The Doubt Desk — later

**Idea and passage.** Inquiry depends on things standing fast; what functions as a background can change. Source: *On Certainty*, §§96–99, 341–343. [Primary text](https://www.wittgensteinproject.org/w/index.php/%C3%9Cber_Gewi%C3%9Fheit).

**English.** Evidence statements, “might,” “must,” “I know,” “I suspect,” and giving reasons.

**Mechanic.** Investigate a misplaced parcel using a small evidence board. Players can question evidence and reveal what each check relies on. Removing all background support makes particular checks unavailable; restoring a workable investigative context permits progress.

**One round.** Compare two parcel weights using an established reference scale. When a later scenario concerns the scale itself, the earlier reference becomes the object of investigation and a different reference is needed. Compose “The parcel might be heavier; first we need to check the scale.” This illustrates changing roles, not a claim that a weighing scale is Wittgenstein's canonical hinge.

**Why it is fun.** Detective work and a visible dependency puzzle in which indiscriminate doubt changes what can be done.

**Scoring.** One point each for an evidence-supported finding, an appropriately qualified report, and a workable next check. Do not award “absolute truth” points or reward unquestioning acceptance.

**Why later.** Highest interpretive risk. An expert must review whether the mechanics illuminate the passage rather than reduce it to ordinary measurement reliability.

## 3. V1 scope, flow, and screens

Ship **Builder's Workshop, Scene Machine, and Repair Café**. They train complementary skills: directing action, describing relations, and coordinating through misunderstanding. Three is enough to create contrast while keeping content and interaction review manageable. Family Resemblance Club is the first expansion candidate; no fourth game until the three pass the learning and usability gates.

Default path: **home → Builder's Workshop demonstration → three playable rounds → session result → suggested next game**. Experienced or returning users can choose any game immediately. Start the first demonstration in one click; no placement questionnaire or account.

| Route / screen | Purpose and essential UI |
|---|---|
| `/` | One primary “Start playing” button; returning “Continue”; three game cards with a plain-English skill and session duration. Small links to notebook and sources. |
| `/play/[game]` | Static route for each game. Scene, short goal, phrase/action tray, undo, hint, and exit. Demonstration is an interactive state here, not another onboarding page. |
| Round consequence | In-place state change, brief consequence text, and a repair or continue action. No score modal after every click. |
| Session result | Three-round results, one example of language the player used, and an optional philosophy explanation of at most 60 words with its exact reference. “Try a new situation,” “Choose a game,” and “Finish” are equally available. |
| `/notebook` | Locally saved completed situations, constructions practised, first-attempt versus assisted completion, and replay links. No daily calendar or streak. |
| `/sources` | English descriptions of the passages, distinctions between early and later work, original-text links, and a clear label for our adaptations. |
| `/settings` | Reduced motion, progress reset with confirmation, and plain-language privacy/storage information. Analytics choice appears only if analytics is configured. |

On phones, place the scene above the controls; on desktop, use scene and action panel side by side. Limit choices to four to six visible components at a time, with categories where necessary. All interactions support tap-to-select followed by tap-to-place, and keyboard equivalents. Dragging is optional. Use visible focus, announced consequence text, generous touch targets, and text or shape cues alongside colour. Every scene has a structured text equivalent that supports the same task without revealing hidden facts.

## 4. Content model and production volume

### Data contract, without implementation code

Author rounds as versioned local data. Validate it during the build. Use one shared envelope and three explicit game variants; do not invent a general scripting language.

| Field group | Required information and constraints |
|---|---|
| Identity | Stable round ID, content version, game ID, session ID, order, title, and guided/practice/transfer stage. IDs remain stable when wording changes. |
| Learning | Primary English construction, supporting vocabulary, approximate difficulty, and one observable transfer objective. |
| Philosophy | Work, exact section/proposition numbers, primary-source URL, editorial paraphrase, and a note describing the analogy's limits. |
| Presentation | Short goal, initial scene description, asset IDs, accessible object names, positions, and visibility rules. All player-facing strings are English. |
| World | Entities with stable IDs and discrete properties; initial state; what the player and character each know; which facts are revealed by which actions. |
| Language | Phrase components, grammatical combinations, semantic action ID and slots, equivalent forms, clarification prompts, and consequences. Do not compare full strings for success. |
| Actions | Allowed actions for this game; preconditions; deterministic state effects; resulting character line and scene change. A failed precondition has an authored explanation. |
| Goals and scoring | Three explicit completion predicates, accepted alternative routes, and separate first-attempt/hint metadata. Each mark is awarded at most once. |
| Recovery | Undoable actions, hint sequence, restart state, and an exit path from every reachable nonterminal state. |
| Transfer | Paired round IDs, which wording or context changes, and what behaviour would demonstrate transfer rather than memorization. |
| Editorial evidence | Review status, reviewer notes, accepted-route walkthroughs, and misconception checks. These are development data, not game UI. |

| Variant | Additional authored data |
|---|---|
| Workshop | Inventory, requested materials, quantity, destination, pointing targets, role assignment, and partner instruction mapping. |
| Scene Machine | Named positions, allowed relations, reference scene, editable model/report, pronoun referents, and relation predicates. Fix left/right to the viewer's perspective; define inside/behind explicitly in both layout and accessible scene text. |
| Repair Café | Character goal, available clues, dialogue states, information revealed, supported requests, alternative repairs, and confirmation states. |

**Worked record in prose:** `workshop-practice-04`, content version 1, is a directing round. Goal: finish the roof. Initial inventory includes three slabs and two pillars; the roof platform is empty. The language target is quantity plus destination. “Bring two slabs to the platform” maps to the deliver action with material slab, count two, and destination platform. Three predicates inspect delivered material, delivered count, and destination. An unpointed “that” triggers a referent question with no delivery and no score loss. Undo restores inventory and destination consistently. The paired transfer round replaces the building materials with café cups and a tray. The source record points to PI §§8, 20. Review must cover both a complete command and a clarified short command.

### How much content

**54 rounds total: 18 per game.** Each game has six three-round sessions: one guided session, three practice sessions, and two transfer sessions. At roughly 40–70 seconds per round plus feedback, a session takes two to four minutes. Total first-pass play is roughly 36–72 minutes; this is a design estimate to test.

| Per-game allocation | Workshop | Scene Machine | Repair Café |
|---|---|---|---|
| 3 guided rounds | Demonstrated delivery and role reversal | Build a relation, then reveal a mismatch | Observe a misunderstanding and repair it |
| 9 practice rounds | Quantity, referent, destination; three each | Spatial relations, negation, conjunction; three each | Referents, requests, clarification; three each |
| 6 transfer rounds | Two new object sets and changed roles | New layouts and report/model direction | Same expression in changed circumstances |

Budget for 18 short session explanations, 54 consequence summaries, and at least two hints per round. Each café round needs at least two viable success routes and one recoverable misunderstanding: at least 36 success-route walkthroughs and 18 repair walkthroughs across that game. Workshop and scene content also require alternate valid-route examples where applicable.

Introduce approximately 30 useful words and 12 reusable constructions across the collection, intentionally repeated in different situations. These are content budgeting targets, not vocabulary-acquisition claims. Variants must change the language decision; palette swaps do not count as new rounds.

Content workflow: write a playable paper round → check the English and cited claim → enumerate accepted routes → test with a learner → encode the approved data → run reachability and scoring checks. Human editorial review precedes bulk asset production.

## 5. Art direction and gpt-image-2 image briefs

**Direction: an adult paper theatre.** Warm ivory paper, charcoal outlines, muted cobalt, terracotta, and sage; crisp silhouettes, restrained print texture, subtle dimensionality. Friendly and curious, without school worksheets, philosopher caricatures, or infantilizing reward graphics. Characters look like adult collaborators. Humour comes from their situations.

Generate with **gpt-image-2 during production**, not at runtime. No images are generated as part of this planning task. Obtain one approved reference first, then reuse it for visual consistency. Generate backgrounds separately from interactive objects so imagery never determines hit targets, text, quantities, or scoring.

**Shared prompt prefix:** “Create art for Words at Work, a thoughtful English-learning game for adults. Hand-cut paper theatre with subtle screen-print grain, warm ivory #F5F0E6, charcoal #252A2D, cobalt #42649A, terracotta #B96048 and sage #788A6B. Crisp, distinct silhouettes, consistent soft light from upper left, calm composition, contemporary everyday setting. No text, letters, numbers, logos, interface elements, watermarks, or embedded labels. Preserve object identity and natural proportions.”

Append each brief below to that prefix. Dimensions describe intended output/crop targets; inspect the available generator output and export appropriately during implementation.

| Image IDs and count | Target | Prompt suffix |
|---|---|---|
| `style-reference`, 1 nonshipping image | Landscape reference | “A small workshop, a tabletop theatre, and a neighbourhood café as three coordinated miniature sets; four adult collaborators and a few simple props; demonstrate one coherent material, palette and lighting treatment. A visual art-direction reference, not a user interface.” |
| `home-theatre`, 1 | 1600×900, with a usable central square crop | “Three connected miniature rooms: workshop left, tabletop stage centre, café right. Clear central focal point, open upper area for separately rendered heading. Inviting but quiet; no indispensable detail near the edges.” |
| `workshop-backdrop`, 1 | 1200×900 | “An empty workshop bench with separate left supply area and right construction platform. Front three-quarter view. Large uncluttered centre. No loose blocks, tools, characters or writing.” |
| `scene-backdrop`, 1 | 1200×900 | “An empty tabletop theatre with a plain wall and pale floor, shallow orthographic perspective, ample separation for movable objects. A simple open stage; no props or characters.” |
| `cafe-backdrop`, 1 | 1200×900 | “A small neighbourhood café counter, plain wall and neutral window opening; room for independently composited window panels, mugs and people. No printed menus, loose props or characters; strong separation between foreground counter and background.” |
| `builder`, `assistant`, `host`, `visitor`, 4 separate images | 768×1024, transparent background | “One full-body adult [character], relaxed attentive expression, simple readable hands, neutral three-quarter stance facing inward, no carried objects, no scenery, transparent background.” Character substitutions: builder in cobalt work jacket; assistant in sage apron; host in terracotta apron; visitor in charcoal cardigan. Vary appearance without coding competence or temperament by identity. |
| `block`, `pillar`, `slab`, `beam`, 4 separate images | 512×512, transparent background | “One isolated [object] made of pale stone; toy-theatre scale; transparent background; clearly different silhouette from the other building materials; no markings.” Substitutions: compact cubic block; tall cylindrical pillar; broad thin square slab; long narrow rectangular beam. |
| `cup`, `key`, `box`, `lamp`, 4 separate images | 512×512, transparent background | “One isolated [object], matching the paper-theatre props, front three-quarter view, transparent background, entire silhouette visible.” Substitutions: small cobalt cup; charcoal key with a large round bow; open sage box with clearly visible interior; terracotta desk lamp. |
| `mug`, `glass`, `menu`, `tray`, 4 separate images | 512×512, transparent background | “One isolated [object] for the café set, matching the same perspective and lighting, transparent background.” Substitutions: broad sage mug with one handle; clear drinking glass with a strong charcoal outline; closed ivory menu booklet with a blank cover; shallow terracotta serving tray. |

**Inventory: 21 image briefs/outputs, including one reference and 20 shipping assets.** Each named character or prop is a separate generation/output, not a sprite sheet requiring unreliable automatic slicing. Reuse props across rounds; colour and size changes are never the sole distinction needed to solve a task.

Produce hover, selected, and confirmation states in the interface, not additional generated pictures. Use CSS transforms for subtle movement; reduced motion removes it. Add all readable language as HTML. Export compressed backgrounds and transparent prop assets with fixed layout dimensions; inspect edges on both ivory and dark backgrounds. Initial art budget: at most 350 KB for the current backdrop and 1 MB total imagery needed by the first playable screen. Defer unrelated scenes. If a generation cannot communicate “inside” or “behind” clearly, correct the composition or use a simpler object representation before shipping.

## 6. Technical architecture

- **Stack:** Next.js App Router, TypeScript, Tailwind, and selected shadcn/ui primitives. Use the current mutually compatible stable versions at implementation time and commit a lockfile. No additional game engine, global state framework, database, login, or runtime model API is justified by this scope. Follow the official [shadcn/ui Next.js setup](https://ui.shadcn.com/docs/installation/next).
- **Static delivery:** Pre-render home, sources, notebook shell, settings shell, and the three known game routes. Use static export and enumerate game parameters at build time. Export optimized image files ahead of time; the default runtime image optimizer and request-dependent server features do not fit this choice. Direct links must resolve on the eventual static host. [Next.js static export guidance](https://nextjs.org/docs/app/guides/static-exports).
- **Client boundary:** Keep interactive game state and persistence in client components; browser storage is accessed only after browser initialization. Build-time content and page chrome need no interactive state. [Next.js server/client component guidance](https://nextjs.org/docs/app/getting-started/server-and-client-components).
- **Game structure:** One shared session shell, phrase composer, consequence panel, and progress adapter; three small game-specific transition functions and renderers. Each action deterministically transforms world state, then evaluates completion predicates. Keep semantic evaluation independent of animation and image coordinates. Use ordinary React state/reducers; transitions are not timed by animation completion.
- **Content boundaries:** Separate game definitions, round data, source registry, asset registry, and save format. Author IDs reference registries; validation rejects dangling IDs, missing citations, duplicate IDs, unhandled actions, and rounds without reachable completion. Do not make the browser execute strings from content.
- **Persistence:** A versioned localStorage record contains completed round IDs, per-predicate completion, assistance metadata, last game/session, settings, and a resumable round snapshot with content version. Save after committed actions. Undo and reload must not duplicate marks. Keep progress bounded; no permanent raw interaction log. If a content revision invalidates a snapshot, preserve compatible completion and restart that round with an explanation.
- **Storage failure:** Catch unavailable storage, invalid JSON, quota errors, and unsupported save versions. Continue in memory with “Progress cannot be saved in this browser.” Do not overwrite an unknown newer save. A corrupt save should offer a deliberate reset rather than crash. Across tabs, merge completed IDs and keep active-round snapshots scoped per game; do not let an older tab erase newer completion. Explain that private browsing or cleared site data can remove progress and that there is no cross-device sync.
- **Privacy and analytics:** Default analytics off. If the owner later enables PostHog through public project configuration and the player opts in, initialize its browser SDK and send only explicit, limited learning/usability events: round completed, repair used, hint used, or a recoverable technical failure, with round/version IDs. Disable autocapture and session replay; never send phrase contents, a notebook, or full saved state. No key, opt-out, or blocked provider means zero analytics requests and fully working games. Use [PostHog's Next.js integration documentation](https://posthog.com/docs/libraries/next-js) for implementation; analytics are not required to evaluate the paper prototype.
- **No audio dependency:** V1 makes no pronunciation claim and requires neither microphone access nor browser speech recognition. Reading, composition and pragmatics are the promised skills. Listening or pronunciation would need a separate content and assessment design.
- **Offline scope:** Once a game and its assets are loaded, its round logic needs no network. Do not promise offline reopening or installability; a service worker is outside v1.

Suggested module boundaries for later implementation are `app`, `components/game-shell`, `games/workshop`, `games/scene-machine`, `games/repair-cafe`, `content`, and `lib/progress`. These are proposed boundaries only; this task creates no application files.

## 7. Build sequence, tests, and failure gates

### First and cheapest falsification test

Before implementation or art spending, run three paper Repair Café rounds with five intermediate learners. Give only the proposed English instructions and let a facilitator enact the authored character responses without coaching. If success depends on guessing the author's favourite sentence, or on reading the philosophy explanation first, revise the mechanic before building anything else. This test is proposed, not performed.

Then test one paper round each from Workshop and Scene Machine. The minimum gates are:

- At least four of five learners begin a meaningful action within 30 seconds without translation or coaching.
- At least four of five complete the paired changed-context task without copying the previous solution. They can show the distinction through action; sophisticated philosophical vocabulary is not required.
- Scene Machine players can handle an understandable but false report, and Café players can respond differently to identical words in changed circumstances before seeing the explanation.
- At least three of five say they would choose another situation when stopping has no penalty. Treat this as formative feedback, not an engagement target or proof of fun for a population.
- Two content reviewers, covering English pedagogy and Wittgenstein respectively, can explain the intended lesson and find no reasonable supported route incorrectly rejected. Reviewers' roles are requirements, not people already recruited.

### Implementation order after approval of the concept

1. Build a plain interactive slice of Repair Café: three rounds, full repair paths, tap/keyboard controls, and local save/reload. Verify its semantics before adding illustration.
2. Add Workshop and Scene Machine through the same session shell. Validate that distinct mechanics fit without forcing one abstract engine onto all three.
3. Author the remaining rounds in small batches, with accepted-path walkthroughs. Run learner checks on a new transfer situation before expanding each batch.
4. Generate and integrate art, then finish accessibility, persistence recovery, sources, and optional analytics configuration.
5. Test the production static output on phone and desktop. Publishing or deployment is a later owner decision, not part of this planning task.

### Required evidence for a future release

| Area | Real check and success condition |
|---|---|
| Content and scoring | Validate all 54 records; execute every authored success and repair path; check reachability, equivalent utterances, valid alternative layouts, and score idempotence. |
| Actual play | Complete one three-round session per game from the production output using touch, then keyboard; goals and reactions remain legible without developer knowledge. |
| Learning | Repeat the small formative learner test using unfamiliar transfer rounds. Record observed actions separately from opinions and explanation recall. A small sample does not establish long-term efficacy. |
| Persistence | Reload mid-round, close/reopen, switch tabs, and reset. Simulate corrupt, blocked, full, old-version and newer-version storage; there is no crash or silent loss of compatible completion. |
| Accessibility | Check 360-pixel phone width, 200% zoom, keyboard focus, a screen reader, reduced motion, and non-colour cues. Complete the same goals without dragging or relying on decorative art. |
| Delivery | Serve the exported production build and open every route directly, including invalid game URLs. No development server behaviour substitutes for static-host verification. |
| Performance | On a representative midrange phone with throttled network, target first playable interaction within 3 seconds and immediate action feedback within 100 ms; record device and conditions. Asset budgets are hypotheses until measured. |
| Analytics | Inspect actual network requests with configuration absent, opt-out, and opt-in. First two produce no PostHog calls; opt-in sends only approved explicit events. |
| Editorial accuracy | Confirm each published explanation against its cited passage, distinguish analogy from textual claim, and verify the chosen translation before adding any direct quotations. |

## 8. Risks and conditions that would make this fail

| Failure | Early signal | Response |
|---|---|---|
| Disguised quizzes | The player selects a sentence and receives correctness feedback without any useful world change. | Require action consequences and a repair path; cut rounds whose English is ornamental. |
| Learning exists only in the debrief | Players repeat the same mistake in the changed situation until the explanation tells them what to do. | Redesign the contrast and transfer round; do not lengthen the lecture. |
| Misleading philosophy | “All meaning is use,” “false means meaningless,” or “anything follows a rule” appears in feedback. | Keep interpretations qualified; enforce passage review and remove overclaims. |
| Arbitrary pragmatics | A sensible request fails because the author secretly preferred another wording. | Add the valid route, supply missing context, or narrow the task honestly. Never use nationality as an intention shortcut. |
| Guessing through components | Learners succeed by trying every highlighted phrase without understanding its effect. | Use visible consequences and novel transfer tasks; remove answer-revealing highlights after guidance. |
| Difficulty mismatch | Beginners cannot parse instructions or intermediate learners face only noun matching. | Test B1–B2 readers; simplify instructions while increasing contextual decisions and role reversals. |
| Content dominates cost | Every new round requires new mechanics, art, or a large bespoke dialogue tree. | Reuse the three bounded systems and assets; prefer fewer distinctive contexts to superficial variants. |
| Art undermines play | Objects overlap, gestures reveal answers, or “inside” is visually ambiguous. | Make state explicit in layout and accessible descriptions; revise art before expanding it. |
| Local progress feels unreliable | Refresh loses a round, updates erase completion, or another tab overwrites progress. | Treat recovery and cross-tab behaviour as release requirements, not later polish. |
| Scope drifts into a platform | Accounts, AI conversation, pronunciation scoring, and social features displace good rounds. | Keep them outside v1; do not weaken the three-game evidence gates to fund breadth. |

## 9. Evidence and boundaries of this plan

Read and used: `planning/BRIEF.md`; the linked primary texts of *Philosophical Investigations*, *Tractatus*, and *On Certainty*; and the linked official Next.js, shadcn/ui, and PostHog documentation. Philosophical explanations here are paraphrases, not quotations from an English translation. The game mechanics are interpretive teaching proposals and still require editorial and learner review.

The required local-source check consulted the [Jackson wiki APEX results-copy note](C:/Users/Administrator/Documents/projects/LLMwiki/APEX/APEX-SUT-Results-Copy-Mechanism.md). It concerns laboratory test-result transfer and contributes no evidence to this product plan; a wiki search found no Wittgenstein or language-learning material to use.

**Also done:** included transfer criteria, multiple-valid-answer scoring, and local-storage recovery requirements so the implementation can be judged beyond a successful build. These additions are confined to this document and can be undone by removing their corresponding planning text.

**Not covered:** no application, generated art, prototype, deployment, learner session, or learning outcome has been produced or tested. The present deliverable is the independent Markdown plan only.
