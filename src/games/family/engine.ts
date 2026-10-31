// "Family Threads" — PI §§66–67. Claims are checked against *these* cards,
// never against all games everywhere. A feature can be true, false or
// "blurred" (Wittgenstein himself asks whether chess is amusing, §66);
// blurred cards count neither for nor against a claim.

export type Truth = true | false | "blurred";

export type Card = { id: string; name: string; features: Record<string, Truth> };

export type Feature = {
  id: string;
  /** Verb phrase after a plural subject: "have a winner". */
  plural: string;
  /** Verb phrase after "both": "have a winner"; after a singular subject: "has a winner". */
  singular: string;
  colour: string;
};

export const QUANTIFIERS = ["All", "Most", "Some", "None"] as const;
export type Quantifier = (typeof QUANTIFIERS)[number];

export function claimText(q: Quantifier, kind: string, f: Feature): string {
  if (q === "None") return `None of these ${kind} ${f.singular}.`;
  return `${q} of these ${kind} ${f.plural}.`;
}

/** Is the claim true of these cards? Blurred cards are set aside. */
export function claimHolds(cards: Card[], featureId: string, q: Quantifier): boolean {
  const clear = cards.filter((c) => c.features[featureId] !== "blurred");
  const yes = clear.filter((c) => c.features[featureId] === true).length;
  const n = clear.length;
  switch (q) {
    case "All":
      return n > 0 && yes === n;
    case "Most":
      return yes * 2 > n;
    case "Some":
      return yes >= 1;
    case "None":
      return yes === 0;
  }
}

/** The strongest true claim about one feature: All beats Most beats Some; None stands alone. */
export function strongest(cards: Card[], featureId: string): Quantifier {
  for (const q of ["All", "None", "Most", "Some"] as const) if (claimHolds(cards, featureId, q)) return q;
  return "Some";
}

/** A card the Objector can hold up against a false claim. */
export function counterexample(cards: Card[], featureId: string, q: Quantifier): Card | undefined {
  if (q === "None" || q === "Some") return cards.find((c) => c.features[featureId] === (q === "None" ? true : false));
  return cards.find((c) => c.features[featureId] === false);
}

/** Features that link two cards: both clearly have them. */
export function sharedFeatures(a: Card, b: Card, features: Feature[]): Feature[] {
  return features.filter((f) => a.features[f.id] === true && b.features[f.id] === true);
}

/** A chain of cards holds if every neighbour pair shares the chosen feature. */
export function checkChain(chain: { card: Card; link?: string }[]) {
  const links = chain.slice(1).map((step, i) => ({
    from: chain[i].card,
    to: step.card,
    feature: step.link,
    ok: !!step.link && chain[i].card.features[step.link] === true && step.card.features[step.link] === true,
  }));
  const fibres = new Set(links.filter((l) => l.ok).map((l) => l.feature));
  return { links, ok: links.every((l) => l.ok), fibres: fibres.size };
}

/** No single feature runs through every card — the point of §67, and a content rule. */
export function noCommonFibre(cards: Card[], features: Feature[]): boolean {
  return features.every((f) => cards.some((c) => c.features[f.id] !== true));
}
