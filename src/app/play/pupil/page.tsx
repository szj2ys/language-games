import type { Metadata } from "next";
import { GameAbout } from "@/components/game-about";
import { PupilGame } from "@/games/pupil/PupilGame";

export const metadata: Metadata = {
  title: "Go On! — teach a pupil the rules of English",
  description:
    "Teach a stubborn pupil a/an, plurals, -ed, comparatives, -ing or to, and uncountable nouns with as few examples as you can — Wittgenstein on rule-following, as a puzzle.",
  alternates: { canonical: "/play/pupil" },
};

export default function Page() {
  return (
    <>
      <PupilGame />
      <GameAbout slug="pupil" />
    </>
  );
}
