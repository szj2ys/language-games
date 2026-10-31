import type { Metadata } from "next";
import { GameAbout } from "@/components/game-about";
import { SceneGame } from "@/games/scene/SceneGame";

export const metadata: Metadata = {
  title: "1. Pictures of facts — Wittgenstein's picture theory, played",
  description:
    "Play the Tractatus picture theory: set up a stage so a sentence is true, catch false reports, and find the one sentence that pins a fact down (TLP 2.1–4.0621).",
  alternates: { canonical: "/play/scene" },
};

export default function Page() {
  return (
    <>
      <SceneGame />
      <GameAbout slug="scene" />
    </>
  );
}
