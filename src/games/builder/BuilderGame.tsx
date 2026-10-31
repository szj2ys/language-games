"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Check, Hand, Lightbulb, Minus, Plus, RotateCcw, Volume2, X } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { GameHeader, MarginNote } from "@/components/game/chrome";
import { track } from "@/components/analytics";
import { recordRound } from "@/lib/progress";
import { useSave, useSpeech } from "@/lib/use-save";
import { cn } from "@/lib/utils";
import {
  NUMBER_WORDS,
  callFor,
  englishNotes,
  interpret,
  markDelivery,
  plural,
  sentence,
  type AssistantResponse,
  type Delivery,
  type Place,
  type Stone,
  type Tile,
} from "./engine";
import { SESSIONS, type CallRound, type FetchRound } from "./rounds";

const GAME = "builder";

/** Where things sit in the site picture, as % of its width and height. */
const SPOT: Record<Place, { x: number; y: number }> = {
  left: { x: 19, y: 47 },
  right: { x: 82, y: 47 },
  builder: { x: 60, y: 80 },
};

const PLACE_LABEL: Record<Place, string> = { builder: "To him", left: "Left", right: "Right" };

type Outcome = { delivery: Delivery; score: number; marks: Record<"stone" | "count" | "place", boolean> };

export function BuilderGame() {
  const { save, ready, update, storable } = useSave();
  const pos = save.positions[GAME] ?? { session: 0, round: 0 };
  const sessionIndex = Math.min(pos.session, SESSIONS.length - 1);
  const session = SESSIONS[sessionIndex];
  const finished = pos.round >= session.rounds.length;
  const round = session.rounds[Math.min(pos.round, session.rounds.length - 1)];
  const { speak, available: canSpeak } = useSpeech(save.settings.speech);

  const goTo = (session: number, round: number) =>
    update((s) => ({ ...s, lastGame: GAME, positions: { ...s.positions, [GAME]: { session, round } } }));

  const complete = (firstTry: boolean, phrase: string, marks = 3) => {
    update((s) => recordRound(s, round.id, { marks, max: 3, firstTry }, [phrase]));
    track("round_completed", { game: GAME, round: round.id, firstTry });
  };

  const toggleSpeech = () =>
    update((s) => ({ ...s, settings: { ...s.settings, speech: !s.settings.speech } }));

  if (!ready) return <div className="min-h-dvh" aria-busy="true" />;

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col">
      <GameHeader
        title={`${session.title}`}
        round={finished ? session.rounds.length : pos.round}
        total={session.rounds.length}
        speech={canSpeak ? save.settings.speech : undefined}
        onToggleSpeech={canSpeak ? toggleSpeech : undefined}
      />
      {!storable && (
        <p role="status" className="mx-3 rounded-md bg-paper-deep px-3 py-1.5 text-sm">
          Progress cannot be saved in this browser. You can still play.
        </p>
      )}
      <main id="main" className="flex flex-1 flex-col">
        {finished ? (
          <SessionEnd
            sessionIndex={sessionIndex}
            onNext={() => goTo(sessionIndex + 1, 0)}
            onReplay={() => goTo(sessionIndex, 0)}
          />
        ) : round.role === "fetch" ? (
          <FetchPlay
            key={round.id}
            round={round}
            sessionIndex={sessionIndex}
            roundIndex={pos.round}
            speak={speak}
            onDone={(firstTry) => {
              complete(firstTry, callFor(round.want));
            }}
            onNext={() => goTo(sessionIndex, pos.round + 1)}
          />
        ) : (
          <CallPlay
            key={round.id}
            round={round}
            speak={speak}
            onDone={(firstTry, said, marks) => complete(firstTry, said, marks)}
            onNext={() => goTo(sessionIndex, pos.round + 1)}
          />
        )}
      </main>
    </div>
  );
}

// ---------------------------------------------------------------------------
// The site picture shared by both roles.

function Site({
  facing,
  pointing,
  delivered,
  ghost,
  bubble,
  bubbleFrom = "builder",
  onSpeak,
  pointTargets,
  pointedPlace,
  onPointPlace,
  walking,
}: {
  facing: "left" | "right";
  /** Arm out towards a place, or both hands cupped to call. */
  pointing: boolean;
  delivered: Delivery[];
  ghost?: Delivery;
  bubble?: string;
  bubbleFrom?: "builder" | "assistant";
  onSpeak?: () => void;
  pointTargets?: boolean;
  pointedPlace?: Place;
  onPointPlace?: (p: Place) => void;
  walking?: Place | null;
}) {
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden bg-paper-deep sm:rounded-2xl">
      <Image src="/art/builder/site.webp" alt="" fill priority sizes="(min-width: 1024px) 640px, 100vw" className="object-cover" />
      {/* The builder, A. He turns to point; facing right is his resting pose. */}
      <div
        className="absolute bottom-[3%] h-[64%] w-[22%] transition-transform duration-300"
        style={{ left: "36%", transform: facing === "left" ? "scaleX(-1)" : undefined }}
      >
        <Image
          src={pointing ? "/art/builder/builder.webp" : "/art/builder/builder-call.webp"}
          alt=""
          fill
          sizes="160px"
          className="object-contain object-bottom"
        />
      </div>
      {/* The assistant, B, walks to wherever the stones go. */}
      <div
        className="absolute bottom-[2%] h-[58%] w-[18%] transition-[left] duration-700 ease-out"
        style={{ left: walking ? `${SPOT[walking].x + (walking === "right" ? -26 : 4)}%` : "88%" }}
      >
        <Image src="/art/builder/assistant.webp" alt="" fill sizes="140px" className="object-contain object-bottom" />
      </div>
      {ghost && <StonePile delivery={ghost} ghost />}
      {delivered.map((d, i) => (
        <StonePile key={i} delivery={d} offset={i} />
      ))}
      {bubble && (
        <div
          className={cn(
            "absolute top-[6%] max-w-[62%] rounded-2xl border border-ink/15 bg-card px-3 py-1.5 shadow-sm",
            bubbleFrom === "builder" ? "left-[30%]" : "right-[3%]",
          )}
        >
          <p className="flex items-center gap-1.5 font-heading text-[clamp(17px,4.6vw,28px)] leading-tight font-semibold" aria-live="polite">
            {bubble}
            {onSpeak && (
              <button type="button" onClick={onSpeak} aria-label="Hear it again" className="-my-2 grid size-10 shrink-0 place-items-center rounded-full hover:bg-paper-deep">
                <Volume2 className="size-5" aria-hidden />
              </button>
            )}
          </p>
        </div>
      )}
      {pointTargets &&
        (["left", "right"] as const).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onPointPlace?.(p)}
            aria-pressed={pointedPlace === p}
            aria-label={`Point at the ${p} platform`}
            className={cn(
              "absolute top-[38%] h-[24%] w-[34%] rounded-xl border-2 border-dashed transition-colors",
              p === "left" ? "left-[2%]" : "right-[2%]",
              pointedPlace === p ? "border-ochre bg-ochre/25" : "border-card/80 hover:bg-card/20",
            )}
          >
            {pointedPlace === p && <Hand className="mx-auto size-7 text-ink" aria-hidden />}
          </button>
        ))}
    </div>
  );
}

function StonePile({ delivery, offset = 0, ghost }: { delivery: Delivery; offset?: number; ghost?: boolean }) {
  const at = SPOT[delivery.place];
  return (
    <div
      className={cn("absolute flex -translate-x-1/2 -translate-y-full items-end", ghost && "opacity-40 grayscale")}
      style={{ left: `${at.x + (delivery.place === "builder" ? offset * 6 : 0)}%`, top: `${at.y - (delivery.place === "builder" ? 0 : offset * 7)}%` }}
      aria-hidden
    >
      {Array.from({ length: delivery.count }, (_, i) => (
        <div key={i} className="relative -mx-[2%] h-[clamp(28px,8vw,60px)] w-[clamp(34px,10vw,76px)]">
          <Image src={`/art/builder/${delivery.stone}.webp`} alt="" fill sizes="80px" className={cn("object-contain object-bottom", ghost && "[filter:drop-shadow(0_0_0_#000)]")} />
        </div>
      ))}
    </div>
  );
}

function StoneCard({
  stone,
  label,
  selected,
  onClick,
  badge,
  ariaLabel,
}: {
  stone: Stone;
  label?: string;
  selected?: boolean;
  onClick: () => void;
  badge?: string;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      aria-label={ariaLabel}
      className={cn(
        "relative flex min-h-24 flex-col items-center justify-center gap-1 rounded-xl border-2 bg-card px-2 py-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt",
        selected ? "border-cobalt bg-cobalt/10" : "border-border hover:border-ink/30",
      )}
    >
      <span className="relative h-14 w-20">
        <Image src={`/art/builder/${stone}.webp`} alt="" fill sizes="80px" className="object-contain" />
      </span>
      <span className={cn("text-[17px] font-bold", !label && "sr-only")}>{label ?? ""}</span>
      {badge && <span className="absolute top-1.5 right-2 rounded-full bg-paper-deep px-1.5 text-xs font-bold">{badge}</span>}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Role B: hear the call, bring the stones.

function FetchPlay({
  round,
  sessionIndex,
  roundIndex,
  speak,
  onDone,
  onNext,
}: {
  round: FetchRound;
  sessionIndex: number;
  roundIndex: number;
  speak: (t: string) => void;
  onDone: (firstTry: boolean) => void;
  onNext: () => void;
}) {
  const call = callFor(round.want);
  const advanced = sessionIndex > 0;
  const [stone, setStone] = useState<Stone | null>(null);
  const [count, setCount] = useState(1);
  const [place, setPlace] = useState<Place>("builder");
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [misses, setMisses] = useState(0);
  const [hint, setHint] = useState(false);
  const labelled = advanced || roundIndex < 2 || hint || outcome !== null;

  useEffect(() => {
    const t = setTimeout(() => speak(call), 400);
    return () => clearTimeout(t);
  }, [call, speak]);

  const solved = outcome?.score === 3;

  const bring = () => {
    if (!stone) return;
    const delivery = { stone, count, place };
    const r = markDelivery(round.want, delivery);
    setOutcome({ delivery, ...r });
    if (r.score === 3) {
      onDone(misses === 0 && !hint);
      speak("Good.");
    } else {
      setMisses((m) => m + 1);
      track("repair_used", { game: GAME, round: round.id });
      setTimeout(() => speak(call), 600);
    }
  };

  const retry = () => setOutcome(null);

  const facing = round.points === "left" ? "left" : "right";
  const pointText = round.points ? `He points to the ${round.points} platform.` : "";

  return (
    <div className="flex flex-1 flex-col gap-3 lg:grid lg:grid-cols-[1.4fr_1fr] lg:items-start lg:gap-6 lg:px-3">
      <div>
        <Site
          facing={facing}
          pointing={!!round.points}
          delivered={outcome ? [outcome.delivery] : []}
          bubble={outcome && !solved ? `No — ${call.replace(/!$/, "")}!` : solved ? "Good." : call}
          onSpeak={() => speak(call)}
          walking={outcome ? outcome.delivery.place : null}
        />
        <p className="sr-only" aria-live="polite">
          The builder calls: {call} {pointText}
        </p>
        {round.points && !outcome && (
          <p className="px-3 pt-2 text-sm text-muted-foreground lg:px-0" aria-hidden>
            Watch where he points.
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3 px-3 pb-4 lg:px-0">
        <fieldset disabled={!!outcome}>
          <legend className="sr-only">Which stone?</legend>
          <div className="grid grid-cols-4 gap-2 lg:grid-cols-2">
            {(["block", "pillar", "slab", "beam"] as const).map((s) => (
              <StoneCard
                key={s}
                stone={s}
                label={labelled ? s : undefined}
                selected={stone === s}
                onClick={() => setStone(s)}
                ariaLabel={labelled ? s : `Stone ${["block", "pillar", "slab", "beam"].indexOf(s) + 1}`}
              />
            ))}
          </div>
        </fieldset>

        {advanced && (
          <fieldset disabled={!!outcome} className="flex flex-wrap items-center gap-3">
            <legend className="sr-only">How many, and where?</legend>
            <div className="flex items-center rounded-full border border-border bg-card" role="group" aria-label="How many">
              <button type="button" className="grid size-11 place-items-center rounded-full hover:bg-paper-deep disabled:opacity-40" onClick={() => setCount((c) => Math.max(1, c - 1))} disabled={count <= 1} aria-label="One fewer">
                <Minus className="size-4" aria-hidden />
              </button>
              <span className="w-16 text-center text-lg font-bold" aria-live="polite">{NUMBER_WORDS[count - 1]}</span>
              <button type="button" className="grid size-11 place-items-center rounded-full hover:bg-paper-deep disabled:opacity-40" onClick={() => setCount((c) => Math.min(4, c + 1))} disabled={count >= 4} aria-label="One more">
                <Plus className="size-4" aria-hidden />
              </button>
            </div>
            <div className="flex flex-1 rounded-full border border-border bg-card p-1" role="radiogroup" aria-label="Where to">
              {(["builder", "left", "right"] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  role="radio"
                  aria-checked={place === p}
                  onClick={() => setPlace(p)}
                  className={cn("h-9 flex-1 rounded-full px-2 text-[15px] font-bold", place === p ? "bg-ink text-paper" : "hover:bg-paper-deep")}
                >
                  {PLACE_LABEL[p]}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {outcome && <Marks outcome={outcome} want={round.want} only={advanced ? undefined : "stone"} />}

        <div className="flex gap-2">
          {!outcome && (
            <Button variant="outline" size="lg" className="h-12" onClick={() => setHint(true)} disabled={hint} aria-label="Hint">
              <Lightbulb className="size-5" aria-hidden />
            </Button>
          )}
          {!outcome ? (
            <Button size="lg" className="h-12 flex-1 text-lg" onClick={bring} disabled={!stone}>
              {stone ? `Bring ${advanced ? NUMBER_WORDS[count - 1] + " " + plural(stone, count) : labelled ? "the " + stone : "it"}` : "Pick a stone"}
            </Button>
          ) : solved ? (
            <Button size="lg" className="h-12 flex-1 text-lg" onClick={onNext} autoFocus>
              Next
            </Button>
          ) : (
            <Button size="lg" variant="secondary" className="h-12 flex-1 text-lg" onClick={retry} autoFocus>
              <RotateCcw className="size-5" aria-hidden /> Try again
            </Button>
          )}
        </div>
        {hint && !outcome && <p role="status" className="text-[15px]">{round.hint}</p>}
      </div>
    </div>
  );
}

function Marks({ outcome, want, only }: { outcome: Outcome; want: Delivery; only?: keyof Outcome["marks"] }) {
  const rows: [keyof Outcome["marks"], string][] = [
    ["stone", outcome.marks.stone ? `${want.stone}` : `not a ${outcome.delivery.stone}`],
    ["count", outcome.marks.count ? NUMBER_WORDS[want.count - 1] : `not ${NUMBER_WORDS[outcome.delivery.count - 1]}`],
    ["place", outcome.marks.place ? PLACE_LABEL[want.place].toLowerCase() : `not ${PLACE_LABEL[outcome.delivery.place].toLowerCase()}`],
  ];
  return (
    <ul className="flex flex-wrap gap-2" aria-label="How it went">
      {rows.filter(([k]) => !only || k === only).map(([k, text]) => (
        <li
          key={k}
          className={cn(
            "flex items-center gap-1 rounded-full px-3 py-1 text-[15px] font-bold",
            outcome.marks[k] ? "bg-sage/20 text-sage" : "bg-terracotta/15 text-terracotta",
          )}
        >
          {outcome.marks[k] ? <Check className="size-4" aria-hidden /> : <X className="size-4" aria-hidden />}
          <span className="sr-only">{k}:</span> {text}
        </li>
      ))}
    </ul>
  );
}

// ---------------------------------------------------------------------------
// Role A: you call, the assistant does exactly what you said.

function CallPlay({
  round,
  speak,
  onDone,
  onNext,
}: {
  round: CallRound;
  speak: (t: string) => void;
  /** Marks: the build is right, the English needed no note, and it worked first time. */
  onDone: (firstTry: boolean, said: string, marks: number) => void;
  onNext: () => void;
}) {
  const [notes, setNotes] = useState<string[]>([]);
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [pointAt, setPointAt] = useState<Place | { stoneIndex: number } | undefined>();
  const [reply, setReply] = useState<AssistantResponse | null>(null);
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [tries, setTries] = useState(0);
  const [hint, setHint] = useState(false);
  const solved = outcome?.score === 3;

  const bank: Tile[] = useMemo(() => {
    const b: Tile[] = [];
    if (round.numbers) for (let n = 1; n <= 4; n++) b.push({ kind: "number", value: n });
    for (const w of round.words) {
      b.push({ kind: "stone", value: w });
      // With numbers in the language, the player must choose the plural form themselves.
      if (round.numbers) b.push({ kind: "stone", value: w, plural: true });
    }
    if (round.there) b.push({ kind: "there" });
    if (round.thisWord) b.push({ kind: "this" });
    return b;
  }, [round]);

  const yardKinds = useMemo(() => {
    const kinds: { stone: Stone; first: number; n: number }[] = [];
    round.yard.forEach((s, i) => {
      const k = kinds.find((x) => x.stone === s);
      if (k) k.n++;
      else kinds.push({ stone: s, first: i, n: 1 });
    });
    return kinds;
  }, [round.yard]);

  const add = (t: Tile) => {
    setReply(null);
    setTiles((ts) => [...ts, t]);
  };

  const call = () => {
    const said = sentence(tiles);
    speak(said);
    const r = interpret({ tiles, pointAt }, round.yard);
    const englishSlips = englishNotes(tiles);
    setNotes(englishSlips);
    setReply(r);
    setTries((n) => n + 1);
    if (r.kind === "acts") {
      const m = markDelivery(round.goal, r.delivery);
      setOutcome({ delivery: r.delivery, ...m });
      if (m.score === 3) {
        const firstTry = tries === 0 && !hint;
        onDone(firstTry, said, 1 + (englishSlips.length === 0 ? 1 : 0) + (firstTry ? 1 : 0));
      }
      else track("repair_used", { game: GAME, round: round.id });
    } else {
      setTimeout(() => speak(r.question), 900);
    }
  };

  const undo = () => {
    setOutcome(null);
    setReply(null);
  };

  const tileText = (t: Tile) =>
    t.kind === "number" ? NUMBER_WORDS[t.value - 1] : t.kind === "stone" ? (t.plural ? `${t.value}s` : t.value) : t.kind;

  const pointedStone = typeof pointAt === "object" ? round.yard[pointAt.stoneIndex] : undefined;
  const bubble = reply?.kind === "asks" ? reply.question : solved ? "Done." : outcome ? "Like this?" : undefined;

  return (
    <div className="flex flex-1 flex-col gap-3 lg:grid lg:grid-cols-[1.4fr_1fr] lg:items-start lg:gap-6 lg:px-3">
      <div>
        <Site
          facing={pointAt === "left" ? "left" : "right"}
          pointing={typeof pointAt === "string"}
          delivered={outcome ? [outcome.delivery] : []}
          ghost={outcome ? undefined : round.goal}
          bubble={bubble}
          bubbleFrom="assistant"
          pointTargets={round.there && !outcome}
          pointedPlace={typeof pointAt === "string" ? pointAt : undefined}
          onPointPlace={(p) => setPointAt((cur) => (cur === p ? undefined : p))}
          walking={outcome ? outcome.delivery.place : null}
        />
        <p className="px-3 pt-2 text-[15px] lg:px-0">
          <span className="font-bold">Plan:</span> {round.plan}
        </p>
      </div>

      <div className="flex flex-col gap-3 px-3 pb-4 lg:px-0">
        {round.thisWord && !outcome && (
          <div>
            <p className="mb-1 text-sm text-muted-foreground">The yard — tap a stone to point at it</p>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {yardKinds.map((k) => {
                const known = round.words.includes(k.stone);
                const pointed = typeof pointAt === "object" && round.yard[pointAt.stoneIndex] === k.stone;
                return (
                  <div key={k.stone} className="w-24 shrink-0">
                    <StoneCard
                      stone={k.stone}
                      label={known ? k.stone : "?"}
                      badge={`×${k.n}`}
                      selected={pointed}
                      onClick={() => setPointAt(pointed ? undefined : { stoneIndex: k.first })}
                      ariaLabel={`Point at ${known ? "a " + k.stone : "the curved stone"}`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div
          className="flex min-h-14 flex-wrap items-center gap-1.5 rounded-xl border-2 border-dashed border-border bg-card px-2 py-2"
          aria-label="Your call"
          aria-live="polite"
        >
          {tiles.length === 0 ? (
            <span className="px-1 text-muted-foreground">Tap words to make your call</span>
          ) : (
            tiles.map((t, i) => (
              <button
                key={i}
                type="button"
                disabled={!!outcome}
                onClick={() => setTiles((ts) => ts.filter((_, j) => j !== i))}
                aria-label={`Remove ${tileText(t)}`}
                className="h-10 rounded-lg bg-ink px-3 text-[17px] font-bold text-paper"
              >
                {tileText(t)}
              </button>
            ))
          )}
          {(pointAt || pointedStone) && (
            <span className="ml-auto flex items-center gap-1 rounded-full bg-ochre/30 px-2 py-1 text-sm font-bold">
              <Hand className="size-4" aria-hidden /> pointing {typeof pointAt === "string" ? pointAt : "at a stone"}
            </span>
          )}
        </div>

        {!outcome && (
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Words you can use">
            {bank.map((t, i) => (
              <button
                key={i}
                type="button"
                onClick={() => add(t)}
                className={cn(
                  "h-11 rounded-lg border-2 px-3 text-[17px] font-bold hover:bg-paper-deep",
                  t.kind === "number" ? "border-ochre/60" : t.kind === "stone" ? "border-cobalt/50" : "border-terracotta/60",
                )}
              >
                {tileText(t)}
              </button>
            ))}
          </div>
        )}

        {outcome && !solved && <Marks outcome={outcome} want={round.goal} />}
        {notes.length > 0 && (reply?.kind === "acts") && (
          <ul role="status" className="flex flex-col gap-1 rounded-xl bg-ochre/15 p-3 text-[15px]" aria-label="English notes">
            {notes.map((n) => (
              <li key={n}>
                <span className="font-bold">English note:</span> {n}
              </li>
            ))}
          </ul>
        )}
        {solved && round.teaches && (
          <p role="status" className="rounded-xl bg-sage/15 p-3 text-[15px]">
            New word: <span className="font-heading text-lg font-semibold">“{round.teaches}”</span>. You pointed and said “this”;
            now the builder names it. Next time you can simply call it.
          </p>
        )}

        <div className="flex gap-2">
          {!outcome && (
            <Button variant="outline" size="lg" className="h-12" onClick={() => setHint(true)} disabled={hint} aria-label="Hint">
              <Lightbulb className="size-5" aria-hidden />
            </Button>
          )}
          {!outcome ? (
            <Button size="lg" className="h-12 flex-1 text-lg" onClick={call} disabled={tiles.length === 0}>
              {tiles.length ? `Call: “${sentence(tiles)}”` : "Call"}
            </Button>
          ) : solved ? (
            <Button size="lg" className="h-12 flex-1 text-lg" onClick={onNext} autoFocus>
              Next
            </Button>
          ) : (
            <Button size="lg" variant="secondary" className="h-12 flex-1 text-lg" onClick={undo} autoFocus>
              <RotateCcw className="size-5" aria-hidden /> Take it back
            </Button>
          )}
        </div>
        {hint && !outcome && <p role="status" className="text-[15px]">{round.hint}</p>}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------

function SessionEnd({ sessionIndex, onNext, onReplay }: { sessionIndex: number; onNext: () => void; onReplay: () => void }) {
  const { save } = useSave();
  const session = SESSIONS[sessionIndex];
  const firstTry = session.rounds.filter((r) => save.rounds[r.id]?.firstTry).length;
  const last = sessionIndex === SESSIONS.length - 1;
  useEffect(() => {
    if (last) track("game_finished", { game: GAME });
  }, [last]);
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-4 px-4 py-6">
      <h2 className="font-heading text-3xl font-semibold">{session.title}: done</h2>
      <p className="text-[17px]">
        {firstTry} of {session.rounds.length} right first time. English practised: {session.english.toLowerCase()}.
      </p>
      <MarginNote id={session.source} />
      {session.id === "builder-3" && <MarginNote id="pi-6" />}
      <div className="flex flex-col gap-2 sm:flex-row">
        {last ? (
          <Link href="/" className={cn(buttonVariants({ size: "lg" }), "h-12 flex-1 text-lg")}>
            Choose another game
          </Link>
        ) : (
          <Button size="lg" className="h-12 flex-1 text-lg" onClick={onNext} autoFocus>
            Next: {SESSIONS[sessionIndex + 1].title}
          </Button>
        )}
        <Button size="lg" variant="outline" className="h-12" onClick={onReplay}>
          Play again
        </Button>
      </div>
    </div>
  );
}
