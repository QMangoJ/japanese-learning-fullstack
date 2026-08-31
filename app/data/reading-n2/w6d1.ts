import type { ReadingDay } from "../reading-n3/types";

// 第6週 1日目 言語に関する文章 — printed pages 96–97
export const w6d1: ReadingDay = {
	week: 6,
	day: 1,
	label: "言語に関する文章",
	labelKana: "げんごにかんするぶんしょう",
	labelEn: "Articles on Linguistics",
	printedPages: [96, 97],
	answerSource: "book",

	point: {
		title: "{長|なが}い{文章|ぶんしょう}はスラッシュ（／）で{分|わ}けて{理解|りかい}しよう！",
		titleCn: "长句子用斜线（／）切开再理解！",
		titleEn: "Try to understand a long sentence by splitting it into two with (／)!",
		figure: {
			alt: "切れ目のない長いホットドッグを前に「切らないと食べにくい。」と困っているキャラクター",
			cn: "角色对着一根没有切开的长热狗发愁：「不切开就很难吃。」",
			en: "A character facing an uncut long hot dog: “If you don’t cut it, it’s hard to eat.”",
		},
		tips: [
			{
				jp: "{例|たと}えばこんなふうに{切|き}ることができます。",
				cn: "比如可以像下面这样切开。",
				en: "For example, you can split it like this.",
			},
			{
				jp: "{最近|さいきん}の{子|こ}どもたちは／{兄弟|きょうだい}も{少|すく}なく、／{両親|りょうしん}とも{働|はたら}いている{場合|ばあい}も{多|おお}いので、／{昔|むかし}に{比|くら}べると／{家族間|かぞくかん}の{会話|かいわ}もどんどん{減|へ}ってきていると／{言|い}われている。",
				cn: "最近的孩子们／兄弟姐妹也少、／父母双职工的情况也多，所以／和过去相比／家人之间的交谈也在不断减少／据说是这样。",
				en: "Children these days / have fewer siblings, / and often both parents work, so / compared with the past / family conversation is steadily decreasing / it is said.",
			},
			{
				jp: "★{特|とく}に{主題|しゅだい}（TOPIC）と{文末|ぶんまつ}に{注意|ちゅうい}し、{何|なに}がどうだと{述|の}べているか{理解|りかい}しましょう。",
				cn: "尤其要注意主题（TOPIC）和句尾，弄清文章在说「什么怎么样」。",
				en: "Pay attention to the main theme (TOPIC) and the ending, and try to understand what is being said about what.",
			},
		],
		expressions: [
			{ jp: "主題（TOPIC）", kana: "しゅだい", cn: "主题", en: "topic; theme" },
			{ jp: "文末", kana: "ぶんまつ", cn: "句尾", en: "the end of a sentence" },
			{ jp: "〜と言われている", cn: "据说……", en: "it is said that…" },
			{ jp: "進化する", kana: "しんかする", cn: "进化", en: "to evolve" },
			{ jp: "猛烈なスピードで", kana: "もうれつな", cn: "以飞快的速度", en: "at a breakneck speed" },
			{ jp: "いわゆる", cn: "所谓的", en: "so-called" },
			{ jp: "顔文字", kana: "かおもじ", cn: "颜文字、表情符号", en: "emoticon; smiley" },
			{ jp: "言い過ぎ", kana: "いいすぎ", cn: "说得过火、夸张", en: "an overstatement" },
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
				speaker: "A{先生|せんせい}",
				speakerCn: "A 老师",
				speakerEn: "Teacher A",
				jp: "{最近|さいきん}の{生徒|せいと}たちの{会話|かいわ}、{何|なに}を{話|はな}しているのかよくわからないですよね。",
				cn: "最近学生们的对话，真搞不懂他们在说什么呢。",
				en: "Lately I really can’t tell what the students are talking about, can you?",
			},
			{
				type: "speech",
				speaker: "B{先生|せんせい}",
				speakerCn: "B 老师",
				speakerEn: "Teacher B",
				jp: "{本当|ほんとう}に。インターネットの{掲示板|けいじばん}（{注|ちゅう}1）の{書|か}き{込|こ}み（{注|ちゅう}2）なんか{見|み}ると、{宇宙人|うちゅうじん}の{会話|かいわ}のようなものがありますよ。それにしても、{今|いま}の{若|わか}い{人|ひと}たちは{新|あたら}しい{言葉|ことば}を{山|やま}のように{作|つく}り{出|だ}していますよね。",
				cn: "可不是。看看网上公告栏的留言，简直像外星人在说话。话说回来，现在的年轻人创造出的新词真是堆积如山呢。",
				en: "Really. If you look at posts on internet bulletin boards (note 1), some of them are like conversations among aliens. Still, young people these days are turning out new words by the mountain, aren’t they?",
			},
			{
				type: "speech",
				speaker: "A{先生|せんせい}",
				speakerCn: "A 老师",
				speakerEn: "Teacher A",
				jp: "ええ、でも、どれだけそういう{言葉|ことば}が{残|のこ}っていくんでしょうか。たいていは{消|き}えていきますよね。",
				cn: "是啊，不过那些词能留下多少呢。大多都会消失掉吧。",
				en: "Yes, but how many of those words will actually last? Most of them fade away, don’t they?",
			},
			{
				type: "speech",
				speaker: "B{先生|せんせい}",
				speakerCn: "B 老师",
				speakerEn: "Teacher B",
				jp: "ええ、でもコンピューター{用語|ようご}（{注|ちゅう}3）なんかは、{次々|つぎつぎ}{辞書|じしょ}に{追加|ついか}しなくてはいけなくて{大変|たいへん}でしょうね。",
				cn: "是啊，不过电脑用语之类的，得不断补进词典里，也够受的吧。",
				en: "Yes, but computer jargon (note 3) and the like have to be added to dictionaries one after another — that must be a lot of work.",
			},
		],
		footnotes: [
			{
				marker: "（注1）",
				term: "掲示板",
				jp: "a bulletin board system (bbs)",
				cn: "布告牌、电子公告栏",
				en: "a bulletin board system (BBS)",
			},
			{ marker: "（注2）", term: "書き込み", jp: "posting", cn: "写上的字、留言", en: "a post; posting" },
			{ marker: "（注3）", term: "用語", jp: "jargon", cn: "用语", en: "jargon; terminology" },
		],
		choices: [
			{
				jp: "{最近|さいきん}の{生徒|せいと}たちは{難|むずか}しい{内容|ないよう}の{会話|かいわ}をしている。",
				cn: "最近的学生在进行内容很难的对话。",
				en: "Students these days are having conversations with difficult content.",
			},
			{
				jp: "{若|わか}い{人|ひと}たちは、{掲示板|けいじばん}などで{新|あたら}しい{言葉|ことば}を{使|つか}って{会話|かいわ}している。",
				cn: "年轻人在公告栏等地方用新词交谈。",
				en: "Young people are talking with new words on bulletin boards and the like.",
			},
			{
				jp: "A{先生|せんせい}は{生徒|せいと}たちの{会話|かいわ}がよくわからないが、B{先生|せんせい}はよく{理解|りかい}している。",
				cn: "A 老师搞不懂学生的对话，但 B 老师很理解。",
				en: "Teacher A cannot follow the students’ conversation, but Teacher B understands it well.",
			},
			{
				jp: "インターネットの{掲示板|けいじばん}に{宇宙人|うちゅうじん}のような{人|ひと}が{書|か}き{込|こ}みをしている。",
				cn: "网上公告栏上有像外星人一样的人在留言。",
				en: "People like aliens are posting on internet bulletin boards.",
			},
			{
				jp: "B{先生|せんせい}はコンピューター{用語|ようご}は{辞書|じしょ}に{必要|ひつよう}だと{思|おも}っている。",
				cn: "B 老师认为电脑用语有必要收入词典。",
				en: "Teacher B thinks computer terms need to be in dictionaries.",
			},
		],
		answers: [2, 5],
	},

	mondai: {
		instruction: "{次|つぎ}の{文章|ぶんしょう}を{読|よ}んで、{後|あと}の{問|と}いに{答|こた}えなさい。",
		instructionCn: "阅读下面的文章，回答后面的问题。（答案在别册 p.7）",
		instructionEn: "Read the following passage and answer the questions that follow. (Answers are in the separate booklet, p. 7.)",
		blocks: [
			{
				type: "paragraph",
				indent: true,
				jp: "{言葉|ことば}は{時代|じだい}とともに{進化|しんか}する（{注|ちゅう}1）。ほかの{言語|げんご}と{同様|どうよう}に{今|いま}まで{日本語|にほんご}もずっと{変化|へんか}し{続|つづ}けてきたが、{現在|げんざい}は{特|とく}に{猛烈|もうれつ}なスピードで（{注|ちゅう}2）{変化|へんか}しているようだ。",
				cn: "语言会随着时代一起进化（注1）。和其他语言一样，日语至今也一直在持续变化，而现在似乎正以特别迅猛的速度（注2）变化着。",
				en: "Language evolves with the times (note 1). Just like other languages, Japanese has kept changing all along, but it now seems to be changing at a particularly breakneck speed (note 2).",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "その{原因|げんいん}の{一|ひと}つとして{考|かんが}えられるのは、いわゆるITに{関係|かんけい}すること、つまりパソコンや{携帯電話|けいたいでんわ}などである。{以前|いぜん}は{専門家|せんもんか}にしかわからなかったコンピューター{用語|ようご}も、{今|いま}では{一般|いっぱん}の{会話|かいわ}の{中|なか}に{当然|とうぜん}のように{出|で}てくるようになった。また、{携帯電話|けいたいでんわ}やパソコンのメール、{掲示板|けいじばん}などの{書|か}き{込|こ}みから{次々|つぎつぎ}と{新|あたら}しい{言葉|ことば}が{生|う}まれている。(^_^)や(-_-)のような{顔文字|かおもじ}も{入|はい}り、そこでの{会話|かいわ}はまるで{宇宙人|うちゅうじん}がしゃべっているように{思|おも}えるくらいである。",
				cn: "可以想到的原因之一，就是所谓与 IT 有关的事物，也就是电脑、手机等等。以前只有专家才懂的电脑用语，如今也理所当然地出现在一般对话里。另外，从手机和电脑邮件、公告栏留言里，新词也在不断产生。还夹杂着 (^_^)、(-_-) 这类颜文字，那里的对话简直让人觉得像外星人在说话。",
				en: "One cause that can be considered is things related to so-called IT — that is, PCs and mobile phones. Computer terms that once only specialists understood now turn up in ordinary conversation as a matter of course. Also, new words keep being born from mobile-phone and PC e-mail and from posts on bulletin boards. Emoticons like (^_^) and (-_-) get mixed in, and the conversation there almost seems as if aliens were talking.",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "これまでも{多|おお}くの{言葉|ことば}が{生|う}まれては{消|き}えていき、{残|のこ}る{言葉|ことば}の{数|かず}は{限|かぎ}られているので、このような{事態|じたい}も{特|とく}に{驚|おどろ}くことではないという{言語学者|げんごがくしゃ}もいる。しかし、これほど{新|あたら}しい{言葉|ことば}や{表現|ひょうげん}が{増|ふ}えると{大半|たいはん}が{消|き}えていったとしても、かなりの{数|かず}の{新|あたら}しい{言葉|ことば}が{残|のこ}るのではないだろうか*。50{年後|ねんご}の{日本語|にほんご}は{今|いま}とはまったく{別|べつ}の{言語|げんご}になっているのかもしれない、というのは{言|い}い{過|す}ぎだろうか。",
				cn: "迄今也有许多词生了又灭，能留下来的词数量有限，所以也有语言学者认为这种局面并不特别值得吃惊。但是，新词和新表达增加到这个程度，就算大半都消失了，也会有相当数量的新词留下来吧*。说五十年后的日语也许会变成和现在完全不同的语言——这难道是说得过火了吗？",
				en: "Plenty of words have been born and then died out until now as well, and the number that remain is limited, so some linguists say even this situation is nothing particularly surprising. But when new words and expressions increase this much, even if the majority disappear, quite a number of new words will remain, won’t they*? Is it going too far to say that Japanese fifty years from now may have become a completely different language from today’s?",
			},
		],
		footnotes: [
			{ marker: "（注1）", term: "進化する", jp: "to evolve", cn: "进化", en: "to evolve" },
			{
				marker: "（注2）",
				term: "猛烈なスピードで",
				jp: "at a breakneck speed",
				cn: "飞速地",
				en: "at a breakneck speed",
			},
		],
		pageNotes: [
			{
				jp: "Even though a lot of new words disappear, a fair number of them will remain",
				cn: "即使大半新词都消失了，也会有相当数量的新词留存下来吧",
				en: "Even though a lot of new words disappear, a fair number of them will remain",
			},
		],
		questions: [
			{
				label: "問1",
				jp: "どうして{特|とく}に{驚|おどろ}くことではないのか。",
				cn: "为什么说并不特别值得吃惊？",
				en: "Why is it nothing particularly surprising?",
				choices: [
					{
						jp: "{残|のこ}っていく{新|あたら}しい{言葉|ことば}の{数|かず}は{今|いま}までと{変|か}わらないだろうから。",
						cn: "因为留下来的新词数量大概会和以往一样。",
						en: "Because the number of new words that remain will probably be no different from until now.",
					},
					{
						jp: "{生|う}み{出|だ}された{新|あたら}しい{言葉|ことば}は{思|おも}ったほど{多|おお}くないから。",
						cn: "因为造出来的新词并没有想象的那么多。",
						en: "Because the new words that have been created are not as many as one might think.",
					},
					{
						jp: "{携帯電話|けいたいでんわ}やパソコンの{影響|えいきょう}で{新|あたら}しい{言葉|ことば}が{増|ふ}えているから。",
						cn: "因为受手机和电脑的影响，新词在增加。",
						en: "Because new words are increasing under the influence of mobile phones and PCs.",
					},
					{
						jp: "いつの{時代|じだい}も{若|わか}い{人|ひと}の{会話|かいわ}は{宇宙人|うちゅうじん}の{会話|かいわ}のようだから。",
						cn: "因为无论哪个时代，年轻人的对话都像外星人的对话。",
						en: "Because young people’s conversation in every era is like conversation among aliens.",
					},
				],
				answer: 1,
				explanation:
					"第三段写着「残る言葉の数は限られているので、このような事態も特に驚くことではない」。语言学者觉得不必吃惊，是因为能留下来的词本来就有限，数量和以往不会差很多。所以 1 正确。2 与「これほど新しい言葉や表現が増える」相反。3 是变化快的原因，不是「不必吃惊」的理由。4 只是对网上用语的比喻，并非「哪个时代都如此」。",
				explanationEn:
					"The third paragraph says remaining words are limited, so this situation is nothing particularly surprising. Linguists are not shocked because the number that last is inherently capped — it will not be so different from the past. So 1 is correct. 2 contradicts “new words and expressions are increasing this much.” 3 is a cause of rapid change, not a reason not to be surprised. 4 is only a metaphor for online talk, not a claim about every era.",
				choiceNotes: [
					"正确。留下来的词数量有限，所以和以往差不多。",
					"文中说新词在大量增加，不是「没有想象的那么多」。",
					"这是变化快的原因，不是「不必吃惊」的理由。",
					"「宇宙人」只是比喻网上的写法，并非「哪个时代的年轻人都这样」。",
				],
				choiceNotesEn: [
					"Correct. The number of words that remain is limited, so it will be much like the past.",
					"The passage says new words are increasing a great deal, not that there are fewer than expected.",
					"This is a cause of rapid change, not the reason it is unsurprising.",
					"“Aliens” is only a metaphor for online writing, not a claim about young people in every era.",
				],
			},
			{
				label: "問2",
				jp: "{筆者|ひっしゃ}の{最|もっと}も{言|い}いたいことはどれか。",
				cn: "笔者最想说的是哪一项？",
				en: "Which of the following is what the writer most wants to say?",
				choices: [
					{
						jp: "{若|わか}い{人|ひと}は{普通|ふつう}の{言葉|ことば}で{会話|かいわ}したほうがいい。",
						cn: "年轻人最好用普通的词交谈。",
						en: "Young people should talk in ordinary language.",
					},
					{
						jp: "これからは{今|いま}までよりも{多|おお}くの{新|あたら}しい{言葉|ことば}が{残|のこ}っていくだろう。",
						cn: "今后留下来的新词会比以往更多。",
						en: "From now on, more new words than before will remain.",
					},
					{
						jp: "{言葉|ことば}が{変化|へんか}しているとは{言|い}えない。",
						cn: "不能说语言正在变化。",
						en: "One cannot say that language is changing.",
					},
					{
						jp: "{古|ふる}い{日本語|にほんご}を{大切|たいせつ}にしなければならない。",
						cn: "必须珍惜古老的日语。",
						en: "We must treasure old Japanese.",
					},
				],
				answer: 2,
				explanation:
					"结尾说：新词多到这个程度，就算大半消失，也会留下相当数量；甚至问「五十年后会不会变成另一种语言」。这正是「今后留下来的新词会比以往更多」。1、4 文中没有劝年轻人怎么说、也没有要保护古语。3 与全文「一直在变、现在变得更快」相反。读论说文要看最后一段的主张。",
				explanationEn:
					"The ending says that with this many new words, even if most vanish a fair number will remain — and even asks whether Japanese in fifty years might be a different language. That is “more new words than before will remain.” 1 and 4 never urge young people to speak ordinarily or to protect old Japanese. 3 contradicts the whole passage. In editorials, look at the last paragraph for the writer’s claim.",
				choiceNotes: [
					"文中没有评价年轻人「应该」怎么说话。",
					"正确。新词增加，留下来的也会比过去多。",
					"开头就说语言一直在变，现在变得更快。",
					"文中没有「必须珍惜古日语」的主张。",
				],
				choiceNotesEn: [
					"The passage never says how young people “should” speak.",
					"Correct. New words are increasing, so more of them will remain than in the past.",
					"The opening already says language has always changed and is now changing faster.",
					"There is no claim that old Japanese must be treasured.",
				],
			},
		],
	},

	vocab: [
		{ jp: "進化する", kana: "しんかする", cn: "进化", en: "to evolve", pos: "動詞" },
		{ jp: "猛烈", kana: "もうれつ", cn: "猛烈、迅猛", en: "fierce; intense", pos: "な形" },
		{ jp: "いわゆる", cn: "所谓的", en: "so-called", pos: "連体詞" },
		{ jp: "専門家", kana: "せんもんか", cn: "专家", en: "specialist; expert", pos: "名詞" },
		{ jp: "用語", kana: "ようご", cn: "用语、术语", en: "term; jargon", pos: "名詞" },
		{ jp: "掲示板", kana: "けいじばん", cn: "公告栏、BBS", en: "bulletin board", pos: "名詞" },
		{ jp: "書き込み", kana: "かきこみ", cn: "留言、发帖", en: "a post; writing in", pos: "名詞" },
		{ jp: "顔文字", kana: "かおもじ", cn: "颜文字", en: "emoticon", pos: "名詞" },
		{ jp: "宇宙人", kana: "うちゅうじん", cn: "外星人", en: "alien", pos: "名詞" },
		{ jp: "事態", kana: "じたい", cn: "事态、局面", en: "situation; state of affairs", pos: "名詞" },
		{ jp: "言語学者", kana: "げんごがくしゃ", cn: "语言学家", en: "linguist", pos: "名詞" },
		{ jp: "大半", kana: "たいはん", cn: "大半、大部分", en: "the majority", pos: "名詞" },
		{ jp: "言い過ぎ", kana: "いいすぎ", cn: "说得过火", en: "an overstatement", pos: "名詞" },
		{ jp: "主題", kana: "しゅだい", cn: "主题", en: "theme; topic", pos: "名詞" },
		{ jp: "文末", kana: "ぶんまつ", cn: "句尾", en: "end of a sentence", pos: "名詞" },
	],

	grammar: [
		{
			pattern: "〜とともに",
			formation: "名詞 ＋ とともに",
			meaning: "和……一起、随着……。书面语。",
			meaningEn: "together with… / as…. Written style.",
			example: {
				jp: "{言葉|ことば}は{時代|じだい}とともに{進化|しんか}する。",
				cn: "语言随着时代一起进化。",
				en: "Language evolves with the times.",
			},
		},
		{
			pattern: "〜のではないだろうか",
			formation: "普通形 ＋ のではないだろうか",
			meaning: "难道不是……吗。委婉提出自己的看法，论说文结尾常用。",
			meaningEn: "Isn’t it the case that…? A soft way to offer one’s view; common at the end of editorials.",
			example: {
				jp: "かなりの{数|かず}の{新|あたら}しい{言葉|ことば}が{残|のこ}るのではないだろうか。",
				cn: "会有相当数量的新词留下来吧。",
				en: "Quite a number of new words will remain, won’t they?",
			},
		},
		{
			pattern: "〜というのは言い過ぎだ",
			formation: "普通形／名詞 ＋ というのは言い過ぎだ",
			meaning: "说……就过头了。用来缓和自己刚提出的大胆推测。",
			meaningEn: "It would be going too far to say…. Softens a bold speculation the writer has just offered.",
			example: {
				jp: "50{年後|ねんご}の{日本語|にほんご}は{今|いま}とはまったく{別|べつ}の{言語|げんご}になっているのかもしれない、というのは{言|い}い{過|す}ぎだろうか。",
				cn: "说五十年后的日语也许会变成完全不同的语言——这难道过头了吗？",
				en: "Is it going too far to say Japanese in fifty years may have become a completely different language?",
			},
		},
	],
};
