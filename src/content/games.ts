import type { SourceId } from "./sources";
import { titleOf, type GameSlug } from "./order";
import { SESSIONS as BUILDER } from "@/games/builder/rounds";
import { SESSIONS as SCENE } from "@/games/scene/rounds";
import { SESSIONS as CAFE } from "@/games/cafe/rounds";
import { SESSIONS as PUPIL } from "@/games/pupil/levels";
import { SESSIONS as FAMILY } from "@/games/family/rounds";

export type GameInfo = {
  slug: GameSlug;
  title: string;
  /** What you do, in one line. */
  promise: string;
  /** The English it trains. */
  english: string;
  idea: string;
  source: SourceId;
  /** Round ids, for progress. */
  rounds: string[];
  /** How to play, in plain steps — served in the HTML for readers and crawlers alike. */
  howTo: string[];
};

const ids = (sessions: { rounds: { id: string }[] }[]) => sessions.flatMap((s) => s.rounds.map((r) => r.id));

export const GAMES: GameInfo[] = [
  {
    slug: "builder",
    howTo: [
      "The builder calls out a stone: “Slab!”. Choose the stone he means and bring it.",
      "Later he adds numbers and points: “Two beams — there!”. Get the stone, the number and the place right.",
      "Then swap roles: build the call yourself from word tiles. Your assistant does exactly what you say — and asks when your call is unclear.",
      "Finally, the same words do different jobs: an order, a report, a question, a warning. Work out which.",
    ],
    title: titleOf("builder"),
    promise: "Fetch stones for a builder — then give the orders yourself.",
    english: "Orders, numbers, plurals, “this” and “there”, asking “Which one?”",
    idea: "Words get their meaning inside an activity",
    source: "pi-2",
    rounds: ids(BUILDER),
  },
  {
    slug: "scene",
    howTo: [
      "Read a short message such as “The key is in the box.” and set up the stage so it is true.",
      "Compare a report with the stage and change one word in each false sentence.",
      "Tell a partner who cannot see the stage where something is — in one sentence that leaves only one place.",
    ],
    title: titleOf("scene"),
    promise: "Build the scene a sentence describes, catch false reports.",
    english: "in, on, behind, next to, to the left of",
    idea: "A sentence is a picture of how things stand",
    source: "tlp-2.1",
    rounds: ids(SCENE),
  },
  {
    slug: "cafe",
    howTo: [
      "A visitor says something — “It's a bit cold in here.” Look at what you can see in the café.",
      "Choose what to do or say. The same words can be a request, a hint or a complaint, depending on the situation.",
      "Asking first is always allowed. After each round you see what job the words were doing.",
    ],
    title: titleOf("cafe"),
    promise: "Same words, different jobs. Read the room, then respond.",
    english: "Requests, hints, polite refusals",
    idea: "For many words, meaning is use",
    source: "pi-43",
    rounds: ids(CAFE),
  },
  {
    slug: "pupil",
    howTo: [
      "A pupil sits a five-word test, using its own idea of the rule.",
      "Show it example cards. After each one it re-sits the test with whatever rule fits everything it has seen.",
      "Get all five right with as few cards as you can — then decide what to do with a word that breaks the pattern.",
    ],
    title: titleOf("pupil"),
    promise: "Teach a stubborn pupil a rule of English with as few examples as you can.",
    english: "a/an, plurals, -ed, comparatives, -ing or to, uncountables, she watches, -ing spelling",
    idea: "Following a rule is a practice",
    source: "pi-185",
    rounds: ids(PUPIL),
  },
  {
    slug: "family",
    howTo: [
      "Six cards show things we call by one name: games, tools, languages or numbers. Make the strongest claim that is true of them: all, most, some or none.",
      "Thread every card into one chain, each link a feature two neighbours share.",
      "A newcomer arrives. Link it with “both”, or keep it at the edge with “unlike”.",
    ],
    title: titleOf("family"),
    promise: "What do all games have in common? Don't think — look.",
    english: "all / most / some / none of these; both … and; unlike",
    idea: "Family resemblance, not one shared essence",
    source: "pi-67",
    rounds: ids(FAMILY),
  },
];

/** The game after this one, for the end of a game's last session. */

export { nextGame } from "./order";
