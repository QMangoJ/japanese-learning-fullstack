import type { ReadingDay } from "../reading-n3/types";

// 第1週 5日目 文と文とをつなぐ言葉 接続詞・接続詞的表現① — printed pages 20–21
export const w1d5: ReadingDay = {
	week: 1,
	day: 5,
	label: "文と文とをつなぐ言葉 接続詞・接続詞的表現①",
	labelEn: "Words that connect sentences — conjunctions and conjunctive expressions (1)",
	printedPages: [20, 21],
	answerSource: "book",

	point: {
		title: "{前後|ぜんご}の{文|ぶん}をよく{比|くら}べよう！",
		titleCn: "好好比较前后文！",
		titleEn: "Compare the sentences before and after carefully!",
		figure: {
			alt: "接続詞の意味を説明する眼鏡をかけた猫先生のイラスト",
			cn: "讲解接续词含义的戴眼镜的猫老师的插图",
			en: "A teacher cat with glasses explaining what the conjunctions mean",
		},
		tips: [
			{
				jp: "（　）の{問題|もんだい}では、{前後|ぜんご}の{文|ぶん}が{同|おな}じ{事|こと}を{述|の}べているのか、{違|ちが}う{事|こと}を{述|の}べているのかに{注意|ちゅうい}しながら{見|み}る。",
				cn: "考（ ）部分时，边看边留意前后文是描述同一件事情还是不同的事情。",
				en: "For ( ) questions, read while watching whether the sentences before and after describe the same thing or different things.",
			},
			{
				jp: "{後|あと}の{文|ぶん}のほうが{問|と}われることもあるので、これらの{接続詞|せつぞくし}の{意味|いみ}をはっきり{理解|りかい}しておく。",
				cn: "有时也会考后文部分，所以要理解清楚这些接续词的含义。",
				en: "Sometimes it is the following sentence that is asked about, so make sure you understand what these conjunctions mean.",
			},
		],
		expressions: [
			{ jp: "したがって／ゆえに／それで", cn: "前文表示后文的原因・理由", en: "the preceding text gives the cause or reason for what follows" },
			{ jp: "それなのに／それにしては／それにもかかわらず", cn: "后文表示预料之外的结果等", en: "what follows is an unexpected result, etc." },
			{ jp: "そればかりか／それどころか", cn: "后文表示强调", en: "what follows is an emphasis" },
		],
	},

	mondai: {
		instruction: "{次|つぎ}の{文章|ぶんしょう}を{読|よ}んで、{問|と}いに{答|こた}えなさい。",
		instructionCn: "阅读下面的文章，回答问题。",
		instructionEn: "Read each text below and answer its question. (Answers are in the separate booklet, p. 2.)",
		blocks: [
			{ type: "heading", jp: "1", cn: "第 1 题", en: "Exercise 1" },
			{
				type: "paragraph",
				jp: "いじめで{自殺|じさつ}する{子|こ}どもの{数|かず}は{減少|げんしょう}しない。（　）{増|ふ}える{気配|けはい}（注）さえ{感|かん}じられる。",
				cn: "因欺凌而自杀的孩子的人数没有减少。（ ）甚至能感觉到增加的迹象。",
				en: "The number of children who kill themselves because of bullying is not decreasing. ( ) There are even signs that it is increasing.",
				indent: true,
			},
			{ type: "heading", jp: "2", cn: "第 2 题", en: "Exercise 2" },
			{
				type: "paragraph",
				jp: "{彼|かれ}は、{偶然知|ぐうぜんし}り{得|え}た{同僚|どうりょう}の{秘密|ひみつ}*を、だれかれかまわず（注）、みんなの{前|まえ}で{話|はな}した。（　）その{同僚|どうりょう}は{職|しょく}を{失|うしな}ったのだが、そんなことは{彼|かれ}の{知|し}ったことではなかった**。",
				cn: "他不分对象，把偶然知道的同事的秘密当着大家的面说了出来。（ ）结果那位同事丢了工作，但这种事他根本没放在心上。",
				en: "He told everyone, without caring who was listening, a colleague's secret which he happened to find out about. ( ) The colleague lost his job as a result, but he didn't care about it at all.",
				indent: true,
			},
			{ type: "heading", jp: "3", cn: "第 3 题", en: "Exercise 3" },
			{
				type: "paragraph",
				jp: "{私|わたし}たちが{置|お}かれている{状況|じょうきょう}は、{他人|たにん}と{同|おな}じようであっても{全|まった}く{同|おな}じではない。その{状況|じょうきょう}を{正確|せいかく}に{認識|にんしき}して、その{上|うえ}で{自分|じぶん}の{生|い}き{方|かた}を{決|き}めねばならない*。つまり、{生|い}き{方|かた}は{千差万別|せんさばんべつ}（注）である。{他人|たにん}と{同|おな}じ{生|い}き{方|かた}はできないのである。それなのに、（　）。",
				cn: "我们所处的状况，即使看起来和他人相同，也并不完全一样。必须正确认识这种状况，并在此基础上决定自己的生活方式。也就是说，生活方式是千差万别的。不可能过和他人相同的生活。尽管如此，（ ）。",
				en: "Our circumstances may look the same as other people's, but they are never exactly the same. It is important to recognize your personal circumstances before you decide what to do with your life. In other words, ways of living differ from person to person. You cannot live the same life as someone else. And yet, ( ).",
				indent: true,
			},
			{ type: "heading", jp: "4", cn: "第 4 题", en: "Exercise 4" },
			{
				type: "paragraph",
				jp: "{今日|こんにち}、{私|わたし}たち{人間|にんげん}は、{何|なん}らかの{病気|びょうき}にかかっていたり、{体調|たいちょう}が{悪|わる}かったりして、そのために{日々苦|ひびく}しんだり、{不愉快|ふゆかい}な{思|おも}いをしている{場合|ばあい}が{少|すく}なくありません。（　）、それらの{病気|びょうき}や{体|からだ}の{不調|ふちょう}の{中|なか}には、いわゆる{精神面|せいしんめん}からきているものが{相当多|そうとうおお}いと{言|い}われています**。{仕事|しごと}の{悩|なや}み、{対人関係|たいじんかんけい}の{悩|なや}みなどが{原因|げんいん}となり、ストレスが{積|つ}み{重|かさ}なって{胃|い}に{穴|あな}が{開|あ}いたり、{髪|かみ}の{毛|け}が{抜|ぬ}けていくといったような{現象|げんしょう}が{起|お}きるのです。",
				cn: "如今，我们人类有的患上某种疾病，有的身体不适，因此每天痛苦、心情不快的情况并不少。（ ）据说在这些疾病或身体的不适之中，有相当多是源自于精神方面的原因。工作的烦恼、人际关系的烦恼等成为原因，压力积压，会出现胃穿孔、掉头发之类的现象。",
				en: "Nowadays, quite a few of us suffer day after day or feel unwell because we have some illness or are in poor health. ( ) It is believed that many of such illnesses and poor health conditions are the result of the psychological problems. Worries about work, worries about relationships and so on build up as stress, and things like stomach ulcers or hair falling out occur.",
				indent: true,
			},
		],
		footnotes: [
			{ marker: "注", term: "気配", jp: "けはい", cn: "迹象、苗头：隐约能感觉到的样子", en: "a sign; an indication" },
			{ marker: "注", term: "だれかれかまわず", jp: "だれかれかまわず", cn: "不分对象：不去在意对方是谁", en: "without caring who it is; indiscriminately" },
			{ marker: "注", term: "千差万別", jp: "せんさばんべつ", cn: "千差万别：许多事物各不相同", en: "a great variety; all kinds of differences" },
		],
		questions: [
			{
				label: "問1",
				jp: "（　）に{入|はい}る{適当|てきとう}な{言葉|ことば}はどちらか。",
				cn: "填入（ ）的合适词语是哪一个？",
				en: "Which word fits in the ( )?",
				choices: [
					{ jp: "それにしては", cn: "按那样来说、就那一点而言", en: "for all that; considering that" },
					{ jp: "それどころか", cn: "别说……，甚至……", en: "far from that; on the contrary" },
				],
				answer: 2,
				explanation:
					"前文说人数「減少しない」，后文说「増える気配さえ感じられる」——后文是强调：别说减少，甚至在增加。本课要点表里「そればかりか／それどころか」正是「后文表示强调」。所以选 2。",
				explanationEn:
					"The first sentence says the number does not decrease; the second adds, with emphasis, that there are even signs of increase. In the day's table, “sore dokoro ka” is the connector for emphasis in what follows. Answer 2.",
				choiceNotes: [
					"「それにしては」表示与预想的落差，这里没有这种关系。",
					"正确。别说减少，甚至要增加——是强调。",
				],
				choiceNotesEn: [
					"“Sore ni shite wa” marks a gap from expectation; there is no such relation here.",
					"Correct. Far from decreasing — even increasing: emphasis.",
				],
			},
			{
				label: "問2",
				jp: "（　）に{入|はい}る{最|もっと}も{適当|てきとう}な{言葉|ことば}はどれか。",
				cn: "填入（ ）的最合适的词语是哪一个？",
				en: "Which word fits best in the ( )?",
				choices: [
					{ jp: "しかし", cn: "但是", en: "however" },
					{ jp: "すると", cn: "于是、紧接着", en: "thereupon" },
					{ jp: "それで", cn: "于是、结果", en: "and so; as a result" },
					{ jp: "したがって", cn: "因此", en: "therefore" },
				],
				answer: 3,
				explanation:
					"后文「その同僚は職を失った」是前文行为带来的结果。本课要点表：「前文表示后文的原因・理由 → したがって／ゆえに／それで」。这里叙述具体事件的因果经过，用「それで」最自然；「したがって」多用于推论性的结论，语气过硬。别册答案为 3。",
				explanationEn:
					"What follows — the colleague losing his job — is the result of the action described before. The day's table lists “sore de” among the connectors used when the preceding text gives the cause. For a narrative cause-and-result, “sore de” is the natural choice; “shitagatte” is for logical conclusions. The booklet's answer is 3.",
				choiceNotes: [
					"前后不是转折关系。",
					"「すると」多表紧接着发生的发现或反应，不合。",
					"正确。前文是原因，后文是结果。",
					"多用于论说推论，叙事因果里不如「それで」自然。",
				],
				choiceNotesEn: [
					"The two parts are not in contrast.",
					"“Suruto” usually introduces an immediate reaction or discovery.",
					"Correct. Cause before, result after.",
					"Used for logical conclusions; less natural in narrative causation than “sore de.”",
				],
			},
			{
				label: "問3",
				jp: "（　）に{入|はい}る{最|もっと}も{適当|てきとう}な{言葉|ことば}はどれか。",
				cn: "填入（ ）的最合适的词语是哪一个？",
				en: "Which sentence fits best in the ( )?",
				choices: [
					{ jp: "ほとんどの{人|ひと}は、{他人|たにん}と{同|おな}じ{生|い}き{方|かた}をしていない", cn: "大多数人都没有过着和他人相同的生活。", en: "Most people do not live the same life as others." },
					{ jp: "{他人|たにん}と{同|おな}じように{生|い}きようとしている{人|ひと}が{多|おお}い", cn: "想和他人一样生活的人很多。", en: "Many people try to live in the same way as others." },
					{ jp: "{自分|じぶん}の{生|い}き{方|かた}を{主張|しゅちょう}すべきである", cn: "应该主张自己的生活方式。", en: "We should assert our own way of living." },
					{ jp: "{自分|じぶん}らしい{生|い}き{方|かた}をしていくためには{他人|たにん}を{気|き}にすべきではない", cn: "为了活出自己的样子，不应该在意他人。", en: "In order to live in your own way, you should not worry about others." },
				],
				answer: 2,
				explanation:
					"（ ）前面是「それなのに」——后文必须是与前文道理相反的事实。前文说「他人と同じ生き方はできない」，别册提示要看（ ）前后「他人と同じ生き方はできない」与「他人と同じように生きようとしている」的关系：明明不可能，却有很多人想照着别人的样子活。所以选 2。",
				explanationEn:
					"The connector before the blank is “sore na no ni” (and yet), so what follows must run against the preceding logic. The booklet points to the relation between “you cannot live the same life as others” and “(people) try to live the same way as others”: impossible, yet many try. Answer 2.",
				choiceNotes: [
					"与「それなのに」要求的逆接不合：这只是重复前文。",
					"正确。明明做不到却想做——构成逆接。",
					"这是笔者的主张，不是「それなのに」后的事实。",
					"同样是主张句，不接「それなのに」。",
				],
				choiceNotesEn: [
					"It merely repeats the preceding point; “sore na no ni” needs a contrary fact.",
					"Correct. Impossible, yet many try — that is the contrast.",
					"This is the writer's prescription, not a contrary fact.",
					"Also a prescription; it does not follow “sore na no ni.”",
				],
			},
			{
				label: "問4",
				jp: "（　）の{中|なか}に{入|はい}る{最|もっと}も{適当|てきとう}な{言葉|ことば}はどれか。",
				cn: "填入（ ）的最合适的词语是哪一个？",
				en: "Which word fits best in the ( )?",
				choices: [
					{ jp: "それにもかかわらず", cn: "尽管如此", en: "nevertheless" },
					{ jp: "だから", cn: "所以", en: "so; therefore" },
					{ jp: "したがって", cn: "因此", en: "therefore" },
					{ jp: "ところが", cn: "然而、可是", en: "however; it turns out that" },
				],
				answer: 4,
				explanation:
					"别册提示：（ ）之前讲的是肉体上的不调；（ ）之后却说其中相当多源于精神面——前后是出乎意料的转折，用「ところが」引出新事实。1 的「それにもかかわらず」需要前文有明确的让步对象；2、3 是因果，逻辑不合。所以选 4。",
				explanationEn:
					"The booklet notes that before the blank the text talks about physical ailments; after it, surprisingly, many of them are said to come from the psychological side. “Tokoro ga” introduces this unexpected turn. 1 needs an explicit concession in the preceding text, and 2 and 3 are causal, which does not fit. Answer 4.",
				choiceNotes: [
					"需要前文先立一个被让步的前提，这里不合。",
					"后文不是前文的结果。",
					"同 2，因果关系不成立。",
					"正确。引出意料之外的事实。",
				],
				choiceNotesEn: [
					"It needs a stated concession before it; there is none here.",
					"What follows is not a result of what precedes.",
					"Like 2, the causal link does not hold.",
					"Correct. It introduces an unexpected fact.",
				],
			},
		],
		pageNotes: [
			{
				jp: "* a colleague's secret which he happened to find out about",
				cn: "偶然知道的同事的秘密",
				en: "a colleague's secret which he happened to find out about",
			},
			{
				jp: "** he didn't care about it at all",
				cn: "这种结果他根本没有想到",
				en: "he didn't care about it at all",
			},
			{
				jp: "* It is important to recognaize your personal cirucumstances before you decide what to do with your life.",
				cn: "必须正确了解这种状况，并在此基础上决定自己的生活方式。",
				en: "It is important to recognize your personal circumstances before you decide what to do with your life.",
			},
			{
				jp: "** it is believed that many of such illnesses and poor health conditions are the result of the psychological problems",
				cn: "据说在这些疾病或身体的不适之中，有相当多是源自于精神方面的原因",
				en: "it is believed that many of such illnesses and poor health conditions are the result of the psychological problems",
			},
		],
	},

	vocab: [
		{ jp: "自殺", kana: "じさつ", cn: "自杀", en: "suicide", pos: "名詞・動詞" },
		{ jp: "減少", kana: "げんしょう", cn: "减少", en: "decrease", pos: "名詞・動詞" },
		{ jp: "気配", kana: "けはい", cn: "迹象、苗头", en: "a sign; an indication", pos: "名詞" },
		{ jp: "偶然", kana: "ぐうぜん", cn: "偶然", en: "by chance; coincidence", pos: "名詞・副詞" },
		{ jp: "秘密", kana: "ひみつ", cn: "秘密", en: "a secret", pos: "名詞" },
		{ jp: "状況", kana: "じょうきょう", cn: "状况", en: "a situation; circumstances", pos: "名詞" },
		{ jp: "正確", kana: "せいかく", cn: "正确、准确", en: "accurate; exact", pos: "名詞・な形" },
		{ jp: "認識", kana: "にんしき", cn: "认识", en: "recognition; awareness", pos: "名詞・動詞" },
		{ jp: "千差万別", kana: "せんさばんべつ", cn: "千差万别", en: "a great variety", pos: "名詞・形動" },
		{ jp: "体調", kana: "たいちょう", cn: "身体状况", en: "physical condition", pos: "名詞" },
		{ jp: "不愉快", kana: "ふゆかい", cn: "不愉快", en: "unpleasant", pos: "名詞・な形" },
		{ jp: "精神面", kana: "せいしんめん", cn: "精神方面", en: "the psychological side", pos: "名詞" },
		{ jp: "相当", kana: "そうとう", cn: "相当", en: "considerably; quite", pos: "副詞・名詞" },
		{ jp: "現象", kana: "げんしょう", cn: "现象", en: "a phenomenon", pos: "名詞" },
	],

	grammar: [
		{
			pattern: "それどころか",
			formation: "文＋それどころか＋強調の文",
			meaning: "别说前项，甚至后项。表示后文程度更进一层，起强调作用。",
			meaningEn: "far from ~; on the contrary, even ~. What follows is stronger — emphasis.",
			example: {
				jp: "{数|かず}は{減少|げんしょう}しない。それどころか{増|ふ}える{気配|けはい}さえ{感|かん}じられる。",
				cn: "人数没有减少。别说减少，甚至能感觉到增加的迹象。",
				en: "The number is not decreasing. Far from it — there are even signs of increase.",
			},
		},
		{
			pattern: "それで",
			formation: "文＋それで＋結果の文",
			meaning: "于是、结果。前文是原因，后文是随之发生的结果。",
			meaningEn: "and so; as a result. The preceding text is the cause, what follows is the result.",
			example: {
				jp: "それでその{同僚|どうりょう}は{職|しょく}を{失|うしな}った。",
				cn: "结果那位同事丢了工作。",
				en: "As a result, the colleague lost his job.",
			},
		},
		{
			pattern: "それなのに",
			formation: "文＋それなのに＋逆の文",
			meaning: "尽管如此、明明……却……。后文与前文的道理或预想相反。",
			meaningEn: "and yet; despite that. What follows goes against the logic or expectation of what precedes.",
			example: {
				jp: "{他人|たにん}と{同|おな}じ{生|い}き{方|かた}はできないのである。それなのに、{同|おな}じように{生|い}きようとする{人|ひと}が{多|おお}い。",
				cn: "不可能过和他人相同的生活。尽管如此，想和他人一样生活的人却很多。",
				en: "You cannot live the same life as others. And yet, many people try to live just like others.",
			},
		},
	],
};
