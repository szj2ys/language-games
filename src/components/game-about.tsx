import Link from "next/link";
import { GAMES, type GameInfo } from "@/content/games";
import { SOURCES, WORK_TITLE } from "@/content/sources";
import { SITE_URL } from "@/lib/site";

/** Server-rendered notes under each game: how to play, the idea, the passage. */
export function GameAbout({ slug }: { slug: GameInfo["slug"] }) {
  const g = GAMES.find((x) => x.slug === slug)!;
  const s = SOURCES[g.source];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: `${g.step}. ${g.title} — Wittgenstein, played`,
    description: g.promise,
    url: `${SITE_URL}/play/${g.slug}`,
    learningResourceType: "Game",
    educationalLevel: "Introductory",
    inLanguage: "en",
    isAccessibleForFree: true,
    teaches: g.idea,
    citation: `${WORK_TITLE[s.work]} ${s.ref}`,
  };
  return (
    <section className="mx-auto mt-6 w-full max-w-5xl border-t border-border px-4 py-8" aria-labelledby="about-game">
      <h2 id="about-game" className="font-heading text-2xl font-semibold">
        About this game
      </h2>
      <div className="mt-3 grid gap-6 lg:grid-cols-2">
        <div>
          <h3 className="font-bold">How to play</h3>
          <ol className="mt-1 list-decimal space-y-1 pl-5 text-[16px] leading-relaxed">
            {g.howTo.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
        {/* Family Threads is the discovery itself; stating its conclusion here would give it away. */}
        {slug !== "family" && (
          <div>
            <h3 className="font-bold">The idea</h3>
            <p className="mt-1 text-[16px] leading-relaxed">{s.gloss}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {WORK_TITLE[s.work]} {s.ref}.{" "}
              <Link href={`/sources#${s.id}`} className="font-bold underline underline-offset-4">
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
