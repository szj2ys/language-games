import type { Metadata } from "next";
import { GameAbout } from "@/components/game-about";
import { CafeGame } from "@/games/cafe/CafeGame";

export const metadata: Metadata = {
  title: "3. Meaning is use — Wittgenstein, played",
  description:
    "The same sentence is a request, a hint or a complaint depending on its use. Play through Philosophical Investigations §43 and §23 in a small café.",
  alternates: { canonical: "/play/cafe" },
};

export default function Page() {
  return (
    <>
      <CafeGame />
      <GameAbout slug="cafe" />
    </>
  );
}
