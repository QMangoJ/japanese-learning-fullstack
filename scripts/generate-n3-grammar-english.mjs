import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DATA = path.join(ROOT, "public", "data");
const WEEK_TITLE_EN = [
  "I have to stick at it",
  "Give it a try!",
  "I would like you try harder!",
  "I just have to hang in there!",
  "I wish I had worked harder!",
  "I\u2019ve decided to stick at it!",
];

/*
 * English printed in the N3 grammar source. The PDF is image-only, so the
 * missing English layer was transcribed from the English column and checked
 * against the Japanese examples. Existing English in grammar.json always wins.
 */
const BOOK_EN = {
  w1d1: {
    usage: [
      "When you mention a fact without a subject, the passive form is often used.",
      "Showing a difficult situation as a result of something.",
      "Expression used when asking for permission from the other person.",
    ],
  },
  w1d2: {
    usage: [
      "A shortened form of Vないといけない / Vなければならない (must + verb).",
      "A conversational form of Vてしまう.",
      "A conversational form of Vておく.",
    ],
  },
  w1d3: {
    usage: [
      "More conversational than ～ようだ.",
      "To show that something truly has the qualities associated with it or is appropriate for it.",
      "To mean 'looks like ~' or 'has the feel of ~.' It is also often used negatively.",
    ],
  },
  w1d4: {
    usage: [
      "To show habits and intention (effort).",
      "To mean 'with the aim of bringing about that state.'",
      "To show that a new state has come about.",
    ],
  },
  w1d5: {
    usage: [
      "Used when introducing an explanation.",
      "To indicate a mild command or request.",
      "To indicate a hope or wish.",
    ],
  },
  w1d6: {
    usage: [
      "To show one's will or plan.",
      "To show the exact moment when someone is about to begin an action.",
      "To show that no intention to take the action can be perceived.",
    ],
  },
  w2d1: {
    dialog: "\u201cYou are all I need. I don\u2019t need anything else.\u201d \u201cYou must be kidding!\u201d",
    usage: [
      "To mean 'only ~' or 'always doing only ~.'",
      "To emphasize 'only ~.'",
      "An emphatic way of saying '~ too / even ~.'",
      "To add emphasis.",
    ],
    examples: [
      "There are only female customers in this store.",
      "My brother spends his entire time watching TV.",
      "My son just plays around and doesn\u2019t work.",
      "This concert is open only to the members.",
      "We had only one customer today.",
      "I can\u2019t even write hiragana, so of course I can\u2019t write kanji characters.",
      "Even children know that.",
      "I will definitely study tomorrow!",
      "The reason I get so angry is because I care so much about you.",
    ],
  },
  w2d2: {
    dialog: "I will inform you about the current traffic situation in the Tokyo area. Currently there are no traffic jams due to accidents and other conditions.",
    usage: [
      "To mean 'in relation to ~ / regarding ~.'",
      "To mean 'regarding ~.'",
      "To indicate the source of information.",
      "To express a method, cause, or case.",
    ],
    examples: [
      "Do you have any suggestions regarding this problem?",
      "I read a research paper on the topic of agriculture.",
      "To study Japanese culture.",
      "To read the \u201cExamination Instructions.\u201d",
      "According to the weather forecast, it looks like tomorrow will be sunny.",
      "According to the news flash on TV, the earthquake just now had a strength of 3.",
      "Through his effort, he conquered his illness.",
      "Opinions differ depending on the person.",
      "The typhoon blew the roof away.",
    ],
  },
  w2d3: {
    dialog: "I think of you every day, but I am too shy to tell you how I feel.",
    usage: [
      "A noun form used to indicate a characteristic or feeling, and its degree.",
      "A noun form used to indicate a condition or nature, or being in that state.",
      "To mean 'about ~' or 'the fact that ~.'",
      "To turn a sentence into a noun phrase.",
    ],
    examples: [
      "I have the same bag in a different size.",
      "We must teach young children how important life is.",
      "Even though the war is over, the suffering of this country still continues.",
      "Tanaka-san\u2019s strength is that he can speak two languages.",
      "I have a question about the test next week.",
      "Do you know that Tanaka-san has been hospitalized?",
      "I completely forgot to call Tanaka-san.",
      "I don\u2019t like going to crowded places on Sundays.",
    ],
  },
  w2d4: {
    dialog: "\u201cSho-ene\u201d is a shortened form of \u201cenergy saving\u201d (sh\u014d enerug\u012b).",
    usage: [
      "Used when introducing a person\u2019s name or the name of something.",
      "To explain the meaning of a word or expression.",
      "To convert a sentence into a noun clause and use it as the subject or object.",
    ],
    examples: [
      "There was a call from a person named Kimura-san a little while ago.",
      "This is a Japanese musical instrument called the \u201cshakuhachi.\u201d",
      "You don\u2019t need to pay. It is free.",
      "\u201cDejikame\u201d is a short form for \u201cdigital camera.\u201d",
      "\u201cWhat does 'kakutei' mean when talking about a train?\u201d \u201cIt means a train that stops at every station.\u201d",
      "I was surprised to hear that Lin-san was going back to his home country.",
      "You are late so often that it has become a problem.",
      "I didn\u2019t know that Tanaka-san was a doctor.",
    ],
  },
  w2d5: {
    dialog: "She is an actress, but she is not famous. Rather than beautiful, she is cute.",
    usage: [
      "To mean 'rather than ~, it is more accurate to say ....'",
      "Used when saying what a particular word or subject brings to mind.",
      "To mean 'it is not really something that can be called ~.'",
    ],
    examples: [
      "The car in front is moving more than slowly. It\u2019s crawling.",
      "It was cold rather than cool today.",
      "Rather than not being able to do it, the student doesn\u2019t want to try.",
      "When you say \u201cKyoto,\u201d you imagine temples.",
      "I think sushi is the most famous Japanese food.",
      "When you talk about summer fruits, watermelon comes to mind.",
      "I went on a trip last weekend, but I only went to a nearby hot spring.",
      "This week I\u2019m busy, but not as much as last week.",
    ],
  },
  w2d6: {
    dialog: "\u201cThis is good. You should try it.\u201d \u201cMy doctor has told me not to eat sweets.\u201d",
    usage: [
      "Used when telling a subordinate or younger person to try something.",
      "To report a command or request indirectly.",
      "Even though the imperative form is used, the sentence as a whole does not sound rough.",
      "To report the content of a request indirectly.",
    ],
    examples: [
      "If you don\u2019t understand, you should ask your teacher.",
      "Why don\u2019t you try again?",
      "Please tell Tanaka-san to come to my room.",
      "My wife has told me not to smoke in the house.",
      "The doctor told me not to drink.",
      "My teacher told me to study more.",
      "My father told me to start coming home earlier.",
      "My friend asked me for Tanaka-san\u2019s phone number.",
      "My landlord told me not to put my bicycle in front of the entrance.",
    ],
  },
  w3d1: {
    dialog: "\u201cI don\u2019t care how cheap it is. I am not buying it.\u201d \u201cEveryone leaves without buying anything. Why?\u201d",
    usage: [
      "To mean 'although ~' or 'even when ~.'",
      "To mean 'although one does ~ many times / a great deal' or 'even when one does ~ many times / a great deal.'",
      "To mean 'without doing ~.'",
    ],
    examples: [
      "I couldn\u2019t understand it even after looking it up, so I asked the teacher.",
      "I need it, so I\u2019ll buy it even if it\u2019s expensive.",
      "\u201cSorry. The black ones are all gone.\u201d \u201cI don\u2019t mind if it is not black.\u201d",
      "I\u2019ve started taking guitar lessons, but I\u2019m not getting any better no matter how much I practice.",
      "My face doesn\u2019t go red no matter how much I drink.",
      "No matter how hot it is when I go to bed, I turn off the air-conditioner.",
      "I do not have much confidence since I wrote it without using a dictionary.",
      "I went to bed without brushing my teeth last night.",
    ],
  },
  w3d2: {
    dialog: "\u201cIsn\u2019t it a dog?\u201d \u201cIt is too big for a dog. A bear? If it\u2019s a bear, we\u2019re in trouble!\u201d",
    usage: [
      "To mean 'in the position or role of ~.'",
      "To mean 'to an extent that does not seem typical of ~.' It expresses surprise.",
      "To mean 'even if it is ~ / I understand that it is ~, but even so ....'",
      "To mean 'if ~ / in the event that ~.'",
    ],
    examples: [
      "He is a foreigner, but he participates in games as a representative of Japan.",
      "As a woman and as an actress, she is the best, but as a wife, I wonder.",
      "For a foreigner, his Japanese is very good.",
      "You did well considering it was your first time.",
      "You washed it? It doesn\u2019t look clean, though.",
      "Even at 100 yen, I think this is expensive.",
      "I\u2019ve heard that Tanaka-san would be late, but he is really late.",
      "If that story is true, I will be happy.",
      "If we go by airplane, how much would it cost?",
    ],
  },
  w3d3: {
    dialog: "\u201cI was planning to study, but....\u201d \u201cYou should turn off the TV. You can\u2019t possibly do well on tomorrow\u2019s test.\u201d",
    usage: [
      "To show that someone planned to do something but did not actually do it.",
      "To mean 'I am sure that ~.' はずがない is a strong negation.",
      "To mean 'should / must ~.'",
      "Used when recalling something from the past.",
    ],
    examples: [
      "I was planning to go shopping yesterday, but I stayed home because of a headache.",
      "I was not going to eat snacks, but I ate them anyway.",
      "Tanaka-san can\u2019t be home, as he is travelling now.",
      "Tanaka-san is a very honest person, so he would not take leave without informing us.",
      "Promises should be kept.",
      "Safety should come first for toys.",
      "When I was a child, I used to play by the river.",
      "When I was a student, I used to go to the library every day.",
    ],
  },
  w3d4: {
    dialog: "\u201cAre you going out? Will you do this for me while you\u2019re out?\u201d \u201cYou ask me a favor every time I see you.\u201d",
    usage: [
      "To mean 'since you are going to ~, do it then' or 'since you had business to do ~, do it then.'",
      "To mean 'whenever ~.'",
      "To mean 'the moment ~ / as soon as ~.'",
      "To mean 'right in the middle of doing ~.'",
    ],
    examples: [
      "Since you are going for a walk, will you mail this letter for me?",
      "Since I was at the post office, I bought a postcard.",
      "I end up with lots of bags every time I go shopping.",
      "Every time I hear this song, it reminds me of my hometown.",
      "The moment I opened the window, a strong wind came in.",
      "As soon as I drank the alcohol, my face turned red.",
      "A guest came right in the middle of our meal.",
      "My mobile phone rang right in the middle of the meeting.",
    ],
  },
  w3d5: {
    dialog: "New Year\u2019s Day all alone: \u201cI\u2019m so lonely....\u201d New Year\u2019s Day with just the two of us: \u201cWhat fun!\u201d",
    usage: [
      "To mean 'in the same way as ~.'",
      "To show that a state remains unchanged.",
      "To mean 'left in the state of ~.'",
      "A noun plus a word indicating a small number; it means 'only ~.'",
    ],
    examples: [
      "I got lost even though I followed the map my friend drew for me.",
      "It started to snow. It was just as the forecast said.",
      "The test was difficult, just as the teacher said.",
      "I fell asleep with the TV on.",
      "This vegetable tastes good even when eaten raw.",
      "I left the window open when I came out.",
      "Please don\u2019t leave the water running.",
      "I\u2019d like to have a private talk with just the two of us.",
      "I\u2019ve met him only once.",
    ],
  },
  w3d6: {
    dialog: "I pretended that I understood, but I didn\u2019t really understand, so I would like you to explain it to me.",
    usage: [
      "Used when describing a third person\u2019s emotions or wishes as observed from the outside.",
      "To express something the speaker wants another person to do.",
      "To mean 'to make it appear that ~.'",
    ],
    examples: [
      "Please don\u2019t be afraid.",
      "Please don\u2019t be shy and come up here.",
      "Tanaka-san said he\u2019d like to see you.",
      "Excuse me. Could I see your textbook?",
      "I have something I would like you to explain to me.",
      "He pretends to know about it, but I don\u2019t think he really does.",
      "Tanaka-san looks like a single guy, but in fact he is married with three children.",
    ],
  },
  w4d1: {
    dialog: "How can you think of putting on make-up when you\u2019re just a kid!",
    usage: [
      "To mean 'in the case of ~ / from the standpoint of ~.'",
      "To mean 'to an extent that does not seem typical of ~.' It expresses surprise.",
      "To mean 'although ~.' It expresses blame or criticism.",
      "To emphasize surprise or a negative feeling. A negative expression often follows.",
    ],
    examples: [
      "What is the most important thing to you?",
      "For the people around here, cars are a necessity.",
      "He looks young for his age.",
      "Even though you say you have no money, you buy a lot, don\u2019t you?",
      "Even though he knows, he won\u2019t tell me.",
      "Even though he\u2019s healthy, he pretends he is sick.",
      "You must not wear make-up.",
      "I hate things like natto.",
      "\u201cAre you crying?\u201d \u201cI\u2019m not crying!\u201d",
      "There is no way that I can give a speech in Japanese.",
    ],
  },
  w4d2: {
    dialog: "The picnic was cancelled, so we relaxed at home instead. Was that thanks to the rain, or because of the rain?",
    usage: [
      "Used for a good result from the speaker\u2019s point of view.",
      "Used for a bad result from the speaker\u2019s point of view.",
      "To mean 'instead of ~ / without doing ~, doing this instead.'",
      "To mean 'instead of ~, acting as that person\u2019s substitute.'",
    ],
    examples: [
      "Thanks to my teacher, I passed the exam.",
      "My Japanese improved as a result of coming to Japan.",
      "I missed my appointment because the bus was late.",
      "Perhaps it\u2019s because I am tired, but my head hurts.",
      "Since I am driving, I will have juice instead of beer.",
      "I took the day off today in exchange for working on Sunday.",
      "Please allow me to say a few words on behalf of my division manager, who is currently on a business trip.",
      "Soccer has become popular in place of baseball.",
    ],
  },
  w4d3: {
    dialog: "There is no one as beautiful as you! The more I look at you, the more beautiful you seem!",
    usage: [
      "To show an approximate degree: 'about ~.'",
      "To mean 'the more ~, the more ....'",
      "To mean 'the more one does ~, the more ....'",
      "To mean '~ is the most ....'",
    ],
    examples: [
      "It\u2019s about the size of a grain of rice.",
      "This detergent removes dirt surprisingly well.",
      "I ate so much that I don\u2019t want to see any more food.",
      "Young people seem to oversleep more.",
      "Traditional items have more value if they are older.",
      "The more I get to know him, the better I like him.",
      "The less baggage you have, the better.",
      "There is no one as friendly as her.",
      "It has snowed more this year than in any other year.",
    ],
  },
  w4d4: {
    dialog: "Don\u2019t worry about it. I hear it\u2019s not so difficult. I think you should just try it.",
    usage: [
      "To mean 'there is no need to ~.'",
      "To report something heard from someone; similar to ～そうだ. Imperative and volitional forms can also be used.",
      "Used when giving advice; similar to ～ほうがいい.",
      "To emphasize that the degree is very great.",
    ],
    examples: [
      "There is no need for you to apologize.",
      "You don\u2019t need to come. Just send it by post.",
      "Tanaka-san called and said he would be a little late.",
      "You should keep warm, relax, and rest.",
      "Don\u2019t push yourself too hard.",
      "How happy would I be if I passed!",
      "How many times have I warned you?",
    ],
  },
  w4d5: {
    dialog: "What was that again? Who was it again? When was it? Where was it? I forgot. I have no choice but to ask.",
    usage: [
      "To mean 'If I remember correctly, ~?' Used to ask someone to confirm something you cannot recall.",
      "To mean 'there is nothing else to do / one has no choice but to ~.'",
      "A conversational form of hearsay ～そうだ. Women often use ～ですって.",
      "A conversational expression used to give a reason.",
    ],
    examples: [
      "You said that you were going back to your country next week, didn\u2019t you?",
      "Did I tell you about tomorrow\u2019s party?",
      "You must keep trying until you get it.",
      "I had no choice but to buy a new one since it couldn\u2019t be fixed.",
      "\u201cI just found out Tanaka-san is married!\u201d \u201cIs that so? I didn\u2019t know.\u201d",
      "The test will cover from the beginning of the textbook through page 50.",
      "\u201cWhy didn\u2019t you eat it?\u201d \u201cBecause it tastes awful.\u201d",
      "I didn\u2019t do well on the test today. I can\u2019t complain because I didn\u2019t study much.",
    ],
  },
  w4d6: {
    dialog: "\u201cWell, I don\u2019t think we can continue to get along because our personalities are incompatible.\u201d \u201cYou mean you no longer love me.\u201d",
    usage: [
      "Used when rephrasing something.",
      "To mean 'therefore.' It follows a reason or purpose and states the result.",
      "To mean 'after doing ~, this was the result.'",
      "Used when stating a reason or cause afterward.",
    ],
    examples: [
      "My father\u2019s older brother, in other words my uncle, is a doctor.",
      "Tanaka-san doesn\u2019t have a cell phone or a PC. In other words, we can\u2019t contact him by email.",
      "It looks like there was an accident at the next station. The train is delayed because of that.",
      "I am planning to study abroad. I am saving money by working part-time.",
      "My father worked so much harder than anyone else. As a result, he succeeded in his career.",
      "I continued to diet for three months. As a result, I lost five kilograms.",
      "I am going back home next week to attend my best friend\u2019s wedding.",
      "I changed schools because there was no class available at my level.",
    ],
  },
  w5d1: {
    dialog: "Not only children but adults are into comics, and men read them more than women.",
    usage: [
      "To mean 'N1 as a matter of course, and N2 as well.'",
      "To mean 'not only ~, but also ....'",
      "To mean 'compared with ~ / than ~.'",
      "To express a target, like 'toward ~,' or a contrast, like 'in contrast to ~.'",
    ],
    examples: [
      "He is not only a good student, he is a good athlete as well.",
      "Cabbage tastes good not only saut\u00e9ed in a pan, but also raw.",
      "That restaurant\u2019s service is terrible, let alone its food.",
      "I can\u2019t write hiragana, let alone kanji.",
      "Compared to last year, the questions this year are easier.",
      "Ordering from a catalogue is more convenient than shopping in a store, but there are drawbacks.",
      "Tanaka-sensei is strict with his students.",
      "In contrast to my hardworking eldest son, my second son plays around and often plays hooky.",
    ],
  },
  w5d2: {
    dialog: "\u201cThe rice has just finished cooking.\u201d \u201cFreshly cooked rice tastes really good, doesn\u2019t it?\u201d \u201cHey, you shouldn\u2019t get up before you\u2019re finished eating.\u201d",
    usage: [
      "To mean that the work has been completed in full.",
      "To show that something has all been used or finished, with nothing left.",
      "To mean 'in the middle of doing ~ / just about to do ~.'",
      "To mean 'freshly done / just after doing ~.'",
    ],
    examples: [
      "I finally finished my paper.",
      "The cake is just out of the oven.",
      "I can\u2019t finish the rice because there is so much.",
      "I finished reading a long novel in two days.",
      "I haven\u2019t finished the book.",
      "The phone rang when I was about to get in the bath.",
      "Freshly baked bread is really good.",
      "That grocery store sells very fresh, just-picked vegetables.",
    ],
  },
  w5d3: {
    dialog: "\u201cI hope I passed. But I may have failed because I don\u2019t think I did well....\u201d \u201cOh, I wish I had studied harder.\u201d",
    usage: [
      "To indicate a hope or wish.",
      "To express regret.",
      "To express disappointment or regret about someone else\u2019s action.",
      "To express a wish or a feeling of wondering.",
    ],
    examples: [
      "I wish I could speak Japanese better.",
      "I hope it won\u2019t rain tomorrow.",
      "I am late. I wish I had left home much earlier.",
      "I should not have said such a thing to Tanaka-san.",
      "I had a good time at the party. You should have come.",
      "I could buy it if it were cheaper.",
      "I hope the bus will come soon.",
      "I wonder if the lab experiment will go well.",
      "I wonder if we can see Mt. Fuji today.",
    ],
  },
  w5d4: {
    dialog: "\u201cI heard it\u2019s going to snow from tonight through tomorrow morning.\u201d \u201cWow! We can play in the snow tomorrow!\u201d Even the cat is happy.",
    usage: [
      "To mean 'continuously until the time when ~.'",
      "To give an extreme example and express surprise that something goes even that far.",
      "To mean 'from ~ through ~.'",
      "A slightly more formal expression than で.",
    ],
    examples: [
      "The movie won\u2019t start for half an hour.",
      "I will wait until I hear from you.",
      "You can even eat the bones in this fish.",
      "Even you don\u2019t trust me?",
      "Tomorrow, it will rain from noon through late afternoon.",
      "The rainy season has begun from Kyushu through Honshu.",
      "An international conference took place in Osaka.",
      "The result will be announced on the homepage.",
    ],
  },
  w5d5: {
    dialog: "\u201cEven if it is expensive, I want it, so I\u2019ll buy it.\u201d It looks real, but it may possibly be a fake.",
    usage: [
      "To mean 'even if ~.'",
      "To mean 'there is a possibility that ~.'",
      "To mean 'it cannot always be said that ~; sometimes it is not ~.'",
      "To mean 'just like ~.'",
    ],
    examples: [
      "Even if I am opposed, I will study abroad.",
      "Even if I am not well, in a letter to my family I will write that I am well.",
      "What he said may possibly be a lie.",
      "I may not be able to come tomorrow.",
      "Rich people are not necessarily happy.",
      "Expensive things are not necessarily good things.",
      "I passed! It is just like a dream.",
      "His Japanese is so natural that he sounds like a native speaker.",
    ],
  },
  w5d6: {
    dialog: "\u201cWelcome home. It rained all day, so you must have been cold, right?\u201d \u201cYeah, it was snowing a little while ago.\u201d \u201cReally? By the way, how was today\u2019s exam?\u201d",
    usage: [
      "To mean 'but / however.' It introduces something contrary to what came before.",
      "A polite way of saying だから ('therefore').",
      "To show that the result was different from what was expected.",
      "Used when changing the subject.",
    ],
    examples: [
      "I love to go travelling, but I have no time.",
      "I often go to a karaoke bar, but I am not a good singer.",
      "The weather forecast says it will rain this afternoon. Therefore, you\u2019d better take an umbrella with you.",
      "I will be leaving on a trip tomorrow. Therefore, I\u2019m sorry that I won\u2019t be able to attend next week\u2019s party.",
      "I was planning to go to the concert last night, but I couldn\u2019t go because I felt sick.",
      "I thought Tanaka-san was younger, but he is actually five years older than I am.",
      "The exam is tomorrow, right? Good luck. By the way, will you be free next Monday?",
      "The year is almost over. By the way, do you have any plans for the New Year?",
    ],
  },
  w6d1: {
    dialog: "\u201cIf it weren\u2019t me, I don\u2019t think this job would have succeeded.\u201d \u201cI think it would have succeeded even if it hadn\u2019t been you....\u201d",
    usage: [
      "Contrary to reality, to imagine what would have happened if that had been the case.",
      "Often used when the possibility of the condition being realized is low.",
      "An emphatic form of もし ('if').",
    ],
    examples: [
      "I would have passed the exam if I had taken it.",
      "If he had not been the president, the company would have gone bankrupt.",
      "If I had not gone to study abroad, I probably would be married by now.",
      "Even if I get a holiday, I don\u2019t think I will go on a trip.",
      "Even if I had lots of money, I wouldn\u2019t buy such things.",
      "Even though they made it to the final, it will be difficult to win the championship.",
      "If I were born again, I\u2019d like to be a boy.",
      "This house won\u2019t collapse in a big earthquake because it is well built.",
    ],
  },
  w6d2: {
    dialog: "I can speak Japanese, but only at the daily-conversation level. I\u2019ve decided to go to school in order to improve.",
    usage: [
      "To mean that something has been decided or is established as a rule or schedule.",
      "To show a decision made by oneself. ～ことにしている can also describe a habit.",
      "To mean 'I do not deny that ~, but ....'",
      "A double-negative expression meaning that it is fair to say the action does occur.",
    ],
    examples: [
      "There is a meeting planned for tomorrow to discuss a new project.",
      "I will be moving to the Osaka office soon.",
      "I make it a rule to jog for half an hour every morning.",
      "\u201cOh, you are not going shopping?\u201d \u201cNo. I decided to go tomorrow instead.\u201d",
      "I can play the piano, but not that well.",
      "You may think this bag is expensive, but it is very easy to use.",
      "I eat chicken, but I don\u2019t like it very much.",
      "\u201cWe can still make it if we run. Let\u2019s hurry!\u201d",
    ],
  },
  w6d3: {
    dialog: "\u201cI must get home while the trains are still running.\u201d \u201cI almost missed the train.\u201d",
    usage: [
      "To mean 'when I tried doing ~.' A result follows.",
      "To mean 'it almost happened, but it did not.'",
      "To mean 'only when / after doing ~ for the first time.'",
      "To mean 'while ~ / before ~.'",
    ],
    examples: [
      "I asked the teacher about the coming test and was told that it would cover up to Chapter 10.",
      "I went to see a dentist because I had a toothache, and I was told I had a bad cavity.",
      "I was almost late.",
      "I almost passed the entrance exam.",
      "I didn\u2019t notice the mistake in kanji until the teacher pointed it out.",
      "I didn\u2019t have any interest in Japanese culture until I saw kabuki.",
      "You must come home before dark.",
      "I learned the lyrics by heart by listening to them many times.",
      "I will make a quick note before I forget.",
    ],
  },
  w6d4: {
    dialog: "\u201cNo wonder it is difficult. There is no way that I can do it in the beginner\u2019s class.\u201d \u201cIt is a difficult problem, but if you try hard, it is not impossible.\u201d",
    usage: [
      "To mean 'it is only natural that ~.' It shows that the speaker now understands the reason.",
      "A partial negation meaning 'it is not particularly the case that ~, but ....'",
      "To mean 'there is no possibility that ~ / I am certain that ~ will not happen.'",
      "To mean 'one cannot allow oneself to ~ / it is not possible to ~.'",
    ],
    examples: [
      "No wonder it feels hot. It is 36\u00b0C.",
      "\u201cIt looks like Tanaka-san got dumped by his girlfriend.\u201d \u201cI see. No wonder he looks unhappy.\u201d",
      "It\u2019s not that I hate it, but I don\u2019t eat very much meat.",
      "I wouldn\u2019t say I don\u2019t watch TV, but I spend more time listening to music.",
      "It\u2019s impossible for me to beat such a strong opponent.",
      "\u201cIsn\u2019t this bread too old?\u201d \u201cIt can\u2019t be old. I just bought it yesterday.\u201d",
      "I can\u2019t afford to be absent because I have a very important meeting.",
      "I cannot refuse to obey because it is an order from the president.",
    ],
  },
  w6d5: {
    dialog: "I rarely go to drinking parties. I can\u2019t drink at all, so it is no fun at all when I cannot drink.",
    usage: [
      "To mean 'absolutely not ~.'",
      "To mean 'not at all ~.'",
      "To show that something happens very infrequently.",
      "To emphasize a negative statement.",
    ],
    examples: [
      "I\u2019ll never give up my dream.",
      "\u201cI would never lie to you,\u201d he said.",
      "I can\u2019t swim at all.",
      "I have no idea why he is so angry.",
      "There will be very few chances like this.",
      "I can hardly take time off because I am so busy.",
      "I can\u2019t understand his English at all.",
      "I don\u2019t care about my figure at all.",
    ],
  },
  w6d6: {
    dialog: "\u201cHi! Which hat would you like? I\u2019ll give you the one you like. This one or that one?\u201d \u201cThanks, but... (Not only do they both have a weird shape, they\u2019re both too big.)\u201d",
    usage: [
      "To be used when adding one thing (b) to another (a).",
      "To connect question sentences.",
      "To be used when adding something to the preceding sentence.",
    ],
    examples: [
      "I\u2019d like to have one head of lettuce, three tomatoes, and one bag of green peppers.",
      "I\u2019ve done what I was told to do. What else can I do?",
      "\u201cAre we expecting any more people today?\u201d \u201cI think Tanaka-san is coming.\u201d",
      "Would you like coffee or tea?",
      "Shall we do it next week? Or the week after next?",
      "Do we need to discuss this, or is it OK for me to make the decision myself?",
      "Not only is the food in this restaurant good, it is very cheap.",
      "Not only is he very bright, he is good at all sports.",
    ],
  },
};

/* English translations for the daily exercises that were added by this site. */
const DAILY_EN = {
  w1d1: [
    "English is spoken throughout the world.",
    "This building was built three hundred years ago.",
    "An employee suddenly quit on me.",
    "Let me think about that a little longer.",
    "I have a fever today, so please let me take the day off.",
    "The Olympic Games are held once every four years.",
    "Would you allow me to interview you about your impression of Japan?",
  ],
  w1d2: [
    "Oh, the bus has left.",
    "\u201cShall I turn off the computer?\u201d \u201cI\u2019m still using it, so leave it on.\u201d",
    "Oh, I have to return the library book.",
    "Please read this by next week.",
    "Oh no, I got caught in the rain.",
    "Even though I thought I had to get up, I fell asleep again.",
    "I got up early and made a boxed lunch in advance, but I left it at home.",
  ],
  w1d3: [
    "Although it is winter, it is warm today and feels like spring.",
    "My mother always wears childish clothes.",
    "The car that fled was blackish.",
    "I took the exam, but it looks as though passing will be impossible.",
    "I want my child to grow up healthy and energetic, like a child should.",
    "What I am about to tell you is a true story that sounds like a lie.",
    "Tomorrow will probably be sunny, with weather typical of autumn.",
  ],
  w1d4: [
    "Let\u2019s close the window so that the wind does not come in.",
    "For my health, I make a habit of eating vegetables.",
    "I am studying hard so that I can get into university.",
    "I want to become able to speak Japanese like a Japanese person.",
    "This intercom is designed so that you can find out who came while you were away.",
    "I make a habit of gargling and washing my hands so that I do not get influenza.",
    "Most electrical appliances are covered so that, if they break within a year, you can have them repaired free of charge.",
  ],
  w1d5: [
    "If you are going to be late, make sure to contact us.",
    "I hope I can find a good job.",
    "Please revise it as follows.",
    "As is currently being advertised on television and elsewhere, a new model of this product will go on sale soon.",
    "It is snowing, so please be careful not to fall when you go out.",
    "I hope everyone will enjoy the song I wrote.",
    "As I always say, do not push yourself too hard.",
  ],
  w1d6: [
    "Just as I was about to take a bath, someone came.",
    "My father will not say anything about it.",
    "No matter how hard I try to open the lid of this jam jar, it will not open.",
    "A: \u201cYou did not come to class yesterday.\u201d B: \u201cNo. I had intended to come, but I got a fever and took the day off.\u201d",
    "I forgot to bring the note I had written because I intended to buy the items on it.",
    "I am thinking of buying my younger brother a CD he likes for his birthday.",
  ],
  w2d1: [
    "I am so busy that I do not even have time to eat lunch.",
    "Our cat does nothing but sleep.",
    "In this class, make sure to use only Japanese.",
    "Lin-san can read kanji that even Japanese people cannot read.",
    "If you do nothing but work so much, you will damage your health.",
    "My friend said that the job is interesting precisely because it is difficult.",
    "There are some things that I cannot tell even my family.",
  ],
  w2d2: [
    "We will resolve the problem through discussion.",
    "According to this magazine, that shop is apparently good.",
    "I have something I would like to ask about this newspaper article.",
    "The way the news is reported differs depending on the newspaper.",
    "Through the efforts of the residents, the town became clean.",
    "The damage caused by the typhoon is spreading further.",
    "I am looking for a book about the history of this town.",
  ],
  w2d3: [
    "The films he makes are filled with kindness.",
    "Please do not say something so unreasonable.",
    "Every work has its own merits.",
    "I like watching sports, but....",
    "This letter reflects the seriousness of the person who wrote it.",
    "I like coffee with a slight bitterness.",
    "Did you hear about tomorrow\u2019s test?",
  ],
  w2d4: [
    "Kinen means that smoking is prohibited.",
    "Baito means arubaito, or a part-time job.",
    "This is a Japanese heater called a kotatsu.",
    "I am interested in traditional Japanese things such as tatami mats and shoji screens.",
    "What I said about leaving the company was a joke.",
    "This shop is open every day of the year; in other words, it has no days off.",
  ],
  w2d5: [
    "Although I say we have a garden, it is very small.",
    "My son\u2019s room is more like a rubbish bin than a room.",
    "Speaking of representative Japanese dishes, I suppose sushi and tempura come to mind.",
    "His rude attitude left me more exasperated than angry.",
    "When you think of mountains in Japan, you think of Mt. Fuji.",
    "Speaking of animals that children like, I suppose elephants come to mind.",
    "\u201cDo you have a headache?\u201d \u201cNo, it feels heavy rather than painful.\u201d",
  ],
  w2d6: [
    "The doctor warned me not to smoke too much.",
    "I was told to come to the office by eight tomorrow.",
    "Please tell Tanaka-san not to push himself too hard.",
    "I was asked to make fifty copies of this document.",
    "Whether you can do it or not, just give it a try.",
    "I was told not to tell anyone about this.",
    "\u201cWhat does that mean?\u201d \u201cIt means: if you drink, do not drive; if you are going to drive, do not drink.\u201d",
  ],
  w3d1: [
    "Tanaka-san\u2019s room is tidy whenever I visit.",
    "I decided to study abroad without consulting my family.",
    "Even if mobile phones are convenient, I do not use one.",
    "No matter how difficult it became, the runner did not give up. (runner)",
    "If you do not arrive by the appointed time, we will leave without waiting.",
    "No matter how I think about it, what she is saying is strange.",
    "For my health, I make a point of walking instead of travelling by car.",
  ],
  w3d2: [
    "Considering that he has never been to Japan, he knows Japan very well.",
    "As your friend, there is some advice I would like to give you.",
    "The train is always crowded at this time, but even so, it is far too crowded today. I wonder if something happened.",
    "If I had not come to Japan, I think I would have gone to the United States.",
    "Sweets are ideal as souvenirs for a company or similar workplace.",
    "If he really did such a thing, what could his reason have been?",
    "If you keep a pet, I want you to take responsibility as its owner.",
  ],
  w3d3: [
    "I used to go to concerts often.",
    "You should not do things that cause trouble for other people.",
    "I intended to put the letter in the postbox, but I forgot.",
    "Tanaka-san is always eating chocolate, so there is no way he dislikes it.",
    "I think an elementary-school teacher should, first of all, like children.",
    "In the past, my father used to scold me, but now it is the other way around.",
    "I had intended not to go to the party because I had something to do, but I have become able to go.",
  ],
  w3d4: [
    "While I was talking on the phone, another phone rang.",
    "Your child gets bigger every time I see them.",
    "The moment I stood up, I felt dizzy.",
    "Our neighbour brings us a souvenir every time they travel.",
    "I will be going nearby tomorrow, so I will deliver the item you left behind while I am there.",
    "She lost her voice while she was singing on a television programme.",
    "\u201cDo you have a timetable?\u201d \u201cNo, but I will pick one up for you while I am at the station.\u201d",
  ],
  w3d5: [
    "Please write exactly as I am about to say.",
    "Please come in with your shoes on.",
    "The television has been left on. Please turn it off when you are not watching it.",
    "Live your one and only life with care.",
    "My younger sister sleeps with the light on.",
    "Do not leave the clothes you took off lying around; put them away.",
    "Was Japan just as the guidebook described it?",
  ],
  w3d6: [
    "My older brother was very disappointed that he could not come.",
    "A sales call came in, so I pretended to be ill and hung up.",
    "I would like many people to use this book.",
    "I want you not to forget Japanese even after you return to your country.",
    "My parents are feeling lonely, so I will return home during spring break.",
    "I am not confident that I can do it, so I would like you not to expect too much.",
    "A letter has arrived from the person you want to see.",
  ],
  w4d1: [
    "For something this inexpensive, it tastes quite good.",
    "I do not want to go anywhere like karaoke.",
    "Although he is a man, he looks like a woman.",
    "Cigarette smoke and odour are painful for people who do not smoke.",
    "Considering that I did not study for the test, I did quite well.",
    "Although that student gets good marks on tests, his Japanese is not understood.",
    "Although he actually likes it, he says he hates it.",
  ],
  w4d2: [
    "\u201cIt finally rained.\u201d \u201cYes. Thanks to this rain, the crops will probably recover.\u201d",
    "Please allow me to say a few words of thanks on behalf of my father.",
    "I was late for our appointment because of an accident.",
    "Is it true that in your country people drink beer instead of water?",
    "DVDs came to be used in place of videotapes.",
    "Thanks to being examined by a good doctor, I recovered from my illness.",
    "In return for my friend helping me move, I treated them to dinner.",
  ],
  w4d3: [
    "The more I read this book, the more interesting it becomes.",
    "A baby so big that it is surprising.",
    "The fresher vegetables are, the better they taste.",
    "A: \u201cHow much did you practise?\u201d B: \u201cSo much that my hands hurt.\u201d",
    "There is no one as serious as that person.",
    "The closer and more convenient a house or apartment is to a station, the more expensive it is.",
    "I think there is no language as beautiful as French.",
  ],
  w4d4: [
    "There is no need to hurry. Taking your time is fine.",
    "It is impossible to do everything at once. You should study a little every day.",
    "You were late. You have no idea how worried I was.",
    "I hear that there was an earthquake in Tokyo yesterday.",
    "There is no need to buy it. I will lend it to you.",
    "Kinen means that smoking is prohibited.",
    "A little alcohol is not bad for your health. The important thing is not to drink too much.",
  ],
  w4d5: [
    "\u201cI find that shop assistant difficult to deal with. They are frightening, you see.\u201d",
    "A: \u201cWas she always that beautiful?\u201d B: \u201cI heard she got engaged.\u201d",
    "Both buses and trains have stopped, so we have no choice but to walk.",
    "A: \u201cIt is very lively here.\u201d B: \u201cBut I hear it is quiet at night.\u201d",
    "Was January always this warm?",
    "My father eats only food made by my mother.",
    "\u201cIt is unusual to see you angry.\u201d \u201cBecause someone said something extremely rude to me.\u201d",
  ],
  w4d6: [
    "I hardly studied. As a result, I failed the entrance examination.",
    "Next week I have a business trip, this week I have to prepare for it, and today I have meetings all day. In short, I will be busy for a while.",
    "His heart had always been weak. For that reason, it seems the shock of hearing that news caused his sudden death.",
    "Although I want to quit my job, I cannot, because I have a mortgage. (loan)",
    "He is a veterinarian; in other words, a doctor for animals.",
    "No matter how hard things became, he did not give up. As a result, a great invention like this was born.",
    "She is my older sister\u2019s daughter; in other words, she is my niece.",
  ],
  w5d1: [
    "Male animals are often more colourful and beautiful than females.",
    "My hometown is not only inconvenient but also bitterly cold.",
    "That shop is crowded not only on holidays but also on ordinary days.",
    "His animated works can be enjoyed not only by children but by adults as well.",
    "Most people who use this shop during the day are housewives. In contrast, most evening customers are office workers.",
    "The station attendant explained to the passengers why the train was delayed.",
    "My new mobile phone is stylish and attractive, but compared with my old one, which was easy to use, it is difficult to use.",
  ],
  w5d2: [
    "He started to say something and then stopped.",
    "Freshly cooked rice is delicious.",
    "The work that took a long time to make has finally been completed.",
    "If you cannot fit everything in the space there, please use the back as well.",
    "My older sister finished knitting a scarf for a present in a single night.",
    "My mother told me to use up the one I had already started before buying a new one.",
    "The section chief is exhausted from training employees who have just joined the company.",
  ],
  w5d3: [
    "My younger sister\u2019s shoes are too tight for me to get my feet into. If they were a little bigger, I could wear them.",
    "I wonder which team won yesterday\u2019s game.",
    "Tomorrow is the fireworks festival, so I hope it does not rain.",
    "Last night\u2019s programme was interesting. You should have watched it too.",
    "Whenever I leave home, I worry afterward about whether I turned off the gas.",
    "There is no point in thinking, after something has already been done, that you should not have done it.",
    "A friend told me, \u201cI wish I could play sports as well as you.\u201d",
  ],
  w5d4: [
    "I decided that I would never give up until I passed.",
    "I gave my mother a massage. She was extremely stiff from her neck down to her shoulders.",
    "I want somehow to master Japanese by the time I return to my country.",
    "I understand that you are busy, but are you going to work even through the New Year holiday?",
    "An emergency drill will be held at the elementary school. Please participate.",
    "Because of the heavy rain, even the inside of my bag got wet.",
    "I hear that pollen is in the air from February through April.",
  ],
  w5d5: [
    "The person sitting over there may possibly be famous.",
    "Even if the salary is high, I do not want a job like that.",
    "What I heard was a true story that sounded just like a lie.",
    "The Japanese spoken by Japanese people is not necessarily all correct.",
    "Those two look so alike that they are just like brothers.",
    "Even if my parents oppose it, I will marry her.",
    "What parents and teachers say is not necessarily correct.",
  ],
  w5d6: [
    "He is extremely intelligent. However, he was unable to enter university.",
    "\u201cYou will graduate soon. By the way, what are you going to do about finding a job?\u201d",
    "Everyone thought he would win. However, he lost easily.",
    "\u201cThis semester ends tomorrow. By the way, have you paid next semester\u2019s tuition?\u201d",
    "I do not like vegetables, but I eat them because they are good for me.",
    "You cannot enter after the event has begun. Therefore, please make absolutely sure not to be late.",
    "I definitely sent it by post. However, I was told that it had not arrived.",
  ],
  w6d1: [
    "If I had been on that plane, I would probably be dead.",
    "Even if I receive a job offer from that company, I do not intend to join it.",
    "Why are you doing such a thing? If I were you, I would never do it.",
    "If you do not study, you will not pass no matter how many times you take the test.",
    "In an emergency, please open this drawer and read my letter.",
    "What would you do if the Earth were to disappear tomorrow?",
    "Insurance is something you obtain in preparation for an emergency.",
  ],
  w6d2: [
    "I will be at home tomorrow, but I have to work from home.",
    "It has suddenly been decided that I will return to my country.",
    "To avoid gaining weight, I make it a rule not to eat after nine at night.",
    "It is not that I cannot drive, but I almost never do.",
    "Mobile phones are certainly convenient, but I think I would be fine without one.",
    "In Japan, vehicles are required to drive on the left side of the road.",
    "It is not impossible to live on this income, but it is difficult financially.",
  ],
  w6d3: [
    "I would like to return to the countryside once while my grandmother is still well.",
    "When I asked the station attendant, I learned that the lost item had been handed in.",
    "I have made tea, so please drink it before it gets cold.",
    "I nearly fell down the stairs.",
    "It was only after I began studying with that teacher that learning Japanese became interesting.",
    "I had almost finished all the exam questions when time ran out.",
    "You should study while there are still people who will teach and correct you.",
  ],
  w6d4: [
    "So construction was taking place here. No wonder there is a traffic jam.",
    "It is not that I was asleep; I was thinking about something else.",
    "Because it is a rule, we cannot allow anyone who is more than thirty minutes late to take the exam.",
    "There is no way that someone who lies all the time will be trusted by everyone.",
    "Oh, there was a grain of rice stuck to my face. No wonder everyone was giggling at me.",
    "A student who could not possibly fail ended up failing the exam.",
    "May I open the window a little? It is not because it is hot; I want to let in some fresh air.",
  ],
  w6d5: [
    "Things are so difficult right now that I cannot think about the future at all.",
    "Even though I am dieting by reducing how much I eat, I have not lost any weight at all.",
    "Thank you for all your help. I will never forget how kindly you treated me.",
    "I walked for hours yesterday, but I am not tired at all.",
    "She is strong and hardly ever gets sick, but apparently she has caught influenza.",
    "I cannot understand what he says at all.",
    "I am happy that a teacher who rarely praises anyone praised me.",
  ],
  w6d6: [
    "Have you written your name? Also, please remember to write your ID number.",
    "Shall we go by subway, or shall we take JR?",
    "Please clean, do the laundry, go shopping, and then cook.",
    "I hear that he is handsome, sings well, and is intelligent on top of that.",
    "This is Day 6 of Week 6, so after one more day of study, you will have finished this book.",
    "Tanaka-san is late. Is the train delayed, or is he feeling unwell? I wonder what happened.",
    "I am looking for a new part-time job. My current one is far away, and on top of that, they do not pay my travel expenses.",
  ],
};

/* English translations for the six weekly review tests, in question order. */
const WEEKLY_EN = {
  w1: [
    "Could you let me park my car here for just thirty minutes?",
    "Why will you not try to correct your faults?",
    "Just as I was about to talk a little longer, the call was disconnected.",
    "As you can see from this graph, the population is decreasing.",
    "I am saving money so that I can buy a new car.",
    "Please style my hair like the hairstyle in this photograph.",
    "If you do not take proper care of the goldfish, they will die.",
    "We are going to run out of time. I have to get ready quickly!",
    "Who is a Japanese person who is well known in your country?",
    "I tried to take a shower, but no water came out.",
    "Fold the origami according to the diagram.",
    "Try to use the Japanese you have learned right away.",
    "This milk is a little weak and tastes watery.",
    "If you are not going to watch television, turn it off and leave it off.",
    "You are in the way standing there, so go over there.",
    "The cars manufactured here are exported to many countries.",
    "That student seems to have become cheerful since becoming able to understand Japanese.",
    "I wrote a note in advance so that I would not forget, but then I lost the note.",
    "This child talks like an adult and does not seem like a child at all.",
    "At the sale, the shirt I had intended to buy was bought by someone else.",
    "I tried to move farther inside the train carriage, but I could not get through.",
    "This was because the people standing by the doors would not move.",
    "After I said, \u201cPlease let me through,\u201d I finally managed to squeeze inside.",
    "When the train is crowded, it is difficult to get off even if you want to, so that may be why people stand near the doors.",
    "However, people who are about to board should also be considered, and passengers should move as far inside as possible.",
  ],
  w2: [
    "Only adults are allowed to enter this club.",
    "My grandfather always gets my name wrong.",
    "Please direct enquiries about products here.",
    "I knew it was cold there, but I never imagined it would be forty degrees below zero.",
    "She has never even made tea, so there is no way she can cook.",
    "I like watching baseball and soccer.",
    "The doctor told me to chew my food slowly and thoroughly.",
    "Do not remain silent; say what you want to say.",
    "The advantage of this washing machine is that it is quiet.",
    "Manager, please tell the residents upstairs not to make noise late at night.",
    "I like blue. By blue, however, I mean a deep shade of blue.",
    "According to the precautions, this medicine may make you drowsy.",
    "As a result of this accident, delays are occurring on all lines.",
    "We will not know what tomorrow holds until tomorrow comes. Perhaps life is meaningful precisely because we do not know.",
    "This elementary school is open to local residents. In this way, the whole community watches over and raises the children together.",
    "Only one of the teachers can speak French.",
    "His claim that he had seen a UFO was a lie.",
    "I forgot to remind the students to bring dictionaries.",
    "I was warned not to turn the television up too loud late at night.",
    "This earthquake will not cause a tsunami, so there is no need to worry.",
    "When people think of dogs, some may feel that keeping one is simply troublesome.",
    "However, that is not the whole story. Dogs can work too.",
    "Although I call it work, it is only something simple such as fetching the newspaper.",
    "Rather than work, it probably looks more like play.",
    "That may be true of ordinary dogs, but there are also excellent working dogs that truly assist people with visual or hearing impairments.",
  ],
  w3: [
    "That child\u2019s shoes make a sound with every step. How cute.",
    "I cannot stop what I am doing right now. Could we talk later?",
    "You have never jumped before, yet you jump very well.",
    "Travelling now is not realistic. If I were to go, it would have to be after I had saved enough money.",
    "The moment I opened the box, a mouse ran out.",
    "The characters a teacher writes on the board should be neat.",
    "No matter how many times I hear that person\u2019s name, I cannot remember it.",
    "I used to live by the sea, so I often collected shells and things like that.",
    "He walked through the rain without an umbrella.",
    "While he was taking a shower, he washed his shirt as well.",
    "As your friend, I would like to warn you.",
    "I got off the train with my luggage still on the luggage rack.",
    "Oh no, I left the gas burner on in the kitchen.",
    "So your Japanese is good because you have lived in Japan for ten years. Even so, it is indistinguishable from a native Japanese person\u2019s.",
    "He returned to his country yesterday, so he should no longer be in Japan.",
    "There is no way he does not know; he is only pretending not to know.",
    "Although I intended to stay awake and study until morning, I fell asleep.",
    "Please do not speak to me while I am counting.",
    "Although I should have done it exactly as I was taught, I did not do it well.",
    "Now that the children have grown up and left home, only my spouse and I live together.",
    "Recently, my wife has become afraid of crossing intersections.",
    "This is because more and more cars do not stop where they are supposed to.",
    "In addition, I get angry every time I drive.",
    "Some cars turn immediately after switching on their indicator; it is dangerous if the car behind is not paying attention.",
    "I want drivers to observe rules and manners strictly.",
  ],
  w4: [
    "When my friend stayed at my home, I had him sleep on the sofa instead of the bed.",
    "Thanks to your giving me a ride, I caught the train.",
    "Even if it is meant as a joke, the person it is said to may be hurt. Therefore, it is better not to say to others what you would not want to hear yourself.",
    "Although this cake costs only 100 yen, it tastes quite good.",
    "It rained so heavily that the river overflowed and houses were washed away.",
    "As the saying goes, the weaker a dog is, the more it barks.",
    "The washing machine broke, so I have no choice but to wash the clothes by hand.",
    "Was it coffee or tea that you liked?",
    "I heard from the teacher that the examination format will change next year.",
    "I wonder how many years it will take to complete that building.",
    "Nothing makes me happier than seeing students steadily remember what I have taught them.",
    "If you cannot do it, you should not say that you can.",
    "Leaving the body aside, the mind seems to become sharper the more it is used.",
    "You can try hard again next time. There is no need to be disappointed.",
    "The weather is so nice that I do not want to stay home and work.",
    "For a teacher, the greatest joy is the growth of the students.",
    "Since coming to Japan alone, I cannot say how much loneliness I have endured.",
    "I hear that wars are still continuing in many places around the world.",
    "Mobile phones and computers allow people to be contacted at any time; as a result, they cannot get away from work.",
    "\u201cHow long are you going to keep playing games?\u201d \u201cBut it is so interesting that I cannot stop.\u201d",
    "People everywhere are discussing how to protect farmland from wild animals because vegetables and fruit are being eaten by them, causing serious problems.",
    "In the past, the mountains had many nuts and berries\u2014in other words, food for wild animals.",
    "Changes in the climate and in how people manage the mountains and forests have reduced that food.",
    "As a result, the animals began to come down from the mountains in search of the food they needed.",
    "Consequently, the amount of abandoned farmland is increasing, making it easier for animals to enter the fields.",
  ],
  w5: [
    "This year\u2019s cherry blossoms are said to have opened a week earlier than usual.",
    "Even if someone offered me money, I would not want to do anything wrong.",
    "There are countless stars in the night sky.",
    "The shops introduced in magazines are not necessarily all good.",
    "Recently, not only women but men have also begun wearing make-up.",
    "I cannot remember. I should have taken notes.",
    "The entrance ceremony will be held in the gymnasium.",
    "I practised writing kanji until my hand hurt.",
    "Someone I did not know spoke to me as though we were friends.",
    "It says, \u201cWet paint. Please be careful.\u201d",
    "I hope the snow melts soon and spring comes quickly.",
    "Being praised makes you happy even when the praise is not sincere.",
    "Her manner of speaking is polite; in contrast, her behaviour is not very polite.",
    "Are you leaving already? I wish you would stay a little longer.",
    "This product is not only high in quality but also reasonably priced.",
    "Snow is expected on the Sea of Japan side from Hokkaido through Kyushu.",
    "That actress said she likes yellow and even wears yellow underwear.",
    "I stopped halfway through writing a letter to my family.",
    "This material is excellent. I am impressed that you investigated it in such detail.",
    "Tanaka-sensei called. He said he might be a little late because of traffic congestion.",
    "Chibi means \u201csmall,\u201d but the neighbour\u2019s dog Chibi is very large. Everyone laughs when he hears his name and comes running, swaying his heavy body.",
    "He was very small when they found him, so they named him Chibi. However, he was well cared for, ate a lot, slept well, and as a result became fat.",
    "People now say, \u201cHis name is Chibi, but he keeps getting bigger and is practically a bear.\u201d",
    "He has grown so large that he is practically a bear.",
    "By the way, my name is Yukiko, but because I like tennis, I am deeply tanned. People say that names reflect their owners, but apparently that is not always true.",
  ],
  w6: [
    "At my daughter\u2019s school, students are not allowed to bring mobile phones to school.",
    "I almost left home without my boxed lunch.",
    "It is not that I cannot help you, but doing so would not be good for you.",
    "I took the examination and, as a result, passed it.",
    "Let\u2019s go to bed early tonight and get up early to study tomorrow.",
    "I did wake up early, but I went straight back to sleep.",
    "His workplace has absolutely no connection with women.",
    "No matter how much you ask me to forgive him, I cannot forgive him.",
    "I want to take my parents on a trip while they are still healthy.",
    "This is old, so even if it is repaired, I think it will break again immediately.",
    "Her eyesight is poor, so there is no way she can see letters that small from so far away.",
    "When I asked the travel agency, I was able to buy a cheap ticket.",
    "No wonder it is cold. The window is slightly open.",
    "I am terribly sleepy. Let me sleep for another ten minutes.",
    "No matter what happens, you must never open this box.",
    "Would you like your coffee served now, or later?",
    "I failed every company entrance examination I took and ended up taking over my father\u2019s shop.",
    "It was only after listening to a recording of my own Japanese that I realized my pronunciation was poor.",
    "Be sure to come and visit while I am still in Japan.",
    "I did review it, but I still do not completely understand it.",
    "Since then, I have never trusted cars or traffic lights.",
    "The rule I set for myself is never to trust cars or traffic lights.",
    "A car started moving before the light turned green, saying, \u201cYou can go now.\u201d",
    "Why can they not wait just one more minute, or even thirty seconds?",
    "I cannot understand it at all.",
  ],
};

function fail(message) {
  throw new Error(message);
}

function mergeBookEnglish(grammar) {
  const seen = new Set();
  for (const week of grammar.weeks) {
    week.title_en = WEEK_TITLE_EN[week.n - 1];
    const weeklyTest = week.days.find((entry) => entry.day === 7);
    if (weeklyTest) weeklyTest.title_en = "Weekly test";
    for (const day of week.days.filter((entry) => entry.day < 7)) {
      const key = `w${week.n}d${day.day}`;
      const source = BOOK_EN[key];
      if (!source) fail(`Missing BOOK_EN.${key}`);
      seen.add(key);
      if (source.dialog && day.dialog && !day.dialog.en) day.dialog.en = source.dialog;
      if (source.usage.length !== day.points.length) {
        fail(`${key}: expected ${day.points.length} usage strings, got ${source.usage.length}`);
      }
      let exampleIndex = 0;
      for (let pointIndex = 0; pointIndex < day.points.length; pointIndex += 1) {
        const point = day.points[pointIndex];
        // The old import had several usage-English fields shifted to the wrong
        // grammar point, so this checked list is authoritative for every point.
        point.usage_en = source.usage[pointIndex];
        for (const example of point.examples || []) {
          if (!example.en) {
            if (!source.examples?.[exampleIndex]) fail(`${key}: missing example ${exampleIndex + 1}`);
            example.en = source.examples[exampleIndex];
          }
          exampleIndex += 1;
        }
      }
      const expectedExamples = day.points.reduce((total, point) => total + (point.examples || []).length, 0);
      if (source.examples && source.examples.length !== expectedExamples) {
        fail(`${key}: expected ${expectedExamples} example strings, got ${source.examples.length}`);
      }
    }
  }
  if (seen.size !== Object.keys(BOOK_EN).length) fail("BOOK_EN contains an unknown day key");
}

function mergeDailyEnglish(daily) {
  const keys = Object.keys(daily);
  for (const key of keys) {
    const section = daily[key];
    const translations = DAILY_EN[key];
    if (!translations) fail(`Missing DAILY_EN.${key}`);
    if (translations.length !== section.items.length) {
      fail(`${key}: expected ${section.items.length} daily translations, got ${translations.length}`);
    }
    section.items.forEach((item, index) => {
      item.translation_en = translations[index];
    });
  }
  if (keys.length !== Object.keys(DAILY_EN).length) fail("DAILY_EN contains an unknown day key");
}

function mergeWeeklyEnglish(weekly) {
  for (const [weekKey, sections] of Object.entries(weekly)) {
    const translations = WEEKLY_EN[weekKey];
    if (!translations) fail(`Missing WEEKLY_EN.${weekKey}`);
    const items = ["mondai1", "mondai2", "mondai3"].flatMap((section) => sections[section] || []);
    if (translations.length !== items.length) {
      fail(`${weekKey}: expected ${items.length} weekly translations, got ${translations.length}`);
    }
    items.forEach((item, index) => {
      item.trans_en = translations[index];
      if (Array.isArray(item.why)) {
        item.why = item.why.map((text) =>
          /放入本句后，接续、活用形式或语义不符合题意|接续和句意都成立/.test(text) ? "" : text,
        );
      }
    });
  }
  if (Object.keys(weekly).length !== Object.keys(WEEKLY_EN).length) {
    fail("WEEKLY_EN contains an unknown week key");
  }
}

const grammarPath = path.join(DATA, "grammar.d15be04258.json");
const grammar = JSON.parse(fs.readFileSync(grammarPath, "utf8"));
mergeBookEnglish(grammar);
fs.writeFileSync(grammarPath, `${JSON.stringify(grammar)}\n`);

const dailyPath = path.join(DATA, "n3-grammar-daily-explanations.json");
const daily = JSON.parse(fs.readFileSync(dailyPath, "utf8"));
mergeDailyEnglish(daily);
fs.writeFileSync(dailyPath, `${JSON.stringify(daily, null, 2)}\n`);

const weeklyPath = path.join(DATA, "n3-grammar-explanations.json");
const weekly = JSON.parse(fs.readFileSync(weeklyPath, "utf8"));
mergeWeeklyEnglish(weekly);
fs.writeFileSync(weeklyPath, `${JSON.stringify(weekly, null, 2)}\n`);

console.log("Generated and validated N3 grammar English data.");
