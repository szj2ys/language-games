import type { SourceId } from "./sources";
import { SESSIONS as BUILDER } from "@/games/builder/rounds";
import { SESSIONS as SCENE } from "@/games/scene/rounds";
import { SESSIONS as CAFE } from "@/games/cafe/rounds";
import { SESSIONS as PUPIL } from "@/games/pupil/levels";
import { SESSIONS as FAMILY } from "@/games/family/rounds";

export type GameInfo = {
  slug: "builder" | "scene" | "cafe" | "pupil" | "family";
  title: string;
  /** What you do, in one line. */
  promise: string;
  /** The English it trains. */
  english: string;
  idea: string;
  source: SourceId;
  /** Round ids, for progress. */
  rounds: string[];
  minutes: string;
  /** How to play, in plain steps — served in the HTML for readers and crawlers alike. */
  howTo: string[];
};

const ids = (sessions: { rounds: { id: string }[] }[]) => sessions.flatMap((s) => s.rounds.map((r) => r.id));

export const GAMES: GameInfo[] = [
  {
    slug: "builder",
    howTo: [
      "The builder calls out a stone: “Slab!”. Tap the stone he means and bring it.",
      "Later he adds numbers and points: “Two beams — there!”. Get the stone, the number and the place right.",
      "Then swap roles: build the call yourself from word tiles. Your assistant does exactly what you say — and asks when your call is unclear.",
    ],
    title: "Slab!",
    promise: "Fetch stones for a builder — then give the orders yourself.",
    english: "Orders, numbers, plurals, “this” and “there”",
    idea: "Words get their meaning inside an activity",
    source: "pi-2",
    rounds: ids(BUILDER),
    minutes: "3 × 3 min",
  },
  {
    slug: "scene",
    howTo: [
      "Read a short message such as “The key is in the box.” and set up the stage so it is true.",
      "Compare a report with the stage and change one word in each false sentence.",
      "Tell a partner who cannot see the stage where something is — in one sentence that leaves only one place.",
    ],
    title: "Picture Theatre",
    promise: "Build the scene a sentence describes, catch false reports.",
    english: "in, on, behind, next to, left of",
    idea: "A sentence is a picture of how things stand",
    source: "tlp-2.1",
    rounds: ids(SCENE),
    minutes: "3 × 3 min",
  },
  {
    slug: "cafe",
    howTo: [
      "A visitor says something — “It's a bit cold in here.” Look at what you can see in the café.",
      "Choose what to do or say. The same words can be a request, a hint or a complaint, depending on the situation.",
      "Asking first is always allowed. After each round you see what job the words were doing.",
    ],
    title: "The Café",
    promise: "Same words, different jobs. Read the room, then respond.",
    english: "Requests, hints, polite refusals",
    idea: "For many words, meaning is use",
    source: "pi-43",
    rounds: ids(CAFE),
    minutes: "2 × 3 min",
  },
  {
    slug: "pupil",
    howTo: [
      "A pupil sits a five-word test, using its own idea of the rule.",
      "Show it example cards. After each one it re-sits the test with whatever rule fits everything it has seen.",
      "Get all five right with as few cards as you can — then decide what to do with a word that breaks the pattern.",
    ],
    title: "Go On!",
    promise: "Teach a stubborn pupil a spelling rule with as few examples as you can.",
    english: "a/an, plurals, -ed, comparatives",
    idea: "Following a rule is a practice",
    source: "pi-185",
    rounds: ids(PUPIL),
    minutes: "4 × 2 min",
  },
  {
    slug: "family",
    howTo: [
      "Six cards show things we call games. Make the strongest claim that is true of them: all, most, some or none.",
      "Thread every card into one chain, each link a feature two neighbours share.",
      "A newcomer arrives. Link it with “both”, or keep it at the edge with “unlike”.",
    ],
    title: "Family Threads",
    promise: "What do all games have in common? Don't think — look.",
    english: "all / most / some / none of these; both … and; unlike",
    idea: "Family resemblance, not one shared essence",
    source: "pi-67",
    rounds: ids(FAMILY),
    minutes: "2 × 4 min",
  },
];
