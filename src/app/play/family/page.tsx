import type { Metadata } from "next";
import { GameAbout } from "@/components/game-about";
import { FamilyGame } from "@/games/family/FamilyGame";

export const metadata: Metadata = {
  title: "4. Family resemblance — Wittgenstein, played",
  description:
    "What do all games have in common? Test claims, thread cards by overlapping features and meet Wittgenstein's family resemblances (PI §§66–67).",
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
