import { describe, expect, it } from "vitest";
import { SESSIONS as BEETLE } from "@/games/beetle/rounds";
import { SESSIONS as HINGES } from "@/games/hinges/rounds";
import { SOURCES } from "@/content/sources";

describe.each([
  ["beetle", BEETLE],
  ["hinges", HINGES],
])("%s rounds", (_, sessions) => {
  const rounds = sessions.flatMap((s) => s.rounds);
  it("have unique ids", () => {
    expect(new Set(rounds.map((r) => r.id)).size).toBe(rounds.length);
  });
  it("each have exactly one right answer, at least one wrong one, and a reply for every answer", () => {
    for (const r of rounds) {
      expect(
        r.options.filter((o) => o.right),
        r.id,
      ).toHaveLength(1);
      expect(
        r.options.some((o) => !o.right),
        r.id,
      ).toBe(true);
      for (const o of r.options) expect(o.reply.length, `${r.id}: ${o.text}`).toBeGreaterThan(10);
    }
  });
  it("cite passages that exist", () => {
    for (const s of sessions) {
      expect(SOURCES[s.source], s.id).toBeDefined();
      for (const r of s.rounds) expect(SOURCES[r.source], r.id).toBeDefined();
    }
  });
});
