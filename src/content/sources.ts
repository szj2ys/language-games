// Every passage the games lean on. Quotations are short and attributed:
// Tractatus in C. K. Ogden's 1922 translation (public domain); Philosophical
// Investigations in G. E. M. Anscombe's translation (short quotation for
// teaching); On Certainty in Paul & Anscombe. `gloss` is our plain-English
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
    gloss:
      "Wittgenstein imagines a complete language of four words. 'Slab!' does not need a definition: it works because B brings a slab.",
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
    limits: "Wittgenstein adds that pointing only works for someone already trained in the game; a gesture alone does not fix a meaning (§§28–30).",
    url: PI_URL,
  },
  "pi-7": {
    id: "pi-7",
    work: "PI",
    ref: "§7",
    quote:
      "I shall also call the whole, consisting of language and the actions into which it is woven, the 'language-game'.",
    gloss: "Words and actions together make a language-game. You just played one.",
    url: PI_URL,
  },
  "pi-8": {
    id: "pi-8",
    work: "PI",
    ref: "§8",
    quote:
      "Let us now look at an expansion of language (2). Besides the four words \"block\", \"pillar\", etc., let it contain a series of words used as the shopkeeper in (1) used the numerals … further, let there be two words, which may as well be \"there\" and \"this\" … that are used in connexion with a pointing gesture",
    gloss:
      "Add numbers and pointing words, and the same four-word game can do much more: 'Two slabs — there!'",
    url: PI_URL,
  },
  "pi-19": {
    id: "pi-19",
    work: "PI",
    ref: "§§19–20",
    quote: "…is the call \"Slab!\" in example (2) a sentence or a word?",
    gloss:
      "A one-word order is not broken English. Inside a shared activity, 'Slab!' does the same job as 'Bring me a slab'.",
    url: PI_URL,
  },
  "pi-23": {
    id: "pi-23",
    work: "PI",
    ref: "§23",
    quote:
      "Here the term \"language-game\" is meant to bring into prominence the fact that the speaking of language is part of an activity, or of a form of life.",
    gloss:
      "Giving orders, asking, thanking, joking, describing: these are different games, even when they use the same words.",
    url: PI_URL,
  },
  "pi-43": {
    id: "pi-43",
    work: "PI",
    ref: "§43",
    quote:
      "For a large class of cases—though not for all—in which we employ the word \"meaning\" it can be defined thus: the meaning of a word is its use in the language.",
    gloss:
      "Note the caution: 'not for all'. Here, what 'It's cold in here' means depended on what it was being used to do.",
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
  "pi-67": {
    id: "pi-67",
    work: "PI",
    ref: "§67",
    quote:
      "I can think of no better expression to characterize these similarities than \"family resemblances\" … the strength of the thread does not reside in the fact that some one fibre runs through its whole length, but in the overlapping of many fibres.",
    gloss:
      "Your chain held together although no single feature ran through every card. That is a family resemblance.",
    limits: "Wittgenstein does not say no word has a definition; he says we should not assume one.",
    url: PI_URL,
  },
  "pi-ppf-118": {
    id: "pi-ppf-118",
    work: "PI",
    ref: "Part II, xi (PPF §§113–118)",
    quote:
      "I contemplate a face, and then suddenly notice its likeness to another. I see that it has not changed; and yet I see it differently. I call this experience \"noticing an aspect\".",
    gloss:
      "The duck-rabbit does not change on the page; what changes is how you take it. Ambiguous English sentences flip the same way.",
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
    gloss: "In the early Tractatus, a sentence works like a model: its parts stand for things, its structure for how they stand.",
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
  "tlp-5.6": {
    id: "tlp-5.6",
    work: "TLP",
    ref: "5.6",
    quote: "The limits of my language mean the limits of my world.",
    gloss: "Every word you can use is a move you can make.",
    url: TLP_URL,
  },
  "tlp-6.54": {
    id: "tlp-6.54",
    work: "TLP",
    ref: "6.54",
    quote: "He must so to speak throw away the ladder, after he has climbed up on it.",
    gloss: "The games are a ladder. Once you can use the English, you no longer need them.",
    url: TLP_URL,
  },
  "oc-115": {
    id: "oc-115",
    work: "OC",
    ref: "§115",
    quote: "If you tried to doubt everything you would not get as far as doubting anything. The game of doubting itself presupposes certainty.",
    gloss: "Some things have to stand fast for doubting to make sense at all.",
    url: OC_URL,
  },
  "oc-341": {
    id: "oc-341",
    work: "OC",
    ref: "§341",
    quote:
      "…the questions that we raise and our doubts depend on the fact that some propositions are exempt from doubt, are as it were like hinges on which those turn.",
    gloss: "'Must', 'might' and 'can't' grade our doubts. Hinges are what those doubts turn on.",
    limits: "Which propositions are hinges depends on the situation; there is no fixed list.",
    url: OC_URL,
  },
} satisfies Record<string, Source>;

export type SourceId = keyof typeof SOURCES;

export function citation(id: SourceId): string {
  const s: Source = SOURCES[id];
  return `${WORK_TITLE[s.work]} ${s.ref}`;
}
