import type { SourceId } from "./sources";
import { GAME_ORDER, stopOf, type GameSlug } from "./order";
import { SESSIONS as BUILDER } from "@/games/builder/rounds";
import { SESSIONS as SCENE } from "@/games/scene/rounds";
import { SESSIONS as CAFE } from "@/games/cafe/rounds";
import { SESSIONS as PUPIL } from "@/games/pupil/levels";
import { SESSIONS as FAMILY } from "@/games/family/rounds";
import { SESSIONS as BEETLE } from "@/games/beetle/rounds";
import { SESSIONS as HINGES } from "@/games/hinges/rounds";

export type GameInfo = {
  slug: GameSlug;
  /** Its place on the path, early Wittgenstein to late. */
  step: number;
  /** The idea, which is also the game's name. */
  title: string;
  /** Where in Wittgenstein's writing the idea lives. */
  work: string;
  /** What you do, in one line. */
  promise: string;
  /** The idea in one plain sentence. */
  idea: string;
  source: SourceId;
  /** Round ids, for progress. */
  rounds: string[];
  /** How to play, in plain steps — served in the HTML for readers and crawlers alike. */
  howTo: string[];
};

const ids = (sessions: { rounds: { id: string }[] }[]) => sessions.flatMap((s) => s.rounds.map((r) => r.id));

const CONTENT: Record<GameSlug, Omit<GameInfo, "slug" | "step" | "title" | "work">> = {
  scene: {
    promise: "Build the scene a sentence describes, then catch the false reports.",
    idea: "A sentence pictures a possible fact: true if things stand as it shows, false if not.",
    source: "tlp-2.1",
    rounds: ids(SCENE),
    howTo: [
      "Read a message such as “The key is in the box.” and set up the stage so that it is true.",
      "Compare a report with the stage and change one word in each false sentence.",
      "Tell a partner who cannot see the stage where something is, in one sentence that leaves only one possibility.",
    ],
  },
  builder: {
    promise: "Fetch stones for a builder, then give the orders yourself.",
    idea: "Words get their meaning inside an activity: four words can be a complete language.",
    source: "pi-2",
    rounds: ids(BUILDER),
    howTo: [
      "The builder calls out a stone: “Slab!”. Bring the stone he means.",
      "Later he adds numbers and pointing: “Two slabs — there!”. Each kind of word does a different job.",
      "Then give the orders yourself. Your assistant does exactly what you say, and asks when the call is unclear.",
      "Finally, the same words do different jobs: an order, a report, a question, a warning. Work out which.",
    ],
  },
  cafe: {
    promise: "Same words, different jobs. Read the situation, then respond.",
    idea: "For a large class of cases, the meaning of a word is its use in the language.",
    source: "pi-43",
    rounds: ids(CAFE),
    howTo: [
      "Someone in the café says something: “It's a bit cold in here.” Look at what is going on.",
      "Choose what to do or say. The same words can be a request, a hint or a complaint, depending on the situation.",
      "After each round you see what job the words were doing.",
    ],
  },
  family: {
    promise: "What do all games have in common? Don't think, look.",
    idea: "Many concepts hang together by overlapping similarities, like a family, not by one shared essence.",
    source: "pi-66",
    rounds: ids(FAMILY),
    howTo: [
      "Six cards show things we call by one name: games, tools, languages or numbers. Make the strongest claim that is true of them: all, most, some or none.",
      "Thread every card into one chain, each link a feature two neighbours share.",
      "A newcomer arrives. Link it with “both”, or keep it at the edge with “unlike”.",
    ],
  },
  pupil: {
    promise: "Teach a stubborn pupil a rule with as few examples as you can.",
    idea: "Examples and explanations never fix a rule on their own; following a rule is a practice.",
    source: "pi-185",
    rounds: ids(PUPIL),
    howTo: [
      "A pupil sits a five-question test using its own idea of the rule.",
      "Show it example cards, or explain the rule in words. It re-sits the test with whatever way of going on fits what it has seen.",
      "Get all five right with as few cards as you can, then decide what to do with a case that breaks the pattern.",
    ],
  },
  beetle: {
    promise: "Four friends, four boxes nobody else can look into, one word: “beetle”.",
    idea: "Words for sensations do not get their meaning by naming private objects.",
    source: "pi-293",
    rounds: ids(BEETLE),
    howTo: [
      "Read the situation and answer the question about it.",
      "A wrong answer gets a reply explaining why; try again.",
      "Each round ends with the point it shows, and each session with the passage it comes from.",
    ],
  },
  hinges: {
    promise: "Doubt it, if you can. Then watch the river-bed move.",
    idea: "Our doubts and checks turn on certainties that stand fast, like hinges; and what stands fast can shift.",
    source: "oc-341",
    rounds: ids(HINGES),
    howTo: [
      "Read the situation and answer the question about it.",
      "A wrong answer gets a reply explaining why; try again.",
      "Each round ends with the point it shows, and each session with the passage it comes from.",
    ],
  },
};

/** The seven games, in the order of the path. */
export const GAMES: GameInfo[] = GAME_ORDER.map((g) => ({
  slug: g.slug,
  step: g.step,
  title: g.title,
  work: stopOf(g.slug).work,
  ...CONTENT[g.slug],
}));

export { nextGame } from "./order";
