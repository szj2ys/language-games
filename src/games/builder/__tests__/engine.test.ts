import { describe, expect, it } from "vitest";
import { callFor, interpret, markDelivery, sentence, type Stone } from "../engine";

const yard: Stone[] = ["slab", "slab", "beam", "pillar", "pillar", "block"];

describe("builder calls", () => {
  it("says calls the way §2 and §8 builders do", () => {
    expect(callFor({ stone: "slab", count: 1, place: "builder" })).toBe("Slab!");
    expect(callFor({ stone: "slab", count: 2, place: "right" })).toBe("Two slabs — there!");
  });
  it("gives one mark each for stone, number and place", () => {
    const r = markDelivery({ stone: "slab", count: 2, place: "left" }, { stone: "slab", count: 1, place: "left" });
    expect(r.score).toBe(2);
    expect(r.marks.count).toBe(false);
  });
});

describe("assistant interprets the player's call", () => {
  it("accepts a one-word call as a complete order (§19–20)", () => {
    expect(interpret({ tiles: [{ kind: "stone", value: "slab" }] }, yard)).toEqual({
      kind: "acts",
      delivery: { stone: "slab", count: 1, place: "builder" },
      said: "Slab!",
    });
  });
  it("needs a pointing gesture for 'there'", () => {
    const tiles = [{ kind: "number", value: 2 }, { kind: "stone", value: "pillar" }, { kind: "there" }] as const;
    expect(interpret({ tiles: [...tiles] }, yard).kind).toBe("asks");
    const r = interpret({ tiles: [...tiles], pointAt: "left" }, yard);
    expect(r).toMatchObject({ kind: "acts", delivery: { stone: "pillar", count: 2, place: "left" }, said: "Two pillars there!" });
  });
  it("resolves 'this' by what is pointed at", () => {
    const r = interpret({ tiles: [{ kind: "this" }], pointAt: { stoneIndex: 2 } }, yard);
    expect(r).toMatchObject({ kind: "acts", delivery: { stone: "beam", count: 1 } });
    expect(interpret({ tiles: [{ kind: "this" }] }, yard)).toMatchObject({ kind: "asks" });
  });
  it("asks rather than guessing when the yard cannot supply the order", () => {
    const r = interpret({ tiles: [{ kind: "number", value: 3 }, { kind: "stone", value: "beam" }] }, yard);
    expect(r).toEqual({ kind: "asks", question: "There is only 1 in the yard." });
  });
  it("asks 'Bring what?' for a bare number", () => {
    expect(interpret({ tiles: [{ kind: "number", value: 2 }] }, yard)).toMatchObject({ question: "Bring what?" });
  });
  it("builds readable sentences", () => {
    expect(sentence([{ kind: "number", value: 4 }, { kind: "stone", value: "block" }])).toBe("Four blocks!");
  });
});
