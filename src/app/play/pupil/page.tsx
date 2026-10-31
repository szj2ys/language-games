import type { Metadata } from "next";
import { GameAbout } from "@/components/game-about";
import { PupilGame } from "@/games/pupil/PupilGame";

export const metadata: Metadata = {
  title: "5. Following a rule — Wittgenstein, played",
  description:
    "Teach a stubborn pupil a rule with as few examples as you can, and find out why no example or explanation fixes a rule on its own (PI §§185–217).",
  alternates: { canonical: "/play/pupil" },
};

export default function Page() {
  return (
    <>
      <PupilGame />
      <GameAbout slug="pupil" />
    </>
  );
}
