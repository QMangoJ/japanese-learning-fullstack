import { readdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const sibling = resolve(root, "..", "日语学习");

const BOOK_EN = {
	w1d1: {
		usage: [
			"Looks ~ / has an air of ~.",
			"Tends to ~ / is prone to ~.",
			"Has a strong tendency to ~.",
			"A little ~ / slightly ~.",
		],
		examples: [
			"That person has a lonely look in their eyes.",
			"He looked as if he wanted to say something.",
			"I was often ill as a child.",
			"Lately he has been taking a lot of time off work.",
			"As you get older, you become forgetful.",
			"This coat has a nice design, but the fabric looks cheap.",
			"I've been a bit tired from working overtime every day.",
			"The new employees looked a little nervous.",
		],
	},
	w1d2: {
		usage: [
			"If only I could ~ (though it is hard to do).",
			"Because ~ (used to justify or explain).",
			"Because ~ (often used by women and children).",
			"Although ~ (mostly written).",
		],
		examples: [
			"If I could go back, I would go home right now.",
			"If you can do it, go ahead and try.",
			"May I take off my jacket? It's a bit hot.",
			"Sorry I'm late — the road was jammed.",
			"I didn't go to the party. I didn't even know about it.",
			"It can't be helped — they're still a child.",
			"I have a driver's license, but I almost never drive.",
			"I applied, but I haven't decided whether to take the exam.",
			"It's spring, but it's still cold.",
		],
	},
	w1d3: {
		usage: [
			"Not only N, but also ~ (formal).",
			"N1 aside, N2 is …",
			"N would still be acceptable, but beyond that is not.",
			"Leaving ~ out / without ~.",
		],
		examples: [
			"We don't even have a bicycle, let alone a car.",
			"Lettuce is good in salad, of course, and it's also good stir-fried.",
			"Never mind how my mother's cooking looks — it tastes great.",
			"That actress aside, her acting is wonderful.",
			"With my English, travel might be okay, but studying abroad is impossible.",
			"Ten or twenty minutes I could wait, but not a whole hour.",
			"Let's leave work talk out of it and just enjoy the drinks.",
			"I'm not flattering you — your Japanese really is good.",
			"We can't start the party without Tanaka-san.",
		],
	},
	w1d4: {
		usage: [
			"So ~ I can hardly stand it (feelings).",
			"So ~ I can't help it (feelings or trouble).",
			"Unbearably ~ (not used for emotions).",
			"Can't help feeling ~ (spontaneous emotion).",
		],
		examples: [
			"I can't stop worrying about my child.",
			"I miss my family terribly.",
			"I've got nothing to do today — I'm bored to death.",
			"That method takes far too much time.",
			"The construction next door is unbearably noisy.",
			"My house is so far from the station that it's terribly inconvenient.",
			"I can't tell you how sorry I am to miss my best friend's wedding.",
			"I can't stop worrying about the test results.",
		],
	},
	w1d5: {
		usage: [
			"It isn't that I don't ~.",
			"It isn't impossible to ~.",
			"Can't help doing ~.",
			"Can't help doing ~ (formal).",
		],
		examples: [
			"It isn't that I don't eat it — I just don't like it much.",
			"Quitting drinking or smoking is hard, but it isn't impossible.",
			"If it's only four or five kanji a day, it isn't impossible to remember them.",
			"I can understand why people leave that company.",
			"I couldn't help complaining to the rude clerk.",
			"The construction was so loud I couldn't help covering my ears.",
			"When something unpleasant happens at work, I can't help drinking.",
			"Anyone who sees that film will be moved.",
		],
	},
	w1d6: {
		usage: [
			"Must ~ (formal/written).",
			"Must not ~ (formal/written).",
			"Can't keep ~ing / can't wait.",
			"Can't just keep ~ing.",
		],
		examples: [
			"My visa has expired, so I have to go home.",
			"We must confirm that it is true.",
			"We must never forget this tragic experience.",
			"You must not blame failure on other people.",
			"Tanaka is so late. I can't wait any longer — let's go.",
			"I'm too busy to sit around watching TV.",
			"It's a long weekend, but I have a test soon, so I can't just play.",
			"I can't keep relying on my parents.",
		],
	},
	w2d1: {
		usage: [
			"~ paid off / was worth it.",
			"~ was in vain.",
			"Worth doing ~.",
			"Even going so far as to ~.",
		],
		examples: [
			"My effort paid off and I got into the university I wanted.",
			"It was worth waiting this long — I married a wonderful person.",
			"The operation was in vain; our dog died.",
			"I was cut in the preliminaries, so all that practice was wasted.",
			"A job worth doing.",
			"A student worth teaching.",
			"I can't believe someone would even go into debt to travel abroad.",
			"There's no need to date her if it makes you that miserable.",
			"I don't want to go out badly enough to lie to my parents.",
		],
	},
	w2d2: {
		usage: [
			"Start ~ing / ~ halfway.",
			"~ completely / to the end.",
			"Can / could possibly ~.",
			"~ through to the end.",
		],
		examples: [
			"I have several books I've started and not finished.",
			"She started to say something and then stopped.",
			"When I was a child I almost died of illness.",
			"The novel was so good I finished it in a day.",
			"He looks completely worn out.",
			"Even a professor can make a mistake.",
			"This is all the information I have been able to find.",
			"I have the confidence to see a hard job through.",
			"He didn't give up and ran all the way to the finish.",
		],
	},
	w2d3: {
		usage: [
			"While still ~ / before ~ ends.",
			"Just as ~ / at the same moment.",
			"As long as ~ / judging from ~.",
			"Limited to ~ / not limited to ~.",
		],
		examples: [
			"I'll write it down before I forget.",
			"Let's go blossom-viewing while the cherries are still beautiful.",
			"He left the classroom the moment class ended.",
			"I fall asleep the instant I get into bed.",
			"As long as you're in Japan, you need Japanese.",
			"You won't be healthy unless you change bad habits.",
			"As far as I have checked, nobody has done this research.",
			"Admission is free for people 70 and over.",
			"Lately not only women but men wear makeup too.",
			"It's raining, and today of all days I didn't bring an umbrella.",
			"There's no way our child would do something bad.",
		],
	},
	w2d4: {
		usage: [
			"If only I have ~, that's enough.",
			"Precisely because ~.",
			"Only when ~ / only by ~ing.",
			"Keep ~ing / do nothing but ~.",
		],
		examples: [
			"I bought a phone. With this I don't need a watch or a camera.",
			"If you just take this medicine, you'll get better right away.",
			"I scold them precisely because I love them.",
			"I succeeded precisely because I worked hard.",
			"I warned you strictly precisely because I care about you.",
			"Only when we trust each other can we talk about our worries.",
			"Only when you become a parent do you understand a parent's hardships.",
			"Prices just keep going up.",
			"His fever only got worse.",
			"She's doing nothing but play and not studying at all.",
			"Don't just sit there — help me.",
		],
	},
	w2d5: {
		usage: [
			"From ~'s point of view.",
			"If we assume that ~.",
			"Even if ~.",
			"With ~ as the aim.",
		],
		examples: [
			"From a child's point of view, that rule is hard to accept.",
			"If that's true, we have to change the plan.",
			"Even if I go, I can only stay an hour.",
			"The event is held with social participation as its aim.",
			"If it were me, I wouldn't say that.",
			"Supposing he doesn't come, what shall we do?",
			"Even if it's expensive, I want to buy it.",
			"They started the project for the purpose of regional revival.",
			"I said it with his future in mind.",
		],
	},
	w2d6: {
		usage: [
			"Together with ~.",
			"Along with ~ (as X changes, Y changes).",
			"As ~ / in proportion to ~.",
			"In accordance with ~ / as ~.",
		],
		examples: [
			"I spent the holiday together with my family.",
			"Along with the increase in cars, accidents have increased.",
			"As you get older, you tire more easily.",
			"It gets colder as you go north.",
			"Please come with your parents.",
			"As the economy grew, the cities changed.",
			"Your Japanese will improve as you use it.",
			"Please act in accordance with the rules.",
		],
	},
	w3d1: {
		usage: [
			"Just as ~ / as ~ says.",
			"As ~ / leaving it to ~.",
			"To one's ~ (emotion).",
			"So ~ that … (excessive emotion).",
		],
		examples: [
			"I did it just as you told me.",
			"Please leave it as it is.",
			"To my surprise, he passed.",
			"She was so nervous she couldn't speak.",
			"It went as planned.",
			"Do as you like.",
			"To my disappointment, the shop was closed.",
			"He was so sad he burst into tears.",
			"I was so happy I couldn't sleep.",
		],
	},
	w3d2: {
		usage: [
			"It stands to reason that ~ / that explains ~.",
			"It isn't that I don't ~.",
			"There's no way that ~.",
			"Can't very well ~.",
		],
		examples: [
			"No wonder you're tired — you worked all night.",
			"It isn't that I don't want it.",
			"There's no way he would lie.",
			"I can't very well take the day off now.",
			"So that's why the train was late.",
			"It isn't that I dislike her.",
			"There's no way I can finish this today.",
			"I can't very well refuse after promising.",
		],
	},
	w3d3: {
		usage: [
			"The instant ~.",
			"After ~ing (and the result was bad).",
			"After ~ing at last.",
			"No sooner had ~ than …",
		],
		examples: [
			"The instant I opened the door, a cat ran out.",
			"After making a fuss, he still didn't get what he wanted.",
			"After much worrying, I decided to quit.",
			"No sooner had he come than he left again.",
			"The moment I sat down, the phone rang.",
			"After arguing and arguing, they broke up.",
			"After thinking it over, I chose this school.",
			"I thought she had just arrived, and she was already gone.",
		],
	},
	w3d4: {
		usage: [
			"At a time when you are ~ (polite).",
			"When I ~ (I found that …).",
			"This is no time for ~.",
			"Far from ~ / not just ~ but …",
		],
		examples: [
			"I'm sorry to bother you when you're so busy.",
			"When I had it examined, it turned out to be fine.",
			"This is no time to be talking about work.",
			"Far from a summer holiday, I couldn't even take a day off.",
			"Thank you for coming when you were unwell.",
			"When I asked, nobody knew.",
			"I can't even think about a trip — this is no time for that.",
			"Far from thanking me, he got angry.",
		],
	},
	w3d5: {
		usage: [
			"Full of ~ / covered with ~.",
			"Did ~ and has been that way since.",
			"Kept ~ing the whole time.",
		],
		examples: [
			"This report is full of mistakes.",
			"He went to Japan and I haven't heard from him since.",
			"I was kept standing the whole time.",
			"The room was covered in dust.",
			"She said goodbye and I haven't seen her since.",
			"I worked on my feet all day.",
			"His clothes were covered in mud.",
		],
	},
	w3d6: {
		usage: [
			"Contrary to ~.",
			"On the one hand ~, on the other …",
			"While ~ / at the same time ~.",
			"Keep ~ing more and more.",
		],
		examples: [
			"Contrary to expectations, few people came.",
			"It's convenient, but on the other hand it's expensive.",
			"He's strong against water, while this one rusts easily.",
			"The situation is only getting worse.",
			"Against my wishes, I had to go.",
			"The job is interesting, but on the other hand it's hard.",
			"Production is rising, while quality is falling.",
			"Prices keep going up.",
			"His Japanese is getting better and better.",
		],
	},
	w4d1: {
		usage: [
			"Not only ~ but also …",
			"After ~ing (then decide).",
			"Now that ~ / since ~ has happened.",
			"On paper / according to ~.",
		],
		examples: [
			"She's good at English and on top of that she's kind.",
			"Think it over, then decide.",
			"Now that you've been chosen, you have to do your best.",
			"On the weather map it looks fine, but it's raining here.",
			"The room is large, and it's cheap too.",
			"After talking with my parents, I applied.",
			"Now that you've promised, you must keep it.",
			"On paper the plan looks perfect.",
		],
	},
	w4d2: {
		usage: [
			"Aimed at ~ / for ~.",
			"Depending on ~.",
			"As soon as ~.",
			"The circumstances are that ~ (formal).",
		],
		examples: [
			"This book is for beginners.",
			"Whether we go depends on the weather.",
			"I'll call you as soon as I get back.",
			"That is why I have come to see you.",
			"A magazine aimed at children.",
			"The menu changes depending on the season.",
			"Please contact me as soon as you arrive.",
			"I am writing because of the following circumstances.",
			"We'll start as soon as everyone is here.",
		],
	},
	w4d3: {
		usage: [
			"In response to ~.",
			"Toward / against ~.",
			"By means of ~ / due to ~.",
			"Involved in ~.",
		],
		examples: [
			"They changed the product in response to customers' opinions.",
			"You should be polite toward your seniors.",
			"It is forbidden by law.",
			"He was involved in the incident.",
			"The company responded to the complaints.",
			"She is kind to everyone.",
			"The town was damaged by the earthquake.",
			"Don't get involved in that kind of problem.",
			"This rule was made by the school.",
		],
	},
	w4d4: {
		usage: [
			"While ~ing (though you know better).",
			"While saying ~ / even as ~.",
			"Be in the process of ~ing.",
			"Even though ~ (reproachful, spoken).",
		],
		examples: [
			"He said nothing, though he knew.",
			"She says she's busy, yet she stays on the phone.",
			"Medicine is steadily advancing.",
			"Don't talk as if you know when you don't.",
			"I went out while it was still raining.",
			"I meant to study today, but I didn't again.",
			"The damage is spreading across the country.",
			"You're a university student and you don't even know that?",
			"I want to decide my path while talking with my teacher.",
		],
	},
	w4d5: {
		usage: [
			"Should not ~ / ought to ~.",
			"Have no choice but to ~.",
			"It is arranged / scheduled that ~.",
			"Nothing more than ~.",
		],
		examples: [
			"You shouldn't do such a thing.",
			"I should have studied more.",
			"I shouldn't have said that.",
			"Even if I dislike the job, I have to keep it to make a living.",
			"I have to say this war was a mistake.",
			"The graduation ceremony is to be held here tomorrow.",
			"A score of 60 or more is treated as a pass.",
			"It was nothing more than a slip of the tongue.",
			"I can only handle simple everyday English.",
		],
	},
	w4d6: {
		usage: [
			"When ~ing / on the occasion of ~.",
			"In line with ~ / along ~.",
			"Prior to ~.",
			"Over the whole of ~ (time or area).",
		],
		examples: [
			"A library card is required when using the library.",
			"When you take a part-time job, don't overdo it.",
			"I will explain according to the handout.",
			"We will make a travel plan along each customer's wishes.",
			"Before the opening, a party for staff only was held.",
			"Before developing the new product, they ran a survey.",
			"This typhoon will bring heavy rain over a wide area of Kanto.",
			"Our company has worked on this drug for twenty years.",
		],
	},
	w5d1: {
		usage: [
			"There's no way one can ~.",
			"Might well ~ (often a bad result).",
			"Cannot readily ~ (formal).",
			"Hard to ~.",
		],
		examples: [
			"There's no way I can memorize all this grammar in one day.",
			"With my present ability, I can't possibly pass.",
			"Someone like him might well say something that cruel.",
			"If we leave this unsolved, it could become an international issue.",
			"I'm sorry, but I really can't say.",
			"I'm afraid I cannot accept that request.",
			"It's hard to believe, but it's true.",
			"Taking another person's life is hard to forgive.",
		],
	},
	w5d2: {
		usage: [
			"Because ~ / from the fact that ~.",
			"Knowing ~ as I do, …",
			"Without ~ing.",
			"Unless you ~, you can't …",
		],
		examples: [
			"The town is called Fujimi because you can see Mt. Fuji.",
			"Because this is a famous cherry-blossom spot, crowds come in spring.",
			"Knowing him, he'll show up soon — he's always late.",
			"Kind Hayashi-san will help if you ask — that's the kind of person he is.",
			"The rain fell without a break.",
			"Time flows without stopping.",
			"You won't know if you can do it unless you try.",
			"I won't feel like buying it unless I see the real thing.",
		],
	},
	w5d3: {
		usage: [
			"No wonder ~ / it's natural that ~.",
			"It's only reasonable that ~.",
			"As good as ~ / practically ~.",
			"At least ~ / ~ is better than nothing.",
		],
		examples: [
			"After saying such awful things, no wonder she dislikes him.",
			"The other team is weak, so of course we'll win.",
			"It's only natural she's angry — you betrayed her.",
			"What you say is quite reasonable.",
			"This used car is practically new.",
			"He has practically no money.",
			"At least you still have a job — I got fired.",
			"My pay was cut, but at least I wasn't fired.",
			"My apartment is small and expensive, but at least it's convenient.",
		],
	},
	w5d4: {
		usage: [
			"No wonder ~ / that's ~ for you.",
			"Not only ~ but also …",
			"Just because ~ (bad result).",
			"Not only ~ but also … (formal).",
		],
		examples: [
			"No wonder it was comfortable — it is a first-class hotel.",
			"The bag was cheap, and that's why it broke right away.",
			"This chair is sturdy. It was worth the price.",
			"He not only gets good grades but is also good at sports.",
			"Around here not only the air but the water is polluted too.",
			"He died just because he took that plane.",
			"Just because I disliked the English teacher, I came to dislike English too.",
			"That film is well known not only in Japan but also abroad.",
			"This dish is not only tasty but also beautiful.",
			"Not only children but adults are hooked on this game.",
		],
	},
	w5d5: {
		usage: [
			"Let's ~ (strong invitation, mostly male, formal).",
			"There's no way to ~.",
			"As if ~.",
			"Doesn't look as if ~ / probably can't ~.",
		],
		examples: [
			"Today is a celebration. Let's all have a drink.",
			"If nobody else will, I'll give it a try.",
			"I don't know how to put it.",
			"This essay is such a mess I can't correct it.",
			"When the funeral started it began to rain, as if the sky were crying.",
			"She was trembling as if she had seen something frightening.",
			"Work is so busy I don't think I can make the reunion.",
			"I regret saying I could do something that I probably can't.",
		],
	},
	w5d6: {
		usage: [
			"When ~ing / on the occasion of ~.",
			"Based on ~.",
			"According to need / depending on ~.",
			"Under ~.",
		],
		examples: [
			"A photo is required when you apply.",
			"Mr. A spoke of his joy on visiting Japan.",
			"This construction will proceed based on the city's plan.",
			"We train new staff on the basis of long experience.",
			"Please download the software as needed.",
			"Based on the test, you are placed in a class matching your ability.",
			"Children are playing cheerfully under the blue sky.",
			"I am writing my paper under Tanaka-sensei's guidance.",
		],
	},
	w6d1: {
		usage: [
			"Ever since ~.",
			"Now that ~ / since ~.",
			"Now that ~ (you should …).",
			"When ~ (formal).",
		],
		examples: [
			"I haven't eaten my mother's cooking since I came to Japan.",
			"I haven't missed a class since I entered the school.",
			"Now that I'm taking the exam, I want a good score.",
			"Now that I've come to Japan, I want to become able to speak Japanese.",
			"Now that you've promised, you should keep it.",
			"Now that I'm in the match, I want to win.",
			"Please drop by when you come to Japan.",
			"I'll return the book I borrowed the next time I see you.",
		],
	},
	w6d2: {
		usage: [
			"From ~'s standpoint.",
			"Judging from ~.",
			"Even just from ~.",
			"Seen from ~'s point of view.",
		],
		examples: [
			"From a customer's standpoint, this shop's entrance is too narrow.",
			"From the shop's side, though, it's easy to manage.",
			"Judging from the symptoms, it may be a heart problem.",
			"Judging from how people treat him, that must be the president.",
			"Even just from his clothes, he's sloppy. The rest is probably the same.",
			"Even the title makes that film sound sad.",
			"To a foreigner, some Japanese customs may seem odd.",
			"To people of the past, modern life may seem too fast.",
		],
	},
	w6d3: {
		usage: [
			"Just because ~ doesn't mean …",
			"Not until after ~.",
			"From N1 through N2 (time or space).",
			"When it comes to ~.",
		],
		examples: [
			"Just because you like it doesn't mean you should eat only that food.",
			"Living in Japan doesn't automatically make you able to speak Japanese.",
			"You can't borrow library books until you've completed the paperwork.",
			"You can't apply until you have your parents' permission.",
			"I lived in London from 2007 through 2009.",
			"They say the area from this station through that street will be redeveloped.",
			"When it comes to running, he's the fastest in town.",
			"When it comes to singing, nobody can beat him.",
		],
	},
	w6d4: {
		usage: [
			"I hear ~ (uncertain hearsay).",
			"I will not ~ (strong will, written).",
			"Probably will not ~ (written).",
			"Whether to ~ or not.",
		],
		examples: [
			"I hear tonight's fireworks may be canceled because of rain.",
			"I hear the flu is going around.",
			"I'll never go to a place that awful again.",
			"When traveling abroad I swore I would drink nothing but bottled water.",
			"He probably doesn't understand how I feel.",
			"Even advanced learners probably couldn't do this problem.",
			"I hesitated over whether to tell the truth, but in the end I told everything.",
			"I want to eat it but I don't want to gain weight, so I'm still deciding.",
		],
	},
	w6d5: {
		usage: [
			"Bound to ~ / must be ~.",
			"Not necessarily ~.",
			"There is nothing to do but ~.",
			"Nothing other than ~.",
		],
		examples: [
			"That team is bound to win.",
			"He must have done it.",
			"He is surely the culprit.",
			"Even if the other team is weak, you won't necessarily win.",
			"It's an uncommon expression, but that doesn't mean it won't be on the test.",
			"I've done all I can. Now I can only pray.",
			"I can't go back. I have no choice but to go forward.",
			"Passing was nothing other than the result of his effort.",
			"The way he teases you is nothing other than affection.",
		],
	},
	w6d6: {
		usage: [
			"Starting with ~ / ~ and other …",
			"Over / concerning ~.",
			"In / at ~ (formal).",
			"At / by ~ (formal notices).",
		],
		examples: [
			"Asian countries, starting with China, took part in the conference.",
			"In our country, sports from baseball to soccer and tennis are popular.",
			"Debate over amending the constitution has gone on for a long time.",
			"We will discuss various problems concerning the education system.",
			"A symposium was held in Kyoto.",
			"Think about our country's role in international society.",
			"I have a doubt on that point in A's argument.",
			"We will dismiss on site.",
			"Please contact us by phone or email.",
			"From Yoko, in Kyoto.",
		],
	},
	w7d1: {
		usage: [
			"Without caring about ~.",
			"In spite of ~.",
			"Regardless of whether ~.",
			"Regardless of ~.",
		],
		examples: [
			"She cried like a child without caring who was watching.",
			"He kept running without caring that his shoe had come off.",
			"In spite of the rain, a large crowd gathered.",
			"He said he hadn't seen it, even though he had.",
			"Whether you come or not, please get in touch.",
			"Everyone is welcome, regardless of nationality.",
			"People of all ages gathered.",
			"We are hiring regardless of experience.",
			"Gender does not matter.",
		],
	},
	w7d2: {
		usage: [
			"~ and ~ and so on.",
			"Whenever I ~ I (feel …).",
			"Whether ~ or …",
			"Both ~ and … / neither ~ nor …",
		],
		examples: [
			"The desk is covered with books and notebooks and so on.",
			"This season I get itchy eyes and a runny nose — it's awful.",
			"Whenever I look at the photos (or hear the song), I think of home.",
			"For better or worse, children take after their parents.",
			"Whether you go or not, please contact me.",
			"Even if you don't take the entrance exam, you should still study.",
			"He's good at both studying and sports.",
			"I'm bad at both singing and dancing.",
		],
	},
	w7d3: {
		usage: [
			"That's just how ~ is / I do wish ~.",
			"You shouldn't ~.",
			"That's what you'd call ~.",
			"As if I would ~! (strong denial).",
		],
		examples: [
			"Medicine is supposed to taste bitter.",
			"How I'd love to visit your country!",
			"I really don't want my daughter to do the same job as me.",
			"You shouldn't speak that way to someone senior.",
			"You shouldn't talk with food in your mouth.",
			"Finishing all this today is simply impossible.",
			"Calling in the middle of the night is just inconsiderate.",
			"As if I'd ever go to a shop like that again!",
			"Fine? I'm exhausted.",
			"Happy? I'm in trouble.",
		],
	},
	w7d4: {
		usage: [
			"Centered on ~.",
			"With ~ in it / filled with ~.",
			"Through ~ / throughout ~.",
			"Relying on ~.",
		],
		examples: [
			"Winds are strong across Kanto, especially around Tokyo, because of the typhoon.",
			"This shop specializes in sports goods, mainly ski gear.",
			"It's a scarf I knit with gratitude.",
			"I sent a card filled with love.",
			"I got to know him through a friend.",
			"I learned about the incident through the TV news.",
			"You can see beautiful flowers here all year round.",
			"I went to the restaurant my friend recommended, relying on a map.",
			"Grandfather walks with the help of a cane.",
		],
	},
	w7d5: {
		usage: [
			"There is a risk that ~.",
			"There is something ~ about it.",
			"It isn't as if ~ is enough.",
			"Can't something be done about ~?",
		],
		examples: [
			"In an earthquake, windows may break and walls may fall.",
			"Typhoon 19 may make landfall in Shikoku tonight.",
			"Commuting on packed trains every day is really hard.",
			"There's something in his singing that reaches you.",
			"More isn't always better.",
			"Having money doesn't necessarily mean you're happy.",
			"I've been getting a lot of weird emails. Can't something be done?",
			"My camera broke. I wonder if it can be fixed somehow.",
		],
	},
	w7d6: {
		usage: [
			"Based on ~.",
			"Due to ~ (notices).",
			"With ~ as the trigger.",
			"When ~ (formal).",
		],
		examples: [
			"This novel was written based on fact.",
			"He invented it on the basis of his failures.",
			"This machine is being adjusted and cannot be used.",
			"Closed today because it is a holiday.",
			"I moved when I started university.",
			"I quit drinking after I got ill.",
			"I went independent after graduating.",
			"Safety measures were strengthened after last year's accident.",
			"A photo is required at the time of the exam.",
			"I wrote the wrong address when I applied.",
		],
	},
	w8d1: {
		usage: [
			"And yet / even so (contrary to expectation).",
			"Even so / still.",
			"In that case.",
			"That's why / so (result).",
		],
		examples: [
			"This watch was expensive. And yet it broke right away.",
			"I study hard. And yet my grades don't improve.",
			"It's pouring outside. Even so I have to go out.",
			"Everyone is against it. Even so I want to marry him.",
			"I hear the roads are badly jammed. In that case, let's take the train.",
			"I don't want to do that now. In that case, you don't have to.",
			"Father overworked. That's why he got ill.",
			"I hear Tanaka has the flu. So that's why he missed school.",
			"Tanaka asked me to lend him money. Oh? So did you?",
			"I had an interview today. And? How did it go?",
		],
	},
	w8d2: {
		usage: [
			"Well, actually … (unexpected reply).",
			"So / therefore (leading to a proposal).",
			"Come to think of it …",
			"By the way (changing the subject).",
		],
		examples: [
			"Your daughter has already graduated, hasn't she? Well, actually, not yet.",
			"I swore I'd quit smoking. And yet after only three days I started again.",
			"Tomorrow the roads will be crowded. So we plan to leave early.",
			"I'm going to America. So there's something I'd like to ask you…",
			"Come to think of it, I wonder how Tanaka is doing.",
			"Nice house. Come to think of it, your father was an architect, wasn't he?",
			"Today's class was interesting. Yeah. By the way, when's the next test?",
			"Spring is here. By the way, did Tanaka's son get into university?",
		],
	},
	w8d3: {
		usage: [
			"That is / namely.",
			"Or (formal).",
			"But (written).",
			"Because (spoken reason).",
		],
		examples: [
			"My mother's older brother, that is, my uncle…",
			"This bottle holds 1,000 milliliters, that is, one liter of water.",
			"Please let us know by fax or email.",
			"How about Tuesday afternoon? Or Wednesday morning would also be fine.",
			"This is a hard challenge. But we must not fear failure.",
			"Life is poor. But we are happy.",
			"Why are you angry? Because you broke your promise.",
			"I hear you did well on the test? Yeah, because it was easy.",
		],
	},
	w8d4: {
		usage: [
			"Which means / so that means.",
			"The reason is …",
			"Therefore (written).",
			"However / only (adding a condition).",
		],
		examples: [
			"He still isn't here. Which means he's absent.",
			"I can drink now. Which means you're over twenty.",
			"I can't leave the house today. The reason is my father has taken a turn for the worse.",
			"I don't eat eggs. The reason is I'm allergic.",
			"He is serious and sincere. Therefore everyone trusts him.",
			"The professor can't come. Therefore the lecture is canceled.",
			"Everything is 30% off. However, items on this shelf are excluded.",
			"Meet at nine tomorrow. However, it's canceled if it rains.",
			"The goods are fine. Only the price is too high.",
			"I don't mind. Only I wonder what my wife will say.",
		],
	},
	w8d5: {
		usage: [
			"Mind you / although (adding an exception).",
			"Incidentally / also (adding information).",
			"Now then (starting a new topic).",
			"Whereupon / then (what followed).",
		],
		examples: [
			"No food or drink from the night before the exam. Mind you, water is all right.",
			"Everyone must take part. Although illness is another matter.",
			"That is all for this point. Incidentally, see the handout for details.",
			"We'll stop here for today. Also, the next date and time is…",
			"That concludes class. Now then, about next week's schedule…",
			"Those were today's news. Now, the weather forecast.",
			"I put on the medicine. Then the pain went away.",
			"I opened the window. Then a moth flew in.",
			"I was out. So there was nobody at home, then.",
		],
	},
	w8d6: {
		usage: [
			"In short / to sum up.",
			"Moreover / what's more.",
			"On top of that (spoken).",
			"Incidentally / by the way.",
		],
		examples: [
			"We lost badly. In short, there was a gap in strength.",
			"He never won a prize. In short, he didn't have the talent.",
			"She's beautiful and smart. Moreover, she has a nice personality.",
			"The hotel I stayed at was old and expensive. Moreover the service was bad, so I'll never go again.",
			"Japanese summers are hot, and on top of that very humid.",
			"That soba shop is expensive and bad. On top of that the service is poor.",
			"More families seem to keep pets lately. Incidentally, we have one dog and two cats.",
			"Put out burnable trash Monday and Thursday, non-burnable on Friday. Incidentally, recyclables are collected on the third Wednesday.",
		],
	},
};

function applyPack(day, pack) {
	if (!pack) return { u: 0, e: 0 };
	let u = 0;
	let e = 0;
	let ei = 0;
	for (const [i, point] of (day.points || []).entries()) {
		if (!point.usage_en && pack.usage[i]) {
			point.usage_en = pack.usage[i];
			u += 1;
		}
		for (const ex of point.examples || []) {
			if (!ex.en && pack.examples[ei]) {
				ex.en = pack.examples[ei];
				e += 1;
			}
			ei += 1;
		}
	}
	return { u, e };
}

async function applyBook(path, pretty) {
	const book = JSON.parse(await readFile(path, "utf8"));
	let u = 0;
	let e = 0;
	for (const week of book.weeks || []) {
		for (const day of week.days || []) {
			const added = applyPack(day, BOOK_EN[`w${week.n}d${day.day}`]);
			u += added.u;
			e += added.e;
		}
	}
	await writeFile(path, JSON.stringify(book, null, pretty ? 2 : 0) + "\n");
	return { u, e };
}

const targets = [
	[resolve(root, "public/data/n2grammar.4e6157570a.json"), false],
	[resolve(sibling, "public/data/n2grammar.4e6157570a.json"), false],
];
for (const [file, pretty] of targets) {
	try {
		const { u, e } = await applyBook(file, pretty);
		console.log(`${file}: +${u} usage_en, +${e} example en`);
	} catch (error) {
		console.log(`skip ${file}: ${error.message}`);
	}
}

try {
	const dir = resolve(sibling, "src-data/n2-grammar");
	for (const name of await readdir(dir)) {
		if (!/^w\d+d\d+\.json$/.test(name)) continue;
		const path = resolve(dir, name);
		const day = JSON.parse(await readFile(path, "utf8"));
		const added = applyPack(day, BOOK_EN[name.replace(".json", "")]);
		if (added.u || added.e) {
			await writeFile(path, JSON.stringify(day, null, 2) + "\n");
			console.log(`${name}: +${added.u} usage_en, +${added.e} example en`);
		}
	}
} catch (error) {
	console.log(`skip src-data: ${error.message}`);
}
