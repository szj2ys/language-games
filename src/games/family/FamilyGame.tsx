"use client";

import Image from "next/image";
import { useState } from "react";
import { Check, CircleHelp, Lightbulb, RotateCcw, Undo2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GameLoading, GameHeader, SessionEnd } from "@/components/game/chrome";
import { useSessions } from "@/components/game/use-sessions";
import { track } from "@/components/analytics";
import { cn } from "@/lib/utils";
import { useDraft } from "@/lib/use-draft";
import {
  QUANTIFIERS,
  checkChain,
  claimHolds,
  claimText,
  counterexample,
  strongest,
  type Card,
  type Feature,
  type Quantifier,
} from "./engine";
import { SESSIONS, type ClaimRound, type NewcomerRound, type Session, type ThreadRound } from "./rounds";

const GAME = "family";
type Done = (marks: number, max: number, firstTry: boolean, phrases: string[]) => void;

export function FamilyGame() {
  const g = useSessions(GAME, SESSIONS);
  if (!g.ready) return <GameLoading game="Family Threads" poster="/art/covers/family.webp" />;
  const { session, round, finished } = g;
  const props = { session, onDone: g.complete, onNext: g.next };
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col">
      <GameHeader game="Family Threads" title={session.title} round={finished ? session.rounds.length : g.roundIndex} total={session.rounds.length} />
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
            sources={g.sessionIndex === 0 ? ["pi-66", "pi-67"] : ["pi-11", "pi-14"]}
            nextTitle={SESSIONS[g.sessionIndex + 1]?.title}
            onNext={g.nextSession}
            onReplay={g.replay}
          />
        ) : round.mode === "claim" ? (
          <ClaimPlay key={round.id} round={round} {...props} />
        ) : round.mode === "thread" ? (
          <ThreadPlay key={round.id} round={round} {...props} />
        ) : (
          <NewcomerPlay key={round.id} round={round} {...props} />
        )}
      </main>
    </div>
  );
}

type Light = "on" | "off" | "blurred" | "plain";

function CardTile({
  card,
  light = "plain",
  selected,
  onClick,
  badge,
  small,
}: {
  card: Card;
  light?: Light;
  selected?: boolean;
  onClick?: () => void;
  badge?: React.ReactNode;
  small?: boolean;
}) {
  const body = (
    <>
      <span className={cn("relative block aspect-square w-full overflow-hidden rounded-lg bg-paper-deep", light === "off" && "opacity-35 grayscale", light === "blurred" && "opacity-70 blur-[1.5px]")}>
        <Image src={`/art/family/${card.id}.webp`} alt="" fill sizes="(min-width: 1024px) 160px, 33vw" className="object-cover" />
      </span>
      <span className={cn("mt-1 block text-center leading-tight font-bold", small ? "text-[13px]" : "text-[15px]")}>{card.name}</span>
      {light !== "plain" && (
        <span className="absolute top-1.5 right-1.5 grid size-6 place-items-center rounded-full bg-card shadow">
          {light === "on" ? <Check className="size-4 text-sage" aria-label="yes" /> : light === "off" ? <X className="size-4 text-terracotta" aria-label="no" /> : <CircleHelp className="size-4 text-ochre" aria-label="unclear" />}
        </span>
      )}
      {badge}
    </>
  );
  const cls = cn("relative rounded-xl border-2 bg-card p-1.5 text-left", selected ? "border-cobalt" : "border-border");
  return onClick ? (
    <button type="button" onClick={onClick} aria-pressed={selected} aria-label={card.name} className={cn(cls, "hover:border-ink/30")}>
      {body}
    </button>
  ) : (
    <div className={cls}>{body}</div>
  );
}

function lightFor(card: Card, feature: string): Light {
  const v = card.features[feature];
  return v === "blurred" ? "blurred" : v ? "on" : "off";
}

function HintRow({ hint, shown, onShow }: { hint: string; shown: boolean; onShow: () => void }) {
  return shown ? (
    <p role="status" className="text-[15px]">{hint}</p>
  ) : (
    <Button variant="ghost" className="h-11 self-start text-[15px]" onClick={onShow}>
      <Lightbulb className="size-4" aria-hidden /> Hint
    </Button>
  );
}

// Claim: the strongest true claim about these cards. -------------------------------

function ClaimPlay({ round, session, onDone, onNext }: { round: ClaimRound; session: Session; onDone: Done; onNext: () => void }) {
  const feature = session.features.find((f) => f.id === round.feature)!;
  const [q, setQ] = useDraft<Quantifier | null>(round.id, "q", null);
  const [looked, setLooked] = useDraft<Quantifier | null>(round.id, "looked", null);
  const [misses, setMisses] = useDraft(round.id, "misses", 0);
  const [hint, setHint] = useDraft(round.id, "hint", false);
  const truth = looked ? claimHolds(session.cards, feature.id, looked) : null;
  const best = strongest(session.cards, feature.id);
  const objector = looked && !truth ? counterexample(session.cards, feature.id, looked) : undefined;
  const [done, setDone] = useDraft(round.id, "done", false);

  const look = () => {
    if (!q) return;
    setLooked(q);
    const ok = claimHolds(session.cards, feature.id, q);
    if (!ok) {
      setMisses((m) => m + 1);
      track("repair_used", { game: GAME, round: round.id });
    }
  };
  const finish = () => {
    const strongestToo = looked === best;
    onDone(1 + (strongestToo ? 1 : 0) + (misses === 0 ? 1 : 0), 3, misses === 0 && strongestToo && !hint, [claimText(looked!, session.kind, feature)]);
    setDone(true);
  };

  return (
    <div className="flex flex-1 flex-col gap-3 px-3 pb-4 lg:grid lg:grid-cols-[1.3fr_1fr] lg:items-start lg:gap-6">
      <div className="grid grid-cols-3 gap-2" aria-label={`These ${session.kind}`}>
        {session.cards.map((c) => (
          <CardTile key={c.id} card={c} light={looked ? lightFor(c, feature.id) : "plain"} />
        ))}
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-sm text-muted-foreground">Make the strongest claim that is true of these {session.kind}. Then look.</p>
        <p className="font-heading text-[21px] leading-snug">
          {q ? claimText(q, session.kind, feature) : `… of these ${session.kind} ${feature.plural}.`}
        </p>
        {!looked || (!truth && !done) ? (
          <>
            <div className="grid grid-cols-4 gap-1.5" role="radiogroup" aria-label="How many">
              {QUANTIFIERS.map((x) => (
                <button
                  key={x}
                  type="button"
                  role="radio"
                  aria-checked={q === x}
                  onClick={() => {
                    setQ(x);
                    setLooked(null);
                  }}
                  className={cn("h-12 rounded-lg border-2 text-[17px] font-bold", q === x ? "border-ink bg-ink text-paper" : "border-border bg-card hover:border-ink/30")}
                >
                  {x}
                </button>
              ))}
            </div>
            {objector && (
              <p role="status" className="rounded-xl bg-terracotta/10 p-3 text-[16px]">
                <span className="font-bold">Objection!</span> What about {objector.name}? Look at it again.
              </p>
            )}
            <Button size="lg" className="h-12 text-lg" disabled={!q || looked === q} onClick={look}>
              Look
            </Button>
            <HintRow hint={round.hint} shown={hint} onShow={() => setHint(true)} />
          </>
        ) : !done ? (
          <>
            <p role="status" className="rounded-xl bg-sage/15 p-3 text-[16px]">
              True of these {session.kind}.{" "}
              {looked === best ? "And it is the strongest true claim." : `But you can say more than “${looked?.toLowerCase()}”.`}
              {session.cards.some((c) => c.features[feature.id] === "blurred") && " The blurred card is unclear, so it is set aside."}
            </p>
            <div className="flex gap-2">
              {looked !== best && (
                <Button size="lg" variant="outline" className="h-12 flex-1" onClick={() => setLooked(null)}>
                  <RotateCcw className="size-4" aria-hidden /> Say more
                </Button>
              )}
              <Button size="lg" className="h-12 flex-1 text-lg" onClick={finish} autoFocus>
                Keep this claim
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-[15px] text-muted-foreground">
              Note the words “of these”: the claim is about the {session.kind} on the table, not every {session.kind.slice(0, -1)} there is.
            </p>
            <Button size="lg" className="h-12 text-lg" onClick={onNext} autoFocus>
              Next
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

// Thread: one chain through every card, each link a shared feature. ----------------

function ThreadPlay({ round, session, onDone, onNext }: { round: ThreadRound; session: Session; onDone: Done; onNext: () => void }) {
  const [chain, setChain] = useDraft<{ card: Card; link?: string }[]>(round.id, "chain", []);
  const [pending, setPending] = useState<Card | null>(null);
  const [bad, setBad] = useState<string | null>(null);
  const [misses, setMisses] = useDraft(round.id, "misses", 0);
  const [hint, setHint] = useDraft(round.id, "hint", false);
  const [done, setDone] = useDraft(round.id, "done", false);
  const used = new Set(chain.map((s) => s.card.id));
  const last = chain[chain.length - 1]?.card;
  const result = checkChain(chain);
  const complete = chain.length === session.cards.length;
  const feature = (id?: string) => session.features.find((f) => f.id === id);

  const pick = (c: Card) => {
    setBad(null);
    if (!last) setChain([{ card: c }]);
    else setPending(c);
  };
  const linkWith = (f: Feature) => {
    if (!pending || !last) return;
    if (last.features[f.id] === true && pending.features[f.id] === true) {
      const next = [...chain, { card: pending, link: f.id }];
      setChain(next);
      setPending(null);
      if (next.length === session.cards.length) {
        const r = checkChain(next);
        onDone(1 + (r.fibres >= 3 ? 1 : 0) + (misses === 0 ? 1 : 0), 3, misses === 0 && !hint, next.slice(1).map((s, i) => `${cap(next[i].card.name)} and ${s.card.name} both ${feature(s.link)!.plural}.`));
        setDone(true);
      }
    } else {
      setMisses((m) => m + 1);
      setBad(`${cap(last.name)} and ${pending.name} don't both ${f.plural}.`);
      track("repair_used", { game: GAME, round: round.id });
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-3 px-3 pb-4 lg:grid lg:grid-cols-[1.3fr_1fr] lg:items-start lg:gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">
          {chain.length === 0 ? "Tap a card to start the thread." : pending ? `What do ${last?.name} and ${pending.name} both have?` : complete ? "The thread is complete." : `Tap the next card to join to ${last?.name}.`}
        </p>
        <div className="grid grid-cols-3 gap-2">
          {session.cards.map((c) => (
            <CardTile
              key={c.id}
              card={c}
              small
              selected={pending?.id === c.id}
              onClick={used.has(c.id) || done ? undefined : () => pick(c)}
              light={used.has(c.id) ? "on" : "plain"}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {pending && (
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="What they share">
            {session.features.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => linkWith(f)}
                className="min-h-11 rounded-lg border-2 bg-card px-2.5 py-1.5 text-left text-[15px] font-bold hover:bg-paper-deep"
                style={{ borderColor: f.colour }}
              >
                both {f.plural}
              </button>
            ))}
          </div>
        )}
        {bad && (
          <p role="status" className="rounded-lg bg-terracotta/10 px-3 py-2 text-[15px]">
            {bad} Try another link.
          </p>
        )}
        {chain.length > 0 && (
          <ol className="flex flex-col" aria-label="Your thread">
            {chain.map((s, i) => (
              <li key={s.card.id} className="flex flex-col">
                {s.link && (
                  <span className="ml-3 flex items-center gap-2 border-l-4 py-1 pl-3 text-[15px]" style={{ borderColor: feature(s.link)?.colour }}>
                    both {feature(s.link)?.plural}
                  </span>
                )}
                <span className="font-heading text-[18px] font-semibold">
                  {i + 1}. {s.card.name}
                </span>
              </li>
            ))}
          </ol>
        )}
        {chain.length > 0 && !done && (
          <Button
            variant="ghost"
            className="h-11 self-start"
            onClick={() => {
              setPending(null);
              setBad(null);
              setChain((c) => c.slice(0, -1));
            }}
          >
            <Undo2 className="size-4" aria-hidden /> Take back the last card
          </Button>
        )}
        {done && (
          <>
            <p role="status" className="rounded-xl bg-sage/15 p-3 text-[16px]">
              The thread holds with {result.fibres} different fibres — and no single fibre runs through all {session.cards.length} {session.kind}. That is what Wittgenstein calls a family resemblance (§67).
            </p>
            <Button size="lg" className="h-12 text-lg" onClick={onNext} autoFocus>
              Next
            </Button>
          </>
        )}
        {!done && <HintRow hint={round.hint} shown={hint} onShow={() => setHint(true)} />}
      </div>
    </div>
  );
}

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// Newcomer: link it with "both", or keep it at the edge with "unlike". -------------

function NewcomerPlay({ round, session, onDone, onNext }: { round: NewcomerRound; session: Session; onDone: Done; onNext: () => void }) {
  const n = round.newcomer;
  const [mode, setMode] = useDraft<"both" | "unlike">(round.id, "mode", "both");
  const [other, setOther] = useDraft<string>(round.id, "other", session.cards[0].id);
  const [feat, setFeat] = useDraft<string>(round.id, "feat", session.features[0].id);
  const [result, setResult] = useDraft<{ ok: boolean; text: string; why: string } | null>(round.id, "result", null);
  const [misses, setMisses] = useDraft(round.id, "misses", 0);
  const [hint, setHint] = useDraft(round.id, "hint", false);
  const f = session.features.find((x) => x.id === feat)!;
  const o = session.cards.find((c) => c.id === other)!;
  const sentence = `${cap(n.name)} and ${o.name} both ${f.plural}.`;
  const unlikeText = `Unlike most of these ${session.kind}, ${n.name} ${negate(f)}.`;

  const say = () => {
    let ok: boolean;
    let why: string;
    if (mode === "both") {
      ok = n.features[f.id] === true && o.features[f.id] === true;
      why = ok ? `True — ${n.name} joins the family through ${o.name}.` : `Not true: ${n.features[f.id] === true ? o.name : n.name} ${negate(f)}.`;
    } else {
      const most = claimHolds(session.cards, f.id, "Most");
      ok = n.features[f.id] === false && most;
      why = ok ? `True — ${n.name} sits at the edge of the family. Both answers can be right: the edges are blurred (§71).` : !most ? `That doesn't set it apart: fewer than half of these ${session.kind} ${f.plural} anyway.` : `Not true: ${n.name} ${f.singular}.`;
    }
    setResult({ ok, text: mode === "both" ? sentence : unlikeText, why });
    if (ok) onDone(2 + (misses === 0 ? 1 : 0), 3, misses === 0 && !hint, [mode === "both" ? sentence : unlikeText]);
    else {
      setMisses((m) => m + 1);
      track("repair_used", { game: GAME, round: round.id });
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-3 px-3 pb-4 lg:grid lg:grid-cols-[1.3fr_1fr] lg:items-start lg:gap-6">
      <div className="flex flex-col gap-2">
        <div className="mx-auto w-40">
          <CardTile card={n} badge={<span className="absolute top-1.5 left-1.5 rounded-full bg-ochre px-2 text-xs font-bold">New</span>} />
        </div>
        <div className="grid grid-cols-6 gap-1.5" aria-label={`These ${session.kind}`}>
          {session.cards.map((c) => (
            <CardTile key={c.id} card={c} small />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-sm text-muted-foreground">Does {n.name} belong with these {session.kind}? Say one true sentence.</p>
        <div className="grid grid-cols-2 gap-1.5" role="radiogroup" aria-label="Kind of sentence">
          {(["both", "unlike"] as const).map((m) => (
            <button
              key={m}
              type="button"
              role="radio"
              aria-checked={mode === m}
              disabled={!!result?.ok}
              onClick={() => {
                setMode(m);
                setResult(null);
              }}
              className={cn("h-11 rounded-lg border-2 text-[16px] font-bold", mode === m ? "border-ink bg-ink text-paper" : "border-border bg-card")}
            >
              {m === "both" ? "It belongs: “both”" : "At the edge: “unlike”"}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-x-1.5 gap-y-2 rounded-lg bg-card px-3 py-2 font-heading text-[18px]">
          {mode === "both" ? (
            <>
              {cap(n.name)} and
              <Select value={other} onChange={setOther} disabled={!!result?.ok} label="Which one" options={session.cards.map((c) => [c.id, c.name])} />
              both
              <Select value={feat} onChange={setFeat} disabled={!!result?.ok} label="What they share" options={session.features.map((x) => [x.id, x.plural])} />.
            </>
          ) : (
            <>
              Unlike most of these {session.kind}, {n.name}
              <Select value={feat} onChange={setFeat} disabled={!!result?.ok} label="What it lacks" options={session.features.map((x) => [x.id, negate(x)])} />.
            </>
          )}
        </div>
        {result && (
          <p role="status" className={cn("rounded-xl p-3 text-[16px]", result.ok ? "bg-sage/15" : "bg-terracotta/10")}>
            {result.why}
          </p>
        )}
        {result?.ok ? (
          <Button size="lg" className="h-12 text-lg" onClick={onNext} autoFocus>
            Next
          </Button>
        ) : (
          <>
            <Button size="lg" className="h-12 text-lg" onClick={say}>
              Say it
            </Button>
            <HintRow hint={round.hint} shown={hint} onShow={() => setHint(true)} />
          </>
        )}
      </div>
    </div>
  );
}

function negate(f: Feature): string {
  const s = f.singular;
  if (s.startsWith("is ")) return `is not ${s.slice(3)}`;
  if (s.startsWith("can ")) return `cannot ${s.slice(4)}`;
  if (s.startsWith("has ")) return `doesn't have ${s.slice(4)}`;
  return `doesn't ${f.plural}`;
}

function Select({ value, onChange, options, label, disabled }: { value: string; onChange: (v: string) => void; options: [string, string][]; label: string; disabled?: boolean }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={label}
      disabled={disabled}
      className="h-10 max-w-full rounded-lg border-2 border-cobalt/60 bg-card px-2 font-heading text-[17px] font-semibold text-cobalt disabled:border-transparent disabled:text-ink"
    >
      {options.map(([v, t]) => (
        <option key={v} value={v}>
          {t}
        </option>
      ))}
    </select>
  );
}
