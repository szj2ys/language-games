import type { ChoiceSession } from "@/games/choice/types";

// On Certainty: doubts turn on hinges (§§341–343), and the river-bed of thought can shift (§§94–99).
export const SESSIONS: ChoiceSession[] = [
  {
    id: "hinges-1",
    title: "Doubt it",
    blurb: "Some doubts have an ordinary way to settle them. Some would pull everything else down with them.",
    shows: "Our questions and doubts turn on things that stand fast, as a door turns on hinges that stay put (§§341–343).",
    source: "oc-341",
    art: "/art/v2/hinge-door.webp",
    rounds: [
      {
        id: "h1-1",
        art: "/art/v2/doubt.webp",
        situation: "A friend says: “The bakery opens at eight on Saturdays.” You are not sure.",
        question: "What would settle your doubt?",
        options: [
          {
            text: "Look at the sign, phone them, or ask a neighbour.",
            right: true,
            reply: "Right. An ordinary doubt comes with ordinary ways of settling it.",
          },
          { text: "Nothing could ever settle it.", right: false, reply: "Of course something could: you know exactly how to find out." },
        ],
        point: "An ordinary doubt has an ordinary way to settle it.",
        source: "oc-115",
      },
      {
        id: "h1-2",
        art: "/art/v2/hands.webp",
        situation: "Now the claim is: “I have two hands.” Suppose you tried to doubt it.",
        question: "How would you make sure?",
        options: [
          {
            text: "Look at them.",
            right: false,
            reply: "If you doubted that you have hands, why trust your eyes? “What is to be tested by what?” (On Certainty §125)",
          },
          {
            text: "Nothing would be surer than this: any test would be less certain than what it tested.",
            right: true,
            reply: "Right. Some things are more certain than any test you could run on them.",
          },
        ],
        point: "Some things are more certain than any test that could be run on them.",
        source: "oc-125",
      },
      {
        id: "h1-3",
        art: "/art/v2/doubt.webp",
        situation: "A child asks: “How do you know that cats don't grow on trees?”",
        question: "What is the honest answer?",
        options: [
          {
            text: "“I've looked at a great many trees.”",
            right: false,
            reply: "Did you ever check? “I cannot say that I have good grounds for the opinion that cats do not grow on trees” (§282).",
          },
          {
            text: "“It isn't something I found out. It's part of how I find things out.”",
            right: true,
            reply: "Right. It is not a conclusion you reached; it is part of the ground your evidence stands on.",
          },
        ],
        point: "Not every certainty rests on evidence; some are the ground evidence stands on.",
        source: "oc-282",
      },
      {
        id: "h1-4",
        art: "/art/v2/doubt.webp",
        situation: "Your friend announces: “From now on I shall doubt everything.”",
        question: "How far will she get?",
        options: [
          {
            text: "As far as she likes: doubting is free.",
            right: false,
            reply:
              "To doubt anything at all she must trust that her words mean what they mean, that the things she doubts about exist… Doubt everything and there is nothing left to doubt with.",
          },
          {
            text: "Not far: doubting itself needs something certain.",
            right: true,
            reply: "Right. “The game of doubting itself presupposes certainty” (§115).",
          },
        ],
        point: "If you tried to doubt everything, you would not get as far as doubting anything.",
        source: "oc-115",
      },
      {
        id: "h1-5",
        art: "/art/v2/hinge-door.webp",
        situation: "A door turns on its hinges. Wittgenstein says our questions are like that.",
        question: "Which are the hinges?",
        options: [
          {
            text: "The things we have checked most carefully.",
            right: false,
            reply: "Hinges are not results of checking. They stay put so that the checking can turn on them.",
          },
          {
            text: "The things that stand fast, so that our questions can turn.",
            right: true,
            reply: "Right. “If I want the door to turn, the hinges must stay put” (§343).",
          },
        ],
        point: "Hinges stand fast so that questions can turn on them.",
        source: "oc-343",
      },
    ],
  },
  {
    id: "hinges-2",
    title: "The river-bed",
    blurb: "Water flows; the river-bed mostly stays. But not for ever.",
    shows: "What stands fast can shift over time: hard propositions become fluid, fluid ones harden (§§96–97).",
    source: "oc-96",
    art: "/art/v2/cover-hinges.webp",
    rounds: [
      {
        id: "h2-1",
        art: "/art/v2/river.webp",
        situation: "Wittgenstein compares our thinking to a river: the water moves fast; the river-bed shifts slowly, if at all.",
        question: "Which is the water?",
        options: [
          {
            text: "The questions we argue about and settle.",
            right: true,
            reply: "Right. The bed is what those arguments run along without being questioned.",
          },
          { text: "The certainties we never question.", right: false, reply: "Those are the river-bed: they give the water its course." },
        ],
        point: "Our arguments flow along a bed of things not argued about.",
        source: "oc-97",
      },
      {
        id: "h2-2",
        art: "/art/v2/doubt.webp",
        situation: "At school you learned that the earth existed long before you were born.",
        question: "Did you first check the evidence, then believe it?",
        options: [
          {
            text: "Yes: I weighed the evidence first.",
            right: false,
            reply: "Did you? Most of us were never asked to. It came with everything else we were taught.",
          },
          {
            text: "No: it came with the picture of the world I was given, the background I check things against.",
            right: true,
            reply: "Right. “It is the inherited background against which I distinguish between true and false” (§94).",
          },
        ],
        point: "We check things against a background that we did not check.",
        source: "oc-94",
      },
      {
        id: "h2-3",
        art: "/art/v2/moon.webp",
        situation:
          "Around 1950, Wittgenstein imagines a child told by an adult that he had been on the moon. “No one has ever been on the moon,” Wittgenstein answers; it is impossible to fly there (§106).",
        question: "In 1950, was “No one has been on the moon” a claim people kept checking?",
        options: [
          {
            text: "No: it stood fast. Nobody thought it needed checking.",
            right: true,
            reply: "Right. For Wittgenstein and his readers, it was part of the river-bed.",
          },
          {
            text: "Yes: people checked it every day.",
            right: false,
            reply: "How would they have? It was simply what everyone took for granted.",
          },
        ],
        point: "In 1950, “no one has been on the moon” was part of the river-bed.",
        source: "oc-106",
      },
      {
        id: "h2-4",
        art: "/art/v2/moon.webp",
        situation: "In July 1969, two people walked on the moon.",
        question: "What happened to the river-bed?",
        options: [
          {
            text: "It moved: something hard became open to question, then false.",
            right: true,
            reply: "Right. “Fluid propositions hardened, and hard ones became fluid” (§96).",
          },
          {
            text: "Nothing: it only shows there were never any hinges.",
            right: false,
            reply: "Hinges are not promised to be true for ever. Wittgenstein says himself that the bed can shift.",
          },
        ],
        point: "What stands fast can shift: hard propositions can become fluid.",
        source: "oc-96",
      },
      {
        id: "h2-5",
        art: "/art/v2/hinge-door.webp",
        situation: "Someone says: “Hinges are just lazy assumptions. With enough time, we could check them all.”",
        question: "Is that right?",
        options: [
          {
            text: "Yes: we just haven't got round to checking them.",
            right: false,
            reply: "“It isn't that … we just can't investigate everything” (§343). Checking always turns on something left unchecked.",
          },
          {
            text: "No: if everything were up for checking, nothing could be checked.",
            right: true,
            reply: "Right. “If I want the door to turn, the hinges must stay put” (§343).",
          },
        ],
        point: "Hinges are not unchecked assumptions; without them nothing could be checked.",
        source: "oc-343",
      },
    ],
  },
];

export { did } from "@/games/choice/types";
