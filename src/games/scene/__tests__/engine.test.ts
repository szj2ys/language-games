import { describe, expect, it } from "vitest";
import { HOLDERS, allLocs, canPlace, holds, place, removeThing, say, scoreClauses, type Scene } from "../engine";

const scene: Scene = {
  cup: { spot: 0, row: "front" },
  box: { spot: 1, row: "front" },
  key: { in: "box" },
  lamp: { spot: 0, row: "back" },
  book: { spot: 2, row: "front" },
  ball: { on: "book" },
};

describe("picture theatre relations", () => {
  it("reads the shelf left to right", () => {
    expect(holds(scene, { a: "cup", rel: "left of", b: "box" })).toBe(true);
    expect(holds(scene, { a: "cup", rel: "right of", b: "box" })).toBe(false);
  });
  it("a thing in a holder stands where the holder stands", () => {
    expect(holds(scene, { a: "key", rel: "right of", b: "cup" })).toBe(true);
    expect(holds(scene, { a: "ball", rel: "next to", b: "box" })).toBe(true);
  });
  it("distinguishes in from on", () => {
    expect(holds(scene, { a: "key", rel: "in", b: "box" })).toBe(true);
    expect(holds(scene, { a: "key", rel: "on", b: "box" })).toBe(false);
    expect(holds(scene, { a: "ball", rel: "on", b: "book" })).toBe(true);
  });
  it("behind and in front of need the same spot", () => {
    expect(holds(scene, { a: "lamp", rel: "behind", b: "cup" })).toBe(true);
    expect(holds(scene, { a: "cup", rel: "in front of", b: "lamp" })).toBe(true);
    expect(holds(scene, { a: "lamp", rel: "behind", b: "box" })).toBe(false);
  });
  it("negation flips truth (Tractatus 2.21: true or false)", () => {
    expect(holds(scene, { a: "key", rel: "on", b: "box", negated: true })).toBe(true);
    expect(say({ a: "key", rel: "on", b: "box", negated: true })).toBe("The key is not on the box.");
  });
  it("scores one mark per true clause", () => {
    const r = scoreClauses(scene, [
      { a: "cup", rel: "left of", b: "box" },
      { a: "key", rel: "on", b: "box" },
    ]);
    expect(r).toEqual({ results: [true, false], score: 1 });
  });
  it("refuses impossible moves", () => {
    expect(canPlace(scene, "cup", { spot: 1, row: "front" })).toBe(false); // occupied
    expect(canPlace(scene, "book", { on: "ball" })).toBe(false); // ball is not a holder
    expect(canPlace(scene, "box", { in: "book" })).toBe(false); // box too big / cycle
    expect(place(scene, "cup", { in: "box" })).toBe(scene); // box already holds the key
  });
  it("removing a holder returns what it held", () => {
    const next = removeThing(scene, "book");
    expect(next.book).toBeUndefined();
    expect(next.ball).toBeUndefined();
    expect(next.key).toEqual({ in: "box" });
  });
});

import { placesFor } from "../engine";
import { SESSIONS } from "../rounds";

describe("telling a partner where a thing is", () => {
  it("'in the box' pins the key down; 'next to the box' does not", () => {
    const s: Scene = { box: { spot: 1, row: "front" }, key: { in: "box" } };
    expect(placesFor(s, { a: "key", rel: "in", b: "box" })).toHaveLength(1);
    expect(placesFor(s, { a: "key", rel: "next to", b: "box" }).length).toBeGreaterThan(1);
  });
});

describe("authored scene rounds", () => {
  const rounds = SESSIONS.flatMap((s) => s.rounds);
  it("every check round has at least one false sentence that one listed word can fix", () => {
    for (const r of rounds) {
      if (r.mode !== "check") continue;
      const wrong = r.report.filter((c) => !holds(r.scene, c));
      expect(wrong.length, r.id).toBeGreaterThan(0);
      for (const c of wrong) {
        expect(r.options.some((rel) => holds(r.scene, { ...c, rel })), `${r.id}: ${say(c)}`).toBe(true);
      }
    }
  });
  it("every tell round has a true sentence among the options that pins the target down", () => {
    for (const r of rounds) {
      if (r.mode !== "tell") continue;
      const others = (Object.keys(r.scene) as (keyof typeof r.scene)[]).filter((t) => t !== r.target);
      const good = r.options.some((rel) =>
        others.some((b) => {
          const c = { a: r.target, rel, b };
          return holds(r.scene, c) && placesFor(r.scene, c).length === 1;
        }),
      );
      expect(good, r.id).toBe(true);
    }
  });
  it("every build round can be made true", () => {
    for (const r of rounds) {
      if (r.mode !== "build") continue;
      // Search all placements of the things not already standing.
      // Holders first: a thing can only go in or on a holder that is already standing.
      const free = r.things.filter((t) => !r.start?.[t]).sort((x, y) => Number(HOLDERS.includes(y)) - Number(HOLDERS.includes(x)));
      const search = (scene: Scene, i: number): boolean => {
        if (i === free.length) return r.message.every((c) => holds(scene, c));
        return allLocs(scene, free[i]).some((l) => search({ ...scene, [free[i]]: l }, i + 1));
      };
      expect(search({ ...(r.start ?? {}) }, 0), r.id).toBe(true);
    }
  });
});

import { whyFalse } from "../engine";

describe("explaining a false sentence", () => {
  it("names the relation that does hold", () => {
    const s: Scene = { box: { spot: 1, row: "front" }, key: { on: "box" } };
    expect(whyFalse(s, { a: "key", rel: "in", b: "box" })).toBe("The key is on the box, not in it.");
  });
});
