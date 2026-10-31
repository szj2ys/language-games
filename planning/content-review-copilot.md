# Content review: English, pedagogy and citations (Copilot)

Reviewed: the five `rounds.ts` files, `pupil/levels.ts`, `content/sources.ts`, and the templates that turn them into sentences. Tree: HEAD `c929124` plus uncommitted edits, 2026-11-01 00:27 +08:00. Learners: B1–B2 (ACCEPTANCE B6).
Already fixed upstream, so not listed: plural agreement for "nails", the "no more than half" message, the p-3 "-d" label.
Citations: every quotation in `sources.ts` matches Anscombe (PI), Ogden (TLP) or Paul–Anscombe (OC), and its section number. Checked against the German: PI §§2, 6, 7, 8, 11, 14, 19, 21, 23, 27, 43, 66, 67, 109, 133, 185, 198, 202, 217 (and §§84, 201 for replacements below); ÜG §§115, 341; TLP 2.1, 2.21, 4.01, 5.6, 6.54. Not checkable: PPF xi (no German Part II in the source used). The citation errors below are in notes and twists, not in the quotations.
▶ = string produced this session in Node from the real data and engine. The family sentences come from re-running the component's template expression on the real cards.
Tags: [E] wrong or unnatural English · [2] two reasonable answers, one accepted · [L] level · [C] culture · [W] Wittgenstein citation. Worst first.

1. **[E] family/rounds.ts › TOOLS, f2-1 to f2-5.** Tool names have no article, so the generated sentences are wrong, and the thread sentences go into the notebook: ▶ "Hammer and saw both have a handle.", "What do hammer and saw both have?", "Objection! What about ruler?", "True — nails join the family through hammer." "pliers" is not marked plural (▶ `pliers.plural` is undefined), so in f2-5 "Nails and pliers both join…" gets the answer "Not true: pliers doesn't join things together."
   Replace: change the names to `"the hammer"`, `"the saw"`, `"the ruler"`, `"the glue-pot"` and `"the screwdriver"`. Change the pliers line to `{ ...tool("pliers", "the pliers", ["modify", "handle", "cut", "metal"]), plural: true }`. `cap()` already gives "The hammer and the saw…". The tiles will then read "the hammer"; add a separate tile label if that is unwanted.
2. **[E] FamilyGame.tsx templates › f1-4, f1-5, f1-6, f2-4, f2-5.** The pattern "A and B both + phrase" puts "both" before *be* and *can*: "Football and poker both are played in a group", "…both can be played alone". The norm is "are both" and "can both". The error message is ungrammatical: ▶ "Chess and football don't both are played with a ball." Both family `english` lines promise "'both … and'", which never appears.
   Replace:
   - the sentence (lines 264 and 375; also reorder the sentence builder at 437–442): `Both ${A} and ${B} ${f.plural}.`
   - the error message (line 269): `It isn't true that both ${A} and ${B} ${f.plural}.`
   - the prompts (lines 246 and 248): `What do ${A} and ${B} have in common?` and `Tap a card that shares something with ${last?.name}.`
3. **[2][C] cafe/rounds.ts › c2-5.** Only pushing counts ("Go on — it's on the house."). The light check never counts, although it is the safer move in English and the round's own free ask gets a warm answer with it ("Are you sure? There's plenty."). Learners whose culture expects a host to insist after a first refusal (common in China) get that habit confirmed.
   Replace:
   - the fitting option: `say("“Are you sure? Just a small piece?”", true, "Well… if you insist. Just a small one.")`
   - the ask: `{ question: "Is it too sweet for you?", answer: "No, no, it's lovely. I'm just being polite." }`
   - the note: "In English a first 'no' usually means no, so check once, lightly, and don't push. Here her smile and her eyes on the cake invite that check. In some cultures a host is expected to insist after a refusal; in English that can feel pushy."
4. **[W] cafe/rounds.ts › c1-2 note.** "Wittgenstein: for many words, meaning is their use (PI §43)" misstates §43. The section speaks of "a large class of cases … in which we employ the word 'meaning'" (»für eine große Klasse von Fällen der Benützung des Wortes ›Bedeutung‹«), not of many words. The note turns it into the slogan that the pi-43 `limits` warns against.
   Replace: "The same sentence as before, but a different job. Wittgenstein: “For a large class of cases … the meaning of a word is its use in the language” (PI §43)."
5. **[E] family/rounds.ts › f2-3 and TOOL_FEATURES.** Only the ruler measures, so the accepted strongest claim is ▶ "Some of these tools measure." Two things are wrong with it: "some of these tools" means more than one, and "measure" without an object sounds incomplete. The family-2 `english` line also promises "'is used to…'", but no sentence contains it.
   Replace the three features:
   - join: `"are used to join things"` / `"is used to join things"`
   - cut: `"are used to cut things"` / `"is used to cut things"`
   - measure: `"are used to measure things"` / `"is used to measure things"`

   `negate()` then gives "is not used to…". Replace f2-3 with `feature: "cut", hint: "Which of these could cut a plank or a wire?"`. The claim becomes "Some of these tools are used to cut things." (the saw and the pliers).
6. **[2] pupil/levels.ts › p-2 twist.** Without context, "two persons" is the learner error a teacher corrects, so "Correct it" is as reasonable as the accepted "Both are in use". The `why` says it depends on the game, but the prompt names no game.
   Replace the prompt: "The pupil copies the sign in a lift: “Maximum 8 persons”. Your notes only have “people”."
7. **[2] builder/rounds.ts › b4-3.** The accepted answer, "No — it's a beam.", needs a fact the player never gets. Also, a beam is one of the four words the builder knows, so the clue "a stone he has not seen before" contradicts the answer.
   Replace clue 1: "You are carrying a beam. From the scaffold he can't see it clearly."
8. **[E] builder/engine.ts:82 and BuilderGame.tsx:575 › b3-5, b3-6.** ▶ Saying "This slab!" while pointing at the arch returns "That one is a arch, not a slab." In b3-6 the screen reader reads the arch button as "Point at a arch".
   Replace: add `const an = (s: Stone) => (s === "arch" ? "an arch" : "a " + s);`, then use `That one is ${an(pointed)}, not ${an(stone)}.` and `Point at ${known ? an(k.stone) : "the curved stone"}`.
9. **[W] cafe/rounds.ts › c1-6 note.** §23's list has no complaining. It ends "Asking, thanking, cursing, greeting, praying" (»Bitten, Danken, Fluchen, Grüßen, Beten«).
   Replace the last sentence: "§23 lists giving orders, asking and greeting among many language-games; hinting and complaining are more of the same kind."
10. **[W] pupil/levels.ts › p-1 twist `why`.** "that takes practice (§201)": the word "practice" belongs to §202, where it means a shared custom, not drill. §201 makes a different point.
    Replace the last sentence: "Knowing a rule is not yet knowing how to apply it in every case: grasping a rule shows in what you do, case by case (PI §201)." The German is »von Fall zu Fall der Anwendung«.
11. **[E] cafe/rounds.ts › c1-4.** People don't ask about someone's chances with "Can you pass the exam?", and a driving test is never "the exam".
    Replace `says`: "So — can you pass the test, do you think?" The note's "Can you pass…?" frame still holds.
12. **[C] cafe/rounds.ts › c2-2 reaction.** "…I'll wait for the other girl." assumes the player is female and calls an adult colleague a girl.
    Replace: "…I'll wait for the manager, dear."
13. **[E][C] cafe/rounds.ts › c3-6 note and cafe-3 `english`.** The note says "Three uses of one phrase", but only two are played. The `english` line promises "apologies", but no round has one. Learners are also not told that a sharp "Excuse me?" can sound offended.
    Replace the `english` line: "'Would you like to…?', 'I'm fine', 'Excuse me' — offers, instructions, greetings, reassurances and requests".
    Replace the note: "With a rising voice, 'Excuse me?' means 'I didn't hear — please say it again'. 'Sorry?' and 'Pardon?' do the same job and are more usual in Britain. Said sharply, 'Excuse me?!' can mean 'How rude!'. A third job: 'Excuse me!' after you bump into someone is an apology."
14. **[E] builder/rounds.ts › b2-1 hint.** "Plural nouns end in -s" is false (people, children, men). The pupil game's person/people twist teaches the opposite.
    Replace: "Two means two. Most nouns add -s for the plural: slabs."
15. **[W] sources.ts glosses** (all shown on /sources):
    - pi-217: "Why 'an hour' and not 'a hour'?" has a reason, and the pupil game teaches it (vowel sound). Replace: "Why does English choose 'a' or 'an' by sound and not by spelling? At some point the reasons stop, and there is just what English speakers do."
    - pi-198: the gloss says the precise explanation worked "because the pupil already knew". In the game it works only after examples rule out the misreading (`needs.ruledOut`). Replace the second sentence: "The precise one worked only after your examples had ruled out the pupil's own reading: the explanation needed the practice behind it."
    - tlp-5.6 (also on the home page): the vocabulary reading is not what the Tractatus means, and the entry has no `limits`. Add: "In the Tractatus this line is about logic and the self (5.6–5.641), not vocabulary; the learning reading is ours."
    - pi-43: change "what 'It's cold in here' means depended" to "what 'It's a bit cold in here' meant depended". That is the café's actual line, and the tense is then consistent.
    - tlp-2.1: change "In the early Tractatus" to "In the Tractatus, his early book,". Append "(1922 English: today we would say 'We picture facts to ourselves'.)" so learners don't copy the old phrasing.
    - pi-8: append "('Connexion' is an old spelling of 'connection'.)"
16. **[W] pupil/levels.ts › p-4 twist `why`.** §217 is about one person's justifications running out. The point here, that the rule runs out and usage decides, is §84.
    Replace the bracket: "(PI §84: the application of a word “is not everywhere bounded by rules”)". The German is »nicht überall von Regeln begrenzt«.
17. **[2][E] builder/rounds.ts › b4-2, b4-6.** Writing on the stock list is the only accepted move, but nothing says the list is yours. "Counting the pile with her clipboard" is also unnatural.
    Replace b4-2 clue 2 with "She is counting the pile." Add to both rounds the clue "You are holding the stock list."
18. **[E] cafe/rounds.ts › cafe-2 `english`.** It promises "'Do you mean…?', 'Which one?', 'the one with…'", but none of these occurs in cafe-2.
    Replace the c2-1 ask with "Do you mean the lemon one or the chocolate one?" Replace the `english` line with "Clarifying questions: 'Do you mean…?', 'The … one or the … one?', 'The other what, sorry?'".
19. **[L] builder-1, builder-2, scene-1 `english`.** One-word orders, number + plural -s, and in/on/next to are A1–A2 targets in a B1–B2 product.
    Replace the `english` lines:
    - builder-1: "Warm-up (A2): one-word orders; a bare noun as a whole request"
    - builder-2: "Warm-up (A2): numbers, plurals, 'there' with a gesture"
    - scene-1: "Warm-up (A2): in, on, next to, to the left of; two facts true at once"
20. **[C][L] family/rounds.ts › GAMES, f1-6.** "patience" reads as the virtue ("Tap the next card to join to patience."). "ring-a-ring-a-roses" is a British name most learners won't know. In f1-6 the lottery is marked as played in a group, which it isn't, so "The lottery and poker both are played in a group" is accepted.
    Replace the names with "patience (solitaire)" and "ring-a-ring-a-roses (a circle game)". Replace the lottery card with `card("lottery", "the lottery", ["winner", "luck"], ["group"])`.
21. **[E] cafe/rounds.ts › c1-3 note.** "the work of a polite order" contradicts the round's own `use`, which says "a request". Replace "polite order" with "polite request".
22. **[E] cafe/rounds.ts › c2-1 clue.** "(he told you yesterday)" contradicts c2-2, "You started work here today." Replace: "He is allergic to chocolate (he told you when he came in)."
23. **[E] scene/rounds.ts hints and scene/engine.ts:136.**
    - s1-5: "on the same row" → "in the same row" (the app says "in the back row" elsewhere).
    - s2-3: "The sentence must name the thing it is on" (it already names the book) → "Where is the ball really — inside the book, or on top of it?"
    - engine.ts:136, screen-reader text: "The cup is at left of centre" is ungrammatical. Use the list `["at the far left", "just left of centre", "just right of centre", "at the far right"]` and drop the "at" before it.
24. **[L] cafe/rounds.ts reactions.** These words are rare for B1–B2 readers:
    - c3-4: "(She winces.)" → "(It clearly hurts.)"
    - c1-6: "(She jingles the keys.)" → "(She shakes the keys.)"
25. **[W] builder/rounds.ts › `CallRound.teaches` comment.** "as in an ostensive definition (PI §6)": §6 declines that name and speaks of the ostensive teaching of words (»hinweisendes Lehren der Wörter«). Replace: "as in the ostensive teaching of words (PI §6)".

Not covered: no browser playthrough and no test with learners; PPF xi in German; the register calls in items 3, 11 and 13 rest on one reviewer's judgement.
