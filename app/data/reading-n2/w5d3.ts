import type { ReadingDay } from "../reading-n3/types";

// 第5週 3日目 記事 — printed pages 82–83
export const w5d3: ReadingDay = {
	week: 5,
	day: 3,
	label: "記事",
	labelKana: "きじ",
	labelEn: "Articles",
	printedPages: [82, 83],
	answerSource: "book",

	point: {
		title: "{事件|じけん}や{事故|じこ}の{記事|きじ}に{慣|な}れよう！",
		titleCn: "熟悉关于事件或事故的报道文章！",
		titleEn: "Try to familiarize yourself with articles dealing with crimes and accidents!",
		figure: {
			alt: "新聞を読むキャラクターと「事件や事故の記事は、ほぼ同じ表現が使われます。」という吹き出し",
			cn: "角色读报，气泡写着：「事件、事故报道用的几乎是同一套说法。」",
			en: "A character reading a paper, with a bubble: “Crime and accident articles use almost the same set of expressions.”",
		},
		tips: [
			{
				jp: "{事件|じけん}や{事故|じこ}の{記事|きじ}は、ほぼ{同|おな}じ{表現|ひょうげん}が{使|つか}われます。",
				cn: "事件、事故报道几乎都用同一套说法。",
				en: "Crime and accident articles use almost the same expressions.",
			},
			{
				jp: "【{例|れい}の{見出|みだ}し】{大麻譲渡容疑|たいまじょうとようぎ}で{男|おとこ}ら{逮捕|たいほ}　{女子中学生|じょしちゅうがくせい}が{所持|しょじ}",
				cn: "【示例标题】男子等因涉嫌转让大麻被捕　女初中生持有大麻",
				en: "[Sample headline] Men arrested on suspicion of transferring marijuana — junior-high girl in possession",
			},
			{
				jp: "○○{市|し}の{市立中学|しりつちゅうがく}3{年|ねん}の{女子生徒|じょしせいと}（14）が{大麻|たいま}を{所持|しょじ}したとして{逮捕|たいほ}された{事件|じけん}で、この{生徒|せいと}に{大麻|たいま}を{渡|わた}したとして○○{市|し}の{男|おとこ}2{人|にん}が{大麻取締法違反|たいまとりしまりほういはん}の{疑|うたが}いで{逮捕|たいほ}されたことがわかった。{逮捕|たいほ}されたのは18{歳|さい}の{少年|しょうねん}と21{歳|さい}の{男|おとこ}で、いずれも{大麻所持|たいましょじ}を{認|みと}めているという。",
				cn: "○○ 市市立中学三年级女学生（14 岁）因持有大麻被捕。据了解，向该学生转让大麻的 ○○ 市两名男子因涉嫌违反大麻取缔法被捕。被捕的是 18 岁少年和 21 岁男子，两人都承认持有大麻。",
				en: "In a case in which a third-year girl (14) at a municipal junior high in ○○ City was arrested for possessing marijuana, it has emerged that two men from ○○ City who gave her the marijuana have been arrested on suspicion of violating the Marijuana Control Law. Those arrested are an 18-year-old youth and a 21-year-old man; both are said to have admitted possessing marijuana.",
			},
		],
		expressions: [
			{ jp: "大麻", kana: "たいま", cn: "大麻", en: "marijuana" },
			{ jp: "譲渡", kana: "じょうと", cn: "转让", en: "a transfer" },
			{ jp: "所持", kana: "しょじ", cn: "持有", en: "possession" },
			{ jp: "認めている", kana: "みとめている", cn: "承认", en: "to admit" },
			{ jp: "違反", kana: "いはん", cn: "违反", en: "violation of laws" },
			{ jp: "容疑", kana: "ようぎ", cn: "嫌疑", en: "suspicion" },
			{ jp: "逮捕", kana: "たいほ", cn: "逮捕", en: "an arrest" },
			{ jp: "ひき逃げ", cn: "肇事逃逸", en: "a hit and run" },
			{ jp: "通報", kana: "つうほう", cn: "报案、通报", en: "a report (to the police)" },
			{ jp: "罰則", kana: "ばっそく", cn: "处罚规定、罚则", en: "penal regulations" },
			{ jp: "飲酒運転", kana: "いんしゅうんてん", cn: "酒后驾驶", en: "drunken driving" },
		],
	},

	renshu: {
		instruction: "{次|つぎ}の{会話文|かいわぶん}を{読|よ}んで、{後|あと}の{文|ぶん}から{正|ただ}しいものを{選|えら}ぼう。",
		instructionCn: "阅读下面的对话，从后面的句子中选出正确的。（答案在下一页）",
		instructionEn: "Read the conversation below and choose the correct statements from the sentences that follow. (Answers are on the next page.)",
		blocks: [
			{
				type: "note",
				jp: "《Aさんは{新聞|しんぶん}を{見|み}ながらBさんと{話|はな}しています。》",
				cn: "《A 看着报纸在和 B 说话。》",
				en: "(A is talking with B while looking at a newspaper.)",
			},
			{
				type: "speech",
				speaker: "A",
				speakerCn: "A",
				speakerEn: "A",
				jp: "またひき{逃|に}げだって。{多|おお}いね。",
				cn: "又是肇事逃逸。真多啊。",
				en: "Another hit-and-run. There are a lot of them.",
			},
			{
				type: "speech",
				speaker: "B",
				speakerCn: "B",
				speakerEn: "B",
				jp: "どうして{逃|に}げるのかな。すぐに{通報|つうほう}すれば、{助|たす}かったかもしれないのに。",
				cn: "为什么要逃呢。要是马上报警，说不定还能得救。",
				en: "Why run? If they reported it right away, the person might have been saved.",
			},
			{
				type: "speech",
				speaker: "A",
				speakerCn: "A",
				speakerEn: "A",
				jp: "{怖|こわ}くなって{逃|に}げるのとか、もしかしたら、{飲酒運転|いんしゅうんてん}していたかもしれないね。",
				cn: "大概是害怕才逃的，说不定当时还酒驾了。",
				en: "Maybe they ran because they got scared—or maybe they were driving drunk.",
			},
			{
				type: "speech",
				speaker: "B",
				speakerCn: "B",
				speakerEn: "B",
				jp: "ああ、{飲酒運転|いんしゅうんてん}の{罰則|ばっそく}が{厳|きび}しいから、お{酒|さけ}を{飲|の}んでいたことがわからなくなるように{逃|に}げるんだよね。ひき{逃|に}げの{罰則|ばっそく}がまだまだ{甘|あま}いんじゃないかな。",
				cn: "对啊，酒驾罚则严，所以才逃，好让人查不出喝过酒。肇事逃逸的罚则还是太轻了吧。",
				en: "Right—DUI penalties are strict, so they run so it won’t come out that they’d been drinking. Hit-and-run penalties are still too lenient, don’t you think?",
			},
			{
				type: "speech",
				speaker: "A",
				speakerCn: "A",
				speakerEn: "A",
				jp: "うん、{幼児|ようじ}3{人|にん}が{亡|な}くなる{事件|じけん}があってから、{両方|りょうほう}の{罰則|ばっそく}が{厳|きび}しくなったんだよね。でも{飲酒運転|いんしゅうんてん}はずいぶん{減|へ}ったのにひき{逃|に}げはあんまり{減|へ}ってないんでしょ？　もっと{厳|きび}しくしないと、なくならないんじゃないかな。",
				cn: "嗯，自从发生幼儿 3 人死亡的事件以后，两边的罚则都变严了。可酒驾少了很多，肇事逃逸却没怎么减少吧？再不加严，恐怕消不掉。",
				en: "Yeah, after an incident in which three small children died, both penalties were tightened. But drunk driving has fallen a lot, while hit-and-runs haven’t really, right? If they don’t get stricter, they won’t go away.",
			},
		],
		choices: [
			{ jp: "Aさんは{飲酒運転|いんしゅうんてん}による{交通事故|こうつうじこ}の{記事|きじ}を{読|よ}んでいる。", cn: "A 在读酒驾导致交通事故的报道。", en: "A is reading an article about a traffic accident caused by drunk driving." },
			{ jp: "Aさんはひき{逃|に}げで{幼児|ようじ}3{人|にん}が{死亡|しぼう}した{記事|きじ}を{読|よ}んでいる。", cn: "A 在读肇事逃逸造成幼儿 3 人死亡的报道。", en: "A is reading an article about a hit-and-run in which three small children died." },
			{ jp: "Bさんはひき{逃|に}げをする{人|ひと}の{気持|きも}ちが{理解|りかい}できない。", cn: "B 不能理解肇事逃逸者的心情。", en: "B cannot understand the feelings of people who commit hit-and-run." },
			{ jp: "AさんとBさんは{飲酒運転|いんしゅうんてん}の{罰則|ばっそく}をもっと{厳|きび}しくすべきだと{言|い}っている。", cn: "A 和 B 都说应该把酒驾罚则再加严。", en: "A and B say drunk-driving penalties should be made even stricter." },
			{ jp: "AさんとBさんはひき{逃|に}げ{事件|じけん}の{罰則|ばっそく}をもっと{厳|きび}しくすべきだと{言|い}っている。", cn: "A 和 B 都说应该把肇事逃逸事件的罚则再加严。", en: "A and B say hit-and-run penalties should be made even stricter." },
		],
		answers: [3, 5],
	},

	mondai: {
		instruction: "{次|つぎ}の{新聞記事|しんぶんきじ}を{読|よ}んで、{後|あと}の{問|と}いに{答|こた}えなさい。",
		instructionCn: "阅读下面的新闻报道，回答后面的问题。（答案在别册 p.6）",
		instructionEn: "Read the newspaper article below and answer the questions that follow. (Answers are in the separate booklet, p. 6.)",
		blocks: [
			{
				type: "title",
				jp: "ひき{逃|に}げか {女性死亡|じょせいしぼう}",
				cn: "或为肇事逃逸 女性死亡",
				en: "Possible hit-and-run: woman dead",
				sub: { jp: "{横浜|よこはま}・{港北区|こうほくく}", cn: "横滨・港北区", en: "Yokohama, Kohoku Ward" },
			},
			{
				type: "paragraph",
				jp: "18{日午後|にちごご}9{時|じ}ごろ、{横浜市港北区|よこはましこうほくく}の○○{町|ちょう}のJR{横浜線|よこはません}の{踏切|ふみきり}{近|ちか}くの{市道|しどう}で、{女性|じょせい}が{血|ち}を{流|なが}し、うつぶせ（{注|ちゅう}1）に{倒|たお}れているのを{近|ちか}くに{住|す}む{男性|だんせい}が{見|み}つけ、110{番通報|ばんつうほう}した。{女性|じょせい}は{病院|びょういん}に{運|はこ}ばれたが{間|ま}もなく{死亡|しぼう}が{確認|かくにん}された。",
				cn: "18 日下午 9 点左右，在横滨市港北区 ○○ 町 JR 横滨线道口附近的市道上，住在附近的一名男子发现一名女性流血、趴在地上，随即拨打 110。女性被送往医院后不久确认死亡。",
				en: "Around 9 p.m. on the 18th, on a city road near a JR Yokohama Line crossing in ○○-chō, Kohoku Ward, Yokohama, a man living nearby found a woman lying face down and bleeding, and called 110. She was taken to hospital but was confirmed dead shortly afterward.",
				indent: true,
			},
			{
				type: "paragraph",
				jp: "{付近|ふきん}の{路面|ろめん}に{約|やく}170メートルにわたって{引|ひ}きずられたような{血痕|けっこん}（{注|ちゅう}2）が{残|のこ}っていたことから、{港北署|こうほくしょ}ではひき{逃|に}げ{事件|じけん}として{捜査|そうさ}している。また、{女性|じょせい}は60{代|だい}ぐらいとみられ、{身元|みもと}（{注|ちゅう}3）や{死因|しいん}の{特定|とくてい}を{急|いそ}いでいる。",
				cn: "附近路面上留下约 170 米像被拖过的血痕，因此港北署按肇事逃逸事件进行搜查。另外，该女性看起来六十多岁，正在加紧确认身份和死因。",
				en: "Because bloodstains as if she had been dragged for about 170 meters remained on the nearby road surface, Kohoku Police are investigating it as a hit-and-run. The woman appears to be in her sixties, and they are rushing to establish her identity and the cause of death.",
				indent: true,
			},
		],
		footnotes: [
			{ marker: "（注1）", term: "うつぶせ", jp: "lying on one's stomach", cn: "趴着", en: "lying face down" },
			{ marker: "（注2）", term: "血痕", jp: "血のあと", cn: "血痕", en: "bloodstain" },
			{ marker: "（注3）", term: "身元", jp: "one's identity", cn: "身份", en: "one's identity" },
		],
		pageNotes: [
			{
				jp: "They are trying to identify the victim and the cause of her death",
				cn: "正在紧急查明死者身份及死亡原因",
				en: "They are trying to identify the victim and the cause of her death",
			},
		],
		questions: [
			{
				label: "問1",
				jp: "{警察|けいさつ}がひき{逃|に}げ{事件|じけん}と{考|かんが}えているのはなぜか。",
				cn: "警察认为这是肇事逃逸事件，是为什么？",
				en: "Why do the police think this is a hit-and-run?",
				choices: [
					{ jp: "{道路|どうろ}にひき{逃|に}げされたと{思|おも}われるような{跡|あと}があったから。", cn: "因为路上有像被肇事逃逸拖过的痕迹。", en: "Because there were marks on the road that look as if she had been hit and dragged." },
					{ jp: "{飲酒運転|いんしゅうんてん}によるひき{逃|に}げ{事件|じけん}が{多発|たはつ}しているから。", cn: "因为酒驾肇事逃逸事件多发。", en: "Because hit-and-runs caused by drunk driving are happening frequently." },
					{ jp: "{女性|じょせい}が{血|ち}を{流|なが}し、うつぶせで{倒|たお}れていたから。", cn: "因为女性流着血、趴在地上。", en: "Because the woman was lying face down and bleeding." },
					{ jp: "{女性|じょせい}が{道路|どうろ}をわたって{引|ひ}きずられたから。", cn: "因为女性过马路时被拖走了。", en: "Because the woman was dragged as she crossed the road." },
				],
				answer: 1,
				explanation:
					"正文用「〜ことから」给出理由：「路面に約170メートルにわたって引きずられたような血痕が残っていたことから、港北署ではひき逃げ事件として捜査している」。警察把「像被拖过的血痕」当成肇事逃逸的依据。选 1。3 只是发现时的状态，本身不能说明是逃逸。4 的「道路をわたって」原文没有，血痕只是「ような」。2 完全没写。事故报道要抓「〜ことから／〜として」这类定性句。",
				explanationEn:
					"The article gives the reason with koto kara: “Because bloodstains as if she had been dragged for about 170 meters remained, Kohoku Police are investigating it as a hit-and-run.” The dragged-looking traces are why they treat it as a hit-and-run. Choose 1. 3 is only how she was found, and does not by itself mean hit-and-run. 4’s “as she crossed the road” is not there; the stains are only “as if.” 2 is not mentioned. In accident copy, watch 〜ことから / 〜として, the sentences that classify the case.",
				choiceNotes: [
					"正确。约 170 米「像被拖过的血痕」是定性为肇事逃逸的根据。",
					"正文没有酒驾、也没有「多发」。",
					"流血趴着是发现时的样子，不是定性为逃逸的理由。",
					"没有「过马路」；「引きずられたような」只是根据血痕的推测。",
				],
				choiceNotesEn: [
					"Correct. The ~170 m “as-if-dragged” bloodstains are why they call it a hit-and-run.",
					"No drunk driving, and no “happening frequently.”",
					"Bleeding face-down is how she was found, not the reason for the hit-and-run classification.",
					"She is not said to have been crossing; “as if dragged” is an inference from the stains.",
				],
			},
			{
				label: "問2",
				jp: "この{記事|きじ}の{内容|ないよう}と{合|あ}っているものはどれか。",
				cn: "与这篇报道内容相符的是哪一项？",
				en: "Which of the following matches the content of this article?",
				choices: [
					{ jp: "{飲酒運転|いんしゅうんてん}をしていた{人|ひと}が{女性|じょせい}を{引|ひ}いたとみられる。", cn: "据推测是酒驾的人撞了这名女性。", en: "It appears a drunk driver hit the woman." },
					{ jp: "ひき{逃|に}げされたとみられる{女性|じょせい}はまだ{身元|みもと}が{不明|ふめい}である。", cn: "据推测遭遇肇事逃逸的女性身份仍然不明。", en: "The woman believed to have been the victim of a hit-and-run has not yet been identified." },
					{ jp: "{踏切事故|ふみきりじこ}にあった{女性|じょせい}は{病院|びょういん}に{運|はこ}ばれたが{助|たす}からなかった。", cn: "遭遇道口事故的女性被送往医院但没能救活。", en: "The woman in the crossing accident was taken to hospital but could not be saved." },
					{ jp: "{女性|じょせい}をひいた{車|くるま}を{運転|うんてん}していた{男性|だんせい}が{警察|けいさつ}に{通報|つうほう}した。", cn: "撞了女性的那辆车的男司机向警察报了案。", en: "The man driving the car that hit the woman reported it to the police." },
				],
				answer: 2,
				explanation:
					"结尾写「身元や死因の特定を急いでいる」，说明身份还没查清。选 2。1 酒驾是练习对话里的猜测，这篇报道没有。3 别册注明「踏切事故ではない」：出事地点是「踏切近くの市道」，不是道口事故。4 报警的是「近くに住む男性」（发现者），不是肇事司机。",
				explanationEn:
					"The last line says they are “rushing to establish her identity and the cause of death,” so she has not been identified yet. Choose 2. 1 (drunk driving) is speculation from the practice dialogue, not this article. 3: the answer key notes it is not a crossing accident—the site is “a city road near the crossing.” 4: the man who called 110 is “a man living nearby” (the finder), not the driver.",
				choiceNotes: [
					"酒驾是练习对话里的猜测，这篇报道没有写。",
					"正确。正在加紧确认身份＝现在还不明。",
					"是道口附近的市道，不是道口事故本身。",
					"报警的是发现她的附近居民，不是肇事司机。",
				],
				choiceNotesEn: [
					"Drunk driving is a guess from the warm-up talk, not in this article.",
					"Correct. Rushing to identify her means her identity is still unknown.",
					"It was a city road near the crossing, not a crossing accident.",
					"The caller is a nearby resident who found her, not the driver.",
				],
			},
		],
	},

	vocab: [
		{ jp: "記事", kana: "きじ", cn: "报道、新闻", en: "article (news)", pos: "名詞" },
		{ jp: "事件", kana: "じけん", cn: "事件、案件", en: "incident; case", pos: "名詞" },
		{ jp: "事故", kana: "じこ", cn: "事故", en: "accident", pos: "名詞" },
		{ jp: "ひき逃げ", cn: "肇事逃逸", en: "hit-and-run", pos: "名詞" },
		{ jp: "逮捕", kana: "たいほ", cn: "逮捕", en: "arrest", pos: "名詞・動詞" },
		{ jp: "容疑", kana: "ようぎ", cn: "嫌疑", en: "suspicion", pos: "名詞" },
		{ jp: "所持", kana: "しょじ", cn: "持有", en: "possession", pos: "名詞・動詞" },
		{ jp: "譲渡", kana: "じょうと", cn: "转让", en: "transfer", pos: "名詞・動詞" },
		{ jp: "違反", kana: "いはん", cn: "违反", en: "violation", pos: "名詞・動詞" },
		{ jp: "通報", kana: "つうほう", cn: "报案、通报", en: "to report (to the police)", pos: "名詞・動詞" },
		{ jp: "罰則", kana: "ばっそく", cn: "罚则", en: "penal regulations", pos: "名詞" },
		{ jp: "飲酒運転", kana: "いんしゅうんてん", cn: "酒驾", en: "drunk driving", pos: "名詞" },
		{ jp: "踏切", kana: "ふみきり", cn: "铁路道口", en: "level crossing", pos: "名詞" },
		{ jp: "血痕", kana: "けっこん", cn: "血痕", en: "bloodstain", pos: "名詞" },
		{ jp: "身元", kana: "みもと", cn: "身份", en: "identity", pos: "名詞" },
		{ jp: "死因", kana: "しいん", cn: "死因", en: "cause of death", pos: "名詞" },
		{ jp: "捜査", kana: "そうさ", cn: "搜查、侦查", en: "investigation", pos: "名詞・動詞" },
		{ jp: "うつぶせ", cn: "趴着", en: "face down", pos: "名詞" },
		{ jp: "認める", kana: "みとめる", cn: "承认", en: "to admit", pos: "動詞" },
	],

	grammar: [
		{
			pattern: "〜として（捜査する／逮捕される）",
			formation: "名詞＋として",
			meaning: "作为……（来处理）。事故报道里给事件定性：ひき逃げ事件として捜査している。",
			meaningEn: "as… (treating it as…). In accident copy, this classifies the case: investigating it as a hit-and-run.",
			example: {
				jp: "ひき{逃|に}げ{事件|じけん}として{捜査|そうさ}している。",
				cn: "按肇事逃逸事件进行搜查。",
				en: "They are investigating it as a hit-and-run.",
			},
		},
		{
			pattern: "〜ことから",
			formation: "普通形＋ことから",
			meaning: "从……这一点来看／由于……。给出判断或行动的根据。",
			meaningEn: "from the fact that… / because…. Gives the grounds for a judgment or action.",
			example: {
				jp: "{引|ひ}きずられたような{血痕|けっこん}が{残|のこ}っていたことから、ひき{逃|に}げ{事件|じけん}として{捜査|そうさ}している。",
				cn: "因为留下了像被拖过的血痕，所以按肇事逃逸事件搜查。",
				en: "Because bloodstains as if she had been dragged remained, they are investigating it as a hit-and-run.",
			},
		},
		{
			pattern: "〜とみられる",
			formation: "普通形／名詞＋とみられる",
			meaning: "据估计……、看起来是……。身份、年龄尚未确定时，报道常用。",
			meaningEn: "appears to be… / is believed to be…. Common in news when age or identity is not yet confirmed.",
			example: {
				jp: "{女性|じょせい}は60{代|だい}ぐらいとみられ、{身元|みもと}の{特定|とくてい}を{急|いそ}いでいる。",
				cn: "该女性看起来六十多岁，正在加紧确认身份。",
				en: "The woman appears to be in her sixties, and they are rushing to establish her identity.",
			},
		},
	],
};
