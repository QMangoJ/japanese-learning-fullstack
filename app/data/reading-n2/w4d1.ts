import type { ReadingDay } from "../reading-n3/types";

// 第4週 1日目 エッセイ① — printed pages 60–61
export const w4d1: ReadingDay = {
	week: 4,
	day: 1,
	label: "エッセイ①",
	labelKana: "えっせい",
	labelEn: "Essays ①",
	printedPages: [60, 61],
	answerSource: "book",

	point: {
		title: "{答|こた}えが{書|か}いてある{部分|ぶぶん}を{見|み}つけよう！",
		titleCn: "找出写着答案的部分吧！",
		titleEn: "Let's focus on locating the answers!",
		figure: {
			alt: "星マークのキャラクターが「問いを先に読むと、早く答えが見付けられるね！」と言い、眼鏡のキャラクターが本を読みながら「問いの○○、△△、××を探すと、近くに答えの「……」が見つかります。」と言っている",
			cn: "带星星标记的角色说：「先读问题的话，就能更快找到答案呢！」戴眼镜的角色一边看书一边说：「寻找问题中的○○、△△、××的话，附近就能找到答案的「……」。」",
			en: "A star-marked character says, “If you read the questions first, you’ll find the answers faster!” A bespectacled character reading a book says, “Look for the ○○, △△, and ×× from the question, and you’ll find the answer ‘……’ nearby.”",
		},
		tips: [
			{
				jp: "{例えば|たとえば}{問|と}いが{次|つぎ}のような{場合|ばあい}",
				cn: "例如，问题是下面这种情况时",
				en: "For example, when the question looks like this:",
			},
			{
				jp: "○○とは{何|なん}のことか。　→　……。それは、○○のようなものであった。",
				cn: "○○指的是什么？　→　……。那是像○○一样的东西。",
				en: "What does ○○ refer to? → …. That was something like ○○.",
			},
			{
				jp: "△△したのはいつか。　→　……ころが△△したといえるのかもしれない。",
				cn: "是什么时候△△的？　→　……的时候或许可以说是△△了。",
				en: "When did △△ happen? → It may be that the time of …… is when △△ happened.",
			},
			{
				jp: "{何|なん}のために××したのか。　→　……ためにしか××しなかった。",
				cn: "是为了什么才××的？　→　只为了……才××了。",
				en: "For what purpose did they ××? → They only ××’d for the sake of …….",
			},
		],
		expressions: [
			{ jp: "〜とは何のことか", cn: "〜指的是什么", en: "what does … refer to?" },
			{ jp: "〜したのはいつか", cn: "是什么时候〜的", en: "when was it that …?" },
			{ jp: "何のために〜したのか", cn: "是为了什么才〜的", en: "for what purpose did they …?" },
			{ jp: "それは、〜のようなものであった", cn: "那是像〜一样的东西", en: "that was something like … (the answer is often near sore wa)" },
			{ jp: "〜ころが〜したといえるのかもしれない", cn: "〜的时候或许可以说是〜了", en: "it may be that that time is when … happened" },
			{ jp: "〜ためにしか〜しなかった", cn: "只为了〜才〜了", en: "only did … for the sake of …" },
		],
	},

	renshu: {
		instruction: "{次|つぎ}の{会話文|かいわぶん}を{読|よ}んで、{後|あと}の{文|ぶん}から{正|ただ}しいものを{選|えら}ぼう。",
		instructionCn: "阅读下面的对话，从后面的句子中选出正确的吧。",
		instructionEn: "Read the conversation below and choose the correct statements from the sentences that follow. (Answers are on the next page.)",
		blocks: [
			{
				type: "speech",
				speaker: "{娘|むすめ}",
				speakerCn: "女儿",
				speakerEn: "Daughter",
				jp: "{最近|さいきん}、{本|ほん}を{読|よ}まなくなったなあ、{私|わたし}。",
				cn: "最近，我不看书了啊，我。",
				en: "Lately I haven’t been reading books.",
			},
			{
				type: "speech",
				speaker: "{母|はは}",
				speakerCn: "母亲",
				speakerEn: "Mother",
				jp: "え？　いつも{読|よ}んでいるじゃないの。",
				cn: "诶？　你不是一直在看书吗。",
				en: "What? You’re always reading, aren’t you?",
			},
			{
				type: "speech",
				speaker: "{娘|むすめ}",
				speakerCn: "女儿",
				speakerEn: "Daughter",
				jp: "ああ、{仕事関係|しごとかんけい}の{本|ほん}ばかりなの。そういう、{必要|ひつよう}にせまられて（{注|ちゅう}）っていうのは{違|ちが}うでしょ。{中学|ちゅうがく}のころからか、こんなふうになったのは。レポート{書|か}くためとか。{子|こ}どものころは{本当|ほんとう}にただ{本|ほん}を{読|よ}んでいたのにね。{楽|たの}しかったなあ……。",
				cn: "啊，净是和工作有关的书。那种被必要性所迫（注）的，不一样吧。大概是从初中那时候起吧，变成这样的。为了写报告什么的。小时候明明真的只是在看书呢。真开心啊……。",
				en: "Ah, it’s only work-related books. Being forced to read out of necessity doesn’t count, right? I think it started around junior high. For writing reports and so on. When I was a child I really was just reading. That was fun…",
			},
			{
				type: "speech",
				speaker: "{母|はは}",
				speakerCn: "母亲",
				speakerEn: "Mother",
				jp: "そうね。うれしそうに、よく{図書館|としょかん}に{通|かよ}っていたわね。あんまり{買|か}ってやれなかったしね。",
				cn: "是啊。你一副高兴的样子，经常去图书馆呢。也没太能给你买书啊。",
				en: "That’s right. You used to go to the library looking so happy. I couldn’t really buy books for you, either.",
			},
		],
		footnotes: [
			{ marker: "（注）", term: "必要にせまられて", jp: "out of necessity", cn: "迫于需要而不得已", en: "out of necessity" },
		],
		choices: [
			{ jp: "{娘|むすめ}は{大人|おとな}になってから{本|ほん}を{読|よ}んでいない。", cn: "女儿成年以后没有看书。", en: "The daughter has not read books since she became an adult." },
			{ jp: "{母|はは}は{娘|むすめ}が{子|こ}どものころ、よく{本|ほん}を{買|か}ってやった。", cn: "母亲在女儿小时候经常给她买书。", en: "The mother often bought books for her daughter when she was a child." },
			{ jp: "{娘|むすめ}は{中学|ちゅうがく}のころ、よく{好|す}きな{本|ほん}を{読|よ}んで{楽|たの}しんだ。", cn: "女儿在初中时，经常读自己喜欢的书，并从中得到乐趣。", en: "In junior high the daughter often enjoyed reading books she liked." },
			{ jp: "{母|はは}は、{娘|むすめ}が{子|こ}どものころ、{図書館|としょかん}で{働|はたら}いていた。", cn: "母亲在女儿小时候，在图书馆工作。", en: "The mother worked at the library when her daughter was a child." },
			{ jp: "{娘|むすめ}は{子|こ}どものころの{読書|どくしょ}が{楽|たの}しかったと{思|おも}っている。", cn: "女儿认为小时候的阅读很愉快。", en: "The daughter thinks the reading she did as a child was enjoyable." },
		],
		answers: [5],
	},

	mondai: {
		instruction: "{次|つぎ}の{文章|ぶんしょう}を{読|よ}んで、{後|あと}の{問|と}いに{答|こた}えなさい。",
		instructionCn: "请阅读下面的文章，回答后面的问题。",
		instructionEn: "Read the passage below and answer the questions that follow. (Answers are in the separate booklet, p. 5.)",
		blocks: [
			{
				type: "paragraph",
				indent: true,
				jp: "{子|こ}どものころ、よく{図書館|としょかん}へ{行|い}って{本|ほん}を{借|か}りたものだ。{自分|じぶん}では{楽|たの}しんで{本|ほん}を{読|よ}んでいるという{意識|いしき}はなかった。{読|よ}み{終|お}えた{本|ほん}を{返|かえ}しに{行|い}くと、そこに{当然|とうぜん}のことだが{未知|みち}の{本|ほん}があり、それをまた{借|か}りる、ということを{繰|く}り{返|かえ}していたのだ。{中学|ちゅうがく}に{入学|にゅうがく}したころからは、{学校|がっこう}のレポート{提出|ていしゅつ}などのためにしか{本|ほん}を{読|よ}まなくなった。それは{一種|いっしゅ}の{作業|さぎょう}のようなものであった。{社会人|しゃかいじん}になってから、{読|よ}みたい{本|ほん}ぐらいはいくらでも{買|か}えるようになったが、{仕事|しごと}がらみ（{注|ちゅう}）で{必要|ひつよう}にせまられてのことが{多|おお}い。{今|いま}{思|おも}うと、{図書館通|としょかんがよ}いをしていたあのころが、ほんとうに{読書|どくしょ}を{楽|たの}しんでいたと{言|い}えるのかもしれない。",
				cn: "小时候，是常常去图书馆借书的。自己并没有那种正在享受着读书的意识。去还读完的书时，那里理所当然会有没见过的书，于是再把它们借来，这样的事反复做着。从升入初中前后起，就变得只为了提交学校报告之类才读书了。那是一种像作业一样的东西。成为社会人以后，想读的书之类，无论多少都买得起了，但因和工作有关（注）而被必要性所迫的情况很多。现在想来，常去图书馆的那个时候，或许可以说是真正在享受阅读。",
				en: "When I was a child, I often went to the library and borrowed books. I had no sense that I myself was enjoying reading. When I went to return a book I had finished, there were of course unknown books there, and I would borrow those too — I kept repeating that. From around the time I entered junior high, I stopped reading books except for things like school reports. That was something like a kind of chore. After I became a working adult I could buy as many books as I wanted to read, but much of it was still out of work-related necessity. Thinking about it now, perhaps those days of going to the library were when I was truly enjoying reading.",
			},
		],
		footnotes: [
			{ marker: "（注）", term: "仕事がらみ", jp: "work related", cn: "工作关系", en: "work related" },
		],
		questions: [
			{
				label: "問1",
				jp: "{一種|いっしゅ}の{作業|さぎょう}のようなものとは{何|なん}のことか。",
				cn: "一种像作业一样的东西指的是什么？",
				en: "What does “something like a kind of chore” refer to?",
				choices: [
					{ jp: "{社会人|しゃかいじん}になって{本|ほん}を{買|か}うこと", cn: "成为社会人以后买书", en: "buying books after becoming a working adult" },
					{ jp: "{学校|がっこう}でレポートを{提出|ていしゅつ}すること", cn: "在学校提交报告", en: "submitting reports at school" },
					{ jp: "レポート{提出|ていしゅつ}のために{本|ほん}を{読|よ}むこと", cn: "为了提交报告而读书", en: "reading books in order to submit reports" },
					{ jp: "{図書館|としょかん}で{本|ほん}を{借|か}りたり{返|かえ}したりすること", cn: "在图书馆借书和还书", en: "borrowing and returning books at the library" },
				],
				answer: 3,
				explanation:
					"「それは一種の作業のようなものであった」的「それ」指前一句：中学入学后「学校のレポート提出などのためにしか本を読まなくなった」。所以「一种作业」=为了交报告而读书，选 3。这正是本课要点：问「〜とは何のことか」时，到前文找「それは〜であった」。",
				explanationEn:
					"Sore in “that was something like a kind of chore” points to the previous sentence: after entering junior high, “I stopped reading books except for things like school reports.” So the “chore” is reading in order to submit reports — choice 3. That is the point of this lesson: when asked “what does … refer to?”, look just before for “sore wa … de atta.”",
				choiceNotes: [
					"买书是社会人以后的事，和「一种作业」无关。",
					"「作业」指的是读书这件事本身，不是「提交报告」。",
					"正确。为了交报告而读书，成了作业似的事情。",
					"借还书是小时候享受阅读的循环，不是「一种作业」。",
				],
				choiceNotesEn: [
					"Buying books is what happened after becoming a working adult; it is not the “chore.”",
					"The “chore” is the reading itself, not the act of submitting reports.",
					"Correct. Reading in order to submit reports became something like a chore.",
					"Borrowing and returning was the childhood cycle of enjoying books, not the “chore.”",
				],
			},
			{
				label: "問2",
				jp: "{筆者|ひっしゃ}がほんとうに{読書|どくしょ}を{楽|たの}しんでいたと{思|おも}われるのはいつか。",
				cn: "可以认为笔者真正在享受阅读是在什么时候？",
				en: "When does the writer seem to have been truly enjoying reading?",
				choices: [
					{ jp: "{子|こ}どものころ", cn: "小时候", en: "in childhood" },
					{ jp: "{子|こ}どものときからずっと{今|いま}も", cn: "从小时候起一直到现在", en: "from childhood right up to now" },
					{ jp: "{中学生|ちゅうがくせい}のころ", cn: "初中生的时候", en: "in junior-high days" },
					{ jp: "{仕事|しごと}をするようになってから", cn: "开始工作以后", en: "after starting to work" },
				],
				answer: 1,
				explanation:
					"结尾写「図書館通いをしていたあのころが、ほんとうに読書を楽しんでいたと言えるのかもしれない」。别册提示：「あのころ」是什么时候？前文说小时候常去图书馆借书，中学以后只为报告才读，工作后也多是被需要逼着读。所以「あのころ」=子どものころ，选 1。问「いつか」时，到文中找「〜ころが〜したといえる」。",
				explanationEn:
					"The ending says “perhaps those days of going to the library were when I was truly enjoying reading.” The supplement asks: when is ano koro? The passage says the writer often went to the library as a child; from junior high on, reading was only for reports; after work it was still mostly out of necessity. So ano koro = childhood — choice 1. When asked “when?”, look for “~ koro ga … to ieru.”",
				choiceNotes: [
					"正确。「あのころ」=常去图书馆的小时候。",
					"中学以后和工作以后都不是「享受」，不能说一直到现在。",
					"中学以后「ためにしか本を読まなくなった」，是作业，不是享受。",
					"工作后「仕事がらみで必要にせまられてのことが多い」，也不是真正的享受。",
				],
				choiceNotesEn: [
					"Correct. Ano koro is childhood, when the writer kept going to the library.",
					"From junior high onward and after work, reading was not “enjoyment,” so it is not “right up to now.”",
					"From junior high the writer “stopped reading except for…” — a chore, not enjoyment.",
					"After work, reading was still “often out of work-related necessity,” not true enjoyment.",
				],
			},
		],
	},

	vocab: [
		{ jp: "意識", kana: "いしき", cn: "意识", en: "awareness; consciousness", pos: "名詞" },
		{ jp: "未知", kana: "みち", cn: "未知、没读过的", en: "unknown", pos: "名詞" },
		{ jp: "繰り返す", kana: "くりかえす", cn: "反复、重复", en: "to repeat", pos: "動詞" },
		{ jp: "提出", kana: "ていしゅつ", cn: "提交", en: "submission", pos: "名詞・動詞" },
		{ jp: "一種", kana: "いっしゅ", cn: "一种", en: "a kind of", pos: "名詞" },
		{ jp: "作業", kana: "さぎょう", cn: "作业、工作", en: "chore; task; work", pos: "名詞" },
		{ jp: "社会人", kana: "しゃかいじん", cn: "社会人、上班族", en: "working adult", pos: "名詞" },
		{ jp: "仕事がらみ", kana: "しごとがらみ", cn: "和工作有关的", en: "work-related", pos: "名詞" },
		{ jp: "必要にせまられる", kana: "ひつようにせまられる", cn: "迫于需要、不得已", en: "to be forced by necessity", pos: "表現" },
		{ jp: "図書館通い", kana: "としょかんがよい", cn: "常去图书馆", en: "regularly going to the library", pos: "名詞" },
		{ jp: "読書", kana: "どくしょ", cn: "读书、阅读", en: "reading", pos: "名詞" },
		{ jp: "レポート", cn: "报告、论文", en: "report", pos: "名詞" },
	],

	grammar: [
		{
			pattern: "〜ものだ（回想）",
			formation: "動詞た形＋ものだ",
			meaning: "（过去）常常……。带怀念语气的回想。",
			meaningEn: "used to … (with a nostalgic tone).",
			example: {
				jp: "よく{図書館|としょかん}へ{行|い}って{本|ほん}を{借|か}りたものだ。",
				cn: "是常常去图书馆借书的。",
				en: "I used to go to the library and borrow books.",
			},
		},
		{
			pattern: "〜ためにしか〜ない",
			formation: "名詞＋の／動詞辞書形＋ためにしか〜ない",
			meaning: "只为了……才……。强调目的被收窄到这一点。",
			meaningEn: "only … for the sake of …. The purpose is narrowed to this one thing.",
			example: {
				jp: "レポート{提出|ていしゅつ}などのためにしか{本|ほん}を{読|よ}まなくなった。",
				cn: "变得只为了提交报告之类才读书了。",
				en: "I stopped reading books except for things like submitting reports.",
			},
		},
		{
			pattern: "〜のかもしれない",
			formation: "普通形＋のかもしれない",
			meaning: "或许……、说不定……。用于回想后的推断。",
			meaningEn: "perhaps … / it may be that …. Used for a conclusion reached on looking back.",
			example: {
				jp: "あのころが、ほんとうに{読書|どくしょ}を{楽|たの}しんでいたと{言|い}えるのかもしれない。",
				cn: "那个时候，或许可以说是真正在享受阅读。",
				en: "Perhaps those days were when I was truly enjoying reading.",
			},
		},
	],
};
