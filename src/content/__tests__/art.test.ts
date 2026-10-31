import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { SESSIONS as BUILDER } from "@/games/builder/rounds";
import { SESSIONS as CAFE } from "@/games/cafe/rounds";
import { SESSIONS as FAMILY } from "@/games/family/rounds";
import { SESSIONS as BEETLE } from "@/games/beetle/rounds";
import { SESSIONS as HINGES } from "@/games/hinges/rounds";
import { GAMES } from "@/content/games";

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
  it("the beetle and the hinges have every round picture and end picture", () => {
    for (const s of [...BEETLE, ...HINGES]) {
      expect(art(s.art.slice(1)), s.id).toBe(true);
      for (const r of s.rounds) expect(art(r.art.slice(1)), r.id).toBe(true);
    }
  });
  it("every stop on the path has its vignette", () => {
    for (const g of GAMES) expect(art(`art/v2/stop-${g.step}.webp`), g.slug).toBe(true);
  });
});
