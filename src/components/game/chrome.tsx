"use client";

import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, Lightbulb, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef } from "react";
import { ShortcutTip } from "./shortcuts";
import { SOURCES, WORK_TITLE, type Source, type SourceId } from "@/content/sources";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

export function GameHeader({
  game,
  title,
  round,
  total,
  speech,
  onToggleSpeech,
}: {
  /** The game's name: the page's one H1. */
  game: string;
  /** The current session or level. */
  title: string;
  round: number;
  total: number;
  speech?: boolean;
  onToggleSpeech?: () => void;
}) {
  return (
    <header className="flex items-center gap-2 px-3 pt-2 pb-1 lg:px-4 lg:pt-4">
      <Link
        href="/"
        aria-label="All games"
        className="grid size-11 shrink-0 place-items-center rounded-full text-ink hover:bg-paper-deep focus-visible:outline-2 focus-visible:outline-cobalt"
      >
        <ArrowLeft className="size-5" aria-hidden />
      </Link>
      <div className="min-w-0 flex-1 leading-tight">
        <h1 className="truncate font-heading text-xl font-semibold lg:text-3xl">{game}</h1>
        <p className="truncate text-sm text-muted-foreground lg:text-lg">{title}</p>
      </div>
      <ol className="flex items-center gap-1.5" aria-label={`Round ${round + 1} of ${total}`}>
        {Array.from({ length: total }, (_, i) => (
          <li key={i} className={cn("size-2 rounded-full", i < round ? "bg-sage" : i === round ? "bg-cobalt" : "bg-border")} />
        ))}
      </ol>
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
    </header>
  );
}

/** A remark in the margin: the passage, a plain gloss, and where the analogy stops. */
export function MarginNote({ id, className }: { id: SourceId; className?: string }) {
  const s: Source = SOURCES[id];
  return (
    <aside className={cn("rounded-xl border border-border bg-card p-4 text-left", className)}>
      <p className="font-heading text-sm text-terracotta">
        {WORK_TITLE[s.work]} <span className="font-semibold">{s.ref}</span>
      </p>
      <blockquote className="mt-2 font-heading text-[17px] leading-snug italic">“{s.quote}”</blockquote>
      <p className="mt-3 text-[15px] leading-relaxed">{s.gloss}</p>
      {s.limits && <p className="mt-2 text-sm text-muted-foreground">Where the game stops: {s.limits}</p>}
    </aside>
  );
}

export function SessionEnd({
  title,
  english,
  firstTry,
  total,
  said = [],
  sources,
  nextTitle,
  nextGame,
  onNext,
  onReplay,
}: {
  title: string;
  english: string;
  firstTry: number;
  total: number;
  /** The English the player used in this session, newest last. */
  said?: string[];
  sources: SourceId[];
  /** Absent on a game's last session. */
  nextTitle?: string;
  /** After a game's last session: the next game to play. */
  nextGame?: { title: string; href: string };
  onNext: () => void;
  onReplay: () => void;
}) {
  const [lead, ...more] = sources;
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 px-4 py-6">
      <h2 className="font-heading text-3xl font-semibold">
        <span className="text-sage">Done</span> · {title}
      </h2>
      <p className="text-[18px]">
        <span className="font-bold">
          {firstTry} of {total}
        </span>{" "}
        right first time · {english.charAt(0).toLowerCase() + english.slice(1)}
      </p>
      <div className="flex flex-col gap-2 sm:flex-row">
        {nextTitle ? (
          <Button size="lg" className="h-12 text-lg sm:flex-1" onClick={onNext} autoFocus>
            Next: {nextTitle}
          </Button>
        ) : (
          <Link href={nextGame?.href ?? "/"} className={cn(buttonVariants({ size: "lg" }), "h-12 text-lg sm:flex-1")}>
            {nextGame ? `Next game: ${nextGame.title}` : "Choose another game"}
          </Link>
        )}
        <Button size="lg" variant="outline" className="h-12" onClick={onReplay}>
          Play again
        </Button>
      </div>
      {said.length > 0 && (
        <section aria-label="Your English in this session">
          <p className="text-sm font-bold text-muted-foreground">Your English</p>
          <ul className="mt-1 flex flex-wrap gap-1.5">
            {said.slice(-8).map((line) => (
              <li key={line} className="rounded-lg bg-card px-2.5 py-1 font-heading text-[16px]">
                {line}
              </li>
            ))}
          </ul>
        </section>
      )}
      <details className="group rounded-xl border border-border bg-card">
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between px-4 font-bold">
          What Wittgenstein said — {SOURCES[lead].ref}
          <span aria-hidden className="text-muted-foreground group-open:rotate-180">
            ⌄
          </span>
        </summary>
        <div className="flex flex-col gap-3 px-1 pb-1">
          {[lead, ...more].map((id) => (
            <MarginNote key={id} id={id} className="border-0" />
          ))}
        </div>
      </details>
    </div>
  );
}

/**
 * What the page shows before the saved progress is read — and what the server
 * sends: the game's name and its scene, so the first paint is the picture,
 * not a blank page.
 */
export function GameLoading({ game, poster, posterSquare }: { game: string; poster: string; posterSquare?: string }) {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[1400px] flex-col" aria-busy="true">
      <GameHeader game={game} title="Loading…" round={0} total={0} />
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
  session: { title: string; rounds: { id: string }[] };
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
  game,
  g,
  withSpeech,
  children,
}: {
  game: string;
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
        game={game}
        title={g.session.title}
        round={g.finished ? g.session.rounds.length : g.roundIndex}
        total={g.session.rounds.length}
        speech={withSpeech && g.speech.available ? g.save.settings.speech : undefined}
        onToggleSpeech={withSpeech && g.speech.available ? g.toggleSpeech : undefined}
      />
      {g.sessions.length > 1 && (
        <nav aria-label="Sessions" className="px-3 pb-2">
          <ol className="flex gap-1.5 overflow-x-auto [mask-image:linear-gradient(to_right,black_85%,transparent)] sm:[mask-image:none]">
            {g.sessions.map((s, i) => {
              const current = i === g.sessionIndex;
              return (
                <li key={s.title} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => g.goToSession(i)}
                    aria-current={current ? "step" : undefined}
                    className={cn(
                      "flex h-11 items-center gap-1.5 rounded-full border px-3.5 text-sm font-bold whitespace-nowrap",
                      current ? "border-ink bg-ink text-paper" : "border-border bg-card hover:bg-paper-deep",
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
      <main id="main" className="flex flex-1 flex-col lg:justify-center lg:pb-10">
        {children}
      </main>
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
 * `frame="square"` shows a square crop of the middle of the 16:9 canvas (the
 * game moves its objects inward to stay inside it); `frame="own"` means the game
 * draws its own square picture for phones. Without `frame`, the phone sees a 4:3
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
  frame?: "square" | "own";
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
          frame === "square" && "left-[-38.889%] w-[177.778%]",
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
