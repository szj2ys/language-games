import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GAMES } from "@/content/games";
import { SOURCES, WORK_TITLE } from "@/content/sources";
import { ContinueButton, GameProgress, LadderEnd } from "@/components/home-progress";
import { SiteHeader, Wordmark } from "@/components/site-header";
import { SITE_URL } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Wittgenstein, played",
  url: SITE_URL,
  description: "Free browser games for learning Ludwig Wittgenstein's philosophy, from the Tractatus to On Certainty.",
  inLanguage: "en",
  about: { "@type": "Person", name: "Ludwig Wittgenstein" },
  hasPart: GAMES.map((g) => ({
    "@type": "LearningResource",
    name: `${g.step}. ${g.title}`,
    url: `${SITE_URL}/play/${g.slug}`,
    teaches: g.idea,
  })),
};

const motto = SOURCES["tlp-4.112"];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="mx-auto w-full max-w-6xl px-4 pb-12">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <section className="grid items-center gap-5 pt-4 sm:pt-5 lg:grid-cols-[150px_minmax(0,1fr)_210px] lg:gap-8">
          <figure className="order-3 hidden lg:order-1 lg:block lg:self-start lg:pt-6">
            <p className="hidden font-heading text-lg lg:block" aria-hidden>
              1
            </p>
            <span className="hidden h-px w-full bg-border lg:mt-1 lg:block" aria-hidden />
            <blockquote className="mt-3 font-heading text-[19px] leading-snug italic">“{motto.quote}”</blockquote>
            <figcaption className="mt-2 text-[13px] tracking-wide text-muted-foreground uppercase">Tractatus {motto.ref}</figcaption>
          </figure>
          <div className="order-1 flex flex-col gap-4 lg:order-2">
            <h1 className="text-[clamp(42px,8vw,64px)] leading-[1.02] lg:whitespace-nowrap">
              <Wordmark />
            </h1>
            <p className="max-w-prose text-[18px] leading-relaxed sm:text-[19px]">
              Seven of Ludwig Wittgenstein&apos;s ideas, from his first book to his last notes. Each one is a short game: you do the thing
              the idea is about, then read what he wrote.
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <ContinueButton />
              <Link href="/sources" className="inline-flex min-h-11 items-center font-bold underline-offset-4 hover:underline">
                Read the sources
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">Free. No account: your progress stays in this browser.</p>
          </div>
          {/* The paper cut-out from the chosen design; on a phone the path comes straight after the button instead. */}
          <div className="relative order-2 hidden aspect-[3/4] w-full lg:order-3 lg:block">
            <Image src="/art/v2/hero-portrait.webp" alt="" fill priority sizes="230px" className="object-contain" />
          </div>
        </section>

        <LadderEnd />

        <section id="path" className="mt-6 scroll-mt-4 sm:mt-8" aria-labelledby="path-title">
          <h2 id="path-title" className="font-heading text-[28px] font-medium">
            The path, early to late <span className="font-sans text-[16px] font-normal text-muted-foreground">· start anywhere</span>
          </h2>
          <ol className="relative mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-7 lg:gap-4 lg:before:absolute lg:before:top-[7px] lg:before:right-[7%] lg:before:left-[7%] lg:before:h-px lg:before:bg-vermilion/50">
            {GAMES.map((g) => (
              <li key={g.slug} className="relative">
                <Link
                  href={`/play/${g.slug}`}
                  className="group flex h-full gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:border-ink/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink lg:flex-col lg:border-0 lg:bg-transparent lg:p-0"
                >
                  <span
                    className="hidden size-3.5 self-center rounded-full border-2 border-paper bg-vermilion ring-1 ring-vermilion lg:block"
                    aria-hidden
                  />
                  <span className="relative block size-20 shrink-0 overflow-hidden rounded-md lg:order-2 lg:mx-auto lg:aspect-square lg:size-auto lg:w-[110px] lg:bg-transparent">
                    <Image
                      src={`/art/v2/stop-${g.step}.webp`}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 150px, 96px"
                      className="object-contain transition-transform group-hover:scale-[1.03]"
                    />
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col gap-1 lg:order-1 lg:min-h-[96px] lg:text-center">
                    <span className="font-heading text-[15px] text-vermilion">{g.step}</span>
                    <span className="font-heading text-[21px] leading-tight font-medium">{g.title}</span>
                    <span className="text-[13px] text-muted-foreground italic">{g.work}</span>
                  </span>
                  <span className="hidden text-[15px] leading-snug lg:order-3 lg:block">{g.idea}</span>
                  <span className="mt-auto hidden items-center justify-between lg:order-4 lg:flex">
                    <ArrowRight className="size-5 text-ink transition-transform group-hover:translate-x-1" aria-hidden />
                    <GameProgress rounds={g.rounds} />
                  </span>
                  <span className="flex flex-col items-end justify-between lg:hidden">
                    <GameProgress rounds={g.rounds} />
                    <ArrowRight className="mt-auto size-5" aria-hidden />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14 grid gap-6 border-t border-border pt-8 lg:grid-cols-3" aria-labelledby="how-title">
          <h2 id="how-title" className="sr-only">
            How each game works
          </h2>
          {[
            [
              "Play",
              "You do the thing the idea is about: fetch stones for a builder, set up a stage, teach a pupil a rule, talk about beetles in boxes.",
            ],
            ["Read", "Each session ends with the passage it comes from, quoted with its section number, and a plain reading of it."],
            [
              "See where it stops",
              "Every game is an analogy. We say where it stops, so the game never stands in for what Wittgenstein wrote.",
            ],
          ].map(([t, d], i) => (
            <div key={t}>
              <p className="font-heading text-[15px] text-vermilion">{i + 1}</p>
              <h3 className="font-heading text-[22px] font-medium">{t}</h3>
              <p className="mt-1 text-[16px] leading-relaxed">{d}</p>
            </div>
          ))}
        </section>

        <footer className="mt-14 flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-5 text-sm text-muted-foreground">
          <Link href="/sources" className="hover:text-ink">
            Sources
          </Link>
          <Link href="/notebook" className="hover:text-ink">
            Your notebook
          </Link>
          <span>
            Quotations: {WORK_TITLE.TLP} (tr. Ogden), {WORK_TITLE.PI} (tr. Anscombe), {WORK_TITLE.OC} (tr. Paul &amp; Anscombe).
            Illustrations made with gpt-image-2.
          </span>
        </footer>
      </main>
    </>
  );
}
