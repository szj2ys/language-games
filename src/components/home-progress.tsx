"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { GAMES } from "@/content/games";
import { SOURCES } from "@/content/sources";
import { useSave } from "@/lib/use-save";
import { cn } from "@/lib/utils";

/** Continue where you left off; first visit starts with Slab!. */
export function ContinueButton() {
  const { save, ready } = useSave();
  const last = ready ? GAMES.find((g) => g.slug === save.lastGame) : undefined;
  const target = last ?? GAMES[0];
  return (
    <Link href={`/play/${target.slug}`} className={cn(buttonVariants({ size: "lg" }), "h-13 px-6 text-lg")}>
      {last ? `Continue ${last.title}` : `Play ${target.title}`} <ArrowRight className="size-5" aria-hidden />
    </Link>
  );
}

export function GameProgress({ rounds }: { rounds: string[] }) {
  const { save, ready } = useSave();
  if (!ready) return null;
  const done = rounds.filter((id) => save.rounds[id]).length;
  if (done === 0) return null;
  return (
    <span className="shrink-0 rounded-full bg-sage/15 px-2 py-0.5 text-sm font-bold text-sage">
      {done === rounds.length ? "Done" : `${done}/${rounds.length}`}
    </span>
  );
}

/** When every round is done: no streak, no "come back tomorrow" — the ladder can be thrown away. */
export function LadderEnd() {
  const { save, ready } = useSave();
  if (!ready) return null;
  const all = GAMES.flatMap((g) => g.rounds);
  if (!all.every((id) => save.rounds[id])) return null;
  const ladder = SOURCES["tlp-6.54"];
  const stop = SOURCES["pi-133"];
  return (
    <section className="mt-8 rounded-2xl border border-border bg-card p-5" aria-labelledby="ladder">
      <h2 id="ladder" className="font-heading text-2xl font-semibold">
        You have played every game.
      </h2>
      <p className="mt-2 text-[17px] leading-relaxed">
        That is the end — there is no streak to keep. In the Tractatus Wittgenstein says of his own book: “{ladder.quote}” ({ladder.ref}).
        Later he put it differently: “{stop.quote}” (PI {stop.ref}). Take the English and go and use it.
      </p>
    </section>
  );
}
