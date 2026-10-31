# Language Games: plan (Copilot CLI)

> This is an independent plan. Inputs read: `planning/BRIEF.md`, `planning/ACCEPTANCE.md`, and the primary
> texts used to check citations (§3.4). No other plan file or run log was read. No code was written.

## 0. Verdict and what decides success

**Verdict: go, but smaller.** Ship **three** deep games, **Slab!**, **Go On!** and **Family Likeness**, in one
core flow of 3-5 minutes. Build a fourth game (**Logical Space**) only if the first three pass every gate by
about build hour 7 (§5.11). Six thin games would fail on fun and on correctness.

**The flaw that decides success is philosophy turned into reading or trivia.** Every screen gets the same
test: is the player *doing* the idea (giving orders that get built, training a pupil, finding the
counterexample), or reading about it? If the player is reading, cut the screen. In practice:

- No game asks what Wittgenstein said or which § says something.
- Play screens have at most two lines of instruction. The philosophy is in the rules of the game, plus a
  debrief of at most 280 characters after the round.
- Quotations appear only in the Notebook and on the Sources page. They are never put in a character's mouth.

**Second flaw: English feedback that says "wrong" without saying why.** Every coached slip names its English
rule in one sentence: "After *two*, English needs the plural: *two slabs*."

**Third flaw: a single misquote.** One invented or misattributed line costs the whole product its credibility
(B5). Characters speak our words. Wittgenstein's words appear only as short, cited quotes that have been
checked (§3.4).

**Success test for v1.** A B1 learner opens the site on a phone and finishes a 5-round session of any game in
under 5 minutes, with no instructions beyond the first card. The session summary can then truthfully say
(a) which English point they practised and (b) which passage they acted out.

## 1. Game concepts

There are eight concepts, and every one is built as an action. Citation abbreviations:

- **PI**: *Philosophical Investigations* Part I, by §.
- **PPF**: Part II, "Philosophy of Psychology – A Fragment".
- **TLP**: *Tractatus Logico-Philosophicus*, by proposition number.
- **OC**: *On Certainty*, by §.
- **BB**: *Blue Book*, by Ts-309 typescript page.

Every citation was checked against the original text (§3.4) except those marked †.

### 1.1 Slab! (the builders' game). v1

- **Idea.**
  - PI §2: builder A calls "block", "pillar", "slab", "beam", and assistant B brings the stone he has learnt to
    bring at that call. Wittgenstein asks us to conceive this as a *complete* primitive language.
  - §6: words are taught by training and pointing.
  - §7: a *language-game* is language together with the actions into which it is woven.
  - §8-9: the language grows: numerals, "there" and "this" used with a pointing gesture, colour samples.
  - §18: a language made only of orders is not "incomplete"; languages grow like a town's suburbs.
  - §19-20: is "Slab!" a word or a sentence?
  - §21: "Five slabs" is a report or an order, depending on the part it plays in the game.
- **English target: grammar and vocabulary, B1.**
  - Imperatives (*bring, put*).
  - Plural -s after numerals (*two slabs*). Chinese does not mark plural on nouns, so learners drop it.
  - *a/the* for new versus known things.
  - Agreement in *this/these* and *that/those*.
  - Prepositions of place (*on, under, next to, between*).
  - Adjective order (*two red slabs*).
- **Mechanic.** The player takes two roles, plus one variant.
  - *Assistant* (warm-up, the first 1-2 rounds of a level): the builder calls out, and you tap the stone and put it
    where he points. You learn the level's words by doing them (§6).
  - *Builder* (the main game): a blueprint shows a small structure. You compose orders from word tiles, and B
    carries out each order literally on a 5×3 site:
    - Wrong word order builds the wrong thing.
    - "There" without a tap on the site makes B look around.
    - "The slab", when two slabs would fit, makes B ask "Which slab?".
    - Each level adds words to the language, as §8 extends §2.
  - *Report or order?* (variant, Level 4): the same words, "Five slabs", come either from the builder on the
    scaffold (an order: fetch them) or from the stock-keeper at the pile (a report: tick the stock list). You
    act, and the use decides which it was (§21).
- **Round example (Level 2, "The gate").**
  - Blueprint: two red pillars with a grey beam across them. Stock: 3 red pillars, 2 grey beams, 4 slabs.
  - Tiles: *put · bring · a · the · two · red · grey · pillar · pillars · beam · slab · on · there👉*. Par 2.
  - Order 1: *Put two red pillar there👉*, and the player taps two cells. B places two pillars. Coach: "After
    *two*, English needs the plural: *two red pillars*." The order worked, so play goes on.
  - Order 2: *Put the grey beam on the pillars*. The gate stands.
  - Result: Built · 2 orders (par 2) · 1 English note.
  - Debrief: "You extended the builders' language as §8 does: a number, *there*, and a pointing hand."
- **Why it's fun.** It is a tiny Lightbot in English: you write a program and watch a literal-minded assistant
  run it. Mistakes are visible and harmless (the beam lands beside the gate, a stack topples), never a red ✗.
  Par gives strong players something to chase.
- **Scoring (0-3 marks).**
  - 1 mark: the structure matches the blueprint. This mark is required to finish the round.
  - +1: no more orders than par.
  - +1: no English notes.
  - Coached slips never block the build. In the builders' game, "Slab!" is a complete order (§2, §19-20), so
    English polish is scored separately. The best result per round is kept, and retries are free.
- **Trap.** B must not become grammar police who refuses "Slab!". B refuses only an order that is genuinely
  ambiguous *in that game*, such as two kinds of slab and no pointing.

### 1.2 Go On! (teach the pupil). v1

- **Idea.**
  - PI §143 and §151: teaching a pupil a series; "Now I can go on!".
  - §185: a pupil trained on "+2" writes 1000, 1004, 1008, 1012 and is sure he has gone on in the same way.
    Every example he was shown fits his reading too.
  - §198: an interpretation "hangs in the air" along with what it interprets; we are trained to react to a
    signpost.
  - §201: there is a way of grasping a rule that is not an interpretation.
  - §199 and §202: obeying a rule is a custom, a practice, and cannot be done "privately".
  - §206, §217, §219: when the justifications run out, "This is simply what I do"; I obey the rule blindly.
  - §241: agreement in form of life.
- **English target: morphology and spelling, B1-B2.** These are rules whose examples do not settle them:
  - *a/an* chosen by the first sound (*an hour, a university, an MBA*).
  - Plural spelling (*-s, -es, -ies, -ves*) and irregular plurals.
  - Past-tense *-ed* spelling, including consonant doubling (*stopped, visited, preferred*).
  - *-ed* pronunciation (/t/, /d/, /ɪd/).
  - Comparatives (*bigger, happier, more careful*).
  - Uncountable nouns (*advice, information, furniture*).
  - Verb + *-ing* versus verb + *to* (*enjoy swimming, want to swim*).
- **Mechanic.** You are the teacher.
  - The pupil holds several *ways of going on*: the correct one plus deviant ones such as "*an* before a vowel
    *letter*" or "always *-s*". It uses its favourite way among those that fit every card it has seen.
  - You show example cards from a deck. After each card the pupil re-sits a 5-item exam, and you watch its
    answers change.
  - When the whole exam is right, the pupil says "Now I can go on!". Par is the fewest cards that rule out every
    deviant way, computed from the data.
  - You can also play an **Explain** card, a rule in words such as "Use *an* before a vowel". The pupil reads it
    its own way (vowel *letter*), because an explanation is one more sign to interpret (§198). An Explain card
    costs the same as an example card.
  - **The "1000" moment** comes next: one item beyond the training range. Sometimes the pupil goes wrong again,
    and sometimes English speakers themselves differ. You make the teacher's call: *correct it*, or *both are in
    use*.
  - The debrief: no finite list of examples, and no rule statement, settles the next step by itself. Training
    into a shared practice does (§§198-202, §241).
- **Round example (Level 1, "A or an?").**
  - Exam: *hour, university, apple, MBA, horse*. Ways: *always a*, *letter*, *sound* (correct). Deck: *egg,
    umbrella, unicorn, hotel, cat*.
  - The pupil starts with *always a* and scores 2/5 ("a hour", "a apple", …).
  - Show *an egg*: *always a* is ruled out. The pupil switches to *letter* ("a hour", "an university", "a MBA")
    and still scores 2/5.
  - Show *a unicorn*: *letter* is ruled out. The pupil scores 5/5: "Now I can go on!". Par is 2.
  - Twist: *URL*. Most people say "you-are-el" and write *a URL*; some say "earl" and write *an URL*. The right
    call is *both are in use*, because the practice of speakers decides.
- **Why it's fun.** It is reverse Zendo: you hold the secret rule. The pupil's earnest mistakes (*an university,
  childs, informations*) are the comedy, and they are the learner's own past errors. Finding the one card that
  flips the pupil is a satisfying puzzle, and you have to really know a rule to teach it.
- **Scoring (0-3).**
  - 1 mark: the pupil passes the exam. Required to finish the round.
  - +1: no more cards than par.
  - +1: the right call at the "1000" moment. This is a judgement about English usage (what speakers do), never a
    question about the philosophy.
- **Trap.** The game must not end in scepticism ("there is no fact about meaning", Kripke's reading). The
  debrief lands on Wittgenstein's own answer: following a rule is a practice we are trained into (§§198-202),
  and justification ends in what we do (§217).

### 1.3 Family Likeness (find the threads). v1

- **Idea.**
  - PI §65-66: what is common to all games: board games, card games, ball games, Olympic games? "Don't think,
    but look!": similarities crop up and disappear.
  - §66 supplies its own counterexamples: patience (no competition between players), a child throwing a ball at
    a wall and catching it (no winning and losing), ring-a-ring-a-roses (amusement, but skill and luck are
    gone). §66 also asks whether all games are "amusing", comparing chess with noughts and crosses.
  - §67: *family resemblances*. A thread's strength lies in many overlapping fibres, not in one fibre running
    its whole length. Calling "the disjunction of all their common properties" a common feature is only playing
    with words.
  - §69: we explain "game" by examples: "this and similar things". We can draw a boundary for a special purpose,
    as when 1 pace is defined as 75 cm.
  - §71: blurred edges; "Stand roughly there."
  - §88: "inexact" does not mean "unusable".
  - BB Ts-309, 27-29: the "craving for generality" and the "contemptuous attitude towards the particular case".
- **English target: grammar and pragmatics, B1-B2.** Generalising honestly:
  - Quantifiers that match the evidence (*all, most, some, no, not all*).
  - Scope of negation: *Not all games have a winner* versus the ambiguous *All games don't have a winner*.
  - Subject-verb agreement in general statements (*A game has / Games have*).
  - Comparison (*both … and, neither … nor, unlike, whereas*).
  - Hedging (*roughly, tend to*).
  - This feeds directly into IELTS and TOEFL writing, where over-general claims lose marks.
- **Mechanic.** Each concept (*game, tool, sport, chair, food, book, home, music*) has 6 picture cards of things
  we call by that word, and 6-8 feature tiles. There are three round types, about 60 seconds each.
  - *Claim* (§66): make the strongest true general claim.
    - You build *All games have a winner* and press **Look**.
    - Cards with the feature light up and the rest stay dark. The Objector holds up a dark one: "Think of a
      child throwing a ball at a wall and catching it. Who wins?"
    - You fix the claim: *Most games have a winner*, or *Not all games have a winner*.
    - Truth is computed from the cards, so the right quantifier is a fact about what you can see.
  - *Thread* (§67): link the six cards into one rope.
    - Each link is a comparison sentence built from tiles, such as *Patience and poker are both played with
      cards*.
    - Each true link adds a coloured fibre. The finished rope shows overlapping colours, and no colour runs from
      end to end.
  - *Edge* (§69, §71): a new card arrives, such as a crossword, a video game or a lottery.
    - Link it if you can make a true link, or leave it at the edge. Both are accepted ("Stand roughly there",
      §71).
    - In *special-purpose* rounds you are given a purpose, such as "entries for a two-player tournament". You
      then draw a sharp boundary with one *must* rule, which is right for that purpose only (§69).
  - Cards where a feature is genuinely unclear are marked *blurred* in the data (is chess "amusing"? §66 asks).
    Blurred cards glow half-lit. A claim counts as true only if it holds however the blurred cards are counted.
    If the result depends on them, the claim is *open*. It scores nothing, but it is not marked wrong: the
    Objector holds up the blurred card and asks whether it counts (§3.3).
- **Round example (Claim, concept *game*).**
  - Cards: chess, a football match, poker, patience, a child throwing a ball at a wall, ring-a-ring-a-roses.
  - Draft 1: *All games have a winner*. The wall card and ring-a-ring-a-roses stay dark, and the Objector plays
    the wall card (§66).
  - Draft 2: *All games don't have a winner*. Note: "This can mean *no game has a winner*. To say that some
    games lack one, write *Not all games have a winner*."
  - Draft 3: *Most games have a winner*. This is true (4 of 6) and the most informative claim: 3 marks. The
    debrief names §66.
- **Why it's fun.** The Objector's counterexample is a small comic jab, the light-up cards make "don't think, but
  look" literal, and the finished rope is a satisfying visual payoff. Rounds are short, and each round type
  plays differently.
- **Scoring (0-3).**
  - *Claim*: 1 mark for a true claim; +1 for the most informative true quantifier (*most* at 4/6, not *some*);
    +1 for no English notes.
  - *Thread*: 1 mark when all cards are linked by true sentences; +1 for at least 3 different fibres; +1 for no
    notes.
  - *Edge*: 1 mark for a placement backed by a true sentence; +1 when the special-purpose rule sorts the entries
    correctly (or, with no purpose given, when a borderline card is honestly left at the edge); +1 for no notes.
- **Trap.** The game must not claim more than §66 does.
  - The feature lists are chosen so that no listed feature runs through all six cards; a content test enforces
    this. The debrief says "none of *these* features", not "games have nothing in common".
  - Wittgenstein's own examples (patience, the wall, ring-a-ring-a-roses, chess) carry a §66 chip only for the
    feature he used them for. All other counterexamples are ours.

### 1.4 Logical Space (ask the world). Gated fourth game

- **Idea.**
  - TLP 1.1: the world is the totality of facts, not of things. TLP 1.13: the facts in logical space are the
    world.
  - TLP 2.223: to tell whether a picture is true, we must compare it with reality.
  - TLP 4.024: to understand a proposition is to know what is the case if it is true.
  - TLP 4.461: tautology and contradiction say nothing: "I know nothing about the weather when I know that it
    rains or does not rain" (Ogden).
  - The turn to the later work: PI §23 lists the many jobs language does and adds "(Including the author of the
    *Tractatus Logico-Philosophicus*.)". PI §21: a command can have the form of a question.
- **English target: grammar, B1.**
  - Yes/no questions with inversion and *do*-support (*Is the cat on the sofa? Does the woman have a hat? Are
    there two cups?*).
  - Short answers (*Yes, there are. / No, she doesn't.*).
  - In the finale, an indirect request (*Could you pass me the cup?*).
  - Chinese forms yes/no questions with 吗 and no inversion, so *The cat is on the sofa?* and *Is the woman has
    a hat?* are typical errors.
- **Mechanic.** Guess Who in logical space.
  - There are 8 versions of one small room (the cat on the sofa or on the floor, one or two cups, the lamp on or
    off). One of them is the actual world.
  - You ask yes/no questions built from tiles. The world gives a short answer, and the worlds where the answer
    would be different fade out.
  - A malformed question gets no answer ("No answer: it is unclear what would make this true"), plus the
    English fix.
  - A tile pair *or not* lets you ask a tautology. The world says "Yes" and nothing fades (TLP 4.461).
  - The goal is to find the actual world within par (3 questions for 8 worlds).
  - **Level finale.** In the world you found, a woman holds a cup, and your task is to get it. You ask *Could
    you pass me the cup?*. The world, which only answers questions of fact, says "Yes, she could." Nothing
    happens, until she laughs and passes it. The same form did a different job (PI §21, §23). This hands the
    player on to the builders.
- **Round example.**
  - "Is the cat on the sofa?" "No, it isn't." 4 worlds fade.
  - "Are there two cups?" "Yes, there are." 2 worlds are left.
  - "Is the lamp on?" "Yes, it is." Found in 3, which is par.
  - A player who builds *Does the cat on the sofa?* gets: "Here *is* makes the question: *Is the cat on the
    sofa?* Use *does* with a main verb: *Does the cat sleep on the sofa?*"
- **Why it's fun.** The deduction is visible, the tautology is a trap you discover yourself, and the finale is a
  reveal.
- **Scoring (0-3).** 1 mark: world found. +1: no more questions than par. +1: no malformed questions.
- **Trap.** The game never says the *Tractatus* is "wrong". It shows what that picture of language leaves out
  (PI §23), and the Notebook carries the nuance.

### 1.5 Would You Mind? (same words, different jobs)

- **Idea.**
  - PI §21: a command put as "Would you like to…?" has the function of a command in the practice of the
    language; "Isn't the weather glorious today?" is a question used as a statement.
  - §23: giving orders, asking, thanking, cursing, greeting, praying, and more.
  - §11: words are as varied in function as the tools in a tool-box.
  - §43: meaning is use, "for a large class of cases".
- **English target: pragmatics, B1-B2.**
  - Indirect requests and softeners (*Could you…, Would you mind -ing…, I was wondering if…*).
  - Refusals, apologies, and register (friend, colleague, stranger, manager).
  - Directness carried over from Chinese (*Give me the menu*) is a common source of friction for learners.
- **Mechanic.**
  - Short scenes, each with a goal: move a deadline, swap a seat, borrow a charger. You build the utterance from
    tiles.
  - The listener reacts to what your words *do* in that relationship, shown by a relationship meter and the
    outcome.
  - Reverse rounds: someone says *Would you like to sit down?*. It is an instruction from a nurse, an offer from
    a host, or a request from an interviewer. You respond by acting.
- **Round example.** Your manager wants a report by Friday, and you need until Monday.
  - *Can I send it on Monday?* gets "Hm. Fine." The goal is met, but the meter dips.
  - *I was wondering if I could send it on Monday.* gets "Sure, Monday's fine."
  - *Would you mind if I send it on Monday?* gets a note: "Both are heard; *if I sent* sounds more tentative and
    polite."
- **Why it's fun.** It is a social simulation with quick, funny reactions, and the reverse rounds surprise.
- **Scoring.** 1 mark: goal met. +1: relationship kept. +1: no notes.

### 1.6 Look at the Use (the glorp game)

- **Idea.**
  - PI §340: one cannot guess how a word functions; one has to look at its use and learn from that.
  - PI §43.
  - OC §61: a meaning of a word is a kind of use of it.
  - OC §10: the signs "2 × 2 = 4" could mean something else in Chinese; only in use does the proposition have
    sense.
  - BB Ts-309, 7: if we had to name the life of the sign, we should say it was its use.
- **English target: vocabulary, B1-B2.**
  - Learning a word from its uses: word class and collocation.
  - The confusable pairs that a single Chinese word covers: 借 → *borrow/lend*; 说 → *say/tell/speak/talk*;
    看 → *look/see/watch/read*.
- **Mechanic.**
  - A nonsense word, *glorp*, replaces a real word in six short sentences, revealed one at a time.
  - You never type a definition. You show you can *use* the word: in a use test of 4 new sentences, which ones
    can take *glorp*?
  - Pass the use test and the real word is revealed.
- **Round example.**
  - Clues: "Can I glorp your pen?" and "She glorped money from her brother."
  - Use test: "I glorped my bike to Tom" ✗ (that would be *lent*); "He glorped three books from the library" ✓;
    and so on.
  - The answer: *borrow*.
- **Why it's fun.** You are a word detective: needing fewer clues is better, and the confusable pairs make it
  hard.
- **Scoring.** 1 mark: use test at least 3/4. +1: no more clues than par. +1: use test 4/4.
- **Trap.** This is the closest of the eight to a quiz. It earns its place only if the use test stays a test of
  *use*, never "pick the definition".

### 1.7 Beetle in a Box (the clinic)

- **Idea.**
  - PI §293: everyone has a box with something they call a "beetle", and no one can look into anyone else's box.
    The thing in the box has no place in the language-game; it cancels out.
  - §244: words for sensations are tied to the natural expression of the sensation and replace it.
  - §246: in the normal use of "know", other people very often know when I am in pain.
  - §580: an "inner process" stands in need of outward criteria.
  - §304: the sensation is "not a something, but not a nothing either".
  - §307: Wittgenstein denies being "a behaviourist in disguise".
- **English target: vocabulary and pragmatics, B1-B2.**
  - Words for sensations and feelings, with their collocations: *a sharp pain, a dull ache, a sore throat;
    itchy, dizzy, numb; embarrassed* versus *ashamed*.
  - Sympathetic responses (*That sounds awful. Do you want me to…?*).
- **Mechanic.**
  - At a pharmacy counter, patients show what they say and what they do (rubbing their temples, squinting at
    the light). You pick the word that fits, then the response or remedy.
  - Each patient carries a closed box with a **Look inside** button. It shows something different every time and
    never changes the score.
- **Round example.** A man holds his jaw and winces when he drinks cold water: "It's a ___ pain, right here." The
  word is *sharp*, not *itchy*. A good response is "That sounds painful. Have you seen a dentist?", and then you
  choose the remedy.
- **Why it's fun.** The useless peek button is a good joke, and the joke *is* the argument.
- **Scoring.** 1 mark: right remedy. +1: right word. +1: fitting response.
- **Trap, and why it is not in v1.** It is easily read as "pain is just behaviour", which §§304-307 reject. It
  needs more care than v1 allows.

### 1.8 Aspect Flip (two readings)

- **Idea.**
  - PPF xi† (§113, "noticing an aspect"; §118, the duck-rabbit): the figure has not changed, yet we see it
    differently.
  - PI §664: surface grammar versus depth grammar.
- **English target: grammar and reading, B2.**
  - Structural ambiguity: what a phrase attaches to (*I saw the man with the telescope*), noun versus verb (*Time
    flies like an arrow; fruit flies like a banana*), and scope (*Every student didn't pass*).
  - Rewriting for clarity.
- **Mechanic.**
  - A sentence appears with a picture of reading A.
  - You flip it: find reading B by re-grouping the phrases.
  - Then you rewrite the sentence with tiles so that only one reading survives.
- **Round example.** *Visiting relatives can be boring.* Reading A: going to visit them. Reading B: relatives who
  visit. Rewrite: *Relatives who visit can be boring.*
- **Why it's fun.** The puns, and the "aha" of the flip.
- **Scoring.** 1 mark: both readings found. +1: a rewrite with only one reading. +1: no notes.

**Also in the backlog.**

- **Hinges** (OC §§94-96, 105, 115, 341-343): a mystery game that trains modals of deduction (*must have, can't
  have, might have*). Doubting a hinge ("maybe this house didn't exist yesterday") stalls the investigation,
  because the game of doubting itself presupposes certainty (OC §115).
- **Five Red Apples** (PI §1): the shopkeeper's slip, as a level pack for Slab!. It covers countable and
  uncountable nouns and partitives (*a loaf of, a carton of*), which map onto Chinese measure words.

## 2. v1: which games, and the information architecture

### 2.1 Choice

| Concept | Does the idea | Fun | English value | Cheap to build | Cheap content | Cheap art | Philosophically safe | Decision |
|---|---|---|---|---|---|---|---|---|
| Slab! | 5 | 4 | 4 | 3 | 4 | 3 | 5 | **v1** |
| Go On! | 5 | 4 | 5 | 4 | 3 | 4 | 4 | **v1** |
| Family Likeness | 5 | 3→4\* | 4 | 4 | 3 | 4 | 5 | **v1** |
| Logical Space | 4 | 5 | 4 | 2 | 4 | 2 | 4 | v1 only if the gate passes |
| Would You Mind? | 3 | 4 | 5 | 4 | 3 | 3 | 4 | v1.1 |
| Look at the Use | 4 | 3 | 5 | 5 | 3 | 5 | 5 | v1.1 |
| Beetle in a Box | 3 | 3 | 3 | 3 | 3 | 3 | 2 | later |
| Aspect Flip | 3 | 4 | 4 | 4 | 3 | 3 | 3 (†) | later |

Scores run from 1 to 5; higher is better. \*Family Likeness reaches a 4 for fun only with sharp Objector lines and
rounds of 60 seconds or less.

Why these three:

1. **Three central ideas of PI, each played as an action:** words as tools inside an activity (§§2-23),
   concepts without sharp edges (§§65-71), and rules that live in practice (§§185-242). Played in the book's
   order, they tell the story of the later Wittgenstein without a lecture.
2. **Three English targets with no overlap:** orders, number, articles and place (Slab!); generalising and
   comparing (Family Likeness); spelling and form rules with exceptions (Go On!).
3. **One engine:** all three share the round shell and the tile composer. Each game adds one pure engine and one
   stage view.
4. **They are the mechanics the acceptor names (B4),** so the risk of "this is a quiz" is lowest.

Logical Space is the best fourth game, because it brings in the *Tractatus* and question formation. It is also
the most expensive in art and scene logic, so it waits behind a gate (§5.11). If it ships, it appears as a
**Prologue** card before Slab!.

### 2.2 Core flow

`Home → pick a game (or Continue) → first-run card (shown once, 3 lines) → 5 rounds → session summary → next game | 5 more | Notebook`

- A session is 5 rounds and takes 3-5 minutes.
- Nothing is locked: every game is open from the start, and the home screen only *suggests* the next step.
- No streaks, daily goals, badges, notifications, or round timers.

### 2.3 Routes

| Route | Purpose | Notes |
|---|---|---|
| `/` | Hub: one-line promise, a Continue button when a round is in progress, and 3 game cards with progress (*7/24 rounds*) | Fits on one phone screen at 390×844 |
| `/play/[game]` | The game: first-run card, rounds, round result, session summary | Static shell around a client-side game; `generateStaticParams` |
| `/notebook` | The passages you acted out and the English notes you were coached on | Built from localStorage; has an empty state |
| `/sources` | Every citation: work and §, our paraphrase, a short quote with the translator named, and a link to the text | The page the acceptor spot-checks (B5) |
| `/notes`, `/notes/[slug]` | One short article per game, about 600 words | The owner's "Blog" nav; also serves SEO/GEO |
| `/about` | What the site is, how it works, the idea in five lines, and settings (reduced motion, reset progress, analytics opt-out) | |
| `/privacy`, `/terms` | Plain-language legal pages | Operator details follow the owner's legal-page preferences |
| `/sitemap.xml`, `/robots.txt`, `/llms.txt`, OG images | SEO/GEO | |
| 404 | A fly in a fly-bottle, with the way out leading home (PI §309) | |

### 2.4 Screens

**Hub.**

- Title "Language Games" and the subtitle "Learn English by playing Wittgenstein's language-games."
- A Continue strip, for example "Slab! · round 7 · your 2 orders are saved".
- One card per game: key art, name, a one-line promise ("Give orders. Watch them get built."), the English target
  ("Plurals, articles, *on/under*"), and progress.
- Footer: Notebook · Sources · Notes · About.

**Round screen (phone, 390×844, no page scroll):**

```
┌──────────────────────────────┐
│ ← Slab!     Round 3/5     ?  │  top bar, 48 px
├──────────────────────────────┤
│                              │
│   stage (art + SVG state)    │  ~40% of height, 3:2
│                              │
├──────────────────────────────┤
│ B: "Which slab?"             │  response line (aria-live)
├──────────────────────────────┤
│ [Put] [the] [red] [slab] [⌫] │  sentence line
├──────────────────────────────┤
│ put bring a the two red grey │  tile tray: wraps, and
│ pillar pillars beam slab on  │  scrolls inside itself
│ there👉                      │  if it overflows
├──────────────────────────────┤
│ Orders 1 · par 2     [Send ▶]│  48 px primary action
└──────────────────────────────┘
```

On desktop (1440×900), the stage takes the left 60% and the composer and order history the right 40%, at a
maximum width of 1200 px.

**Feedback line.** After each submission, at most two lines:

- What happened, e.g. "B put the beam *under* the pillars".
- The English note, e.g. "*on* = on top of; *under* = below".
- A § chip that opens the source card.

**Round result.** Marks (●●○), a one-line debrief that links what you did to the passage, the English notes, and
a "Next round" button.

**Session summary.**

- Marks for the 5 rounds, the passages you enacted (as chips), and the English points you practised.
- Buttons: *Next game*, *5 more*, *Notebook*.
- No comparison with other players.

**Notebook.** Two tabs.

- *Passages*: one page per passage you acted out, with:
  - the § reference and our paraphrase;
  - a short quote, with the translator credited;
  - "What you did", filled in from your own round ("You trained the pupil with *an egg* and *a unicorn*");
  - a link to the text.
- *English*: the notes you received, each with the rule and your corrected sentence.
- Empty state: "Play a round; the passages you act out will appear here."

**States.**

- *First run* (no progress): the hub highlights Slab!.
- *Resume*: the in-progress round and the half-built sentence come back after a reload.
- *Partial*: progress is shown per game.
- *Complete*: all rounds are done. Any round can be replayed, with no nagging.
- *Storage unavailable* (private mode, full quota): play still works in memory, with a quiet notice.
- *Corrupt storage*: the data is backed up and reset, with a one-line notice.

### 2.5 Interaction and accessibility rules

- **Tap or keyboard, never drag-only.**
  - Tiles are buttons and are reusable: they work as a palette, not as single-use tokens.
  - Tab moves into the tray, arrow keys move within it, Enter or Space adds a tile, and Backspace removes the
    last one.
  - Enter on the sentence line sends it.
- **Every stage state has a text twin**, e.g. "Site: red pillar at column 2; grey beam on the pillars". It is
  announced in an `aria-live` region, and every stage SVG has a `<title>`.
- **Colour is never the only cue.** Stones carry a pattern and a label, and lit cards also get a check icon.
- **Size, focus, contrast and motion.**
  - Touch targets are at least 44 px.
  - Focus rings are visible (a 2 px ink outline with a paper-coloured offset).
  - Contrast meets AA (§4.2).
  - With `prefers-reduced-motion`, there are no topple or fly animations: the new state appears at once,
    together with its text twin.
- **Text.** One idea per line, B1 wording in the UI, and no idioms in instructions.

## 3. Content model and volume

### 3.1 Files

All content is typed data. It is validated with zod at build time and in tests, and no round lives in JSX.

| File | What it holds |
|---|---|
| `content/sources.json` | Citation registry (§3.4) |
| `content/english.json` | English-target registry: id, name, rule (≤200 chars), a right example and a wrong one, and an optional note for Chinese speakers |
| `content/art.json` | Image registry: key, src, width, height, alt |
| `content/rounds/slab.json`, `go-on.json`, `family.json` (+ `logical-space.json`) | Rounds, one file per game |
| `content/family-concepts.json` | Cards and features shared by the Family Likeness rounds |
| `content/notes/*.mdx` | Notes articles |
| `content/AUTHORING.md` | How to add a round (linked from the README, B16) |

### 3.2 Fields shared by every round

| Field | Type | Rule |
|---|---|---|
| `id` | string | Stable kebab-case, never reused (progress is keyed by it) |
| `game` | `slab` \| `go-on` \| `family` \| `logical-space` | Discriminator for the payload |
| `level`, `order` | int | Level 1-4; position within the game |
| `title` | string | ≤40 chars |
| `cefr` | `B1` \| `B2` | Level of the round's English |
| `englishTargets` | string[] | ≥1 id from `english.json`; the feedback text comes from there |
| `citations` | `{ sourceId, role: "enacted" \| "context" }[]` | ≥1 with role `enacted`; every source must be `verified` |
| `intro` | string? | ≤140 chars, shown before the round |
| `debrief` | string | ≤280 chars, in our words: connects what the player did to the passage |
| `par` | int? | Required for Slab!, Go On! and Logical Space; checked by the solver test |
| `solution` | game-specific | Used by the solver test and by the e2e players |
| `art` | `{ stage?, cards? }` | Keys into `art.json` |
| `status` | `draft` \| `reviewed` | Only `reviewed` rounds ship |
| `payload` | game-specific | See §3.3 |

### 3.3 Payload for each game

**Slab!** fields:

- `mode`: `assist` \| `build` \| `report-or-order`.
- `site {cols, rows}`, `stock [{kind, colour, count}]`, and `blueprint [{kind, colour, x, y, span?}]`.
- `tiles`: word ids.
- `grammar`: the enabled templates, e.g. `PUT_NP_THERE`, `PUT_NP_PREP_NP`, `BRING_NP`.
- `calls` (assist mode): the builder's utterances, each with the expected action.
- `speakers` (report-or-order mode): who says what, and whether it is an order or a report.

```json
{
  "id": "slab-l2-gate", "game": "slab", "level": 2, "order": 8,
  "title": "The gate", "cefr": "B1",
  "englishTargets": ["plural-after-number", "the-for-known-things", "prep-on"],
  "citations": [{ "sourceId": "PI-8", "role": "enacted" }, { "sourceId": "PI-2", "role": "context" }],
  "debrief": "You extended the builders' language as §8 does: a number, 'there', and a pointing hand.",
  "par": 2,
  "solution": ["put two red pillars there@1,0;3,0", "put the grey beam on the pillars"],
  "art": { "stage": "slab-site" },
  "status": "reviewed",
  "payload": {
    "mode": "build",
    "site": { "cols": 5, "rows": 3 },
    "stock": [
      { "kind": "pillar", "colour": "red", "count": 3 },
      { "kind": "beam", "colour": "grey", "count": 2 },
      { "kind": "slab", "colour": "grey", "count": 4 }
    ],
    "blueprint": [
      { "kind": "pillar", "colour": "red", "x": 1, "y": 0 },
      { "kind": "pillar", "colour": "red", "x": 3, "y": 0 },
      { "kind": "beam", "colour": "grey", "x": 1, "y": 1, "span": 3 }
    ],
    "tiles": ["put", "bring", "a", "the", "two", "red", "grey", "pillar", "pillars", "beam", "slab", "on", "there"],
    "grammar": ["PUT_NP_THERE", "PUT_NP_PREP_NP"]
  }
}
```

**Go On!** fields:

- `task`: the instruction line.
- `ways [{id, label, rank, correct?}]`: exactly one way is `correct`; rank 1 is the pupil's first guess.
- `items [{id, prompt, out: {wayId: answer}, why}]`: `why` explains the correct form in English terms.
- `deck`: the example cards the teacher can show.
- `exam`: 5 item ids, disjoint from `deck`.
- `explain {text, keeps: [wayIds]}`: how the pupil reads the rule statement.
- `twist {prompt, accepted, call: "correct" | "both-in-use", why}`.

```json
{
  "id": "go-on-a-an-1", "game": "go-on", "level": 1, "order": 1,
  "title": "A or an?", "cefr": "B1",
  "englishTargets": ["a-an-by-sound"],
  "citations": [{ "sourceId": "PI-185", "role": "enacted" }, { "sourceId": "PI-198", "role": "context" }],
  "debrief": "Every card also fitted a wrong way of going on, as in §185. Training on cases, not a formula, got the pupil into the practice.",
  "par": 2, "solution": ["egg", "unicorn"], "status": "reviewed",
  "payload": {
    "task": "Write 'a' or 'an'.",
    "ways": [
      { "id": "always-a", "label": "always 'a'", "rank": 1 },
      { "id": "letter", "label": "'an' before a vowel letter", "rank": 2 },
      { "id": "sound", "label": "'an' before a vowel sound", "rank": 3, "correct": true }
    ],
    "items": [
      { "id": "egg", "prompt": "egg", "out": { "always-a": "a", "letter": "an", "sound": "an" }, "why": "'egg' starts with a vowel sound." },
      { "id": "unicorn", "prompt": "unicorn", "out": { "always-a": "a", "letter": "an", "sound": "a" }, "why": "'unicorn' starts with a 'you' sound, which is a consonant sound." },
      { "id": "hour", "prompt": "hour", "out": { "always-a": "a", "letter": "a", "sound": "an" }, "why": "The h is silent, so 'hour' starts with a vowel sound." }
    ],
    "deck": ["egg", "umbrella", "unicorn", "hotel", "cat"],
    "exam": ["hour", "university", "apple", "mba", "horse"],
    "explain": { "text": "Use 'an' before a vowel.", "keeps": ["letter", "sound"] },
    "twist": { "prompt": "URL", "accepted": ["a", "an"], "call": "both-in-use",
               "why": "Most people say 'you-are-el', so 'a URL'; some say 'earl' and write 'an URL'." }
  }
}
```

The `items` list above is shortened; a real round lists every deck and exam item.

**Family Likeness.** Concepts are shared, and each concept feeds three rounds (`claim`, `thread`, `edge`).

- A concept has:
  - `features [{id, sg, pl}]`: the singular and plural verb phrase, so agreement can be checked.
  - `cards [{id, label, has[], blurred[], art?, artPrompt?, icon?, sourceId?}]`: each card has `art` (an
    approved image) or `icon` (the word-card fallback, §4.8).
  - `counterLines [{card, feature, line, sourceId?}]`: `sourceId` is set only where Wittgenstein used that
    card for that feature.
- A round's payload has `type`, `concept`, `cards` (6 ids), `newCard`, `purpose` (edge rounds only), and
  `maxClaims`.

```json
{
  "id": "game", "word": "game", "plural": "games",
  "features": [
    { "id": "winner",  "sg": "has a winner",             "pl": "have a winner" },
    { "id": "compete", "sg": "has players who compete",  "pl": "have players who compete" },
    { "id": "skill",   "sg": "needs skill",              "pl": "need skill" },
    { "id": "luck",    "sg": "involves luck",            "pl": "involve luck" },
    { "id": "cards",   "sg": "is played with cards",     "pl": "are played with cards" },
    { "id": "ball",    "sg": "is played with a ball",    "pl": "are played with a ball" },
    { "id": "alone",   "sg": "can be played alone",      "pl": "can be played alone" },
    { "id": "amuse",   "sg": "is played for amusement",  "pl": "are played for amusement" }
  ],
  "cards": [
    { "id": "chess",    "label": "chess",              "has": ["winner", "compete", "skill"], "blurred": ["amuse"], "sourceId": "PI-66" },
    { "id": "football", "label": "a football match",   "has": ["winner", "compete", "skill", "luck", "ball"], "blurred": ["amuse"] },
    { "id": "poker",    "label": "poker",              "has": ["winner", "compete", "skill", "luck", "cards"], "blurred": ["amuse"] },
    { "id": "patience", "label": "patience (a card game for one)", "has": ["winner", "skill", "luck", "cards", "alone", "amuse"], "sourceId": "PI-66" },
    { "id": "wall",     "label": "a child throwing a ball at a wall and catching it", "has": ["skill", "ball", "alone", "amuse"], "sourceId": "PI-66" },
    { "id": "ring",     "label": "ring-a-ring-a-roses", "has": ["amuse"], "sourceId": "PI-66" }
  ],
  "counterLines": [
    { "card": "wall",     "feature": "winner",  "line": "Think of a child throwing a ball at a wall and catching it. Who wins?", "sourceId": "PI-66" },
    { "card": "patience", "feature": "compete", "line": "Think of patience. Who is the other player?", "sourceId": "PI-66" },
    { "card": "ring",     "feature": "skill",   "line": "Think of ring-a-ring-a-roses. Where is the skill?", "sourceId": "PI-66" },
    { "card": "chess",    "feature": "amuse",   "line": "Is chess 'amusing' the way noughts and crosses is?", "sourceId": "PI-66" }
  ]
}
```

What the data implies:

- *Winner* is true for 4 of 6 cards, so the best claim is *most*. *Skill* is 5/6, also *most*. *Compete*, *luck*,
  *cards*, *ball* and *alone* each come to *some* and *not all*. *Luck* at 3/6 is exactly half, so *most* is
  false; the note says "3 of 6 is half, not most".
- *Amuse* is definite for 3 cards and blurred for 3. Only *some* is safe; *all*, *most* and *not all* stay open.
  This is §66's own question, whether all games are amusing, and the game leaves it open as §66 does.
- No feature is shared by all six cards.
- A thread exists through all six cards: football–chess (*compete*) → chess–poker (*winner*) → poker–patience
  (*cards*) → patience–wall (*alone*) → wall–ring (*amuse*).

How claims are judged:

- Let *kMin* be the number of cards that definitely have the feature, *kMax* = kMin + the blurred cards, and *n* = 6.
- A claim is **true** if it holds at both kMin and kMax, **false** if it fails at both, and **open** otherwise.
  Every quantifier below is monotone in k, so checking the two ends is enough.

| Quantifier | True at k when | Earns the "most informative" mark when the claim is true and (k = kMin) |
|---|---|---|
| *all* | k = n | always |
| *most* | k > n/2 | k < n |
| *some* | k ≥ 1 | k ≤ n/2 |
| *not all* | k < n | k ≤ n/2 |
| *no* | k = 0 | always |

**Logical Space** (only if the gate passes) has:

- `attributes [{id, values[]}]`;
- `worlds` (the listed combinations, all distinct);
- `actual`: either a fixed world, or `seeded`, in which case all worlds are symmetric so par is unchanged;
- `tiles`, `grammar`, and `finale?`.

### 3.4 Citation registry and quoting policy

`sources.json` entry fields:

| Field | Rule |
|---|---|
| `id` | e.g. `PI-185`, `TLP-4.461`, `OC-115`, `BB-ts309-27` |
| `work`, `ref` | e.g. `PI`, "PI §185"; or `BB`, "BB, Ts-309 p. 27" |
| `paraphrase` | Our words, ≤220 chars. This is what is shown by default |
| `quote` | Optional, ≤25 words |
| `quoteSource` | Required whenever there is a quote: "trans. C. K. Ogden (1922)", "our translation of the German", or "Wittgenstein's own English (BB, dictated 1933-34)" |
| `url` | A reading link: LWP (wittgensteinproject.org) for PI, OC and BB; Klement's side-by-side edition (people.umass.edu/klement/tlp/) for the TLP |
| `verified` | `{ against, date }`. Required to ship; a content test fails on any unverified source |

**Quoting policy.**

- Paraphrase is the default.
- TLP quotes use Ogden's 1922 translation, which is in the public domain in the US.
- PI, OC and PPF quotes are our own short translations of the German original, labelled as such. We do not
  reproduce the Anscombe or Hacker & Schulte wording, which is under copyright; the acceptor notes this too.
- At most one quote of 25 words or fewer per passage. Never a full paragraph.

**Seed registry: checked during planning** against the German text of PI Part I, OC and the BB typescript Ts-309
on LWP, and against Klement's TLP.

| Source | What the game relies on (paraphrase) | Used in |
|---|---|---|
| PI §1 | Augustine's picture of language; the shopkeeper with the slip "five red apples" | Backlog (Five Red Apples) |
| PI §2 | Builders A and B; block, pillar, slab, beam; "a complete primitive language" | Slab! |
| PI §6 | Words taught by training: the teacher points and says the word (ostensive *teaching*, not definition) | Slab! assist mode |
| PI §7 | Language-game = language plus the actions into which it is woven | Slab!, About |
| PI §8, §9 | Extension: numerals, "there" and "this" with pointing, colour samples; learning numerals by counting slabs | Slab! L2-L3 |
| PI §18 | Languages of orders only are not incomplete; suburbs of a town | Slab! L3 debrief |
| PI §19, §20 | To imagine a language is to imagine a form of life; is "Slab!" a word or a sentence?; "Bring me a slab" | Slab! |
| PI §21 | "Five slabs" as report or order: the difference is the part it plays; a question form used as a command or statement | Slab! L4, Logical Space finale |
| PI §23 | The many kinds of sentence and language-games; "(Including the author of the *Tractatus*.)" | Logical Space, Notes |
| PI §43 | Meaning is use, "for a large class of cases—though not for all" | About, Notes |
| PI §65-67 | Look at games; no common feature; family resemblances; thread and fibres; "playing with words" | Family Likeness |
| PI §69 | Explaining by examples, "this and similar things"; a boundary for a special purpose; 1 pace = 75 cm | Family (edge) |
| PI §71, §88 | Blurred edges, "Stand roughly there"; inexact is not unusable | Family (edge) |
| PI §143, §151 | Teaching a series; "Now I can go on!" | Go On! |
| PI §185 | +2 past 1000 gives 1004, 1008; the pupil who looks from fingertip to wrist | Go On!, key art |
| PI §198, §201 | Interpretations hang in the air; the signpost; grasping a rule that is not an interpretation | Go On! (Explain card) |
| PI §199, §202, §206 | Rule-following as custom and practice, not done privately; common human behaviour as the system of reference | Go On! debriefs |
| PI §217, §219, §241, §242 | "This is simply what I do"; obeying blindly; agreement in form of life and in judgments | Go On! twist |
| PI §244, §246, §293, §304, §307, §580 | Pain-words; others know; the beetle; not a something, not a nothing; not a behaviourist; outward criteria | Backlog (Beetle) |
| PI §309 | Showing the fly the way out of the fly-bottle | 404 page |
| PI §340, §664 | One cannot guess how a word functions; surface versus depth grammar | Backlog |
| TLP 1.1, 1.13, 2.223, 4.024, 4.461, 7 | Facts, logical space, comparing with reality, understanding = knowing what is the case if true, tautology says nothing | Logical Space |
| OC §10, §61 | Only in use does a proposition have sense (the Chinese example); a meaning is a kind of use | Backlog, Notes |
| OC §94-96, §105, §115, §341, §343 | World-picture; the river-bed; doubt presupposes certainty; hinges | Backlog (Hinges) |
| OC §467, §476 | "We are only doing philosophy"; children learn to fetch books, not that books exist | About (optional) |
| BB Ts-309 pp. 7, 26, 27-29 | The life of the sign is its use; language games as the forms with which a child begins to use words; craving for generality | Family Likeness, Notes |

†**Not yet verified:** the PPF numbering (§113, §118) and the page numbers of the 1958 Blackwell BB edition. These
must be checked against print before they appear in-game. Until then, BB is cited by Ts-309 page and PPF is not
cited at all in v1.

### 3.5 Volume for v1

| Item | v1 amount | Level structure |
|---|---|---|
| Slab! rounds | 24 | L1 single words (assist + build) · L2 numbers and *there* · L3 colours, prepositions and ambiguity · L4 report-or-order and bigger builds (6 rounds each) |
| Go On! rounds | 24 | 8 rule families × 3: *a/an*; plural spelling; irregular plurals; *-ed* spelling; *-ed* sounds; comparatives; uncountables; *-ing/to* |
| Family Likeness rounds | 24 | 8 concepts × (claim, thread, edge): game, tool, sport, chair, food, book, home, music |
| Logical Space rounds (if gated in) | 20 | 4 rooms × 5 |
| Sources | ~35 entries | §3.4 |
| English targets | ~40 entries | Each with a rule, an example and a common error |
| Notes | 3 articles | One per game, about 600 words, at most 2 short quotes each |
| Images | 24 core (+3 if Logical Space ships), plus up to 42 concept cards with a word-card fallback | §4.8 |

Each game needs at least 20 shipped rounds (B7). We author 24, so up to 4 weak rounds can be cut. At 5 rounds per
session, 24 rounds is about 5 sessions per game, roughly an hour and a half of play across v1.

### 3.6 Content QA

1. **Draft.** An LLM drafts rounds from `content/AUTHORING.md`, which holds the schema, the CEFR band, the
   English-target list and banned patterns (idioms, cultural trivia, quotes inside rounds).
2. **Machine checks** (`npm test`, B8):
   - **Schema:** every round passes the zod schema; ids are unique; `order` has no gaps.
   - **Citations:** every round has at least one `enacted` citation; every `sourceId` exists and is `verified`.
   - **Registries:** every `englishTargets` id exists; every art key exists and its file is in `public/`.
   - **Solver:** replaying `solution` through the game engine finishes the round at `par` (Slab!, Go On!,
     Logical Space).
   - **Go On!:**
     - exactly one way is correct;
     - every item's correct output matches the standard form;
     - every round has at least one deviant way;
     - `par` equals the minimum found by brute force over subsets of the deck (decks have at most 8 cards, so at
       most 256 subsets).
   - **Family Likeness:**
     - no feature is shared by all of a concept's cards (the §66 property);
     - every `counterLine` card lacks the feature or has it blurred;
     - the claim judge returns the expected true/false/open verdicts for a fixed table of claims per concept;
     - a thread through all cards exists.
   - **Logical Space:** the worlds are all distinct, and par is achievable.
   - **Text:** quotes have at most 25 words and a `quoteSource`; no round text contains a quoted passage longer
     than 8 words, which forces quotes into `sources.json`; length limits hold; `cefr` is B1 or B2.
3. **Word-level flag.** A dev-time script flags words with wordfreq Zipf < 3.5 unless they are the target or are
   glossed. The script is not shipped.
4. **Review.**
   - English: a fresh reviewer reads 10 random items per game, and every finding is fixed (B6).
   - Citations: each source entry is checked against the original once, and the result recorded in `verified`.
     Every debrief is checked for over-claiming.
5. **Playtest.** Every round is played once in the dev build. Dead or boring rounds are cut, and that is why
   there are 4 spare.

## 4. Art direction

### 4.1 Direction: "ink-and-wash notebook"

- **The look.** Fine ink line with flat watercolour washes on warm cream paper. Simple shapes, lots of empty
  paper, and a little humour in the people. Every screen should look like a page of one sketchbook.
- **Why this look.**
  - Wittgenstein's preface calls the book's remarks landscape sketches made on long journeys, and the book
    "really only an album" (PI Preface, our translation of the German). The site is that album.
  - It suits adult learners and exam candidates: calm and serious, but warm. It is the opposite of the
    neon-and-mascot edtech look.
  - Low-saturation art does not fight the text, which is where learning happens.
- **Restraint reference, not a subject:** 1920s Viennese modernism, such as the house Wittgenstein designed for
  his sister (1926-28): plain proportions and no ornament.
- **It is not:** a portrait of Wittgenstein or of any real person; Vienna postcard clichés; cartoon mascots;
  photorealism or 3D; clip-art philosophy (busts, light bulbs, question marks).

### 4.2 Palette and contrast

The ratios below were computed during planning with the WCAG 2.x formula. They are rechecked with axe in M6.

| Token | Hex | Use | Contrast |
|---|---|---|---|
| `paper` | #F4EDE0 | Page background | — |
| `card` | #FBF7EF | Raised surfaces: cards, tile tray, dialogs | — |
| `ink` | #2B2522 | Text and line art | 12.97:1 on paper, 14.13:1 on card |
| `ink-2` | #5A514B | Secondary text | 6.65:1 on paper |
| `brick` | #B5523B | Primary buttons (white text) and large display accents | White on brick 4.96:1. On paper 4.26:1, so large text and non-text only |
| `brick-ink` | #9A3F2B | Links and small brick-coloured text | 5.78:1 on paper; white on it 6.73:1 |
| `slate` | #4F6D7A | Focus ring (2 px, 2 px offset), secondary buttons, small text | 4.75:1 on paper; white on slate 5.52:1 |
| `ochre` | #C9A04E | Lit cards and highlights | **Fill only**: 2.09:1 on paper. Text on it is ink (6.20:1) |
| `stone` | #A8A39A | Inactive fills and shadows | **Fill only**: 2.15:1 on paper. Text on it is ink (6.02:1) |

Rules:

- Colour is never the only signal.
  - A lit card is ochre with a check icon and an accessible name such as "has a winner".
  - A dark card is stone with a cross icon. A blurred card is hatched with a "?" icon.
- In Slab!, colour words are vocabulary, so each stone colour also has a pattern: red has a brick hatch, blue
  horizontal lines, yellow dots, and grey stays plain. The accessible name always includes the colour word.
- There is no dark mode in v1, because the paper look is the identity. Under `prefers-contrast: more`, borders
  thicken and `ink-2` becomes `ink`.

### 4.3 Type

- **Headings and quotations:** Fraunces, a variable serif under the SIL Open Font License. Quotes are set in
  italic with a thin brick-ink rule.
- **UI, body and tiles:** Atkinson Hyperlegible Next, falling back to the original Atkinson Hyperlegible if
  next/font lacks Next.
  - It was designed by the Braille Institute for legibility. Its clearly different *I*, *l* and *1* help people
    reading in a second language.
- **Loading:** both are self-hosted through `next/font` at build time. There are no runtime requests to Google,
  which keeps the CSP tight and adds no third party.
- **Sizes:**
  - Body text is 18 px with 1.6 line height on phones; the measure is at most 68 characters.
  - Tiles are 18 px semibold with a minimum height of 44 px.
  - Counts and par use tabular figures.
  - No all-caps sentences and no letter-spaced small text.

### 4.4 Cast

Each CAST line is pasted word for word into every prompt where that character appears.

| Key | CAST line |
|---|---|
| BUILDER | a stocky builder in his fifties with a short dark beard, a flat cap, and a brick-red waistcoat over a white shirt with rolled sleeves |
| ASSISTANT | a young East Asian woman in her twenties, hair tied back, in a slate-blue work jacket with an ochre scarf |
| PUPIL | a boy of about ten with short hair, round glasses and an ochre jumper |
| OBJECTOR | a sharp-eyed woman in her fifties with grey hair in a bun, a stone-grey cardigan and small brick-red reading glasses |
| TEA WOMAN (gated) | an elderly woman with white hair and a stone-grey shawl |

- The teacher in Go On! is the player, so the teacher appears only as an arm entering from the edge of the
  frame. There is no teacher character, and no echo of Wittgenstein the village schoolteacher.
- The cast is warm and slightly comic and is never mocked. Nobody is a philosopher.
- Characters speak our words, never quotations (§3.4).
- The assistant is the player's role in Slab! assist mode. The target learners are mostly Chinese, so she is
  drawn as a young East Asian woman, as a person rather than a type.

### 4.5 Composition rules

- **Vignettes, not full bleed.**
  - The subject sits in the central ~70% of the frame, with at least 15% empty paper on every side.
  - CSS can then crop for phones with `object-position`, and fade the edges into the page with `mask-image`.
    That hides small paper-colour mismatches and needs no transparency.
- **No text, letters or numbers inside any image.** Labels are HTML, because image models garble text.
- **Consistent drawing.**
  - Light comes from the upper left, and the ink line weight is the same in every image.
  - Washes are flat with soft edges.
  - Each image uses at most three palette colours plus ink.
- **Characters face into the play area.** Builder and Objector face right; Assistant and Pupil face left.
  Images are never mirrored in CSS, so details stay consistent.
- **Cards** hold one subject with a clear silhouette that reads at 160 px.
- **Key art** is 3:2 and shows one clear action that explains the game before any text is read.
- **Sizes** are 1536×1024, 1024×1024 or 1024×1536. These sizes are assumed for gpt-image-2 and confirmed at M0.

### 4.6 What is generated and what is drawn in code

| Element | How | Why |
|---|---|---|
| Stones (block, pillar, slab, beam), site grid, placed builds | SVG components | They change on every move, must match the blueprint exactly, need colour plus pattern, and weigh almost nothing |
| Tiles, tray, buttons, light-up states, the rope and its fibres | CSS and SVG | Interactive, accessible and animatable |
| Logical Space objects (cat, cups, lamp light) | SVG over a generated room | The objects *are* the world state |
| Icons | lucide | Consistent and accessible |
| Favicon and app icon | SVG: a brick-red slab resting on two ink pillars | Crisp at 16 px |
| OG images | `next/og`: title text over `og-base`, or over a key-art crop for each game | Text stays exact |
| Everything in §4.8 | Generated | Atmosphere and characters, which code cannot draw well |

### 4.7 Generation pipeline

1. **Anchor (M0).**
   - Write `art-src/style.txt` (the STYLE block) and `art-src/cast.md` (the CAST lines).
   - Generate `hero` first, as the style anchor.
   - Review it at full size and at 390 px wide. Freeze the style once it passes.
2. **Every later image.**
   - The prompt is the subject, then the CAST lines of the characters present, then the STYLE block.
   - Pass the anchor as a reference image with `-i`. For a character, also pass that character's first
     approved image.
3. **Command** (the owner's documented Codex route to gpt-image-2):
   `codex exec --skip-git-repo-check --dangerously-bypass-approvals-and-sandbox -i art-src/ref/hero.png -- "<prompt> Save the image as art-src/out/<key>.png and change nothing else."`
   - Close stdin (`< NUL` from cmd, or a Node `spawn` with stdin `'ignore'`); otherwise codex waits forever.
   - `-i` takes several values, so the prompt must come after `--`.
   - Generate one image per call, with a 6-minute timeout. Before a retry, look for a surviving `codex.exe`
     and stop it by PID.
   - The bypass flag gives the agent full access. Each call carries a one-file instruction, and `git status`
     is checked after each batch: only `art-src/out/` may change.
4. **Log.** Each call goes into `logs/art-log.md`: time, command, model, full prompt, output file, sha256 and
   verdict.
   - Prompts and the log are committed.
   - Raw PNGs in `art-src/out/` are git-ignored; only the processed WebP files are committed.
5. **Review on a contact sheet,** with all images side by side at display size.
   - Check: the style matches the anchor; the cast is consistent; there is no text or pseudo-lettering; hands
     are right; nothing resembles a real person; the alt text is true.
   - At most 2 retries per image. After that, simplify the subject; for a card, fall back to a word card.
6. **Process with sharp** (a dev dependency).
   - Crop to the display ratio, export WebP at about q80 at 1× and 2× widths, strip metadata, and write to
     `public/art/`.
   - Record width, height and alt in `content/art.json`.
7. **Serve with `next/image`,** with `sizes` set. The hero gets `priority`; everything else loads lazily.
   - Budgets: hero ≤120 KB at a phone width; character images ≤40 KB; cards ≤25 KB.
8. **Disclose.** `/about` says the illustrations are AI-generated in a style made for this site, and that the
   prompts are in the repository.
9. **If Codex image generation fails on 2 routes,** follow the kill rule (§5.14): use typographic and SVG art,
   and mark the art criterion BLOCKED with the exact error.

### 4.8 Images to generate, with prompts

**STYLE block** (stored in `art-src/style.txt`, appended word for word to every prompt):

> Ink line art with flat watercolour washes on warm cream paper, like a page from a sketchbook; restrained 1920s
> Viennese modernism; simple geometric shapes; lots of empty paper around the subject; palette limited to ink
> brown-black, brick red, slate blue, ochre and stone grey; soft light from the upper left; subtle paper grain;
> no text, letters, numbers, signs or logos; no photorealism, no 3D, no heavy shading.

**Each full prompt is:** subject + the CAST lines of the characters named in capitals (§4.4) + STYLE.

**Core set (v1 must-have, 24 images):**

| # | Key | Size | Where | Subject prompt | Alt text |
|---|---|---|---|---|---|
| 1 | `hero` | 1536×1024 | Home hero; **style anchor** | A quiet building site drawn like a sketchbook page. On the left the BUILDER raises one hand and calls out; on the right the ASSISTANT walks towards him carrying a flat stone slab. A few stone blocks, pillars and beams lie neatly on the ground. Low houses far away, wide empty paper above. | A builder calls out while his assistant carries a stone slab across a quiet building site. |
| 2 | `og-base` | 1536×1024, cropped to 1200×630 | Site-wide OG background | At the right edge, a low half-built wall of stone blocks with one pillar and a beam resting on it. The left two-thirds of the picture is empty cream paper. No people. | Set for each page by `next/og` |
| 3 | `notebook-empty` | 1024×1024 | Notebook empty state | An open notebook with blank pages on a wooden table, a pencil beside it and a small flat stone used as a paperweight. | An open, empty notebook with a pencil and a small stone as a paperweight. |
| 4 | `fly-bottle` | 1024×1024 | 404 page (PI §309) | A clear glass bottle lying on its side on a windowsill, its cork beside it; a small fly walks out of the open neck towards the light of the window. | A fly walks out of the open neck of a glass bottle towards a window. |
| 5 | `slab-key` | 1536×1024 | Hub card, Slab! intro | The BUILDER stands on a half-built low wall, pointing down and calling out; below him the ASSISTANT lifts a stone slab from a neat stack. Pillars and beams lie ready nearby. | A builder on a half-built wall calls out; his assistant lifts a slab from a stack. |
| 6 | `slab-site` | 1536×1024 | Slab! stage, behind the SVG grid | An empty, level building plot seen from the front at eye level: flat earth, a low horizon with a few trees and two small houses, a pale sky wash. The middle of the picture is plain and empty. No people, no stones. | "" (decorative) |
| 7 | `builder-call` | 1024×1024 | Slab!: an order is given | The BUILDER, half-length, facing right, one hand cupped beside his mouth, calling out. | The builder calls out an order. |
| 8 | `builder-point` | 1024×1024 | Slab!: *there* with pointing (§8) | The BUILDER, full-length, facing right, pointing at a spot on the ground with his arm stretched out. | The builder points at a spot on the ground. |
| 9 | `builder-pleased` | 1024×1024 | Slab!: build complete | The BUILDER, half-length, facing right, smiling and nodding, wiping his hands on a cloth. | The builder smiles and wipes his hands, pleased with the work. |
| 10 | `assistant-carry` | 1024×1024 | Slab!: the assistant acts | The ASSISTANT, full-length, facing left, carrying a long stone beam on her shoulder with quick, steady steps. | The assistant carries a stone beam on her shoulder. |
| 11 | `assistant-shrug` | 1024×1024 | Slab!: an order cannot be understood | The ASSISTANT, half-length, facing left, shrugging with open palms and a friendly, puzzled look. | The assistant shrugs, unsure what was meant. |
| 12 | `go-on-key` | 1536×1024 | Hub card, Go On! intro (§185) | A schoolroom moment seen from the side: a teacher's arm enters from the left edge and points with one finger along a row of plain chalk dots on a slate board. The PUPIL, instead of looking where the finger points, looks back along the arm towards the wrist. | A teacher points along a row of chalk dots; the pupil looks back along the arm instead. |
| 13 | `classroom` | 1536×1024 | Go On! stage background | An empty village schoolroom of the 1920s seen from the back: wooden desks, a blank slate board, a tall window with soft light. No people. | "" (decorative) |
| 14 | `pupil-proud` | 1024×1024 | Go On!: the pupil graduates | The PUPIL, half-length, facing left, chin up and grinning, holding a closed exercise book against his chest. | The pupil grins, holding his exercise book. |
| 15 | `pupil-puzzled` | 1024×1024 | Go On!: a wrong way of going on | The PUPIL, half-length, facing left, frowning and scratching his head with a pencil. | The pupil frowns and scratches his head with a pencil. |
| 16 | `pupil-eureka` | 1024×1024 | Go On!: "Now I can go on!" (§151) | The PUPIL, half-length, facing left, eyes wide, one finger raised as an idea arrives, a pencil in his other hand. | The pupil raises a finger as he suddenly understands. |
| 17 | `family-key` | 1536×1024 | Hub card, Family Likeness intro (§66-67) | Seen from above: a wooden table with a chessboard, a fanned hand of face-down playing cards, a football, a skipping rope and a small wooden spinning top. One thick rope of overlapping fibres in brick red, slate blue, ochre and stone grey winds between them; no single fibre runs the whole length. | Games on a table — chess, cards, a ball, a top — joined by one rope of overlapping coloured fibres. |
| 18 | `objector` | 1024×1024 | Family Likeness: a counterexample | The OBJECTOR, half-length, facing right, holding up a small blank card between two fingers, one eyebrow raised, amused rather than stern. | The Objector raises an eyebrow and holds up a card. |
| 19 | `card-chess` | 1024×1024 | Card | A chessboard in the middle of a game with a few pieces, seen at a slight angle. | A chessboard in the middle of a game. |
| 20 | `card-football` | 1024×1024 | Card | Two players in brick-red and slate-blue shirts running for one ball on a strip of grass. | Two players run for the ball in a football match. |
| 21 | `card-poker` | 1024×1024 | Card | Seen from above, four players' hands holding face-down playing cards over a green table with a few round counters. | Players hold cards over a table with counters. |
| 22 | `card-patience` | 1024×1024 | Card | One person's hands laying out playing cards with plain faces in neat rows on a table. | One person lays out cards in rows for a game of patience. |
| 23 | `card-wall` | 1024×1024 | Card (PI §66) | A child throwing a ball at a brick wall and getting ready to catch it, alone in a quiet yard. | A child throws a ball at a wall and waits to catch it. |
| 24 | `card-ring` | 1024×1024 | Card (PI §66) | Four small children holding hands and dancing in a ring on the grass. | Children hold hands and dance in a ring. |

**Gated set (3 images, only if Logical Space passes the gate in §5.11):**

| # | Key | Size | Where | Subject prompt | Alt text |
|---|---|---|---|---|---|
| 25 | `ls-key` | 1536×1024 | Hub card, Logical Space intro | Eight small framed pictures of the same simple sitting room, pinned in two rows on a wall; in each one the cat, the number of cups or the lamp is slightly different. | Eight small pictures of one room; in each, the cat, the cups or the lamp is different. |
| 26 | `ls-room` | 1536×1024 | Logical Space stage, under the SVG objects | A plain, empty sitting room seen straight on: a sofa on the left, a low table in the middle, a standing lamp on the right, a window behind. No people, no animals, no cups. | "" (decorative) |
| 27 | `ls-tea` | 1024×1024 | Logical Space finale (§21) | The TEA WOMAN sitting in an armchair, laughing, holding out a cup of tea towards the viewer. | A woman laughs and holds out a cup of tea. |

**Concept cards beyond *game* (should-have, up to 42 images).**

- These are the other 7 Family Likeness concepts, with 6 cards each. Every card in `family-concepts.json` has
  an `artPrompt`, a one-line subject written together with the card.
- **Prompt template:** "A single {artPrompt}, alone in the middle of empty paper, drawn simply with a clear
  outline." + STYLE.
- They are generated in background batches of one concept (6 cards), starting after the *game* deck passes
  review.
- A card with no approved image renders as a word card: the label in Fraunces, a lucide `icon`, and a thin
  rule. That fallback is designed to look intended, so a missing image never blocks a release.
- Content test: every card has either `art` or `icon`.

**Totals:**

| Set | Images | Status |
|---|---|---|
| Core | 24 | Required for v1 |
| Gated | 3 | Only if Logical Space ships |
| Concept cards | up to 42 | Best effort; word cards otherwise |
| Code-drawn | — | Favicon, stones, tiles and OG text (§4.6) |

## 5. Technical architecture, risks and failure modes

### 5.1 Stack

| Layer | Choice | Note |
|---|---|---|
| Framework | Next.js, latest stable at build time, App Router, React 19, TypeScript `strict` with `noUncheckedIndexedAccess` | Exact version pinned in `package.json` |
| Styling and UI | Tailwind CSS v4, shadcn/ui, lucide-react | shadcn parts only where they earn it: Button, Dialog, Sheet (Notebook on phones), Tabs, Switch, Separator |
| Validation | zod | One schema module for content and storage |
| State | `useReducer` per game plus one storage hook | No state library, database, API routes or server actions |
| Notes | MDX in `content/notes/` via `@next/mdx`, compiled at build | Local files only, never remote MDX |
| Tests | Vitest with Testing Library and jsdom; Playwright with `@axe-core/playwright` | §5.10 |
| Lint | ESLint flat config with `eslint-config-next` | `npm run lint` |
| Tooling | npm with a committed lockfile; Node LTS pinned in `.nvmrc` and `engines` | sharp is a dev dependency for the art script only |
| Analytics | `posthog-js`, loaded only when env-gated (§5.7) | Optional |

### 5.2 Rendering and hosting

- **Static rendering.** Every route renders at build:
  - `/play/[game]` and `/notes/[slug]` through `generateStaticParams`.
  - Each game is a client component inside a server-rendered shell. The shell holds the h1, how-to-play text,
    the English target and the idea with its citations, so pages read fine without JavaScript (§5.8).
- **Run with `next build && next start`** (B3).
- **No `output: 'export'`.** Static export drops `next/image` optimisation and `headers()` from
  `next.config`, and both are needed (B9, B13).
- **Hosting is the owner's decision** after v1. Any Node host works. Cloudflare through the OpenNext adapter is
  one option. Before launch, confirm that image optimisation and the headers survive on the chosen host.

### 5.3 Folders

```
app/                      routes: page.tsx, play/[game]/, notebook/, sources/, notes/[slug]/, about/,
                          privacy/, terms/, not-found.tsx, sitemap.ts, robots.ts, opengraph-image.tsx, llms.txt/
components/               shared UI: round-shell, composer (tile tray), feedback-line, citation-chip,
                          result-card, session-summary, ui/ (shadcn)
games/<game>/             engine (pure), stage (React view), scoring, copy  — slab, go-on, family, logical-space
lib/grammar/              tile lexicon, templates, parser, slip detectors
lib/storage/              schema, load/save, migrations, hook
lib/analytics/            env-gated PostHog wrapper with an event allowlist
lib/content/              loaders + zod schemas for content/*
content/                  sources.json, english.json, art.json, family-concepts.json, rounds/, notes/, AUTHORING.md
public/art/               processed WebP images
art-src/                  style.txt, cast.md, ref/, prompts; out/ is git-ignored
scripts/                  process-art, flag-rare-words (dev only)
tests/                    unit/, content/, e2e/
logs/                     worklog.md, art-log.md, screenshots/
```

### 5.4 Engine contract

Every game exposes the same five pure functions. Pages and tests depend only on these.

| Function | Input → output | Rule |
|---|---|---|
| `initialState` | round (+ seed) → state | Deterministic for a given seed |
| `reduce` | state + action → state | Pure and total. An invalid action returns the state with a reason, never throws |
| `score` | state + round → marks 0-3 plus the reason for each mark | Shown on the result card, so every mark is explained |
| `isComplete` | state → boolean | Drives the result screen |
| `solve` | round → actions | Used by tests and e2e to prove par is reachable |

**The round shell** is shared. It owns the composer, feedback line, citation chip, Notebook writes, persistence
and analytics, so a game only supplies its engine and its stage. That is why a fourth game costs about 2.5 h
rather than 5 h.

### 5.5 Composer and grammar

- **Tiles.** Each tile has:
  - a word id and surface form;
  - a category: verb, determiner, number, colour, noun (sg/pl), preposition, place adverb, auxiliary, pronoun,
    quantifier or conjunction;
  - features: number, countability, and whether it starts with a vowel sound (for *a/an*).
- **Templates.** Each game enables a few small patterns, for example:
  - Slab!: order = verb + noun phrase + *there* or a prepositional phrase.
  - Family Likeness: claim = quantifier + plural noun + verb phrase; link = noun phrase + *and* + noun phrase +
    *are both* + verb phrase.
  - Logical Space: yes/no question = auxiliary + noun phrase + predicate.
- **Parser.** A deterministic parser over at most 12 tokens.
  - It returns a parse tree, or *unparsed* together with the nearest template.
  - It also returns a list of *slips*: agreement (*two pillar*), articles (*a/an*, *a/the* with known objects),
    word order (*pillar red*), *do*-support and inversion.
  - Each slip maps to an `english.json` target, which supplies the "why" note.
- **Leniency.** Slips that do not block meaning are coached, not punished: the builder still understands *two
  pillar*, and the note explains the plural. Unparsed attempts do not count against par. Ambiguity is part of the
  game: *the pillar* when there are two pillars makes the assistant ask "Which pillar?".
- **No free text, NLP or LLM at runtime.** That means no cost, no privacy questions, and deterministic tests.
  - **Trade-off:** tiles test recognition more than production. The mitigation is distractor forms in the tray
    (*pillar/pillars*, *a/an*, *do/does*), so the learner must choose every form. A v2 can add typed input,
    parsed by the same grammar.
- **Keyboard and screen readers.**
  - Tiles are buttons. Enter adds a tile and Backspace removes the last one.
  - The sentence built so far is announced through a polite live region.

### 5.6 Persistence (localStorage)

- **One key, `lg:v1`**, holding zod-validated JSON:
  - `version`;
  - `games[game].rounds[roundId] = {best, done, tries}`;
  - `current = {game, roundId, contentHash, state, savedAt}`, where `state` includes the tiles placed so far,
    so in-progress input survives a reload (B10);
  - `session = {game, roundIds, index, marks}`;
  - `notebook = {passages: sourceId[], english: targetId[]}`;
  - `settings = {analytics, motion}`.
- **Writes** are debounced by about 250 ms after each action and flushed on `pagehide` and when the page becomes
  hidden.
- **Reads** happen only after mount, through `useSyncExternalStore` with an empty server snapshot. That avoids
  hydration mismatches. Progress counts show a neutral placeholder until the read finishes.
- **Failure handling.**
  - If storage is unavailable or full (private mode, quota), the app falls back to memory and shows one quiet
    line: "Progress can't be saved in this browser."
  - If the JSON is corrupt or fails the schema, the raw value is copied to `lg:backup:<timestamp>`, the app
    starts fresh, and it sends `storage_error` with the error kind only.
  - Each version bump gets a migration function, with a test.
- **Content changes.**
  - Progress is keyed by round id, and unknown ids are ignored.
  - An in-progress round whose `contentHash` changed is restarted rather than replayed into a different round.
- **Multiple tabs.** A `storage` event refreshes progress. For the in-progress round, the last write wins,
  which is acceptable for v1.
- **Reset.** Settings has "Clear my progress", behind a confirmation dialog.

### 5.7 Analytics (PostHog, optional)

- **When it loads.** Only when `NEXT_PUBLIC_POSTHOG_KEY` is set at build time *and* the user has not switched it
  off in Settings. It is a dynamic import, so the bundle carries no PostHog bytes when it is off.
- **Configuration:**
  - autocapture off; session recording and surveys off;
  - `persistence: 'memory'`, so there are no cookies and nothing in storage;
  - Do Not Track is respected;
  - "discard client IP" is enabled in the PostHog project.
- **Event allowlist** (the wrapper drops anything else):
  - `session_started {game}`;
  - `round_completed {game, roundId, marks, tries}`;
  - `session_completed {game, marks}`;
  - `notebook_opened`;
  - `storage_error {kind}`.
  - Composer content is never sent, and there is no user id.
- **Purpose.** Find rounds that are too hard (many tries) or skipped. It is never used to drive engagement, and
  there are no re-engagement prompts. `/privacy` says all of this in plain words.

### 5.8 SEO and GEO

- **Metadata.**
  - Every route exports `metadata` or `generateMetadata`: a title template "%s · Language Games", a
    description of at most 155 characters, and a canonical URL.
  - `metadataBase` comes from `NEXT_PUBLIC_SITE_URL`.
- **OG images.** `app/opengraph-image.tsx` covers the whole site, and each game has its own (§4.6).
- **Crawling.** `app/sitemap.ts` lists every static route and note; `app/robots.ts` allows everything and points
  to the sitemap.
- **JSON-LD** (B12):
  - `WebSite` on the home page.
  - `LearningResource` on each game page, with `educationalLevel` "CEFR B1-B2", `teaches` (the English target and
    the idea), `inLanguage` "en" and `isAccessibleForFree` true.
  - `Article` on notes.
  - The data comes from our own content, with `<` escaped.
- **Semantic HTML.** One h1 per page and a logical heading order. Game pages render "How to play", "What you
  practise" and "The idea" with citation links on the server.
- **GEO.**
  - `/llms.txt` summarises the site and links to the games, notes and `/sources`.
  - Each note opens with a two-sentence plain answer (for example, "What is a language-game?") followed by its
    citation.
  - `/sources` is a crawlable registry page of every passage the site relies on.
- **Performance budget.**
  - LCP under 2.5 s on a mid-range phone over 4G.
  - First-load JS for a game route of at most about 170 KB gzipped.
  - Lighthouse (mobile) a11y ≥95, SEO ≥95 and performance ≥85, measured locally.

### 5.9 Security

- **Headers,** set in `next.config` `headers()` for every route:
  - **CSP:** `default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';
    img-src 'self' data: blob:; font-src 'self'; connect-src 'self'` plus the PostHog host only when the key is
    set; `frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self'`; and
    `upgrade-insecure-requests` in production.
  - **Why `'unsafe-inline'` for scripts:**
    - Statically rendered pages cannot carry per-request nonces, and Next.js inlines its bootstrap scripts.
    - The risk is bounded: there is no user-generated HTML, the composer only ever renders known tiles, the only
      third-party code is the optional bundled PostHog, and JSON-LD is built from our own data.
    - A hash-based CSP is a v2 option.
  - **Also:**
    - `X-Content-Type-Options: nosniff`;
    - `Referrer-Policy: strict-origin-when-cross-origin`;
    - `Permissions-Policy` with camera, microphone and geolocation disabled;
    - `X-Frame-Options: DENY`;
    - `Cross-Origin-Opener-Policy: same-origin`;
    - `Strict-Transport-Security` in production only;
    - `poweredByHeader: false`.
- **Secrets.** v1 needs none.
  - `.env.example` lists only `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST`.
    These are public by design: a PostHog project key is meant for browsers.
  - `.env*` files other than the example are git-ignored.
- **Dependencies.** `npm audit --omit=dev` must report no high or critical issues (B13). Dev-only advisories are
  listed in the worklog, not hidden.
- **Content.** MDX notes and JSON content are ours and compiled at build time. Nothing is fetched or evaluated
  at runtime.

### 5.10 Tests and quality gates

- **npm scripts** (B2):
  - `lint` (ESLint);
  - `typecheck` (`tsc --noEmit`);
  - `test` (Vitest: unit and content tests);
  - `test:e2e` (Playwright against `next build && next start`);
  - `build`, `start`;
  - `check`, which runs lint, typecheck, test, build and test:e2e in that order.
- **Unit tests** (B8):
  - the grammar parser on at least 60 fixture sentences (valid sentences, each kind of slip, unparsed);
  - every engine's state transitions, including invalid actions;
  - the scoring table for each game, every mark and its reason;
  - the Go On! pupil model (hypothesis update) and the brute-force par;
  - the Family claim judge, with a true/false/open table including blurred cards;
  - storage: save, load, migrate, corrupt JSON, quota, content-hash change;
  - the analytics allowlist: no field can carry text.
- **Content tests:** every check in §3.6.
- **E2E** (Playwright, production build; B3, B10, B11, B14):
  - **Full sessions.** Each game is played start → result → summary at 390×844 and at 1440×900, driven by
    each round's `solution`.
  - **Resume.** Reload in the middle of a round: the tiles placed so far and the progress are still there.
  - **Console.** A console-error listener fails any test.
  - **Accessibility.**
    - axe runs on every route and allows no serious or critical violations.
    - Each game has one keyboard-only round.
    - Under emulated `prefers-reduced-motion`, there are no transform animations.
  - **Phone layout.**
    - No horizontal scroll at 360 px.
    - Every interactive element is at least 44×44 px, measured from bounding boxes.
  - **Screenshots.** Every route and every game state at both sizes, saved to `logs/screenshots/` for the
    acceptor.
- **Manual:** Lighthouse mobile on `/`, one game page and one note; the English and citation reviews (§3.6); the
  jobs-review (§5.11 M7).
- **CI:** if the repository has a GitHub remote, a workflow runs `npm run check` on every push.

### 5.11 Build order and gates

The plan is for about 10.5 hours of build work, above the 8-hour floor (A6). Each step ends with a commit and a
timestamped line in `logs/worklog.md`; there is a commit at least every 45 minutes, so no idle gap reaches 90
minutes. Art generation runs in the background from M0 to M5.

| Step | Time | Work | Exit evidence |
|---|---|---|---|
| **M0 De-risk** | 0:00-0:45 | (1) Generate the `hero` anchor through Codex, with the command logged. (2) Scaffold Next.js, Tailwind and shadcn; run `next build && next start`; take a Playwright screenshot at both sizes. (3) Spike the parser on 20 fixture sentences, including slips. | The anchor image and its art-log line; screenshots; 20/20 fixtures pass. If the anchor fails on 2 routes, take the typographic art path. If the parser fails, simplify the templates before going on. |
| **M1 Foundation** | 0:45-2:00 | Design tokens (§4.2-4.3); layout and hub; round shell (stage slot, composer, feedback line, citation chip, result card, session summary); storage with resume; content schemas and content tests; the `sources.json` seed and the `/sources` page | Unit and content tests pass; a dummy round can be played and resumed |
| **M2 Slab!** | 2:00-4:00 | Engine, SVG stage, the assist and build modes, report-or-order; 24 rounds drafted, at least 12 reviewed | Unit tests; an e2e session at both sizes; self-play note in the worklog |
| **M3 Go On!** | 4:00-5:30 | Engine, pupil model, brute-force par, Explain card, the 1000 twist; 24 rounds | Same as M2 |
| **M4 Family Likeness** | 5:30-7:00 | Engine, claim judge, light-up cards, rope; the *game* deck and 24 rounds | Same as M2 |
| **G4 Gate** | ~7:00 | Logical Space goes in only if **all** of these hold: the three games pass e2e at both sizes; each has at least 20 reviewed rounds; at least 18 of the 24 core images are approved; self-play of each game passes "would I play a second session?" honestly | Gate decision written in the worklog. If it passes, Logical Space takes 7:00-9:30 and every later step moves by 2.5 h. If it fails, the 2.5 h goes to content and polish |
| **M5 Site** | 7:00-8:15 | Notebook, `/notes` (3), `/about`, `/privacy`, `/terms`, 404; SEO and GEO (§5.8); headers (§5.9); the PostHog gate (§5.7) | Header check with curl; sitemap, robots and JSON-LD validated |
| **M6 Quality** | 8:15-9:30 | `npm run check`; axe; Lighthouse; English review (10 random items per game by a fresh reviewer); citation review (at least 8 spot checks against the texts); fix everything found | Reports in `logs/`; findings and fixes listed |
| **M7 Acceptance** | 9:30-10:30 | jobs-review by a fresh reviewer on phone and desktop; fix the findings; README and `content/AUTHORING.md`; final `npm run check` | jobs-review record; README covers run, test, build, content and art locations, and how to add a round (B16) |

### 5.12 Risks

| # | Risk | Likelihood / impact | Mitigation |
|---|---|---|---|
| 1 | **Trivia drift**: debriefs turn into lectures, or a "which § says…" round slips in | Medium / high | Every round needs an `enacted` citation, meaning the player performs the idea; debriefs ≤280 chars; no question rounds about the text; B4 judged per game in M6 |
| 2 | **A misquote or misattribution** | Medium / high | Quotes live only in the registry with `verified` required; paraphrase by default; at least 8 spot checks in M6; † and ‡ references stay out of the game |
| 3 | **Translation copyright** | Low / medium | Our own translations of the German for PI and OC; Ogden (public domain in the US) for the TLP; ≤25 words |
| 4 | **Wrong or unnatural English from LLM drafts** | High / medium | B1-B2 rules in AUTHORING; the rare-word flag; a fresh English review; "why" notes come from the once-reviewed `english.json`, not from text written per round |
| 5 | **Tile monotony**, or tiles making the English too easy | Medium / medium | Distractor forms; templates that change across levels; 60-90 s rounds; the three games interact differently (orders, example cards, claims and rope) |
| 6 | **Grammar brittleness**: a correct sentence is rejected | Medium / high (it feels unfair) | 60+ parser fixtures; a polite "unparsed" reply that shows the nearest template and costs nothing; every unparsed case found in review becomes a fixture |
| 7 | **Inconsistent images** | Medium / medium | Anchor plus references, CAST lines, contact-sheet review, 2 retries, word-card fallback |
| 8 | **Codex unavailable or hanging** | Medium / medium | stdin closed, timeouts, cleanup by PID; two routes (cmd with `< NUL`, Node spawn); then the kill rule |
| 9 | **`next start` versus static export** confusion | Low / high | Decided in §5.2: no static export |
| 10 | **localStorage edge cases** | Medium / medium | §5.6 handling, each case unit-tested |
| 11 | **Scope creep** (more games, accounts, leaderboards, typed answers) | High / high | Gate G4, the backlog, the cut order (§5.14) |
| 12 | **Philosophical misreadings** | Medium / high | Every debrief is checked against four known traps: (a) Kripke's sceptical reading presented as Wittgenstein's; (b) the beetle read as behaviourism (§307 denies it); (c) "meaning is use" stated without §43's "for a large class of cases"; (d) family resemblance read as "anything goes", when §69 and §71 allow boundaries drawn for a purpose |
| 13 | **Fun is unproven** | High / high | M0-M2 self-play before the next game is built; the G4 honesty test; jobs-review; dull rounds cut |
| 14 | **Slow on low-end phones** | Medium / medium | Light SVG stage, lazy images, the JS budget, reduced motion |
| 15 | **Building games that exclude keyboard or screen-reader users** | Medium / high | Nothing needs dragging: tap a stone or tile, then a cell; arrow keys move on the grid; results are announced in a live region |

### 5.13 What would make this fail

1. **A worksheet in costume.** Remove the art and the story from a round. If what is left is a gap-fill
   exercise, the round fails B4 and the brief. Every round must be describable without the words "choose the
   correct…".
2. **"Wrong" with no "why".** If feedback only marks errors, nobody learns any English (B6). Every slip maps to a
   reviewed rule with a right and a wrong example.
3. **One misquote.** In a product about a philosopher, one invented or misattributed line costs the trust of
   exactly the readers who would recommend it.
4. **Philosophy only in the debrief.** If the idea lives only in text, players skip it. The mechanic must carry
   it. For example, in Go On! the pupil's deviant ways *are* §185, felt as a problem the player solves.
5. **Overload at B1.** Tiles plus grammar plus puzzle can be too much. Level 1 of every game must be winnable in
   under 60 seconds with at most 8 tiles.
6. **A long core flow.** The flow is hub → game → 5 rounds → summary. If rounds run past 90 seconds, the
   session no longer fits in "a few minutes". Sessions target ≤8 minutes, and self-play times them.
7. **Phone ergonomics.** If the stage, tray and feedback line do not fit 390×844 without scrolling during a
   round, phone play fails. This is checked in M2 for the first game, not at the end.
8. **Generic AI-looking art.** That reads as cheap. The anchor discipline, the cast lines and the fallback rule
   guard against it.

### 5.14 Cut order and kill criteria

**Cut order**, first to go: Logical Space → notes (3 down to 1) → Slab! report-or-order mode (L4 becomes bigger
builds) → special-purpose Edge rounds → per-game OG images → concept-card art (word cards instead) → the English
half of the Notebook (passages stay).

**Never cut:** tests, citations and their verification, accessibility, resume after reload, and the English
"why" feedback.

**Kill or redesign:**

- **Slab! feels like a worksheet.** If after M2 the honest answer to "would I play a second session?" is no,
  stop and redesign the composer interaction before building Go On!. The composer is shared, so its failure
  would repeat in every game.
- **The parser falls short.** If it handles fewer than 95% of fixtures one hour after M0, shrink the templates
  (fewer forms per level). Do not add NLP.
- **Codex image generation fails on 2 routes.** Switch to typographic and SVG art, and report B9 as BLOCKED
  with the exact error.
- **A citation cannot be verified** against the text. Delete the claim; do not soften it.

### 5.15 How the plan meets the acceptance criteria

| Criterion | Where in this plan | Evidence produced |
|---|---|---|
| B1 stack | §5.1 | `package.json`, `components.json`, `app/` |
| B2 lint, typecheck, build | §5.10 | `npm run check` output |
| B3 games playable in production | §2.2, §5.2, §5.10 | e2e sessions at 390×844 and 1440×900; console listener |
| B4 mechanics, not quizzes | §0, §1, §5.12 #1, §5.13 #1 | Per-game `enacted` citations; M6 judgment |
| B5 accurate citations | §3.4, §3.6, §5.11 M6 | `verified` flags; `/sources`; spot-check record |
| B6 real English | §1 (targets), §3.1, §3.6, §5.5 | `english.json`; slip → "why" notes; review of 10 items per game |
| B7 enough content | §3.5 | 24 typed rounds per game, at least 20 reviewed |
| B8 tests | §3.6, §5.10 | `npm test` |
| B9 gpt-image-2 art used | §4.7, §4.8 | `logs/art-log.md`; `public/art/`; `next/image`; screenshots |
| B10 owner preferences | §2.5, §5.6, §5.7 | Resume e2e; env gate; no streaks or locks |
| B11 accessibility | §2.5, §4.2, §5.5, §5.10 | axe, keyboard and reduced-motion e2e; Lighthouse |
| B12 SEO and GEO | §5.8 | Metadata, OG, sitemap, robots, JSON-LD, `llms.txt` |
| B13 security | §5.9 | Header check with curl; `npm audit --omit=dev` |
| B14 phone and desktop | §2.4, §5.10 | 360 px scroll test, 44 px targets, screenshots |
| B15 jobs-review | §5.11 M7 | Review record with fixes |
| B16 README | §5.11 M7, §3.1 | README and `content/AUTHORING.md` |
| A6 eight hours of work | §5.11 | `logs/worklog.md`; commits at least every 45 min |

### 5.16 Not covered by this plan

- **Fun with real learners.** There is no playtest with B1-B2 Chinese-speaking learners before v1. Self-play,
  the jobs-review and the acceptor are proxies.
- **CEFR level** is judged by review, not calibrated against a learner corpus. The notes on Chinese speakers'
  errors come from contrastive grammar and are generalisations.
- **Unchecked references.**
  - PPF numbering (†) was not checked against print. It is not cited in v1.
  - Blackwell page numbers for the Blue Book (‡) were not checked; until they are, it is cited by Ts-309 page.
- **No legal review** of short translated quotes or of AI-generated art.
- **Production hosting** (OpenNext and Cloudflare or another host), real PostHog data, and browsers other than
  Playwright's Chromium.
- **Image sizes.** The gpt-image-2 sizes are assumed until M0 confirms them.
