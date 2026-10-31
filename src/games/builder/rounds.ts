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
  /** Teach a new word after the round, as in the ostensive teaching of words (PI §6). */
  teaches?: Stone;
  plan: string;
  hint: string;
};

/** Same words, different job: is the call an order, a report, a question or a warning? (PI §§21, 27) */
export type UseRound = {
  id: string;
  role: "use";
  speaker: "builder" | "keeper";
  says: string;
  clues: string[];
  options: { text: string; fits: boolean; reaction: string }[];
  use: string;
  note: string;
};

export type BuilderRound = FetchRound | CallRound | UseRound;

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
    english: "Warm-up (A2): one-word orders; a bare noun as a whole request",
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
    english: "Warm-up (A2): numbers, plurals, 'there' with a gesture",
    source: "pi-8",
    rounds: [
      {
        id: "b2-1",
        role: "fetch",
        want: { stone: "slab", count: 2, place: "builder" },
        hint: "Two means two. Most nouns add -s for the plural: slabs.",
      },
      {
        id: "b2-2",
        role: "fetch",
        want: { stone: "pillar", count: 1, place: "left" },
        points: "left",
        hint: "'There' means where he is pointing.",
      },
      { id: "b2-3", role: "fetch", want: { stone: "block", count: 3, place: "builder" }, hint: "Three blocks: count them." },
      { id: "b2-4", role: "fetch", want: { stone: "beam", count: 2, place: "right" }, points: "right", hint: "Watch his arm." },
      {
        id: "b2-5",
        role: "fetch",
        want: { stone: "slab", count: 3, place: "left" },
        points: "left",
        hint: "Number, stone, place: three things to get right.",
      },
      {
        id: "b2-6",
        role: "fetch",
        want: { stone: "pillar", count: 2, place: "right" },
        points: "right",
        hint: "Two pillars, where he points.",
      },
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
        id: "b3-1",
        role: "call",
        goal: { stone: "pillar", count: 1, place: "builder" },
        yard: YARD,
        words: ["block", "pillar", "slab", "beam"],
        numbers: false,
        there: false,
        thisWord: false,
        plan: "You need one pillar, here beside you.",
        hint: "One word is enough when it is one stone, brought to you.",
      },
      {
        id: "b3-2",
        role: "call",
        goal: { stone: "pillar", count: 2, place: "left" },
        yard: YARD,
        words: ["block", "pillar", "slab", "beam"],
        numbers: true,
        there: true,
        thisWord: false,
        plan: "Two pillars on the left platform.",
        hint: "Say how many, what, and 'there' — then point at the left platform.",
      },
      {
        id: "b3-3",
        role: "call",
        goal: { stone: "beam", count: 1, place: "left" },
        yard: YARD,
        words: ["block", "pillar", "slab", "beam"],
        numbers: true,
        there: true,
        thisWord: false,
        plan: "One beam across the pillars on the left.",
        hint: "One beam — there, pointing left.",
      },
      {
        id: "b3-4",
        role: "call",
        goal: { stone: "slab", count: 3, place: "right" },
        yard: YARD,
        words: ["block", "pillar", "slab", "beam"],
        numbers: true,
        there: true,
        thisWord: false,
        plan: "Three slabs on the right platform.",
        hint: "Three slabs, there — point right.",
      },
      {
        id: "b3-5",
        role: "call",
        goal: { stone: "arch", count: 1, place: "builder" },
        yard: [...YARD, "arch"],
        words: ["block", "pillar", "slab", "beam"],
        numbers: true,
        there: true,
        thisWord: true,
        teaches: "arch",
        plan: "You need the curved stone. There is no word for it — yet.",
        hint: "Use 'this' and point at the curved stone.",
      },
      {
        id: "b3-6",
        role: "call",
        goal: { stone: "arch", count: 1, place: "right" },
        yard: [...YARD, "arch"],
        words: ["block", "pillar", "slab", "beam", "arch"],
        numbers: true,
        there: true,
        thisWord: true,
        plan: "Put the curved stone on the right platform. You have a word for it now.",
        hint: "Arch — there, pointing right.",
      },
    ],
  },
  {
    id: "builder-4",
    title: "Order or report?",
    blurb: "The same few words can order, report, ask or warn. Who says them, and when, decides.",
    english: "Telling orders, reports, questions and warnings apart; asking 'Which one?'",
    source: "pi-21",
    rounds: [
      {
        id: "b4-1",
        role: "use",
        speaker: "builder",
        says: "Three slabs!",
        clues: ["The builder stands on the scaffold, empty-handed.", "The wall needs three more slabs."],
        options: [
          { text: "Bring him three slabs.", fits: true, reaction: "Good." },
          { text: "Write “3 slabs” on the stock list.", fits: false, reaction: "I don't need a list — I need slabs!" },
          { text: "Say “Yes, three slabs.”", fits: false, reaction: "Then bring them!" },
        ],
        use: "an order",
        note: "On the scaffold, with an empty wall, “Three slabs!” is an order: it asks for action.",
      },
      {
        id: "b4-2",
        role: "use",
        speaker: "keeper",
        says: "Three slabs.",
        clues: [
          "You just asked the stock-keeper: “How many slabs are left?”",
          "She is counting the pile.",
          "You are holding the stock list.",
        ],
        options: [
          {
            text: "Carry three slabs to her.",
            fits: false,
            reaction: "Why are you bringing them to me? I was telling you how many there are.",
          },
          { text: "Write “3 slabs” on the stock list.", fits: true, reaction: "That's right — three left." },
          { text: "Say “Slab!”", fits: false, reaction: "…Yes, slabs. Three of them." },
        ],
        use: "a report",
        note: "The same two words, but after your question they answer it. Wittgenstein: “Five slabs” can be a report or an order — what makes the difference is the part it plays in the language-game (PI §21).",
      },
      {
        id: "b4-3",
        role: "use",
        speaker: "builder",
        says: "Slab?",
        clues: ["You are carrying a beam. From the scaffold he can't see it clearly.", "He looks at it, unsure, with his eyebrows raised."],
        options: [
          { text: "Answer: “No — it's a beam.”", fits: true, reaction: "Ah. A beam. Put it over there." },
          { text: "Go and fetch him a slab.", fits: false, reaction: "I didn't ask for one — I asked what that is." },
          { text: "Write “slab” on the stock list.", fits: false, reaction: "…That wasn't a report." },
        ],
        use: "a question",
        note: "The same word with a rising voice and a puzzled look is a question. In writing, the question mark does that job.",
      },
      {
        id: "b4-4",
        role: "use",
        speaker: "builder",
        says: "Slab!",
        clues: ["A slab is sliding off the cart behind you.", "He is pointing past you, eyes wide."],
        options: [
          { text: "Jump out of the way.", fits: true, reaction: "Phew. That was close." },
          { text: "Bring him a slab.", fits: false, reaction: "No! Look behind you!" },
          { text: "Ask: “Which slab?”", fits: false, reaction: "THAT one — move!" },
        ],
        use: "a warning",
        note: "“Slab!” here names nothing he wants. Wittgenstein lists exclamations — “Water! Away! Ow! Help!” — and asks if we would still call these words names of objects (PI §27).",
      },
      {
        id: "b4-5",
        role: "use",
        speaker: "builder",
        says: "That slab!",
        clues: ["There are two slabs on the ground: a big one and a small one.", "He waves vaguely towards both of them."],
        options: [
          { text: "Bring the big one.", fits: false, reaction: "Not that one!" },
          { text: "Ask: “Which one — the big one or the small one?”", fits: true, reaction: "The small one. Thanks for asking." },
          { text: "Bring both.", fits: false, reaction: "I said that slab — one!" },
        ],
        use: "an order that needs a question",
        note: "“That” only works when the pointing picks one thing out. When it doesn't, the right move in the game is to ask: “Which one?”",
      },
      {
        id: "b4-6",
        role: "use",
        speaker: "keeper",
        says: "Two beams.",
        clues: [
          "A delivery cart has just arrived.",
          "The stock-keeper is reading the delivery note aloud.",
          "You are holding the stock list.",
        ],
        options: [
          { text: "Write “2 beams” on the stock list.", fits: true, reaction: "Good. Two beams in." },
          { text: "Bring her two beams.", fits: false, reaction: "They're right here on the cart — I'm telling you what arrived." },
          { text: "Shout “Two beams!” to the builder.", fits: false, reaction: "He didn't ask for any. Just write it down." },
        ],
        use: "a report",
        note: "Reading a delivery note aloud is reporting. The words are the same as an order; the activity is different (PI §21, §23).",
      },
    ],
  },
];

export function findRound(id: string): BuilderRound | undefined {
  for (const s of SESSIONS) for (const r of s.rounds) if (r.id === id) return r;
}
