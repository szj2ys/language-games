import type { SourceId } from "@/content/sources";

/** A situation, a question about it, and answers that each get a reply: one is the point of the passage. */
export type ChoiceRound = {
  id: string;
  /** A 16:9 picture in /public. */
  art: string;
  /** The situation, as you would tell it. */
  situation: string;
  question: string;
  options: { text: string; right: boolean; reply: string }[];
  /** What the round shows, in one sentence, after the right answer. */
  point: string;
  source: SourceId;
};

export type ChoiceSession = {
  id: string;
  title: string;
  blurb: string;
  /** The idea this session shows, in one sentence. */
  shows: string;
  source: SourceId;
  /** The picture on the end card. */
  art: string;
  rounds: ChoiceRound[];
};

/** What a round asked about, for the end card and the notebook. */
export function did(r: ChoiceRound): string {
  return r.point;
}
