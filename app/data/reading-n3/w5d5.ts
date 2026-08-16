import type { ReadingDay } from "./types";

// 第5週 5日目 小説① — printed pages 84–85
// 別冊 p.6（第5週の解答）は今回のスキャンに含まれていないため、答えは本文から導出。
export const w5d5: ReadingDay = {
	week: 5,
	day: 5,
	label: "小説①",
	labelKana: "しょうせつ",
	labelEn: "Novels ①",
	printedPages: [84, 85],
	answerSource: "derived",

	point: {
		title: "「これ／それ（{指示語|しじご}）」に{注意|ちゅうい}しよう！ ─{答|こた}えが{前|まえ}にある{場合|ばあい}",
		titleCn: "注意「これ／それ」等指示词！——答案在前文的情况",
		titleEn: "Pay attention to 'kore' and 'sore'! — When they refer to a previously mentioned idea",
		figure: {
			alt: "「（前の文章）○○○○○○。そのことは……」「（前の段落）……　これは……」という指示語の指す方向を示す図と、「大きい木の上に止まっていたとき、美しい彼女を見たんだ……　あの彼女は今どこに……」「どこかな？」と話す鳥たち",
			cn: "图示指示词指向前文的方向：「（前面的句子）〇〇〇〇。**そのこと**は……」「（前面的段落）……　**これ**は……」。旁边小鸟在说：「我停在大树上时，看到了美丽的她……她现在在哪儿呢……」",
			en: "A diagram showing that demonstratives point backward: “(the previous sentence) ○○○○. **That** …” / “(the previous paragraph) … **This** …” Nearby, birds say, “When I was perched on a big tree, I saw a beautiful girl… I wonder where she is now…”",
		},
		tips: [
			{
				jp: "{前|まえ}の{段落|だんらく}に{答|こた}えがある{場合|ばあい}もあります。{名詞|めいし}とは{限|かぎ}りません。",
				cn: "答案有时在**前一个段落**里。而且指示词指的不一定是名词——也可能是一整件事、一句话。",
				en: "Sometimes the answer is in the previous paragraph. And a demonstrative doesn’t have to point to a noun — it can refer to a whole event or sentence.",
			},
			{
				jp: "{指示語|しじご}を{見|み}つけたら、そこに{候補|こうほ}を{入|い}れて{読|よ}み{直|なお}し、{意味|いみ}が{通|とお}るか{確|たし}かめよう。",
				cn: "找到指示词后，把候选内容代进去重读一遍，看意思是否通顺——这是最可靠的验算方法。",
				en: "When you find a demonstrative, plug each candidate into the sentence and reread it to see whether it makes sense — that is the most reliable check.",
			},
		],
		expressions: [
			{ jp: "これ／それ／あれ", cn: "指示词（这个／那个／那个）", en: "demonstratives (this / that / that over there)" },
			{ jp: "このこと／そのこと", cn: "这件事／那件事（指整件事）", en: "this / that (referring to a whole matter)" },
			{ jp: "こんな〜／そんな〜", cn: "这样的〜／那样的〜", en: "this kind of … / that kind of …" },
			{ jp: "好物", kana: "こうぶつ", cn: "爱吃的东西", en: "a favorite dish" },
			{ jp: "得意料理", kana: "とくいりょうり", cn: "拿手菜", en: "a specialty dish" },
			{ jp: "気遣う", kana: "きづかう", cn: "关怀、体贴", en: "be considerate" },
			{ jp: "胸が熱くなる", kana: "むねがあつくなる", cn: "心头一热", en: "it warms one's heart" },
		],
	},

	renshu: {
		instruction: "{次|つぎ}の{会話文|かいわぶん}を{読|よ}んで、{後|あと}の{文|ぶん}から{正|ただ}しいものを{選|えら}ぼう。",
		instructionCn: "阅读下面的对话，从后面的句子中选出正确的。（答案在下一页）",
		instructionEn: "Read the conversation below and choose the correct statements from the sentences that follow. (Answers are on the next page.)",
		blocks: [
			{
				type: "speech",
				speaker: "{純子|じゅんこ}のおば",
				speakerCn: "纯子的姑姑",
				speakerEn: "Junko’s aunt",
				jp: "{純子|じゅんこ}ちゃん、{里|さと}いも（※1）の{皮|かわ}をむくのは{難|むずか}しいでしょう。",
				cn: "纯子，削芋头皮很难吧。",
				en: "Junko, peeling taro is hard, isn’t it?",
			},
			{
				type: "speech",
				speaker: "{純子|じゅんこ}",
				speakerCn: "纯子",
				speakerEn: "Junko",
				jp: "うん。でもね、お{父|とう}さんの{誕生日|たんじょうび}だからどうしても{作|つく}ってあげたいんだ。だからがんばる。お{父|とう}さん、{筑前煮|ちくぜんに}（※2）、{大好|だいす}きなんだもん。お{母|かあ}さんが{死|し}んでから{一度|いちど}も{食|た}べてないし。お{母|かあ}さんのように{上手|じょうず}には{作|つく}れないと{思|おも}うけど、がんばって{覚|おぼ}えるから{教|おし}えてね、おばさん。",
				cn: "嗯。不过啊，今天是爸爸的生日，我无论如何都想做给他吃。所以我会加油的。爸爸最喜欢筑前煮了嘛。自从妈妈去世以后，他一次都没吃过。虽然我做不到妈妈那么好吃，但我会努力学会的，姑姑你教我吧。",
				en: "Yeah. But it’s Dad’s birthday, so I really want to make it for him. That’s why I’ll do my best. Dad loves chikuzen-ni, you know. He hasn’t had it once since Mom died. I don’t think I can make it as well as Mom did, but I’ll work hard and learn, so please teach me, Auntie.",
			},
			{
				type: "speech",
				speaker: "{純子|じゅんこ}のおば",
				speakerCn: "纯子的姑姑",
				speakerEn: "Junko’s aunt",
				jp: "わかったわ。じゃ、これむいたら、{次|つぎ}は{鶏肉|とりにく}（※3）を{切|き}るのよ。",
				cn: "好，我知道了。那么削完这个，接下来就切鸡肉。",
				en: "All right. Once you’ve peeled this, next you cut the chicken.",
			},
		],
		footnotes: [
			{ marker: "※1", term: "里いも", jp: "taro", cn: "芋头", en: "taro" },
			{ marker: "※2", term: "筑前煮", jp: "料理の名前", cn: "筑前煮（一道日式炖菜）", en: "the name of a dish (a simmered chicken-and-vegetable stew)" },
			{ marker: "※3", term: "鶏肉", jp: "chicken", cn: "鸡肉", en: "chicken" },
		],
		choices: [
			{ jp: "{純子|じゅんこ}は{今|いま}、{里|さと}いもを{煮|に}ている。", cn: "纯子现在正在煮芋头。", en: "Junko is simmering the taro right now." },
			{ jp: "{純子|じゅんこ}はお{母|かあ}さんに{筑前煮|ちくぜんに}の{作|つく}り{方|かた}を{教|おし}えてもらった。", cn: "纯子从妈妈那里学会了筑前煮的做法。", en: "Junko was taught how to make chikuzen-ni by her mother." },
			{ jp: "{純子|じゅんこ}のおばさんは{筑前煮|ちくぜんに}の{作|つく}り{方|かた}を{知|し}っている。", cn: "纯子的姑姑知道筑前煮的做法。", en: "Junko’s aunt knows how to make chikuzen-ni." },
			{ jp: "{純子|じゅんこ}の{父親|ちちおや}は{妻|つま}の{作|つく}った{筑前煮|ちくぜんに}が{大好|だいす}きだった。", cn: "纯子的父亲很喜欢妻子做的筑前煮。", en: "Junko’s father loved the chikuzen-ni his wife used to make." },
			{ jp: "{純子|じゅんこ}は{里|さと}いもの{皮|かわ}をむくのをあきらめた。", cn: "纯子放弃削芋头皮了。", en: "Junko gave up on peeling the taro." },
		],
		answers: [3, 4],
		hint: {
			jp: "{今|いま}やっているのは「{皮|かわ}をむく」{作業|さぎょう}。{作|つく}り{方|かた}を{教|おし}えているのはおばさん。",
			cn: "现在做的是「削皮」，还没开始煮；教做法的是姑姑，不是妈妈；纯子说「がんばる」，并没有放弃。",
			en: "What they’re doing now is peeling, not simmering yet. The one teaching the recipe is the aunt, not Mom. Junko says she’ll do her best, so she hasn’t given up.",
		},
	},

	mondai: {
		instruction: "{次|つぎ}の{文章|ぶんしょう}を{読|よ}んで、{後|あと}の{問|と}いに{答|こた}えなさい。",
		instructionCn: "阅读下面的文章，回答后面的问题。（原书答案在别册 p.6）",
		instructionEn: "Read the passage below and answer the questions that follow. (Answers are in the supplement, p. 6.)",
		blocks: [
			{ type: "line", jp: "「できたよー。」", cn: "「做好啦——」", en: "“It’s ready!”" },
			{
				type: "paragraph",
				jp: "という{純子|じゅんこ}の{高|たか}い{声|こえ}でテーブルにつくと、{筑前煮|ちくぜんに}があった。いろいろな{野菜|やさい}を{鶏肉|とりにく}と{一緒|いっしょ}に{煮|に}てあり、{結構|けっこう}（※1）{本格的|ほんかくてき}に（※2）{作|つく}られているようだ。",
				cn: "听到纯子清脆的一声，我走到餐桌前，只见桌上摆着筑前煮。各种蔬菜和鸡肉一起炖着，看上去做得相当地道。",
				en: "At Junko’s high voice I sat down at the table, and there was chikuzen-ni. Various vegetables had been simmered together with chicken, and it looked as if it had been made in quite an authentic way.",
			},
			{ type: "line", jp: "「すごいじゃないか、お{前|まえ}、こんな{料理|りょうり}をいつ{覚|おぼ}えたんだ？」", cn: "「真厉害啊，你什么时候学会做这种菜的？」", en: "“That’s amazing — when did you learn to make a dish like this?”" },
			{ type: "line", jp: "「へへー、この{間|あいだ}、{夕子|ゆうこ}おばさんに{教|おし}えてもらったんだ。」", cn: "「嘿嘿，前几天夕子姑姑教我的。」", en: "“Heh heh — Aunt Yuko taught me the other day.”" },
			{
				type: "paragraph",
				indent: true,
				jp: "それは{私|わたし}の{好物|こうぶつ}（※3）であり、{妻|つま}の{得意料理|とくいりょうり}だった。{妻|つま}が{亡|な}くなってから{今日|きょう}までの1{年半|ねんはん}、わが{家|や}の{食卓|しょくたく}に①{姿|すがた}を{見|み}せたことがなかった。{今日|きょう}は{私|わたし}の{誕生日|たんじょうび}なので、{純子|じゅんこ}ががんばって{作|つく}ってくれたのだろう。まだ{小学|しょうがく}6{年生|ねんせい}だというのに、{自分|じぶん}のさびしさを{隠|かく}して、{私|わたし}のことを{気遣|きづか}って（※4）くれているのだ＊。",
				cn: "那是我最爱吃的菜，也是妻子的拿手好菜。自妻子去世到今天的一年半里，它从未①在我家的餐桌上出现过。今天是我的生日，想必是纯子努力做出来的吧。她明明才小学六年级，却把自己的寂寞藏了起来，处处体贴着我＊。",
				en: "That was my favorite dish, and my wife’s specialty. In the year and a half from my wife’s death until today, it had never ① shown itself on our table. Today is my birthday, so Junko must have worked hard to make it for me. She’s only in sixth grade, and yet she is hiding her own loneliness and being considerate of me＊.",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "②こんなことを{考|かんが}えていたなんて。「お{父|とう}さん、{今日|きょう}は{簡単|かんたん}なものにするね。」と{言|い}っていたのに。{私|わたし}は{胸|むね}が{熱|あつ}くなり（※5）、しばらくの{間|あいだ}、{箸|はし}を{動|うご}かすことができなかった＊＊。",
				cn: "没想到她心里竟然②盘算着这样的事。明明还说过「爸爸，今天就做点简单的吧」。我心头一热，好一阵子都动不了筷子＊＊。",
				en: "To think she had been planning ② something like this. And she had said, “Dad, I’ll keep it simple today.” My heart warmed, and for a while I couldn’t move my chopsticks＊＊.",
			},
		],
		footnotes: [
			{ marker: "※1", term: "結構", jp: "quite", cn: "相当、颇", en: "quite" },
			{ marker: "※2", term: "本格的に", jp: "in an authentic manner", cn: "正宗地、地道地", en: "in an authentic manner" },
			{ marker: "※3", term: "好物", jp: "a favorite dish", cn: "爱吃的东西", en: "a favorite dish" },
			{ marker: "※4", term: "気遣う", jp: "be considerate / nice", cn: "体贴、挂念", en: "be considerate / nice" },
			{ marker: "※5", term: "胸が熱くなる", jp: "it warms one's heart", cn: "心头一热", en: "it warms one's heart" },
		],
		pageNotes: [
			{
				jp: "＊ She is only in the sixth grade, but she is putting aside her lonely feelings and trying to be nice to me.",
				cn: "＊她才小学六年级，却把自己的寂寞藏起来，处处关心我。",
				en: "＊ She is only in the sixth grade, but she is putting aside her lonely feelings and trying to be nice to me.",
			},
			{ jp: "＊＊ I was so overwhelmed and could not eat for a while.", cn: "＊＊我心头一热，好一阵子都动不了筷子。", en: "＊＊ I was so overwhelmed and could not eat for a while." },
		],
		questions: [
			{
				label: "問1",
				jp: "①「{姿|すがた}を{見|み}せたことがなかった」とあるが、どういう{意味|いみ}か。",
				cn: "文中说①「从未出现过」，这是什么意思？",
				en: "The text says ① “had never shown itself.” What does that mean?",
				choices: [
					{ jp: "{筑前煮|ちくぜんに}が{出|で}てきたことがなかった", cn: "筑前煮从未端上过桌", en: "Chikuzen-ni had never been served." },
					{ jp: "{妻|つま}の{姿|すがた}を{見|み}ることがなかった", cn: "从未见到妻子的身影", en: "He had never seen his wife." },
					{ jp: "{夕子|ゆうこ}と{一緒|いっしょ}に{食事|しょくじ}したことがなかった", cn: "从未和夕子一起吃过饭", en: "He had never eaten with Yuko." },
					{ jp: "{好物|こうぶつ}は{一|ひと}つもなかった", cn: "一样爱吃的东西都没有", en: "He had no favorite dishes at all." },
				],
				answer: 1,
				explanation:
					"这句话的主语要往前找：「**それは**私の好物であり、妻の得意料理だった」——「それ」指的是桌上的**筑前煮**。所以「わが家の食卓に姿を見せたことがなかった」＝筑前煮这道菜一年半以来没在餐桌上出现过。1 正确。「姿を見せる」本来用于人，这里是拟人化的说法，用来形容菜肴。",
				explanationEn:
					"The subject of this sentence is earlier: “**That** was my favorite dish, and my wife’s specialty” — “that” is the chikuzen-ni on the table. So “had never shown itself on our table” means the dish had not appeared on the table for a year and a half. 1 is correct. “姿を見せる” is normally used of people; here it is a personification of the dish.",
				choiceNotes: [
					"正确。主语是「それ＝筑前煮」，一年半来没端上过桌。",
					"「姿を見せる」的主语是筑前煮，不是妻子；妻子已经去世，用「姿を見せない」形容不自然。",
					"文中完全没有提到和夕子一起吃饭。",
					"「好物」是用来说明筑前煮的，不是说家里没有爱吃的东西。",
				],
				choiceNotesEn: [
					"Correct. The subject is “that = chikuzen-ni,” which hadn’t been on the table for a year and a half.",
					"The subject of “姿を見せる” is the chikuzen-ni, not the wife; she has already died, so “never showed herself” would be odd.",
					"There is no mention of eating with Yuko.",
					"“Favorite dish” is describing the chikuzen-ni, not saying the family had no favorites.",
				],
			},
			{
				label: "問2",
				jp: "②「こんなこと」とあるが、どういうことか。",
				cn: "文中说②「这样的事」，指的是什么？",
				en: "The text says ② “something like this.” What does that refer to?",
				choices: [
					{ jp: "{料理|りょうり}を{覚|おぼ}えること", cn: "学做菜这件事", en: "Learning to cook" },
					{ jp: "{私|わたし}と{一緒|いっしょ}に{食事|しょくじ}をすること", cn: "和我一起吃饭这件事", en: "Eating a meal with me" },
					{ jp: "{私|わたし}の{好物|こうぶつ}の{筑前煮|ちくぜんに}を{作|つく}ること", cn: "做我爱吃的筑前煮这件事", en: "Making my favorite dish, chikuzen-ni" },
					{ jp: "{簡単|かんたん}な{料理|りょうり}を{準備|じゅんび}すること", cn: "准备简单的饭菜这件事", en: "Preparing a simple meal" },
				],
				answer: 3,
				explanation:
					"「こんなことを考えていたなんて」的内容在**前一段**：为了父亲的生日，事先向姑姑学会了母亲的拿手菜、也是父亲的最爱——筑前煮，并偷偷做好。而且后半句「『今日は簡単なものにするね』と言っていたのに」正说明她嘴上说做简单的、心里却计划着这道费工夫的菜。所以 3 正确。这正是本课要点：指示词的答案在前一段。",
				explanationEn:
					"What “こんなこと” refers to is in the previous paragraph: for her father’s birthday she had secretly learned her mother’s specialty — also her father’s favorite — chikuzen-ni, and made it. And the next line, “even though she had said, ‘I’ll keep it simple today,’” shows that she said she’d make something simple while planning this time-consuming dish. So 3 is correct. This is the day’s key point: the answer to a demonstrative is in the previous paragraph.",
				choiceNotes: [
					"「学做菜」只是手段，父亲感动的是「为我做我爱吃的那道菜」这份心意。",
					"一起吃饭是平常的事，不值得说「なんて（竟然）」。",
					"正确。瞒着父亲学做他最爱的筑前煮，作为生日惊喜。",
					"「簡単なもの」正是她说出口骗父亲的话，与「こんなこと」相反。",
				],
				choiceNotesEn: [
					"“Learning to cook” is only the means; what moves the father is the thought of making his favorite dish for him.",
					"Eating together is ordinary — not something you’d mark with “なんて” (to think that…).",
					"Correct. She secretly learned to make his favorite chikuzen-ni as a birthday surprise.",
					"“Something simple” is the line she used to fool her father — the opposite of “こんなこと.”",
				],
			},
		],
	},

	vocab: [
		{ jp: "指示語", kana: "しじご", cn: "指示词", en: "demonstrative", pos: "名詞" },
		{ jp: "小説", kana: "しょうせつ", cn: "小说", en: "novel; short story", pos: "名詞" },
		{ jp: "里いも", kana: "さといも", cn: "芋头", en: "taro", pos: "名詞" },
		{ jp: "皮をむく", kana: "かわをむく", cn: "削皮", en: "to peel", pos: "表現" },
		{ jp: "鶏肉", kana: "とりにく", cn: "鸡肉", en: "chicken (meat)", pos: "名詞" },
		{ jp: "煮る", kana: "にる", cn: "炖、煮", en: "to simmer; to stew", pos: "動詞" },
		{ jp: "本格的", kana: "ほんかくてき", cn: "正宗的、地道的", en: "authentic; the real thing", pos: "な形" },
		{ jp: "結構", kana: "けっこう", cn: "相当、颇", en: "quite; fairly", pos: "副詞" },
		{ jp: "好物", kana: "こうぶつ", cn: "爱吃的东西", en: "favorite food", pos: "名詞" },
		{ jp: "得意料理", kana: "とくいりょうり", cn: "拿手菜", en: "specialty dish", pos: "名詞" },
		{ jp: "食卓", kana: "しょくたく", cn: "餐桌", en: "dining table", pos: "名詞" },
		{ jp: "姿", kana: "すがた", cn: "身影、样子", en: "figure; appearance", pos: "名詞" },
		{ jp: "隠す", kana: "かくす", cn: "隐藏", en: "to hide", pos: "動詞" },
		{ jp: "さびしさ", cn: "寂寞", en: "loneliness", pos: "名詞" },
		{ jp: "気遣う", kana: "きづかう", cn: "体贴、挂念", en: "to be considerate of", pos: "動詞" },
		{ jp: "胸が熱くなる", kana: "むねがあつくなる", cn: "心头一热", en: "one’s heart warms; to be moved", pos: "表現" },
		{ jp: "箸", kana: "はし", cn: "筷子", en: "chopsticks", pos: "名詞" },
		{ jp: "あきらめる", cn: "放弃", en: "to give up", pos: "動詞" },
	],

	grammar: [
		{
			pattern: "それ／これ／こんなこと（指示語）",
			meaning: "指代前文提到的内容。**可以指一个词，也可以指一整件事**。做题时把候选代入原句验算。",
			meaningEn: "Refers back to something mentioned earlier. It can point to a single word or to a whole event. When you answer, plug each candidate into the original sentence to check.",
			example: { jp: "それは{私|わたし}の{好物|こうぶつ}であり、{妻|つま}の{得意料理|とくいりょうり}だった。", cn: "那是我爱吃的菜，也是妻子的拿手好菜。", en: "That was my favorite dish, and my wife’s specialty." },
			note: "本课要点。答案通常在指示词的**前面**，有时要往前翻一整段。",
			noteEn: "This is the key point of the lesson. The answer is usually before the demonstrative — sometimes a whole paragraph back.",
		},
		{
			pattern: "〜てある",
			formation: "他動詞て形 ＋ ある",
			meaning: "（有人做好后）处于……的状态。强调结果的留存。",
			meaningEn: "To be in the state of having been … (by someone). Stresses that the result remains.",
			example: { jp: "{野菜|やさい}を{鶏肉|とりにく}と{一緒|いっしょ}に{煮|に}てあり", cn: "蔬菜和鸡肉一起炖好了", en: "the vegetables have been simmered together with the chicken" },
		},
		{
			pattern: "〜なんて",
			meaning: "竟然……。表示惊讶、感慨，后半句常省略。",
			meaningEn: "To think that …! Marks surprise or emotion; the rest of the sentence is often left out.",
			example: { jp: "こんなことを{考|かんが}えていたなんて。", cn: "没想到她竟然盘算着这样的事。", en: "To think she had been planning something like this." },
		},
		{
			pattern: "〜というのに",
			meaning: "明明……却……。语气比「のに」更强。",
			meaningEn: "Even though … / and yet …. Stronger than “のに.”",
			example: { jp: "まだ{小学|しょうがく}6{年生|ねんせい}だというのに", cn: "明明才小学六年级", en: "even though she’s only in sixth grade" },
		},
		{
			pattern: "〜てくれる",
			meaning: "（别人）为我做……。本文中反复出现，提示施动者是女儿、受益者是「私」。",
			meaningEn: "(Someone) does … for me. It appears again and again here, showing the doer is the daughter and the one who benefits is “I.”",
			example: { jp: "{純子|じゅんこ}ががんばって{作|つく}ってくれたのだろう。", cn: "想必是纯子努力做给我的吧。", en: "Junko must have worked hard to make it for me." },
		},
		{
			pattern: "〜ように〜ない",
			meaning: "不能像……那样。",
			meaningEn: "Cannot … the way … does.",
			example: { jp: "お{母|かあ}さんのように{上手|じょうず}には{作|つく}れない", cn: "做不到妈妈那么好吃", en: "I can’t make it as well as Mom did" },
		},
		{
			pattern: "〜たことがない",
			meaning: "从未……过。",
			meaningEn: "Have never ….",
			example: { jp: "{食卓|しょくたく}に{姿|すがた}を{見|み}せたことがなかった", cn: "从未在餐桌上出现过", en: "had never shown itself on the table" },
		},
	],
};
