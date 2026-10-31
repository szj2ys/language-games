"use client";

import Image from "next/image";
import { useState } from "react";
import { Check, ChevronDown, MessageCircleQuestion, RotateCcw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GameFrame, GameLoading, HintButton, SceneCanvas, SessionEnd } from "@/components/game/chrome";
import { useSessions } from "@/components/game/use-sessions";
import { track } from "@/components/analytics";
import { cn } from "@/lib/utils";
import { useDraft } from "@/lib/use-draft";
import {
  CONTAINERS,
  HOLDERS,
  SPOTS,
  describe,
  holds,
  place,
  placesFor,
  removeThing,
  REL_TEXT,
  say,
  whyFalse,
  type Clause,
  type Loc,
  type Relation,
  type Scene,
  type Thing,
} from "./engine";
import { SESSIONS, type BuildRound, type CheckRound, type TellRound } from "./rounds";

const GAME = "scene";

// Stage geometry, in % of the stage picture (16:9). Back row first so the front row draws over it.
const SPOT_X = [23, 41, 59, 77];
const ROW_Y = { back: 71, front: 87 };
const ROW_SCALE = { back: 0.82, front: 1 };
/** Sprite width in % of the stage width, and height as a multiple of width. */
const SIZE: Record<Thing, { w: number; h: number }> = {
  box: { w: 15, h: 0.9 },
  book: { w: 15, h: 0.6 },
  cup: { w: 10, h: 0.95 },
  key: { w: 10, h: 0.8 },
  lamp: { w: 10.5, h: 1.35 },
  ball: { w: 9, h: 1 },
};
const ASPECT = 16 / 9;

/** `clip` hides the bottom share of a sprite that sits inside a box, behind its front wall. */
type Placed = { thing: Thing; x: number; bottom: number; w: number; z: number; clip?: number };

/** Turn the logical scene into sprite positions. Logic decides truth; this only draws it. */
function layout(scene: Scene): Placed[] {
  const out: Placed[] = [];
  const at = (t: Thing, depth = 0): Placed | null => {
    const l = scene[t];
    if (!l || depth > 4) return null;
    if ("spot" in l) {
      const s = ROW_SCALE[l.row];
      return { thing: t, x: SPOT_X[l.spot], bottom: 100 - ROW_Y[l.row], w: SIZE[t].w * s, z: l.row === "back" ? 10 : 30 };
    }
    const holder = at("in" in l ? l.in : l.on, depth + 1);
    if (!holder) return null;
    const holderH = holder.w * SIZE[holder.thing].h * ASPECT;
    if ("in" in l) {
      // Sits inside: its lower part is hidden by the box's front wall, the rest shows in the opening.
      const w = SIZE[t].w * 0.8 * (holder.w / SIZE[holder.thing].w);
      const bottom = holder.bottom + holderH * 0.42;
      const rim = holder.bottom + holderH * 0.64;
      const h = w * SIZE[t].h * ASPECT;
      return { thing: t, x: holder.x + 1, bottom, w, z: holder.z + 1, clip: Math.min(80, ((rim - bottom) / h) * 100) };
    }
    const w = SIZE[t].w * (holder.w / SIZE[holder.thing].w);
    return { thing: t, x: holder.x, bottom: holder.bottom + holderH * 0.97, w, z: holder.z + 2 };
  };
  for (const t of Object.keys(scene) as Thing[]) {
    const p = at(t);
    if (p) out.push(p);
  }
  return out;
}

function Sprite({ p, selected, onClick }: { p: Placed; selected?: boolean; onClick?: () => void }) {
  const style = {
    left: `${p.x}%`,
    bottom: `${p.bottom}%`,
    width: `${p.w}%`,
    aspectRatio: `1 / ${SIZE[p.thing].h}`,
    zIndex: p.z,
    clipPath: p.clip ? `inset(0 0 ${p.clip}% 0)` : undefined,
  };
  const img = <Image src={`/art/scene/${p.thing}.webp`} alt="" fill sizes="120px" className="object-contain object-bottom" />;
  if (!onClick)
    return (
      <div className="absolute -translate-x-1/2" style={style} aria-hidden>
        {img}
      </div>
    );
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`The ${p.thing}${selected ? ", selected" : ""}`}
      aria-pressed={selected}
      className={cn("absolute -translate-x-1/2 rounded-md", selected && "outline-3 outline-offset-2 outline-cobalt")}
      style={style}
    >
      {img}
    </button>
  );
}

function Stage({
  scene,
  label,
  selected,
  onSelectPlaced,
  onDrop,
  fixed,
  children,
}: {
  scene: Scene;
  label: string;
  selected?: Thing | null;
  onSelectPlaced?: (t: Thing) => void;
  onDrop?: (loc: Loc) => void;
  /** Things that were already standing and cannot be moved. */
  fixed?: Set<Thing>;
  children?: React.ReactNode;
}) {
  const placed = layout(scene);
  const holders = placed.filter((p) => HOLDERS.includes(p.thing) && scene[p.thing] && "spot" in scene[p.thing]!);
  return (
    <SceneCanvas label={label}>
      <Image src="/art/scene/stage.webp" alt="" fill priority sizes="(min-width: 1024px) 700px, 133vw" className="object-cover" />
      {placed.map((p) => (
        <Sprite
          key={p.thing}
          p={p}
          selected={selected === p.thing}
          onClick={onSelectPlaced && (!fixed || !fixed.has(p.thing)) ? () => onSelectPlaced(p.thing) : undefined}
        />
      ))}
      {onDrop && selected &&
        (["back", "front"] as const).flatMap((row) =>
          Array.from({ length: SPOTS }, (_, spot) => {
            const taken = Object.values(scene).some((l) => l && "spot" in l && l.spot === spot && l.row === row);
            if (taken) return null;
            return (
              <button
                key={`${row}-${spot}`}
                type="button"
                onClick={() => onDrop({ spot, row })}
                aria-label={`${row === "back" ? "Back" : "Front"} row, place ${spot + 1} from the left`}
                className="absolute z-40 -translate-x-1/2 rounded-lg border-2 border-dashed border-cobalt/70 bg-cobalt/10 hover:bg-cobalt/25"
                style={{ left: `${SPOT_X[spot]}%`, bottom: row === "back" ? "27.5%" : "9%", width: "15.5%", height: "16.5%" }}
              />
            );
          }),
        )}
      {onDrop && selected &&
        holders
          .filter((h) => h.thing !== selected)
          .map((h) => (
            <div key={h.thing} className="absolute z-50 flex -translate-x-1/2 gap-1" style={{ left: `${h.x}%`, bottom: `${h.bottom + h.w * SIZE[h.thing].h * ASPECT + 2}%` }}>
              {(CONTAINERS.includes(h.thing) ? (["in", "on"] as const) : (["on"] as const)).map((rel) => (
                <button
                  key={rel}
                  type="button"
                  onClick={() => onDrop(rel === "in" ? { in: h.thing } : { on: h.thing })}
                  aria-label={`Put the ${selected} ${rel} the ${h.thing}`}
                  className="h-9 min-w-11 rounded-full bg-ink px-2.5 text-[15px] font-bold text-paper shadow"
                >
                  {rel}
                </button>
              ))}
            </div>
          ))}
      {children}
      <p className="sr-only">{describe(scene).join(" ") || "The stage is empty."}</p>
    </SceneCanvas>
  );
}

function ThingCard({ thing, selected, onClick }: { thing: Thing; selected?: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "flex min-h-20 flex-col items-center justify-center gap-0.5 rounded-xl border-2 bg-card px-2 py-1.5",
        selected ? "border-cobalt bg-cobalt/10" : "border-border hover:border-ink/30",
      )}
    >
      <span className="relative h-10 w-14">
        <Image src={`/art/scene/${thing}.webp`} alt="" fill sizes="60px" className="object-contain" />
      </span>
      <span className="text-[16px] font-bold">{thing}</span>
    </button>
  );
}

function Verdict({ ok, children }: { ok: boolean; children: React.ReactNode }) {
  return (
    <li className={cn("flex items-start gap-2 rounded-lg px-3 py-2 text-[17px]", ok ? "bg-sage/15" : "bg-terracotta/10")}>
      {ok ? <Check className="mt-0.5 size-5 shrink-0 text-sage" aria-label="True:" /> : <X className="mt-0.5 size-5 shrink-0 text-terracotta" aria-label="False:" />}
      <span>{children}</span>
    </li>
  );
}

// ---------------------------------------------------------------------------

export function SceneGame() {
  const g = useSessions(GAME, SESSIONS);
  if (!g.ready) return <GameLoading game="Picture Theatre" poster="/art/scene/stage.webp" />;
  const { session, round, finished } = g;
  return (
    <GameFrame game="Picture Theatre" g={g}>
        {finished ? (
          <SessionEnd
            title={session.title}
            english={session.english}
            firstTry={session.rounds.filter((r) => g.save.rounds[r.id]?.firstTry).length}
            total={session.rounds.length}
            sources={g.sessionIndex === 2 ? [session.source, "tlp-5.6"] : [session.source]}
            nextTitle={SESSIONS[g.sessionIndex + 1]?.title}
            onNext={g.nextSession}
            onReplay={g.replay}
          />
        ) : round.mode === "build" ? (
          <BuildPlay key={round.id} round={round} onDone={g.complete} onNext={g.next} />
        ) : round.mode === "check" ? (
          <CheckPlay key={round.id} round={round} onDone={g.complete} onNext={g.next} />
        ) : (
          <TellPlay key={round.id} round={round} onDone={g.complete} onNext={g.next} />
        )}
    </GameFrame>
  );
}

type Done = (marks: number, max: number, firstTry: boolean, phrases: string[]) => void;

function Controls({
  checked,
  solved,
  canCheck,
  checkLabel,
  onCheck,
  onRetry,
  onNext,
  hint,
  showHint,
  onHint,
}: {
  checked: boolean;
  solved: boolean;
  canCheck: boolean;
  checkLabel: string;
  onCheck: () => void;
  onRetry: () => void;
  onNext: () => void;
  hint: string;
  showHint: boolean;
  onHint: () => void;
}) {
  return (
    <>
      <div className="flex gap-2">
        {!checked && (
          <HintButton used={showHint} onUse={onHint} />
        )}
        {!checked ? (
          <Button size="lg" className="h-12 flex-1 text-lg" onClick={onCheck} disabled={!canCheck}>
            {checkLabel}
          </Button>
        ) : solved ? (
          <Button size="lg" className="h-12 flex-1 text-lg" onClick={onNext} autoFocus>
            Next
          </Button>
        ) : (
          <Button size="lg" variant="secondary" className="h-12 flex-1 text-lg" onClick={onRetry} autoFocus>
            <RotateCcw className="size-5" aria-hidden /> Change it
          </Button>
        )}
      </div>
      {showHint && !checked && <p role="status" className="text-[15px]">{hint}</p>}
    </>
  );
}

// Build: make the message true. -------------------------------------------------

function BuildPlay({ round, onDone, onNext }: { round: BuildRound; onDone: Done; onNext: () => void }) {
  const [scene, setScene] = useDraft<Scene>(round.id, "scene", round.start ?? {});
  const [selected, setSelected] = useState<Thing | null>(null);
  const [checked, setChecked] = useDraft<boolean[] | null>(round.id, "checked", null);
  const [tries, setTries] = useDraft(round.id, "tries", 0);
  const [hint, setHint] = useDraft(round.id, "hint", false);
  const fixed = new Set(Object.keys(round.start ?? {}) as Thing[]);
  const tray = round.things.filter((t) => !scene[t]);
  const solved = !!checked && checked.every(Boolean);

  const drop = (loc: Loc) => {
    if (!selected) return;
    setScene((s) => place(s, selected, loc));
    setSelected(null);
  };

  const check = () => {
    const r = round.message.map((c) => holds(scene, c));
    setChecked(r);
    setTries((n) => n + 1);
    if (r.every(Boolean)) onDone(r.length, r.length, tries === 0 && !hint, round.message.map(say));
    else track("repair_used", { game: GAME, round: round.id });
  };

  return (
    <div className="flex flex-1 flex-col gap-3 lg:grid lg:grid-cols-[1.5fr_1fr] lg:items-start lg:gap-6 lg:px-3">
      <Stage
        scene={scene}
        label="The stage"
        selected={checked ? null : selected}
        fixed={fixed}
        onSelectPlaced={checked ? undefined : (t) => setSelected((cur) => (cur === t ? null : t))}
        onDrop={checked ? undefined : drop}
      />
      <div className="flex flex-col gap-3 px-3 pb-4 lg:px-0">
        <div>
          <p className="text-sm text-muted-foreground">The message — make every sentence true:</p>
          <ul className="mt-1 flex flex-col gap-1.5">
            {round.message.map((c, i) =>
              checked ? (
                <Verdict key={i} ok={checked[i]}>
                  {say(c)}
                  {!checked[i] && <span className="block text-[15px] text-muted-foreground">{whyFalse(scene, c)}</span>}
                </Verdict>
              ) : (
                <li key={i} className="rounded-lg bg-card px-3 py-2 font-heading text-[19px]">
                  {say(c)}
                </li>
              ),
            )}
          </ul>
        </div>
        {!checked && (
          <div>
            <p className="mb-1 text-sm text-muted-foreground">
              {selected ? `Now tap a place on the stage for the ${selected}.` : tray.length ? "Tap a thing, then tap where it goes." : "Tap a thing on the stage to move it."}
            </p>
            <div className="flex flex-wrap gap-2">
              {tray.map((t) => (
                <ThingCard key={t} thing={t} selected={selected === t} onClick={() => setSelected((cur) => (cur === t ? null : t))} />
              ))}
              {selected && scene[selected] && (
                <Button
                  variant="outline"
                  className="h-20"
                  onClick={() => {
                    setScene((s) => removeThing(s, selected));
                    setSelected(null);
                  }}
                >
                  Take the {selected} off
                </Button>
              )}
            </div>
          </div>
        )}
        <Controls
          checked={!!checked}
          solved={solved}
          canCheck={tray.length === 0 || round.message.every((c) => scene[c.a] && scene[c.b])}
          checkLabel="Is it true?"
          onCheck={check}
          onRetry={() => setChecked(null)}
          onNext={onNext}
          hint={round.hint}
          showHint={hint}
          onHint={() => setHint(true)}
        />
      </div>
    </div>
  );
}

// Check: compare a report with the stage and fix what is false. -------------------

function RelationPicker({ value, options, onChange, disabled }: { value: Relation; options: Relation[]; onChange: (r: Relation) => void; disabled?: boolean }) {
  return (
    <span className="relative inline-flex">
      <select
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value as Relation)}
        aria-label="Change the position word"
        className="h-10 appearance-none rounded-lg border-2 border-cobalt/60 bg-card pr-8 pl-2.5 font-heading text-[19px] font-semibold text-cobalt disabled:border-transparent disabled:bg-transparent disabled:px-0 disabled:text-ink"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {REL_TEXT[o]}
          </option>
        ))}
      </select>
      {!disabled && <ChevronDown className="pointer-events-none absolute top-1/2 right-2 size-4 -translate-y-1/2 text-cobalt" aria-hidden />}
    </span>
  );
}

function CheckPlay({ round, onDone, onNext }: { round: CheckRound; onDone: Done; onNext: () => void }) {
  const [report, setReport] = useDraft<Clause[]>(round.id, "report", round.report);
  const [checked, setChecked] = useDraft<boolean[] | null>(round.id, "checked", null);
  const [tries, setTries] = useDraft(round.id, "tries", 0);
  const [hint, setHint] = useDraft(round.id, "hint", false);
  const solved = !!checked && checked.every(Boolean);

  const check = () => {
    const r = report.map((c) => holds(round.scene, c));
    setChecked(r);
    setTries((n) => n + 1);
    if (r.every(Boolean)) onDone(r.length, r.length, tries === 0 && !hint, report.map(say));
    else track("repair_used", { game: GAME, round: round.id });
  };

  return (
    <div className="flex flex-1 flex-col gap-3 lg:grid lg:grid-cols-[1.5fr_1fr] lg:items-start lg:gap-6 lg:px-3">
      <Stage scene={round.scene} label="What is really on the stage" />
      <div className="flex flex-col gap-3 px-3 pb-4 lg:px-0">
        <p className="text-sm text-muted-foreground">The report. Change one word in each false sentence so that it fits the stage.</p>
        <ul className="flex flex-col gap-1.5">
          {report.map((c, i) => {
            const options = Array.from(new Set([round.report[i].rel, ...round.options]));
            const line = (
              <span className="flex flex-wrap items-center gap-x-1.5 font-heading text-[19px]">
                The {c.a} {c.negated ? "is not" : "is"}
                <RelationPicker
                  value={c.rel}
                  options={options}
                  disabled={!!checked}
                  onChange={(rel) => setReport((rs) => rs.map((x, j) => (j === i ? { ...x, rel } : x)))}
                />
                the {c.b}.
              </span>
            );
            return checked ? (
              <Verdict key={i} ok={checked[i]}>{line}</Verdict>
            ) : (
              <li key={i} className="rounded-lg bg-card px-3 py-2">
                {line}
              </li>
            );
          })}
        </ul>
        <Controls
          checked={!!checked}
          solved={solved}
          canCheck
          checkLabel="Check against the stage"
          onCheck={check}
          onRetry={() => setChecked(null)}
          onNext={onNext}
          hint={round.hint}
          showHint={hint}
          onHint={() => setHint(true)}
        />
      </div>
    </div>
  );
}

// Tell: one sentence that lets an unseeing partner place the thing. ----------------

function TellPlay({ round, onDone, onNext }: { round: TellRound; onDone: Done; onNext: () => void }) {
  const others = (Object.keys(round.scene) as Thing[]).filter((t) => t !== round.target);
  const [rel, setRel] = useDraft<Relation>(round.id, "rel", round.options[0]);
  const [ref, setRef] = useDraft<Thing>(round.id, "ref", others[0]);
  const [result, setResult] = useDraft<{ clause: Clause; truth: boolean; places: Loc[] } | null>(round.id, "result", null);
  const [tries, setTries] = useDraft(round.id, "tries", 0);
  const [hint, setHint] = useDraft(round.id, "hint", false);
  const solved = !!result && result.truth && result.places.length === 1;

  const tell = () => {
    const clause = { a: round.target, rel, b: ref };
    const truth = holds(round.scene, clause);
    const places = placesFor(round.scene, clause);
    setResult({ clause, truth, places });
    setTries((n) => n + 1);
    const ok = truth && places.length === 1;
    if (ok) onDone(2, 2, tries === 0 && !hint, [say(clause)]);
    else track("repair_used", { game: GAME, round: round.id });
  };

  // What the partner builds: the rest of the stage, plus the target where your sentence puts it.
  const partnerScene: Scene = { ...removeThing(round.scene, round.target) };
  if (result && result.places.length >= 1) partnerScene[round.target] = result.places[0];
  function partnerReply(r: NonNullable<typeof result>): string {
    if (r.places.length === 0) return `I can't put the ${round.target} ${REL_TEXT[rel]} the ${ref} — there's no room for that.`;
    if (!r.truth) return "Done — but that's not where it is on your stage.";
    if (r.places.length > 1) return `${r.places.length} places fit that. Which one do you mean?`;
    return "Got it.";
  }
  const partnerSays = result ? partnerReply(result) : null;

  return (
    <div className="flex flex-1 flex-col gap-3 lg:grid lg:grid-cols-[1.5fr_1fr] lg:items-start lg:gap-6 lg:px-3">
      <div className="flex flex-col gap-2">
        <Stage scene={round.scene} label="Your stage, which your partner cannot see" />
        {result && (
          <div className="px-3 lg:px-0">
            <p className="mb-1 text-sm text-muted-foreground">Your partner&apos;s stage</p>
            <Stage scene={partnerScene} label="Your partner's stage" />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-3 px-3 pb-4 lg:px-0">
        <p className="text-sm text-muted-foreground">
          Your partner has everything except the <b>{round.target}</b>. Tell them where it goes — one sentence.
        </p>
        <p className="flex flex-wrap items-center gap-x-1.5 gap-y-1 rounded-lg bg-card px-3 py-2 font-heading text-[19px]">
          The {round.target} is
          <RelationPicker value={rel} options={round.options} onChange={(r) => { setRel(r); setResult(null); }} disabled={!!result} />
          the
          <span className="relative inline-flex">
            <select
              value={ref}
              disabled={!!result}
              onChange={(e) => { setRef(e.target.value as Thing); setResult(null); }}
              aria-label="Which thing"
              className="h-10 appearance-none rounded-lg border-2 border-cobalt/60 bg-card pr-8 pl-2.5 font-heading text-[19px] font-semibold text-cobalt disabled:border-transparent disabled:bg-transparent disabled:px-0 disabled:text-ink"
            >
              {others.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
            {!result && <ChevronDown className="pointer-events-none absolute top-1/2 right-2 size-4 -translate-y-1/2 text-cobalt" aria-hidden />}
          </span>
          .
        </p>
        {result && (
          <>
            <p role="status" className="flex items-start gap-2 rounded-lg bg-paper-deep px-3 py-2 text-[17px]">
              <MessageCircleQuestion className="mt-0.5 size-5 shrink-0" aria-hidden /> {partnerSays}
            </p>
            <ul className="flex flex-col gap-1.5">
              <Verdict ok={result.truth}>{result.truth ? "True of your stage." : "Not true of your stage."}</Verdict>
              <Verdict ok={result.places.length === 1}>
                {result.places.length === 1 ? "Leaves only one place." : result.places.length === 0 ? "Leaves no place at all." : `Leaves ${result.places.length} places.`}
              </Verdict>
            </ul>
          </>
        )}
        <Controls
          checked={!!result}
          solved={solved}
          canCheck
          checkLabel="Tell your partner"
          onCheck={tell}
          onRetry={() => setResult(null)}
          onNext={onNext}
          hint={round.hint}
          showHint={hint}
          onHint={() => setHint(true)}
        />
      </div>
    </div>
  );
}
