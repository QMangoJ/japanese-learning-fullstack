import type { ReadingDay } from "../reading-n3/types";

// 第2週 1日目 それはだれのこと？ — printed pages 30–31
export const w2d1: ReadingDay = {
	week: 2,
	day: 1,
	label: "それはだれのこと？",
	labelEn: "Who is it about?",
	printedPages: [30, 31],
	answerSource: "book",

	point: {
		title: "{主語|しゅご}があるかどうかに{注意|ちゅうい}！",
		titleCn: "注意是否有主语！",
		titleEn: "Watch out for whether there is a subject!",
		figure: {
			alt: "「日本語は主語が表れない文が多いね」と言う猫、「そうそう、だからわかりにくいんだ！」と答える黒猫、「あなたは、主語が表れていてもわからないんでしょ！」と言う猫先生のイラスト",
			cn: "一只说「日语里有很多不出现主语的句子呢」的猫、一只答「对对，所以才难懂啊！」的黑猫，和一只说「你呀，就算主语出现了也搞不懂吧！」的猫老师的插图",
			en: "A cat saying “Japanese has lots of sentences where the subject doesn't appear”, a black cat answering “Right — that's why it's hard to follow!”, and a teacher cat saying “You wouldn't get it even if the subject did appear!”",
		},
		tips: [
			{
				jp: "{主語|しゅご}が{遠|とお}く{離|はな}れているときは、「〜は…である。」という{文型|ぶんけい}に{注意|ちゅうい}する。",
				cn: "主语离得很远时，注意“〜は…である。”这个句型。",
				en: "When the subject is far away, watch for the pattern “…wa … de aru.”",
			},
			{
				jp: "{主語|しゅご}が{表|あらわ}れていないとき、{主語|しゅご}は「{私|わたし}」「{自分|じぶん}」「{著者|ちょしゃ}」のことが{多|おお}い。",
				cn: "没有出现主语时，主语多是“私”、“自分”、“著者”。",
				en: "When no subject appears, it is usually “I”, “oneself”, or “the author”.",
			},
			{
				jp: "{人物|じんぶつ}が{何人|なんにん}か{出|で}てくるときは、{人物|じんぶつ}の{関係|かんけい}や{時間|じかん}の{順序|じゅんじょ}に{注意|ちゅうい}する。",
				cn: "出现几个人物时，注意人物关系或时间顺序。",
				en: "When several people appear, watch their relationships and the time order.",
			},
		],
		expressions: [
			{ jp: "（主語）は…………である。", cn: "主语离得很远时", en: "when the subject is far away" },
			{ jp: "（は）…………。", cn: "没有出现主语时", en: "when no subject appears" },
			{ jp: "Aは………。Bは………。", cn: "出现几个人物时", en: "when several people appear" },
		],
		notes: [
			{
				jp: "{日本語|にほんご}は{主語|しゅご}が{表|あらわ}れない{文|ぶん}が{多|おお}いね。",
				cn: "日语里有很多不出现主语的句子呢。",
				en: "Japanese has lots of sentences where the subject doesn't appear.",
			},
			{
				jp: "そうそう、だからわかりにくいんだ！",
				cn: "对对，所以才难懂啊！",
				en: "Right — that's why it's hard to follow!",
			},
			{
				jp: "あなたは、{主語|しゅご}が{表|あらわ}れていてもわからないんでしょ！",
				cn: "你呀，就算主语出现了也搞不懂吧！",
				en: "You wouldn't get it even if the subject did appear!",
			},
		],
	},

	mondai: {
		instruction: "{次|つぎ}の{文章|ぶんしょう}を{読|よ}んで、{問|と}いに{答|こた}えなさい。",
		instructionCn: "阅读下面的文章，回答问题。",
		instructionEn: "Read each text below and answer its question. (Answers are in the separate booklet, p. 3.)",
		blocks: [
			{ type: "heading", jp: "1", cn: "第 1 题", en: "Exercise 1" },
			{
				type: "paragraph",
				jp: "{彼女|かのじょ}はあの{男|おとこ}が{自殺|じさつ}を{図|はか}った{事件|じけん}に{首|くび}を{突|つ}っ{込|こ}まなかった*から{無事|ぶじ}（注）だったんだ。",
				cn: "她没有过深地涉入那个男人企图自杀的事件，所以平安无事。",
				en: "She was all right because she did not get involved in the incident in which that man attempted suicide.",
				indent: true,
			},
			{ type: "heading", jp: "2", cn: "第 2 题", en: "Exercise 2" },
			{
				type: "paragraph",
				jp: "{他人|たにん}の{意見|いけん}より{自分|じぶん}の{意見|いけん}のほうが{正|ただ}しいと{思|おも}いがちである**。しかし{自分|じぶん}の{意見|いけん}は、{思|おも}うほど{正|ただ}しくないことも{多|おお}い。",
				cn: "人们容易觉得自己的意见比别人的意见更正确。可是自己的意见也常常没有自以为的那么正确。",
				en: "We tend to think our own opinions are more correct than other people's. But our own opinions are often not as correct as we think.",
				indent: true,
			},
			{ type: "heading", jp: "3", cn: "第 3 题", en: "Exercise 3" },
			{
				type: "paragraph",
				jp: "{私|わたし}は{講演|こうえん}を{頼|たの}まれたとき、{自分|じぶん}の{経験|けいけん}をよく{話|はな}すのだが、その{話|はなし}が{聞|き}く{側|がわ}にとって{魅力|みりょく}あるものだということがわかれば、{内|うち}に{隠|かく}れていた{体験|たいけん}や{経験|けいけん}が{次|つぎ}から{次|つぎ}へとわき{出|で}てくるのである*。その{結果|けっか}、{講演|こうえん}のテーマと{大幅|おおはば}にずれ、{関係者|かんけいしゃ}を{慌|あわ}てさせることがよくある。",
				cn: "我被人请去演讲时，经常讲自己的经验；一旦发觉这些话对听众很有吸引力，内心隐藏的体验和经历就会源源不断地涌出来。结果常常大幅偏离演讲主题，让相关人员慌了手脚。",
				en: "When I am asked to give a talk, I often speak about my own experiences; once I realise that what I am saying fascinates the listeners, the experiences hidden inside me come gushing out one after another. As a result, I often stray far from the theme of the talk and fluster the people involved.",
				indent: true,
			},
			{ type: "heading", jp: "4", cn: "第 4 题", en: "Exercise 4" },
			{
				type: "paragraph",
				jp: "{僕|ぼく}が{相撲|すもう}に{興味|きょうみ}を{持|も}ったのはいつごろのことであろうか。{父親|ちちおや}が{大|だい}の{相撲好|すもうず}きとあって、{物心|ものごころ}がついた（注1）ときから{力士|りきし}の{名前|なまえ}を{口|くち}にし、テレビの{前|まえ}で{応援|おうえん}していたものだ。{僕|ぼく}は{強|つよ}い{力士|りきし}が{好|す}きだった。{大鵬|たいほう}（注2）の{大|だい}ファンであった。とにかく{大鵬|たいほう}は{強|つよ}かった。{大鵬|たいほう}の{引退|いんたい}{後|ご}、{史上最強|しじょうさいきょう}と{言|い}われた{北|きた}の{湖|うみ}（注2）が{現|あらわ}れたが、{僕|ぼく}の{心|こころ}の{中|なか}では{大鵬|たいほう}が{強|つよ}かった。{強|つよ}さと{容姿|ようし}を{兼|か}ね{備|そな}えた{千代|ちよ}の{富士|ふじ}（注2）が{出|で}てきたとき、{確|たし}かにかっこいいと{思|おも}ったが、まだ{僕|ぼく}の{思|おも}う{強|つよ}さではなかった。そして{僕|ぼく}と{親子|おやこ}ほど{年|とし}の{違|ちが}う{貴乃花|たかのはな}（注2）が{出|で}てくるまで、{大鵬|たいほう}に{勝|まさ}る{力士|りきし}はもう{現|あらわ}れないと{思|おも}っていたのだった**。{今|いま}やその{貴乃花|たかのはな}も{引退|いんたい}して10{年近|ねんちか}くになる。{貴乃花|たかのはな}の{後|あと}も{強|つよ}い{力士|りきし}は{出|で}てくるが、これは、と{思|おも}える{力士|りきし}はいくら{待|ま}てども{出|で}てこない。さみしい{限|かぎ}りだ。",
				cn: "我是什么时候开始对相扑感兴趣的呢？父亲是个十足的相扑迷，我从懂事起就念叨着力士的名字，在电视机前为他们加油。我喜欢强壮的力士，是大鹏的铁杆粉丝。总之大鹏非常强。大鹏退役后，号称史上最强的北之湖出现了，但在我心里还是大鹏更强。集力量与相貌于一身的千代之富士出现时，我确实觉得他很帅，但还不是我所认为的那种强。直到与我年龄相差如父子的贵乃花出现之前，我一直以为不会再出现胜过大鹏的力士了。如今贵乃花也退役快十年了。贵乃花之后也有强力士出现，但让我觉得“就是他了”的力士，无论等多久也不出现。真是寂寞至极。",
				en: "When was it that I became interested in sumo? My father was a great sumo fan, and from the age when I first became aware of the world I was saying wrestlers' names and cheering in front of the TV. I liked strong wrestlers. I was a huge fan of Taihō. In any case, Taihō was strong. After Taihō retired, Kitanoumi, said to be the strongest in history, appeared, but in my heart Taihō was stronger. When Chiyonofuji, who combined strength and good looks, came along, I certainly thought he was cool, but he still did not have the strength I meant. And until Takanohana — young enough to be my son — appeared, I believed no wrestler surpassing Taihō would ever appear again. Now Takanohana, too, has been retired for nearly ten years. Strong wrestlers still appear after Takanohana, but one who makes me think “this is the one” never comes, however long I wait. It is deeply lonely.",
				indent: true,
			},
		],
		footnotes: [
			{ marker: "注", term: "無事", jp: "ぶじ", cn: "平安无事：没有坏事发生", en: "safe and sound: nothing bad happening" },
			{ marker: "注1", term: "物心がつく", jp: "ものごころがつく", cn: "懂事：到了能明白世事的年龄", en: "to reach the age of understanding the world" },
			{ marker: "注2", term: "大鵬、北の湖、千代の富士、貴乃花", jp: "たいほう、きたのうみ、ちよのふじ、たかのはな", cn: "都是相扑力士的名字", en: "names of sumo wrestlers" },
		],
		pageNotes: [
			{ jp: "* she did not get involved in the problem which led to his attempted suicide", cn: "她没有过深地涉入那个男人企图自杀的事件", en: "she did not get involved in the problem which led to his attempted suicide" },
			{ jp: "** We tend to think that our own opinions have better grounds than others.", cn: "人们容易觉得自己的意见比别人的意见更正确。", en: "We tend to think that our own opinions have better grounds than others." },
			{ jp: "* various stories about my experiences start gushing out", cn: "就会源源不断地涌出内心隐藏的体验或经历", en: "various stories about my experiences start gushing out" },
			{ jp: "** until Takanohana appeared, who was young enough to be my son, I had believed that no wrestler would surpass Taiho", cn: "在与我年龄相差如父子的贵乃花出现之前，我一直以为不会有能够超过大鹏的相扑力士", en: "until Takanohana appeared, who was young enough to be my son, I had believed that no wrestler would surpass Taiho" },
		],
		questions: [
			{
				label: "問1",
				jp: "{無事|ぶじ}だったとあるが、だれが{無事|ぶじ}だったのか。",
				cn: "文中说平安无事，是谁平安无事？",
				en: "The text says someone was all right. Who was all right?",
				choices: [
					{ jp: "{彼女|かのじょ}", cn: "她", en: "she / her" },
					{ jp: "あの{男|おとこ}", cn: "那个男人", en: "that man" },
				],
				answer: 1,
				explanation: "句子的主语在句首：「彼女は…首を突っ込まなかったから無事だった」。「無事だった」的主语就是「彼女」。那个男人是企图自杀的一方，谈不上无事。",
				explanationEn: "The subject stands at the head of the sentence: “She (kanojo wa) … did not get involved, so she was all right.” The man is the one who attempted suicide; he is not the one who was “all right”.",
				choiceNotes: [
					"正解。主语「彼女は」统领全句。",
					"「あの男」是自杀事件的当事人，不是「無事」的主语。",
				],
				choiceNotesEn: [
					"Correct. The subject kanojo wa governs the whole sentence.",
					"The man is the one in the suicide incident, not the subject of “was all right”.",
				],
			},
			{
				label: "問2",
				jp: "{思|おも}うとあるが、だれが{思|おも}うのか。",
				cn: "文中说“觉得”，是谁觉得？",
				en: "The text says “think”. Who does the thinking?",
				choices: [
					{ jp: "{他人|たにん}", cn: "别人", en: "other people" },
					{ jp: "{自分|じぶん}", cn: "自己", en: "oneself" },
				],
				answer: 2,
				explanation: "第二句「自分の意見は、思うほど正しくない」里的「思う」承接第一句：是持有意见的「自分」自己觉得自己的意见正确。主语被省略了，但按本周要点，无主语时多半是文中的主体——这里是「自分」。",
				explanationEn: "The “think” in “not as correct as (one) thinks” continues the first sentence: it is the person himself who thinks his own opinion is correct. The subject is omitted, but as this week's point says, it is the person at the centre of the text — here, “oneself”.",
				choiceNotes: [
					"「他人」只是被比较的对象，不做「思う」的主体。",
					"正解。「思うほど」的判断主体是「自分」。",
				],
				choiceNotesEn: [
					"Other people are only the object of comparison, not the thinker.",
					"Correct. The one who “thinks” is oneself.",
				],
			},
			{
				label: "問3",
				jp: "わかればとあるが、だれがわかるのか。",
				cn: "文中说“一旦发觉”，是谁发觉？",
				en: "The text says “once (someone) realises”. Who realises it?",
				choices: [
					{ jp: "{話|はな}している{自分|じぶん}", cn: "正在讲的自己", en: "oneself, the speaker" },
					{ jp: "{話|はなし}を{聞|き}いている{人|ひと}", cn: "听讲的人", en: "the people listening" },
					{ jp: "{関係者|かんけいしゃ}", cn: "相关人员", en: "the people involved (organisers)" },
					{ jp: "{話|はな}している{自分|じぶん}とそれを{聞|き}いている{人|ひと}", cn: "正在讲的自己和听讲的人", en: "both the speaker and the listeners" },
				],
				answer: 1,
				explanation: "「わかれば」的后续是「内に隠れていた体験や経験が次から次へとわき出てくる」——涌出体验的是演讲者本人。能察觉“自己的话很有吸引力”并随之讲个不停的，是说话的「自分」。听众只是被讲的对象，関係者是事后被慌到的人。",
				explanationEn: "What follows “realises” is “the experiences hidden inside come gushing out” — and the one whose experiences gush out is the speaker. The person who notices “my talk fascinates them” and then cannot stop is the speaker himself. The listeners are only the audience, and the organisers are merely flustered afterwards.",
				choiceNotes: [
					"正解。体验从「内」涌出的只能是演讲者本人。",
					"听众的感受是被察觉的内容，不是察觉的主体。",
					"関係者出现在后文，是被偏离主题搞慌的人。",
					"后半句的主语仍然是演讲者，不是双方。",
				],
				choiceNotesEn: [
					"Correct. Experiences gush out from inside the speaker alone.",
					"The listeners' fascination is what is noticed, not who notices.",
					"The organisers appear later, flustered by the drift from the theme.",
					"The subject of the second half is still the speaker, not both sides.",
				],
			},
			{
				label: "問4",
				jp: "{筆者|ひっしゃ}はどの{力士|りきし}がいちばん{好|す}きだったか。",
				cn: "作者最喜欢哪个力士？",
				en: "Which wrestler did the author like the most?",
				choices: [
					{ jp: "{大鵬|たいほう}", cn: "大鹏", en: "Taihō" },
					{ jp: "{北|きた}の{湖|うみ}", cn: "北之湖", en: "Kitanoumi" },
					{ jp: "{千代|ちよ}の{富士|ふじ}", cn: "千代之富士", en: "Chiyonofuji" },
					{ jp: "{貴乃花|たかのはな}", cn: "贵乃花", en: "Takanohana" },
				],
				answer: 4,
				explanation: "问的是“最喜欢”，不是“最强”。作者说在贵乃花出现之前，一直以为不会再有「大鵬に勝る力士」出现——别册点明：以作者的心情说，「大鵬に勝る力士」就是「大鵬より好きな力士」，即贵乃花在他心中的地位超过了大鹏。北之湖、千代之富士都被他评价为“还不是我认为的那种强”。",
				explanationEn: "The question asks whom he liked most, not who was strongest. Until Takanohana appeared, he believed no wrestler surpassing Taihō would come; the booklet points out that, in the author's feelings, “a wrestler surpassing Taihō” means “a wrestler he liked more than Taihō” — Takanohana. Kitanoumi and Chiyonofuji are both judged “not the strength I mean”.",
				choiceNotes: [
					"大鹏是他长年的偶像，但后来被贵乃花超过（在他心中）。",
					"「僕の心の中では大鵬が強かった」——北之湖没有超过大鹏。",
					"千代之富士只是「かっこいい」，还不是他所认为的强。",
					"正解。「大鵬に勝る力士」＝在他心中超过大鹏的力士。",
				],
				choiceNotesEn: [
					"Taihō was his long-time idol, but Takanohana surpassed him in his heart.",
					"“In my heart Taihō was stronger” — Kitanoumi did not surpass Taihō.",
					"Chiyonofuji was merely “cool”, not the strength he meant.",
					"Correct. “A wrestler surpassing Taihō” is the one he liked even more.",
				],
			},
		],
	},

	vocab: [
		{ jp: "自殺", kana: "じさつ", cn: "自杀", en: "suicide", pos: "名詞・動詞" },
		{ jp: "図る", kana: "はかる", cn: "企图、谋求", en: "to attempt; to plot", pos: "動詞" },
		{ jp: "首を突っ込む", kana: "くびをつっこむ", cn: "插手、过深涉入", en: "to stick one's neck into; to get involved", pos: "表現" },
		{ jp: "無事", kana: "ぶじ", cn: "平安无事", en: "safety; being unharmed", pos: "名詞・な形" },
		{ jp: "他人", kana: "たにん", cn: "别人、外人", en: "other people; strangers", pos: "名詞" },
		{ jp: "講演", kana: "こうえん", cn: "演讲", en: "lecture; public talk", pos: "名詞・動詞" },
		{ jp: "魅力", kana: "みりょく", cn: "吸引力、魅力", en: "charm; fascination", pos: "名詞" },
		{ jp: "わき出る", kana: "わきでる", cn: "涌出", en: "to gush out; to well up", pos: "動詞" },
		{ jp: "大幅", kana: "おおはば", cn: "大幅、大范围", en: "large margin; wide range", pos: "名詞・な形" },
		{ jp: "関係者", kana: "かんけいしゃ", cn: "相关人员", en: "person involved; staff concerned", pos: "名詞" },
		{ jp: "慌てる", kana: "あわてる", cn: "慌张", en: "to be flustered", pos: "動詞" },
		{ jp: "相撲", kana: "すもう", cn: "相扑", en: "sumo wrestling", pos: "名詞" },
		{ jp: "物心がつく", kana: "ものごころがつく", cn: "懂事", en: "to reach the age of understanding", pos: "表現" },
		{ jp: "力士", kana: "りきし", cn: "相扑力士", en: "sumo wrestler", pos: "名詞" },
		{ jp: "引退", kana: "いんたい", cn: "退役、引退", en: "retirement (from sport)", pos: "名詞・動詞" },
		{ jp: "容姿", kana: "ようし", cn: "容貌、姿容", en: "appearance; looks", pos: "名詞" },
		{ jp: "兼ね備える", kana: "かねそなえる", cn: "兼备", en: "to combine (qualities); to have both", pos: "動詞" },
		{ jp: "勝る", kana: "まさる", cn: "胜过、超过", en: "to surpass; to excel", pos: "動詞" },
		{ jp: "限り", kana: "かぎり", cn: "至极（〜限りだ）", en: "utterly… (in the pattern ~kagiri da)", pos: "名詞" },
	],

	grammar: [
		{
			pattern: "〜から無事だった",
			formation: "文＋から＋結果",
			meaning: "先看句首的主语，再顺着「から」读到结果。第1题主语「彼女は」离结果「無事だった」很远，中间嵌了事件的说明——本周要点一：主语离得远时盯住「〜は…」的骨架。",
			meaningEn: "Hold on to the sentence-initial subject and read through to the result after kara. In exercise 1 the subject kanojo is far from the result “was all right”, with the whole incident in between.",
			example: {
				jp: "{彼女|かのじょ}はあの{男|おとこ}が{自殺|じさつ}を{図|はか}った{事件|じけん}に{首|くび}を{突|つ}っ{込|こ}まなかったから{無事|ぶじ}だった。",
				cn: "她没有涉入那个男人企图自杀的事件，所以平安无事。",
				en: "She was all right because she did not get involved in the incident of that man's attempted suicide.",
			},
		},
		{
			pattern: "〜と思いがちである",
			formation: "動詞辞書形＋がち",
			meaning: "容易（不知不觉）就……，多带负面倾向。「自分の意見のほうが正しいと思いがち」的主体是没有写出的“人们/自己”。",
			meaningEn: "to tend to… (usually something undesirable). The thinker in “we tend to think our own opinions are right” is the unwritten “oneself / people in general”.",
			example: {
				jp: "{他人|たにん}の{意見|いけん}より{自分|じぶん}の{意見|いけん}のほうが{正|ただ}しいと{思|おも}いがちである。",
				cn: "人们容易觉得自己的意见比别人的意见更正确。",
				en: "We tend to think our own opinions are more correct than other people's.",
			},
		},
		{
			pattern: "〜ことがわかれば、…わき出てくる",
			formation: "文＋ことがわかれば（条件）",
			meaning: "「わかれば」没有主语。判断方法：看条件成立后发生什么——体验涌出来的人，就是“发觉”的人（演讲者本人）。",
			meaningEn: "“Once (he) realises…” has no written subject. Decide it from what happens next: the one whose experiences gush out is the one who realises — the speaker.",
			example: {
				jp: "その{話|はなし}が{聞|き}く{側|がわ}にとって{魅力|みりょく}あるものだということがわかれば、{内|うち}に{隠|かく}れていた{体験|たいけん}や{経験|けいけん}が{次|つぎ}から{次|つぎ}へとわき{出|で}てくる。",
				cn: "一旦发觉这些话对听众很有吸引力，内心隐藏的体验和经历就会源源不断地涌出来。",
				en: "Once he realises his talk fascinates the listeners, the experiences hidden inside him come gushing out one after another.",
			},
		},
		{
			pattern: "〜とあって／〜ものだ",
			formation: "名詞＋とあって（理由）／文＋ものだ（回想）",
			meaning: "「父親が大の相撲好きとあって」＝因为父亲是铁杆相扑迷（とあって 表示显而易见的理由）；「応援していたものだ」＝（那时）总是……着呢（ものだ 表回想中的习惯）。",
			meaningEn: "“My father being a great sumo fan” (to atte gives an obvious reason); “I used to cheer” (mono da recalls a past habit).",
			example: {
				jp: "{父親|ちちおや}が{大|だい}の{相撲好|すもうず}きとあって、{物心|ものごころ}がついたときから{力士|りきし}の{名前|なまえ}を{口|くち}にし、テレビの{前|まえ}で{応援|おうえん}していたものだ。",
				cn: "父亲是个十足的相扑迷，我从懂事起就念叨着力士的名字，在电视机前为他们加油。",
				en: "My father being a great sumo fan, from the age of understanding I was saying wrestlers' names and cheering in front of the TV.",
			},
		},
	],
};
