import type { ReadingDay } from "./types";

// 第6週 1日目 意見文① — printed pages 92–93
// 別冊 p.7（第6週の解答）は今回のスキャンに含まれていないため、答えは本文から導出。
export const w6d1: ReadingDay = {
	week: 6,
	day: 1,
	label: "意見文①",
	labelKana: "いけんぶん",
	labelEn: "Opinions ①",
	printedPages: [92, 93],
	answerSource: "derived",

	point: {
		title: "{文章|ぶんしょう}のパターンを{見|み}つけよう！",
		titleCn: "找出文章的结构模式！",
		titleEn: "Identify the sentence pattern!",
		figure: {
			alt: "2つの文章パターンの図。①「意見や考え → 例・説明・理由 → 意見や考えの確認」　②「導入 → 例・説明・理由 → 意見や考え」。横で「どのパターンかな？」と考えるキャラクター",
			cn: "两种文章结构图：①「观点 → 举例・说明・理由 → 重申观点」　②「引入 → 举例・说明・理由 → 观点」。旁边有角色在想：「是哪一种呢？」",
			en: "A diagram of two passage patterns: ① “opinion → examples / explanation / reasons → restating the opinion”  ② “introduction → examples / explanation / reasons → opinion.” A character nearby wonders, “Which pattern is this?”",
		},
		tips: [
			{
				jp: "{日本語|にほんご}の{文章|ぶんしょう}では、②の{場合|ばあい}が{多|おお}いです。つまり、{筆者|ひっしゃ}の{意見|いけん}は{最後|さいご}の{段落|だんらく}にあることが{多|おお}い。",
				cn: "日语文章多为第②种结构，也就是说——**笔者的观点通常出现在最后一段**。做题时先看结尾。",
				en: "Japanese passages are often type ② — that is, the writer’s opinion is often in the last paragraph. When you answer questions, look at the ending first.",
			},
			{
				jp: "①{意見|いけん}や{考|かんが}え → {例|れい}・{説明|せつめい}・{理由|りゆう}　→ {意見|いけん}や{考|かんが}えの{確認|かくにん}　／　②{導入|どうにゅう} → {例|れい}・{説明|せつめい}・{理由|りゆう} → {意見|いけん}や{考|かんが}え",
				cn: "①观点 → 举例・说明・理由 → 重申观点　／　②引入 → 举例・说明・理由 → 观点",
				en: "① opinion → examples / explanation / reasons → restating the opinion  /  ② introduction → examples / explanation / reasons → opinion",
			},
		],
		expressions: [
			{ jp: "導入", kana: "どうにゅう", cn: "引入、开头部分", en: "introduction" },
			{ jp: "〜だらけ", cn: "满是〜（多含贬义）", en: "full of …" },
			{ jp: "いわゆる", cn: "所谓的", en: "so-called, what you refer to as …" },
			{ jp: "ひっきりなしに", cn: "接连不断地", en: "continuously / incessantly" },
			{ jp: "普及", kana: "ふきゅう", cn: "普及", en: "spread, diffusion" },
			{ jp: "興味深い", kana: "きょうみぶかい", cn: "耐人寻味", en: "very interesting" },
			{ jp: "〜という点で見ると", kana: "てん", cn: "从〜这一点来看", en: "from the point of view of …" },
		],
	},

	renshu: {
		instruction: "{次|つぎ}の{少年|しょうねん}の{言葉|ことば}を{読|よ}んで、{後|あと}の{文|ぶん}から{正|ただ}しいものを{選|えら}ぼう。",
		instructionCn: "阅读下面这个少年说的话，从后面的句子中选出正确的。（答案在下一页）",
		instructionEn: "Read what the boy says below and choose the correct statements from the sentences that follow. (Answers are on the next page.)",
		blocks: [
			{
				type: "speech",
				speaker: "{少年|しょうねん}",
				speakerCn: "少年",
				speakerEn: "The boy",
				jp: "ぼくがパソコンを{使|つか}っていると、お{父|とう}さんがいつも{外|そと}で{遊|あそ}べ、って{言|い}うんだ。でもね、{公園|こうえん}は{遠|とお}いし、{道路|どうろ}は{車|くるま}だらけだし、{遊|あそ}ぶ{場所|ばしょ}なんてないんだよね。それに、{友|とも}だちはみんな{塾|じゅく}（※1）に{行|い}ってるし……。{自分|じぶん}の{部屋|へや}でパソコンを{使|つか}っているのがいちばん{楽|たの}しいんだよ。インターネット（※2）とかゲームとかね。{今|いま}、{携帯電話|けいたいでんわ}がほしいんだけど、お{父|とう}さんもお{母|かあ}さんも{中学生|ちゅうがくせい}になるまではダメって{言|い}うんだ。でもさ、クラスの{子|こ}の{半分|はんぶん}は{持|も}っているんだよ。インターネットとか{携帯電話|けいたいでんわ}とかすごく{便利|べんり}なのに、なぜいけないって{言|い}うのかわかんないよ。",
				cn: "我一用电脑，爸爸就总说「到外面玩去」。可是啊，公园很远，马路上全是车，根本没有能玩的地方。而且朋友们都去补习班了……在自己房间里用电脑最开心了。上上网、打打游戏什么的。现在我很想要手机，可爸爸妈妈都说等上了中学才行。可是啊，我们班有一半人都有手机呢。互联网啊手机啊明明那么方便，我真搞不懂为什么不可以。",
				en: "Whenever I use the computer, Dad always tells me to go play outside. But the park is far away, the roads are full of cars, and there’s nowhere to play. Besides, all my friends are at cram school… Using the computer in my own room is the most fun. The internet, games, that kind of thing. I want a cell phone now, but Mom and Dad both say not until I’m in junior high. But half the kids in my class already have one. The internet and cell phones are so convenient — I don’t get why they say I can’t have them.",
			},
		],
		footnotes: [
			{ marker: "※1", term: "塾", jp: "cram school", cn: "补习班", en: "cram school" },
			{ marker: "※2", term: "インターネット", jp: "internet", cn: "互联网", en: "internet" },
		],
		choices: [
			{ jp: "この{男|おとこ}の{子|こ}は{中学生|ちゅうがくせい}になったばかりである。", cn: "这个男孩刚上中学。", en: "This boy has just started junior high." },
			{ jp: "この{男|おとこ}の{子|こ}はパソコンでゲームをしている。", cn: "这个男孩用电脑打游戏。", en: "This boy plays games on the computer." },
			{ jp: "この{男|おとこ}の{子|こ}の{父親|ちちおや}はパソコンが{使|つか}えない。", cn: "这个男孩的父亲不会用电脑。", en: "This boy’s father cannot use a computer." },
			{ jp: "この{男|おとこ}の{子|こ}のクラスの{子|こ}の{半数|はんすう}が{携帯電話|けいたいでんわ}を{使用|しよう}している。", cn: "这个男孩班上有一半的孩子在用手机。", en: "Half the children in this boy’s class use cell phones." },
			{
				jp: "この{男|おとこ}の{子|こ}の{両親|りょうしん}はインターネットや{携帯電話|けいたいでんわ}を{便利|べんり}だとは{思|おも}っていない。",
				cn: "这个男孩的父母不认为互联网和手机方便。",
				en: "This boy’s parents do not think the internet and cell phones are convenient.",
			},
		],
		answers: [2, 4],
		hint: {
			jp: "「（{車|くるま}）だらけ」＝（{車|くるま}）がたくさんある。＊よくないことだという{気持|きも}ちで{使|つか}うことが{多|おお}い。「{中学生|ちゅうがくせい}になるまではダメ」＝まだ{中学生|ちゅうがくせい}ではない。",
			cn: "「〜だらけ」＝满是〜，多带有负面情绪；「等上中学才行」说明他还不是中学生；「便利なのに」是男孩自己的看法，文中并没有说父母怎么想。",
			en: "“〜だらけ” = full of …, often with a negative feeling. “Not until you’re in junior high” means he is not in junior high yet. “They’re so convenient” is the boy’s own view; the text never says what the parents think.",
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
				jp: "{現代科学|げんだいかがく}の{発達|はったつ}は、{私|わたし}たちの{生活|せいかつ}を{大|おお}きく{変|か}えた。{子|こ}どもたちの{教育|きょういく}においても、{今|いま}まででは{考|かんが}えられないような{大|おお}きな{影響|えいきょう}がある＊。",
				cn: "现代科学的发展，极大地改变了我们的生活。在孩子们的教育方面，也产生着以往难以想象的巨大影响＊。",
				en: "The development of modern science has greatly changed our lives. It has also had an unthinkably large influence on children’s education＊.",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "{今|いま}から50{年|ねん}ほど{前|まえ}、テレビは{一般|いっぱん}の{家庭|かてい}ではまだ{見|み}ることができなかった。{当時|とうじ}の{子|こ}どもたちの{遊|あそ}ぶ{場所|ばしょ}は、{家|いえ}の{中|なか}ではなく、{原|はら}っぱ（※1）や{空|あ}き{地|ち}、それから{今|いま}ほど{車|くるま}が{多|おお}くなかった{道路|どうろ}であった。そこで{子|こ}どもたちは{友|とも}だちと{遊|あそ}びながら、{知|し}らないうちにいわゆる（※2）{社会勉強|しゃかいべんきょう}もしてきたのだ＊＊。",
				cn: "大约 50 年前，一般家庭还看不到电视。当时孩子们玩耍的地方不是家里，而是草地、空地，以及当时车还没这么多的马路。在那些地方，孩子们一边和朋友玩耍，一边在不知不觉中学到了所谓的社会经验＊＊。",
				en: "About fifty years ago, ordinary families still could not watch television. The places children played then were not indoors, but open fields, vacant lots, and roads that did not have as many cars as they do now. There, while playing with friends, children also, without realizing it, picked up what you might call social education＊＊.",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "{時|とき}がたち、テレビが{普及|ふきゅう}すると、{子|こ}どもたちはあまり{外|そと}へ{出|で}なくなった。{外|そと}は{多|おお}くのビルが{建|た}ち、{道路|どうろ}は{車|くるま}がひっきりなしに（※3）{通|とお}るようになった。{外|そと}で{遊|あそ}びたくても{遊|あそ}ぶ{場所|ばしょ}がない。そしてパソコン{時代|じだい}の{今|いま}、{一日中家|いちにちじゅういえ}の{中|なか}でインターネットやメールをしている{子|こ}どもが{増|ふ}えている。",
				cn: "随着时间推移、电视普及，孩子们渐渐不太出门了。外面高楼林立，马路上车流不息。就算想在外面玩，也没有可玩的地方。而在电脑时代的今天，整天待在家里上网、发邮件的孩子越来越多。",
				en: "As time passed and television spread, children stopped going outside as much. Outside, many buildings went up, and cars began to pass continuously on the roads. Even if they wanted to play outside, there was nowhere to play. And now, in the computer age, more and more children spend the whole day indoors on the internet and email.",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "ＩＴ（※4）の{普及|ふきゅう}によって、{私|わたし}たちの{生活|せいかつ}は{非常|ひじょう}に{便利|べんり}になった。しかし、{子|こ}どもの{教育|きょういく}という{点|てん}で{見|み}るとどうだろう。{昔|むかし}のような{社会勉強|しゃかいべんきょう}はできなくなってしまった。{生|う}まれたときからインターネットや{携帯電話|けいたいでんわ}のある{世界|せかい}で{育|そだ}つ{今|いま}の{子|こ}どもたちがどういう{大人|おとな}になっていくのか、{興味深|きょうみぶか}い。それと{同時|どうじ}に{恐怖|きょうふ}を{感|かん}じるのは{私|わたし}だけだろうか。",
				cn: "随着 IT 的普及，我们的生活变得非常方便。然而，若从孩子的教育这一点来看又如何呢？像从前那样的社会经验已经无法获得了。从出生起就生活在有互联网和手机的世界里的今天的孩子，将来会成长为什么样的大人，这很耐人寻味。而与此同时感到一丝恐惧的，难道只有我一个人吗？",
				en: "With the spread of IT, our lives have become extremely convenient. But how does it look from the point of view of children’s education? The kind of social education we had in the old days is no longer possible. What kind of adults today’s children — who grow up from birth in a world of the internet and cell phones — will become is very interesting. And at the same time, am I the only one who feels a little fear?",
			},
		],
		footnotes: [
			{ marker: "※1", term: "原っぱ", jp: "fields", cn: "草地、空地", en: "fields" },
			{ marker: "※2", term: "いわゆる", jp: "so-called, what you refer to as …", cn: "所谓的", en: "so-called, what you refer to as …" },
			{ marker: "※3", term: "ひっきりなしに", jp: "continuously / incessantly", cn: "接连不断地", en: "continuously / incessantly" },
			{ marker: "※4", term: "ＩＴ", jp: "Information Technology", cn: "信息技术", en: "Information Technology" },
		],
		pageNotes: [
			{
				jp: "＊ There has been an unthinkable amount of influence on our children's education.",
				cn: "＊对孩子们的教育产生着以往无法想象的重大影响。",
				en: "＊ There has been an unthinkable amount of influence on our children's education.",
			},
			{
				jp: "＊＊ Kids naturally learned a lot of things about life through playing outside with their friends.",
				cn: "＊＊孩子们和朋友在外面玩耍的过程中，不知不觉学到了许多人情世故。",
				en: "＊＊ Kids naturally learned a lot of things about life through playing outside with their friends.",
			},
		],
		questions: [
			{
				label: "問1",
				jp: "{筆者|ひっしゃ}によると、{現在|げんざい}、{子|こ}どもたちの{教育|きょういく}に{大|おお}きな{影響|えいきょう}を{与|あた}えているのは{何|なに}か。",
				cn: "根据笔者的说法，现在对孩子们的教育产生巨大影响的是什么？",
				en: "According to the writer, what is now having a large influence on children’s education?",
				choices: [
					{ jp: "テレビの{普及|ふきゅう}", cn: "电视的普及", en: "the spread of television" },
					{ jp: "{外|そと}で{遊|あそ}ぶ{場所|ばしょ}がなくなったこと", cn: "外面没有玩耍的地方了", en: "the fact that there are no longer places to play outside" },
					{ jp: "ＩＴの{普及|ふきゅう}", cn: "IT 的普及", en: "the spread of IT" },
					{ jp: "メールや{携帯電話|けいたいでんわ}で{話|はな}す{内容|ないよう}", cn: "用邮件和手机交谈的内容", en: "the content of conversations by email and cell phone" },
				],
				answer: 3,
				explanation:
					"注意题目问的是「**現在**」。文章按时间顺序展开：50 年前 → 电视普及的时代 → 「パソコン時代の今」。最后一段开门见山地说「ＩＴの普及によって、私たちの生活は非常に便利になった。しかし、子どもの教育という点で見るとどうだろう」——现在影响教育的正是 IT 的普及，所以 3 正确。",
				explanationEn:
					"Note that the question asks about “now.” The passage moves in time: about 50 years ago → the age when television spread → “now, in the computer age.” The last paragraph opens with “With the spread of IT, our lives have become extremely convenient. But how does it look from the point of view of children’s education?” — what is influencing education now is the spread of IT, so 3 is correct.",
				choiceNotes: [
					"电视普及是「時がたち」那一段说的过去阶段，不是「现在」。",
					"没地方玩是电视时代就出现的**结果**，而现在的主因是 IT。",
					"正确。最后一段直接把 IT 的普及与「子どもの教育という点」联系起来。",
					"文章讨论的是 IT 普及这件事本身，没有涉及聊天的内容。",
				],
				choiceNotesEn: [
					"The spread of television is the past stage described in the “as time passed” paragraph, not “now.”",
					"Nowhere to play is a result that already appeared in the television age; the main cause now is IT.",
					"Correct. The last paragraph directly links the spread of IT with “the point of view of children’s education.”",
					"The passage is about the spread of IT itself, not the content of chats.",
				],
			},
			{
				label: "問2",
				jp: "{筆者|ひっしゃ}はＩＴの{普及|ふきゅう}についてどう{思|おも}っているか。",
				cn: "笔者对 IT 的普及是怎么看的？",
				en: "How does the writer feel about the spread of IT?",
				choices: [
					{
						jp: "ＩＴの{普及|ふきゅう}のせいで、{子|こ}どもたちの{遊|あそ}ぶ{場所|ばしょ}がなくなったと{思|おも}っている。",
						cn: "认为因为 IT 的普及，孩子们失去了玩耍的地方。",
						en: "Thinks children lost their places to play because of the spread of IT.",
					},
					{
						jp: "{子|こ}どもたちが{社会勉強|しゃかいべんきょう}できない{環境|かんきょう}になって{不安|ふあん}を{感|かん}じている。",
						cn: "对孩子们无法获得社会经验的环境感到不安。",
						en: "Feels uneasy that children are in an environment where they cannot get social education.",
					},
					{ jp: "{子|こ}どもたちにも{便利|べんり}で{必要|ひつよう}なものであると{思|おも}っている。", cn: "认为对孩子来说也是方便而必要的东西。", en: "Thinks it is convenient and necessary for children as well." },
					{
						jp: "テレビよりも{子|こ}どもたちへの{影響|えいきょう}が{少|すく}ないと{思|おも}っている。",
						cn: "认为它对孩子的影响比电视要小。",
						en: "Thinks its influence on children is smaller than that of television.",
					},
				],
				answer: 2,
				explanation:
					"本课要点说：日语文章多为「引入 → 说明 → 观点」，观点在最后。最后一段先承认「生活は非常に便利になった」，接着用「**しかし**」转折：「昔のような社会勉強はできなくなってしまった」，并以「恐怖を感じるのは私だけだろうか」收尾——这是用反问表达自己的忧虑。所以 2 正确。",
				explanationEn:
					"The day’s key point is that Japanese passages are often “introduction → explanation → opinion,” with the opinion at the end. The last paragraph first grants that “life has become extremely convenient,” then turns with “**しかし**”: “the kind of social education we had in the old days is no longer possible,” and ends with “am I the only one who feels a little fear?” — a rhetorical question that states the writer’s unease. So 2 is correct.",
				choiceNotes: [
					"没地方玩的原因是高楼增多、车流不断，与 IT 无关。",
					"正确。「社会勉強はできなくなってしまった」＋「恐怖を感じる」＝不安。",
					"「便利になった」说的是生活整体，紧接着的「しかし」才是笔者真正想说的。",
					"文章没有比较电视和 IT 影响的大小。",
				],
				choiceNotesEn: [
					"The reason there is nowhere to play is more buildings and constant traffic, not IT.",
					"Correct. “Social education is no longer possible” + “I feel fear” = unease.",
					"“Has become convenient” is about life as a whole; the “しかし” that follows is what the writer really wants to say.",
					"The passage never compares how large the influence of television and IT is.",
				],
			},
		],
	},

	vocab: [
		{ jp: "意見文", kana: "いけんぶん", cn: "议论文、评论文章", en: "opinion essay", pos: "名詞" },
		{ jp: "現代", kana: "げんだい", cn: "现代", en: "the present day", pos: "名詞" },
		{ jp: "発達", kana: "はったつ", cn: "发展", en: "development", pos: "名詞・動詞" },
		{ jp: "教育", kana: "きょういく", cn: "教育", en: "education", pos: "名詞" },
		{ jp: "影響を与える", kana: "えいきょうをあたえる", cn: "产生影响", en: "to have an influence on", pos: "表現" },
		{ jp: "当時", kana: "とうじ", cn: "当时", en: "at that time", pos: "名詞" },
		{ jp: "原っぱ", kana: "はらっぱ", cn: "草地、空地", en: "an open field", pos: "名詞" },
		{ jp: "空き地", kana: "あきち", cn: "空地", en: "a vacant lot", pos: "名詞" },
		{ jp: "いわゆる", cn: "所谓的", en: "so-called", pos: "連体詞" },
		{ jp: "社会勉強", kana: "しゃかいべんきょう", cn: "社会经验、人情世故", en: "social education; learning about life", pos: "名詞" },
		{ jp: "普及", kana: "ふきゅう", cn: "普及", en: "spread; becoming common", pos: "名詞・動詞" },
		{ jp: "ひっきりなしに", cn: "接连不断地", en: "continuously; without a break", pos: "副詞" },
		{ jp: "非常に", kana: "ひじょうに", cn: "非常", en: "extremely", pos: "副詞" },
		{ jp: "育つ", kana: "そだつ", cn: "成长", en: "to grow up", pos: "動詞" },
		{ jp: "興味深い", kana: "きょうみぶかい", cn: "耐人寻味", en: "very interesting; fascinating", pos: "い形" },
		{ jp: "恐怖", kana: "きょうふ", cn: "恐惧", en: "fear", pos: "名詞" },
		{ jp: "同時に", kana: "どうじに", cn: "同时", en: "at the same time", pos: "副詞" },
		{ jp: "塾", kana: "じゅく", cn: "补习班", en: "cram school", pos: "名詞" },
		{ jp: "半数", kana: "はんすう", cn: "半数", en: "half", pos: "名詞" },
	],

	grammar: [
		{
			pattern: "しかし／けれども（接続詞）",
			meaning: "但是。**转折词之后往往就是笔者真正的主张**——议论文最重要的信号。",
			meaningEn: "However. What comes after a contrast word is often the writer’s real claim — the most important signal in an opinion essay.",
			example: {
				jp: "{生活|せいかつ}は{非常|ひじょう}に{便利|べんり}になった。しかし、{子|こ}どもの{教育|きょういく}という{点|てん}で{見|み}るとどうだろう。",
				cn: "生活变得非常方便。然而，从孩子教育这一点来看又如何呢？",
				en: "Life has become extremely convenient. But how does it look from the point of view of children’s education?",
			},
			note: "本课要点。看到「しかし」就要提高注意力。",
			noteEn: "This is the key point of the lesson. When you see “しかし,” pay extra attention.",
		},
		{
			pattern: "〜だらけ",
			formation: "名詞 ＋ だらけ",
			meaning: "满是……。多用于说话人觉得不好的事物。",
			meaningEn: "Full of …. Often used of something the speaker thinks is bad.",
			example: { jp: "{道路|どうろ}は{車|くるま}だらけだし", cn: "马路上全是车", en: "the roads are full of cars" },
		},
		{
			pattern: "〜において（も）",
			formation: "名詞 ＋ において",
			meaning: "在……方面、在……上。书面语。",
			meaningEn: "In … / with regard to …. Written style.",
			example: { jp: "{子|こ}どもたちの{教育|きょういく}においても", cn: "在孩子们的教育方面也……", en: "in children’s education as well" },
		},
		{
			pattern: "〜という{点|てん}で{見|み}ると",
			meaning: "从……这一点来看。用于切换讨论的角度。",
			meaningEn: "From the point of view of …. Used to switch the angle of the discussion.",
			example: { jp: "{子|こ}どもの{教育|きょういく}という{点|てん}で{見|み}るとどうだろう。", cn: "从孩子教育这一点来看又如何呢？", en: "How does it look from the point of view of children’s education?" },
		},
		{
			pattern: "〜のは{私|わたし}だけだろうか",
			meaning: "难道只有我……吗？用反问委婉地表达自己的主张，议论文的经典结尾。",
			meaningEn: "Am I the only one who …? A rhetorical question that states a claim indirectly; a classic essay ending.",
			example: { jp: "{恐怖|きょうふ}を{感|かん}じるのは{私|わたし}だけだろうか。", cn: "感到恐惧的难道只有我一个人吗？", en: "Am I the only one who feels a little fear?" },
			note: "形式是疑问，实质是「我感到恐惧」这一主张。",
			noteEn: "The form is a question; the substance is the claim “I feel fear.”",
		},
		{
			pattern: "〜たくても〜ない",
			meaning: "即使想……也不能……。",
			meaningEn: "Even if you want to …, you cannot ….",
			example: { jp: "{外|そと}で{遊|あそ}びたくても{遊|あそ}ぶ{場所|ばしょ}がない。", cn: "就算想在外面玩也没有地方。", en: "Even if they want to play outside, there is nowhere to play." },
		},
		{
			pattern: "{知|し}らないうちに",
			meaning: "不知不觉中。",
			meaningEn: "Without realizing it / before one knows it.",
			example: { jp: "{知|し}らないうちにいわゆる{社会勉強|しゃかいべんきょう}もしてきた", cn: "不知不觉中也学到了所谓的社会经验", en: "without realizing it they also picked up so-called social education" },
		},
	],
};
