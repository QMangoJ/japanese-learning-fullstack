import type { ReadingDay } from "../reading-n3/types";

// 第4週 4日目 エッセイ④ — printed pages 66–67
export const w4d4: ReadingDay = {
	week: 4,
	day: 4,
	label: "エッセイ④",
	labelKana: "えっせい",
	labelEn: "Essays ④",
	printedPages: [66, 67],
	answerSource: "book",

	point: {
		title: "カタカナで{書|か}かれた{言葉|ことば}に{注意|ちゅうい}！②",
		titleCn: "注意用片假名书写的词语！②",
		titleEn: "Pay attention to “katakana” words! ② — These words are of Japanese origin",
		figure: {
			alt: "「カタカナは苦手だー」と困るキャラクターと、「コメ？　何語？？」と首をかしげる眼鏡のキャラクター",
			cn: "一个发愁地说「片假名我不擅长啊——」的角色，和一个歪着头说「コメ（米）？　什么语言？？」的戴眼镜的角色",
			en: "One character groans, “I’m no good at katakana!” A bespectacled character tilts their head: “Kome? What language is that??”",
		},
		tips: [
			{
				jp: "{例えば|たとえば}こんな{表現|ひょうげん}があります。",
				cn: "例如，有这样的表达。",
				en: "There are expressions like these, for example.",
			},
			{
				jp: "ワンワン　・　トントン　・　ツルツル　など　＊{音|おと}や{様子|ようす}から{作|つく}られた",
				cn: "汪汪　・　咚咚　・　滑溜溜　等　＊由声音或样子造出来的",
				en: "wanwan / tonton / tsurutsuru, etc. * made from sounds or appearances",
			},
			{
				jp: "ゴミ　・　バカ　・　コメ　など　＊{文章|ぶんしょう}で{効果|こうか}を{出|だ}すために",
				cn: "垃圾　・　傻瓜　・　米　等　＊为了在文章中产生效果",
				en: "gomi / baka / kome, etc. * for effect in writing",
			},
			{
				jp: "バラ　・　ウサギ　・　マンガ　・　ハチ　など　＊{漢字|かんじ}が{難|むずか}しいなどの{理由|りゆう}で{習慣的|しゅうかんてき}に",
				cn: "玫瑰　・　兔子　・　漫画　・　蜜蜂　等　＊因汉字难等原因，习惯上用片假名",
				en: "bara / usagi / manga / hachi, etc. * conventionally in katakana, e.g. because the kanji are hard",
			},
			{
				jp: "★カタカナは{外来語|がいらいご}とは{限|かぎ}りません。{日本語|にほんご}である{場合|ばあい}も{多|おお}いです。",
				cn: "★片假名不一定就是外来语。是日语的情况也很多。",
				en: "★Katakana words do not necessarily have a foreign origin. There are many of Japanese origin.",
			},
		],
		expressions: [
			{ jp: "ワンワン／トントン／ツルツル", cn: "汪汪／咚咚／滑溜溜", en: "onomatopoeia / mimetic words" },
			{ jp: "ゴミ／バカ／コメ", cn: "垃圾／傻瓜／米", en: "Japanese words written in katakana for effect" },
			{ jp: "バラ／ウサギ／マンガ／ハチ", cn: "玫瑰／兔子／漫画／蜜蜂", en: "Japanese words conventionally in katakana" },
			{ jp: "〜だらけ", cn: "满是〜（多含贬义）", en: "full of … (often negative)" },
			{ jp: "美術部", kana: "びじゅつぶ", cn: "美术部", en: "art club" },
		],
	},

	renshu: {
		instruction: "{次|つぎ}の{会話文|かいわぶん}を{読|よ}んで、{後|あと}の{文|ぶん}から{正|ただ}しいものを{選|えら}ぼう。",
		instructionCn: "请阅读下面的对话，从后面的句子中选出正确的吧。",
		instructionEn: "Read the conversation below and choose the correct statements from the sentences that follow. (Answers are on the next page.)",
		blocks: [
			{
				type: "speech",
				speaker: "A",
				speakerCn: "A",
				speakerEn: "A",
				jp: "いつも{通|とお}る{道|みち}の、ほらベンチがあるところ、なんだかゴミだらけ（{注|ちゅう}1）だと{思|おも}わない？　うちの{学校|がっこう}の{子|こ}なんかも、そこでよくおしゃべりしているんだけど、{食|た}べたもののゴミとかをそのままにしていくから……。",
				cn: "平时常走的那条路，你看，有长椅的那个地方，不觉得不知怎么的满是垃圾（注1）吗？我们学校的孩子什么的也经常在那儿聊天，可吃过的东西的垃圾之类就那么放着就走了，所以……。",
				en: "On the road we always take, you know, where the bench is — don’t you think it’s full of trash? Kids from our school hang out there chatting, and they just leave the trash from what they ate…",
			},
			{
				type: "speech",
				speaker: "B",
				speakerCn: "B",
				speakerEn: "B",
				jp: "みんな、ベンチの{下|した}や{木|き}の{周|まわ}りに{捨|す}てていくんだよね。ね、うちのクラブでゴミ{箱|ばこ}{作|つく}ってそこへ{置|お}くっていうのはどう？　{美術部|びじゅつぶ}（{注|ちゅう}2）に{絵|え}をかいてもらってさ。",
				cn: "大家都是往长椅底下和树周围扔了就走的吧。哎，我们社团做个垃圾箱放到那儿怎么样？让美术部（注2）给画上画呀。",
				en: "Everyone dumps it under the bench and around the trees, right? Hey, what if our club made a trash can and put it there? We could get the art club to paint it.",
			},
			{
				type: "speech",
				speaker: "A",
				speakerCn: "A",
				speakerEn: "A",
				jp: "あ、それいいかも。",
				cn: "啊，那个也许不错。",
				en: "Oh, that might be good.",
			},
		],
		footnotes: [
			{ marker: "（注1）", term: "〜だらけ", jp: "full of …", cn: "满是〜", en: "full of …" },
			{ marker: "（注2）", term: "美術部", jp: "art club", cn: "美术部", en: "art club" },
		],
		choices: [
			{ jp: "AさんとBさんは{同|おな}じクラブのメンバーである。", cn: "A和B是同一个社团的成员。", en: "A and B are members of the same club." },
			{ jp: "Bさんは{美術部|びじゅつぶ}のメンバーである。", cn: "B是美术部的成员。", en: "B is a member of the art club." },
			{ jp: "{学校|がっこう}のベンチの{周|まわ}りは、ゴミでいっぱいである。", cn: "学校的长椅周围满是垃圾。", en: "The area around the school bench is full of trash." },
			{ jp: "Aさんたちは{自分|じぶん}たちでゴミ{箱|ばこ}を{作|つく}るつもりである。", cn: "A等人打算自己做垃圾箱。", en: "A and the others intend to make a trash can themselves." },
			{ jp: "ベンチにかく{絵|え}を{美術部|びじゅつぶ}に{頼|たの}む{予定|よてい}である。", cn: "计划请美术部在长椅上画画。", en: "They plan to ask the art club to paint a picture on the bench." },
		],
		answers: [1, 4],
	},

	mondai: {
		instruction: "{次|つぎ}の{文章|ぶんしょう}を{読|よ}んで、{後|あと}の{問|と}いに{答|こた}えなさい。",
		instructionCn: "请阅读下面的文章，回答后面的问题。",
		instructionEn: "Read the passage below and answer the questions that follow. (Answers are in the separate booklet, p. 5.)",
		blocks: [
			{
				type: "title",
				jp: "{手作り|てづくり}（{注|ちゅう}1）のゴミ{箱|ばこ}",
				cn: "手工制作（注1）的垃圾箱",
				en: "A handmade trash can",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "{駅|えき}に{行|い}く{道|みち}の{歩道|ほどう}にベンチがひとつあります。すぐそばには{木|き}が{数本|すうほん}{植|う}えられていて、お{年寄|としよ}りがひと{休|やす}みするのにちょうどいい{場所|ばしょ}です。{学校帰|がっこうがえ}りの{高校生|こうこうせい}もよく{座|すわ}っておしゃべりをしています。",
				cn: "在通往车站的那条路的人行道上，有一张长椅。紧挨着种着几棵树，正好适合老年人歇一歇。放学回家的高中生也经常坐在那里聊天。",
				en: "On the sidewalk of the road to the station there is a bench. Right beside it a few trees have been planted, and it is just the place for older people to take a rest. High-school students on their way home from school often sit there chatting too.",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "{以前|いぜん}は、その{高校生|こうこうせい}たちが{残|のこ}していったものらしく＊、ベンチの{周|まわ}りにはジュースの{空|あ}き{缶|かん}や{弁当|べんとう}の{空|あ}き{箱|ばこ}などのゴミが{散|ち}らかっていて、あまり{気持|きも}ちのいい{場所|ばしょ}とは{言|い}えませんでした。けれども、いつだったか、{木|き}で{作|つく}ったゴミ{箱|ばこ}が{置|お}かれました。4{個|こ}、それぞれペンキでいろいろな{色|いろ}に{塗|ぬ}られ、「{燃|も}えるゴミ」「{燃|も}えないゴミ」「{空|あ}きカン」「{空|あ}きビン」という{文字|もじ}が{書|か}かれ、かわいい{絵|え}もついていました。{缶|かん}でできた{吸|す}いがら（{注|ちゅう}2）{入|い}れもありました。",
				cn: "以前似乎是那些高中生留下的东西＊，长椅周围散落着果汁空罐、便当空盒等垃圾，不太能说是个令人心情愉快的地方。但是，不知什么时候，放上了木头做的垃圾箱。4个，分别用油漆涂成各种颜色，写有「可燃垃圾」「不可燃垃圾」「空罐」「空瓶」的字样，还附有可爱的画。也有用罐子做的烟蒂（注2）盒。",
				en: "Before, apparently left by those high-school students, empty juice cans and empty bento boxes and other trash were scattered around the bench, and it could not really be called a pleasant place. But at some point wooden trash cans were put there. Four of them, each painted a different color, labeled “burnable trash,” “non-burnable trash,” “empty cans,” and “empty bottles,” with cute pictures too. There was also a cigarette-butt holder made from a can.",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "そのゴミ{箱|ばこ}が{置|お}かれてからは、①{前|まえ}よりも{人|ひと}が{集|あつ}まってきています。そこに{座|すわ}っていた{人|ひと}たちの{話|はなし}では、{近|ちか}くの{高校|こうこう}の{生徒|せいと}たちが{作|つく}ったということです。{最近|さいきん}の{高校生|こうこうせい}の{態度|たいど}が{悪|わる}いのにはあきれていたのですが、②そんな{高校生|こうこうせい}ばかりではないとわかり、{本当|ほんとう}に{心|こころ}が{温|あたた}まりました。",
				cn: "自从放了那些垃圾箱以后，①比以前有更多的人聚集过来。据坐在那里的人说，是附近高中的学生们做的。我原本对最近高中生态度不好感到愕然，但明白了②并非都是那样的高中生，心里真的温暖了起来。",
				en: "Since those trash cans were put there, ① even more people have been gathering than before. According to people sitting there, students from a nearby high school made them. I had been fed up with how bad high-school students’ attitudes have been lately, but I realized they are ② not all that kind of high-school student, and it truly warmed my heart.",
			},
		],
		footnotes: [
			{ marker: "（注1）", term: "手作り", jp: "hand-made", cn: "手工做的", en: "hand-made" },
			{ marker: "（注2）", term: "吸いがら", jp: "a cigarette butt", cn: "烟蒂、烟头", en: "a cigarette butt" },
		],
		pageNotes: [
			{
				jp: "* apparently there was stuff left behind by the high school students",
				cn: "* 似乎有高中生留下的东西",
				en: "apparently there was stuff left behind by the high school students",
			},
		],
		questions: [
			{
				label: "問1",
				jp: "①{前|まえ}よりも{人|ひと}が{集|あつ}まってきていますとあるが、なぜ{前|まえ}よりも{人|ひと}が{集|あつ}まってくるのか。",
				cn: "文中说①「比以前有更多的人聚集过来」，为什么人会比以前更多地聚集过来呢？",
				en: "The text says ① “even more people have been gathering than before.” Why are more people gathering than before?",
				choices: [
					{ jp: "ゴミを{捨|す}てるため。", cn: "为了扔垃圾。", en: "To throw away trash." },
					{ jp: "{清潔|せいけつ}で{気持|きも}ちのいい{場所|ばしょ}になったから。", cn: "因为变成了清洁、令人心情愉快的地方。", en: "Because it has become a clean, pleasant place." },
					{ jp: "{高校生|こうこうせい}たちの{態度|たいど}が{良|よ}くなったから。", cn: "因为高中生们的态度变好了。", en: "Because the high-school students’ attitudes improved." },
					{ jp: "タバコを{吸|す}う{場所|ばしょ}ができたから。", cn: "因为有了可以抽烟的地方。", en: "Because a place to smoke was created." },
				],
				answer: 2,
				explanation:
					"以前长椅周围垃圾散落，「あまり気持ちのいい場所とは言えませんでした」。放上分类垃圾桶并画了画之后，地方变干净了，人才会比以前更多。选 2。1 人来是休息、聊天，不是专为扔垃圾。3 态度变好是作者后来的感想，不是人聚集的直接原因。4 烟蒂盒是附带的，不是聚集的理由。",
				explanationEn:
					"Before, trash was scattered and “it could not really be called a pleasant place.” After labeled, painted cans were put there, the spot became clean, so more people gather — choice 2. 1: people come to rest and chat, not just to dump trash. 3: better attitudes are the writer’s later feeling, not the direct reason people gather. 4: the butt holder is incidental, not why people gather.",
				choiceNotes: [
					"人来这里是歇脚、聊天；垃圾箱是让环境变好的手段，不是聚集的目的。",
					"正确。从「不太舒服」变成清洁宜人，所以人更多了。",
					"态度问题是后文的感想，不是「人聚集」的直接原因。",
					"烟蒂盒只是附属，文中没有说这里成了抽烟场所。",
				],
				choiceNotesEn: [
					"People come to rest and chat; the cans make the place nicer, they are not the purpose of gathering.",
					"Correct. It went from “not pleasant” to clean and inviting, so more people come.",
					"Attitudes are a later reflection, not the direct reason people gather.",
					"The butt holder is incidental; the text never says it became a smoking spot.",
				],
			},
			{
				label: "問2",
				jp: "②そんな{高校生|こうこうせい}とは、どんな{高校生|こうこうせい}のことを{言|い}っているのか。",
				cn: "②那样的高中生，说的是怎样的高中生？",
				en: "What kind of high-school students does ② “that kind of high-school student” refer to?",
				choices: [
					{ jp: "ゴミ{箱|ばこ}を{作|つく}った{生徒|せいと}たち", cn: "做了垃圾箱的学生们", en: "the students who made the trash cans" },
					{ jp: "{学校帰|がっこうがえ}りにベンチに{座|すわ}っておしゃべりをする{生徒|せいと}たち", cn: "在放学回家路上坐在长椅上聊天的学生们", en: "students who sit on the bench chatting on the way home from school" },
					{ jp: "{心|こころ}がやさしい{生徒|せいと}たち", cn: "心地善良的学生们", en: "kind-hearted students" },
					{ jp: "{態度|たいど}が{悪|わる}い{生徒|せいと}たち", cn: "态度不好的学生们", en: "students with bad attitudes" },
				],
				answer: 4,
				explanation:
					"「最近の高校生の態度が悪いのにはあきれていたのですが、そんな高校生ばかりではない」——「そんな」承接刚说的「态度が悪い」。所以②=态度差的高中生，选 4。指示词指的是紧前面的内容。做垃圾箱的学生恰恰是「并非都是那样」的反例。",
				explanationEn:
					"“I had been fed up with how bad high-school students’ attitudes have been lately, but they are not all that kind of high-school student” — sonna picks up “attitudes are bad.” So ② = students with bad attitudes — choice 4. Demonstratives point to what just came. The students who made the cans are the counterexample, not sonna.",
				choiceNotes: [
					"做垃圾箱的学生是「并非都是那样」的反例，不是「そんな」。",
					"放学聊天的学生是以前乱丢垃圾的人，但「そんな」直接承接的是「态度が悪い」。",
					"心地善良是作者后来感到温暖的结果，不是「そんな」所指。",
					"正确。「そんな」=刚说的态度差的高中生。",
				],
				choiceNotesEn: [
					"The students who made the cans are the counterexample, not what sonna points to.",
					"The after-school chatters are the earlier litterers, but sonna directly continues “attitudes are bad.”",
					"Kind-heartedness is the writer’s later warmth, not the referent of sonna.",
					"Correct. Sonna = the bad-attitude high-school students just mentioned.",
				],
			},
		],
	},

	vocab: [
		{ jp: "手作り", kana: "てづくり", cn: "手工做的", en: "handmade", pos: "名詞" },
		{ jp: "歩道", kana: "ほどう", cn: "人行道", en: "a sidewalk", pos: "名詞" },
		{ jp: "お年寄り", kana: "おとしより", cn: "老人", en: "older people", pos: "名詞" },
		{ jp: "散らかる", kana: "ちらかる", cn: "散落、凌乱", en: "to be scattered; to be messy", pos: "動詞" },
		{ jp: "空き缶", kana: "あきかん", cn: "空罐", en: "an empty can", pos: "名詞" },
		{ jp: "吸いがら", kana: "すいがら", cn: "烟蒂、烟头", en: "a cigarette butt", pos: "名詞" },
		{ jp: "態度", kana: "たいど", cn: "态度", en: "attitude", pos: "名詞" },
		{ jp: "あきれる", cn: "感到无语、吃惊（失望）", en: "to be fed up; to be appalled", pos: "動詞" },
		{ jp: "心が温まる", kana: "こころがあたたまる", cn: "心里暖起来", en: "to feel warmed (in one’s heart)", pos: "表現" },
		{ jp: "〜だらけ", cn: "满是〜（多含贬义）", en: "full of …", pos: "表現" },
		{ jp: "ペンキ", cn: "油漆", en: "paint", pos: "名詞" },
		{ jp: "美術部", kana: "びじゅつぶ", cn: "美术部", en: "art club", pos: "名詞" },
	],

	grammar: [
		{
			pattern: "〜だらけ",
			formation: "名詞＋だらけ",
			meaning: "满是……。多用于不好的东西（垃圾、伤、错）。",
			meaningEn: "full of …. Often used of undesirable things (trash, wounds, mistakes).",
			example: {
				jp: "ゴミだらけだと{思|おも}わない？",
				cn: "不觉得满是垃圾吗？",
				en: "Don’t you think it’s full of trash?",
			},
		},
		{
			pattern: "〜ばかりではない",
			formation: "名詞／普通形＋ばかりではない",
			meaning: "并不都是……、不只是……。",
			meaningEn: "not only … / not all ….",
			example: {
				jp: "そんな{高校生|こうこうせい}ばかりではない。",
				cn: "并非都是那样的高中生。",
				en: "They are not all that kind of high-school student.",
			},
		},
		{
			pattern: "〜とは言えない",
			formation: "普通形＋とは言えない",
			meaning: "称不上……、不能说是……。",
			meaningEn: "cannot be called … / you cannot say that ….",
			example: {
				jp: "あまり{気持|きも}ちのいい{場所|ばしょ}とは{言|い}えませんでした。",
				cn: "当时不太能说是个令人心情愉快的地方。",
				en: "It could not really be called a pleasant place.",
			},
		},
	],
};
