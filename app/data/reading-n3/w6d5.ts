import type { ReadingDay } from "./types";

// 第6週 5日目 医学に関する文章 — printed pages 100–101
// 別冊 p.7（第6週の解答）は今回のスキャンに含まれていないため、答えは本文から導出。
export const w6d5: ReadingDay = {
	week: 6,
	day: 5,
	label: "医学に関する文章",
	labelKana: "いがくにかんするぶんしょう",
	labelEn: "Medical Sentences",
	printedPages: [100, 101],
	answerSource: "derived",

	point: {
		title: "{話|はな}し{言葉|ことば}、{書|か}き{言葉|ことば}の{違|ちが}いに{注意|ちゅうい}しよう！",
		titleCn: "注意口语与书面语的差别！",
		titleEn: "Pay attention to the difference between spoken and written language!",
		figure: {
			alt: "本には「バラの花は、ただ咲いているだけで美しいのである。」と書かれ、話し言葉では「バラの花は、ただ咲いているだけで美しいんです。」となることを示す図（〜んです＝のである）",
			cn: "书上写的是「バラの花は、ただ咲いているだけで美しい**のである**。」，而口语则说成「〜美しい**んです**。」——两者意思相同。",
			en: "In a book it is written “バラの花は、ただ咲いているだけで美しい**のである**.” In speech it becomes “〜美しい**んです**.” — they mean the same thing.",
		},
		tips: [
			{
				jp: "「のだ・のである」は{結論|けつろん}によく{使|つか}われます。{書|か}き{言葉|ことば}の「〜のである」＝{話|はな}し{言葉|ことば}の「〜んです」。",
				cn: "「のだ・のである」常用于**结论**部分。书面语的「〜のである」＝口语的「〜んです」，看到它就要留意：这句多半是重点。",
				en: "“のだ / のである” is often used in the conclusion. Written “〜のである” = spoken “〜んです.” When you see it, pay attention: that sentence is likely the main point.",
			},
		],
		expressions: [
			{ jp: "〜の。／〜んだ。／〜んです。", cn: "【口语】陈述（＝のだ）", en: "[spoken] statement (= のだ)" },
			{ jp: "〜のです。／〜のだ。／〜のである。", cn: "【书面语】陈述、下结论", en: "[written] statement; drawing a conclusion" },
			{ jp: "〜の？／〜んですか？", cn: "【口语】疑问", en: "[spoken] question" },
			{ jp: "〜のですか？／〜のか？", cn: "【书面语】疑问", en: "[written] question" },
			{ jp: "〜のかな？／〜んだろうか？／〜んでしょうか？", cn: "【口语】推测疑问", en: "[spoken] wondering / speculative question" },
			{ jp: "〜のだろうか？／〜のであろうか？", cn: "【书面语】推测疑问", en: "[written] wondering / speculative question" },
			{ jp: "咳止め", kana: "せきどめ", cn: "止咳药", en: "a cough medicine" },
			{ jp: "うがい", cn: "漱口", en: "gargling" },
		],
	},

	renshu: {
		instruction: "{次|つぎ}の{会話文|かいわぶん}を{読|よ}んで、{後|あと}の{文|ぶん}から{正|ただ}しいものを{選|えら}ぼう。",
		instructionCn: "阅读下面的对话，从后面的句子中选出正确的。（答案在下一页）",
		instructionEn: "Read the conversation below and choose the correct statements from the sentences that follow. (Answers are on the next page.)",
		blocks: [
			{ type: "speech", speaker: "{医者|いしゃ}", speakerCn: "医生", speakerEn: "Doctor", jp: "どうしました？", cn: "怎么了？", en: "What’s the matter?" },
			{
				type: "speech",
				speaker: "{患者|かんじゃ}",
				speakerCn: "患者",
				speakerEn: "Patient",
				jp: "あの、{風邪|かぜ}を{引|ひ}いたみたいで……。{熱|ねつ}はそんなにないんですが、{咳|せき}がひどいんです。",
				cn: "那个，我好像感冒了……烧不太高，但咳嗽很厉害。",
				en: "Um, I think I have a cold… I don’t have much of a fever, but the cough is bad.",
			},
			{
				type: "speech",
				speaker: "{医者|いしゃ}",
				speakerCn: "医生",
				speakerEn: "Doctor",
				jp: "{咳|せき}ねー。{咳止|せきど}め（※）を{飲|の}むとそのときは{止|と}まるんだけど、また{出|で}てくるんですよ。それより、うがい{薬|ぐすり}を{出|だ}しておくから、よくうがいをするように。{熱|ねつ}が{下|さ}がらなかったら、{来週|らいしゅう}の{月曜日|げつようび}にもう{一度|いちど}いらっしゃい。",
				cn: "咳嗽啊。吃止咳药当时是能止住，可过后又会咳起来。比起那个，我给你开点漱口液，要好好漱口。如果烧退不下去，下周一再来一趟。",
				en: "A cough, hmm. Cough medicine will stop it for a while, but then it comes back. Better than that, I’ll prescribe a gargle, so please gargle well. If the fever doesn’t go down, come back next Monday.",
			},
			{ type: "speech", speaker: "{患者|かんじゃ}", speakerCn: "患者", speakerEn: "Patient", jp: "はい、わかりました。", cn: "好的，我知道了。", en: "Yes, I understand." },
		],
		footnotes: [{ marker: "※", term: "咳止め", jp: "a cough medicine", cn: "止咳药", en: "a cough medicine" }],
		choices: [
			{ jp: "{患者|かんじゃ}は、{熱|ねつ}がない。", cn: "患者没有发烧。", en: "The patient has no fever." },
			{ jp: "{患者|かんじゃ}は{熱|ねつ}より{咳|せき}でつらいようだ。", cn: "比起发烧，患者好像更被咳嗽折磨。", en: "The patient seems to be suffering more from the cough than from the fever." },
			{ jp: "{医者|いしゃ}は{患者|かんじゃ}に{咳止|せきど}めを{出|だ}すつもりである。", cn: "医生打算给患者开止咳药。", en: "The doctor intends to prescribe cough medicine." },
			{ jp: "{咳止|せきど}めを{飲|の}んでも、{完全|かんぜん}には{咳|せき}がなくならない。", cn: "即使吃了止咳药，咳嗽也不会完全消失。", en: "Even if you take cough medicine, the cough does not go away completely." },
			{ jp: "{医者|いしゃ}は{患者|かんじゃ}にうがいを{勧|すす}めている。", cn: "医生建议患者漱口。", en: "The doctor is recommending that the patient gargle." },
		],
		answers: [2, 4, 5],
		hint: {
			jp: "「{熱|ねつ}はそんなにない」＝{少|すこ}しはある。{医者|いしゃ}が{出|だ}すのは「うがい{薬|ぐすり}」。",
			cn: "「熱はそんなにない」是「不太高」，不等于没有；医生说「それより、うがい薬を出しておく」，开的是漱口液而不是止咳药。",
			en: "“I don’t have much of a fever” means “not that high,” not “none.” The doctor says “better than that, I’ll prescribe a gargle,” so what is prescribed is a gargle, not cough medicine.",
		},
	},

	mondai: {
		instruction: "{次|つぎ}の{文章|ぶんしょう}を{読|よ}んで、{後|あと}の{問|と}いに{答|こた}えなさい。",
		instructionCn: "阅读下面的文章，回答后面的问题。（原书答案在别册 p.7）",
		instructionEn: "Read the passage below and answer the questions that follow. (Answers are in the supplement, p. 7.)",
		blocks: [
			{
				type: "paragraph",
				indent: true,
				jp: "{風邪|かぜ}を{引|ひ}くと、{咳|せき}が{出|で}たり{熱|ねつ}が{出|で}たりする。{以前|いぜん}は、{熱|ねつ}が{出|で}ると{熱|ねつ}を{下|さ}げるために{注射|ちゅうしゃ}をしたり、{咳|せき}が{出|で}ると{咳止|せきど}めの{薬|くすり}を{飲|の}んだりしたものだ。しかし、{近年|きんねん}、{風邪|かぜ}の{治療|ちりょう}（※1）に{対|たい}する{考|かんが}え{方|かた}がちょっと{変|か}わってきた。",
				cn: "一感冒，就会咳嗽、发烧。以前，一发烧就为了退烧去打针，一咳嗽就吃止咳药。然而近年来，人们对感冒治疗的看法有了一些变化。",
				en: "When you catch a cold, you cough or run a fever. In the past, when you had a fever you got a shot to bring it down, and when you coughed you took cough medicine. In recent years, though, the way people think about treating colds has changed a little.",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "{熱|ねつ}が{出|で}ても、{無理|むり}にそれを{下|さ}げることはしないほうがよいと{言|い}われるようになった。なぜなら、{風邪|かぜ}の{原因|げんいん}であるウイルス（※2）は{熱|ねつ}に{弱|よわ}く、そのウイルスを{退治|たいじ}しよう（※3）として{体|からだ}が{熱|あつ}くなるからだ。こういうとき、{無理|むり}に{熱|ねつ}を{下|さ}げてしまうと、ウイルスは{逆|ぎゃく}に{活発|かっぱつ}（※4）になってしまい、（　　　　　）ということがわかってきたのだ。",
				cn: "现在人们开始说：即使发烧，也最好不要强行退烧。因为引起感冒的病毒怕热，身体正是为了消灭病毒才发热的。这种时候如果硬把热退下去，病毒反而会变得活跃，（　　　　　）——这一点已经逐渐为人所知。",
				en: "People have started to say that even if you have a fever, it is better not to force it down. That is because the virus that causes a cold is weak against heat, and the body gets hot in order to get rid of that virus. If at a time like this you force the fever down, the virus becomes more active instead, and it has become known that (　　　　　).",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "{咳|せき}についても{同|おな}じようなことが{言|い}える。ウイルスを{早|はや}く{体内|たいない}から{追|お}い{出|だ}そうとするために{咳|せき}が{出|で}るのだ。だから、{薬|くすり}で{咳|せき}をおさえてしまうのは{逆効果|ぎゃくこうか}になる＊ということだ。",
				cn: "关于咳嗽也可以说同样的话。正是为了尽快把病毒赶出体外，才会咳嗽。所以，用药硬压住咳嗽反而会适得其反＊。",
				en: "The same kind of thing can be said about coughing. You cough in order to drive the virus out of the body quickly. So holding the cough down with medicine has the opposite effect＊.",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "つまり、{風邪|かぜ}の{薬|くすり}はできるだけ{飲|の}まないほうがよいのである。{熱|ねつ}は{下|さ}がるまで{待|ま}ち、{咳|せき}も{出|で}るのは{仕方|しかた}がない。そのうちに{自然|しぜん}に{治|なお}る。とはいっても、{高|たか}い{熱|ねつ}や{咳|せき}で{苦|くる}しむのはつらい。やはり、{風邪|かぜ}にはかからないようにしたいものである。",
				cn: "也就是说，感冒药最好尽量不要吃。发烧就等它自己退，咳嗽也只能任其咳。过一阵子自然会好。话虽如此，被高烧和咳嗽折磨确实难受。所以说到底，还是希望能不感冒才好。",
				en: "In other words, it is better not to take cold medicine if you can help it. Wait for the fever to go down, and as for the cough, it can’t be helped. In time it will get better by itself. That said, suffering from a high fever and a cough is hard. After all, what you really want is not to catch a cold in the first place.",
			},
		],
		footnotes: [
			{ marker: "※1", term: "治療", jp: "a treatment", cn: "治疗", en: "a treatment" },
			{ marker: "※2", term: "ウイルス", jp: "a virus", cn: "病毒", en: "a virus" },
			{ marker: "※3", term: "退治する", jp: "to get rid of", cn: "消灭、除掉", en: "to get rid of" },
			{ marker: "※4", term: "活発", jp: "active", cn: "活跃", en: "active" },
		],
		pageNotes: [
			{
				jp: "＊ taking medicine to stop your cough has the opposite effect",
				cn: "＊靠吃药压住咳嗽反而会适得其反。",
				en: "＊ taking medicine to stop your cough has the opposite effect",
			},
		],
		questions: [
			{
				label: "問1",
				jp: "（　　）の{中|なか}に{入|はい}る{言葉|ことば}として{最|もっと}も{適当|てきとう}なものはどれか。",
				cn: "填入（　　）中最恰当的词语是哪一个？",
				en: "Which words fit best in the blank (　　)?",
				choices: [
					{ jp: "{病気|びょうき}がひどくなる", cn: "病情会加重", en: "the illness gets worse" },
					{ jp: "{熱|ねつ}が{下|さ}がらない", cn: "烧退不下去", en: "the fever does not go down" },
					{ jp: "ウイルスが{体内|たいない}から{出|で}る", cn: "病毒会排出体外", en: "the virus leaves the body" },
					{ jp: "{風邪|かぜ}を{引|ひ}いてしまう", cn: "会感冒", en: "you catch a cold" },
				],
				answer: 1,
				explanation:
					"顺着因果链读：病毒怕热 → 身体发热是为了消灭病毒 → 强行退烧 →「ウイルスは逆に活発になってしまい」→ 病毒活跃的结果自然是**病情加重**。所以 1 正确。",
				explanationEn:
					"Follow the chain of cause and effect: the virus is weak against heat → the body gets hot in order to get rid of the virus → if you force the fever down → “the virus becomes more active instead” → the natural result of an active virus is that **the illness gets worse**. So 1 is correct.",
				choiceNotes: [
					"正确。病毒变活跃 → 病情加重，逻辑通顺。",
					"前提是「無理に熱を下げてしまうと」——已经退烧了，说「退不下去」矛盾。",
					"病毒排出体外是好事，与「逆に活発になってしまい」的负面走向矛盾。",
					"文章讲的是已经感冒之后的治疗，不是会不会感冒。",
				],
				choiceNotesEn: [
					"Correct. The virus becomes more active → the illness gets worse; the logic is sound.",
					"The premise is “if you force the fever down” — the fever has already gone down, so “it doesn’t go down” contradicts that.",
					"The virus leaving the body is a good thing, and it contradicts the negative direction of “becomes more active instead.”",
					"The passage is about treatment after you already have a cold, not about catching one.",
				],
			},
			{
				label: "問2",
				jp: "{筆者|ひっしゃ}が{言|い}いたいことは{何|なに}か。",
				cn: "笔者想说的是什么？",
				en: "What does the writer want to say?",
				choices: [
					{ jp: "{最近|さいきん}のウイルスは{熱|ねつ}に{強|つよ}くなってきた。", cn: "最近的病毒变得耐热了。", en: "Recent viruses have become stronger against heat." },
					{ jp: "{最近|さいきん}の{風邪薬|かぜぐすり}は{効|き}かなくなってきた。", cn: "最近的感冒药变得没效了。", en: "Recent cold medicines have stopped working." },
					{ jp: "{風邪|かぜ}で、{医者|いしゃ}に{行|い}くのは{無駄|むだ}である。", cn: "感冒去看医生是白费。", en: "Going to the doctor for a cold is a waste." },
					{ jp: "{風邪|かぜ}を{治|なお}すためには、{薬|くすり}を{飲|の}まないほうがいい。", cn: "为了治好感冒，最好不要吃药。", en: "To get over a cold, it is better not to take medicine." },
				],
				answer: 4,
				explanation:
					"第四段以「つまり」开头，用书面语的「〜のである」下结论：「風邪の薬はできるだけ飲まないほうがよいのである」。本课要点正是——「のだ・のである」常用于结论。所以 4 正确。",
				explanationEn:
					"The fourth paragraph starts with “つまり” and draws a conclusion in the written form “〜のである”: “it is better not to take cold medicine if you can help it.” The day’s key point is exactly that “のだ / のである” is often used for the conclusion. So 4 is correct.",
				choiceNotes: [
					"文中说「ウイルスは熱に弱く」，没有说病毒变耐热了。",
					"文章讲的是药会产生反效果，不是药效变差了。",
					"文中完全没有提到该不该看医生。",
					"正确。「つまり、風邪の薬はできるだけ飲まないほうがよいのである」。",
				],
				choiceNotesEn: [
					"The text says “the virus is weak against heat,” not that viruses have become heat-resistant.",
					"The passage is about medicine having the opposite effect, not about it becoming less effective.",
					"There is no mention of whether you should go to the doctor.",
					"Correct. “In other words, it is better not to take cold medicine if you can help it.”",
				],
			},
		],
	},

	vocab: [
		{ jp: "風邪を引く", kana: "かぜをひく", cn: "感冒", en: "to catch a cold", pos: "表現" },
		{ jp: "咳", kana: "せき", cn: "咳嗽", en: "a cough", pos: "名詞" },
		{ jp: "熱", kana: "ねつ", cn: "发烧、体温", en: "a fever; body heat", pos: "名詞" },
		{ jp: "注射", kana: "ちゅうしゃ", cn: "打针", en: "an injection", pos: "名詞・動詞" },
		{ jp: "咳止め", kana: "せきどめ", cn: "止咳药", en: "cough medicine", pos: "名詞" },
		{ jp: "治療", kana: "ちりょう", cn: "治疗", en: "treatment", pos: "名詞・動詞" },
		{ jp: "近年", kana: "きんねん", cn: "近年", en: "in recent years", pos: "名詞" },
		{ jp: "無理に", kana: "むりに", cn: "强行地", en: "by force; unnaturally", pos: "副詞" },
		{ jp: "ウイルス", cn: "病毒", en: "a virus", pos: "名詞" },
		{ jp: "退治する", kana: "たいじする", cn: "消灭、除掉", en: "to get rid of", pos: "動詞" },
		{ jp: "活発", kana: "かっぱつ", cn: "活跃", en: "active", pos: "な形" },
		{ jp: "体内", kana: "たいない", cn: "体内", en: "inside the body", pos: "名詞" },
		{ jp: "追い出す", kana: "おいだす", cn: "赶出去", en: "to drive out", pos: "動詞" },
		{ jp: "おさえる", cn: "压制、抑制", en: "to hold down; to suppress", pos: "動詞" },
		{ jp: "逆効果", kana: "ぎゃくこうか", cn: "反效果", en: "the opposite effect", pos: "名詞" },
		{ jp: "自然に", kana: "しぜんに", cn: "自然地", en: "naturally; by itself", pos: "副詞" },
		{ jp: "治る", kana: "なおる", cn: "痊愈", en: "to get better", pos: "動詞" },
		{ jp: "苦しむ", kana: "くるしむ", cn: "受折磨", en: "to suffer", pos: "動詞" },
		{ jp: "うがい", cn: "漱口", en: "gargling", pos: "名詞" },
		{ jp: "勧める", kana: "すすめる", cn: "劝、建议", en: "to recommend", pos: "動詞" },
	],

	grammar: [
		{
			pattern: "〜のである／〜のだ",
			meaning: "书面语的说明、断定形式，**常用于结论**。口语中相当于「〜んです／〜んだ」。",
			meaningEn: "A written form for explaining or asserting, often used in conclusions. In speech it is “〜んです / 〜んだ.”",
			example: {
				jp: "{風邪|かぜ}の{薬|くすり}はできるだけ{飲|の}まないほうがよいのである。",
				cn: "感冒药最好尽量不要吃。",
				en: "It is better not to take cold medicine if you can help it.",
			},
			note: "本课要点。找结论时，先找带「のである」的句子。",
			noteEn: "This is the key point of the lesson. When you look for the conclusion, look first for a sentence with “のである.”",
		},
		{
			pattern: "なぜなら〜からだ",
			meaning: "因为……。「なぜなら」提示理由，句尾用「からだ」呼应。",
			meaningEn: "Because …. “なぜなら” signals a reason, and the sentence ends with “からだ.”",
			example: {
				jp: "なぜなら、……ウイルスは{熱|ねつ}に{弱|よわ}く、……{体|からだ}が{熱|あつ}くなるからだ。",
				cn: "因为病毒怕热，身体才会发热。",
				en: "Because the virus is weak against heat, and the body gets hot …",
			},
		},
		{
			pattern: "〜たものだ",
			formation: "動詞た形 ＋ ものだ",
			meaning: "（过去）常常……。回忆过去的习惯。",
			meaningEn: "Used to … (in the past). Recalls a past habit.",
			example: {
				jp: "{熱|ねつ}が{出|で}ると……{注射|ちゅうしゃ}をしたり……{薬|くすり}を{飲|の}んだりしたものだ。",
				cn: "以前一发烧就去打针、吃药。",
				en: "When you had a fever you used to get a shot or take medicine.",
			},
		},
		{
			pattern: "〜（よ）うとする",
			meaning: "试图……、想要……。",
			meaningEn: "To try to … / to be about to ….",
			example: { jp: "ウイルスを{早|はや}く{体内|たいない}から{追|お}い{出|だ}そうとするために", cn: "为了尽快把病毒赶出体外", en: "in order to try to drive the virus out of the body quickly" },
		},
		{
			pattern: "とはいっても",
			meaning: "话虽如此。用于对自己刚说的话作出让步。",
			meaningEn: "That said / even so. Used to grant a point against what you just said.",
			example: { jp: "とはいっても、{高|たか}い{熱|ねつ}や{咳|せき}で{苦|くる}しむのはつらい。", cn: "话虽如此，被高烧和咳嗽折磨确实难受。", en: "That said, suffering from a high fever and a cough is hard." },
		},
		{
			pattern: "〜ようにしたいものである",
			meaning: "希望能做到……。表示愿望的书面说法。",
			meaningEn: "What one would like is to …. A written way of stating a wish.",
			example: { jp: "{風邪|かぜ}にはかからないようにしたいものである。", cn: "还是希望能不感冒才好。", en: "What you really want is not to catch a cold." },
		},
		{
			pattern: "〜ようになった",
			meaning: "变得……了。表示变化。",
			meaningEn: "Have come to … / it has become the case that …. Marks a change.",
			example: { jp: "……{言|い}われるようになった。", cn: "人们开始这样说了。", en: "people have come to say …" },
		},
	],
};
