import type { SourceId } from "@/content/sources";
import type { Delivery, Place, Stone } from "./engine";

/** You are B: hear the call, bring the stones. */
export type FetchRound = {
  id: string;
  role: "fetch";
  want: Delivery;
  /** Where the builder points while calling; a "there" without a point is unanswerable. */
  points?: Place;
  hint: string;
};

/** You are A: look at the plan, call out what you need. */
export type CallRound = {
  id: string;
  role: "call";
  goal: Delivery;
  yard: Stone[];
  /** Words the player can use. A stone with no word can only be pointed at ("this"). */
  words: Stone[];
  numbers: boolean;
  there: boolean;
  thisWord: boolean;
  /** Teach a new word after the round, as in an ostensive definition (PI §6). */
  teaches?: Stone;
  plan: string;
  hint: string;
};

export type BuilderRound = FetchRound | CallRound;

export type Session = {
  id: string;
  title: string;
  blurb: string;
  rounds: BuilderRound[];
  source: SourceId;
  /** What the English in this session trains, in one line. */
  english: string;
};

const YARD: Stone[] = ["block", "block", "pillar", "pillar", "slab", "slab", "slab", "beam", "beam"];

export const SESSIONS: Session[] = [
  {
    id: "builder-1",
    title: "Four words",
    blurb: "The builder has a language of four words. Learn it by doing what it asks.",
    english: "Naming things; one-word orders",
    source: "pi-2",
    rounds: [
      { id: "b1-1", role: "fetch", want: { stone: "slab", count: 1, place: "builder" }, hint: "A slab is broad and flat." },
      { id: "b1-2", role: "fetch", want: { stone: "pillar", count: 1, place: "builder" }, hint: "A pillar is round and stands upright." },
      { id: "b1-3", role: "fetch", want: { stone: "beam", count: 1, place: "builder" }, hint: "A beam is long and narrow." },
      { id: "b1-4", role: "fetch", want: { stone: "block", count: 1, place: "builder" }, hint: "A block is a solid cube." },
      { id: "b1-5", role: "fetch", want: { stone: "slab", count: 1, place: "builder" }, hint: "Broad and flat." },
      { id: "b1-6", role: "fetch", want: { stone: "beam", count: 1, place: "builder" }, hint: "Long and narrow." },
    ],
  },
  {
    id: "builder-2",
    title: "Two slabs — there!",
    blurb: "Add numbers and a pointing word. Same game, many more orders.",
    english: "Number words, plural -s, 'there' with a gesture",
    source: "pi-8",
    rounds: [
      { id: "b2-1", role: "fetch", want: { stone: "slab", count: 2, place: "builder" }, hint: "Two means two. Plural nouns end in -s: slabs." },
      { id: "b2-2", role: "fetch", want: { stone: "pillar", count: 1, place: "left" }, points: "left", hint: "'There' means where he is pointing." },
      { id: "b2-3", role: "fetch", want: { stone: "block", count: 3, place: "builder" }, hint: "Three blocks: count them." },
      { id: "b2-4", role: "fetch", want: { stone: "beam", count: 2, place: "right" }, points: "right", hint: "Watch his arm." },
      { id: "b2-5", role: "fetch", want: { stone: "slab", count: 3, place: "left" }, points: "left", hint: "Number, stone, place: three things to get right." },
      { id: "b2-6", role: "fetch", want: { stone: "pillar", count: 2, place: "right" }, points: "right", hint: "Two pillars, where he points." },
    ],
  },
  {
    id: "builder-3",
    title: "Your turn to call",
    blurb: "Now you are the builder. Your assistant does exactly what you say — no more.",
    english: "Giving clear instructions; ellipsis; 'this' with pointing",
    source: "pi-19",
    rounds: [
      {
        id: "b3-1", role: "call", goal: { stone: "pillar", count: 1, place: "builder" }, yard: YARD,
        words: ["block", "pillar", "slab", "beam"], numbers: false, there: false, thisWord: false,
        plan: "You need one pillar, here beside you.", hint: "One word is enough when it is one stone, brought to you.",
      },
      {
        id: "b3-2", role: "call", goal: { stone: "pillar", count: 2, place: "left" }, yard: YARD,
        words: ["block", "pillar", "slab", "beam"], numbers: true, there: true, thisWord: false,
        plan: "Two pillars on the left platform.", hint: "Say how many, what, and 'there' — then point at the left platform.",
      },
      {
        id: "b3-3", role: "call", goal: { stone: "beam", count: 1, place: "left" }, yard: YARD,
        words: ["block", "pillar", "slab", "beam"], numbers: true, there: true, thisWord: false,
        plan: "One beam across the pillars on the left.", hint: "One beam — there, pointing left.",
      },
      {
        id: "b3-4", role: "call", goal: { stone: "slab", count: 3, place: "right" }, yard: YARD,
        words: ["block", "pillar", "slab", "beam"], numbers: true, there: true, thisWord: false,
        plan: "Three slabs on the right platform.", hint: "Three slabs, there — point right.",
      },
      {
        id: "b3-5", role: "call", goal: { stone: "arch", count: 1, place: "builder" }, yard: [...YARD, "arch"],
        words: ["block", "pillar", "slab", "beam"], numbers: true, there: true, thisWord: true, teaches: "arch",
        plan: "You need the curved stone. There is no word for it — yet.", hint: "Use 'this' and point at the curved stone.",
      },
      {
        id: "b3-6", role: "call", goal: { stone: "arch", count: 1, place: "right" }, yard: [...YARD, "arch"],
        words: ["block", "pillar", "slab", "beam", "arch"], numbers: true, there: true, thisWord: true,
        plan: "Put the curved stone on the right platform. You have a word for it now.", hint: "Arch — there, pointing right.",
      },
    ],
  },
];

export function findRound(id: string): BuilderRound | undefined {
  for (const s of SESSIONS) for (const r of s.rounds) if (r.id === id) return r;
}
