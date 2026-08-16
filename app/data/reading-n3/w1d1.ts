import type { ReadingDay } from "./types";

// 第1週 1日目 案内① — printed pages 12–13
export const w1d1: ReadingDay = {
	week: 1,
	day: 1,
	label: "案内①",
	labelKana: "あんない",
	labelEn: "Notices ①",
	printedPages: [12, 13],
	answerSource: "book",

	point: {
		title: "{日時|にちじ}を{正|ただ}しく{読|よ}もう！",
		titleCn: "正确阅读日期和时间！",
		titleEn: "Try to read dates and times correctly!",
		figure: {
			alt: "「休館日」の看板の前で、「もう開いているのかな？」と考える人と「今日は休みだよ！」と言う人のイラスト",
			cn: "两人站在写着「休馆日」的牌子前，一个想「已经开门了吧？」，另一个说「今天休息！」",
			en: "Two people standing in front of a “Closed today” sign: one wonders “Is it already open?” while the other says “It’s closed today!”",
		},
		tips: [
			{
				jp: "{例外|れいがい}がないか{注意|ちゅうい}して{読|よ}もう。",
				cn: "阅读时要注意有没有例外规定。",
				en: "Read carefully and watch for any exceptions.",
			},
		],
		expressions: [
			{ jp: "上旬／初旬", kana: "じょうじゅん／しょじゅん", cn: "上旬／月初", en: "the first 10 days of the month" },
			{ jp: "中旬", kana: "ちゅうじゅん", cn: "中旬", en: "the middle 10 days of the month" },
			{ jp: "下旬", kana: "げじゅん", cn: "下旬", en: "the last 10 days of the month" },
			{ jp: "第2月曜日", kana: "だいにげつようび", cn: "第二个星期一", en: "the second Monday of the month" },
			{ jp: "ただし", cn: "不过、但、但是", en: "however" },
			{ jp: "年末年始", kana: "ねんまつねんし", cn: "年底和年初", en: "the year-end and the beginning of the New Year" },
			{ jp: "正午", kana: "しょうご", cn: "中午", en: "noon" },
			{ jp: "19時", kana: "じ", cn: "19点", en: "7 pm" },
			{ jp: "祝日", kana: "しゅくじつ", cn: "节假日", en: "national holiday" },
			{ jp: "なお", cn: "此外、另外", en: "further" },
		],
		notes: [
			{
				jp: "「ただし、……」は{例外|れいがい}を{言|い}うとき、「なお、……」は{説明|せつめい}をつけ{加|くわ}えるときに{使|つか}います。",
				cn: "「ただし……」用在表示例外的时候，「なお……」用在追加说明的时候。",
				en: "Use tadashi… to state an exception, and nao… to add extra information.",
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
				speaker: "{女子学生|じょしがくせい}",
				speakerCn: "女学生",
				speakerEn: "Female student",
				jp: "これからどうするの？",
				cn: "接下来你要做什么？",
				en: "What are you going to do now?",
			},
			{
				type: "speech",
				speaker: "{男子学生|だんしがくせい}",
				speakerCn: "男学生",
				speakerEn: "Male student",
				jp: "レポート{書|か}かないといけないから、{中央図書館|ちゅうおうとしょかん}へ{行|い}くつもりなんだ。",
				cn: "我得写报告，所以打算去中央图书馆。",
				en: "I have to write a report, so I’m planning to go to the Central Library.",
			},
			{
				type: "speech",
				speaker: "{女子学生|じょしがくせい}",
				speakerCn: "女学生",
				speakerEn: "Female student",
				jp: "え？　{今日|きょう}は{第|だい}3{月曜日|げつようび}だから{休|やす}みなんじゃないの？",
				cn: "咦？今天是第三个星期一，不是休馆吗？",
				en: "Huh? Today is the third Monday, so isn’t it closed?",
			},
			{
				type: "speech",
				speaker: "{男子学生|だんしがくせい}",
				speakerCn: "男学生",
				speakerEn: "Male student",
				jp: "ううん、{開|あ}いてるよ。{第|だい}3{月曜日|げつようび}が{祝日|しゅくじつ}の{場合|ばあい}は{次|つぎ}の{日|ひ}が{休|やす}みになるんだ。",
				cn: "没有，开着呢。第三个星期一如果正好是节假日，就改成第二天休馆。",
				en: "No, it’s open. If the third Monday falls on a national holiday, the next day is closed instead.",
			},
			{
				type: "speech",
				speaker: "{女子学生|じょしがくせい}",
				speakerCn: "女学生",
				speakerEn: "Female student",
				jp: "あ、そう。{知|し}らなかった。じゃ、{明日|あした}が{休|やす}みということね。{私|わたし}も{調|しら}べたいことがあるから、{一緒|いっしょ}に{行|い}こう。",
				cn: "啊，是吗。我不知道呢。那就是说明天休馆咯。我也有想查的东西，一起去吧。",
				en: "Oh, I see. I didn’t know that. So that means it’s closed tomorrow. I have something I want to look up too, so let’s go together.",
			},
		],
		choices: [
			{ jp: "{今日|きょう}は{祝日|しゅくじつ}である。", cn: "今天是节假日。", en: "Today is a national holiday." },
			{ jp: "{今日|きょう}、{図書館|としょかん}は{休|やす}みである。", cn: "今天图书馆休馆。", en: "The library is closed today." },
			{ jp: "{男子学生|だんしがくせい}は{今日|きょう}が{第|だい}3{月曜日|げつようび}だということを{知|し}らなかった。", cn: "男学生不知道今天是第三个星期一。", en: "The male student did not know that today is the third Monday." },
			{ jp: "{女子学生|じょしがくせい}は{最初|さいしょ}、{今日|きょう}は{図書館|としょかん}が{休|やす}みだと{思|おも}っていた。", cn: "女学生一开始以为今天图书馆休馆。", en: "At first, the female student thought the library was closed today." },
			{ jp: "{明日|あした}は{火曜日|かようび}で{図書館|としょかん}は{開|あ}いている。", cn: "明天是星期二，图书馆开馆。", en: "Tomorrow is Tuesday, and the library is open." },
		],
		answers: [1, 4],
		hint: {
			jp: "「{休|やす}みなんじゃないの？」は「{休|やす}みだと{思|おも}う」という{意味|いみ}で{言|い}っている。",
			cn: "「休みなんじゃないの？」这里表达的是「我以为是休馆的」这个意思。",
			en: "“Isn’t it closed?” here means “I think it’s closed.”",
		},
	},

	mondai: {
		instruction: "{次|つぎ}の{案内|あんない}を{見|み}て、{後|あと}の{問|と}いに{答|こた}えなさい。",
		instructionCn: "看下面的指南，回答后面的问题。（答案在别册 p.2）",
		instructionEn: "Look at the notice below and answer the questions that follow. (Answers are in the separate booklet, p. 2.)",
		blocks: [
			{
				type: "title",
				jp: "たから{市|し}　{中央図書館|ちゅうおうとしょかん}",
				cn: "宝市　中央图书馆",
				en: "Takara City Central Library",
				sub: { jp: "{利用案内|りようあんない}", cn: "使用指南", en: "Guide for users" },
			},
			{
				type: "table",
				rows: [
					[
						{ jp: "{開館時間|かいかんじかん}（※1）", cn: "开馆时间", en: "Opening hours (※1)", header: true, rowSpan: 4, align: "center" },
						{ jp: "{平日|へいじつ}", cn: "平日", en: "Weekdays", header: true, align: "center" },
						{ jp: "{午前|ごぜん}10{時|じ}から{午後|ごご}8{時|じ}\n（{児童室|じどうしつ}（※2）は{午後|ごご}6{時|じ}まで）", cn: "上午 10 点到晚上 8 点（儿童室开放到下午 6 点）", en: "10:00 a.m. to 8:00 p.m.\n(Children’s room (※2) until 6:00 p.m.)", align: "center" },
					],
					[
						{ jp: "{土曜日|どようび}", cn: "星期六", en: "Saturday", header: true, align: "center" },
						{ jp: "{午前|ごぜん}10{時|じ}から{午後|ごご}6{時|じ}", cn: "上午 10 点到下午 6 点", en: "10:00 a.m. to 6:00 p.m.", rowSpan: 3, align: "center" },
					],
					[{ jp: "{日曜日|にちようび}", cn: "星期日", en: "Sunday", header: true, align: "center" }],
					[{ jp: "{祝日|しゅくじつ}", cn: "节假日", en: "National holidays", header: true, align: "center" }],
					[
						{ jp: "{休館日|きゅうかんび}（※3）", cn: "休馆日", en: "Closed days (※3)", header: true, rowSpan: 3, align: "center" },
						{ jp: "{第|だい}3{月曜日|げつようび}", cn: "第三个星期一", en: "The third Monday", header: true, align: "center" },
						{ jp: "ただし{祝日|しゅくじつ}と{重|かさ}なった{場合|ばあい}は{火曜日|かようび}が{休館|きゅうかん}＊", cn: "但如果与节假日重合，则星期二休馆＊", en: "However, if it falls on a national holiday, the library is closed on Tuesday ＊", align: "center" },
					],
					[
						{ jp: "{年末年始|ねんまつねんし}", cn: "年末年初", en: "Year-end and New Year", header: true, align: "center" },
						{ jp: "12{月|がつ}28{日|にち}から1{月|がつ}4{日|か}", cn: "12 月 28 日至 1 月 4 日", en: "December 28 to January 4", align: "center" },
					],
					[
						{ jp: "{特別休館日|とくべつきゅうかんび}", cn: "特别休馆日", en: "Special closed days", header: true, align: "center" },
						{ jp: "2{月|がつ}11{日|にち}・5{月|がつ}3{日|か}〜5{日|か}・9{月|がつ}23{日|にち}", cn: "2 月 11 日、5 月 3 日〜5 日、9 月 23 日", en: "February 11, May 3–5, September 23", align: "center" },
					],
				],
			},
			{
				type: "note",
				jp: "＊なお、10{月|がつ}1{日|ついたち}より10{日|か}まで{電気工事|でんきこうじ}のために{臨時|りんじ}で{休館|きゅうかん}します＊＊。",
				cn: "＊此外，10 月 1 日至 10 日因电路施工临时闭馆＊＊。",
				en: "＊Please also note that the library will be temporarily closed from October 1 to October 10 for electrical work.＊＊",
			},
		],
		footnotes: [
			{ marker: "※1", term: "開館時間", jp: "かいかんじかん", cn: "开馆时间（opening hours）", en: "opening hours" },
			{ marker: "※2", term: "児童室", jp: "じどうしつ", cn: "儿童室（children's room）", en: "children’s room" },
			{ marker: "※3", term: "休館日", jp: "きゅうかんび", cn: "休馆日（holidays）", en: "closed days / holidays" },
		],
		pageNotes: [
			{
				jp: "＊ If Monday falls on a national holiday, the library will be closed on Tuesday.",
				cn: "＊但是，若第三个星期一是节假日，则改为星期二休馆。",
				en: "If Monday falls on a national holiday, the library will be closed on Tuesday.",
			},
			{
				jp: "＊＊ Please note that the library will be temporarily closed from October 1st until October 10th for electrical work.",
				cn: "＊＊此外，10 月 1 日到 10 日期间，本馆因进行电路施工临时闭馆。",
				en: "Please note that the library will be temporarily closed from October 1st until October 10th for electrical work.",
			},
		],
		questions: [
			{
				label: "問1",
				jp: "この{図書館|としょかん}で、{使用|しよう}できないのはどの{場合|ばあい}か。",
				cn: "在这所图书馆，哪种情况是不能使用的？",
				en: "In which of the following cases can this library not be used?",
				choices: [
					{ jp: "{児童室|じどうしつ}を{午前中|ごぜんちゅう}に{使用|しよう}する{場合|ばあい}", cn: "上午使用儿童室", en: "Using the children’s room in the morning" },
					{ jp: "10{月|がつ}の{第|だい}3{金曜日|きんようび}に20{時|じ}まで{使用|しよう}する{場合|ばあい}", cn: "10 月的第三个星期五使用到 20 点", en: "Using it until 8:00 p.m. on the third Friday in October" },
					{ jp: "{第|だい}3{月曜日|げつようび}が{祝日|しゅくじつ}の{場合|ばあい}", cn: "第三个星期一是节假日的情况", en: "When the third Monday is a national holiday" },
					{ jp: "10{月|がつ}10{日|か}の{正午|しょうご}から{午後|ごご}2{時|じ}", cn: "10 月 10 日中午到下午 2 点", en: "From noon to 2:00 p.m. on October 10" },
				],
				answer: 4,
				explanation:
					"表格下方的注释写着「10月1日より10日まで電気工事のために臨時で休館します」——10 月 1 日至 10 日因电路施工临时闭馆。10 月 10 日正在这个区间内，所以这段时间无法使用图书馆。这一题考的正是本课的要点：读日期时要留意「なお」「ただし」后面补充的例外规定。",
				explanationEn:
					"The note under the table says the library will be temporarily closed from October 1 to October 10 for electrical work. October 10 falls inside that period, so the library cannot be used then. This question tests the lesson’s key point: when you read dates, watch the extra exceptions that come after nao and tadashi.",
				choiceNotes: [
					"平日开馆时间为 10:00–20:00，儿童室开放到 18:00，上午当然可以使用。",
					"第三个「星期五」不是休馆日；平日开馆到 20 点，所以可以使用到 20 点。",
					"第三个星期一如果与节假日重合，休馆日会顺延到星期二，也就是说这一天反而是开馆的。",
					"正确。10 月 1 日至 10 日临时闭馆，10 月 10 日在此期间内。",
				],
				choiceNotesEn: [
					"On weekdays the library is open 10:00–20:00, and the children’s room is open until 18:00, so it can of course be used in the morning.",
					"The third Friday is not a closed day; on weekdays the library stays open until 20:00, so it can be used until then.",
					"If the third Monday falls on a national holiday, the closed day moves to Tuesday, so that Monday is actually open.",
					"Correct. The library is temporarily closed from October 1 to 10, and October 10 is inside that period.",
				],
			},
			{
				label: "問2",
				jp: "この{案内|あんない}の{内容|ないよう}と{合|あ}っているものはどれか。",
				cn: "下列哪一项与这份指南的内容相符？",
				en: "Which of the following matches the content of this notice?",
				choices: [
					{ jp: "この{図書館|としょかん}は、{第|だい}3{月曜日|げつようび}とその{翌日|よくじつ}は{閉|し}まっている。", cn: "这所图书馆第三个星期一和第二天都闭馆。", en: "This library is closed on the third Monday and the following day." },
					{ jp: "この{図書館|としょかん}は、{第|だい}3{月曜日|げつようび}と{年末年始|ねんまつねんし}{以外|いがい}は{開|あ}いている。", cn: "这所图书馆除第三个星期一和年末年初外都开馆。", en: "This library is open except on the third Monday and over the New Year period." },
					{ jp: "この{図書館|としょかん}では、{児童室|じどうしつ}も{毎日|まいにち}{図書館|としょかん}の{閉館|へいかん}まで{使用|しよう}できる。", cn: "这所图书馆的儿童室每天都可以使用到闭馆为止。", en: "At this library, the children’s room can also be used every day until the library closes." },
					{ jp: "この{図書館|としょかん}は、{休館日|きゅうかんび}{以外|いがい}にも{臨時|りんじ}で{休|やす}む{日|ひ}がある。", cn: "这所图书馆除了固定休馆日以外，还有临时闭馆的日子。", en: "Besides the regular closed days, this library also has days when it is temporarily closed." },
				],
				answer: 4,
				explanation:
					"表格列出的固定休馆日是「第3月曜日」「年末年始」「特別休館日」，而注释又追加了 10 月 1 日〜10 日的电路施工临时闭馆。也就是说，除了表里写的休馆日之外确实还有临时休息的日子，因此 4 正确。",
				explanationEn:
					"The table lists the regular closed days as the third Monday, the New Year period, and special closed days, and the note adds a temporary closure from October 1 to 10 for electrical work. So there really are extra days off besides the closed days in the table, which makes 4 correct.",
				choiceNotes: [
					"第三个星期一休馆；只有当它与节假日重合时才顺延到星期二。并不是两天都闭馆。",
					"漏掉了「特別休館日」（2/11、5/3〜5、9/23）和临时闭馆日。",
					"平日闭馆时间是 20 点，但儿童室只开放到 18 点，并不是到闭馆为止。",
					"正确。表格内的休馆日之外，还有 10 月的临时闭馆。",
				],
				choiceNotesEn: [
					"The library is closed on the third Monday; only if that Monday is also a national holiday does the closed day move to Tuesday. It is not closed both days.",
					"This leaves out the special closed days (Feb. 11, May 3–5, Sept. 23) and the temporary closure.",
					"On weekdays the library closes at 20:00, but the children’s room is only open until 18:00, not until closing time.",
					"Correct. Besides the closed days in the table, there is also a temporary closure in October.",
				],
			},
		],
	},

	vocab: [
		{ jp: "案内", kana: "あんない", cn: "指南、向导、通知", en: "notice; guide; information", pos: "名詞" },
		{ jp: "利用", kana: "りよう", cn: "使用、利用", en: "use; to use", pos: "名詞・動詞" },
		{ jp: "開館時間", kana: "かいかんじかん", cn: "开馆时间", en: "opening hours", pos: "名詞" },
		{ jp: "休館日", kana: "きゅうかんび", cn: "休馆日", en: "closed day; holiday (for a facility)", pos: "名詞" },
		{ jp: "児童室", kana: "じどうしつ", cn: "儿童室", en: "children’s room", pos: "名詞" },
		{ jp: "平日", kana: "へいじつ", cn: "平日、工作日", en: "weekday", pos: "名詞" },
		{ jp: "祝日", kana: "しゅくじつ", cn: "节假日、法定假日", en: "national holiday", pos: "名詞" },
		{ jp: "正午", kana: "しょうご", cn: "正午、中午 12 点", en: "noon", pos: "名詞" },
		{ jp: "年末年始", kana: "ねんまつねんし", cn: "年末年初", en: "the year-end and New Year period", pos: "名詞" },
		{ jp: "上旬", kana: "じょうじゅん", cn: "上旬（1–10 日）", en: "the first 10 days of the month", pos: "名詞" },
		{ jp: "中旬", kana: "ちゅうじゅん", cn: "中旬（11–20 日）", en: "the middle 10 days of the month", pos: "名詞" },
		{ jp: "下旬", kana: "げじゅん", cn: "下旬（21 日以后）", en: "the last 10 days of the month", pos: "名詞" },
		{ jp: "重なる", kana: "かさなる", cn: "重合、重叠、碰在一起", en: "to overlap; to fall on the same day", pos: "動詞" },
		{ jp: "臨時", kana: "りんじ", cn: "临时", en: "temporary; extra", pos: "名詞" },
		{ jp: "電気工事", kana: "でんきこうじ", cn: "电路施工", en: "electrical work", pos: "名詞" },
		{ jp: "翌日", kana: "よくじつ", cn: "第二天、次日", en: "the following day", pos: "名詞" },
		{ jp: "閉館", kana: "へいかん", cn: "闭馆", en: "closing (of a facility)", pos: "名詞・動詞" },
		{ jp: "調べる", kana: "しらべる", cn: "调查、查阅", en: "to look up; to investigate", pos: "動詞" },
		{ jp: "ただし", cn: "但是、不过（提出例外）", en: "however (introducing an exception)", pos: "接続詞" },
		{ jp: "なお", cn: "此外、另外（补充说明）", en: "furthermore; please note (adding information)", pos: "接続詞" },
	],

	grammar: [
		{
			pattern: "〜ないといけない",
			formation: "動詞ない形 ＋ といけない",
			meaning: "必须……、不……不行。口语中常用，比「〜なければならない」更随意。",
			meaningEn: "have to… / must…. Common in spoken Japanese; more casual than nakereba naranai.",
			example: {
				jp: "レポート{書|か}かないといけないから、{中央図書館|ちゅうおうとしょかん}へ{行|い}くつもりなんだ。",
				cn: "因为得写报告，所以打算去中央图书馆。",
				en: "I have to write a report, so I’m planning to go to the Central Library.",
			},
		},
		{
			pattern: "〜つもりだ",
			formation: "動詞辞書形 ＋ つもりだ",
			meaning: "打算……、准备……。表示说话人事先就有的意图或计划。",
			meaningEn: "intend to… / plan to…. Shows an intention or plan the speaker already has.",
			example: { jp: "{図書館|としょかん}へ{行|い}くつもりなんだ。", cn: "我打算去图书馆。", en: "I’m planning to go to the library." },
		},
		{
			pattern: "〜んじゃない？",
			formation: "普通形 ＋ んじゃない？（＝のではないか）",
			meaning: "不是……吗？用升调向对方确认自己的推测，并不是在否定。",
			meaningEn: "Isn’t it…? Said with rising intonation to check a guess—not to deny something.",
			example: { jp: "{今日|きょう}は{休|やす}みなんじゃないの？", cn: "今天不是休馆吗？（我以为休馆）", en: "Isn’t it closed today? (I thought it was closed.)" },
			note: "本课要点句。表面是否定形，实际表达的是「休みだと思う」。",
			noteEn: "A key sentence in this lesson. It looks negative, but it actually means “I think it’s closed.”",
		},
		{
			pattern: "〜場合は",
			formation: "名詞＋の／普通形 ＋ 場合は",
			meaning: "在……的情况下。案内、说明书里用来交代例外或条件。",
			meaningEn: "in the case that… / if…. Used in notices and instructions to state an exception or condition.",
			example: {
				jp: "{第|だい}3{月曜日|げつようび}が{祝日|しゅくじつ}の{場合|ばあい}は{次|つぎ}の{日|ひ}が{休|やす}みになる。",
				cn: "第三个星期一如果是节假日，则改成第二天休馆。",
				en: "If the third Monday is a national holiday, the following day is closed instead.",
			},
		},
		{
			pattern: "〜ということだ／〜ということね",
			formation: "普通形 ＋ ということだ",
			meaning: "也就是说……。用来把听到的信息归纳成自己的结论。",
			meaningEn: "that means… / so…. Used to sum up information you have just heard.",
			example: { jp: "じゃ、{明日|あした}が{休|やす}みということね。", cn: "那就是说明天休馆咯。", en: "So that means it’s closed tomorrow, then." },
		},
		{
			pattern: "ただし／なお",
			meaning: "「ただし」引出前文的例外；「なお」引出补充说明。读通知类文章时，这两个词后面往往就是考点。",
			meaningEn: "tadashi introduces an exception to what came before; nao adds extra information. In notices, the test point is often right after these words.",
			example: {
				jp: "ただし{祝日|しゅくじつ}と{重|かさ}なった{場合|ばあい}は{火曜日|かようび}が{休館|きゅうかん}。",
				cn: "但如果与节假日重合，则星期二休馆。",
				en: "However, if it falls on a national holiday, the library is closed on Tuesday.",
			},
		},
	],
};
