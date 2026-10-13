import type { ReadingDay } from "../reading-n3/types";

// 第3週 4日目 意見文④ — printed pages 50–51
export const w3d4: ReadingDay = {
	week: 3,
	day: 4,
	label: "意見文④",
	labelKana: "いけんぶん",
	labelEn: "Opinions ④",
	printedPages: [50, 51],
	answerSource: "book",

	point: {
		title: "{問|と}われている{部分|ぶぶん}に{焦点|しょうてん}を{当|あ}てて{読|よ}もう。",
		titleCn: "把焦点对准被问到的部分来读吧。",
		titleEn: "Try to focus on the main ideas as you read!",
		figure: {
			alt: "左のキャラクターが「問いから読んで早く答えを探す読み方です。」と言い、右のキャラクターが子どもを抱いて「この子、かわいいなあ」と思っているイラスト",
			cn: "左边的角色说「这是从问题读起、快速寻找答案的读法。」，右边的角色抱着孩子，想着「这孩子，真可爱啊」的插图",
			en: "The left character says “This is a way of reading that starts from the question and finds the answer quickly.” The right one holds a child and thinks “This child is so cute.”",
		},
		tips: [
			{
				jp: "{例|たと}えばこんなことを{問|と}われたら？",
				cn: "比如说，要是被问到这样的事情呢？",
				en: "If you are asked something like this, for example?",
			},
		],
		expressions: [
			{ jp: "○○なのはなぜか。→{理由|りゆう}を{表|あらわ}す{部分|ぶぶん}を{探|さが}そう！→……であるから、○○だ。", kana: "りゆう", cn: "为什么是○○？→去找表示理由的部分！→因为……，所以是○○。", en: "Why is it ○○? → Look for the part that gives the reason! → It is ○○ because …." },
			{ jp: "{何|なに}が△△なのか。→{指示語|しじご}のさす{部分|ぶぶん}を{探|さが}そう！→……。それは△△だ。", kana: "しじご", cn: "什么是△△？→去找指示词所指的部分！→……。那就是△△。", en: "What is △△? → Look for what the demonstrative points to! → …. That is △△." },
		],
	},

	renshu: {
		instruction: "{次|つぎ}の{会話文|かいわぶん}を{読|よ}んで、{後|あと}の{文|ぶん}から{正|ただ}しいものを{選|えら}ぼう。",
		instructionCn: "阅读下面的对话文，从后面的句子中选出正确的吧。",
		instructionEn: "Read the conversation below and choose the correct statements from the sentences that follow. (Answers are on the next page.)",
		blocks: [
			{
				type: "speech",
				speaker: "{妻|つま}",
				speakerCn: "妻子",
				speakerEn: "Wife",
				jp: "もう、まったく、あの{子|こ}ったら、{毎日|まいにち}だらだらと{過|す}ごして……しょうがないんだから。パパからも{叱|しか}ってよ。{今|いま}からきちんと{勉強|べんきょう}しておかないと！　ほんと、もったいない。{私|わたし}があの{子|こ}だったらと{思|おも}うけどな。{若|わか}い{時|とき}は{二度|にど}ないんだし。",
				cn: "真是的，简直了，那孩子啊，每天就这么懒懒散散地过……真是拿他没办法。爸爸你也骂骂他呀。从现在起不认认真真学起来可不行！真的，太可惜了。我倒是会想，要是我是那孩子就好了呢。年轻的时候不会有第二次啊。",
				en: "Honestly, that child, loafing around every day… I don’t know what to do. You scold him too. If he doesn’t start studying properly now—! It’s such a waste. I wish I were that child. You only get to be young once.",
			},
			{
				type: "speech",
				speaker: "{夫|おっと}",
				speakerCn: "丈夫",
				speakerEn: "Husband",
				jp: "あいつはあいつでちゃんと{考|かんが}えているさ。それより、{君|きみ}はどうなの？",
				cn: "那家伙嘛，他自己也在好好想着呢。比起这个，你怎么样？",
				en: "He has his own way of thinking. More to the point, what about you?",
			},
			{
				type: "speech",
				speaker: "{妻|つま}",
				speakerCn: "妻子",
				speakerEn: "Wife",
				jp: "え？　{私|わたし}？　{私|わたし}はもう……。",
				cn: "诶？我？我已经……。",
				en: "Huh? Me? I’m already…",
			},
			{
				type: "speech",
				speaker: "{夫|おっと}",
				speakerCn: "丈夫",
				speakerEn: "Husband",
				jp: "もう、{何|なに}？　{終|お}わったと{思|おも}ってるの？　{若|わか}いときだけが{大事|だいじ}だとか{思|おも}ってないよね。{俺|おれ}たちだって{同|おな}じだよ。ただ{毎日|まいにち}を{忙|いそが}しく{過|す}ごせばいいってわけじゃない。{勉強|べんきょう}したり、{楽|たの}しんだり、{泣|な}いたり{笑|わら}ったりしないと。{人生|じんせい}にはその{年|とし}その{年|とし}で{特有|とくゆう}の（注）{喜|よろこ}びや{悲|かな}しみがあるんだから。だから、あいつにも{今|いま}をただ{老後|ろうご}の{準備|じゅんび}にしてほしくないね、{俺|おれ}は。",
				cn: "已经什么？你觉得结束了吗？你不会认为只有年轻的时候才重要什么的吧。我们也都一样啊。并不是只要每天忙忙碌碌地过就行。得学习、得享受、得哭、得笑才行。因为人生在每一个年纪，都有那个年纪所特有的（注）喜悦和悲伤。所以我啊，也不希望那家伙把现在仅仅当成晚年的准备。",
				en: "Already what? You think it’s over? You don’t think only being young matters, do you? It’s the same for us. It isn’t as if just staying busy every day is enough. You have to study, enjoy yourself, cry and laugh. Life has joys and sorrows unique (note) to each age. So I don’t want him to make the present nothing but preparation for old age, either.",
			},
		],
		footnotes: [
			{ marker: "（注）", term: "特有の", jp: "とくゆうの", cn: "特有的", en: "unique" },
		],
		choices: [
			{ jp: "{妻|つま}は{若|わか}い{人|ひと}は{若|わか}い{時|とき}を{大事|だいじ}に{過|す}ごすべきだと{思|おも}っている。", cn: "妻子认为年轻人应该珍惜地度过年轻的时候。", en: "The wife thinks young people should spend their youth with care." },
			{ jp: "{夫|おっと}は{大事|だいじ}に{過|す}ごすのは{中年|ちゅうねん}も{老年|ろうねん}も{同|おな}じだと{思|おも}っている。", cn: "丈夫认为，珍惜地度过这一点，中年和老年都是一样的。", en: "The husband thinks middle age and old age should be lived with the same care." },
			{ jp: "{妻|つま}は{老後|ろうご}をどう{過|す}ごすかが{大事|だいじ}だと{思|おも}っている。", cn: "妻子认为如何度过晚年是重要的。", en: "The wife thinks how you spend old age is what matters." },
			{ jp: "{夫|おっと}は{子|こ}どもにあまり{勉強|べんきょう}してほしくないと{思|おも}っている。", cn: "丈夫并不太想让孩子学习。", en: "The husband does not really want the child to study." },
			{ jp: "{妻|つま}は{子|こ}どもより{自分|じぶん}と{夫|おっと}の{老後|ろうご}のことを{心配|しんぱい}している。", cn: "妻子比起孩子，更担心自己和丈夫的晚年。", en: "The wife is more worried about her and her husband’s old age than about the child." },
		],
		answers: [1, 2],
	},

	mondai: {
		instruction: "{次|つぎ}の{文章|ぶんしょう}を{読|よ}んで、{後|あと}の{問|と}いに{答|こた}えなさい。",
		instructionCn: "阅读下面的文章，回答后面的问题。",
		instructionEn: "Read the following text and answer the questions that follow. (Answers are in the separate booklet, p. 4.)",
		blocks: [
			{
				type: "paragraph",
				indent: true,
				jp: "{若|わか}い{時|とき}は{二度|にど}ない——と{言|い}う。だから、{若|わか}い{時代|じだい}を{大事|だいじ}にせよ、といった{意味|いみ}である。",
				cn: "人们说，年轻的时候不会有第二次——。因此，就是要珍惜年轻时代这样的意思。",
				en: "People say you are only young once. So the meaning is: treat your youth as something precious.",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "なるほど、その{通|とお}りである。だが、{皮肉屋|ひにくや}（注1）のわたしは、このことばに{反論|はんろん}したい。たしかに{若|わか}い{時|とき}は{一度|いちど}しかないが、{中年|ちゅうねん}だって、{老年|ろうねん}だって{一度|いちど}しかないのである。われわれは{若|わか}い{時代|じだい}を{大事|だいじ}にすべきであるが、{同様|どうよう}に{中年|ちゅうねん}を{大事|だいじ}にすべきであるし、{老年|ろうねん}を{大事|だいじ}にしなければならない。①{若|わか}い{時代|じだい}だけを{特別視|とくべつし}する{必要|ひつよう}はないのである。",
				cn: "的确，正是如此。但是，我这个爱挖苦的人（注1），想反驳这句话。年轻的时候的确只有一次，可中年也好，老年也好，都只有一次。我们应当珍惜年轻时代，同样也应当珍惜中年，并且必须珍惜老年。①没有必要只把年轻时代特别看待。",
				en: "Quite so. But I, a sarcastic person (note 1), want to argue with these words. It is true you are only young once — but you are only middle-aged once, and only old once as well. We should treat youth as precious, and likewise we should treat middle age as precious, and we must treat old age as precious. ①There is no need to single out youth as special.",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "わたし{自身|じしん}は{先|さき}ごろ、{五十三歳|ごじゅうさんさい}になった。{昔|むかし}の{呼称|こしょう}だと、もう{立派|りっぱ}な\"{老年|ろうねん}\"である。だから、ひがんで（注2）{言|い}っているのではない。わたしは、{老年|ろうねん}には{老年|ろうねん}のよさがあると思っている。（{中略|ちゅうりゃく}）{人生|じんせい}のそれぞれの{段階|だんかい}には、それぞれに{違|ちが}った{人生|じんせい}のこくがある。わたしはそう{思|おも}っている。わたしたちは、それぞれの{段階|だんかい}に{特有|とくゆう}な{人生|じんせい}の{喜|よろこ}びと{悲|かな}しみを{味|あじ}わいながら{生|い}きたい。",
				cn: "我自己前不久年满五十三岁。按从前的称呼，已经是十足的「老年」了。所以，并不是出于嫉妒（注2）才这么说的。我认为，老年有老年的好处。（中略）人生的每一个阶段，都有各自不同的人生况味。我是这么想的。我们想一边体味每个阶段所特有的人生喜悦与悲伤，一边生活。",
				en: "I myself turned fifty-three not long ago. By the old name for it, I am already a proper “old man.” So I am not saying this out of jealousy (note 2). I think old age has the good points of old age. (omission) Each stage of life has a richness of life that is different from the others. That is what I think. I want us to live while tasting the joys and sorrows unique to each stage.",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "にもかかわらず、どうして{若|わか}い{時代|じだい}だけが{特別視|とくべつし}されるのか！？　わたしには{不思議|ふしぎ}である。{思|おも}うに、{人々|ひとびと}は{若|わか}い{時代|じだい}を{準備段階|じゅんびだんかい}と{考|かんが}えているようだ。{若|わか}い{時|とき}にしっかりと{学問|がくもん}や{体験|たいけん}の{蓄積|ちくせき}をしておかないと、{後|あと}になって{困|こま}る。だから、{若|わか}いうちから{遊|あそ}びほうけて（注3）いてはいけない。と、{結局|けっきょく}は、{若者|わかもの}に{自制|じせい}と{禁欲|きんよく}（注4）を{呼|よ}びかけているのである。",
				cn: "尽管如此，为什么只有年轻时代会被特别看待呢！？我感到不可思议。想来，人们似乎把年轻时代看作准备阶段。如果在年轻的时候不扎扎实实地预先积累学问和体验，以后会不好办。所以，不能从还年轻时起就玩得忘乎所以（注3）。归根结底，这是在向年轻人呼吁自制与禁欲（注4）。",
				en: "And yet, why is only youth singled out as special!? I find it strange. People seem to think of youth as a preparatory stage. If you do not build up learning and experience firmly while you are young, you will be in trouble later. So you must not idle your youth away (note 3). In the end, they are calling on the young for self-control and abstinence (note 4).",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "でも、わたしは、②それはまちがいだと{思|おも}う。{若|わか}い{時代|じだい}に、{若|わか}い{時代|じだい}に{特有|とくゆう}の{人生|じんせい}の{喜|よろこ}び・{悲|かな}しみを{体験|たいけん}しておかないと、{中年|ちゅうねん}や{老年|ろうねん}になって、その{段階|だんかい}での{人生|じんせい}の{喜|よろこ}び・{悲|かな}しみが{味|あじ}わえない。{若|わか}い{時代|じだい}は{決|けっ}して{準備段階|じゅんびだんかい}ではない。{若者|わかもの}はそのことを{銘記|めいき}すべき（注5）である。",
				cn: "不过，我认为②那是错误的。如果在年轻时代没有体验过年轻时代所特有的人生喜悦、悲伤，那么到了中年或老年，就无法体味那个阶段的人生喜悦、悲伤。年轻时代绝不是准备阶段。年轻人应当把这一点铭记在心（注5）。",
				en: "But I think ②that is a mistake. If you do not experience the joys and sorrows unique to youth while you are young, then in middle age or old age you will not be able to taste the joys and sorrows of those stages. Youth is by no means a preparatory stage. The young should engrave that on their minds (note 5).",
			},
			{
				type: "source",
				jp: "（ひろさちや『まんだら{人生論|じんせいろん}（{下|げ}）』{読売新聞社|よみうりしんぶんしゃ}）",
				cn: "（广幸也《曼荼罗人生论（下）》读卖新闻社）",
				en: "(Hirosachiya, Mandala Essays on Life, vol. 2, Yomiuri Shimbunsha)",
			},
		],
		footnotes: [
			{ marker: "（注1）", term: "皮肉屋", jp: "ひにくや", cn: "讽刺家、爱挖苦的人", en: "a sarcastic person" },
			{ marker: "（注2）", term: "ひがむ", jp: "ひがむ", cn: "怀偏见、嫉妒", en: "to be jealous" },
			{ marker: "（注3）", term: "遊びほうける", jp: "あそびほうける", cn: "沉溺于玩乐", en: "to play around and not work" },
			{ marker: "（注4）", term: "自制と禁欲", jp: "じせいときんよく", cn: "自制和禁欲", en: "self-control and abstinence" },
			{ marker: "（注5）", term: "銘記する", jp: "めいきする", cn: "牢记在心", en: "to engrave" },
		],
		questions: [
			{
				label: "問1",
				jp: "①{若|わか}い{時代|じだい}だけを{特別視|とくべつし}する{必要|ひつよう}はないとあるが、それはなぜか。",
				cn: "文中说①没有必要只把年轻时代特别看待，这是为什么？",
				en: "It says ①there is no need to single out youth as special. Why?",
				choices: [
					{ jp: "{老年|ろうねん}のほうが{人生|じんせい}のよさがあるから。", cn: "因为老年更有人生的好处。", en: "Because old age has more of what is good in life." },
					{ jp: "{自分|じぶん}が{皮肉屋|ひにくや}だから。", cn: "因为自己是爱挖苦的人。", en: "Because he himself is a sarcastic person." },
					{ jp: "{若|わか}い{時代|じだい}と{同様|どうよう}に、{中年|ちゅうねん}、{老年|ろうねん}も{大事|だいじ}だから。", cn: "因为和年轻时代一样，中年、老年也很重要。", en: "Because middle age and old age matter just as youth does." },
					{ jp: "{若|わか}いときは{一度|いちど}しかないから。", cn: "因为年轻的时候只有一次。", en: "Because you are only young once." },
				],
				answer: 3,
				explanation:
					"别册提示注意第 2 段第 2 行。就在①的前面：「中年だって、老年だって一度しかない」「同様に中年を大事にすべきであるし、老年を大事にしなければならない」。理由就是中年、老年和年轻一样重要，选 3。本课要点：问「なぜか」就去找表示理由的部分。1 把「老年のよさ」说成「更好」，过了。2 是笔者的自称，不是理由。4 正是他要反驳的常识。",
				explanationEn:
					"The answer key says to look at paragraph 2, line 2. Right before ①: “you are only middle-aged once, and only old once as well,” and “likewise we should treat middle age as precious, and we must treat old age as precious.” The reason is that middle age and old age matter just as youth does: 3. This lesson’s point: when asked “why?,” look for the reason. 1 upgrades “the good points of old age” into “better.” 2 is how he describes himself, not the reason. 4 is the common sense he is arguing against.",
				choiceNotes: [
					"文中说「老年には老年のよさがある」，不是「比别的阶段更好」。",
					"「皮肉屋」说明他爱抬杠，不是「不必特别看待年轻」的理由。",
					"正确。就在①前面的「同様に中年を…老年を大事にしなければならない」。",
					"这是世人的说法，正是笔者要反驳的。",
				],
				choiceNotesEn: [
					"He says old age has the good points of old age, not that it is better than the other stages.",
					"“A sarcastic person” is how he labels himself, not the reason youth should not be singled out.",
					"Correct. It is the “likewise middle age… and old age” just before ①.",
					"That is the common saying, which the writer is arguing against.",
				],
			},
			{
				label: "問2",
				jp: "②それはまちがいだと{思|おも}うとあるが、{何|なに}がまちがいであると{思|おも}うのか。",
				cn: "文中说②我认为那是错误的，他认为什么是错误的呢？",
				en: "It says ②he thinks that is a mistake. What does he think is a mistake?",
				choices: [
					{ jp: "{若|わか}いうちから{遊|あそ}びほうけること", cn: "从还年轻时起就玩得忘乎所以", en: "idling one’s youth away" },
					{ jp: "{若|わか}い{時代|じだい}にしっかりと{学問|がくもん}や{体験|たいけん}の{蓄積|ちくせき}をすること", cn: "在年轻时代扎扎实实地积累学问和体验", en: "building up learning and experience firmly in youth" },
					{ jp: "{若|わか}い{時代|じだい}を{特別視|とくべつし}しないこと", cn: "不把年轻时代特别看待", en: "not singling out youth as special" },
					{ jp: "{若者|わかもの}に{自制|じせい}と{禁欲|きんよく}を{呼|よ}びかけること", cn: "向年轻人呼吁自制与禁欲", en: "calling on the young for self-control and abstinence" },
				],
				answer: 4,
				explanation:
					"指示词「それ」要往前找。前一段的结论是「結局は、若者に自制と禁欲を呼びかけているのである」。笔者说「それはまちがいだ」——把年轻只当成准备阶段、从而要求年轻人禁欲，才是错的。别册也写：这是笔者的意见，并非世间的常识。选 4。1 是世人劝年轻人不要做的事。2 是世人的主张。3 才是笔者自己的立场，不是「それ」。",
				explanationEn:
					"For the demonstrative sore, look back. The previous paragraph ends “in the end, they are calling on the young for self-control and abstinence.” “That is a mistake” means treating youth only as preparation, and thus demanding abstinence, is what is wrong. The answer key notes this is the writer’s opinion, not common sense. Choose 4. 1 is what people tell the young not to do. 2 is what people recommend. 3 is the writer’s own view, not sore.",
				choiceNotes: [
					"这是世人认为不该做的，不是「それ」。",
					"这是世人的主张，笔者并没有说积累学问本身是错的。",
					"不特别看待年轻，正是笔者赞成的，不可能是「まちがい」。",
					"正确。「それ」= 前段结尾的「自制と禁欲を呼びかけている」。",
				],
				choiceNotesEn: [
					"That is what people say you must not do, not sore.",
					"That is what people recommend; the writer does not say accumulating learning is itself wrong.",
					"Not singling out youth is what the writer favors, so it cannot be “the mistake.”",
					"Correct. Sore = the previous close, “calling for self-control and abstinence.”",
				],
			},
		],
	},

	vocab: [
		{ jp: "焦点", kana: "しょうてん", cn: "焦点", en: "focus", pos: "名詞" },
		{ jp: "指示語", kana: "しじご", cn: "指示词", en: "demonstrative", pos: "名詞" },
		{ jp: "だらだら", cn: "懒散地、拖沓地", en: "idly; sluggishly", pos: "副詞" },
		{ jp: "もったいない", cn: "可惜、浪费", en: "a waste; too good to waste", pos: "い形" },
		{ jp: "特有", kana: "とくゆう", cn: "特有", en: "unique; peculiar to", pos: "な形" },
		{ jp: "老後", kana: "ろうご", cn: "晚年", en: "old age (one’s later years)", pos: "名詞" },
		{ jp: "皮肉屋", kana: "ひにくや", cn: "爱挖苦的人", en: "a sarcastic person", pos: "名詞" },
		{ jp: "反論", kana: "はんろん", cn: "反驳", en: "objection; to argue back", pos: "名詞・動詞" },
		{ jp: "特別視", kana: "とくべつし", cn: "特别看待", en: "to single out as special", pos: "名詞・動詞" },
		{ jp: "呼称", kana: "こしょう", cn: "称呼", en: "a name; a designation", pos: "名詞" },
		{ jp: "ひがむ", cn: "怀偏见、嫉妒", en: "to feel slighted; to be jealous", pos: "動詞" },
		{ jp: "段階", kana: "だんかい", cn: "阶段", en: "stage", pos: "名詞" },
		{ jp: "こく", cn: "醇厚、况味", en: "richness; depth of flavor", pos: "名詞" },
		{ jp: "準備段階", kana: "じゅんびだんかい", cn: "准备阶段", en: "a preparatory stage", pos: "名詞" },
		{ jp: "蓄積", kana: "ちくせき", cn: "积累", en: "accumulation", pos: "名詞・動詞" },
		{ jp: "遊びほうける", kana: "あそびほうける", cn: "沉溺玩乐", en: "to idle away one’s time in play", pos: "動詞" },
		{ jp: "自制", kana: "じせい", cn: "自制", en: "self-control", pos: "名詞" },
		{ jp: "禁欲", kana: "きんよく", cn: "禁欲", en: "abstinence", pos: "名詞" },
		{ jp: "銘記", kana: "めいき", cn: "铭记", en: "to engrave on one’s mind", pos: "名詞・動詞" },
	],

	grammar: [
		{
			pattern: "〜べきだ",
			formation: "動詞辞書形＋べきだ",
			meaning: "应该……。表示说话人认为有那样做的必要。",
			meaningEn: "should; ought to. The speaker’s view that it is necessary.",
			example: {
				jp: "{中年|ちゅうねん}を{大事|だいじ}にすべきである。",
				cn: "应当珍惜中年。",
				en: "We should treat middle age as precious.",
			},
		},
		{
			pattern: "〜わけではない",
			formation: "普通形＋わけではない",
			meaning: "并不是……。部分否定。",
			meaningEn: "it is not the case that…. Partial negation.",
			example: {
				jp: "ただ{毎日|まいにち}を{忙|いそが}しく{過|す}ごせばいいってわけじゃない。",
				cn: "并不是只要每天忙忙碌碌地过就行。",
				en: "It isn’t as if just staying busy every day is enough.",
			},
		},
		{
			pattern: "〜ておく",
			formation: "動詞て形＋おく",
			meaning: "事先做好……。为以后做准备，或保持某种状态。",
			meaningEn: "to do … in advance / leave … done. Preparation, or keeping a state.",
			example: {
				jp: "{学問|がくもん}や{体験|たいけん}の{蓄積|ちくせき}をしておかないと、{後|あと}になって{困|こま}る。",
				cn: "如果不预先积累学问和体验，以后会不好办。",
				en: "If you do not build up learning and experience (in advance), you will be in trouble later.",
			},
		},
	],
};
