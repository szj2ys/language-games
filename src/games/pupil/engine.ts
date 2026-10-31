// "Go On!" — teaching a pupil to follow a rule (PI §§143–151, 185–202).
// The pupil holds several ways of going on. After each example it keeps its
// favourite among the ways that fit every example it has seen. No finite set
// of examples rules out every deviant way in principle (§185); here the
// deviant ways are a fixed, authored list, so the game can be won.

export type Item = {
  word: string;
  /** What each way of going on makes of this word. */
  forms: Record<string, string>;
  /** What English speakers write. */
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
  item: Item;
  prompt: string;
  /** The teacher's call: correct the pupil, or accept that both forms are in use. */
  answer: "correct" | "both";
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
  english: string;
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
// Rules as functions, so every form in the data is generated, not typed by hand.

export type AArticle = { word: string; vowelSound: boolean };

export function articleItem(w: AArticle): Item {
  const letter = /^[aeiou]/i.test(w.word);
  return {
    word: w.word,
    forms: {
      "always-a": `a ${w.word}`,
      letter: `${letter ? "an" : "a"} ${w.word}`,
      sound: `${w.vowelSound ? "an" : "a"} ${w.word}`,
    },
    correct: `${w.vowelSound ? "an" : "a"} ${w.word}`,
  };
}

const SIBILANT = /(s|x|z|ch|sh)$/;
const CONS_Y = /[^aeiou]y$/;

export function pluralItem(word: string, irregular?: string): Item {
  const s = `${word}s`;
  const es = SIBILANT.test(word) ? `${word}es` : s;
  const anyY = /y$/.test(word) ? `${word.slice(0, -1)}ies` : es;
  const consY = CONS_Y.test(word) ? `${word.slice(0, -1)}ies` : es;
  return {
    word,
    forms: { s, es, "any-y": anyY, "consonant-y": consY },
    correct: irregular ?? consY,
  };
}

/** Present simple after he/she/it: the same spelling choices as plurals (watches, tries, plays). */
export function thirdPersonItem(word: string, irregular?: string): Item {
  const plural = pluralItem(word, irregular);
  const she = (form: string) => `she ${form}`;
  return {
    word,
    forms: Object.fromEntries(Object.entries(plural.forms).map(([way, form]) => [way, she(form)])),
    correct: she(plural.correct),
  };
}

export type Verb = { word: string; stressedLast: boolean };

const CVC = /[^aeiou][aeiou][^aeiouwxy]$/;

export function pastItem(v: Verb): Item {
  const w = v.word;
  const plain = `${w}ed`;
  const dropE = w.endsWith("e") ? `${w}d` : plain;
  const doubleAny = CVC.test(w) ? `${w}${w.slice(-1)}ed` : dropE;
  const doubleStressed = CVC.test(w) && v.stressedLast ? `${w}${w.slice(-1)}ed` : dropE;
  return {
    word: w,
    forms: { ed: plain, "drop-e": dropE, "double-any": doubleAny, "double-stressed": doubleStressed },
    correct: doubleStressed,
  };
}

/** -ing spelling: the same choices as -ed (making, stopping, visiting). */
export function ingItem(v: Verb, irregular?: string): Item {
  const w = v.word;
  const plain = `${w}ing`;
  const dropE = w.endsWith("e") ? `${w.slice(0, -1)}ing` : plain;
  const doubleAny = CVC.test(w) ? `${w}${w.slice(-1)}ing` : dropE;
  const doubleStressed = CVC.test(w) && v.stressedLast ? `${w}${w.slice(-1)}ing` : dropE;
  return {
    word: w,
    forms: { ing: plain, "drop-e": dropE, "double-any": doubleAny, "double-stressed": doubleStressed },
    correct: irregular ?? doubleStressed,
  };
}

export type Adjective = { word: string; syllables: number };

export function comparativeItem(a: Adjective): Item {
  const w = a.word;
  const er = (x: string) => (x.endsWith("e") ? `${x}r` : `${x}er`);
  const short = CVC.test(w) ? `${w}${w.slice(-1)}er` : /y$/.test(w) ? `${w.slice(0, -1)}ier` : er(w);
  const always = er(w);
  const bySyllable = a.syllables === 1 ? short : `more ${w}`;
  const correct = a.syllables === 1 || (a.syllables === 2 && /y$/.test(w)) ? short : `more ${w}`;
  return { word: w, forms: { "always-er": always, syllables: bySyllable, "y-too": correct }, correct };
}

export type VerbPattern = { word: string; looksAhead: boolean };

/** "I enjoy swimming" / "I want to swim": the pupil's ways of going on after a verb. */
export function patternItem(v: VerbPattern, next = "swim", ing = "swimming"): Item {
  return {
    word: v.word,
    forms: {
      "always-to": `${v.word} to ${next}`,
      "always-ing": `${v.word} ${ing}`,
      "looks-ahead": v.looksAhead ? `${v.word} to ${next}` : `${v.word} ${ing}`,
    },
    correct: v.looksAhead ? `${v.word} to ${next}` : `${v.word} ${ing}`,
  };
}

export type Noun = { word: string; abstract: boolean; uncountable: boolean; plural?: string };

/** "two chairs" but "two pieces of furniture". */
export function countItem(n: Noun): Item {
  const counted = `two ${n.plural ?? `${n.word}s`}`;
  const pieces = `two pieces of ${n.word}`;
  return {
    word: n.word,
    forms: {
      "always-s": counted,
      abstract: n.abstract ? pieces : counted,
      listed: n.uncountable ? pieces : counted,
    },
    correct: n.uncountable ? pieces : counted,
  };
}
