import type { Metadata } from "next";
import { GameAbout } from "@/components/game-about";
import { BeetleGame } from "@/games/beetle/BeetleGame";

export const metadata: Metadata = {
  title: "6. The beetle in the box — Wittgenstein's private language argument",
  description:
    "Play Wittgenstein's beetle in the box (§293) and the private diary (§258): what gives words for sensations their meaning, if no one can look into anyone else's box?",
  alternates: { canonical: "/play/beetle" },
};

export default function Page() {
  return (
    <>
      <BeetleGame />
      <GameAbout slug="beetle" />
    </>
  );
}
