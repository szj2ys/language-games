import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GAMES } from "@/content/games";
import { SOURCES, WORK_TITLE } from "@/content/sources";
import { ContinueButton, GameProgress, LadderEnd } from "@/components/home-progress";
import { HomeDemo } from "@/components/home-demo";
import { SITE_URL } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Language Games",
  url: SITE_URL,
  description: "Free browser games for intermediate learners of English, built on Wittgenstein's language-games.",
  inLanguage: "en",
  hasPart: GAMES.map((g) => ({ "@type": "LearningResource", name: g.title, url: `${SITE_URL}/play/${g.slug}`, teaches: g.english })),
};

export default function Home() {
  return (
    <main id="main" className="mx-auto w-full max-w-5xl px-4 pb-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="grid items-center gap-5 pt-4 sm:pt-8 lg:grid-cols-[1fr_1.1fr] lg:gap-10">
        <div className="order-2 flex flex-col gap-4 lg:order-1">
          <h1 className="font-heading text-[clamp(30px,7vw,56px)] leading-[1.04] font-semibold tracking-tight">
            Learn English by playing Wittgenstein&apos;s language-games
          </h1>
          <p className="max-w-prose text-[18px] leading-relaxed">
            Five short games for intermediate learners. You give orders, describe scenes, read a room and teach a pupil — and the English,
            and the philosophy, come from what you do.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <ContinueButton />
            <a href="#games" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-13 px-5 text-lg")}>
              All five games
            </a>
            <Link
              href="/notebook"
              className="inline-flex min-h-11 items-center text-[16px] font-bold text-cobalt underline-offset-4 hover:underline"
            >
              Notebook
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">No account. Your progress stays in this browser.</p>
        </div>
        <div className="order-1 lg:order-2">
          <HomeDemo />
        </div>
      </section>

      <LadderEnd />

      <section id="games" className="mt-10 scroll-mt-4" aria-labelledby="games-title">
        <h2 id="games-title" className="font-heading text-3xl font-semibold">
          The games
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {GAMES.map((g) => {
            const s = SOURCES[g.source];
            return (
              <li key={g.slug}>
                <Link
                  href={`/play/${g.slug}`}
                  className="group flex h-full overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt sm:flex-col"
                >
                  <span className="relative block w-28 shrink-0 bg-paper-deep sm:aspect-[16/9] sm:w-auto">
                    <Image
                      src={`/art/covers/${g.slug}.webp`}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform group-hover:scale-[1.02]"
                    />
                  </span>
                  <span className="flex flex-1 flex-col gap-1 p-3 sm:gap-1.5 sm:p-4">
                    <span className="flex items-baseline justify-between gap-2">
                      <span className="font-heading text-xl font-semibold sm:text-2xl">{g.title}</span>
                      <GameProgress rounds={g.rounds} />
                    </span>
                    <span className="text-[15px] leading-snug sm:text-[16px]">{g.promise}</span>
                    <span className="mt-auto hidden pt-2 text-sm sm:block">
                      <span className="font-bold">English:</span> {g.english}
                    </span>
                    <span className="hidden text-sm text-muted-foreground sm:block">
                      {g.idea} — {WORK_TITLE[s.work]} {s.ref}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-2" aria-labelledby="why-title">
        <div>
          <h2 id="why-title" className="font-heading text-3xl font-semibold">
            Why Wittgenstein?
          </h2>
          <p className="mt-3 text-[17px] leading-relaxed">
            In the <em>Philosophical Investigations</em>, Wittgenstein asks us to look at language as part of what people do: builders
            calling for stones, shopkeepers counting apples, someone asking, thanking, joking. He called these activities{" "}
            <em>language-games</em>. Each game here turns one of his examples into something you play, so you learn the English the way he
            says words are learned: by using them.
          </p>
          <p className="mt-3 text-[17px] leading-relaxed">
            The games are inspired by his writing, not a summary of it. After each session you get the passage, a plain-English reading, and
            a note on where the game&apos;s analogy stops.{" "}
            <Link href="/sources" className="font-bold text-cobalt underline underline-offset-4">
              All sources
            </Link>
          </p>
        </div>
        <figure className="self-center rounded-2xl border border-border bg-card p-5">
          <blockquote className="font-heading text-[22px] leading-snug italic">“{SOURCES["tlp-5.6"].quote}”</blockquote>
          <figcaption className="mt-3 text-sm text-muted-foreground">
            {WORK_TITLE.TLP} {SOURCES["tlp-5.6"].ref}, tr. C. K. Ogden
          </figcaption>
        </figure>
      </section>

      <footer className="mt-14 flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-5 text-sm text-muted-foreground">
        <Link href="/sources" className="hover:text-ink">
          Sources
        </Link>
        <Link href="/notebook" className="hover:text-ink">
          Your notebook
        </Link>
        <span>Illustrations made with gpt-image-2.</span>
      </footer>
    </main>
  );
}
