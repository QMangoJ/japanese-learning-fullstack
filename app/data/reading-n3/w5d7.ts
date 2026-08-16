import type { ReadingDay } from "./types";

// 第5週 7日目 実戦問題 — printed pages 88–90
// 別冊 p.6（第5週の解答）は今回のスキャンに含まれていないため、答えは本文から導出。
export const w5d7: ReadingDay = {
	week: 5,
	day: 7,
	label: "実戦問題",
	labelKana: "じっせんもんだい",
	labelEn: "Practice Exercise",
	printedPages: [88, 89, 90],
	answerSource: "derived",

	practice: {
		timeLimitMinutes: 15,
		scoring: "1問20点×5問／100点",
		groups: [
			{
				label: "問題1",
				instruction:
					"つぎの{文章|ぶんしょう}を{読|よ}んで、{質問|しつもん}に{答|こた}えなさい。{答|こた}えは、1・2・3・4から{最|もっと}もよいものを{一|ひと}つ{選|えら}びなさい。",
				instructionCn: "阅读下面的文章，回答问题。答案从 1・2・3・4 中选出最合适的一个。",
				instructionEn: "Read the passage below and answer the questions. Choose the best answer from 1, 2, 3, or 4.",
				blocks: [
					{ type: "paragraph", jp: "ポチの{鳴|な}き{声|ごえ}でぼくは{目|め}がさめた。", cn: "我被小波的叫声吵醒了。", en: "Pochi’s barking woke me up." },
					{
						type: "paragraph",
						indent: true,
						jp: "ねむたくてたまらなかったから、うるさいなとその{鳴|な}き{声|ごえ}をおこっているまもなく、{真|ま}っ{赤|か}な{火|ひ}が{目|め}に{映|うつ}ったので、おどろいて{両方|りょうほう}の{目|め}をしっかり{開|あ}いて{見|み}たら、{戸|と}だなの{中|なか}じゅうが{火|ひ}になっているので、①{二度|にど}おどろいて{飛|と}び{起|お}きた。そうしたらぼくのそばに{寝|ね}ているはずのおばあさまが{何|なに}か{黒|くろ}い{布|ぬの}（※1）のようなもので、{夢中|むちゅう}になって{戸|と}だなの②{火|ひ}をたたいていた。（{中略|ちゅうりゃく}）",
						cn: "我困得不行，正嫌它吵、生着气呢，一片通红的火光就映入眼帘。我吃了一惊，睁大双眼一看，壁橱里面整个都烧起来了，于是①又吃了一惊，一下子跳了起来。这时，本该睡在我旁边的奶奶正拿着一块黑布似的东西，拼命地拍打着壁橱里的②火。（中略）",
						en: "I was so sleepy I could hardly stand it, and I had barely started getting angry at that noisy barking when a bright-red fire came into view. Startled, I opened both eyes wide, and when I looked, the whole inside of the cupboard was on fire, so I was ① startled a second time and jumped up. Then Grandmother, who was supposed to be sleeping next to me, was frantically beating at the ② fire in the cupboard with something like a black cloth. (passage omitted)",
					},
					{
						type: "paragraph",
						indent: true,
						jp: "{部屋|へや}の{中|なか}は、{障子|しょうじ}も、{壁|かべ}も、{床|とこ}の{間|ま}も、ちがいだな（※2）も、{昼間|ひるま}のように{明|あか}るくなっていた。おばあさまの{影法師|かげぼうし}（※3）が{大|おお}きくそれに{映|うつ}って、{化|ば}け{物|もの}（※4）か{何|なに}かのように{動|うご}いていた。（{中略|ちゅうりゃく}）",
						cn: "屋子里，纸拉门、墙壁、壁龛、错落架，全都亮得像白天一样。奶奶的影子被大大地投在上面，像妖怪之类的东西一样晃动着。（中略）",
						en: "Inside the room the sliding paper doors, the walls, the alcove, and the staggered shelves were all as bright as day. Grandmother’s shadow was thrown large across them and moved like some kind of monster. (passage omitted)",
					},
					{
						type: "paragraph",
						indent: true,
						jp: "{火事|かじ}なんだ。おばあさまが{一人|ひとり}で{消|け}そうとしているんだ。③それがわかるとおばあさま{一人|ひとり}ではだめだと{思|おも}ったから、ぼくはすぐ{部屋|へや}を{飛|と}び{出|だ}して、おとうさんとおかあさんとが{寝|ね}ている{離|はな}れ（※5）の{所|ところ}へ{行|い}って、",
						cn: "是失火了。奶奶正一个人想把火扑灭。③明白这一点之后，我觉得光靠奶奶一个人不行，于是立刻冲出房间，跑到父亲和母亲睡觉的偏屋去，",
						en: "It was a fire. Grandmother was trying to put it out by herself. ③ Once I understood that, I thought Grandmother alone wouldn’t be enough, so I immediately ran out of the room to the annex where Father and Mother were sleeping,",
					},
					{ type: "line", jp: "「おとうさん……おかあさん……。」と{思|おも}いきり{大|おお}きな{声|こえ}を{出|だ}した。", cn: "拼命地大喊：「爸爸……妈妈……」", en: "and I shouted as loud as I could, “Father… Mother…”" },
					{
						type: "paragraph",
						indent: true,
						jp: "ぼくの{部屋|へや}の{外|そと}で{鳴|な}いていると{思|おも}ったポチがいつのまにかそこに{来|き}ていて、きゃんきゃんとひどく{鳴|な}いていた。ぼくが{大|おお}きな{声|こえ}を{出|だ}すか{出|だ}さないかに、おかあさんが{寝巻|ねま}き（※6）のままで{飛|と}び{出|だ}してきた。",
						cn: "本以为在我房间外面叫的小波，不知什么时候也跑到了那里，汪汪地叫得很凶。我刚一喊出声，母亲就穿着睡衣冲了出来。",
						en: "Pochi, who I thought was barking outside my room, had somehow gotten there too and was yelping wildly. Almost before I could get a loud cry out, Mother came rushing out still in her nightclothes.",
					},
					{
						type: "paragraph",
						indent: true,
						jp: "「どうしたというの？」とおかあさんはないしょ{話|ばなし}のような{小|ちい}さな{声|こえ}で、ぼくの{両肩|りょうかた}をしっかりおさえてぼくに{聞|き}いた。",
						cn: "「出什么事了？」母亲用像说悄悄话一样的小声，紧紧按住我的双肩问我。",
						en: "“What’s the matter?” Mother asked me in a small voice, like a secret, holding both of my shoulders firmly.",
					},
					{ type: "line", jp: "「たいへんなの……。」", cn: "「不得了了……」", en: "“It’s terrible…”" },
					{
						type: "paragraph",
						indent: true,
						jp: "④「たいへんなの、ぼくの{部屋|へや}が{火事|かじ}になったよう。」と{言|い}おうとしたが、どうしても「たいへんなの。」きりであとは{声|こえ}が{出|で}なかった。",
						cn: "④我想说「不得了了，我的房间好像着火了」，可无论如何也只说得出「不得了了」这一句，后面再也发不出声音。",
						en: "④ I tried to say, “It’s terrible — it looks like my room is on fire,” but no matter what, I could only get out “It’s terrible,” and after that no voice would come.",
					},
					{ type: "source", jp: "（{有島武郎|ありしまたけお}『{家事|かじ}とポチ』）", cn: "（有岛武郎《火灾与小波》）", en: "(Takeo Arishima, “The Fire and Pochi”)" },
				],
				footnotes: [
					{ marker: "※1", term: "布", jp: "ぬののこと", cn: "布", en: "cloth" },
					{ marker: "※2", term: "ちがいだな", jp: "床の間などにある高さの違う2枚の棚", cn: "错落架（壁龛旁高低错落的两层架子）", en: "staggered shelves (two shelves of different heights by an alcove)" },
					{ marker: "※3", term: "影法師", jp: "影のこと", cn: "影子", en: "a shadow" },
					{
						marker: "※4",
						term: "化け物",
						jp: "モンスター、物語などに出てくる実際にはいない怖い生き物",
						cn: "妖怪、怪物",
						en: "a monster; a scary creature that appears in stories and does not really exist",
					},
					{ marker: "※5", term: "離れ", jp: "同じ家だが、少し離れて建てた部屋", cn: "偏屋（同一宅院内另建的房间）", en: "an annex (a room built a little apart, on the same property)" },
					{ marker: "※6", term: "寝巻き", jp: "寝るとき着る物", cn: "睡衣", en: "nightclothes; what you wear to sleep" },
				],
				questions: [
					{
						label: "1",
						jp: "①「{二度|にど}」はいつといつか。",
						cn: "①「两次」指的是什么时候和什么时候？",
						en: "① “A second time” — which two moments does this refer to?",
						choices: [
							{ jp: "{目|め}が{覚|さ}めたときとねむたくてたまらなかったとき", cn: "醒来时和困得不行时", en: "When he woke up, and when he was so sleepy he could hardly stand it" },
							{ jp: "{起|お}きたときと{戸|と}だなを{開|あ}けたとき", cn: "起床时和打开壁橱时", en: "When he got up, and when he opened the cupboard" },
							{ jp: "ポチを{見|み}たときとおばあさまを{見|み}たとき", cn: "看到小波时和看到奶奶时", en: "When he saw Pochi, and when he saw Grandmother" },
							{
								jp: "{真|ま}っ{赤|か}な{火|ひ}が{目|め}に{映|うつ}ったときと{戸|と}だなの{中|なか}の{火|ひ}を{見|み}たとき",
								cn: "通红的火光映入眼帘时，和看到壁橱里的火时",
								en: "When the bright-red fire came into view, and when he saw the fire inside the cupboard",
							},
						],
						answer: 4,
						explanation:
							"原文的顺序是：「真っ赤な火が目に映ったので、**おどろいて**両方の目をしっかり開いて見たら、戸だなの中じゅうが火になっているので、**二度おどろいて**飛び起きた」。第一次吃惊是看到红光，第二次是睁眼后看清壁橱整个在烧。「二度」正是指这两次，所以 4 正确。",
						explanationEn:
							"The order in the text is: “a bright-red fire came into view, so I was **startled** and opened both eyes wide, and when I looked, the whole inside of the cupboard was on fire, so I was **startled a second time** and jumped up.” The first shock is seeing the red glow; the second is, after opening his eyes, seeing that the whole cupboard is burning. “二度” is those two moments, so 4 is correct.",
						choiceNotes: [
							"「ねむたくてたまらなかった」是吃惊之前的状态，不是吃惊的时刻。",
							"壁橱不是「我」打开的，「我」只是看到里面在烧。",
							"看到小波时并没有吃惊，只是嫌它吵。",
							"正确。两次「おどろいた」正好对应这两个瞬间。",
						],
						choiceNotesEn: [
							"“So sleepy I could hardly stand it” is the state before he was startled, not a moment of surprise.",
							"He didn’t open the cupboard; he only saw that it was on fire inside.",
							"When he heard Pochi he wasn’t startled — he was just annoyed at the noise.",
							"Correct. The two times he was “startled” match these two moments.",
						],
					},
					{
						label: "2",
						jp: "だれが{何|なん}のために、②「{火|ひ}をたたいていた」のか。",
						cn: "是谁、为了什么在②「拍打火」？",
						en: "Who was ② “beating at the fire,” and for what purpose?",
						choices: [
							{ jp: "おばあさまが{料理|りょうり}をするために", cn: "奶奶为了做饭", en: "Grandmother, in order to cook" },
							{ jp: "ポチが{火事|かじ}を{知|し}らせるために", cn: "小波为了通知失火", en: "Pochi, in order to warn people of the fire" },
							{ jp: "おばあさまが{火|ひ}を{消|け}すために", cn: "奶奶为了灭火", en: "Grandmother, in order to put out the fire" },
							{ jp: "ポチが{怪物|かいぶつ}と{戦|たたか}うために", cn: "小波为了和怪物搏斗", en: "Pochi, in order to fight a monster" },
						],
						answer: 3,
						explanation:
							"②所在的句子是「おばあさまが……黒い布のようなもので、夢中になって戸だなの火をたたいていた」——主语是奶奶。目的则由后文点明：「おばあさまが一人で消そうとしているんだ」。用湿布拍打是灭火的动作，所以 3 正确。",
						explanationEn:
							"The sentence around ② is “Grandmother … was frantically beating at the fire in the cupboard with something like a black cloth” — the subject is Grandmother. The purpose is made clear later: “Grandmother was trying to put it out by herself.” Beating with a cloth is an action to put out a fire, so 3 is correct.",
						choiceNotes: [
							"这是半夜的火灾现场，不可能在做饭。",
							"小波在外面叫，没有拍打火。",
							"正确。奶奶拿黑布拍打，是想把火扑灭。",
							"「化け物か何かのように」形容的是奶奶投在墙上的影子，不是真有怪物。",
						],
						choiceNotesEn: [
							"This is a fire in the middle of the night; she is not cooking.",
							"Pochi is barking outside; he is not beating at the fire.",
							"Correct. Grandmother is beating with a black cloth because she wants to put the fire out.",
							"“Like some kind of monster” describes Grandmother’s shadow on the wall, not a real monster.",
						],
					},
					{
						label: "3",
						jp: "③「それがわかると」の「それ」は{何|なに}をさすか。",
						cn: "③「明白这一点」中的「这一点」指的是什么？",
						en: "In ③ “once I understood that,” what does “that” refer to?",
						choices: [
							{ jp: "ポチがいつのまにかそばに{来|き}ていること", cn: "小波不知不觉来到了身边", en: "That Pochi had somehow come up beside him" },
							{ jp: "おばあさまが{火事|かじ}を{起|お}こしたこと", cn: "奶奶引起了火灾", en: "That Grandmother had started the fire" },
							{ jp: "{離|はな}れにお{父|とう}さんとお{母|かあ}さんがいること", cn: "父母在偏屋里", en: "That Father and Mother were in the annex" },
							{ jp: "おばあさまが{火事|かじ}を{一人|ひとり}で{消|け}そうとしていること", cn: "奶奶正一个人想把火扑灭", en: "That Grandmother was trying to put the fire out by herself" },
						],
						answer: 4,
						explanation:
							"指示词的答案就在**紧邻的前一句**：「火事なんだ。おばあさまが一人で消そうとしているんだ。」把它代入原句——「（奶奶一个人在灭火）がわかると、おばあさま一人ではだめだと思った」，意思完全通顺。所以 4 正确。",
						explanationEn:
							"The answer to the demonstrative is in the sentence right before it: “It was a fire. Grandmother was trying to put it out by herself.” Plug that in — “once I understood (that Grandmother was putting the fire out alone), I thought Grandmother alone wouldn’t be enough” — and it makes perfect sense. So 4 is correct.",
						choiceNotes: [
							"小波跑过来是在「我」冲出房间之后写到的，时间上在后面。",
							"文中没有任何地方说火是奶奶引起的。",
							"父母在偏屋是「我」原本就知道的事，不是这一刻才「わかった」的。",
							"正确。前一句就是答案，代入后与「おばあさま一人ではだめだ」自然衔接。",
						],
						choiceNotesEn: [
							"Pochi showing up is written after the narrator has already run out of the room, so it comes later.",
							"Nothing in the text says Grandmother started the fire.",
							"That Father and Mother are in the annex is something he already knew, not something he “understood” at this moment.",
							"Correct. The previous sentence is the answer, and it leads naturally into “Grandmother alone wouldn’t be enough.”",
						],
					},
					{
						label: "4",
						jp: "④「……{声|こえ}が{出|で}なかった」と{書|か}いてあるが、ここからぼくのどんなようすがわかるか。",
						cn: "文中写道④「……发不出声音」，从这里可以看出「我」处于什么状态？",
						en: "The text says ④ “… no voice would come.” What does this show about the boy’s state?",
						choices: [
							{ jp: "ねむくてたまらないようす", cn: "困得不行的样子", en: "So sleepy he can hardly stand it" },
							{ jp: "ショックを{受|う}けているようす", cn: "受到强烈冲击的样子", en: "In a state of shock" },
							{ jp: "{感動|かんどう}しているようす", cn: "深受感动的样子", en: "Deeply moved" },
							{ jp: "おもしろがっているようす", cn: "觉得有趣的样子", en: "Finding it amusing" },
						],
						answer: 2,
						explanation:
							"「我」明明想把「ぼくの部屋が火事になったよう」整句说出来，却「どうしても『たいへんなの。』きりであとは声が出なかった」——想说却说不出，这是极度惊吓、脑子一片空白的表现。所以 2 正确。",
						explanationEn:
							"He clearly wants to say the whole sentence “it looks like my room is on fire,” but “no matter what, I could only get out ‘It’s terrible,’ and after that no voice would come” — wanting to speak and being unable to is a sign of extreme fright, a blank mind. So 2 is correct.",
						choiceNotes: [
							"看到火之后已经「飛び起きた」，睡意早就没了。",
							"正确。想说却说不出话，正是受到惊吓、冲击的样子。",
							"火灾现场，谈不上感动。",
							"「たいへんなの」的语气是惊慌，不是觉得有趣。",
						],
						choiceNotesEn: [
							"After seeing the fire he has already “jumped up,” so the sleepiness is gone.",
							"Correct. Wanting to speak and being unable to is exactly the look of shock.",
							"This is a fire; there is nothing “moving” about it.",
							"The tone of “It’s terrible” is panic, not amusement.",
						],
					},
				],
			},
			{
				label: "問題2",
				instruction:
					"つぎの{文章|ぶんしょう}を{読|よ}んで、{質問|しつもん}に{答|こた}えなさい。{答|こた}えは、1・2・3・4から{最|もっと}もよいものを{一|ひと}つ{選|えら}びなさい。",
				instructionCn: "阅读下面的文章，回答问题。答案从 1・2・3・4 中选出最合适的一个。",
				instructionEn: "Read the passage below and answer the questions. Choose the best answer from 1, 2, 3, or 4.",
				blocks: [
					{
						type: "paragraph",
						indent: true,
						jp: "{先日|せんじつ}、{妻|つま}と{一泊旅行|いっぱくりょこう}をしました。{温泉|おんせん}までの{山道|やまみち}を{走|はし}っていたとき、{突然|とつぜん}、{妻|つま}が「ね、{覚|おぼ}えてた？　{今日|きょう}、{私|わたし}の{誕生日|たんじょうび}なのよ。」と{言|い}い{出|だ}しました。すっかり{忘|わす}れていた{私|わたし}。「じゃ、これからの{温泉旅行|おんせんりょこう}がそれだな。」と{言|い}ったのですが、{初|はじ}めはなかなか{納得|なっとく}してくれませんでした。しかし、いつもよりぜいたくな{食事|しょくじ}をし、{気|き}に{入|い}った{食器|しょっき}を{手|て}に{入|い}れた{妻|つま}は、{満足|まんぞく}したようすでした。{私|わたし}もほっとしました。",
						cn: "前几天，我和妻子去做了一次两天一夜的旅行。在开往温泉的山路上，妻子突然说：「喂，你记得吗？今天是我的生日哦。」我早就忘得一干二净。我说「那么，接下来的温泉旅行就当作是生日礼物吧」，起初她怎么也不肯接受。不过，吃了比平时更奢侈的一顿饭、又买到了中意的餐具之后，妻子看上去满足了。我也总算松了口气。",
						en: "The other day my wife and I took an overnight trip. While we were driving along the mountain road to the hot spring, my wife suddenly said, “Hey, did you remember? Today is my birthday.” I had completely forgotten. I said, “Then this hot-spring trip from here on is that,” but at first she wouldn’t accept it. After a more luxurious meal than usual, though, and after she got some tableware she liked, she looked satisfied. I felt relieved too.",
					},
				],
				questions: [
					{
						label: "5",
						jp: "この{文章|ぶんしょう}の{内容|ないよう}と{合|あ}っているものはどれか。",
						cn: "下列哪一项与这篇文章的内容相符？",
						en: "Which of the following matches the content of this passage?",
						choices: [
							{
								jp: "{夫|おっと}は、{妻|つま}の{誕生日|たんじょうび}のお{祝|いわ}いのために{温泉旅行|おんせんりょこう}を{計画|けいかく}していた。",
								cn: "丈夫是为了给妻子庆祝生日才计划这次温泉旅行的。",
								en: "The husband had planned the hot-spring trip to celebrate his wife’s birthday.",
							},
							{
								jp: "{妻|つま}はいつも{誕生日|たんじょうび}を{忘|わす}れる{夫|おっと}を、{最後|さいご}まで{許|ゆる}さなかった。",
								cn: "妻子对总是忘记生日的丈夫，直到最后都没有原谅。",
								en: "The wife never forgave her husband, who always forgets her birthday, right to the end.",
							},
							{
								jp: "{結局|けっきょく}、この{温泉旅行|おんせんりょこう}が{妻|つま}への{誕生日|たんじょうび}プレゼントになった。",
								cn: "结果，这次温泉旅行成了送给妻子的生日礼物。",
								en: "In the end, this hot-spring trip became a birthday present for his wife.",
							},
							{
								jp: "{夫|おっと}は、{妻|つま}の{誕生日|たんじょうび}プレゼントが{安|やす}くてよかったと{思|おも}った。",
								cn: "丈夫觉得妻子的生日礼物很便宜，真好。",
								en: "The husband thought it was good that his wife’s birthday present was cheap.",
							},
						],
						answer: 3,
						explanation:
							"丈夫本来完全忘了妻子的生日（「すっかり忘れていた私」），是在路上临时说「これからの温泉旅行がそれ（＝誕生日プレゼント）だな」。妻子起初不接受，但吃了大餐、买到中意的餐具后「満足したようす」，丈夫也「ほっとしました」。也就是说，这趟旅行最终**被当成了**生日礼物，所以 3 正确。",
						explanationEn:
							"The husband had completely forgotten his wife’s birthday (“I had completely forgotten”), and on the road he improvised, “this hot-spring trip from here on is that (= the birthday present).” At first she wouldn’t accept it, but after a fancy meal and some tableware she liked she “looked satisfied,” and he “felt relieved.” In other words, the trip ended up counting as a birthday present, so 3 is correct.",
						choiceNotes: [
							"「すっかり忘れていた」——丈夫根本忘了生日，旅行不是为庆生而计划的。",
							"妻子最后「満足したようす」，丈夫才「ほっとした」，说明已经接受了。",
							"正确。临时把旅行说成生日礼物，最后妻子也接受了。",
							"文中没有提到价格；丈夫「ほっとした」是因为妻子消了气，不是因为省钱。",
						],
						choiceNotesEn: [
							"“I had completely forgotten” — he had forgotten the birthday, so the trip was not planned as a celebration.",
							"In the end she “looked satisfied,” and that is why he “felt relieved,” so she did accept it.",
							"Correct. He turned the trip into a birthday present on the spot, and she accepted it in the end.",
							"Price is never mentioned; he “felt relieved” because she was no longer angry, not because it was cheap.",
						],
					},
				],
			},
		],
	},

	vocab: [
		{ jp: "鳴き声", kana: "なきごえ", cn: "（动物的）叫声", en: "an animal’s cry / bark", pos: "名詞" },
		{ jp: "目がさめる", kana: "めがさめる", cn: "醒来", en: "to wake up", pos: "表現" },
		{ jp: "真っ赤", kana: "まっか", cn: "通红", en: "bright red", pos: "な形" },
		{ jp: "映る", kana: "うつる", cn: "映入、映照", en: "to be reflected; to come into view", pos: "動詞" },
		{ jp: "戸だな", kana: "とだな", cn: "壁橱、橱柜", en: "cupboard; closet", pos: "名詞" },
		{ jp: "飛び起きる", kana: "とびおきる", cn: "一跃而起", en: "to jump up (from bed)", pos: "動詞" },
		{ jp: "夢中になる", kana: "むちゅうになる", cn: "入迷、拼命", en: "to be absorbed; to do something frantically", pos: "表現" },
		{ jp: "たたく", cn: "拍打", en: "to beat; to hit", pos: "動詞" },
		{ jp: "障子", kana: "しょうじ", cn: "纸拉门", en: "sliding paper door", pos: "名詞" },
		{ jp: "床の間", kana: "とこのま", cn: "壁龛", en: "alcove", pos: "名詞" },
		{ jp: "影法師", kana: "かげぼうし", cn: "影子", en: "a shadow (of a person)", pos: "名詞" },
		{ jp: "化け物", kana: "ばけもの", cn: "妖怪", en: "monster", pos: "名詞" },
		{ jp: "火事", kana: "かじ", cn: "火灾", en: "a fire (disaster)", pos: "名詞" },
		{ jp: "離れ", kana: "はなれ", cn: "偏屋", en: "an annex", pos: "名詞" },
		{ jp: "思いきり", kana: "おもいきり", cn: "尽情地、拼命地", en: "with all one’s might", pos: "副詞" },
		{ jp: "いつのまにか", cn: "不知不觉间", en: "before one knows it", pos: "副詞" },
		{ jp: "寝巻き", kana: "ねまき", cn: "睡衣", en: "nightclothes", pos: "名詞" },
		{ jp: "ないしょ話", kana: "ないしょばなし", cn: "悄悄话", en: "a secret; a whisper", pos: "名詞" },
		{ jp: "両肩", kana: "りょうかた", cn: "双肩", en: "both shoulders", pos: "名詞" },
		{ jp: "納得する", kana: "なっとくする", cn: "认可、接受", en: "to accept; to be convinced", pos: "動詞" },
		{ jp: "ぜいたく", cn: "奢侈", en: "luxury", pos: "な形" },
		{ jp: "食器", kana: "しょっき", cn: "餐具", en: "tableware", pos: "名詞" },
		{ jp: "結局", kana: "けっきょく", cn: "结果、最终", en: "in the end", pos: "副詞" },
	],

	grammar: [
		{
			pattern: "〜てたまらない",
			meaning: "……得受不了。",
			meaningEn: "So … I can hardly stand it.",
			example: { jp: "ねむたくてたまらなかった", cn: "困得受不了", en: "so sleepy I could hardly stand it" },
		},
		{
			pattern: "〜まもなく",
			formation: "動詞辞書形／て形 ＋ まもなく",
			meaning: "刚……不久就……。",
			meaningEn: "Soon after … / before long ….",
			example: { jp: "その{鳴|な}き{声|ごえ}をおこっているまもなく", cn: "正生着气呢，紧接着就……", en: "I had barely started getting angry at that barking when …" },
		},
		{
			pattern: "〜はずの／〜はずだ",
			meaning: "应该……。表示按道理推断。",
			meaningEn: "Should be … / is supposed to …. A conclusion from what one would expect.",
			example: { jp: "ぼくのそばに{寝|ね}ているはずのおばあさま", cn: "本该睡在我旁边的奶奶", en: "Grandmother, who was supposed to be sleeping next to me" },
		},
		{
			pattern: "〜（よ）うとする",
			formation: "動詞意向形 ＋ とする",
			meaning: "想要……、正打算……。",
			meaningEn: "To try to … / to be about to ….",
			example: { jp: "おばあさまが{一人|ひとり}で{消|け}そうとしているんだ。", cn: "奶奶正一个人想把火扑灭。", en: "Grandmother is trying to put it out by herself." },
		},
		{
			pattern: "〜か〜ないかに",
			meaning: "刚一……就……。表示两个动作几乎同时。",
			meaningEn: "Hardly had … when …. Two actions happen almost at the same time.",
			example: {
				jp: "ぼくが{大|おお}きな{声|こえ}を{出|だ}すか{出|だ}さないかに、おかあさんが{飛|と}び{出|だ}してきた。",
				cn: "我刚一喊出声，母亲就冲了出来。",
				en: "Almost before I could get a loud cry out, Mother came rushing out.",
			},
		},
		{
			pattern: "〜きり",
			formation: "名詞・動詞た形 ＋ きり",
			meaning: "只……（就没有下文了）。",
			meaningEn: "Only … (and nothing more).",
			example: { jp: "「たいへんなの。」きりであとは{声|こえ}が{出|で}なかった。", cn: "只说得出「不得了了」，后面再也发不出声。", en: "I could only get out “It’s terrible,” and after that no voice would come." },
		},
		{
			pattern: "〜のまま",
			meaning: "保持……的状态。",
			meaningEn: "Just as … / still in the state of ….",
			example: { jp: "おかあさんが{寝巻|ねま}きのままで{飛|と}び{出|だ}してきた。", cn: "母亲穿着睡衣就冲了出来。", en: "Mother came rushing out still in her nightclothes." },
		},
		{
			pattern: "〜ようす（だ）",
			meaning: "看起来……的样子。用于描写他人的状态。",
			meaningEn: "Looks as if …. Used to describe someone else’s state.",
			example: { jp: "{妻|つま}は、{満足|まんぞく}したようすでした。", cn: "妻子看上去满足了。", en: "My wife looked satisfied." },
		},
	],
};
