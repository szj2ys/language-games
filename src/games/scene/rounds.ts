import type { SourceId } from "@/content/sources";
import type { Clause, Relation, Scene, Thing } from "./engine";

/** Read a message; set up the stage so that every sentence in it is true. */
export type BuildRound = {
  id: string;
  mode: "build";
  message: Clause[];
  things: Thing[];
  /** Things already standing when the round opens. */
  start?: Scene;
  hint: string;
};

/** A report and the real scene: mark each sentence, and fix the false ones by changing one word. */
export type CheckRound = {
  id: string;
  mode: "check";
  scene: Scene;
  report: Clause[];
  /** Relation words offered when fixing a sentence. */
  options: Relation[];
  hint: string;
};

/** Your partner cannot see the stage. Tell them where one thing is, in one sentence. */
export type TellRound = {
  id: string;
  mode: "tell";
  scene: Scene;
  target: Thing;
  options: Relation[];
  hint: string;
};

export type SceneRound = BuildRound | CheckRound | TellRound;

export type Session = {
  id: string;
  title: string;
  blurb: string;
  english: string;
  source: SourceId;
  rounds: SceneRound[];
};

const c = (a: Thing, rel: Relation, b: Thing, negated = false): Clause => ({ a, rel, b, negated });

export const SESSIONS: Session[] = [
  {
    id: "scene-1",
    title: "Make it true",
    blurb: "A sentence is a little model of how things stand. Build the scene it describes.",
    english: "Warm-up (A2): in, on, next to, to the left of; two facts true at once",
    source: "tlp-2.1",
    rounds: [
      {
        id: "s1-1",
        mode: "build",
        message: [c("key", "in", "box")],
        things: ["key", "box"],
        start: { box: { spot: 1, row: "front" } },
        hint: "In = inside it.",
      },
      {
        id: "s1-2",
        mode: "build",
        message: [c("cup", "on", "book")],
        things: ["cup", "book"],
        start: { book: { spot: 2, row: "front" } },
        hint: "On = on top of it.",
      },
      {
        id: "s1-3",
        mode: "build",
        message: [c("lamp", "left of", "cup")],
        things: ["lamp", "cup"],
        start: { cup: { spot: 2, row: "front" } },
        hint: "To the left of the cup: anywhere on the cup's left.",
      },
      {
        id: "s1-4",
        mode: "build",
        message: [c("ball", "right of", "box"), c("key", "in", "box")],
        things: ["ball", "key", "box"],
        start: { box: { spot: 1, row: "front" } },
        hint: "Two sentences: both must be true at once.",
      },
      {
        id: "s1-5",
        mode: "build",
        message: [c("book", "next to", "lamp"), c("ball", "on", "book")],
        things: ["book", "lamp", "ball"],
        start: { lamp: { spot: 1, row: "front" } },
        hint: "Next to = in the very next place, in the same row.",
      },
      {
        id: "s1-6",
        mode: "build",
        message: [c("cup", "left of", "box"), c("key", "in", "box"), c("lamp", "right of", "box")],
        things: ["cup", "key", "box", "lamp"],
        hint: "Place the box first, then the others around it.",
      },
    ],
  },
  {
    id: "scene-2",
    title: "True or false?",
    blurb: "A report can be perfectly clear and still false. Compare it with the stage.",
    english: "behind, in front of, 'is not'; checking a description against the facts",
    source: "tlp-2.21",
    rounds: [
      {
        id: "s2-1",
        mode: "check",
        scene: { box: { spot: 1, row: "front" }, key: { in: "box" }, cup: { spot: 2, row: "front" } },
        report: [c("key", "on", "box"), c("cup", "right of", "box")],
        options: ["in", "on", "next to"],
        hint: "Look closely: is the key inside the box or on top of it?",
      },
      {
        id: "s2-2",
        mode: "check",
        scene: { lamp: { spot: 1, row: "back" }, cup: { spot: 1, row: "front" }, ball: { spot: 3, row: "front" } },
        report: [c("lamp", "behind", "cup"), c("ball", "left of", "cup")],
        options: ["left of", "right of", "behind"],
        hint: "Behind = in the back row, in the same place.",
      },
      {
        id: "s2-3",
        mode: "check",
        scene: { book: { spot: 0, row: "front" }, ball: { on: "book" }, box: { spot: 2, row: "front" } },
        report: [c("ball", "in", "book"), c("book", "left of", "box")],
        options: ["in", "on", "next to"],
        hint: "Where is the ball really — inside the book, or on top of it?",
      },
      {
        id: "s2-4",
        mode: "check",
        scene: { cup: { spot: 2, row: "back" }, key: { spot: 2, row: "front" }, lamp: { spot: 0, row: "front" } },
        report: [c("key", "behind", "cup"), c("lamp", "next to", "key", true)],
        options: ["behind", "in front of", "left of"],
        hint: "'Is not next to' is true when there is a gap between them.",
      },
      {
        id: "s2-5",
        mode: "check",
        scene: { box: { spot: 0, row: "front" }, cup: { in: "box" }, book: { spot: 1, row: "front" }, key: { on: "book" } },
        report: [c("cup", "in", "box"), c("key", "in", "book"), c("book", "next to", "box")],
        options: ["in", "on", "behind"],
        hint: "You cannot put a key in a closed book — but you can put it on one.",
      },
      {
        id: "s2-6",
        mode: "check",
        scene: { lamp: { spot: 3, row: "back" }, ball: { spot: 3, row: "front" }, cup: { spot: 1, row: "front" } },
        report: [c("ball", "in front of", "lamp"), c("cup", "right of", "ball"), c("lamp", "on", "cup", true)],
        options: ["left of", "right of", "on"],
        hint: "Two sentences are true. Find the false one.",
      },
    ],
  },
  {
    id: "scene-3",
    title: "Say where it is",
    blurb: "Your partner cannot see the stage. One true sentence must be enough for them to put the thing in the right place.",
    english: "Describing position precisely; 'next to' versus 'to the left of'",
    source: "tlp-4.01",
    rounds: [
      {
        id: "s3-1",
        mode: "tell",
        scene: { box: { spot: 1, row: "front" }, key: { in: "box" } },
        target: "key",
        options: ["in", "on", "next to"],
        hint: "Name the thing it is in.",
      },
      {
        id: "s3-2",
        mode: "tell",
        scene: { book: { spot: 2, row: "front" }, cup: { on: "book" } },
        target: "cup",
        options: ["in", "on", "behind"],
        hint: "What is the cup standing on?",
      },
      {
        id: "s3-3",
        mode: "tell",
        scene: { cup: { spot: 1, row: "front" }, lamp: { spot: 1, row: "back" } },
        target: "lamp",
        options: ["behind", "next to", "left of"],
        hint: "Same place, back row.",
      },
      {
        id: "s3-4",
        mode: "tell",
        scene: { box: { spot: 0, row: "front" }, ball: { spot: 1, row: "front" }, lamp: { spot: 3, row: "front" } },
        target: "ball",
        options: ["next to", "right of", "left of"],
        hint: "'Next to the box' leaves only one place: the box is at the far left.",
      },
      {
        id: "s3-5",
        mode: "tell",
        scene: { book: { spot: 1, row: "front" }, key: { spot: 2, row: "front" }, cup: { spot: 2, row: "back" } },
        target: "key",
        options: ["next to", "in front of", "right of"],
        hint: "'Next to the book' could mean either side. Which sentence leaves only one place?",
      },
      {
        id: "s3-6",
        mode: "tell",
        scene: { lamp: { spot: 2, row: "front" }, box: { spot: 2, row: "back" }, ball: { in: "box" } },
        target: "ball",
        options: ["in", "behind", "on"],
        hint: "Where is the ball — and which sentence pins it down?",
      },
    ],
  },
  {
    id: "scene-4",
    title: "Not here",
    blurb: "A sentence with “not” rules one picture out and leaves many others in. Find one that makes every sentence true.",
    english: "Negative sentences with “is not”; several facts true at once",
    source: "tlp-4.0621",
    rounds: [
      {
        id: "s4-1",
        mode: "build",
        message: [c("key", "in", "box", true), c("key", "on", "book")],
        things: ["key"],
        start: { box: { spot: 1, row: "front" }, book: { spot: 2, row: "front" } },
        hint: "“Not in the box” rules out one place. The other sentence says where the key is.",
      },
      {
        id: "s4-2",
        mode: "build",
        message: [c("ball", "next to", "box", true)],
        things: ["ball"],
        start: { box: { spot: 1, row: "front" } },
        hint: "Anywhere but right beside the box. A “not” sentence allows many pictures.",
      },
      {
        id: "s4-3",
        mode: "build",
        message: [c("lamp", "left of", "cup"), c("lamp", "next to", "cup", true)],
        things: ["lamp"],
        start: { cup: { spot: 3, row: "front" } },
        hint: "On the cup's left, but leave a gap.",
      },
      {
        id: "s4-4",
        mode: "build",
        message: [c("cup", "left of", "box", true), c("cup", "right of", "box", true)],
        things: ["cup"],
        start: { box: { spot: 2, row: "front" } },
        hint: "Neither left nor right of the box. What is left? Behind it — or in it.",
      },
      {
        id: "s4-5",
        mode: "build",
        message: [c("key", "in", "box"), c("box", "next to", "book", true), c("ball", "on", "book")],
        things: ["key", "box", "ball"],
        start: { book: { spot: 1, row: "front" } },
        hint: "Place the box first, away from the book.",
      },
      {
        id: "s4-6",
        mode: "build",
        message: [c("ball", "on", "book", true), c("ball", "in", "box", true), c("ball", "next to", "book")],
        things: ["ball"],
        start: { book: { spot: 1, row: "front" }, box: { spot: 2, row: "front" } },
        hint: "Not on the book, not in the box, but beside the book. Try the free place on the shelf.",
      },
    ],
  },
];

/** What the English did in a round, for the end card and the notebook. */
export function did(r: SceneRound): string {
  if (r.mode === "build") return "a description you made true";
  if (r.mode === "check") return "a report you corrected";
  return "a description you gave";
}
