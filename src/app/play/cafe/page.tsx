import type { Metadata } from "next";
import { GameAbout } from "@/components/game-about";
import { CafeGame } from "@/games/cafe/CafeGame";

export const metadata: Metadata = {
  title: "The Café — same words, different jobs",
  description:
    "Everyday English requests, hints and polite refusals in a small café: the same words do different jobs. Meaning is use (PI §43).",
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
