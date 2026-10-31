import type { Metadata } from "next";
import { GameAbout } from "@/components/game-about";
import { FamilyGame } from "@/games/family/FamilyGame";

export const metadata: Metadata = {
  title: "Family Threads — what do all games share?",
  description:
    "Practise all, most, some, none and 'both … and' by testing claims about games and tools — Wittgenstein's family resemblances (PI §66).",
  alternates: { canonical: "/play/family" },
};

export default function Page() {
  return (
    <>
      <FamilyGame />
      <GameAbout slug="family" />
    </>
  );
}
