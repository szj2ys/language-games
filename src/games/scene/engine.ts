// "Picture Theatre" — the early picture theory (Tractatus 2.1, 2.21, 4.01) as a
// toy stage. A sentence is true or false of a scene; relations, not pixels,
// decide. Pure functions only.

export const THINGS = ["cup", "key", "box", "lamp", "book", "ball"] as const;
export type Thing = (typeof THINGS)[number];

/** Things that can hold another thing on top; only the open box can hold one inside. */
export const HOLDERS: Thing[] = ["box", "book"];
export const CONTAINERS: Thing[] = ["box"];

export const SPOTS = 4;

/** Where a thing stands: a spot on the shelf (0 = leftmost) in front or at the back, or in/on a holder. */
export type Loc = { spot: number; row: "front" | "back" } | { in: Thing } | { on: Thing };

export type Scene = Partial<Record<Thing, Loc>>;

export const RELATIONS = ["left of", "right of", "next to", "behind", "in front of", "in", "on"] as const;
export type Relation = (typeof RELATIONS)[number];

export type Clause = { a: Thing; rel: Relation; b: Thing; negated?: boolean };

/** How each relation is said in standard English: "to the left of", not "left of". */
export const REL_TEXT: Record<Relation, string> = {
  "left of": "to the left of",
  "right of": "to the right of",
  "next to": "next to",
  behind: "behind",
  "in front of": "in front of",
  in: "in",
  on: "on",
};

/** Where a thing sits on the shelf, following holders down to the ground. */
function ground(scene: Scene, t: Thing, seen = new Set<Thing>()): { spot: number; row: "front" | "back" } | null {
  const loc = scene[t];
  if (!loc || seen.has(t)) return null;
  seen.add(t);
  if ("spot" in loc) return loc;
  return ground(scene, "in" in loc ? loc.in : loc.on, seen);
}

export function holds(scene: Scene, c: Clause): boolean {
  const v = relate(scene, c);
  return c.negated ? !v : v;
}

function relate(scene: Scene, { a, rel, b }: Clause): boolean {
  if (a === b) return false;
  const la = scene[a];
  if (rel === "in") return !!la && "in" in la && la.in === b;
  if (rel === "on") return !!la && "on" in la && la.on === b;
  const ga = ground(scene, a);
  const gb = ground(scene, b);
  if (!ga || !gb) return false;
  switch (rel) {
    case "left of":
      return ga.spot < gb.spot;
    case "right of":
      return ga.spot > gb.spot;
    case "next to":
      return Math.abs(ga.spot - gb.spot) === 1 && ga.row === gb.row;
    case "behind":
      return ga.spot === gb.spot && ga.row === "back" && gb.row === "front";
    case "in front of":
      return ga.spot === gb.spot && ga.row === "front" && gb.row === "back";
  }
}

export function say(c: Clause): string {
  const verb = c.negated ? "is not" : "is";
  return `The ${c.a} ${verb} ${REL_TEXT[c.rel]} the ${c.b}.`;
}

/** Is a cell free for a thing? One thing per shelf cell, one inside and one on top of each holder. */
export function canPlace(scene: Scene, t: Thing, loc: Loc): boolean {
  for (const [other, l] of Object.entries(scene) as [Thing, Loc][]) {
    if (other === t || !l) continue;
    if ("spot" in loc && "spot" in l && l.spot === loc.spot && l.row === loc.row) return false;
    if ("in" in loc && "in" in l && l.in === loc.in) return false;
    if ("on" in loc && "on" in l && l.on === loc.on) return false;
  }
  if ("in" in loc || "on" in loc) {
    const holder = "in" in loc ? loc.in : loc.on;
    if (holder === t || !HOLDERS.includes(holder) || !scene[holder]) return false;
    // A holder cannot end up inside or on something it holds.
    let cur: Loc | undefined = scene[holder];
    const seen = new Set<Thing>();
    while (cur && !("spot" in cur)) {
      const up: Thing = "in" in cur ? cur.in : cur.on;
      if (up === t || seen.has(up)) return false;
      seen.add(up);
      cur = scene[up];
    }
    if ("in" in loc && !CONTAINERS.includes(holder)) return false;
  }
  return true;
}

/** Move a thing; anything it held travels with it. Returns the old scene if the move is not allowed. */
export function place(scene: Scene, t: Thing, loc: Loc): Scene {
  if (!canPlace(scene, t, loc)) return scene;
  return { ...scene, [t]: loc };
}

export function removeThing(scene: Scene, t: Thing): Scene {
  const next: Scene = { ...scene };
  delete next[t];
  // Whatever sat in or on it goes back to the tray with it.
  let orphan: Thing | undefined;
  do {
    orphan = (Object.entries(next) as [Thing, Loc][]).find(([, l]) => l && (("in" in l && !next[l.in]) || ("on" in l && !next[l.on])))?.[0];
    if (orphan) delete next[orphan];
  } while (orphan);
  return next;
}

export function scoreClauses(scene: Scene, clauses: Clause[]) {
  const results = clauses.map((c) => holds(scene, c));
  return { results, score: results.filter(Boolean).length };
}

/** A plain-English description of the scene, for screen readers and for checking the art against the model. */
export function describe(scene: Scene): string[] {
  const out: string[] = [];
  for (const [t, l] of Object.entries(scene) as [Thing, Loc][]) {
    if (!l) continue;
    if ("in" in l) out.push(`The ${t} is in the ${l.in}.`);
    else if ("on" in l) out.push(`The ${t} is on the ${l.on}.`);
    else
      out.push(
        `The ${t} is ${["at the far left", "just left of centre", "just right of centre", "at the far right"][l.spot]}, ${l.row === "back" ? "at the back" : "at the front"}.`,
      );
  }
  return out;
}

/** Every place a thing could go, given everything else on the stage. */
export function allLocs(scene: Scene, t: Thing): Loc[] {
  const without = removeThing(scene, t);
  const locs: Loc[] = [];
  for (let spot = 0; spot < SPOTS; spot++) for (const row of ["back", "front"] as const) locs.push({ spot, row });
  for (const h of HOLDERS) locs.push({ on: h });
  for (const h of CONTAINERS) locs.push({ in: h });
  return locs.filter((l) => canPlace(without, t, l));
}

/**
 * What a partner who cannot see the stage could do with one sentence about
 * `clause.a`: the places that would make it true. One place means the
 * sentence pins the thing down; several means they must guess.
 */
export function placesFor(scene: Scene, clause: Clause): Loc[] {
  const without = removeThing(scene, clause.a);
  return allLocs(scene, clause.a).filter((l) => holds({ ...without, [clause.a]: l }, clause));
}

/** Why a sentence is false of a scene, in one line: "The key is on the box, not in it." */
export function whyFalse(scene: Scene, c: Clause): string {
  if (!scene[c.a] || !scene[c.b]) return `The ${!scene[c.a] ? c.a : c.b} is not on the stage yet.`;
  if (c.negated) return `The ${c.a} is ${REL_TEXT[c.rel]} the ${c.b}, so “is not” is false.`;
  const actual = (["in", "on", "behind", "in front of", "next to", "left of", "right of"] as const).find((rel) =>
    holds(scene, { a: c.a, rel, b: c.b }),
  );
  return actual
    ? `The ${c.a} is ${REL_TEXT[actual]} the ${c.b}, not ${REL_TEXT[c.rel]} it.`
    : `The ${c.a} is not ${REL_TEXT[c.rel]} the ${c.b}.`;
}
