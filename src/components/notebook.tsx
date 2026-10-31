"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GAMES } from "@/content/games";
import { NOTEBOOK } from "@/content/notebook";
import { clearSave, emptySave } from "@/lib/progress";
import { useSave } from "@/lib/use-save";
import { clearDrafts } from "@/lib/use-draft";
import { SHORTCUTS_OFF } from "@/components/game/shortcuts";
import type { GameInfo } from "@/content/games";

type GameSlug = GameInfo["slug"];

export function Notebook() {
  const { save, ready, update } = useSave();
  const [confirm, setConfirm] = useState(false);
  if (!ready) return null;
  const played = GAMES.filter((g) => g.rounds.some((id) => save.rounds[id]));

  const replay = (slug: GameSlug, session: number) => {
    for (const r of NOTEBOOK[slug][session].rounds) clearDrafts(r.id);
    update((s) => ({ ...s, lastGame: slug, positions: { ...s.positions, [slug]: { session, round: 0 } } }));
  };

  if (played.length === 0)
    return (
      <div className="mt-4 flex flex-col items-start gap-4">
        <p className="text-[18px]">Nothing here yet. Play a round, and each idea you meet will be kept here with what you answered.</p>
        <Link
          href="/play/scene"
          className="inline-flex h-12 items-center rounded-lg bg-vermilion px-5 text-[17px] font-bold text-primary-foreground"
        >
          Start with the first idea
        </Link>
      </div>
    );

  return (
    <div className="mt-4 flex flex-col gap-8">
      {played.map((g) => (
        <section key={g.slug} aria-labelledby={`nb-${g.slug}`}>
          <h2 id={`nb-${g.slug}`} className="font-heading text-[26px] font-medium">
            <span className="text-vermilion">{g.step}.</span> {g.title}
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
                    className="inline-flex min-h-11 items-center text-sm font-bold underline underline-offset-4"
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
                        <li key={r.id} className="rounded-lg border border-border bg-card px-3 py-2">
                          <p className="font-heading text-[18px] leading-snug">{r.did.charAt(0).toUpperCase() + r.did.slice(1)}</p>
                          {(rec.said ?? []).map((line) => (
                            <p key={line} className="text-[15px] text-muted-foreground">
                              You: {line}
                            </p>
                          ))}
                          {rec.missed && <p className="text-[15px] text-vermilion">You first tried: {rec.missed}</p>}
                          {rec.firstTry && <p className="text-sm text-sage">Right first time</p>}
                        </li>
                      );
                    })}
                </ul>
              </div>
            ))}
        </section>
      ))}
      <ShortcutSetting />
      <section>
        {confirm ? (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[15px]">Delete all progress in this browser?</span>
            <Button
              variant="destructive"
              className="h-11"
              onClick={() => {
                clearSave();
                clearDrafts();
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

/** Single-key shortcuts can be switched off (WCAG 2.1.4). */
function ShortcutSetting() {
  const [off, setOff] = useState(() => {
    try {
      return !!localStorage.getItem(SHORTCUTS_OFF);
    } catch {
      return false;
    }
  });
  const toggle = () => {
    const next = !off;
    setOff(next);
    try {
      if (next) localStorage.setItem(SHORTCUTS_OFF, "1");
      else localStorage.removeItem(SHORTCUTS_OFF);
    } catch {}
  };
  return (
    <section>
      <label className="flex min-h-11 cursor-pointer items-center gap-3 text-[16px]">
        <input type="checkbox" checked={!off} onChange={toggle} className="size-5 accent-vermilion" />
        Keyboard shortcuts in the games (1–4 to choose, Enter to confirm)
      </label>
    </section>
  );
}
