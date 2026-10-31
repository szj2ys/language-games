"use client";

import Image from "next/image";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GameFrame, GameLoading, SceneCanvas, SessionEnd } from "@/components/game/chrome";
import { useSessions } from "@/components/game/use-sessions";
import { useShortcuts } from "@/components/game/shortcuts";
import { track } from "@/components/analytics";
import { nextGame, type GameSlug } from "@/content/order";
import { useDraft } from "@/lib/use-draft";
import { cn } from "@/lib/utils";
import { did, type ChoiceRound, type ChoiceSession } from "./types";

/** A game of situations and questions: answer, hear the reply, see the point. Used by the beetle and the hinges. */
export function ChoiceGame({ slug, sessions }: { slug: GameSlug; sessions: ChoiceSession[] }) {
  const g = useSessions(slug, sessions, did);
  if (!g.ready) return <GameLoading slug={slug} poster={sessions[0].rounds[0].art} />;
  const { session, round, finished } = g;
  return (
    <GameFrame slug={slug} g={g}>
      {finished ? (
        <SessionEnd
          nextGame={nextGame(slug)}
          items={g.sessionItems()}
          art={session.art}
          title={session.title}
          shows={session.shows}
          firstTry={session.rounds.filter((r) => g.save.rounds[r.id]?.firstTry).length}
          total={session.rounds.length}
          sources={Array.from(new Set([session.source, ...session.rounds.map((r) => r.source)]))}
          nextTitle={sessions[g.sessionIndex + 1]?.title}
          onNext={g.nextSession}
          onReplay={g.replay}
        />
      ) : (
        <Round key={round.id} slug={slug} round={round} onDone={g.complete} onNext={g.next} />
      )}
    </GameFrame>
  );
}

function Round({
  slug,
  round,
  onDone,
  onNext,
}: {
  slug: GameSlug;
  round: ChoiceRound;
  onDone: (marks: number, max: number, firstTry: boolean, phrases: string[], missed?: string) => void;
  onNext: () => void;
}) {
  // Every answer tried so far, in order; the round is solved once the right one is among them.
  const [tried, setTried] = useDraft<number[]>(round.id, "tried", []);
  const solved = tried.some((i) => round.options[i]?.right);
  const last = tried.length ? round.options[tried[tried.length - 1]] : null;

  const choose = (i: number) => {
    if (solved || tried.includes(i)) return;
    const next = [...tried, i];
    setTried(next);
    const o = round.options[i];
    if (o.right) {
      const wrongFirst = tried.length > 0 ? round.options[tried[0]].text : undefined;
      onDone(tried.length === 0 ? 2 : 1, 2, tried.length === 0, [o.text], wrongFirst);
    } else {
      track("repair_used", { game: slug, round: round.id });
    }
  };
  useShortcuts({
    ...Object.fromEntries(round.options.map((_, i) => [String(i + 1), () => choose(i)])),
    Enter: solved ? onNext : undefined,
  });

  return (
    <div className="flex flex-col gap-3 lg:grid lg:grid-cols-[minmax(0,1fr)_440px] lg:items-start lg:gap-8 lg:px-6">
      <SceneCanvas label={round.situation}>
        <Image src={round.art} alt="" fill priority sizes="(min-width: 1024px) 700px, 133vw" className="object-cover" />
      </SceneCanvas>
      <div className="flex flex-col gap-3 px-3 pb-4 lg:px-0">
        <p className="text-[17px] leading-relaxed lg:text-[19px]">{round.situation}</p>
        <h2 className="font-heading text-[22px] leading-snug font-medium lg:text-[26px]">{round.question}</h2>
        <div className="flex flex-col gap-2" role="group" aria-label="Answers">
          {round.options.map((o, i) => {
            const wrong = tried.includes(i) && !o.right;
            const right = solved && o.right;
            if (solved && !o.right) return null;
            return (
              <button
                key={o.text}
                type="button"
                data-shortcut=""
                disabled={wrong || solved}
                onClick={() => choose(i)}
                className={cn(
                  "flex min-h-14 items-center gap-3 rounded-lg border-2 bg-card px-3 py-2.5 text-left text-[17px] leading-snug transition-colors hover:border-ink/40",
                  wrong && "border-vermilion/30 text-muted-foreground line-through decoration-vermilion/50",
                  right && "border-sage bg-sage/10 hover:border-sage",
                  !wrong && !right && "border-border",
                )}
              >
                <kbd className="pointer-coarse:hidden rounded bg-paper-deep px-1.5 text-xs font-bold text-muted-foreground" aria-hidden>
                  {i + 1}
                </kbd>
                <span>{o.text}</span>
              </button>
            );
          })}
        </div>
        {last && !last.right && !solved && (
          <p role="status" className="flex items-start gap-2 rounded-lg bg-vermilion/10 px-3 py-2 text-[16px] leading-relaxed">
            <RotateCcw className="mt-1 size-4 shrink-0" aria-hidden /> {last.reply}
          </p>
        )}
        {solved && last && (
          <div role="status" className="flex flex-col gap-1.5 rounded-lg bg-sage/15 p-4">
            <p className="text-[16px] leading-relaxed">{last.reply}</p>
            <p className="font-heading text-[19px] leading-snug">{round.point}</p>
          </div>
        )}
        {solved && (
          <Button size="lg" className="h-12 text-lg" onClick={onNext} autoFocus>
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
