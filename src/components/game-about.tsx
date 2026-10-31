import Link from "next/link";
import { GAMES, type GameInfo } from "@/content/games";
import { SOURCES, WORK_TITLE } from "@/content/sources";

const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://language-games.example";

/** Server-rendered notes under each game: how to play, the English, the passage. */
export function GameAbout({ slug }: { slug: GameInfo["slug"] }) {
  const g = GAMES.find((x) => x.slug === slug)!;
  const s = SOURCES[g.source];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: `${g.title} — Language Games`,
    description: g.promise,
    url: `${site}/play/${g.slug}`,
    learningResourceType: "Game",
    educationalLevel: "Intermediate (CEFR B1–B2)",
    inLanguage: "en",
    isAccessibleForFree: true,
    teaches: g.english,
    citation: `${WORK_TITLE[s.work]} ${s.ref}`,
  };
  return (
    <section className="mx-auto mt-6 w-full max-w-5xl border-t border-border px-4 py-8" aria-labelledby="about-game">
      <h2 id="about-game" className="font-heading text-2xl font-semibold">
        About {g.title}
      </h2>
      <div className="mt-3 grid gap-6 lg:grid-cols-2">
        <div>
          <h3 className="font-bold">How to play</h3>
          <ol className="mt-1 list-decimal space-y-1 pl-5 text-[16px] leading-relaxed">
            {g.howTo.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <p className="mt-3 text-[16px]">
            <span className="font-bold">English you practise:</span> {g.english}.
          </p>
        </div>
        {/* Family Threads is the discovery itself; stating its conclusion here would give it away. */}
        {slug !== "family" && (
          <div>
            <h3 className="font-bold">The idea</h3>
            <p className="mt-1 text-[16px] leading-relaxed">{s.gloss}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {WORK_TITLE[s.work]} {s.ref}.{" "}
              <Link href={`/sources#${s.id}`} className="font-bold text-cobalt underline underline-offset-4">
                Read the passage
              </Link>
            </p>
          </div>
        )}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </section>
  );
}
