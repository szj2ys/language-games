import type { Metadata } from "next";
import { Notebook } from "@/components/notebook";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Your notebook",
  description: "The ideas you have met and what you answered, kept in this browser.",
  alternates: { canonical: "/notebook" },
  robots: { index: false },
};

export default function NotebookPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="mx-auto w-full max-w-3xl px-4 py-8">
        <h1 className="font-heading text-[40px] leading-tight font-medium">Your notebook</h1>
        <Notebook />
      </main>
    </>
  );
}
