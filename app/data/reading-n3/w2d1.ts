import type { ReadingDay } from "./types";

// 第2週 1日目 カタログ① — printed pages 28–29
export const w2d1: ReadingDay = {
	week: 2,
	day: 1,
	label: "カタログ①",
	labelEn: "Catalogues ①",
	printedPages: [28, 29],
	answerSource: "book",

	point: {
		title: "いちばん{強調|きょうちょう}している{点|てん}を{見|み}つけよう！",
		titleCn: "找出最强调的那一点！",
		titleEn: "Find the key points!",
		figure: {
			alt: "カメラの広告に大きく「安い！」と書かれていて、それを見た人が驚いているイラスト",
			cn: "相机广告上用超大字写着「安い！（便宜！）」，看到的人吓了一跳。",
			en: "A camera ad with “Cheap!” written in huge letters, and a person looking at it in surprise.",
		},
		tips: [
			{
				jp: "カタログなどでいちばん{言|い}いたい{点|てん}は、{大|おお}きい{文字|もじ}で{書|か}いてあるだけでなく、{説明|せつめい}の{中|なか}に{何度|なんど}も{出|で}てきます。",
				cn: "商品目录里最想说的那一点，不仅会用大字写出来，还会在说明文中反复出现。数一数哪个词出现得最多，就是答案。",
				en: "In a catalogue, the main selling point is not only written in large letters; it also appears again and again in the text. Count which word comes up most often—that is the answer.",
			},
		],
		expressions: [
			{ jp: "デザイン", cn: "款式、设计", en: "a design" },
			{ jp: "シンプル", cn: "简单、简洁", en: "simple" },
			{ jp: "ベージュ", cn: "米色、淡驼色", en: "beige" },
			{ jp: "グレー", cn: "灰色", en: "grey" },
			{ jp: "皮製", kana: "かわせい", cn: "皮革制", en: "leather" },
			{ jp: "布製", kana: "ぬのせい", cn: "布制", en: "cloth" },
			{ jp: "追求する", kana: "ついきゅうする", cn: "追求", en: "to strive for" },
			{ jp: "軽量", kana: "けいりょう", cn: "轻量、分量轻", en: "lightweight" },
		],
	},

	renshu: {
		instruction: "{次|つぎ}の{会話文|かいわぶん}を{読|よ}んで、{後|あと}の{文|ぶん}から{正|ただ}しいものを{選|えら}ぼう。",
		instructionCn: "阅读下面的对话，从后面的句子中选出正确的。（答案在下一页）",
		instructionEn: "Read the conversation below and choose the correct statements from the sentences that follow. (Answers are on the next page.)",
		blocks: [
			{
				type: "speech",
				speaker: "{店員|てんいん}",
				speakerCn: "店员",
				speakerEn: "Clerk",
				jp: "このバッグはいかがですか。とっても{軽|かる}いんですよ。",
				cn: "这个包您看怎么样？非常轻哦。",
				en: "How about this bag? It’s very light.",
			},
			{ type: "speech", speaker: "{客|きゃく}", speakerCn: "顾客", speakerEn: "Customer", jp: "わあ、{軽|かる}い！　これ{革|かわ}じゃないですよね。", cn: "哇，好轻！这个不是皮的吧。", en: "Wow, it’s light! This isn’t leather, is it?" },
			{
				type: "speech",
				speaker: "{店員|てんいん}",
				speakerCn: "店员",
				speakerEn: "Clerk",
				jp: "いえ、{本革|ほんがわ}（※1）です。{質|しつ}のいい{羊|ひつじ}（※2）の{革|かわ}を{使|つか}っているのでこんなに{軽|かる}いんです。",
				cn: "不，是真皮。因为用的是品质好的羊皮，所以才这么轻。",
				en: "No, it is genuine leather (※1). We use high-quality sheep (※2) leather, which is why it’s so light.",
			},
			{ type: "speech", speaker: "{客|きゃく}", speakerCn: "顾客", speakerEn: "Customer", jp: "へえ、{革|かわ}でこの{軽|かる}さ。{信|しん}じられない。", cn: "哦，皮的居然这么轻。真难以置信。", en: "Leather this light? I can hardly believe it." },
			{
				type: "speech",
				speaker: "{店員|てんいん}",
				speakerCn: "店员",
				speakerEn: "Clerk",
				jp: "シンプルなデザインで、{使|つか}いやすいですよ。{雑誌|ざっし}も{入|はい}りますし、{内側|うちがわ}にポケットが2つ{付|つ}いていて、{本当|ほんとう}に{便利|べんり}です。それに、いい{色|いろ}ですし。",
				cn: "款式简洁，很好用哦。杂志也放得下，内侧还有两个口袋，真的很方便。而且颜色也漂亮。",
				en: "The design is simple and easy to use. Magazines fit in it, and there are two pockets inside—it’s really convenient. And the color is nice, too.",
			},
			{
				type: "speech",
				speaker: "{客|きゃく}",
				speakerCn: "顾客",
				speakerEn: "Customer",
				jp: "ええ、こんな{色|いろ}がほしかったんですよ。じゃあ、これお{願|ねが}いします。",
				cn: "是啊，我就想要这种颜色。那就要这个吧。",
				en: "Yes, this is just the color I wanted. I’ll take this one, then.",
			},
		],
		footnotes: [
			{ marker: "※1", term: "本革", jp: "ほんがわ／genuine leather", cn: "真皮", en: "genuine leather" },
			{ marker: "※2", term: "羊", jp: "ひつじ／sheep", cn: "羊", en: "sheep" },
		],
		choices: [
			{ jp: "このバッグは{本物|ほんもの}の{革|かわ}で{作|つく}られている。", cn: "这个包是用真皮做的。", en: "This bag is made of genuine leather." },
			{ jp: "{客|きゃく}は{革|かわ}のバッグはほしくなかった。", cn: "顾客本来不想要皮包。", en: "The customer did not want a leather bag." },
			{ jp: "このバッグは{革|かわ}でできているから{軽|かる}い。", cn: "这个包因为是皮做的所以轻。", en: "This bag is light because it is made of leather." },
			{ jp: "このバッグの{外側|そとがわ}のポケットには{雑誌|ざっし}が{入|はい}る。", cn: "这个包外侧的口袋能放进杂志。", en: "A magazine will fit in the outer pocket of this bag." },
			{ jp: "{客|きゃく}はこのバッグを{買|か}うことにした。", cn: "顾客决定买这个包。", en: "The customer decided to buy this bag." },
		],
		answers: [1, 5],
		hint: {
			jp: "{軽|かる}いのは「{質|しつ}のいい{羊|ひつじ}の{革|かわ}」だから。「{革|かわ}だから{軽|かる}い」わけではない。ポケットは「{内側|うちがわ}に2つ」。",
			cn: "轻是因为用了「品质好的羊皮」，不是「因为是皮所以轻」。口袋是在「内侧」两个，不是外侧。",
			en: "It is light because of high-quality sheep leather—not “because it is leather.” The two pockets are inside, not outside.",
		},
	},

	mondai: {
		instruction: "{次|つぎ}の{広告|こうこく}を{読|よ}んで、{後|あと}の{問|と}いに{答|こた}えなさい。",
		instructionCn: "阅读下面的广告，回答后面的问题。（答案在别册 p.3）",
		instructionEn: "Read the advertisement below and answer the questions that follow. (Answers are in the separate booklet, p. 3.)",
		blocks: [
			{ type: "heading", jp: "{革製|かわせい}なのに、（　　　　　）！", cn: "明明是皮革制的，却（　　　　　）！", en: "Made of leather, and yet (          )!" },
			{ type: "title", jp: "{本革軽量|ほんがわけいりょう}バッグ", cn: "真皮轻量包", en: "Genuine-leather lightweight bag" },
			{
				type: "paragraph",
				jp: "{本当|ほんとう}に{革|かわ}なの？　と{言|い}いたくなるくらいの{軽|かる}さです。{質|しつ}のいい{羊|ひつじ}の{革|かわ}を{使|つか}って{軽|かる}さを{追求|ついきゅう}した{結果|けっか}、ここまで{軽|かる}くなりました＊。",
				cn: "轻到让人忍不住想问「这真的是皮的吗？」。使用优质羊皮、一路追求轻盈的结果，做到了如此之轻＊。",
				en: "It is so light you want to ask, “Is this really leather?” Using high-quality sheep leather and pursuing lightness is how we made it this light.＊",
			},
			{
				type: "paragraph",
				jp: "とてもやわらかく、デザインもシンプルなので、どの{洋服|ようふく}にも{合|あ}います。{雑誌|ざっし}も{楽|らく}に{入|はい}ってとても{使|つか}いやすいです＊＊。",
				cn: "非常柔软，款式也很简洁，与任何衣服都好搭配。杂志也能轻松放入，十分好用＊＊。",
				en: "It is very soft, and the simple design goes with any clothes. Magazines fit easily, so it is very easy to use.＊＊",
			},
			{
				type: "figure",
				alt: "バッグ2点のイラスト。「やわらかい羊の革使用！」「内側に2か所のポケット！」「シンプルなデザイン！」「軽い！」という吹き出しが付いている",
				cn: "两款包的插图，旁边标注：「使用柔软的羊皮！」「内侧有 2 个口袋！」「简洁的设计！」「很轻！」",
				en: "Illustrations of two bags, with callouts: “Soft sheep leather!” “Two pockets inside!” “Simple design!” “Light!”",
			},
			{
				type: "table",
				rows: [
					[
						{ jp: "{色|いろ}", cn: "颜色", en: "Color", header: true, align: "center" },
						{ jp: "ベージュ・{黒|くろ}", cn: "米色・黑色", en: "beige / black" },
					],
					[
						{ jp: "{定価|ていか}", cn: "定价", en: "List price", header: true, align: "center" },
						{ jp: "19,800{円|えん}", cn: "19,800 日元", en: "19,800 yen" },
					],
				],
			},
		],
		pageNotes: [
			{
				jp: "＊ By using the finest sheepskin, we are able to make this bag even lighter.",
				cn: "＊采用优质羊皮追求轻巧，所以才会有这么轻的皮包。",
				en: "By using the finest sheepskin, we are able to make this bag even lighter.",
			},
			{
				jp: "＊＊ Magazines also fit easily into this bag, making it perfect for practically all your needs.",
				cn: "＊＊杂志也能很容易地放进去，非常实用。",
				en: "Magazines also fit easily into this bag, making it perfect for practically all your needs.",
			},
		],
		questions: [
			{
				label: "問1",
				jp: "（　　）の{中|なか}に{入|はい}る{言葉|ことば}として{最|もっと}も{適当|てきとう}なものはどれか。",
				cn: "填入（　　）中最恰当的词语是哪一个？",
				en: "Which phrase is the most suitable to put in the blank?",
				choices: [
					{ jp: "2{万円|まんえん}もしない", cn: "连 2 万日元都不到", en: "costs less than 20,000 yen" },
					{ jp: "{使|つか}いやすいデザイン", cn: "好用的设计", en: "an easy-to-use design" },
					{ jp: "たためるくらいやわらかい", cn: "柔软到可以折叠", en: "soft enough to fold" },
					{ jp: "たった400グラムの{軽|かる}さ", cn: "仅仅 400 克的轻盈", en: "a mere 400 grams light" },
				],
				answer: 4,
				explanation:
					"这则广告从头到尾反复强调「軽い」：标题是「本革軽量バッグ」，正文有「〜くらいの軽さです」「軽さを追求した結果、ここまで軽くなりました」，插图标注也有「軽い！」。空格前面是「革製なのに（明明是皮制的，却……）」，转折之后当然要接最想强调的卖点——轻。所以 4 正确。这正是本课要点：最想说的那点会反复出现。",
				explanationEn:
					"This ad stresses “light” from start to finish: the title is “genuine-leather lightweight bag,” the body has “so light that…” and “we pursued lightness, and it became this light,” and a callout says “Light!” The blank comes after “made of leather, and yet…,” so the contrast must be the main selling point—lightness. 4 is correct. That is the lesson’s key: the main point is repeated.",
				choiceNotes: [
					"价格 19,800 日元确实不到 2 万，但价格在广告里只出现一次，不是强调的重点。",
					"「使いやすい」有提到，但它是「雑誌も楽に入って」的结果，不是与「革製なのに」形成对比的卖点。",
					"「やわらかい」有提到，但没有说到能折叠，属于过度推断。",
					"正确。全篇反复强调的就是「轻」。",
				],
				choiceNotesEn: [
					"19,800 yen is indeed under 20,000, but the price appears only once and is not the main point.",
					"“Easy to use” is mentioned, but it is a result of magazines fitting easily—not the contrast with “made of leather.”",
					"“Soft” is mentioned, but folding is never said; that is going too far.",
					"Correct. The whole ad keeps stressing “light.”",
				],
			},
			{
				label: "問2",
				jp: "このバッグのいちばんの{特長|とくちょう}はどれか。",
				cn: "这个包最大的特点是哪一项？",
				en: "What is this bag’s greatest feature?",
				choices: [
					{ jp: "{軽|かる}いということ", cn: "很轻这一点", en: "That it is light" },
					{ jp: "{革|かわ}そっくりのもので{作|つく}られているということ", cn: "是用和皮革极像的材料做的这一点", en: "That it is made of something that looks just like leather" },
					{ jp: "やわらかいということ", cn: "很柔软这一点", en: "That it is soft" },
					{ jp: "デザインがシンプルだということ", cn: "设计简洁这一点", en: "That the design is simple" },
				],
				answer: 1,
				explanation:
					"和問1 同样的道理：商品名里就有「軽量」，正文中「軽さ」「軽く」出现多次，插图也标着「軽い！」。出现次数最多、放在最大字号位置的就是最大卖点，所以 1 正确。",
				explanationEn:
					"Same reasoning as Question 1: the product name itself has “lightweight,” karusa / karuku appear many times in the body, and a callout says “Light!” The word that appears most often and in the largest type is the main selling point, so 1 is correct.",
				choiceNotes: [
					"正确。「軽量」「軽さ」「軽い」贯穿全篇。",
					"这是真皮（本革）制品，不是仿皮材料。",
					"「やわらかい」只是附带优点，出现一次。",
					"「シンプル」也只是附带优点。",
				],
				choiceNotesEn: [
					"Correct. “Lightweight,” “lightness,” and “light” run through the whole ad.",
					"This is genuine leather, not a material that merely looks like leather.",
					"“Soft” is only a side benefit; it appears once.",
					"“Simple” is also only a side benefit.",
				],
			},
		],
	},

	vocab: [
		{ jp: "革製／皮製", kana: "かわせい", cn: "皮革制品", en: "made of leather", pos: "名詞" },
		{ jp: "本革", kana: "ほんがわ", cn: "真皮", en: "genuine leather", pos: "名詞" },
		{ jp: "軽量", kana: "けいりょう", cn: "轻量", en: "lightweight", pos: "名詞" },
		{ jp: "軽さ", kana: "かるさ", cn: "轻盈程度", en: "lightness", pos: "名詞" },
		{ jp: "羊", kana: "ひつじ", cn: "羊", en: "sheep", pos: "名詞" },
		{ jp: "質", kana: "しつ", cn: "品质", en: "quality", pos: "名詞" },
		{ jp: "追求する", kana: "ついきゅうする", cn: "追求", en: "to pursue; to strive for", pos: "動詞" },
		{ jp: "結果", kana: "けっか", cn: "结果", en: "result", pos: "名詞" },
		{ jp: "内側", kana: "うちがわ", cn: "内侧", en: "the inside", pos: "名詞" },
		{ jp: "外側", kana: "そとがわ", cn: "外侧", en: "the outside", pos: "名詞" },
		{ jp: "特長", kana: "とくちょう", cn: "特长、优点", en: "a special feature; a strong point", pos: "名詞" },
		{ jp: "定価", kana: "ていか", cn: "定价", en: "list price", pos: "名詞" },
		{ jp: "強調する", kana: "きょうちょうする", cn: "强调", en: "to emphasize", pos: "動詞" },
		{ jp: "洋服", kana: "ようふく", cn: "西式服装、衣服", en: "clothes; Western-style clothing", pos: "名詞" },
		{ jp: "そっくり", cn: "一模一样、极像", en: "just like; the spitting image of", pos: "な形・副詞" },
		{ jp: "たたむ", cn: "折叠", en: "to fold", pos: "動詞" },
		{ jp: "シンプル", cn: "简洁", en: "simple", pos: "な形" },
	],

	grammar: [
		{
			pattern: "〜なのに",
			formation: "名詞＋なのに／普通形＋のに",
			meaning: "明明……却……。表示与预想相反的转折，广告里常用来制造惊讶感。",
			meaningEn: "even though… / and yet…. A contrast against what you would expect; ads often use it for surprise.",
			example: { jp: "{革製|かわせい}なのに、（　　）！", cn: "明明是皮革制的，却……！", en: "Made of leather, and yet…!" },
		},
		{
			pattern: "〜くらいの／〜くらい",
			formation: "普通形 ＋ くらい",
			meaning: "达到……的程度。用来形容程度之高。",
			meaningEn: "so… that / to the point that…. Used to stress how far something goes.",
			example: {
				jp: "{本当|ほんとう}に{革|かわ}なの？　と{言|い}いたくなるくらいの{軽|かる}さ",
				cn: "轻到让人想问「这真的是皮的吗？」的程度",
				en: "so light you want to ask, “Is this really leather?”",
			},
		},
		{
			pattern: "〜た結果",
			formation: "動詞た形 ＋ 結果",
			meaning: "……的结果是。表示努力之后得到的结论。",
			meaningEn: "as a result of…. The conclusion after effort.",
			example: { jp: "{軽|かる}さを{追求|ついきゅう}した{結果|けっか}", cn: "追求轻盈的结果", en: "as a result of pursuing lightness" },
		},
		{
			pattern: "〜ので",
			meaning: "因为……（客观原因）。比「から」更礼貌、更客观，说明文、广告常用。",
			meaningEn: "because… (an objective reason). More polite and objective than kara; common in explanations and ads.",
			example: { jp: "デザインもシンプルなので、どの{洋服|ようふく}にも{合|あ}います。", cn: "因为款式也简洁，所以和任何衣服都好搭配。", en: "Because the design is simple, it goes with any clothes." },
		},
		{
			pattern: "〜ことにする",
			formation: "動詞辞書形 ＋ ことにする",
			meaning: "决定……（自己的决定）。",
			meaningEn: "to decide to… (one’s own decision).",
			example: { jp: "{客|きゃく}はこのバッグを{買|か}うことにした。", cn: "顾客决定买这个包。", en: "The customer decided to buy this bag." },
		},
		{
			pattern: "〜し、〜し",
			meaning: "又……又……。并列several 个理由，口语中常见。",
			meaningEn: "and what’s more… / both… and…. Lists several reasons; common in speech.",
			example: { jp: "{本当|ほんとう}に{便利|べんり}です。それに、いい{色|いろ}ですし。", cn: "真的很方便。而且颜色也好看。", en: "It’s really convenient. And the color is nice, too." },
		},
	],
};
