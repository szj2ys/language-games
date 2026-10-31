import { describe, expect, it } from "vitest";
import { SESSIONS } from "../rounds";

describe("café rounds", () => {
  const rounds = SESSIONS.flatMap((s) => s.rounds);
  it("have unique ids", () => {
    expect(new Set(rounds.map((r) => r.id)).size).toBe(rounds.length);
  });
  it("each have exactly one fitting response and at least one that misreads the use", () => {
    for (const r of rounds) {
      expect(r.options.filter((o) => o.fits), r.id).toHaveLength(1);
      expect(r.options.some((o) => !o.fits), r.id).toBe(true);
    }
  });
  it("pair the same words with different uses at least twice", () => {
    const bySays = new Map<string, Set<string>>();
    for (const r of rounds) bySays.set(r.says, (bySays.get(r.says) ?? new Set()).add(r.use));
    const pairs = [...bySays.values()].filter((uses) => uses.size > 1);
    expect(pairs.length).toBeGreaterThanOrEqual(2);
  });
});
