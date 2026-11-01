import { describe, expect, it } from "vitest";
import { emptySave, mergeSaves, parseSave, recordRound, resetSave, resolvePosition, resumeTarget, SAVE_VERSION } from "../progress";
import oldSave from "./old-save.fixture.json";
import { SESSIONS as PUPIL } from "@/games/pupil/levels";
import { SESSIONS as BEETLE } from "@/games/beetle/rounds";
import { SESSIONS as BUILDER } from "@/games/builder/rounds";

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

describe("saved positions", () => {
  it("drops impossible positions instead of crashing the game", () => {
    const r = parseSave(
      JSON.stringify({ version: 1, rounds: {}, positions: { builder: { session: -1, round: 0 }, scene: { session: 1, round: 2 } } }),
    );
    expect(r.save.positions).toEqual({ scene: { session: 1, round: 2 } });
  });
});

describe("reset across tabs", () => {
  it("a reset in one tab is not undone by another tab's older save", () => {
    const played = recordRound(emptySave(), "r1", { marks: 3, max: 3, firstTry: true });
    const reset = resetSave(played);
    expect(mergeSaves(played, reset).rounds).toEqual({});
    expect(mergeSaves(reset, played).rounds).toEqual({});
    // Progress made after the reset is kept.
    const after = recordRound(reset, "r2", { marks: 1, max: 3, firstTry: false });
    expect(Object.keys(mergeSaves(after, played).rounds)).toEqual(["r2"]);
  });
});

describe("resuming after the content changed", () => {
  // A real save from before the rule-following and beetle sessions were rewritten (Codex review r2, R2-3).
  const old = oldSave as { positions: Record<string, { session: number; round: number }>; rounds: Record<string, unknown> };
  it("does not open an end card for rounds that were never played", () => {
    expect(resolvePosition(PUPIL, old.rounds, old.positions.pupil)).toEqual({ session: 0, round: 0, finished: false });
    expect(resolvePosition(BEETLE, old.rounds, old.positions.beetle)).toEqual({ session: 0, round: 0, finished: false });
  });
  it("keeps the place in a game whose content did not change", () => {
    expect(resolvePosition(BUILDER, old.rounds, old.positions.builder).finished).toBe(true);
  });
  it("starts at the beginning with no save", () => {
    expect(resolvePosition(BUILDER, {}, undefined)).toEqual({ session: 0, round: 0, finished: false });
  });
  it("on arrival, does not reopen an end card while a replaced round elsewhere is unplayed", () => {
    const games = [{ rounds: [{ id: "new" }, { id: "b" }] }, { rounds: [{ id: "c" }] }];
    // During play the end card of the session just finished still shows...
    expect(resolvePosition(games, { b: {}, c: {} }, { session: 1, round: 1 }).finished).toBe(true);
    // ...but a returning player is sent to the unplayed round.
    expect(resumeTarget(games, { b: {}, c: {} }, { session: 1, round: 1 })).toEqual({ session: 0, round: 0 });
    expect(resumeTarget(games, { new: {}, b: {}, c: {} }, { session: 1, round: 1 })).toBeNull();
  });
});
