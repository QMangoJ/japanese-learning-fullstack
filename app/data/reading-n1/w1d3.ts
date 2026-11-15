import type { ReadingDay } from "../reading-n3/types";

// 第1週 3日目 否定「ない」に注意！ — printed pages 16–17
export const w1d3: ReadingDay = {
	week: 1,
	day: 3,
	label: "否定「ない」に注意！",
	labelKana: "ひてい",
	labelEn: "Watch out for the negative “nai”!",
	printedPages: [16, 17],
	answerSource: "book",

	point: {
		title: "「ない」を{含|ふく}む{表現|ひょうげん}を{覚|おぼ}えよう！",
		titleCn: "记住含有“ない”的各种表达方式！",
		titleEn: "Learn the many expressions that contain “nai”!",
		figure: {
			alt: "「わからなくはないでしょ？」と言う白猫と、「え？？『わからなくはない』？その質問がよくわからないよー」と困る黒猫のイラスト",
			cn: "一只说「也不是不懂吧？」的白猫，和一只困惑地说「诶？？『也不是不懂』？这个问题我不太懂啊——」的黑猫的插图",
			en: "A white cat saying “You do understand, don't you?” and a black cat puzzling, “Huh?? ‘Not that I don't understand’? I don't really get that question…”",
		},
		tips: [
			{
				jp: "「ない」＋「ない」　＊{肯定|こうてい}の{意味|いみ}になる。",
				cn: "「ない」＋「ない」＊变成肯定的意思。",
				en: "“nai” + “nai” — ＊it becomes affirmative in meaning.",
			},
			{
				jp: "「〜ではないか。」＝{私|わたし}は〜だと{思|おも}う。",
				cn: "「〜ではないか。」＝我认为〜。",
				en: "“~de wa nai ka.” = “I think it is ~.”",
			},
		],
		expressions: [
			{ jp: "〜ほど…ものはない", cn: "没有比……更……的了", en: "nothing is more … than ~" },
			{ jp: "〜ないではいられない", cn: "忍不住不……、非……不可", en: "cannot help doing ~" },
			{ jp: "〜わけにはいかない", cn: "不能……（碍于情理）", en: "cannot ~ (for social or moral reasons)" },
			{ jp: "〜かねない", cn: "有可能……（多指不好的事）", en: "might well ~ (something bad)" },
			{ jp: "〜ないことはない", cn: "也不是不……", en: "it is not that one does not ~" },
			{ jp: "〜までもない", cn: "不必……、用不着……", en: "there is no need to ~" },
			{ jp: "〜くてたまらない", cn: "……得不得了", en: "unbearably ~" },
			{ jp: "〜てはおけない", cn: "不能放任……不管", en: "cannot leave ~ as it is" },
			{ jp: "〜でならない", cn: "……得不得了（情感自然涌现）", en: "cannot help feeling ~" },
			{ jp: "〜ほかない", cn: "只有……、别无办法", en: "have no choice but to ~" },
			{ jp: "〜ないかなあ", cn: "会不会……呢（自言自语式的期待或担忧）", en: "I wonder if ~ (musing to oneself)" },
		],
		notes: [
			{
				jp: "「わからなくはない」？その{質問|しつもん}がよくわからないよー",
				cn: "「也不是不懂」？这个问题我不太懂啊——",
				en: "“Not that I don't understand”? I don't really get that question…",
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
				jp: "その{仕事|しごと}ほどおもしろくない{仕事|しごと}はないのではないかと、{私|わたし}は{思|おも}った。",
				cn: "我想，没有比那份工作更无聊的工作了。",
				en: "I thought there was probably no job as uninteresting as that job.",
				indent: true,
			},
			{ type: "heading", jp: "2", cn: "第 2 题", en: "Exercise 2" },
			{
				type: "paragraph",
				jp: "「まあ、ひどい。だれがこんなことを……。」ポチ（注1）は{墨|すみ}で{眼鏡|めがね}をかかれたひょうきんな（注2）{顔|かお}でしっぽを{振|ふ}っていた*。「{叔父|おじ}さんに{決|き}まってるじゃない。」{僕|ぼく}は{笑|わら}った。{母|はは}の{弟|おとうと}はいたずら{好|ず}きだ。あの{人|ひと}ならやりかねない。「まったく、{子|こ}どもじゃあるまいし……。」{母|はは}も{笑|わら}っていた。",
				cn: "「哎呀，太过分了。谁干的这种事……。」波奇（注1）脸上被人用墨汁画了眼镜，一副滑稽的（注2）模样，摇着尾巴。「肯定是叔叔干的。」我笑了。妈妈的弟弟就爱恶作剧。换作是他，干得出来。「真是的，又不是小孩子……。」妈妈也笑了。",
				en: "“Oh, how awful. Who would do such a thing…?” Pochi (Note 1) was wagging his tail and looked funny (Note 2) because of the black circles that had been drawn around his eyes. “It must have been Uncle,” I laughed. My mother's younger brother loves playing pranks. He is quite capable of it. “Really, he's not a child…” Mother was laughing too.",
				indent: true,
			},
			{ type: "heading", jp: "3", cn: "第 3 题", en: "Exercise 3" },
			{
				type: "paragraph",
				jp: "こうした{授業状況|じゅぎょうじょうきょう}のなかでは、{教師|きょうし}はつねに「ダメ{教師|きょうし}」というラベルをはられることに{戦々恐々|せんせんきょうきょう}（注1）とならざるをえない*。{親|おや}たちからも、{同僚|どうりょう}からも、さらには{子|こ}どもたちからも「ダメ{教師|きょうし}」というラベルをはられたときには、{授業|じゅぎょう}が{崩壊|ほうかい}する（注2）どころか、{辞職|じしょく}という{事態|じたい}に{追|お}いこまれるほかはないというのが{今日|こんにち}の{現実|げんじつ}であるといっても{過言|かごん}ではない。",
				cn: "在这样的课堂状况下，教师不得不随时战战兢兢（注1），生怕被人贴上「无能教师」的标签。一旦被家长、同事、甚至孩子们贴上「无能教师」的标签，别说课堂崩溃（注2）了，甚至会被逼到辞职的地步——说这就是当今的现实也不为过。",
				en: "In classroom situations like this, teachers have become terrified of being labeled as a “Failed Teacher” (Note 1). If they are given that label by parents, by colleagues, or even by the children, it is no exaggeration to say that today's reality is that, far from their classes merely collapsing (Note 2), they may be driven to resign.",
				indent: true,
			},
			{
				type: "source",
				jp: "（{竹内常一|たけうちつねかず}『{日本|にほん}の{学校|がっこう}のゆくえ「{偏差値教育|へんさちきょういく}はどうなるか」』{太郎次郎社|たろうじろうしゃ}）",
				cn: "（竹内常一《日本学校的去向——“偏差值教育”将何去何从》太郎次郎社）",
				en: "(Takeuchi Tsunekazu, The Future of Japanese Schools: What Will Become of Deviation-Value Education, Tarō Jirōsha)",
			},
			{ type: "heading", jp: "4", cn: "第 4 题", en: "Exercise 4" },
			{
				type: "paragraph",
				jp: "{新|あたら}しいことをやるには{勇気|ゆうき}がいることは{言|い}うまでもないが、{手|て}をつける{前|まえ}から、{自分|じぶん}なんかにできるわけがないとあきらめる{態度|たいど}ほどじれったいものはない**。やってみなければ{何|なに}も{始|はじ}まらない。{特|とく}に{最近|さいきん}の{若|わか}い{人|ひと}は{教育制度|きょういくせいど}の{影響|えいきょう}か、{早|はや}くからもう{自分|じぶん}の{将来|しょうらい}はこのくらいのものだと{見切|みき}りをつけて、それ{以上|いじょう}は{望|のぞ}まないというような{考|かんが}えの{人|ひと}が{少|すく}なからずいるのは{残念|ざんねん}でならない。",
				cn: "做新事情需要勇气，这是不言而喻的，但没有比还没动手就认定自己绝对不行而放弃的态度更让人着急的了。不试一试，什么都不会开始。尤其是最近的年轻人，不知是不是受教育制度的影响，很早就给自己的将来下了定论，不再有更高的期望——有这种想法的人不在少数，实在令人遗憾。",
				en: "It goes without saying that doing something new takes courage, but it is very frustrating to see people giving up on things even before they start. Nothing begins unless you try. It is a great pity that not a few young people these days — perhaps influenced by the education system — decide early on that this is about as far as their future will go, and hope for nothing more.",
				indent: true,
			},
			{
				type: "paragraph",
				jp: "それに{比|くら}べ、「{年寄|としよ}りの{冷|ひ}や{水|みず}」（注1）なんて{陰口|かげぐち}にもめげる（注2）ことなく、{苦労|くろう}もいとわず（注3）、{体力|たいりょく}や{記憶力|きおくりょく}の{衰|おとろ}えと{闘|たたか}っても{何|なに}かやってみたくてしかたないというシルバー{世代|せだい}（注4）の{元気|げんき}なこと！",
				cn: "相比之下，老年人不顾「老来逞能」（注1）的闲话，也不气馁（注2），不辞辛劳（注3），即便与体力和记忆力的衰退作斗争，也忍不住想做点什么——银发一代（注4）多么有活力啊！",
				en: "In contrast, the older generation — undaunted by sneers about “old folks overdoing it” (Note 1), never discouraged (Note 2), sparing no effort (Note 3), fighting the decline of their strength and memory yet unable to resist trying something — how full of energy they are (Note 4)!",
				indent: true,
			},
		],
		footnotes: [
			{ marker: "注1", term: "ポチ", jp: "ぽち", cn: "波奇：狗的名字", en: "Pochi: a dog's name" },
			{ marker: "注2", term: "ひょうきんな", jp: "ひょうきん", cn: "滑稽的：逗人笑的、有趣的", en: "funny; comical" },
			{ marker: "注1", term: "戦々恐々", jp: "せんせんきょうきょう", cn: "战战兢兢：害怕的样子", en: "trembling with fear" },
			{ marker: "注2", term: "崩壊する", jp: "ほうかい", cn: "崩溃：坏掉", en: "to collapse; to fall apart" },
			{ marker: "注1", term: "年寄りの冷や水", jp: "としよりのひやみず", cn: "老年人不顾体力和年龄勉强行事", en: "an old person overdoing it without regard for their age or strength" },
			{ marker: "注2", term: "めげる", jp: "めげる", cn: "气馁、变得软弱", en: "to be discouraged; to lose heart" },
			{ marker: "注3", term: "苦労もいとわず", jp: "くろうもいとわず", cn: "不辞辛劳：不避开辛苦的事", en: "sparing no effort; not shying away from hardship" },
			{ marker: "注4", term: "シルバー世代", jp: "しるばーせだい", cn: "银发一代：高龄人群", en: "the silver generation: elderly people" },
		],
		questions: [
			{
				label: "問1",
				jp: "{筆者|ひっしゃ}はその{仕事|しごと}をどう{思|おも}ったか。",
				cn: "作者觉得那份工作怎么样？",
				en: "What did the writer think of that job?",
				choices: [
					{ jp: "おもしろいと{思|おも}った。", cn: "觉得有意思。", en: "He thought it was interesting." },
					{ jp: "つまらないと{思|おも}った。", cn: "觉得无聊。", en: "He thought it was boring." },
				],
				answer: 2,
				explanation:
					"「〜ほど…はない」是最高级表达：「その仕事ほどおもしろくない仕事はない」＝没有比那份工作更无聊的工作；再加上「のではないかと」＝「私は〜だと思う」。所以作者认为那份工作最无聊，选 2。别册提示：「ほど…はない」＝〜がいちばん…。",
				explanationEn:
					"“~hodo … wa nai” is a superlative: “there is no job as uninteresting as that job.” And “no de wa nai ka to” = “I think that….” So the writer thought the job was the most boring one — answer 2. The booklet glosses “hodo…wa nai” as “~ga ichiban…” (the most ~).",
				choiceNotes: [
					"与最高级表达的意思相反。",
					"正确。「ほど…ない」表示「最……」。",
				],
				choiceNotesEn: [
					"The opposite of what the superlative says.",
					"Correct. “Hodo…nai” means “the most ….”",
				],
			},
			{
				label: "問2",
				jp: "この{文章|ぶんしょう}の{内容|ないよう}と{合|あ}うのはどれか。",
				cn: "与这段文字内容相符的是哪一个？",
				en: "Which of the following matches the content of this text?",
				choices: [
					{ jp: "その{子|こ}どもがまた{今度|こんど}いたずらをやったら{許|ゆる}さない、と{母|はは}は{言|い}った。", cn: "妈妈说，如果那个孩子下次再恶作剧就不原谅他。", en: "The mother said she would not forgive the child if he played another prank." },
					{ jp: "{今回|こんかい}のいたずらは、{叔父|おじ}さんがやったのではない、と{僕|ぼく}は{思|おも}った。", cn: "我认为这次的恶作剧不是叔叔干的。", en: "I thought this prank was not my uncle's doing." },
					{ jp: "{叔父|おじ}はよくいたずらをするので、{今回|こんかい}も{叔父|おじ}がやったと{僕|ぼく}は{思|おも}った。", cn: "叔叔经常恶作剧，所以我认为这次也是叔叔干的。", en: "My uncle often plays pranks, so I thought he did this one too." },
				],
				answer: 3,
				explanation:
					"文中「叔父さんに決まってるじゃない」＝肯定「一定是叔叔」；「あの人ならやりかねない」＝「〜かねない」表示那种可能性很高（别册提示：「かねない」＝〜しそうだ、その可能性が高い）。所以 3 正确。2 把意思读反了；1 文中没有。",
				explanationEn:
					"“Ojisan ni kimatteru ja nai” affirms “it must be Uncle,” and “ano hito nara yarikanenai” uses “kanenai” = “he very well might” (the booklet glosses “kanenai” as “~shisō da — highly possible”). So 3 is correct. 2 reads the meaning backwards; 1 never appears.",
				choiceNotes: [
					"文中母亲只是在笑，没有这样说。",
					"读反了：「決まってるじゃない」是肯定。",
					"正确。与「やりかねない」的判断一致。",
				],
				choiceNotesEn: [
					"The mother only laughs; she never says this.",
					"Read backwards: “kimatteru ja nai” is affirmative.",
					"Correct. It matches the “yarikanenai” judgment.",
				],
			},
			{
				label: "問3",
				jp: "この{文章|ぶんしょう}の{内容|ないよう}と{合|あ}わないものはどれか。",
				cn: "与这段文字内容不相符的是哪一个？",
				en: "Which of the following does NOT match the content of this text?",
				choices: [
					{ jp: "{現状況|げんじょうきょう}では{教師|きょうし}が「ダメ{教師|きょうし}」のラベルをはられることを{恐|おそ}れるのも{仕方|しかた}がない。", cn: "在目前的状况下，教师害怕被贴上「无能教师」的标签也是没办法的。", en: "In the current situation, it is understandable that teachers fear being labeled a “Failed Teacher.”" },
					{ jp: "「ダメ{教師|きょうし}」のラベルをはられたからといって{授業|じゅぎょう}が{崩壊|ほうかい}するようなことはない。", cn: "不会因为被贴上「无能教师」的标签，课堂就崩溃。", en: "Being labeled a “Failed Teacher” would never cause a class to collapse." },
					{ jp: "「ダメ{教師|きょうし}」のラベルをはられて{辞職|じしょく}に{追|お}い{込|こ}まれることもある。", cn: "也有被贴上「无能教师」标签而被迫辞职的情况。", en: "Some teachers are driven to resign after being labeled a “Failed Teacher.”" },
				],
				answer: 2,
				explanation:
					"本题问的是「合わないもの」（不相符的）。文中说贴上标签后「授業が崩壊するどころか、辞職という事態に追いこまれるほかはない」——「どころか」表示程度远超于此，连辞职都可能发生；别册提示：「するどころか、…に追いこまれるほかない」＝不只是……，还会被逼到……。所以说「不会崩溃」的 2 与原文不符，是答案。1、3 都与原文相符。",
				explanationEn:
					"This question asks for the statement that does NOT match. The text says that once labeled, teachers face far more than collapsing classes — “~dokokoka, …oikomareru hoka wa nai”: they can be driven to resign. The booklet glosses “dokokoka” accordingly. So 2, which says classes would not collapse, contradicts the text and is the answer. 1 and 3 both match.",
				choiceNotes: [
					"与原文相符：教师战战兢兢是现实。",
					"与原文不符——正是本题要找的。原文说情况比崩溃更严重。",
					"与原文相符：原文明确说了会被逼辞职。",
				],
				choiceNotesEn: [
					"Matches: teachers' fear is described as reality.",
					"Does not match — this is the one to pick. The text says things go beyond collapse.",
					"Matches: the text explicitly mentions being driven to resign.",
				],
			},
			{
				label: "問4",
				jp: "この{文章|ぶんしょう}の{内容|ないよう}と{合|あ}うものはどれか。",
				cn: "与这段文字内容相符的是哪一个？",
				en: "Which of the following matches the content of this text?",
				choices: [
					{ jp: "{自分|じぶん}の{将来|しょうらい}に{大|おお}きな{希望|きぼう}を{持|も}つ{若|わか}い{人|ひと}が{少|すく}ないのが{残念|ざんねん}だ。", cn: "对自己的将来抱有很大希望的年轻人很少，令人遗憾。", en: "It is a pity that few young people have big hopes for their future." },
					{ jp: "{新|あたら}しいことをする{場合|ばあい}に{勇気|ゆうき}がなければ{手|て}をつけないほうがいい。", cn: "做新事情时，如果没有勇气，最好不要动手。", en: "When doing something new, it is better not to start if you lack courage." },
					{ jp: "{年寄|としよ}りはいくら{元気|げんき}だと{頑張|がんば}っても{体力|たいりょく}の{衰|おとろ}えには{勝|か}てない。", cn: "老年人再怎么有活力地努力，也赢不了体力的衰退。", en: "No matter how energetically the elderly try, they cannot beat the decline of their physical strength." },
					{ jp: "{無理|むり}して{頑張|がんば}る{年寄|としよ}りを{若|わか}い{人|ひと}が{悪|わる}く{言|い}うのはしかたがない。", cn: "年轻人说勉强努力的老年人的坏话，也是没办法的。", en: "It cannot be helped if young people speak ill of elderly people who push themselves too hard." },
				],
				answer: 1,
				explanation:
					"文中说年轻人「早くからもう自分の将来はこのくらいのものだと見切りをつけて、それ以上は望まない」的人「少なからずいるのは残念でならない」——别册提示：「言うまでもない」＝当然だ；「少なからず」「いとわず」的「ず」与「ない」同义。1 是对这段的准确概括。2 作者主张「やってみなければ何も始まらない」，与 2 相反；3、4 都不是作者的意思。",
				explanationEn:
					"The text says it is “zannen de naranai” (deeply regrettable) that not a few young people give up early and hope for nothing more. The booklet notes “iu made mo nai” = “of course,” and that the “zu” in “sukunakarazu / itowazu” means the same as “nai.” 1 summarizes this accurately. 2 contradicts the writer (“nothing begins unless you try”); 3 and 4 are not his point.",
				choiceNotes: [
					"正确。是对第一段的准确概括。",
					"与作者主张相反：不试就不会开始。",
					"作者在赞叹老年人的活力，并非说他们必输。",
					"文中没有说年轻人的坏话可以原谅。",
				],
				choiceNotesEn: [
					"Correct. An accurate summary of the first paragraph.",
					"Opposite of the writer's claim: nothing begins unless you try.",
					"The writer admires the elderly's energy; he does not say they lose.",
					"The text never excuses young people speaking ill of them.",
				],
			},
		],
		pageNotes: [
			{
				jp: "* naturally, teachers have become terrified of being labeled as a “Failed Teacher”",
				cn: "教师怕被别人贴上“无能教师”的标签而不得不随时战战兢兢的",
				en: "naturally, teachers have become terrified of being labeled as a “Failed Teacher”",
			},
			{
				jp: "** it is very frustrating to see people giving up on things even before they start",
				cn: "没有比认为自己绝对不行的放弃态度更让人着急的",
				en: "it is very frustrating to see people giving up on things even before they start",
			},
		],
	},

	vocab: [
		{ jp: "教師", kana: "きょうし", cn: "教师", en: "a teacher", pos: "名詞" },
		{ jp: "同僚", kana: "どうりょう", cn: "同事", en: "a colleague", pos: "名詞" },
		{ jp: "崩壊", kana: "ほうかい", cn: "崩溃", en: "collapse", pos: "名詞・動詞" },
		{ jp: "辞職", kana: "じしょく", cn: "辞职", en: "resignation", pos: "名詞・動詞" },
		{ jp: "事態", kana: "じたい", cn: "事态、局面", en: "a situation; state of affairs", pos: "名詞" },
		{ jp: "過言", kana: "かごん", cn: "言过其实", en: "an exaggeration", pos: "名詞" },
		{ jp: "戦々恐々", kana: "せんせんきょうきょう", cn: "战战兢兢", en: "trembling with fear", pos: "名詞・形動" },
		{ jp: "勇気", kana: "ゆうき", cn: "勇气", en: "courage", pos: "名詞" },
		{ jp: "見切りをつける", kana: "みきりをつける", cn: "下定论、断了念头", en: "to give up on; to write off", pos: "動詞" },
		{ jp: "陰口", kana: "かげぐち", cn: "背后闲话、坏话", en: "backbiting; talking behind someone's back", pos: "名詞" },
		{ jp: "衰え", kana: "おとろえ", cn: "衰退、衰弱", en: "decline; weakening", pos: "名詞" },
		{ jp: "ひょうきん", kana: "ひょうきん", cn: "滑稽、逗乐", en: "funny; comical", pos: "名詞・な形" },
		{ jp: "いたずら", kana: "いたずら", cn: "恶作剧", en: "a prank; mischief", pos: "名詞・動詞" },
		{ jp: "眼鏡", kana: "めがね", cn: "眼镜", en: "glasses", pos: "名詞" },
	],

	grammar: [
		{
			pattern: "〜ほど…はない",
			formation: "名詞＋ほど＋否定文",
			meaning: "没有比……更……的了。表示最高级：〜がいちばん…。",
			meaningEn: "there is nothing more … than ~; the most …. A superlative.",
			example: {
				jp: "その{仕事|しごと}ほどおもしろくない{仕事|しごと}はない。",
				cn: "没有比那份工作更无聊的工作了。",
				en: "There is no job as uninteresting as that job.",
			},
		},
		{
			pattern: "〜かねない",
			formation: "動詞ない形＋かねない",
			meaning: "有可能……（多指不好的结果）。＝〜しそうだ、その可能性が高い。",
			meaningEn: "might well ~ (usually something undesirable); there is a good chance of ~.",
			example: {
				jp: "あの{人|ひと}ならやりかねない。",
				cn: "换作是他，干得出来（这种事）。",
				en: "He is quite capable of doing it.",
			},
		},
		{
			pattern: "〜どころか",
			formation: "普通形＋どころか",
			meaning: "别说……，甚至……。后面接程度更重的内容。",
			meaningEn: "far from ~; let alone ~ — what follows is even more extreme.",
			example: {
				jp: "{授業|じゅぎょう}が{崩壊|ほうかい}するどころか、{辞職|じしょく}に{追|お}いこまれる。",
				cn: "别说课堂崩溃了，甚至会被逼到辞职。",
				en: "Far from classes merely collapsing, teachers can be driven to resign.",
			},
		},
	],
};
