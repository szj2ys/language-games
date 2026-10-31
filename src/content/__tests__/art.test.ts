import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { SESSIONS as BUILDER } from "@/games/builder/rounds";
import { SESSIONS as CAFE } from "@/games/cafe/rounds";
import { SESSIONS as FAMILY } from "@/games/family/rounds";

// Authored rounds name their pictures by id; a round without its file ships a broken image.
const art = (path: string) => existsSync(join(process.cwd(), "public", path));

describe("every authored round has its picture", () => {
  it("café rounds have a before and an after picture", () => {
    for (const r of CAFE.flatMap((s) => s.rounds)) {
      expect(art(`art/cafe/rounds/${r.id}.webp`), r.id).toBe(true);
      expect(art(`art/cafe/after/${r.id}.webp`), r.id).toBe(true);
    }
  });
  it("Slab! use rounds have a site picture", () => {
    for (const r of BUILDER.flatMap((s) => s.rounds).filter((r) => r.role === "use")) {
      expect(art(`art/builder/use/${r.id}.webp`), r.id).toBe(true);
    }
  });
  it("family cards and newcomers have a card picture", () => {
    for (const s of FAMILY) {
      const newcomers = s.rounds.flatMap((r) => (r.mode === "newcomer" ? [r.newcomer] : []));
      for (const c of [...s.cards, ...newcomers]) expect(art(`art/family/${c.id}.webp`), c.id).toBe(true);
    }
  });
});
