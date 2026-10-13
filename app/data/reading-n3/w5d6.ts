import type { ReadingDay } from "./types";

// 第5週 6日目 小説② — printed pages 86–87
// 別冊 p.6（第5週の解答）は今回のスキャンに含まれていないため、答えは本文から導出。
export const w5d6: ReadingDay = {
	week: 5,
	day: 6,
	label: "小説②",
	labelKana: "しょうせつ",
	labelEn: "Novels ②",
	printedPages: [86, 87],
	answerSource: "derived",

	point: {
		title: "「これ／それ（{指示語|しじご}）」に{注意|ちゅうい}しよう！ ─{答|こた}えが{後|うし}ろにある{場合|ばあい}",
		titleCn: "注意「これ／それ」（指示语）吧！——答案在后面的情况",
		titleEn: "Pay attention to 'kore' and 'sore'! — When the referred idea comes later",
		figure: {
			alt: "黒板の前で「後ろを見て！」と指さすキャラクター。指示語が後ろの内容を指すことを表している",
			cn: "在黑板前指着说「看后面！」的角色。表示指示语指的是后面的内容。",
			en: "A character points at the blackboard and shouts, “Look behind!” — showing that a demonstrative sometimes refers to something that only appears later.",
		},
		tips: [
			{
				jp: "{読|よ}み{手|て}に「{何|なん}だろう」と{期待|きたい}させるための{効果的|こうかてき}な{書|か}き{方|かた}です。",
				cn: "这是为了让读者产生「是什么呢」的期待的一种有效写法。",
				en: "This is an effective way of writing that makes the reader wonder “What is it?” — especially common at the start of a story.",
			},
			{
				jp: "・こんなものがあったと{言|い}って、{古|ふる}い{写真|しゃしん}を{出|だ}してきた。／・その{知|し}らせは{突然|とつぜん}だった。{僕|ぼく}の{作品|さくひん}が{受賞|じゅしょう}するなんて、{本当|ほんとう}に{驚|おどろ}いた。",
				cn: "・说着「有这么个东西」，拿出了旧照片。／・那个消息来得很突然。我的作品竟然获奖，我真是吃了一惊。",
				en: "Examples: “Saying ‘I had this thing,’ they brought out an old photo” — “こんなもの” refers to the “old photo” that comes later. “The news came suddenly. I never thought my work would win a prize — I was really surprised” — “その知らせ” refers to “winning a prize,” which comes later.",
			},
		],
		expressions: [
			{ jp: "こんなもの／そんなもの", cn: "这样的东西／那样的东西", en: "this kind of thing / that kind of thing" },
			{ jp: "その知らせ", kana: "しらせ", cn: "那个消息", en: "that news" },
			{ jp: "動揺する", kana: "どうようする", cn: "动摇、心慌", en: "to be upset" },
			{ jp: "草むら", kana: "くさむら", cn: "草丛", en: "thick grass" },
			{ jp: "くわえる", cn: "叼（衔在嘴里）", en: "to carry … in its mouth" },
			{ jp: "カチンカチン", cn: "硬邦邦（形容僵硬的样子）", en: "hard as a rock (describes something stiff)" },
			{ jp: "手首", kana: "てくび", cn: "手腕", en: "a wrist" },
			{ jp: "死体", kana: "したい", cn: "尸体", en: "a corpse" },
		],
	},

	renshu: {
		instruction: "{次|つぎ}の{会話文|かいわぶん}を{読|よ}んで、{後|あと}の{文|ぶん}から{正|ただ}しいものを{選|えら}ぼう。",
		instructionCn: "阅读下面的对话文，从后面的句子中选出正确的吧。",
		instructionEn: "Read the conversation below and choose the correct statements from the sentences that follow. (Answers are on the next page.)",
		blocks: [
			{ type: "speech", speaker: "A{君|くん}", speakerCn: "A君", speakerEn: "A", jp: "そんなの、{信|しん}じられないね。", cn: "那种事，没法相信啊。", en: "I can’t believe that." },
			{
				type: "speech",
				speaker: "B{君|くん}",
				speakerCn: "B君",
				speakerEn: "B",
				jp: "{本当|ほんとう}だよ。{僕|ぼく}が{見|み}つけたんだよ。この{手|て}で{触|さわ}ったんだよ。",
				cn: "是真的呀。是我发现的呀。我用这只手摸过的呀。",
				en: "It’s true. I found it. I even touched it with this hand.",
			},
			{
				type: "speech",
				speaker: "A{君|くん}",
				speakerCn: "A君",
				speakerEn: "A",
				jp: "じゃ、お{前|まえ}が{死体|したい}（※1）の{発見者|はっけんしゃ}っていうことか？",
				cn: "那么，就是说你是尸体（※1）的发现者吗？",
				en: "So you’re saying you’re the one who discovered the body?",
			},
			{
				type: "speech",
				speaker: "B{君|くん}",
				speakerCn: "B君",
				speakerEn: "B",
				jp: "そうだよ。{先|さき}に{見|み}つけたのはジョンだけどね。それに、{手首|てくび}だけだったけど。ニュースにも{出|で}たよ。「{犬|いぬ}を{散歩中|さんぽちゅう}の{中学生|ちゅうがくせい}、{手首|てくび}（※2）{発見|はっけん}」ってね。{僕|ぼく}、{初|はじ}め、おもちゃだと{思|おも}ったんだ。",
				cn: "是啊。不过最先发现的是约翰就是了。而且，只有手腕而已。新闻里也登了哦。「遛狗途中的初中生，发现手腕（※2）」这样的。我一开始，还以为是玩具呢。",
				en: "That’s right. John found it first, though. And it was only a wrist. It was even on the news: “Junior high student walking dog finds wrist.” At first I thought it was a toy.",
			},
			{
				type: "speech",
				speaker: "A{君|くん}",
				speakerCn: "A君",
				speakerEn: "A",
				jp: "ふーん、{得意|とくい}そうに{言|い}っているけれど、お{前|まえ}、{怖|こわ}くて{泣|な}いただろ？",
				cn: "嗯——，你说得好像很得意，不过你是因为害怕而哭了吧？",
				en: "Huh. You sound pretty proud, but you cried because you were scared, didn’t you?",
			},
			{ type: "speech", speaker: "B{君|くん}", speakerCn: "B君", speakerEn: "B", jp: "え？　{何|なん}で{知|し}ってるの？", cn: "诶？你怎么知道的？", en: "Huh? How do you know that?" },
		],
		footnotes: [
			{ marker: "※1", term: "死体", jp: "a corpse", cn: "尸体", en: "a corpse" },
			{ marker: "※2", term: "手首", jp: "a hand / wrist", cn: "手腕", en: "a hand / wrist" },
		],
		choices: [
			{ jp: "B{君|くん}は{死体|したい}を{見|み}つけたとき、{犬|いぬ}のジョンの{散歩|さんぽ}をしていた。", cn: "B君发现尸体的时候，正在遛约翰这只狗。", en: "When B found the body, he was walking his dog, John." },
			{ jp: "B{君|くん}は{人間|にんげん}の{死体|したい}の{一部|いちぶ}を{見|み}つけた。", cn: "B君发现了人类尸体的一部分。", en: "B found part of a human body." },
			{ jp: "B{君|くん}が{発見|はっけん}したのは、おもちゃの{手首|てくび}だった。", cn: "B君发现的是玩具的手腕。", en: "What B found was a toy wrist." },
			{ jp: "A{君|くん}はB{君|くん}が{死体|したい}を{見|み}つけたのを{知|し}っていた。", cn: "A君当时知道B君发现了尸体。", en: "A already knew that B had found the body." },
			{ jp: "B{君|くん}は{手首|てくび}を{見|み}つけたとき、{泣|な}かなかった。", cn: "B君发现手腕的时候，没有哭。", en: "B did not cry when he found the wrist." },
		],
		answers: [1, 2],
		hint: {
			jp: "ニュースの{見出|みだ}し「{犬|いぬ}を{散歩中|さんぽちゅう}の{中学生|ちゅうがくせい}、{手首発見|てくびはっけん}」がヒント。B{君|くん}は「{何|なん}で{知|し}ってるの？」と{答|こた}えている。",
			cn: "新闻的标题「遛狗途中的初中生，发现手腕」是提示。B君回答说「你怎么知道的？」。",
			en: "The news headline “Junior high student walking dog finds wrist” is the clue. B’s last line, “How do you know that?”, is as good as admitting he cried. “I thought it was a toy” was only his first mistake.",
		},
	},

	mondai: {
		instruction: "{次|つぎ}の{文章|ぶんしょう}を{読|よ}んで、{後|あと}の{問|と}いに{答|こた}えなさい。",
		instructionCn: "阅读下面的文章，请回答后面的问题。",
		instructionEn: "Read the passage below and answer the questions that follow. (Answers are in the supplement, p. 6.)",
		blocks: [
			{
				type: "paragraph",
				indent: true,
				jp: "その{日|ひ}の{午後|ごご}になるまでは、だれも①それに{気|き}づかなかった。{最初|さいしょ}に{気|き}がついたのは{僕|ぼく}だ。いや、{本当|ほんとう}のことを{言|い}えばジョンだけど、ジョンはすぐに{僕|ぼく}に{教|おし}えてくれたんだし、ジョンは{僕|ぼく}の{犬|いぬ}だから、{僕|ぼく}が{見|み}つけたと{言|い}ってもいいと{思|おも}う。{正直|しょうじき}に{言|い}えばジョンは{僕|ぼく}の{犬|いぬ}というわけじゃなくて、{妹|いもうと}と{僕|ぼく}の{二人|ふたり}のものだけど。……そんなことはどうでもいい。ちょっと{僕|ぼく}は{動揺|どうよう}して（※1）いるみたいだ。",
				cn: "直到那天下午为止，谁也没有注意到①那个。最先注意到的是我。不，说实话是约翰，不过约翰马上就告诉了我，而且约翰是我的狗，所以我觉得说是我发现的也行。老实说，并不是约翰是我的狗，而是妹妹和我两个人的，不过。……这种事怎样都无所谓。我好像有点儿心慌（※1）。",
				en: "Until that afternoon, no one had ① noticed it. The first one to notice was me. No — to tell the truth it was John, but John told me right away, and John is my dog, so I think it’s fair to say I found it. Honestly, John isn’t exactly my dog; he belongs to my little sister and me. … That doesn’t matter. I seem to be a bit upset.",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "ジョンが{草|くさ}むら（※2）からくわえてきた（※3）ものを{見|み}たとき、{僕|ぼく}は{初|はじ}め、おもちゃだと{思|おも}ったんだ。だれかが{捨|す}てた{人形|にんぎょう}の{一部|いちぶ}だと。まさかそれが{本物|ほんもの}だなんて、{本物|ほんもの}の{人間|にんげん}の{手首|てくび}だなんて、{思|おも}うわけがないじゃないか＊。ジョンから{渡|わた}されて{手|て}に{持|も}ったときだって、{冷|つめ}たくてカチンカチン（※4）だったし、{全然|ぜんぜん}わからなかった。その{手|て}に{毛|け}が{生|は}えているのに{気|き}づくまでは。",
				cn: "看到约翰从草丛（※2）里叼来（※3）的东西时，我一开始以为是玩具。以为是谁扔掉的人偶的一部分。我怎么可能想到那竟然是真的、是真人的手腕呢＊。就算约翰递给我、我拿在手里的时候，它又冷又硬邦邦（※4），我也完全不明白。直到注意到那只手上长着毛为止。",
				en: "When I saw what John had carried out of the thick grass in his mouth, at first I thought it was a toy. A piece of a doll someone had thrown away. There’s absolutely no way I thought it could be the real thing, the wrist of some person＊. Even when John handed it over and I held it, it was cold and hard as a rock, and I still had no idea — until I noticed that hair was growing on that hand.",
			},
		],
		footnotes: [
			{ marker: "※1", term: "動揺する", jp: "to be upset", cn: "心慌、动摇", en: "to be upset" },
			{ marker: "※2", term: "草むら", jp: "thick grass", cn: "草丛", en: "thick grass" },
			{ marker: "※3", term: "くわえる", jp: "to carry … in its mouth", cn: "叼（在嘴里）", en: "to carry … in its mouth" },
			{ marker: "※4", term: "カチンカチン", jp: "硬いようすを表す言葉", cn: "硬邦邦（形容坚硬）", en: "a word that describes something hard as a rock" },
		],
		pageNotes: [
			{
				jp: "＊ There's absolutely no way I thought it could be the real thing, the wrist of some person.",
				cn: "＊我绝对不可能想到那会是真的，是某个人的手腕。",
				en: "＊ There's absolutely no way I thought it could be the real thing, the wrist of some person.",
			},
		],
		questions: [
			{
				label: "問1",
				jp: "①「それ」とは{何|なに}を{指|さ}すか。",
				cn: "①「それ」指的是什么？",
				en: "What does ① “it” refer to?",
				choices: [
					{ jp: "{犬|いぬ}のジョン", cn: "名叫约翰的狗", en: "the dog, John" },
					{ jp: "{草|くさ}むら", cn: "草丛", en: "the thick grass" },
					{ jp: "{人形|にんぎょう}の{一部|いちぶ}", cn: "人偶的一部分", en: "part of a doll" },
					{ jp: "{人間|にんげん}の{手首|てくび}", cn: "人的手腕", en: "a human wrist" },
				],
				answer: 4,
				explanation:
					"这里的「それ」不在前文，而是指**后面**才揭晓的东西——第二段写道「まさかそれが本物だなんて、本物の人間の手首だなんて」。这正是本课要点：作者故意先用「それ」吊起读者胃口，答案在后面。所以 4 正确。",
				explanationEn:
					"This “それ” is not in what comes before; it points to something only revealed later — the second paragraph says, “There’s no way I thought it could be the real thing, a real human wrist.” That is the day’s key point: the writer first uses “それ” to keep the reader guessing, and the answer comes later. So 4 is correct.",
				choiceNotes: [
					"约翰是发现者，不是被发现的东西。而且「だれもそれに気づかなかった」用在自家的狗身上不通。",
					"草丛只是东西所在的地方。",
					"「人形の一部」是「我」一开始的**误解**，不是「それ」的真实所指。",
					"正确。后文揭晓：「本物の人間の手首」。",
				],
				choiceNotesEn: [
					"John is the one who found it, not the thing that was found. And “no one had noticed it” doesn’t make sense if “it” is the family dog.",
					"The grass is only where the thing was.",
					"“Part of a doll” is the narrator’s first mistake, not what “それ” really is.",
					"Correct. The later text reveals it: “a real human wrist.”",
				],
			},
			{
				label: "問2",
				jp: "{筆者|ひっしゃ}はいつ、ジョンが{持|も}ってきたものが{人間|にんげん}の{死体|したい}の{一部|いちぶ}だとわかったか。",
				cn: "笔者是在什么时候明白约翰带来的东西是人类尸体的一部分的？",
				en: "When did the writer realize that what John had brought was part of a human body?",
				choices: [
					{ jp: "ジョンが{口|くち}にくわえていたとき", cn: "约翰叼在嘴里的时候", en: "When John was carrying it in his mouth" },
					{ jp: "{手|て}に{持|も}ったとき", cn: "拿在手里的时候", en: "When he held it in his hand" },
					{ jp: "{毛|け}が{生|は}えているのに{気|き}がついたとき", cn: "注意到长着毛的时候", en: "When he noticed that hair was growing on it" },
					{ jp: "ジョンに{渡|わた}されたとき", cn: "被约翰递过来的时候", en: "When John handed it to him" },
				],
				answer: 3,
				explanation:
					"文章最后一句是倒装：「全然わからなかった。**その手に毛が生えているのに気づくまでは。**」——把它还原成正常语序就是「その手に毛が生えているのに気づくまでは全然わからなかった」，也就是**发现有汗毛的那一刻才明白**。所以 3 正确。这种把状语后置的写法，也是制造悬念的手法。",
				explanationEn:
					"The last sentence is inverted: “I still had no idea. **Until I noticed that hair was growing on that hand.**” Put back in normal order: “Until I noticed that hair was growing on that hand, I still had no idea” — he only understood at the moment he noticed the hair. So 3 is correct. Putting the time phrase at the end is another way of building suspense.",
				choiceNotes: [
					"那时还以为是玩具。",
					"拿在手里时「冷たくてカチンカチンだったし、全然わからなかった」——依然没看出来。",
					"正确。「毛が生えているのに気づくまでは（わからなかった）」。",
					"「渡された」和「手に持った」是同一时刻，同样还没发现。",
				],
				choiceNotesEn: [
					"At that point he still thought it was a toy.",
					"When he held it, “it was cold and hard as a rock, and I still had no idea” — he still hadn’t figured it out.",
					"Correct. “Until I noticed that hair was growing on it (I had no idea).”",
					"“Handed over” and “held in his hand” are the same moment, and he still hadn’t realized.",
				],
			},
		],
	},

	vocab: [
		{ jp: "気づく", kana: "きづく", cn: "注意到、察觉", en: "to notice", pos: "動詞" },
		{ jp: "正直に言えば", kana: "しょうじきにいえば", cn: "老实说", en: "to tell the truth", pos: "表現" },
		{ jp: "動揺する", kana: "どうようする", cn: "心慌、动摇", en: "to be upset", pos: "動詞" },
		{ jp: "草むら", kana: "くさむら", cn: "草丛", en: "thick grass", pos: "名詞" },
		{ jp: "くわえる", cn: "叼", en: "to carry in the mouth", pos: "動詞" },
		{ jp: "人形", kana: "にんぎょう", cn: "娃娃、人偶", en: "doll", pos: "名詞" },
		{ jp: "一部", kana: "いちぶ", cn: "一部分", en: "a part", pos: "名詞" },
		{ jp: "本物", kana: "ほんもの", cn: "真的、真品", en: "the real thing", pos: "名詞" },
		{ jp: "手首", kana: "てくび", cn: "手腕", en: "wrist", pos: "名詞" },
		{ jp: "渡す", kana: "わたす", cn: "递给", en: "to hand over", pos: "動詞" },
		{ jp: "毛が生える", kana: "けがはえる", cn: "长汗毛", en: "to have hair growing", pos: "表現" },
		{ jp: "死体", kana: "したい", cn: "尸体", en: "corpse", pos: "名詞" },
		{ jp: "発見者", kana: "はっけんしゃ", cn: "发现者", en: "discoverer", pos: "名詞" },
		{ jp: "触る", kana: "さわる", cn: "触摸", en: "to touch", pos: "動詞" },
		{ jp: "得意そう", kana: "とくいそう", cn: "得意的样子", en: "looking proud", pos: "な形" },
		{ jp: "捨てる", kana: "すてる", cn: "丢弃", en: "to throw away", pos: "動詞" },
	],

	grammar: [
		{
			pattern: "それ／こんなもの（後方指示）",
			meaning: "指示词指向**后面**才出现的内容，用来制造悬念、吸引读者。",
			meaningEn: "A demonstrative that points to something appearing later, used to build suspense and pull the reader in.",
			example: {
				jp: "だれもそれに{気|き}づかなかった。……まさかそれが{本物|ほんもの}の{人間|にんげん}の{手首|てくび}だなんて。",
				cn: "谁也没有注意到那个。……难道那竟然是真人的手腕。",
				en: "No one had noticed it. … There’s no way I thought it was a real human wrist.",
			},
			note: "本课要点。指示词在前文找不到答案时，就要往后读。",
			noteEn: "This is the key point of the lesson. If you can’t find the answer before the demonstrative, read on.",
		},
		{
			pattern: "〜わけがない",
			formation: "普通形 ＋ わけがない",
			meaning: "不可能……。表示强烈的否定。",
			meaningEn: "There’s no way … / it can’t be that …. A strong negative.",
			example: { jp: "{思|おも}うわけがないじゃないか。", cn: "怎么可能那么想呢。", en: "There’s no way I would have thought that." },
		},
		{
			pattern: "〜というわけじゃない",
			meaning: "并不是说……。部分否定，用来修正前面的说法。",
			meaningEn: "It’s not that … / I don’t mean …. A partial negative, used to correct what you just said.",
			example: { jp: "ジョンは{僕|ぼく}の{犬|いぬ}というわけじゃなくて", cn: "并不是说约翰是我的狗，", en: "it’s not that John is (just) my dog" },
		},
		{
			pattern: "〜まで（は）（倒置）",
			meaning: "直到……为止。放在句末形成倒装，是小说常用的悬念手法。",
			meaningEn: "Until …. Placed at the end as an inversion — a common suspense device in fiction.",
			example: {
				jp: "{全然|ぜんぜん}わからなかった。その{手|て}に{毛|け}が{生|は}えているのに{気|き}づくまでは。",
				cn: "完全不明白。直到注意到那只手上长着毛为止。",
				en: "I still had no idea. Until I noticed that hair was growing on that hand.",
			},
		},
		{
			pattern: "〜だなんて",
			meaning: "竟然是……。表示强烈的意外。",
			meaningEn: "To think that it was …! Marks strong surprise.",
			example: { jp: "まさかそれが{本物|ほんもの}だなんて", cn: "难道那竟然是真的", en: "there’s no way that was the real thing" },
		},
		{
			pattern: "〜だって",
			meaning: "就连……也……（＝でも）。口语。",
			meaningEn: "Even … (＝でも). Casual.",
			example: { jp: "{手|て}に{持|も}ったときだって、{全然|ぜんぜん}わからなかった。", cn: "就连拿在手里的时候，也完全不明白。", en: "Even when I held it, I still had no idea." },
		},
		{
			pattern: "〜てもいい（と思う）",
			meaning: "……也可以（吧）。表示自我认可。",
			meaningEn: "I think it’s all right to say …. Used to give yourself permission.",
			example: { jp: "{僕|ぼく}が{見|み}つけたと{言|い}ってもいいと{思|おも}う。", cn: "我觉得说是我发现的也行。", en: "I think it’s fair to say I found it." },
		},
	],
};
