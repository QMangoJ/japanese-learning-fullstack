import type { ReadingDay } from "./types";

// 第4週 5日目 広告② — printed pages 68–69
export const w4d5: ReadingDay = {
	week: 4,
	day: 5,
	label: "広告②",
	labelKana: "こうこく",
	labelEn: "Advertisements ②",
	printedPages: [68, 69],
	answerSource: "book",

	point: {
		title: "{情報|じょうほう}の{違|ちが}いを{正確|せいかく}に{読|よ}もう！",
		titleCn: "准确读出信息之间的差别！",
		titleEn: "Try to notice the details in the fine print!",
		figure: {
			alt: "「△△会話スクール（英語・フランス語・スペイン語・中国語）」と「○○会話学院（英語・フランス語・イタリア語・韓国語）」というよく似た2つの広告。横で鳥が「トリの国の言葉、教えましょうか？　ピピピ　チチチ」と言っている",
			cn: "两则很相似的广告：「△△会话学校（英语・法语・西班牙语・汉语）」和「○○会话学院（英语・法语・意大利语・韩语）」。旁边一只鸟说「要不要教你鸟国的语言？啾啾啾　叽叽叽」。",
			en: "Two similar ads: “△△ Conversation School (English, French, Spanish, Chinese)” and “○○ Conversation Academy (English, French, Italian, Korean).” A bird beside them says, “Shall I teach you the language of Birdland? Peep peep, chirp chirp.”",
		},
		tips: [
			{
				jp: "{同|おな}じ{種類|しゅるい}の{広告|こうこく}は、どれも{同|おな}じような{情報|じょうほう}が{書|か}いてある{場合|ばあい}があります。{情報|じょうほう}の{違|ちが}いに{注意|ちゅうい}しましょう。",
				cn: "同类广告往往写着差不多的内容。要盯住「不一样的那几个数字和词」——那就是出题点。",
				en: "Ads of the same kind often carry almost the same information. Watch the numbers and words that are different — that is where the question will be.",
			},
		],
		expressions: [
			{ jp: "見積もり", kana: "みつもり", cn: "估价、报价", en: "a quote / estimate (of cost)" },
			{ jp: "荷造り", kana: "にづくり", cn: "打包、装箱", en: "packing" },
			{ jp: "荷ほどき", kana: "にほどき", cn: "拆包、开箱", en: "unpacking" },
			{ jp: "標準", kana: "ひょうじゅん", cn: "标准", en: "standard" },
			{ jp: "節約", kana: "せつやく", cn: "节约", en: "thrift" },
			{ jp: "ダンボール", cn: "瓦楞纸箱", en: "a cardboard box" },
			{ jp: "大小合わせて", kana: "だいしょうあわせて", cn: "大小加在一起（合计）", en: "large and small combined (in total)" },
			{ jp: "〜に加え", kana: "くわえ", cn: "除〜之外还有", en: "in addition to …" },
		],
	},

	renshu: {
		instruction: "{次|つぎ}の{会話文|かいわぶん}を{読|よ}んで、{後|あと}の{文|ぶん}から{正|ただ}しいものを{選|えら}ぼう。",
		instructionCn: "阅读下面的对话，从后面的句子中选出正确的。（答案在下一页）",
		instructionEn: "Read the dialogue below and choose the correct statements from the sentences that follow. (Answers are on the next page.)",
		blocks: [
			{
				type: "speech",
				speaker: "{夫|おっと}",
				speakerCn: "丈夫",
				speakerEn: "Husband",
				jp: "{引|ひ}っ{越|こ}しのことだけどさ、この「らくらくコース」っていうのにしようか。{荷造|にづく}り（※1）も、{荷|に}ほどき（※2）も、{全部|ぜんぶ}やってくれるんだって。{楽|らく}だろうね。",
				cn: "关于搬家的事啊，就选这个「轻松套餐」怎么样？打包、拆箱他们全帮你做。应该很轻松吧。",
				en: "About the move — shall we go with this “Easy Course”? They do all the packing and unpacking for you. Should be easy, right?",
			},
			{
				type: "speech",
				speaker: "{妻|つま}",
				speakerCn: "妻子",
				speakerEn: "Wife",
				jp: "{楽|らく}には{違|ちが}いないけど、{高|たか}いのよ、そのコースは。うちは{無理|むり}ね＊。",
				cn: "轻松是肯定轻松，可那个套餐很贵啊。我们家负担不起。",
				en: "It would certainly be easy, but that course is expensive. We can’t afford it.",
			},
			{
				type: "speech",
				speaker: "{夫|おっと}",
				speakerCn: "丈夫",
				speakerEn: "Husband",
				jp: "じゃ、「{標準|ひょうじゅん}（※3）コース」か「{節約|せつやく}（※4）コース」にして……あ、もっと{安|やす}いコースもあるよ。さっそく{見積|みつ}もり（※5）に{来|き}てもらおうよ。でも、ここだけじゃなくて、ほかにも{頼|たの}もうか。だって{見積|みつ}もりはどこでもただだからね。",
				cn: "那就选「标准套餐」或者「节约套餐」……啊，还有更便宜的套餐呢。赶紧请他们来估个价吧。不过不要只找这一家，也找别家吧。反正估价哪家都是免费的。",
				en: "Then let’s do the “Standard Course” or the “Economy Course” … oh, there’s an even cheaper one. Let’s have them come give an estimate right away. But not just this company — shall we ask others too? Estimates are free everywhere, after all.",
			},
		],
		footnotes: [
			{ marker: "※1", term: "荷造り", jp: "packing", cn: "打包、装箱", en: "packing" },
			{ marker: "※2", term: "荷ほどき", jp: "unpacking", cn: "拆包、开箱", en: "unpacking" },
			{ marker: "※3", term: "標準", jp: "standard", cn: "标准", en: "standard" },
			{ marker: "※4", term: "節約", jp: "thrift", cn: "节约", en: "thrift" },
			{ marker: "※5", term: "見積もり", jp: "a quote / estimate (of cost)", cn: "估价、报价", en: "a quote / estimate (of cost)" },
		],
		choices: [
			{ jp: "この{夫婦|ふうふ}は、{新|あたら}しい{家|いえ}についての{話|はなし}をしている。", cn: "这对夫妻在谈论新房子的事。", en: "This couple is talking about their new house." },
			{ jp: "この{夫婦|ふうふ}は、{引|ひ}っ{越|こ}し{料金|りょうきん}が{安|やす}いコースを{探|さが}している。", cn: "这对夫妻在找搬家费便宜的套餐。", en: "This couple is looking for a cheap moving course." },
			{ jp: "「らくらくコース」は、{楽|らく}に{引|ひ}っ{越|こ}しできるコースという{意味|いみ}である。", cn: "「轻松套餐」是指能轻松完成搬家的套餐。", en: "“Easy Course” means a course that makes moving easy." },
			{ jp: "「{標準|ひょうじゅん}コース」より「らくらくコース」のほうが{安|やす}い。", cn: "「轻松套餐」比「标准套餐」便宜。", en: "The “Easy Course” is cheaper than the “Standard Course.”" },
			{ jp: "この{夫婦|ふうふ}は、{今見|いまみ}ている{広告|こうこく}の{会社|かいしゃ}に{引|ひ}っ{越|こ}しを{頼|たの}むことに{決|き}めた。", cn: "这对夫妻决定把搬家委托给现在看的这家广告上的公司。", en: "This couple has decided to hire the company in the ad they are looking at." },
		],
		answers: [2, 3],
		hint: {
			jp: "「らくらくコース」は{高|たか}いから{選|えら}ばない。「ほかにも{頼|たの}もうか」＝まだ{決|き}めていない。",
			cn: "「轻松套餐」贵，所以没选；「也找别家吧」说明还没决定委托哪一家；两人谈的是搬家，不是新房子。",
			en: "They don’t choose the “Easy Course” because it’s expensive. “Shall we ask others too?” means they have not decided yet. They are talking about moving, not about a new house.",
		},
	},

	mondai: {
		instruction: "{次|つぎ}の{文章|ぶんしょう}を{読|よ}んで、{後|あと}の{問|と}いに{答|こた}えなさい。",
		instructionCn: "阅读下面的文章，回答后面的问题。（答案在别册 p.5）",
		instructionEn: "Read the passage below and answer the questions that follow. (Answers are in the separate booklet, p. 5.)",
		blocks: [
			{
				type: "paragraph",
				jp: "{引|ひ}っ{越|こ}しなんて{初|はじ}めて、という{方|かた}も{大丈夫|だいじょうぶ}！＊　「{安心|あんしん}」「{安全|あんぜん}」「{早|はや}い」「{安|やす}い」をお{約束|やくそく}します。{基本|きほん}の「{標準|ひょうじゅん}コース」に{加|くわ}え、「らくらく{引|ひ}っ{越|こ}しコース」や「{節約|せつやく}コース」などさまざまなコースからお{選|えら}びいただけます。ダンボール（※1）は{大小合|だいしょうあ}わせて50{個|こ}まで{無料|むりょう}です。{今|いま}なら、お{見積|みつ}もりをお{申|もう}し{込|こ}みの{方|かた}にプレゼントをご{用意|ようい}して（※2）おります。もちろんお{見積|みつ}もりは{無料|むりょう}です。{今|いま}すぐお{電話|でんわ}を！",
				cn: "「搬家还是头一回」的朋友也不用担心！我们承诺「安心」「安全」「快速」「便宜」。除了基本的「标准套餐」之外，还有「轻松搬家套餐」「节约套餐」等多种套餐可供选择。瓦楞纸箱大小合计 50 个以内免费。现在申请估价的客户还可获赠礼品。当然，估价是免费的。请立即致电！",
				en: "Even if it’s your first move, you’re in good hands!＊ We promise “peace of mind,” “safety,” “speed,” and “a low price.” In addition to the basic “Standard Course,” you can choose from a variety of courses such as the “Easy Moving Course” and the “Economy Course.” Cardboard boxes are free up to 50 large and small combined. Right now, anyone who requests an estimate will receive a gift. Of course the estimate itself is free. Call us now!",
			},
		],
		footnotes: [
			{ marker: "※1", term: "ダンボール（箱）", jp: "a cardboard box", cn: "瓦楞纸箱", en: "a cardboard box" },
			{ marker: "※2", term: "用意する", jp: "to prepare, provide with", cn: "准备", en: "to prepare, provide with" },
		],
		pageNotes: [
			{ jp: "＊ No need to worry if it's your first move!", cn: "＊第一次搬家也别担心！", en: "＊ No need to worry if it's your first move!" },
		],
		questions: [
			{
				label: "問い",
				jp: "{上|うえ}の{文章|ぶんしょう}に{合|あ}った{引|ひ}っ{越|こ}し{業者|ぎょうしゃ}の{広告|こうこく}はどれか。",
				cn: "与上文相符的搬家公司广告是哪一个？",
				en: "Which moving-company ad matches the passage above?",
				choices: [
					{
						jp: "【サンキュー{引越|ひっこし}サービス】●{早|はや}く！　{安|やす}く！　{安心|あんしん}！　●5つのコース　●ダンボール50{個|こ}までサービス（{大小|だいしょう}2{種類|しゅるい}あり）／{見積無料|みつもりむりょう}！　お{見積|みつ}もりでまずお{電話|でんわ}を　お{花|はな}をプレゼント！　TEL 0120-XX-0154",
						cn: "【Thank You 搬家服务】●快！便宜！安心！　●5 种套餐　●纸箱 50 个以内免费提供（有大小两种）／估价免费！先来电估价，赠送鲜花！",
						en: "[Thank You Moving] ● Fast! Cheap! Peace of mind! ● 5 courses ● Boxes free up to 50 (two sizes, large and small) / Free estimate! Call first for a quote — flowers as a gift! TEL 0120-XX-0154",
					},
					{
						jp: "【モリ{引越|ひっこし}センター】まかせて{安心|あんしん}！　モリの{引|ひ}っ{越|こ}し！　とにかく{安|やす}くて{早|はや}い！　{選|えら}べる2つのコースあり（{見積無料|みつもりむりょう}）　{大小|だいしょう}ダンボール50{個|こ}まで{無料|むりょう}　TEL 0120-XX-4115",
						cn: "【森搬家中心】交给我们最安心！总之又便宜又快！可选的 2 种套餐（估价免费）　大小纸箱 50 个以内免费",
						en: "[Mori Moving Center] Leave it to us! Cheap and fast! 2 courses to choose from (free estimate)  Large and small boxes free up to 50  TEL 0120-XX-4115",
					},
					{
						jp: "【ラビット{引|ひ}っ{越|こ}しセンター】お{引|ひ}っ{越|こ}しなら {安|やす}い！　はやい！　ていねい！　◆いろいろなコースあります　◆ダンボール{無料|むりょう}（{大|だい}50{個小|こしょう}50{個|こ}まで）　TEL 0120-XX-5555　{見積無料|みつもりむりょう}！",
						cn: "【兔子搬家中心】搬家就找我们　便宜！快速！细致！　◆有各种套餐　◆纸箱免费（大 50 个、小 50 个以内）　估价免费！",
						en: "[Rabbit Moving] Cheap! Fast! Careful! ◆ Various courses ◆ Boxes free (up to 50 large and 50 small)  TEL 0120-XX-5555  Free estimate!",
					},
					{
						jp: "【ヤスイ{引越|ひっこし}センター】{安|やす}い{引越|ひっこし}　お{見積|みつ}もりいただいた{方|かた}に{時計|とけい}をプレゼント　{大|だい}50{個|こ}、{小|しょう}50{個|こ}のダンボールが{無料|むりょう}　{見積無料|みつもりむりょう}　Tel. 0120-XX-1515",
						cn: "【安井搬家中心】便宜的搬家　凡估价的客户赠送手表　大 50 个、小 50 个纸箱免费　估价免费",
						en: "[Yasui Moving] Cheap moves  A watch as a gift for anyone who gets an estimate  50 large and 50 small boxes free  Free estimate  Tel. 0120-XX-1515",
					},
				],
				answer: 1,
				explanation:
					"三个数字／说法可以把答案筛出来。①「さまざまなコース」——标准＋轻松＋节约「など」，至少 3 种以上，所以只有 2 种套餐的 2 被排除。②「ダンボールは大小合わせて50個まで無料」——大小**加起来**共 50 个；3 和 4 写的是「大 50 个、小 50 个」，合计 100 个，与原文不符。③剩下的 1 还满足「見積もり無料」「お見積もりをお申し込みの方にプレゼント（お花）」，全部对得上。",
				explanationEn:
					"Three numbers / phrases filter the answer. ① “A variety of courses” — Standard + Easy + Economy “and so on,” at least three, so 2 (only two courses) is out. ② “Boxes are free up to 50 large and small combined” — 50 in total; 3 and 4 say “50 large and 50 small,” i.e. 100, which does not match. ③ The remaining 1 also has a free estimate and a gift (flowers) for anyone who requests a quote — everything lines up.",
				choiceNotes: [
					"正确。5 种套餐（＝さまざまなコース）、纸箱大小合计 50 个、估价免费并赠送礼物，全部一致。",
					"「選べる2つのコース」与「さまざまなコース」不符。",
					"「大 50 個小 50 個まで」＝合计 100 个，与「大小合わせて 50 個まで」不符。",
					"同样是「大 50 個、小 50 個」，合计 100 个，与原文不符。",
				],
				choiceNotesEn: [
					"Correct. 5 courses (= a variety of courses), boxes 50 large and small combined, free estimate plus a gift — all match.",
					"“2 courses to choose from” does not match “a variety of courses.”",
					"“Up to 50 large and 50 small” = 100 in total, which does not match “50 large and small combined.”",
					"Also “50 large and 50 small” = 100, which does not match the passage.",
				],
			},
		],
	},

	vocab: [
		{ jp: "引っ越し", kana: "ひっこし", cn: "搬家", en: "moving (house)", pos: "名詞" },
		{ jp: "業者", kana: "ぎょうしゃ", cn: "商家、公司", en: "a company / contractor", pos: "名詞" },
		{ jp: "見積もり", kana: "みつもり", cn: "估价、报价", en: "estimate / quote", pos: "名詞" },
		{ jp: "荷造り", kana: "にづくり", cn: "打包、装箱", en: "packing", pos: "名詞・動詞" },
		{ jp: "荷ほどき", kana: "にほどき", cn: "拆包、开箱", en: "unpacking", pos: "名詞・動詞" },
		{ jp: "標準", kana: "ひょうじゅん", cn: "标准", en: "standard", pos: "名詞" },
		{ jp: "節約", kana: "せつやく", cn: "节约", en: "economy / thrift", pos: "名詞・動詞" },
		{ jp: "コース", cn: "套餐、路线", en: "course / plan", pos: "名詞" },
		{ jp: "ダンボール", cn: "瓦楞纸箱", en: "cardboard box", pos: "名詞" },
		{ jp: "大小", kana: "だいしょう", cn: "大小", en: "large and small", pos: "名詞" },
		{ jp: "合わせて", kana: "あわせて", cn: "合计、加在一起", en: "combined / in total", pos: "副詞" },
		{ jp: "無料", kana: "むりょう", cn: "免费", en: "free of charge", pos: "名詞" },
		{ jp: "約束する", kana: "やくそくする", cn: "承诺、约定", en: "to promise", pos: "動詞" },
		{ jp: "基本", kana: "きほん", cn: "基本", en: "basic", pos: "名詞" },
		{ jp: "さまざま", cn: "各种各样", en: "various / a variety of", pos: "な形" },
		{ jp: "楽", kana: "らく", cn: "轻松", en: "easy / effortless", pos: "な形" },
		{ jp: "ただ", cn: "免费", en: "free", pos: "名詞" },
		{ jp: "正確", kana: "せいかく", cn: "准确", en: "accurate", pos: "な形" },
	],

	grammar: [
		{
			pattern: "〜に{加|くわ}え（て）",
			formation: "名詞 ＋ に加えて",
			meaning: "除……之外还……。书面语的添加表达。",
			meaningEn: "In addition to …. A written way to add something.",
			example: {
				jp: "{基本|きほん}の「{標準|ひょうじゅん}コース」に{加|くわ}え、「らくらく{引|ひ}っ{越|こ}しコース」や「{節約|せつやく}コース」など",
				cn: "除了基本的「标准套餐」之外，还有「轻松搬家套餐」「节约套餐」等",
				en: "in addition to the basic “Standard Course,” the “Easy Moving Course,” the “Economy Course,” and so on",
			},
			note: "本题线索：「〜に加え、〜や〜など」表示种类不止两三种，对应「さまざまなコース」。",
			noteEn: "A clue on this question: “in addition to …, … and … and so on” means there are more than two or three kinds — matching “a variety of courses.”",
		},
		{
			pattern: "{合|あ}わせて〜",
			meaning: "合计……。「大小合わせて50個」＝大的和小的加起来共 50 个。",
			meaningEn: "… combined. “50 large and small awasete” = 50 large and small in total.",
			example: { jp: "ダンボールは{大小合|だいしょうあ}わせて50{個|こ}まで{無料|むりょう}です。", cn: "纸箱大小合计 50 个以内免费。", en: "Boxes are free up to 50 large and small combined." },
			note: "本课最大考点。若写成「大50個小50個」就是各 50 个、合计 100 个，意思完全不同。",
			noteEn: "This lesson’s biggest test point. Written as “50 large, 50 small,” it would be 50 of each — 100 in total — a completely different meaning.",
		},
		{
			pattern: "お／ご〜いただけます",
			meaning: "您可以……。尊敬地表示「对方可以做某事」，广告中常用。",
			meaningEn: "You can …. Honorific for “the other person may do something”; common in ads.",
			example: { jp: "さまざまなコースからお{選|えら}びいただけます。", cn: "您可以从多种套餐中选择。", en: "You can choose from a variety of courses." },
		},
		{
			pattern: "〜には{違|ちが}いない",
			meaning: "……是肯定的、确实……（但是）。后面常接转折。",
			meaningEn: "It is certainly true that … (but). Often followed by a contrast.",
			example: { jp: "{楽|らく}には{違|ちが}いないけど、{高|たか}いのよ。", cn: "轻松是肯定轻松，可是很贵啊。", en: "It would certainly be easy, but it’s expensive." },
		},
		{
			pattern: "〜てもらう",
			meaning: "请（对方）为我做……。",
			meaningEn: "To have (someone) do … for me.",
			example: { jp: "さっそく{見積|みつ}もりに{来|き}てもらおうよ。", cn: "赶紧请他们来估个价吧。", en: "Let’s have them come give an estimate right away." },
		},
		{
			pattern: "〜なんて",
			meaning: "……什么的、竟然……。表示轻视、意外或强调话题。",
			meaningEn: "… or anything like that / to think that …. Light dismissal, surprise, or emphasis on the topic.",
			example: { jp: "{引|ひ}っ{越|こ}しなんて{初|はじ}めて、という{方|かた}も{大丈夫|だいじょうぶ}！", cn: "「搬家还是头一回」的朋友也不用担心！", en: "Even if it’s your first move, you’re in good hands!" },
		},
		{
			pattern: "{今|いま}なら",
			meaning: "现在的话（就有优惠）。广告里制造紧迫感的常用说法。",
			meaningEn: "If you act now (there’s a special). A common ad phrase that creates urgency.",
			example: { jp: "{今|いま}なら、お{見積|みつ}もりをお{申|もう}し{込|こ}みの{方|かた}にプレゼントを……", cn: "现在申请估价的客户还可获赠礼品……", en: "Right now, anyone who requests an estimate will receive a gift …" },
		},
	],
};
