import type { Metadata } from "next";
import { BuilderGame } from "@/games/builder/BuilderGame";

export const metadata: Metadata = {
  title: "Slab! — the builder's game",
  description:
    "Learn English orders, numbers and 'there' the way Wittgenstein's builders do (Philosophical Investigations §2): hear the call, bring the stones, then give the orders yourself.",
  alternates: { canonical: "/play/builder" },
};

export default function Page() {
  return <BuilderGame />;
}
