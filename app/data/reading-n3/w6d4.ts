import type { ReadingDay } from "./types";

// 第6週 4日目 計算に関する文章 — printed pages 98–99
// 別冊 p.7（第6週の解答）は今回のスキャンに含まれていないため、答えは本文から導出。
export const w6d4: ReadingDay = {
	week: 6,
	day: 4,
	label: "計算に関する文章",
	labelKana: "けいさんにかんするぶんしょう",
	labelEn: "Sentences Related to Calculations",
	printedPages: [98, 99],
	answerSource: "derived",

	point: {
		title: "{答|こた}え（{結論|けつろん}）のある{部分|ぶぶん}を{見|み}つけよう！",
		titleCn: "找出有答案（结论）的部分吧！",
		titleEn: "Identify the part of the sentence which contains the answer (the solution)!",
		figure: {
			alt: "文章の流れ図：「問題部分」→（実は）→「その答え（結論）」→（なぜなら／というのは）→「詳しい説明」→（だから／したがって／つまり／ゆえに）→「結論の再確認」。横で「『実は』『だから』『したがって』などの言葉のうしろに注意しましょう。」と言うキャラクター",
			cn: "文章流程图：「问题部分」→（実は）→「其答案（结论）」→（なぜなら／というのは）→「详细说明」→（だから／したがって／つまり／ゆえに）→「结论的再次确认」。一旁是一位说着「请注意『実は』『だから』『したがって』等词语的后面。」的角色。",
			en: "A flow chart of the passage: “the problem” → (実は) → “the answer (conclusion)” → (なぜなら / というのは) → “a detailed explanation” → (だから / したがって / つまり / ゆえに) → “restating the conclusion.” Nearby: “Pay attention to what comes after words like ‘実は,’ ‘だから,’ and ‘したがって.’”",
		},
		tips: [
			{
				jp: "{計算|けいさん}に{関|かん}する{文章|ぶんしょう}や{数学的|すうがくてき}な{文章|ぶんしょう}は{結論|けつろん}が{真|ま}ん{中|なか}にくることが{多|おお}いです。",
				cn: "与计算有关的文章以及数学类文章，结论常常出现在正中间。",
				en: "In passages about calculations or mathematics, the conclusion often comes in the middle — usually right after “しかし、実は….” This is different from opinion essays, where the conclusion is at the end.",
			},
			{
				jp: "「{実|じつ}は」「だから」「したがって」などの{言葉|ことば}のうしろに{注意|ちゅうい}しましょう。",
				cn: "请注意「実は」「だから」「したがって」等词语的后面。",
				en: "Pay attention to what comes after words like “実は,” “だから,” and “したがって.”",
			},
		],
		expressions: [
			{ jp: "実は", kana: "じつは", cn: "其实（后面接结论）", en: "actually (what follows is the conclusion)" },
			{ jp: "なぜなら／というのは", cn: "因为／这是因为（后面接的是理由）", en: "because (what follows is a reason)" },
			{ jp: "したがって／だから／つまり／ゆえに", cn: "因此／所以／也就是说／故而（后面接的是结论）", en: "therefore / in other words (what follows is a conclusion)" },
			{ jp: "回数券", kana: "かいすうけん", cn: "回数券（成套购买的车票）", en: "a commuter ticket" },
			{ jp: "まとめて", cn: "一并、成批地", en: "at one time" },
			{ jp: "1枚あたり", kana: "いちまいあたり", cn: "每张", en: "for one" },
			{ jp: "割高", kana: "わりだか", cn: "相对贵、单价高", en: "relatively more expensive" },
			{ jp: "電卓", kana: "でんたく", cn: "计算器", en: "a calculator" },
		],
	},

	renshu: {
		instruction: "{次|つぎ}の{会話文|かいわぶん}を{読|よ}んで、{後|あと}の{文|ぶん}から{正|ただ}しいものを{選|えら}ぼう。",
		instructionCn: "阅读下面的对话，从后面的句子中选出正确的吧。",
		instructionEn: "Read the conversation below and choose the correct statements from the sentences that follow. (Answers are on the next page.)",
		blocks: [
			{ type: "speech", speaker: "Aさん", speakerCn: "A", speakerEn: "A", jp: "あれ、{回数券|かいすうけん}（※1）なんか{使|つか}ってるの？", cn: "咦，你在用回数券（※1）之类的吗？", en: "Oh, you’re using a book of tickets?" },
			{
				type: "speech",
				speaker: "Bさん",
				speakerCn: "B",
				speakerEn: "B",
				jp: "そうだよ。ちょっと{面倒|めんどう}だけど、{得|とく}だから。",
				cn: "是啊。虽然有点儿麻烦，但因为划算嘛。",
				en: "Yeah. It’s a bit of a hassle, but it’s a better deal.",
			},
			{ type: "speech", speaker: "Aさん", speakerCn: "A", speakerEn: "A", jp: "ふーん、{回数券|かいすうけん}ってどのくらい{得|とく}なの？", cn: "唔……，回数券到底有多划算啊？", en: "Huh. How much do you save with a book of tickets?" },
			{
				type: "speech",
				speaker: "Bさん",
				speakerCn: "B",
				speakerEn: "B",
				jp: "ふつうの{切符|きっぷ}の10{枚分|まいぶん}の{値段|ねだん}で11{枚買|まいか}えるんだ。",
				cn: "用普通车票10张的价钱，能买到11张哦。",
				en: "You can buy 11 for the price of 10 regular tickets.",
			},
			{ type: "speech", speaker: "Aさん", speakerCn: "A", speakerEn: "A", jp: "ということは、これ1{枚|まい}いくらになるの？", cn: "也就是说，这一张合多少钱？", en: "So how much does that make one of these?" },
			{
				type: "speech",
				speaker: "Bさん",
				speakerCn: "B",
				speakerEn: "B",
				jp: "えーとね、ふつうの{切符|きっぷ}が250{円|えん}だよね。2,500{円|えん}で11{枚|まい}だから……えーと、{電卓|でんたく}（※2）がいるよ。あのね、とにかく、250{円|えん}の{得|とく}っていうことだよ。",
				cn: "嗯……我想想，普通车票是250日元对吧。2,500日元买11张，所以……嗯，需要计算器（※2）了。那个啊，总之，就是省250日元这个意思。",
				en: "Let’s see — a regular ticket is 250 yen, right? 2,500 yen for 11, so… yeah, I need a calculator. Anyway, it means you save 250 yen.",
			},
		],
		footnotes: [
			{ marker: "※1", term: "回数券", jp: "a commuter ticket", cn: "回数券（按次数成套出售的车票）", en: "a commuter ticket" },
			{ marker: "※2", term: "電卓", jp: "a calculator", cn: "计算器", en: "a calculator" },
		],
		choices: [
			{ jp: "Aさんは、{回数券|かいすうけん}には{興味|きょうみ}がない。", cn: "A对回数券没有兴趣。", en: "A has no interest in books of tickets." },
			{ jp: "Bさんは{今|いま}、{回数券|かいすうけん}を{使|つか}って{電車|でんしゃ}に{乗|の}るつもりである。", cn: "B现在打算使用回数券乘坐电车。", en: "B is about to ride the train using a book of tickets." },
			{ jp: "このふつうの{切符|きっぷ}10{枚|まい}と{回数券|かいすうけん}11{枚|まい}の{値段|ねだん}は{同|おな}じである。", cn: "这种普通车票10张和回数券11张的价格是相同的。", en: "The price of 10 regular tickets and 11 book tickets is the same." },
			{ jp: "この{回数券|かいすうけん}1{枚分|まいぶん}はふつうの{切符|きっぷ}1{枚分|まいぶん}と{同|おな}じ{価値|かち}がある。", cn: "这种回数券1张份与普通车票1张份具有相同的价值。", en: "One ticket from this book is worth the same as one regular ticket." },
			{ jp: "この{回数券|かいすうけん}は10{枚|まい}2,250{円|えん}で{買|か}える。", cn: "这种回数券10张花2,250日元就能买到。", en: "You can buy 10 of these book tickets for 2,250 yen." },
		],
		answers: [2, 3, 4],
		hint: {
			jp: "「ふつうの{切符|きっぷ}の10{枚分|まいぶん}の{値段|ねだん}で11{枚|まい}」＝2,500{円|えん}で11{枚|まい}。1{枚|まい}は{同|おな}じように{使|つか}えるので{価値|かち}は{同|おな}じ、{得|とく}なのは{値段|ねだん}のほう。",
			cn: "「ふつうの切符の10枚分の値段で11枚」＝2,500円で11枚（用普通车票10张份的价钱买11张＝2,500日元买11张）。1张可以按同样的方式使用，所以价值相同，划算的是价格这一边。",
			en: "“11 for the price of 10 regular tickets” = 11 for 2,500 yen. Each ticket can be used the same way, so the value is the same; what you save is the price. A asks how much you save, so A is interested.",
		},
	},

	mondai: {
		instruction: "{次|つぎ}の{文章|ぶんしょう}を{読|よ}んで、{後|あと}の{問|と}いに{答|こた}えなさい。",
		instructionCn: "请阅读下面的文章，回答后面的问题。",
		instructionEn: "Read the passage below and answer the questions that follow. (Answers are in the supplement, p. 7.)",
		blocks: [
			{
				type: "paragraph",
				indent: true,
				jp: "{回数券|かいすうけん}というのは、ふつうの{切符|きっぷ}や{券|けん}をまとめて（※1）{買|か}うと{得|とく}になる{券|けん}のことです。{例|たと}えば、1{枚|まい}100{円|えん}の{券|けん}の{場合|ばあい}、10{枚|まい}で900{円|えん}だったり、あるいは11{枚|まい}で1,000{円|えん}だったりします。さて、もし{回数券|かいすうけん}がこの2{種類|しゅるい}あったとしたら、どちらを{買|か}うのが{得|とく}なのでしょう。{一見|いっけん}どちらを{買|か}っても{変|か}わらないように{見|み}えます＊。",
				cn: "所谓回数券，是指把普通车票或票券一并（※1）购买就会变得划算的券。例如，1张100日元的券，有时是10张900日元，或者是11张1,000日元。那么，假如回数券有这样两种的话，买哪一种更划算呢？乍一看，好像无论买哪一种都没有什么不同＊。",
				en: "A book of tickets is a ticket that becomes a better deal when you buy regular tickets or coupons in a bundle. For example, for a 100-yen ticket, it may be 10 for 900 yen, or 11 for 1,000 yen. Now, if there were these two kinds of books, which would be the better buy? At a glance, it doesn’t seem to make much difference which one you buy＊.",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "しかし、{実|じつ}は、①10{枚|まい}で900{円|えん}の{回数券|かいすうけん}のほうが{得|とく}なのです。{合計金額|ごうけいきんがく}では、どちらも100{円|えん}の{得|とく}をしたように{見|み}えますが、1{枚|まい}の{券|けん}の{値段|ねだん}を{比較|ひかく}するとその{違|ちが}いがわかります。10{枚|まい}で900{円|えん}の{回数券|かいすうけん}1{枚|まい}の{値段|ねだん}は90{円|えん}、{一方|いっぽう}、11{枚|まい}で1,000{円|えん}の{券|けん}は1{枚|まい}が90.9{円|えん}になります。したがって10{枚|まい}で900{円|えん}の{回数券|かいすうけん}のほうが1{枚|まい}あたり（※2）（　②　）になります。つまり、11{枚|まい}で1,000{円|えん}のほうが、1{枚|まい}あたりでは{割高|わりだか}（※3）ということになるのです。",
				cn: "但是，其实，①10张900日元的回数券是更划算的。从合计金额来看，两种都像是省下了100日元，但比较1张券的价格，就能明白其中的差别。10张900日元的回数券，1张的价格是90日元；另一方面，11张1,000日元的券，1张是90.9日元。因此，10张900日元的回数券这边，每1张（※2）就会是（　②　）。也就是说，11张1,000日元的那种，按每1张来算就成了偏贵（※3）。",
				en: "But actually, ① the book of 10 for 900 yen is the better deal. In total amount, both look like a 100-yen saving, but if you compare the price of one ticket, the difference becomes clear. One ticket from the 10-for-900-yen book is 90 yen; on the other hand, one ticket from the 11-for-1,000-yen book is 90.9 yen. Therefore the 10-for-900-yen book is, per ticket, (　②　). In other words, the 11-for-1,000-yen one is relatively more expensive per ticket.",
			},
		],
		footnotes: [
			{ marker: "※1", term: "まとめて", jp: "at one time", cn: "一起、成套地", en: "at one time" },
			{ marker: "※2", term: "1枚あたり", jp: "for one", cn: "每张", en: "for one" },
			{ marker: "※3", term: "割高", jp: "relatively more expensive", cn: "单价偏贵", en: "relatively more expensive" },
		],
		pageNotes: [
			{
				jp: "＊ At a glance, it doesn't seem to make much difference which one you buy.",
				cn: "＊乍一看，买哪一种似乎都没有多大差别。",
				en: "＊ At a glance, it doesn't seem to make much difference which one you buy.",
			},
		],
		questions: [
			{
				label: "問1",
				jp: "どうすれば、①「10{枚|まい}で900{円|えん}の{回数券|かいすうけん}のほうが{得|とく}」とわかるか。",
				cn: "怎样才能知道①「10张900日元的回数券更为划算」？",
				en: "How can you tell that ① “the book of 10 for 900 yen is the better deal”?",
				choices: [
					{ jp: "{回数券|かいすうけん}の{合計金額|ごうけいきんがく}を{比|くら}べる。", cn: "比较回数券的合计金额。", en: "Compare the total amounts of the books." },
					{ jp: "{券|けん}1{枚|まい}あたりの{値段|ねだん}を{計算|けいさん}して{比|くら}べる。", cn: "计算每1张券的价格并加以比较。", en: "Calculate and compare the price per ticket." },
					{
						jp: "ふつうの{切符|きっぷ}10{枚|まい}と{回数券|かいすうけん}の{合計金額|ごうけいきんがく}の{差|さ}を{比|くら}べる。",
						cn: "比较普通车票10张与回数券合计金额的差额。",
						en: "Compare the difference between 10 regular tickets and the total of each book.",
					},
					{
						jp: "ふつうの{切符|きっぷ}を900{円分買|えんぶんか}ったときと、1,000{円分買|えんぶんか}ったときを{比|くら}べる。",
						cn: "比较购买900日元份的普通车票时与购买1,000日元份时。",
						en: "Compare buying 900 yen of regular tickets with buying 1,000 yen of regular tickets.",
					},
				],
				answer: 2,
				explanation:
					"答案就在结论后面的说明里：「合計金額では、どちらも100円の得をしたように見えますが、**1枚の券の値段を比較すると**その違いがわかります」。也就是说，看总金额分不出高下，必须算出每张的单价（90 日元 vs 90.9 日元）才能比较。所以 2 正确。",
				explanationEn:
					"The answer is in the explanation right after the conclusion: “In total amount, both look like a 100-yen saving, but **if you compare the price of one ticket**, the difference becomes clear.” In other words, the totals don’t tell them apart; you have to work out the unit price (90 yen vs. 90.9 yen). So 2 is correct.",
				choiceNotes: [
					"总金额上两种都是「省了 100 日元」，看不出差别——文中明确说了这一点。",
					"正确。「1枚の券の値段を比較するとその違いがわかります」。",
					"差额同样都是 100 日元，无法区分。",
					"文章比较的是两种回数券，不是普通车票的不同买法。",
				],
				choiceNotesEn: [
					"In total amount both are a “100-yen saving,” so you cannot tell them apart — the text says so clearly.",
					"Correct. “If you compare the price of one ticket, the difference becomes clear.”",
					"The difference is 100 yen either way, so it doesn’t distinguish them.",
					"The passage compares two kinds of books of tickets, not different ways of buying regular tickets.",
				],
			},
			{
				label: "問2",
				jp: "（　②　）に{入|はい}る{言葉|ことば}として{最|もっと}も{適当|てきとう}なものはどれか。",
				cn: "作为填入（　②　）的词语，最恰当的是哪一个？",
				en: "Which words fit best in (　②　)?",
				choices: [
					{ jp: "0.9{円|えん}の{損|そん}", cn: "亏0.9日元", en: "0.9 yen more expensive" },
					{ jp: "0.9{円|えん}の{得|とく}", cn: "省0.9日元", en: "0.9 yen cheaper" },
					{ jp: "90{円|えん}の{得|とく}", cn: "省90日元", en: "90 yen cheaper" },
					{ jp: "90{円|えん}の{損|そん}", cn: "亏90日元", en: "90 yen more expensive" },
				],
				answer: 2,
				explanation:
					"每张单价：10 张 900 日元 → 900 ÷ 10 ＝ **90 日元**；11 张 1,000 日元 → 1,000 ÷ 11 ≈ **90.9 日元**。两者相差 90.9 − 90 ＝ 0.9 日元，而且是 10 张那种更便宜。空格前有「10枚で900円の回数券のほうが1枚あたり」，所以填「0.9 円の得」，2 正确。后一句「11枚で1,000円のほうが、1枚あたりでは割高」也印证了这一点。",
				explanationEn:
					"Unit prices: 10 for 900 yen → 900 ÷ 10 = **90 yen**; 11 for 1,000 yen → 1,000 ÷ 11 ≈ **90.9 yen**. The difference is 90.9 − 90 = 0.9 yen, and the 10-ticket book is cheaper. Before the blank is “the 10-for-900-yen book is, per ticket,” so you fill in “0.9 yen cheaper.” 2 is correct. The next sentence, “the 11-for-1,000-yen one is relatively more expensive per ticket,” confirms this.",
				choiceNotes: [
					"方向反了——便宜的是 10 张 900 日元这一种。",
					"正确。90.9 − 90 ＝ 0.9 日元，每张省 0.9 日元。",
					"90 日元是**每张的单价**，不是差额。",
					"数值和方向都不对。",
				],
				choiceNotesEn: [
					"The direction is backwards — the cheaper one is the 10-for-900-yen book.",
					"Correct. 90.9 − 90 = 0.9 yen, so 0.9 yen cheaper per ticket.",
					"90 yen is the unit price of one ticket, not the difference.",
					"Both the number and the direction are wrong.",
				],
			},
		],
	},

	vocab: [
		{ jp: "計算", kana: "けいさん", cn: "计算", en: "calculation", pos: "名詞・動詞" },
		{ jp: "結論", kana: "けつろん", cn: "结论", en: "conclusion", pos: "名詞" },
		{ jp: "回数券", kana: "かいすうけん", cn: "回数券", en: "a book of tickets", pos: "名詞" },
		{ jp: "切符", kana: "きっぷ", cn: "车票", en: "a ticket", pos: "名詞" },
		{ jp: "券", kana: "けん", cn: "票、券", en: "a ticket; a coupon", pos: "名詞" },
		{ jp: "まとめて", cn: "一起、成套地", en: "in a bundle; at one time", pos: "副詞" },
		{ jp: "得", kana: "とく", cn: "划算、赚", en: "a saving; a good deal", pos: "名詞・な形" },
		{ jp: "損", kana: "そん", cn: "亏、损失", en: "a loss; a worse deal", pos: "名詞・な形" },
		{ jp: "一見", kana: "いっけん", cn: "乍一看", en: "at a glance", pos: "副詞" },
		{ jp: "合計金額", kana: "ごうけいきんがく", cn: "总金额", en: "total amount", pos: "名詞" },
		{ jp: "比較する", kana: "ひかくする", cn: "比较", en: "to compare", pos: "動詞" },
		{ jp: "一方", kana: "いっぽう", cn: "另一方面", en: "on the other hand", pos: "接続詞" },
		{ jp: "〜あたり", cn: "每〜", en: "per …", pos: "接尾語" },
		{ jp: "割高", kana: "わりだか", cn: "单价偏贵", en: "relatively expensive", pos: "な形" },
		{ jp: "電卓", kana: "でんたく", cn: "计算器", en: "a calculator", pos: "名詞" },
		{ jp: "面倒", kana: "めんどう", cn: "麻烦", en: "a hassle; troublesome", pos: "な形" },
		{ jp: "価値", kana: "かち", cn: "价值", en: "value", pos: "名詞" },
		{ jp: "差", kana: "さ", cn: "差额、差别", en: "a difference", pos: "名詞" },
	],

	grammar: [
		{
			pattern: "しかし、{実|じつ}は〜のです",
			meaning: "然而实际上是……。说明文里用来抛出结论，**结论常在文章中间**。",
			meaningEn: "But actually it is …. Used in explanatory writing to drop the conclusion — and the conclusion often comes in the middle of the passage.",
			example: {
				jp: "しかし、{実|じつ}は、10{枚|まい}で900{円|えん}の{回数券|かいすうけん}のほうが{得|とく}なのです。",
				cn: "但是，其实，10张900日元的回数券是更划算的。",
				en: "But actually, the book of 10 for 900 yen is the better deal.",
			},
			note: "本课要点。看到「実は」就画线，那多半就是答案句。",
			noteEn: "This is the key point of the lesson. When you see “実は,” underline it — that sentence is likely the answer.",
		},
		{
			pattern: "したがって／つまり",
			meaning: "「したがって」＝因此（导出结论）；「つまり」＝也就是说（换个说法重申）。",
			meaningEn: "“したがって” = therefore (draws a conclusion); “つまり” = in other words (restates it another way).",
			example: {
				jp: "したがって……1{枚|まい}あたり0.9{円|えん}の{得|とく}になります。つまり、11{枚|まい}で1,000{円|えん}のほうが{割高|わりだか}……",
				cn: "因此……每1张是省0.9日元。也就是说，11张1,000日元的更为偏贵……",
				en: "Therefore … it is 0.9 yen cheaper per ticket. In other words, the 11-for-1,000-yen one is relatively more expensive …",
			},
		},
		{
			pattern: "〜というのは〜のことです",
			meaning: "所谓……就是……。下定义的固定句式，说明文的开头常见。",
			meaningEn: "What we call … is …. A set pattern for definitions, common at the start of an explanation.",
			example: {
				jp: "{回数券|かいすうけん}というのは、……{得|とく}になる{券|けん}のことです。",
				cn: "所谓回数券，是指……会变得划算的券。",
				en: "A book of tickets is a ticket that becomes a better deal …",
			},
		},
		{
			pattern: "〜たり、あるいは〜たり",
			meaning: "有的是……，也有的是……。列举几种情况。",
			meaningEn: "Sometimes …, or sometimes …. Lists several cases.",
			example: { jp: "10{枚|まい}で900{円|えん}だったり、あるいは11{枚|まい}で1,000{円|えん}だったり", cn: "有时是10张900日元，或者是11张1,000日元", en: "sometimes 10 for 900 yen, or 11 for 1,000 yen" },
		},
		{
			pattern: "〜としたら",
			meaning: "假如……的话。提出假设。",
			meaningEn: "If … were the case. Puts forward a hypothesis.",
			example: { jp: "もし{回数券|かいすうけん}がこの2{種類|しゅるい}あったとしたら", cn: "假如回数券有这样两种的话", en: "if there were these two kinds of books of tickets" },
		},
		{
			pattern: "〜ように{見|み}える",
			meaning: "看上去像……。",
			meaningEn: "Looks as if ….",
			example: { jp: "{一見|いっけん}どちらを{買|か}っても{変|か}わらないように{見|み}えます。", cn: "乍一看，好像无论买哪一种都没有什么不同。", en: "At a glance it looks as if it doesn’t matter which you buy." },
		},
		{
			pattern: "〜あたり",
			formation: "数量詞 ＋ あたり",
			meaning: "每……。计算单价、平均值时使用。",
			meaningEn: "Per …. Used when working out a unit price or an average.",
			example: { jp: "1{枚|まい}あたりでは{割高|わりだか}", cn: "按每张来算偏贵", en: "relatively more expensive per ticket" },
		},
	],
};
