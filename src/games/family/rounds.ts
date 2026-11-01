import type { SourceId } from "@/content/sources";
import type { Card, Feature } from "./engine";

export type ClaimRound = { id: string; mode: "claim"; feature: string; hint: string; blurredNote?: string };
export type ThreadRound = { id: string; mode: "thread"; hint: string };
export type NewcomerRound = { id: string; mode: "newcomer"; newcomer: Card; hint: string };
export type FamilyRound = ClaimRound | ThreadRound | NewcomerRound;

export type Session = {
  id: string;
  title: string;
  blurb: string;
  /** The idea this session shows, in one sentence. */
  shows: string;
  /** Plural noun for the cards: "games", "tools". */
  kind: string;
  source: SourceId;
  cards: Card[];
  features: Feature[];
  rounds: FamilyRound[];
};

const GAME_FEATURES: Feature[] = [
  { id: "winner", plural: "have a winner", singular: "has a winner", colour: "#42649a" },
  { id: "skill", plural: "need skill", singular: "needs skill", colour: "#b0553e" },
  { id: "luck", plural: "depend on luck", singular: "depends on luck", colour: "#c9a24a" },
  { id: "ball", plural: "are played with a ball", singular: "is played with a ball", colour: "#64775a" },
  { id: "cards", plural: "are played with cards", singular: "is played with cards", colour: "#7a5c8a" },
  { id: "alone", plural: "can be played alone", singular: "can be played alone", colour: "#3b8b8b" },
  { id: "group", plural: "are played in a group", singular: "is played in a group", colour: "#a8677a" },
  { id: "board", plural: "use a board", singular: "uses a board", colour: "#5b5f60" },
];

const card = (id: string, name: string, on: string[], blurred: string[] = [], all = GAME_FEATURES): Card => ({
  id,
  name,
  features: Object.fromEntries(all.map((f) => [f.id, blurred.includes(f.id) ? "blurred" : on.includes(f.id)])),
});

// Wittgenstein's own §66 examples: board games, card games, ball games, patience,
// a child throwing a ball at a wall, ring-a-ring-a-roses.
const GAMES: Card[] = [
  card("chess", "chess", ["winner", "skill", "board"]),
  card("football", "football", ["winner", "skill", "ball", "group"], ["luck"]),
  card("poker", "poker", ["winner", "skill", "luck", "cards", "group"]),
  card("patience", "patience (solitaire)", ["skill", "luck", "cards", "alone"], ["winner"]),
  card("wall", "throwing a ball at a wall", ["skill", "ball", "alone"]),
  card("ring", "ring-a-ring-a-roses (a circle game)", ["group"]),
];

const TOOL_FEATURES: Feature[] = [
  { id: "modify", plural: "change the thing they work on", singular: "changes the thing it works on", colour: "#b0553e" },
  { id: "handle", plural: "have a handle", singular: "has a handle", colour: "#42649a" },
  { id: "join", plural: "are used to join things", singular: "is used to join things", colour: "#64775a" },
  { id: "cut", plural: "are used to cut things", singular: "is used to cut things", colour: "#c9a24a" },
  { id: "measure", plural: "are used to measure things", singular: "is used to measure things", colour: "#7a5c8a" },
  { id: "metal", plural: "are made of metal", singular: "is made of metal", colour: "#5b5f60" },
  { id: "wood", plural: "are partly made of wood", singular: "is partly made of wood", colour: "#8a6a3b" },
];

const tool = (id: string, name: string, on: string[], blurred: string[] = []) => card(id, name, on, blurred, TOOL_FEATURES);

// PI §11: "a hammer, pliers, a saw, a screw-driver, a rule, a glue-pot, glue, nails and screws".
const TOOLS: Card[] = [
  tool("hammer", "the hammer", ["modify", "handle", "join", "metal", "wood"]),
  tool("saw", "the saw", ["modify", "handle", "cut", "metal", "wood"]),
  tool("ruler", "the ruler", ["measure", "wood"]),
  tool("gluepot", "the glue-pot", ["handle", "join"]),
  tool("screwdriver", "the screwdriver", ["modify", "handle", "join", "metal"]),
  { ...tool("pliers", "the pliers", ["modify", "handle", "cut", "metal"]), plural: true },
];

const LANGUAGE_FEATURES: Feature[] = [
  { id: "spoken", plural: "can be spoken aloud", singular: "can be spoken aloud", colour: "#42649a" },
  { id: "written", plural: "can be written down", singular: "can be written down", colour: "#b0553e" },
  { id: "orders", plural: "can give orders", singular: "can give orders", colour: "#64775a" },
  { id: "stories", plural: "can tell a story", singular: "can tell a story", colour: "#c9a24a" },
  { id: "hands", plural: "are used with the hands", singular: "is used with the hands", colour: "#7a5c8a" },
  { id: "special", plural: "are used for one special job", singular: "is used for one special job", colour: "#5b5f60" },
];

const lang = (id: string, name: string, on: string[], blurred: string[] = []) => card(id, name, on, blurred, LANGUAGE_FEATURES);

// PI §18: "Our language can be seen as an ancient city … and this surrounded by a multitude of new
// boroughs" — the symbolism of chemistry, the notation of the calculus. Are these all languages?
const LANGUAGES: Card[] = [
  lang("english", "English", ["spoken", "written", "orders", "stories"]),
  lang("signlanguage", "sign language", ["orders", "stories", "hands", "written"]),
  lang("roadsigns", "road signs", ["orders", "special"]),
  lang("chemistry", "chemical formulas", ["written", "special"]),
  lang("music", "music notation", ["written", "special"], ["stories"]),
  lang("morse", "Morse code", ["orders", "special", "hands", "written", "stories"], ["spoken"]),
];

const NUMBER_FEATURES: Feature[] = [
  { id: "howmany", plural: "can say how many", singular: "can say how many", colour: "#42649a" },
  { id: "measure", plural: "can measure an amount", singular: "can measure an amount", colour: "#b0553e" },
  { id: "order", plural: "can be put in order", singular: "can be put in order", colour: "#64775a" },
  { id: "add", plural: "can be added to make a total", singular: "can be added to make a total", colour: "#c9a24a" },
  { id: "name", plural: "can name one thing among many", singular: "can name one thing among many", colour: "#7a5c8a" },
  { id: "digits", plural: "can be written out in digits", singular: "can be written out in digits", colour: "#5b5f60" },
];

const num = (id: string, name: string, on: string[], blurred: string[] = []) => card(id, name, on, blurred, NUMBER_FEATURES);

// PI §67: "And for instance the kinds of number form a family in the same way." Why do we call something
// a number? Because it has a direct relationship with several things that have hitherto been called number.
const NUMBERS: Card[] = [
  num("wholenumbers", "whole numbers", ["howmany", "measure", "order", "add", "name", "digits"]),
  num("fractions", "fractions", ["measure", "order", "add", "digits"]),
  num("negativenumbers", "negative numbers", ["measure", "order", "add", "digits"]),
  num("zero", "zero", ["howmany", "measure", "order", "add", "digits"]),
  num("busnumbers", "bus numbers", ["name", "digits"], ["order"]),
  num("pi", "π (pi)", ["measure", "order", "add"]),
];

export const SESSIONS: Session[] = [
  {
    id: "family-1",
    title: "What is a game?",
    blurb: "Look for what all these games have in common. Don't think — look!",
    shows: "“Don't think, but look!” Games share no single feature, only a network of overlapping similarities (§66).",
    kind: "games",
    source: "pi-66",
    cards: GAMES,
    features: GAME_FEATURES,
    rounds: [
      {
        id: "f1-1",
        mode: "claim",
        feature: "winner",
        hint: "Look at each card. Does every one of them have a winner?",
        blurredNote:
          "you can “win” at patience, but nobody loses to you — is that a winner? Wittgenstein makes the same point about patience (§66).",
      },
      { id: "f1-2", mode: "claim", feature: "skill", blurredNote: undefined, hint: "Is there one game here that needs no skill at all?" },
      { id: "f1-3", mode: "claim", feature: "ball", hint: "Count the balls." },
      { id: "f1-4", mode: "thread", hint: "Start with any card. Each next card must share something with the one before it." },
      {
        id: "f1-5",
        mode: "newcomer",
        newcomer: card("crossword", "a crossword", ["skill", "alone"]),
        hint: "What does a crossword share with one of the games — or what makes it unlike them?",
      },
      {
        id: "f1-6",
        mode: "newcomer",
        newcomer: card("lottery", "the lottery", ["winner", "luck"], ["group"]),
        hint: "Is the lottery like poker in any way? Is it unlike most of these games?",
      },
    ],
  },
  {
    id: "family-2",
    title: "What is a tool?",
    blurb: "Wittgenstein compares words to the tools in a tool-box (§11). Are tools any more alike?",
    shows: "The functions of words are as diverse as the functions of the tools in a toolbox (§11).",
    kind: "tools",
    source: "pi-11",
    cards: TOOLS,
    features: TOOL_FEATURES,
    rounds: [
      { id: "f2-1", mode: "claim", feature: "modify", hint: "What does the ruler change? What does the glue-pot change?" },
      { id: "f2-2", mode: "claim", feature: "handle", hint: "Look at the ruler." },
      { id: "f2-3", mode: "claim", feature: "cut", hint: "Which of these could cut a plank or a wire?" },
      { id: "f2-4", mode: "thread", hint: "Each next tool must share something with the one before it." },
      {
        id: "f2-5",
        mode: "newcomer",
        newcomer: { ...tool("nails", "nails", ["join", "metal"]), plural: true },
        hint: "Nails are on Wittgenstein's list of tools. What do they share with the hammer?",
      },
    ],
  },
  {
    id: "family-3",
    title: "What is a language?",
    blurb: "Wittgenstein's builders have only four words (§2). Is that a language? Is a road sign? Look before you decide.",
    shows: "Our language is like an old city; chemistry's symbols and other notations are its newer suburbs (§18).",
    kind: "languages",
    source: "pi-18",
    cards: LANGUAGES,
    features: LANGUAGE_FEATURES,
    rounds: [
      {
        id: "f3-1",
        mode: "claim",
        feature: "spoken",
        hint: "Can you say chemical formulas aloud the way you speak English? Can you speak road signs?",
      },
      { id: "f3-2", mode: "claim", feature: "orders", hint: "A stop sign gives an order. Does a chemical formula?" },
      { id: "f3-3", mode: "thread", hint: "Start with English. Each next card must share something with the one before it." },
      {
        id: "f3-4",
        mode: "newcomer",
        newcomer: lang("builders", "the builders' language", ["spoken", "orders", "special", "written"]),
        hint: "The builders' four words (§2): they are spoken and they give orders. Which card shares that?",
      },
    ],
  },
  {
    id: "family-4",
    title: "What is a number?",
    blurb: "Wittgenstein: the kinds of number form a family too (§67). Does a bus number belong?",
    shows: "The kinds of number form a family too: no one fibre runs through the whole thread (§67).",
    kind: "numbers",
    source: "pi-67-number",
    cards: NUMBERS,
    features: NUMBER_FEATURES,
    rounds: [
      {
        id: "f4-1",
        mode: "claim",
        feature: "add",
        hint: "Bus 42 and bus 7: adding the route numbers does not give you a total of anything.",
      },
      {
        id: "f4-2",
        mode: "claim",
        feature: "howmany",
        hint: "“How many apples?” — “Three.” Can “half” or “minus five” answer that question?",
      },
      { id: "f4-3", mode: "thread", hint: "Start with whole numbers. Each next card must share something with the one before it." },
      {
        id: "f4-4",
        mode: "newcomer",
        newcomer: num("shirtnumber", "the number on a football shirt", ["name", "digits"]),
        hint: "A shirt number tells you which player it is. Which cards name one thing among many?",
      },
    ],
  },
];

/** What a round showed, for the end card and the notebook. */
export function did(r: FamilyRound): string {
  if (r.mode === "claim") return "a claim about these cards";
  if (r.mode === "thread") return "comparisons with “both”";
  return "a newcomer placed with “both” or “unlike”";
}
