"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { GAMES } from "@/content/games";
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
