import type { ReadingDay } from "./types";

// 第1週 3日目 案内③ — printed pages 16–17
export const w1d3: ReadingDay = {
	week: 1,
	day: 3,
	label: "案内③",
	labelKana: "あんない",
	labelEn: "Notices ③",
	printedPages: [16, 17],
	answerSource: "book",

	point: {
		title: "{意味|いみ}を{間違|まちが}えやすい{言葉|ことば}に{注意|ちゅうい}しよう！",
		titleCn: "注意容易理解错误的词汇！",
		titleEn: "Pay attention to tricky expressions!",
		figure: {
			alt: "「1000円割引だって！行こう！行こう！」と喜ぶ人と、「それ、ずっと前のチラシだよ。今は12月だよ！」と指摘する人。チラシには「1000円割引　9月末まで」と書かれている",
			cn: "一个人拿着传单高兴地说「打折 1000 日元！走走走！」，另一个人指出「那是很久以前的传单了，现在都 12 月了！」——传单上写着「1000 円割引　9 月末まで（9 月底截止）」。",
			en: "One person is excited—“It’s 1,000 yen off! Let’s go!”—while the other points out, “That’s an old flyer. It’s December now!” The flyer says “1,000 yen off until the end of September.”",
		},
		tips: [
			{
				jp: "「{以|い}」がつく{場合|ばあい}はその{前|まえ}の{数字|すうじ}を{含|ふく}みますが、「{未満|みまん}」がつく{場合|ばあい}はその{前|まえ}の{数字|すうじ}を{含|ふく}みません。",
				cn: "带「以」的说法包含前面那个数字；带「未満」的说法则不包含前面那个数字。",
				en: "Expressions with i (as in ijō / ika / inai) include the number before them; miman does not include that number.",
			},
			{
				jp: "{有効期限|ゆうこうきげん}にも{注意|ちゅうい}しよう。いつまでのサービスかを{必|かなら}ず{確|たし}かめること。",
				cn: "还要注意有效期限——一定要确认这项优惠到什么时候为止。",
				en: "Also watch the expiration date. Always check how long the offer lasts.",
			},
		],
		expressions: [
			{ jp: "チラシ", cn: "传单、广告单（发放或张贴在显眼处的宣传纸）", en: "a leaflet" },
			{ jp: "2000年以前", kana: "にせんねんいぜん", cn: "2000 年以前（含 2000 年）", en: "prior to year 2000" },
			{ jp: "4人以上のグループ", kana: "よにんいじょうのグループ", cn: "4 人以上的团体（含 4 人）", en: "a group of four or more" },
			{ jp: "14歳未満の少年", kana: "じゅうよんさいみまんのしょうねん", cn: "未满 14 岁的少年（不含 14 岁）", en: "boys under 14 years old" },
			{ jp: "5日以内", kana: "いつかいない", cn: "5 天以内（含第 5 天）", en: "within 5 days" },
			{ jp: "10時以後／以降", kana: "じゅうじいご／いこう", cn: "10 点以后（含 10 点）", en: "after 10 o'clock" },
			{ jp: "30歳以下の女性", kana: "さんじゅっさいいかのじょせい", cn: "30 岁以下的女性（含 30 岁）", en: "women 30 years old or under" },
			{ jp: "10周年記念", kana: "じゅっしゅうねんきねん", cn: "10 周年纪念", en: "the 10th anniversary" },
		],
		notes: [
			{
				jp: "「{以上|いじょう}・{以下|いか}・{以内|いない}・{以前|いぜん}・{以後|いご}」＝その{数字|すうじ}を{含|ふく}む／「{未満|みまん}」＝その{数字|すうじ}を{含|ふく}まない。",
				cn: "「以上・以下・以内・以前・以后」＝包含该数字；「未满」＝不包含该数字。这是读广告、招聘、优惠条件时最常见的陷阱。",
				en: "ijō / ika / inai / izen / igo include that number; miman does not. This is the most common trap in ads, job postings, and special offers.",
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
				speaker: "{父|ちち}",
				speakerCn: "父亲",
				speakerEn: "Father",
				jp: "このチラシに{書|か}いてある「レオン」って、{駅前|えきまえ}のレストランのことだよね。……ふーん、{今|いま}、10{周年記念|しゅうねんきねん}サービス{期間中|きかんちゅう}か。{明日|あした}、みんなで{行|い}こうか。",
				cn: "这张传单上写的「莱昂」，就是车站前那家餐厅吧。……嗯，现在正是 10 周年纪念优惠期间啊。明天大家一起去吧。",
				en: "The “Leon” on this flyer is the restaurant in front of the station, right? …Hmm, so they’re running a 10th-anniversary special now. Shall we all go tomorrow?",
			},
			{
				type: "speech",
				speaker: "{娘|むすめ}",
				speakerCn: "女儿",
				speakerEn: "Daughter",
				jp: "うん、{行|い}こう、{行|い}こう。5,000{円以上|えんいじょう}{食|た}べたら、1,000{円割引|えんわりびき}だし。あそこ、ワインがおいしいんでしょう。{今度|こんど}は{私|わたし}も{飲|の}もうかなあ。",
				cn: "嗯，去吧去吧。吃满 5,000 日元就减 1,000 日元呢。那家店的葡萄酒很好喝吧。这次我也喝点吧。",
				en: "Yeah, let’s go! If you eat 5,000 yen or more, you get 1,000 yen off. Their wine is good, isn’t it? Maybe I’ll have some this time too.",
			},
			{
				type: "speech",
				speaker: "{父|ちち}",
				speakerCn: "父亲",
				speakerEn: "Father",
				jp: "え？　おまえは、{二十歳未満|はたちみまん}なんだから、まだ{酒|さけ}はダメだよ。",
				cn: "咦？你还没到 20 岁呢，还不能喝酒。",
				en: "What? You’re under 20, so you still can’t drink.",
			},
		],
		choices: [
			{ jp: "{父|ちち}は「レオン」のある{場所|ばしょ}を{知|し}らない。", cn: "父亲不知道「莱昂」在哪里。", en: "The father does not know where Leon is." },
			{ jp: "「レオン」は10{年前|ねんまえ}に{開店|かいてん}した。", cn: "「莱昂」是 10 年前开业的。", en: "Leon opened 10 years ago." },
			{ jp: "{娘|むすめ}は「レオン」でワインを{飲|の}んだことがある。", cn: "女儿在「莱昂」喝过葡萄酒。", en: "The daughter has drunk wine at Leon before." },
			{ jp: "{利用金額|りようきんがく}がちょうど5,000{円|えん}の{場合|ばあい}は、1,000{円割引|えんわりびき}にならない。", cn: "消费金额正好 5,000 日元时，不能减 1,000 日元。", en: "If the bill is exactly 5,000 yen, you do not get the 1,000-yen discount." },
			{ jp: "{娘|むすめ}はまだ{二十歳|はたち}になっていない。", cn: "女儿还没满 20 岁。", en: "The daughter is not yet 20." },
		],
		answers: [2, 5],
		hint: {
			jp: "{日本|にほん}の{法律|ほうりつ}は、{二十歳未満|はたちみまん}の{人|ひと}が{酒|さけ}を{飲|の}むことを{禁|きん}じている。",
			cn: "日本法律禁止未满 20 岁的人饮酒。另外「5,000 円以上」包含 5,000 日元本身，所以刚好 5,000 日元也能打折。",
			en: "Japanese law forbids people under 20 from drinking. Also, 5,000-en ijō includes 5,000 yen itself, so a bill of exactly 5,000 yen still gets the discount.",
		},
	},

	mondai: {
		instruction: "{次|つぎ}のチラシを{読|よ}んで、{後|あと}の{問|と}いに{答|こた}えなさい。",
		instructionCn: "阅读下面的传单，回答后面的问题。（答案在别册 p.2）",
		instructionEn: "Read the flyer below and answer the questions that follow. (Answers are in the separate booklet, p. 2.)",
		blocks: [
			{ type: "line", jp: "5{月|がつ}15{日|にち}〜6{月|がつ}30{日|にち}", cn: "5 月 15 日〜6 月 30 日", en: "May 15–June 30", align: "center" },
			{
				type: "title",
				jp: "レオン",
				cn: "莱昂",
				en: "Leon",
				sub: { jp: "10{周年記念|しゅうねんきねん}サービス", cn: "10 周年纪念优惠", en: "10th-anniversary special" },
			},
			{ type: "note", jp: "ワインがおいしいレストラン", cn: "葡萄酒很棒的餐厅", en: "A restaurant known for its wine" },
			{
				type: "paragraph",
				jp: "おかげさまで、「レオン」はこの6{月|がつ}に{開店|かいてん}10{周年|しゅうねん}を{迎|むか}えます。みなさまに{感謝|かんしゃ}の{気持|きも}ちを{込|こ}めまして、{期間中|きかんちゅう}、{次|つぎ}のプレゼントをご{用意|ようい}してお{待|ま}ちしております！",
				cn: "承蒙关照，「莱昂」将在今年 6 月迎来开业 10 周年。为向各位表达感谢之情，活动期间我们准备了以下礼遇，恭候您的光临！",
				en: "Thanks to your support, Leon will mark its 10th anniversary this June. To show our gratitude, we have the following gifts ready for you during the campaign period. We look forward to seeing you!",
			},
			{
				type: "heading",
				jp: "その1　ご{利用金額|りようきんがく}より 1,000{円割引|えんわりびき}！",
				cn: "其一　消费金额立减 1,000 日元！",
				en: "Offer 1: 1,000 yen off your bill!",
			},
			{
				type: "line",
				jp: "（ただし、1グループ（※）で5,000{円以上|えんいじょう}のご{利用|りよう}の{場合|ばあい}）",
				cn: "（但限每组消费满 5,000 日元的情况）",
				en: "(However, only when one group (※) spends 5,000 yen or more)",
			},
			{
				type: "heading",
				jp: "その2　お{食事|しょくじ}をご{注文|ちゅうもん}のお{客様全員|きゃくさまぜんいん}にアイスクリームを！",
				cn: "其二　凡点用餐食的顾客全体赠送冰淇淋！",
				en: "Offer 2: Ice cream for every guest who orders a meal!",
			},
			{
				type: "paragraph",
				jp: "そのほか、{特別|とくべつ}メニューもご{用意|ようい}しております。この{機会|きかい}にぜひご{利用|りよう}ください。",
				cn: "此外还准备了特别菜单。敬请把握此次机会光临本店。",
				en: "We also have a special menu. Please take this opportunity to visit us.",
			},
			{
				type: "paragraph",
				jp: "なお、サービス{期間|きかん}に{関係|かんけい}なく、{一年中|いちねんじゅう}、{次|つぎ}のサービスを{行|おこな}っています。",
				cn: "另外，与优惠期间无关，本店全年提供以下服务。",
				en: "In addition, regardless of the campaign period, we offer the following services all year round.",
			},
			{
				type: "list",
				marker: "●",
				items: [
					{
						jp: "4{名様以上|めいさまいじょう}のグループでご{利用|りよう}の{場合|ばあい}、{全員|ぜんいん}にアイスクリームを！（お{食事|しょくじ}をご{注文|ちゅうもん}のお{客様|きゃくさま}に{限|かぎ}ります。）",
						cn: "4 位以上的团体光临时，全体赠送冰淇淋！（仅限点用餐食的顾客。）",
						en: "Groups of four or more get ice cream for everyone! (Only for guests who order a meal.)",
					},
					{ jp: "コーヒーはお{代|か}わり{自由|じゆう}＊です！", cn: "咖啡免费续杯＊！", en: "Free coffee refills＊!" },
				],
			},
			{ type: "line", jp: "TEL 045-XXX-XXXX", cn: "电话 045-XXX-XXXX", en: "Tel. 045-XXX-XXXX", align: "center" },
		],
		footnotes: [{ marker: "※", term: "1グループ", jp: "1 group", cn: "1 组、1 桌", en: "1 group / 1 table" }],
		pageNotes: [{ jp: "＊ free refills / bottomless cup", cn: "＊免费续杯", en: "free refills / bottomless cup" }],
		questions: [
			{
				label: "問1",
				jp: "アイスクリームのサービスが{受|う}けられるのはどの{場合|ばあい}か。",
				cn: "在哪种情况下可以享受冰淇淋的赠送服务？",
				en: "In which case can you get the free ice cream?",
				choices: [
					{ jp: "6{月|がつ}に1{人|ひとり}で{食事|しょくじ}した{場合|ばあい}", cn: "6 月一个人用餐", en: "Dining alone in June" },
					{ jp: "6{月|がつ}に4{人|にん}で{飲|の}み{物|もの}だけ{注文|ちゅうもん}した{場合|ばあい}", cn: "6 月 4 个人只点了饮料", en: "Four people ordering only drinks in June" },
					{ jp: "7{月|がつ}に1{人|ひとり}で{食事|しょくじ}した{場合|ばあい}", cn: "7 月一个人用餐", en: "Dining alone in July" },
					{ jp: "7{月|がつ}に4{人|にん}で{飲|の}み{物|もの}だけ{注文|ちゅうもん}した{場合|ばあい}", cn: "7 月 4 个人只点了饮料", en: "Four people ordering only drinks in July" },
				],
				answer: 1,
				explanation:
					"传单有两类优惠。纪念活动「その2」的条件是「お食事をご注文のお客様全員にアイスクリームを！」——期间内（5/15〜6/30）只要点了餐食，一个人也能拿到冰淇淋。6 月一个人用餐正好在期间内且点了餐食，所以 1 正确。全年服务那一条虽然不限期间，但要求「4 名様以上」并且「お食事をご注文のお客様に限ります」。",
				explanationEn:
					"There are two kinds of offer. Anniversary Offer 2 is “ice cream for every guest who orders a meal”—during the campaign (May 15–June 30), even one person who orders food gets ice cream. Dining alone in June is inside the period and includes a meal, so 1 is correct. The year-round offer is not limited to the campaign, but it requires four or more people and is only for guests who order a meal.",
				choiceNotes: [
					"正确。6 月在活动期间内，且点了餐食，符合「その2」。",
					"只点饮料不算「お食事をご注文」，两种优惠都拿不到。",
					"7 月已超出 5/15〜6/30 的活动期间，全年服务又要求 4 人以上，1 个人不符合。",
					"7 月虽然满足 4 人，但只点饮料，被「お食事をご注文のお客様に限ります」排除。",
				],
				choiceNotesEn: [
					"Correct. June is inside the campaign, and they ordered a meal, so Offer 2 applies.",
					"Drinks only do not count as “ordering a meal,” so neither offer applies.",
					"July is after the May 15–June 30 campaign, and the year-round offer needs four or more people, so one person does not qualify.",
					"July has four people, but drinks only are excluded by “only for guests who order a meal.”",
				],
			},
			{
				label: "問2",
				jp: "6{月|がつ}に2{人|ふたり}でこのレストランに{行|い}き、2{人合|ふたりあ}わせて5,000{円分飲食|えんぶんいんしょく}した{場合|ばあい}、{支払額|しはらいがく}はいくらになるか。",
				cn: "6 月两个人去这家餐厅，两人合计消费 5,000 日元时，需要支付多少钱？",
				en: "If two people go to this restaurant in June and spend 5,000 yen together, how much will they pay?",
				choices: [
					{ jp: "3,000{円|えん}", cn: "3,000 日元", en: "3,000 yen" },
					{ jp: "4,000{円|えん}", cn: "4,000 日元", en: "4,000 yen" },
					{ jp: "5,000{円|えん}", cn: "5,000 日元", en: "5,000 yen" },
					{ jp: "8,000{円|えん}", cn: "8,000 日元", en: "8,000 yen" },
				],
				answer: 2,
				explanation:
					"折扣条件是「1グループで5,000円以上のご利用の場合」。这里的「以上」包含 5,000 日元本身，所以刚好 5,000 日元也符合条件，可以减 1,000 日元：5,000 − 1,000 ＝ 4,000 日元。这正是本课要点——「以上」含本数，如果换成「5,000 円を超える」就不含了。",
				explanationEn:
					"The discount applies when “one group spends 5,000 yen or more.” ijō includes 5,000 yen itself, so exactly 5,000 yen still qualifies: 5,000 − 1,000 = 4,000 yen. That is the key point of this lesson—ijō includes the number; “more than 5,000 yen” would not.",
				choiceNotes: [
					"减免额是 1,000 日元，不是 2,000 日元。",
					"正确。5,000 − 1,000 ＝ 4,000 日元。",
					"「5,000 円以上」包含 5,000 日元，所以可以打折，不用付全额。",
					"折扣是减价，不是加价。",
				],
				choiceNotesEn: [
					"The discount is 1,000 yen, not 2,000 yen.",
					"Correct. 5,000 − 1,000 = 4,000 yen.",
					"5,000-en ijō includes 5,000 yen, so they do get the discount and do not pay the full amount.",
					"A discount reduces the price; it does not add to it.",
				],
			},
		],
	},

	vocab: [
		{ jp: "チラシ", cn: "传单、广告单", en: "flyer; leaflet", pos: "名詞" },
		{ jp: "割引", kana: "わりびき", cn: "折扣、减价", en: "discount; reduction", pos: "名詞" },
		{ jp: "以上", kana: "いじょう", cn: "以上（含本数）", en: "or more (including that number)", pos: "名詞" },
		{ jp: "以下", kana: "いか", cn: "以下（含本数）", en: "or less (including that number)", pos: "名詞" },
		{ jp: "以内", kana: "いない", cn: "以内（含本数）", en: "within (including that number)", pos: "名詞" },
		{ jp: "未満", kana: "みまん", cn: "未满（不含本数）", en: "under / less than (not including that number)", pos: "名詞" },
		{ jp: "周年記念", kana: "しゅうねんきねん", cn: "周年纪念", en: "anniversary", pos: "名詞" },
		{ jp: "開店", kana: "かいてん", cn: "开业、开门营业", en: "opening a shop; opening for business", pos: "名詞・動詞" },
		{ jp: "迎える", kana: "むかえる", cn: "迎接、迎来", en: "to welcome; to reach (a milestone)", pos: "動詞" },
		{ jp: "感謝", kana: "かんしゃ", cn: "感谢", en: "thanks; gratitude", pos: "名詞・動詞" },
		{ jp: "用意する", kana: "よういする", cn: "准备", en: "to prepare; to have ready", pos: "動詞" },
		{ jp: "注文する", kana: "ちゅうもんする", cn: "点（菜）、订购", en: "to order", pos: "動詞" },
		{ jp: "全員", kana: "ぜんいん", cn: "全体人员", en: "everyone; all members", pos: "名詞" },
		{ jp: "限る", kana: "かぎる", cn: "限于、仅限", en: "to limit; to be limited to", pos: "動詞" },
		{ jp: "お代わり自由", kana: "おかわりじゆう", cn: "免费续杯／续加", en: "free refills", pos: "表現" },
		{ jp: "利用金額", kana: "りようきんがく", cn: "消费金额", en: "amount spent", pos: "名詞" },
		{ jp: "支払額", kana: "しはらいがく", cn: "支付金额", en: "amount to pay", pos: "名詞" },
		{ jp: "二十歳", kana: "はたち", cn: "20 岁", en: "20 years old", pos: "名詞" },
		{ jp: "期間中", kana: "きかんちゅう", cn: "期间内", en: "during the period", pos: "名詞" },
	],

	grammar: [
		{
			pattern: "〜以上／〜以下／〜以内",
			meaning: "包含所提到的那个数字在内。「5,000 円以上」＝5,000 日元也算在内。",
			meaningEn: "Includes the number mentioned. 5,000-en ijō means 5,000 yen itself also counts.",
			example: { jp: "5,000{円以上|えんいじょう}のご{利用|りよう}の{場合|ばあい}", cn: "消费满 5,000 日元（含）的情况", en: "when you spend 5,000 yen or more" },
			note: "本课最大考点。要与「〜を超える（不含本数）」区分开。",
			noteEn: "The biggest test point in this lesson. Contrast it with o koeru, which does not include the number.",
		},
		{
			pattern: "〜未満",
			meaning: "不满……、不到……。不包含所提到的那个数字。",
			meaningEn: "under… / less than…. Does not include the number mentioned.",
			example: { jp: "おまえは、{二十歳未満|はたちみまん}なんだから", cn: "因为你还未满 20 岁", en: "because you’re under 20" },
		},
		{
			pattern: "〜に{限|かぎ}ります",
			formation: "名詞 ＋ に限ります",
			meaning: "仅限……。广告、通知里用来加上限制条件。",
			meaningEn: "limited to…. Used in ads and notices to add a restriction.",
			example: {
				jp: "お{食事|しょくじ}をご{注文|ちゅうもん}のお{客様|きゃくさま}に{限|かぎ}ります。",
				cn: "仅限点用餐食的顾客。",
				en: "Limited to guests who order a meal.",
			},
		},
		{
			pattern: "〜に{関係|かんけい}なく",
			formation: "名詞 ＋ に関係なく",
			meaning: "与……无关、不论……。",
			meaningEn: "regardless of… / irrespective of….",
			example: { jp: "サービス{期間|きかん}に{関係|かんけい}なく、{一年中|いちねんじゅう}", cn: "与优惠期间无关，全年……", en: "regardless of the campaign period, all year round" },
		},
		{
			pattern: "ご〜します／お〜します（謙譲語）",
			meaning: "自谦表达，商家对顾客说话时的固定用法。",
			meaningEn: "Humble language. A set pattern shops use when speaking to customers.",
			example: {
				jp: "{次|つぎ}のプレゼントをご{用意|ようい}してお{待|ま}ちしております。",
				cn: "我们准备了以下礼遇，恭候您的光临。",
				en: "We have the following gifts ready and look forward to seeing you.",
			},
		},
		{
			pattern: "〜たら",
			formation: "動詞た形 ＋ ら",
			meaning: "如果……的话。表示条件。",
			meaningEn: "if… / when…. Expresses a condition.",
			example: { jp: "5,000{円以上|えんいじょう}{食|た}べたら、1,000{円割引|えんわりびき}", cn: "吃满 5,000 日元的话，就减 1,000 日元", en: "If you eat 5,000 yen or more, you get 1,000 yen off." },
		},
	],
};
