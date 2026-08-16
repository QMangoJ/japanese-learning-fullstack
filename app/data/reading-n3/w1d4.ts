import type { ReadingDay } from "./types";

// 第1週 4日目 試験要項 — printed pages 18–19
export const w1d4: ReadingDay = {
	week: 1,
	day: 4,
	label: "試験要項",
	labelKana: "しけんようこう",
	labelEn: "Examination Details",
	printedPages: [18, 19],
	answerSource: "book",

	point: {
		title: "{似|に}ている{言葉|ことば}に{注意|ちゅうい}しよう！",
		titleCn: "注意相似的词汇！",
		titleEn: "Pay attention to similar words!",
		figure: {
			alt: "「レポートは7月31日までに提出すること」という掲示を見て、「7月31日までに提出しないといけないって。」「7月31日って、明日だ！」と驚く二人",
			cn: "两人看着「报告须于 7 月 31 日之前提交」的公告，一个说「说是必须在 7 月 31 日之前交」，另一个惊呼「7 月 31 日不就是明天嘛！」",
			en: "Two people look at a notice that says “Submit the report by July 31.” One says, “We have to hand it in by July 31,” and the other gasps, “July 31 is tomorrow!”",
		},
		tips: [
			{
				jp: "「10{日|か}まで」は10{日|か}{当日|とうじつ}も{受|う}け{付|つ}ける、「10{日|か}までに」は10{日|か}を{過|す}ぎてはいけない{期限|きげん}。{助詞|じょし}{一|ひと}つで{意味|いみ}が{変|か}わる。",
				cn: "「10 日まで」表示到 10 日当天为止一直受理；「10 日までに」表示期限，不能超过 10 日。一个助词就改变了意思。",
				en: "made means they will accept it through the 10th itself; made ni is a deadline you must not go past. One particle changes the meaning.",
			},
		],
		expressions: [
			{ jp: "10日まで受け付けます。", kana: "とおかまでうけつけます", cn: "报名受理到 10 日为止。", en: "It will be accepted until the 10th." },
			{ jp: "10日までに提出してください。", kana: "とおかまでにていしゅつしてください", cn: "请在 10 日之前提交。", en: "It must be submitted by the 10th." },
			{ jp: "今回の〜", kana: "こんかい", cn: "这次的〜（在屡次进行的事情中特指本次）", en: "this time (used for things that occur repeatedly)" },
			{ jp: "今度（＝次回）のテストはがんばろう。", kana: "こんど", cn: "下次的考试要加油。", en: "I will do my best on the next (coming) test." },
			{ jp: "今回／今度のテストは難しかった。", kana: "こんかい／こんど", cn: "这次的考试很难。", en: "The test this time was difficult." },
			{ jp: "提出する", kana: "ていしゅつする", cn: "提交", en: "to submit, hand in" },
			{ jp: "減点", kana: "げんてん", cn: "扣分", en: "points taken off" },
			{ jp: "単位", kana: "たんい", cn: "学分", en: "a credit" },
		],
		notes: [
			{
				jp: "「{今回|こんかい}」「{今度|こんど}」は{終|お}わったばかりのものにも{使|つか}う。",
				cn: "「今回」「今度」也可以用于刚刚结束的事情（既能指「下一次」，也能指「这一次／刚刚这次」，要看上下文）。",
				en: "konkai and kondo can also refer to something that has just finished (they can mean “next time” or “this / the latest time,” depending on context).",
			},
		],
	},

	renshu: {
		instruction: "{次|つぎ}の{会話文|かいわぶん}を{読|よ}んで、{後|あと}の{文|ぶん}から{正|ただ}しいものを{選|えら}ぼう。",
		instructionCn: "阅读下面的对话，从后面的句子中选出正确的。（答案在下一页）",
		instructionEn: "Read the conversation below and choose the correct statements from the sentences that follow. (Answers are on the next page.)",
		blocks: [
			{
				type: "speech",
				speaker: "{男子学生|だんしがくせい}",
				speakerCn: "男学生",
				speakerEn: "Male student",
				jp: "もうすぐ、{試験|しけん}だね。ノート、{貸|か}してくれない？",
				cn: "马上就要考试了呢。笔记能借我吗？",
				en: "The exam is coming up, isn’t it? Could you lend me your notes?",
			},
			{
				type: "speech",
				speaker: "{女子学生|じょしがくせい}",
				speakerCn: "女学生",
				speakerEn: "Female student",
				jp: "いいけど、{土曜日|どようび}までに{返|かえ}してよね。{私|わたし}も{試験勉強|しけんべんきょう}しないといけないから。",
				cn: "可以，但你要在星期六之前还我哦。我也得复习考试呢。",
				en: "Sure, but give them back by Saturday. I have to study for the exam too.",
			},
			{
				type: "speech",
				speaker: "{男子学生|だんしがくせい}",
				speakerCn: "男学生",
				speakerEn: "Male student",
				jp: "うん、わかった。ところで、レポート、{書|か}いてる？　おれ、まだ1ページしか{書|か}いていないんだ。",
				cn: "嗯，知道了。对了，报告你写了吗？我才写了 1 页。",
				en: "Okay. By the way, have you been writing the report? I’ve only written one page so far.",
			},
			{
				type: "speech",
				speaker: "{女子学生|じょしがくせい}",
				speakerCn: "女学生",
				speakerEn: "Female student",
				jp: "わー、それは{大変|たいへん}！　31{日|にち}までに{提出|ていしゅつ}しない（※1）と、{減点|げんてん}（※2）って{書|か}いてあるし、もし{出|だ}さなかったら、{単位|たんい}（※3）、もらえないよ。",
				cn: "哇，那可糟了！上面写着不在 31 日之前提交就要扣分，而且要是干脆不交，学分都拿不到哦。",
				en: "Wow, that’s bad! It says you’ll lose points if you don’t submit it by the 31st, and if you don’t hand it in at all, you won’t get the credit.",
			},
		],
		footnotes: [
			{ marker: "※1", term: "提出する", jp: "to submit, hand in", cn: "提交、交上去", en: "to submit, hand in" },
			{ marker: "※2", term: "減点", jp: "points taken off", cn: "扣分", en: "points taken off" },
			{ marker: "※3", term: "単位", jp: "a credit", cn: "学分", en: "a credit" },
		],
		choices: [
			{ jp: "{男子学生|だんしがくせい}と{女子学生|じょしがくせい}は{同|おな}じ{試験|しけん}を{受|う}ける。", cn: "男学生和女学生要参加同一场考试。", en: "The male student and the female student are taking the same exam." },
			{ jp: "これから{男子学生|だんしがくせい}は{女子学生|じょしがくせい}にノートを{貸|か}してあげる。", cn: "接下来男学生要把笔记借给女学生。", en: "The male student is about to lend his notes to the female student." },
			{ jp: "{男子学生|だんしがくせい}はレポートを{書|か}かないつもりである。", cn: "男学生打算不写报告。", en: "The male student does not intend to write the report." },
			{ jp: "レポートは31{日|にち}までに{提出|ていしゅつ}すれば、{減点|げんてん}にならない。", cn: "报告只要在 31 日之前提交就不会被扣分。", en: "If the report is submitted by the 31st, no points will be taken off." },
			{ jp: "レポートの{期限|きげん}に{遅|おく}れた{場合|ばあい}は、{単位|たんい}がもらえない。", cn: "报告超过期限的话就拿不到学分。", en: "If the report is late, you will not get the credit." },
		],
		answers: [1, 4],
		hint: {
			jp: "「{出|だ}さなかったら{単位|たんい}がもらえない」と「{遅|おく}れたら{減点|げんてん}」は{別|べつ}のこと。",
			cn: "「不交＝拿不到学分」和「迟交＝扣分」是两回事，不要混为一谈。",
			en: "“If you don’t hand it in, you won’t get the credit” and “if you’re late, you lose points” are two different things. Don’t mix them up.",
		},
	},

	mondai: {
		instruction: "{次|つぎ}の{掲示|けいじ}を{読|よ}んで、{後|あと}の{問|と}いに{答|こた}えなさい。",
		instructionCn: "阅读下面的公告，回答后面的问题。（答案在别册 p.2）",
		instructionEn: "Read the notice below and answer the questions that follow. (Answers are in the separate booklet, p. 2.)",
		blocks: [
			{
				type: "title",
				jp: "{日本語文法|にほんごぶんぽう}Ⅱ　{試験|しけん}とレポートの{提出|ていしゅつ}について",
				cn: "日语语法Ⅱ　关于考试与报告提交",
				en: "Japanese Grammar II: About the exam and submitting the report",
			},
			{ type: "line", jp: "{中田|なかた}　{敬一|けいいち}", cn: "中田　敬一", en: "Nakata Keiichi", align: "right" },
			{ type: "heading", jp: "【{試験|しけん}について】", cn: "【关于考试】", en: "[About the exam]" },
			{
				type: "list",
				marker: "・",
				items: [
					{ jp: "{授業|じゅぎょう}の{最終日|さいしゅうび}に{試験|しけん}を{行|おこな}います。", cn: "考试于课程的最后一天举行。", en: "The exam will be held on the last day of class." },
					{
						jp: "{試験範囲|しけんはんい}は、{教科書|きょうかしょ}の5{課|か}〜9{課|か}です。（ただし、P.35〜39までは{除|のぞ}きます＊。）",
						cn: "考试范围为教科书第 5 课〜第 9 课。（但不包括 P.35〜39＊。）",
						en: "The exam covers Lessons 5–9 of the textbook. (However, pp. 35–39 are excluded.＊)",
					},
				],
			},
			{
				type: "note",
				jp: "※これ{以外|いがい}にも、{授業|じゅぎょう}で{話|はな}したことも{出|だ}しますので、{授業|じゅぎょう}のノートをしっかり{見直|みなお}しておいてください。",
				cn: "※除此之外，课堂上讲过的内容也会出题，请务必好好复习课堂笔记。",
				en: "※Besides this, things discussed in class will also appear on the exam, so please review your class notes carefully in advance.",
			},
			{ type: "heading", jp: "【レポートについて】", cn: "【关于报告】", en: "[About the report]" },
			{
				type: "list",
				marker: "・",
				items: [
					{
						jp: "{内容|ないよう}については、{今学期|こんがっき}の1{週目|しゅうめ}に{渡|わた}したプリントで{伝|つた}えた{通|とお}りです。",
						cn: "关于内容，与本学期第 1 周发下去的讲义上所写的一致。",
						en: "As for the content, it is as explained on the handout given out in week 1 of this term.",
					},
					{ jp: "{提出期限|ていしゅつきげん}は、7{月|がつ}31{日|にち}です。", cn: "提交期限为 7 月 31 日。", en: "The deadline is July 31." },
				],
			},
			{
				type: "paragraph",
				indent: true,
				jp: "{今回|こんかい}は、{試験|しけん}50％ レポート50％ という{配分|はいぶん}（※1）で{成績|せいせき}をつけますので、レポートを{提出|ていしゅつ}しない{場合|ばあい}は{単位|たんい}を{与|あた}えません。{必|かなら}ず7{月|がつ}31{日|にち}までに{提出|ていしゅつ}してください。{遅|おく}れた{場合|ばあい}は、{減点|げんてん}しますので{注意|ちゅうい}してください。なお、{病気|びょうき}などの{理由|りゆう}で{試験|しけん}が{受|う}けられなかった{場合|ばあい}は、{上記|じょうき}の（※2）レポートとは{別|べつ}にレポートを{提出|ていしゅつ}しなければなりません＊＊。{何|なに}か{質問|しつもん}があれば、{中田|なかた}まで{連絡|れんらく}してください。",
				cn: "本次成绩按考试 50％、报告 50％ 的比例评定，因此不提交报告者将不予学分。请务必在 7 月 31 日之前提交。逾期提交将会扣分，请注意。另外，因生病等原因未能参加考试的同学，除上述报告之外还必须另交一份报告＊＊。如有疑问，请与中田联系。",
				en: "This time grades will be 50% exam and 50% report, so if you do not submit the report you will not receive credit. Be sure to submit it by July 31. Late submissions will lose points, so please be careful. Also, if you cannot take the exam because of illness or another reason, you must submit a separate report in addition to the one mentioned above.＊＊ If you have any questions, please contact Nakata.",
			},
		],
		footnotes: [
			{ marker: "※1", term: "配分", jp: "a distribution", cn: "分配、比例", en: "a distribution" },
			{ marker: "※2", term: "上記の", jp: "above mentioned", cn: "上述的", en: "above mentioned" },
		],
		pageNotes: [
			{ jp: "＊ Note that this excludes p. 35–39.", cn: "＊但不包括 P.35〜P.39。", en: "Note that this excludes p. 35–39." },
			{
				jp: "＊＊ If you are unable to take the test due to illness or other circumstances, you must submit a separate report in addition to the report described above.",
				cn: "＊＊如果因疾病等原因不能参加考试，除上述报告之外还必须另外提交一份报告。",
				en: "If you are unable to take the test due to illness or other circumstances, you must submit a separate report in addition to the report described above.",
			},
		],
		questions: [
			{
				label: "問1",
				jp: "「{伝|つた}えた{通|とお}りです」とあるが、いつどのように{伝|つた}えたか。",
				cn: "文中说「与所传达的一致」，那么是在什么时候、以什么方式传达的？",
				en: "The text says “as you were told.” When and how was that information given?",
				choices: [
					{ jp: "{今学期|こんがっき}の1{週目|しゅうめ}の{授業|じゅぎょう}のときに、{教師|きょうし}が{話|はな}した。", cn: "本学期第 1 周上课时由教师口头讲述。", en: "The teacher said it verbally in class in week 1 of this term." },
					{ jp: "7{月|がつ}の{第|だい}1{週目|しゅうめ}に、{紙|かみ}に{印刷|いんさつ}したものを{配|くば}った。", cn: "7 月第 1 周发放了印刷好的纸质材料。", en: "Printed paper was handed out in the first week of July." },
					{ jp: "{今学期|こんがっき}の{最初|さいしょ}の{週|しゅう}に、{紙|かみ}に{印刷|いんさつ}したものを{渡|わた}した。", cn: "本学期第一周发放了印刷好的纸质材料。", en: "Printed paper was handed out in the first week of this term." },
					{ jp: "{今学期|こんがっき}の{初|はじ}めに、メールで{知|し}らせた。", cn: "本学期初通过邮件通知。", en: "It was announced by email at the beginning of this term." },
				],
				answer: 3,
				explanation:
					"原文是「今学期の1週目に渡したプリントで伝えた通りです」。「1週目」＝本学期的第一周，「プリント」＝印刷发放的讲义，「渡した」＝发给了大家。把这三点换成同义说法就是「今学期の最初の週に、紙に印刷したものを渡した」，所以 3 正确。这一题考的是把原文换成近义表达的能力。",
				explanationEn:
					"The original says “as explained on the handout given out in week 1 of this term.” 1-shūme = the first week of this term, purinto = a printed handout, watashita = handed out. Rephrased, that is “printed paper was given out in the first week of this term,” so 3 is correct. This question tests whether you can rewrite the original in near-synonyms.",
				choiceNotes: [
					"是通过发讲义传达的，不是老师口头讲的。",
					"是「今学期の1週目」，不是「7 月的第 1 周」。",
					"正确。「1 週目」＝最初的一周，「プリント」＝印刷的纸质材料。",
					"文中完全没有提到邮件。",
				],
				choiceNotesEn: [
					"It was explained on a handout, not spoken by the teacher.",
					"It is “week 1 of this term,” not “the first week of July.”",
					"Correct. 1-shūme = the first week; purinto = printed paper.",
					"The text never mentions email.",
				],
			},
			{
				label: "問2",
				jp: "この{掲示|けいじ}の{内容|ないよう}と{合|あ}っていないものはどれか。",
				cn: "下列哪一项与这则公告的内容不符？",
				en: "Which of the following does not match the content of this notice?",
				choices: [
					{ jp: "{試験|しけん}を{受|う}けられなかった{人|ひと}は、2{種類|しゅるい}のレポートを{出|だ}さなければならない。", cn: "没能参加考试的人必须交两种报告。", en: "People who could not take the exam must submit two kinds of report." },
					{ jp: "{試験|しけん}を{受|う}ける{人|ひと}は、1{種類|しゅるい}のレポートを{書|か}くだけでよい。", cn: "参加考试的人只写一种报告就可以了。", en: "People who take the exam only need to write one kind of report." },
					{ jp: "{試験|しけん}で{満点|まんてん}を{取|と}っても、レポートを{出|だ}さない{人|ひと}は{単位|たんい}がもらえない。", cn: "即使考试拿满分，不交报告的人也拿不到学分。", en: "Even if you get a perfect score on the exam, you will not get credit if you do not submit the report." },
					{ jp: "{試験|しけん}で{満点|まんてん}を{取|と}れば、レポートを{出|だ}さなくてもいい。", cn: "考试拿了满分的话，就可以不交报告。", en: "If you get a perfect score on the exam, you do not have to submit the report." },
				],
				answer: 4,
				explanation:
					"注意题目问的是「合っていない（不符合）」的一项。公告明确写着「レポートを提出しない場合は単位を与えません」——不交报告就不给学分，与考试考多少分无关。所以「考满分就可以不交报告」与原文矛盾，4 是答案。",
				explanationEn:
					"Note that the question asks for the statement that does not match. The notice clearly says that if you do not submit the report, you will not receive credit—regardless of your exam score. So “a perfect score means you need not submit the report” contradicts the original, and 4 is the answer.",
				choiceNotes: [
					"符合原文：「上記のレポートとは別にレポートを提出しなければなりません」，即原本的报告＋另一份，共两种。",
					"符合原文：正常参加考试的人只需交上述那一份报告。",
					"符合原文：「レポートを提出しない場合は単位を与えません」。",
					"正确答案（＝与原文不符）。不交报告一律不给学分，满分也不例外。",
				],
				choiceNotesEn: [
					"Matches the original: you must submit a report in addition to the one mentioned above, so two kinds in total.",
					"Matches the original: people who take the exam normally only submit that one report.",
					"Matches the original: if you do not submit the report, you will not receive credit.",
					"The correct choice (= does not match). Anyone who skips the report gets no credit, even with a perfect exam score.",
				],
			},
		],
	},

	vocab: [
		{ jp: "掲示", kana: "けいじ", cn: "公告、布告", en: "notice; bulletin", pos: "名詞" },
		{ jp: "提出", kana: "ていしゅつ", cn: "提交", en: "submission; to submit", pos: "名詞・動詞" },
		{ jp: "期限", kana: "きげん", cn: "期限", en: "deadline", pos: "名詞" },
		{ jp: "試験範囲", kana: "しけんはんい", cn: "考试范围", en: "exam coverage; exam range", pos: "名詞" },
		{ jp: "除く", kana: "のぞく", cn: "除去、不包括", en: "to exclude; to leave out", pos: "動詞" },
		{ jp: "見直す", kana: "みなおす", cn: "重新看、复习", en: "to review; to look over again", pos: "動詞" },
		{ jp: "配分", kana: "はいぶん", cn: "分配、比例", en: "distribution; weighting", pos: "名詞" },
		{ jp: "成績", kana: "せいせき", cn: "成绩", en: "grade; results", pos: "名詞" },
		{ jp: "単位", kana: "たんい", cn: "学分", en: "course credit", pos: "名詞" },
		{ jp: "与える", kana: "あたえる", cn: "给予", en: "to give; to grant", pos: "動詞" },
		{ jp: "減点", kana: "げんてん", cn: "扣分", en: "points taken off", pos: "名詞・動詞" },
		{ jp: "上記", kana: "じょうき", cn: "上述", en: "the above; aforementioned", pos: "名詞" },
		{ jp: "満点", kana: "まんてん", cn: "满分", en: "a perfect score", pos: "名詞" },
		{ jp: "プリント", cn: "讲义、印刷的材料", en: "handout; printed material", pos: "名詞" },
		{ jp: "最終日", kana: "さいしゅうび", cn: "最后一天", en: "the last day", pos: "名詞" },
		{ jp: "今学期", kana: "こんがっき", cn: "本学期", en: "this term / this semester", pos: "名詞" },
		{ jp: "連絡する", kana: "れんらくする", cn: "联系", en: "to contact", pos: "動詞" },
	],

	grammar: [
		{
			pattern: "〜まで／〜までに",
			meaning: "「まで」表示持续到某时点为止；「までに」表示最迟的期限（不能超过）。本课最重要的区分。",
			meaningEn: "made means “through / until that time”; made ni is a deadline you must not go past. The most important distinction in this lesson.",
			example: {
				jp: "10{日|か}まで{受|う}け{付|つ}けます。／10{日|か}までに{提出|ていしゅつ}してください。",
				cn: "受理到 10 日为止。／请在 10 日之前提交。",
				en: "We will accept it through the 10th. / Please submit it by the 10th.",
			},
		},
		{
			pattern: "〜通りです",
			formation: "動詞た形／名詞＋の ＋ 通りです",
			meaning: "和……一样、如……所述。",
			meaningEn: "as… / just as (explained / written).",
			example: { jp: "プリントで{伝|つた}えた{通|とお}りです。", cn: "与讲义上所传达的一致。", en: "It is as explained on the handout." },
		},
		{
			pattern: "〜については",
			formation: "名詞 ＋ については",
			meaning: "关于……。用于提示话题，比「について」更强调对比。",
			meaningEn: "as for… / regarding…. Used to introduce a topic, more contrastive than ni tsuite.",
			example: { jp: "{内容|ないよう}については、……", cn: "关于内容，……", en: "As for the content, …" },
		},
		{
			pattern: "〜なければならない",
			formation: "動詞ない形（ない→なければ）＋ ならない",
			meaning: "必须……。书面语，公告、规定中常用。",
			meaningEn: "must…. Written style, common in notices and rules.",
			example: {
				jp: "レポートを{提出|ていしゅつ}しなければなりません。",
				cn: "必须提交报告。",
				en: "You must submit the report.",
			},
		},
		{
			pattern: "〜とは別に",
			formation: "名詞 ＋ とは別に",
			meaning: "与……另外、除……之外再……。",
			meaningEn: "separately from… / in addition to….",
			example: { jp: "{上記|じょうき}のレポートとは{別|べつ}に", cn: "除上述报告之外，另……", en: "separately from the report mentioned above" },
		},
		{
			pattern: "〜しか〜ない",
			formation: "名詞・数量詞 ＋ しか ＋ 否定",
			meaning: "只有……（含「太少了」的语气）。",
			meaningEn: "only… (with a “that’s not enough” feeling).",
			example: { jp: "まだ1ページしか{書|か}いていないんだ。", cn: "我才写了 1 页而已。", en: "I’ve only written one page so far." },
		},
		{
			pattern: "〜ておく",
			formation: "動詞て形 ＋ おく",
			meaning: "事先做好……（为将来做准备）。",
			meaningEn: "to do… in advance (to be ready for later).",
			example: { jp: "ノートをしっかり{見直|みなお}しておいてください。", cn: "请事先好好复习笔记。", en: "Please review your notes carefully in advance." },
		},
	],
};
