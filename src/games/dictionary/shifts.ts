import type { Job, Shift } from "./engine";

export const SHIFTS: Shift[] = [
  {
    id: "d1",
    title: "Shift 1: four words",
    words: ["slab", "block", "beam", "pillar"],
    orders: [
      { says: "Slab!", words: ["slab"], want: { kind: "fetch", stone: "slab", count: 1, place: "you" } },
      { says: "Beam!", words: ["beam"], want: { kind: "fetch", stone: "beam", count: 1, place: "you" } },
      { says: "Block!", words: ["block"], want: { kind: "fetch", stone: "block", count: 1, place: "you" } },
      { says: "Pillar!", words: ["pillar"], want: { kind: "fetch", stone: "pillar", count: 1, place: "you" } },
    ],
  },
  {
    id: "d2",
    title: "Shift 2: new words",
    words: ["two", "three", "there", "slab", "block", "beam", "pillar"],
    orders: [
      { says: "Two slabs!", words: ["two", "slab"], want: { kind: "fetch", stone: "slab", count: 2, place: "you" } },
      { says: "Block — there!", words: ["block", "there"], points: "right", want: { kind: "fetch", stone: "block", count: 1, place: "right" } },
      { says: "Three beams!", words: ["three", "beam"], want: { kind: "fetch", stone: "beam", count: 3, place: "you" } },
      { says: "Two pillars — there!", words: ["two", "pillar", "there"], points: "left", want: { kind: "fetch", stone: "pillar", count: 2, place: "left" } },
    ],
  },
  {
    id: "d3",
    title: "Shift 3: under the crane",
    words: ["thanks", "two", "three", "there", "slab", "block", "beam", "pillar"],
    orders: [
      { says: "Slab!", words: ["slab"], want: { kind: "fetch", stone: "slab", count: 1, place: "you" } },
      { says: "Slab!", words: ["slab"], falling: true, want: { kind: "duck" } },
      { says: "Three blocks — there!", words: ["three", "block", "there"], points: "left", want: { kind: "fetch", stone: "block", count: 3, place: "left" } },
      { says: "Thanks!", words: ["thanks"], want: { kind: "nod" } },
    ],
  },
];

export const JOB_LABEL: Record<Job, string> = {
  count: "says how many",
  where: "says where (follow the pointing hand)",
  warn: "warns: get out of the way",
  thanks: "thanks: nothing to fetch, nod back",
};

/** What each finished shift showed, with the passage it comes from. */
export const LESSONS: { title: string; body: string; quote: string; ref: string }[] = [
  {
    title: "Every word names a thing — so far",
    body: "You gave each word an object, and every order worked. This is the picture Wittgenstein starts from, the one he finds in Augustine. Keep it in mind: the next shift tests it.",
    quote:
      "These words, it seems to me, give us a particular picture of the essence of human language. It is this: the individual words in language name objects—sentences are combinations of such names.",
    ref: "Philosophical Investigations §1",
  },
  {
    title: "Not every word is a name",
    body: "No stone in the yard is a “two” or a “there”. Those words worked once you wrote down what they do, not what they stand for. Words are like tools: they do different jobs.",
    quote:
      "Think of the tools in a tool-box: there is a hammer, pliers, a saw, a screw-driver, a rule, a glue-pot, glue, nails and screws.—The functions of words are as diverse as the functions of these objects.",
    ref: "Philosophical Investigations §11",
  },
  {
    title: "Same word, another job",
    body: "“Slab!” fetched a stone, and the same “Slab!” under the crane meant “get out of the way”. No single dictionary entry fixed it; the situation did. What the word meant was what it was being used to do.",
    quote:
      "For a large class of cases—though not for all—in which we employ the word \"meaning\" it can be defined thus: the meaning of a word is its use in the language.",
    ref: "Philosophical Investigations §43",
  },
];

/** The opening and closing question: what you thought before you played, and after. */
export const BELIEF = {
  question: "What makes a word mean something?",
  options: [
    { id: "names", text: "It stands for a thing, the way “slab” stands for a slab." },
    { id: "use", text: "What it is used to do, which can change with the situation." },
  ],
};

export type KitchenKind = "name" | Job | "again";

/** A new place and new words: can you tell each word's job without the helper trying it first? */
export const KITCHEN: { says: string; scene: string; answer: KitchenKind; why: string }[] = [
  { says: "Salt!", scene: "The cook holds out a hand over the soup.", answer: "name", why: "Here “salt” picks out the thing to pass, like “slab”." },
  { says: "Careful!", scene: "You reach for a pan that has just come off the flame.", answer: "warn", why: "Nothing to fetch: it stops you." },
  { says: "Three!", scene: "You are cracking eggs into a bowl.", answer: "count", why: "Three eggs: nothing in the kitchen is called “three”." },
  { says: "Again!", scene: "You have just stirred the sauce once.", answer: "again", why: "A job you never wrote in the yard: do the last thing once more." },
  { says: "There!", scene: "The cook points at an empty hook for the ladle.", answer: "where", why: "It sends the ladle where the hand points." },
];

export const KITCHEN_LABEL: Record<KitchenKind, string> = {
  name: "names a thing to pass",
  count: "says how many",
  where: "says where",
  warn: "warns",
  thanks: "thanks",
  again: "says: do it again",
};
