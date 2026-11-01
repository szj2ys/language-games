// "Go On!" — teaching a pupil to follow a rule (PI §§143–151, 185–202).
// The pupil holds several ways of going on. After each example it keeps its
// favourite among the ways that fit every example it has seen. No finite set
// of examples rules out every deviant way in principle (§185); here the
// deviant ways are a fixed, authored list, so the game can be won.

export type Item = {
  word: string;
  /** What each way of going on makes of this word. */
  forms: Record<string, string>;
  /** What someone trained in our practice writes. */
  correct: string;
};

export type Way = { id: string; label: string };

export type Explain = {
  text: string;
  /** How the pupil takes the explanation: one more sign to interpret (§198). */
  readAs: string;
  /**
   * The pupil can only use the explanation's key words ("sound", "stressed")
   * once an example has shown the difference they make — i.e. once this way
   * has been ruled out. Until then it falls back to `otherwise`.
   */
  needs?: { ruledOut: string; otherwise: string };
};

export type Twist = {
  prompt: string;
  /** The teacher's possible calls; one is right. */
  options: { text: string; right: boolean }[];
  why: string;
};

export type Level = {
  id: string;
  title: string;
  task: string;
  ways: Way[];
  /** The pupil's starting favourite comes first. */
  exam: Item[];
  deck: Item[];
  /** A loose explanation the pupil misreads, and a precise one it can follow once it knows the words in it. */
  explain: [Explain, Explain];
  twist: Twist;
  /** The rule the pupil is being taught, in the teacher's words. */
  rule: string;
};

export type Pupil = { shown: Item[]; favourite: string[] };

export function startPupil(level: Level): Pupil {
  return { shown: [], favourite: level.ways.map((w) => w.id) };
}

/** Ways that agree with every example shown so far. */
export function consistentWays(level: Level, shown: Item[]): string[] {
  return level.ways.map((w) => w.id).filter((id) => shown.every((it) => it.forms[id] === it.correct));
}

/** The way the pupil is following now: its first preference still consistent with the examples. */
export function currentWay(level: Level, p: Pupil): string {
  const ok = consistentWays(level, p.shown);
  return p.favourite.find((id) => ok.includes(id)) ?? ok[0] ?? p.favourite[0];
}

export function showExample(p: Pupil, item: Item): Pupil {
  if (p.shown.some((s) => s.word === item.word)) return p;
  return { ...p, shown: [...p.shown, item] };
}

/** An explanation in words moves the pupil's own reading of it to the top — if no example contradicts it. */
export function explain(level: Level, p: Pupil, e: Explain): Pupil {
  const understood = !e.needs || !consistentWays(level, p.shown).includes(e.needs.ruledOut);
  const reading = understood ? e.readAs : e.needs!.otherwise;
  return { ...p, favourite: [reading, ...p.favourite.filter((id) => id !== reading)] };
}

export function sitExam(level: Level, p: Pupil) {
  const way = currentWay(level, p);
  const answers = level.exam.map((it) => ({ word: it.word, said: it.forms[way], correct: it.correct, ok: it.forms[way] === it.correct }));
  return { way, answers, score: answers.filter((a) => a.ok).length, passed: answers.every((a) => a.ok) };
}

/** The fewest deck examples that bring the pupil to a full exam, found by breadth-first search. */
export function bestCards(level: Level): Item[] {
  const n = level.deck.length;
  for (let k = 0; k <= n; k++) {
    const pick = (start: number, chosen: Item[]): Item[] | null => {
      if (chosen.length === k) {
        let p = startPupil(level);
        for (const it of chosen) p = showExample(p, it);
        return sitExam(level, p).passed ? chosen : null;
      }
      for (let i = start; i < n; i++) {
        const found = pick(i + 1, [...chosen, level.deck[i]]);
        if (found) return found;
      }
      return null;
    };
    const found = pick(0, []);
    if (found) return found;
  }
  return level.deck;
}

export function par(level: Level): number {
  return bestCards(level).length;
}

// ---------------------------------------------------------------------------

/** One question in a series: what each way of going on writes there, and what our practice writes. */
export function stepItem(question: string, forms: Record<string, string>, correct: string): Item {
  return { word: question, forms, correct };
}
