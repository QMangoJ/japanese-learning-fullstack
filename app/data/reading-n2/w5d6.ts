import type { ReadingDay } from "../reading-n3/types";

// 第5週 6日目 書評 — printed pages 88–89
export const w5d6: ReadingDay = {
	week: 5,
	day: 6,
	label: "書評",
	labelKana: "しょひょう",
	labelEn: "Critiques / book reviews",
	printedPages: [88, 89],
	answerSource: "book",

	point: {
		title: "{引用|いんよう}{部分|ぶぶん}を{表|あらわ}す「　」「『　』」に{注意|ちゅうい}！",
		titleCn: "注意表示引用部分的「　」「『　』」！",
		titleEn: "Pay attention to 「　」「『　』」 which indicate quotations!",
		figure: {
			alt: "キャラクターが「ボクは『総まとめ』で勉強してるよ。」「このページは「書評」っていうタイトルだよ！」と言っている。",
			cn: "角色在说：「我在用『总复习』学习哦。」「这一页的标题叫「书评」哦！」",
			en: "A character saying, “I’m studying with『総まとめ』.” “This page’s title is「書評」!”",
		},
		tips: [
			{
				jp: "「　」や「『　』」は……",
				cn: "「　」和「『　』」是……",
				en: "「　」 and 「『　』」 are…",
			},
			{
				jp: "「　」「『　』」の{記号|きごう}はほかの{人|ひと}の{話|はな}し{言葉|ことば}や、{文章|ぶんしょう}や{本|ほん}のタイトルなどを{引用|いんよう}するときに{使|つか}います。{強調|きょうちょう}したい{言葉|ことば}などにも{使|つか}います。",
				cn: "「　」「『　』」这些符号，在引用别人的话语、文章或书的标题等时使用。想要强调的词语等，也会用这些符号。",
				en: "「　」 and 『　』 mark what someone has said, or quote a passage or a book title. They are also used to emphasize certain words.",
			},
		],
		expressions: [
			{ jp: "「　」（かぎかっこ）", cn: "「　」（钩引号）", en: "quotation marks: speech, emphasis, short quotes" },
			{ jp: "『　』（二重かぎかっこ）", cn: "『　』（双钩引号）", en: "double quotes: book / work titles" },
			{ jp: "書評", kana: "しょひょう", cn: "书评", en: "book review" },
			{ jp: "引用する", kana: "いんようする", cn: "引用", en: "to quote" },
			{ jp: "強調する", kana: "きょうちょうする", cn: "强调", en: "to emphasize" },
			{ jp: "エッセイ", cn: "随笔", en: "an essay" },
			{ jp: "称する", kana: "しょうする", cn: "称作", en: "to claim / to call (it)" },
			{ jp: "論じる", kana: "ろんじる", cn: "论述", en: "to discuss" },
			{ jp: "お勧め", kana: "おすすめ", cn: "推荐", en: "a recommendation" },
		],
	},

	renshu: {
		instruction: "{次|つぎ}の{会話文|かいわぶん}を{読|よ}んで、{後|あと}の{文|ぶん}から{正|ただ}しいものを{選|えら}ぼう。",
		instructionCn: "阅读下面的对话文，从后面的句子中选出正确的吧。",
		instructionEn: "Read the conversation below and choose the correct statements from the sentences that follow. (Answers are on the next page.)",
		blocks: [
			{
				type: "speech",
				speaker: "{女|おんな}の{人|ひと}",
				speakerCn: "女人",
				speakerEn: "Woman",
				jp: "{土屋先生|つちやせんせい}のエッセイ（{注|ちゅう}1）、{読|よ}んだ？",
				cn: "土屋老师的随笔（注1），读了吗？",
				en: "Have you read Professor Tsuchiya’s essays?",
			},
			{
				type: "speech",
				speaker: "{男|おとこ}の{人|ひと}",
				speakerCn: "男人",
				speakerEn: "Man",
				jp: "{土屋先生|つちやせんせい}って、あの{哲学|てつがく}の{教授|きょうじゅ}？",
				cn: "土屋老师，就是那位哲学教授？",
				en: "Professor Tsuchiya—the philosophy professor?",
			},
			{
				type: "speech",
				speaker: "{女|おんな}の{人|ひと}",
				speakerCn: "女人",
				speakerEn: "Woman",
				jp: "そう。あの{先生|せんせい}、エッセイも{書|か}いているのよ。",
				cn: "对。那位老师也写随笔的哦。",
				en: "Yes. He writes essays too.",
			},
			{
				type: "speech",
				speaker: "{男|おとこ}の{人|ひと}",
				speakerCn: "男人",
				speakerEn: "Man",
				jp: "ふーん。{哲学|てつがく}の{本|ほん}じゃないんだ。",
				cn: "嗯——。不是哲学书啊。",
				en: "Huh. So it’s not a philosophy book.",
			},
			{
				type: "speech",
				speaker: "{女|おんな}の{人|ひと}",
				speakerCn: "女人",
				speakerEn: "Woman",
				jp: "うん、でもね、「{人間|にんげん}の{定義|ていぎ}（{注|ちゅう}2）」を{書|か}いているところなんて、{笑|わら}っちゃうんだけど、{読|よ}んでいくうちに、{結局|けっきょく}は{哲学|てつがく}を{考|かんが}えさせられるっていう{不思議|ふしぎ}なエッセイなの。でも、{文章|ぶんしょう}は{難|むずか}しくないから、すらすら{読|よ}めて、{楽|たの}しかったー。",
				cn: "嗯，不过呢，写着「人的定义（注2）」的地方什么的，虽然会让人忍不住笑出来，但在读下去的过程中，到头来还是会让人不得不去思考哲学，就是这样一篇不可思议的随笔呢。不过，文章并不难，所以能顺畅地读，很开心啊。",
				en: "Yeah, but the part on “the definition of a human” makes you laugh, and as you read on you end up being made to think about philosophy—a strange kind of essay. The writing isn’t hard, though, so it read smoothly and was fun.",
			},
			{
				type: "speech",
				speaker: "{男|おとこ}の{人|ひと}",
				speakerCn: "男人",
				speakerEn: "Man",
				jp: "へえ、{読|よ}みたいな。{貸|か}してよ。",
				cn: "哦，想读呢。借我嘛。",
				en: "Oh, I’d like to read it. Lend it to me.",
			},
		],
		footnotes: [
			{ marker: "（注1）", term: "エッセイ", jp: "an essay　随筆。やわらかい文体で気軽に書いた文章。", cn: "随笔（用轻松文体随便写下的文章）", en: "an essay (a piece written lightly, in a relaxed style)" },
			{ marker: "（注2）", term: "定義", jp: "a definition", cn: "定义", en: "a definition" },
		],
		choices: [
			{ jp: "{女|おんな}の{人|ひと}は{哲学|てつがく}の{本|ほん}を{読|よ}んでいる。", cn: "女人正在读哲学书。", en: "The woman is reading a philosophy book." },
			{ jp: "{土屋先生|つちやせんせい}のエッセイはおもしろい。", cn: "土屋老师的随笔很有趣。", en: "Professor Tsuchiya’s essays are interesting." },
			{ jp: "{土屋先生|つちやせんせい}のエッセイは{不思議|ふしぎ}でわかりにくいところがある。", cn: "土屋老师的随笔有既不可思议又难以理解的地方。", en: "Professor Tsuchiya’s essays have strange, hard-to-understand parts." },
			{ jp: "{女|おんな}の{人|ひと}は{土屋先生|つちやせんせい}のエッセイを{簡単|かんたん}に{読|よ}めた。", cn: "女人能够很容易地阅读土屋老师的随笔。", en: "The woman was able to read Professor Tsuchiya’s essays easily." },
			{ jp: "{男|おとこ}の{人|ひと}は、{哲学|てつがく}の{本|ほん}は{読|よ}みたくない。", cn: "男人不想读哲学书。", en: "The man does not want to read philosophy books." },
		],
		answers: [2, 4],
	},

	mondai: {
		instruction: "{次|つぎ}の{文章|ぶんしょう}は、ある{本|ほん}について{書|か}かれたものである。{読|よ}んで、{後|あと}の{問|と}いに{答|こた}えなさい。",
		instructionCn: "下面的文章是就某一本书写成的。请阅读，并回答后面的问题。",
		instructionEn: "The following text was written about a certain book. Read it and answer the questions that follow. (Answers are in the separate booklet, p. 6.)",
		blocks: [
			{
				type: "title",
				jp: "『われ{笑|わら}う、ゆえにわれあり』　{土屋賢二|つちやけんじ} {著|ちょ}",
				cn: "『我笑，故我在』　土屋贤二 著",
				en: "I Laugh, Therefore I Am, by Kenji Tsuchiya",
				sub: { jp: "（{文春文庫|ぶんしゅんぶんこ}）", cn: "（文春文库）", en: "(Bunchun Bunko)" },
			},
			{
				type: "figure",
				alt: "文庫本の表紙。題名『われ笑う、ゆえにわれあり』、著者名「土屋賢二」。人物の顔が描かれている。",
				cn: "文库本的封面。题名『我笑，故我在』，作者名「土屋贤二」。画着人物的脸。",
				en: "Paperback cover. Title I Laugh, Therefore I Am, author Kenji Tsuchiya. A face is drawn on it.",
			},
			{
				type: "paragraph",
				jp: "{作者本人|さくしゃほんにん}は{本書|ほんしょ}を「ユーモアエッセイ」と{称|しょう}している（{注|ちゅう}1）が、ユーモアのつもりで{読|よ}んでいると、いつの{間|ま}にか{鋭|するど}い{社会批評|しゃかいひひょう}であったり、{冗談|じょうだん}だと{思|おも}えば{哲学|てつがく}の{問題|もんだい}であったりする。",
				cn: "作者本人把本书称作「幽默随笔」（注1），然而若当作幽默来读，不知不觉间它便会是尖锐的社会批评，你若以为是玩笑，它便会是哲学问题。",
				en: "The author himself calls the book a “humor essay,” but if you read it as humor, before you know it it is sharp social criticism, and what you took for a joke turns out to be a philosophical problem.",
				indent: true,
			},
			{
				type: "paragraph",
				jp: "その{文章|ぶんしょう}は{非常|ひじょう}に{読|よ}みやすい。やさしい{言葉|ことば}や{表現|ひょうげん}を{用|もち}いているため、{哲学|てつがく}の{話|はなし}と{気|き}がつかない{場合|ばあい}がある。しかし、いつの{間|ま}にか、{本来|ほんらい}{難|むずか}しいはずの{論理|ろんり}を{考|かんが}えていたりするという①{不思議|ふしぎ}なエッセイである。",
				cn: "其文章非常易读。由于使用了浅易的词语和表达，有时会察觉不到是在讲哲学。然而，不知不觉间，就会去思考本来应该很难的逻辑，正是这样一篇①不可思议的随笔。",
				en: "The writing is extremely easy to read. Because it uses gentle words and expressions, you sometimes do not even realize it is talking about philosophy. And yet, before you know it, you are thinking through logic that ought to be hard—that is the kind of ① strange essay it is.",
				indent: true,
			},
			{
				type: "paragraph",
				jp: "{本書|ほんしょ}の「{人間|にんげん}を{定義|ていぎ}するのは{不可能|ふかのう}である」という{項目|こうもく}の{中|なか}で、さまざまな{例|れい}をあげながら「{人間|にんげん}の{定義|ていぎ}」を{論|ろん}じている（{注|ちゅう}2）のだが、「{我々|われわれ}がどこから{見|み}ても{人間|にんげん}に{見|み}えるが{犬|いぬ}から{生|う}まれた{場合|ばあい}」や、「{一生|いっしょう}の{間|あいだ}に1{分間|ぷんかん}だけカエルになった{場合|ばあい}」など、{突拍子|とっぴょうし}もない（{注|ちゅう}3）{条件|じょうけん}に{笑|わら}いながら{読|よ}み{進|すす}んでいくと、「{定義|ていぎ}」とはどういうものかということが、ぼんやりとではあるが{見|み}えてくるのである＊。（ ② ）にもお{勧|すす}め（{注|ちゅう}4）の{一冊|いっさつ}である。",
				cn: "在本书「定义人是不可能的」这一项目中，一边举出各种各样的例子，一边论述着「人的定义」（注2）。而对「无论我们从哪里看都像人、却是狗生下来的情况」以及「一生之中只有1分钟变成了青蛙的情况」等荒唐无稽（注3）的条件，一边笑着读下去，「定义」究竟是怎样的东西这一点，虽说模糊，却会渐渐显现出来＊。也是向（ ② ）推荐（注4）的一本书。",
				en: "In the section “It is impossible to define a human,” the book discusses “the definition of a human” with all sorts of examples. Conditions as wild as “a being that looks human from every angle but was born of a dog,” or “a case of becoming a frog for just one minute in a lifetime,” make you laugh as you read on—and, if only vaguely, what a “definition” is starts to come into view. It is also a volume to recommend to ( ② ).",
				indent: true,
			},
		],
		footnotes: [
			{ marker: "（注1）", term: "称する", jp: "to claim", cn: "称作", en: "to claim / to call" },
			{ marker: "（注2）", term: "論じる", jp: "to deal with/discuss", cn: "论述", en: "to discuss" },
			{ marker: "（注3）", term: "突拍子もない", jp: "crazy and unrealistic", cn: "荒诞、出奇", en: "wild; outlandish" },
			{ marker: "（注4）", term: "お勧め", jp: "recommended", cn: "推荐", en: "recommended" },
		],
		pageNotes: [
			{
				jp: "You will gradually but vaguely understand what the definition means",
				cn: "你会逐渐地、却又模糊地理解定义意味着什么。",
				en: "You will gradually but vaguely understand what the definition means",
			},
		],
		questions: [
			{
				label: "問1",
				jp: "なぜ①{不思議|ふしぎ}なエッセイなのか。",
				cn: "为什么是①不可思议的随笔呢？",
				en: "Why is it a ① strange essay?",
				choices: [
					{ jp: "エッセイなのに{哲学|てつがく}のことばかり{書|か}いてあるから。", cn: "因为虽然是随笔，写的却尽是哲学方面的事。", en: "Because although it is an essay it writes about nothing but philosophy." },
					{ jp: "やさしい{言葉|ことば}や{表現|ひょうげん}を{用|もち}いているから。", cn: "因为使用了浅易的词语和表达。", en: "Because it uses gentle words and expressions." },
					{ jp: "{知|し}らないうちに、{哲学的|てつがくてき}なことを{考|かんが}えさせられるから。", cn: "因为在还没察觉的时候，会让人不得不去思考哲学性的事情。", en: "Because before you know it you are made to think about philosophical things." },
					{ jp: "{理解|りかい}しにくい{冗談|じょうだん}が{多|おお}いから。", cn: "因为难以理解的玩笑很多。", en: "Because there are many jokes that are hard to understand." },
				],
				answer: 3,
				explanation:
					"①紧接「いつの間にか、本来難しいはずの論理を考えていたりする」。练习对话也说「読んでいくうちに、結局は哲学を考えさせられるっていう不思議なエッセイ」。奇妙之处不是「用了浅白词语」（那是好读的原因），而是「不知不觉被带去想哲学」。选 3。1 的「ばかり」过火。4 与「読みやすい／難しくない」相反。",
				explanationEn:
					"① sits on “before you know it you are thinking through logic that ought to be hard.” The warm-up says the same: “as you read on you end up being made to think about philosophy—a strange essay.” The strangeness is not “it uses easy words” (that is why it is readable) but “you are led into philosophy without noticing.” Choose 3. 1’s bakari is too strong. 4 contradicts “easy to read / not hard.”",
				choiceNotes: [
					"不是「净写哲学」；先当幽默读，中途才变成哲学问题。",
					"浅白词语是好读的原因，不是「不思議」的原因。",
					"正确。不知不觉思考本来很难的逻辑＝不思議。",
					"文章明确写了非常好读，笑话并不难懂。",
				],
				choiceNotesEn: [
					"It does not “write about nothing but philosophy”; you start in humor and only later hit philosophy.",
					"Easy wording is why it reads well, not why it is strange.",
					"Correct. Being led into hard logic without noticing is the strangeness.",
					"The text says it is very easy to read; the jokes are not hard.",
				],
			},
			{
				label: "問2",
				jp: "（ ② ）に{入|はい}るものとして{最|もっと}も{適当|てきとう}なものはどれか。",
				cn: "作为填入（ ② ）的内容，最恰当的是哪一个？",
				en: "Which of the following best fills ( ② )?",
				choices: [
					{ jp: "ユーモアには{興味|きょうみ}がないという{若者|わかもの}", cn: "对幽默没有兴趣的年轻人", en: "young people who have no interest in humor" },
					{ jp: "{哲学|てつがく}には{興味|きょうみ}がないという{若者|わかもの}", cn: "对哲学没有兴趣的年轻人", en: "young people who have no interest in philosophy" },
					{ jp: "エッセイには{興味|きょうみ}がないという{若者|わかもの}", cn: "对随笔没有兴趣的年轻人", en: "young people who have no interest in essays" },
					{ jp: "{条件|じょうけん}には{興味|きょうみ}がないという{若者|わかもの}", cn: "对条件没有兴趣的年轻人", en: "young people who have no interest in conditions" },
				],
				answer: 2,
				explanation:
					"这本书用幽默、浅白的随笔，让人在笑的过程中摸到「定义」这类哲学。所以最该推荐给「对哲学没兴趣」的年轻人——他们本来不会去读哲学，却能被这本书带进去。选 2。1 书本身就是幽默随笔，不必特别推荐给讨厌幽默的人。3、4 和全文的对照点（哲学 vs 好读的幽默）无关。",
				explanationEn:
					"The book uses light, funny essays to let you brush against philosophy (what a definition is) while laughing. So it is best recommended to young people with no interest in philosophy—they would not pick up a philosophy book, but this one can pull them in. Choose 2. 1: the book is a humor essay, so there is no special reason to push it on people who dislike humor. 3 and 4 are not the contrast the passage is built on (philosophy vs readable humor).",
				choiceNotes: [
					"这本书的卖点就是幽默，不必推荐给讨厌幽默的人。",
					"正确。浅白幽默能把不爱哲学的年轻人也带进去。",
					"全文不是在对比「爱不爱随笔」。",
					"「条件」只是文中的例子，不是推荐对象。",
				],
				choiceNotesEn: [
					"Humor is the book’s selling point; no need to recommend it to people who dislike humor.",
					"Correct. Easy humor can pull in young people who do not care for philosophy.",
					"The passage is not contrasting interest in essays.",
					"“Conditions” are just examples in the book, not the audience.",
				],
			},
		],
	},

	vocab: [
		{ jp: "書評", kana: "しょひょう", cn: "书评", en: "book review", pos: "名詞" },
		{ jp: "引用", kana: "いんよう", cn: "引用", en: "quotation", pos: "名詞・動詞" },
		{ jp: "エッセイ", cn: "随笔", en: "essay", pos: "名詞" },
		{ jp: "称する", kana: "しょうする", cn: "称作", en: "to call; to claim", pos: "動詞" },
		{ jp: "社会批評", kana: "しゃかいひひょう", cn: "社会批评", en: "social criticism", pos: "名詞" },
		{ jp: "冗談", kana: "じょうだん", cn: "玩笑", en: "a joke", pos: "名詞" },
		{ jp: "論理", kana: "ろんり", cn: "逻辑", en: "logic", pos: "名詞" },
		{ jp: "定義", kana: "ていぎ", cn: "定义", en: "definition", pos: "名詞" },
		{ jp: "論じる", kana: "ろんじる", cn: "论述", en: "to discuss; to argue", pos: "動詞" },
		{ jp: "突拍子もない", kana: "とっぴょうしもない", cn: "荒诞、出奇", en: "outlandish; crazy", pos: "い形" },
		{ jp: "お勧め", kana: "おすすめ", cn: "推荐", en: "a recommendation", pos: "名詞" },
		{ jp: "すらすら", cn: "流畅地", en: "smoothly (of reading)", pos: "副詞" },
		{ jp: "いつの間にか", kana: "いつのまにか", cn: "不知不觉", en: "before one knows it", pos: "副詞" },
		{ jp: "ぼんやり", cn: "模糊地", en: "vaguely", pos: "副詞" },
	],

	grammar: [
		{
			pattern: "いつの間にか",
			meaning: "不知不觉就……。书评里写「当幽默读着，不知不觉成了哲学」。",
			meaningEn: "before one knows it. In the review: you start in humor and, without noticing, you are doing philosophy.",
			example: {
				jp: "ユーモアのつもりで{読|よ}んでいると、いつの{間|ま}にか{鋭|するど}い{社会批評|しゃかいひひょう}であったりする。",
				cn: "若当作幽默来读，不知不觉间便会是尖锐的社会批评之类的。",
				en: "If you read it as humor, before you know it it is sharp social criticism.",
			},
		},
		{
			pattern: "〜うちに",
			formation: "動詞て形／辞書形＋うちに",
			meaning: "在……的过程中。练习：「読んでいくうちに、哲学を考えさせられる」。",
			meaningEn: "as / while …. Warm-up: “as you read on, you are made to think about philosophy.”",
			example: {
				jp: "{読|よ}んでいくうちに、{結局|けっきょく}は{哲学|てつがく}を{考|かんが}えさせられる。",
				cn: "在读下去的过程中，到头来还是会让人不得不去思考哲学。",
				en: "As you read on, you end up being made to think about philosophy.",
			},
		},
		{
			pattern: "〜と称する",
			formation: "名詞＋と称する",
			meaning: "（自己）把……称作……。比「と言う」更书面，书评、报道常用。",
			meaningEn: "to call (it) … (often of the speaker’s own claim). More written than to iu; common in reviews.",
			example: {
				jp: "{作者本人|さくしゃほんにん}は{本書|ほんしょ}を「ユーモアエッセイ」と{称|しょう}している。",
				cn: "作者本人把本书称作「幽默随笔」。",
				en: "The author himself calls the book a “humor essay.”",
			},
		},
	],
};
