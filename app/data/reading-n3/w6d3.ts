import type { ReadingDay } from "./types";

// 第6週 3日目 意見文③ — printed pages 96–97
// 別冊 p.7（第6週の解答）は今回のスキャンに含まれていないため、答えは本文から導出。
export const w6d3: ReadingDay = {
	week: 6,
	day: 3,
	label: "意見文③",
	labelKana: "いけんぶん",
	labelEn: "Opinions ③",
	printedPages: [96, 97],
	answerSource: "derived",

	point: {
		title: "{意見|いけん}を{言|い}いたいときの{質問|しつもん}の{形|かたち}に{注意|ちゅうい}しよう！",
		titleCn: "注意用来表达观点的疑问句形式！",
		titleEn: "Pay attention to the form of the questions that are used to express opinions!",
		figure: {
			alt: "「だれがするのでしょうか？」「いいのでしょうか？」「どうしてするのでしょうか？」「本当なのでしょうか？」という疑問の吹き出しと、「あのぅ、質問ばかりして何も知らないのかなぁ。」「違うでしょ！」というやりとり",
			cn: "四个疑问气泡：「谁会做呢？」「这样好吗？」「为什么要那样做呢？」「真的是这样吗？」旁边有人嘀咕「他净问问题，是不是什么都不懂啊」，另一个回：「才不是呢！」",
			en: "Four question bubbles: “Who would do that?” “Is that all right?” “Why would they do that?” “Is that really so?” Nearby someone mutters, “He just keeps asking questions — does he not know anything?” and another replies, “That’s not it!”",
		},
		tips: [
			{
				jp: "{疑問|ぎもん}の{形|かたち}になっていますが、{自分|じぶん}の{意見|いけん}を{強調|きょうちょう}しています。",
				cn: "**形式上是疑问句，实际上是在强调自己的主张**。这类反问句常常就是全文的中心句。",
				en: "The form is a question, but it is actually emphasizing the writer’s own opinion. These rhetorical questions are often the central sentence of the whole piece.",
			},
			{
				jp: "○○だろうか？＝○○ではない！／△△ではないだろうか？＝{私|わたし}は△△だと{思|おも}う！／だれが□□するのだろう？＝だれも□□しない！／{何|なん}のために××するのだろう？＝××する{理由|りゆう}は{何|なに}もない！",
				cn: "○○だろうか？＝「并不是○○！」／△△ではないだろうか？＝「我认为就是△△！」／だれが□□するのだろう？＝「谁也不会□□！」／何のために××するのだろう？＝「根本没有××的理由！」",
				en: "○○だろうか? = “It is not ○○!” / △△ではないだろうか? = “I think it is △△!” / だれが□□するのだろう? = “No one will □□!” / 何のために××するのだろう? = “There is no reason at all to ××!”",
			},
		],
		expressions: [
			{ jp: "〜だろうか", cn: "（反问）难道……吗？＝并非如此", en: "(rhetorical) is it really …? = it is not" },
			{ jp: "〜ではないだろうか", cn: "（反问）难道不是……吗？＝我认为就是如此", en: "(rhetorical) isn’t it …? = I think it is" },
			{ jp: "〜のではないだろうか", cn: "（委婉主张）恐怕是……吧", en: "(soft claim) I would think that …" },
			{ jp: "〜自体", kana: "じたい", cn: "……本身", en: "… in itself" },
			{ jp: "〜どころか", cn: "别说……了、非但……", en: "let alone" },
			{ jp: "〜だけでなく", cn: "不仅……（还……）", en: "not only … (but also …)" },
			{ jp: "〜において（も）", cn: "在……方面（也）", en: "in … (as well)" },
		],
	},

	renshu: {
		instruction: "{次|つぎ}の{会話文|かいわぶん}を{読|よ}んで、{後|あと}の{文|ぶん}から{正|ただ}しいものを{選|えら}ぼう。",
		instructionCn: "阅读下面的对话，从后面的句子中选出正确的。（答案在下一页）",
		instructionEn: "Read the conversation below and choose the correct statements from the sentences that follow. (Answers are on the next page.)",
		blocks: [
			{
				type: "speech",
				speaker: "Aさん",
				speakerCn: "A",
				speakerEn: "A",
				jp: "{最近|さいきん}、お{化粧|けしょう}している{高校生|こうこうせい}が{多|おお}いですよね。",
				cn: "最近化妆的高中生很多呢。",
				en: "Lately a lot of high-school students wear makeup, don’t they?",
			},
			{
				type: "speech",
				speaker: "Bさん",
				speakerCn: "B",
				speakerEn: "B",
				jp: "ええ、{今|いま}は{小学生|しょうがくせい}だってお{化粧|けしょう}するらしいですよ。{姉|あね}の{子|こ}なんてまだ2{年生|ねんせい}なのに{自分|じぶん}の{口紅|くちべに}（※1）とか{持|も}ってますし。",
				cn: "是啊，听说现在连小学生都化妆呢。我姐姐的孩子才二年级，就有自己的口红了。",
				en: "Yes — I hear even elementary-school children wear makeup now. My sister’s child is only in second grade and already has her own lipstick.",
			},
			{
				type: "speech",
				speaker: "Aさん",
				speakerCn: "A",
				speakerEn: "A",
				jp: "{時代|じだい}は{変|か}わりましたね。{私|わたし}たちが{高校生|こうこうせい}の{頃|ころ}は、{何|なに}も{持|も}ってなかったですけど。",
				cn: "时代真是变了呢。我们上高中那会儿，什么都没有呢。",
				en: "Times have changed. When we were in high school we didn’t have anything.",
			},
			{
				type: "speech",
				speaker: "Bさん",
				speakerCn: "B",
				speakerEn: "B",
				jp: "ええ。でも、あんまり{早|はや}くからお{化粧|けしょう}すると{肌|はだ}（※2）に{悪|わる}いだけじゃなくって、よくない{行動|こうどう}につながる＊ことも{多|おお}いような{気|き}がしますけれどね。",
				cn: "是啊。不过我总觉得，太早开始化妆的话，不光对皮肤不好，还常常会导致一些不好的行为呢。",
				en: "Yes. But I have a feeling that starting makeup too early is not only bad for the skin — it often leads to bad behavior, too.",
			},
		],
		footnotes: [
			{ marker: "※1", term: "口紅", jp: "lipstick", cn: "口红", en: "lipstick" },
			{ marker: "※2", term: "肌", jp: "skin", cn: "皮肤", en: "skin" },
		],
		pageNotes: [{ jp: "＊ it leads to delinquency", cn: "＊导致不良行为", en: "＊ it leads to delinquency" }],
		choices: [
			{ jp: "Aさんの{姪|めい}は{化粧品|けしょうひん}を{持|も}っている。", cn: "A 的侄女／外甥女有化妆品。", en: "A’s niece has cosmetics." },
			{ jp: "Bさんは{高校生|こうこうせい}のとき、{化粧品|けしょうひん}を{持|も}っていなかった。", cn: "B 上高中时没有化妆品。", en: "B did not have cosmetics when she was in high school." },
			{ jp: "Aさんは{高校生|こうこうせい}のとき、{化粧|けしょう}をしたかった。", cn: "A 上高中时想化妆。", en: "A wanted to wear makeup when she was in high school." },
			{ jp: "Bさんは、{子|こ}どもが{化粧|けしょう}をするのは{肌|はだ}のためによくないと{思|おも}っている。", cn: "B 认为孩子化妆对皮肤不好。", en: "B thinks it is bad for children’s skin if they wear makeup." },
			{ jp: "Bさんは、{子|こ}どもが{化粧|けしょう}をしても{悪|わる}い{影響|えいきょう}はないと{思|おも}っている。", cn: "B 认为孩子化妆也不会有坏影响。", en: "B thinks there is no bad influence even if children wear makeup." },
		],
		answers: [2, 4],
		hint: {
			jp: "「{姉|あね}の{子|こ}」と{言|い}っているのはBさん。「{私|わたし}たちが{高校生|こうこうせい}の{頃|ころ}は、{何|なに}も{持|も}ってなかった」はAさんの{発言|はつげん}だが、「{私|わたし}たち」に{二人|ふたり}とも{含|ふく}まれる。",
			cn: "说「姐姐的孩子」的是 B，所以那是 B 的外甥女，不是 A 的；A 说「我们上高中时什么都没有」，「私たち」把两人都包括在内，所以 B 当时也没有化妆品。",
			en: "The one who says “my sister’s child” is B, so that is B’s niece, not A’s. A says “when we were in high school we didn’t have anything” — “私たち” includes both of them, so B didn’t have cosmetics then either.",
		},
	},

	mondai: {
		instruction: "{次|つぎ}の{文章|ぶんしょう}を{読|よ}んで、{後|あと}の{問|と}いに{答|こた}えなさい。",
		instructionCn: "阅读下面的文章，回答后面的问题。（原书答案在别册 p.7）",
		instructionEn: "Read the passage below and answer the questions that follow. (Answers are in the supplement, p. 7.)",
		blocks: [
			{
				type: "paragraph",
				indent: true,
				jp: "{先日電車|せんじつでんしゃ}に{乗|の}っていたときのことである。{制服|せいふく}を{着|き}た{女子高生|じょしこうせい}が{向|む}かいの{席|せき}に{座|すわ}った。{彼女|かのじょ}はかばんから{大|おお}きな{鏡|かがみ}を{取|と}り{出|だ}し、それから、{次々|つぎつぎ}と{化粧道具|けしょうどうぐ}を{取|と}り{出|だ}して、{顔|かお}、{目|め}、{唇|くちびる}と{化粧|けしょう}をし{始|はじ}めた。そして、{次|つぎ}は{大|おお}きなヘアブラシ（※1）を{取|と}り{出|だ}した。{降|お}りるまでずっと{鏡|かがみ}を{離|はな}さなかった。いったい、あのかばんに{教科書|きょうかしょ}やノートは{入|はい}っているのだろうか＊。",
				cn: "那是前几天我坐电车时的事。一位穿着校服的女高中生坐在了对面的座位上。她从包里取出一面大镜子，接着又一件件掏出化妆用具，从脸、眼睛到嘴唇开始化起妆来。然后，她又拿出了一把大梳子。直到下车为止，镜子一直没离过手。她那个包里，究竟有没有装教科书和笔记本呢＊。",
				en: "This happened the other day when I was on the train. A high-school girl in uniform sat down in the seat across from me. She took a large mirror out of her bag, then pulled out makeup tools one after another and started doing her face, her eyes, and her lips. Next she took out a large hairbrush. She never let go of the mirror until she got off. I wonder if that bag even has textbooks and notebooks in it＊.",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "{電車|でんしゃ}の{中|なか}で{化粧|けしょう}をすること{自体|じたい}（※2）、いいことだとは{思|おも}わないが、この{日|ひ}はそういうことよりも、{時代|じだい}の{流|なが}れに{不安|ふあん}を{感|かん}じた。{私|わたし}が{高校生|こうこうせい}の{頃|ころ}は、{顔|かお}にファンデーション（※3）を{塗|ぬ}ったり、{唇|くちびる}を{紅|あか}くしたりするのは{不良|ふりょう}（※4）のすることだと{言|い}われていた。{私|わたし}も{自分|じぶん}の{化粧品|けしょうひん}をそろえたのは、{高校|こうこう}を{卒業|そつぎょう}してからだった。ところが{今|いま}は、{高校生|こうこうせい}どころか{小学生|しょうがくせい}までも{化粧道具|けしょうどうぐ}を{持|も}っているという。",
				cn: "在电车里化妆这件事本身，我并不认为是好事；不过那天让我更在意的，是对时代潮流感到的一丝不安。我上高中的时候，往脸上涂粉底、把嘴唇涂红，被说成是不良少年才干的事。就连我自己置办化妆品，也是高中毕业以后的事了。可是如今，别说高中生，据说连小学生都有化妆用具了。",
				en: "Putting on makeup on the train is not, in itself, something I think is good — but that day, more than that, I felt uneasy about the way the times were going. When I was in high school, putting foundation on your face or coloring your lips red was said to be what delinquents did. I myself only got my own cosmetics together after I graduated from high school. And yet now, they say, not just high-school students but even elementary-school children have makeup tools.",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "{女|おんな}の{子|こ}がかわいくなりたいとか、{化粧|けしょう}は{楽|たの}しいとかいうのはわかる。しかし、{早|はや}すぎる{化粧|けしょう}は{子|こ}どもの{肌|はだ}だけでなく{行動|こうどう}においても{悪|わる}い{影響|えいきょう}を{与|あた}えるのではないだろうか＊＊。",
				cn: "女孩子想变漂亮、觉得化妆有趣，这我能理解。然而，过早化妆恐怕不仅会影响孩子的皮肤，在行为方面也会带来不良影响吧＊＊。",
				en: "I understand that girls want to look cute, and that makeup is fun. But isn’t it the case that starting makeup too early has a bad influence not only on children’s skin but on their behavior as well＊＊?",
			},
		],
		footnotes: [
			{ marker: "※1", term: "ヘアブラシ", jp: "a hair brush", cn: "梳子", en: "a hair brush" },
			{ marker: "※2", term: "〜自体", jp: "… in itself", cn: "……本身", en: "… in itself" },
			{ marker: "※3", term: "ファンデーション", jp: "foundation", cn: "粉底", en: "foundation" },
			{ marker: "※4", term: "不良", jp: "delinquents", cn: "不良少年", en: "delinquents" },
		],
		pageNotes: [
			{
				jp: "＊ I highly doubt that she has textbooks and notebooks in that bag.",
				cn: "＊我很怀疑她那个包里究竟有没有教科书和笔记本。",
				en: "＊ I highly doubt that she has textbooks and notebooks in that bag.",
			},
			{
				jp: "＊＊ I would think that using makeup from such a young age would not only harm the skin, but also influence their behavior.",
				cn: "＊＊我认为这么早开始化妆，不仅对皮肤有害，也会影响到孩子的行为。",
				en: "＊＊ I would think that using makeup from such a young age would not only harm the skin, but also influence their behavior.",
			},
		],
		questions: [
			{
				label: "問1",
				jp: "「{時代|じだい}の{流|なが}れに{不安|ふあん}を{感|かん}じた」とあるが、{筆者|ひっしゃ}はどう{思|おも}ったか。",
				cn: "文中说「对时代潮流感到不安」，笔者是怎么想的？",
				en: "The text says the writer “felt uneasy about the way the times were going.” What did the writer think?",
				choices: [
					{ jp: "{高校生|こうこうせい}は{不良|ふりょう}が{多|おお}くなってしまうのではないだろうか。", cn: "高中生里的不良少年会不会变多呢。", en: "Won’t there be more delinquents among high-school students?" },
					{ jp: "{自分|じぶん}が{高校生|こうこうせい}のときは{時代|じだい}が{悪|わる}かったのだろうか。", cn: "自己上高中那个年代是不是不好呢。", en: "Were the times bad when I was in high school?" },
					{
						jp: "{今後|こんご}も{電車|でんしゃ}の{中|なか}で{化粧|けしょう}をする{高校生|こうこうせい}が{増|ふ}えるのではないだろうか。",
						cn: "今后在电车里化妆的高中生会不会继续增加呢。",
						en: "Won’t more high-school students keep putting on makeup on the train from now on?",
					},
					{
						jp: "{子|こ}どもが{化粧|けしょう}をするようになったのはいいことだと{言|い}えるのだろうか。",
						cn: "孩子们开始化妆这件事，能说是好事吗。",
						en: "Can we really say it is a good thing that children have started wearing makeup?",
					},
				],
				answer: 4,
				explanation:
					"「時代の流れ」具体指什么？紧接着的内容作了对比：从前化妆是「不良のすること」，自己置办化妆品也要等到高中毕业；「ところが今は、高校生どころか小学生までも化粧道具を持っている」。让笔者不安的正是**孩子们开始化妆**这一变化。用本课学的反问形式表达就是「いいことだと言えるのだろうか（＝好事とは言えない）」，所以 4 正确。",
				explanationEn:
					"What is “the way the times were going”? The contrast that follows tells you: in the old days makeup was “what delinquents did,” and the writer herself only got cosmetics after high school; “and yet now, not just high-school students but even elementary-school children have makeup tools.” What makes the writer uneasy is that children have started wearing makeup. Put in the rhetorical form of this lesson, that is “can we really say it is a good thing? (= we cannot),” so 4 is correct.",
				choiceNotes: [
					"「不良」只是用来说明从前的观念，笔者并没有预测不良少年会增多。",
					"笔者是拿从前作对比，不是在评价自己那个年代的好坏。",
					"电车里化妆只是引出话题的事例，笔者明说「この日はそういうことよりも」——重点不在这里。",
					"正确。反问形式表达的正是「孩子化妆并不是好事」这一不安。",
				],
				choiceNotesEn: [
					"“Delinquents” is only used to explain the old attitude; the writer is not predicting more delinquents.",
					"The writer is using the past as a contrast, not judging whether her own era was “bad.”",
					"Makeup on the train is only the example that starts the topic; the writer says clearly “that day, more than that” — the point is elsewhere.",
					"Correct. The rhetorical question is exactly the unease that children’s makeup is not a good thing.",
				],
			},
			{
				label: "問2",
				jp: "この{文章|ぶんしょう}の{中|なか}で{筆者|ひっしゃ}がいちばん{言|い}いたいことはどんなことか。",
				cn: "在这篇文章中，笔者最想说的是什么？",
				en: "What does the writer most want to say in this passage?",
				choices: [
					{ jp: "{子|こ}どもが{化粧|けしょう}をするのは、{悪|わる}い{行動|こうどう}につながることもある。", cn: "孩子化妆有时会导致不良行为。", en: "Children wearing makeup can also lead to bad behavior." },
					{ jp: "{公共|こうきょう}の{場所|ばしょ}で{化粧|けしょう}をするのはやめてほしい。", cn: "希望不要在公共场所化妆。", en: "The writer wants people to stop putting on makeup in public." },
					{ jp: "{自分|じぶん}が{高校時代|こうこうじだい}のほうがまじめな{学生|がくせい}が{多|おお}かった。", cn: "自己上高中的年代认真的学生更多。", en: "There were more serious students when the writer was in high school." },
					{ jp: "{今|いま}の{子|こ}どもたちは、{化粧品|けしょうひん}をそろえるのが{早|はや}すぎる。", cn: "现在的孩子置办化妆品太早了。", en: "Today’s children get their cosmetics together too early." },
				],
				answer: 1,
				explanation:
					"本课要点＋第 1 日学过的结构：日语议论文的主张多在**最后**，而且常用反问收尾。本文最后一句正是「早すぎる化粧は子どもの肌だけでなく**行動においても**悪い影響を与えるのではないだろうか」——把这句反问还原成肯定，就是「会对行为产生不良影响」。所以 1 正确。",
				explanationEn:
					"The day’s key point plus the structure from Day 1: in Japanese opinion essays the claim is often at the end, and it often ends with a rhetorical question. The last sentence here is “isn’t it the case that starting makeup too early has a bad influence not only on children’s skin but **on their behavior as well**?” Turn that question back into a statement and you get “it can have a bad influence on behavior.” So 1 is correct.",
				choiceNotes: [
					"正确。最后一句反问的内容，正是笔者最想说的主张。",
					"「電車の中で化粧をすること自体、いいことだとは思わないが」——笔者特意说「这不是重点」。",
					"文中没有比较学生是否认真。",
					"「早すぎる」确实提到了，但那是事实描述；笔者真正担心的是它带来的**影响**。",
				],
				choiceNotesEn: [
					"Correct. The content of the last rhetorical question is exactly the claim the writer most wants to make.",
					"“Putting on makeup on the train is not, in itself, something I think is good — but” — the writer specifically says this is not the main point.",
					"The text never compares how serious students were.",
					"“Too early” is mentioned, but as a fact; what the writer really worries about is the influence it has.",
				],
			},
		],
	},

	vocab: [
		{ jp: "化粧", kana: "けしょう", cn: "化妆", en: "makeup", pos: "名詞・動詞" },
		{ jp: "化粧品", kana: "けしょうひん", cn: "化妆品", en: "cosmetics", pos: "名詞" },
		{ jp: "口紅", kana: "くちべに", cn: "口红", en: "lipstick", pos: "名詞" },
		{ jp: "肌", kana: "はだ", cn: "皮肤", en: "skin", pos: "名詞" },
		{ jp: "制服", kana: "せいふく", cn: "校服、制服", en: "uniform", pos: "名詞" },
		{ jp: "鏡", kana: "かがみ", cn: "镜子", en: "a mirror", pos: "名詞" },
		{ jp: "取り出す", kana: "とりだす", cn: "取出", en: "to take out", pos: "動詞" },
		{ jp: "唇", kana: "くちびる", cn: "嘴唇", en: "lips", pos: "名詞" },
		{ jp: "次々と", kana: "つぎつぎと", cn: "一个接一个地", en: "one after another", pos: "副詞" },
		{ jp: "離す", kana: "はなす", cn: "放开、离开", en: "to let go of", pos: "動詞" },
		{ jp: "流れ", kana: "ながれ", cn: "潮流、趋势", en: "a current; the way things are going", pos: "名詞" },
		{ jp: "不安", kana: "ふあん", cn: "不安", en: "unease; anxiety", pos: "名詞・な形" },
		{ jp: "塗る", kana: "ぬる", cn: "涂抹", en: "to put on; to spread", pos: "動詞" },
		{ jp: "不良", kana: "ふりょう", cn: "不良少年", en: "a delinquent", pos: "名詞" },
		{ jp: "そろえる", cn: "备齐、置办", en: "to get together; to assemble a set", pos: "動詞" },
		{ jp: "卒業", kana: "そつぎょう", cn: "毕业", en: "graduation", pos: "名詞・動詞" },
		{ jp: "行動", kana: "こうどう", cn: "行为", en: "behavior", pos: "名詞" },
		{ jp: "影響を与える", kana: "えいきょうをあたえる", cn: "产生影响", en: "to have an influence on", pos: "表現" },
		{ jp: "姪", kana: "めい", cn: "侄女、外甥女", en: "niece", pos: "名詞" },
	],

	grammar: [
		{
			pattern: "〜のではないだろうか",
			meaning: "恐怕是……吧？形式是疑问，实质是**委婉而强烈地陈述自己的主张**。议论文的经典结尾。",
			meaningEn: "Isn’t it the case that …? The form is a question; the substance is a polite but strong statement of the writer’s claim. A classic essay ending.",
			example: {
				jp: "{悪|わる}い{影響|えいきょう}を{与|あた}えるのではないだろうか。",
				cn: "恐怕会带来不良影响吧。（＝我认为会带来不良影响）",
				en: "Doesn’t it have a bad influence? (= I think it does.)",
			},
			note: "本课要点。看到这个句型，就把它还原成肯定句来理解。",
			noteEn: "This is the key point of the lesson. When you see this pattern, turn it back into a statement.",
		},
		{
			pattern: "〜だろうか",
			meaning: "（反问）难道……吗？＝并非如此。",
			meaningEn: "(Rhetorical) Is it really …? = It is not.",
			example: {
				jp: "あのかばんに{教科書|きょうかしょ}やノートは{入|はい}っているのだろうか。",
				cn: "她那包里究竟有没有教科书呢。（＝大概根本没装）",
				en: "I wonder if that bag even has textbooks in it. (= probably not)",
			},
		},
		{
			pattern: "〜{自体|じたい}",
			formation: "名詞 ＋ 自体",
			meaning: "……本身。用来把话题限定在事物本身。",
			meaningEn: "… in itself. Used to limit the topic to the thing itself.",
			example: { jp: "{電車|でんしゃ}の{中|なか}で{化粧|けしょう}をすること{自体|じたい}", cn: "在电车里化妆这件事本身", en: "putting on makeup on the train in itself" },
		},
		{
			pattern: "〜どころか",
			formation: "名詞 ＋ どころか",
			meaning: "别说……了，就连……。表示程度超出预料。",
			meaningEn: "Let alone … / far from …. Marks a degree beyond what you’d expect.",
			example: { jp: "{高校生|こうこうせい}どころか{小学生|しょうがくせい}までも", cn: "别说高中生了，连小学生都……", en: "not just high-school students but even elementary-school children" },
		},
		{
			pattern: "〜だけでなく〜も",
			meaning: "不仅……而且……。",
			meaningEn: "Not only … but also ….",
			example: { jp: "{肌|はだ}だけでなく{行動|こうどう}においても", cn: "不仅是皮肤，在行为方面也……", en: "not only on the skin but on behavior as well" },
		},
		{
			pattern: "ところが",
			meaning: "然而、可是。表示出乎意料的转折，后面往往是重点。",
			meaningEn: "And yet / however. Marks an unexpected turn; what follows is often the main point.",
			example: { jp: "ところが{今|いま}は、……{小学生|しょうがくせい}までも{化粧道具|けしょうどうぐ}を{持|も}っている", cn: "可是如今，连小学生都有化妆用具了", en: "and yet now even elementary-school children have makeup tools" },
		},
		{
			pattern: "〜ような{気|き}がする",
			meaning: "总觉得……。委婉地陈述自己的感觉。",
			meaningEn: "I have a feeling that …. A soft way of stating how you feel.",
			example: { jp: "よくない{行動|こうどう}につながることも{多|おお}いような{気|き}がします", cn: "总觉得也常常会导致不好的行为", en: "I have a feeling it often leads to bad behavior too" },
		},
	],
};
