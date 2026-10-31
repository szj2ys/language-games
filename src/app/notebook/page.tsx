import type { Metadata } from "next";
import Link from "next/link";
import { Notebook } from "@/components/notebook";

export const metadata: Metadata = {
  title: "Your notebook",
  description: "The English you have used in the Language Games, kept in this browser.",
  alternates: { canonical: "/notebook" },
  robots: { index: false },
};

export default function NotebookPage() {
  return (
    <main id="main" className="mx-auto w-full max-w-3xl px-4 py-8">
      <Link href="/" className="text-sm font-bold text-cobalt underline-offset-4 hover:underline">
        ← All games
      </Link>
      <h1 className="mt-3 font-heading text-4xl font-semibold">Your notebook</h1>
      <Notebook />
    </main>
  );
}
