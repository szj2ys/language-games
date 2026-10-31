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
  - `cards [{id, label, has[], blurred[], art?, sourceId?}]`.
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
| *some* | k ≥ 1 | k ≤ n/2, or the claim is open for every stronger quantifier |
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
| Images | 24 (+3 if Logical Space ships) | §4.8 |

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
