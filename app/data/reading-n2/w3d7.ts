import type { ReadingDay } from "../reading-n3/types";

// 第3週 7日目 実戦問題 — printed pages 56–58
export const w3d7: ReadingDay = {
	week: 3,
	day: 7,
	label: "実戦問題",
	labelKana: "じっせんもんだい",
	labelEn: "Practice Exercise",
	printedPages: [56, 57, 58],
	answerSource: "book",

	practice: {
		timeLimitMinutes: 15,
		scoring: "1問25点×4問／100点",
		groups: [
			{
				label: "問題1",
				instruction:
					"{次|つぎ}の{文章|ぶんしょう}は「{相談者|そうだんしゃ}」からの{相談|そうだん}と、それに{対|たい}するAとBからの{回答|かいとう}である。{三|みっ}つの{文章|ぶんしょう}を{読|よ}んで、{後|あと}の{問|と}いに{対|たい}する{答|こた}えとして、{最|もっと}もよいものを1・2・3・4から{一|ひと}つ{選|えら}びなさい。",
				instructionCn:
					"下面的文章是「咨询者」的咨询以及 A 和 B 的回答。阅读这三篇文章，从 1・2・3・4 中选出最合适的一个作为后面问题的答案。",
				instructionEn:
					"The following texts are a query from a “consultor” and replies from A and B. Read the three texts and choose the best answer to each question from 1, 2, 3, or 4.",
				blocks: [
					{ type: "heading", jp: "{相談者|そうだんしゃ}：", cn: "咨询者：", en: "Consultor:" },
					{
						type: "paragraph",
						jp: "うちの{子|こ}は{小学校|しょうがっこう}に{入|はい}ってから、ご{飯|はん}を{食|た}べる{前|まえ}に「いただきます」と{言|い}うようになりました。うちではそんなことを{教|おし}えていなかったのに、{学校|がっこう}で{給食|きゅうしょく}のときにみんなで{言|い}わされているようなのです。「いただきます」だなんて、{食|た}べ{物|もの}を{学校|がっこう}からもらっているわけではありません。ちゃんと{給食費|きゅうしょくひ}を{払|はら}っているのに、なぜそんなことを{言|い}わされなければならないのか、{私|わたし}にはわかりません。{給食費|きゅうしょくひ}を{払|はら}っていない{家庭|かてい}があるそうですから、そういう{家|いえ}の{子|こ}にだけ「いただきます」と{言|い}わせればいいんじゃないかと{腹|はら}だたしく{思|おも}います。{学校|がっこう}に{抗議|こうぎ}しようと{思|おも}っているのですが、{私|わたし}は{間違|まちが}っていますか。",
						cn: "我家孩子上小学以后，开始在吃饭前说「我开动了」。家里并没有教过这个，好像是学校在吃营养午餐时让大家一起说的。什么「我开动了」，又不是从学校白拿食物。好好地交了伙食费，为什么非要被迫说那种话，我真不明白。听说也有不交伙食费的家庭，让那些家里的孩子说「我开动了」不就行了吗，越想越窝火。正打算向学校抗议，是我错了吗？",
						en: "Since starting elementary school, our child has begun saying “itadakimasu” before meals. We had never taught that at home; it seems they are made to say it all together at school lunch. “Itadakimasu”? It isn’t as if the food is being given by the school. We pay the lunch fees properly, so I don’t see why they have to be made to say that. I hear some families don’t pay the lunch fees, so why not make only those children say “itadakimasu”? It makes me angry. I’m thinking of protesting to the school — am I wrong?",
					},
					{ type: "heading", jp: "{回答者|かいとうしゃ}：A", cn: "回答者：A", en: "Replier: A" },
					{
						type: "paragraph",
						jp: "「いただきます」の{意味|いみ}をご{存|ぞん}じないとは{驚|おどろ}きました。{確|たし}かに、{人|ひと}から{何|なに}かをもらったときに「ありがとうございます。いただきます。」というふうにも{言|い}いますが、それとは{違|ちが}います。{私|わたし}たちは{植物|しょくぶつ}や{動物|どうぶつ}の{命|いのち}をいただいて{自分|じぶん}の{命|いのち}をつないでいます。ですから、{食|た}べる{前|まえ}にその{感謝|かんしゃ}の{心|こころ}を{表|あらわ}すために「いただきます」というのです。お{金|かね}を{払|はら}っているかどうかという{問題|もんだい}ではないのです。{学校|がっこう}が{強制的|きょうせいてき}に「いただきます」と{言|い}わなければ{絶対|ぜったい}にいけないと{言|い}わない{限|かぎ}り、{抗議|こうぎ}するほうが{間違|まちが}っていると{思|おも}います。",
						cn: "您居然不知道「いただきます」的意思，我很吃惊。的确，从别人那里拿到东西时也会说「谢谢。我收下了。」但那是另一回事。我们是领受植物和动物的生命来延续自己的生命。所以在吃之前，为了表达那份感谢之心才说「いただきます」。这不是有没有付钱的问题。只要学校没有强制说「不说『いただきます』就绝对不行」，我认为去抗议反而是错的。",
						en: "I am surprised you do not know what “itadakimasu” means. It is true that when you receive something from someone you also say “thank you; I will take it,” but this is different. We receive the lives of plants and animals and thereby keep our own lives going. So we say “itadakimasu” before eating in order to express that gratitude. It is not a question of whether you have paid. Unless the school is saying you absolutely must say “itadakimasu,” I think it is wrong to protest.",
					},
					{
						type: "paragraph",
						jp: "まずは、あなたが「いただきます」の{本当|ほんとう}の{意味|いみ}を{理解|りかい}すべきでしょう。",
						cn: "首先，您应当理解「いただきます」真正的意思。",
						en: "First of all, you should understand the true meaning of “itadakimasu.”",
					},
					{ type: "heading", jp: "{回答者|かいとうしゃ}：B", cn: "回答者：B", en: "Replier: B" },
					{
						type: "paragraph",
						jp: "あなたの{家|いえ}では{食|た}べるときに{何|なに}も{言|い}わないのですね。それはそれで{構|かま}わないと{思|おも}いますが「いただきます」は{挨拶|あいさつ}ですから、{学校|がっこう}で、「おはようございます」「さようなら」などと{同|おな}じように{言|い}うのは{普通|ふつう}のことです。{給食費|きゅうしょくひ}を{払|はら}っているかどうかとは{関係|かんけい}ないのです。",
						cn: "你们家吃饭时什么都不说，对吧。那样也没关系，但「いただきます」是一句招呼，所以在学校里和「早上好」「再见」一样说，是很普通的事。和有没有交伙食费没有关系。",
						en: "So at your house you say nothing when you eat. I think that is fine in itself, but “itadakimasu” is a greeting, so saying it at school the same way as “good morning” or “goodbye” is the usual thing. It has nothing to do with whether lunch fees are paid.",
					},
					{
						type: "paragraph",
						jp: "ちなみにうちでは「いただきます」とみんな{言|い}います。{本来|ほんらい}は{食|た}べ{物|もの}をいただける{感謝|かんしゃ}を{表|あらわ}した{表現|ひょうげん}だと{思|おも}いますが、どちらかというと{料理|りょうり}を{作|つく}ってくれた{人|ひと}や{食|た}べ{物|もの}を{用意|ようい}してくれた{人|ひと}への{感謝|かんしゃ}の{気持|きも}ちが{自然|しぜん}にわいてくることが{多|おお}いと{感|かん}じます。そういう{意味|いみ}でも{挨拶|あいさつ}というのは{悪|わる}くない{習慣|しゅうかん}だと{思|おも}いますし、あなたも{挨拶|あいさつ}だと{思|おも}えば{腹|はら}も{立|た}たないのではないでしょうか。",
						cn: "顺便说，我们家大家都说「いただきます」。本来这是表达能领受食物的感谢，但我觉得更多时候，是对做菜的人、准备食物的人的感谢之情自然涌出来。就这层意思来说，招呼也不是坏习惯；您要是把它当成招呼，大概就不会生气了吧。",
						en: "At our house, by the way, everyone says “itadakimasu.” I think originally it is an expression of thanks for being able to receive food, but if anything I often feel gratitude welling up naturally toward the person who cooked or who prepared the food. In that sense too I don’t think greeting is a bad custom, and if you think of it as a greeting, perhaps you would not get angry.",
					},
				],
				questions: [
					{
						label: "1",
						jp: "{相談者|そうだんしゃ}は、「いただきます」の{意味|いみ}をどう{理解|りかい}しているか。",
						cn: "咨询者是怎样理解「いただきます」的意思的？",
						en: "How does the consultor understand the meaning of “itadakimasu”?",
						choices: [
							{ jp: "{学校|がっこう}で{給食|きゅうしょく}を{食|た}べる{前|まえ}に{言|い}う{挨拶|あいさつ}の{表現|ひょうげん}である。", cn: "是在学校吃营养午餐前说的招呼用语。", en: "It is a greeting said before eating school lunch." },
							{ jp: "{人|ひと}からいただいたものに{対|たい}して{感謝|かんしゃ}する{表現|ひょうげん}である。", cn: "是对从别人那里得到的东西表示感谢的表达。", en: "It is an expression of thanks for something received from someone." },
							{ jp: "{給食費|きゅうしょくひ}を{払|はら}わない{場合|ばあい}に{言|い}う{挨拶|あいさつ}の{表現|ひょうげん}である。", cn: "是不交伙食费时说的招呼用语。", en: "It is a greeting said when lunch fees are not paid." },
							{ jp: "{料理|りょうり}を{作|つく}ってくれた{人|ひと}に{対|たい}して{感謝|かんしゃ}する{表現|ひょうげん}である。", cn: "是对做菜的人表示感谢的表达。", en: "It is an expression of thanks to the person who cooked." },
						],
						answer: 2,
						explanation:
							"咨询者说「食べ物を学校からもらっているわけではありません。ちゃんと給食費を払っているのに」——把「いただきます」当成「从别人手里收下东西」的感谢。正因为交了钱，才觉得不该说。所以 2 正确。1、4 是 A、B 的理解，不是咨询者的。3 是咨询者主张「只让没交费的孩子说」，不是她对词义的理解。",
						explanationEn:
							"The consultor says it is not as if the food is given by the school, and they pay the lunch fees — so she takes “itadakimasu” as thanks for receiving something from someone. That is why paying makes her feel they should not have to say it. 2 is correct. 1 and 4 are A’s and B’s readings, not hers. 3 is her proposal (“only the children who don’t pay”), not how she glosses the word.",
						choiceNotes: [
							"把「いただきます」当学校招呼，是 B 的看法，咨询者并不这么想。",
							"正确。她把这句话理解成「从学校白拿食物」时才该说的感谢。",
							"「只让没交费的说」是她的主张，不是她认为这个词本身的意思。",
							"对做菜的人感谢，是 B 后文的解释，不是咨询者的理解。",
						],
						choiceNotesEn: [
							"Taking it as a school greeting is B’s view, not the consultor’s.",
							"Correct. She reads it as thanks used when you are given food.",
							"“Only those who don’t pay should say it” is her proposal, not her definition of the word.",
							"Thanks to the cook is B’s later explanation, not the consultor’s understanding.",
						],
					},
					{
						label: "2",
						jp: "{相談者|そうだんしゃ}の{相談|そうだん}に{対|たい}するA、Bの{回答|かいとう}について{正|ただ}しいのはどれか。",
						cn: "关于 A、B 对咨询的回答，正确的是哪一项？",
						en: "Which is correct about A’s and B’s replies to the consultor?",
						choices: [
							{
								jp: "Aは{相談者|そうだんしゃ}が「いただきます」の{意味|いみ}を{理解|りかい}していないことに{驚|おどろ}き、Bは{相談者|そうだんしゃ}がその{表現|ひょうげん}を{使|つか}わないことに{驚|おどろ}いている。",
								cn: "A 对咨询者不理解「いただきます」的意思感到吃惊，B 对咨询者不用这个表达感到吃惊。",
								en: "A is surprised the consultor does not understand the meaning of “itadakimasu,” and B is surprised the consultor does not use the expression.",
							},
							{
								jp: "Aは{強制的|きょうせいてき}に「いただきます」を{言|い}わせる{学校|がっこう}に{抗議|こうぎ}すべきだと{言|い}い、Bは{挨拶|あいさつ}だと{考|かんが}えて{抗議|こうぎ}しないほうがいいと{言|い}っている。",
								cn: "A 说应当向强制让学生说「いただきます」的学校抗议，B 说应把它当成招呼、最好不要抗议。",
								en: "A says one should protest a school that forces children to say “itadakimasu,” and B says it is a greeting so it is better not to protest.",
							},
							{
								jp: "AもBも、{食事|しょくじ}の{前|まえ}にする「いただきます」という{表現|ひょうげん}の{意味|いみ}を{相談者|そうだんしゃ}が{正|ただ}しく{理解|りかい}すべきだと{言|い}っている。",
								cn: "A 和 B 都说咨询者应当正确理解饭前「いただきます」这一表达的意思。",
								en: "Both A and B say the consultor should correctly understand the meaning of “itadakimasu” said before a meal.",
							},
							{
								jp: "AもBも、{食事|しょくじ}の{前|まえ}の「いただきます」という{挨拶|あいさつ}を{家|いえ}でも{学校|がっこう}でも{子|こ}どもにもさせるべきだと{言|い}っている。",
								cn: "A 和 B 都说应当让孩子在家里和学校吃饭前都说「いただきます」这句招呼。",
								en: "Both A and B say children should be made to say the greeting “itadakimasu” before meals at home and at school.",
							},
						],
						answer: 3,
						explanation:
							"别册引用 A 的第 5–6 行：学校若没有强制到「不说就不行」，抗议反而是错的。A 明确写「まずは、あなたが『いただきます』の本当の意味を理解すべきでしょう」。B 也解释本义是感谢，并说「挨拶だと思えば腹も立たない」——两边都要求咨询者先正确理解这句话。选 3。1 的后半错：B 写「それはそれで構わない」，并不吃惊。2 的前半反了：A 认为抗议是错的。4：双方都没有说家里也必须让孩子说。",
						explanationEn:
							"The answer key quotes A, lines 5–6: unless the school treats it as absolutely compulsory, protesting is wrong. A also writes “you should understand the true meaning.” B explains the original sense as thanks and says “if you think of it as a greeting you would not get angry” — both want the consultor to understand the expression correctly. Choose 3. The second half of 1 is wrong: B says “that is fine in itself,” and is not surprised. The first half of 2 is backwards: A thinks protest is wrong. 4: neither says children must be made to say it at home as well.",
						choiceNotes: [
							"A 的确吃惊；B 说家里不说也没关系，并没有吃惊。",
							"A 认为抗议是错的，不是「应该抗议」。",
							"正确。A、B 都要求咨询者先理解「いただきます」的意思。",
							"谁都没有主张家里也必须让孩子说。",
						],
						choiceNotesEn: [
							"A is surprised; B says not saying it at home is fine, and is not surprised.",
							"A thinks protest is wrong, not that one should protest.",
							"Correct. Both A and B want the consultor to understand “itadakimasu.”",
							"Neither claims children must be made to say it at home as well.",
						],
					},
				],
			},
			{
				label: "問題2",
				instruction:
					"{次|つぎ}の{文章|ぶんしょう}を{読|よ}んで、{後|あと}の{問|と}いに{対|たい}する{答|こた}えとして{最|もっと}もよいものを1・2・3・4から{一|ひと}つ{選|えら}びなさい。",
				instructionCn:
					"阅读下面的文章，从 1・2・3・4 中选出最合适的一个作为后面问题的答案。",
				instructionEn:
					"Read the following text and choose the best answer to each question from 1, 2, 3, or 4.",
				blocks: [
					{
						type: "paragraph",
						indent: true,
						jp: "{教|おし}えられたことをおぼえるだけなら、{電子計算機|でんしけいさんき}はみんなおぼえちゃうよ。よくおぼえたものは{成績|せいせき}がいいなんて、コケなこと（注1）だな。{学校|がっこう}の{成績|せいせき}がいいやつで、{仕事|しごと}のできないやつがたくさんいるんでね、おかしいと{思|おも}って、{医務室|いむしつ}へいってきたんです。{脳|のう}の{構造|こうぞう}はね、{考|かんが}えるところが{大脳|だいのう}で、{運動神経|うんどうしんけい}を{扱|あつか}っているのが{小脳|しょうのう}。ものをおぼえるところ、{電子計算機|でんしけいさんき}のコンピュータの{役目|やくめ}のところは、どのくらいの{大|おお}きさだったいったら、この{脳|のう}のなかで{親指|おやゆび}ぐらいのもんだそうだ。してみると、{親指|おやゆび}ぐらいのものが{成熟|せいじゅく}したか、せんかで（注2）、{成績|せいせき}がいい、{悪|わる}いなんて{答|こた}えを{出|だ}すのは{僭越|せんえつ}（注3）だね。いまの{学校|がっこう}はその{答|こた}を{出|だ}して{人間|にんげん}の{一生|いっしょう}を{左右|さゆう}しちまう（注4）。",
						cn: "如果只是记住别人教的东西，电子计算机全能记住。记住了成绩就好，那可真是蠢话。学校成绩好却不会干活的人多得很。我觉得奇怪，就去了医务室。脑子的构造呢，思考的地方是大脑，管运动神经的是小脑。记东西的地方、起电子计算机那种作用的部分，有多大呢，听说只是脑子里大拇指那么一块。这么看来，只凭大拇指那么大的一块成熟了没有，就给出成绩好还是坏的答案，未免僭越。如今的学校给出那个答案，就把人的一生左右了。",
						en: "If it is only a matter of remembering what you were taught, electronic computers remember it all. Saying that people who remember well get good grades is a foolish thing. There are plenty of people with good school grades who can’t do the job, you know. I thought that was odd, so I went along to the infirmary. The structure of the brain: the thinking part is the cerebrum, and the cerebellum handles the motor nerves. The part that remembers things, the part that does the job of an electronic computer — how big is it? They say it’s about the size of a thumb in this brain. That being so, it is presumptuous to give an answer of good grades or bad according to whether something the size of a thumb has matured or not. Schools today give that answer and end up deciding a person’s whole life.",
					},
					{
						type: "source",
						jp: "（PHP{研究所編|けんきゅうしょへん}『{本田宗一郎|ほんだそういちろう}「{一日一話|いちにちいちわ}」——『{独創|どくそう}』に{賭|か}ける{男|おとこ}の{哲学|てつがく}』PHP{研究所|けんきゅうしょ}）",
						cn: "（PHP 研究所编《本田宗一郎「一日一话」——赌上「独创」的男人的哲学》PHP 研究所）",
						en: "(PHP Institute, ed., Honda Sōichirō: “One Story a Day” — The Philosophy of a Man Who Gambled on Originality, PHP Institute)",
					},
				],
				footnotes: [
					{ marker: "（注1）", term: "コケなこと", jp: "コケなこと", cn: "愚蠢的事", en: "a foolish thing" },
					{ marker: "（注2）", term: "せんかで", jp: "せんかで", cn: "＝しないかで", en: "or not" },
					{ marker: "（注3）", term: "僭越", jp: "せんえつ", cn: "超出自己的能力或权限", en: "going beyond one’s power or authority" },
					{ marker: "（注4）", term: "しちまう", jp: "しちまう", cn: "＝してしまう", en: "ends up doing" },
				],
				questions: [
					{
						label: "3",
						jp: "その{答|こた}を{出|だ}してとはどういう{意味|いみ}か。",
						cn: "「给出那个答案」是什么意思？",
						en: "What does “giving that answer” mean?",
						choices: [
							{ jp: "{成績|せいせき}がいいか{悪|わる}いか{決|き}めて", cn: "判定成绩好还是坏", en: "deciding whether grades are good or bad" },
							{ jp: "{覚|おぼ}える{部分|ぶぶん}の{脳|のう}の{大|おお}きさをはかって", cn: "测量负责记忆的那部分脑子有多大", en: "measuring how big the memory part of the brain is" },
							{ jp: "{学校|がっこう}の{成績|せいせき}がいい{人|ひと}がなぜ{仕事|しごと}ができないか{聞|き}いて", cn: "去问为什么学校成绩好的人却不会干活", en: "asking why people with good school grades cannot do the job" },
							{ jp: "{人間|にんげん}の{一生|いっしょう}を{左右|さゆう}するかどうか{考|かんが}えて", cn: "思考会不会左右人的一生", en: "considering whether it will decide a person’s whole life" },
						],
						answer: 1,
						explanation:
							"别册引用第 6–7 行：「親指ぐらいのものが成熟したか、せんかで、成績がいい、悪いなんて答えを出すのは僭越だ」。「その答」就是这个「成绩好还是坏」的判定。选 1。后面「いまの学校はその答を出して人間の一生を左右しちまう」是「给出那个判定」带来的结果，不是「その答」本身的意思。",
						explanationEn:
							"The answer key quotes lines 6–7: it is presumptuous to give an answer of good grades or bad according to whether something thumb-sized has matured. “That answer” is this judgment of good vs bad grades. Choose 1. “Schools give that answer and end up deciding a person’s whole life” is the result of giving the judgment, not the meaning of “that answer” itself.",
						choiceNotes: [
							"正确。「答えを出す」＝判定成绩好坏。",
							"「拇指大小」是在说明记忆部位很小，不是「その答」的内容。",
							"去医务室是笔者自己的行动，不是学校「给出答案」。",
							"「左右一生」是给出成绩判定之后的结果，不是「答」本身。",
						],
						choiceNotesEn: [
							"Correct. “Give an answer” = decide good grades vs bad.",
							"“Thumb-sized” explains how small the memory part is, not what “that answer” is.",
							"Going to the infirmary is the writer’s own action, not the school “giving an answer.”",
							"“Deciding a whole life” is what happens after the grade is given, not the answer itself.",
						],
					},
					{
						label: "4",
						jp: "この{文章|ぶんしょう}で{筆者|ひっしゃ}が{言|い}いたいことは{何|なに}か。",
						cn: "这篇文章里笔者想说的是什么？",
						en: "What does the writer want to say in this text?",
						choices: [
							{ jp: "{人間|にんげん}の{脳|のう}はおぼえるだけの{電子計算機|でんしけいさんき}に{比|くら}べてはるかにすばらしい。", cn: "人脑比起只会记忆的电子计算机要出色得多。", en: "The human brain is far superior to an electronic computer that only remembers." },
							{ jp: "{仕事|しごと}ができるかどうかは{脳|のう}のどの{部分|ぶぶん}で{考|かんが}えているかによる。", cn: "会不会干活取决于用脑子的哪一部分思考。", en: "Whether you can do a job depends on which part of the brain you think with." },
							{ jp: "{脳|のう}のなかで{重要|じゅうよう}な{働|はたら}きをする{部分|ぶぶん}は{意外|いがい}に{小|ちい}さい。", cn: "脑子里起重要作用的部分意外地小。", en: "The part of the brain that does the important work is surprisingly small." },
							{ jp: "おぼえることだけを{重視|じゅうし}した{現在|げんざい}の{学校|がっこう}{教育|きょういく}のあり{方|かた}はおかしい。", cn: "只重视记忆的现行学校教育的做法是不对的。", en: "The way school education is now, putting weight only on remembering, is wrong." },
						],
						answer: 4,
						explanation:
							"开头就说「おぼえるだけなら計算機のほうが上」「よくおぼえた＝成績がいいなんてコケなこと」，结尾「学校がその答で一生を左右しちまう」。贯穿全文的主张是：只凭记忆部位（拇指大）来判成绩、并拿它左右一生，这样的教育很荒唐。选 4。1 把人脑和计算机对比说成人脑更出色，不是主旨。3 把「拇指大的记忆部位」误当成「重要的部分」——笔者正是说不该拿这么小的记忆功能当标准。",
						explanationEn:
							"It opens with “if it’s only remembering, computers are better” and “good memory = good grades is foolish,” and closes with schools deciding a whole life by that answer. The claim through the whole text is that judging by the memory part (thumb-sized) and letting that steer a life is an absurd kind of education. Choose 4. 1 turns the computer comparison into “the brain is far superior,” which is not the point. 3 mistakes the thumb-sized memory part for “the important part” — the writer’s point is that you should not use that small memory function as the standard.",
						choiceNotes: [
							"计算机能记，是为了说明「只记没有意义」，不是在赞美人脑更出色。",
							"大脑／小脑的分工是说明，主旨不是「会干活取决于哪一部分」。",
							"拇指大的是记忆部位，笔者认为拿它判人是僭越，并不是说「重要部分很小」。",
							"正确。只重视记忆的学校教育，正是全文在批评的。",
						],
						choiceNotesEn: [
							"That computers can remember is there to show “remembering alone is meaningless,” not to praise the human brain.",
							"Cerebrum vs cerebellum is background, not “ability to work depends on which part.”",
							"The thumb-sized part is memory; using it to judge people is what he calls presumptuous — not “the important part is small.”",
							"Correct. Schooling that values only remembering is what the whole passage attacks.",
						],
					},
				],
			},
		],
	},

	vocab: [
		{ jp: "相談者", kana: "そうだんしゃ", cn: "咨询者", en: "consultor; the person asking for advice", pos: "名詞" },
		{ jp: "給食", kana: "きゅうしょく", cn: "（学校）营养午餐", en: "school lunch", pos: "名詞" },
		{ jp: "給食費", kana: "きゅうしょくひ", cn: "伙食费", en: "lunch fees", pos: "名詞" },
		{ jp: "腹だたしい", kana: "はらだたしい", cn: "令人生气", en: "infuriating; maddening", pos: "い形" },
		{ jp: "抗議", kana: "こうぎ", cn: "抗议", en: "protest", pos: "名詞・動詞" },
		{ jp: "強制的", kana: "きょうせいてき", cn: "强制的", en: "compulsory; forced", pos: "な形" },
		{ jp: "挨拶", kana: "あいさつ", cn: "招呼、寒暄", en: "greeting", pos: "名詞" },
		{ jp: "習慣", kana: "しゅうかん", cn: "习惯", en: "custom; habit", pos: "名詞" },
		{ jp: "電子計算機", kana: "でんしけいさんき", cn: "电子计算机", en: "electronic computer", pos: "名詞" },
		{ jp: "医務室", kana: "いむしつ", cn: "医务室", en: "infirmary; medical office", pos: "名詞" },
		{ jp: "大脳", kana: "だいのう", cn: "大脑", en: "cerebrum", pos: "名詞" },
		{ jp: "小脳", kana: "しょうのう", cn: "小脑", en: "cerebellum", pos: "名詞" },
		{ jp: "運動神経", kana: "うんどうしんけい", cn: "运动神经", en: "motor nerves", pos: "名詞" },
		{ jp: "親指", kana: "おやゆび", cn: "大拇指", en: "thumb", pos: "名詞" },
		{ jp: "成熟", kana: "せいじゅく", cn: "成熟", en: "maturity; to mature", pos: "名詞・動詞" },
		{ jp: "僭越", kana: "せんえつ", cn: "僭越、越分", en: "presumption; going too far", pos: "名詞・な形" },
		{ jp: "左右する", kana: "さゆうする", cn: "左右、支配", en: "to decide; to hold sway over", pos: "動詞" },
		{ jp: "あり方", kana: "ありかた", cn: "应有的状态、做法", en: "the way something is (or ought to be)", pos: "名詞" },
	],

	grammar: [
		{
			pattern: "〜わけではない",
			formation: "普通形＋わけではない",
			meaning: "并不是……。咨询者用来否定「从学校白拿食物」。",
			meaningEn: "it is not the case that….",
			example: {
				jp: "{食|た}べ{物|もの}を{学校|がっこう}からもらっているわけではありません。",
				cn: "并不是从学校白拿食物。",
				en: "It isn’t as if the food is being given by the school.",
			},
		},
		{
			pattern: "〜ない限り",
			formation: "動詞ない形＋ない限り",
			meaning: "只要不……就……／除非……。",
			meaningEn: "unless…; as long as … not….",
			example: {
				jp: "{言|い}わなければ{絶対|ぜったい}にいけないと{言|い}わない{限|かぎ}り、{抗議|こうぎ}するほうが{間違|まちが}っている。",
				cn: "除非说「不说就不行」，否则去抗议反而是错的。",
				en: "Unless they say you absolutely must say it, it is wrong to protest.",
			},
		},
		{
			pattern: "〜べきだ",
			formation: "動詞辞書形＋べきだ",
			meaning: "应该……。",
			meaningEn: "should; ought to.",
			example: {
				jp: "あなたが「いただきます」の{本当|ほんとう}の{意味|いみ}を{理解|りかい}すべきでしょう。",
				cn: "您应当理解「いただきます」真正的意思。",
				en: "You should understand the true meaning of “itadakimasu.”",
			},
		},
	],
};
