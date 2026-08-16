import type { ReadingDay } from "./types";

// 第5週 4日目 家族② — printed pages 82–83
// 別冊 p.6（第5週の解答）は今回のスキャンに含まれていないため、答えは本文から導出。
export const w5d4: ReadingDay = {
	week: 5,
	day: 4,
	label: "家族②",
	labelKana: "かぞく",
	labelEn: "Family ②",
	printedPages: [82, 83],
	answerSource: "derived",

	point: {
		title: "{一般的|いっぱんてき}ではない{描写|びょうしゃ}に{注意|ちゅうい}しよう！",
		titleCn: "注意不符合常规的描写！",
		titleEn: "Pay attention to the descriptions that don't fit the stereotypes!",
		figure: {
			alt: "「子ども………みんなかわいい存在？？？」「母、妻………みんな家事をしている？？？」「父、夫………みんな仕事をしている？？？」という3つの問いかけと、「えっ？飛べないの？」「飛べないよ!!」と驚き合う鳥のイラスト",
			cn: "三个反问：「孩子……都是可爱的存在？？？」「母亲、妻子……都在做家务？？？」「父亲、丈夫……都在工作？？？」旁边两只鸟互相惊讶：「咦？你不会飞？」「我不会飞啊!!」",
			en: "Three rhetorical questions: “Children… are they all adorable???” “Mothers, wives… do they all do the housework???” “Fathers, husbands… do they all go to work???” Nearby, two birds surprise each other: “What? You can’t fly?” “I can’t fly!!”",
		},
		tips: [
			{
				jp: "{一般|いっぱん}の{常識|じょうしき}と{違|ちが}う{人|ひと}や{人間関係|にんげんかんけい}が{書|か}かれている{文章|ぶんしょう}がよくあります。「ふつうはこうだから」と{決|き}めつけずに、{書|か}いてあるとおりに{読|よ}もう。",
				cn: "文章里经常出现与一般常识不同的人物和人际关系。**不要用「一般来说应该是这样」去推断**，要按照文章实际写的内容来读。",
				en: "Passages often describe people and relationships that don’t match everyday stereotypes. Don’t assume “it’s usually like this,” and read exactly what is written.",
			},
		],
		expressions: [
			{ jp: "〜てたまらない", cn: "〜得受不了", en: "to be dying to …" },
			{ jp: "いまさら", cn: "事到如今", en: "now (at this late stage)" },
			{ jp: "〜もしないうちに", cn: "还不到〜的时候就……", en: "within …" },
			{ jp: "台所に立つ", kana: "だいどころにたつ", cn: "下厨、做饭", en: "to do the cooking" },
			{ jp: "わがまま", cn: "任性", en: "selfish" },
			{ jp: "気にかかる", kana: "きにかかる", cn: "挂念、放心不下", en: "to weigh on one’s mind" },
			{ jp: "のんびり", cn: "悠闲地", en: "in a relaxed way; at one’s ease" },
			{ jp: "気楽", kana: "きらく", cn: "轻松自在", en: "carefree; easygoing" },
		],
	},

	renshu: {
		instruction: "{次|つぎ}の{会話文|かいわぶん}を{読|よ}んで、{後|あと}の{文|ぶん}から{正|ただ}しいものを{選|えら}ぼう。",
		instructionCn: "阅读下面的对话，从后面的句子中选出正确的。（答案在下一页）",
		instructionEn: "Read the conversation below and choose the correct statements from the sentences that follow. (Answers are on the next page.)",
		blocks: [
			{
				type: "speech",
				speaker: "{母|はは}",
				speakerCn: "母亲",
				speakerEn: "Mother",
				jp: "あなたには、{本当|ほんとう}は4つ{上|うえ}のお{姉|ねえ}さんがいるのよ。",
				cn: "其实啊，你还有一个大你四岁的姐姐。",
				en: "The truth is, you have an older sister who’s four years older than you.",
			},
			{
				type: "speech",
				speaker: "{幸|さち}",
				speakerCn: "幸",
				speakerEn: "Sachi",
				jp: "え？　ということは、お{母|かあ}さん、{前|まえ}の{結婚|けっこん}のとき、{子|こ}どもがいたの？",
				cn: "咦？也就是说，妈妈你上一段婚姻里有孩子？",
				en: "What? So you had a child in your previous marriage?",
			},
			{
				type: "speech",
				speaker: "{母|はは}",
				speakerCn: "母亲",
				speakerEn: "Mother",
				jp: "そう……いろいろあってね……。{赤|あか}ちゃんを{置|お}いて{飛|と}び{出|だ}しちゃったの。",
				cn: "是啊……当时发生了很多事……我把还是婴儿的她丢下，就跑出来了。",
				en: "Yes… a lot happened… I left the baby behind and ran away.",
			},
			{
				type: "speech",
				speaker: "{幸|さち}",
				speakerCn: "幸",
				speakerEn: "Sachi",
				jp: "ふーん。それから{会|あ}ったことないの？　{会|あ}いたいでしょう？",
				cn: "唔……那之后就没见过面吗？你应该很想见她吧？",
				en: "Huh. And you haven’t seen her since? You must want to see her, right?",
			},
			{
				type: "speech",
				speaker: "{母|はは}",
				speakerCn: "母亲",
				speakerEn: "Mother",
				jp: "うん、はじめのうちは{会|あ}いたくてたまらなかった（※1）けれど……。でも、もう{昔|むかし}のことだし、{彼女|かのじょ}には{彼女|かのじょ}の{生活|せいかつ}があるでしょうし、いまさら（※2）……。{私|わたし}はあなたたちのお{父|とう}さんと{知|し}り{合|あ}って{結婚|けっこん}して{本当|ほんとう}によかったと{思|おも}っているの。{優|やさ}しいお{父|とう}さんだし、あなたも{広平|こうへい}もいい{子|こ}だしね。",
				cn: "嗯，一开始想见她想得受不了……可是，都是很久以前的事了，她也有她自己的生活，事到如今……我觉得能认识你们的爸爸、和他结婚，真是太好了。爸爸人很温柔，你和广平也都是好孩子。",
				en: "Yes, at first I was dying to see her… But it’s all in the past, and she has her own life now, so at this late stage… I’m really glad I met your father and married him. He’s a kind man, and you and Kohei are good kids too.",
			},
		],
		footnotes: [
			{ marker: "※1", term: "〜てたまらない", jp: "to be dying to …", cn: "〜得受不了", en: "to be dying to …" },
			{ marker: "※2", term: "いまさら", jp: "now (at this late stage)", cn: "事到如今", en: "now (at this late stage)" },
		],
		choices: [
			{ jp: "{幸|さち}の{母|はは}は{離婚|りこん}したことがある。", cn: "幸的母亲离过婚。", en: "Sachi’s mother has been divorced." },
			{ jp: "{幸|さち}は{自分|じぶん}にお{姉|ねえ}さんがいることを{知|し}っていた。", cn: "幸原本就知道自己有个姐姐。", en: "Sachi already knew she had an older sister." },
			{
				jp: "{幸|さち}の{母|はは}は{前|まえ}の{結婚|けっこん}のときにできた{子|こ}どもとときどき{会|あ}っている。",
				cn: "幸的母亲偶尔会和前一段婚姻中生的孩子见面。",
				en: "Sachi’s mother sometimes sees the child from her previous marriage.",
			},
			{ jp: "{幸|さち}の{母|はは}は{置|お}いてきた{娘|むすめ}に{今|いま}とても{会|あ}いたいと{思|おも}っている。", cn: "幸的母亲现在非常想见那个被留下的女儿。", en: "Sachi’s mother very much wants to see the daughter she left behind now." },
			{ jp: "{幸|さち}の{母|はは}は{今幸|いましあわ}せだと{思|おも}っている。", cn: "幸的母亲觉得现在很幸福。", en: "Sachi’s mother feels she is happy now." },
		],
		answers: [1, 5],
		hint: {
			jp: "「いまさら……」（→いまさら{会|あ}おうとは{思|おも}わない）。「{会|あ}いたくてたまらなかった」は{過去|かこ}のこと。",
			cn: "「いまさら……」后面省略了「会おうとは思わない（不打算见了）」；「会いたくてたまらなかった」用的是过去式，说明那是一开始的心情，现在已经不同了。",
			en: "“いまさら……” leaves out “I don’t think I’ll try to see her now.” “会いたくてたまらなかった” is in the past, so that was how she felt at first — not how she feels now.",
		},
	},

	mondai: {
		instruction: "{次|つぎ}の{文章|ぶんしょう}を{読|よ}んで、{後|あと}の{問|と}いに{答|こた}えなさい。",
		instructionCn: "阅读下面的文章，回答后面的问题。（原书答案在别册 p.6）",
		instructionEn: "Read the passage below and answer the questions that follow. (Answers are in the supplement, p. 6.)",
		blocks: [
			{
				type: "paragraph",
				indent: true,
				jp: "{私|わたし}には{姉|あね}がいる。いや、いるらしい。{会|あ}ったことがないのだ。{私|わたし}の{母|はは}は{二十歳|はたち}の{頃|ころ}、{最初|さいしょ}の{結婚|けっこん}をして{女|おんな}の{子|こ}を{産|う}んだのだが、その{後|ご}1{年|ねん}もしないうちに（※1）、その{子|こ}を{置|お}いて{家|いえ}を{飛|と}び{出|だ}したらしい。{数年後|すうねんご}に{父|ちち}と{再婚|さいこん}して{私|わたし}と{弟|おとうと}ができたということだが、{私|わたし}はこの{話|はなし}を{最近聞|さいきんき}かされた。{母|はは}はその{子|こ}に{一度|いちど}も{会|あ}いに{行|い}っていないらしい。{会|あ}いたくないのか、とたずねたら、「もう{昔|むかし}のことだし、{彼女|かのじょ}もきっと{会|あ}いたくないでしょうから」という{答|こた}えだった。{子|こ}どもに{対|たい}してもう{愛情|あいじょう}がないのか{私|わたし}は{疑問|ぎもん}に{思|おも}った＊。{母|はは}にとって、{前|まえ}の{結婚|けっこん}はまったく{過去|かこ}の{話|はなし}になっているのだろうか。",
				cn: "我有一个姐姐。不，是「好像有」。因为我从没见过她。母亲二十岁左右时第一次结婚，生下了一个女孩，可是不到一年，就把那孩子丢下、离家出走了。几年后她和父亲再婚，才有了我和弟弟——这些事我最近才被告知。听说母亲一次也没有去见过那个孩子。我问她是不是不想见，她的回答是：「都是很久以前的事了，她大概也不想见我吧。」我心里疑惑：难道她对自己的孩子已经没有感情了吗＊。对母亲来说，上一段婚姻是不是已经完全成了过去？",
				en: "I have an older sister. Or rather, I seem to. I’ve never met her. When my mother was around twenty, she got married for the first time and had a baby girl, but within a year she left the child behind and ran away from home. A few years later she remarried my father, and then my brother and I were born — I was only told this recently. Apparently my mother has never once gone to see that child. When I asked if she didn’t want to see her, the answer was, “It’s all in the past, and I’m sure she wouldn’t want to see me either.” I wondered if she no longer had any affection for her child＊. For my mother, has that earlier marriage become completely a thing of the past?",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "{母|はは}は{父|ちち}と{結婚|けっこん}してから{本当|ほんとう}に{幸|しあわ}せだという。そりゃ（※2）そうだと{思|おも}う＊＊。{父|ちち}は{優|やさ}しいだけではなく、{家事|かじ}もよくする。うちは{母|はは}より{父|ちち}が{台所|だいどころ}に{立|た}つ（※3）ことが{多|おお}いくらいだ。{母|はは}のわがままもよく{聞|き}いている。{母|はは}は{今日|きょう}ものんびりとお{茶|ちゃ}を{飲|の}みながらテレビを{見|み}ていた。{本当|ほんとう}に{気楽|きらく}なものだ。",
				cn: "母亲说，和父亲结婚以后她真的很幸福。这我倒是觉得理所当然＊＊。父亲不但温柔，家务也做得很多。我们家甚至是父亲下厨的次数比母亲还多。母亲的任性他也总是顺着。母亲今天也照样悠闲地喝着茶看电视。真是自在得很。",
				en: "My mother says she has been truly happy since she married my father. I can see that＊＊. Father is not only kind; he also does a lot of housework. In our house Father is in the kitchen even more often than Mother. He also goes along with her selfishness. Today, too, she was sipping tea and watching TV at her ease. She really has it easy.",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "{母|はは}が{満足|まんぞく}ならいいと{思|おも}う。でも、{私|わたし}はまだ{見|み}ぬ{姉|あね}のことがなぜか{気|き}にかかる。{彼女|かのじょ}は{幸|しあわ}せなのだろうか。",
				cn: "只要母亲满足，我觉得也就好了。可是，我却不知为何总惦记着那个素未谋面的姐姐。她过得幸福吗？",
				en: "If my mother is content, I think that’s fine. But for some reason the sister I’ve never met still weighs on my mind. I wonder if she is happy.",
			},
		],
		footnotes: [
			{ marker: "※1", term: "〜もしないうちに", jp: "within …", cn: "还不到〜就……", en: "within …" },
			{ marker: "※2", term: "そりゃ", jp: "それは", cn: "那（口语形）", en: "that (casual form of それは)" },
			{ marker: "※3", term: "台所に立つ", jp: "to do the cooking", cn: "下厨、做饭", en: "to do the cooking" },
		],
		pageNotes: [
			{
				jp: "＊ I wondered if she no longer had any affection or love for her child.",
				cn: "＊我心里疑惑：难道母亲对那个孩子已经没有感情了吗？",
				en: "＊ I wondered if she no longer had any affection or love for her child.",
			},
			{ jp: "＊＊ I understand that.", cn: "＊＊这我倒是觉得理所当然。", en: "＊＊ I understand that." },
		],
		questions: [
			{
				label: "問1",
				jp: "「まったく{過去|かこ}の{話|はなし}になっている」とあるが、どういう{意味|いみ}か。",
				cn: "文中说「已经完全成了过去」，这是什么意思？",
				en: "The text says it “has become completely a thing of the past.” What does that mean?",
				choices: [
					{ jp: "{完全|かんぜん}に{終|お}わったことである", cn: "是已经完全结束了的事", en: "It is something that is completely over." },
					{ jp: "すっかり{記憶|きおく}がなくなってしまった", cn: "记忆已经完全消失了", en: "The memory of it has completely disappeared." },
					{ jp: "{現在|げんざい}とは{全然違|ぜんぜんちが}うものである", cn: "和现在完全是两回事", en: "It is completely different from the present." },
					{ jp: "いやな{思|おも}い{出|で}として{残|のこ}っている", cn: "作为讨厌的回忆留了下来", en: "It remains as an unpleasant memory." },
				],
				answer: 1,
				explanation:
					"「過去の話になっている」直译是「已经变成过去的事了」，也就是**在心里已经彻底告一段落、结束了**。前文母亲说「もう昔のことだし、彼女もきっと会いたくないでしょうから」，一次也没去见过——正是「完全に終わったこと」的态度。所以 1 正确。",
				explanationEn:
					"“過去の話になっている” literally means “it has become a story of the past” — in other words, in her mind it is completely finished. Earlier the mother says, “It’s all in the past, and I’m sure she wouldn’t want to see me either,” and she has never gone to see her — that is exactly the attitude of “something completely over.” So 1 is correct.",
				choiceNotes: [
					"正确。「過去の話になっている」＝在心里已经完全结束了。",
					"母亲清楚地记得这件事、还能谈论它，不是失去记忆。",
					"「现在与过去不同」是理所当然的事实陈述，不是这句话要表达的意思。",
					"文中没有写母亲把它当作「讨厌的回忆」；如果那样，作者就不会怀疑「愛情がないのか」了。",
				],
				choiceNotesEn: [
					"Correct. “過去の話になっている” = in her mind it is completely over.",
					"The mother clearly remembers it and can still talk about it, so it is not a lost memory.",
					"“The present is different from the past” is an obvious fact, not what this phrase means.",
					"The text does not say she keeps it as an unpleasant memory; if she did, the writer wouldn’t wonder whether she still has any affection.",
				],
			},
			{
				label: "問2",
				jp: "{筆者|ひっしゃ}は{母|はは}の{話|はなし}を{聞|き}いてどういう{気持|きも}ちか。",
				cn: "笔者听了母亲的话之后是什么心情？",
				en: "How does the writer feel after hearing her mother’s story?",
				choices: [
					{ jp: "{自分|じぶん}に{姉|あね}がいることを{知|し}ってとてもショックだ。", cn: "得知自己有个姐姐，非常震惊。", en: "She is very shocked to learn she has an older sister." },
					{ jp: "{母|はは}はわがままに{生|い}きていて{勝手|かって}だ。", cn: "母亲活得很任性、很自私。", en: "Her mother lives selfishly and does as she likes." },
					{ jp: "{姉|あね}がどういう{生活|せいかつ}をしているのか{気|き}になる。", cn: "很在意姐姐过着什么样的生活。", en: "She wonders what kind of life her sister is living." },
					{ jp: "{父|ちち}がかわいそうだ。", cn: "觉得父亲很可怜。", en: "She feels sorry for her father." },
				],
				answer: 3,
				explanation:
					"文章的最后一段就是答案所在：「私はまだ見ぬ姉のことがなぜか気にかかる。彼女は幸せなのだろうか。」——惦记着素未谋面的姐姐，想知道她过得好不好。随笔类文章的结论往往放在最后，所以 3 正确。",
				explanationEn:
					"The last paragraph is where the answer is: “For some reason the sister I’ve never met still weighs on my mind. I wonder if she is happy.” She is thinking about the sister she has never met and wondering whether she is doing well. In essays like this, the conclusion often comes at the end, so 3 is correct.",
				choiceNotes: [
					"作者的反应是平静的叙述和惦记，没有写到「ショック」。",
					"作者说「母が満足ならいいと思う」，是接受的态度，没有责备母亲自私。",
					"正确。「まだ見ぬ姉のことがなぜか気にかかる」「彼女は幸せなのだろうか」。",
					"文中的父亲温柔、乐于做家务，作者并没有同情他。",
				],
				choiceNotesEn: [
					"The writer’s reaction is calm narration and concern, not “shock.”",
					"The writer says “if Mother is content, that’s fine” — an accepting attitude, not a charge that Mother is selfish.",
					"Correct. “The sister I’ve never met still weighs on my mind” / “I wonder if she is happy.”",
					"The father in the text is kind and does housework; the writer does not pity him.",
				],
			},
		],
	},

	vocab: [
		{ jp: "描写", kana: "びょうしゃ", cn: "描写", en: "description", pos: "名詞" },
		{ jp: "一般的", kana: "いっぱんてき", cn: "一般的、普遍的", en: "general; typical", pos: "な形" },
		{ jp: "常識", kana: "じょうしき", cn: "常识", en: "common sense; a stereotype", pos: "名詞" },
		{ jp: "産む", kana: "うむ", cn: "生（孩子）", en: "to give birth to", pos: "動詞" },
		{ jp: "飛び出す", kana: "とびだす", cn: "跑出去、离家出走", en: "to run out; to leave home", pos: "動詞" },
		{ jp: "再婚する", kana: "さいこんする", cn: "再婚", en: "to remarry", pos: "動詞" },
		{ jp: "愛情", kana: "あいじょう", cn: "爱、感情", en: "affection; love", pos: "名詞" },
		{ jp: "疑問に思う", kana: "ぎもんにおもう", cn: "感到疑惑", en: "to wonder; to have doubts", pos: "表現" },
		{ jp: "過去", kana: "かこ", cn: "过去", en: "the past", pos: "名詞" },
		{ jp: "家事", kana: "かじ", cn: "家务", en: "housework", pos: "名詞" },
		{ jp: "台所", kana: "だいどころ", cn: "厨房", en: "kitchen", pos: "名詞" },
		{ jp: "わがまま", cn: "任性", en: "selfish; willful", pos: "な形" },
		{ jp: "のんびり", cn: "悠闲地", en: "in a relaxed way", pos: "副詞" },
		{ jp: "気楽", kana: "きらく", cn: "轻松自在", en: "carefree; easy", pos: "な形" },
		{ jp: "満足", kana: "まんぞく", cn: "满足", en: "contentment; satisfaction", pos: "名詞・な形" },
		{ jp: "気にかかる", kana: "きにかかる", cn: "挂念、放心不下", en: "to weigh on one’s mind", pos: "表現" },
		{ jp: "たずねる", cn: "询问", en: "to ask", pos: "動詞" },
		{ jp: "勝手", kana: "かって", cn: "自私、随便", en: "selfish; doing as one likes", pos: "な形" },
	],

	grammar: [
		{
			pattern: "〜らしい",
			meaning: "好像……。本文开头「私には姉がいる。いや、いるらしい」——用「らしい」表示这不是自己确认的事实，而是听来的。",
			meaningEn: "Apparently … / it seems …. The opening “I have an older sister. Or rather, I seem to” uses “らしい” to show this is not a fact she has confirmed herself, but something she was told.",
			example: { jp: "その{子|こ}を{置|お}いて{家|いえ}を{飛|と}び{出|だ}したらしい。", cn: "听说她把那孩子丢下就离家出走了。", en: "Apparently she left the child behind and ran away from home." },
			note: "本课要点：「らしい」提醒读者这只是传闻，不要当成确定的事实。",
			noteEn: "A key point of the lesson: “らしい” reminds you this is hearsay, not a confirmed fact.",
		},
		{
			pattern: "〜もしないうちに",
			formation: "期間を表す名詞 ＋ もしないうちに",
			meaning: "还不到……就……。强调时间之短。",
			meaningEn: "Before even … had passed. Emphasizes how short the time was.",
			example: { jp: "その{後|ご}1{年|ねん}もしないうちに", cn: "那之后还不到一年就……", en: "within a year after that" },
		},
		{
			pattern: "〜てたまらない",
			formation: "形容詞て形／動詞たい形 ＋ てたまらない",
			meaning: "……得受不了。表示程度强烈。",
			meaningEn: "So … I can’t stand it / dying to …. Marks a very strong degree.",
			example: { jp: "はじめのうちは{会|あ}いたくてたまらなかった", cn: "一开始想见她想得受不了", en: "at first I was dying to see her" },
		},
		{
			pattern: "〜（ら）れる（受身）",
			meaning: "被……。「聞かされた」是使役被动，表示「被告知」。",
			meaningEn: "To be …-ed. “聞かされた” is causative-passive: “was told.”",
			example: { jp: "{私|わたし}はこの{話|はなし}を{最近聞|さいきんき}かされた。", cn: "这些事我最近才被告知。", en: "I was only told this recently." },
		},
		{
			pattern: "〜にとって",
			meaning: "对……来说。表示评价的立场。",
			meaningEn: "For … / from the point of view of …. Marks whose standpoint a judgment is from.",
			example: { jp: "{母|はは}にとって、{前|まえ}の{結婚|けっこん}は……", cn: "对母亲来说，上一段婚姻……", en: "for Mother, that earlier marriage …" },
		},
		{
			pattern: "〜ぬ（＝〜ない）",
			meaning: "文语否定形。「まだ見ぬ姉」＝还没见过的姐姐。",
			meaningEn: "Classical negative (= ない). “まだ見ぬ姉” = the sister I have not yet met.",
			example: { jp: "まだ{見|み}ぬ{姉|あね}のことがなぜか{気|き}にかかる。", cn: "总惦记着那个素未谋面的姐姐。", en: "The sister I’ve never met still weighs on my mind." },
		},
		{
			pattern: "〜のだろうか",
			meaning: "究竟是……吗？表示笔者心中的疑问，随笔常用来收尾。",
			meaningEn: "I wonder if …? Marks a question in the writer’s mind; essays often end this way.",
			example: { jp: "{彼女|かのじょ}は{幸|しあわ}せなのだろうか。", cn: "她过得幸福吗？", en: "I wonder if she is happy." },
		},
	],
};
