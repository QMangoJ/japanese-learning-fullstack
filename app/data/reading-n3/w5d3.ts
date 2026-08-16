import type { ReadingDay } from "./types";

// 第5週 3日目 家族① — printed pages 80–81
// 別冊 p.6（第5週の解答）は今回のスキャンに含まれていないため、答えは本文から導出。
export const w5d3: ReadingDay = {
	week: 5,
	day: 3,
	label: "家族①",
	labelKana: "かぞく",
	labelEn: "Family ①",
	printedPages: [80, 81],
	answerSource: "derived",

	point: {
		title: "{事実|じじつ}と{筆者|ひっしゃ}の{気持|きも}ちを{区別|くべつ}しよう！",
		titleCn: "区分事实与笔者的心情！",
		titleEn: "Learn to distinguish between the facts and the writer's feelings!",
		figure: {
			alt: "「ほんとに起きたことなの？」「考えてることなの？」と、事実か気持ちかを見分けようとしているキャラクターのイラスト",
			cn: "两个角色在分辨：「这是真的发生过的事吗？」「还是只是心里想的？」",
			en: "Two characters are trying to tell them apart: “Did this really happen?” “Or is it just something they’re thinking?”",
		},
		tips: [
			{
				jp: "「〜（し）たい」「〜と{思|おも}う」「〜と{感|かん}じる」「〜ではないだろうか」──これらの{言葉|ことば}の{前|まえ}は、{事実|じじつ}ではなく、{筆者|ひっしゃ}の{気持|きも}ちを{表|あらわ}しています。",
				cn: "「〜（し）たい」「〜と思う」「〜と感じる」「〜ではないだろうか」——**这些词前面的内容不是事实，而是笔者的心情或想法**。做题时先把「事实」和「感受」分开。",
				en: "“〜(し)たい,” “〜と思う,” “〜と感じる,” “〜ではないだろうか” — what comes before these words is not a fact, but the writer’s feeling or thought. When you answer questions, first separate the facts from the feelings.",
			},
		],
		expressions: [
			{ jp: "〜（し）たい", cn: "想做〜（愿望＝心情）", en: "want to do … (a wish = a feeling)" },
			{ jp: "〜と思う", kana: "おも", cn: "认为〜（判断＝心情）", en: "I think … (a judgment = a feeling)" },
			{ jp: "〜と感じる", kana: "かん", cn: "感觉〜（感受＝心情）", en: "I feel … (a sensation = a feeling)" },
			{ jp: "〜ではないだろうか", cn: "难道不是〜吗（推测＝心情）", en: "isn’t it …? (a guess = a feeling)" },
			{ jp: "〜のだろうか", cn: "究竟是〜吗（疑问＝心情）", en: "I wonder if … (a question = a feeling)" },
			{ jp: "不思議だ", kana: "ふしぎ", cn: "不可思议、想不通", en: "strange, puzzling" },
			{ jp: "暴力を振るう", kana: "ぼうりょくをふるう", cn: "施加暴力", en: "to be violent" },
			{ jp: "がまんする", cn: "忍耐", en: "to put up with" },
		],
	},

	renshu: {
		instruction: "{次|つぎ}の{会話文|かいわぶん}を{読|よ}んで、{後|あと}の{文|ぶん}から{正|ただ}しいものを{選|えら}ぼう。",
		instructionCn: "阅读下面的对话，从后面的句子中选出正确的。（答案在下一页）",
		instructionEn: "Read the conversation below and choose the correct statements from the sentences that follow. (Answers are on the next page.)",
		blocks: [
			{
				type: "speech",
				speaker: "{健|けん}",
				speakerCn: "健",
				speakerEn: "Ken",
				jp: "{母|かあ}さん、{顔|かお}、どうしたの？　また{父|とう}さんに{殴|なぐ}られたの？　ひどいあざ（※1）だよ。",
				cn: "妈，你的脸怎么了？又被爸打了？瘀青得好厉害。",
				en: "Mom, what happened to your face? Did Dad hit you again? That’s a nasty bruise.",
			},
			{
				type: "speech",
				speaker: "{健|けん}の{母|はは}",
				speakerCn: "健的母亲",
				speakerEn: "Ken’s mother",
				jp: "ああ、でも、{大|たい}したことないわよ。お{父|とう}さんね、{今仕事|いましごと}が{大変|たいへん}なのよ。",
				cn: "啊，不过没什么大不了的。你爸他最近工作很辛苦嘛。",
				en: "Oh, it’s nothing serious. Your dad’s been having a hard time at work lately.",
			},
			{
				type: "speech",
				speaker: "{健|けん}",
				speakerCn: "健",
				speakerEn: "Ken",
				jp: "だからって、{母|かあ}さんに{暴力|ぼうりょく}を{振|ふ}るう（※2）なんてひどいよ。{母|かあ}さん、{一生懸命|いっしょうけんめい}やってるじゃないか。{貧乏|びんぼう}（※3）させられているうえに、こんなにひどい{扱|あつか}い（※4）をされるなんて、よくがまんしているよね。おれと{恵子|けいこ}のことなんか{気|き}にせず、{離婚|りこん}しちゃえばいいんだよ。",
				cn: "就算这样，对妈妈动手也太过分了。妈你不是一直很拼命吗。既要被迫过苦日子，还要受这种对待，你居然忍得下来。别管我和惠子了，干脆离婚算了。",
				en: "Even so, being violent to you is awful. You’ve been working so hard. Being made to live in poverty on top of being treated like this — I don’t know how you put up with it. Forget about Keiko and me, and just get a divorce.",
			},
			{
				type: "speech",
				speaker: "{健|けん}の{母|はは}",
				speakerCn: "健的母亲",
				speakerEn: "Ken’s mother",
				jp: "そういうわけにはいかない（※5）わよ。あれで、{優|やさ}しいところもあるのよ。",
				cn: "那可不行。他那个人啊，其实也有温柔的一面呢。",
				en: "I can’t do that. He has a gentle side too, you know.",
			},
		],
		footnotes: [
			{ marker: "※1", term: "あざ", jp: "a bruise", cn: "瘀青、青斑", en: "a bruise" },
			{ marker: "※2", term: "暴力を振るう", jp: "to be violent", cn: "施加暴力", en: "to be violent" },
			{ marker: "※3", term: "貧乏", jp: "poor / poverty", cn: "贫穷", en: "poor / poverty" },
			{ marker: "※4", term: "扱い", jp: "a treatment", cn: "对待", en: "a treatment" },
			{ marker: "※5", term: "そういうわけにはいかない", jp: "I can't do that.", cn: "那样可不行、不能那么做", en: "I can't do that." },
		],
		choices: [
			{ jp: "{健|けん}の{母|はは}は{夫|おっと}に{殴|なぐ}られた。", cn: "健的母亲被丈夫打了。", en: "Ken’s mother was hit by her husband." },
			{ jp: "{健|けん}の{母|はは}の{父親|ちちおや}は{仕事|しごと}が{忙|いそが}しい。", cn: "健的母亲的父亲工作很忙。", en: "Ken’s mother’s father is busy with work." },
			{ jp: "{健|けん}の{母|はは}は{離婚|りこん}をしたい。", cn: "健的母亲想离婚。", en: "Ken’s mother wants a divorce." },
			{ jp: "{健|けん}は{父親|ちちおや}が{好|す}きだ。", cn: "健喜欢父亲。", en: "Ken likes his father." },
			{ jp: "{健|けん}は{両親|りょうしん}が{離婚|りこん}してもいいと{思|おも}っている。", cn: "健认为父母离婚也没关系。", en: "Ken thinks it would be all right if his parents got divorced." },
		],
		answers: [1, 5],
		hint: {
			jp: "「だからって」（＝だからといって）。「お{父|とう}さん」は{健|けん}の{父|ちち}であって、{母|はは}の{父親|ちちおや}ではない。",
			cn: "「だからって」＝「だからといって（即使那样）」。另外要注意：「お父さん」指的是健的父亲，不是母亲的父亲；母亲说「そういうわけにはいかない」，说明她并不想离婚。",
			en: "“だからって” = “だからといって” (even so). Also note: “お父さん” is Ken’s father, not his mother’s father. The mother says “I can’t do that,” so she does not want a divorce.",
		},
	},

	mondai: {
		instruction: "{次|つぎ}の{文章|ぶんしょう}を{読|よ}んで、{後|あと}の{問|と}いに{答|こた}えなさい。",
		instructionCn: "阅读下面的文章，回答后面的问题。（原书答案在别册 p.6）",
		instructionEn: "Read the passage below and answer the questions that follow. (Answers are in the supplement, p. 6.)",
		blocks: [
			{
				type: "paragraph",
				indent: true,
				jp: "ぼくは{父親|ちちおや}に{対|たい}していい{思|おも}い{出|で}がない。{父|ちち}は{画家|がか}だった。{才能|さいのう}はあったようだが、{昼間|ひるま}から{酒|さけ}を{飲|の}み、{仕事|しごと}をしているのかしていないのかわからないような{生活|せいかつ}を{送|おく}っていた＊。{父|ちち}はぼくたち{家族|かぞく}の{生活|せいかつ}のことはまるで{考|かんが}えず（※）、{母|はは}は{本当|ほんとう}に{苦労|くろう}をしてきた。{気|き}に{入|い}らないことがあるとすぐに{母|はは}に{暴力|ぼうりょく}を{振|ふ}るった。{食事|しょくじ}がまずいと{皿|さら}を{投|な}げられ、{真夜中|まよなか}に{酒|さけ}を{買|か}いに{行|い}かされ、それでも{母|はは}は{文句一|もんくひと}つ{言|い}わない＊＊。なぜそこまでがまんをするのだろうと{不思議|ふしぎ}に{感|かん}じていた。",
				cn: "对于父亲，我没有什么美好的回忆。父亲曾是个画家。他似乎是有才华的，可是大白天就开始喝酒，过着让人分不清他到底在不在工作的生活＊。父亲完全不考虑我们一家的生计，母亲真是吃尽了苦头。只要有一点不合心意，他马上就对母亲动手。嫌饭菜难吃就摔盘子，半夜还要支使母亲去买酒，即便如此，母亲也从不抱怨一句＊＊。我一直想不通，她为什么要忍到这个地步。",
				en: "I have no good memories of my father. He was a painter. He seemed to have talent, but he drank from the middle of the day and led a life where you couldn’t tell whether he was working or not＊. He never thought about our family’s livelihood at all, and my mother really had a hard time. If something didn’t please him, he immediately became violent toward her. If the food was bad he threw plates; he made her go out at midnight to buy more drink — and still she never complained once＊＊. I always found it strange that she would put up with so much.",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "{父|ちち}の{作品|さくひん}が{賞|しょう}をとり、{海外|かいがい}で{紹介|しょうかい}されてからは、{生活|せいかつ}に{困|こま}ることはなくなったが、やはり{酒|さけ}や{暴力|ぼうりょく}は{変|か}わらなかった。そんな{父|ちち}が{亡|な}くなって{母|はは}はほっとしただろうと{思|おも}っていたのに、なぜか{父|ちち}のかいた{絵|え}を{見|み}ながら{毎日泣|まいにちな}いている。{父|ちち}のことを「いい{人|ひと}だった。」と{言|い}う。{夫婦|ふうふ}とは（　　　　　）と{思|おも}う。",
				cn: "自从父亲的作品获奖、被介绍到海外之后，生活上不再拮据，但酗酒和暴力依旧没有改变。这样的父亲去世后，我本以为母亲一定松了一口气，可她却不知为何每天看着父亲画的画流泪。她说父亲「是个好人」。夫妻这种关系，我觉得实在是（　　　　　）。",
				en: "After my father’s work won a prize and was introduced overseas, we no longer had money troubles — but the drinking and the violence didn’t change. When a father like that died, I thought my mother would be relieved, and yet for some reason she cries every day looking at the pictures he painted. She says he “was a good man.” Being a married couple, I think, is (　　　　　).",
			},
		],
		footnotes: [{ marker: "※", term: "まるで〜ず", jp: "全然〜ない", cn: "完全不〜", en: "not … at all" }],
		pageNotes: [
			{
				jp: "＊ with the life he lead, I never knew whether he actually did any work",
				cn: "＊他过着那样的生活，我从来不知道他到底有没有在工作。",
				en: "＊ with the life he lead, I never knew whether he actually did any work",
			},
			{ jp: "＊＊ my mother never complained once", cn: "＊＊母亲一句怨言也没有。", en: "＊＊ my mother never complained once" },
		],
		questions: [
			{
				label: "問1",
				jp: "「なぜそこまでがまんをするのだろうと{不思議|ふしぎ}に{感|かん}じていた」とあるが、{筆者|ひっしゃ}は{母|はは}に{対|たい}してどのように{思|おも}っていたのか。",
				cn: "文中说「我一直想不通她为什么要忍到这个地步」，那么笔者对母亲是怎么想的？",
				en: "The text says “I always found it strange that she would put up with so much.” How did the writer feel about his mother?",
				choices: [
					{ jp: "そんなにがまんしている{母|はは}はとてもえらい。", cn: "这么能忍的母亲真了不起。", en: "A mother who puts up with so much is really admirable." },
					{ jp: "そんなにがまんをするほど{父|ちち}のことを{愛|あい}しているのだろう。", cn: "忍到这个地步，大概是很爱父亲吧。", en: "She must love Father so much that she puts up with all that." },
					{ jp: "そんなにがまんをしないで{文句|もんく}ぐらい{言|い}えばいいのに。", cn: "不必忍成那样，至少该抱怨几句才对。", en: "She shouldn’t put up with so much — she should at least complain a little." },
					{ jp: "そんなにがまんをしないで{一緒|いっしょ}にお{酒|さけ}を{飲|の}めばいいのに。", cn: "不必忍成那样，一起喝酒不就好了。", en: "She shouldn’t put up with so much — she should just drink with him." },
				],
				answer: 3,
				explanation:
					"前一句是「それでも母は文句一つ言わない」——即便如此母亲也一句怨言都没有。紧接着写「なぜそこまでがまんをするのだろうと不思議に感じていた」，也就是**不理解、想不通**。这种「想不通」的背后，是「至少抱怨一下也好啊」的心情，所以 3 正确。本课要点提醒我们：「不思議に感じていた」是心情而不是事实，要顺着这个心情去找选项。",
				explanationEn:
					"The previous sentence is “and still she never complained once.” Then comes “I always found it strange that she would put up with so much” — in other words, he cannot understand it. Behind that “I don’t get it” is the feeling “she should at least complain a little,” so 3 is correct. The day’s key point: “不思議に感じていた” is a feeling, not a fact — follow that feeling to the right choice.",
				choiceNotes: [
					"如果觉得「了不起」，就不会用「不思議に感じていた（想不通）」了。",
					"这是一种「解释」，而笔者恰恰是无法解释才觉得不可思议；而且这个疑问到文末仍未解开。",
					"正确。「文句一つ言わない」→「文句ぐらい言えばいいのに」，正是「不思議」的具体内容。",
					"文中没有任何关于一起喝酒的内容。",
				],
				choiceNotesEn: [
					"If he thought she was “admirable,” he wouldn’t say he “found it strange.”",
					"This is an explanation, but the writer finds it strange precisely because he cannot explain it — and the question is still unanswered at the end.",
					"Correct. “She never complained once” → “she should at least complain” is exactly what “strange” is about.",
					"There is nothing in the text about drinking together.",
				],
			},
			{
				label: "問2",
				jp: "（　　）に{入|はい}る{言葉|ことば}として{最|もっと}も{適当|てきとう}なものはどれか。",
				cn: "填入（　　）中最恰当的词语是哪一个？",
				en: "Which word fits best in the blank (　　)?",
				choices: [
					{ jp: "いやなものだ", cn: "是件讨厌的事", en: "is something unpleasant" },
					{ jp: "{悲|かな}しいものだ", cn: "是件悲伤的事", en: "is something sad" },
					{ jp: "{美|うつく}しいものだ", cn: "是件美好的事", en: "is something beautiful" },
					{ jp: "わからないものだ", cn: "是件让人搞不懂的事", en: "is something you just can’t understand" },
				],
				answer: 4,
				explanation:
					"全文贯穿着一个「想不通」：母亲挨打却不抱怨——「なぜそこまでがまんをするのだろうと不思議に感じていた」；父亲去世后本以为她会松口气——「ほっとしただろうと思っていたのに、なぜか…毎日泣いている」，还说父亲「いい人だった」。作者始终无法理解母亲的心情，所以结尾自然是「夫婦とはわからないものだ」。4 正确。",
				explanationEn:
					"The whole piece is held together by “I don’t get it”: his mother is beaten and never complains — “I always found it strange that she would put up with so much”; after his father dies he thought she would be relieved — “I thought she would be relieved, and yet she cries every day,” and she even says he “was a good man.” The writer never understands his mother’s feelings, so the natural ending is “being a married couple is something you just can’t understand.” 4 is correct.",
				choiceNotes: [
					"如果结论是「讨厌」，就无法解释母亲每天流泪、称父亲为好人这一部分。",
					"文章的落点不是悲伤，而是困惑——两个「なぜ」把全文串了起来。",
					"父亲的酗酒和暴力始终没有改变，说「美好」与前文完全矛盾。",
					"正确。两处「なぜ」＋「不思議に感じていた」，结论就是「搞不懂」。",
				],
				choiceNotesEn: [
					"If the conclusion were “unpleasant,” it wouldn’t explain the mother crying every day and calling the father a good man.",
					"The landing point is not sadness but puzzlement — the two “why”s hold the piece together.",
					"The father’s drinking and violence never changed, so “beautiful” contradicts the rest of the text.",
					"Correct. Two “why”s plus “I found it strange” lead to the conclusion “I just don’t understand.”",
				],
			},
		],
	},

	vocab: [
		{ jp: "事実", kana: "じじつ", cn: "事实", en: "fact", pos: "名詞" },
		{ jp: "区別する", kana: "くべつする", cn: "区分", en: "to distinguish", pos: "動詞" },
		{ jp: "筆者", kana: "ひっしゃ", cn: "笔者、作者", en: "the writer", pos: "名詞" },
		{ jp: "画家", kana: "がか", cn: "画家", en: "painter", pos: "名詞" },
		{ jp: "才能", kana: "さいのう", cn: "才华", en: "talent", pos: "名詞" },
		{ jp: "昼間", kana: "ひるま", cn: "白天", en: "daytime", pos: "名詞" },
		{ jp: "苦労", kana: "くろう", cn: "辛苦、操劳", en: "hardship; toil", pos: "名詞・動詞" },
		{ jp: "気に入らない", kana: "きにいらない", cn: "不合心意", en: "not to one’s liking", pos: "表現" },
		{ jp: "暴力", kana: "ぼうりょく", cn: "暴力", en: "violence", pos: "名詞" },
		{ jp: "真夜中", kana: "まよなか", cn: "半夜", en: "the middle of the night", pos: "名詞" },
		{ jp: "文句", kana: "もんく", cn: "牢骚、抱怨", en: "complaint", pos: "名詞" },
		{ jp: "がまんする", cn: "忍耐", en: "to put up with; to endure", pos: "動詞" },
		{ jp: "不思議", kana: "ふしぎ", cn: "不可思议、想不通", en: "strange; puzzling", pos: "な形" },
		{ jp: "賞をとる", kana: "しょうをとる", cn: "获奖", en: "to win a prize", pos: "表現" },
		{ jp: "亡くなる", kana: "なくなる", cn: "去世", en: "to pass away", pos: "動詞" },
		{ jp: "ほっとする", cn: "松一口气", en: "to feel relieved", pos: "動詞" },
		{ jp: "夫婦", kana: "ふうふ", cn: "夫妻", en: "a married couple", pos: "名詞" },
		{ jp: "殴る", kana: "なぐる", cn: "殴打", en: "to hit; to punch", pos: "動詞" },
		{ jp: "あざ", cn: "瘀青", en: "a bruise", pos: "名詞" },
		{ jp: "離婚", kana: "りこん", cn: "离婚", en: "divorce", pos: "名詞・動詞" },
		{ jp: "貧乏", kana: "びんぼう", cn: "贫穷", en: "poverty; poor", pos: "な形" },
	],

	grammar: [
		{
			pattern: "〜と{思|おも}う／〜と{感|かん}じる／〜のだろうか",
			meaning: "这些词的前面是**笔者的想法、感受**，不是客观事实。读议论文、随笔时要把两者分开。",
			meaningEn: "What comes before these words is the writer’s thought or feeling, not an objective fact. When you read essays, keep the two apart.",
			example: {
				jp: "なぜそこまでがまんをするのだろうと{不思議|ふしぎ}に{感|かん}じていた。",
				cn: "我一直想不通她为什么要忍到这个地步。",
				en: "I always found it strange that she would put up with so much.",
			},
			note: "本课要点。选项里如果把「心情」写成了「事实」，那就是错的。",
			noteEn: "This is the key point of the lesson. If a choice turns a feeling into a fact, it is wrong.",
		},
		{
			pattern: "〜のに",
			meaning: "明明……却……。表示与预期相反，本文中用来制造转折。",
			meaningEn: "Even though … / and yet …. Marks something contrary to expectation; used here to create a twist.",
			example: {
				jp: "{母|はは}はほっとしただろうと{思|おも}っていたのに、なぜか{毎日泣|まいにちな}いている。",
				cn: "本以为母亲会松一口气，她却不知为何每天流泪。",
				en: "I thought my mother would be relieved, and yet for some reason she cries every day.",
			},
		},
		{
			pattern: "〜（さ）せられる（使役受身）",
			meaning: "被迫……。",
			meaningEn: "To be made to ….",
			example: { jp: "{真夜中|まよなか}に{酒|さけ}を{買|か}いに{行|い}かされ", cn: "半夜被支使去买酒", en: "was made to go buy alcohol in the middle of the night" },
		},
		{
			pattern: "まるで〜ない／まるで〜ず",
			meaning: "完全不……。「ず」是「ない」的书面形式。",
			meaningEn: "Not … at all. “ず” is the written form of “ない.”",
			example: { jp: "{家族|かぞく}の{生活|せいかつ}のことはまるで{考|かんが}えず", cn: "完全不考虑家人的生计", en: "never thought about the family’s livelihood at all" },
		},
		{
			pattern: "〜{一|ひと}つ〜ない",
			formation: "名詞 ＋ 一つ ＋ 否定",
			meaning: "连一个……都没有。强调彻底的否定。",
			meaningEn: "Not even one …. Emphasizes a complete negative.",
			example: { jp: "{母|はは}は{文句一|もんくひと}つ{言|い}わない。", cn: "母亲连一句怨言都没有。", en: "Mother never complained even once." },
		},
		{
			pattern: "〜とは〜ものだ",
			formation: "名詞 ＋ とは ＋ 〜ものだ",
			meaning: "所谓……就是……。用于下结论、发感慨，随笔的结尾常见。",
			meaningEn: "So-called … is …. Used to draw a conclusion or sigh over something; common at the end of essays.",
			example: { jp: "{夫婦|ふうふ}とはわからないものだと{思|おも}う。", cn: "我觉得夫妻这种关系真是让人搞不懂。", en: "I think being a married couple is something you just can’t understand." },
		},
		{
			pattern: "だからって（＝だからといって）",
			meaning: "即使那样也……。用来反驳对方的理由。",
			meaningEn: "Even so / that doesn’t mean …. Used to reject the other person’s reason.",
			example: { jp: "だからって、{母|かあ}さんに{暴力|ぼうりょく}を{振|ふ}るうなんてひどいよ。", cn: "就算那样，对妈妈动手也太过分了。", en: "Even so, being violent to Mom is awful." },
		},
	],
};
