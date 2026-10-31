import type { Metadata } from "next";
import { FamilyGame } from "@/games/family/FamilyGame";

export const metadata: Metadata = {
  title: "Family Threads — what do all games have in common?",
  description:
    "Practise all, most, some and none, and 'both … and', by testing claims about games and tools against the cards — Wittgenstein's family resemblances (Philosophical Investigations §§66–67).",
  alternates: { canonical: "/play/family" },
};

export default function Page() {
  return <FamilyGame />;
}
