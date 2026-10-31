"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { BookOpen, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GameFrame, GameLoading, SceneCanvas, SessionEnd } from "@/components/game/chrome";
import { useSessions } from "@/components/game/use-sessions";
import type { SourceId } from "@/content/sources";
import { cn } from "@/lib/utils";
import { nextGame } from "@/content/order";
import { useDraft } from "@/lib/use-draft";
import { bestCards, explain, showExample, sitExam, startPupil, type Level, type Pupil } from "./engine";
import { SESSIONS, did } from "./levels";

const GAME = "pupil";

const SESSION_SOURCES: SourceId[][] = [
  ["pi-185", "pi-198", "pi-202"],
  ["pi-217", "pi-202"],
  ["pi-198", "pi-202"],
];

export function PupilGame() {
  const g = useSessions(GAME, SESSIONS, did);
  if (!g.ready) return <GameLoading slug={GAME} poster="/art/pupil/classroom.webp" />;
  const { session, round, finished } = g;
  return (
    <GameFrame slug={GAME} g={g}>
      {finished ? (
        <SessionEnd
          nextGame={nextGame("pupil")}
          items={g.sessionItems()}
          art="/art/covers/pupil.webp"
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
        <Lesson key={round.id} level={round} onDone={g.complete} onNext={g.next} />
      )}
    </GameFrame>
  );
}

type Phase = "teach" | "twist" | "done";

function Lesson({
  level,
  onDone,
  onNext,
}: {
  level: Level;
  onDone: (marks: number, max: number, firstTry: boolean, phrases: string[]) => void;
  onNext: () => void;
}) {
  const [pupil, setPupil] = useDraft<Pupil>(level.id, "pupil", () => startPupil(level));
  const [cards, setCards] = useDraft(level.id, "cards", 0);
  const [explained, setExplained] = useDraft<number[]>(level.id, "explained", []);
  const [phase, setPhase] = useDraft<Phase>(level.id, "phase", "teach");
  const [call, setCall] = useDraft<"correct" | "both" | null>(level.id, "call", null);
  const bestSet = useMemo(() => bestCards(level), [level]);
  const best = bestSet.length;
  const exam = sitExam(level, pupil);
  const [changed, setChanged] = useState<string[]>([]);

  // Only example cards count against par; an explanation is free, and works only inside a practice.
  const teach = (next: Pupil, card: boolean) => {
    const before = sitExam(level, pupil).answers;
    const after = sitExam(level, next).answers;
    setChanged(after.filter((a, i) => a.said !== before[i].said).map((a) => a.word));
    setPupil(next);
    if (card) setCards((n) => n + 1);
  };

  const decide = (c: "correct" | "both") => {
    setCall(c);
    const right = c === level.twist.answer;
    const marks = 1 + (cards <= best ? 1 : 0) + (right ? 1 : 0);
    onDone(marks, 3, cards <= best && right, [
      ...pupil.shown.map((i) => `Showed: ${i.correct}`),
      `Your call on “${level.twist.item.word}”: ${c === "correct" ? "correct it" : "both are in use"}`,
    ]);
    setPhase("done");
  };

  const said = exam.passed ? (phase === "teach" ? "Now I can go on!" : null) : null;
  const shown = new Set(pupil.shown.map((i) => i.word));

  return (
    <div className="flex flex-1 flex-col gap-3 lg:grid lg:grid-cols-[minmax(0,1fr)_400px] lg:items-center lg:gap-8 lg:px-4">
      <div className="flex flex-1 flex-col lg:block">
        <SceneCanvas
          overlay={
            <>
              {/* The pupil's slate: what it writes is all we can see of its rule. */}
              <div className="absolute top-[8%] right-[3%] w-[58%] sm:w-[52%] rounded-lg bg-ink/90 px-3 py-2 text-paper shadow">
                <p className="text-xs font-bold tracking-wide text-paper/80 uppercase">The pupil&apos;s test</p>
                <ol className="mt-1 grid grid-cols-1 gap-0.5" aria-label="The pupil's answers">
                  {exam.answers.map((a) => (
                    <li
                      key={a.word}
                      className={cn(
                        "flex items-center gap-1.5 font-heading text-[clamp(14px,3.6vw,20px)] leading-tight transition-colors",
                        changed.includes(a.word) && "text-ochre",
                      )}
                    >
                      {a.ok ? (
                        <Check className="size-4 shrink-0 text-[#9fc28e]" aria-label="right:" />
                      ) : (
                        <X className="size-4 shrink-0 text-[#e79a86]" aria-label="wrong:" />
                      )}
                      {a.said}
                    </li>
                  ))}
                </ol>
              </div>
              {said && (
                <div
                  className="absolute top-[6%] left-[3%] rounded-2xl border border-ink/15 bg-card px-3 py-1 font-heading text-[clamp(15px,4vw,22px)] font-semibold shadow-sm"
                  role="status"
                >
                  {said}
                </div>
              )}
            </>
          }
        >
          <Image src="/art/pupil/classroom.webp" alt="" fill priority sizes="(min-width: 1024px) 700px, 133vw" className="object-cover" />
          <div className="absolute bottom-0 left-[13%] h-[80%] w-[34%] sm:left-[4%]">
            <Image src="/art/pupil/pupil.webp" alt="" fill sizes="220px" className="object-contain object-bottom" />
          </div>
        </SceneCanvas>
        <p className="px-3 pt-2 text-[15px] lg:text-[18px] lg:px-0">{level.task}</p>
      </div>

      <div className="mt-auto flex flex-col gap-3 px-3 pb-4 lg:mt-0 lg:px-0">
        {phase === "teach" && !exam.passed && (
          <>
            <p className="text-[15px] text-muted-foreground lg:text-[18px]">
              Show the pupil an example. It will re-sit the test using whatever way of going on fits everything it has seen.
            </p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3" role="group" aria-label="Example cards">
              {level.deck.map((it) => (
                <button
                  key={it.word}
                  type="button"
                  disabled={shown.has(it.word)}
                  onClick={() => teach(showExample(pupil, it), true)}
                  className="flex min-h-14 items-center justify-center rounded-xl border-2 border-border bg-card px-2 py-2 font-heading text-[19px] hover:border-ink/30 disabled:border-sage/40 disabled:bg-sage/10 disabled:text-muted-foreground"
                >
                  {it.correct}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-2" role="group" aria-label="Explain the rule in words">
              {level.explain.map((e, i) => (
                <Button
                  key={e.text}
                  variant="outline"
                  size="lg"
                  className="h-auto min-h-12 justify-start py-2 text-left text-[16px] whitespace-normal"
                  disabled={explained.includes(i)}
                  onClick={() => {
                    setExplained((x) => [...x, i]);
                    teach(explain(level, pupil, e), false);
                  }}
                >
                  <BookOpen className="size-5 shrink-0" aria-hidden /> Explain: “{e.text}”
                </Button>
              ))}
            </div>
            {explained.length > 0 && (
              <p role="status" className="rounded-lg bg-ochre/15 px-3 py-2 text-[15px] lg:text-[18px]">
                The pupil nods — and reads your sentence its own way. An explanation is one more sign to interpret (§198).
              </p>
            )}
            <p className="text-[15px] text-muted-foreground lg:text-[18px]" aria-live="polite">
              Cards used: {cards}.
            </p>
          </>
        )}

        {phase === "teach" && exam.passed && (
          <>
            {explained.some((i) => level.explain[i].readAs === exam.way) && (
              <p className="rounded-lg bg-ochre/15 px-3 py-2 text-[15px] lg:text-[18px]">
                This time the explanation worked: an example had already shown the pupil what its key word means. Explanations work inside a
                practice, not instead of one (§§198–202).
              </p>
            )}
            <p role="status" className="rounded-xl bg-sage/15 p-3 text-[16px]">
              All five right with {cards} card{cards === 1 ? "" : "s"}
              {cards <= best
                ? " — as few as possible."
                : `. It can be done with ${best}: ${bestSet.map((c) => `“${c.correct}”`).join(" and ")} ${best === 1 ? "rules out every wrong way at once" : "together rule out every wrong way"}.`}
            </p>
            <Button size="lg" className="h-12 text-lg" onClick={() => setPhase("twist")} autoFocus>
              Now a word it hasn&apos;t seen
            </Button>
          </>
        )}

        {phase !== "teach" && (
          <div className="flex flex-col gap-3">
            <p className="font-heading text-[19px] leading-snug">{level.twist.prompt}</p>
            {phase === "twist" ? (
              <div className="grid grid-cols-2 gap-2">
                <Button size="lg" variant="outline" className="h-14 text-[16px]" onClick={() => decide("correct")}>
                  Correct it
                </Button>
                <Button size="lg" variant="outline" className="h-14 text-[16px]" onClick={() => decide("both")}>
                  Both are in use
                </Button>
              </div>
            ) : (
              <>
                <p
                  role="status"
                  className={cn(
                    "rounded-xl p-3 text-[16px] leading-relaxed",
                    call === level.twist.answer ? "bg-sage/15" : "bg-terracotta/10",
                  )}
                >
                  <span className="font-bold">{call === level.twist.answer ? "Good call. " : "Not this time. "}</span>
                  {level.twist.why}
                </p>
                <p className="text-[15px] text-muted-foreground lg:text-[18px]">The rule you were teaching: {level.rule}.</p>
                <Button size="lg" className="h-12 text-lg" onClick={onNext} autoFocus>
                  Next
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
