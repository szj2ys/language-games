"use client";

import Image from "next/image";
import { useEffect } from "react";
import { Eye, Hand, MessageCircleQuestion, RotateCcw, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GameLoading, GameHeader, SessionEnd } from "@/components/game/chrome";
import { useSessions } from "@/components/game/use-sessions";
import { track } from "@/components/analytics";
import { cn } from "@/lib/utils";
import { useDraft } from "@/lib/use-draft";
import { SESSIONS, type CafeRound, type Speaker } from "./rounds";

const GAME = "cafe";

const NAME: Record<Speaker, string> = { rosa: "Rosa", tom: "Tom", lena: "Lena" };

export function CafeGame() {
  const g = useSessions(GAME, SESSIONS);
  if (!g.ready) return <GameLoading game="The Café" poster="/art/cafe/cafe.webp" />;
  const { session, round, finished } = g;
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col">
      <GameHeader
        game="The Café"
        title={session.title}
        round={finished ? session.rounds.length : g.roundIndex}
        total={session.rounds.length}
        speech={g.speech.available ? g.save.settings.speech : undefined}
        onToggleSpeech={g.speech.available ? g.toggleSpeech : undefined}
      />
      {!g.storable && (
        <p role="status" className="mx-3 rounded-md bg-paper-deep px-3 py-1.5 text-sm">
          Progress cannot be saved in this browser. You can still play.
        </p>
      )}
      <main id="main" className="flex flex-1 flex-col">
        {finished ? (
          <SessionEnd
            title={session.title}
            english={session.english}
            firstTry={session.rounds.filter((r) => g.save.rounds[r.id]?.firstTry).length}
            total={session.rounds.length}
            sources={g.sessionIndex === 0 ? [session.source, "pi-23"] : g.sessionIndex === 1 ? [session.source, "pi-7"] : ["pi-21", "pi-23"]}
            nextTitle={SESSIONS[g.sessionIndex + 1]?.title}
            onNext={g.nextSession}
            onReplay={g.replay}
          />
        ) : (
          <Round key={round.id} round={round} speak={g.speech.speak} onDone={g.complete} onNext={g.next} />
        )}
      </main>
    </div>
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
  onDone: (marks: number, max: number, firstTry: boolean, phrases: string[]) => void;
  onNext: () => void;
}) {
  const [chosen, setChosen] = useDraft<number | null>(round.id, "chosen", null);
  const [asked, setAsked] = useDraft(round.id, "asked", false);
  const [misses, setMisses] = useDraft(round.id, "misses", 0);
  const pick = chosen === null ? null : round.options[chosen];
  const solved = !!pick?.fits;

  useEffect(() => {
    const t = setTimeout(() => speak(round.says), 400);
    return () => clearTimeout(t);
  }, [round.says, speak]);

  const choose = (i: number) => {
    const o = round.options[i];
    setChosen(i);
    speak(o.reaction.replace(/\([^)]*\)/g, ""));
    if (o.fits) onDone(misses === 0 ? 2 : 1, 2, misses === 0, [round.says]);
    else {
      setMisses((m) => m + 1);
      track("repair_used", { game: GAME, round: round.id });
    }
  };

  const ask = () => {
    setAsked(true);
    if (round.ask) speak(round.ask.answer);
  };

  const bubble = pick ? pick.reaction : asked && round.ask ? round.ask.answer : round.says;
  const sprite = round.speaker;

  return (
    <div className="flex flex-1 flex-col gap-3 lg:grid lg:grid-cols-[1.4fr_1fr] lg:items-start lg:gap-6 lg:px-3">
      <div>
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-paper-deep sm:rounded-2xl">
          <Image src="/art/cafe/cafe.webp" alt="" fill priority sizes="(min-width: 1024px) 640px, 100vw" className="object-cover" />
          <div className="absolute bottom-0 left-[6%] h-[78%] w-[30%]">
            <Image src={`/art/cafe/${sprite}.webp`} alt="" fill sizes="200px" className="object-contain object-bottom" />
          </div>
          <div className="absolute bottom-0 right-[4%] h-[74%] w-[24%]">
            <Image src="/art/cafe/host.webp" alt="" fill sizes="160px" className="object-contain object-bottom" />
          </div>
          <div className="absolute top-[6%] left-[30%] max-w-[64%] rounded-2xl border border-ink/15 bg-card px-3 py-1.5 shadow-sm">
            <p className="text-xs font-bold text-muted-foreground">{NAME[round.speaker]}</p>
            <p className="flex items-center gap-1 font-heading text-[clamp(16px,4.4vw,24px)] leading-tight font-semibold" aria-live="polite">
              <Line text={bubble} />
              <button type="button" onClick={() => speak(bubble.replace(/\([^)]*\)/g, ""))} aria-label="Hear it again" className="-my-2 grid size-11 shrink-0 place-items-center rounded-full hover:bg-paper-deep">
                <Volume2 className="size-5" aria-hidden />
              </button>
            </p>
          </div>
        </div>
        <ul className="flex flex-col gap-1 px-3 pt-2 lg:px-0" aria-label="What you can see">
          {round.clues.map((c) => (
            <li key={c} className="flex items-start gap-2 text-[15px]">
              <Eye className="mt-0.5 size-4 shrink-0 text-cobalt" aria-hidden />
              {c}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-2 px-3 pb-4 lg:px-0">
        {!solved && (
          <>
            <p className="text-sm text-muted-foreground">
              {NAME[round.speaker]} says “{round.says}” What do you do?
            </p>
            {round.options.map((o, i) => {
              const tried = chosen === i && !o.fits;
              return (
                <button
                  key={o.text}
                  type="button"
                  onClick={() => choose(i)}
                  disabled={tried}
                  className={cn(
                    "flex min-h-14 items-center gap-2.5 rounded-xl border-2 bg-card px-3 py-2 text-left text-[17px] transition-colors hover:border-ink/30",
                    tried ? "border-terracotta/40 opacity-60" : "border-border",
                  )}
                >
                  {o.kind === "do" ? (
                    <Hand className="size-5 shrink-0 text-terracotta" aria-label="Do" />
                  ) : (
                    <MessageCircleQuestion className="size-5 shrink-0 text-cobalt" aria-label="Say" />
                  )}
                  <span className={cn(o.kind === "say" && "font-heading text-[18px]")}>{o.text}</span>
                </button>
              );
            })}
            {round.ask && !asked && (
              <Button variant="outline" size="lg" className="h-12 justify-start text-[16px]" onClick={ask}>
                Ask first: “{round.ask.question}”
              </Button>
            )}
            {pick && !pick.fits && (
              <p role="status" className="flex items-center gap-2 rounded-lg bg-terracotta/10 px-3 py-2 text-[15px]">
                <RotateCcw className="size-4 shrink-0" aria-hidden /> Not quite what {NAME[round.speaker]} meant. Look at the clues and try another response.
              </p>
            )}
          </>
        )}
        {solved && (
          <div role="status" className="flex flex-col gap-2 rounded-xl bg-sage/15 p-4">
            <p className="text-sm font-bold text-sage">What the words were doing here</p>
            <p className="font-heading text-[20px] leading-snug">{round.use.charAt(0).toUpperCase() + round.use.slice(1)}.</p>
            <p className="text-[15px] leading-relaxed">{round.note}</p>
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
