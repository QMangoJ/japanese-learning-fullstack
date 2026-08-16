import type { ReadingDay } from "./types";

// 第3週 6日目 FAX（ビジネスレター） — printed pages 54–55
export const w3d6: ReadingDay = {
	week: 3,
	day: 6,
	label: "FAX（ビジネスレター）",
	labelEn: "Fax (Business Letter)",
	printedPages: [54, 55],
	answerSource: "book",

	point: {
		title: "「〜したい」「〜してもらいたい」ときの{敬語|けいご}に{注意|ちゅうい}しよう！",
		titleCn: "注意表达「想做〜」「想请对方为我做〜」时的敬语！",
		titleEn:
			"Pay attention to polite language indicating your desire to do things, and polite language used to ask others to do things for you!",
		figure: {
			alt: "部下が上司に「あのー、今日は、早く帰らせていただけませんでしょうか。」とおそるおそる頼んでいるイラスト",
			cn: "下属战战兢兢地对上司说：「那个……今天能不能让我早点回去呢？」",
			en: "A subordinate nervously asks the boss, “Um … would it be possible for me to leave early today?”",
		},
		tips: [
			{
				jp: "{仕事|しごと}での{支払|しはら}いの{催促|さいそく}などについては、{遠回|とおまわ}しでていねいな{表現|ひょうげん}を{使|つか}います。",
				cn: "工作中催款之类的事情，要使用委婉而礼貌的表达方式——不会直接说「早く払ってください」。",
				en: "For things like asking for payment at work, use roundabout, polite wording — you do not say “Please pay soon” directly.",
			},
		],
		expressions: [
			{ jp: "〜（さ）せていただけませんか。", cn: "【想做某事】能否让我……？（最客气）", en: "May I be allowed to …?" },
			{ jp: "〜（さ）せてください。", cn: "【想做某事】请让我……", en: "Please let me …" },
			{ jp: "〜（さ）せていただきます。", cn: "【想做某事】请允许我……（已决定要做）", en: "I will (take the liberty to) …" },
			{ jp: "お／ご〜いただけませんか。", cn: "【想请对方做】能否请您……？", en: "Could you kindly …?" },
			{ jp: "お／ご〜願えませんか。", kana: "ねがえませんか", cn: "【想请对方做】能否拜托您……？", en: "Might I ask you to …?" },
		],
		notes: [
			{
				jp: "＊「〜させていただきます」は{相手|あいて}の{許可|きょか}を{必要|ひつよう}としないときや、{待|ま}てないときに{使|つか}います。",
				cn: "＊「〜させていただきます」用于不需要对方许可、或来不及等对方许可的场合（例如「期限は12月8日とさせていただきます」＝期限就定为 12 月 8 日了）。",
				en: "＊ ~sasete itadakimasu is used when the other person’s permission is not needed, or when you cannot wait for it (e.g. “We will set the deadline as December 8”).",
			},
		],
	},

	renshu: {
		instruction: "{次|つぎ}の{会話文|かいわぶん}を{読|よ}んで、{後|あと}の{文|ぶん}から{正|ただ}しいものを{選|えら}ぼう。",
		instructionCn: "阅读下面的对话，从后面的句子中选出正确的。（答案在下一页）",
		instructionEn: "Read the dialogue below and choose the correct statements from the sentences that follow. (Answers are on the next page.)",
		blocks: [
			{
				type: "speech",
				speaker: "{男|おとこ}の{人|ひと}",
				speakerCn: "男子",
				speakerEn: "Man",
				jp: "もしもし、こちらミドリ{旅行社|りょこうしゃ}の{田中|たなか}と{申|もう}しますが、{中井道子様|なかいみちこさま}はいらっしゃいますでしょうか。",
				cn: "喂，您好，我是绿色旅行社的田中，请问中井道子女士在吗？",
				en: "Hello, this is Tanaka of Midori Travel. Is Ms. Michiko Nakai available?",
			},
			{ type: "speech", speaker: "{女|おんな}の{人|ひと}", speakerCn: "女子", speakerEn: "Woman", jp: "はい、{私|わたし}ですが……。", cn: "是的，我就是……", en: "Yes, speaking …" },
			{
				type: "speech",
				speaker: "{男|おとこ}の{人|ひと}",
				speakerCn: "男子",
				speakerEn: "Man",
				jp: "あのー、12{月|がつ}23{日|にち}にご{出発|しゅっぱつ}の{旅行代金|りょこうだいきん}をまだお{振|ふ}り{込|こ}み（※1）いただいていないようですが……。",
				cn: "那个……12 月 23 日出发的旅费，好像还没有收到您的汇款……",
				en: "Um … it seems we have not yet received the payment for the trip departing on December 23 …",
			},
			{
				type: "speech",
				speaker: "{女|おんな}の{人|ひと}",
				speakerCn: "女子",
				speakerEn: "Woman",
				jp: "あっ、すみません。すぐ{振|ふ}り{込|こ}みます。えーと、いくらでしたっけ？　あのー、{書類|しょるい}なくしちゃったみたいで、{口座番号|こうざばんごう}（※2）もわからなくって……。",
				cn: "啊，抱歉。我马上汇。嗯……是多少钱来着？那个……文件好像被我弄丢了，账号也不知道……",
				en: "Oh, I’m sorry. I’ll transfer it right away. Um, how much was it again? I seem to have lost the papers, so I don’t even know the account number …",
			},
		],
		footnotes: [
			{ marker: "※1", term: "振り込み", jp: "a money transfer", cn: "汇款、转账", en: "a money transfer" },
			{ marker: "※2", term: "口座番号", jp: "an account number", cn: "银行账号", en: "an account number" },
		],
		choices: [
			{ jp: "{女|おんな}の{人|ひと}は、{旅行|りょこう}に{行|い}く{予定|よてい}である。", cn: "女子打算去旅行。", en: "The woman is planning to go on a trip." },
			{ jp: "{女|おんな}の{人|ひと}は、ミドリ{旅行社|りょこうしゃ}に{旅行|りょこう}を{申|もう}し{込|こ}んでいた。", cn: "女子曾向绿色旅行社报名了旅行。", en: "The woman had booked a trip with Midori Travel." },
			{ jp: "{女|おんな}の{人|ひと}は、12{月|がつ}23{日|にち}に{旅行代金|りょこうだいきん}を{払|はら}うことにしていた。", cn: "女子原定 12 月 23 日支付旅费。", en: "The woman was supposed to pay the travel fee on December 23." },
			{
				jp: "{女|おんな}の{人|ひと}は、ミドリ{旅行社|りょこうしゃ}から{旅行|りょこう}についての{書類|しょるい}をもらわなかった。",
				cn: "女子没有从绿色旅行社收到关于旅行的文件。",
				en: "The woman never received any travel documents from Midori Travel.",
			},
			{ jp: "{女|おんな}の{人|ひと}は、{旅行代金|りょこうだいきん}を{払|はら}うつもりはなかった。", cn: "女子本来就不打算付旅费。", en: "The woman never intended to pay the travel fee." },
		],
		answers: [1, 2],
		hint: {
			jp: "12{月|がつ}23{日|にち}は「ご{出発|しゅっぱつ}」の{日|ひ}。{書類|しょるい}は「なくしちゃった」＝もらったが{失|な}くした。",
			cn: "12 月 23 日是「出发」的日子，不是付款日；文件是「弄丢了」，说明本来收到过。她说「すぐ振り込みます」，也不是不想付。",
			en: "December 23 is the departure date, not the payment date. “I lost the papers” means she did receive them. She also says “I’ll transfer it right away,” so it is not that she never meant to pay.",
		},
	},

	mondai: {
		instruction: "{次|つぎ}のファックスを{読|よ}んで、{後|あと}の{問|と}いに{答|こた}えなさい。",
		instructionCn: "阅读下面的传真，回答后面的问题。（答案在别册 p.4）",
		instructionEn: "Read the fax below and answer the questions that follow. (Answers are in the separate booklet, p. 4.)",
		blocks: [
			{ type: "title", jp: "ＦＡＸ{送信|そうしん}のご{案内|あんない}", cn: "传真发送说明", en: "Fax Transmission Notice" },
			{ type: "line", jp: "{安心|あんしん}できる{旅|たび}をあなたに…　ミドリ{旅行社|りょこうしゃ}", cn: "为您献上安心的旅程…　绿色旅行社", en: "A trip you can trust… Midori Travel", align: "center" },
			{ type: "line", jp: "20XX{年|ねん}12{月|がつ}2{日|か}", cn: "20XX 年 12 月 2 日", en: "December 2, 20XX", align: "right" },
			{
				type: "table",
				rows: [
					[
						{ jp: "{送付先|そうふさき}", cn: "收件人", en: "To", header: true, align: "center" },
						{ jp: "{中井|なかい}　{道子|みちこ}　{様|さま}", cn: "中井　道子　女士", en: "Ms. Michiko Nakai" },
						{ jp: "{発信者|はっしんしゃ}（※1）", cn: "发件人", en: "From", header: true, align: "center" },
						{ jp: "{株式会社|かぶしきがいしゃ}ミドリ{旅行社|りょこうしゃ}\n{田中|たなか}　{健一|けんいち}", cn: "绿色旅行社股份有限公司\n田中　健一", en: "Midori Travel Co., Ltd.\nKenichi Tanaka" },
					],
					[
						{ jp: "fax", cn: "传真", en: "fax", header: true, align: "center" },
						{ jp: "03-1234-5678", cn: "", en: "" },
						{ jp: "tel. 03-326X-2222　fax. 03-326X-2223", cn: "电话 03-326X-2222　传真 03-326X-2223", en: "tel. 03-326X-2222  fax. 03-326X-2223", colSpan: 2 },
					],
					[
						{ jp: "{件名|けんめい}", cn: "主题", en: "Subject", header: true, align: "center" },
						{ jp: "{代金未納|だいきんみのう}の{件|けん}（※2）", cn: "关于货款未缴一事", en: "Regarding unpaid fees" },
						{ jp: "{枚数|まいすう}", cn: "页数", en: "Pages", header: true, align: "center" },
						{ jp: "{本状|ほんじょう}（※3）を{含|ふく}めて　2{枚|まい}", cn: "含本页共 2 页", en: "2 pages including this one" },
					],
					[
						{
							jp: "☑{至急|しきゅう}！　□ご{参考|さんこう}まで　☑ご{確認|かくにん}ください　□ご{返信|へんしん}ください",
							cn: "☑加急！　□仅供参考　☑请确认　□请回复",
							en: "☑ Urgent!  □ For your information  ☑ Please confirm  □ Please reply",
							colSpan: 4,
						},
					],
				],
			},
			{ type: "paragraph", jp: "いつもご{利用|りよう}いただき、ありがとうございます。", cn: "一直以来承蒙惠顾，非常感谢。", en: "Thank you for your continued patronage." },
			{
				type: "paragraph",
				indent: true,
				jp: "{先|さき}ほど、お{電話|でんわ}でお{話|はな}しした{件|けん}ですが、お{申|もう}し{込|こ}みいただいた{旅行代金|りょこうだいきん}が{未納|みのう}（※4）になっております。さっそく、{請求書|せいきゅうしょ}の{控|ひか}え（※5）をファックスさせていただきますので、{金額|きんがく}をご{確認|かくにん}の{上|うえ}、{指定|してい}の{口座|こうざ}にお{振|ふ}り{込|こ}みいただきますようお{願|ねが}い{申|もう}し{上|あ}げます＊。",
				cn: "关于刚才电话中谈到的事宜，您报名的旅费目前尚未缴纳。我们立即将账单副本传真给您，请您确认金额后，汇款至指定账户＊。",
				en: "Regarding the matter we discussed on the phone a short while ago, the travel fee you applied for remains unpaid. We will fax you a copy of the invoice immediately, so please confirm the amount and transfer it to the designated account＊.",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "なお、お{振|ふ}り{込|こ}み{期限|きげん}は12{月|がつ}8{日|か}とさせていただきます。",
				cn: "另外，汇款期限定为 12 月 8 日。",
				en: "Please note that we will set the transfer deadline as December 8.",
			},
		],
		footnotes: [
			{ marker: "※1", term: "発信者", jp: "a sender (of a message)", cn: "发件人", en: "a sender (of a message)" },
			{ marker: "※2", term: "〜件", jp: "subject / regarding", cn: "关于〜事宜", en: "subject / regarding" },
			{ marker: "※3", term: "本状", jp: "this letter", cn: "本函、这封信", en: "this letter" },
			{ marker: "※4", term: "未納", jp: "not yet paid", cn: "未缴纳", en: "not yet paid" },
			{ marker: "※5", term: "請求書の控え", jp: "a copy of the invoice", cn: "账单副本", en: "a copy of the invoice" },
		],
		pageNotes: [
			{
				jp: "＊ An invoice will soon be faxed to you. Please kindly confirm the amount and arrange for a bank transfer to the designated account.",
				cn: "＊我们会立即把账单副本用传真发给您，请确认金额后汇款至指定的银行账户。",
				en: "＊ An invoice will soon be faxed to you. Please kindly confirm the amount and arrange for a bank transfer to the designated account.",
			},
		],
		questions: [
			{
				label: "問1",
				jp: "{中井|なかい}さんがしなければならないことは{何|なに}か。",
				cn: "中井女士必须做的事情是什么？",
				en: "What does Ms. Nakai have to do?",
				choices: [
					{ jp: "12{月|がつ}8{日|か}までに{代金|だいきん}を{送金|そうきん}する。", cn: "在 12 月 8 日之前汇款。", en: "Send the payment by December 8." },
					{ jp: "{請求書|せいきゅうしょ}の{控|ひか}えを{田中|たなか}さんにFAXする。", cn: "把账单副本传真给田中。", en: "Fax a copy of the invoice to Tanaka." },
					{ jp: "12{月|がつ}8{日|か}に{旅行代金|りょこうだいきん}を{振|ふ}り{込|こ}む。", cn: "在 12 月 8 日当天汇旅费。", en: "Transfer the travel fee on December 8." },
					{ jp: "{旅行社|りょこうしゃ}に{電話|でんわ}をする。", cn: "给旅行社打电话。", en: "Call the travel agency." },
				],
				answer: 1,
				explanation:
					"传真里说「指定の口座にお振り込みいただきますようお願い申し上げます」，并且「お振り込み期限は12月8日とさせていただきます」——12 月 8 日是**期限**，也就是「12月8日までに」。所以 1 正确。3 说的是「12 月 8 日当天」，把「までに（截止日）」误解成了指定的那一天，这正是第 1 週 4日目 学过的「まで／までに」考点。",
				explanationEn:
					"The fax says “please transfer the money to the designated account” and “we will set the transfer deadline as December 8” — December 8 is the deadline, i.e. “by December 8.” So 1 is correct. Choice 3 says “on December 8,” mistaking made ni (by that date) for that exact day — the made / made ni point from Week 1 Day 4.",
				choiceNotes: [
					"正确。期限是 12 月 8 日 →「8日までに」汇款。",
					"账单副本是旅行社传真给中井的（第 2 页），不是中井要发。",
					"「期限」不等于「就在那一天」，8 日之前任何时候汇都可以。",
					"电话是刚才旅行社打给她的，传真里没有要求她回电。",
				],
				choiceNotesEn: [
					"Correct. The deadline is December 8 → transfer “by the 8th.”",
					"The invoice copy is being faxed to Nakai by the agency (page 2); she is not the one sending it.",
					"A “deadline” is not “on that day”; any time before the 8th is fine.",
					"The agency just called her; the fax does not ask her to call back.",
				],
			},
			{
				label: "問2",
				jp: "このファックスの{内容|ないよう}について{正|ただ}しいものはどれか。",
				cn: "关于这份传真的内容，下列哪一项正确？",
				en: "Which of the following is correct about the content of this fax?",
				choices: [
					{ jp: "{旅行代金|りょこうだいきん}に{変更|へんこう}があった。", cn: "旅费有变更。", en: "The travel fee has been changed." },
					{ jp: "{旅行代金|りょこうだいきん}を{申込者|もうしこみしゃ}に{知|し}らせていなかった。", cn: "没有把旅费告知报名者。", en: "The applicant had not been told the travel fee." },
					{ jp: "{旅行代金|りょこうだいきん}の{請求書|せいきゅうしょ}の{控|ひか}えを2{枚目|まいめ}に{送|おく}った。", cn: "把旅费账单的副本放在第 2 页发送了。", en: "A copy of the travel-fee invoice was sent as page 2." },
					{ jp: "{旅行代金|りょこうだいきん}の{支払方法|しはらいほうほう}は{決|き}まっていない。", cn: "旅费的支付方式还没定。", en: "The method of paying the travel fee has not been decided." },
				],
				answer: 3,
				explanation:
					"表格里写着「枚数：本状を含めて 2枚」——连本页共 2 页；正文又说「さっそく、請求書の控えをファックスさせていただきます」。也就是说第 1 页是这份说明，第 2 页就是账单副本。所以 3 正确。这题要把表格里的数字和正文结合起来读。",
				explanationEn:
					"The table says “pages: 2 including this letter,” and the body says “we will fax you a copy of the invoice immediately.” So page 1 is this notice and page 2 is the invoice copy. Choice 3 is correct. You have to read the table number together with the body.",
				choiceNotes: [
					"传真只说未缴，没有提到金额有任何变更。",
					"账单本来就寄过（左页对话里她说「書類なくしちゃった」），是她自己弄丢了。",
					"正确。「本状を含めて 2 枚」＋「請求書の控えをファックスさせていただきます」→ 第 2 页是账单副本。",
					"支付方式已经写明：汇款到「指定の口座」，期限 12 月 8 日。",
				],
				choiceNotesEn: [
					"The fax only says the fee is unpaid; it never mentions a change in the amount.",
					"The invoice was already sent (in the left-page dialogue she says she lost the papers) — she lost it herself.",
					"Correct. “2 pages including this letter” + “we will fax a copy of the invoice” → page 2 is the invoice copy.",
					"The payment method is already stated: transfer to the designated account by December 8.",
				],
			},
		],
	},

	vocab: [
		{ jp: "送信", kana: "そうしん", cn: "发送（传真、邮件）", en: "to send (a fax / e-mail)", pos: "名詞・動詞" },
		{ jp: "送付先", kana: "そうふさき", cn: "收件人、送达处", en: "addressee / destination", pos: "名詞" },
		{ jp: "発信者", kana: "はっしんしゃ", cn: "发件人", en: "sender", pos: "名詞" },
		{ jp: "件名", kana: "けんめい", cn: "主题", en: "subject", pos: "名詞" },
		{ jp: "枚数", kana: "まいすう", cn: "页数、张数", en: "number of pages", pos: "名詞" },
		{ jp: "本状", kana: "ほんじょう", cn: "本函、这封信", en: "this letter", pos: "名詞" },
		{ jp: "至急", kana: "しきゅう", cn: "加急、火速", en: "urgent", pos: "名詞・副詞" },
		{ jp: "参考", kana: "さんこう", cn: "参考", en: "for your information", pos: "名詞" },
		{ jp: "返信", kana: "へんしん", cn: "回信、回复", en: "a reply", pos: "名詞・動詞" },
		{ jp: "未納", kana: "みのう", cn: "未缴纳", en: "unpaid", pos: "名詞" },
		{ jp: "請求書", kana: "せいきゅうしょ", cn: "账单、发票", en: "invoice / bill", pos: "名詞" },
		{ jp: "控え", kana: "ひかえ", cn: "副本、存根", en: "a copy / duplicate", pos: "名詞" },
		{ jp: "金額", kana: "きんがく", cn: "金额", en: "amount (of money)", pos: "名詞" },
		{ jp: "指定", kana: "してい", cn: "指定", en: "designated / specified", pos: "名詞・動詞" },
		{ jp: "口座", kana: "こうざ", cn: "账户", en: "bank account", pos: "名詞" },
		{ jp: "振り込む", kana: "ふりこむ", cn: "汇款、转账", en: "to transfer (money)", pos: "動詞" },
		{ jp: "送金する", kana: "そうきんする", cn: "汇钱", en: "to send money", pos: "動詞" },
		{ jp: "期限", kana: "きげん", cn: "期限", en: "deadline", pos: "名詞" },
		{ jp: "催促", kana: "さいそく", cn: "催促", en: "a reminder / to urge", pos: "名詞・動詞" },
		{ jp: "遠回し", kana: "とおまわし", cn: "委婉、拐弯抹角", en: "roundabout / indirect", pos: "名詞" },
	],

	grammar: [
		{
			pattern: "〜（さ）せていただきます",
			formation: "動詞使役形 ＋ ていただきます",
			meaning: "请允许我……。表面上是征求许可，实际是郑重地宣布自己要做的事。",
			meaningEn: "Please allow me to …. On the surface it asks permission; in practice it formally announces what you will do.",
			example: {
				jp: "お{振|ふ}り{込|こ}み{期限|きげん}は12{月|がつ}8{日|か}とさせていただきます。",
				cn: "汇款期限就定为 12 月 8 日。",
				en: "We will set the transfer deadline as December 8.",
			},
			note: "本课要点。用于不需要（或来不及等）对方许可的场合，商务文书中极常见。",
			noteEn: "This lesson’s key point. Used when the other person’s permission is not needed (or cannot be waited for). Extremely common in business writing.",
		},
		{
			pattern: "お／ご〜いただきますようお{願|ねが}い{申|もう}し{上|あ}げます",
			meaning: "恳请您……。商务书信中最郑重的请求方式，催款、催促时的固定说法。",
			meaningEn: "We kindly ask that you …. The most formal business-letter request, a set phrase when asking for payment.",
			example: {
				jp: "{指定|してい}の{口座|こうざ}にお{振|ふ}り{込|こ}みいただきますようお{願|ねが}い{申|もう}し{上|あ}げます。",
				cn: "恳请您汇款至指定账户。",
				en: "We kindly ask that you transfer the money to the designated account.",
			},
		},
		{
			pattern: "お／ご〜いただく",
			meaning: "承蒙您……。把对方的动作用谦让形式表达，抬高对方。",
			meaningEn: "To have you … (humbly). Expresses the other person’s action in humble form, raising them.",
			example: { jp: "いつもご{利用|りよう}いただき、ありがとうございます。", cn: "一直以来承蒙惠顾，非常感谢。", en: "Thank you for your continued patronage." },
		},
		{
			pattern: "〜の{上|うえ}",
			meaning: "在……之后。书面语，表示步骤的先后。",
			meaningEn: "After …. Written style for the order of steps.",
			example: { jp: "{金額|きんがく}をご{確認|かくにん}の{上|うえ}", cn: "请确认金额之后（再……）", en: "after confirming the amount" },
		},
		{
			pattern: "〜と{申|もう}します",
			meaning: "我叫……。「言う」的谦让语，自我介绍时使用。",
			meaningEn: "My name is …. Humble form of iu, used when introducing yourself.",
			example: { jp: "ミドリ{旅行社|りょこうしゃ}の{田中|たなか}と{申|もう}します。", cn: "我是绿色旅行社的田中。", en: "This is Tanaka of Midori Travel." },
		},
		{
			pattern: "〜ようですが……",
			meaning: "好像……（不过）。用推测的语气委婉地指出对方的问题，避免直接责备。",
			meaningEn: "It seems that … (but). A tentative tone that points out a problem without blaming the other person directly.",
			example: {
				jp: "まだお{振|ふ}り{込|こ}みいただいていないようですが……",
				cn: "好像还没有收到您的汇款……",
				en: "it seems we have not yet received your transfer …",
			},
			note: "催款时不直接说「払ってください」，而用「〜ないようですが」暗示，这就是本课说的「遠回しでていねいな表現」。",
			noteEn: "When asking for payment you do not say “Please pay”; you hint with ~nai yō desu ga. That is this lesson’s “roundabout, polite wording.”",
		},
		{
			pattern: "〜でしたっけ",
			meaning: "是……来着？确认自己记不清的事情，口语。",
			meaningEn: "What was … again? Spoken form for checking something you cannot quite remember.",
			example: { jp: "えーと、いくらでしたっけ？", cn: "嗯……是多少钱来着？", en: "Um, how much was it again?" },
		},
	],
};
