import type { SourceId } from "@/content/sources";

type RoundBase = {
  id: string;
  /** A 16:9 picture in /public. */
  art: string;
  /** What the round shows, in one sentence, once it is done. */
  point: string;
  source: SourceId;
};

/** A situation, a question about it, and answers that each get a reply: one is the point of the passage. */
export type ChoiceRound = RoundBase & {
  kind?: "choice";
  /** The situation, as you would tell it. */
  situation: string;
  question: string;
  options: { text: string; right: boolean; reply: string }[];
};

/** You decide what is in your own box; the talk around the table goes on, word for word the same (§293). */
export type BoxesRound = RoundBase & {
  kind: "boxes";
  situation: string;
  contents: string[];
  /** The evening's talk: who says what. It never depends on what is in anyone's box. */
  talk: { who: string; line: string }[];
  question: string;
  options: { text: string; right: boolean; reply: string }[];
};

/** A private diary of "S" (§258), then a gauge that gives "S" something to be checked against (§270). */
export type DiaryRound = RoundBase & {
  kind: "diary";
  situation: string;
  /** Each day's sensation, drawn as a shape, and whether the blood-pressure gauge rose that day. */
  days: { shape: number; gauge: boolean }[];
};

/** A claim, the ways to check it, and what each check relies on; the hinges are the checks that rely on themselves. */
export type ChecksRound = RoundBase & {
  kind: "checks";
  situation: string;
  start: string;
  claims: Record<string, { text: string; checks: { how: string; reliesOn: string[] }[] }>;
};

/** Sort claims into the water (open to checking) and the river-bed (standing fast), then see the bed shift (OC §§96–97). */
export type SortRound = RoundBase & {
  kind: "sort";
  situation: string;
  eras: { year: string; note: string }[];
  cards: { text: string; bed: boolean[] }[];
};

export type AnyRound = ChoiceRound | BoxesRound | DiaryRound | ChecksRound | SortRound;

export type ChoiceSession = {
  id: string;
  title: string;
  blurb: string;
  /** The idea this session shows, in one sentence. */
  shows: string;
  source: SourceId;
  /** The picture on the end card. */
  art: string;
  rounds: AnyRound[];
};

/** What a round showed, for the end card and the notebook. */
export function did(r: AnyRound): string {
  return r.point;
}

/** The claims in a checks round whose every check relies on the claim itself: the hinges (OC §125). */
export function hingesOf(r: ChecksRound): string[] {
  return Object.entries(r.claims)
    .filter(([id, c]) => c.checks.length > 0 && c.checks.every((k) => k.reliesOn.includes(id)))
    .map(([id]) => id);
}
