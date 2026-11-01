import { describe, expect, it } from "vitest";
import { SESSIONS as BEETLE } from "@/games/beetle/rounds";
import { SESSIONS as HINGES } from "@/games/hinges/rounds";
import { SOURCES } from "@/content/sources";
import type { AnyRound } from "../types";

const questions = (r: AnyRound) => ("options" in r ? r.options : []);

describe.each([
  ["beetle", BEETLE],
  ["hinges", HINGES],
])("%s rounds", (_, sessions) => {
  const rounds = sessions.flatMap((s) => s.rounds);
  it("have unique ids", () => {
    expect(new Set(rounds.map((r) => r.id)).size).toBe(rounds.length);
  });
  it("each question has exactly one right answer, at least one wrong one, and a reply for every answer", () => {
    for (const r of rounds.filter((x) => "options" in x)) {
      const options = questions(r);
      expect(
        options.filter((o) => o.right),
        r.id,
      ).toHaveLength(1);
      expect(
        options.some((o) => !o.right),
        r.id,
      ).toBe(true);
      for (const o of options) expect(o.reply.length, `${r.id}: ${o.text}`).toBeGreaterThan(10);
    }
  });
  it("cite passages that exist", () => {
    for (const s of sessions) {
      expect(SOURCES[s.source], s.id).toBeDefined();
      for (const r of s.rounds) expect(SOURCES[r.source], r.id).toBeDefined();
    }
  });
  it("begin each session with something to do, not a question", () => {
    for (const s of sessions) expect(s.rounds[0].kind, s.id).toBeDefined();
  });
});

describe("activities", () => {
  const all = [...BEETLE, ...HINGES].flatMap((s) => s.rounds);
  it("every check takes something else for granted: no check relies on what it checks (OC §§341–343)", () => {
    for (const r of all) {
      if (r.kind !== "checks") continue;
      for (const [id, c] of Object.entries(r.claims))
        for (const k of c.checks) {
          expect(k.reliesOn.length, k.how).toBeGreaterThan(0);
          expect(k.reliesOn, k.how).not.toContain(id);
          for (const dep of k.reliesOn) expect(r.claims[dep], dep).toBeDefined();
        }
      // The things the starting claim relies on can themselves be checked: nothing is a hinge in itself.
      for (const k of r.claims[r.start].checks) for (const dep of k.reliesOn) expect(r.claims[dep].checks.length, dep).toBeGreaterThan(0);
    }
  });
  it("the river-bed shifts: some card changes between the years, and each card has a place in each year", () => {
    for (const r of all) {
      if (r.kind !== "sort") continue;
      for (const c of r.cards) expect(c.bed, c.text).toHaveLength(r.eras.length);
      expect(r.cards.some((c) => c.bed[0] !== c.bed[c.bed.length - 1])).toBe(true);
    }
  });
  it("the boxes round offers an empty box (§293: the box might even be empty)", () => {
    const boxes = all.find((r) => r.kind === "boxes");
    expect(boxes && boxes.kind === "boxes" && boxes.contents.some((c) => /nothing/i.test(c))).toBe(true);
  });
});
