import type { Metadata } from "next";
import { DictionaryGame } from "@/games/dictionary/DictionaryGame";

// A prototype of a new kind of game, tried with players before the seven are rebuilt this way.
export const metadata: Metadata = {
  title: "The helper's dictionary (prototype) — Wittgenstein, played",
  description: "Write a building helper's dictionary, run the shift, and watch the idea that every word names a thing break (Philosophical Investigations §§1–43).",
  robots: { index: false },
};

export default function Page() {
  return <DictionaryGame />;
}
