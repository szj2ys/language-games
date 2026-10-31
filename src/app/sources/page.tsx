import type { Metadata } from "next";
import Link from "next/link";
import { SOURCES, WORK_TITLE, type Source, type Work } from "@/content/sources";

export const metadata: Metadata = {
  title: "Sources — the Wittgenstein behind the games",
  description:
    "The Wittgenstein passages behind the Language Games, each with a plain-English reading and the limits of the game's analogy.",
  alternates: { canonical: "/sources" },
};

const TRANSLATION: Record<Work, string> = {
  PI: "tr. G. E. M. Anscombe (short quotations for teaching)",
  TLP: "tr. C. K. Ogden, 1922 (public domain)",
  OC: "tr. Denis Paul and G. E. M. Anscombe (short quotations for teaching)",
};

export default function SourcesPage() {
  const all = Object.values(SOURCES) as Source[];
  const works: Work[] = ["PI", "TLP", "OC"];
  return (
    <main id="main" className="mx-auto w-full max-w-3xl px-4 py-8">
      <Link href="/" className="inline-flex min-h-11 items-center text-[15px] font-bold text-cobalt underline-offset-4 hover:underline">
        ← All games
      </Link>
      <h1 className="mt-3 font-heading text-4xl font-semibold">Sources</h1>
      <p className="mt-3 text-[17px] leading-relaxed">
        The games are inspired by Wittgenstein&apos;s writing; they do not summarise it. Each passage below is quoted briefly, read in plain
        English, and paired with a note on where the game&apos;s analogy stops. Section numbers (§) refer to the numbered remarks; Tractatus
        numbers are proposition numbers.
      </p>
      <Link href="/" className="mt-4 inline-flex h-12 items-center rounded-lg bg-cobalt px-5 text-[17px] font-bold text-paper">
        Play the games
      </Link>
      {works.map((w) => {
        const list = all.filter((s) => s.work === w);
        if (!list.length) return null;
        return (
          <section key={w} className="mt-8" aria-labelledby={`w-${w}`}>
            <h2 id={`w-${w}`} className="font-heading text-2xl font-semibold">
              {WORK_TITLE[w]}
            </h2>
            <p className="text-sm text-muted-foreground">{TRANSLATION[w]}</p>
            <ul className="mt-3 flex flex-col gap-3">
              {list.map((s) => (
                <li key={s.id} id={s.id} className="rounded-xl border border-border bg-card p-4">
                  <p className="font-heading font-semibold text-terracotta">{s.ref}</p>
                  <blockquote className="mt-1 font-heading text-[17px] leading-snug italic">“{s.quote}”</blockquote>
                  <p className="mt-2 text-[15px] leading-relaxed">{s.gloss}</p>
                  {s.limits && <p className="mt-1 text-sm text-muted-foreground">Where the game stops: {s.limits}</p>}
                  <a
                    href={s.url}
                    className="mt-1 inline-flex min-h-11 items-center text-sm font-bold text-cobalt underline-offset-4 hover:underline"
                    rel="noopener"
                  >
                    Read the original text
                  </a>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </main>
  );
}
