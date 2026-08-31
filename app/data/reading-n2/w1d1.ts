import type { ReadingDay } from "../reading-n3/types";

// 第1週 1日目 割引券・クーポン — printed pages 12–13
export const w1d1: ReadingDay = {
	week: 1,
	day: 1,
	label: "割引券・クーポン",
	labelKana: "わりびきけん",
	labelEn: "Discount coupons",
	printedPages: [12, 13],
	answerSource: "book",

	point: {
		title: "{有効期限|ゆうこうきげん}に{注意|ちゅうい}！",
		titleCn: "注意有效期限！",
		titleEn: "Pay attention to the date of expiry!",
		figure: {
			alt: "割引券を見て「これ、使えるかな……」と考える人のイラスト",
			cn: "一个人拿着折扣券想「这个还能用吗……」",
			en: "A person looking at a coupon and wondering “Can I still use this…?”",
		},
		tips: [
			{
				jp: "{例えば|たとえば}こんな{項目|こうもく}をチェックします。",
				cn: "比如要核对下面这些项目。",
				en: "Check items like the ones below.",
			},
		],
		expressions: [
			{ jp: "有効期限：XX年○月×日まで", kana: "ゆうこうきげん", cn: "有效期至：XX年○月×日", en: "valid until XX/○/×" },
			{ jp: "XX年○月×日まで有効", cn: "有效至 XX年○月×日", en: "valid through XX/○/×" },
			{ jp: "無料", kana: "むりょう", cn: "免费", en: "free" },
			{ jp: "半額", kana: "はんがく", cn: "半价", en: "half price" },
			{ jp: "○割引", kana: "わりびき", cn: "打○折", en: "○% off (Japanese-style discount)" },
			{ jp: "○% OFF", cn: "○% 折扣", en: "○% off" },
			{ jp: "○○店のみ（＝○○店だけ）", kana: "みせ", cn: "仅限○○店", en: "○○ store only" },
			{ jp: "全店（＝どの店でも）", kana: "ぜんてん", cn: "全部门店", en: "any store in the chain" },
			{ jp: "ご注文の際（＝注文するとき）", kana: "ちゅうもん", cn: "点餐/下单时", en: "when placing your order" },
			{ jp: "お会計前に（＝会計するとき）", kana: "かいけい", cn: "结账前", en: "before paying" },
			{ jp: "お一人様一回", kana: "ひとりさま", cn: "每位仅限一次", en: "once per person" },
			{ jp: "同伴の方お一人まで", kana: "どうはん", cn: "同行者限一人", en: "one accompanying person only" },
			{ jp: "他のクーポンとは併用できません", kana: "へいよう", cn: "不可与其他优惠券同时使用", en: "cannot be combined with other coupons" },
		],
	},

	renshu: {
		instruction: "{次|つぎ}の{会話文|かいわぶん}を{読|よ}んで、{後|あと}の{文|ぶん}から{正|ただ}しいものを{選|えら}ぼう。",
		instructionCn: "阅读下面的对话，从后面的句子中选出正确的。（答案在下一页）",
		instructionEn: "Read the conversation below and choose the correct statements from the sentences that follow. (Answers are on the next page.)",
		blocks: [
			{
				type: "speech",
				speaker: "{妹|いもうと}",
				speakerCn: "妹妹",
				speakerEn: "Younger sister",
				jp: "おいしいね、このチーズケーキ。",
				cn: "这个芝士蛋糕真好吃。",
				en: "This cheesecake is delicious.",
			},
			{
				type: "speech",
				speaker: "{姉|あね}",
				speakerCn: "姐姐",
				speakerEn: "Older sister",
				jp: "うん。あ！チーズケーキといえば、{割引券|わりびきけん}があったの、{忘|わす}れてた。……ほら！",
				cn: "嗯。啊！说到芝士蛋糕，我有张折扣券，给忘了。……你看！",
				en: "Yeah. Oh! Speaking of cheesecake, I had a coupon—I forgot. …Look!",
			},
			{
				type: "speech",
				speaker: "{妹|いもうと}",
				speakerCn: "妹妹",
				speakerEn: "Younger sister",
				jp: "なんだー。{早|はや}く{気|き}がつけばよかったのに。もう{食|た}べちゃったよ。",
				cn: "什么嘛。早点想起来就好了。我都吃完了。",
				en: "What? You should have remembered sooner. I’ve already eaten it.",
			},
			{
				type: "speech",
				speaker: "{姉|あね}",
				speakerCn: "姐姐",
				speakerEn: "Older sister",
				jp: "{会計|かいけい}のとき{出|だ}せばいいんじゃないの？えーっと、あ、{注文|ちゅうもん}のときに{出|だ}すんだって。",
				cn: "结账的时候拿出来不就行了？嗯……啊，上面写着要点餐的时候交。",
				en: "Can’t we just hand it over when we pay? Um… oh, it says you have to show it when you order.",
			},
			{
				type: "speech",
				speaker: "{妹|いもうと}",
				speakerCn: "妹妹",
				speakerEn: "Younger sister",
				jp: "えー。{半額|はんがく}になるはずだったんでしょ。{二人|ふたり}だから240{円|えん}も{安|やす}くなるんだったのに。",
				cn: "诶——本来可以半价的吧。两个人的话能少 240 日元呢。",
				en: "What? It was supposed to be half price. For two of us that would have been 240 yen off.",
			},
			{
				type: "speech",
				speaker: "{姉|あね}",
				speakerCn: "姐姐",
				speakerEn: "Older sister",
				jp: "{一人分|ひとりぶん}だけだって。でも、それでももったいないよね。{店員|てんいん}さんに{聞|き}いてみようか。",
				cn: "上面写着只限一份。不过就算这样也怪可惜的。要不要问问店员？",
				en: "It says it’s only for one serving. Still, that would be a waste. Shall we ask the staff?",
			},
			{
				type: "speech",
				speaker: "{妹|いもうと}",
				speakerCn: "妹妹",
				speakerEn: "Younger sister",
				jp: "ちょっと{見|み}せて。……あれ？　なんだ、これ{期限|きげん}{過|す}ぎてるじゃない。",
				cn: "给我看看。……咦？什么啊，这张已经过期了。",
				en: "Let me see. …Huh? This is past the expiry date.",
			},
		],
		choices: [
			{ jp: "{姉|あね}も{妹|いもうと}もチーズケーキを{注文|ちゅうもん}した。", cn: "姐姐和妹妹都点了芝士蛋糕。", en: "Both sisters ordered cheesecake." },
			{ jp: "この{店|みせ}のチーズケーキは240{円|えん}である。", cn: "这家店的芝士蛋糕是 240 日元。", en: "The cheesecake at this shop costs 240 yen." },
			{ jp: "{割引券|わりびきけん}は{会計|かいけい}のときに{出|だ}せばいい。", cn: "折扣券在结账时拿出来就可以。", en: "The coupon can be shown at checkout." },
			{ jp: "{割引券|わりびきけん}は{一緒|いっしょ}に{行|い}った{人|ひと}の{分|ぶん}も{安|やす}くなる。", cn: "折扣券也能让同行的人一起便宜。", en: "The coupon also discounts the accompanying person’s order." },
			{ jp: "{今回|こんかい}、この{割引券|わりびきけん}は{使|つか}えない。", cn: "这次这张折扣券用不了。", en: "This coupon cannot be used this time." },
		],
		answers: [1, 2, 5],
	},

	mondai: {
		instruction: "{次|つぎ}の2{種類|しゅるい}の{券|けん}を{見|み}て、{後|あと}の{問|と}いに{答|こた}えなさい。",
		instructionCn: "看下面两种券，回答后面的问题。（答案在别册 p.2）",
		instructionEn: "Look at the two coupons below and answer the questions that follow. (Answers are in the separate booklet, p. 2.)",
		blocks: [
			{
				type: "title",
				jp: "A　Berry's チーズケーキ 50% OFF {券|けん}",
				cn: "A　Berry's 芝士蛋糕 5 折券",
				en: "A  Berry’s cheesecake 50% OFF coupon",
				sub: { jp: "¥240（{税込|ぜいこみ}）→ ¥120（{税込|ぜいこみ}）", cn: "含税 240 日元 → 含税 120 日元", en: "¥240 (tax incl.) → ¥120 (tax incl.)" },
			},
			{
				type: "list",
				items: [
					{ jp: "{本券|ほんけん}は{全国|ぜんこく}の Berry's {各店|かくてん}でご{利用|りよう}になれます。", cn: "本券可在全国 Berry's 各店使用。", en: "This coupon can be used at any Berry’s store nationwide." },
					{ jp: "ご{注文|ちゅうもん}の{際|さい}、{係|かかり}の{者|もの}にお{渡|わた}しください。", cn: "点餐时请交给店员。", en: "Please hand it to a staff member when you order." },
					{ jp: "{本券|ほんけん}はお{一人様|ひとりさま}1{枚|まい}のみ{有効|ゆうこう}です。", cn: "本券每位仅限 1 张有效。", en: "Valid for one coupon per person only." },
					{ jp: "{他|ほか}のクーポン{券|けん}との{併用|へいよう}はできません。", cn: "不可与其他优惠券同时使用。", en: "Cannot be combined with other coupons." },
					{ jp: "{朝食時間帯|ちょうしょくじかんたい}（{注|ちゅう}1）（6:00〜10:00）はご{利用|りよう}になれません。", cn: "早餐时段（6:00–10:00）不可使用。", en: "Cannot be used during breakfast hours (6:00–10:00)." },
					{ jp: "20XX{年|ねん}5{月|がつ}31{日|にち}まで{有効|ゆうこう}", cn: "有效期至 20XX 年 5 月 31 日", en: "Valid until May 31, 20XX" },
				],
			},
			{
				type: "title",
				jp: "B　{薬|くすり}のキク{太郎|たろう}　お{買|か}い{物券|ものけん} 500{円|えん}",
				cn: "B　药的菊太郎　购物券 500 日元",
				en: "B  Kusuri no Kikutarō  ¥500 shopping voucher",
			},
			{
				type: "list",
				items: [
					{ jp: "{有効期限|ゆうこうきげん}：20XX{年|ねん}12{月|がつ}31{日|にち}までにご{利用|りよう}ください。", cn: "有效期：请在 20XX 年 12 月 31 日之前使用。", en: "Expiry: please use by December 31, 20XX." },
					{ jp: "※{全店|ぜんてん}でお{使|つか}いになれますが、{調剤|ちょうざい}（{注|ちゅう}2）・たばこ・ハガキ・{切手|きって}・{雑誌|ざっし}等、{一部|いちぶ}ご{利用|りよう}になれない{商品|しょうひん}がございます。", cn: "※全店可用，但处方药、香烟、明信片、邮票、杂志等部分商品不能使用。", en: "Usable at all stores, but some items cannot be purchased with it: dispensed medicine, tobacco, postcards, stamps, magazines, etc." },
				],
			},
		],
		footnotes: [
			{ marker: "（注1）", term: "時間帯", jp: "じかんたい", cn: "时段（hours）", en: "hours; time slot" },
			{ marker: "（注2）", term: "調剤", jp: "ちょうざい", cn: "配药、调剂（pharmacy）", en: "dispensing (pharmacy)" },
		],
		questions: [
			{
				label: "問1",
				jp: "AとBに{共通|きょうつう}の{内容|ないよう}はどれか。",
				cn: "A 和 B 的共同点是哪一项？",
				en: "Which of the following is true of both A and B?",
				choices: [
					{ jp: "その{店|みせ}の{商品|しょうひん}{全部|ぜんぶ}に{使|つか}えるわけではない。", cn: "并不是该店的全部商品都能用。", en: "It cannot be used for every item in the store." },
					{ jp: "この{券|けん}はもらった{店|みせ}でしか{使|つか}えない。", cn: "这张券只能在拿到它的那家店使用。", en: "This coupon can only be used at the store where it was received." },
					{ jp: "この{券|けん}を{使|つか}えば{支払|しはら}いは{半額|はんがく}になる。", cn: "用这张券的话付款会变成半价。", en: "Using this coupon makes the payment half price." },
					{ jp: "その{店|みせ}によって{使|つか}えない{時間帯|じかんたい}がある。", cn: "根据店铺不同，有不能使用的时段。", en: "There are times of day when it cannot be used, depending on the store." },
				],
				answer: 1,
				explanation:
					"A 写明早餐时段不能用、也不能和其他优惠券并用；B 写明处方药、香烟、明信片等部分商品不能用。两边都不是「店里什么都能用」，所以 1 是共同点。2 不对：A 是全国 Berry's 各店都能用。3 只有 A 是 5 折，B 是 500 日元购物券。4 只有 A 限制了早餐时段。",
				explanationEn:
					"A cannot be used at breakfast and cannot be combined with other coupons; B cannot be used for some items such as dispensed medicine and tobacco. So neither coupon is valid for everything in the store, which makes 1 the shared point. 2 is wrong: A can be used at any Berry’s nationwide. 3 is only true of A (50% off); B is a ¥500 voucher. 4 is only true of A, which blocks breakfast hours.",
				choiceNotes: [
					"正确。A 有时段和并用限制，B 有商品限制，都不是全部商品都能用。",
					"A 可在全国 Berry's 各店使用，不是「拿到券的那一家」。",
					"只有 A 是半价；B 是定额 500 日元券。",
					"只有 A 写了早餐时段不能用；B 没有时段限制。",
				],
				choiceNotesEn: [
					"Correct. A has time-of-day and combination limits; B has item limits. Neither is valid for every product.",
					"A can be used at any Berry’s store nationwide, not only the shop where it was received.",
					"Only A is half price; B is a fixed ¥500 voucher.",
					"Only A blocks breakfast hours; B has no time-of-day restriction.",
				],
			},
			{
				label: "問2",
				jp: "{間違|まちが}っているものはどれか。",
				cn: "哪一项是错误的？",
				en: "Which of the following is incorrect?",
				choices: [
					{ jp: "Aの{券|けん}は{一人分|ひとりぶん}{一回|いっかい}だけ{有効|ゆうこう}である。", cn: "A 券每人每次只限一份有效。", en: "Coupon A is valid only once, for one person." },
					{ jp: "Bの{店|みせ}には{薬|くすり}{以外|いがい}の{商品|しょうひん}も{売|う}っている。", cn: "B 的店里也卖药以外的商品。", en: "Store B also sells items other than medicine." },
					{ jp: "どちらも{会計|かいけい}の{際|さい}に{券|けん}を{見|み}せればよい。", cn: "两张都只要在结账时出示即可。", en: "For both, it is enough to show the coupon when paying." },
					{ jp: "どちらも{有効期限|ゆうこうきげん}が{過|す}ぎれば{使|つか}えなくなる。", cn: "两张过了有效期都不能再用。", en: "Neither can be used after the expiry date." },
				],
				answer: 3,
				explanation:
					"A 写的是「ご注文の際、係の者にお渡しください」，必须在点餐时交券，不是结账时。B 没有写「会计时出示」。所以「どちらも会計の際に見せればよい」是错的，选 3。这正是本课要点：折扣券要看清「注文の際」还是「会計前に」。",
				explanationEn:
					"A says to hand the coupon to staff when you order, not when you pay. B does not say “show it at checkout.” So “for both, show it when paying” is false, which makes 3 the answer. That is the point of this lesson: check whether the coupon is for ordering or for paying.",
				choiceNotes: [
					"A 写着「お一人様1枚のみ有効」，与「一人分一回」相符。",
					"B 提到香烟、明信片、邮票、杂志，说明店里也卖药以外的东西。",
					"正确（这是错的那一项）。A 必须在点餐时交券。",
					"A、B 都印了有效期限，过期就不能用。",
				],
				choiceNotesEn: [
					"A says it is valid for one coupon per person, matching “once for one person.”",
					"B mentions tobacco, postcards, stamps, and magazines, so the store sells more than medicine.",
					"Correct as the false statement: A must be handed over when ordering.",
					"Both print an expiry date, after which they cannot be used.",
				],
			},
		],
	},

	vocab: [
		{ jp: "割引券", kana: "わりびきけん", cn: "折扣券", en: "discount coupon", pos: "名詞" },
		{ jp: "クーポン", cn: "优惠券", en: "coupon", pos: "名詞" },
		{ jp: "有効期限", kana: "ゆうこうきげん", cn: "有效期限", en: "expiry date; period of validity", pos: "名詞" },
		{ jp: "半額", kana: "はんがく", cn: "半价", en: "half price", pos: "名詞" },
		{ jp: "税込", kana: "ぜいこみ", cn: "含税", en: "tax included", pos: "名詞" },
		{ jp: "併用", kana: "へいよう", cn: "同时使用", en: "combined use", pos: "名詞・動詞" },
		{ jp: "全店", kana: "ぜんてん", cn: "全部门店", en: "all stores (in a chain)", pos: "名詞" },
		{ jp: "お一人様", kana: "おひとりさま", cn: "一位客人、每位", en: "per person", pos: "名詞" },
		{ jp: "注文", kana: "ちゅうもん", cn: "点餐、下单", en: "order", pos: "名詞・動詞" },
		{ jp: "会計", kana: "かいけい", cn: "结账", en: "paying the bill; checkout", pos: "名詞・動詞" },
		{ jp: "時間帯", kana: "じかんたい", cn: "时段", en: "time slot; hours", pos: "名詞" },
		{ jp: "調剤", kana: "ちょうざい", cn: "配药、调剂", en: "dispensing (medicine)", pos: "名詞" },
		{ jp: "期限", kana: "きげん", cn: "期限", en: "deadline; time limit", pos: "名詞" },
		{ jp: "過ぎる", kana: "すぎる", cn: "超过、过了", en: "to pass; to go beyond", pos: "動詞" },
	],

	grammar: [
		{
			pattern: "〜際（に）",
			formation: "名詞＋の際／動詞辞書形＋際",
			meaning: "在……的时候。比「〜とき」更正式，告示和券类常用。",
			meaningEn: "when / at the time of…. More formal than toki; common on notices and coupons.",
			example: {
				jp: "ご{注文|ちゅうもん}の{際|さい}、{係|かかり}の{者|もの}にお{渡|わた}しください。",
				cn: "点餐时请交给店员。",
				en: "Please hand it to a staff member when you order.",
			},
		},
		{
			pattern: "〜わけではない",
			formation: "普通形＋わけではない",
			meaning: "并不是……、并非全部……。用来部分否定。",
			meaningEn: "it is not the case that… / not entirely…. Used for partial negation.",
			example: {
				jp: "その{店|みせ}の{商品|しょうひん}{全部|ぜんぶ}に{使|つか}えるわけではない。",
				cn: "并不是该店的全部商品都能用。",
				en: "It is not the case that it can be used for every item in the store.",
			},
		},
	],
};
