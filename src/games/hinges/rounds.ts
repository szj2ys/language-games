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
        kind: "checks",
        // A new id: completions and drafts of the earlier circular-check version must not count for this one.
        id: "h1-checks",
        art: "/art/v2/doubt.webp",
        situation:
          "Check a claim. Each check takes some things for granted while it runs. Check one of those too, and see what that check takes for granted. Then try doubting everything at once.",
        start: "bakery",
        claims: {
          bakery: {
            text: "The bakery opens at eight on Saturdays.",
            checks: [
              { how: "Read the sign on the bakery door.", reliesOn: ["sign", "eyes", "words"] },
              { how: "Phone the bakery and ask.", reliesOn: ["phone", "words"] },
              { how: "Ask a neighbour who shops there.", reliesOn: ["neighbour", "words"] },
            ],
          },
          sign: {
            text: "The sign on the door is up to date.",
            checks: [{ how: "Ask the baker whether the sign is current.", reliesOn: ["words", "others"] }],
          },
          neighbour: {
            text: "The neighbour remembers correctly.",
            checks: [{ how: "Ask a second neighbour.", reliesOn: ["words", "others"] }],
          },
          phone: {
            text: "The number I rang was the bakery's.",
            checks: [{ how: "Compare it with the number on the bakery's receipt.", reliesOn: ["eyes", "words"] }],
          },
          eyes: {
            text: "My eyes are working.",
            checks: [{ how: "Read the letters on an optician's chart while she checks.", reliesOn: ["words", "others"] }],
          },
          words: {
            text: "Words like “eight” and “open” mean what I take them to mean.",
            checks: [{ how: "Ask other people what “eight” and “open” mean.", reliesOn: ["eyes", "others"] }],
          },
          others: {
            text: "Other people are telling me what they think.",
            checks: [{ how: "Watch whether what people tell you turns out to be true.", reliesOn: ["eyes", "words"] }],
          },
        },
        doubtAll: "Now doubt them all at once: your eyes, what every word means, and everyone you might ask. Which check is left?",
        point:
          "Every check takes something for granted while it runs, and what stands fast depends on the check: the eye test takes the words for granted, asking about words takes your eyes for granted. Doubt everything at once, and no check can start (On Certainty §§115, 341–343).",
        source: "oc-341",
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
              "To doubt whether the bakery is open, she must take for granted what “bakery” and “open” mean, and how one finds out. Doubt everything, and there is nothing left to doubt with.",
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
        id: "h1-4b",
        art: "/art/v2/moon.webp",
        situation: "An astronomer wonders whether there is another planet beyond the ones we know of.",
        question: "Is doubting that something exists the kind of doubt that would pull everything down?",
        options: [
          {
            text: "No: it is an ordinary question, settled by looking through telescopes.",
            right: true,
            reply: "Right. Doubting whether a planet exists is an ordinary doubt with ordinary ways to settle it (§20).",
          },
          {
            text: "Yes: doubting that something exists is doubting the world.",
            right: false,
            reply: "“‘Doubting the existence of the external world’ does not mean for example doubting the existence of a planet” (§20).",
          },
        ],
        point: "Some doubts about what exists are ordinary questions; hinges are not a ban on them.",
        source: "oc-20",
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
        kind: "sort",
        id: "h2-0",
        art: "/art/v2/moon.webp",
        situation:
          "Sort each claim the way people in that year would have treated it: open to checking, or standing fast. Then move on to the next year.",
        eras: [
          { year: "1950", note: "when Wittgenstein wrote On Certainty §106" },
          { year: "1970", note: "a year after the moon landing" },
        ],
        cards: [
          { text: "The bakery opens at eight on Saturdays.", bed: [false, false] },
          { text: "No one has ever been on the moon.", bed: [true, false] },
          { text: "The earth existed long before I was born.", bed: [true, true] },
          { text: "It will rain tomorrow.", bed: [false, false] },
          { text: "I have two hands.", bed: [true, true] },
        ],
        point: "What stands fast can shift: in 1969 a hard certainty became open to checking, then false (§§96–97, 106).",
        source: "oc-96",
      },
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
