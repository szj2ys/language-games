import type { SourceId } from "@/content/sources";
import type { Card, Feature } from "./engine";

export type ClaimRound = { id: string; mode: "claim"; feature: string; hint: string };
export type ThreadRound = { id: string; mode: "thread"; hint: string };
export type NewcomerRound = { id: string; mode: "newcomer"; newcomer: Card; hint: string };
export type FamilyRound = ClaimRound | ThreadRound | NewcomerRound;

export type Session = {
  id: string;
  title: string;
  blurb: string;
  english: string;
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
  card("patience", "patience", ["skill", "luck", "cards", "alone"], ["winner"]),
  card("wall", "ball against a wall", ["skill", "ball", "alone"]),
  card("ring", "ring-a-ring-a-roses", ["group"]),
];

const TOOL_FEATURES: Feature[] = [
  { id: "modify", plural: "change the thing they work on", singular: "changes the thing it works on", colour: "#b0553e" },
  { id: "handle", plural: "have a handle", singular: "has a handle", colour: "#42649a" },
  { id: "join", plural: "join things together", singular: "joins things together", colour: "#64775a" },
  { id: "cut", plural: "cut", singular: "cuts", colour: "#c9a24a" },
  { id: "measure", plural: "measure", singular: "measures", colour: "#7a5c8a" },
  { id: "metal", plural: "are made of metal", singular: "is made of metal", colour: "#5b5f60" },
  { id: "wood", plural: "are partly made of wood", singular: "is partly made of wood", colour: "#8a6a3b" },
];

const tool = (id: string, name: string, on: string[], blurred: string[] = []) => card(id, name, on, blurred, TOOL_FEATURES);

// PI §11: "a hammer, pliers, a saw, a screw-driver, a rule, a glue-pot, glue, nails and screws".
const TOOLS: Card[] = [
  tool("hammer", "hammer", ["modify", "handle", "join", "metal", "wood"]),
  tool("saw", "saw", ["modify", "handle", "cut", "metal", "wood"]),
  tool("ruler", "ruler", ["measure", "wood"]),
  tool("gluepot", "glue-pot", ["handle", "join"]),
  tool("screwdriver", "screwdriver", ["modify", "handle", "join", "metal"]),
  tool("pliers", "pliers", ["modify", "handle", "cut", "metal"]),
];

export const SESSIONS: Session[] = [
  {
    id: "family-1",
    title: "What is a game?",
    blurb: "Look for what all these games have in common. Don't think — look!",
    english: "Quantifiers about a group: all, most, some, none of these; 'both … and'",
    kind: "games",
    source: "pi-66",
    cards: GAMES,
    features: GAME_FEATURES,
    rounds: [
      { id: "f1-1", mode: "claim", feature: "winner", hint: "Look at each card. Does every one of them have a winner?" },
      { id: "f1-2", mode: "claim", feature: "skill", hint: "Is there one game here that needs no skill at all?" },
      { id: "f1-3", mode: "claim", feature: "ball", hint: "Count the balls." },
      { id: "f1-4", mode: "thread", hint: "Start with any card. Each next card must share something with the one before it." },
      {
        id: "f1-5", mode: "newcomer",
        newcomer: card("crossword", "a crossword", ["skill", "alone"]),
        hint: "What does a crossword share with one of the games — or what makes it unlike them?",
      },
      {
        id: "f1-6", mode: "newcomer",
        newcomer: card("lottery", "the lottery", ["winner", "luck", "group"]),
        hint: "Is the lottery like poker in any way? Is it unlike most of these games?",
      },
    ],
  },
  {
    id: "family-2",
    title: "What is a tool?",
    blurb: "Wittgenstein compares words to the tools in a tool-box (§11). Are tools any more alike?",
    english: "Describing function: 'is used to…', 'both … and', 'unlike'",
    kind: "tools",
    source: "pi-11",
    cards: TOOLS,
    features: TOOL_FEATURES,
    rounds: [
      { id: "f2-1", mode: "claim", feature: "modify", hint: "What does the ruler change? What does the glue-pot change?" },
      { id: "f2-2", mode: "claim", feature: "handle", hint: "Look at the ruler." },
      { id: "f2-3", mode: "claim", feature: "measure", hint: "Which of these can tell you how long something is?" },
      { id: "f2-4", mode: "thread", hint: "Each next tool must share something with the one before it." },
      {
        id: "f2-5", mode: "newcomer",
        newcomer: { ...tool("nails", "nails", ["join", "metal"]), plural: true },
        hint: "Nails are on Wittgenstein's list of tools. What do they share with the hammer?",
      },
    ],
  },
];
