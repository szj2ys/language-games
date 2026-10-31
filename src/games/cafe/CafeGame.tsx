"use client";

import Image from "next/image";
import { useEffect } from "react";
import { Eye, Hand, MessageCircleQuestion, RotateCcw, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GameFrame, GameLoading, SceneCanvas, SessionEnd } from "@/components/game/chrome";
import { useSessions } from "@/components/game/use-sessions";
import { track } from "@/components/analytics";
import { cn } from "@/lib/utils";
import { nextGame } from "@/content/order";
import type { SourceId } from "@/content/sources";
import { useDraft } from "@/lib/use-draft";
import { useShortcuts } from "@/components/game/shortcuts";
import { SESSIONS, did, type CafeRound, type Speaker } from "./rounds";

const GAME = "cafe";

/** The passages shown at the end of each session. */
const SESSION_SOURCES: SourceId[][] = [
  ["pi-43", "pi-23"],
  ["pi-23", "pi-7"],
  ["pi-21", "pi-23"],
  ["pi-23", "pi-21"],
];

const NAME: Record<Speaker, string> = { rosa: "Rosa", tom: "Tom", lena: "Lena" };

export function CafeGame() {
  const g = useSessions(GAME, SESSIONS, did);
  if (!g.ready) return <GameLoading slug={GAME} poster="/art/cafe/rounds/c1-1.webp" />;
  const { session, round, finished } = g;
  return (
    <GameFrame slug={GAME} g={g} withSpeech>
      {finished ? (
        <SessionEnd
          nextGame={nextGame("cafe")}
          items={g.sessionItems()}
          art="/art/covers/cafe.webp"
          title={session.title}
          shows={session.shows}
          firstTry={session.rounds.filter((r) => g.save.rounds[r.id]?.firstTry).length}
          total={session.rounds.length}
          sources={SESSION_SOURCES[g.sessionIndex]}
          nextTitle={SESSIONS[g.sessionIndex + 1]?.title}
          onNext={g.nextSession}
          onReplay={g.replay}
        />
      ) : (
        <Round key={round.id} round={round} speak={g.speech.speak} onDone={g.complete} onNext={g.next} />
      )}
    </GameFrame>
  );
}

function Round({
  round,
  speak,
  onDone,
  onNext,
}: {
  round: CafeRound;
  speak: (t: string) => void;
  onDone: (marks: number, max: number, firstTry: boolean, phrases: string[], missed?: string) => void;
  onNext: () => void;
}) {
  const [chosen, setChosen] = useDraft<number | null>(round.id, "chosen", null);
  const [asked, setAsked] = useDraft(round.id, "asked", false);
  const [misses, setMisses] = useDraft(round.id, "misses", 0);
  const [lastSaid, setLastSaid] = useDraft<string | null>(round.id, "lastSaid", null);
  const [firstMiss, setFirstMiss] = useDraft<string | null>(round.id, "firstMiss", null);
  const pick = chosen === null ? null : round.options[chosen];
  const solved = !!pick?.fits;

  useEffect(() => {
    const t = setTimeout(() => speak(round.says), 400);
    return () => clearTimeout(t);
  }, [round.says, speak]);

  const choose = (i: number) => {
    const o = round.options[i];
    setChosen(i);
    setLastSaid(o.reaction);
    speak(o.reaction.replace(/\([^)]*\)/g, ""));
    if (o.fits) onDone(misses === 0 ? 2 : 1, 2, misses === 0, [round.says], firstMiss ?? undefined);
    else {
      setMisses((m) => m + 1);
      if (!firstMiss) setFirstMiss(o.text);
      track("repair_used", { game: GAME, round: round.id });
    }
  };

  useShortcuts({
    "1": solved ? undefined : () => choose(0),
    "2": solved ? undefined : () => choose(1),
    "3": solved ? undefined : () => choose(2),
    Enter: solved ? onNext : undefined,
  });

  const ask = () => {
    setAsked(true);
    if (round.ask) setLastSaid(round.ask.answer);
    if (round.ask) speak(round.ask.answer);
  };

  // The bubble shows the latest thing said: the reaction to a choice, or the answer to a question asked after it.
  const bubble = lastSaid ?? round.says;

  return (
    <div className="flex flex-1 flex-col gap-3 lg:grid lg:grid-cols-[minmax(0,1fr)_400px] lg:items-center lg:gap-8 lg:px-4">
      {/* The answers follow the clues: a growing picture cost LCP, docked answers left an empty band above them. */}
      <div>
        <SceneCanvas
          label={round.clues.join(" ")}
          overlay={
            <div className="absolute top-[4%] right-[3%] max-w-[58%] rounded-2xl border border-ink/15 bg-card px-3 py-1.5 shadow-sm">
              <p className="text-xs font-bold text-muted-foreground">{NAME[round.speaker]}</p>
              <p
                className="flex items-center gap-1 font-heading text-[clamp(16px,4.4vw,24px)] leading-tight font-semibold"
                aria-live="polite"
              >
                <Line text={bubble} />
                <button
                  type="button"
                  onClick={() => speak(bubble.replace(/\([^)]*\)/g, ""))}
                  aria-label="Hear it again"
                  className="-my-2 grid size-11 shrink-0 place-items-center rounded-full hover:bg-paper-deep"
                >
                  <Volume2 className="size-5" aria-hidden />
                </button>
              </p>
            </div>
          }
        >
          {/* One picture per round, drawn so the clues can be seen, not only read — and one for the moment after. */}
          <Image
            key={solved ? "after" : "before"}
            src={solved ? `/art/cafe/after/${round.id}.webp` : `/art/cafe/rounds/${round.id}.webp`}
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 700px, 133vw"
            className="object-cover animate-in duration-500 fade-in"
          />
        </SceneCanvas>
        {!solved && (
          <ul className="flex flex-col gap-1 px-3 pt-2 lg:px-0" aria-label="What you can see">
            {round.clues.map((c) => (
              <li key={c} className="flex items-start gap-2 text-[15px] lg:text-[18px]">
                <Eye className="mt-0.5 size-4 shrink-0 text-cobalt" aria-hidden />
                {c}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex flex-col gap-2 px-3 pb-4 lg:px-0">
        <p className="text-[15px] text-muted-foreground lg:text-[18px]">
          {NAME[round.speaker]} says “{round.says}” {solved ? "You chose:" : "What do you do?"}
        </p>
        {round.options.map((o, i) => {
          const tried = chosen === i && !o.fits;
          if (solved && !o.fits) return null;
          return (
            <button
              key={o.text}
              type="button"
              onClick={() => choose(i)}
              disabled={tried || solved}
              data-shortcut=""
              className={cn(
                "flex min-h-14 items-center gap-2.5 rounded-xl border-2 bg-card px-3 py-2 text-left text-[17px] transition-colors hover:border-ink/30",
                tried && "border-terracotta/40 opacity-60",
                solved && "border-sage bg-sage/10 hover:border-sage",
                !tried && !solved && "border-border",
              )}
            >
              <kbd className="pointer-coarse:hidden mr-1 rounded bg-paper-deep px-1.5 text-xs font-bold text-muted-foreground" aria-hidden>
                {i + 1}
              </kbd>
              {o.kind === "do" ? (
                <Hand className="size-5 shrink-0 text-terracotta" aria-label="Do" />
              ) : (
                <MessageCircleQuestion className="size-5 shrink-0 text-cobalt" aria-label="Say" />
              )}
              <span className={cn(o.kind === "say" && "font-heading text-[18px]")}>{o.text}</span>
            </button>
          );
        })}
        {!solved && (
          <>
            {round.ask && !asked && (
              <Button
                variant="outline"
                size="lg"
                className="h-auto min-h-12 justify-start py-2 text-left text-[16px] whitespace-normal"
                onClick={ask}
              >
                Ask first: “{round.ask.question}”
              </Button>
            )}
            {pick && !pick.fits && lastSaid === pick.reaction && (
              <p role="status" className="flex items-center gap-2 rounded-lg bg-terracotta/10 px-3 py-2 text-[15px] lg:text-[18px]">
                <RotateCcw className="size-4 shrink-0" aria-hidden /> Not quite what {NAME[round.speaker]} meant. Look at the clues and try
                another response.
              </p>
            )}
          </>
        )}
        {solved && (
          <div role="status" className="flex flex-col gap-2 rounded-xl bg-sage/15 p-4">
            <p className="text-sm font-bold text-sage">What the words were doing here</p>
            <p className="font-heading text-[20px] leading-snug">{round.use.charAt(0).toUpperCase() + round.use.slice(1)}.</p>
            <p className="text-[15px] lg:text-[18px] leading-relaxed">{round.note}</p>
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

/** Speech in the serif; stage directions "(She looks at the teapot.)" in small italics, not read as words. */
function Line({ text }: { text: string }) {
  return (
    <span>
      {text.split(/(\([^)]*\))/).map((part, i) =>
        part.startsWith("(") ? (
          <em key={i} className="font-sans text-[0.7em] font-normal text-muted-foreground">
            {part.slice(1, -1)}
          </em>
        ) : (
          part
        ),
      )}
    </span>
  );
}
