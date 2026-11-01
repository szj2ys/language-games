import { describe, expect, it } from "vitest";
import { currentWay, explain, par, showExample, sitExam, startPupil } from "../engine";
import { LEVELS } from "../levels";

// weakening-ok: the English spelling levels and their item tests were replaced by rule-following series (v2, Codex review R1).

const addTwo = LEVELS[0];
const card = (word: string) => addTwo.deck.find((i) => i.word === word)!;

describe("the pupil (§185)", () => {
  it("starts with its own way, which fits everything below 1000", () => {
    const p = startPupil(addTwo);
    expect(currentWay(addTwo, p)).toBe("to-1000");
    expect(sitExam(addTwo, p).passed).toBe(false);
  });
  it("is not moved by examples it already fits", () => {
    let p = startPupil(addTwo);
    p = showExample(p, card("after 2"));
    p = showExample(p, card("after 996"));
    expect(currentWay(addTwo, p)).toBe("to-1000");
  });
  it("changes its way once an example tells the ways apart", () => {
    const p = showExample(startPupil(addTwo), card("after 1,000"));
    expect(currentWay(addTwo, p)).toBe("add-2");
    expect(sitExam(addTwo, p).passed).toBe(true);
  });
  it("reads a loose explanation its own way (§198)", () => {
    const p = explain(addTwo, startPupil(addTwo), addTwo.explain[0]);
    expect(currentWay(addTwo, p)).toBe("to-1000");
  });
  it("can follow a precise explanation only once an example has shown what its words mean", () => {
    const cold = explain(addTwo, startPupil(addTwo), addTwo.explain[1]);
    expect(currentWay(addTwo, cold)).toBe("to-1000");
    let p = showExample(startPupil(addTwo), card("after 2,000"));
    p = explain(addTwo, p, addTwo.explain[1]);
    expect(sitExam(addTwo, p).passed).toBe(true);
  });
});

describe("every level", () => {
  for (const level of LEVELS) {
    it(`${level.id} can be taught, and needs teaching`, () => {
      expect(sitExam(level, startPupil(level)).passed).toBe(false);
      let p = startPupil(level);
      for (const it of level.deck) p = showExample(p, it);
      expect(sitExam(level, p).passed).toBe(true);
      expect(par(level)).toBeGreaterThanOrEqual(1);
      // The first explanation must be a misreading, or it teaches nothing about §198.
      const last = level.ways[level.ways.length - 1].id;
      expect(level.explain[0].readAs).not.toBe(last);
      expect(level.explain[1].readAs).toBe(last);
      // In a series, some deck card fits the pupil's own way too: examples alone can mislead (§185).
      // A signpost card always tells the ways apart; its lesson is the custom behind the sign (§198).
      if (level.id !== "r-4") expect(level.deck.some((i) => i.forms[level.ways[0].id] === i.correct)).toBe(true);
    });
    it(`${level.id} has exactly one right call on the new case`, () => {
      expect(level.twist.options.filter((o) => o.right)).toHaveLength(1);
    });
  }
});
