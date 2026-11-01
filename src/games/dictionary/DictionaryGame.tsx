"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Stone } from "@/games/builder/engine";
import { cn } from "@/lib/utils";
import {
  describe,
  runShift,
  STONE_WORDS,
  stars,
  unlocksAfter,
  type Dictionary,
  type Entry,
  type Job,
  type Order,
  type Run,
  type Unlocks,
} from "./engine";
import { BELIEF, JOB_LABEL, KITCHEN, KITCHEN_LABEL, LESSONS, SHIFTS, type KitchenKind } from "./shifts";

const STONES: Stone[] = ["slab", "block", "beam", "pillar"];
const JOBS: Job[] = ["count", "where", "warn", "thanks"];

type Phase =
  | { kind: "belief" }
  | { kind: "shift"; index: number }
  | { kind: "lesson"; index: number }
  | { kind: "kitchen" }
  | { kind: "end" };

export function DictionaryGame() {
  const [phase, setPhase] = useState<Phase>({ kind: "belief" });
  const [before, setBefore] = useState<string>();
  const [dict, setDict] = useState<Dictionary>({});
  const [unlocks, setUnlocks] = useState<Unlocks>({ jobs: false, depends: false });
  const [runs, setRuns] = useState<number[]>([0, 0, 0]);
  const [lastRun, setLastRun] = useState<Run>();
  const [kitchen, setKitchen] = useState<(KitchenKind | undefined)[]>(KITCHEN.map(() => undefined));
  const [after, setAfter] = useState<string>();

  switch (phase.kind) {
    case "belief":
      return (
        <Frame>
          <Intro />
          <Belief
            label="Before you start"
            picked={before}
            onPick={(id) => {
              setBefore(id);
              setPhase({ kind: "shift", index: 0 });
            }}
          />
        </Frame>
      );

    case "shift": {
      const shift = SHIFTS[phase.index];
      const run = () => {
        const result = runShift(shift, dict);
        setLastRun(result);
        setRuns((r) => r.map((n, i) => (i === phase.index ? n + 1 : n)));
        setUnlocks((u) => unlocksAfter(u, shift, result));
      };
      const solved = lastRun?.right === lastRun?.of;
      return (
        <Frame>
          <ShiftHeader index={phase.index} />
          <Orders orders={shift.orders} run={lastRun} />
          <DictionaryEditor
            words={shift.words}
            dict={dict}
            unlocks={unlocks}
            onChange={(word, entry) => {
              setDict((d) => ({ ...d, [word]: entry }));
              setLastRun(undefined);
            }}
          />
          <div className="sticky bottom-0 -mx-4 border-t border-border bg-paper/95 px-4 py-3 backdrop-blur">
            {lastRun && solved ? (
              <button
                type="button"
                className="w-full rounded-xl bg-sage px-4 py-3 text-lg font-semibold text-white"
                onClick={() => {
                  setLastRun(undefined);
                  setPhase({ kind: "lesson", index: phase.index });
                }}
              >
                Shift done {"★".repeat(stars(runs[phase.index]))} — see what it showed
              </button>
            ) : (
              <button type="button" className="w-full rounded-xl bg-vermilion px-4 py-3 text-lg font-semibold text-white" onClick={run}>
                {lastRun ? `Run the shift again (${lastRun.right}/${lastRun.of} right last time)` : "Run the shift"}
              </button>
            )}
          </div>
        </Frame>
      );
    }

    case "lesson": {
      const lesson = LESSONS[phase.index];
      const last = phase.index === SHIFTS.length - 1;
      return (
        <Frame>
          <p className="text-sm font-semibold tracking-wide text-terracotta uppercase">What shift {phase.index + 1} showed</p>
          <h2 className="mt-1 font-serif text-3xl">{lesson.title}</h2>
          <p className="mt-3 text-lg">{lesson.body}</p>
          <blockquote className="mt-4 border-l-4 border-ochre pl-4 font-serif text-lg italic">“{lesson.quote}”</blockquote>
          <p className="mt-1 text-sm text-muted-foreground">— Wittgenstein, {lesson.ref}</p>
          {phase.index === 1 && <DictionarySoFar dict={dict} />}
          <button
            type="button"
            className="mt-6 w-full rounded-xl bg-ink px-4 py-3 text-lg font-semibold text-paper"
            onClick={() => setPhase(last ? { kind: "kitchen" } : { kind: "shift", index: phase.index + 1 })}
          >
            {last ? "Last test: a different place, no helper" : `Start shift ${phase.index + 2}`}
          </button>
        </Frame>
      );
    }

    case "kitchen": {
      const done = kitchen.every(Boolean);
      return (
        <Frame>
          <p className="text-sm font-semibold tracking-wide text-terracotta uppercase">Last test</p>
          <h2 className="mt-1 font-serif text-3xl">The kitchen</h2>
          <p className="mt-2 text-lg">
            New place, new words, and no helper to try them first. For each call, what job is the word doing? You see the answers at the end.
          </p>
          <ol className="mt-4 space-y-4">
            {KITCHEN.map((k, i) => (
              <li key={k.says} className="rounded-xl border border-border bg-card p-4">
                <p className="text-sm text-muted-foreground">{k.scene}</p>
                <p className="mt-1 font-serif text-2xl">The cook says “{k.says}”</p>
                <div className="mt-3 flex flex-wrap gap-2" role="radiogroup" aria-label={`What “${k.says}” does`}>
                  {(Object.keys(KITCHEN_LABEL) as KitchenKind[]).map((kind) => (
                    <Chip
                      key={kind}
                      on={kitchen[i] === kind}
                      onClick={() => setKitchen((ks) => ks.map((x, j) => (j === i ? kind : x)))}
                      role="radio"
                    >
                      {KITCHEN_LABEL[kind]}
                    </Chip>
                  ))}
                </div>
              </li>
            ))}
          </ol>
          <button
            type="button"
            disabled={!done}
            className="mt-6 w-full rounded-xl bg-vermilion px-4 py-3 text-lg font-semibold text-white disabled:opacity-40"
            onClick={() => setPhase({ kind: "end" })}
          >
            {done ? "See how you did" : "Answer all five"}
          </button>
        </Frame>
      );
    }

    case "end": {
      const score = KITCHEN.filter((k, i) => kitchen[i] === k.answer).length;
      const totalStars = runs.reduce((sum, n) => sum + stars(n), 0);
      return (
        <Frame>
          <h2 className="font-serif text-3xl">
            Kitchen: {score}/{KITCHEN.length} · Yard: {totalStars}/9 ★
          </h2>
          <ol className="mt-4 space-y-2">
            {KITCHEN.map((k, i) => (
              <li key={k.says} className={cn("rounded-lg p-3", kitchen[i] === k.answer ? "bg-sage/15" : "bg-vermilion/10")}>
                <span className="font-semibold">“{k.says}”</span> {KITCHEN_LABEL[k.answer]}.{" "}
                {kitchen[i] !== k.answer && <span>You said: {KITCHEN_LABEL[kitchen[i]!]}. </span>}
                <span className="text-muted-foreground">{k.why}</span>
              </li>
            ))}
          </ol>
          {after ? (
            <>
              <AfterNote before={before} after={after} />
              <Link href="/" className="mt-6 block w-full rounded-xl bg-ink px-4 py-3 text-center text-lg font-semibold text-paper">
                Back to the seven games
              </Link>
            </>
          ) : (
            <div className="mt-6">
              <Belief label="And now?" picked={after} onPick={setAfter} />
            </div>
          )}
        </Frame>
      );
    }
  }
}

function Frame({ children }: { children: React.ReactNode }) {
  return <main className="mx-auto max-w-2xl px-4 pt-6 pb-32">{children}</main>;
}

function Intro() {
  return (
    <>
      <p className="text-sm font-semibold tracking-wide text-terracotta uppercase">Prototype · Wittgenstein, played</p>
      <h1 className="mt-1 font-serif text-4xl">The helper’s dictionary</h1>
      <div className="relative mt-4 aspect-[16/9] overflow-hidden rounded-xl">
        <Image src="/art/builder/site.webp" alt="A building site with stones in a yard" fill className="object-cover" priority />
      </div>
      <p className="mt-4 text-lg">
        A builder shouts orders. Your helper fetches the stones, but it only knows the words you write in its dictionary, and it does exactly what
        the dictionary says. Write the dictionary, run the shift, watch what goes wrong, fix it.
      </p>
    </>
  );
}

function Belief({ label, picked, onPick }: { label: string; picked?: string; onPick: (id: string) => void }) {
  return (
    <section className="mt-6 rounded-xl border border-border bg-card p-4">
      <p className="text-sm font-semibold text-muted-foreground">{label}</p>
      <p className="mt-1 font-serif text-2xl">{BELIEF.question}</p>
      <div className="mt-3 space-y-2">
        {BELIEF.options.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => onPick(o.id)}
            className={cn(
              "w-full rounded-xl border-2 p-3 text-left text-lg",
              picked === o.id ? "border-cobalt bg-cobalt/10" : "border-border hover:border-ink/30",
            )}
          >
            {o.text}
          </button>
        ))}
      </div>
    </section>
  );
}

function AfterNote({ before, after }: { before?: string; after: string }) {
  return <p className="mt-6 rounded-xl bg-paper-deep p-4 text-lg">{afterText(before, after)}</p>;
}

function afterText(before: string | undefined, after: string): string {
  if (after === "use" && before === "use")
    return "You thought so before you started too. The yard showed why: “two”, “there” and the shouted “Slab!” only worked once you wrote down their job.";
  if (after === "use")
    return "You started with the picture of PI §1 and moved off it. That is the move the Investigations makes, and you made it by watching your own dictionary fail.";
  if (before === "names") return "Same answer as at the start. Look back at shift 2: which stone did you give “two”, and what did the helper bring?";
  return "You moved towards naming. Try shift 2 again with names only, and see whether any stone can be a “two”.";
}

function ShiftHeader({ index }: { index: number }) {
  const intro = [
    "Give each word the stone it names. Then run the shift.",
    "The builder has new words. Your dictionary still only has names. Run it and see.",
    "The crane is working today. Watch the second order.",
  ][index];
  return (
    <header>
      <p className="text-sm font-semibold tracking-wide text-terracotta uppercase">
        Shift {index + 1} of {SHIFTS.length}
      </p>
      <h1 className="mt-1 font-serif text-3xl">{SHIFTS[index].title.replace(/^Shift \d: /, "")}</h1>
      <p className="mt-2 text-lg">{intro}</p>
    </header>
  );
}

function Orders({ orders, run }: { orders: Order[]; run?: Run }) {
  return (
    <section aria-label="The builder's orders" className="mt-4">
      <h2 className="text-sm font-semibold text-muted-foreground">The builder will call</h2>
      <ol className="mt-2 space-y-2">
        {orders.map((o, i) => {
          const r = run?.results[i];
          return (
            <li
              key={i}
              className={cn(
                "rounded-xl border-2 p-3 transition-colors",
                !r && "border-border bg-card",
                r?.right && "border-sage bg-sage/10",
                r && !r.right && "border-vermilion bg-vermilion/5",
              )}
              style={r ? { animation: `fadein 300ms ${i * 350}ms both` } : undefined}
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-serif text-2xl">“{o.says}”</span>
                <span className="text-sm text-muted-foreground">
                  {o.points && `points ${o.points === "left" ? "← left" : "right →"}`}
                  {o.falling && "⚠ a slab is swinging loose overhead"}
                </span>
              </div>
              {r && (
                <p className="mt-1">
                  <span aria-hidden>{r.right ? "✓ " : "✗ "}</span>
                  <span className="font-semibold">Helper:</span> {r.says}
                  {!r.right && <span className="block text-muted-foreground">The builder wanted {describe(o.want)}.</span>}
                </p>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function DictionaryEditor({
  words,
  dict,
  unlocks,
  onChange,
}: {
  words: string[];
  dict: Dictionary;
  unlocks: Unlocks;
  onChange: (word: string, entry: Entry) => void;
}) {
  const [open, setOpen] = useState<string | undefined>(words.find((w) => !dict[w]));
  return (
    <section aria-label="Your helper's dictionary" className="mt-6">
      <h2 className="text-sm font-semibold text-muted-foreground">Your helper’s dictionary</h2>
      <ul className="mt-2 divide-y divide-border rounded-xl border border-border bg-card">
        {words.map((w) => (
          <li key={w}>
            <button
              type="button"
              aria-expanded={open === w}
              onClick={() => setOpen(open === w ? undefined : w)}
              className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
            >
              <span className="font-serif text-xl">“{w}”</span>
              <span className={cn("text-right", dict[w] ? "" : "text-vermilion")}>{dict[w] ? entryText(dict[w]) : "not written yet"}</span>
            </button>
            {open === w && <EntryPicker word={w} entry={dict[w]} unlocks={unlocks} onPick={(e) => onChange(w, e)} />}
          </li>
        ))}
      </ul>
      {!unlocks.jobs && <p className="mt-2 text-sm text-muted-foreground">For now a dictionary entry can only say which thing a word names.</p>}
    </section>
  );
}

function EntryPicker({ word, entry, unlocks, onPick }: { word: string; entry?: Entry; unlocks: Unlocks; onPick: (e: Entry) => void }) {
  const isStone = STONE_WORDS.has(word);
  return (
    <div className="space-y-3 border-t border-border bg-paper px-4 py-3">
      <div>
        <p className="text-sm font-semibold">Names the stone</p>
        <div className="mt-1 grid grid-cols-4 gap-2">
          {STONES.map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={entry?.kind === "name" && entry.stone === s}
              onClick={() => onPick({ kind: "name", stone: s })}
              className={cn(
                "flex flex-col items-center rounded-lg border-2 p-1 text-sm",
                entry?.kind === "name" && entry.stone === s ? "border-cobalt bg-cobalt/10" : "border-border",
              )}
            >
              <Image src={`/art/builder/${s}.webp`} alt="" width={64} height={64} className="h-12 w-12 object-contain" />
              {s}
            </button>
          ))}
        </div>
      </div>
      {unlocks.jobs ? (
        <div>
          <p className="text-sm font-semibold">Or does a job</p>
          <div className="mt-1 flex flex-wrap gap-2">
            {JOBS.map((j) => (
              <Chip key={j} on={entry?.kind === "job" && entry.job === j} onClick={() => onPick({ kind: "job", job: j })}>
                {JOB_LABEL[j]}
              </Chip>
            ))}
          </div>
        </div>
      ) : null}
      {unlocks.depends && isStone && (
        <div>
          <p className="text-sm font-semibold">Or it depends on the situation</p>
          <Chip
            on={entry?.kind === "depends"}
            onClick={() => onPick({ kind: "depends", usual: word as Stone, falling: "warn" })}
          >
            usually names the {word}; when something is falling, warns
          </Chip>
        </div>
      )}
    </div>
  );
}

function entryText(e: Entry): string {
  switch (e.kind) {
    case "name":
      return `names the ${e.stone}`;
    case "job":
      return JOB_LABEL[e.job];
    case "depends":
      return `the ${e.usual}, or a warning when something falls`;
  }
}

function DictionarySoFar({ dict }: { dict: Dictionary }) {
  const entries = Object.entries(dict).filter((e): e is [string, Entry] => Boolean(e[1]));
  const names = entries.filter(([, e]) => e.kind === "name").length;
  return (
    <p className="mt-4 rounded-xl bg-paper-deep p-4">
      Your dictionary now: {names} of {entries.length} words name a thing. The rest do a job.
    </p>
  );
}

function Chip({ on, onClick, children, role }: { on: boolean; onClick: () => void; children: React.ReactNode; role?: "radio" }) {
  return (
    <button
      type="button"
      role={role}
      aria-checked={role ? on : undefined}
      aria-pressed={role ? undefined : on}
      onClick={onClick}
      className={cn("rounded-full border-2 px-3 py-1.5 text-left", on ? "border-cobalt bg-cobalt/10" : "border-border bg-card hover:border-ink/30")}
    >
      {children}
    </button>
  );
}
