import type { Metadata } from "next";
import { GameAbout } from "@/components/game-about";
import { HingesGame } from "@/games/hinges/HingesGame";

export const metadata: Metadata = {
  title: "7. Hinges of certainty — Wittgenstein's On Certainty",
  description:
    "Play through Wittgenstein's last notes, On Certainty: which doubts can be settled, which certainties our doubts turn on, and how the river-bed of thought can shift.",
  alternates: { canonical: "/play/hinges" },
};

export default function Page() {
  return (
    <>
      <HingesGame />
      <GameAbout slug="hinges" />
    </>
  );
}
