import { describe, expect, it } from "vitest";
import { emptySave, mergeSaves, parseSave, recordRound, SAVE_VERSION } from "../progress";

describe("progress", () => {
  it("treats missing storage as a fresh save", () => {
    expect(parseSave(null)).toEqual({ ok: true, save: emptySave() });
  });
  it("survives corrupt JSON", () => {
    const r = parseSave("{not json");
    expect(r.ok).toBe(false);
    expect(r.save.rounds).toEqual({});
  });
  it("refuses a newer save version instead of overwriting it", () => {
    const r = parseSave(JSON.stringify({ version: SAVE_VERSION + 1, rounds: {} }));
    expect(r).toMatchObject({ ok: false, reason: "newer" });
  });
  it("drops malformed round records but keeps good ones", () => {
    const r = parseSave(JSON.stringify({ version: 1, rounds: { a: { marks: 2, max: 3 }, b: "x" } }));
    expect(Object.keys(r.save.rounds)).toEqual(["a"]);
  });
  it("keeps the best result and is idempotent", () => {
    let s = recordRound(emptySave(), "r1", { marks: 3, max: 3, firstTry: false });
    s = recordRound(s, "r1", { marks: 1, max: 3, firstTry: false });
    s = recordRound(s, "r1", { marks: 1, max: 3, firstTry: false });
    expect(s.rounds.r1).toEqual({ marks: 3, max: 3, firstTry: false });
  });
  it("merges two tabs without losing completion", () => {
    const a = recordRound(emptySave(), "x", { marks: 3, max: 3, firstTry: true }, ["Slab!"]);
    const b = recordRound(emptySave(), "y", { marks: 2, max: 3, firstTry: false }, ["Slab!", "beam"]);
    const m = mergeSaves(a, b);
    expect(Object.keys(m.rounds).sort()).toEqual(["x", "y"]);
    expect(m.phrases).toEqual(["Slab!", "beam"]);
  });
});
