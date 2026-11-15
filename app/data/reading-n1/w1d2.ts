import type { ReadingDay } from "../reading-n3/types";

// 第1週 2日目 意見を言いたいときの疑問文 — printed pages 14–15
export const w1d2: ReadingDay = {
	week: 1,
	day: 2,
	label: "意見を言いたいときの疑問文",
	labelKana: "ぎもんぶん",
	labelEn: "Question forms that state an opinion",
	printedPages: [14, 15],
	answerSource: "book",

	point: {
		title: "{疑問文|ぎもんぶん}は{意見|いけん}を{言|い}うための{形|かたち}！",
		titleCn: "注意：为强调说话人意见而使用的疑问句形式！",
		titleEn: "Watch out: question forms used to stress the writer's opinion!",
		figure: {
			alt: "「ぼくの意見を聞いているの？」と言う黒猫と、「違います！『とんでもない！そんなはずはない！そうではない！』と言いたいんです。つまり強い否定です！」と答える猫先生のイラスト",
			cn: "一只说「是在问我的意见吗？」的黑猫，和一只回答「不对！是想说『岂有此理！不可能！不是那样的！』。也就是说，是强烈的否定！」的猫老师的插图",
			en: "A black cat asking “Are you asking my opinion?” and a teacher cat answering “No! The writer wants to say ‘Nonsense! Impossible! That's not it!’ — in other words, a strong denial!”",
		},
		tips: [
			{
				jp: "{疑問文|ぎもんぶん}の{形|かたち}でも、{答|こた}えを{求|もと}めているのではない。{筆者|ひっしゃ}の{意見|いけん}（{強|つよ}い{否定|ひてい}）を{表|あらわ}す。",
				cn: "即便是疑问句的形式，也不是在寻求答案，而是在表达说话人的意见（强烈的否定）。",
				en: "Even in question form, the writer is not asking for an answer — the form states the writer's own opinion (a strong denial).",
			},
		],
		expressions: [
			{ jp: "○○だろうか？", cn: "＝○○ではない！", en: "= “It is NOT ○○!”" },
			{ jp: "だれが△△するだろう？", cn: "＝だれも△△しない！", en: "= “Nobody does △△!”" },
			{ jp: "なんのために××するのだろう？", cn: "＝××する理由は何もない！", en: "= “There is no reason at all to ××!”" },
		],
		notes: [
			{
				jp: "「とんでもない！そんなはずはない！そうではない！」と{言|い}いたいんです。つまり{強|つよ}い{否定|ひてい}です！",
				cn: "是想说「岂有此理！不可能！不是那样的！」。也就是说，是强烈的否定！",
				en: "The writer wants to say “Nonsense! Impossible! That's not it!” — in other words, a strong denial!",
			},
		],
	},

	mondai: {
		instruction: "{次|つぎ}の{文章|ぶんしょう}を{読|よ}んで、{問|と}いに{答|こた}えなさい。",
		instructionCn: "阅读下面的文章，回答问题。",
		instructionEn: "Read each text below and answer its question. (Answers are in the separate booklet, p. 2.)",
		blocks: [
			{ type: "heading", jp: "1", cn: "第 1 题", en: "Exercise 1" },
			{
				type: "paragraph",
				jp: "{正直者|しょうじきもの}がバカをみる*。こんなことが、あってよいのであろうか。",
				cn: "老实人会吃亏。这样的事情，可以容许它存在吗。",
				en: "Honesty doesn't pay. Should such a thing be allowed to happen?",
				indent: true,
			},
			{ type: "heading", jp: "2", cn: "第 2 题", en: "Exercise 2" },
			{
				type: "paragraph",
				jp: "{自分|じぶん}は{長年|ながねん}ハンドルを{握|にぎ}って（注）きて{慣|な}れているし、{無事故|むじこ}{無違反|むいはんでやってきたのだから、これからも{事故|じこ}など{起|お}こすわけがないと、だれが{言|い}い{切|き}れるだろうか。",
				cn: "自己开了这么多年车，早已习惯，而且一直无事故、无违章——今后也不会出事故什么的，谁能断言呢。",
				en: "I have been driving for years and am used to it, and I have never had an accident or a violation — but who could say for sure that I will never cause an accident from now on?",
				indent: true,
			},
			{ type: "heading", jp: "3", cn: "第 3 题", en: "Exercise 3" },
			{
				type: "paragraph",
				jp: "{英語|えいご}がうまくなりたい{日本人|にっぽんじん}のいかに{多|おお}いことか。それは{新聞|しんぶん}や{雑誌|ざっし}で{英語学習|えいごがくしゅう}に{関|かん}する{広告|こうこく}を{毎日|まいにち}のように{見|み}かけることでもわかる。「これさえ{覚|おぼ}えれば{英語|えいご}の{達人|たつじん}（注1）になれる」「{毎日|まいにち}、たった15{分|ふん}{聞|き}くだけで{話|はな}せるようになる」など、いとも（注2）たやすく{英語|えいご}をものにできる{気|き}にさせるような{宣伝文句|せんでんもんく}が{並|なら}んでいる*。はたして{語学|ごがく}の{上達|じょうたつ}に{近道|ちかみち}はあるのであろうか。{私|わたし}は、それはかけた{時間|じかん}に{比例|ひれい}すると思っている。",
				cn: "想学好英语的日本人是何其之多。从每天都能在报纸和杂志上看到英语学习方面的广告这一点，也能看得出来。「只要记住这个，就能成为英语达人」「每天只需听15分钟，就能开口说话」等等，写满了令人觉得轻而易举地就能掌握英语的宣传词句。语言学习真的有捷径吗。我认为，它与所花的时间成正比。",
				en: "How many Japanese people want to become good at English! You can tell from the ads about learning English that you see in newspapers and magazines every day. “Just memorize this and you can become a master of English,” “Just listen for 15 minutes a day and you will be able to speak” — there are many ads which make you think it is easy to master English. Is there really a shortcut to getting better at a language? I believe it is in proportion to the time you spend.",
				indent: true,
			},
			{ type: "heading", jp: "4", cn: "第 4 题", en: "Exercise 4" },
			{
				type: "paragraph",
				jp: "「タバコの{吸|す}い{殻|がら}を{捨|す}てるな」と{書|か}いてある{線路|せんろ}のそばは{吸|す}い{殻|がら}だらけで、「ゴミは{各自|かくじ}で{持|も}ち{帰|かえ}りましょう」という{立|た}て{札|ふだ}の{周|まわ}りにはゴミが{山積|やまづ}みになっており、「{駐車禁止|ちゅうしゃきんし}」の{標識|ひょうしき}のあたりに{違法駐車|いほうちゅうしゃ}の{車|くるま}の{止|と}まっていないことはなく、「{写真撮影禁止|しゃしんさつえいきんし}」の{美術館|びじゅつかん}でのシャッターの{音|おと}やフラッシュは{珍|めずら}しいことではない。「するな」ということは「しないと{損|そん}だ」とか「{自分|じぶん}だけならしてもいい」という{意味|いみ}なのだろうか**。それなら、{外国人|がいこくじん}に{日本語|にほんご}を{教|おし}える{際|さい}には、そういう{意味|いみ}があると{注釈|ちゅうしゃく}をつけなければいけない。あるいは「{人|ひと}がするから、{自分|じぶん}もする」という{言|い}い{訳|わけ}をする{人|ひと}たちは、{人|ひと}が{死|し}ぬと{言|い}えば{自分|じぶん}も{死|し}ぬのであろうか。",
				cn: "写着「请勿乱扔烟头」的铁路沿线到处是烟头；立着「请各自带走垃圾」牌子的周围垃圾堆积如山；「禁止停车」标志附近从来没有不见违章停车的车的时候；在「禁止拍照」的美术馆里，快门声和闪光灯也并不稀奇。「严禁」难道就是「不做会吃亏」或「只有我一个人做的话没关系」的意思吗。如果是这样，那么在教外国人日语时，就必须加上这样的注释。或者，那些以「别人做，所以我也做」为借口的人，如果别人说要死，难道自己也会去死吗。",
				en: "Beside the railway tracks where a sign says “Do not throw cigarette butts away,” the ground is covered with butts; around the sign that says “Please take your trash home with you,” trash is piled up; near the “No parking” signs there is never a time without illegally parked cars; and in museums where photography is forbidden, the sound of shutters and flashes is not at all rare. Does “suruna” (not to do something) mean to them that they can be selfish, or it won't matter if one person does it? If so, when we teach Japanese to foreigners, we would have to add a note saying that is what it means. Or would the people who use the excuse “I do it because others do” also die if others said they would die?",
				indent: true,
			},
		],
		footnotes: [
			{ marker: "注", term: "ハンドルを握る", jp: "にぎる", cn: "握方向盘：开车", en: "to hold the steering wheel: to drive" },
			{ marker: "注1", term: "達人", jp: "たつじん", cn: "达人：非常擅长的人", en: "a master; an expert" },
			{ marker: "注2", term: "いとも", jp: "いとも", cn: "非常、实在：完全、真的", en: "very; quite; truly" },
		],
		questions: [
			{
				label: "問1",
				jp: "{筆者|ひっしゃ}の{言|い}いたいことはどちらか。",
				cn: "作者想说的是哪一个？",
				en: "Which is what the writer wants to say?",
				choices: [
					{ jp: "{正直|しょうじき}な{人|ひと}が{損|そん}をするようなことは、よくあることだ。", cn: "老实人吃亏这样的事，是常有的事。", en: "It is common for honest people to lose out." },
					{ jp: "{正直|しょうじき}な{人|ひと}が{損|そん}をするようなことは、あってはいけない。", cn: "老实人吃亏这样的事，是不应该有的。", en: "Honest people should not lose out." },
				],
				answer: 2,
				explanation:
					"「あってよいのであろうか」是疑问句形式的意见表达，等于「あってはいけない！」——作者在强烈否定「老实人吃亏」这种事。别册也提示：可能确实常有，但作者对此抱有疑问，也就是在否定它。所以选 2。",
				explanationEn:
					"“Atte yoi no de arō ka” is an opinion stated as a question — it means “It must not be allowed!” The writer is strongly denying that honest people should lose out. The booklet notes it may well be common, but the writer questions it, i.e. denies it. So the answer is 2.",
				choiceNotes: [
					"这是字面上的事实陈述，不是作者的意见。",
					"正确。疑问句形式表达的是强烈的否定。",
				],
				choiceNotesEn: [
					"This is a factual statement, not the writer's opinion.",
					"Correct. The question form expresses a strong denial.",
				],
			},
			{
				label: "問2",
				jp: "この{文|ぶん}の{内容|ないよう}と{合|あ}うのはどちらか。",
				cn: "与这段文字内容相符的是哪一个？",
				en: "Which of the following matches the content of this text?",
				choices: [
					{ jp: "{絶対|ぜったい}に{事故|じこ}を{起|お}こさないという{保証|ほしょう}はだれにもない。", cn: "谁也不能保证绝对不出事故。", en: "Nobody has a guarantee that they will never cause an accident." },
					{ jp: "{長年|ながねん}{安全運転|あんぜんうんてん}でやってきた{人|ひと}は、{事故|じこ}を{起|お}こす{可能性|かのうせい}が{低|ひく}い。", cn: "多年来一直安全驾驶的人，出事故的可能性低。", en: "People who have driven safely for many years are less likely to cause an accident." },
					{ jp: "{事故|じこ}を{起|お}こしたことのない{人|ひと}が{運転|うんてん}に{慣|な}れているとはいえない。", cn: "不能说没出过事故的人就习惯驾驶了。", en: "You cannot say that someone who has never caused an accident is used to driving." },
				],
				answer: 1,
				explanation:
					"关键句是「だれが言い切れるだろうか」——疑问句形式的意见，等于「だれも言い切れない」。别册提示要注意这个句子。所以「谁也不能保证绝对不出事故」的 1 正确。2、3 都不是作者要说的意思。",
				explanationEn:
					"The key sentence is “dare ga iikireru darō ka” — an opinion in question form, meaning “nobody could say that for sure.” The booklet tells you to watch this sentence. So 1, “nobody has such a guarantee,” is correct. 2 and 3 are not what the writer is saying.",
				choiceNotes: [
					"正确。「だれが言い切れるだろうか」＝谁也断言不了。",
					"文中没有比较事故可能性的高低。",
					"文中说自己「慣れている」，并没有否定这一点。",
				],
				choiceNotesEn: [
					"Correct. “Dare ga iikireru darō ka” = nobody could assert that.",
					"The text never compares how likely an accident is.",
					"The writer says he is used to driving; this is not denied.",
				],
			},
			{
				label: "問3",
				jp: "{筆者|ひっしゃ}が{言|い}いたいことは{何|なに}か。",
				cn: "作者想说的是什么？",
				en: "What does the writer want to say?",
				choices: [
					{ jp: "{短|みじか}い{時間|じかん}で{語学|ごがく}がうまくなることはない。", cn: "语言不可能在短时间内学好。", en: "You cannot get good at a language in a short time." },
					{ jp: "{新聞|しんぶん}や{雑誌|ざっし}の{広告|こうこく}に{語学|ごがく}の{上達|じょうたつ}の{近道|ちかみち}が{書|か}いてある。", cn: "报纸和杂志的广告上写着语言进步的捷径。", en: "Newspaper and magazine ads describe a shortcut to improving at a language." },
					{ jp: "{語学|ごがく}の{学習|がくしゅう}に{時間|じかん}をかけるのはよい{方法|ほうほう}とは{言|い}えない。", cn: "不能说在语言学习上花时间是好方法。", en: "You cannot say that spending time on language study is a good method." },
					{ jp: "{簡単|かんたん}に{語学|ごがく}が{上達|じょうたつ}する{方法|ほうほう}があるかどうかはわからない。", cn: "不知道有没有能轻松提高语言水平的方法。", en: "Nobody knows whether there is an easy way to improve at a language." },
				],
				answer: 1,
				explanation:
					"作者先问「近道はあるのであろうか」，再给出自己的结论：「それはかけた時間に比例する」——进步与所花时间成正比，也就是短时间内学不好。所以选 1。2 与作者的怀疑相反；3 与结论相反；4 作者已经给出了明确看法，不是「不知道」。",
				explanationEn:
					"The writer asks “Is there a shortcut?” and then gives his own conclusion: improvement “is in proportion to the time you spend” — so you cannot get good in a short time. Answer 1. 2 contradicts the writer's doubt; 3 contradicts his conclusion; in 4 he has clearly stated his view, so it is not “nobody knows.”",
				choiceNotes: [
					"正确。与「かけた時間に比例する」的结论一致。",
					"广告那样写，但作者并不相信。",
					"与作者结论相反：他认为花时间才有效。",
					"作者明确表了态，不是「不知道」。",
				],
				choiceNotesEn: [
					"Correct. It matches the conclusion “in proportion to the time spent.”",
					"The ads say so, but the writer does not believe them.",
					"Opposite of the conclusion: he thinks spending time is what works.",
					"The writer states his position clearly; it is not “unknown.”",
				],
			},
			{
				label: "問4",
				jp: "{筆者|ひっしゃ}が{言|い}いたいことは{何|なに}か。",
				cn: "作者想说的是什么？",
				en: "What does the writer want to say?",
				choices: [
					{ jp: "{日本人|にっぽんじん}にとって{公共|こうきょう}の{場所|ばしょ}は{人|ひと}のことを{気|き}にせず{自由|じゆう}に{何|なに}をしてもいい{場所|ばしょ}である。", cn: "对日本人来说，公共场所是不用顾及他人、可以自由做任何事的地方。", en: "For Japanese people, public places are places where you can do anything freely without worrying about others." },
					{ jp: "「するな」という{日本語|にほんご}は「{自分以外|じぶんいがい}の{人|ひと}はしてはいけない」という{意味|いみ}である。", cn: "「するな」这句日语是「自己以外的人不许做」的意思。", en: "The Japanese phrase “suruna” means “everyone except me must not do it.”" },
					{ jp: "{禁止|きんし}されていることを、{人|ひと}がするから{自分|じぶん}もという{言|い}い{訳|わけ}は{通|とお}らない。", cn: "对被禁止的事，「因为别人做所以我也做」这种借口是行不通的。", en: "The excuse “I do it because others do” does not work for things that are forbidden." },
					{ jp: "{日本語|にほんご}には{文字|もじ}どおりの{意味|いみ}のほかに{別|べつ}の{意味|いみ}もあり、{外国人|がいこくじん}に{誤解|ごかい}される。", cn: "日语除了字面意思之外还有别的意思，会被外国人误解。", en: "Japanese has other meanings besides the literal one, and foreigners misunderstand it." },
				],
				answer: 3,
				explanation:
					"作者用一连串反例讽刺那些无视「するな」的人，最后用疑问句「人が死ぬと言えば自分も死ぬのであろうか」点题：拿「别人做」当借口是站不住脚的。所以选 3。1、2 是被讽刺对象的想法，不是作者的；4 文中并未说外国人误解了日语。",
				explanationEn:
					"The writer piles up examples of people ignoring “don't” signs, then drives the point home with the question “would they also die if others said they would die?” — the excuse “others do it” does not hold. Answer 3. 1 and 2 are the attitudes being criticized, not the writer's; 4 is not claimed in the text.",
				choiceNotes: [
					"这是被批评的人的态度，不是作者的意见。",
					"作者没有给「するな」下这样的定义。",
					"正确。结尾的疑问句正是这个意思。",
					"文中说的是教日语时要加注釈，并非说外国人误解。",
				],
				choiceNotesEn: [
					"This is the attitude being criticized, not the writer's view.",
					"The writer gives no such definition of “suruna.”",
					"Correct. The closing question makes exactly this point.",
					"The text talks about adding notes when teaching Japanese, not about foreigners misunderstanding it.",
				],
			},
		],
		pageNotes: [
			{
				jp: "* there are many ads which make you think it is easy to master English",
				cn: "写满了令人觉得轻而易举地就能掌握英语的宣传词句",
				en: "there are many ads which make you think it is easy to master English",
			},
			{
				jp: "** Does “suruna” (not to do something) mean to them that they can be selfish, or it won't matter if one person does it?",
				cn: "「严禁」难道就是「不做会吃亏」或「只有我一个人做的话没关系」的意思吗？",
				en: "Does “suruna” (not to do something) mean to them that they can be selfish, or it won't matter if one person does it?",
			},
		],
	},

	vocab: [
		{ jp: "正直者", kana: "しょうじきもの", cn: "老实人", en: "an honest person", pos: "名詞" },
		{ jp: "損", kana: "そん", cn: "吃亏、损失", en: "a loss; disadvantage", pos: "名詞" },
		{ jp: "達人", kana: "たつじん", cn: "达人、高手", en: "a master; an expert", pos: "名詞" },
		{ jp: "宣伝文句", kana: "せんでんもんく", cn: "宣传词句", en: "advertising copy", pos: "名詞" },
		{ jp: "近道", kana: "ちかみち", cn: "捷径", en: "a shortcut", pos: "名詞" },
		{ jp: "比例", kana: "ひれい", cn: "比例", en: "proportion", pos: "名詞・動詞" },
		{ jp: "吸い殻", kana: "すいがら", cn: "烟头", en: "a cigarette butt", pos: "名詞" },
		{ jp: "山積み", kana: "やまづみ", cn: "堆积如山", en: "piled up high", pos: "名詞" },
		{ jp: "標識", kana: "ひょうしき", cn: "标志、标牌", en: "a sign; a marker", pos: "名詞" },
		{ jp: "違法", kana: "いほう", cn: "违法", en: "illegal", pos: "名詞・な形" },
		{ jp: "注釈", kana: "ちゅうしゃく", cn: "注释", en: "a note; annotation", pos: "名詞・動詞" },
		{ jp: "言い訳", kana: "いいわけ", cn: "借口、辩解", en: "an excuse", pos: "名詞・動詞" },
		{ jp: "言い切る", kana: "いいきる", cn: "断言、说死", en: "to state definitely", pos: "動詞" },
		{ jp: "慣れる", kana: "なれる", cn: "习惯", en: "to get used to", pos: "動詞" },
	],

	grammar: [
		{
			pattern: "疑問文の反語",
			formation: "〜だろうか／〜であろうか（文末）",
			meaning: "形式上是疑问，实际是强烈的否定或主张。「〜だろうか」＝「〜ではない！」。",
			meaningEn: "A question in form, but a strong denial or assertion in meaning: “~darō ka” = “It is NOT ~!”",
			example: {
				jp: "こんなことが、あってよいのであろうか。",
				cn: "这样的事情，可以容许它存在吗（＝绝不应该）。",
				en: "Should such a thing be allowed to happen? (= It must not.)",
			},
		},
		{
			pattern: "〜わけがない",
			formation: "普通形＋わけがない",
			meaning: "不可能……、绝不会……。表示强烈的否定推测。",
			meaningEn: "there is no way that…; it is impossible that…. A strong negative presumption.",
			example: {
				jp: "これからも{事故|じこ}など{起|お}こすわけがない。",
				cn: "今后也绝不会出事故什么的。",
				en: "There is no way I would cause an accident from now on either.",
			},
		},
		{
			pattern: "〜際（に）",
			formation: "名詞＋の際／動詞辞書形＋際",
			meaning: "在……的时候。比「〜とき」更正式。",
			meaningEn: "when / at the time of…. More formal than toki.",
			example: {
				jp: "{外国人|がいこくじん}に{日本語|にほんご}を{教|おし}える{際|さい}には、{注釈|ちゅうしゃく}をつけなければいけない。",
				cn: "在教外国人日语时，必须加上注释。",
				en: "When teaching Japanese to foreigners, you have to add notes.",
			},
		},
	],
};
