import type { ReadingDay } from "./types";

// 第4週 6日目 まんが — printed pages 70–71
export const w4d6: ReadingDay = {
	week: 4,
	day: 6,
	label: "まんが",
	labelEn: "Comics and Cartoons",
	printedPages: [70, 71],
	answerSource: "book",

	point: {
		title: "たとえを{表|あらわ}す{表現|ひょうげん}に{注意|ちゅうい}しよう！",
		titleCn: "注意表示比喻的表达方式！",
		titleEn: "Pay attention to the expressions used in metaphors!",
		figure: {
			alt: "「あの子とデートしているなんて、夢みたい……」と幸せそうに想像しているキャラクターに、別のキャラクターが「夢だよ！」とつっこんでいるイラスト",
			cn: "一个角色幸福地幻想着「能和那孩子约会，简直像做梦一样……」，另一个角色吐槽道「那就是在做梦啊！」",
			en: "One character happily daydreams, “Dating that girl — it’s just like a dream …,” and another snaps, “That’s because it is a dream!”",
		},
		tips: [
			{
				jp: "「{夢|ゆめ}」は「たとえ」で、{事実|じじつ}ではないことに{注意|ちゅうい}しましょう。",
				cn: "「梦」是比喻，不是事实——读到比喻表达时，要分清「像什么」和「实际是什么」。",
				en: "“Dream” here is a metaphor, not a fact. When you see a comparison, keep “what it is like” separate from “what it actually is.”",
			},
		],
		expressions: [
			{ jp: "まるで夢のようだ／まるで夢みたいだ", kana: "ゆめ", cn: "简直像做梦一样", en: "It's just like a dream." },
			{ jp: "夢のような話／夢みたいな話", cn: "像梦一样的事（好得不真实）", en: "a dreamlike story" },
			{ jp: "夢のように幸せ／夢みたいに幸せ", kana: "しあわ", cn: "幸福得像在梦里", en: "as happy as in a dream" },
			{ jp: "まるで〜のようだ", cn: "简直就像〜（书面）", en: "just like …" },
			{ jp: "まるで〜みたいだ", cn: "简直就像〜（口语）", en: "just like … (colloquial)" },
			{ jp: "〜のように／〜みたいに", cn: "像〜一样地（修饰动词・形容词）", en: "like … (modifies a verb or adjective)" },
			{ jp: "〜のような／〜みたいな", cn: "像〜一样的（修饰名词）", en: "like … (modifies a noun)" },
		],
	},

	renshu: {
		instruction: "{次|つぎ}の{会話文|かいわぶん}を{読|よ}んで、{後|あと}の{文|ぶん}から{正|ただ}しいものを{選|えら}ぼう。",
		instructionCn: "阅读下面的对话，从后面的句子中选出正确的。（答案在下一页）",
		instructionEn: "Read the dialogue below and choose the correct statements from the sentences that follow. (Answers are on the next page.)",
		blocks: [
			{
				type: "speech",
				speaker: "{幼稚園|ようちえん}の{先生|せんせい}",
				speakerCn: "幼儿园老师",
				speakerEn: "Kindergarten teacher",
				jp: "{健|けん}ちゃんはよくお{絵|え}かき（※1）しますね。",
				cn: "小健很爱画画呢。",
				en: "Ken draws a lot, doesn’t he?",
			},
			{
				type: "speech",
				speaker: "{健|けん}の{母親|ははおや}",
				speakerCn: "小健的母亲",
				speakerEn: "Ken’s mother",
				jp: "はい、{家|いえ}でも{一日中絵|いちにちじゅうえ}をかいているんです。",
				cn: "是的，在家也整天画个不停。",
				en: "Yes, at home he draws all day long too.",
			},
			{
				type: "speech",
				speaker: "{幼稚園|ようちえん}の{先生|せんせい}",
				speakerCn: "幼儿园老师",
				speakerEn: "Kindergarten teacher",
				jp: "{幼稚園|ようちえん}でもそうですよ。この{間|あいだ}も{私|わたし}の{絵|え}をかいて{見|み}せてくれたんですが、{私|わたし}、カバ（※2）をかいたのかと{思|おも}って……。それで、{健|けん}ちゃん、ちょっと{機嫌|きげん}が{悪|わる}くなっちゃって（※3）……。",
				cn: "在幼儿园也是这样。前几天他还画了我给我看，我还以为他画的是河马……结果小健就有点不高兴了……",
				en: "It’s the same at kindergarten. The other day he drew a picture of me and showed it to me, and I thought he’d drawn a hippo … so Ken got a little upset …",
			},
			{ type: "speech", speaker: "{健|けん}の{母親|ははおや}", speakerCn: "小健的母亲", speakerEn: "Ken’s mother", jp: "す、すみません。", cn: "真、真是不好意思。", en: "I-I’m so sorry." },
			{
				type: "speech",
				speaker: "{幼稚園|ようちえん}の{先生|せんせい}",
				speakerCn: "幼儿园老师",
				speakerEn: "Kindergarten teacher",
				jp: "いえ、いえ、いいんですよ。{私|わたし}は、カバみたいに{太|ふと}っていますから……。とても{観察力|かんさつりょく}が{鋭|するど}い（※4）ということですよ。",
				cn: "不不，没关系的。我本来就胖得像河马嘛……这说明他观察力很敏锐呢。",
				en: "No, no, it’s fine. I am as plump as a hippo … It just means he has a very sharp eye.",
			},
		],
		footnotes: [
			{ marker: "※1", term: "お絵かき", jp: "絵をかくこと（子どもの言葉）", cn: "画画（儿语）", en: "drawing (children’s word)" },
			{ marker: "※2", term: "カバ", jp: "a hippopotamus", cn: "河马", en: "a hippopotamus" },
			{ marker: "※3", term: "機嫌が悪くなる", jp: "to get in a bad mood, to get upset", cn: "不高兴、闹情绪", en: "to get in a bad mood, to get upset" },
			{ marker: "※4", term: "観察力が鋭い", jp: "very perceptive", cn: "观察力敏锐", en: "very perceptive" },
		],
		choices: [
			{ jp: "{健|けん}ちゃんは{絵|え}をかくのが{好|す}きである。", cn: "小健喜欢画画。", en: "Ken likes to draw." },
			{ jp: "{健|けん}ちゃんは、{幼稚園|ようちえん}でカバの{絵|え}をかいた。", cn: "小健在幼儿园画了河马的画。", en: "Ken drew a picture of a hippo at kindergarten." },
			{ jp: "{健|けん}ちゃんは、{幼稚園|ようちえん}で{絵|え}をかいたとき{具合|ぐあい}が{悪|わる}くなった。", cn: "小健在幼儿园画画时身体不舒服了。", en: "Ken felt unwell when he was drawing at kindergarten." },
			{ jp: "{幼稚園|ようちえん}の{先生|せんせい}は、{本当|ほんとう}はやせている。", cn: "幼儿园老师其实很瘦。", en: "The kindergarten teacher is actually thin." },
			{ jp: "{幼稚園|ようちえん}の{先生|せんせい}によると、{健|けん}ちゃんは{観察力|かんさつりょく}がある。", cn: "据幼儿园老师说，小健很有观察力。", en: "According to the teacher, Ken is very observant." },
		],
		answers: [1, 5],
		hint: {
			jp: "{健|けん}ちゃんがかいたのは「{先生|せんせい}の{絵|え}」。「カバみたいに{太|ふと}っている」は{先生|せんせい}{自身|じしん}のたとえ。「{機嫌|きげん}が{悪|わる}い」≠「{具合|ぐあい}が{悪|わる}い」。",
			cn: "小健画的是「老师」，不是河马；「像河马一样胖」是老师说自己的比喻，所以老师并不瘦；「機嫌が悪い（闹情绪）」和「具合が悪い（身体不舒服）」是两个不同的词。",
			en: "Ken drew “the teacher,” not a hippo. “As plump as a hippo” is the teacher’s metaphor about herself, so she is not thin. Kigen ga warui (in a bad mood) is not the same as guai ga warui (feeling unwell).",
		},
	},

	mondai: {
		instruction: "{次|つぎ}の4コマまんがを{読|よ}んで、{右|みぎ}の{問|と}いに{答|こた}えなさい。",
		instructionCn: "阅读下面的四格漫画，回答右边的问题。（答案在别册 p.5）",
		instructionEn: "Read the four-panel comic below and answer the questions on the right. (Answers are in the separate booklet, p. 5.)",
		blocks: [
			{
				type: "figure",
				alt: "4コマまんが。①男の子がうれしそうに絵を差し出す ②ママが絵を見て感想を言う ③男の子ががっかりした顔で説明する ④ママが絵をよく見て困った顔をする",
				cn: "四格漫画：①男孩高兴地把画递过来　②妈妈看着画说出感想　③男孩一脸失望地解释　④妈妈仔细看画后露出困扰的表情。",
				en: "A four-panel comic: ① A boy happily holds out a drawing. ② Mom looks at it and comments. ③ The boy explains with a disappointed face. ④ Mom looks more carefully and looks embarrassed.",
			},
			{
				type: "list",
				ordered: true,
				items: [
					{
						jp: "（1コマ目）{男|おとこ}の{子|こ}：「ママー　みてみて！　おえかきしたの」",
						cn: "（第 1 格）男孩：「妈妈——快看快看！我画画了！」（一脸高兴）",
						en: "(Panel 1) Boy: “Mom — look, look! I drew a picture!” (looking happy)",
					},
					{
						jp: "（2コマ目）ママ：「あら、こわ〜い！　ライオンさんね。じょうずにかけたわね！」",
						cn: "（第 2 格）妈妈：「哎呀，好可怕！是狮子呀。画得真好呢！」",
						en: "(Panel 2) Mom: “Oh, scary! It’s a lion. You drew it so well!”",
					},
					{
						jp: "（3コマ目）{男|おとこ}の{子|こ}：「それ……ママが{笑|わら}っているところなんだけど」",
						cn: "（第 3 格）男孩：「那个……那是妈妈在笑的样子啊……」（一脸失望）",
						en: "(Panel 3) Boy: “That’s … Mom smiling …” (looking disappointed)",
					},
					{
						jp: "（4コマ目）ママ：「……」（{困|こま}った{顔|かお}。{絵|え}にはライオンのような{顔|かお}がかかれている）",
						cn: "（第 4 格）妈妈：「……」（一脸困扰。画上是一张狮子似的脸）",
						en: "(Panel 4) Mom: “…” (an embarrassed face. The drawing shows a lion-like face.)",
					},
				],
			},
		],
		questions: [
			{
				label: "問1",
				jp: "（1{番目|ばんめ}の{絵|え}）{男|おとこ}の{子|こ}はどうしてうれしそうな{顔|かお}をしているのか。",
				cn: "（第 1 格）男孩为什么一脸高兴？",
				en: "(Panel 1) Why does the boy look happy?",
				choices: [
					{ jp: "ママが{絵|え}をかいてもいいと{言|い}ったから。", cn: "因为妈妈说可以画画。", en: "Because Mom said it was all right to draw." },
					{ jp: "{絵|え}が{上手|じょうず}にかけたから。", cn: "因为画画得很好。", en: "Because he drew the picture well." },
				],
				answer: 2,
				explanation:
					"男孩说「みてみて！　おえかきしたの」——一边把画递出来一边要妈妈看，是因为自己觉得画得不错、想得到夸奖。所以 2 正确。漫画题要从「表情＋台词」一起推断人物的心情。",
				explanationEn:
					"The boy says “Look, look! I drew a picture!” — holding the drawing out for Mom to see because he thinks he did well and wants praise. So 2 is correct. On comic questions, read the expression and the lines together to infer how the character feels.",
				choiceNotes: [
					"漫画里没有出现妈妈允许他画画的情节。",
					"正确。得意地展示自己的作品。",
				],
				choiceNotesEn: [
					"The comic never shows Mom giving him permission to draw.",
					"Correct. He is proudly showing off his work.",
				],
			},
			{
				label: "問2",
				jp: "（2{番目|ばんめ}の{絵|え}）ママは{男|おとこ}の{子|こ}がかいた{絵|え}を{見|み}てどう{思|おも}ったのか。",
				cn: "（第 2 格）妈妈看了男孩画的画之后是怎么想的？",
				en: "(Panel 2) What did Mom think when she saw the boy’s drawing?",
				choices: [
					{ jp: "うまいと{思|おも}った。", cn: "觉得画得好。", en: "She thought it was well drawn." },
					{ jp: "{恐|おそ}ろしいと{思|おも}った。", cn: "觉得很可怕。", en: "She thought it was frightening." },
				],
				answer: 1,
				explanation:
					"妈妈说「じょうずにかけたわね！」——明确夸奖画得好，所以 1 正确。前面的「こわ〜い！」不是妈妈真的害怕，而是在配合孩子、夸奖「狮子画得很有气势」。这正是本课要点：要区分字面和实际含义。",
				explanationEn:
					"Mom says “You drew it so well!” — clearly praising the drawing, so 1 is correct. The earlier “Scary!” is not real fear; she is playing along and praising how impressive the “lion” looks. That is this lesson’s point: separate the literal words from the real meaning.",
				choiceNotes: [
					"正确。「じょうずにかけたわね！」是直接的夸奖。",
					"「こわ〜い！」是称赞画得逼真的语气，妈妈本人并没有被吓到。",
				],
				choiceNotesEn: [
					"Correct. “You drew it so well!” is direct praise.",
					"“Scary!” is a tone of praising how lifelike it is; Mom herself is not frightened.",
				],
			},
			{
				label: "問3",
				jp: "（3{番目|ばんめ}の{絵|え}）{男|おとこ}の{子|こ}はどうしてがっかりしたような{顔|かお}をしているのか。",
				cn: "（第 3 格）男孩为什么一脸失望？",
				en: "(Panel 3) Why does the boy look disappointed?",
				choices: [
					{ jp: "ママが{絵|え}をまるでライオンのようだと{言|い}ったから。", cn: "因为妈妈说这画简直像狮子。", en: "Because Mom said the drawing was just like a lion." },
					{ jp: "ママの{顔|かお}をかいたのに、ライオンと{間違|まちが}われたから。", cn: "因为他画的是妈妈的脸，却被当成了狮子。", en: "Because he drew Mom’s face but it was mistaken for a lion." },
				],
				answer: 2,
				explanation:
					"男孩说「それ……ママが笑っているところなんだけど」——他画的其实是妈妈在笑的样子，妈妈却看成了狮子。被认错才是他失望的原因，所以 2 正确。注意 1 说的是「像狮子（比喻）」，而妈妈是真的以为画的就是狮子，两者不同。",
				explanationEn:
					"The boy says “That’s … Mom smiling” — he drew Mom smiling, but she took it for a lion. Being mistaken is why he is disappointed, so 2 is correct. Note that 1 says “like a lion” (a metaphor), but Mom actually thought it was a lion. Those are not the same.",
				choiceNotes: [
					"妈妈不是说「像狮子」，而是直接断定「ライオンさんね」——认成了狮子本身。",
					"正确。画的是妈妈，却被误认成狮子。",
				],
				choiceNotesEn: [
					"Mom did not say “like a lion”; she stated “It’s a lion” — she took it for a lion itself.",
					"Correct. He drew Mom, but it was mistaken for a lion.",
				],
			},
			{
				label: "問4",
				jp: "（4{番目|ばんめ}の{絵|え}）ママはどうして{困|こま}った{顔|かお}をしているのか。",
				cn: "（第 4 格）妈妈为什么一脸困扰？",
				en: "(Panel 4) Why does Mom look embarrassed?",
				choices: [
					{ jp: "{絵|え}が{全然人間|ぜんぜんにんげん}には{見|み}えないくらい{下手|へた}だったから。", cn: "因为画得太差，完全看不出是人。", en: "Because the drawing was so bad it did not look human at all." },
					{
						jp: "{絵|え}がこわいライオンだと{思|おも}っていたら、{自分|じぶん}の{顔|かお}だったから。",
						cn: "因为她以为画的是可怕的狮子，结果那是自己的脸。",
						en: "Because she thought it was a scary lion, but it was her own face.",
					},
				],
				answer: 2,
				explanation:
					"妈妈刚刚才说「こわ〜い！　ライオンさんね」，结果那张「可怕的狮子」正是自己的脸——既不好意思，又不知该怎么收场，所以一脸困扰。2 正确。这个笑点就建立在「误认」之上。",
				explanationEn:
					"Mom has just said “Scary! It’s a lion,” and that “scary lion” turns out to be her own face — she is embarrassed and does not know how to recover, so she looks stuck. Choice 2 is correct. The joke rests on the misidentification.",
				choiceNotes: [
					"如果只是嫌画得差，妈妈不会是「困扰」而是别的表情；而且她还夸过「じょうずにかけた」。",
					"正确。自己把儿子画的自己夸成了「可怕的狮子」，尴尬得说不出话。",
				],
				choiceNotesEn: [
					"If she only thought it was badly drawn she would not look “stuck,” and she has already praised it as well drawn.",
					"Correct. She has just praised her son’s drawing of her as a “scary lion,” and she is too embarrassed to speak.",
				],
			},
		],
	},

	vocab: [
		{ jp: "まんが", cn: "漫画", en: "comic / manga", pos: "名詞" },
		{ jp: "たとえ", cn: "比喻", en: "a metaphor / comparison", pos: "名詞" },
		{ jp: "まるで", cn: "简直、宛如", en: "just like / exactly as if", pos: "副詞" },
		{ jp: "幼稚園", kana: "ようちえん", cn: "幼儿园", en: "kindergarten", pos: "名詞" },
		{ jp: "お絵かき", kana: "おえかき", cn: "画画（儿语）", en: "drawing (children’s word)", pos: "名詞" },
		{ jp: "カバ", cn: "河马", en: "hippopotamus", pos: "名詞" },
		{ jp: "機嫌", kana: "きげん", cn: "情绪、心情", en: "mood", pos: "名詞" },
		{ jp: "観察力", kana: "かんさつりょく", cn: "观察力", en: "power of observation", pos: "名詞" },
		{ jp: "鋭い", kana: "するどい", cn: "敏锐、锋利", en: "sharp / keen", pos: "い形" },
		{ jp: "一日中", kana: "いちにちじゅう", cn: "一整天", en: "all day long", pos: "名詞" },
		{ jp: "この間", kana: "このあいだ", cn: "前几天", en: "the other day", pos: "名詞" },
		{ jp: "がっかりする", cn: "失望", en: "to be disappointed", pos: "動詞" },
		{ jp: "恐ろしい", kana: "おそろしい", cn: "可怕", en: "frightening", pos: "い形" },
		{ jp: "間違われる", kana: "まちがわれる", cn: "被弄错、被认错", en: "to be mistaken for", pos: "動詞" },
		{ jp: "困る", kana: "こまる", cn: "为难、困扰", en: "to be at a loss / embarrassed", pos: "動詞" },
		{ jp: "太る", kana: "ふとる", cn: "发胖", en: "to put on weight", pos: "動詞" },
		{ jp: "やせる", cn: "变瘦", en: "to lose weight / to be thin", pos: "動詞" },
	],

	grammar: [
		{
			pattern: "まるで〜のようだ／〜みたいだ",
			meaning: "简直像……一样。「ようだ」偏书面，「みたいだ」偏口语，意思相同。",
			meaningEn: "Just like …. Yō da is more written; mitai da is more spoken. Same meaning.",
			example: { jp: "まるで{夢|ゆめ}のようだ／まるで{夢|ゆめ}みたいだ", cn: "简直像做梦一样", en: "It’s just like a dream." },
			note: "本课要点。比喻不是事实——「夢みたい」的人其实是醒着的。",
			noteEn: "This lesson’s key point. A metaphor is not a fact — someone who says “like a dream” is actually awake.",
		},
		{
			pattern: "〜のような／〜みたいな ＋ 名詞",
			meaning: "像……一样的（东西／人）。修饰名词时用「な」。",
			meaningEn: "A … like …. Use na when modifying a noun.",
			example: { jp: "{夢|ゆめ}のような{話|はなし}／{夢|ゆめ}みたいな{話|はなし}", cn: "像梦一样的事", en: "a dreamlike story" },
		},
		{
			pattern: "〜のように／〜みたいに ＋ 形容詞・動詞",
			meaning: "像……一样地。修饰动词、形容词时用「に」。",
			meaningEn: "Like … (in that way). Use ni when modifying a verb or adjective.",
			example: { jp: "カバみたいに{太|ふと}っています。", cn: "胖得像河马一样。", en: "I’m as plump as a hippo." },
		},
		{
			pattern: "〜のに",
			meaning: "明明……却……。表示与预期相反，含不满或遗憾。",
			meaningEn: "Even though …. Goes against expectation; often with disappointment.",
			example: { jp: "ママの{顔|かお}をかいたのに、ライオンと{間違|まちが}われた", cn: "明明画的是妈妈的脸，却被当成了狮子", en: "even though he drew Mom’s face, it was mistaken for a lion" },
		},
		{
			pattern: "〜そうな{顔|かお}をしている",
			formation: "形容詞語幹／動詞ます形 ＋ そうな",
			meaning: "露出……的表情。「うれしそうな顔」＝看起来很高兴的表情。",
			meaningEn: "To have a … look on one’s face. Ureshisō na kao = a face that looks happy.",
			example: { jp: "どうしてうれしそうな{顔|かお}をしているのか。", cn: "为什么一脸高兴？", en: "Why does he look happy?" },
		},
		{
			pattern: "〜によると",
			formation: "名詞 ＋ によると",
			meaning: "据……说。表示信息来源。",
			meaningEn: "According to …. Marks the source of information.",
			example: { jp: "{幼稚園|ようちえん}の{先生|せんせい}によると、{健|けん}ちゃんは{観察力|かんさつりょく}がある。", cn: "据幼儿园老师说，小健很有观察力。", en: "According to the teacher, Ken is very observant." },
		},
		{
			pattern: "〜ちゃって（＝〜てしまって）",
			meaning: "（不好的结果）……了。口语缩略形。",
			meaningEn: "Ended up … (a regrettable result). Spoken shortening of ~te shimatte.",
			example: { jp: "{機嫌|きげん}が{悪|わる}くなっちゃって……", cn: "结果就闹起脾气来了……", en: "and he ended up getting upset …" },
		},
	],
};
