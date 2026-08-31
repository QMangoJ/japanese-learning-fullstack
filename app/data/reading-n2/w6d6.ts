import type { ReadingDay } from "../reading-n3/types";

// 第6週 6日目 数学に関する文章 — printed pages 106–107
export const w6d6: ReadingDay = {
	week: 6,
	day: 6,
	label: "数学に関する文章",
	labelKana: "すうがくにかんするぶんしょう",
	labelEn: "Articles on Mathematics",
	printedPages: [106, 107],
	answerSource: "book",

	point: {
		title: "{複雑|ふくざつ}な{文章|ぶんしょう}を{整理|せいり}して{理解|りかい}しよう！③",
		titleCn: "整理并理解复杂的文章内容！③",
		titleEn: "Try to understand the complicated sentences by reorganizing them! ③",
		figure: {
			alt: "「全体の構成がわかったら、問いを先に読むと効果的です。」と言うキャラクター",
			cn: "角色说：「弄清整体结构之后，先读问题会更有效。」",
			en: "A character says, “Once you see the overall structure, it is effective to read the questions first.”",
		},
		tips: [
			{
				jp: "{例|たと}えば、{右|みぎ}の{文章|ぶんしょう}はこんな{構成|こうせい}になっています。",
				cn: "比如，右页的文章就是这样的结构。",
				en: "For example, the passage on the right is organized like this.",
			},
			{
				jp: "{第|だい}1{段落|だんらく}：{筆者|ひっしゃ}が{読者|どくしゃ}に{呼|よ}びかけ、{意見|いけん}を{言|い}っている　／　{第|だい}2{段落|だんらく}：{昔|むかし}……　{第|だい}3{段落|だんらく}：そこへ……　{第|だい}4{段落|だんらく}：{何年|なんねん}か{後|あと}……　{第|だい}5{段落|だんらく}：ところが……　→　{話|はなし}　このように2つの{部分|ぶぶん}に{分|わ}かれていることがわかります。",
				cn: "第 1 段：笔者向读者打招呼并发表意见　／　第 2 段：从前……　第 3 段：这时……　第 4 段：过了几年……　第 5 段：可是……　→　故事　可以看出全文分成这样两部分。",
				en: "Paragraph 1: the writer addresses the reader and states an opinion. / Paragraph 2: Long ago…  Paragraph 3: Then…  Paragraph 4: Some years later…  Paragraph 5: However…  → the story. You can see the passage splits into these two parts.",
			},
			{
				jp: "{全体|ぜんたい}の{構成|こうせい}がわかったら、{問|と}いを{先|さき}に{読|よ}むと{効果的|こうかてき}です。",
				cn: "弄清整体结构之后，先读问题会更有效。",
				en: "Once you understand the overall structure, it is effective to read the questions first.",
			},
		],
		expressions: [
			{ jp: "分数", kana: "ぶんすう", cn: "分数", en: "fraction" },
			{ jp: "割り切れる", kana: "わりきれる", cn: "能整除、除得尽", en: "to divide evenly" },
			{ jp: "前述の", kana: "ぜんじゅつの", cn: "前面所述的", en: "the aforementioned" },
			{ jp: "長男／次男／三男", kana: "ちょうなん／じなん／さんなん", cn: "长子／次子／三子", en: "eldest / second / third son" },
			{ jp: "〜どおりに", cn: "按照……那样", en: "just as…; according to…" },
			{ jp: "〜に対し", kana: "たいし", cn: "与……相对", en: "whereas; in contrast to…" },
			{ jp: "気が付く", kana: "きがつく", cn: "注意到、发觉", en: "to notice" },
			{ jp: "余る", kana: "あまる", cn: "剩余", en: "to be left over" },
		],
	},

	renshu: {
		instruction:
			"{次|つぎ}の{会話文|かいわぶん}を{読|よ}んで、{後|あと}の{文|ぶん}から{正|ただ}しいものを{選|えら}ぼう。",
		instructionCn: "阅读下面的对话，从后面的句子中选出正确的。（答案在下一页）",
		instructionEn:
			"Read the conversation below and choose the correct statements from the sentences that follow. (Answers are on the next page.)",
		blocks: [
			{
				type: "speech",
				speaker: "{子|こ}",
				speakerCn: "孩子",
				speakerEn: "Child",
				jp: "お{父|とう}さん、ラクダ（{注|ちゅう}）の{計算|けいさん}の{話|はなし}、{知|し}ってる？",
				cn: "爸爸，骆驼（注）分配的计算故事，你知道吗？",
				en: "Dad, do you know the story about calculating with camels (note)?",
			},
			{
				type: "speech",
				speaker: "{父|ちち}",
				speakerCn: "父亲",
				speakerEn: "Father",
				jp: "ああ、1{頭|とう}{借|か}りて3{人|にん}で{分|わ}けて、{借|か}りた1{頭|とう}もちゃんと{返|かえ}せたって{話|はなし}ね。",
				cn: "啊，借来一头，三个人分完，借来的那一头也顺利还回去了的那个故事吧。",
				en: "Ah, the one where they borrow one camel, divide among three, and still manage to give the borrowed one back.",
			},
			{
				type: "speech",
				speaker: "{子|こ}",
				speakerCn: "孩子",
				speakerEn: "Child",
				jp: "うん、その{後|あと}の{話|はなし}がわからないんだ。",
				cn: "嗯，那之后的故事我就搞不懂了。",
				en: "Yeah — it’s the story after that I don’t get.",
			},
			{
				type: "speech",
				speaker: "{父|ちち}",
				speakerCn: "父亲",
				speakerEn: "Father",
				jp: "まねした{人|ひと}が{貸|か}した1{頭|とう}を{返|かえ}してもらえなかったっていうんだろ？",
				cn: "是模仿的人把借出的那一头没能要回来的那个吧？",
				en: "You mean the one where the person who copied it didn’t get the camel they lent back?",
			},
			{
				type: "speech",
				speaker: "{子|こ}",
				speakerCn: "孩子",
				speakerEn: "Child",
				jp: "そう。どうして、{同|おな}じようにしたのにだめだったの？",
				cn: "对。为什么做法一样却不行了呢？",
				en: "Right. Why did the same method not work?",
			},
			{
				type: "speech",
				speaker: "{父|ちち}",
				speakerCn: "父亲",
				speakerEn: "Father",
				jp: "{分数|ぶんすう}にして、{足|た}し{算|ざん}してみたら{答|こた}えが{違|ちが}うことに{気|き}が{付|つ}くよ。1/2 ＋ 1/3 ＋ 1/9はどうやって{足|た}す？",
				cn: "改成分数做加法，就会发现答案不一样。1/2＋1/3＋1/9 怎么加？",
				en: "If you turn them into fractions and add them up, you’ll notice the answers are different. How do you add 1/2 + 1/3 + 1/9?",
			},
			{
				type: "speech",
				speaker: "{子|こ}",
				speakerCn: "孩子",
				speakerEn: "Child",
				jp: "えっと、{分母|ぶんぼ}を18にして、9＋6＋2だから、17/18でしょ。それから、こっちは{分母|ぶんぼ}を12にして6＋4＋2で、12/12……あ、そうか。",
				cn: "嗯，把分母变成 18，9＋6＋2，所以是 17/18。然后这边把分母变成 12，6＋4＋2 是 12/12……啊，原来如此。",
				en: "Um, make the denominator 18: 9 + 6 + 2, so 17/18. And this one, denominator 12: 6 + 4 + 2 is 12/12… oh, I see.",
			},
		],
		footnotes: [
			{ marker: "（注）", term: "ラクダ", jp: "a camel", cn: "骆驼", en: "a camel" },
		],
		choices: [
			{
				jp: "{子|こ}どもはラクダの{計算|けいさん}の{話|はなし}を{聞|き}いたことがない。",
				cn: "孩子从没听过骆驼计算的故事。",
				en: "The child has never heard the camel-calculation story.",
			},
			{
				jp: "ラクダの{計算|けいさん}を{使|つか}うと{何|なに}かを{分|わ}けるときに{必|かなら}ずうまくいく。",
				cn: "用骆驼计算的方法分东西时一定能成功。",
				en: "Using the camel calculation always works when dividing something.",
			},
			{
				jp: "ラクダの{計算|けいさん}の{話|はなし}には、{借|か}りたラクダを{返|かえ}せた{話|はなし}と{返|かえ}せない{話|はなし}がある。",
				cn: "骆驼计算的故事里，有借来的骆驼能还回去的，也有还不回去的。",
				en: "In the camel-calculation stories, there is one where the borrowed camel can be returned and one where it cannot.",
			},
			{
				jp: "{父親|ちちおや}はラクダの{計算|けいさん}を{子|こ}どもから{教|おし}えてもらった。",
				cn: "父亲是从孩子那里学会骆驼计算的。",
				en: "The father was taught the camel calculation by the child.",
			},
			{
				jp: "{子|こ}どもは{父親|ちちおや}のヒントでラクダの{計算|けいさん}を{理解|りかい}した。",
				cn: "孩子靠父亲的提示理解了骆驼计算。",
				en: "The child understood the camel calculation from the father’s hint.",
			},
		],
		answers: [3, 5],
	},

	mondai: {
		instruction: "{次|つぎ}の{文章|ぶんしょう}を{読|よ}んで、{後|あと}の{問|と}いに{答|こた}えなさい。",
		instructionCn: "阅读下面的文章，回答后面的问题。（答案在别册 p.7）",
		instructionEn: "Read the following passage and answer the questions that follow. (Answers are in the separate booklet, p. 7.)",
		blocks: [
			{
				type: "paragraph",
				indent: true,
				jp: "みなさんは、{分数|ぶんすう}が{得意|とくい}だろうか。{分数|ぶんすう}と{聞|き}くだけで、{嫌|いや}だと{思|おも}う{人|ひと}もいるかもしれない。{実|じつ}はコンピューターでさえ、{分数|ぶんすう}は{苦手|にがて}だとか。でも、①この{話|はなし}を{読|よ}めば、きっと{分数|ぶんすう}に{興味|きょうみ}を{持|も}つようになるだろう。",
				cn: "各位擅长分数吗？也许有人一听到分数就觉得讨厌。据说就连电脑也不擅长分数。不过，读了①这个故事，你一定会对分数产生兴趣吧。",
				en: "Are you good at fractions? Some people may dislike them at the mere mention. Computers themselves are said to be weak at fractions. But if you read ① this story, you will surely come to take an interest in fractions.",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "{昔|むかし}、アラビア（{注|ちゅう}1）のある{村|むら}で{年老|としお}いた{商人|しょうにん}が3{人|にん}の{息子|むすこ}に{次|つぎ}のような{言葉|ことば}を{残|のこ}して{亡|な}くなった。「{私|わたし}が{死|し}んだらラクダをお{前|まえ}たちにやる。{長男|ちょうなん}は1/2、{次男|じなん}は1/3、{三男|さんなん}は1/9とする。」ところが、ラクダの{数|かず}は17{頭|とう}だったので、2でも、3でも9でも{割|わ}り{切|き}れない（{注|ちゅう}2）。3{人|にん}はけんかを{始|はじ}めてしまった。",
				cn: "从前，在阿拉伯（注1）的某个村子里，一位年迈的商人给三个儿子留下这样的话就去世了：「我死后把骆驼分给你们。长子 1/2，次子 1/3，三子 1/9。」可骆驼一共 17 头，2、3、9 都除不尽（注2）。三个人就吵了起来。",
				en: "Long ago, in a village in Arabia (note 1), an aged merchant died leaving these words to his three sons: “When I die I will give you the camels. The eldest shall have 1/2, the second 1/3, the third 1/9.” But there were 17 camels, which cannot be divided evenly (note 2) by 2, 3, or 9. The three began to quarrel.",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "そこへ{旅|たび}の{老人|ろうじん}がラクダに{乗|の}ってやってきた。そしてけんかの{理由|りゆう}を{聞|き}き、「それなら{私|わたし}のラクダを{貸|か}してあげよう。」と{言|い}った。{父親|ちちおや}の{残|のこ}したラクダに1{頭|とう}{足|た}すと18{頭|とう}になったので、{長男|ちょうなん}は9{頭|とう}、{次男|じなん}は6{頭|とう}、{三男|さんなん}は2{頭|とう}で{父親|ちちおや}の{言葉|ことば}どおりに{分|わ}けることができた。{余|あま}った1{頭|とう}は{元通|もとどお}りに{旅|たび}の{老人|ろうじん}が{連|つ}れていった。",
				cn: "这时一位旅行的老人骑着骆驼过来了。听完吵架的原因，他说：「那就借给你们我的骆驼吧。」父亲留下的骆驼加上 1 头变成 18 头，于是长子 9 头、次子 6 头、三子 2 头，正好按父亲的话分完。剩下的 1 头仍由旅行的老人带走。",
				en: "Then an old traveler arrived on a camel. Hearing why they were quarreling, he said, “Then I will lend you my camel.” Adding one to the father’s camels made 18, so the eldest got 9, the second 6, and the third 2, divided just as the father had said. The leftover one the traveler took away as before.",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "{何年|なんねん}か{後|あと}、{同|おな}じように11{頭|とう}のラクダを{連|つ}れている{老人|ろうじん}が「{長男|ちょうなん}には1/2、{次男|じなん}には1/3、{三男|さんなん}には1/6のラクダを。」と{言|い}い{残|のこ}して{死|し}んでしまった。そこで、{前述|ぜんじゅつ}の（{注|ちゅう}3）{話|はなし}を{思|おも}い{出|だ}した{近所|きんじょ}の{人|ひと}が{自分|じぶん}のラクダを{連|つ}れてきて{解決|かいけつ}してみせようとした*。{長男|ちょうなん}には1/2の6{頭|とう}、{次男|じなん}には1/3の4{頭|とう}、{三男|さんなん}には1/6の2{頭|とう}。",
				cn: "过了几年，同样有一位带着 11 头骆驼的老人留下「长子 1/2，次子 1/3，三子 1/6」的话就死了。于是，想起前述（注3）故事的邻居牵来自己的骆驼，想当场解决*。长子分到 1/2 即 6 头，次子 1/3 即 4 头，三子 1/6 即 2 头。",
				en: "Some years later, in the same way, an old man with 11 camels died leaving the words “1/2 to the eldest, 1/3 to the second, 1/6 to the third.” A neighbor who remembered the story told above (note 3) brought his own camel and tried to settle it*. The eldest got 1/2, six camels; the second 1/3, four; the third 1/6, two.",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "ところが、{今度|こんど}は3{人|にん}のラクダを{合計|ごうけい}すると6＋4＋2＝12{頭|とう}となり、{連|つ}れてきたラクダを{持|も}って{帰|かえ}ることができず、{損|そん}をしてしまった。{前|まえ}の{話|はなし}では1/2＋1/3＋1/9＝17/18になるのに{対|たい}し、1/2＋1/3＋1/6＝1となり、（②）に{気|き}づかなかったのだ。",
				cn: "可是这次三个人的骆驼合计 6＋4＋2＝12 头，牵来的那头骆驼带不回去了，亏了。前一个故事里 1/2＋1/3＋1/9＝17/18，与此相对，1/2＋1/3＋1/6＝1，他没有注意到（②）。",
				en: "This time, though, the three men’s camels added up to 6 + 4 + 2 = 12, so he could not take home the camel he had brought, and he took a loss. In the earlier story 1/2 + 1/3 + 1/9 = 17/18, whereas 1/2 + 1/3 + 1/6 = 1, and he had not noticed (②).",
			},
		],
		footnotes: [
			{ marker: "（注1）", term: "アラビア", jp: "Arabia", cn: "阿拉伯", en: "Arabia" },
			{ marker: "（注2）", term: "割り切れる", jp: "can be divided by …", cn: "整除", en: "can be divided evenly by…" },
			{ marker: "（注3）", term: "前述の", jp: "前に述べた", cn: "前面所述的", en: "the aforementioned" },
		],
		pageNotes: [
			{
				jp: "A neighbor who remembered the story he had heard earlier brought his own camel to settle the problem",
				cn: "一位邻居想起往事，便牵来自己的骆驼要帮他们解决难题",
				en: "A neighbor who remembered the story he had heard earlier brought his own camel to settle the problem",
			},
		],
		questions: [
			{
				label: "問1",
				jp: "①この{話|はなし}とはどんな{話|はなし}か。{最|もっと}も{適当|てきとう}なものを{選|えら}びなさい。",
				cn: "①这个故事是怎样的故事？请选最合适的一项。",
				en: "What kind of story is ① “this story”? Choose the most appropriate option.",
				choices: [
					{
						jp: "{分数|ぶんすう}の{苦手|にがて}な{人|ひと}の{話|はなし}",
						cn: "不擅长分数的人的故事",
						en: "a story of people who are bad at fractions",
					},
					{
						jp: "ラクダの{分配|ぶんぱい}の{話|はなし}",
						cn: "骆驼分配的故事",
						en: "a story of dividing camels",
					},
					{
						jp: "{分数|ぶんすう}に{興味|きょうみ}を{持|も}った{人|ひと}の{話|はなし}",
						cn: "对分数产生了兴趣的人的故事",
						en: "a story of people who took an interest in fractions",
					},
					{
						jp: "アラビアの{老人|ろうじん}の{話|はなし}",
						cn: "阿拉伯老人的故事",
						en: "a story of an old man in Arabia",
					},
				],
				answer: 2,
				explanation:
					"①「この話を読めば、きっと分数に興味を持つようになるだろう」之后，整篇都是两则骆驼遗产怎么分的故事。所以①「この話」＝ラクダの分配の話。1 是可能的读者，不是故事本身。3 是读完之后的效果，不是故事内容。4 只覆盖了第一则里的旅行老人，第二则是邻居。",
				explanationEn:
					"After “if you read ① this story, you will surely take an interest in fractions,” the whole passage is two tales of dividing inherited camels. So ① “this story” = the story of dividing camels. 1 is a possible reader, not the story. 3 is the effect after reading, not the content. 4 covers only the traveler in the first tale; the second is a neighbor.",
				choiceNotes: [
					"不擅长分数的是可能的读者，不是这个故事。",
					"正确。两则都是怎么把骆驼分给儿子。",
					"对分数产生兴趣是读完之后的效果，不是故事本身。",
					"只说中了第一则的旅行老人，概括不全。",
				],
				choiceNotesEn: [
					"People bad at fractions are possible readers, not the story.",
					"Correct. Both tales are about dividing camels among sons.",
					"Taking an interest in fractions is the effect of reading, not the story itself.",
					"That only fits the traveler in the first tale; it does not cover the whole.",
				],
			},
			{
				label: "問2",
				jp: "（②）に{入|はい}る{最|もっと}も{適当|てきとう}なものはどれか。",
				cn: "填入（②）最合适的是哪一项？",
				en: "Which is the most appropriate item to fill in (②)?",
				choices: [
					{ jp: "{数|かず}が{少|すく}なくなること", cn: "数量变少", en: "that the number becomes smaller" },
					{ jp: "{数|かず}が{多|おお}くなること", cn: "数量变多", en: "that the number becomes larger" },
					{
						jp: "{割|わ}り{切|き}れて{余|あま}りがなくなること",
						cn: "能整除、没有剩余",
						en: "that it divides evenly and there is no remainder",
					},
					{
						jp: "また{割|わ}り{切|き}れなくなること",
						cn: "又变得除不尽",
						en: "that it again cannot be divided evenly",
					},
				],
				answer: 3,
				explanation:
					"前一个故事 1/2＋1/3＋1/9＝17/18＜1，加上借来的 1 头后分完还有 1 头可还。第二个 1/2＋1/3＋1/6＝1，三个人把 12 头全分走，借来的那头没剩。邻居没注意到的是「这次分数加起来正好是 1，能整除、没有剩余」。所以 3。不是数量变多变少，也不是又除不尽。",
				explanationEn:
					"In the first tale 1/2 + 1/3 + 1/9 = 17/18 < 1, so after adding the borrowed camel one is left to return. In the second, 1/2 + 1/3 + 1/6 = 1, the three take all 12, and the lent camel is gone. What the neighbor missed is that this time the fractions add to 1 — it divides evenly with no remainder. So 3. Not that the number grew or shrank, and not that it again fails to divide evenly.",
				choiceNotes: [
					"文中比较的不是头数变少，而是分数之和是否为 1。",
					"也不是头数变多。",
					"正确。1/2＋1/3＋1/6＝1，整除无余，借出的骆驼还不回去。",
					"第二次反而是能整除了，不是又除不尽。",
				],
				choiceNotesEn: [
					"The contrast is not that the count got smaller, but whether the fractions sum to 1.",
					"Nor is it that the count got larger.",
					"Correct. 1/2 + 1/3 + 1/6 = 1: it divides evenly, so the lent camel cannot be returned.",
					"The second time it does divide evenly; it is not “cannot be divided” again.",
				],
			},
		],
	},

	vocab: [
		{ jp: "分数", kana: "ぶんすう", cn: "分数", en: "fraction", pos: "名詞" },
		{ jp: "得意", kana: "とくい", cn: "擅长", en: "one’s strong point", pos: "な形" },
		{ jp: "苦手", kana: "にがて", cn: "不擅长、头痛", en: "poor at; a weak point", pos: "な形" },
		{ jp: "年老いる", kana: "としおいる", cn: "年迈", en: "to grow old", pos: "動詞" },
		{ jp: "商人", kana: "しょうにん", cn: "商人", en: "merchant", pos: "名詞" },
		{ jp: "割り切れる", kana: "わりきれる", cn: "能整除", en: "to divide evenly", pos: "動詞" },
		{ jp: "長男", kana: "ちょうなん", cn: "长子", en: "eldest son", pos: "名詞" },
		{ jp: "次男", kana: "じなん", cn: "次子", en: "second son", pos: "名詞" },
		{ jp: "三男", kana: "さんなん", cn: "三子", en: "third son", pos: "名詞" },
		{ jp: "余る", kana: "あまる", cn: "剩余", en: "to be left over", pos: "動詞" },
		{ jp: "前述", kana: "ぜんじゅつ", cn: "前述", en: "the aforementioned", pos: "名詞" },
		{ jp: "分配", kana: "ぶんぱい", cn: "分配", en: "distribution; dividing up", pos: "名詞・動詞" },
		{ jp: "合計", kana: "ごうけい", cn: "合计", en: "total", pos: "名詞・動詞" },
		{ jp: "損をする", kana: "そんをする", cn: "吃亏、受损", en: "to take a loss", pos: "動詞" },
		{ jp: "分母", kana: "ぶんぼ", cn: "分母", en: "denominator", pos: "名詞" },
		{ jp: "足し算", kana: "たしざん", cn: "加法", en: "addition", pos: "名詞" },
		{ jp: "ラクダ", cn: "骆驼", en: "camel", pos: "名詞" },
	],

	grammar: [
		{
			pattern: "〜どおりに",
			formation: "名詞 ＋ どおりに",
			meaning: "按照……那样。",
			meaningEn: "just as…; according to….",
			example: {
				jp: "{父親|ちちおや}の{言葉|ことば}どおりに{分|わ}けることができた。",
				cn: "能够按照父亲的话那样分开。",
				en: "They were able to divide them just as the father had said.",
			},
		},
		{
			pattern: "〜に対し（て）",
			formation: "普通形／名詞 ＋ に対し（て）",
			meaning: "与……相对、而……。用来对比两件事。",
			meaningEn: "whereas; in contrast to…. Used to contrast two things.",
			example: {
				jp: "1/2＋1/3＋1/9＝17/18になるのに{対|たい}し、1/2＋1/3＋1/6＝1となり",
				cn: "与 1/2＋1/3＋1/9＝17/18 相对，1/2＋1/3＋1/6＝1",
				en: "whereas 1/2 + 1/3 + 1/9 = 17/18, 1/2 + 1/3 + 1/6 = 1",
			},
		},
		{
			pattern: "〜てしまう",
			formation: "動詞て形 ＋ しまう",
			meaning: "表示完了，或带来不如意的结果。这里是老人去世、邻居吃亏。",
			meaningEn: "completes an action, or marks an unfortunate result. Here: the old man dies; the neighbor takes a loss.",
			example: {
				jp: "{連|つ}れてきたラクダを{持|も}って{帰|かえ}ることができず、{損|そん}をしてしまった。",
				cn: "牵来的骆驼带不回去，吃了亏。",
				en: "He could not take home the camel he had brought, and ended up taking a loss.",
			},
		},
	],
};
