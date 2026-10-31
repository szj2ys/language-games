"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Check, Eye, Hand, Minus, Plus, RotateCcw, Volume2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GameFrame, GameLoading, HintButton, SceneCanvas, SessionEnd } from "@/components/game/chrome";
import { useSessions } from "@/components/game/use-sessions";
import { track } from "@/components/analytics";
import { cn } from "@/lib/utils";
import { nextGame } from "@/content/games";
import { useDraft } from "@/lib/use-draft";
import { useShortcuts } from "@/components/game/shortcuts";
import {
  NUMBER_WORDS,
  an,
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
import { SESSIONS, type CallRound, type FetchRound, type UseRound } from "./rounds";
import type { SourceId } from "@/content/sources";

const GAME = "builder";

/** Where things sit in the site picture, as % of its width and height. */
const SPOT: Record<Place, { x: number; y: number }> = {
  left: { x: 19, y: 47 },
  right: { x: 82, y: 47 },
  builder: { x: 60, y: 80 },
};

/** What an unlabelled stone looks like, for people who cannot see the picture. */
const SHAPE: Record<Stone, string> = {
  block: "A solid cube of stone",
  pillar: "A tall round stone",
  slab: "A broad flat stone",
  beam: "A long narrow stone",
  arch: "A curved stone",
};

/** The passages shown at the end of each session. */
const SESSION_SOURCES: SourceId[][] = [
  ["pi-2", "pi-7"],
  ["pi-8", "pi-7"],
  ["pi-19", "pi-6"],
  ["pi-21", "pi-27"],
];

const PLACE_LABEL: Record<Place, string> = { builder: "Here", left: "Left", right: "Right" };

type Outcome = { delivery: Delivery; score: number; marks: Record<"stone" | "count" | "place", boolean> };

export function BuilderGame() {
  const g = useSessions(GAME, SESSIONS);
  if (!g.ready) return <GameLoading game="Slab!" poster="/art/builder/site.webp" />;
  const { round, session, sessionIndex, finished } = g;
  const speak = g.speech.speak;
  return (
    <GameFrame game="Slab!" g={g} withSpeech>
      {finished ? (
        <SessionEnd
          nextGame={nextGame("builder")}
          said={g.saidInSession()}
          title={session.title}
          english={session.english}
          firstTry={session.rounds.filter((r) => g.save.rounds[r.id]?.firstTry).length}
          total={session.rounds.length}
          sources={SESSION_SOURCES[sessionIndex]}
          nextTitle={SESSIONS[sessionIndex + 1]?.title}
          onNext={g.nextSession}
          onReplay={g.replay}
        />
      ) : round.role === "fetch" ? (
        <FetchPlay
          key={round.id}
          round={round}
          sessionIndex={sessionIndex}
          roundIndex={g.roundIndex}
          speak={speak}
          onDone={(firstTry, missed) => g.complete(3, 3, firstTry, [callFor(round.want)], missed)}
          onNext={g.next}
        />
      ) : round.role === "use" ? (
        <UsePlay
          key={round.id}
          round={round}
          speak={speak}
          onDone={(firstTry, missed) => g.complete(firstTry ? 3 : 2, 3, firstTry, [round.says], missed)}
          onNext={g.next}
        />
      ) : (
        <CallPlay
          key={round.id}
          round={round}
          speak={speak}
          onDone={(firstTry, said, marks) => g.complete(marks, 3, firstTry, [said])}
          onNext={g.next}
        />
      )}
    </GameFrame>
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
  keeper,
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
  /** Show the stock-keeper with her clipboard instead of the assistant. */
  keeper?: boolean;
}) {
  return (
    <SceneCanvas
      tall="/art/tall/site.webp"
      overlay={
        bubble && (
          <div
            className={cn(
              "absolute top-[5%] max-w-[70%] rounded-2xl border border-ink/15 bg-card px-3 py-1.5 shadow-sm",
              bubbleFrom === "builder" ? "left-[22%] sm:left-[30%]" : "right-[3%]",
            )}
          >
            <p
              className="flex items-center gap-1.5 font-heading text-[clamp(18px,5vw,28px)] leading-tight font-semibold"
              aria-live="polite"
            >
              {bubble}
              {onSpeak && (
                <button
                  type="button"
                  onClick={onSpeak}
                  aria-label="Hear it again"
                  className="-my-2 grid size-11 shrink-0 place-items-center rounded-full hover:bg-paper-deep"
                >
                  <Volume2 className="size-5" aria-hidden />
                </button>
              )}
            </p>
          </div>
        )
      }
    >
      <Image src="/art/builder/site.webp" alt="" fill priority sizes="(min-width: 1024px) 700px, 133vw" className="object-cover" />
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
      {keeper && (
        <div className="absolute bottom-[2%] left-[66%] h-[60%] w-[18%]">
          <Image src="/art/builder/keeper.webp" alt="" fill sizes="140px" className="object-contain object-bottom" />
        </div>
      )}
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
    </SceneCanvas>
  );
}

function StonePile({ delivery, offset = 0, ghost }: { delivery: Delivery; offset?: number; ghost?: boolean }) {
  const at = SPOT[delivery.place];
  return (
    <div
      className={cn(
        "absolute flex -translate-x-1/2 -translate-y-full items-end",
        ghost ? "opacity-30 grayscale" : "animate-in duration-700 fade-in slide-in-from-right-8",
      )}
      style={{
        left: `${at.x + (delivery.place === "builder" ? offset * 6 : 0)}%`,
        top: `${at.y - (delivery.place === "builder" ? 0 : offset * 7)}%`,
      }}
      aria-hidden
    >
      {Array.from({ length: delivery.count }, (_, i) => (
        <div key={i} className="relative -mx-[2%] h-[clamp(28px,8vw,60px)] w-[clamp(34px,10vw,76px)]">
          <Image
            src={`/art/builder/${delivery.stone}.webp`}
            alt=""
            fill
            sizes="80px"
            className={cn("object-contain object-bottom", ghost && "[filter:drop-shadow(0_0_0_#000)]")}
          />
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
  shortcut,
  keyHint,
}: {
  shortcut?: boolean;
  /** The keyboard key that picks this stone, shown on devices with a keyboard. */
  keyHint?: string;
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
      data-shortcut={shortcut ? "" : undefined}
      className={cn(
        "relative flex min-h-28 flex-col items-center justify-center gap-1 rounded-xl border-2 bg-card px-2 py-2 sm:min-h-24 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt",
        selected ? "border-cobalt bg-cobalt/10" : "border-border hover:border-ink/30",
      )}
    >
      {keyHint && (
        <kbd
          className="pointer-coarse:hidden absolute top-1.5 left-2 rounded bg-paper-deep px-1.5 text-xs font-bold text-muted-foreground"
          aria-hidden
        >
          {keyHint}
        </kbd>
      )}
      <span className="relative h-16 w-24 sm:h-14 sm:w-20">
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
  onDone: (firstTry: boolean, missed?: string) => void;
  onNext: () => void;
}) {
  const call = callFor(round.want);
  const advanced = sessionIndex > 0;
  const [stone, setStone] = useDraft<Stone | null>(round.id, "stone", null);
  const [count, setCount] = useDraft(round.id, "count", 1);
  const [place, setPlace] = useDraft<Place>(round.id, "place", "builder");
  const [outcome, setOutcome] = useDraft<Outcome | null>(round.id, "outcome", null);
  const [misses, setMisses] = useDraft(round.id, "misses", 0);
  const [firstMiss, setFirstMiss] = useDraft<string | null>(round.id, "firstMiss", null);
  const [hint, setHint] = useDraft(round.id, "hint", false);
  const labelled = advanced || roundIndex < 2 || hint || outcome !== null;

  useEffect(() => {
    const t = setTimeout(() => speak(call), 400);
    return () => clearTimeout(t);
  }, [call, speak]);

  const solved = outcome?.score === 3;

  const bring = (picked: Stone | null = stone) => {
    if (!picked) return;
    const delivery = { stone: picked, count, place };
    const r = markDelivery(round.want, delivery);
    setOutcome({ delivery, ...r });
    if (r.score === 3) {
      onDone(misses === 0 && !hint, firstMiss ?? undefined);
      speak("Good.");
    } else {
      setMisses((m) => m + 1);
      if (!firstMiss) setFirstMiss(`brought ${NUMBER_WORDS[delivery.count - 1]} ${plural(delivery.stone, delivery.count)}`);
      track("repair_used", { game: GAME, round: round.id });
      setTimeout(() => speak(call), 600);
    }
  };

  const retry = () => setOutcome(null);

  const pickStone = (s: Stone) => {
    if (solved) return;
    // After a wrong delivery, the next tap is the retry.
    if (outcome) setOutcome(null);
    if (!advanced || stone === s) {
      setStone(s);
      bring(s);
    } else setStone(s);
  };
  useShortcuts({
    "1": () => pickStone("block"),
    "2": () => pickStone("pillar"),
    "3": () => pickStone("slab"),
    "4": () => pickStone("beam"),
    Enter: solved ? onNext : outcome ? retry : advanced ? () => bring() : undefined,
  });

  // A right delivery moves on by itself after a beat; "Next" is there for the impatient.
  useEffect(() => {
    if (!solved) return;
    const t = setTimeout(onNext, 1400);
    return () => clearTimeout(t);
  }, [solved, onNext]);

  const facing = round.points === "left" ? "left" : "right";
  const pointText = round.points ? `He points to the ${round.points} platform.` : "";

  return (
    <div className="flex flex-1 flex-col gap-3 lg:grid lg:grid-cols-[minmax(0,1fr)_400px] lg:items-center lg:gap-8 lg:px-4">
      <div className="flex flex-1 flex-col lg:block">
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

      <div className="mt-auto flex flex-col gap-3 px-3 pb-4 lg:mt-0 lg:px-0">
        <fieldset disabled={solved}>
          <legend className="sr-only">Which stone?</legend>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2">
            {(["block", "pillar", "slab", "beam"] as const).map((s) => (
              <StoneCard
                key={s}
                stone={s}
                label={labelled ? s : undefined}
                selected={stone === s}
                shortcut
                keyHint={String(["block", "pillar", "slab", "beam"].indexOf(s) + 1)}
                // One tap brings it when there is nothing else to choose; a second tap on the chosen stone brings it too.
                onClick={() => pickStone(s)}
                ariaLabel={labelled ? s : SHAPE[s]}
              />
            ))}
          </div>
        </fieldset>

        {advanced && (
          <fieldset disabled={solved} className="flex flex-wrap items-center gap-3">
            <legend className="sr-only">How many, and where?</legend>
            <div className="flex items-center rounded-full border border-border bg-card" role="group" aria-label="How many">
              <button
                type="button"
                className="grid size-11 place-items-center rounded-full hover:bg-paper-deep disabled:opacity-40"
                onClick={() => {
                  setOutcome(null);
                  setCount((c) => Math.max(1, c - 1));
                }}
                disabled={count <= 1}
                aria-label="One fewer"
              >
                <Minus className="size-4" aria-hidden />
              </button>
              <span className="w-16 text-center text-lg font-bold" aria-live="polite">
                {NUMBER_WORDS[count - 1]}
              </span>
              <button
                type="button"
                className="grid size-11 place-items-center rounded-full hover:bg-paper-deep disabled:opacity-40"
                onClick={() => {
                  setOutcome(null);
                  setCount((c) => Math.min(4, c + 1));
                }}
                disabled={count >= 4}
                aria-label="One more"
              >
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
                  onClick={() => {
                    setOutcome(null);
                    setPlace(p);
                  }}
                  className={cn(
                    "h-11 flex-1 rounded-full px-2 text-[15px] font-bold",
                    place === p ? "bg-ink text-paper" : "hover:bg-paper-deep",
                  )}
                >
                  {PLACE_LABEL[p]}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {outcome && <Marks outcome={outcome} want={round.want} only={advanced ? undefined : "stone"} />}

        <div className="flex gap-2">
          {!outcome && <HintButton used={hint} onUse={() => setHint(true)} />}
          {!outcome && !advanced ? (
            <p className="flex h-12 flex-1 items-center text-[16px] text-muted-foreground">Choose the stone he is calling for.</p>
          ) : !outcome ? (
            <Button size="lg" className="h-12 flex-1 text-lg" onClick={() => bring()} disabled={!stone}>
              {stone ? `Bring ${NUMBER_WORDS[count - 1]} ${plural(stone, count)}` : "Pick a stone"}
            </Button>
          ) : solved ? (
            <p role="status" className="flex h-12 flex-1 items-center text-[16px] font-bold text-sage">
              Good — next call coming…
            </p>
          ) : (
            <Button size="lg" variant="secondary" className="h-12 flex-1 text-lg" onClick={retry} autoFocus>
              <RotateCcw className="size-5" aria-hidden /> Try again
            </Button>
          )}
        </div>
        {hint && !outcome && (
          <p role="status" className="text-[15px]">
            {round.hint}
          </p>
        )}
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
      {rows
        .filter(([k]) => !only || k === only)
        .map(([k, text]) => (
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
  const [notes, setNotes] = useDraft<string[]>(round.id, "notes", []);
  const [tiles, setTiles] = useDraft<Tile[]>(round.id, "tiles", []);
  const [pointAt, setPointAt] = useDraft<Place | { stoneIndex: number } | undefined>(round.id, "pointAt", undefined);
  const [reply, setReply] = useState<AssistantResponse | null>(null);
  const [outcome, setOutcome] = useDraft<Outcome | null>(round.id, "outcome", null);
  const [tries, setTries] = useDraft(round.id, "tries", 0);
  const [hint, setHint] = useDraft(round.id, "hint", false);
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
        // The outcome is scored; the English note is coaching and costs nothing (DECISIONS D5).
        onDone(firstTry, said, firstTry ? 3 : 2);
      } else track("repair_used", { game: GAME, round: round.id });
    } else {
      setTimeout(() => speak(r.question), 900);
    }
  };

  const undo = () => {
    setOutcome(null);
    setReply(null);
  };

  const tileText = (t: Tile) =>
    t.kind === "number" ? NUMBER_WORDS[t.value - 1] : t.kind === "stone" ? (t.plural ? plural(t.value, 2) : t.value) : t.kind;

  const pointedStone = typeof pointAt === "object" ? round.yard[pointAt.stoneIndex] : undefined;
  const bubble = reply?.kind === "asks" ? reply.question : solved ? "Done." : outcome ? "Like this?" : undefined;

  return (
    <div className="flex flex-1 flex-col gap-3 lg:grid lg:grid-cols-[minmax(0,1fr)_400px] lg:items-center lg:gap-8 lg:px-4">
      <div className="flex flex-1 flex-col lg:block">
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

      <div className="mt-auto flex flex-col gap-3 px-3 pb-4 lg:mt-0 lg:px-0">
        {round.thisWord && !outcome && (
          <div>
            <p className="mb-1 text-[15px] text-muted-foreground lg:text-[17px]">The yard — choose a stone to point at it</p>
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
                      ariaLabel={`Point at ${known ? an(k.stone) : "the curved stone"}`}
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
            <span className="px-1 text-muted-foreground">Choose words to make your call</span>
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
        {notes.length > 0 && outcome && (
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
            New word: <span className="font-heading text-lg font-semibold">“{round.teaches}”</span>. You pointed and said “this”; now the
            builder names it. Next time you can simply call it.
          </p>
        )}

        <div className="flex gap-2">
          {!outcome && <HintButton used={hint} onUse={() => setHint(true)} />}
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
        {hint && !outcome && (
          <p role="status" className="text-[15px]">
            {round.hint}
          </p>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Same words, different jobs: order, report, question, warning (PI §§21, 27).

function UsePlay({
  round,
  speak,
  onDone,
  onNext,
}: {
  round: UseRound;
  speak: (t: string) => void;
  onDone: (firstTry: boolean, missed?: string) => void;
  onNext: () => void;
}) {
  const [chosen, setChosen] = useDraft<number | null>(round.id, "chosen", null);
  const [misses, setMisses] = useDraft(round.id, "misses", 0);
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
    speak(o.reaction);
    if (o.fits) onDone(misses === 0, firstMiss ?? undefined);
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

  const keeper = round.speaker === "keeper";
  return (
    <div className="flex flex-1 flex-col gap-3 lg:grid lg:grid-cols-[minmax(0,1fr)_400px] lg:items-center lg:gap-8 lg:px-4">
      <div className="flex flex-1 flex-col lg:block">
        <Site
          facing="right"
          pointing={!keeper && round.says.startsWith("Slab!")}
          delivered={pick?.shows ? [pick.shows] : []}
          walking={pick?.shows?.place ?? null}
          bubble={pick ? pick.reaction : round.says}
          bubbleFrom={keeper ? "assistant" : "builder"}
          onSpeak={() => speak(pick ? pick.reaction : round.says)}
          keeper={keeper}
        />
        <ul className="flex flex-col gap-1 px-3 pt-2 lg:px-0" aria-label="What you can see">
          {round.clues.map((c) => (
            <li key={c} className="flex items-start gap-2 text-[15px]">
              <Eye className="mt-0.5 size-4 shrink-0 text-cobalt" aria-hidden />
              {c}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto flex flex-col gap-2 px-3 pb-4 lg:mt-0 lg:px-0">
        {!solved ? (
          <>
            <p className="text-[15px] text-muted-foreground lg:text-[17px]">
              {keeper ? "The stock-keeper" : "The builder"} says “{round.says}” What do you do?
            </p>
            {round.options.map((o, i) => {
              const tried = chosen === i && !o.fits;
              return (
                <button
                  key={o.text}
                  type="button"
                  onClick={() => choose(i)}
                  disabled={tried}
                  data-shortcut=""
                  className={cn(
                    "flex min-h-14 items-center rounded-xl border-2 bg-card px-3 py-2 text-left text-[17px] hover:border-ink/30",
                    tried ? "border-terracotta/40 opacity-60" : "border-border",
                  )}
                >
                  <kbd
                    className="pointer-coarse:hidden mr-1 rounded bg-paper-deep px-1.5 text-xs font-bold text-muted-foreground"
                    aria-hidden
                  >
                    {i + 1}
                  </kbd>
                  {o.text}
                </button>
              );
            })}
          </>
        ) : (
          <>
            <div role="status" className="flex flex-col gap-2 rounded-xl bg-sage/15 p-4">
              <p className="text-sm font-bold text-sage">What the words were doing here</p>
              <p className="font-heading text-[20px] leading-snug">{round.use.charAt(0).toUpperCase() + round.use.slice(1)}.</p>
              <p className="text-[15px] leading-relaxed">{round.note}</p>
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
