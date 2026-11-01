"use client";

import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, Lightbulb, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef } from "react";
import { ShortcutTip } from "./shortcuts";
import { SOURCES, WORK_TITLE, type Source, type SourceId } from "@/content/sources";
import { stopOf, type GameSlug } from "@/content/order";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

export function GameHeader({
  slug,
  title,
  round,
  total,
  speech,
  onToggleSpeech,
}: {
  /** Which stop on the path: its number and idea make the page's one H1. */
  slug: GameSlug;
  /** The current session. */
  title: string;
  round: number;
  total: number;
  speech?: boolean;
  onToggleSpeech?: () => void;
}) {
  const stop = stopOf(slug);
  return (
    <header className="flex flex-col gap-2 border-b border-border px-3 pt-2 pb-2.5 lg:px-6 lg:pt-4">
      <div className="flex items-center gap-1">
        <Link
          href="/#path"
          aria-label="The path: all seven ideas"
          className="-ml-1 grid size-11 shrink-0 place-items-center rounded-full text-ink hover:bg-paper-deep focus-visible:outline-2 focus-visible:outline-ink"
        >
          <ArrowLeft className="size-5" aria-hidden />
        </Link>
        <div className="min-w-0 flex-1 leading-tight">
          <h1 className="truncate font-heading text-[22px] font-medium lg:text-[30px]">
            <span className="text-vermilion">{stop.step}.</span> {stop.title}
          </h1>
          <p className="truncate text-sm text-muted-foreground lg:text-base">
            {title} · <span className="italic">{stop.work}</span>
          </p>
        </div>
        {onToggleSpeech && (
          <button
            type="button"
            onClick={onToggleSpeech}
            aria-pressed={speech}
            aria-label={speech ? "Turn voice off" : "Turn voice on"}
            className="grid size-11 shrink-0 place-items-center rounded-full hover:bg-paper-deep"
          >
            {speech ? <Volume2 className="size-5" aria-hidden /> : <VolumeX className="size-5" aria-hidden />}
          </button>
        )}
      </div>
      {total > 0 && (
        <ol className="flex items-center" aria-label={`Round ${Math.min(round + 1, total)} of ${total}`}>
          {Array.from({ length: total }, (_, i) => (
            <li key={i} className="flex flex-1 items-center last:flex-none">
              <span className={cn("size-2.5 shrink-0 rounded-full", i <= round ? "bg-vermilion" : "bg-border")} />
              {i < total - 1 && <span className={cn("h-0.5 flex-1", i < round ? "bg-vermilion" : "bg-border")} />}
            </li>
          ))}
        </ol>
      )}
    </header>
  );
}

/**
 * The passage the session is about, beside the activity: the opening lines only, so the game still lets
 * you find the point before the passage names it.
 */
export function IdeaCard({ source }: { source: SourceId }) {
  const s: Source = SOURCES[source];
  return (
    <aside className="mx-3 mb-4 rounded-lg border border-border bg-card px-4 py-3 lg:mx-6" aria-labelledby="idea-title">
      <p className="flex items-baseline justify-between gap-3">
        <span id="idea-title" className="font-heading text-[18px] font-medium">
          The idea
        </span>
        <span className="text-sm text-muted-foreground">
          {WORK_TITLE[s.work]} {s.ref}
        </span>
      </p>
      <blockquote className="mt-1 line-clamp-2 font-heading text-[17px] leading-snug italic lg:text-[18px]">“{s.quote}”</blockquote>
      <Link href={`/sources#${s.id}`} className="inline-flex min-h-11 items-center text-sm font-bold underline-offset-4 hover:underline">
        Read the whole passage
      </Link>
    </aside>
  );
}

/** A remark in the margin: the passage, a plain reading, and where the game's analogy stops. */
export function MarginNote({ id, className }: { id: SourceId; className?: string }) {
  const s: Source = SOURCES[id];
  return (
    <aside className={cn("rounded-lg border border-border bg-card p-4 text-left", className)}>
      <p className="text-sm text-vermilion">
        {WORK_TITLE[s.work]} <span className="font-bold">{s.ref}</span>
      </p>
      <blockquote className="mt-2 font-heading text-[18px] leading-snug italic">“{s.quote}”</blockquote>
      <p className="mt-3 text-[16px] leading-relaxed">{s.gloss}</p>
      {s.limits && <p className="mt-2 text-[15px] text-muted-foreground">Where the game stops: {s.limits}</p>}
    </aside>
  );
}

export function SessionEnd({
  title,
  shows,
  firstTry,
  total,
  items = [],
  art,
  sources,
  nextTitle,
  nextGame,
  onNext,
  onReplay,
}: {
  title: string;
  /** The idea the session showed: the end card leads with it. */
  shows: string;
  firstTry: number;
  total: number;
  /** Each round's point, and what you answered. */
  items?: { text: string; did: string }[];
  /** The game's picture, so the finished screen still shows the world it happened in. */
  art?: string;
  /** Passages for the end card; a session added without its own list falls back to none rather than crashing. */
  sources?: SourceId[];
  /** Absent on a game's last session. */
  nextTitle?: string;
  /** After a game's last session: the next idea on the path. */
  nextGame?: { title: string; href: string };
  onNext: () => void;
  onReplay: () => void;
}) {
  const [lead, ...more] = sources ?? [];
  return (
    <div className="mx-auto grid w-full max-w-6xl gap-5 px-4 py-5 lg:grid-cols-[minmax(0,1fr)_460px] lg:items-start lg:gap-10">
      <div className="order-2 flex flex-col gap-4 lg:order-1">
        {art && (
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-paper-deep">
            <Image src={art} alt="" fill sizes="(min-width: 1024px) 700px, 100vw" className="object-cover" />
            <p className="absolute top-3 left-3 rounded-full bg-card px-3 py-1 text-[15px] font-bold shadow-sm">
              {firstTry} of {total} right first time
            </p>
          </div>
        )}
        {lead && <MarginNote id={lead} />}
      </div>
      <div className="order-1 flex flex-col gap-4 lg:order-2">
        <p className="text-sm font-bold tracking-wide text-vermilion uppercase">Done · {title}</p>
        <h2 className="font-heading text-[26px] leading-snug font-medium lg:text-[32px]">{shows}</h2>
        <div className="flex flex-col gap-2 sm:flex-row">
          {nextTitle ? (
            <Button size="lg" className="h-12 text-lg sm:flex-1" onClick={onNext} autoFocus>
              Next: {nextTitle}
            </Button>
          ) : (
            <Link href={nextGame?.href ?? "/"} className={cn(buttonVariants({ size: "lg" }), "h-12 text-lg sm:flex-1")}>
              {nextGame ? `Next idea: ${nextGame.title}` : "Back to the path"}
            </Link>
          )}
          <Button size="lg" variant="outline" className="h-12" onClick={onReplay}>
            Play again
          </Button>
        </div>
        {items.length > 0 && (
          <section aria-labelledby="round-by-round">
            <h3 id="round-by-round" className="mb-2 font-heading text-[18px] font-medium">
              Round by round
            </h3>
            <ol className="flex flex-col divide-y divide-border rounded-lg border border-border bg-card">
              {items.map((x) => (
                <li key={x.text + x.did} className="flex flex-col gap-0.5 px-3 py-2">
                  <span className="text-[16px] leading-snug">{x.did.charAt(0).toUpperCase() + x.did.slice(1)}</span>
                  <span className="text-[14px] text-muted-foreground">You: {x.text}</span>
                </li>
              ))}
            </ol>
          </section>
        )}
        {more.length > 0 && (
          <details className="group rounded-lg border border-border bg-card">
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between px-4 font-bold">
              More from Wittgenstein
              <span aria-hidden className="text-muted-foreground group-open:rotate-180">
                ⌄
              </span>
            </summary>
            <div className="flex flex-col gap-3 px-1 pb-1">
              {more.map((id) => (
                <MarginNote key={id} id={id} className="border-0" />
              ))}
            </div>
          </details>
        )}
      </div>
    </div>
  );
}

/**
 * What the page shows before the saved progress is read — and what the server
 * sends: the game's name and its scene, so the first paint is the picture,
 * not a blank page.
 */
export function GameLoading({ slug, poster, posterSquare }: { slug: GameSlug; poster: string; posterSquare?: string }) {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[1400px] flex-col" aria-busy="true">
      <GameHeader slug={slug} title="Loading…" round={0} total={0} />
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-8 lg:px-4">
        <SceneCanvas frame={posterSquare ? "own" : undefined}>
          {posterSquare ? (
            <ArtDirected wide={poster} square={posterSquare} />
          ) : (
            <Image src={poster} alt="" fill priority sizes="(min-width: 1024px) 700px, 133vw" className="object-cover" />
          )}
        </SceneCanvas>
      </div>
    </div>
  );
}

type FrameGame = {
  ready: boolean;
  storable: boolean;
  session: { title: string; source: SourceId; rounds: { id: string }[] };
  sessionIndex: number;
  roundIndex: number;
  round: { id: string };
  finished: boolean;
  sessions: { title: string }[];
  finishedIn: (i: number) => boolean;
  goToSession: (i: number) => void;
  speech: { available: boolean };
  save: { settings: { speech: boolean } };
  toggleSpeech: () => void;
};

/** Header, session picker and main area shared by every game. */
export function GameFrame({
  slug,
  g,
  withSpeech,
  children,
}: {
  slug: GameSlug;
  g: FrameGame;
  withSpeech?: boolean;
  children: React.ReactNode;
}) {
  const top = useRef<HTMLDivElement>(null);
  const key = g.finished ? `end-${g.sessionIndex}` : g.round.id;
  useEffect(() => {
    // Each new round starts at the top: the call or the scene is the task.
    window.scrollTo({ top: 0 });
  }, [key]);
  return (
    <div ref={top} className="mx-auto flex min-h-dvh w-full max-w-[1400px] flex-col">
      <GameHeader
        slug={slug}
        title={g.session.title}
        round={g.finished ? g.session.rounds.length : g.roundIndex}
        total={g.session.rounds.length}
        speech={withSpeech && g.speech.available ? g.save.settings.speech : undefined}
        onToggleSpeech={withSpeech && g.speech.available ? g.toggleSpeech : undefined}
      />
      {g.sessions.length > 1 && (
        <nav aria-label="Sessions" className="border-b border-border px-3 lg:px-6">
          <ol className="flex gap-4 overflow-x-auto [mask-image:linear-gradient(to_right,black_85%,transparent)] sm:[mask-image:none]">
            {g.sessions.map((s, i) => {
              const current = i === g.sessionIndex;
              return (
                <li key={s.title} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => g.goToSession(i)}
                    aria-current={current ? "step" : undefined}
                    className={cn(
                      "-mb-px flex h-11 items-center gap-1.5 border-b-2 text-[15px] whitespace-nowrap",
                      current ? "border-vermilion font-bold text-ink" : "border-transparent text-muted-foreground hover:text-ink",
                    )}
                  >
                    {g.finishedIn(i) ? <Check className="size-4" aria-label="done:" /> : <span aria-hidden>{i + 1}</span>}
                    {s.title}
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>
      )}
      {!g.storable && (
        <p role="status" className="mx-3 rounded-md bg-paper-deep px-3 py-1.5 text-sm">
          Progress cannot be saved in this browser. You can still play.
        </p>
      )}
      <main id="main" className="flex flex-1 flex-col pt-3 lg:justify-center lg:pb-4">
        {children}
      </main>
      {!g.finished && <IdeaCard source={g.session.source} />}
      <ShortcutTip />
    </div>
  );
}

/** The same hint control in every game: a bulb button, then the hint in words. */
export function HintButton({ used, onUse }: { used: boolean; onUse: () => void }) {
  return (
    <Button variant="outline" size="lg" className="h-12 min-w-12" onClick={onUse} disabled={used} aria-label="Hint">
      <Lightbulb className="size-5" aria-hidden />
    </Button>
  );
}

/**
 * A 16:9 scene on desktop. On a phone it is framed around the action instead:
 * `frame="own"` means the game draws its own square picture for phones; `frame="floor"` shows the lower middle of
 * the canvas close up, for stages where everything happens on the floor. Without `frame`, the phone sees a 4:3
 * crop. Positions in % of the canvas land on the same spot in the art.
 * `overlay` sits on the visible frame (speech bubbles), not on the canvas.
 */
export function SceneCanvas({
  children,
  overlay,
  label,
  className,
  frame,
}: {
  children: React.ReactNode;
  overlay?: React.ReactNode;
  label?: string;
  className?: string;
  frame?: "own" | "floor";
}) {
  return (
    <figure
      aria-label={label}
      className={cn(
        "relative w-full overflow-hidden bg-paper-deep sm:aspect-[16/9] sm:rounded-2xl",
        frame ? "aspect-square" : "aspect-[4/3]",
        className,
      )}
    >
      <div
        className={cn(
          "@container absolute inset-y-0 sm:left-0 sm:w-full",
          // The floor of a 16:9 stage, close up: the canvas is drawn at 320% and anchored at the bottom.
          frame === "floor" && "top-auto left-[-110%] aspect-[16/9] w-[320%] sm:top-0 sm:aspect-auto",
          frame === "own" && "left-0 w-full",
          !frame && "left-[-16.667%] w-[133.333%]",
        )}
      >
        {children}
      </div>
      {overlay}
    </figure>
  );
}

/**
 * One picture for phones and another for wider screens, chosen by the browser
 * before any script runs, so the first paint is already the right art.
 */
export function ArtDirected({ wide, square, className }: { wide: string; square: string; className?: string }) {
  const common = { alt: "", sizes: "(min-width: 1024px) 700px, 100vw", fetchPriority: "high" as const };
  const {
    props: { srcSet: wideSet },
  } = getImageProps({ ...common, src: wide, width: 1600, height: 900 });
  const {
    props: { srcSet: squareSet, ...rest },
  } = getImageProps({ ...common, src: square, width: 900, height: 900 });
  return (
    <picture>
      <source media="(min-width: 640px)" srcSet={wideSet} />
      <source media="(max-width: 639px)" srcSet={squareSet} />
      <img {...rest} alt="" className={cn("absolute inset-0 size-full object-cover", className)} />
    </picture>
  );
}
