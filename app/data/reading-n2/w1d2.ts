import type { ReadingDay } from "../reading-n3/types";

// 第1週 2日目 ダイレクトメール — printed pages 14–15
export const w1d2: ReadingDay = {
	week: 1,
	day: 2,
	label: "ダイレクトメール",
	labelKana: "だいれくとめーる",
	labelEn: "Direct Mail (DM)",
	printedPages: [14, 15],
	answerSource: "book",

	point: {
		title: "{期間|きかん}や{特典|とくてん}を{受|う}ける{条件|じょうけん}に{注意|ちゅうい}！",
		titleCn: "注意优惠期间及能够得到优惠的条件！",
		titleEn: "Pay attention to the dates and the conditions for receiving bonuses!",
		figure: {
			alt: "安い！30%で買えるんだ！と喜ぶ人と、違うよ！30%引き！と訂正する人のイラスト",
			cn: "一个人高兴地说「好便宜！三折就能买到！」；另一个人纠正「不对！是打七折（减 30%）！」",
			en: "One character cheers “Cheap! I can buy it for 30%!”; the other corrects “Wrong! It’s 30% off!”",
		},
		tips: [
			{
				jp: "{例えば|たとえば}セールのお{知|し}らせなら、こんな{内容|ないよう}が{書|か}いてあります。",
				cn: "比如促销通知里，会写着下面这类内容。",
				en: "A sale notice, for example, will typically include the kind of information below.",
			},
		],
		expressions: [
			{ jp: "期間は？ → 日時、閉店日もチェック。", kana: "きかん", cn: "期间是？→ 也要核对日期时间和结束日。", en: "When is it? → Check the dates and the last day too." },
			{ jp: "対象となる商品は？ → 新製品は？", kana: "たいしょう", cn: "适用商品是？→ 新产品算不算？", en: "Which items? → Do new products count?" },
			{ jp: "○% OFF、○割引、半額", kana: "わりびき", cn: "○% 折扣、打○折、半价", en: "○% OFF, ○% off (Japanese-style), half price" },
			{ jp: "どのぐらい安くなる？ → 店頭表示価格からさらに割引？", kana: "てんとうひょうじかかく", cn: "能便宜多少？→ 是在标价基础上再打折吗？", en: "How much cheaper? → A further discount off the ticket price?" },
			{ jp: "買い物の合計額によって割引率が異なる？", kana: "わりびきりつ", cn: "折扣率会不会随购物合计金额而变？", en: "Does the discount rate change with the total spent?" },
			{ jp: "当日必要なものは？ → 届いたハガキ？ 会員証？", kana: "とうじつ", cn: "当天需要带什么？→ 寄到的明信片？会员证？", en: "What do you need that day? → The postcard that arrived? A membership card?" },
		],
	},

	renshu: {
		instruction: "{次|つぎ}の{会話文|かいわぶん}を{読|よ}んで、{後|あと}の{文|ぶん}から{正|ただ}しいものを{選|えら}ぼう。",
		instructionCn: "阅读下面的对话，从后面的句子中选出正确的。（答案在下一页）",
		instructionEn: "Read the conversation below and choose the correct statements from the sentences that follow. (Answers are on the next page.)",
		blocks: [
			{
				type: "speech",
				speaker: "{夫|おっと}",
				speakerCn: "丈夫",
				speakerEn: "Husband",
				jp: "{今日|きょう}も{暑|あつ}くなりそうだなあ……お、セールのハガキか。",
				cn: "今天好像也会很热啊……哦，是促销的明信片吗。",
				en: "Looks like it’ll be hot again today… oh, a sale postcard?",
			},
			{
				type: "speech",
				speaker: "{妻|つま}",
				speakerCn: "妻子",
				speakerEn: "Wife",
				jp: "うん、{昨日来|きのうき}てた。{毎年|まいとし}{来|く}るけど。",
				cn: "嗯，昨天到的。每年都会来。",
				en: "Yeah, it came yesterday. They send one every year.",
			},
			{
				type: "speech",
				speaker: "{夫|おっと}",
				speakerCn: "丈夫",
				speakerEn: "Husband",
				jp: "なんだ、3{日間|にちかん}だけか。……しかも、{平日|へいじつ}。うちなんか{行|い}けるわけないよな。",
				cn: "什么嘛，只有三天。……而且还是平日。我们哪能去得了啊。",
				en: "What, only three days? …And weekdays at that. There’s no way we can go.",
			},
			{
				type: "speech",
				speaker: "{妻|つま}",
				speakerCn: "妻子",
				speakerEn: "Wife",
				jp: "そうなのよ。{土日|どにち}だったらね……。あ、もうこんな{時間|じかん}。はい、お{弁当|べんとう}。えっと、{今日|きょう}はちょっと{遅|おそ}くなるけど、あなたよりは{早|はや}く{帰|かえ}れると{思|おも}うから。",
				cn: "就是啊。要是周末就好了……。啊，已经这个时间了。来，便当。嗯，今天我会稍晚一点，不过应该还是比你早到家。",
				en: "I know. If it were the weekend… oh, look at the time. Here’s your lunch. Um, I’ll be a little late today, but I think I’ll still get home before you.",
			},
			{
				type: "speech",
				speaker: "{夫|おっと}",
				speakerCn: "丈夫",
				speakerEn: "Husband",
				jp: "{了解|りょうかい}。じゃ、{行|い}ってくる。",
				cn: "知道了。那我走了。",
				en: "Got it. Well, I’m off.",
			},
			{
				type: "speech",
				speaker: "{妻|つま}",
				speakerCn: "妻子",
				speakerEn: "Wife",
				jp: "いってらっしゃい。{私|わたし}も{急|いそ}がないと。お{弁当持|べんとうも}ったし、{窓|まど}は{閉|し}めたし……。",
				cn: "路上小心。我也得抓紧了。便当拿了，窗也关了……。",
				en: "See you. I have to hurry too. Lunch, check; windows closed, check…",
			},
		],
		choices: [
			{ jp: "{今週末|こんしゅうまつ}、3{日間|にちかん}セールがある。", cn: "这个周末有为期三天的促销。", en: "There is a three-day sale this weekend." },
			{ jp: "{夫|おっと}は{今日帰宅|きょうきたく}が{遅|おそ}くなるかもしれない。", cn: "丈夫今天回家可能会晚。", en: "The husband may get home late today." },
			{ jp: "{妻|つま}は{今日仕事|きょうしごと}の{帰|かえ}りにセールに{行|い}くつもりだ。", cn: "妻子打算今天下班路上顺便去促销。", en: "The wife plans to go to the sale on her way home from work today." },
			{ jp: "{夫|おっと}はセールに{興味|きょうみ}がある。", cn: "丈夫对促销有兴趣。", en: "The husband is interested in the sale." },
			{ jp: "{二人|ふたり}はセールに{行|い}きたくても{行|い}けない。", cn: "两个人即使想去促销也去不了。", en: "The two of them cannot go to the sale even if they want to." },
		],
		answers: [4, 5],
	},

	mondai: {
		instruction: "{次|つぎ}のダイレクトメールを{読|よ}んで、{後|あと}の{問|と}いに{答|こた}えなさい。",
		instructionCn: "阅读下面的直邮广告，回答后面的问题。（答案在别册 p.2）",
		instructionEn: "Read the direct mail below and answer the questions that follow. (Answers are in the separate booklet, p. 2.)",
		blocks: [
			{
				type: "title",
				jp: "ファッションセンターやまむら",
				cn: "时尚中心山村",
				en: "Fashion Center Yamamura",
			},
			{
				type: "title",
				jp: "{会員様|かいいんさま}ご{招待|しょうたい} {特別|とくべつ}セール",
				cn: "会员招待　特别促销",
				en: "Special sale by invitation for members",
				sub: {
					jp: "{期間限定|きかんげんてい}・{会員様|かいいんさま}だけにお{届|とど}けする\n3{日間|にちかん}だけのお{得|とく}なセールのご{案内|あんない}",
					cn: "限时・仅寄给会员\n仅三天的超值促销通知",
					en: "Limited time · sent to members only\nNotice of a bargain sale for three days only",
				},
			},
			{
				type: "heading",
				jp: "{開催期間|かいさいきかん}",
				cn: "举办期间",
				en: "Sale period",
			},
			{
				type: "line",
				jp: "20XX{年|ねん}7{月|がつ}5{日|か}（{火|か}）〜7{月|がつ}7{日|か}（{木|もく}）",
				cn: "20XX 年 7 月 5 日（周二）〜7 月 7 日（周四）",
				en: "Tuesday, July 5, 20XX – Thursday, July 7, 20XX",
				align: "center",
			},
			{
				type: "heading",
				jp: "特典1",
				cn: "优惠 1",
				en: "Bonus 1",
			},
			{
				type: "paragraph",
				jp: "{新商品|しんしょうひん}も、{割引商品|わりびきしょうひん}も、{店頭表示価格|てんとうひょうじかかく}から{店内全品|てんないぜんぴん}20%OFF＊",
				cn: "无论是新品还是已经打折的商品，一律按店内标价全场 20% OFF＊",
				en: "New items and already-discounted items alike: 20% OFF＊ the in-store ticket price on everything in the store",
			},
			{
				type: "paragraph",
				jp: "さらに、1{万円以上|まんえんいじょう}ご{購入|こうにゅう}の{際|さい}は30%OFF",
				cn: "此外，一次性购买满 1 万日元时为 30% OFF",
				en: "And if you spend 10,000 yen or more, 30% OFF",
			},
			{
				type: "heading",
				jp: "特典2",
				cn: "优惠 2",
				en: "Bonus 2",
			},
			{
				type: "paragraph",
				jp: "セール{中|ちゅう}ご{来店|らいてん}の{お客様|きゃくさま}に、もれなく（{注|ちゅう}）{記念品|きねんひん}をプレゼント！",
				cn: "促销期间光临本店的顾客，一律赠送纪念品！",
				en: "A souvenir for every customer who visits during the sale, without exception (note)!",
			},
			{
				type: "line",
				jp: "{必|かなら}ず{本状|ほんじょう}をお{持|も}ちください。",
				cn: "请务必携带本函。",
				en: "Please be sure to bring this notice.",
				align: "center",
			},
			{
				type: "figure",
				alt: "値札：¥14,000 が線で消され、下に「特価 ¥10,000」と書いてある",
				cn: "价签：原价 14,000 日元被划掉，下面写着特价 10,000 日元",
				en: "Price tag: ¥14,000 crossed out, with “special price ¥10,000” underneath",
			},
		],
		footnotes: [
			{ marker: "（注）", term: "もれなく", jp: "without exception", cn: "一个不漏、人人有份", en: "without exception" },
		],
		pageNotes: [
			{
				jp: "＊ all 20% off the original price",
				cn: "＊店内所有商品按标价优惠 20%",
				en: "all 20% off the original price",
			},
		],
		questions: [
			{
				label: "問1",
				jp: "{正|ただ}しくないのはどれか。",
				cn: "哪一项是不正确的？",
				en: "Which of the following is not correct?",
				choices: [
					{ jp: "{割引|わりびき}になっている{商品|しょうひん}もさらに{安|やす}くなる。", cn: "已经打折的商品还会再便宜。", en: "Items that are already on discount become even cheaper." },
					{ jp: "1{万円以上|まんえんいじょう}{買|か}えば3{割引|わりびき}になる。", cn: "买满 1 万日元就打七折。", en: "If you buy 10,000 yen or more, you get 30% off." },
					{ jp: "{記念品|きねんひん}をもらうには{案内状|あんないじょう}が{必要|ひつよう}だ。", cn: "要拿纪念品必须有邀请函。", en: "You need the invitation notice in order to receive the souvenir." },
					{ jp: "{新商品|しんしょうひん}はセールの{対象|たいしょう}ではない。", cn: "新品不是促销对象。", en: "New products are not included in the sale." },
				],
				answer: 4,
				explanation:
					"特典1写着「新商品も、割引商品も、店頭表示価格から店内全品20%OFF」——新品也在促销范围内，所以「新商品はセールの対象ではない」与原文相反，是不正确的一项，选 4。别册也指出：3 行目「会員様だけにお届けする」＝お知らせする；最終行「本状」＝このはがき。",
				explanationEn:
					"Bonus 1 says new items and already-discounted items alike are 20% off the ticket price, everything in the store. So “new products are not included in the sale” contradicts the text, which makes 4 the incorrect statement. The answer key also notes that “sent to members only” means “notifying members,” and honjō means this postcard.",
				choiceNotes: [
					"特典1写明「割引商品も、店頭表示価格から」再减，已经打折的商品还会再便宜。",
					"满 1 万日元时是 30% OFF，即打七折（3 割引）。「以上」包含 1 万日元本身。",
					"「必ず本状をお持ちください」——本状就是这张直邮／案内状。",
					"正确（这是错的那一项）。原文写着「新商品も」。",
				],
				choiceNotesEn: [
					"Bonus 1 says already-discounted items are reduced further from the ticket price.",
					"Spending 10,000 yen or more is 30% OFF, i.e. 3-waribiki. ijō includes 10,000 yen itself.",
					"“Please be sure to bring this notice” — honjō is this piece of direct mail.",
					"Correct as the false statement: the text says “new items too.”",
				],
			},
			{
				label: "問2",
				jp: "{右|みぎ}の{値札|ねふだ}がついている{商品|しょうひん}1{点|てん}だけを{購入|こうにゅう}する{場合|ばあい}、いくらで{買|か}えるか。",
				cn: "只购买右边价签上的那一件商品时，可以多少钱买到？",
				en: "If you buy only the one item with the price tag on the right, how much can you get it for?",
				choices: [
					{ jp: "7,000{円|えん}", cn: "7,000 日元", en: "7,000 yen" },
					{ jp: "8,000{円|えん}", cn: "8,000 日元", en: "8,000 yen" },
					{ jp: "9,800{円|えん}", cn: "9,800 日元", en: "9,800 yen" },
					{ jp: "10,000{円|えん}", cn: "10,000 日元", en: "10,000 yen" },
				],
				answer: 1,
				explanation:
					"别册：值札的「特価 ¥10,000」才是店頭表示価格，不是划掉的 14,000 日元。「割引商品も店頭表示価格から」「1万円以上ご購入の際は30%OFF」——10,000 日元已经达到「1 万円以上」，所以按 30% OFF 计算：10,000×70%＝7,000 円。不要从原价 14,000 再打折，也不要只打 20%（那是不满 1 万日元时）。",
				explanationEn:
					"The answer key: the tag’s special price ¥10,000 is the in-store ticket price, not the crossed-out ¥14,000. Already-discounted items are reduced from the ticket price, and spending 10,000 yen or more is 30% OFF. ¥10,000 already meets “10,000 yen or more,” so 10,000 × 70% = 7,000 yen. Do not discount from 14,000, and do not apply only 20% (that is for totals under 10,000).",
				choiceNotes: [
					"正确。店头标价 10,000 日元，满 1 万按 30% OFF → 7,000 日元。",
					"这是只打 20% 的金额（10,000×80%）。本件已满 1 万，应打 30%。",
					"这是误把划掉的 14,000 当标价再打 30%（14,000×70%）。",
					"这是特价标价本身，还没有算上本次直邮的折扣。",
				],
				choiceNotesEn: [
					"Correct. Ticket price 10,000 yen, 30% OFF because the total is 10,000 or more → 7,000 yen.",
					"That is 20% off (10,000 × 80%). This purchase already hits 10,000, so it is 30%.",
					"That wrongly takes the crossed-out 14,000 as the ticket price and takes 30% off it.",
					"That is the special ticket price itself, before this mailing’s extra discount.",
				],
			},
		],
	},

	vocab: [
		{ jp: "ダイレクトメール", cn: "直邮广告、直接邮寄广告", en: "direct mail (DM)", pos: "名詞" },
		{ jp: "期間", kana: "きかん", cn: "期间", en: "period; dates", pos: "名詞" },
		{ jp: "特典", kana: "とくてん", cn: "优惠、特典", en: "bonus; special privilege", pos: "名詞" },
		{ jp: "対象", kana: "たいしょう", cn: "对象", en: "target; what it applies to", pos: "名詞" },
		{ jp: "店頭表示価格", kana: "てんとうひょうじかかく", cn: "店内标价", en: "in-store ticket / displayed price", pos: "名詞" },
		{ jp: "割引率", kana: "わりびきりつ", cn: "折扣率", en: "discount rate", pos: "名詞" },
		{ jp: "会員証", kana: "かいいんしょう", cn: "会员证", en: "membership card", pos: "名詞" },
		{ jp: "開催期間", kana: "かいさいきかん", cn: "举办期间", en: "period the event is held", pos: "名詞" },
		{ jp: "本状", kana: "ほんじょう", cn: "本函、此信（这张通知／明信片）", en: "this notice; this letter", pos: "名詞" },
		{ jp: "もれなく", cn: "一个不漏、人人有份", en: "without exception; every one of you", pos: "副詞" },
		{ jp: "記念品", kana: "きねんひん", cn: "纪念品", en: "souvenir; commemorative gift", pos: "名詞" },
		{ jp: "値札", kana: "ねふだ", cn: "价签", en: "price tag", pos: "名詞" },
		{ jp: "特価", kana: "とっか", cn: "特价", en: "special price", pos: "名詞" },
		{ jp: "購入", kana: "こうにゅう", cn: "购买", en: "purchase", pos: "名詞・動詞" },
		{ jp: "案内状", kana: "あんないじょう", cn: "邀请函、通知函", en: "invitation / notice", pos: "名詞" },
	],

	grammar: [
		{
			pattern: "〜際（は／に）",
			formation: "名詞＋の際／動詞辞書形＋際",
			meaning: "在……的时候。告示、优惠条款里用来标出适用条件。",
			meaningEn: "when / at the time of…. Used on notices to mark when a condition applies.",
			example: {
				jp: "1{万円以上|まんえんいじょう}ご{購入|こうにゅう}の{際|さい}は30%OFF",
				cn: "购买满 1 万日元时为 30% OFF",
				en: "30% OFF when you spend 10,000 yen or more",
			},
		},
		{
			pattern: "〜以上",
			formation: "数量詞＋以上",
			meaning: "……以上，包含该数字本身。1 万円以上＝满 1 万日元（含 1 万）。",
			meaningEn: "… or more, including the number itself. 1-man-en ijō includes exactly 10,000 yen.",
			example: {
				jp: "1{万円以上|まんえんいじょう}ご{購入|こうにゅう}の{際|さい}",
				cn: "购买满 1 万日元时",
				en: "when you purchase 10,000 yen or more",
			},
		},
		{
			pattern: "〜わけない／〜わけはない",
			formation: "動詞辞書形・ない形＋わけない",
			meaning: "不可能……、哪能……。口语里加强否定。",
			meaningEn: "there’s no way that… / it’s impossible that…. Emphatic spoken negation.",
			example: {
				jp: "うちなんか{行|い}けるわけないよな。",
				cn: "我们哪能去得了啊。",
				en: "There’s no way the likes of us can go.",
			},
		},
	],
};
