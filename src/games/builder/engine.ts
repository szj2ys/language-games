// "Slab!" — the builder's language of Philosophical Investigations §2 and its
// expansion in §8 (numerals, "there", "this"). Pure functions only; the UI
// renders whatever state these return.

export const STONES = ["block", "pillar", "slab", "beam", "arch"] as const;
/** The four words of the §2 language. "arch" starts without a word: you can only point at it. */
export const FIRST_WORDS: Stone[] = ["block", "pillar", "slab", "beam"];
export type Stone = (typeof STONES)[number];

/** Places on the site. "builder" is where A stands: an order with no "there" means "bring it to me". */
export const PLACES = ["builder", "left", "right"] as const;
export type Place = (typeof PLACES)[number];

export type Delivery = { stone: Stone; count: number; place: Place };

export const NUMBER_WORDS = ["one", "two", "three", "four"] as const;

const PLURAL: Record<Stone, string> = { block: "blocks", pillar: "pillars", slab: "slabs", beam: "beams", arch: "arches" };

export function plural(stone: Stone, count: number): string {
  return count === 1 ? stone : PLURAL[stone];
}

/** The words a builder says for a delivery, as in §8: "Two slabs — there!" */
export function callFor(d: Delivery): string {
  const noun = plural(d.stone, d.count);
  const head = d.count === 1 ? cap(noun) : `${cap(NUMBER_WORDS[d.count - 1])} ${noun}`;
  return d.place === "builder" ? `${head}!` : `${head} — there!`;
}

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** Three marks: the right stone, the right number, the right place. */
export function markDelivery(want: Delivery, got: Delivery) {
  const marks = {
    stone: want.stone === got.stone,
    count: want.count === got.count,
    place: want.place === got.place,
  };
  return { marks, score: Object.values(marks).filter(Boolean).length };
}

// ---------------------------------------------------------------------------
// Builder role: the player speaks, the assistant acts on exactly what was said.

export type Tile =
  | { kind: "number"; value: number }
  | { kind: "stone"; value: Stone; plural?: boolean }
  | { kind: "there" }
  | { kind: "this" };

export type Utterance = { tiles: Tile[]; pointAt?: Place | { stoneIndex: number } };

export type AssistantResponse =
  | { kind: "acts"; delivery: Delivery; said: string }
  | { kind: "asks"; question: string };

/**
 * Interpret a call the way an assistant trained in the §8 game would:
 * a number word sets the count, a stone word the kind, "there" sends the
 * stones where the builder points, "this" picks out the stone pointed at.
 * When the words leave something the assistant cannot settle, it asks.
 */
export function interpret(u: Utterance, yard: Stone[]): AssistantResponse {
  const said = sentence(u.tiles);
  const numbers = u.tiles.filter((t) => t.kind === "number");
  const stones = u.tiles.filter((t) => t.kind === "stone");
  const hasThere = u.tiles.some((t) => t.kind === "there");
  const hasThis = u.tiles.some((t) => t.kind === "this");

  if (u.tiles.length === 0) return { kind: "asks", question: "…?" };
  if (numbers.length > 1 || stones.length > 1) return { kind: "asks", question: "One thing at a time?" };

  let stone: Stone | undefined = stones[0]?.value;
  if (hasThis) {
    const p = u.pointAt;
    if (!p || typeof p === "string") return { kind: "asks", question: "This? Which one — point at it." };
    const pointed = yard[p.stoneIndex];
    if (!pointed) return { kind: "asks", question: "Which one?" };
    if (stone && stone !== pointed) return { kind: "asks", question: `That one is a ${pointed}, not a ${stone}.` };
    stone = pointed;
  }
  if (!stone) return { kind: "asks", question: "Bring what?" };

  let place: Place = "builder";
  if (hasThere) {
    if (typeof u.pointAt !== "string" || u.pointAt === "builder") {
      return { kind: "asks", question: "There? Point to where." };
    }
    place = u.pointAt;
  }

  const count = numbers[0]?.value ?? 1;
  if (hasThis && count > 1) return { kind: "asks", question: "This one — or more than one?" };
  const available = yard.filter((s) => s === stone).length;
  if (count > available) return { kind: "asks", question: `There ${available === 1 ? "is" : "are"} only ${available} in the yard.` };

  return { kind: "acts", delivery: { stone, count, place }, said };
}

/** The words as the player chose them — a slip like "two slab" stays a slip. */
export function sentence(tiles: Tile[]): string {
  const words = tiles.map((t) => {
    switch (t.kind) {
      case "number":
        return NUMBER_WORDS[t.value - 1];
      case "stone":
        return t.plural ? PLURAL[t.value] : t.value;
      case "there":
        return "there";
      case "this":
        return "this";
    }
  });
  const text = words.join(" ");
  return text ? `${cap(text)}!` : "";
}

/**
 * English notes on a call. They never stop the assistant (in the builders' game
 * "Two slab!" still gets two slabs); they name the rule in one sentence.
 */
export function englishNotes(tiles: Tile[]): string[] {
  const notes: string[] = [];
  const n = tiles.findIndex((t) => t.kind === "number");
  const s = tiles.findIndex((t) => t.kind === "stone");
  const num = tiles[n];
  const stone = tiles[s];
  if (stone?.kind === "stone") {
    const count = num?.kind === "number" ? num.value : 1;
    if (count > 1 && !stone.plural) {
      notes.push(`After “${NUMBER_WORDS[count - 1]}”, English needs the plural: ${NUMBER_WORDS[count - 1]} ${PLURAL[stone.value]}.`);
    }
    if (count === 1 && stone.plural) {
      notes.push(`One stone, no -s: “${num ? "one " : ""}${stone.value}”.`);
    }
    if (n > s && num) notes.push(`The number comes before the noun: ${NUMBER_WORDS[(num as { value: number }).value - 1]} ${stone.plural ? PLURAL[stone.value] : stone.value}.`);
  }
  const there = tiles.findIndex((t) => t.kind === "there");
  if (there >= 0 && s > there) notes.push("Say what first, then where: “… slabs there!”");
  return notes;
}
