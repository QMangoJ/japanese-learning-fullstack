import type { ReadingDay } from "../reading-n3/types";

// 第6週 4日目 物理に関する文章 — printed pages 102–103
export const w6d4: ReadingDay = {
	week: 6,
	day: 4,
	label: "物理に関する文章",
	labelKana: "ぶつりにかんするぶんしょう",
	labelEn: "Article on Physics",
	printedPages: [102, 103],
	answerSource: "book",

	point: {
		title: "{複雑|ふくざつ}な{文章|ぶんしょう}を{整理|せいり}して{理解|りかい}しよう！①",
		titleCn: "整理复杂的文章来理解吧！①",
		titleEn: "Try to understand the complicated sentences by reorganizing them! ①",
		figure: {
			alt: "本を読んで「結論の部分と説明の部分を区別して読めば難しくありません。」と言うキャラクターと、「その区別ができないボクはどうするの？」と聞くキャラクター",
			cn: "一个边看书边说「如果把结论部分和说明部分区分开来读，就不难。」的角色，和一个问「分不清这种区别的我该怎么办呢？」的角色",
			en: "A character reading says, “If you distinguish the conclusion from the explanation, it isn’t hard.” Another asks, “What do I do if I can’t tell them apart?”",
		},
		tips: [
			{
				jp: "{例|たと}えば、{右|みぎ}の{文章|ぶんしょう}はこんな{構成|こうせい}になっています。",
				cn: "例如，右边的文章是这样的结构。",
				en: "For example, the passage on the right is organized like this.",
			},
			{
				jp: "【{読者|どくしゃ}への{問|と}いかけ】みなさんは、こう{思|おも}うことはありませんか？　【{問題提起|もんだいていき}】AとBは……のでしょうか？　【{結論|けつろん}①】{実|じつ}は○○の{場合|ばあい}はBのほうが……です。　【①の{説明|せつめい}】……なので、……からです。{一方|いっぽう}、……　【{結論|けつろん}②】{逆|ぎゃく}に××の{場合|ばあい}はAのほうが……です。　【②の{説明|せつめい}】……のため、……というわけです。それに{対|たい}して……",
				cn: "【向读者发问】各位，有没有这样想过？　【提出问题】A和B是……吗？　【结论①】其实，在○○的情况下，B更……。　【①的说明】……所以，是因为……。另一方面，……　【结论②】反过来，在××的情况下，A更……。　【②的说明】由于……，……也就是这么回事。与此相对……",
				en: "[Appeal to the reader] Haven’t you ever thought this?  [Posing the question] Are A and B…?  [Conclusion ①] In fact, in the case of ○○, B is more….  [Explanation of ①] Because…, so…. On the other hand….  [Conclusion ②] Conversely, in the case of ××, A is more….  [Explanation of ②] Because of…, that is why…. By contrast….",
			},
			{
				jp: "{結論|けつろん}の{部分|ぶぶん}と{説明|せつめい}の{部分|ぶぶん}を{区別|くべつ}して{読|よ}めば{難|むずか}しくありません。",
				cn: "如果把结论部分和说明部分区分开来读，就不难。",
				en: "If you distinguish the conclusion from the explanation as you read, it is not difficult.",
			},
		],
		expressions: [
			{ jp: "問題提起", kana: "もんだいていき", cn: "提出问题", en: "posing a question; raising an issue" },
			{ jp: "結論", kana: "けつろん", cn: "结论", en: "conclusion" },
			{ jp: "一方", kana: "いっぽう", cn: "另一方面", en: "on the other hand" },
			{ jp: "逆に", kana: "ぎゃくに", cn: "反过来", en: "conversely" },
			{ jp: "それに対して", kana: "たいして", cn: "与此相对", en: "by contrast; whereas" },
			{ jp: "というわけです", cn: "所以才这样；也就是这么回事", en: "that is why…; that is how it is" },
			{ jp: "理屈では", kana: "りくつでは", cn: "按道理说、理论上", en: "in theory; theoretically (＝理論では)" },
			{ jp: "遠心力", kana: "えんしんりょく", cn: "离心力", en: "centrifugal force" },
		],
		notes: [
			{
				jp: "「{理屈|りくつ}では」＝「{理論|りろん}では」と{同|おな}じ{意味|いみ}。",
				cn: "「理屈では」（从道理上讲）＝「理論では」（从理论上讲），意思相同。",
				en: "理屈では has the same meaning as 理論では (note from the answer booklet).",
			},
		],
	},

	renshu: {
		instruction:
			"{次|つぎ}の{会話文|かいわぶん}を{読|よ}んで、{後|あと}の{文|ぶん}から{正|ただ}しいものを{選|えら}ぼう。",
		instructionCn: "阅读下面的对话，从后面的句子中选出正确的吧。",
		instructionEn:
			"Read the conversation below and choose the correct statements from the sentences that follow. (Answers are on the next page.)",
		blocks: [
			{
				type: "speech",
				speaker: "{女|おんな}",
				speakerCn: "女",
				speakerEn: "Woman",
				jp: "{見|み}て、すごい！　あんないよく{乗|の}れるよね。{特|とく}にいちばん{前|まえ}なんて{考|かんが}えられない。",
				cn: "看！好厉害！能坐得那么好呢。尤其是最前面，根本无法想象。",
				en: "Look, that’s amazing! I could never ride something like that well. The very front, especially — I can’t even imagine it.",
			},
			{
				type: "speech",
				speaker: "{男|おとこ}",
				speakerCn: "男",
				speakerEn: "Man",
				jp: "いちばん{前|まえ}がいちばん{怖|こわ}いとは{限|かぎ}らないんだよ。てっぺん（{注|ちゅう}1）を{通過|つうか}するときは{前|まえ}の{席|せき}より{後|うし}ろの{席|せき}のほうが{加速|かそく}するから{怖|こわ}いんだ。{前|まえ}の{車両|しゃりょう}に{引|ひ}っ{張|ぱ}られるからね。",
				cn: "最前面不一定最可怕哦。通过最顶上（注1）的时候，后面的座位比前面的座位加速得更厉害，所以更可怕。因为会被前面的车厢拉着走嘛。",
				en: "The very front isn’t necessarily the scariest. When you go over the peak (note 1), the back seats accelerate more than the front, so they’re scarier. You’re being pulled by the cars in front.",
			},
			{
				type: "speech",
				speaker: "{女|おんな}",
				speakerCn: "女",
				speakerEn: "Woman",
				jp: "じゃ、いちばん{下|した}のほうを{通|とお}るときは{逆|ぎゃく}なの？",
				cn: "那，经过最下面那一带的时候，是反过来的吗？",
				en: "So when you go through the very bottom, it’s the other way around?",
			},
			{
				type: "speech",
				speaker: "{男|おとこ}",
				speakerCn: "男",
				speakerEn: "Man",
				jp: "そうそう、{後|うし}ろの{車両|しゃりょう}に{押|お}されて{加速|かそく}が{増|ま}すからね。",
				cn: "对对，被后面的车厢推着，加速度会增大嘛。",
				en: "Right — you’re pushed by the cars behind, so the acceleration increases.",
			},
			{
				type: "speech",
				speaker: "{女|おんな}",
				speakerCn: "女",
				speakerEn: "Woman",
				jp: "まあ、{理屈|りくつ}ではそうかもしれないけど、やっぱりいちばん{前|まえ}の{座席|ざせき}は{怖|こわ}いな。{前|まえ}に{何|なに}にもないんだもん。わー、{見|み}て！　{一回転|いっかいてん}してる！　{落|お}ちるー！",
				cn: "嗯，从道理上讲也许是这样，不过最前面的座位果然还是可怕啊。前面什么都没有嘛。哇——看！正在转一圈！掉下去了——！",
				en: "Well, in theory that may be so, but the very front seat still feels scary. There’s nothing in front of you. Wah — look! It’s looping! We’re falling—!",
			},
			{
				type: "speech",
				speaker: "{男|おとこ}",
				speakerCn: "男",
				speakerEn: "Man",
				jp: "{落|お}ちないよ、{遠心力|えんしんりょく}（{注|ちゅう}2）があるんだから。",
				cn: "不会掉下去的哦，因为有离心力（注2）嘛。",
				en: "You won’t fall. There’s centrifugal force (note 2).",
			},
		],
		footnotes: [
			{ marker: "（注1）", term: "てっぺん", jp: "頂上、一番高いところ", cn: "顶点、最高处", en: "the peak; the highest point" },
			{ marker: "（注2）", term: "遠心力", jp: "centrifugal force", cn: "离心力", en: "centrifugal force" },
		],
		choices: [
			{
				jp: "{二人|ふたり}はジェットコースターに{乗|の}っている。",
				cn: "两人正在坐过山车。",
				en: "The two of them are riding a roller coaster.",
			},
			{
				jp: "{女|おんな}の{人|ひと}はジェットコースターに{乗|の}りたがっている。",
				cn: "女人想坐过山车。",
				en: "The woman wants to ride the roller coaster.",
			},
			{
				jp: "{男|おとこ}の{人|ひと}は{冷静|れいせい}にジェットコースターを{見|み}ている。",
				cn: "男人在冷静地看着过山车。",
				en: "The man is watching the roller coaster calmly.",
			},
			{
				jp: "ジェットコースターのスピードはつねに{変|か}わらない。",
				cn: "过山车的速度始终不变。",
				en: "The roller coaster’s speed never changes.",
			},
			{
				jp: "ジェットコースターは{座席|ざせき}によって{怖|こわ}さの{感|かん}じ{方|かた}が{違|ちが}う。",
				cn: "过山车因座位不同，感到可怕的方式也不同。",
				en: "How scary a roller coaster feels differs depending on the seat.",
			},
		],
		answers: [3, 5],
		hint: {
			jp: "6{行目|ぎょうめ}「{理屈|りくつ}では」＊この{場合|ばあい}、「{理論|りろん}では」と{同|おな}じ{意味|いみ}。{二人|ふたり}は{乗|の}っているのではなく、{見|み}ている。",
			cn: "第6行「理屈では」（从道理上讲）＊在这种情况下，与「理論では」（从理论上讲）意思相同。两人不是在乘坐，而是在看。",
			en: "Line 6 理屈では here means the same as 理論では. The two are watching, not riding.",
		},
	},

	mondai: {
		instruction: "{次|つぎ}の{文章|ぶんしょう}を{読|よ}んで、{後|あと}の{問|と}いに{答|こた}えなさい。",
		instructionCn: "请阅读下面的文章，回答后面的问题。",
		instructionEn: "Read the following passage and answer the questions that follow. (Answers are in the separate booklet, p. 7.)",
		blocks: [
			{
				type: "paragraph",
				indent: true,
				jp: "{遊園地|ゆうえんち}でジェットコースターに{乗|の}るとき、「いちばん{前|まえ}は{怖|こわ}いからいやだ！」あるいは「いちばん{前|まえ}でスリルを{味|あじ}わいたい！」と{思|おも}うことはありませんか。{実際|じっさい}、{前|まえ}の{席|せき}と{後|うし}ろの{席|せき}では{怖|こわ}さが{違|ちが}うのでしょうか。",
				cn: "在游乐园坐过山车的时候，有没有想过「最前面很可怕，所以才不要！」或者「想在最前面体会刺激的滋味！」呢？实际上，前面的座位和后面的座位，可怕程度是不同的吗？",
				en: "When you ride a roller coaster at an amusement park, haven’t you ever thought “The very front is scary — no thanks!” or “I want to feel the thrill at the very front!”? In fact, is the fear different in the front seats and the back seats?",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "{実|じつ}は{頂上|ちょうじょう}を{通過|つうか}するときは{後|うし}ろの{席|せき}のほうが{怖|こわ}いと{考|かんが}えられます。コースターの{先頭車両|せんとうしゃりょう}が{頂上|ちょうじょう}を{通|とお}り{過|す}ぎるときは、{後部車両|こうぶしゃりょう}がまだ{坂|さか}を{上|のぼ}っているところなので、{下降|かこう}し{始|はじ}めた{先頭車両|せんとうしゃりょう}の{加速|かそく}はゆるやかになるからです。{一方|いっぽう}、{後部車両|こうぶしゃりょう}が{頂上|ちょうじょう}を{通過|つうか}するときは、{下降|かこう}により{加速|かそく}している{先頭車両|せんとうしゃりょう}に{引|ひ}っ{張|ぱ}られるため、{先頭車両|せんとうしゃりょう}に{比|くら}べて{速|はや}いスピードで{走|はし}り{抜|ぬ}けることになります。",
				cn: "其实，通过顶点时可以认为后面的座位更可怕。这是因为，过山车的头车越过顶点时，后部车厢还在爬坡，所以已经开始下降的头车，加速度会变缓。另一方面，后部车厢通过顶点时，会被因下降而正在加速的头车拉着，因此会以比头车更快的速度冲过去。",
				en: "In fact, when you pass the peak, the back seats are thought to be scarier. When the lead car has gone over the top, the rear cars are still climbing, so the lead car, which has begun to descend, accelerates only gently. On the other hand, when the rear cars pass the peak, they are pulled by the lead car that is already accelerating on the way down, so they shoot through at a higher speed than the lead car.",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "{逆|ぎゃく}に{谷|たに}の{部分|ぶぶん}を{通過|つうか}するときは、{前|まえ}の{席|せき}のほうが{怖|こわ}いと{考|かんが}えられます。{本来|ほんらい}は{上|のぼ}り{坂|ざか}に{差|さ}し{掛|か}かって（{注|ちゅう}）スピードが{落|お}ちるはずのところを、{下|くだ}り{坂|ざか}でスピードを{上|あ}げている{後部車両|こうぶしゃりょう}に{押|お}し{上|あ}げられ、{加速|かそく}してしまうからです*。それに{対|たい}して、{後部車両|こうぶしゃりょう}が{同|おな}じ{地点|ちてん}を{通|とお}るときには{上|のぼ}り{坂|ざか}で{先頭車両|せんとうしゃりょう}のスピードが{落|お}ちているために、{先頭車両|せんとうしゃりょう}に{比|くら}べて{遅|おそ}いスピードで{通|とお}ることになるというわけです。",
				cn: "反过来，通过谷底部分时，可以认为前面的座位更可怕。这是因为，本来是在刚要进入上坡（注）、速度本应下降的时候，却被正在下坡提高速度的后部车厢往上推，结果加速了*。与此相对，后部车厢经过同一地点时，由于头车在上坡速度已经下降，因此会以比头车更慢的速度经过，也就是这么回事。",
				en: "Conversely, when you pass the valley, the front seats are thought to be scarier. Just where the speed should drop as the train approaches (note) the uphill, the rear cars, which have gained speed on the downhill, push it up and it accelerates*. By contrast, when the rear cars pass the same point, the lead car’s speed has already dropped on the climb, so they go through more slowly than the lead car did.",
			},
		],
		footnotes: [
			{ marker: "（注）", term: "差し掛かる", jp: "to approach", cn: "临近", en: "to approach" },
		],
		pageNotes: [
			{
				jp: "Fundamentally, it slows down as it approaches the uphill slope, but it actually gets pushed by the other cars whose speed has been accelerated on the preceding downhill.",
				cn: "从根本上说，它在临近上坡时会减速，但实际上会被在前一段下坡中已经加速的其他车厢推着。",
				en: "Fundamentally, it slows down as it approaches the uphill slope, but it actually gets pushed by the other cars whose speed has been accelerated on the preceding downhill.",
			},
		],
		questions: [
			{
				label: "問1",
				jp: "{怖|こわ}さが{違|ちが}うのでしょうかという{問|と}いに{対|たい}して{筆者|ひっしゃ}はどう{言|い}っているか。",
				cn: "对于「可怕程度不同吗」这个问题，笔者是怎么说的？",
				en: "How does the writer answer the question of whether the fear is different?",
				choices: [
					{ jp: "{同|おな}じ", cn: "相同", en: "the same" },
					{ jp: "{違|ちが}う", cn: "不同", en: "different" },
					{ jp: "どちらとも{言|い}えない", cn: "哪一种都无法断定", en: "cannot say either way" },
					{ jp: "{人|ひと}によって{違|ちが}う", cn: "因人而异", en: "differs from person to person" },
				],
				answer: 2,
				explanation:
					"别册：疑问句是向读者发问、引起兴趣的常用手法。问完「前の席と後ろの席では怖さが違うのでしょうか」之后，笔者明确说：过顶点时后排更可怕，过谷底时前排更可怕。结论就是「違う」。不是因人而异，也不是说不清。",
				explanationEn:
					"The booklet notes that questions are a common way to draw the reader in. After asking whether front and back feel different, the writer states clearly: the back is scarier at the peak, the front at the valley. The answer is “different.” Not “it depends on the person,” and not “cannot say.”",
				choiceNotes: [
					"两处结论都在比较前后排谁更可怕，不是「一样」。",
					"正确。顶点后排可怕、谷底前排可怕，所以不一样。",
					"笔者给出了明确结论，不是说不清。",
					"比较的是座位，不是因人而异。",
				],
				choiceNotesEn: [
					"Both conclusions compare which seat is scarier; they are not “the same.”",
					"Correct. The back is scarier at the peak, the front in the valley, so they differ.",
					"The writer gives a clear conclusion, not “cannot say.”",
					"The comparison is by seat, not by person.",
				],
			},
			{
				label: "問2",
				jp: "この{文章|ぶんしょう}の{内容|ないよう}と{合|あ}うものはどれか。",
				cn: "与这篇文章的内容相符的是哪一个？",
				en: "Which of the following matches the content of this passage?",
				choices: [
					{
						jp: "{怖|こわ}がりな{人|ひと}は{先頭車両|せんとうしゃりょう}に{乗|の}るべきではない。",
						cn: "胆小的人不应该坐头车。",
						en: "Timid people should not ride in the lead car.",
					},
					{
						jp: "スリルを{楽|たの}しみたい{人|ひと}は{先頭車両|せんとうしゃりょう}に{乗|の}るべきだ。",
						cn: "想享受刺激的人应该坐头车。",
						en: "People who want thrills should ride in the lead car.",
					},
					{
						jp: "{一番下|いちばんした}の{部分|ぶぶん}を{通過|つうか}するときは{先頭車両|せんとうしゃりょう}の{速度|そくど}が{増|ま}す。",
						cn: "通过最下面的部分时，头车的速度会加快。",
						en: "When passing the lowest part, the lead car’s speed increases.",
					},
					{
						jp: "{頂上|ちょうじょう}を{通過|つうか}するときは{先頭車両|せんとうしゃりょう}の{速度|そくど}が{増|ま}す。",
						cn: "通过顶点时，头车的速度会加快。",
						en: "When passing the peak, the lead car’s speed increases.",
					},
				],
				answer: 3,
				explanation:
					"谷底（一番下）时：头车本该在上坡减速，却被后面下坡加速的车厢往上推，因而加速——3 与此相符。4 相反：过顶点时头车加速变缓，后车才被拉得更快。1、2 把「该坐哪」说成建议，文中只是比较物理上哪里更猛，没有「应该」。",
				explanationEn:
					"In the valley (the lowest part), the lead car should be slowing on the climb but is pushed by the accelerating rear cars, so its speed increases — matching 3. 4 is the opposite: at the peak the lead car accelerates only gently, and the rear is pulled faster. 1 and 2 turn “which seat is more intense” into advice; the passage never says who “should” sit where.",
				choiceNotes: [
					"文中没有对胆小的人提出乘坐建议；谷底时头车反而更猛。",
					"没有「想要刺激就该坐头车」的主张。",
					"正确。过谷底时头车被后车推着加速。",
					"过顶点时头车加速变缓，速度增的是后车。",
				],
				choiceNotesEn: [
					"No advice to timid riders; at the valley the lead car is actually more intense.",
					"There is no claim that thrill-seekers should sit in front.",
					"Correct. In the valley the lead car is pushed and speeds up.",
					"At the peak the lead car’s acceleration eases; the rear is faster.",
				],
			},
		],
	},

	vocab: [
		{ jp: "構成", kana: "こうせい", cn: "结构、构成", en: "structure; organization", pos: "名詞" },
		{ jp: "問題提起", kana: "もんだいていき", cn: "提出问题", en: "raising an issue", pos: "名詞" },
		{ jp: "結論", kana: "けつろん", cn: "结论", en: "conclusion", pos: "名詞" },
		{ jp: "ジェットコースター", cn: "过山车", en: "roller coaster", pos: "名詞" },
		{ jp: "スリル", cn: "刺激、惊险感", en: "thrill", pos: "名詞" },
		{ jp: "頂上", kana: "ちょうじょう", cn: "顶点", en: "summit; peak", pos: "名詞" },
		{ jp: "通過する", kana: "つうかする", cn: "通过", en: "to pass through", pos: "動詞" },
		{ jp: "先頭車両", kana: "せんとうしゃりょう", cn: "头车、最前面的车厢", en: "lead car", pos: "名詞" },
		{ jp: "後部車両", kana: "こうぶしゃりょう", cn: "后面的车厢", en: "rear cars", pos: "名詞" },
		{ jp: "下降", kana: "かこう", cn: "下降", en: "descent", pos: "名詞・動詞" },
		{ jp: "加速", kana: "かそく", cn: "加速", en: "acceleration", pos: "名詞・動詞" },
		{ jp: "ゆるやか", cn: "平缓、缓慢", en: "gentle; gradual", pos: "な形" },
		{ jp: "谷", kana: "たに", cn: "山谷、低谷", en: "valley", pos: "名詞" },
		{ jp: "差し掛かる", kana: "さしかかる", cn: "临近、来到", en: "to approach", pos: "動詞" },
		{ jp: "理屈", kana: "りくつ", cn: "道理、理论", en: "reason; theory", pos: "名詞" },
		{ jp: "遠心力", kana: "えんしんりょく", cn: "离心力", en: "centrifugal force", pos: "名詞" },
		{ jp: "てっぺん", cn: "顶上、最高处", en: "the peak; the very top", pos: "名詞" },
	],

	grammar: [
		{
			pattern: "〜と考えられます",
			formation: "普通形 ＋ と考えられます",
			meaning: "可以认为……。论说文里提出判断时的委婉说法。",
			meaningEn: "it can be thought that…. A hedged judgment, common in editorials.",
			example: {
				jp: "{頂上|ちょうじょう}を{通過|つうか}するときは{後|うし}ろの{席|せき}のほうが{怖|こわ}いと{考|かんが}えられます。",
				cn: "通过顶点时，可以认为后面的座位更可怕。",
				en: "When passing the peak, the back seats are thought to be scarier.",
			},
		},
		{
			pattern: "〜に比べて",
			formation: "名詞 ＋ に比べて",
			meaning: "和……相比。",
			meaningEn: "compared with….",
			example: {
				jp: "{先頭車両|せんとうしゃりょう}に{比|くら}べて{速|はや}いスピードで{走|はし}り{抜|ぬ}ける。",
				cn: "以比头车更快的速度冲过去。",
				en: "They shoot through at a higher speed than the lead car.",
			},
		},
		{
			pattern: "〜というわけです",
			formation: "普通形 ＋ というわけです",
			meaning: "所以是这么回事。用来收束说明、点出原委。",
			meaningEn: "that is why… / that is how it is. Wraps up an explanation.",
			example: {
				jp: "{遅|おそ}いスピードで{通|とお}ることになるというわけです。",
				cn: "会以较慢的速度经过，也就是这么回事。",
				en: "That is why they pass through at a slower speed.",
			},
		},
	],
};
