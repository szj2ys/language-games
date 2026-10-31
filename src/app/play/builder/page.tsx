import type { Metadata } from "next";
import { GameAbout } from "@/components/game-about";
import { BuilderGame } from "@/games/builder/BuilderGame";

export const metadata: Metadata = {
  title: "Slab! — the builder's game",
  description:
    "Learn English orders, numbers and plurals like Wittgenstein's builders (PI §2): hear the call, bring the stones, then give the orders yourself.",
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
