import type { ReadingDay } from "./types";

// 第4週 4日目 広告① — printed pages 66–67
export const w4d4: ReadingDay = {
	week: 4,
	day: 4,
	label: "広告①",
	labelKana: "こうこく",
	labelEn: "Advertisements ①",
	printedPages: [66, 67],
	answerSource: "book",

	point: {
		title: "{必要|ひつよう}な{情報|じょうほう}をさがそう！",
		titleCn: "来寻找必要的信息吧！",
		titleEn: "Find the necessary information!",
		figure: {
			alt: "「京都の寺めぐり ￥10,000円！ 大人1名2食付／3歳以下無料／ホテル京都」という広告と、「3歳以下無料…ボクは何歳？」ととまどうキャラクター",
			cn: "写着「京都寺庙巡礼 ￥10,000日元！成人1名含2餐／3岁以下免费／京都酒店」的广告，以及一个困惑地说「3岁以下免费……我几岁？」的角色",
			en: "An ad: “Kyoto temple tour ¥10,000! 1 adult, 2 meals included / under 3 free / Hotel Kyoto,” and a puzzled character saying, “Under 3 free … how old am I again?”",
		},
		tips: [
			{
				jp: "{必要|ひつよう}な{情報|じょうほう}が{小|ちい}さく{書|か}かれているかもしれないので{注意|ちゅうい}しましょう。",
				cn: "必要的信息可能用很小的字写着，所以要注意。",
				en: "The information you need may be written in small type in a corner — watch for it. The small print after tadashi or ＊ is often the answer.",
			},
		],
		expressions: [
			{ jp: "2食付き", kana: "にしょくつき", cn: "附带 2 餐", en: "2 meals included" },
			{ jp: "食べ放題", kana: "たべほうだい", cn: "自助餐、随便吃", en: "all-you-can-eat" },
			{ jp: "飲み放題", kana: "のみほうだい", cn: "无限畅饮", en: "all-you-can-drink" },
			{ jp: "2,000円増し", kana: "まし", cn: "加收 2,000 日元", en: "an extra 2,000 yen" },
			{ jp: "消費税込み", kana: "しょうひぜいこみ", cn: "含消费税", en: "consumption tax included" },
			{ jp: "サービス料込み", kana: "サービスりょうこみ", cn: "含服务费", en: "service charge included" },
			{ jp: "3歳以下", kana: "さんさいいか", cn: "3 岁以下（含 3 岁）", en: "3 years old and under" },
			{ jp: "〜名", kana: "めい", cn: "〜位（＝〜人）", en: "(counter for people)" },
			{ jp: "なんと", cn: "竟然；真是（表示惊讶）", en: "an expression of surprise — 'Wow! Look at this!'" },
			{ jp: "ただし", cn: "但是、不过（表示条件或例外）", en: "however / provided that" },
		],
	},

	renshu: {
		instruction: "{次|つぎ}の{会話文|かいわぶん}を{読|よ}んで、{後|あと}の{文|ぶん}から{正|ただ}しいものを{選|えら}ぼう。",
		instructionCn: "阅读下面的会话文，从后面的句子中把正确的选出来吧。",
		instructionEn: "Read the dialogue below and choose the correct statements from the sentences that follow. (Answers are on the next page.)",
		blocks: [
			{
				type: "speech",
				speaker: "{妻|つま}",
				speakerCn: "妻子",
				speakerEn: "Wife",
				jp: "ねえ、この{新聞|しんぶん}の{広告見|こうこくみ}て。{今度|こんど}の{休|やす}みに{行|い}かない？",
				cn: "哎，看看这张报纸上的广告。下次休假不去吗？",
				en: "Hey, look at this newspaper ad. Shall we go on our next day off?",
			},
			{
				type: "speech",
				speaker: "{夫|おっと}",
				speakerCn: "丈夫",
				speakerEn: "Husband",
				jp: "どれどれ……うーん、まだ{暑|あつ}いのに{温泉旅行|おんせんりょこう}かぁ。",
				cn: "我看看……嗯，天还这么热，却要去温泉旅行啊。",
				en: "Let’s see … hmm, a hot-spring trip while it’s still this hot?",
			},
			{
				type: "speech",
				speaker: "{妻|つま}",
				speakerCn: "妻子",
				speakerEn: "Wife",
				jp: "いいじゃない。{安|やす}いんだもん。2{食付|しょくつ}きで、3{歳以下|さいいか}は{無料|むりょう}だから{菜々|なな}の{分|ぶん}はかからないし。それに、おすしが{食|た}べ{放題|ほうだい}だって！",
				cn: "不是挺好的吗。因为便宜嘛。含两餐，3岁以下免费，所以菜菜的份不用花钱。而且，说是寿司能吃到饱呢！",
				en: "Why not? It’s cheap. Two meals are included, and under 3 is free, so Nana’s share costs nothing. Plus it’s all-you-can-eat sushi!",
			},
			{
				type: "speech",
				speaker: "{夫|おっと}",
				speakerCn: "丈夫",
				speakerEn: "Husband",
				jp: "うーん、すしねえ。あ、9{月|がつ}8{日|か}は2,000{円増|えんま}しって{書|か}いてあるよ。ということは、1{人|にん}1{泊|ぱく}で1{万円|まんえん}になる。この{旅館|りょかん}、{安|やす}くないと{思|おも}うけど。",
				cn: "嗯，寿司啊。啊，写着9月8日加收2,000日元哦。也就是说，一人一晚就变成1万日元。这家旅馆，我觉得并不便宜啊。",
				en: "Hmm, sushi … ah, it says September 8 is an extra 2,000 yen. That means 10,000 yen per person per night. I don’t think this inn is cheap.",
			},
		],
		choices: [
			{ jp: "{夫|おっと}は、{温泉旅行|おんせんりょこう}をしたがっている。", cn: "丈夫想去温泉旅行。", en: "The husband wants to go on a hot-spring trip." },
			{ jp: "この{広告|こうこく}には1{泊|ぱく}2{食付|しょくつ}きで8,000{円|えん}と{書|か}いてある。", cn: "这则广告上写着1晚含2餐8,000日元。", en: "This ad says 8,000 yen for one night with two meals." },
			{ jp: "{菜々|なな}の{分|ぶん}も{少|すこ}しだけ{払|はら}わなければならない。", cn: "菜菜的份也必须付一点点钱。", en: "They still have to pay a little for Nana." },
			{ jp: "{妻|つま}はすしの{食|た}べ{放題|ほうだい}には{興味|きょうみ}がない。", cn: "妻子对寿司吃到饱没有兴趣。", en: "The wife is not interested in the all-you-can-eat sushi." },
			{ jp: "9{月|がつ}8{日|か}の{場合|ばあい}、1{人|にん}につき2,000{円|えん}ずつ{多|おお}くなる。", cn: "9月8日的情况下，每人各增加2,000日元。", en: "On September 8, it costs 2,000 yen extra per person." },
		],
		answers: [2, 5],
		hint: {
			jp: "「1{人|にん}1{泊|ぱく}で1{万円|まんえん}になる」＝8,000{円|えん}＋2,000{円|えん}。3{歳以下無料|さいいかむりょう}なので{菜々|なな}は0{円|えん}。",
			cn: "「1人1泊で1万円になる」＝8,000円＋2,000円（「一人一晚就变成1万日元」＝8,000日元＋2,000日元）。3歳以下無料なので菜々は0円（因为3岁以下免费，所以菜菜是0日元）。",
			en: "He says “it comes to 10,000 yen per person per night,” so the base price is 8,000 plus a 2,000 surcharge. Under 3 is free, so Nana costs nothing. The husband does not really want to go; the wife is the one excited about the sushi.",
		},
	},

	mondai: {
		instruction: "{次|つぎ}の{広告|こうこく}を{見|み}て、{後|あと}の{問|と}いに{答|こた}えなさい。",
		instructionCn: "请看下面的广告，回答后面的问题。",
		instructionEn: "Look at the advertisement below and answer the questions that follow. (Answers are in the separate booklet, p. 5.)",
		blocks: [
			{ type: "title", jp: "くりこま{高原|こうげん}　{天然|てんねん}の{温泉|おんせん}＊", cn: "栗驹高原　天然温泉＊", en: "Kurikoma Highlands  Natural hot spring＊" },
			{ type: "note", jp: "なんと{土曜日|どようび}も{同料金|どうりょうきん}！", cn: "竟然连星期六也是同样的费用！", en: "And Saturdays are the same price!" },
			{ type: "title", jp: "すし{食|た}べ{放題|ほうだい}!!　8,000{円|えん}", cn: "寿司吃到饱!!　8,000日元", en: "All-you-can-eat sushi!!  8,000 yen" },
			{ type: "line", jp: "（{消費税|しょうひぜい}・サービス{料込|りょうこ}み）", cn: "（含消费税・服务费）", en: "(consumption tax and service charge included)", align: "center" },
			{ type: "heading", jp: "お{一人様|ひとりさま}1{泊|ぱく}2{食付|しょくつき}", cn: "每位1晚含2餐", en: "Per person  1 night, 2 meals included" },
			{
				type: "line",
				jp: "ただし{大人|おとな}1{室|しつ}2{名様以上|めいさまいじょう}でご{利用|りよう}の{場合|ばあい}",
				cn: "但是，在成人1室2位以上使用的情况下",
				en: "However, only when 2 or more adults share a room",
			},
			{
				type: "list",
				marker: "＊",
				items: [
					{ jp: "9{月|がつ}7{日|か}、8{日|か}は2,000{円増|えんま}し", cn: "9月7日、8日加收2,000日元", en: "September 7 and 8: an extra 2,000 yen" },
					{
						jp: "{小学生以下|しょうがくせいいか}のお{子様半額|こさまはんがく}　3{歳以下無料|さいいかむりょう}",
						cn: "小学生以下的儿童半价　3岁以下免费",
						en: "Children of elementary-school age and under: half price. Age 3 and under: free",
					},
				],
			},
			{ type: "line", jp: "ふじ{旅館|りょかん}（{全室和室|ぜんしつわしつ}）　0551-33-XXXX", cn: "富士旅馆（全室和室）　0551-33-XXXX", en: "Fuji Inn (all Japanese-style rooms)  0551-33-XXXX" },
			{ type: "line", jp: "{東京予約|とうきょうよやく}センター　TEL 03-3333-XXXX", cn: "东京预订中心　TEL 03-3333-XXXX", en: "Tokyo Reservation Center  TEL 03-3333-XXXX", align: "center" },
		],
		pageNotes: [{ jp: "＊ Natural Hot Spring", cn: "＊天然温泉", en: "＊ Natural Hot Spring" }],
		questions: [
			{
				label: "問1",
				jp: "9{月|がつ}8{日|か}に{夫婦|ふうふ}2{人|ふたり}と3{歳|さい}の{子|こ}ども1{人|ひとり}で{行|い}く{場合|ばあい}、1{泊|ぱく}いくらになるか。",
				cn: "9月8日夫妻2人和1个3岁孩子一起去的情况下，住1晚要多少钱？",
				en: "If a couple and one 3-year-old stay one night on September 8, how much will it cost?",
				choices: [
					{ jp: "16,000{円|えん}", cn: "16,000日元", en: "16,000 yen" },
					{ jp: "20,000{円|えん}", cn: "20,000日元", en: "20,000 yen" },
					{ jp: "22,000{円|えん}", cn: "22,000日元", en: "22,000 yen" },
					{ jp: "25,000{円|えん}", cn: "25,000日元", en: "25,000 yen" },
				],
				answer: 2,
				explanation:
					"分三步算。①基本价：成人 8,000 日元 × 2 人 ＝ 16,000 日元。②加价：9 月 7、8 日「2,000円増し」是按人加的，成人 2 人 → ＋4,000 日元。③孩子：3 岁属于「3歳以下無料」，免费。合计 16,000 ＋ 4,000 ＝ 20,000 日元。注意价格已含消费税和服务费，不用再加。",
				explanationEn:
					"Work it in three steps. ① Base price: 8,000 yen × 2 adults = 16,000 yen. ② Surcharge: September 7 and 8 add 2,000 yen per person, so 2 adults → +4,000 yen. ③ Child: age 3 is “3 and under free.” Total 16,000 + 4,000 = 20,000 yen. Tax and service charge are already included, so do not add more.",
				choiceNotes: [
					"漏算了 9 月 8 日每人加收的 2,000 日元。",
					"正确。8,000×2 ＋ 2,000×2 ＝ 20,000 日元，孩子免费。",
					"多算了孩子的加价——3 岁免费，不产生任何费用。",
					"把 3 岁孩子按半价（4,000 日元）算了，但广告写的是「3歳以下無料」。",
				],
				choiceNotesEn: [
					"Misses the extra 2,000 yen per person on September 8.",
					"Correct. 8,000 × 2 + 2,000 × 2 = 20,000 yen; the child is free.",
					"Adds a surcharge for the child — age 3 is free and generates no charge.",
					"Counts the 3-year-old at half price (4,000 yen), but the ad says “3 and under free.”",
				],
			},
			{
				label: "問2",
				jp: "この{広告|こうこく}で{値段|ねだん}がわからないのはどれか。",
				cn: "根据这则广告，无法知道价格的是哪一个？",
				en: "Which of the following prices cannot be known from this ad?",
				choices: [
					{ jp: "ひとつの{部屋|へや}に{大人|おとな}1{人|にん}で{泊|と}まる{場合|ばあい}", cn: "1名成人单独住一个房间的情况", en: "one adult staying alone in a room" },
					{ jp: "{家族|かぞく}3{人|にん}がすしを2{人前|にんまえ}ずつ{食|た}べた{場合|ばあい}", cn: "一家3口每人各吃了2人份寿司的情况", en: "a family of three each eating two portions of sushi" },
					{
						jp: "9{月|がつ}12{日|にち}に{大人|おとな}2{人|ふたり}と{小学生|しょうがくせい}の{子|こ}ども2{人|ふたり}で{行|い}く{場合|ばあい}",
						cn: "9月12日成人2人和2个小学生孩子一起去的情况",
						en: "two adults and two elementary-school children going on September 12",
					},
					{ jp: "{土曜日|どようび}に{大人|おとな}2{人|ふたり}と2{歳|さい}の{子|こ}ども1{人|ひとり}で{行|い}く{場合|ばあい}", cn: "星期六成人2人和1个2岁孩子一起去的情况", en: "two adults and one 2-year-old going on a Saturday" },
				],
				answer: 1,
				explanation:
					"8,000 日元这个价格有一个小字条件：「ただし大人1室2名様以上でご利用の場合」——必须是 2 位成人同住一间才适用。一个人住一间不符合这个条件，广告里也没写单人住的价格，所以无法得知，1 正确。这正是本课要点：小字里的条件才是关键。",
				explanationEn:
					"The 8,000-yen price has a small-print condition: “however, only when 2 or more adults share a room.” One adult in a room does not meet that condition, and the ad never states a single-occupancy price, so it cannot be known. Choice 1 is correct. That is this lesson’s point: the condition in the small print is the key.",
				choiceNotes: [
					"正确（＝无法得知）。「大人1室2名様以上」是适用 8,000 日元的前提条件。",
					"寿司是「食べ放題」，吃多少都不影响价格，所以可以算出。",
					"9 月 12 日不是加价日；成人 8,000×2 ＋ 小学生半价 4,000×2 ＝ 24,000 日元，可以算出。",
					"「なんと土曜日も同料金！」——星期六不加价；成人 8,000×2 ＋ 2 岁免费 ＝ 16,000 日元，可以算出。",
				],
				choiceNotesEn: [
					"Correct (= cannot be known). “2 or more adults per room” is the condition for the 8,000-yen price.",
					"The sushi is all-you-can-eat, so how much they eat does not change the price — it can be calculated.",
					"September 12 is not a surcharge day; 8,000 × 2 adults + 4,000 × 2 children = 24,000 yen — it can be calculated.",
					"“Saturdays are the same price!” — no surcharge; 8,000 × 2 + a free 2-year-old = 16,000 yen — it can be calculated.",
				],
			},
		],
	},

	vocab: [
		{ jp: "広告", kana: "こうこく", cn: "广告", en: "advertisement", pos: "名詞" },
		{ jp: "情報", kana: "じょうほう", cn: "信息", en: "information", pos: "名詞" },
		{ jp: "高原", kana: "こうげん", cn: "高原", en: "highlands / plateau", pos: "名詞" },
		{ jp: "天然", kana: "てんねん", cn: "天然", en: "natural", pos: "名詞" },
		{ jp: "温泉", kana: "おんせん", cn: "温泉", en: "hot spring", pos: "名詞" },
		{ jp: "食べ放題", kana: "たべほうだい", cn: "随便吃、自助", en: "all-you-can-eat", pos: "名詞" },
		{ jp: "消費税", kana: "しょうひぜい", cn: "消费税", en: "consumption tax", pos: "名詞" },
		{ jp: "〜込み", kana: "こみ", cn: "含〜（在内）", en: "… included", pos: "接尾語" },
		{ jp: "〜増し", kana: "まし", cn: "加收〜", en: "an extra …", pos: "接尾語" },
		{ jp: "半額", kana: "はんがく", cn: "半价", en: "half price", pos: "名詞" },
		{ jp: "無料", kana: "むりょう", cn: "免费", en: "free of charge", pos: "名詞" },
		{ jp: "旅館", kana: "りょかん", cn: "旅馆", en: "Japanese inn", pos: "名詞" },
		{ jp: "和室", kana: "わしつ", cn: "和式房间", en: "Japanese-style room", pos: "名詞" },
		{ jp: "予約", kana: "よやく", cn: "预订", en: "reservation", pos: "名詞・動詞" },
		{ jp: "〜人前", kana: "にんまえ", cn: "〜人份", en: "portion(s) for … people", pos: "助数詞" },
		{ jp: "興味", kana: "きょうみ", cn: "兴趣", en: "interest", pos: "名詞" },
		{ jp: "同料金", kana: "どうりょうきん", cn: "同样的价格", en: "the same rate", pos: "名詞" },
	],

	grammar: [
		{
			pattern: "ただし〜場合",
			meaning: "但限于……的情况。广告里用来附加限制条件，往往写成小字——本课最大考点。",
			meaningEn: "However, only in the case of …. Used in ads to add a restriction, often in small print — this lesson’s biggest test point.",
			example: {
				jp: "ただし{大人|おとな}1{室|しつ}2{名様以上|めいさまいじょう}でご{利用|りよう}の{場合|ばあい}",
				cn: "但是，在成人1室2位以上使用的情况下",
				en: "however, only when 2 or more adults share a room",
			},
		},
		{
			pattern: "〜放題",
			formation: "動詞ます形 ＋ 放題",
			meaning: "随便……、无限制地……。食べ放題／飲み放題／使い放題。",
			meaningEn: "As much as you like / unlimited …. Tabe-hōdai / nomi-hōdai / tsukai-hōdai.",
			example: { jp: "すし{食|た}べ{放題|ほうだい}!!", cn: "寿司吃到饱!!", en: "All-you-can-eat sushi!!" },
		},
		{
			pattern: "〜込み／〜付き",
			meaning: "「込み」＝已包含在内；「付き」＝附带。价格表示的两个关键词。",
			meaningEn: "Komi = already included; tsuki = comes with. Two key words in price wording.",
			example: { jp: "（{消費税|しょうひぜい}・サービス{料込|りょうこ}み）／1{泊|ぱく}2{食付|しょくつき}", cn: "（含消费税・服务费）／1晚含2餐", en: "(tax and service included) / 1 night, 2 meals included" },
		},
		{
			pattern: "〜増し",
			meaning: "加收……。「2,000円増し」＝在原价基础上每人加 2,000 日元。",
			meaningEn: "An extra …. “2,000-en mashi” = 2,000 yen added to the base price per person.",
			example: { jp: "9{月|がつ}7{日|か}、8{日|か}は2,000{円増|えんま}し", cn: "9月7日、8日加收2,000日元", en: "September 7 and 8: an extra 2,000 yen" },
		},
		{
			pattern: "〜たがる",
			formation: "動詞ます形 ＋ たがる",
			meaning: "（第三人称）想要……。表示别人的愿望。",
			meaningEn: "(Third person) wants to …. Used for someone else’s wish.",
			example: { jp: "{夫|おっと}は、{温泉旅行|おんせんりょこう}をしたがっている。", cn: "丈夫想去温泉旅行。", en: "The husband wants to go on a hot-spring trip." },
		},
		{
			pattern: "〜につき",
			formation: "名詞 ＋ につき",
			meaning: "每……。表示单位。",
			meaningEn: "Per …. Marks the unit.",
			example: { jp: "1{人|にん}につき2,000{円|えん}ずつ{多|おお}くなる", cn: "每人各增加2,000日元", en: "2,000 yen extra per person" },
		},
		{
			pattern: "〜んだもん",
			meaning: "因为……嘛。口语，带撒娇或辩解的语气。",
			meaningEn: "Because …, you know. Spoken, with a wheedling or justifying tone.",
			example: { jp: "いいじゃない。{安|やす}いんだもん。", cn: "不是挺好的吗。因为便宜嘛。", en: "Why not? It’s cheap." },
		},
	],
};
