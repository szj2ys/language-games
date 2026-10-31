import type { SourceId } from "./sources";

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
};

import { SESSIONS as BUILDER } from "@/games/builder/rounds";
import { SESSIONS as SCENE } from "@/games/scene/rounds";
import { SESSIONS as CAFE } from "@/games/cafe/rounds";
import { SESSIONS as PUPIL } from "@/games/pupil/levels";
import { SESSIONS as FAMILY } from "@/games/family/rounds";

const ids = (sessions: { rounds: { id: string }[] }[]) => sessions.flatMap((s) => s.rounds.map((r) => r.id));

export const GAMES: GameInfo[] = [
  {
    slug: "builder",
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
    title: "Family Threads",
    promise: "What do all games have in common? Don't think — look.",
    english: "all / most / some / none of these; both … and; unlike",
    idea: "Family resemblance, not one shared essence",
    source: "pi-67",
    rounds: ids(FAMILY),
    minutes: "2 × 4 min",
  },
];
