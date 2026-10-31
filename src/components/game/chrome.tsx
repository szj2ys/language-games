"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Volume2, VolumeX } from "lucide-react";
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
    <header className="flex items-center gap-2 px-3 pt-2 pb-1">
      <Link
        href="/"
        aria-label="All games"
        className="grid size-11 shrink-0 place-items-center rounded-full text-ink hover:bg-paper-deep focus-visible:outline-2 focus-visible:outline-cobalt"
      >
        <ArrowLeft className="size-5" aria-hidden />
      </Link>
      <div className="min-w-0 flex-1 leading-tight">
        <h1 className="truncate font-heading text-lg font-semibold">{game}</h1>
        <p className="truncate text-sm text-muted-foreground">{title}</p>
      </div>
      <ol className="flex items-center gap-1.5" aria-label={`Round ${round + 1} of ${total}`}>
        {Array.from({ length: total }, (_, i) => (
          <li
            key={i}
            className={cn(
              "size-2 rounded-full",
              i < round ? "bg-sage" : i === round ? "bg-cobalt" : "bg-border",
            )}
          />
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
  sources,
  nextTitle,
  onNext,
  onReplay,
}: {
  title: string;
  english: string;
  firstTry: number;
  total: number;
  sources: SourceId[];
  /** Absent on a game's last session. */
  nextTitle?: string;
  onNext: () => void;
  onReplay: () => void;
}) {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-4 px-4 py-6">
      <h2 className="font-heading text-3xl font-semibold">{title}: done</h2>
      <p className="text-[17px]">
        {firstTry} of {total} right first time. English practised: {english.charAt(0).toLowerCase() + english.slice(1)}.
      </p>
      {sources.map((id) => (
        <MarginNote key={id} id={id} />
      ))}
      <div className="flex flex-col gap-2 sm:flex-row">
        {nextTitle ? (
          <Button size="lg" className="h-12 flex-1 text-lg" onClick={onNext} autoFocus>
            Next: {nextTitle}
          </Button>
        ) : (
          <Link href="/" className={cn(buttonVariants({ size: "lg" }), "h-12 flex-1 text-lg")}>
            Choose another game
          </Link>
        )}
        <Button size="lg" variant="outline" className="h-12" onClick={onReplay}>
          Play again
        </Button>
      </div>
    </div>
  );
}

/**
 * What the page shows before the saved progress is read — and what the server
 * sends: the game's name and its scene, so the first paint is the picture,
 * not a blank page.
 */
export function GameLoading({ game, poster }: { game: string; poster: string }) {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col" aria-busy="true">
      <GameHeader game={game} title="Loading…" round={0} total={0} />
      <div className="lg:grid lg:grid-cols-[1.4fr_1fr] lg:px-3">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-paper-deep sm:rounded-2xl">
          <Image src={poster} alt="" fill priority sizes="(min-width: 1024px) 640px, 100vw" className="object-cover" />
        </div>
      </div>
    </div>
  );
}
