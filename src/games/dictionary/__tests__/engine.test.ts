import { describe, expect, it } from "vitest";
import type { Stone } from "@/games/builder/engine";
import { perform, runShift, unlocksAfter, type Dictionary } from "../engine";
import { SHIFTS } from "../shifts";

const NAMES: Dictionary = {
  slab: { kind: "name", stone: "slab" },
  block: { kind: "name", stone: "block" },
  beam: { kind: "name", stone: "beam" },
  pillar: { kind: "name", stone: "pillar" },
};
const JOBS: Dictionary = {
  ...NAMES,
  two: { kind: "job", job: "count" },
  three: { kind: "job", job: "count" },
  there: { kind: "job", job: "where" },
  thanks: { kind: "job", job: "thanks" },
};
const STONES: Stone[] = ["slab", "block", "beam", "pillar"];

describe("the dictionary game", () => {
  it("shift 1 is solved by naming", () => {
    expect(runShift(SHIFTS[0], NAMES).right).toBe(4);
  });

  it("no names-only dictionary solves shift 2, whatever the new words name", () => {
    for (const two of STONES)
      for (const there of STONES) {
        const dict: Dictionary = { ...NAMES, two: { kind: "name", stone: two }, three: { kind: "name", stone: two }, there: { kind: "name", stone: there } };
        expect(runShift(SHIFTS[1], dict).right).toBe(0);
      }
  });

  it("jobs solve shift 2, and its failures unlock them", () => {
    expect(runShift(SHIFTS[1], JOBS).right).toBe(4);
    const failed = runShift(SHIFTS[1], NAMES);
    expect(unlocksAfter({ jobs: false, depends: false }, SHIFTS[1], failed)).toEqual({ jobs: true, depends: false });
  });

  it("no fixed entry for “slab” solves shift 3; “it depends” does", () => {
    const asName = runShift(SHIFTS[2], JOBS);
    const asWarning = runShift(SHIFTS[2], { ...JOBS, slab: { kind: "job", job: "warn" } });
    expect(asName.right).toBe(3);
    expect(asWarning.right).toBe(3);
    expect(unlocksAfter({ jobs: true, depends: false }, SHIFTS[2], asName).depends).toBe(true);
    expect(runShift(SHIFTS[2], { ...JOBS, slab: { kind: "depends", usual: "slab", falling: "warn" } }).right).toBe(4);
  });

  it("the helper says what it did in plain words", () => {
    expect(perform(SHIFTS[1].orders[0], NAMES).says).toBe("I don't know “two”, so I did nothing.");
    expect(perform(SHIFTS[1].orders[0], { ...NAMES, two: { kind: "name", stone: "block" } }).says).toBe("I brought a block for “two” and a slab for “slab” to you.");
    expect(perform(SHIFTS[1].orders[3], JOBS).says).toBe("I brought 2 pillars to the left wall.");
  });
});
