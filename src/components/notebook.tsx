"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GAMES } from "@/content/games";
import { NOTEBOOK } from "@/content/notebook";
import { clearSave, emptySave } from "@/lib/progress";
import { useSave } from "@/lib/use-save";

export function Notebook() {
  const { save, ready, update } = useSave();
  const [confirm, setConfirm] = useState(false);
  if (!ready) return null;
  const played = GAMES.filter((g) => g.rounds.some((id) => save.rounds[id]));

  const replay = (slug: string, session: number) =>
    update((s) => ({ ...s, lastGame: slug, positions: { ...s.positions, [slug]: { session, round: 0 } } }));

  if (played.length === 0)
    return (
      <div className="mt-4 flex flex-col items-start gap-4">
        <p className="text-[17px]">Nothing here yet. Play a round and the English you use will be kept here, game by game.</p>
        <Link href="/play/builder" className="inline-flex h-12 items-center rounded-lg bg-cobalt px-5 text-[17px] font-bold text-paper">
          Start with Slab!
        </Link>
      </div>
    );

  return (
    <div className="mt-4 flex flex-col gap-8">
      {played.map((g) => (
        <section key={g.slug} aria-labelledby={`nb-${g.slug}`}>
          <h2 id={`nb-${g.slug}`} className="font-heading text-2xl font-semibold">
            {g.title}
          </h2>
          {NOTEBOOK[g.slug]
            .filter((s) => s.rounds.some((r) => save.rounds[r.id]))
            .map((s) => (
              <div key={s.title} className="mt-3">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-bold">{s.title}</h3>
                  <Link
                    href={`/play/${g.slug}`}
                    onClick={() => replay(g.slug, s.index)}
                    className="inline-flex min-h-11 items-center text-sm font-bold text-cobalt underline-offset-4 hover:underline"
                  >
                    Play again
                  </Link>
                </div>
                <ul className="mt-1 flex flex-col gap-1.5">
                  {s.rounds
                    .filter((r) => save.rounds[r.id])
                    .map((r) => {
                      const rec = save.rounds[r.id];
                      return (
                        <li key={r.id} className="rounded-lg bg-card px-3 py-2">
                          {(rec.said ?? []).slice(0, 3).map((line) => (
                            <p key={line} className="font-heading text-[17px] leading-snug">
                              {line}
                            </p>
                          ))}
                          <p className="text-sm text-muted-foreground">
                            {r.did.charAt(0).toUpperCase() + r.did.slice(1)}
                            {rec.firstTry ? " · first try" : ""}
                          </p>
                        </li>
                      );
                    })}
                </ul>
              </div>
            ))}
        </section>
      ))}
      <section>
        {confirm ? (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[15px]">Delete all progress in this browser?</span>
            <Button
              variant="destructive"
              className="h-11"
              onClick={() => {
                clearSave();
                update(() => emptySave());
                setConfirm(false);
              }}
            >
              Yes, start over
            </Button>
            <Button variant="outline" className="h-11" onClick={() => setConfirm(false)}>
              Keep it
            </Button>
          </div>
        ) : (
          <Button variant="outline" className="h-11" onClick={() => setConfirm(true)}>
            Reset progress
          </Button>
        )}
      </section>
    </div>
  );
}
