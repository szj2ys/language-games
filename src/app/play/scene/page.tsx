import type { Metadata } from "next";
import { SceneGame } from "@/games/scene/SceneGame";

export const metadata: Metadata = {
  title: "Picture Theatre — prepositions as pictures",
  description:
    "Practise English prepositions (in, on, behind, next to) with Wittgenstein's early picture theory: build the scene a sentence describes, catch false reports, and tell a partner exactly where things are.",
  alternates: { canonical: "/play/scene" },
};

export default function Page() {
  return <SceneGame />;
}
