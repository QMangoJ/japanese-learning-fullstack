import type { ReadingDay } from "../reading-n3/types";

// 第4週 2日目 エッセイ② — printed pages 62–63
export const w4d2: ReadingDay = {
	week: 4,
	day: 2,
	label: "エッセイ②",
	labelKana: "えっせい",
	labelEn: "Essays ②",
	printedPages: [62, 63],
	answerSource: "book",

	point: {
		title: "{実際|じっさい}に{起|お}きたことかどうか{考|かんが}えよう！",
		titleCn: "想想事情是否已经实际发生！",
		titleEn: "Try to understand what actually happened!",
		figure: {
			alt: "「乗らなくてよかったね！」と喜ぶキャラクターと、「あのときもっと勉強すればよかった……」と落ち込むキャラクター。仮定の文の下に「実際は〜ていない」と矢印で示されている",
			cn: "一个角色高兴地说「幸好没坐上！」；另一个沮丧地说「那时候再多读点书就好了……」。假设句下面用箭头标出「实际上并没有〜」。",
			en: "One character says happily, “Good thing I didn’t get on!” Another slumps, “I should have studied more then…” Arrows under the hypothetical sentences mark “in fact, that did not happen.”",
		},
		tips: [
			{
				jp: "{実際|じっさい}にはなかった{過去|かこ}の{仮定|かてい}",
				cn: "实际上并未发生的过去的假设",
				en: "A past hypothesis about something that did not actually happen",
			},
			{
				jp: "もしあの{飛行機|ひこうき}に{乗|の}っていたら、{事故|じこ}にあっていただろう。→{実際|じっさい}は{飛行機|ひこうき}に{乗|の}っていない／{実際|じっさい}は{事故|じこ}にあっていない",
				cn: "要是当时坐了那班飞机，大概就会遇上事故了。→实际上没坐飞机／实际上也没遇上事故",
				en: "If I had been on that plane, I would have been in the accident. → In fact I was not on the plane / in fact I was not in the accident.",
			},
			{
				jp: "あのときもっと{勉強|べんきょう}していたら、{今|いま}ごろ{博士|はかせ}になっていただろう。→{実際|じっさい}は{勉強|べんきょう}が{足|た}りなかった／{実際|じっさい}は{博士|はかせ}になっていない",
				cn: "那时候要是再多读点书，现在大概已经当上博士了。→实际上当时学习不够／实际上并没有成为博士",
				en: "If I had studied more then, I would be a PhD by now. → In fact I didn’t study enough / in fact I am not a PhD.",
			},
		],
		expressions: [
			{ jp: "もし〜ていたら、〜ただろう", cn: "要是当时〜的话，大概就会〜了（与过去事实相反）", en: "if I had …, I would have … (counterfactual past)" },
			{ jp: "〜ていたら", cn: "如果当时正处于〜的状态", en: "if … had been the case" },
			{ jp: "〜ただろう", cn: "大概就会〜了（对未发生之事的推测）", en: "would have … / would probably have …" },
			{ jp: "実際は〜ていない", kana: "じっさい", cn: "实际上并没有〜", en: "in fact, … did not happen" },
		],
	},

	renshu: {
		instruction: "{次|つぎ}の{会話文|かいわぶん}を{読|よ}んで、{後|あと}の{文|ぶん}から{正|ただ}しいものを{選|えら}ぼう。",
		instructionCn: "阅读下面的对话，从后面的句子中选出正确的。（答案在下一页）",
		instructionEn: "Read the conversation below and choose the correct statements from the sentences that follow. (Answers are on the next page.)",
		blocks: [
			{
				type: "speech",
				speaker: "{学生|がくせい}",
				speakerCn: "学生",
				speakerEn: "Student",
				jp: "{先生|せんせい}、{日本人|にほんじん}はだれかがくしゃみしても、「Bless you」とか{言|い}わないんですよね。",
				cn: "老师，日本人即使有人打喷嚏，也不会说 Bless you 之类的吧。",
				en: "Sensei, Japanese people don’t say “Bless you” or anything when someone sneezes, right?",
			},
			{
				type: "speech",
				speaker: "{教師|きょうし}",
				speakerCn: "教师",
				speakerEn: "Teacher",
				jp: "「だれかが{噂|うわさ}している」と{言|い}うことはありますが、{特|とく}に{何|なに}も{言|い}いませんね。でも、この{間|あいだ}{読|よ}んだ{本|ほん}によると、{沖縄|おきなわ}では{子|こ}どもがくしゃみをすると、そばにいる{人|ひと}が{何|なに}か{言|い}うらしいですよ。それを{言|い}わないと{子|こ}どもが{幽霊|ゆうれい}に{連|つ}れて{行|い}かれるとか。",
				cn: "有时会说「有人在说你坏话」，但一般什么都不说。不过，我前一阵看的书上说，冲绳小孩打喷嚏时，旁边的人好像会说点什么。不说的话小孩就会被幽灵带走之类的。",
				en: "People do sometimes say “someone is gossiping about you,” but they don’t really say anything in particular. Still, according to a book I read the other day, in Okinawa when a child sneezes, someone nearby apparently says something. If they don’t, the child will be taken away by a ghost, or so they say.",
			},
			{
				type: "speech",
				speaker: "{学生|がくせい}",
				speakerCn: "学生",
				speakerEn: "Student",
				jp: "へーえ、{日本語|にほんご}にも「Bless you」にあたる{表現|ひょうげん}があったんですね。",
				cn: "哎——原来日语里也有相当于 Bless you 的说法啊。",
				en: "Wow — so Japanese had an expression that corresponds to “Bless you,” too.",
			},
			{
				type: "speech",
				speaker: "{教師|きょうし}",
				speakerCn: "教师",
				speakerEn: "Teacher",
				jp: "{沖縄|おきなわ}だけでなく、『{徒然草|つれづれぐさ}』という{古|ふる}い{本|ほん}には、「くさめくさめ」と{言|い}う、{言|い}わないと{死|し}んでしまう、と{書|か}いてあるそうです。「くさめ」は「くしゃみ」のことですね。……あ、……はっくしょん！",
				cn: "不只是冲绳，据说一本叫《徒然草》的古书里还写着：要说「くさめくさめ」，不说的话人就会死。「くさめ」就是「喷嚏」的意思。……啊，……阿嚏！",
				en: "Not only Okinawa — an old book called Tsurezuregusa apparently says you say “kusame kusame,” and if you don’t, you’ll die. “Kusame” is the word for a sneeze. …Ah… achoo!",
			},
			{
				type: "speech",
				speaker: "{学生|がくせい}",
				speakerCn: "学生",
				speakerEn: "Student",
				jp: "くしゃみくしゃみ！",
				cn: "喷嚏喷嚏！",
				en: "Kushami kushami!",
			},
		],
		choices: [
			{ jp: "{日本|にほん}では、くしゃみをすると「だれかがうわさをしている」と{言|い}わなければならない。", cn: "在日本，一打喷嚏就必须说「有人在说你坏话」。", en: "In Japan, when someone sneezes you have to say “someone is gossiping about you.”" },
			{ jp: "{日本|にほん}にはだれかがくしゃみをしたときに{言|い}う「Bless you」に{当|あ}たる{表現|ひょうげん}はない。", cn: "日语里没有相当于有人打喷嚏时说的 Bless you 的表达。", en: "Japanese has no expression that corresponds to saying “Bless you” when someone sneezes." },
			{ jp: "{昔|むかし}、{日本|にほん}ではくしゃみをすると{悪|わる}いことが{起|お}こると{信|しん}じられていた。", cn: "从前在日本，人们相信一打喷嚏就会发生不好的事。", en: "In the past, people in Japan believed that something bad would happen if you sneezed." },
			{ jp: "{昔|むかし}だけでなく{今|いま}でも{沖縄|おきなわ}では、くしゃみをすると{悪|わる}いことが{起|お}こる。", cn: "不只从前，现在冲绳一打喷嚏也会发生不好的事。", en: "Not only in the past but even now in Okinawa, something bad happens when you sneeze." },
			{ jp: "この{先生|せんせい}も{最近|さいきん}まで、{沖縄|おきなわ}のくしゃみについての{習慣|しゅうかん}を{知|し}らなかった。", cn: "这位老师直到最近也不知道冲绳关于打喷嚏的习惯。", en: "Until recently this teacher did not know about the Okinawan custom regarding sneezes." },
		],
		answers: [3, 5],
	},

	mondai: {
		instruction: "{次|つぎ}の{文章|ぶんしょう}を{読|よ}んで、{後|あと}の{問|と}いに{答|こた}えなさい。",
		instructionCn: "阅读下面的文章，回答后面的问题。（答案在别册 p.5）",
		instructionEn: "Read the passage below and answer the questions that follow. (Answers are in the separate booklet, p. 5.)",
		blocks: [
			{
				type: "paragraph",
				indent: true,
				jp: "「①{日本人|にほんじん}はだれかがくしゃみをしても、{何|なに}も{言|い}わないんですか。」",
				cn: "「①日本人即使有人打喷嚏，也什么都不说吗？」",
				en: "“①Is it true that Japanese people don’t say anything even when someone sneezes?”",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "もし、こんな{質問|しつもん}を{教室|きょうしつ}でされていたら、なんと{答|こた}えていただろう。そういう{習慣|しゅうかん}はありませんね、と{簡単|かんたん}に{答|こた}えてしまっていただろう。つまり、{英語|えいご}の「Bless you!」に{当|あ}たるようなものがないのか、という{質問|しつもん}だ。{日本|にほん}にもちゃんとそういう{習慣|しゅうかん}が{過去|かこ}にあり、さらに{現在|げんざい}でも{沖縄|おきなわ}に{残|のこ}っていることを{知|し}ったのは、つい{最近|さいきん}のことだ。",
				cn: "要是在教室里被这样问了，我会怎么回答呢。大概会随口答一句「没有那种习惯吧」。也就是在问：有没有相当于英语 Bless you! 的说法。其实日本过去确实有这种习惯，而且现在冲绳还保留着——我知道这件事，还是最近的事。",
				en: "If I had been asked a question like this in class, how would I have answered? I would probably have answered simply, “We don’t have that custom.” In other words, the question is whether there is anything that corresponds to English “Bless you!” It was only recently that I learned Japan did in fact have such a custom in the past, and that it still survives in Okinawa today.",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "{沖縄|おきなわ}では{子|こ}どもがくしゃみをすると、そばにいる{人|ひと}が「クスクェー」と{言|い}うらしい。{言|い}わないと{子|こ}どもが{幽霊|ゆうれい}に{連|つ}れていかれるという{言|い}い{伝|つた}え（{注|ちゅう}1）によるものだそうだ。{調|しら}べてみると、『{徒然草|つれづれぐさ}』という{有名|ゆうめい}な{書物|しょもつ}（1330{年頃|ねんごろ}）にも、くしゃみが{出|で}たときに「くさめくさめ」と{唱|とな}えない（{注|ちゅう}2）と{死|し}んでしまうという{記述|きじゅつ}があることがわかった。",
				cn: "据说在冲绳，小孩一打喷嚏，旁边的人会说「クスクェー」。这是出于一种传说：不说的话小孩就会被幽灵带走。查了一下，著名的《徒然草》（约 1330 年）里也有记载：打喷嚏时若不念「くさめくさめ」，人就会死。",
				en: "In Okinawa, when a child sneezes, someone nearby apparently says “Kusukwee.” It is said to come from a tradition that if you don’t say it, a ghost will take the child away. Looking it up, I found that the famous book Tsurezuregusa (around 1330) also records that if you do not chant “kusame kusame” when a sneeze comes out, you will die.",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "{日本人|にほんじん}であり、{日本語|にほんご}を{外国人|がいこくじん}に{教|おし}える{自分|じぶん}が、{沖縄|おきなわ}の{言葉|ことば}も{知|し}らず、{日本語|にほんご}の{古語|こご}も{知|し}らないことを{恥|は}ずかしく{思|おも}った。②{日本人|にほんじん}の{日本語|にほんご}{知|し}らずには{要注意|ようちゅうい}だ。",
				cn: "自己是日本人、又在教外国人日语，却既不懂冲绳话、也不懂日语古语，我觉得很丢脸。②日本人的「不懂日语」，可要当心。",
				en: "I felt ashamed that I, a Japanese person who teaches Japanese to foreigners, knew neither the language of Okinawa nor the classical words of Japanese. ②Beware of Japanese people who don’t know Japanese.",
			},
		],
		footnotes: [
			{ marker: "（注1）", term: "言い伝え", jp: "a tradition", cn: "传说、口传", en: "a tradition" },
			{ marker: "（注2）", term: "唱える", jp: "to chant", cn: "念诵、吟唱", en: "to chant" },
		],
		questions: [
			{
				label: "問1",
				jp: "{下線部|かせんぶ}①の{質問|しつもん}に{関|かん}して、{正|ただ}しいものはどれか。",
				cn: "关于画线部分①的这个问题，哪一项是正确的？",
				en: "Regarding the underlined question ①, which of the following is correct?",
				choices: [
					{ jp: "これは、{外国人|がいこくじん}が{日本人|にほんじん}によくする{質問|しつもん}の{一|ひと}つである。", cn: "这是外国人经常问日本人的问题之一。", en: "This is one of the questions foreigners often ask Japanese people." },
					{ jp: "これは{筆者|ひっしゃ}が、{日本語学校|にほんごがっこう}の{教室|きょうしつ}でされた{質問|しつもん}である。", cn: "这是笔者在日语学校教室里被问到的问题。", en: "This is a question the writer was asked in a Japanese-language classroom." },
					{ jp: "これに{対|たい}して、{筆者|ひっしゃ}は「そういう{習慣|しゅうかん}はない」と{答|こた}えた。", cn: "对此，笔者回答了「没有那种习惯」。", en: "In response, the writer answered, “We don’t have that custom.”" },
					{ jp: "{筆者|ひっしゃ}は、{教室|きょうしつ}でこのような{質問|しつもん}をまだされたことがない。", cn: "笔者还从未在教室里被问过这样的问题。", en: "The writer has not yet been asked a question like this in class." },
				],
				answer: 4,
				explanation:
					"别册提示关键在「もし、されていたら」。这是与过去事实相反的假设：要是在教室被这样问了，大概会随口回答。所以实际上还没被问过，选 4。1 文中没说这是外国人常问的。2、3 把假设当成已经发生的事实。本课要点：分清「実際に起きたこと」和「仮定」。",
				explanationEn:
					"The supplement points to “moshi, sarete itara.” That is a counterfactual: if I had been asked this in class, I would probably have answered offhand. So in fact it has not happened yet — choice 4. 1 is never said. 2 and 3 treat the hypothesis as something that already occurred. The lesson: tell what actually happened from what is only assumed.",
				choiceNotes: [
					"文中没有说这是外国人常问日本人的问题。",
					"「もし、教室でされていたら」是假设，不是已经在日语学校被问过。",
					"「答えてしまっていただろう」也是假设，实际上并没有这样回答。",
					"正确。因为用了「もし〜ていたら」，说明还没被这样问过。",
				],
				choiceNotesEn: [
					"The passage never says foreigners often ask Japanese people this.",
					"“If I had been asked in class” is hypothetical, not something that already happened at a Japanese school.",
					"“I would probably have answered” is also hypothetical; the writer did not actually give that answer.",
					"Correct. Moshi … te itara means it has not yet been asked in class.",
				],
			},
			{
				label: "問2",
				jp: "この{文章|ぶんしょう}の{内容|ないよう}と{合|あ}うものはどれか。",
				cn: "与这篇文章内容相符的是哪一项？",
				en: "Which of the following matches the content of this passage?",
				choices: [
					{ jp: "{沖縄|おきなわ}では{英語|えいご}が{話|はな}されていたので、{英語|えいご}と{同|おな}じような{表現|ひょうげん}がある。", cn: "冲绳以前说英语，所以有和英语一样的表达。", en: "English was spoken in Okinawa, so there is an expression like the English one." },
					{ jp: "{沖縄|おきなわ}の{言葉|ことば}を{調|しら}べれば、14{世紀|せいき}ごろの{古|ふる}い{日本語|にほんご}がよくわかる。", cn: "只要查冲绳话，就能很好地了解 14 世纪左右的古日语。", en: "If you look into the Okinawan language, you will understand old Japanese from around the 14th century well." },
					{ jp: "「くさめくさめ」「クスクェー」は{英語|えいご}の「Bless you!」にあたる{表現|ひょうげん}である。", cn: "「くさめくさめ」「クスクェー」是相当于英语 Bless you! 的表达。", en: "“Kusame kusame” and “Kusukwee” are expressions that correspond to English “Bless you!”" },
					{ jp: "{昔|むかし}、{日本人|にほんじん}は{病気|びょうき}や{災害|さいがい}に{合|あ}うと「くさめくさめ」と{唱|とな}えて{祈|いの}った。", cn: "从前日本人一遇上疾病或灾害，就念「くさめくさめ」来祈祷。", en: "In the past, Japanese people chanted “kusame kusame” and prayed when they met with illness or disaster." },
				],
				answer: 3,
				explanation:
					"冲绳的「クスクェー」和《徒然草》的「くさめくさめ」都被当作相当于 Bless you! 的说法，选 3。1 冲绳有这种表达不是因为说英语。2 冲绳话和 14 世纪的《徒然草》是分开查到的，不能说查冲绳话就能懂古日语。4 文中是打喷嚏时念，不是遇上疾病灾害时祈祷。",
				explanationEn:
					"Okinawan “Kusukwee” and Tsurezuregusa’s “kusame kusame” are both treated as equivalents of “Bless you!” — choice 3. 1 is wrong: the expression is not there because English was spoken. 2: Okinawan and 14th-century Tsurezuregusa were found separately; studying Okinawan does not by itself explain old Japanese. 4: they chanted it when sneezing, not when meeting illness or disaster.",
				choiceNotes: [
					"冲绳的说法来自当地传说，不是因为冲绳说英语。",
					"《徒然草》是另查到的，不是「查冲绳话就能懂 14 世纪日语」。",
					"正确。两者都被写成相当于 Bless you! 的表达。",
					"文中是打喷嚏时唱，不是遇上疾病或灾害时祈祷。",
				],
				choiceNotesEn: [
					"The Okinawan phrase comes from a local tradition, not from English being spoken there.",
					"Tsurezuregusa was found by a separate search; looking into Okinawan does not by itself explain 14th-century Japanese.",
					"Correct. Both are presented as expressions corresponding to “Bless you!”",
					"They chanted it when sneezing, not when they met with illness or disaster.",
				],
			},
			{
				label: "問3",
				jp: "{筆者|ひっしゃ}はどんな{気持|きも}ちで{下線部|かせんぶ}②のように{言|い}ったのか。",
				cn: "笔者是怀着怎样的心情说出画线部分②的？",
				en: "With what feeling did the writer say the underlined part ②?",
				choices: [
					{ jp: "{日本人|にほんじん}だからといって{日本語|にほんご}をよく{知|し}っているとはかぎらない。", cn: "并不能因为是日本人，就一定很懂日语。", en: "Being Japanese does not necessarily mean you know Japanese well." },
					{ jp: "{日本人|にほんじん}でなければ{日本語|にほんご}のニュアンスはなかなか{理解|りかい}できない。", cn: "若不是日本人，日语的细微语感很难理解。", en: "If you are not Japanese, it is hard to understand the nuances of Japanese." },
					{ jp: "{古語|こご}や{方言|ほうげん}を{知|し}らずに{日本語|にほんご}を{教|おし}えることは{不可能|ふかのう}である。", cn: "不懂古语和方言就不可能教日语。", en: "It is impossible to teach Japanese without knowing classical words and dialects." },
					{ jp: "{日本人|にほんじん}は{実|じつ}は{日本語|にほんご}を{知|し}らないので{注意|ちゅうい}が{必要|ひつよう}である。", cn: "日本人其实不懂日语，所以需要注意。", en: "Japanese people in fact do not know Japanese, so caution is needed." },
				],
				answer: 1,
				explanation:
					"别册提示：最后一段才是想说的话。笔者是日本人、又教日语，却既不懂冲绳话也不懂古语，因此感到丢脸，才说「日本人の日本語知らずには要注意だ」。意思是「日本人だからといってよく知っているとは限らない」，选 1。4 把「知らず」说成「其实完全不懂」，过火了。2、3 文中没有。",
				explanationEn:
					"The supplement says the last paragraph is the point. The writer is Japanese and teaches Japanese, yet knew neither Okinawan nor classical Japanese, and felt ashamed — hence “beware of Japanese people who don’t know Japanese.” The intended sense is “being Japanese doesn’t mean you know it well” — choice 1. 4 overstates it as “they in fact don’t know Japanese at all.” 2 and 3 are not in the text.",
				choiceNotes: [
					"正确。最后一段的自省：日本人也不一定懂日语。",
					"文中没有比较「日本人才能理解语感」。",
					"作者感到丢脸，但没有说「不懂古语方言就不可能教」。",
					"说得太绝对。作者是提醒「不要以为自己一定懂」，不是断言日本人其实不懂日语。",
				],
				choiceNotesEn: [
					"Correct. The last paragraph’s self-reproach: Japanese people do not necessarily know Japanese well.",
					"The passage never says only Japanese people can grasp the nuances.",
					"The writer feels ashamed, but does not say teaching is impossible without classical words and dialects.",
					"Too absolute. The warning is “don’t assume you know it,” not “Japanese people in fact don’t know Japanese.”",
				],
			},
		],
	},

	vocab: [
		{ jp: "くしゃみ", cn: "喷嚏", en: "a sneeze", pos: "名詞" },
		{ jp: "習慣", kana: "しゅうかん", cn: "习惯、习俗", en: "custom; habit", pos: "名詞" },
		{ jp: "当たる", kana: "あたる", cn: "相当于", en: "to correspond to", pos: "動詞" },
		{ jp: "幽霊", kana: "ゆうれい", cn: "幽灵", en: "a ghost", pos: "名詞" },
		{ jp: "言い伝え", kana: "いいつたえ", cn: "传说、口传", en: "a tradition; a legend", pos: "名詞" },
		{ jp: "徒然草", kana: "つれづれぐさ", cn: "《徒然草》", en: "Tsurezuregusa", pos: "名詞" },
		{ jp: "書物", kana: "しょもつ", cn: "书籍", en: "a book; a written work", pos: "名詞" },
		{ jp: "唱える", kana: "となえる", cn: "念诵、吟唱", en: "to chant", pos: "動詞" },
		{ jp: "記述", kana: "きじゅつ", cn: "记述、记载", en: "a description; an account", pos: "名詞" },
		{ jp: "古語", kana: "こご", cn: "古语", en: "a classical word", pos: "名詞" },
		{ jp: "要注意", kana: "ようちゅうい", cn: "需要注意、当心", en: "beware; requires caution", pos: "名詞" },
		{ jp: "噂", kana: "うわさ", cn: "传言、闲话", en: "gossip; a rumor", pos: "名詞" },
	],

	grammar: [
		{
			pattern: "もし〜ていたら、〜ただろう",
			formation: "もし＋動詞て形＋いたら、動詞た形＋だろう",
			meaning: "要是当时……的话，大概就会……了。与过去事实相反的假设。实际并未发生。",
			meaningEn: "if … had been the case, … would have …. Counterfactual past; it did not actually happen.",
			example: {
				jp: "もし、こんな{質問|しつもん}を{教室|きょうしつ}でされていたら、なんと{答|こた}えていただろう。",
				cn: "要是在教室里被这样问了，我会怎么回答呢。",
				en: "If I had been asked a question like this in class, how would I have answered?",
			},
		},
		{
			pattern: "〜からといって〜とはかぎらない",
			formation: "普通形＋からといって／〜だからといって、〜とは限らない",
			meaning: "并不能因为……就一定……。部分否定。",
			meaningEn: "just because …, it does not necessarily follow that …. Partial negation.",
			example: {
				jp: "{日本人|にほんじん}だからといって{日本語|にほんご}をよく{知|し}っているとはかぎらない。",
				cn: "并不能因为是日本人，就一定很懂日语。",
				en: "Being Japanese does not necessarily mean you know Japanese well.",
			},
		},
		{
			pattern: "〜らしい（伝聞）",
			formation: "普通形＋らしい",
			meaning: "据说……、好像……。表示有根据的传闻。",
			meaningEn: "apparently … / I hear that …. Hearsay with some basis.",
			example: {
				jp: "そばにいる{人|ひと}が「クスクェー」と{言|い}うらしい。",
				cn: "据说旁边的人会说「クスクェー」。",
				en: "Someone nearby apparently says “Kusukwee.”",
			},
		},
	],
};
