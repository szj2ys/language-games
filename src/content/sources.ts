// Every passage the games lean on. Quotations are short and attributed:
// Tractatus in C. K. Ogden's 1922 translation (public domain); Philosophical
// Investigations in G. E. M. Anscombe's translation (short quotation for
// teaching); On Certainty in Paul & Anscombe. `gloss` is our plain
// reading; `limits` says where the game's analogy stops.

export type Work = "PI" | "TLP" | "OC";

export type Source = {
  id: string;
  work: Work;
  /** Section (PI, OC) or proposition number (TLP). */
  ref: string;
  quote: string;
  gloss: string;
  limits?: string;
  url: string;
};

const PI_URL = "https://www.wittgensteinproject.org/w/index.php/Philosophische_Untersuchungen";
const TLP_URL = "https://www.wittgensteinproject.org/w/index.php/Tractatus_Logico-Philosophicus_(English)";
const OC_URL = "https://www.wittgensteinproject.org/w/index.php/%C3%9Cber_Gewi%C3%9Fheit";

export const WORK_TITLE: Record<Work, string> = {
  PI: "Philosophical Investigations",
  TLP: "Tractatus Logico-Philosophicus",
  OC: "On Certainty",
};

export const SOURCES = {
  "pi-2": {
    id: "pi-2",
    work: "PI",
    ref: "§2",
    quote:
      "A is building with building-stones: there are blocks, pillars, slabs and beams. B has to pass the stones, and that in the order in which A needs them.",
    gloss: "Wittgenstein imagines a complete language of four words. 'Slab!' does not need a definition: it works because B brings a slab.",
    limits: "His builders are a thought experiment, not a theory of how children learn.",
    url: PI_URL,
  },
  "pi-6": {
    id: "pi-6",
    work: "PI",
    ref: "§6",
    quote:
      "An important part of the training will consist in the teacher's pointing to the objects, directing the child's attention to them, and at the same time uttering a word; for instance, the word \"slab\" as he points to that shape.",
    gloss:
      "You had no word for the curved stone, so you pointed and said 'this'. Pointing plus a word is how the builders' vocabulary grows.",
    limits:
      "Wittgenstein adds that pointing only works for someone already trained in the game; a gesture alone does not fix a meaning (§§28–30).",
    url: PI_URL,
  },
  "pi-7": {
    id: "pi-7",
    work: "PI",
    ref: "§7",
    quote: "I shall also call the whole, consisting of language and the actions into which it is woven, the 'language-game'.",
    gloss: "Words and actions together make a language-game. You just played one.",
    url: PI_URL,
  },
  "pi-8": {
    id: "pi-8",
    work: "PI",
    ref: "§8",
    quote:
      'Let us now look at an expansion of language (2). Besides the four words "block", "pillar", etc., let it contain a series of words used as the shopkeeper in (1) used the numerals … further, let there be two words, which may as well be "there" and "this" … that are used in connexion with a pointing gesture',
    gloss:
      "Add numbers and pointing words, and the same four-word game can do much more: “Two slabs — there!”. Each new kind of word does a different kind of job.",
    url: PI_URL,
  },
  "pi-11": {
    id: "pi-11",
    work: "PI",
    ref: "§11",
    quote:
      "Think of the tools in a tool-box: there is a hammer, pliers, a saw, a screw-driver, a rule, a glue-pot, glue, nails and screws.—The functions of words are as diverse as the functions of these objects. (And in both cases there are similarities.)",
    gloss: "Tools share no single job, yet they are not a random heap: there are similarities. Words are like that too.",
    url: PI_URL,
  },
  "pi-14": {
    id: "pi-14",
    work: "PI",
    ref: "§14",
    quote:
      'Imagine someone\'s saying: "All tools serve to modify something. … "—And what is modified by the rule, the glue-pot, the nails?',
    gloss: "You can force one definition onto every tool, but only by twisting the words. The ruler was the counterexample.",
    url: PI_URL,
  },
  "pi-18": {
    id: "pi-18",
    work: "PI",
    ref: "§18",
    quote:
      "Our language can be seen as an ancient city: a maze of little streets and squares, of old and new houses, and of houses with additions from various periods; and this surrounded by a multitude of new boroughs with straight regular streets and uniform houses.",
    gloss:
      "Wittgenstein compares the symbolism of chemistry and the notation of the calculus to new suburbs of an old city. The game extends the comparison to music notation and road signs: each built for one job, joined to the old town. Is the town ever complete?",
    limits:
      "Wittgenstein asks whether a language of orders alone is 'incomplete'; he does not settle what counts as a language by definition.",
    url: PI_URL,
  },
  "pi-19": {
    id: "pi-19",
    work: "PI",
    ref: "§§19–20",
    quote: '…is the call "Slab!" in example (2) a sentence or a word?',
    gloss:
      "“Slab!” is not a shortened sentence missing its other words. Inside the builders' activity it does the whole job that “Bring me a slab!” does.",
    url: PI_URL,
  },
  "pi-21": {
    id: "pi-21",
    work: "PI",
    ref: "§21",
    quote:
      'We could imagine a language in which all statements had the form and tone of rhetorical questions; or every command the form of the question "Would you like to …?"',
    gloss:
      "The grammatical form of a sentence does not fix its job. The same words can report, order or ask; the difference lies in the part they play.",
    url: PI_URL,
  },
  "pi-23": {
    id: "pi-23",
    work: "PI",
    ref: "§23",
    quote:
      'Here the term "language-game" is meant to bring into prominence the fact that the speaking of language is part of an activity, or of a form of life.',
    gloss: "Giving orders, asking, thanking, joking, describing: these are different games, even when they use the same words.",
    url: PI_URL,
  },
  "pi-27": {
    id: "pi-27",
    work: "PI",
    ref: "§27",
    quote:
      'Think of exclamations alone, with their completely different functions. Water! Away! Ow! Help! Fine! No! Are you inclined still to call these words "names of objects"?',
    gloss: "“Slab!” shouted as a warning is not naming a stone. One-word calls do many different jobs.",
    url: PI_URL,
  },
  "pi-43": {
    id: "pi-43",
    work: "PI",
    ref: "§43",
    quote:
      'For a large class of cases—though not for all—in which we employ the word "meaning" it can be defined thus: the meaning of a word is its use in the language.',
    gloss: "Note the caution: 'not for all'. Here, what 'It's a bit cold in here' meant depended on what it was being used to do.",
    limits: "This is not a slogan that meaning is always and only use.",
    url: PI_URL,
  },
  "pi-66": {
    id: "pi-66",
    work: "PI",
    ref: "§66",
    quote:
      "Don't say: \"There must be something common, or they would not be called 'games'\"—but look and see whether there is anything common to all. … To repeat: don't think, but look!",
    gloss: "Instead of hunting for a definition of 'game', look at the actual games and how they overlap.",
    url: PI_URL,
  },
  "pi-67-number": {
    id: "pi-67-number",
    work: "PI",
    ref: "§67",
    quote:
      "And for instance the kinds of number form a family in the same way. Why do we call something a “number”? Well, perhaps because it has a — direct — relationship with several things that have hitherto been called number; and this can be said to give it an indirect relationship to other things we call the same name.",
    gloss:
      "In this game, fractions and whole numbers both measure amounts, negative and whole numbers can both be added, and route numbers name buses. No one use runs through every card.",
    limits:
      "Wittgenstein makes the point about how we extend a concept; the game does not decide whether bus numbers are “really” numbers.",
    url: PI_URL,
  },
  "pi-67": {
    id: "pi-67",
    work: "PI",
    ref: "§67",
    quote:
      'I can think of no better expression to characterize these similarities than "family resemblances" … the strength of the thread does not reside in the fact that some one fibre runs through its whole length, but in the overlapping of many fibres.',
    gloss: "Your chain held together although no single feature ran through every card. That is a family resemblance.",
    limits: "Wittgenstein does not say no word has a definition; he says we should not assume one.",
    url: PI_URL,
  },
  "pi-185": {
    id: "pi-185",
    work: "PI",
    ref: "§185",
    quote: "Now we get the pupil to continue a series (say +2) beyond 1000—and he writes 1000, 1004, 1008, 1012.",
    gloss:
      "Every example the pupil had seen fitted its own way of going on too. Examples alone never settle which rule someone is following.",
    limits: "The game's deviant ways are a short, fixed list; Wittgenstein's point is that no finite list of examples rules out every one.",
    url: PI_URL,
  },
  "pi-198": {
    id: "pi-198",
    work: "PI",
    ref: "§198",
    quote:
      "…any interpretation still hangs in the air along with what it interprets, and cannot give it any support. Interpretations by themselves do not determine meaning.",
    gloss:
      "A loose explanation was one more sign to interpret, and the pupil read it its own way. The precise one worked only after your examples had ruled out the pupil's own reading: the explanation needed the practice behind it.",
    limits:
      "The pupil's few ways of going on are a toy model. Wittgenstein's point is not that explanations fail, but that none works without a practice of using it (§§198–202).",
    url: PI_URL,
  },
  "pi-202": {
    id: "pi-202",
    work: "PI",
    ref: "§§201–202",
    quote: "And hence also 'obeying a rule' is a practice.",
    gloss:
      "What settles the next step is not a formula in the pupil's head but a shared practice. That is why sometimes the right call was “both are in use”.",
    limits: "This is not scepticism: Wittgenstein does not say any answer is as good as any other.",
    url: PI_URL,
  },
  "pi-217": {
    id: "pi-217",
    work: "PI",
    ref: "§217",
    quote:
      'If I have exhausted the justifications I have reached bedrock, and my spade is turned. Then I am inclined to say: "This is simply what I do."',
    gloss:
      "Ask for the reason behind a rule, then the reason behind that. At some point the reasons run out, and there is just what we do.",
    url: PI_URL,
  },
  "pi-133": {
    id: "pi-133",
    work: "PI",
    ref: "§133",
    quote: "The real discovery is the one that makes me capable of stopping doing philosophy when I want to.",
    gloss: "The later Wittgenstein's version of the ladder: the point is not to keep climbing, but to be able to stop.",
    url: PI_URL,
  },
  "pi-ppf-118": {
    id: "pi-ppf-118",
    work: "PI",
    ref: "Part II, xi (PPF §§113–118)",
    quote:
      'I contemplate a face, and then suddenly notice its likeness to another. I see that it has not changed; and yet I see it differently. I call this experience "noticing an aspect".',
    gloss: "The duck-rabbit does not change on the page; what changes is how you take it.",
    limits: "Wittgenstein writes about seeing pictures; extending it to sentence structure is our analogy.",
    url: PI_URL,
  },
  "pi-109": {
    id: "pi-109",
    work: "PI",
    ref: "§109",
    quote: "Philosophy is a battle against the bewitchment of our intelligence by means of language.",
    gloss: "A sentence's surface can mislead you about how it works. Seeing both readings breaks the spell.",
    url: PI_URL,
  },
  "tlp-2.1": {
    id: "tlp-2.1",
    work: "TLP",
    ref: "2.1",
    quote: "We make to ourselves pictures of facts.",
    gloss:
      "In the Tractatus, his early book, a sentence works like a model: its parts stand for things, and their arrangement shows how the things stand. (In the 1922 translation, “make to ourselves pictures” means “picture”.)",
    limits: "Wittgenstein later criticised this picture view; the game shows the early idea, not his final word.",
    url: TLP_URL,
  },
  "tlp-2.21": {
    id: "tlp-2.21",
    work: "TLP",
    ref: "2.21",
    quote: "The picture agrees with reality or not; it is right or wrong, true or false.",
    gloss: "A description can be perfectly clear and still false. You understood the report before you knew whether it fit.",
    url: TLP_URL,
  },
  "tlp-4.01": {
    id: "tlp-4.01",
    work: "TLP",
    ref: "4.01",
    quote: "The proposition is a picture of reality.",
    gloss: "'The key is in the box' pictures a key and a box standing in one relation. Change the relation word, change the picture.",
    url: TLP_URL,
  },
  "tlp-4.112": {
    id: "tlp-4.112",
    work: "TLP",
    ref: "4.112",
    quote: "Philosophy is not a theory but an activity.",
    gloss: "For Wittgenstein, philosophy is something you do: making thoughts clear. These games take him at his word.",
    url: TLP_URL,
  },
  "tlp-4.0621": {
    id: "tlp-4.0621",
    work: "TLP",
    ref: "4.0621",
    quote: "The propositions “p” and “~p” have opposite senses, but to them corresponds one and the same reality.",
    gloss:
      "“The key is in the box” and “The key is not in the box” are about the same key and box; one of them fits the stage. A “not” sentence rules a picture out and leaves many open.",
    limits: "Wittgenstein's point is about what negation does in logic; the game shows it with places on a stage.",
    url: TLP_URL,
  },
  "tlp-5.6": {
    id: "tlp-5.6",
    work: "TLP",
    ref: "5.6",
    quote: "The limits of my language mean the limits of my world.",
    gloss: "In the Tractatus, what can be said is what can be pictured. What lies beyond that cannot be said, only shown.",
    limits: "Lines 5.6–5.641 go on to the self and solipsism; the game does not explain that part.",
    url: TLP_URL,
  },
  "tlp-6.54": {
    id: "tlp-6.54",
    work: "TLP",
    ref: "6.54",
    quote: "He must so to speak throw away the ladder, after he has climbed up on it.",
    gloss:
      "Wittgenstein calls his own propositions a ladder to be thrown away once you have climbed it. These games are ladders too: ways to see the ideas, not the ideas themselves.",
    url: TLP_URL,
  },
  "oc-115": {
    id: "oc-115",
    work: "OC",
    ref: "§115",
    quote:
      "If you tried to doubt everything you would not get as far as doubting anything. The game of doubting itself presupposes certainty.",
    gloss: "Some things have to stand fast for doubting to make sense at all.",
    url: OC_URL,
  },
  "oc-341": {
    id: "oc-341",
    work: "OC",
    ref: "§341",
    quote:
      "…the questions that we raise and our doubts depend on the fact that some propositions are exempt from doubt, are as it were like hinges on which those turn.",
    gloss: "Doubting needs something it does not doubt, as a door needs hinges that stay put.",
    limits: "Which propositions are hinges depends on the situation; there is no fixed list.",
    url: OC_URL,
  },
  "pi-244": {
    id: "pi-244",
    work: "PI",
    ref: "§244",
    quote:
      "Here is one possibility: words are connected with the primitive, the natural, expressions of the sensation and used in their place. A child has hurt himself and he cries; and then adults talk to him and teach him exclamations and, later, sentences. They teach the child new pain-behaviour.",
    gloss: "“It hurts” is not learned by naming something only the child can see. It is learned as a new way of crying out.",
    limits: "This is “one possibility”, offered against a picture, not a full theory of how words for sensations are learned.",
    url: PI_URL,
  },
  "pi-246": {
    id: "pi-246",
    work: "PI",
    ref: "§246",
    quote:
      "If we are using the word “to know” as it is normally used (and how else are we to use it?), then other people very often know when I am in pain.",
    gloss: "Pain is not a secret locked away. Others often know, from what I do and say, that I am in pain.",
    url: PI_URL,
  },
  "pi-258": {
    id: "pi-258",
    work: "PI",
    ref: "§258",
    quote:
      "But in the present case I have no criterion of correctness. One would like to say: whatever is going to seem right to me is right. And that only means that here we can't talk about “right”.",
    gloss: "A sign with no check on its use is not following a rule. If you cannot be wrong, you cannot be right either.",
    limits: "Wittgenstein's diary is a thought experiment about a sign for a sensation that only its writer could understand.",
    url: PI_URL,
  },
  "pi-265": {
    id: "pi-265",
    work: "PI",
    ref: "§265",
    quote: "As if someone were to buy several copies of the morning paper to assure himself that what it said was true.",
    gloss: "Checking a memory against the same memory is not a check at all.",
    url: PI_URL,
  },
  "pi-270": {
    id: "pi-270",
    work: "PI",
    ref: "§270",
    quote:
      "I discover that whenever I have a particular sensation a manometer shows that my blood-pressure rises. So I shall be able to say that my blood-pressure is rising without using any apparatus. This is a useful result. And now it seems quite indifferent whether I have recognized the sensation right or not.",
    gloss: "Once “S” is tied to something others can check, it has a use. The private “object” itself does no work.",
    url: PI_URL,
  },
  "pi-293": {
    id: "pi-293",
    work: "PI",
    ref: "§293",
    quote:
      "Suppose everyone had a box with something in it: we call it a “beetle”. No one can look into anyone else's box, and everyone says he knows what a beetle is only by looking at his beetle.—Here it would be quite possible for everyone to have something different in his box. One might even imagine such a thing constantly changing.—But suppose the word “beetle” had a use in these people's language?—If so it would not be used as the name of a thing. The thing in the box has no place in the language-game at all; not even as a something: for the box might even be empty.",
    gloss:
      "If a word worked only by naming a private object, the object would drop out: the talk goes on the same whatever is in the boxes.",
    limits:
      "Wittgenstein does not say there are no sensations. He attacks a picture of how words for them get their meaning (§304: “It is not a something, but not a nothing either!”).",
    url: PI_URL,
  },
  "oc-94": {
    id: "oc-94",
    work: "OC",
    ref: "§94",
    quote:
      "But I did not get my picture of the world by satisfying myself of its correctness; nor do I have it because I am satisfied of its correctness. No: it is the inherited background against which I distinguish between true and false.",
    gloss: "Checking happens against a background that is not itself checked.",
    url: OC_URL,
  },
  "oc-96": {
    id: "oc-96",
    work: "OC",
    ref: "§96",
    quote:
      "It might be imagined that some propositions, of the form of empirical propositions, were hardened and functioned as channels for such empirical propositions as were not hardened but fluid; and that this relation altered with time, in that fluid propositions hardened, and hard ones became fluid.",
    gloss: "Hinges look like ordinary statements of fact; what makes them hinges is the role they play, and that role can change.",
    url: OC_URL,
  },
  "oc-97": {
    id: "oc-97",
    work: "OC",
    ref: "§97",
    quote:
      "The mythology may change back into a state of flux, the river-bed of thoughts may shift. But I distinguish between the movement of the waters on the river-bed and the shift of the bed itself; though there is not a sharp division of the one from the other.",
    gloss: "Most of the time we argue about the water. Now and then the river-bed itself moves.",
    url: OC_URL,
  },
  "oc-106": {
    id: "oc-106",
    work: "OC",
    ref: "§106",
    quote:
      "Suppose some adult had told a child that he had been on the moon. The child tells me the story, and I say it was only a joke, the man hadn't been on the moon; no one has ever been on the moon; the moon is a long way off and it is impossible to climb up there or fly there.",
    gloss: "Written around 1950, this is the river-bed shifting: what was then beyond doubt was settled the other way in 1969.",
    url: OC_URL,
  },
  "oc-125": {
    id: "oc-125",
    work: "OC",
    ref: "§125",
    quote:
      "If a blind man were to ask me “Have you got two hands?” I should not make sure by looking. If I were to have any doubt of it, then I don't know why I should trust my eyes. For why shouldn't I test my eyes by looking to find out whether I see my two hands? What is to be tested by what?",
    gloss: "Some things are more certain than any test you could run on them.",
    url: OC_URL,
  },
  "oc-282": {
    id: "oc-282",
    work: "OC",
    ref: "§282",
    quote: "I cannot say that I have good grounds for the opinion that cats do not grow on trees or that I had a father and a mother.",
    gloss: "Not every certainty rests on evidence. Some are the ground evidence stands on.",
    url: OC_URL,
  },
  "oc-343": {
    id: "oc-343",
    work: "OC",
    ref: "§343",
    quote:
      "But it isn't that the situation is like this: We just can't investigate everything, and for that reason we are forced to rest content with assumption. If I want the door to turn, the hinges must stay put.",
    gloss: "Hinges are not lazy assumptions we have not had time to check. Without them, nothing could be checked at all.",
    url: OC_URL,
  },
} satisfies Record<string, Source>;

export type SourceId = keyof typeof SOURCES;

export function citation(id: SourceId): string {
  const s: Source = SOURCES[id];
  return `${WORK_TITLE[s.work]} ${s.ref}`;
}
