import type { ReadingDay } from "../reading-n3/types";

// 第5週 2日目 見出し② — printed pages 80–81
export const w5d2: ReadingDay = {
	week: 5,
	day: 2,
	label: "見出し②",
	labelKana: "みだし",
	labelEn: "Headlines ②",
	printedPages: [80, 81],
	answerSource: "book",

	point: {
		title: "{助詞|じょし}に{注意|ちゅうい}して{文|ぶん}の{意味|いみ}を{予想|よそう}しよう！",
		titleCn: "猜测句子的含义时要注意助词的用法！",
		titleEn: "Let’s guess the meaning of the sentences by paying attention to the particles!",
		figure: {
			alt: "「助詞から動詞を推測しよう！」と呼びかけるキャラクター",
			cn: "角色喊：「从助词来推测动词吧！」",
			en: "A character saying, “Guess the verb from the particle!”",
		},
		tips: [
			{
				jp: "{例えば|たとえば}こんなふうに{助詞|じょし}で{終|お}わる{見出|みだ}しも{多|おお}いです。{助詞|じょし}を{見|み}て{省略|しょうりゃく}された{動詞|どうし}を{補|おぎな}う。",
				cn: "不少标题就停在助词上。看见助词，把被省略的动词补出来。",
				en: "Many headlines even end on a particle. Look at the particle and fill in the omitted verb.",
			},
			{
				jp: "【{見出|みだ}し】{製品事故|せいひんじこ} {安全基準|あんぜんきじゅん}{見直|みなお}しも\n→ {安全基準|あんぜんきじゅん}の{見直|みなお}しも{検討|けんとう}されている。",
				cn: "【标题】产品事故 安全标准也要重新审视\n→ 是否重新审视安全标准，也正在讨论。",
				en: "[Headline] Product accident — safety standards also to be reviewed\n→ A revision of the safety standards is also being considered.",
			},
			{
				jp: "【{見出|みだ}し】ABCカンパニー{会長|かいちょう} {退任|たいにん}へ\n→ {退任|たいにん}という{方向|ほうこう}へ{動|うご}いている。",
				cn: "【标题】ABC 公司会长 将辞职\n→ 正朝着辞职的方向发展。",
				en: "[Headline] ABC Company chairman — toward resignation\n→ Things are moving in the direction of his resigning.",
			},
			{
				jp: "【{見出|みだ}し】{経済|けいざい} {他国|たこく}よりも{国内救済|こくないきゅうさい}を\n→ {他|ほか}の{国|くに}よりも{国内経済|こくないけいざい}の{救済|きゅうさい}をすべきだ。",
				cn: "【标题】经济 与其救他国不如救国内\n→ 与其救济其他国家，更应该救济国内经济。",
				en: "[Headline] Economy — rescue the domestic (economy) rather than other countries\n→ The domestic economy should be saved rather than those of other countries.",
			},
		],
		expressions: [
			{ jp: "〜も", cn: "也……（标题里常暗示「也在讨论／也有可能」）", en: "also… (in headlines, often “is also being considered”)" },
			{ jp: "〜へ", cn: "朝着……（标题里常省略「向かっている」）", en: "toward… (the verb “is heading” is dropped)" },
			{ jp: "〜を", cn: "要……（标题里常省略「すべきだ／求める」）", en: "… (the verb “should / we call for” is dropped)" },
			{ jp: "見直し", kana: "みなおし", cn: "重新审视、修订", en: "review; revision" },
			{ jp: "退任", kana: "たいにん", cn: "卸任、辞职", en: "resignation from a post" },
			{ jp: "救済", kana: "きゅうさい", cn: "救济、救助", en: "rescue; relief" },
			{ jp: "検討される", kana: "けんとうされる", cn: "被讨论、在研究", en: "to be considered / discussed" },
		],
	},

	renshu: {
		instruction: "{次|つぎ}の{会話文|かいわぶん}を{読|よ}んで、{後|あと}の{文|ぶん}から{正|ただ}しいものを{選|えら}ぼう。",
		instructionCn: "阅读下面的对话，从后面的句子中选出正确的。（答案在下一页）",
		instructionEn: "Read the conversation below and choose the correct statements from the sentences that follow. (Answers are on the next page.)",
		blocks: [
			{
				type: "speech",
				speaker: "{客|きゃく}",
				speakerCn: "顾客",
				speakerEn: "Customer",
				jp: "あら、もうお{中元|ちゅうげん}の{商品|しょうひん}が{並|なら}んでるのね。",
				cn: "哎呀，中元节的商品都已经摆出来了呢。",
				en: "Oh, the midyear-gift goods are already on display.",
			},
			{
				type: "speech",
				speaker: "{店員|てんいん}",
				speakerCn: "店员",
				speakerEn: "Clerk",
				jp: "いらっしゃいませ。{今年|ことし}は「エコ」をテーマに{当店|とうてん}でしかお{求|もと}めになれないギフトをご{用意|ようい}させていただいております。ぜひ、ご{利用|りよう}くださいませ。",
				cn: "欢迎光临。今年以「环保」为主题，准备了只有本店才能买到的礼品。请务必看看。",
				en: "Welcome. This year, on an “eco” theme, we have prepared gifts you can only get at this store. Please do take a look.",
			},
			{
				type: "speech",
				speaker: "{客|きゃく}",
				speakerCn: "顾客",
				speakerEn: "Customer",
				jp: "エコだなんて、{安|やす}いものという{感|かん}じがしない？　{贈|おく}り{物|もの}としてどうかしら……。",
				cn: "说是环保，听着会不会像便宜货？当礼物送合适吗……",
				en: "“Eco” sounds a bit like “cheap,” doesn’t it? I’m not sure about it as a gift…",
			},
			{
				type: "speech",
				speaker: "{店員|てんいん}",
				speakerCn: "店员",
				speakerEn: "Clerk",
				jp: "エコと{申|もう}しますのは、{環境|かんきょう}に{配慮|はいりょ}し（{注|ちゅう}1）、また{産地|さんち}や{素材|そざい}（{注|ちゅう}2）、{製法|せいほう}などが{特別|とくべつ}なもの、という意味でございまして、{手間|てま}をかけた（{注|ちゅう}3）{当店自慢|とうてんじまん}の{商品|しょうひん}でもございまして、{贈|おく}り{主様|ぬしさま}の{意識|いしき}の{高|たか}さが{相手様|あいてさま}に{伝|つた}わることと{存|ぞん}じます。",
				cn: "所谓环保，指的是顾及环境，并且产地、材料、制法都特别；也是花费了工夫的本店得意之作，能把送礼人品味之高传达给对方。",
				en: "By “eco” we mean care for the environment, and also that the origin, materials, and production method are special. These are time-consuming products this store is proud of, and they will convey the giver’s high awareness to the recipient.",
			},
		],
		footnotes: [
			{ marker: "（注1）", term: "配慮する", jp: "to give some considerations", cn: "顾及、关照", en: "to give consideration to" },
			{ marker: "（注2）", term: "素材", jp: "materials/ingredients", cn: "材料、素材", en: "materials / ingredients" },
			{ marker: "（注3）", term: "手間をかける", jp: "to spend more time and effort", cn: "花费工夫、费事", en: "to spend time and effort" },
		],
		choices: [
			{ jp: "エコというのはエコノミー、すなわち{経済的|けいざいてき}だという意味だ。", cn: "所谓环保就是 economy，也就是经济实惠的意思。", en: "“Eco” means economy, that is, being inexpensive." },
			{ jp: "エコというのは{環境|かんきょう}に{配慮|はいりょ}するという意味だ。", cn: "所谓环保是顾及环境的意思。", en: "“Eco” means giving consideration to the environment." },
			{ jp: "エコをテーマにした{商品|しょうひん}はどこでも{買|か}うことができる。", cn: "以环保为主题的商品在哪里都能买到。", en: "Eco-themed products can be bought anywhere." },
			{ jp: "この{店|みせ}では{今年|ことし}は「エコ」をテーマにしたギフトを{用意|ようい}している。", cn: "这家店今年准备了以「环保」为主题的礼品。", en: "This store has prepared eco-themed gifts this year." },
			{ jp: "この{店|みせ}では{素材|そざい}や{製法|せいほう}にかかる{費用|ひよう}をおさえて{商品|しょうひん}を{買|か}いやすい{値段|ねだん}にしている。", cn: "这家店压缩了材料和制法的费用，把商品定价得容易买。", en: "This store has held down the cost of materials and production methods so the goods are cheap." },
		],
		answers: [2, 4],
	},

	mondai: {
		instruction: "{次|つぎ}の{新聞記事|しんぶんきじ}を{読|よ}んで、{後|あと}の{問|と}いに{答|こた}えなさい。",
		instructionCn: "阅读下面的新闻报道，回答后面的问题。（答案在别册 p.6）",
		instructionEn: "Read the newspaper article below and answer the questions that follow. (Answers are in the separate booklet, p. 6.)",
		blocks: [
			{
				type: "title",
				jp: "お{中元|ちゅうげん}もエコを{主力|しゅりょく}に",
				cn: "中元礼品也主打环保",
				en: "Midyear gifts, too, go eco as the main line",
				sub: {
					jp: "{有機農法|ゆうきのうほう}{飲料|いんりょう}など{続々|ぞくぞく}と",
					cn: "有机农法饮料等纷纷上市",
					en: "Organic-farming drinks and more, one after another",
				},
			},
			{
				type: "paragraph",
				jp: "お{中元|ちゅうげん}{商戦|しょうせん}を{目前|もくぜん}に、{百貨店|ひゃっかてん}の○○と△△は{目玉商品|めだましょうひん}を{公開|こうかい}した。{両百貨店|りょうひゃっかてん}とも、「エコ」をテーマに{商品|しょうひん}を{並|なら}べ、{産地|さんち}や{素材|そざい}へのこだわり（{注|ちゅう}1）を{強調|きょうちょう}している。",
				cn: "中元商战在即，百货店 ○○ 和 △△ 公布了主打商品。两家都以「环保」为主题陈列商品，强调对产地和材料的讲究。",
				en: "With the midyear-gift sales battle just ahead, department stores ○○ and △△ unveiled their featured items. Both are displaying goods on an “eco” theme and stressing their particular care about origin and materials.",
				indent: true,
			},
			{
				type: "paragraph",
				jp: "○○{百貨店|ひゃっかてん}はお{中元|ちゅうげん}{用品|ようひん}を2,500{品|ひん}から{主力商品|しゅりょくしょうひん}として25{品|ひん}を{選|えら}び、{展示|てんじ}した。{有機農法|ゆうきのうほう}（{注|ちゅう}2）によるジュース、レストランなどで{余|あま}った{食材|しょくざい}をエサとして{飼育|しいく}した△{豚|ぶた}の{肉|にく}などもあった。",
				cn: "○○ 百货从 2500 种中元用品里选出 25 种作为主打商品展出。既有用有机农法做的果汁，也有用餐厅剩余食材当饲料饲养的 △ 猪肉等。",
				en: "Department store ○○ selected 25 items from 2,500 midyear-gift products as its main line and put them on display. There were juices from organic farming, and even meat from △ pigs raised on leftover restaurant ingredients.",
				indent: true,
			},
			{
				type: "paragraph",
				jp: "△△{百貨店|ひゃっかてん}でも{地下入|ちかい}り{口|ぐち}に10{品|ひん}{並|なら}べ、「{人|ひと}と{地球|ちきゅう}にやさしいグリーンギフト」として{農薬|のうやく}を{減|へ}らして{栽培|さいばい}（{注|ちゅう}3）した{野菜|やさい}の{冷製|れいせい}スープなどの{商品|しょうひん}を{主力|しゅりょく}としている。",
				cn: "△△ 百货也在地下入口摆了 10 种，以「对人与地球都温柔的绿色礼品」为主打，比如减少农药种植的蔬菜冷汤等。",
				en: "Department store △△, too, lined up 10 items at the basement entrance, making its main line “green gifts kind to people and the planet,” such as chilled soup of vegetables grown with less pesticide.",
				indent: true,
			},
			{
				type: "paragraph",
				jp: "{両百貨店|りょうひゃっかてん}とも「ほかでは{買|か}えない」ものを{演出|えんしゅつ}し、{客|きゃく}に{財布|さいふ}のひもをゆるめてもらうのがねらいだ＊。",
				cn: "两家都在营造「别处买不到」的感觉，目的是让顾客打开钱包。",
				en: "Both stores are staging goods “you can’t buy anywhere else,” aiming to get customers to loosen their purse strings.",
				indent: true,
			},
		],
		footnotes: [
			{ marker: "（注1）", term: "こだわり", jp: "particular preferences", cn: "讲究、执着", en: "particular preferences / fussiness about quality" },
			{ marker: "（注2）", term: "有機農法", jp: "organic farming", cn: "有机农业", en: "organic farming" },
			{ marker: "（注3）", term: "栽培する", jp: "to grow", cn: "栽培、种植", en: "to grow (crops)" },
		],
		pageNotes: [
			{
				jp: "They aim to get customers to loosen their wallets",
				cn: "目的是让顾客花钱",
				en: "They aim to get customers to loosen their wallets",
			},
		],
		questions: [
			{
				label: "問1",
				jp: "{文中|ぶんちゅう}で{目玉商品|めだましょうひん}と{同|おな}じ{意味|いみ}で{使|つか}われている{言葉|ことば}はどれか。",
				cn: "文中与「目玉商品」意思相同的词语是哪一个？",
				en: "Which word in the text is used with the same meaning as 目玉商品?",
				choices: [
					{ jp: "{中元用商品|ちゅうげんようしょうひん}", cn: "中元用商品", en: "midyear-gift merchandise" },
					{ jp: "エコ{商品|しょうひん}", cn: "环保商品", en: "eco products" },
					{ jp: "ギフト{商品|しょうひん}", cn: "礼品商品", en: "gift products" },
					{ jp: "{主力商品|しゅりょくしょうひん}", cn: "主打商品", en: "main-line / featured products" },
				],
				answer: 4,
				explanation:
					"开头写两家「目玉商品を公開した」，接着 ○○「2,500品から主力商品として25品を選び」、△△「商品を主力としている」。公开的「目玉」就是拿来主打的「主力商品」。标题「エコを主力に」也是同一意思。选 4。这正是本课：标题和正文里被换了说法的词要对应起来。",
				explanationEn:
					"The lead says the two stores “unveiled their 目玉商品,” then ○○ “selected 25 items as 主力商品” and △△ “is making those products its 主力.” The featured 目玉 items are the main-line 主力商品. The headline “eco as 主力” is the same idea. Choose 4. The lesson is to match a headline word with its paraphrase in the body.",
				choiceNotes: [
					"中元用商品是大类（2500 品），目玉是从里面挑出来的那一小部分。",
					"エコ是主题，不是「目玉」的同义词。",
					"礼品是用途，不是「目玉」的同义词。",
					"正确。目玉商品＝主力商品。",
				],
				choiceNotesEn: [
					"Midyear-gift merchandise is the whole pool (2,500 items); 目玉 are the few picked from it.",
					"Eco is the theme, not a synonym of 目玉.",
					"Gift is the use, not a synonym of 目玉.",
					"Correct. 目玉商品 = 主力商品.",
				],
			},
			{
				label: "問2",
				jp: "この{記事|きじ}の{内容|ないよう}と{合|あ}っているものはどれか。",
				cn: "与这篇报道内容相符的是哪一项？",
				en: "Which of the following matches the content of this article?",
				choices: [
					{ jp: "どちらの{百貨店|ひゃっかてん}も{客|きゃく}が{買|か}いやすいような{値段設定|ねだんせってい}にしている。", cn: "两家百货都把价格定得让顾客容易买。", en: "Both department stores have set prices that are easy for customers to pay." },
					{ jp: "どちらの{百貨店|ひゃっかてん}も{環境|かんきょう}に{配慮|はいりょ}した{商品|しょうひん}に{注目|ちゅうもく}している。", cn: "两家百货都在关注顾及环境的商品。", en: "Both department stores are focusing on environmentally considerate products." },
					{ jp: "どちらの{百貨店|ひゃっかてん}も{同|おな}じような{商品|しょうひん}を{並|なら}べて{商戦|しょうせん}に{臨|のぞ}んでいる。", cn: "两家百货摆出差不多的商品来应战。", en: "Both department stores are lining up similar products for the sales battle." },
					{ jp: "{一方|いっぽう}の{百貨店|ひゃっかてん}では{品数|しなかず}を{多|おお}くし、{他方|たほう}では{品数|しなかず}を{少|すく}なくして{商戦|しょうせん}に{臨|のぞ}んでいる。", cn: "一家增加品种、另一家减少品种来应战。", en: "One store is fighting with a large number of items, the other with a small number." },
				],
				answer: 2,
				explanation:
					"两家都以「エコ」为主题：有机果汁、剩食饲料养的猪、少农药蔬菜汤，「人と地球にやさしい」。所以都在关注环保商品。选 2。1 与练习对话相反（不是便宜，而是手間をかけた自慢）。3 商品并不一样（果汁／猪肉 vs 冷汤）。4 两家都是从大量商品里抽出少数主力（25 品、10 品），不是一家多一家少。",
				explanationEn:
					"Both stores use an “eco” theme: organic juice, pigs fed on leftovers, low-pesticide vegetable soup, “kind to people and the planet.” So both are focusing on environmentally considerate goods. Choose 2. 1 is the opposite of the practice dialogue (not cheap, but time-consuming showpieces). 3: the actual items differ (juice/pork vs chilled soup). 4: both picked a small main line (25 and 10) from a large pool, not one many and one few.",
				choiceNotes: [
					"正文没写便宜；练习里店员还否定了「经济实惠」的理解。",
					"正确。两家都主打エコ、有机、少农药。",
					"主题同是エコ，具体商品并不相同。",
					"○○ 选出 25 品、△△ 摆 10 品，都是压缩主力品数，不是一家多一家少。",
				],
				choiceNotesEn: [
					"The article never says the prices are low; the clerk in the warm-up even rejects the “economy” reading.",
					"Correct. Both feature eco / organic / low-pesticide goods.",
					"The theme is the same; the actual products are not.",
					"○○ picked 25 items and △△ 10—both a small featured set, not one large and one small.",
				],
			},
		],
	},

	vocab: [
		{ jp: "助詞", kana: "じょし", cn: "助词", en: "particle", pos: "名詞" },
		{ jp: "お中元", kana: "おちゅうげん", cn: "中元节礼品", en: "midyear gift", pos: "名詞" },
		{ jp: "目玉商品", kana: "めだましょうひん", cn: "主打商品、招牌货", en: "featured item", pos: "名詞" },
		{ jp: "主力", kana: "しゅりょく", cn: "主力、主打", en: "main line; the featured effort", pos: "名詞" },
		{ jp: "商戦", kana: "しょうせん", cn: "商战、促销战", en: "sales battle", pos: "名詞" },
		{ jp: "百貨店", kana: "ひゃっかてん", cn: "百货商店", en: "department store", pos: "名詞" },
		{ jp: "産地", kana: "さんち", cn: "产地", en: "place of origin", pos: "名詞" },
		{ jp: "素材", kana: "そざい", cn: "材料、素材", en: "materials", pos: "名詞" },
		{ jp: "こだわり", cn: "讲究", en: "particular care / fussiness", pos: "名詞" },
		{ jp: "有機農法", kana: "ゆうきのうほう", cn: "有机农法", en: "organic farming", pos: "名詞" },
		{ jp: "栽培", kana: "さいばい", cn: "栽培", en: "cultivation", pos: "名詞・動詞" },
		{ jp: "農薬", kana: "のうやく", cn: "农药", en: "pesticide", pos: "名詞" },
		{ jp: "配慮", kana: "はいりょ", cn: "顾及、关照", en: "consideration", pos: "名詞・動詞" },
		{ jp: "手間", kana: "てま", cn: "工夫、费事", en: "time and effort", pos: "名詞" },
		{ jp: "財布のひもをゆるめる", kana: "さいふのひもをゆるめる", cn: "打开钱包、肯花钱", en: "to loosen the purse strings", pos: "表現" },
		{ jp: "見直し", kana: "みなおし", cn: "重新审视", en: "review; revision", pos: "名詞" },
		{ jp: "退任", kana: "たいにん", cn: "卸任", en: "resignation", pos: "名詞・動詞" },
		{ jp: "救済", kana: "きゅうさい", cn: "救济", en: "rescue; relief", pos: "名詞・動詞" },
	],

	grammar: [
		{
			pattern: "見出しの「〜も／〜へ／〜を」",
			meaning: "标题常常停在助词上，后面的动词被省略。「見直しも」→も検討されている；「退任へ」→へ向かっている；「国内救済を」→をすべきだ。先看助词再补动词。",
			meaningEn: "Headlines often stop on a particle and drop the verb. 見直しも → is also being considered; 退任へ → heading toward resignation; 国内救済を → we should rescue…. Read the particle, then restore the verb.",
			example: {
				jp: "{安全基準|あんぜんきじゅん}{見直|みなお}しも　→　{見直|みなお}しも{検討|けんとう}されている。",
				cn: "安全标准也要重新审视　→　重新审视也正在讨论。",
				en: "“safety-standard review, too” → a revision is also being considered.",
			},
		},
		{
			pattern: "〜を目前に",
			formation: "名詞＋を目前に",
			meaning: "……就在眼前、即将到来。",
			meaningEn: "with … just ahead / on the eve of ….",
			example: {
				jp: "お{中元|ちゅうげん}{商戦|しょうせん}を{目前|もくぜん}に、{目玉商品|めだましょうひん}を{公開|こうかい}した。",
				cn: "中元商战在即，公布了主打商品。",
				en: "With the midyear-gift sales battle just ahead, they unveiled their featured items.",
			},
		},
		{
			pattern: "〜のがねらいだ",
			formation: "動詞普通形＋のがねらいだ",
			meaning: "目的在于……。报道分析企业、活动意图时常用。",
			meaningEn: "the aim is to…. Common when a report analyses a company’s intent.",
			example: {
				jp: "{客|きゃく}に{財布|さいふ}のひもをゆるめてもらうのがねらいだ。",
				cn: "目的是让顾客打开钱包。",
				en: "The aim is to get customers to loosen their purse strings.",
			},
		},
	],
};
