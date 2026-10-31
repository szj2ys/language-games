import type { Metadata } from "next";
import { CafeGame } from "@/games/cafe/CafeGame";

export const metadata: Metadata = {
  title: "The Café — same words, different jobs",
  description:
    "Practise everyday English requests, hints and polite refusals in a small café. The same sentence can ask, complain or refuse — Wittgenstein's 'meaning is use' (Philosophical Investigations §43) in practice.",
  alternates: { canonical: "/play/cafe" },
};

export default function Page() {
  return <CafeGame />;
}
