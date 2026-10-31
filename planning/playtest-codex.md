# Production play-test defects

1. **Incorrect English rule: a short vowel is not required in “preferred”.**
   - Page/session/round: `/play/pupil` → **Teach the pupil**, round 3; phone 390×844 and desktop 1440×900.
   - Steps: reach the past-tense lesson; read the second “Explain” choice and the pupil's marked answers.
   - Saw: “double a final consonant only after a short, stressed vowel” is offered as the precise rule, while **preferred** is marked correct; its stressed vowel is not short. A learner following that explanation cannot derive the displayed answer.
   - Screenshot: `qa/playtest-codex/scene-pupil/phone-pupil-1-3-explanation.png`.
   - Fix: describe the spelling pattern (single vowel letter + final consonant in a stressed final syllable), with the relevant exceptions; do not make a short vowel sound a necessary condition. See [Cambridge pronunciation](https://dictionary.cambridge.org/pronunciation/english/prefer) and [the spelling rule](https://our-languages.canada.ca/en/writing-tips-plus/spelling-final-consonants-doubled-before-a-suffix).

2. **“Ask first” consumes the clarification without displaying it after a mistake.**
   - Page/session/round: `/play/cafe` → **Same words, new job**, round 1 (also reproduced in other ask-enabled rounds); both sizes.
   - Steps: choose “Bring her a fresh hot tea.”, then tap “Ask first”; reload.
   - Saw: the ask button disappears, but Rosa's old wrong-answer response remains (“Thank you — but this one is still hot…”); the requested clarification never appears. Reload preserves the broken state.
   - Screenshot: `qa/playtest-codex/cafe-family/cafe-phone-s1-r1-ask-after-wrong.png`.
   - Fix: make asking replace the displayed response with the clarification even when an answer was already selected; preserve that response on reload.

3. **The picture teaches “above” while the answer requires “on”.**
   - Page/session/round: `/play/scene` → **True or false?**, round 5; both sizes.
   - Steps: reach the report with a cup in a box and a key over a book; change the key's relation to “on” and check against the stage.
   - Saw: the game accepts “The key is on the book”, but the key is visibly suspended above the cover rather than resting on it; unchanged after waiting 2.5 seconds in a fresh browser context.
   - Screenshot: `qa/playtest-codex/scene-pupil/desktop-scene-2-5-settled.png`.
   - Fix: anchor the key's visible lower edge to the book's top surface, accounting for transparent image padding; verify every supported “on” pairing.

4. **The smoking twist invents a teaching example and leaves its grading ambiguous.**
   - Page/session/round: `/play/pupil` → **Rules with no rule**, round 1, final twist; both sizes.
   - Steps: teach the five verb forms; open “Now a word it hasn't seen”; choose “Correct it”.
   - Saw: the prompt contrasts the pupil's “He stopped to smoke” with “Your example sentence said ‘He stopped smoking’”, then marks correction “Not this time” while explaining that the meanings differ. The teaching cards never supplied that smoking example either.
   - Screenshot: `qa/playtest-codex/scene-pupil/phone-pupil-2-1-judged.png`.
   - Fix: ask explicitly whether both sentences can be grammatical, removing the invented example history; alternatively, accept correction when the task is to preserve the example's meaning.

5. **The clarification question runs outside the phone viewport.**
   - Page/session/round: `/play/cafe` → **Which one?**, round 1; phone 390×844.
   - Steps: select “Which one?” in the session picker and read the “Ask first” button about lemon/chocolate cake.
   - Saw: the single-line question extends beyond its button and clips at the screen edge; document width becomes 455px in a 390px viewport.
   - Screenshot: `qa/playtest-codex/cafe-family/cafe-phone-s2-r1-viewport.png`.
   - Fix: allow the button text to wrap, use automatic height, and constrain it to the available width.

6. **Reload discards the unfinished chain link and its correction.**
   - Page/session/round: `/play/family` → **What is a game?**, round 4; both sizes.
   - Steps: start the chain with chess, select poker, try a false shared feature, then reload before repairing it.
   - Saw: chess survives, but the selected poker card, feature choices and corrective feedback disappear; the learner must select poker again to resume.
   - Screenshots: `qa/playtest-codex/cafe-family/family-phone-s1-r4-wrong.png` → `qa/playtest-codex/cafe-family/family-phone-s1-r4-reloaded.png`.
   - Fix: save and restore the pending card and feedback together with the chain draft.

7. **The tool-name card cuts off “screwdriver” on the phone.**
   - Page/session/round: `/play/family` → **What is a tool?**, round 5; phone 390×844.
   - Steps: reach the nails newcomer round and read the six reference cards.
   - Saw: the screwdriver card clips the last letters of its vocabulary label because all six cards occupy one narrow row.
   - Screenshot: `qa/playtest-codex/cafe-family/family-phone-s2-r5-prompt.png`.
   - Fix: use two rows of three cards on phones, or provide enough width and word wrapping to show each complete name.
