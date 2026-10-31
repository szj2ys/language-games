import type { Metadata } from "next";
import { PupilGame } from "@/games/pupil/PupilGame";

export const metadata: Metadata = {
  title: "Go On! — teach a pupil English spelling rules",
  description:
    "Teach a stubborn pupil a/an, plurals, past-tense spelling and comparatives with as few examples as possible — Wittgenstein's rule-following (Philosophical Investigations §§185–202) as a puzzle.",
  alternates: { canonical: "/play/pupil" },
};

export default function Page() {
  return <PupilGame />;
}
