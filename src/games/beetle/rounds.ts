import type { ChoiceSession } from "@/games/choice/types";

// Philosophical Investigations §§243–315: the beetle in the box (§293) and the private diary (§§258–270).
export const SESSIONS: ChoiceSession[] = [
  {
    id: "beetle-1",
    title: "The beetle",
    blurb: "Four friends, four boxes, one word. Nobody can look into anyone else's box.",
    shows: "If a word named a private object, the object would drop out: the talk goes on the same whatever is in the boxes (§293).",
    source: "pi-293",
    art: "/art/v2/cover-beetle.webp",
    rounds: [
      {
        kind: "boxes",
        id: "bb1-0",
        art: "/art/v2/beetle-friends.webp",
        situation:
          "Four friends each have a box with something in it. They call it a “beetle”. No one can look into anyone else's box. You are one of the four.",
        contents: ["A beetle", "A grey pebble", "Nothing at all", "Something that keeps changing"],
        talk: [
          { who: "Ana", line: "Did everyone bring their beetle?" },
          { who: "You", line: "Mine's right here." },
          { who: "Ben", line: "Keep your beetle safe on the train home." },
          { who: "Cleo", line: "Mine has been quiet all day." },
          { who: "You", line: "So has mine." },
        ],
        question: "What difference did the inside of your box make to the talk?",
        options: [
          {
            text: "None: the talk went the same whatever was in the box.",
            right: true,
            reply: "Right. “The thing in the box has no place in the language-game at all” (§293).",
          },
          {
            text: "It changed what “beetle” meant when I said it.",
            right: false,
            reply: "Nothing anyone said or did changed, and nobody could tell. Where is the difference in meaning supposed to show?",
          },
        ],
        point: "The thing in the box drops out: the word works the same whatever is inside, even nothing.",
        source: "pi-293",
      },
      {
        id: "bb1-1",
        art: "/art/v2/beetle-friends.webp",
        situation:
          "The rules of this game: everyone has a box, and no one can look into anyone else's box, or compare boxes in any way: no scales, no photographs, no X-rays. Ana says: “My beetle is bigger than yours.”",
        question: "Could anyone ever find out whether that is true?",
        options: [
          {
            text: "Yes: put the boxes side by side and compare.",
            right: false,
            reply: "No one can look into anyone else's box. That is the rule here.",
          },
          {
            text: "Yes: ask Ana to describe her beetle.",
            right: false,
            reply: "She can describe it, but nobody can hold her words up against what is in her box.",
          },
          {
            text: "No: nothing anyone could do would settle it.",
            right: true,
            reply: "Right. Here, a claim about the inside of another box can never be checked.",
          },
        ],
        point: "A claim about the inside of someone else's box can never be checked.",
        source: "pi-293",
      },
      {
        id: "bb1-3",
        art: "/art/v2/beetle-friends.webp",
        situation: "Cleo says: “I know what a beetle is only from my own. Everyone else's might be quite different.”",
        question: "If Cleo is right, what is the word “beetle” doing?",
        options: [
          {
            text: "Naming the thing in Cleo's box.",
            right: false,
            reply: "Then no one else could ever learn what she means by it, and she could not teach them.",
          },
          {
            text: "Whatever it does, it cannot be naming what is in the boxes.",
            right: true,
            reply: "Right. “If so it would not be used as the name of a thing” (§293).",
          },
          {
            text: "Naming whatever is in the biggest box.",
            right: false,
            reply: "Nobody can tell which box holds the biggest one, so that rule could never be followed.",
          },
        ],
        point: "If everyone knew “beetle” only from their own case, the word could not be the name of the thing in the box.",
        source: "pi-293",
      },
      {
        id: "bb1-5",
        art: "/art/v2/beetle-reveal.webp",
        situation:
          "Now you see what nobody at the table could see: a beetle, a grey pebble, an empty box, and something that keeps changing shape.",
        question: "What does this change about the evening's talk?",
        options: [
          {
            text: "Nothing: the talk worked just the same.",
            right: true,
            reply: "Right. “The thing in the box has no place in the language-game at all” (§293).",
          },
          {
            text: "Everything: they were talking nonsense all along.",
            right: false,
            reply: "Their talk did its job all evening. What was in the boxes played no part in it.",
          },
          {
            text: "Only the empty box is a problem.",
            right: false,
            reply: "“The box might even be empty” (§293). The word worked for its owner just as well.",
          },
        ],
        point: "The thing in the box drops out: the box might even be empty.",
        source: "pi-293",
      },
    ],
  },
  {
    id: "beetle-2",
    title: "The diary",
    blurb: "You write “S” whenever a certain sensation comes. What makes “S” mean anything?",
    shows:
      "A sign that nothing could check is not following a rule; “S” gets a use only when it connects with something public (§§258, 270).",
    source: "pi-258",
    art: "/art/v2/manometer.webp",
    rounds: [
      {
        kind: "diary",
        id: "bb2-0",
        art: "/art/v2/diary.webp",
        situation:
          "You keep a diary of a certain sensation. On day 1 you felt it, concentrated hard, and wrote “S”. Each day after, decide: is today's sensation S again? Then check your diary.",
        days: [
          { shape: 0, gauge: true },
          { shape: 1, gauge: true },
          { shape: 2, gauge: false },
          { shape: 3, gauge: true },
          { shape: 4, gauge: false },
          { shape: 5, gauge: true },
        ],
        point: "With no check, whatever seems right is right, so there is no right; tied to the gauge, “S” has a use (§§258, 270).",
        source: "pi-258",
      },
      {
        id: "bb2-3",
        art: "/art/v2/child.webp",
        situation:
          "A small child falls on the path and cries. A grown-up kneels: “Does it hurt? Where does it hurt?” Soon the child learns to say “It hurts!” instead of only crying.",
        question: "What has the child learned?",
        options: [
          {
            text: "A name for an inner object she found by looking inside herself.",
            right: false,
            reply: "No one could have checked that she named the right thing. She was taught in the open, by people who saw her fall.",
          },
          {
            text: "A new way of expressing pain, in place of crying.",
            right: true,
            reply: "Right. “They teach the child new pain-behaviour” (§244).",
          },
        ],
        point: "Words for sensations can be learned as new expressions of them, not as names of private objects.",
        source: "pi-244",
      },
      {
        id: "bb2-4",
        art: "/art/v2/child.webp",
        situation: "Her father says: “I know she's in pain. Look at her knee.”",
        question: "Can he know that?",
        options: [
          {
            text: "Yes: in the ordinary sense of “know”, people often know when someone is in pain.",
            right: true,
            reply: "Right. “Other people very often know when I am in pain” (§246).",
          },
          {
            text: "No: only she can know her own pain.",
            right: false,
            reply: "That is the picture Wittgenstein questions. In the ordinary use of “know”, her father knows.",
          },
        ],
        point: "Pain is not locked away: others often know, from what we do and say.",
        source: "pi-246",
      },
    ],
  },
];

export { did } from "@/games/choice/types";
