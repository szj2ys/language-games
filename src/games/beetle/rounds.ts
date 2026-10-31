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
        id: "bb1-1",
        art: "/art/v2/beetle-friends.webp",
        situation:
          "Four friends each have a box with something in it. They call it a “beetle”. No one can look into anyone else's box. Ana says: “My beetle is bigger than yours.”",
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
        id: "bb1-2",
        art: "/art/v2/beetle-friends.webp",
        situation: "Ben puts his box on the table and says: “I've brought my beetle.”",
        question: "Can the others check what Ben has done?",
        options: [
          {
            text: "Yes: they can see him put the box on the table.",
            right: true,
            reply: "Right. The box and what Ben does with it are in plain view.",
          },
          {
            text: "No: everything about beetles is private.",
            right: false,
            reply: "Only the inside of the box is hidden. The box, and what Ben says and does, are public.",
          },
        ],
        point: "What people say and do with their boxes is public, and can be checked.",
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
        id: "bb1-4",
        art: "/art/v2/beetle-friends.webp",
        situation:
          "The friends talk all evening. “My beetle is quiet today.” “So is mine.” “Keep your beetle safe on the train.” They ask, answer, joke and agree. Nobody misunderstands anybody.",
        question: "Did they need to see inside the boxes for this to work?",
        options: [
          {
            text: "No: the talk worked without anyone looking.",
            right: true,
            reply: "Right. Everything they did with the word happened in the open.",
          },
          {
            text: "Yes: otherwise they are not really talking about anything.",
            right: false,
            reply: "They asked, answered and agreed all evening, and nothing went wrong. What would “really” add?",
          },
        ],
        point: "The word did its work in what the friends said and did, not by pointing into the boxes.",
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
        id: "bb2-1",
        art: "/art/v2/diary.webp",
        situation:
          "You keep a diary about a certain sensation. Each time it comes, you write “S”. You cannot describe it in words, so as you write you concentrate on it hard, pointing to it inwardly.",
        question: "Have you now fixed what “S” means?",
        options: [
          {
            text: "Yes: I pointed to the sensation inwardly.",
            right: false,
            reply:
              "Nothing would show that next time you use “S” in the same way. Whatever seems right will be right, so there is no right at all.",
          },
          {
            text: "No: nothing could show that I use “S” the same way next time.",
            right: true,
            reply: "Right. “I have no criterion of correctness” (§258).",
          },
        ],
        point: "Without any check, “whatever is going to seem right to me is right”, and so there is no right.",
        source: "pi-258",
      },
      {
        id: "bb2-2",
        art: "/art/v2/diary.webp",
        situation: "A week later the sensation comes again, or seems to. You want to be sure it really is S.",
        question: "How could you check?",
        options: [
          {
            text: "Remember what S felt like last time, and compare.",
            right: false,
            reply: "That checks your memory against itself, like buying a second copy of the morning paper to check the first (§265).",
          },
          {
            text: "There is nothing independent to check it against.",
            right: true,
            reply: "Right. A check has to be able to come out against you.",
          },
        ],
        point: "Checking a memory against the same memory is not a check.",
        source: "pi-265",
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
      {
        id: "bb2-5",
        art: "/art/v2/manometer.webp",
        situation:
          "Back to your diary. A doctor fits a blood-pressure gauge. It turns out that whenever you write “S”, the needle has risen.",
        question: "Does “S” have a use now?",
        options: [
          {
            text: "Yes: “S” now tells you your blood pressure is rising, without the gauge.",
            right: true,
            reply: "Right. And now “it seems quite indifferent whether I have recognized the sensation right or not” (§270).",
          },
          {
            text: "No: it is still about something private, so it means nothing.",
            right: false,
            reply: "Now there is something others can check “S” against. That is what gives it a use.",
          },
        ],
        point: "Tied to something others can check, “S” has a use; the private object does no work.",
        source: "pi-270",
      },
    ],
  },
];

export { did } from "@/games/choice/types";
