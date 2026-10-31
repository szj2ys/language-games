import { describe, expect, it } from "vitest";
import { currentWay, explain, par, pastItem, showExample, sitExam, startPupil } from "../engine";
import { LEVELS } from "../levels";

const aAn = LEVELS[0];

describe("the pupil", () => {
  it("starts with its favourite way and fails the exam", () => {
    const p = startPupil(aAn);
    expect(currentWay(aAn, p)).toBe("always-a");
    expect(sitExam(aAn, p).passed).toBe(false);
  });
  it("moves to the next consistent way as examples rule ways out (§185)", () => {
    let p = startPupil(aAn);
    p = showExample(
      p,
      aAn.deck.find((i) => i.word === "egg")!,
    );
    expect(currentWay(aAn, p)).toBe("letter");
    expect(sitExam(aAn, p).answers.find((a) => a.word === "hour")?.said).toBe("a hour");
    p = showExample(
      p,
      aAn.deck.find((i) => i.word === "unicorn")!,
    );
    expect(currentWay(aAn, p)).toBe("sound");
    expect(sitExam(aAn, p).passed).toBe(true);
  });
  it("reads an explanation its own way (§198)", () => {
    let p = startPupil(aAn);
    p = explain(aAn, p, aAn.explain[0]);
    expect(currentWay(aAn, p)).toBe("letter");
  });
  it("can follow a precise explanation only once an example has shown what its words mean", () => {
    const cold = explain(aAn, startPupil(aAn), aAn.explain[1]);
    expect(currentWay(aAn, cold)).toBe("letter");
    let p = showExample(
      startPupil(aAn),
      aAn.deck.find((i) => i.word === "unicorn")!,
    );
    p = explain(aAn, p, aAn.explain[1]);
    expect(sitExam(aAn, p).passed).toBe(true);
  });
  it("spells past tenses by the stress rule", () => {
    expect(pastItem({ word: "visit", stressedLast: false }).correct).toBe("visited");
    expect(pastItem({ word: "prefer", stressedLast: true }).correct).toBe("preferred");
    expect(pastItem({ word: "open", stressedLast: false }).forms["double-any"]).toBe("openned");
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
      // The explanation must be a misreading, or it teaches nothing about §198.
      const last = level.ways[level.ways.length - 1].id;
      expect(level.explain[0].readAs).not.toBe(last);
      expect(level.explain[1].readAs).toBe(last);
    });
  }
});
