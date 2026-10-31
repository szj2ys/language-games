import { describe, expect, it } from "vitest";
import { checkChain, claimHolds, claimText, counterexample, noCommonFibre, strongest } from "../engine";
import { SESSIONS } from "../rounds";

const games = SESSIONS[0];
const by = (id: string) => games.cards.find((c) => c.id === id)!;

describe("claims about these cards", () => {
  it("'All of these games have a winner' is false; the wall is the counterexample (§66)", () => {
    expect(claimHolds(games.cards, "winner", "All")).toBe(false);
    expect(counterexample(games.cards, "winner", "All")?.id).toBe("wall");
    expect(strongest(games.cards, "winner")).toBe("Most");
  });
  it("sets blurred cards aside rather than guessing", () => {
    // patience is blurred for 'winner': 3 of the 5 clear cards have one.
    expect(claimHolds(games.cards, "winner", "Most")).toBe(true);
  });
  it("writes the claim with the right verb form", () => {
    const f = games.features.find((x) => x.id === "winner")!;
    expect(claimText("Most", "games", f)).toBe("Most of these games have a winner.");
    expect(claimText("None", "games", f)).toBe("None of these games has a winner.");
  });
  it("checks a chain link by link", () => {
    const r = checkChain([{ card: by("chess") }, { card: by("poker"), link: "skill" }, { card: by("ring"), link: "group" }]);
    expect(r.ok).toBe(true);
    expect(r.fibres).toBe(2);
    expect(checkChain([{ card: by("chess") }, { card: by("ring"), link: "skill" }]).ok).toBe(false);
  });
});

describe("authored family sessions", () => {
  for (const s of SESSIONS) {
    it(`${s.id}: no single feature runs through every card (§67)`, () => {
      expect(noCommonFibre(s.cards, s.features)).toBe(true);
    });
    it(`${s.id}: claim rounds have a false 'All' with a counterexample`, () => {
      for (const r of s.rounds) {
        if (r.mode !== "claim") continue;
        expect(claimHolds(s.cards, r.feature, "All"), r.id).toBe(false);
        expect(counterexample(s.cards, r.feature, "All"), r.id).toBeDefined();
      }
    });
    it(`${s.id}: the cards can be threaded into one chain`, () => {
      const cards = s.cards;
      const link = (a: (typeof cards)[number], b: (typeof cards)[number]) =>
        s.features.some((f) => a.features[f.id] === true && b.features[f.id] === true);
      const search = (chain: typeof cards): boolean =>
        chain.length === cards.length || cards.some((c) => !chain.includes(c) && link(chain[chain.length - 1], c) && search([...chain, c]));
      expect(cards.some((c) => search([c]))).toBe(true);
    });
  }
});
