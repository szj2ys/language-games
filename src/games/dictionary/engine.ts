// The dictionary game: you write the helper's dictionary, the helper carries out
// the builder's orders exactly as the dictionary says, and the orders slowly break
// the idea that every word names a thing (Philosophical Investigations §§1–43).
// Pure functions only; the UI renders what these return.

import { an, type Stone } from "@/games/builder/engine";

export type Place = "you" | "left" | "right";

/** Jobs a word can do instead of naming. Each is unlocked when naming has failed for some word. */
export type Job = "count" | "where" | "warn" | "thanks";

export type Entry =
  | { kind: "name"; stone: Stone }
  | { kind: "job"; job: Job }
  /** The same word, read by the situation: usually one thing, when something is falling another. */
  | { kind: "depends"; usual: Stone; falling: Job };

export type Dictionary = Partial<Record<string, Entry>>;

/** What the builder wants done: stones brought somewhere, or an action with nothing fetched. */
export type Outcome = { kind: "fetch"; stone: Stone; count: number; place: Place } | { kind: "duck" } | { kind: "nod" };

export type Order = {
  /** What the builder calls, exactly as shown. */
  says: string;
  /** The dictionary words in it, in order, singular. */
  words: string[];
  /** Where the builder points while calling. */
  points?: Exclude<Place, "you">;
  /** A slab swinging loose from the crane changes what a shout is for. */
  falling?: boolean;
  want: Outcome;
};

export type Shift = {
  id: string;
  title: string;
  /** Words the dictionary must cover this shift (new ones are listed first). */
  words: string[];
  orders: Order[];
};

export const NUMERALS: Record<string, number> = { two: 2, three: 3 };

export type Result = {
  did: Outcome | { kind: "stuck"; why: string };
  /** The helper's own account of what it did, in plain words. */
  says: string;
  right: boolean;
};

/** Carry out one order exactly as the dictionary says. */
export function perform(order: Order, dict: Dictionary): Result {
  const named: { word: string; stone: Stone }[] = [];
  let count = 1;
  let place: Place = "you";
  let action: "duck" | "nod" | undefined;

  for (const word of order.words) {
    const entry = dict[word];
    if (!entry) return stuck(`I don't know “${word}”, so I did nothing.`);
    const read = readIn(entry, order);
    if (read.kind === "name") {
      named.push({ word, stone: read.stone });
      continue;
    }
    switch (read.job) {
      case "count": {
        const n = NUMERALS[word];
        if (!n) return stuck(`“${word}” counts — but how many is “${word}”?`);
        count = n;
        break;
      }
      case "where":
        if (!order.points) return stuck(`“${word}” — where? Nobody pointed.`);
        place = order.points;
        break;
      case "warn":
        action = "duck";
        break;
      case "thanks":
        action = "nod";
        break;
    }
  }

  if (action) {
    const did: Outcome = { kind: action };
    const says = action === "duck" ? "I shouted a warning and stepped back." : "I nodded back.";
    // Fetching as well as warning or nodding is a muddle; the plain action is what was asked.
    if (named.length) return { did, says: `${says} Then I fetched ${forEach(named)} as well.`, right: false };
    return { did, says, right: same(did, order.want) };
  }
  if (named.length === 0) return stuck(count > 1 ? `${count} of what? I stood still.` : "Bring what? I stood still.");
  // Every name is a separate thing to fetch: "two" written as a name brings a stone of its own.
  if (named.length > 1) return { did: { kind: "fetch", stone: named[0].stone, count, place }, says: `I brought ${forEach(named)} ${to(place)}.`, right: false };
  const did: Outcome = { kind: "fetch", stone: named[0].stone, count, place };
  return { did, says: `I brought ${list(named[0].stone, count)} ${to(place)}.`, right: same(did, order.want) };
}

/** Under the crane an "it depends" entry reads as its warning, otherwise as its name. */
function readIn(entry: Entry, order: Order): Exclude<Entry, { kind: "depends" }> {
  if (entry.kind !== "depends") return entry;
  if (order.falling) return { kind: "job", job: entry.falling };
  return { kind: "name", stone: entry.usual };
}

function forEach(named: { word: string; stone: Stone }[]): string {
  return named.map((n) => `${an(n.stone)} for “${n.word}”`).join(" and ");
}

function stuck(why: string): Result {
  return { did: { kind: "stuck", why }, says: why, right: false };
}

function same(a: Outcome, b: Outcome): boolean {
  if (a.kind !== b.kind) return false;
  if (a.kind === "fetch" && b.kind === "fetch") return a.stone === b.stone && a.count === b.count && a.place === b.place;
  return true;
}

function list(stone: Stone, count: number): string {
  return count === 1 ? an(stone) : `${count} ${stone}s`;
}

function to(place: Place): string {
  return place === "you" ? "to you" : `to the ${place} wall`;
}

/** What the builder wanted, in words, for the report after a run. */
export function describe(o: Outcome): string {
  switch (o.kind) {
    case "fetch":
      return `${list(o.stone, o.count)} ${to(o.place)}`;
    case "duck":
      return "a warning: get out of the way";
    case "nod":
      return "nothing fetched: just a nod back";
  }
}

export type Run = { results: Result[]; right: number; of: number };

export function runShift(shift: Shift, dict: Dictionary): Run {
  const results = shift.orders.map((o) => perform(o, dict));
  return { results, right: results.filter((r) => r.right).length, of: results.length };
}

/**
 * Which entry kinds the player may write for a word, given what has gone wrong so far.
 * Everyone starts with names only, the theory of PI §1. A failed order with a word that is
 * not a stone opens jobs; a failed order sharing a word with a shout from under the crane
 * opens "it depends on the situation".
 */
export type Unlocks = { jobs: boolean; depends: boolean };

export function unlocksAfter(prev: Unlocks, shift: Shift, run: Run): Unlocks {
  const failed = shift.orders.filter((_, i) => !run.results[i].right);
  const fallingWords = new Set(shift.orders.filter((o) => o.falling).flatMap((o) => o.words));
  return {
    jobs: prev.jobs || failed.some((o) => o.words.some((w) => !STONE_WORDS.has(w))),
    depends: prev.depends || failed.some((o) => o.words.some((w) => fallingWords.has(w))),
  };
}

export const STONE_WORDS = new Set(["block", "pillar", "slab", "beam"]);

/** Stars for a shift: first-time right is three, a second run two, more one. */
export function stars(runs: number): 1 | 2 | 3 {
  if (runs <= 1) return 3;
  if (runs === 2) return 2;
  return 1;
}
