import type { SourceId } from "@/content/sources";

export type Speaker = "rosa" | "tom" | "lena";

export type Option = {
  /** A reply in quotes, or an action. */
  kind: "say" | "do";
  text: string;
  /** Does this response fit what the words were used to do here? */
  fits: boolean;
  /** What happens next: the speaker's reaction. */
  reaction: string;
};

export type CafeRound = {
  id: string;
  speaker: Speaker;
  says: string;
  /** What you can see. The same words get a different job when these change. */
  clues: string[];
  options: Option[];
  /** Asking is always allowed and never costs a mark. */
  ask?: { question: string; answer: string };
  /** The job the words did here, from the list in PI §23. */
  use: string;
  note: string;
};

export type Session = {
  id: string;
  title: string;
  blurb: string;
  english: string;
  source: SourceId;
  rounds: CafeRound[];
};

const say = (text: string, fits: boolean, reaction: string): Option => ({ kind: "say", text, fits, reaction });
const act = (text: string, fits: boolean, reaction: string): Option => ({ kind: "do", text, fits, reaction });

export const SESSIONS: Session[] = [
  {
    id: "cafe-1",
    title: "Same words, new job",
    blurb: "Two visitors say exactly the same thing. Look around before you answer.",
    english: "Indirect requests and complaints: what a sentence is used to do",
    source: "pi-43",
    rounds: [
      {
        id: "c1-1",
        speaker: "rosa",
        says: "It's a bit cold in here.",
        clues: ["The window beside her is wide open.", "Her tea is still steaming."],
        options: [
          act("Close the window.", true, "Oh, thank you, dear. Much better."),
          act("Bring her a fresh hot tea.", false, "Thank you — but this one is still hot. It's the draught, really."),
          say("“Yes, it's November.”", false, "…Yes. It is. (She pulls her cardigan tighter.)"),
        ],
        ask: { question: "Shall I close the window?", answer: "Would you? That would be lovely." },
        use: "a request — made by describing the problem",
        note: "Nothing in the words asks for anything. The open window turned a remark about the temperature into a request.",
      },
      {
        id: "c1-2",
        speaker: "rosa",
        says: "It's a bit cold in here.",
        clues: ["The window is shut.", "Her cup is empty and cold.", "She is looking at the teapot on the counter."],
        options: [
          act("Close the window.", false, "It's already closed, dear."),
          act("Offer her another pot of tea.", true, "Oh, you read my mind. Yes please."),
          say("“Is it? I feel warm.”", false, "Lucky you. (She looks at the teapot again.)"),
        ],
        ask: { question: "Would you like some more tea?", answer: "I thought you'd never ask." },
        use: "a hint — a polite way to ask for more tea",
        note: "The same sentence as before, but a different job. Wittgenstein: “For a large class of cases … the meaning of a word is its use in the language” (PI §43).",
      },
      {
        id: "c1-3",
        speaker: "tom",
        says: "Can you pass the sugar?",
        clues: ["The sugar bowl is next to your hand.", "His coffee is black."],
        options: [
          say("“Yes, I can.”", false, "…Great. Will you?"),
          act("Pass him the sugar.", true, "Thanks!"),
          say("“Sugar is bad for you.”", false, "Noted. The sugar, please?"),
        ],
        use: "a request, shaped like a question about ability",
        note: "'Can you…?' is grammatically a question about ability, but here it does the work of a polite request.",
      },
      {
        id: "c1-4",
        speaker: "tom",
        says: "So — can you pass the test, do you think?",
        clues: ["He is holding your driving-test letter.", "He looks worried for you."],
        options: [
          act("Hand him something.", false, "Er — I didn't want anything."),
          say("“I hope so. I've practised a lot.”", true, "You'll be fine. Good luck tomorrow."),
          say("“Pass it to whom?”", false, "No — I mean, do you think you'll pass?"),
        ],
        use: "a real question — about your chances",
        note: "Same frame, 'Can you pass…?', different game: this time it really is a question, and an answer is what fits.",
      },
      {
        id: "c1-5",
        speaker: "lena",
        says: "Do you know what time it is?",
        clues: ["She keeps glancing at the door.", "The clock behind you says 4:50."],
        options: [
          say("“Yes.”", false, "…And?"),
          say("“It's ten to five.”", true, "Thanks — I'd better run for my bus."),
          say("“Time is a construct.”", false, "My bus isn't. What time is it?"),
        ],
        use: "a request for information",
        note: "A yes/no question in form; a request for the time in use. Answering only 'Yes' follows the grammar and misses the game.",
      },
      {
        id: "c1-6",
        speaker: "lena",
        says: "Do you know what time it is?",
        clues: ["It is long past closing time.", "You are still playing music and chatting.", "She is holding the shop keys."],
        options: [
          say("“It's ten past eleven.”", false, "I know what time it is. That was a hint."),
          act("Say sorry and start packing up.", true, "Thank you. See you tomorrow."),
          say("“No, do you?”", false, "(She shakes the keys.)"),
        ],
        use: "a complaint — a hint that it is time to go",
        note: "The same words as before. Here the speaker knows the time; the words remind you of it. §23 lists giving orders, asking and greeting among many language-games; hinting and complaining are more of the same kind.",
      },
    ],
  },
  {
    id: "cafe-2",
    title: "Which one?",
    blurb: "Sometimes the words are not enough. Ask, point, and agree on what is meant.",
    english: "Clarifying questions: 'Do you mean…?', 'The … one or the … one?', 'The other what, sorry?'",
    source: "pi-23",
    rounds: [
      {
        id: "c2-1",
        speaker: "tom",
        says: "Could I have one of those?",
        clues: [
          "He is pointing at the counter.",
          "On it: a lemon cake and a chocolate cake.",
          "He is allergic to chocolate (he told you when he came in).",
        ],
        options: [
          act("Bring the chocolate cake.", false, "Oh — I can't eat chocolate, remember?"),
          act("Bring the lemon cake.", true, "Perfect, thank you."),
          say("“Yes, you could.”", false, "…Could I have it, then?"),
        ],
        ask: { question: "Do you mean the lemon one or the chocolate one?", answer: "The lemon one, please." },
        use: "a request with a pointing word ('those')",
        note: "'Those' needs the pointing gesture and what you know about him. Words, gestures and shared history work together.",
      },
      {
        id: "c2-2",
        speaker: "rosa",
        says: "I'll have the usual.",
        clues: ["You started work here today.", "Nothing tells you what 'the usual' is."],
        options: [
          act("Guess: bring a coffee.", false, "Coffee? I never drink coffee, dear."),
          say("“Sorry, I'm new — what's your usual?”", true, "Ah, welcome! A pot of mint tea and one ginger biscuit."),
          say("“The usual is unusual today.”", false, "…I'll wait for the manager, dear."),
        ],
        use: "an order that relies on a shared history",
        note: "'The usual' only works inside a practice you share. When you are new to the game, asking is the right move.",
      },
      {
        id: "c2-3",
        speaker: "lena",
        says: "Is this seat free?",
        clues: ["Your coat is on the chair next to you.", "The café is full."],
        options: [
          say("“Yes.” (and do nothing)", false, "(She looks at your coat on it.) …Could you move your coat?"),
          act("Say “Yes, sorry!” and move your coat.", true, "Thanks so much."),
          say("“All seats are free; the coffee isn't.”", false, "Ha. Can I sit, though?"),
        ],
        use: "a request to sit down",
        note: "She is not collecting information about chairs. The question asks permission, and permission here means moving your coat.",
      },
      {
        id: "c2-4",
        speaker: "tom",
        says: "Could you bring me the other one?",
        clues: ["He has a small cup and a large cup in front of him.", "There are two menus on the table."],
        options: [
          act("Bring another menu.", false, "No, not a menu."),
          act("Swap his small cup for a large one.", false, "Not the cup — sorry, I wasn't clear."),
          say("“The other what, sorry?”", true, "Ha — the other spoon. This one's bent."),
        ],
        use: "a request whose object isn't clear",
        note: "Nothing on view settles what 'the other one' means. When the clues run out, the question is the right move — not a guess.",
      },
      {
        id: "c2-5",
        speaker: "rosa",
        says: "That's very kind, but I couldn't possibly.",
        clues: ["You offered her a second slice of cake.", "She is smiling and looking at the cake."],
        options: [
          act("Take the cake away at once.", false, "Oh. (She looks a little sad.)"),
          say("“Are you sure? Just a small piece?”", true, "Well… if you insist. Just a small one."),
          say("“Why not? Are you ill?”", false, "No, no, it's just… never mind."),
        ],
        ask: { question: "Is it too sweet for you?", answer: "No, no, it's lovely. I'm just being polite." },
        use: "a polite refusal that invites a second offer",
        note: "In English a first 'no' usually means no, so check once, lightly, and don't push. Here her smile and her eyes on the cake invite that check. In some cultures a host is expected to insist after a refusal; in English that can feel pushy.",
        // Not universal: in other places and with other people the first no means no.
      },
      {
        id: "c2-6",
        speaker: "rosa",
        says: "That's very kind, but I couldn't possibly.",
        clues: ["You offered her a second slice of cake.", "She has her hand on her stomach.", "Her plate is pushed away."],
        options: [
          say("“Go on — it's on the house.”", false, "Really, dear, no. I'm full."),
          act("Smile and take the plate away.", true, "Thank you. It was delicious."),
          say("“Why not?”", false, "I'm full, dear. Simple as that."),
        ],
        use: "a real refusal",
        note: "The same polite words, but this time they mean no. Look at the situation, not only at the sentence.",
      },
    ],
  },
  {
    id: "cafe-3",
    title: "Excuse me?",
    blurb: "Short, everyday phrases do the most different jobs. Watch who says them, and when.",
    english: "'Would you like to…?', 'I'm fine', 'Excuse me' — offers, instructions, greetings, reassurances and requests",
    source: "pi-23",
    rounds: [
      {
        id: "c3-1",
        speaker: "tom",
        says: "Would you like to wipe the tables before you go?",
        clues: ["Tom is the café manager — your boss.", "It is the end of your shift.", "The tables are covered in crumbs."],
        options: [
          say("“Sure — I'll do them now.”", true, "Thanks. See you tomorrow."),
          say("“No thanks, I'd rather not.”", false, "…It wasn't really a question."),
          say("“Would I like to? Not really.”", false, "(He raises an eyebrow and hands you a cloth.)"),
        ],
        use: "an instruction, politely shaped as a question",
        note: "From a manager at the end of a shift, 'Would you like to…?' is a polite way to tell you what to do. Wittgenstein notes that a question can have the job of a command (PI §21).",
      },
      {
        id: "c3-2",
        speaker: "rosa",
        says: "Would you like to try my lemon cake?",
        clues: ["Rosa baked the cake at home.", "She is holding out a plate with a small slice.", "You have a break."],
        options: [
          say("“Oh, I'd love to — thank you!”", true, "Go on, tell me honestly what you think."),
          act("Start wiping the tables.", false, "(She looks at the plate, then at you.) …It wasn't a job, dear. It's cake."),
          say("“Is that an order?”", false, "An order? No, dear — an offer!"),
        ],
        use: "an offer",
        note: "The same frame as before, 'Would you like to…?', but from a customer holding out cake it is an offer. Saying 'No, thank you' would also have been fine here.",
      },
      {
        id: "c3-3",
        speaker: "lena",
        says: "I'm fine, thanks.",
        clues: ["You just asked her “How are you?” as she came to the counter.", "She is smiling and looking at the menu."],
        options: [
          say("“Good to hear! What can I get you?”", true, "A flat white, please."),
          say("“Are you sure? You can tell me anything.”", false, "Er… I'm sure. Just a coffee, please."),
          act("Bring her a glass of water and a plaster.", false, "…Thanks? I'm really fine."),
        ],
        use: "a greeting ritual, not a medical report",
        note: "'How are you?' — 'Fine, thanks' is part of greeting someone in English. It asks for no details.",
      },
      {
        id: "c3-4",
        speaker: "lena",
        says: "I'm fine, thanks.",
        clues: ["She has just tripped over a bag and dropped her cup.", "She is holding her ankle.", "Her face is pale."],
        options: [
          say("“Good to hear! What can I get you?”", false, "(It clearly hurts.) …Nothing right now."),
          say("“Are you sure? Sit down a moment — I'll get you some ice.”", true, "Actually… yes. Thank you. That would help."),
          act("Start sweeping up the cup and say nothing.", false, "(She limps to a chair on her own.)"),
        ],
        use: "a brave reassurance — not to be taken at its word",
        note: "Same words, different situation. After a fall, 'I'm fine' often means 'I don't want to make a fuss'. A kind reply checks and offers help.",
      },
      {
        id: "c3-5",
        speaker: "tom",
        says: "Excuse me.",
        clues: ["Tom is carrying a heavy tray.", "Your chair is blocking the narrow way to the kitchen."],
        options: [
          say("“You're excused.”", false, "…Could you move, please?"),
          act("Pull your chair in to let him pass.", true, "Thanks!"),
          say("“What for? You didn't do anything.”", false, "No — I need to get past."),
        ],
        use: "a request to get past",
        note: "Here 'Excuse me' asks you to make room. It is not an apology for anything.",
      },
      {
        id: "c3-6",
        speaker: "lena",
        says: "Excuse me?",
        clues: [
          "You just told her quietly that the card machine is broken.",
          "The coffee grinder was very loud.",
          "She is leaning towards you, frowning.",
        ],
        options: [
          act("Pull your chair in.", false, "No, I mean — what did you say?"),
          say("“Sorry — I said the card machine is broken. Cash only today.”", true, "Ah, OK. I've got cash."),
          say("“You're excused.”", false, "…I didn't hear you."),
        ],
        use: "a request to repeat",
        note: "With a rising voice, 'Excuse me?' means 'I didn't hear — please say it again'. 'Sorry?' and 'Pardon?' do the same job and are more usual in Britain. Said sharply, 'Excuse me?!' can mean 'How rude!'. And 'Excuse me!' after you bump into someone is an apology.",
      },
    ],
  },
  {
    id: "cafe-4",
    title: "Sorry, thanks, no problem",
    blurb: "'Sorry!' isn't always an apology, and 'Thank you!' can mean 'That's enough'. Look before you answer.",
    english: "'Sorry', 'Thank you', 'Never mind', 'Go ahead' and 'No problem' — apologies, thanks, requests and permission",
    source: "pi-23",
    rounds: [
      {
        id: "c4-1",
        speaker: "lena",
        says: "Sorry!",
        clues: [
          "Lena is standing right next to your table, with a big bag on her shoulder.",
          "Your cup is lying on its side in a puddle of coffee.",
          "She has one hand over her mouth.",
        ],
        options: [
          act("Pull your chair in so she can get past.", false, "Oh — no, I'm not trying to get past. My bag knocked your coffee over!"),
          say("“No problem — I'd nearly finished it anyway.”", true, "That's kind of you. Let me get you some napkins, at least."),
          say("“You're welcome!”", false, "(She looks puzzled.) …No, I'm saying sorry. I knocked your coffee over!"),
        ],
        use: "an apology",
        note: "Her bag knocked your cup over, so 'Sorry!' is an apology. 'No problem', 'That's OK' and 'Don't worry' all accept an apology; 'You're welcome' answers 'Thank you', not 'Sorry'.",
      },
      {
        id: "c4-2",
        speaker: "tom",
        says: "Sorry!",
        clues: [
          "Tom has a coffee in one hand and a plate of toast in the other.",
          "Your shopping bags are on the floor, blocking the narrow way between the tables.",
          "Past your bags, the table by the window is free.",
        ],
        options: [
          say("“No problem — don't worry!”", false, "(He waits, holding his plate.) …Could you move your bags, please?"),
          act("Get up and offer him your seat.", false, "Oh — no, stay there! I just need to get past to the window table."),
          act("Say “Oh, sorry!” and move your bags.", true, "Thanks! (He squeezes past to the window table.)"),
        ],
        ask: { question: "Do you want to get past?", answer: "Yes, please — I'm going to the window table." },
        use: "a request to get past, not an apology",
        note: "The same word as before, but nobody has done anything wrong. With his hands full and your bags in the way, 'Sorry!' asks you to make room, as 'Excuse me' can. Wittgenstein: “Five slabs” can be a report or an order — what makes the difference is the part it plays in the language-game (PI §21).",
      },
      {
        id: "c4-3",
        speaker: "rosa",
        says: "Thank you!",
        clues: [
          "You are holding the café door open.",
          "Rosa is coming in from the rain, with a heavy bag in each hand.",
          "She is only halfway through the door.",
        ],
        options: [
          act("Keep holding the door and say “No problem!”", true, "You're very kind. There — I'm in."),
          act("Let go of the door.", false, "(The door swings against her bags.) Oh! I wasn't quite through."),
          say("“Bye! Have a nice day!”", false, "Bye? I've only just come in, dear!"),
        ],
        use: "thanking someone for a favour that isn't finished yet",
        note: "Rosa thanks you while she is still in the doorway: thanks often comes before the favour is over, so keep holding the door. 'No problem' and 'You're welcome' are both good answers. Thanking is on Wittgenstein's own list of language-games, next to asking, cursing, greeting and praying (PI §23).",
      },
      {
        id: "c4-4",
        speaker: "lena",
        says: "Thank you!",
        clues: [
          "You are pouring milk into Lena's coffee from a small jug.",
          "Her cup is nearly full.",
          "She is holding up her hand, palm towards you.",
        ],
        options: [
          say("“My pleasure!” (and keep pouring)", false, "(The coffee runs over into the saucer.) Oh — I meant that's enough!"),
          act("Stop pouring.", true, "Perfect, thanks. Just how I like it."),
          act("Hand her the jug.", false, "Oh — I don't need the jug. I meant that's enough milk!"),
        ],
        ask: { question: "Is that enough?", answer: "Yes — that's perfect, thanks." },
        use: "a polite way to say 'stop — that's enough'",
        note: "The same words as at the door, but a different job. While someone is pouring or serving, 'Thank you!' often means 'That's enough' — and her raised hand says so too. If you are pouring for someone, 'Say when!' asks them to tell you when to stop.",
      },
      {
        id: "c4-5",
        speaker: "tom",
        says: "Never mind!",
        clues: [
          "You are looking through a box of lost things: gloves, scarves, an umbrella.",
          "Tom is holding up his keys and smiling.",
          "His bag is open on the table, with everything spread out.",
        ],
        options: [
          say("“Don't worry — I'm sure they'll turn up.”", false, "They already have — look! They were in my pocket."),
          act("Keep looking through the box.", false, "No need — look, I've found them! (He waves the keys at you.)"),
          act("Smile and put the box away.", true, "Sorry for the trouble — and thanks anyway!"),
        ],
        ask: { question: "Have you found them?", answer: "Yes — they were in my pocket all along. Sorry!" },
        use: "calling off a request — he found his keys himself",
        note: "'Never mind' often takes back a request: he has found his keys, so you can stop looking. After a small accident, the same words comfort someone: 'Never mind — it's only a cup.'",
      },
      {
        id: "c4-6",
        speaker: "rosa",
        says: "Go ahead.",
        clues: [
          "Your phone is ringing on the table.",
          "A fresh slice of cake is waiting in front of you.",
          "Rosa is pointing at your phone.",
        ],
        options: [
          act("Answer it: “Sorry — I'll be quick.”", true, "Take your time. I'll keep an eye on your cake."),
          act("Start eating your cake.", false, "(The phone keeps ringing.) Your phone, dear! It might be important."),
          say("“So, as I was saying…”", false, "(The phone keeps ringing.) Answer it — I don't mind!"),
        ],
        ask: { question: "Do you mind if I answer it?", answer: "Not at all. Go on." },
        use: "permission to answer your phone",
        note: "'Go ahead' gives permission, and what it allows depends on what is in view: she is pointing at your phone, not at your cake. With food on the table, the same words can mean 'Start eating'; when two people start talking at once, they mean 'You speak first'.",
      },
    ],
  },
];
