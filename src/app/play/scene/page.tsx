import type { Metadata } from "next";
import { GameAbout } from "@/components/game-about";
import { SceneGame } from "@/games/scene/SceneGame";

export const metadata: Metadata = {
  title: "Picture Theatre — prepositions as pictures",
  description:
    "Practise in, on, behind and next to with Wittgenstein's picture theory: build what a sentence says, catch false reports, describe a stage.",
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
