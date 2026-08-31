import type { ReadingDay } from "../reading-n3/types";

// 第3週 1日目 意見文① — printed pages 44–45
export const w3d1: ReadingDay = {
	week: 3,
	day: 1,
	label: "意見文①",
	labelKana: "いけんぶん",
	labelEn: "Opinions ①",
	printedPages: [44, 45],
	answerSource: "book",

	point: {
		title: "{文末表現|ぶんまつひょうげん}に{注意|ちゅうい}！",
		titleCn: "注意文章末尾的表达形式！",
		titleEn: "Be careful with words/phrases at the end of the sentence!",
		figure: {
			alt: "元気なキャラクターが「ボクは日本語をマスターしつつある！」と言い、もう一体が寝そべって「ボクは遊びすぎて試験に落ちる始末だ……」と言っているイラスト",
			cn: "一个角色精神十足地说「我正逐渐掌握日语！」，另一个趴着说「我玩过头，落得个考试不及格的下场……」",
			en: "One character says “I’m in the process of mastering Japanese!”; another lies sprawled out saying “I played too much, and now I’ve gone and failed the exam…”",
		},
		tips: [
			{
				jp: "こんな{表現|ひょうげん}に{注意|ちゅうい}しましょう！",
				cn: "请注意下面这类表达！",
				en: "Watch out for expressions like these!",
			},
		],
		expressions: [
			{ jp: "〜一方だ。／〜つつある。", kana: "いっぽう／つつある", cn: "＝〜の状態だ。正处于〜的状态。", en: "Indicates the present condition." },
			{ jp: "〜に至る。／〜次第だ。／〜始末だ。", kana: "いたる／しだい／しまつ", cn: "＝〜という結果になった。造成〜的结果。", en: "Indicates the result or consequences." },
		],
	},

	renshu: {
		instruction: "{次|つぎ}の{会話文|かいわぶん}を{読|よ}んで、{後|あと}の{文|ぶん}から{正|ただ}しいものを{選|えら}ぼう。",
		instructionCn: "阅读下面的对话，从后面的句子中选出正确的。（答案在下一页）",
		instructionEn: "Read the conversation below and choose the correct statements from the sentences that follow. (Answers are on the next page.)",
		blocks: [
			{
				type: "speech",
				speaker: "{男|おとこ}の{人|ひと}",
				speakerCn: "男士",
				speakerEn: "Man",
				jp: "また{病院|びょういん}のミスで{患者|かんじゃ}が{死|し}んだんだって。{看護師|かんごし}（注1）が{患者|かんじゃ}に{間違|まちが}った{薬|くすり}を{点滴|てんてき}（注2）したらしいよ。",
				cn: "又听说医院出错把病人弄死了。好像是护士给病人输错了药。",
				en: "I heard another patient died from a hospital error. Apparently a nurse gave the patient the wrong drug by IV.",
			},
			{
				type: "speech",
				speaker: "{女|おんな}の{人|ひと}",
				speakerCn: "女士",
				speakerEn: "Woman",
				jp: "え？　{薬|くすり}の{確認|かくにん}は{当然|とうぜん}するでしょう？",
				cn: "诶？核对药品不是理所当然的吗？",
				en: "What? They check the medicine as a matter of course, don’t they?",
			},
			{
				type: "speech",
				speaker: "{男|おとこ}の{人|ひと}",
				speakerCn: "男士",
				speakerEn: "Man",
				jp: "{確認|かくにん}はしたけど{患者|かんじゃ}の{名前|なまえ}が{間違|まちが}って{書|か}かれていたんだって。",
				cn: "核对是核对了，可是病人的名字写错了。",
				en: "They did check, but the patient’s name had been written incorrectly.",
			},
			{
				type: "speech",
				speaker: "{女|おんな}の{人|ひと}",
				speakerCn: "女士",
				speakerEn: "Woman",
				jp: "{信|しん}じられない。そんなケアレスミス（注3）で{人|ひと}の{命|いのち}が{奪|うば}われる（注4）なんて……。",
				cn: "难以置信。居然因为这种粗心失误就夺去人的性命……",
				en: "I can’t believe it. To think a careless mistake like that can take someone’s life…",
			},
			{
				type: "speech",
				speaker: "{男|おとこ}の{人|ひと}",
				speakerCn: "男士",
				speakerEn: "Man",
				jp: "ああ、ひどいよね。ニュースにならないミスはもっともっとあるということなんだろうね。",
				cn: "是啊，太糟了。没上新闻的失误大概还要多得多吧。",
				en: "Yeah, it’s awful. There are probably far more mistakes that never make the news.",
			},
		],
		footnotes: [
			{ marker: "（注1）", term: "看護師", jp: "かんごし", cn: "护士", en: "a nurse" },
			{ marker: "（注2）", term: "点滴", jp: "てんてき", cn: "输液、点滴", en: "an intravenous drip" },
			{ marker: "（注3）", term: "ケアレスミス", jp: "ケアレスミス", cn: "因疏忽而出错", en: "a careless mistake" },
			{ marker: "（注4）", term: "命が奪われる", jp: "いのちがうばわれる", cn: "被夺走生命", en: "to be killed" },
		],
		choices: [
			{ jp: "{患者|かんじゃ}が{死|し}んだのは、{病院|びょういん}のせいである。", cn: "病人死了是医院的责任。", en: "The patient’s death is the hospital’s fault." },
			{ jp: "{病院|びょういん}の{不注意|ふちゅうい}で、{患者|かんじゃ}が{違|ちが}う{薬|くすり}を{飲|の}んでしまった。", cn: "因为医院不小心，病人喝错了药。", en: "Through the hospital’s carelessness, the patient ended up taking the wrong medicine." },
			{ jp: "{看護師|かんごし}は{薬|くすり}の{確認|かくにん}をしなかった。", cn: "护士没有核对药品。", en: "The nurse did not check the medicine." },
			{ jp: "{女|おんな}の{人|ひと}は{看護師|かんごし}たちが{薬|くすり}の{名前|なまえ}を{知|し}らなかったことが{信|しん}じられない。", cn: "女士无法相信护士们竟然不知道药名。", en: "The woman cannot believe that the nurses did not know the name of the medicine." },
			{ jp: "{男|おとこ}の{人|ひと}は、{病院|びょういん}の{不注意|ふちゅうい}はたくさんあると{思|おも}っている。", cn: "男士认为医院的疏忽有很多。", en: "The man thinks hospital carelessness is very common." },
		],
		answers: [1, 5],
	},

	mondai: {
		instruction: "{次|つぎ}の{文章|ぶんしょう}を{読|よ}んで、{後|あと}の{問|と}いに{答|こた}えなさい。",
		instructionCn: "阅读下面的文章，回答后面的问题。（答案在别册 p.4）",
		instructionEn: "Read the following text and answer the questions that follow. (Answers are in the separate booklet, p. 4.)",
		blocks: [
			{
				type: "title",
				jp: "{増|ふ}え{続|つづ}ける{医療|いりょう}ミス",
				cn: "持续增加的医疗失误",
				en: "Medical errors that keep increasing",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "ニュースを{見|み}たとたん、{思|おも}わず「またか！」と{声|こえ}を{上|あ}げてしまった。{病院|びょういん}のケアレスミスで、また{一人|ひとり}の{患者|かんじゃ}が{死|し}に{至|いた}った。",
				cn: "一看新闻，就不由得喊出「又来了！」。因为医院的疏忽失误，又有一名病人丧命。",
				en: "The moment I saw the news, I couldn’t help crying “Not again!” Another patient had died from a hospital’s careless mistake.",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "{今回|こんかい}のミスは、{似|に}た{名前|なまえ}の{別人|べつじん}に{間違|まちが}った{薬|くすり}を{点滴|てんてき}してしまったというものである*。ちょっと{気|き}をつけて①{確認|かくにん}すれば、{簡単|かんたん}に{避|さ}けられるようなミスだ。{責任者|せきにんしゃ}である{院長|いんちょう}が、どんなに{謝|あやま}っても{失|うしな}われた{命|いのち}は{二度|にど}と{帰|かえ}らない。",
				cn: "这次的失误，是把药错输给了姓名相似的另一个人*。只要稍加留心①核对，本是轻易就能避免的失误。作为负责人的院长无论怎么道歉，失去的生命也不会再回来。",
				en: "This latest error was that the wrong drug was given by IV to someone else with a similar name.* It is the kind of mistake that could easily have been avoided if they had just been a little more careful and ①checked. No matter how much the hospital director, who is responsible, apologizes, a life that has been lost will never come back.",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "{最近|さいきん}、このような{事故|じこ}が{増|ふ}える{一方|いっぽう}である。いや、これは{事故|じこ}ではなく、「{殺人|さつじん}」である。よく「{人間|にんげん}は{間違|まちが}う{動物|どうぶつ}だ」などと{言|い}うが、{大切|たいせつ}な{命|いのち}を{預|あず}かる**{病院|びょういん}で、ケアレスミスは{許|ゆる}されないことだ。すべての{病院関係者|びょういんかんけいしゃ}はこのことを②{人ごと|ひとごと}とはせずに{重|おも}く{受|う}け{止|と}め（注2）、{自分|じぶん}の{病院|びょういん}のシステムを{見直|みなお}す{努力|どりょく}をしてほしい。",
				cn: "最近，这类事故有增无减。不，这已不是事故，而是「杀人」。人们常说「人是会犯错的动物」，但在受托掌管宝贵生命**的医院里，疏忽失误是不可原谅的。希望所有医院相关人员不要把这件事当作②与己无关，而要认真对待，努力重新审视自己医院的体系。",
				en: "Recently, accidents like this have been increasing steadily. No — this is not an accident; it is “murder.” People often say “humans are animals that make mistakes,” but in a hospital entrusted with precious lives,** a careless mistake cannot be allowed. I want everyone connected with hospitals not to treat this as ②somebody else’s problem, but to take it very seriously (note 2) and work to review the systems at their own hospitals.",
			},
			{
				type: "heading",
				jp: "システム（注1）の{見直|みなお}しを！",
				cn: "请重新审视体系（注1）！",
				en: "Review the system (note 1)!",
			},
		],
		footnotes: [
			{ marker: "（注1）", term: "システム", jp: "システム", cn: "体系、系统", en: "a system" },
			{ marker: "（注2）", term: "重く受け止める", jp: "おもくうけとめる", cn: "深刻认识、认真对待", en: "to take a matter very seriously" },
		],
		pageNotes: [
			{
				jp: "＊{似|に}た{名前|なまえ}の{別人|べつじん}に{間違|まちが}った{薬|くすり}を{点滴|てんてき}してしまった。",
				cn: "这次的事故是错误地将药输入到姓名相似的其他病人。",
				en: "The most recent incident involved an intravenous drip being inadvertently administered to a patient with a similar name.",
			},
			{
				jp: "＊＊{大切|たいせつ}な{命|いのち}を{預|あず}かる",
				cn: "掌管珍贵的生命",
				en: "to be responsible for saving people’s lives",
			},
		],
		questions: [
			{
				label: "問1",
				jp: "①{確認|かくにん}すればとあるが、{何|なに}を{確認|かくにん}するのか。",
				cn: "文中说①「只要核对」，要核对的是什么？",
				en: "The text says “if they ①checked.” What should be checked?",
				choices: [
					{ jp: "ケアレスミス", cn: "疏忽失误", en: "a careless mistake" },
					{ jp: "{患者|かんじゃ}の{状態|じょうたい}", cn: "病人的状态", en: "the patient’s condition" },
					{ jp: "{点滴|てんてき}の{量|りょう}", cn: "输液的剂量", en: "the amount of the intravenous drip" },
					{ jp: "{患者|かんじゃ}の{名前|なまえ}", cn: "病人的姓名", en: "the patient’s name" },
				],
				answer: 4,
				explanation:
					"上一句写的是「似た名前の別人に間違った薬を点滴してしまった」。只要核对患者姓名，就不会输错人。所以①确认的对象是患者的名字，选 4。这正是本课要点：看清文末「〜すれば避けられる」在说什么。",
				explanationEn:
					"The sentence before says the wrong drug was given by IV to someone else with a similar name. Checking the patient’s name would have prevented giving it to the wrong person. So what should be ①checked is the patient’s name: 4. That is this lesson’s point: see what the sentence-ending pattern is actually about.",
				choiceNotes: [
					"「ケアレスミス」是这次事件的性质，不是要核对的对象。",
					"文中没有写要确认患者身体状况。",
					"出错的不是药量，而是把药输给了姓名相似的别人。",
					"正确。前文「似た名前の別人」就是在提示要核对姓名。",
				],
				choiceNotesEn: [
					"“A careless mistake” is what the incident was, not what should be checked.",
					"The passage does not say they needed to check the patient’s condition.",
					"The error was not the dose; it was giving the drug to someone else with a similar name.",
					"Correct. “Someone else with a similar name” tells you the name is what needed checking.",
				],
			},
			{
				label: "問2",
				jp: "②{人ごと|ひとごと}とはせずにとあるが、どういう{意味|いみ}か。",
				cn: "文中说②「不要当作与己无关」，是什么意思？",
				en: "What does ②“not treat it as somebody else’s problem” mean?",
				choices: [
					{ jp: "{自分|じぶん}には{関係|かんけい}ないことと{思|おも}わないで", cn: "不要觉得这和自己无关", en: "without thinking it has nothing to do with you" },
					{ jp: "{人間|にんげん}だけのことは{思|おも}わないで", cn: "不要觉得这只是人类的事", en: "without thinking it is only a human matter" },
					{ jp: "{患者|かんじゃ}だけのことは{思|おも}わないで", cn: "不要觉得这只是病人的事", en: "without thinking it concerns only the patient" },
					{ jp: "{重要|じゅうよう}ではないとは{思|おも}わないで", cn: "不要觉得这不重要", en: "without thinking it is unimportant" },
				],
				answer: 1,
				explanation:
					"「人ごと」＝他人事，即「自己には関係ないこと」。后文要求所有医院相关人员「重く受け止め、自分の病院のシステムを見直す」——不要觉得那是别家医院的事。所以 1 正确。2 把「人」理解成「人类」，3 理解成「患者」，都是望文生义。4 只说「重要」，没有「与自己有没有关系」这层意思。",
				explanationEn:
					"Hitogoto means “somebody else’s affair” — something that has nothing to do with you. The next clause asks all hospital staff to take it seriously and review their own hospital’s system, i.e. not treat it as another hospital’s problem. So 1 is correct. 2 reads hito as “human beings,” and 3 as “the patient”; both are guesswork from the characters. 4 only says “important,” and misses the “does it concern me?” meaning.",
				choiceNotes: [
					"正确。「人ごと」就是「与自己无关的别人的事」。",
					"「人」在这里不是「人类」，而是「别人」。",
					"不是「不要只当成患者的事」。",
					"「人ごと」的核心是「和自己无关」，不是「不重要」。后文「重く受け止め」才是在说要重视。",
				],
				choiceNotesEn: [
					"Correct. Hitogoto is “somebody else’s business,” i.e. none of my concern.",
					"Hito here does not mean “human beings”; it means “other people.”",
					"It does not mean “don’t think of it as only the patient’s matter.”",
					"The core of hitogoto is “not my concern,” not “unimportant.” Taking it seriously is the next phrase, 重く受け止める.",
				],
			},
		],
	},

	vocab: [
		{ jp: "文末表現", kana: "ぶんまつひょうげん", cn: "句末表达", en: "sentence-ending expression", pos: "名詞" },
		{ jp: "一方だ", kana: "いっぽうだ", cn: "一个劲儿地、越来越", en: "to keep (doing); to be on the increase", pos: "表現" },
		{ jp: "つつある", cn: "正在（逐渐）……", en: "to be in the process of…", pos: "表現" },
		{ jp: "至る", kana: "いたる", cn: "以至、达到（某种结果）", en: "to lead to; to result in", pos: "動詞" },
		{ jp: "次第だ", kana: "しだいだ", cn: "落到……地步", en: "to end up (badly); it depends", pos: "表現" },
		{ jp: "始末だ", kana: "しまつだ", cn: "落得……的下场", en: "to end up (in a bad situation)", pos: "表現" },
		{ jp: "医療", kana: "いりょう", cn: "医疗", en: "medical care", pos: "名詞" },
		{ jp: "ケアレスミス", cn: "疏忽失误", en: "a careless mistake", pos: "名詞" },
		{ jp: "点滴", kana: "てんてき", cn: "输液、点滴", en: "intravenous drip", pos: "名詞" },
		{ jp: "看護師", kana: "かんごし", cn: "护士", en: "nurse", pos: "名詞" },
		{ jp: "患者", kana: "かんじゃ", cn: "患者、病人", en: "patient", pos: "名詞" },
		{ jp: "確認", kana: "かくにん", cn: "确认、核对", en: "confirmation; to check", pos: "名詞・動詞" },
		{ jp: "避ける", kana: "さける", cn: "避免", en: "to avoid", pos: "動詞" },
		{ jp: "院長", kana: "いんちょう", cn: "院长", en: "hospital director", pos: "名詞" },
		{ jp: "預かる", kana: "あずかる", cn: "受托保管、掌管", en: "to be entrusted with", pos: "動詞" },
		{ jp: "人ごと", kana: "ひとごと", cn: "别人的事、与己无关", en: "somebody else’s business", pos: "名詞" },
		{ jp: "受け止める", kana: "うけとめる", cn: "接受、认真对待", en: "to take (a matter) on board", pos: "動詞" },
		{ jp: "見直す", kana: "みなおす", cn: "重新审视、复核", en: "to review; to look over again", pos: "動詞" },
	],

	grammar: [
		{
			pattern: "〜一方だ",
			formation: "動詞辞書形＋一方だ",
			meaning: "一个劲儿地、越来越……。表示某种倾向持续发展，多用于不好的事。",
			meaningEn: "to keep …-ing / to be increasingly …. A continuing trend, often negative.",
			example: {
				jp: "このような{事故|じこ}が{増|ふ}える{一方|いっぽう}である。",
				cn: "这类事故有增无减。",
				en: "Accidents like this have been increasing steadily.",
			},
		},
		{
			pattern: "〜に至る",
			formation: "動詞辞書形／名詞＋に至る",
			meaning: "以至……、落到……的结果。书面语，强调结果之严重。",
			meaningEn: "to go so far as to… / to result in…. Written style; stresses how serious the outcome is.",
			example: {
				jp: "{患者|かんじゃ}が{死|し}に{至|いた}った。",
				cn: "病人因此丧命。",
				en: "The patient ended up dying.",
			},
		},
		{
			pattern: "〜つつある",
			formation: "動詞ます形＋つつある",
			meaning: "正在逐渐……。书面语，表示变化在进行中。",
			meaningEn: "to be in the process of…. Written style; a change underway.",
			example: {
				jp: "{日本語|にほんご}をマスターしつつある。",
				cn: "正在逐渐掌握日语。",
				en: "I am in the process of mastering Japanese.",
			},
		},
	],
};
