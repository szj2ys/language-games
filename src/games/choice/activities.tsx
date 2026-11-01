"use client";

import Image from "next/image";
import { Check, CornerDownRight, Lock, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SceneCanvas } from "@/components/game/chrome";
import { useDraft } from "@/lib/use-draft";
import { cn } from "@/lib/utils";
import { hingesOf, type BoxesRound, type ChecksRound, type DiaryRound, type SortRound } from "./types";

type Done = (marks: number, max: number, firstTry: boolean, phrases: string[], missed?: string) => void;

/** The shared frame of an activity: the picture, the situation, then the work, then the point and Next. */
function Layout({
  art,
  situation,
  children,
  point,
  onNext,
}: {
  art: string;
  situation: string;
  children: React.ReactNode;
  point?: string;
  onNext: () => void;
}) {
  return (
    <div className="flex flex-col gap-3 lg:grid lg:grid-cols-[minmax(0,1fr)_460px] lg:items-start lg:gap-8 lg:px-6">
      <SceneCanvas label={situation} className="max-sm:aspect-[16/9]">
        <Image src={art} alt="" fill priority sizes="(min-width: 1024px) 700px, 133vw" className="object-cover" />
      </SceneCanvas>
      <div className="flex flex-col gap-3 px-3 pb-4 lg:px-0">
        <p className="text-[17px] leading-relaxed lg:text-[19px]">{situation}</p>
        {children}
        {point && (
          <>
            <div role="status" ref={(el) => el?.scrollIntoView({ block: "nearest" })} className="rounded-lg bg-sage/15 p-4">
              <p className="font-heading text-[19px] leading-snug">{point}</p>
            </div>
            <Button size="lg" className="h-12 text-lg" onClick={onNext} autoFocus>
              Next
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

/** A question after the activity, answered like the other rounds: wrong answers get their reply. */
function Reflect({
  roundId,
  question,
  options,
  onRight,
}: {
  roundId: string;
  question: string;
  options: { text: string; right: boolean; reply: string }[];
  onRight: (wrongFirst?: string) => void;
}) {
  const [tried, setTried] = useDraft<number[]>(roundId, "reflect", []);
  const solved = tried.some((i) => options[i]?.right);
  const last = tried.length ? options[tried[tried.length - 1]] : null;
  return (
    <>
      <h2 className="font-heading text-[22px] leading-snug font-medium lg:text-[24px]">{question}</h2>
      <div className="flex flex-col gap-2" role="group" aria-label="Answers">
        {options.map((o, i) => {
          const wrong = tried.includes(i) && !o.right;
          if (solved && !o.right) return null;
          return (
            <button
              key={o.text}
              type="button"
              disabled={wrong || solved}
              onClick={() => {
                if (tried.includes(i)) return;
                setTried([...tried, i]);
                if (o.right) onRight(tried.length ? options[tried[0]].text : undefined);
              }}
              className={cn(
                "flex min-h-14 items-center rounded-lg border-2 bg-card px-3 py-2.5 text-left text-[17px] leading-snug hover:border-ink/40",
                wrong && "border-vermilion/30 text-muted-foreground line-through decoration-vermilion/50",
                solved && o.right && "border-sage bg-sage/10",
                !wrong && !(solved && o.right) && "border-border",
              )}
            >
              {o.text}
            </button>
          );
        })}
      </div>
      {last && (
        <p
          role="status"
          ref={(el) => el?.scrollIntoView({ block: "nearest" })}
          className={cn("rounded-lg px-3 py-2 text-[16px] leading-relaxed", last.right ? "bg-sage/10" : "bg-vermilion/10")}
        >
          {last.reply}
        </p>
      )}
    </>
  );
}

// ---------------------------------------------------------------------------------------------
// The beetle in the box (§293): choose what is in your box; the talk does not change.

export function BoxesPlay({ round, onDone, onNext }: { round: BoxesRound; onDone: Done; onNext: () => void }) {
  const [tried, setTried] = useDraft<number[]>(round.id, "contents", []);
  const [done, setDone] = useDraft(round.id, "done", false);
  const mine = tried.length ? tried[tried.length - 1] : null;
  const changed = new Set(tried).size >= 2;
  return (
    <Layout art={round.art} situation={round.situation} point={done ? round.point : undefined} onNext={onNext}>
      <section aria-labelledby="your-box" className="rounded-lg border border-border bg-card p-3">
        <h2 id="your-box" className="flex items-center gap-2 font-heading text-[19px] font-medium">
          <Lock className="size-4" aria-hidden /> Your box. Only you can see inside.
        </h2>
        <p className="text-[15px] text-muted-foreground">
          {mine === null ? "Put something in it." : changed ? "Change it again if you like." : "Now change what is in it."}
        </p>
        <div className="mt-2 grid grid-cols-2 gap-2" role="group" aria-label="What is in your box">
          {round.contents.map((c, i) => (
            <button
              key={c}
              type="button"
              aria-pressed={mine === i}
              onClick={() => setTried([...tried, i])}
              className={cn(
                "min-h-12 rounded-lg border-2 px-2 py-2 text-[16px]",
                mine === i ? "border-ink bg-ink text-paper" : "border-border bg-paper hover:border-ink/40",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </section>
      {mine !== null && (
        <section aria-labelledby="talk" className="rounded-lg border border-border bg-card p-3">
          <h2 id="talk" className="font-heading text-[19px] font-medium">
            The evening&apos;s talk
            {changed && <span className="ml-2 font-sans text-[14px] text-sage">word for word the same</span>}
          </h2>
          <ol className="mt-1 flex flex-col gap-1.5">
            {round.talk.map((t) => (
              <li key={t.line} className="text-[16px] leading-snug">
                <span className="font-bold">{t.who}:</span> “{t.line}”
              </li>
            ))}
          </ol>
          <p className="mt-2 text-[14px] text-muted-foreground">In your box right now: {round.contents[mine].toLowerCase()}.</p>
        </section>
      )}
      {changed && (
        <Reflect
          roundId={round.id}
          question={round.question}
          options={round.options}
          onRight={(wrong) => {
            setDone(true);
            onDone(
              wrong ? 1 : 2,
              2,
              !wrong,
              [`Tried: ${[...new Set(tried)].map((i) => round.contents[i].toLowerCase()).join(", ")}`],
              wrong,
            );
          }}
        />
      )}
    </Layout>
  );
}

// ---------------------------------------------------------------------------------------------
// The private diary (§258), then the manometer (§270).

const HUES = [12, 22, 8, 30, 16, 26, 18, 10, 28];
/** A sensation, drawn: never quite the same twice. Days when the gauge rises feel sharper. */
function Sensation({ shape, sharp, label }: { shape: number; sharp: boolean; label: string }) {
  const hue = HUES[shape % HUES.length];
  const r = 25 + ((shape * 7) % 7);
  const wobble = sharp ? 8 + ((shape * 3) % 3) : 2 + ((shape * 5) % 2);
  const d = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2;
    const rr = r + (i % 2 ? wobble : -wobble / 2);
    return `${i ? "L" : "M"}${(40 + rr * Math.cos(a)).toFixed(1)},${(40 + rr * Math.sin(a)).toFixed(1)}`;
  }).join(" ");
  return (
    <svg viewBox="0 0 80 80" className="size-14 shrink-0" role="img" aria-label={label}>
      <path d={`${d} Z`} fill={`hsl(${hue} 60% 55% / 0.85)`} stroke="#1c2a44" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

type DiaryStage = "write" | "checked" | "gauge" | "predict" | "reveal";

function DiaryDay({
  day,
  label,
  mark,
  locked,
  gauge,
  onMark,
}: {
  day: { shape: number; gauge: boolean };
  label: string;
  mark: boolean | null;
  locked: boolean;
  /** Shown once the gauge is fitted. */
  gauge?: boolean;
  onMark: (v: boolean) => void;
}) {
  return (
    <li className="flex items-center gap-3 rounded-lg border border-border bg-card p-2">
      <Sensation shape={day.shape} sharp={day.gauge} label={`${label}: the sensation`} />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="text-[15px] font-bold">{label}</p>
        <div className="flex gap-2" role="group" aria-label={`${label}: write S?`}>
          {[true, false].map((v) => (
            <button
              key={String(v)}
              type="button"
              aria-pressed={mark === v}
              disabled={locked}
              onClick={() => onMark(v)}
              className={cn(
                "min-h-11 flex-1 rounded-lg border-2 px-2 text-[15px] whitespace-nowrap",
                mark === v ? "border-ink bg-ink text-paper" : "border-border bg-paper hover:border-ink/40",
              )}
            >
              {v ? "Write “S”" : "Not S"}
            </button>
          ))}
        </div>
      </div>
      {gauge !== undefined && (
        <span className={cn("w-20 shrink-0 text-right text-[14px] font-bold", gauge ? "text-vermilion" : "text-muted-foreground")}>
          {gauge ? "Gauge rose" : "Gauge flat"}
          {mark === gauge && <Check className="ml-1 inline size-4 text-sage" aria-label="matches" />}
        </span>
      )}
    </li>
  );
}

export function DiaryPlay({ round, onDone, onNext }: { round: DiaryRound; onDone: Done; onNext: () => void }) {
  const [marks, setMarks] = useDraft<(boolean | null)[]>(round.id, "marks", () => round.days.map((_, i) => (i === 0 ? true : null)));
  const [test, setTest] = useDraft<(boolean | null)[]>(round.id, "test", () => round.test.map(() => null));
  const [stage, setStage] = useDraft<DiaryStage>(round.id, "stage", "write");
  const [done, setDone] = useDraft(round.id, "done", false);
  const later = round.days.slice(1);
  const matched = later.filter((d, i) => marks[i + 1] === d.gauge).length;
  const predicted = round.test.filter((d, i) => test[i] === d.gauge).length;
  const showGauge = stage === "gauge" || stage === "predict" || stage === "reveal";

  return (
    <Layout art={round.art} situation={round.situation} point={done ? round.point : undefined} onNext={onNext}>
      <ol className="flex flex-col gap-2" aria-label="Your diary">
        <li className="flex items-center gap-3 rounded-lg border border-border bg-card p-2">
          <Sensation shape={round.days[0].shape} sharp={round.days[0].gauge} label="Day 1: the sensation you named S" />
          <p className="text-[15px]">
            <span className="font-bold">Day 1</span> · you felt it and wrote <span className="font-heading text-[19px]">S</span>
          </p>
        </li>
        {later.map((d, i) => (
          <DiaryDay
            key={i}
            day={d}
            label={`Day ${i + 2}`}
            mark={marks[i + 1]}
            locked={stage !== "write"}
            gauge={showGauge ? d.gauge : undefined}
            onMark={(v) => setMarks(marks.map((m, j) => (j === i + 1 ? v : m)))}
          />
        ))}
      </ol>
      <p className="text-[14px] text-muted-foreground">
        Where the game stops: here you can look back at the drawings. In Wittgenstein&apos;s diary there is nothing to look back at, only
        your impression of the sensation; that is the point of §258.
      </p>
      {stage === "write" && (
        <Button size="lg" className="h-12 text-lg" disabled={marks.some((m) => m === null)} onClick={() => setStage("checked")}>
          Check your diary
        </Button>
      )}
      {stage !== "write" && (
        <p role="status" className="rounded-lg bg-vermilion/10 px-3 py-2 text-[16px] leading-relaxed">
          Check it against what? There is only your impression of S. Whatever seems right to you counts as right; “and that only means that
          here we can&apos;t talk about ‘right’” (§258).
        </p>
      )}
      {stage === "checked" && (
        <Button size="lg" variant="outline" className="h-12 text-lg" onClick={() => setStage("gauge")}>
          A doctor fits a blood-pressure gauge
        </Button>
      )}
      {showGauge && (
        <p
          role="status"
          ref={(el) => el?.scrollIntoView({ block: "nearest" })}
          className="rounded-lg bg-sage/10 px-3 py-2 text-[16px] leading-relaxed"
        >
          Your “S” matched the gauge on {matched} of {later.length} days
          {matched === later.length ? ": every day." : matched >= 3 ? "." : ", so far it does not track the gauge."} Either way, something
          has changed: there is now a check that can come out against you, so it makes sense to say you were right or wrong.
        </p>
      )}
      {stage === "gauge" && (
        <Button size="lg" className="h-12 text-lg" onClick={() => setStage("predict")}>
          Three new days, gauge hidden
        </Button>
      )}
      {(stage === "predict" || stage === "reveal") && (
        <>
          <ol className="flex flex-col gap-2" aria-label="Three new days">
            {round.test.map((d, i) => (
              <DiaryDay
                key={i}
                day={d}
                label={`New day ${i + 1}`}
                mark={test[i]}
                locked={stage === "reveal"}
                gauge={stage === "reveal" ? d.gauge : undefined}
                onMark={(v) => setTest(test.map((m, j) => (j === i ? v : m)))}
              />
            ))}
          </ol>
          {stage === "predict" && (
            <Button
              size="lg"
              className="h-12 text-lg"
              disabled={test.some((m) => m === null)}
              onClick={() => {
                setStage("reveal");
                const all = predicted === round.test.length;
                setDone(true);
                onDone(all ? 2 : 1, 2, all, [`S predicted the gauge on ${predicted} of ${round.test.length} new days`]);
              }}
            >
              Show the gauge
            </Button>
          )}
          {stage === "reveal" && (
            <p
              role="status"
              ref={(el) => el?.scrollIntoView({ block: "nearest" })}
              className="rounded-lg bg-sage/10 px-3 py-2 text-[16px] leading-relaxed"
            >
              {predicted === round.test.length
                ? "“S” predicted the gauge on every new day. Now it has a use: it tells you your blood pressure is rising, without the gauge. “And now it seems quite indifferent whether I have recognized the sensation right or not” (§270)."
                : `“S” predicted the gauge on ${predicted} of ${round.test.length} new days: not yet a reliable sign. But notice who decides: the gauge, not your impression. That is what makes it a check.`}
            </p>
          )}
        </>
      )}
    </Layout>
  );
}

// ---------------------------------------------------------------------------------------------
// Checking, and what checking relies on (On Certainty §§125, 341–343).

export function ChecksPlay({ round, onDone, onNext }: { round: ChecksRound; onDone: Done; onNext: () => void }) {
  const hinges = hingesOf(round);
  const [path, setPath] = useDraft<string[]>(round.id, "path", [round.start]);
  const [check, setCheck] = useDraft<number | null>(round.id, "check", null);
  const [found, setFound] = useDraft<string[]>(round.id, "found", []);
  const [done, setDone] = useDraft(round.id, "done", false);
  const here = path[path.length - 1];
  const claim = round.claims[here];
  const chosen = check !== null ? claim.checks[check] : null;
  const circular = chosen?.reliesOn.includes(here) ?? false;
  const isHinge = hinges.includes(here);

  const choose = (i: number) => {
    setCheck(i);
    if (claim.checks[i].reliesOn.includes(here) && isHinge && !found.includes(here)) {
      const next = [...found, here];
      setFound(next);
      if (hinges.every((h) => next.includes(h))) {
        setDone(true);
        onDone(
          2,
          2,
          true,
          next.map((h) => `Stands fast: ${round.claims[h].text}`),
        );
      }
    }
  };

  return (
    <Layout art={round.art} situation={round.situation} point={done ? round.point : undefined} onNext={onNext}>
      <p className="text-[15px] text-muted-foreground">
        Find what your checks rely on. Hinges found: {found.length} of {hinges.length}.
      </p>
      {path.length > 1 && (
        <ol className="flex flex-wrap items-center gap-1 text-[14px] text-muted-foreground" aria-label="Where you came from">
          {path.slice(0, -1).map((p) => (
            <li key={p} className="flex items-center gap-1">
              {round.claims[p].text} <CornerDownRight className="size-3.5" aria-hidden />
            </li>
          ))}
        </ol>
      )}
      <div className="rounded-lg border border-border bg-card p-3">
        <p className="text-[14px] font-bold tracking-wide text-vermilion uppercase">To check</p>
        <p className="font-heading text-[21px] leading-snug">{claim.text}</p>
        <div className="mt-2 flex flex-col gap-2" role="group" aria-label="Ways to check it">
          {claim.checks.map((k, i) => (
            <button
              key={k.how}
              type="button"
              aria-pressed={check === i}
              onClick={() => choose(i)}
              className={cn(
                "min-h-12 rounded-lg border-2 px-3 py-2 text-left text-[16px]",
                check === i ? "border-ink bg-ink text-paper" : "border-border bg-paper hover:border-ink/40",
              )}
            >
              {k.how}
            </button>
          ))}
        </div>
      </div>
      {chosen && (
        <div role="status" ref={(el) => el?.scrollIntoView({ block: "nearest" })} className="rounded-lg border border-border bg-card p-3">
          {circular ? (
            <p className="text-[16px] leading-relaxed">
              <span className="font-bold text-vermilion">This check relies on the very thing it checks.</span> If you doubted it, why trust
              the check? “What is to be tested by what?” (On Certainty §125). <span className="font-bold">It stands fast.</span>
            </p>
          ) : (
            <>
              <p className="text-[15px] font-bold">This check relies on:</p>
              <ul className="mt-1 flex flex-col gap-1.5">
                {chosen.reliesOn.map((id) => (
                  <li key={id}>
                    <button
                      type="button"
                      onClick={() => {
                        setPath([...path, id]);
                        setCheck(null);
                      }}
                      className="flex min-h-11 w-full items-center justify-between gap-2 rounded-lg bg-paper px-3 py-2 text-left text-[16px] hover:bg-paper-deep"
                    >
                      <span>
                        {round.claims[id].text}
                        {found.includes(id) && <span className="ml-2 text-[13px] font-bold text-sage">stands fast</span>}
                      </span>
                      <span className="shrink-0 text-[14px] font-bold underline underline-offset-4">Check this</span>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
      {path.length > 1 && (
        <Button
          variant="outline"
          size="lg"
          className="h-12"
          onClick={() => {
            setPath(path.slice(0, -1));
            setCheck(null);
          }}
        >
          <Undo2 className="size-5" aria-hidden /> Back to “{round.claims[path[path.length - 2]].text}”
        </Button>
      )}
    </Layout>
  );
}

// ---------------------------------------------------------------------------------------------
// The river-bed (On Certainty §§96–97): sort, then see the bed shift.

export function SortPlay({ round, onDone, onNext }: { round: SortRound; onDone: Done; onNext: () => void }) {
  const [era, setEra] = useDraft(round.id, "era", 0);
  const [placed, setPlaced] = useDraft<(boolean | null)[]>(round.id, "placed", () => round.cards.map(() => null));
  const [checked, setChecked] = useDraft(round.id, "checked", false);
  const [misses, setMisses] = useDraft(round.id, "misses", 0);
  const [done, setDone] = useDraft(round.id, "done", false);
  const wrong = round.cards.map((c, i) => placed[i] !== null && placed[i] !== c.bed[era]);
  const all = placed.every((p) => p !== null);
  const ok = all && !wrong.some(Boolean);
  const last = era === round.eras.length - 1;

  return (
    <Layout art={round.art} situation={round.situation} point={done ? round.point : undefined} onNext={onNext}>
      <p className="font-heading text-[22px] font-medium">
        {round.eras[era].year} <span className="font-sans text-[15px] font-normal text-muted-foreground">· {round.eras[era].note}</span>
      </p>
      <ul className="flex flex-col gap-2" aria-label="Claims to sort">
        {round.cards.map((c, i) => (
          <li
            key={c.text}
            className={cn("rounded-lg border-2 bg-card p-2.5", checked && wrong[i] ? "border-vermilion/50" : "border-border")}
          >
            <p className="text-[16px] leading-snug">{c.text}</p>
            <div className="mt-1.5 grid grid-cols-2 gap-2" role="group" aria-label={c.text}>
              {[false, true].map((bed) => (
                <button
                  key={String(bed)}
                  type="button"
                  aria-pressed={placed[i] === bed}
                  disabled={done}
                  onClick={() => {
                    setPlaced(placed.map((p, j) => (j === i ? bed : p)));
                    setChecked(false);
                  }}
                  className={cn(
                    "min-h-11 rounded-lg border-2 px-2 text-[14px] font-bold",
                    placed[i] === bed ? "border-ink bg-ink text-paper" : "border-border bg-paper hover:border-ink/40",
                  )}
                >
                  {bed ? "Stands fast (the bed)" : "Open to checking (the water)"}
                </button>
              ))}
            </div>
          </li>
        ))}
      </ul>
      {!done && (
        <Button
          size="lg"
          className="h-12 text-lg"
          disabled={!all}
          onClick={() => {
            setChecked(true);
            if (!ok) {
              setMisses(misses + 1);
              return;
            }
            if (!last) {
              setEra(era + 1);
              setChecked(false);
              return;
            }
            setDone(true);
            onDone(misses === 0 ? 2 : 1, 2, misses === 0, [`Sorted the river-bed in ${round.eras.map((e) => e.year).join(" and ")}`]);
          }}
        >
          {checked && !ok ? "Look again" : last ? "Done" : `Check, then go to ${round.eras[era + 1].year}`}
        </Button>
      )}
      {checked && !ok && (
        <p
          role="status"
          ref={(el) => el?.scrollIntoView({ block: "nearest" })}
          className="rounded-lg bg-vermilion/10 px-3 py-2 text-[16px]"
        >
          {wrong.filter(Boolean).length} of these would not be where people in {round.eras[era].year} would put them.
        </p>
      )}
    </Layout>
  );
}
