import type { Metadata } from "next";
import { GameAbout } from "@/components/game-about";
import { BuilderGame } from "@/games/builder/BuilderGame";

export const metadata: Metadata = {
  title: "2. The builders — Wittgenstein's language-games, played",
  description:
    "Play the builders of Philosophical Investigations §2: fetch stones for a four-word language, give the orders yourself, and see the same words do different jobs (§§2–21).",
  alternates: { canonical: "/play/builder" },
};

export default function Page() {
  return (
    <>
      <BuilderGame />
      <GameAbout slug="builder" />
    </>
  );
}
