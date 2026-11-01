import type { SourceId } from "@/content/sources";
import { stepItem, type Item, type Level } from "./engine";

// Following a rule (PI §§185–242). Each level is a series or a sign. The pupil keeps the first way of
// going on that fits every example it has seen; the teacher's job is to find the examples that tell
// the ways apart — and to notice that, in the end, it is the practice that settles what counts as
// "going on in the same way".

const n = (x: number) => x.toLocaleString("en-GB");

/** "After 1000 comes …": the §185 pupil adds 2 up to 1000 and 4 after it. */
function after(k: number): Item {
  const two = k + 2;
  const odd = k >= 1000 ? k + 4 : k + 2;
  return stepItem(
    `after ${n(k)}`,
    { "to-1000": `after ${n(k)}: ${n(odd)}`, "add-2": `after ${n(k)}: ${n(two)}` },
    `after ${n(k)}: ${n(two)}`,
  );
}

const PRIMES = [3, 5, 7, 11, 13, 17, 19, 23];
const ODDS = [3, 5, 7, 9, 11, 13, 15, 17];
const ORD = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];
/** The k-th term of a series that begins 3, 5, 7. */
function term357(k: number): Item {
  return stepItem(
    `${ORD[k - 1]} term`,
    { primes: `${ORD[k - 1]}: ${PRIMES[k - 1]}`, odd: `${ORD[k - 1]}: ${ODDS[k - 1]}` },
    `${ORD[k - 1]}: ${ODDS[k - 1]}`,
  );
}

const STEPS = [1, 2, 4, 7, 11, 16, 22];
const DOUBLE = [1, 2, 4, 8, 16, 32, 64];
/** The k-th term of a series that begins 1, 2, 4. */
function term124(k: number): Item {
  return stepItem(
    `${ORD[k - 1]} term`,
    { steps: `${ORD[k - 1]}: ${STEPS[k - 1]}`, double: `${ORD[k - 1]}: ${DOUBLE[k - 1]}` },
    `${ORD[k - 1]}: ${DOUBLE[k - 1]}`,
  );
}

const DIRS = {
  "→": ["right", "left"],
  "←": ["left", "right"],
  "↑": ["ahead", "back"],
  "↓": ["back", "ahead"],
  "↗": ["ahead and right", "back and left"],
} as const;
/** A signpost: the pupil walks the way the tail points until shown otherwise. */
function sign(arrow: keyof typeof DIRS): Item {
  const [head, tail] = DIRS[arrow];
  return stepItem(arrow, { tail: `${arrow} go ${tail}`, head: `${arrow} go ${head}` }, `${arrow} go ${head}`);
}

export const LEVELS: Level[] = [
  {
    id: "r-1",
    title: "Add 2",
    task: "Teach the pupil to write the series of even numbers: add 2 each time.",
    rule: "add 2",
    ways: [
      { id: "to-1000", label: "Add 2 up to 1000, then 4" },
      { id: "add-2", label: "Add 2 every time" },
    ],
    exam: [after(6), after(100), after(998), after(1000), after(1004)],
    deck: [after(2), after(50), after(996), after(10), after(1000), after(2000)],
    explain: [
      { text: "Just go on in the same way.", readAs: "to-1000" },
      { text: "Add 2 every time, however big the number gets.", readAs: "add-2", needs: { ruledOut: "to-1000", otherwise: "to-1000" } },
    ],
    twist: {
      prompt:
        "Another pupil was taught with numbers below 1000 only. After 1000 it writes 1004, 1008, 1012 and says: “But I went on in the same way!”",
      options: [
        { text: "Correct it: 1002 is what “add 2” means here.", right: true },
        { text: "Accept it: every example it saw fits its way too.", right: false },
      ],
      why: "Every example below 1000 did fit its way. What makes 1002 right is not the examples but the practice we were trained in and agree in; inside that practice, 1004 is a mistake, and we correct it (§§185–186).",
    },
  },
  {
    id: "r-2",
    title: "3, 5, 7, …",
    task: "Teach the pupil the series that begins 3, 5, 7: the odd numbers.",
    rule: "the odd numbers from 3",
    ways: [
      { id: "primes", label: "The prime numbers from 3" },
      { id: "odd", label: "The odd numbers from 3" },
    ],
    exam: [term357(3), term357(4), term357(5), term357(6), term357(7)],
    deck: [term357(1), term357(2), term357(3), term357(4), term357(8), term357(5)],
    explain: [
      { text: "Keep the pattern going.", readAs: "primes" },
      { text: "Each number is 2 more than the one before.", readAs: "odd", needs: { ruledOut: "primes", otherwise: "primes" } },
    ],
    twist: {
      prompt: "A visitor sees only 3, 5, 7 on the board and goes on: 11, 13, 17. “I thought these were the primes.”",
      options: [
        { text: "It's a mistake: the series was the odd numbers.", right: false },
        { text: "It's not a mistake: 3, 5, 7 begins both series.", right: true },
      ],
      why: "The first terms fit both rules. Nothing on the board settled which series was meant; what you go on to do with it does (§§198–201: any course of action can be made to fit a rule on some interpretation).",
    },
  },
  {
    id: "r-3",
    title: "1, 2, 4, …",
    task: "Teach the pupil the series that begins 1, 2, 4 by doubling.",
    rule: "double the number each time",
    ways: [
      { id: "steps", label: "Add 1, then 2, then 3, …" },
      { id: "double", label: "Double each time" },
    ],
    exam: [term124(3), term124(4), term124(5), term124(6), term124(7)],
    deck: [term124(1), term124(2), term124(3), term124(6), term124(4), term124(5)],
    explain: [
      { text: "Do the same thing each time.", readAs: "steps" },
      { text: "Each number is twice the one before.", readAs: "double", needs: { ruledOut: "steps", otherwise: "steps" } },
    ],
    twist: {
      prompt: "The pupil asks why doubling is the right way to go on. You give a reason; it asks why again; and again.",
      options: [
        { text: "Keep giving reasons: there must be a last one that settles it.", right: false },
        { text: "At some point say: “This is simply what we do.”", right: true },
      ],
      why: "“If I have exhausted the justifications I have reached bedrock, and my spade is turned. Then I am inclined to say: ‘This is simply what I do’” (§217). Reasons come to an end in a practice, not in a last reason.",
    },
  },
  {
    id: "r-4",
    title: "Signposts",
    task: "Teach the pupil to follow a signpost: walk the way the arrow points.",
    rule: "go the way the head of the arrow points",
    ways: [
      { id: "tail", label: "Walk the way the tail points" },
      { id: "head", label: "Walk the way the head points" },
    ],
    exam: [sign("→"), sign("←"), sign("↑"), sign("↓"), sign("↗")],
    deck: [sign("→"), sign("↑"), sign("←"), sign("↓"), sign("↗")],
    explain: [
      { text: "Follow the arrow.", readAs: "tail" },
      { text: "Go towards the pointed end, away from the feathers.", readAs: "head", needs: { ruledOut: "tail", otherwise: "tail" } },
    ],
    twist: {
      prompt: "In another village people are trained to walk the way the tail points. A walker from there goes left at “→”.",
      options: [
        { text: "A mistake: the arrow points right.", right: false },
        { text: "Not a mistake in their practice: a sign means what its regular use makes it mean.", right: true },
      ],
      why: "“A person goes by a sign-post only in so far as there exists a regular use of sign-posts, a custom” (§198). Nothing in the shape of the arrow does the work by itself.",
    },
  },
];

export type Session = { id: string; title: string; blurb: string; shows: string; source: SourceId; rounds: Level[] };

export const SESSIONS: Session[] = [
  {
    id: "rules-1",
    title: "Going on",
    blurb: "Every example you give fits more than one way of going on. Find the ones that tell them apart.",
    shows:
      "Examples never fix a rule on their own, and nor do explanations; what settles “the same way” is a shared practice (§§185–202, 217).",
    source: "pi-185",
    rounds: LEVELS.slice(0, 3),
  },
  {
    id: "rules-2",
    title: "Signposts",
    blurb: "A sign does not tell you how to follow it. What does?",
    shows: "A signpost is followed only where there is a regular use of signposts, a custom (§198).",
    source: "pi-198",
    rounds: LEVELS.slice(3),
  },
];

/** What a round showed, for the end card and the notebook. */
export function did(r: Level): string {
  return `taught “${r.rule}”`;
}
