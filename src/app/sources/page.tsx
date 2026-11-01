import type { Metadata } from "next";
import { SOURCES, WORK_TITLE, type Source, type Work } from "@/content/sources";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Sources — every Wittgenstein passage the games use",
  description:
    "Every Wittgenstein passage behind the games, from the Tractatus to On Certainty, each with a plain reading and where the game's analogy stops.",
  alternates: { canonical: "/sources" },
};

/** The English editions quoted, so every quotation can be checked in print; section numbers are the same in every edition. */
const TRANSLATION: Record<Work, string> = {
  PI: "Quoted from the English translation by G. E. M. Anscombe (Blackwell, 2nd ed. 1958), Part I; short quotations for teaching. Later editions (Hacker & Schulte, 2009) revise some wording.",
  TLP: "Quoted from the English translation by C. K. Ogden (Kegan Paul, 1922), public domain; the link opens the full text.",
  OC: "Quoted from the English translation by Denis Paul and G. E. M. Anscombe (Blackwell, 1969); short quotations for teaching.",
};

export default function SourcesPage() {
  const all = Object.values(SOURCES) as Source[];
  // In the order he wrote them: Tractatus (1921), Investigations (1953), On Certainty (1969); remarks in number order.
  const works: Work[] = ["TLP", "PI", "OC"];
  const order = (ref: string) => parseFloat(ref.replace(/[^0-9.]/g, "")) || 9999;
  return (
    <>
      <SiteHeader />
      <main id="main" className="mx-auto w-full max-w-3xl px-4 py-8">
        <h1 className="font-heading text-[40px] leading-tight font-medium">Sources</h1>
        <p className="mt-3 text-[18px] leading-relaxed">
          Every passage the games use, quoted briefly, with a plain reading and a note on where the game&apos;s analogy stops. The games
          help you see the ideas; they do not replace the books. Section numbers (§) are Wittgenstein&apos;s numbered remarks; Tractatus
          numbers are proposition numbers.
        </p>
        {works.map((w) => {
          const list = all.filter((s) => s.work === w).sort((x, y) => order(x.ref) - order(y.ref));
          if (!list.length) return null;
          return (
            <section key={w} className="mt-8" aria-labelledby={`w-${w}`}>
              <h2 id={`w-${w}`} className="font-heading text-[28px] font-medium">
                {WORK_TITLE[w]}
              </h2>
              <p className="text-sm text-muted-foreground">{TRANSLATION[w]}</p>
              <ul className="mt-3 flex flex-col gap-3">
                {list.map((s) => (
                  <li key={s.id} id={s.id} className="scroll-mt-4 rounded-lg border border-border bg-card p-4">
                    <p className="font-heading text-[18px] font-medium text-vermilion">{s.ref}</p>
                    <blockquote className="mt-1 font-heading text-[19px] leading-snug italic">“{s.quote}”</blockquote>
                    <p className="mt-2 text-[16px] leading-relaxed">{s.gloss}</p>
                    {s.limits && <p className="mt-1 text-[15px] text-muted-foreground">Where the game stops: {s.limits}</p>}
                    <a
                      href={s.url}
                      className="mt-1 inline-flex min-h-11 items-center text-sm font-bold underline underline-offset-4"
                      rel="noopener"
                    >
                      {s.work === "TLP" ? "Full text in English (Ogden)" : "The German original (Wittgenstein Project)"}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </main>
    </>
  );
}
