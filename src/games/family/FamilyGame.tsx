"use client";

import Image from "next/image";

import { Check, CircleHelp, Undo2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GameFrame, GameLoading, HintButton, SessionEnd } from "@/components/game/chrome";
import { useSessions } from "@/components/game/use-sessions";
import { track } from "@/components/analytics";
import { cn } from "@/lib/utils";
import type { SourceId } from "@/content/sources";
import { nextGame } from "@/content/games";
import { useDraft } from "@/lib/use-draft";
import { useShortcuts } from "@/components/game/shortcuts";
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
type Done = (marks: number, max: number, firstTry: boolean, phrases: string[], missed?: string) => void;

// The end card shows the thread of the session just played: games, tools, languages.
const END_ART = ["/art/covers/family.webp", "/art/covers/family-tools.webp", "/art/covers/family-languages.webp"];

export function FamilyGame() {
  const g = useSessions(GAME, SESSIONS);
  if (!g.ready) return <GameLoading game="Family Threads" poster="/art/covers/family.webp" />;
  const { session, round, finished } = g;
  const props = { session, onDone: g.complete, onNext: g.next };
  return (
    <GameFrame game="Family Threads" g={g}>
      {finished ? (
        <SessionEnd
          nextGame={nextGame("family")}
          items={g.sessionItems()}
          art={END_ART[g.sessionIndex]}
          title={session.title}
          english={session.english}
          firstTry={session.rounds.filter((r) => g.save.rounds[r.id]?.firstTry).length}
          total={session.rounds.length}
          sources={
            [
              ["pi-66", "pi-67"],
              ["pi-11", "pi-14"],
              ["pi-18", "pi-2"],
            ][g.sessionIndex] as SourceId[]
          }
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
    </GameFrame>
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
      <span
        className={cn(
          "relative block aspect-[3/4] w-full overflow-hidden rounded-lg bg-paper-deep sm:aspect-square",
          light === "off" && "opacity-35 grayscale",
          light === "blurred" && "opacity-70 blur-[1.5px]",
        )}
      >
        <Image src={`/art/family/${card.id}.webp`} alt="" fill sizes="(min-width: 1024px) 160px, 33vw" className="object-cover" />
      </span>
      <span className={cn("mt-1 block text-center leading-tight font-bold", small ? "text-[13px]" : "text-[15px]")}>{card.name}</span>
      {light !== "plain" && (
        <span className="absolute top-1.5 right-1.5 grid size-6 place-items-center rounded-full bg-card shadow">
          {light === "on" ? (
            <Check className="size-4 text-sage" aria-label="yes" />
          ) : light === "off" ? (
            <X className="size-4 text-terracotta" aria-label="no" />
          ) : (
            <CircleHelp className="size-4 text-ochre" aria-label="unclear" />
          )}
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
  return (
    <div className="flex items-center gap-3">
      <HintButton used={shown} onUse={onShow} />
      {shown && (
        <p role="status" className="text-[15px] lg:text-[18px]">
          {hint}
        </p>
      )}
    </div>
  );
}

// Claim: the strongest true claim about these cards. -------------------------------

function ClaimPlay({ round, session, onDone, onNext }: { round: ClaimRound; session: Session; onDone: Done; onNext: () => void }) {
  const feature = session.features.find((f) => f.id === round.feature)!;
  const [q, setQ] = useDraft<Quantifier | null>(round.id, "q", null);
  const [looked, setLooked] = useDraft<Quantifier | null>(round.id, "looked", null);
  const [misses, setMisses] = useDraft(round.id, "misses", 0);
  const [firstMiss, setFirstMiss] = useDraft<string | null>(round.id, "firstMiss", null);
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
      if (!firstMiss) setFirstMiss(claimText(q, session.kind, feature));
      track("repair_used", { game: GAME, round: round.id });
    } else finish(q);
  };
  useShortcuts({
    "1": done
      ? undefined
      : () => {
          setQ("All");
          setLooked(null);
        },
    "2": done
      ? undefined
      : () => {
          setQ("Most");
          setLooked(null);
        },
    "3": done
      ? undefined
      : () => {
          setQ("Some");
          setLooked(null);
        },
    "4": done
      ? undefined
      : () => {
          setQ("None");
          setLooked(null);
        },
    Enter: done ? onNext : looked && truth ? () => finish(looked) : q && looked !== q ? look : undefined,
  });

  function finish(claim: Quantifier) {
    const strongestToo = claim === best;
    onDone(
      1 + (strongestToo ? 1 : 0) + (misses === 0 ? 1 : 0),
      3,
      misses === 0 && strongestToo && !hint,
      [claimText(claim, session.kind, feature)],
      firstMiss ?? undefined,
    );
    setDone(true);
  }
  const blurred = session.cards.filter((c) => c.features[feature.id] === "blurred");

  return (
    <div className="flex flex-1 flex-col gap-3 px-3 pb-4 lg:grid lg:grid-cols-[minmax(0,1fr)_400px] lg:items-center lg:gap-8 lg:px-4">
      <div className="grid grid-cols-3 gap-2" aria-label={`These ${session.kind}`}>
        {session.cards.map((c) => (
          <CardTile key={c.id} card={c} light={looked ? lightFor(c, feature.id) : "plain"} />
        ))}
      </div>
      <div className="mt-auto flex flex-col gap-3 lg:mt-0">
        <p className="text-[15px] text-muted-foreground lg:text-[18px]">
          Make the strongest claim that is true of these {session.kind}. Then look.
        </p>
        <p className="font-heading text-[21px] leading-snug">
          {q ? claimText(q, session.kind, feature) : `… of these ${session.kind} ${feature.plural}.`}
        </p>
        {!looked || (!truth && !done) ? (
          <>
            <div className="grid grid-cols-4 gap-1.5" role="radiogroup" aria-label="How many">
              {QUANTIFIERS.map((x, i) => (
                <button
                  key={x}
                  type="button"
                  role="radio"
                  data-shortcut=""
                  aria-checked={q === x}
                  onClick={() => {
                    setQ(x);
                    setLooked(null);
                  }}
                  className={cn(
                    "h-12 rounded-lg border-2 text-[17px] font-bold",
                    q === x ? "border-ink bg-ink text-paper" : "border-border bg-card hover:border-ink/30",
                  )}
                >
                  <kbd className="pointer-coarse:hidden mr-1 text-xs font-bold opacity-60" aria-hidden>
                    {i + 1}
                  </kbd>
                  {x}
                </button>
              ))}
            </div>
            {objector && (
              <p role="status" className="rounded-xl bg-terracotta/10 p-3 text-[16px]">
                <span className="font-bold">Objection!</span>{" "}
                {looked === "Most"
                  ? `Only ${session.cards.filter((c) => c.features[feature.id] === true).length} of these ${session.cards.length} ${session.kind} ${feature.plural}.`
                  : `What about ${objector.name}? Look at it again.`}
              </p>
            )}
            <div className="flex gap-2">
              <HintButton used={hint} onUse={() => setHint(true)} />
              <Button size="lg" className="h-12 flex-1 text-lg" disabled={!q || looked === q} onClick={look}>
                Look
              </Button>
            </div>
            {hint && (
              <p role="status" className="text-[15px] lg:text-[18px]">
                {round.hint}
              </p>
            )}
          </>
        ) : (
          <>
            <p role="status" className="rounded-xl bg-sage/15 p-3 text-[16px]">
              {looked === best ? "True — and the strongest true claim. " : `True — though “${best}” would say more. `}
              Note “of these”: the claim is about the {session.kind} on the table, not every {session.kind.slice(0, -1)} there is.
            </p>
            {blurred.length > 0 && (
              <p className="text-[15px] lg:text-[18px]">
                <span className="font-bold">{blurred.map((c) => c.name).join(", ")}</span> was set aside as unclear
                {round.blurredNote ? `: ${round.blurredNote}` : "."}
              </p>
            )}
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
  const [pending, setPending] = useDraft<Card | null>(round.id, "pending", null);
  const [bad, setBad] = useDraft<string | null>(round.id, "bad", null);
  const [misses, setMisses] = useDraft(round.id, "misses", 0);
  const [hint, setHint] = useDraft(round.id, "hint", false);
  const [done, setDone] = useDraft(round.id, "done", false);
  const used = new Set(chain.map((s) => s.card.id));
  const last = chain[chain.length - 1]?.card;
  const result = checkChain(chain);
  const complete = chain.length === session.cards.length;
  const feature = (id?: string) => session.features.find((f) => f.id === id);

  function threadPrompt(): string {
    if (chain.length === 0) return "Choose a card to start the thread.";
    if (pending) return `What do ${last?.name} and ${pending.name} have in common?`;
    if (complete) return "The thread is complete.";
    return `Choose a card that shares something with ${last?.name}.`;
  }

  const pick = (c: Card) => {
    setBad(null);
    if (!last) setChain([{ card: c }]);
    else setPending(c);
  };
  const linkWith = (f: Feature) => {
    if (!pending || !last) return;
    if (last.features[f.id] === true && pending.features[f.id] === true) {
      setBad(null);
      const next = [...chain, { card: pending, link: f.id }];
      setChain(next);
      setPending(null);
      if (next.length === session.cards.length) {
        const r = checkChain(next);
        onDone(
          1 + (r.fibres >= 3 ? 1 : 0) + (misses === 0 ? 1 : 0),
          3,
          misses === 0 && !hint,
          next.slice(1).map((s, i) => `Both ${next[i].card.name} and ${s.card.name} ${feature(s.link)!.plural}.`),
        );
        setDone(true);
      }
    } else {
      setMisses((m) => m + 1);
      setBad(`It isn't true that both ${last.name} and ${pending.name} ${f.plural}.`);
      track("repair_used", { game: GAME, round: round.id });
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-3 px-3 pb-4 lg:grid lg:grid-cols-[minmax(0,1fr)_400px] lg:items-center lg:gap-8 lg:px-4">
      <div className="flex flex-col gap-2">
        <p className="text-[15px] text-muted-foreground lg:text-[18px]">{threadPrompt()}</p>
        <div className="relative grid grid-cols-3 gap-2">
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
          <ThreadLines chain={chain} cards={session.cards} features={session.features} />
        </div>
      </div>
      <div className="mt-auto flex flex-col gap-3 lg:mt-0">
        {pending && (
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="What they share">
            {session.features.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => linkWith(f)}
                className="min-h-11 rounded-lg border-2 bg-card px-2.5 py-1.5 text-left text-[15px] lg:text-[18px] font-bold hover:bg-paper-deep"
                style={{ borderColor: f.colour }}
              >
                {f.plural}
              </button>
            ))}
          </div>
        )}
        {bad && (
          <p role="status" className="rounded-lg bg-terracotta/10 px-3 py-2 text-[15px] lg:text-[18px]">
            {bad} Try another link.
          </p>
        )}
        {chain.length > 0 && (
          <ol className="flex flex-col" aria-label="Your thread">
            {chain.map((s, i) => (
              <li key={s.card.id} className="flex flex-col">
                {s.link && (
                  <span
                    className="ml-3 flex items-center gap-2 border-l-4 py-1 pl-3 text-[15px] lg:text-[18px]"
                    style={{ borderColor: feature(s.link)?.colour }}
                  >
                    Both {chain[i - 1].card.name} and {s.card.name} {feature(s.link)?.plural}.
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
              The thread holds with {result.fibres} different fibres — and no single fibre runs through all {session.cards.length}{" "}
              {session.kind}. That is what Wittgenstein calls a family resemblance (§67).
            </p>
            <Button size="lg" className="h-12 text-lg" onClick={onNext}>
              Next
            </Button>
          </>
        )}
        {!done && <HintRow hint={round.hint} shown={hint} onShow={() => setHint(true)} />}
      </div>
    </div>
  );
}

// Newcomer: link it with "both", or keep it at the edge with "unlike". -------------

function NewcomerPlay({ round, session, onDone, onNext }: { round: NewcomerRound; session: Session; onDone: Done; onNext: () => void }) {
  const n = round.newcomer;
  const [mode, setMode] = useDraft<"both" | "unlike">(round.id, "mode", "both");
  const [other, setOther] = useDraft<string>(round.id, "other", session.cards[0].id);
  const [feat, setFeat] = useDraft<string>(round.id, "feat", session.features[0].id);
  const [result, setResult] = useDraft<{ ok: boolean; why: string } | null>(round.id, "result", null);
  const [misses, setMisses] = useDraft(round.id, "misses", 0);
  const [hint, setHint] = useDraft(round.id, "hint", false);
  const f = session.features.find((x) => x.id === feat)!;
  const o = session.cards.find((c) => c.id === other)!;
  const sentence = `Both ${n.name} and ${o.name} ${f.plural}.`;
  const unlikeText = `Unlike most of these ${session.kind}, ${n.name} ${negate(f, n.plural)}.`;

  const say = () => {
    let ok: boolean;
    let why: string;
    if (mode === "both") {
      ok = n.features[f.id] === true && o.features[f.id] === true;
      const lacking = n.features[f.id] === true ? o : n;
      if (ok) why = `True — ${n.name} ${agree(n, "joins", "join")} the family through ${o.name}.`;
      // An unclear feature is neither true nor false: say so instead of correcting.
      else if (lacking.features[f.id] === "blurred")
        why = `That's unclear for ${lacking.name} — is it really “${f.plural}”? Choose something they clearly share.`;
      else why = `Not true: ${lacking.name} ${negate(f, lacking.plural)}.`;
    } else {
      const most = claimHolds(session.cards, f.id, "Most");
      ok = n.features[f.id] === false && most;
      if (n.features[f.id] === "blurred") {
        setResult({ ok: false, why: `That's unclear for ${n.name}. Choose something it clearly lacks.` });
        return;
      }
      if (ok)
        why = `True — ${n.name} ${agree(n, "sits", "sit")} at the edge of the family. Both answers can be right: the edges are blurred (§71).`;
      else if (!most) why = `That doesn't set it apart: no more than half of these ${session.kind} ${f.plural} anyway.`;
      else why = `Not true: ${n.name} ${n.plural ? f.plural : f.singular}.`;
    }
    setResult({ ok, why });
    if (ok) onDone(2 + (misses === 0 ? 1 : 0), 3, misses === 0 && !hint, [mode === "both" ? sentence : unlikeText]);
    else {
      setMisses((m) => m + 1);
      track("repair_used", { game: GAME, round: round.id });
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-3 px-3 pb-4 lg:grid lg:grid-cols-[minmax(0,1fr)_400px] lg:items-center lg:gap-8 lg:px-4">
      <div className="flex flex-col gap-2">
        <div className="mx-auto w-40">
          <CardTile card={n} badge={<span className="absolute top-1.5 left-1.5 rounded-full bg-ochre px-2 text-xs font-bold">New</span>} />
        </div>
        <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-6" aria-label={`These ${session.kind}`}>
          {session.cards.map((c) => (
            <CardTile key={c.id} card={c} small />
          ))}
        </div>
      </div>
      <div className="mt-auto flex flex-col gap-3 lg:mt-0">
        <p className="text-[15px] text-muted-foreground lg:text-[18px]">
          {agree(n, "Does", "Do")} {n.name} belong with these {session.kind}? Say one true sentence.
        </p>
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
              className={cn(
                "h-11 rounded-lg border-2 text-[16px] font-bold",
                mode === m ? "border-ink bg-ink text-paper" : "border-border bg-card",
              )}
            >
              {m === "both" ? "It belongs: “both”" : "At the edge: “unlike”"}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-x-1.5 gap-y-2 rounded-lg bg-card px-3 py-2 font-heading text-[18px]">
          {mode === "both" ? (
            <>
              Both {n.name} and
              <Select
                value={other}
                onChange={setOther}
                disabled={!!result?.ok}
                label="Which one"
                options={session.cards.map((c) => [c.id, c.name])}
              />
              <Select
                value={feat}
                onChange={setFeat}
                disabled={!!result?.ok}
                label="What they share"
                options={session.features.map((x) => [x.id, x.plural])}
              />
              .
            </>
          ) : (
            <>
              Unlike most of these {session.kind}, {n.name}
              <Select
                value={feat}
                onChange={setFeat}
                disabled={!!result?.ok}
                label="What it lacks"
                options={session.features.map((x) => [x.id, negate(x, n.plural)])}
              />
              .
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

/** "doesn't need skill" — or, for a plural subject such as "nails", "don't need skill". */
function negate(f: Feature, plural = false): string {
  const s = f.singular;
  if (s.startsWith("is ")) return `${plural ? "are" : "is"} not ${s.slice(3)}`;
  if (s.startsWith("can ")) return `cannot ${s.slice(4)}`;
  if (s.startsWith("has ")) return `${plural ? "don't" : "doesn't"} have ${s.slice(4)}`;
  return `${plural ? "don't" : "doesn't"} ${f.plural}`;
}

/** Pick the verb form that agrees with the card's name. */
function agree(c: Card, singular: string, plural: string): string {
  return c.plural ? plural : singular;
}

function Select({
  value,
  onChange,
  options,
  label,
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  options: [string, string][];
  label: string;
  disabled?: boolean;
}) {
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

/**
 * The thread drawn through the cards: one coloured fibre per link, in the
 * colour of what the two neighbours share. No single colour runs through all.
 */
function ThreadLines({ chain, cards, features }: { chain: { card: Card; link?: string }[]; cards: Card[]; features: Feature[] }) {
  const cols = 3;
  const rows = Math.ceil(cards.length / cols);
  const centre = (c: Card) => {
    const i = cards.findIndex((x) => x.id === c.id);
    return { x: ((i % cols) + 0.5) * (100 / cols), y: (Math.floor(i / cols) + 0.36) * (100 / rows) };
  };
  if (chain.length < 2) return null;
  return (
    <svg className="pointer-events-none absolute inset-0 size-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
      {chain.slice(1).map((step, i) => {
        const a = centre(chain[i].card);
        const b = centre(step.card);
        const colour = features.find((f) => f.id === step.link)?.colour ?? "#252a2d";
        return (
          <line
            key={step.card.id}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke={colour}
            strokeWidth={1.6}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            style={{ strokeWidth: 7 }}
            opacity={0.9}
          />
        );
      })}
    </svg>
  );
}
