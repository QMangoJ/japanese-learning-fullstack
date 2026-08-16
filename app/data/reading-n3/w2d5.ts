import type { ReadingDay } from "./types";

// 第2週 5日目 説明書② — printed pages 36–37
export const w2d5: ReadingDay = {
	week: 2,
	day: 5,
	label: "説明書②",
	labelKana: "せつめいしょ",
	labelEn: "Explanations ②",
	printedPages: [36, 37],
	answerSource: "book",

	point: {
		title: "{条件|じょうけん}を{表|あらわ}す{言葉|ことば}に{注意|ちゅうい}しよう！",
		titleCn: "注意表示条件的词汇！",
		titleEn: "Pay attention to conditional sentences!",
		figure: {
			alt: "鳥かごに入れられた鳥が「このカゴ、返品して〜！」と訴えているイラスト",
			cn: "被关在鸟笼里的鸟在喊：「这个笼子，给我退货吧〜！」",
			en: "A bird in a cage complains, “Return this cage!”",
		},
		tips: [
			{
				jp: "{返品|へんぴん}や{保証期間内|ほしょうきかんない}の{修理|しゅうり}にはいろいろな{条件|じょうけん}があるので、{注意|ちゅうい}しましょう。",
				cn: "退货以及保修期内的修理都附有各种条件，一定要仔细读清楚。",
				en: "Returns and repairs during the warranty period come with many conditions, so read them carefully.",
			},
		],
		expressions: [
			{ jp: "AすればB", cn: "在 A 的条件下，会产生 B 的结果", en: "Under condition A, B will be the result" },
			{ jp: "AするとB", cn: "同上（＝Aという条件ではBという結果になる）", en: "Under condition A, B will be the result" },
			{ jp: "AしたらB", cn: "同上", en: "Under condition A, B will be the result" },
			{ jp: "オペレーター", cn: "话务员、接线员", en: "an operator" },
			{ jp: "返品", kana: "へんぴん", cn: "退货", en: "returned goods" },
			{ jp: "通信販売", kana: "つうしんはんばい", cn: "邮购、函购", en: "mail order purchase" },
		],
	},

	renshu: {
		instruction: "{次|つぎ}の{会話文|かいわぶん}を{読|よ}んで、{後|あと}の{文|ぶん}から{正|ただ}しいものを{選|えら}ぼう。",
		instructionCn: "阅读下面的对话，从后面的句子中选出正确的。（答案在下一页）",
		instructionEn: "Read the conversation below and choose the correct statements from the sentences that follow. (Answers are on the next page.)",
		blocks: [
			{
				type: "speech",
				speaker: "オペレーター",
				speakerCn: "话务员",
				speakerEn: "Operator",
				jp: "はい、ヨコタデパート{通信販売|つうしんはんばい}の{商品返品係|しょうひんへんぴんがかり}です。",
				cn: "您好，这里是横田百货邮购部商品退货科。",
				en: "Yes, this is Yokota Department Store mail-order returns.",
			},
			{
				type: "speech",
				speaker: "{女|おんな}の{人|ひと}",
				speakerCn: "女子",
				speakerEn: "Woman",
				jp: "あのー、{送|おく}ってもらったセーターなんですが、{色|いろ}が{気|き}に{入|い}らなかったんですが、そんな{場合|ばあい}にも{返品|へんぴん}できるんでしょうか。",
				cn: "那个……你们寄来的毛衣，颜色我不太喜欢，这种情况也可以退货吗？",
				en: "Um, about the sweater you sent — I didn’t like the color. Can I return it in that case too?",
			},
			{
				type: "speech",
				speaker: "オペレーター",
				speakerCn: "话务员",
				speakerEn: "Operator",
				jp: "はい、{商品|しょうひん}が{到着|とうちゃく}してから7{日以内|なのかいない}で、ご{使用|しよう}になっていなければ、{返品|へんぴん}をお{受|う}けいたします。{別|べつ}のお{色|いろ}に{交換|こうかん}ということもできますが。",
				cn: "可以的。商品送达后 7 天以内、且尚未使用的话，我们可以受理退货。也可以换成别的颜色。",
				en: "Yes. If it is within 7 days of arrival and you have not used it, we can accept a return. We can also exchange it for another color.",
			},
			{
				type: "speech",
				speaker: "{女|おんな}の{人|ひと}",
				speakerCn: "女子",
				speakerEn: "Woman",
				jp: "いえ、{返品|へんぴん}ということでお{願|ねが}いします。",
				cn: "不了，就麻烦你们办退货吧。",
				en: "No, I’d like to return it, please.",
			},
		],
		choices: [
			{ jp: "{女|おんな}の{人|ひと}は{通信販売|つうしんはんばい}でセーターを{注文|ちゅうもん}した。", cn: "女子通过邮购订了毛衣。", en: "The woman ordered a sweater by mail order." },
			{ jp: "{注文|ちゅうもん}したものと{違|ちが}うセーターが{来|き}た。", cn: "寄来的毛衣和订的不一样。", en: "A different sweater from the one she ordered arrived." },
			{ jp: "{女|おんな}の{人|ひと}は{違|ちが}う{色|いろ}のセーターと{交換|こうかん}したい。", cn: "女子想换成别的颜色的毛衣。", en: "The woman wants to exchange it for a different color." },
			{ jp: "{商品|しょうひん}が{到着|とうちゃく}して1{週間|しゅうかん}たっていない。", cn: "商品送达还不到 1 周。", en: "It has been less than a week since the item arrived." },
			{ jp: "{女|おんな}の{人|ひと}は、セーターを{何回|なんかい}か{着|き}た。", cn: "女子把毛衣穿过几次。", en: "The woman has worn the sweater a few times." },
		],
		answers: [1, 4],
		hint: {
			jp: "「{色|いろ}が{気|き}に{入|い}らなかった」だけで、{注文|ちゅうもん}した{商品|しょうひん}{自体|じたい}は{間違|まちが}っていない。「{交換|こうかん}もできますが」に{対|たい}して「いえ、{返品|へんぴん}で」と{答|こた}えている。",
			cn: "只是「颜色不喜欢」，寄来的商品本身没错；而且对方提出可以换色时，她明确回答「不了，要退货」。既然能受理退货，说明还在 7 天以内、也没穿过。",
			en: "She only “didn’t like the color” — the item itself is the one she ordered. When they offer an exchange, she says “No, a return.” Since a return is accepted, it is still within 7 days and unused.",
		},
	},

	mondai: {
		instruction: "{次|つぎ}の{文書|ぶんしょ}を{読|よ}んで、{後|あと}の{問|と}いに{答|こた}えなさい。",
		instructionCn: "阅读下面的文件，回答后面的问题。（答案在别册 p.3）",
		instructionEn: "Read the document below and answer the questions that follow. (Answers are in the separate booklet, p. 3.)",
		blocks: [
			{ type: "title", jp: "{交換|こうかん}・{返品|へんぴん}について", cn: "关于换货・退货", en: "About exchanges and returns" },
			{
				type: "list",
				marker: "●",
				items: [
					{
						jp: "{商品到着後|しょうひんとうちゃくご}7{日以内|なのかいない}にご{返送|へんそう}いただければ、{交換|こうかん}・{返品|へんぴん}をお{受|う}けいたします＊。",
						cn: "商品送达后 7 天以内寄回的话，我们可以受理换货・退货＊。",
						en: "If you send it back within 7 days of arrival, we will accept an exchange or return. ＊",
					},
					{
						jp: "{交換|こうかん}・{返品|へんぴん}ができない{場合|ばあい}については{裏面|うらめん}（※1）をよくお{読|よ}みください＊＊。",
						cn: "关于无法换货・退货的情况，请仔细阅读背面＊＊。",
						en: "For cases where exchange or return is not possible, please read the back (※1) carefully. ＊＊",
					},
					{
						jp: "{下|した}の{返品|へんぴん}カードにご{記入|きにゅう}の{上|うえ}、{商品|しょうひん}といっしょにお{送|おく}りください。",
						cn: "请填写下面的退货卡，与商品一起寄回。",
						en: "Fill in the return card below and send it together with the item.",
					},
				],
			},
			{ type: "line", jp: "- - - - - - - - - {切|き}り{取|と}り{線|せん} - - - - - - - - -", cn: "- - - - - - - - - 裁剪线 - - - - - - - - -", en: "- - - - - - - - - cut here - - - - - - - - -", align: "center" },
			{ type: "title", jp: "{返品|へんぴん}カード", cn: "退货卡", en: "Return card" },
			{
				type: "paragraph",
				jp: "{返品理由|へんぴんりゆう}で{当|あ}てはまるものを{選|えら}び、アルファベットに○をつけてください。",
				cn: "请从退货理由中选出符合的一项，在字母上画○。",
				en: "Choose the matching return reason and circle the letter.",
			},
			{
				type: "list",
				marker: "",
				items: [
					{ jp: "a．イメージが{違|ちが}った。", cn: "a．与想象的不一样。", en: "a. It was different from what I imagined." },
					{ jp: "b．{使用感|しようかん}（※2）・{機能|きのう}が{期待|きたい}していたものと{違|ちが}った。", cn: "b．使用感受、功能与期待的不同。", en: "b. The feel (※2) or function was different from what I expected." },
					{ jp: "c．サイズが{合|あ}わなかった。", cn: "c．尺寸不合适。", en: "c. The size didn’t fit." },
					{ jp: "d．{注文|ちゅうもん}と{違|ちが}う{商品|しょうひん}が{届|とど}いた。", cn: "d．送来的商品与订购的不符。", en: "d. A different item from the one I ordered arrived." },
					{ jp: "e．{商品|しょうひん}に{傷|きず}、あるいは{汚|よご}れがあった。", cn: "e．商品有破损或污渍。", en: "e. The item was damaged or dirty." },
					{ jp: "f．その{他|た}　＿＿＿＿＿＿＿＿＿＿＿＿＿＿", cn: "f．其他　＿＿＿＿＿＿＿＿＿＿＿＿＿＿", en: "f. Other ________" },
				],
			},
			{ type: "note", jp: "＊fの{場合|ばあい}は{簡単|かんたん}に{理由|りゆう}をお{書|か}きください。", cn: "＊选择 f 时请简单写明理由。", en: "＊ For f, please briefly write the reason." },
		],
		footnotes: [
			{ marker: "※1", term: "裏面", jp: "the reverse side", cn: "背面", en: "the reverse side" },
			{ marker: "※2", term: "使用感", jp: "satisfaction", cn: "使用时的感受", en: "how it feels to use" },
		],
		pageNotes: [
			{
				jp: "＊ Products can only be returned or exchanged within seven days of the purchase date.",
				cn: "＊商品到货后 7 日之内方可退换。",
				en: "＊ Products can only be returned or exchanged within seven days of the purchase date.",
			},
			{
				jp: "＊＊ Please notice the restrictions on returns and exchanges on the back of this sheet.",
				cn: "＊＊有关无法受理退换货的情况，请仔细阅读背面的说明。",
				en: "＊＊ Please notice the restrictions on returns and exchanges on the back of this sheet.",
			},
		],
		questions: [
			{
				label: "問1",
				jp: "{左|ひだり}ページの{会話|かいわ}の{女|おんな}の{人|ひと}は、{返品|へんぴん}カードのどこに○をつければよいか。",
				cn: "左页对话中的女子，应该在退货卡的哪一项上画○？",
				en: "Which letter should the woman in the conversation on the left page circle on the return card?",
				choices: [
					{ jp: "a（イメージが{違|ちが}った）", cn: "a（与想象的不一样）", en: "a (different from what I imagined)" },
					{ jp: "b（{使用感|しようかん}・{機能|きのう}が{違|ちが}った）", cn: "b（使用感受、功能不同）", en: "b (feel or function was different)" },
					{ jp: "c（サイズが{合|あ}わなかった）", cn: "c（尺寸不合适）", en: "c (size didn’t fit)" },
					{ jp: "d（{注文|ちゅうもん}と{違|ちが}う{商品|しょうひん}が{届|とど}いた）", cn: "d（送来的商品与订购的不符）", en: "d (a different item arrived)" },
				],
				answer: 1,
				explanation:
					"女子退货的理由是「色が気に入らなかった」——收到后觉得颜色和自己想的不一样。这在退货卡上对应的正是 a「イメージが違った（与想象的不同）」。要点在于把口语里的说法（颜色不喜欢）对应到表格里的书面分类。",
				explanationEn:
					"Her reason is “I didn’t like the color” — after it arrived it didn’t match what she had pictured. On the card that is a, “different from what I imagined.” The point is mapping spoken language (I don’t like the color) onto the written category.",
				choiceNotes: [
					"正确。颜色和想象的不同＝イメージが違った。",
					"她根本没有使用过（未使用才能退货），谈不上使用感受或功能。",
					"提到的问题是颜色，不是尺寸。",
					"送来的就是她订的那件毛衣，商品本身没有寄错。",
				],
				choiceNotesEn: [
					"Correct. A different color from what she imagined = イメージが違った.",
					"She never used it (unused is required for a return), so feel or function does not apply.",
					"The problem mentioned is color, not size.",
					"The sweater that arrived is the one she ordered; the item itself was not wrong.",
				],
			},
			{
				label: "問2",
				jp: "{返品|へんぴん}できないのは、どの{場合|ばあい}か。",
				cn: "在哪种情况下不能退货？",
				en: "In which case can you not return the item?",
				choices: [
					{ jp: "{商品|しょうひん}を{手|て}に{入|い}れてから1{週間|しゅうかん}を{過|す}ぎた{場合|ばあい}", cn: "拿到商品后超过 1 周的情况", en: "More than a week has passed since you received it" },
					{ jp: "{注文|ちゅうもん}したものではない{商品|しょうひん}が{来|き}た{場合|ばあい}", cn: "送来的不是订购的商品的情况", en: "An item other than the one you ordered arrived" },
					{ jp: "{注文|ちゅうもん}したものが{想像|そうぞう}していたものと{違|ちが}った{場合|ばあい}", cn: "订购的东西和想象的不一样的情况", en: "What you ordered was different from what you imagined" },
					{ jp: "{注文|ちゅうもん}したものが{小|ちい}さすぎた{場合|ばあい}", cn: "订购的东西太小的情况", en: "What you ordered was too small" },
				],
				answer: 1,
				explanation:
					"文件第一条写着「商品到着後7日以内にご返送いただければ」——必须在送达后 7 天以内寄回。7 天＝1 周，所以超过 1 周就不能退货，1 正确。其余三项分别对应退货卡上的 d、a、c，都是可以退货的理由。",
				explanationEn:
					"The first line says you must send it back within 7 days of arrival. 7 days = one week, so after more than a week you cannot return it. Choice 1 is correct. The other three match card reasons d, a, and c, which are allowed.",
				choiceNotes: [
					"正确（＝不能退货）。超过了「7日以内」的期限。",
					"对应退货卡的 d，可以退货。",
					"对应退货卡的 a「イメージが違った」，可以退货。",
					"对应退货卡的 c「サイズが合わなかった」，可以退货。",
				],
				choiceNotesEn: [
					"Correct (= cannot return). It is past the “within 7 days” deadline.",
					"This is card reason d — a return is allowed.",
					"This is card reason a — a return is allowed.",
					"This is card reason c — a return is allowed.",
				],
			},
		],
	},

	vocab: [
		{ jp: "条件", kana: "じょうけん", cn: "条件", en: "condition", pos: "名詞" },
		{ jp: "返品", kana: "へんぴん", cn: "退货", en: "return (of goods)", pos: "名詞・動詞" },
		{ jp: "交換", kana: "こうかん", cn: "交换、换货", en: "exchange", pos: "名詞・動詞" },
		{ jp: "通信販売", kana: "つうしんはんばい", cn: "邮购", en: "mail order", pos: "名詞" },
		{ jp: "到着", kana: "とうちゃく", cn: "送达、到达", en: "arrival", pos: "名詞・動詞" },
		{ jp: "返送", kana: "へんそう", cn: "寄回、退回", en: "sending back", pos: "名詞・動詞" },
		{ jp: "裏面", kana: "うらめん", cn: "背面", en: "the reverse side", pos: "名詞" },
		{ jp: "記入する", kana: "きにゅうする", cn: "填写", en: "to fill in", pos: "動詞" },
		{ jp: "切り取り線", kana: "きりとりせん", cn: "裁剪线", en: "cut line", pos: "名詞" },
		{ jp: "当てはまる", kana: "あてはまる", cn: "符合、适用", en: "to apply / match", pos: "動詞" },
		{ jp: "使用感", kana: "しようかん", cn: "使用感受", en: "how it feels to use", pos: "名詞" },
		{ jp: "機能", kana: "きのう", cn: "功能", en: "function", pos: "名詞" },
		{ jp: "期待する", kana: "きたいする", cn: "期待", en: "to expect", pos: "動詞" },
		{ jp: "傷", kana: "きず", cn: "伤痕、破损", en: "a scratch / damage", pos: "名詞" },
		{ jp: "汚れ", kana: "よごれ", cn: "污渍", en: "dirt / a stain", pos: "名詞" },
		{ jp: "気に入る", kana: "きにいる", cn: "喜欢、中意", en: "to like / be pleased with", pos: "動詞" },
		{ jp: "想像する", kana: "そうぞうする", cn: "想象", en: "to imagine", pos: "動詞" },
		{ jp: "係", kana: "かかり", cn: "负责人、专管人员", en: "the person in charge", pos: "名詞" },
	],

	grammar: [
		{
			pattern: "〜ば／〜と／〜たら",
			meaning: "如果……就……。三种条件形式，说明书里用来交代「满足什么条件才能怎样」。",
			meaningEn: "If … then …. Three condition forms. Manuals use them to say what happens when a condition is met.",
			example: {
				jp: "7{日以内|なのかいない}にご{返送|へんそう}いただければ、{交換|こうかん}・{返品|へんぴん}をお{受|う}けいたします。",
				cn: "如果在 7 天以内寄回，我们就受理换货・退货。",
				en: "If you send it back within 7 days, we will accept an exchange or return.",
			},
			note: "本课要点。答题时先圈出条件部分，再看结果部分。",
			noteEn: "Key point. Circle the condition first, then look at the result.",
		},
		{
			pattern: "〜ていなければ",
			formation: "動詞て形 ＋ いなければ",
			meaning: "如果没有（处于某状态）的话。否定条件。",
			meaningEn: "If you are not (in that state). A negative condition.",
			example: { jp: "ご{使用|しよう}になっていなければ、{返品|へんぴん}をお{受|う}けいたします。", cn: "如果尚未使用，就可以受理退货。", en: "If you have not used it, we will accept a return." },
		},
		{
			pattern: "ご〜になる（尊敬語）",
			meaning: "尊敬语，抬高对方的动作。",
			meaningEn: "Honorific. Raises the other person’s action.",
			example: { jp: "ご{使用|しよう}になっていなければ", cn: "（您）如果尚未使用的话", en: "if you have not used it" },
		},
		{
			pattern: "お〜いたします（謙譲語）",
			meaning: "自谦语，降低己方的动作以示礼貌。",
			meaningEn: "Humble. Lowers the speaker’s action to be polite.",
			example: { jp: "{返品|へんぴん}をお{受|う}けいたします。", cn: "我们将受理退货。", en: "We will accept the return." },
		},
		{
			pattern: "〜の上（うえ）",
			formation: "名詞＋の上／動詞た形＋上で",
			meaning: "在……之后。书面语，表示先后顺序。",
			meaningEn: "After …. Written style; order of actions.",
			example: { jp: "{返品|へんぴん}カードにご{記入|きにゅう}の{上|うえ}、{商品|しょうひん}といっしょにお{送|おく}りください。", cn: "填写退货卡之后，与商品一起寄回。", en: "After filling in the return card, send it with the item." },
		},
		{
			pattern: "〜以内／〜を{過|す}ぎる",
			meaning: "「以内」含本数；「過ぎる」＝超过、逾期。期限类文书的核心词。",
			meaningEn: "以内 includes the number itself; 過ぎる = past the limit. Core words on deadline texts.",
			example: { jp: "1{週間|しゅうかん}を{過|す}ぎた{場合|ばあい}", cn: "超过 1 周的情况", en: "if more than one week has passed" },
		},
		{
			pattern: "〜んでしょうか",
			meaning: "……吗？（委婉询问）。「〜のでしょうか」的口语形式，比「〜ますか」更柔和。",
			meaningEn: "…? (soft question). Spoken form of 〜のでしょうか, softer than 〜ますか.",
			example: { jp: "そんな{場合|ばあい}にも{返品|へんぴん}できるんでしょうか。", cn: "这种情况也可以退货吗？", en: "Can I return it in that case too?" },
		},
	],
};
