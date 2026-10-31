"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GAMES } from "@/content/games";
import { clearSave, emptySave } from "@/lib/progress";
import { useSave } from "@/lib/use-save";

export function Notebook() {
  const { save, ready, update } = useSave();
  const [confirm, setConfirm] = useState(false);
  if (!ready) return null;
  const played = GAMES.map((g) => ({ g, done: g.rounds.filter((id) => save.rounds[id]).length })).filter((x) => x.done > 0);

  if (played.length === 0)
    return (
      <p className="mt-4 text-[17px]">
        Nothing here yet. Play a round and the English you use will be kept here.{" "}
        <Link href="/play/builder" className="font-bold text-cobalt underline underline-offset-4">
          Start with Slab!
        </Link>
      </p>
    );

  return (
    <div className="mt-4 flex flex-col gap-6">
      <ul className="flex flex-wrap gap-2" aria-label="Progress">
        {played.map(({ g, done }) => (
          <li key={g.slug}>
            <Link href={`/play/${g.slug}`} className="inline-flex h-11 items-center rounded-full border border-border bg-card px-4 text-[15px] font-bold hover:bg-paper-deep">
              {g.title}: {done}/{g.rounds.length}
            </Link>
          </li>
        ))}
      </ul>
      <section aria-labelledby="phrases">
        <h2 id="phrases" className="font-heading text-2xl font-semibold">
          English you used
        </h2>
        <ul className="mt-2 flex flex-col gap-1.5">
          {[...save.phrases].reverse().map((p) => (
            <li key={p} className="rounded-lg bg-card px-3 py-2 font-heading text-[17px]">
              {p}
            </li>
          ))}
        </ul>
      </section>
      <section>
        {confirm ? (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[15px]">Delete all progress in this browser?</span>
            <Button
              variant="destructive"
              onClick={() => {
                clearSave();
                update(() => emptySave());
                setConfirm(false);
              }}
            >
              Yes, start over
            </Button>
            <Button variant="outline" onClick={() => setConfirm(false)}>
              Keep it
            </Button>
          </div>
        ) : (
          <Button variant="outline" onClick={() => setConfirm(true)}>
            Reset progress
          </Button>
        )}
      </section>
    </div>
  );
}
