import type { ReadingDay } from "../reading-n3/types";

// 第6週 7日目 実戦問題 — printed pages 108–111
export const w6d7: ReadingDay = {
	week: 6,
	day: 7,
	label: "実戦問題",
	labelKana: "じっせんもんだい",
	labelEn: "Practice Exercise",
	printedPages: [108, 109, 110, 111],
	answerSource: "book",

	practice: {
		timeLimitMinutes: 20,
		scoring: "問題1：1問10点×4問　問題2：1問15点×4問／100点",
		groups: [
			{
				label: "問題1（1）",
				instruction:
					"{次|つぎ}の（1）から（2）の{文章|ぶんしょう}を{読|よ}んで、{後|あと}の{問|と}いに{対|たい}する{答|こた}えとして{最|もっと}もよいものを1・2・3・4から{一|ひと}つ{選|えら}びなさい。",
				instructionCn:
					"阅读下面（1）到（2）的文章，从 1・2・3・4 中选出作为后面问题答案最合适的一个。（答案在别册 p.7〜8）",
				instructionEn:
					"Read passages (1) through (2) below and choose the best answer to each question from 1, 2, 3, or 4. (Answers are in the separate booklet, pp. 7–8.)",
				blocks: [
					{
						type: "heading",
						jp: "（1）",
						cn: "（1）",
						en: "(1)",
					},
					{
						type: "paragraph",
						indent: true,
						jp: "もし、あなたが{草原|そうげん}にいて{目|め}の{前|まえ}に{猛獣|もうじゅう}（{注|ちゅう}1）が{現|あらわ}れたとしたら、{人間|にんげん}の{自然|しぜん}な{行動|こうどう}として{全力|ぜんりょく}で{逃|に}げ{出|だ}すだろう。しかし、{逃|に}げ{出|だ}すのはかえって{危険|きけん}になり、いちばん{身近|みぢか}な{木|き}に{登|のぼ}って{待|ま}つのがよい{場合|ばあい}もある。",
						cn: "假如你在草原上，眼前突然出现猛兽（注1），作为人类的自然反应大概会全力逃走。可是逃走反而可能更危险，有时爬上最近的树等待才更好。",
						en: "If you were on a grassland and a fierce beast (note 1) appeared in front of you, as a natural human action you would probably flee with all your might. But fleeing can actually become more dangerous, and sometimes it is better to climb the nearest tree and wait.",
					},
					{
						type: "paragraph",
						indent: true,
						jp: "{私|わたし}たち{人間|にんげん}は、このようなときその{場|ば}の{状況|じょうきょう}をとっさに（{注|ちゅう}2）{判断|はんだん}し、{正|ただ}しく{行動|こうどう}するという{知恵|ちえ}を{働|はたら}かせなければならない。このことは、{毎日|まいにち}の{生活|せいかつ}についても{言|い}えることである。{例|たと}えば、おふろにお{湯|ゆ}を{貯|た}めるとき、{人|ひと}が{入|はい}ってもあふれないように{水|みず}の{量|りょう}を{加減|かげん}しなければならない。お{客|きゃく}さんの{来|く}る{時間|じかん}に{合|あ}わせて{料理|りょうり}を{用意|ようい}しなければならない。つまり、やろうとしていることの{目的|もくてき}を{考慮|こうりょ}に{入|い}れておくという{基本的|きほんてき}な{知恵|ちえ}が{必要|ひつよう}なのだ。",
						cn: "我们人类在这种时候必须运用智慧，当场立刻（注2）判断状况并正确行动。这件事在每天的生活里也同样说得通。比如往浴缸里放热水时，必须调节水量，以免人进去后溢出来。必须配合客人到来的时间准备好饭菜。也就是说，需要把打算做的事情的目的事先考虑进去——这种基本的智慧。",
						en: "We humans must, at such times, exercise the wisdom of judging the situation on the spot in an instant (note 2) and acting correctly. The same can be said of everyday life. For example, when you fill a bath, you have to adjust the amount of water so it will not overflow when someone gets in. You have to prepare food to match the time a guest will arrive. In other words, the basic wisdom of keeping in mind the purpose of what you are trying to do is necessary.",
					},
				],
				footnotes: [
					{
						marker: "（注1）",
						term: "猛獣",
						jp: "肉食の、性質が荒々しい動物",
						cn: "食肉的、性情凶猛的动物",
						en: "a carnivorous animal with a fierce nature",
					},
					{
						marker: "（注2）",
						term: "とっさに",
						jp: "ほんの少しの間に",
						cn: "刹那间、立刻",
						en: "in an instant; on the spur of the moment",
					},
				],
				questions: [
					{
						label: "1",
						jp: "このようなときとはどんなときか。",
						cn: "「这种时候」是怎样的时候？",
						en: "What kind of time is “such times”?",
						choices: [
							{ jp: "{危険|きけん}を{感|かん}じたとき", cn: "感到危险的时候", en: "when you sense danger" },
							{ jp: "{草原|そうげん}にいるとき", cn: "在草原上的时候", en: "when you are on a grassland" },
							{ jp: "{木|き}に{登|のぼ}っているとき", cn: "爬在树上的时候", en: "when you are up a tree" },
							{ jp: "{日常生活|にちじょうせいかつ}を{送|おく}るとき", cn: "过日常生活的时候", en: "when you are living daily life" },
						],
						answer: 1,
						explanation:
							"「このようなとき」承接上一段：眼前出现猛兽、逃走反而危险——也就是感到危险、必须当场判断的时候。下一句才说「このことは、毎日の生活についても言える」，所以不是 4。2、3 只是例子里的场景，不是指示词所指。",
						explanationEn:
							"このようなとき picks up the previous paragraph: a beast appears, fleeing may be more dangerous — i.e. when you sense danger and must judge on the spot. Only the next sentence says this also applies to daily life, so not 4. 2 and 3 are scenery in the example, not what the demonstrative refers to.",
						choiceNotes: [
							"正确。指感到危险、必须立刻判断行动的时候。",
							"草原只是举例的场所。",
							"爬树是有时更好的对策，不是「这种时候」本身。",
							"日常生活是把同一智慧推而广之的对象，不是指示词所指。",
						],
						choiceNotesEn: [
							"Correct. It means when you sense danger and must judge and act at once.",
							"The grassland is only the setting of the example.",
							"Climbing a tree is sometimes the better move, not “such times” itself.",
							"Daily life is what the same wisdom is extended to, not what the demonstrative points to.",
						],
					},
					{
						label: "2",
						jp: "この{文章|ぶんしょう}で{筆者|ひっしゃ}は{何|なに}を{言|い}いたいのか。",
						cn: "在这篇文章里，笔者想说的是什么？",
						en: "What does the writer want to say in this passage?",
						choices: [
							{
								jp: "{危険|きけん}を{感|かん}じたときの{行動|こうどう}の{仕方|しかた}を{学|まな}ぶべきだ。",
								cn: "应该学习感到危险时的行动方式。",
								en: "One should learn how to act when sensing danger.",
							},
							{
								jp: "{状況判断|じょうきょうはんだん}を{間違|まちが}えると{危険|きけん}である。",
								cn: "状况判断一旦出错就危险。",
								en: "A wrong judgment of the situation is dangerous.",
							},
							{
								jp: "{日常生活|にちじょうせいかつ}を{送|おく}るうえで、{知恵|ちえ}を{働|はたら}かせることが{必要|ひつよう}だ。",
								cn: "在过日常生活时，有必要运用智慧。",
								en: "In going about daily life, it is necessary to exercise wisdom.",
							},
							{
								jp: "{目的|もくてき}をもって{日常生活|にちじょうせいかつ}を{送|おく}るべきだ。",
								cn: "应该带着目的过日常生活。",
								en: "One should live daily life with a purpose.",
							},
						],
						answer: 3,
						explanation:
							"别册：看最后一句「やろうとしていることの目的を考慮に入れておくという基本的な知恵が必要なのだ」。前半猛兽是例子，后半泡澡、准备饭菜也是例子。「知恵」是关键词。所以主张是：过日常生活也要运用智慧。1、2 停在例子上。4 把「把目的考虑进去」说成「带着目的生活」，重心从「知恵」滑到了「目的」。",
						explanationEn:
							"The booklet points to the last sentence: the basic wisdom of keeping the purpose of what you are trying to do in mind is necessary. The beast is an example; the bath and the cooking are further examples. 知恵 is the key word. So the claim is that we need to exercise wisdom in daily life too. 1 and 2 stop at the example. 4 slides the focus from wisdom onto “living with a purpose.”",
						choiceNotes: [
							"猛兽段只是例子，不是全文主张。",
							"文中没有说判断错就危险这一句作为结论。",
							"正确。日常生活里也要运用基本的智慧。",
							"「目的を考慮に入れておく」是智慧的内容，不是「应该带着目的生活」。",
						],
						choiceNotesEn: [
							"The beast paragraph is only an example, not the whole claim.",
							"The conclusion is not “a wrong judgment is dangerous.”",
							"Correct. We also need to exercise basic wisdom in daily life.",
							"“Keep the purpose in mind” is the content of that wisdom, not “live with a purpose.”",
						],
					},
				],
			},
			{
				label: "問題1（2）",
				instruction:
					"{次|つぎ}の{文章|ぶんしょう}を{読|よ}んで、{後|あと}の{問|と}いに{対|たい}する{答|こた}えとして{最|もっと}もよいものを1・2・3・4から{一|ひと}つ{選|えら}びなさい。",
				instructionCn: "阅读下面的文章，从 1・2・3・4 中选出作为后面问题答案最合适的一个。",
				instructionEn:
					"Read the following passage and choose the best answer to each question from 1, 2, 3, or 4.",
				blocks: [
					{
						type: "heading",
						jp: "（2）",
						cn: "（2）",
						en: "(2)",
					},
					{
						type: "paragraph",
						indent: true,
						jp: "スピーチをする{際|さい}に{困|こま}るのは、{自分|じぶん}がしゃべっているうちに{会場|かいじょう}が{白|しら}けて（{注|ちゅう}1）しまうこと。こうなるとよけいに{緊張|きんちょう}が{高|たか}まって、スピーチがしどろもどろ（{注|ちゅう}2）になってしまう。こんなときにかねてから（{注|ちゅう}3）{用意|ようい}しておいた①「{笑|わら}いのツボ」、つまり{絶対|ぜったい}にウケる{話|はなし}をすれば{会場|かいじょう}が{一気|いっき}になごみ（{注|ちゅう}4）、{話|はなし}を{聞|き}いてもらえる{環境|かんきょう}を{作|つく}ることができる。",
						cn: "做演讲时最为难的，是自己讲着讲着会场就冷了场（注1）。这样一来会更加紧张，演讲变得结结巴巴（注2）。这种时候如果抛出事先（注3）准备好的①「笑点」，也就是绝对能逗乐的话，会场会一下子缓和下来（注4），就能造出别人愿意听你讲的环境。",
						en: "What is awkward when giving a speech is the hall going cold (note 1) while you are still talking. Then the tension rises further, and the speech becomes a stammering mess (note 2). At such a time, if you use a ① “punch line for laughter” you had prepared beforehand (note 3) — that is, a bit that is guaranteed to go over — the hall warms all at once (note 4), and you can create an environment in which people will listen.",
					},
					{
						type: "paragraph",
						indent: true,
						jp: "といっても{普通|ふつう}の{人|ひと}はスピーチや{挨拶|あいさつ}をする{機会|きかい}はそんなに{多|おお}くないので、「ウケるパターン」を{体|からだ}で{覚|おぼ}えるところまではいかないという{人|ひと}もいるだろう。",
						cn: "话虽如此，普通人做演讲或致辞的机会并不那么多，所以也有人觉得，还达不到把「能逗乐的套路」练到身体记住的程度。",
						en: "That said, ordinary people do not get that many chances to give a speech or a greeting, so some will say they never get as far as learning a “pattern that goes over” by body.",
					},
					{
						type: "paragraph",
						indent: true,
						jp: "しかし、しゃべりというのは{何|なに}もパーティー{会場|かいじょう}だけでするものではなく、{会社|かいしゃ}の{朝礼|ちょうれい}（{注|ちゅう}5）や{取引先|とりひきさき}（{注|ちゅう}6）との{会話|かいわ}など{普段|ふだん}からしているもの。{日頃|ひごろ}の{会話|かいわ}の{中|なか}でも、{自分|じぶん}のネタ（{注|ちゅう}7）がウケているかどうかを{客観的|きゃっかんてき}に（{注|ちゅう}8）{判断|はんだん}するように{意識|いしき}することが{肝心|かんじん}である（{注|ちゅう}9）。",
						cn: "但是，说话绝不是只在派对会场才做的事，公司早会（注5）、和客户（注6）交谈等平时就在做。在日常对话里也要有意识地、客观地（注8）判断自己的段子（注7）是否受欢迎——这一点才是关键（注9）。",
						en: "But talking is by no means something you do only at a party: it is something you already do day to day, at the morning meeting (note 5) at work and in conversation with clients (note 6). Even in everyday conversation, the crucial thing (note 9) is to make a point of judging objectively (note 8) whether your own material (note 7) is going over.",
					},
					{
						type: "paragraph",
						indent: true,
						jp: "そして、{少|すこ}しでもウケたネタがあったら、それを{何回|なんかい}か{使|つか}ってブラッシュアップ（{注|ちゅう}10）し、{絶対|ぜったい}にウケるネタに{仕上|しあ}げていく。そうすれば、②スピーチに{自信|じしん}が{持|も}てるようになる。",
						cn: "然后，只要有稍微受欢迎的段子，就多用几次加以打磨（注10），加工成绝对能逗乐的段子。这样一来，②对演讲就能有自信了。",
						en: "Then, if you have even a little material that went over, use it a few times, brush it up (note 10), and finish it into a bit that is guaranteed to work. Do that, and ② you will come to have confidence in your speeches.",
					},
					{
						type: "source",
						jp: "（{高嶋秀武|たかしまひでたけ}『{話|はなし}のおもしろい{人|ひと}、つまらない{人|ひと}』PHP{研究所|けんきゅうしょ}）",
						cn: "（高嶋秀武《说话有趣的人、无趣的人》PHP 研究所）",
						en: "(Hidetake Takashima, People Whose Talk Is Interesting and People Whose Talk Is Dull, PHP Institute)",
					},
				],
				footnotes: [
					{ marker: "（注1）", term: "白ける", jp: "気まずくなる", cn: "冷场、气氛尴尬", en: "to go awkward / fall flat" },
					{
						marker: "（注2）",
						term: "しどろもどろ",
						jp: "話し方がきちんとしていない様子",
						cn: "结结巴巴、语无伦次",
						en: "in a stammering, disjointed way",
					},
					{ marker: "（注3）", term: "かねてから", jp: "前から", cn: "事先、早就", en: "beforehand; for some time" },
					{
						marker: "（注4）",
						term: "一気になごむ",
						jp: "急に雰囲気がよくなる",
						cn: "气氛一下子缓和下来",
						en: "the atmosphere suddenly warms",
					},
					{
						marker: "（注5）",
						term: "朝礼",
						jp: "朝、授業や仕事を始める前にする集まり",
						cn: "早会、上课或上班前的集合",
						en: "morning assembly (before class or work)",
					},
					{
						marker: "（注6）",
						term: "取引先",
						jp: "会社が商売する相手",
						cn: "客户、生意往来对象",
						en: "a business client / counterpart",
					},
					{
						marker: "（注7）",
						term: "ネタ",
						jp: "（この場合）話の材料",
						cn: "（此处）谈话的材料、段子",
						en: "(here) material for a story",
					},
					{
						marker: "（注8）",
						term: "客観的に",
						jp: "ほかの人から見てもそうだと思われるように",
						cn: "客观地、从旁人看来也如此",
						en: "objectively; as others would also see it",
					},
					{ marker: "（注9）", term: "肝心である", jp: "とても大切である", cn: "至关重要", en: "is of crucial importance" },
					{
						marker: "（注10）",
						term: "ブラッシュアップ",
						jp: "さらに良くすること（brush up）",
						cn: "打磨、进一步提高",
						en: "to brush up; to improve further",
					},
				],
				questions: [
					{
						label: "3",
						jp: "①「{笑|わら}いのツボ」とあるが、ここではどういうことか。",
						cn: "①「笑点」在这里是什么意思？",
						en: "① “笑いのツボ” — what does it mean here?",
						choices: [
							{
								jp: "みんなが{笑|わら}えるような{環境|かんきょう}",
								cn: "大家都能笑的环境",
								en: "an environment in which everyone can laugh",
							},
							{
								jp: "おもしろい{話|はなし}を{聞|き}いている{人|ひと}の{笑|わら}い{声|ごえ}",
								cn: "听有趣的话的人的笑声",
								en: "the laughter of people listening to a funny story",
							},
							{
								jp: "みんなが{白|しら}けた{話|はなし}",
								cn: "让大家都冷了场的话",
								en: "a story that made everyone go cold",
							},
							{
								jp: "みんなの{反応|はんのう}がよかった{話|はなし}",
								cn: "大家反应很好的话",
								en: "a story that got a good reaction from everyone",
							},
						],
						answer: 4,
						explanation:
							"别册指向 7〜8 行：「しゃべりというのは何もパーティー会場だけでするものではなく、会社の朝礼や取引先との会話など普段からしているもの。」紧接着把「笑いのツボ」解释为「つまり絶対にウケる話」。ウケる＝大家反应好。所以是「反应很好的话」，不是环境、也不是笑声本身。3 正相反。",
						explanationEn:
							"The booklet cites the lines that talking is not only for parties. Right there, 笑いのツボ is glossed as “a bit that is guaranteed to go over.” ウケる = it got a good reaction. So it is a story that landed well — not the environment, and not the sound of laughter. 3 is the opposite.",
						choiceNotes: [
							"「環境」是用了笑点之后造出来的结果，不是笑点本身。",
							"笑点是那句话，不是听众的笑声。",
							"白けた話正是要避免的，与笑点相反。",
							"正确。绝对能逗乐、大家反应好的那句话。",
						],
						choiceNotesEn: [
							"The “environment” is the result of using the punch line, not the punch line itself.",
							"The punch line is the bit, not the listeners’ laughter.",
							"A story that fell flat is what you want to avoid — the opposite.",
							"Correct. A bit that is guaranteed to go over, that got a good reaction.",
						],
					},
					{
						label: "4",
						jp: "②スピーチに{自信|じしん}が{持|も}てるようになるためには、どうすればいいか。",
						cn: "要变得对演讲有自信，应该怎么做？",
						en: "What should you do in order to come to have confidence in your speeches?",
						choices: [
							{
								jp: "みんなの{反応|はんのう}がよかった{話|はなし}をさらによくしていくように{訓練|くんれん}する。",
								cn: "把大家反应好的话再进一步练好。",
								en: "Train so as to make still better the stories that got a good reaction.",
							},
							{
								jp: "{会社|かいしゃ}などで{成功|せいこう}するように{努力|どりょく}する。",
								cn: "努力在公司等场合取得成功。",
								en: "Work so as to succeed at the company and elsewhere.",
							},
							{
								jp: "{緊張|きんちょう}しないように{体|からだ}の{訓練|くんれん}をする。",
								cn: "做身体训练以便不紧张。",
								en: "Do physical training so as not to get nervous.",
							},
							{
								jp: "スピーチをするとき、{話|はなし}が{途中|とちゅう}で{止|と}まらないように{努力|どりょく}する。",
								cn: "做演讲时努力不让话在中途停住。",
								en: "When giving a speech, try not to let the talk stop halfway.",
							},
						],
						answer: 1,
						explanation:
							"别册 8〜9 行：「日頃の会話の中でも、自分のネタがウケているかどうかを客観的に判断するように意識することが肝心である。」下一句：稍微受欢迎的段子就多用几次打磨，加工成绝对能逗乐的段子，这样就能对演讲有自信。所以是把反应好的话再练好。2 公司只是日常练习的场所。3 「体で覚える」不是体育锻炼。4 中途停住是冷场的结果，不是训练方法。",
						explanationEn:
							"The booklet cites: even in everyday talk, the crucial thing is to judge objectively whether your material is going over. Next: take bits that went over even a little, use them, brush them up, finish them into guaranteed material — then you will have confidence. So: train the stories that already landed. 2: the office is only a place to practice daily. 3: 体で覚える is not physical exercise. 4: stopping halfway is the result of the hall going cold, not the training method.",
						choiceNotes: [
							"正确。把日常里反应好的段子打磨成绝对能逗乐的话。",
							"公司早会等只是练习说话的日常场合，不是「在公司成功」。",
							"「体で覚える」指练到成为习惯，不是防紧张的体育锻炼。",
							"话在中途停住是冷场之后的结果，不是获得自信的方法。",
						],
						choiceNotesEn: [
							"Correct. Brush up everyday bits that already landed into material that is guaranteed to work.",
							"Morning meetings etc. are just daily places to talk, not “succeed at the company.”",
							"体で覚える means learn it as a habit, not physical training against nerves.",
							"Stopping halfway is what happens after the hall goes cold, not how you gain confidence.",
						],
					},
				],
			},
			{
				label: "問題2",
				instruction:
					"{次|つぎ}の{文章|ぶんしょう}を{読|よ}んで、{後|あと}の{問|と}いに{対|たい}する{答|こた}えとして{最|もっと}もよいものを1・2・3・4から{一|ひと}つ{選|えら}びなさい。",
				instructionCn: "阅读下面的文章，从 1・2・3・4 中选出作为后面问题答案最合适的一个。",
				instructionEn:
					"Read the following passage and choose the best answer to each question from 1, 2, 3, or 4.",
				blocks: [
					{
						type: "heading",
						jp: "A",
						cn: "A",
						en: "A",
					},
					{
						type: "paragraph",
						indent: true,
						jp: "{障子|しょうじ}は{破|やぶ}ろうと{思|おも}えばすぐ{破|やぶ}れる。ちょっとものが{触|さわ}ったり、{子供|こども}が{指|ゆび}を{突|つ}いただけで{破|やぶ}れてしまう。こんな{弱|よわ}い{商品|しょうひん}はない。しかしだれもが、{障子|しょうじ}は{欠陥商品|けっかんしょうひん}だから、もっと{強度|きょうど}を{上|あ}げろとは{主張|しゅちょう}してはいない。この{障子|しょうじ}というものは、①もののあり{方|かた}の{非常|ひじょう}によい{面|めん}を{示|しめ}している。ものがメーカーの{努力|どりょく}によってよくなった。{丈夫|じょうぶ}になって、ちょっとやそっとでは{壊|こわ}れない。このことが{使|つか}う{側|がわ}に{乱暴|らんぼう}に{扱|あつか}っても{平気|へいき}という{粗暴|そぼう}な{気持|きも}ちを{養|やしな}ってしまった。ものによって{人間|にんげん}が{育|そだ}てられるということの{逆現象|ぎゃくげんしょう}である。{丈夫|じょうぶ}なもの、{壊|こわ}れないものを{使|つか}って、{知|し}らぬ{間|ま}に{壊|こわ}れていったのは{人間|にんげん}{自身|じしん}のほうだ。だが{障子|しょうじ}は、{弱|よわ}いがゆえにこそ、{取|と}り{扱|あつか}う{者|もの}に{丁寧|ていねい}な{扱|あつか}いを{要求|ようきゅう}する。それによって、{扱|あつか}う{者|もの}が{育|そだ}つ。{昔|むかし}ながらに、{障子|しょうじ}のあけたて（{注|ちゅう}1）{一|ひと}つにしても{作法|さほう}があるのは、そういう{意味|いみ}を{持|も}っているのである。",
						cn: "障子纸门，你想捅破的话马上就能破。稍微碰一下、小孩用手指一戳就会破。再没有这么弱的商品了。可是并没有人主张「障子是缺陷商品，得把强度再提高」。这种障子，①显示出「物」应有状态里非常好的一面。东西因厂家的努力而变好了，变结实了，轻轻碰一下已经坏不了。这件事却在使用的一方养成了「粗暴对待也无所谓」的粗暴心情。本该是人被物所培育，这里却成了相反的现象。用着结实的、坏不了的东西，在不知不觉中坏掉的反而是人自己。然而障子正因为弱，才要求使用者小心对待。由此，使用的人得以成长。自古以来，连开关障子（注1）都有规矩，正是带着这层意思。",
						en: "A shoji screen tears at once if you mean to tear it. A light touch, or a child poking a finger, is enough to rip it. There is no weaker product. Yet no one claims that shoji is defective and that its strength should be raised. This thing called shoji ① shows a very good side of how things ought to be. Things have been improved by manufacturers’ efforts. They have become sturdy, and no longer break at a slight knock. That has fostered in the user a coarse feeling that it is fine to handle them roughly. It is the reverse of the idea that human beings are raised by things. Using sturdy things that do not break, it is human beings themselves who have, without noticing, gone to ruin. But shoji, precisely because they are weak, demand careful handling of the person who uses them. Through that, the handler grows. That even the opening and closing (note 1) of a shoji has, from of old, its own etiquette, carries that meaning.",
					},
					{
						type: "heading",
						jp: "B",
						cn: "B",
						en: "B",
					},
					{
						type: "paragraph",
						indent: true,
						jp: "それだけではない。{障子|しょうじ}は、{直|なお}すことを{考|かんが}えるという{立場|たちば}からみたとき、②{実|じつ}にすばらしいものだ。{今日|こんにち}の{進|すす}んだ{技術|ぎじゅつ}の{道具|どうぐ}、{例|たと}えばマイクロ・コンピューターでも{自動車|じどうしゃ}でも、{直|なお}すときは、その{故障|こしょう}した{部分|ぶぶん}を{修理|しゅうり}するのではない。{悪|わる}い{部分|ぶぶん}を{含|ふく}めたユニット{全体|ぜんたい}を{取|と}り{替|か}えてしまう。{部分修理|ぶぶんしゅうり}のめんどう、{手間|てま}を{節約|せつやく}したほうがより{合理的|ごうりてき}だという{姿勢|しせい}である。{仮|かり}にICが{二十個|にじゅうこ}ついたプリント{基板|きばん}があって、そのうち{一個|いっこ}が{壊|こわ}れていたとすると、そっくり{取|と}り{替|か}えてしまうから、{壊|こわ}れていない{残|のこ}りの{十九個|じゅうきゅうこ}も{廃棄|はいき}してしまう。そういう{修理方法|しゅうりほうほう}が{最近|さいきん}ではきわめて{多|おお}くなってきた。これは{障子|しょうじ}の{修理|しゅうり}の{仕方|しかた}と{正反対|せいはんたい}である。",
						cn: "还不止这些。障子从「考虑修理」这一立场来看，②实在了不起。如今技术先进的器具，比如微型计算机、汽车，修理时并不是修好出故障的那一部分，而是把包含坏掉部分的整个单元换掉。这是一种觉得省去局部修理的麻烦和工夫更合理的态度。假如一块印有二十个集成电路的线路板里坏了一个，就会整块换掉，于是没坏的那十九个也被废弃。这种修理方法近来极其常见。这和障子的修理方式正好相反。",
						en: "That is not all. Seen from the standpoint of thinking about repair, shoji are ② truly splendid. With today’s technically advanced tools — a microcomputer or a car, for example — when you “fix” them you do not repair the part that failed. You replace the whole unit that contains the bad part. The attitude is that saving the bother and labor of partial repair is more rational. Suppose a printed circuit board has twenty ICs and one of them is broken: you replace the whole board, so the remaining nineteen that are not broken are discarded too. That kind of repair has become extremely common of late. It is the exact opposite of how shoji are repaired.",
					},
					{
						type: "heading",
						jp: "C",
						cn: "C",
						en: "C",
					},
					{
						type: "paragraph",
						indent: true,
						jp: "{障子|しょうじ}では、{一箇所|いっかしょ}{破|やぶ}れたといっても{全部|ぜんぶ}{取|と}り{替|か}えるようなことはしない。そればかりか、{破|やぶ}れた{桝|ます}の{一五|じゅうご}センチ{角|かく}ぐらいの{紙|かみ}{全体|ぜんたい}を{切|き}り{取|と}ってそこに{新|あたら}しい{紙|かみ}をはるというようなことさえ、{初|はじ}めはしない。まずは、{破|やぶ}れた{所|ところ}を{元|もと}に{戻|もど}し、{破|やぶ}れ{目|め}に、{色紙|いろがみ}を{紅葉|もみじ}の{葉|は}にかたどってはるというようなことをする。すると、その{障子|しょうじ}は、{修理|しゅうり}する{以前|いぜん}よりも{美|うつく}しくなる。たいていのものは{壊|こわ}れる{前|まえ}を100とすれば{壊|こわ}れて30、{直|なお}して80がいいところだが、{障子|しょうじ}は{破|やぶ}れる{前|まえ}が100で、{直|なお}せば130にもなる。{壊|こわ}れて{修理|しゅうり}したほうがより{美|うつく}しくなる。パリから{有名|ゆうめい}なデザイナーが{来|き}て、{日本|にほん}の{建築|けんちく}をあちこち{見|み}て{歩|ある}いたとき、{破|やぶ}れた{障子|しょうじ}に、{紅葉|もみじ}や{桜|さくら}がはってあるのに、いたく（{注|ちゅう}2）{感|かん}じ{入|い}って、そればかりカメラに{収|おさ}めて{帰|かえ}ったという。",
						cn: "障子即使破了一处，也不会整扇换掉。岂止如此，就连把破了的那一格大约十五厘米见方的纸整张剪下再贴上新纸，一开始也不会做。首先是把破处复原，在裂口上贴一片剪成红叶形状的色纸之类。于是那扇障子会比修理以前更美。一般的东西，坏前算 100，坏了剩 30，修好能到 80 就算不错；障子破前是 100，修好能到 130。坏了再修反而更美。据说巴黎来的一位著名设计师走访日本建筑时，看见破障子上贴着红叶和樱花，大为（注2）感动，净拍这些，然后回去了。",
						en: "With shoji, even if one spot is torn you do not replace the whole thing. More than that, you do not even, at first, cut out the whole sheet of paper in the torn lattice square — about fifteen centimeters on a side — and paste new paper there. First you put the torn place back as it was, and on the tear you paste colored paper cut in the shape of a maple leaf, or the like. Then that shoji becomes more beautiful than before the repair. For most things, if the state before breaking is 100, they fall to 30 when broken and 80 after repair is about as good as it gets; but shoji are 100 before they tear and become as much as 130 when repaired. Broken and then repaired, they become more beautiful. A famous designer from Paris, walking around looking at Japanese architecture, is said to have been greatly (note 2) struck by torn shoji with maple leaves and cherry blossoms pasted on them, and to have gone home with his camera full of nothing else.",
					},
					{
						type: "heading",
						jp: "D",
						cn: "D",
						en: "D",
					},
					{
						type: "paragraph",
						indent: true,
						jp: "ものを{直|なお}すということは{人間|にんげん}にとって{非常|ひじょう}にだいじなことであり、{道具|どうぐ}というものにほんとうの{愛情|あいじょう}を{感|かん}じる{源|みなもと}でもある。{修理|しゅうり}は{機械|きかい}と{人間|にんげん}とが{一体|いったい}となることなのだ。",
						cn: "把东西修好，对人类来说是非常要紧的事，也是对「器具」产生真正爱情的源泉。修理，就是机械与人成为一体。",
						en: "Mending things is something of great importance for human beings, and it is also the source of true affection for tools. Repair is machine and human becoming one.",
					},
					{
						type: "source",
						jp: "（{森政弘|もりまさひろ}「{障子|しょうじ}の{破|やぶ}れに{学|まな}ぶもの」『{中学|ちゅうがく}{新|あたら}しい{国語|こくご} 3〈{平成|へいせい}9{年度|ねんど}〉』{東京書籍|とうきょうしょせき}）",
						cn: "（森政弘「从障子的破损中学到的」《中学新国语 3〈平成 9 年度〉》东京书籍）",
						en: "(Masahiro Mori, “What We Learn from a Tear in Shoji,” New Junior-High Japanese 3, Heisei 9 edition, Tokyo Shoseki)",
					},
				],
				footnotes: [
					{ marker: "（注1）", term: "あけたて", jp: "開け閉め", cn: "开关", en: "opening and closing" },
					{ marker: "（注2）", term: "いたく", jp: "たいへん、とても", cn: "非常、很", en: "greatly; very much" },
				],
				questions: [
					{
						label: "5",
						jp: "①もののあり{方|かた}の{非常|ひじょう}によい{面|めん}とは、ここではどのようなことか。",
						cn: "①「物应有状态里非常好的一面」在这里指什么？",
						en: "Here, what is ① “a very good side of how things ought to be”?",
						choices: [
							{
								jp: "{丈夫|じょうぶ}でこわれないこと",
								cn: "结实、坏不了",
								en: "being sturdy and not breaking",
							},
							{
								jp: "{使|つか}う{側|がわ}が{乱暴|らんぼう}に{扱|あつか}っても{平気|へいき}であること",
								cn: "使用的一方粗暴对待也无所谓",
								en: "the user being fine with handling it roughly",
							},
							{
								jp: "{取|と}り{扱|あつか}う{者|もの}に{丁寧|ていねい}な{扱|あつか}いが{必要|ひつよう}なこと",
								cn: "需要使用者小心对待",
								en: "careful handling being required of the person who uses it",
							},
							{
								jp: "{強度|きょうど}を{上|あ}げる{必要|ひつよう}のないこと",
								cn: "没有必要提高强度",
								en: "there being no need to raise the strength",
							},
						],
						answer: 3,
						explanation:
							"别册：找以「障子」为主语的其他句子（第 7〜8 行）。「だが障子は、弱いがゆえにこそ、取り扱う者に丁寧な扱いを要求する。」正因为弱才要求小心对待——这才是「もののあり方の非常によい面」。1、2 是现代结实商品带来的反面。4 只是「没有人要求提高强度」，不是「好的一面」本身。",
						explanationEn:
							"The booklet: look for other sentences whose subject is 障子 (lines 7–8). “But shoji, precisely because they are weak, demand careful handling.” That — requiring care because they are fragile — is the “very good side of how things ought to be.” 1 and 2 are the downside of modern sturdy goods. 4 is only “no one demands more strength,” not the good aspect itself.",
						choiceNotes: [
							"结实坏不了是厂家努力后的现代商品，文中视为使人变粗暴的原因。",
							"这是「逆現象」，是不好的一面。",
							"正确。正因为弱，才要求使用者小心对待。",
							"没人主张提高强度，但那不是「好的一面」的内容。",
						],
						choiceNotesEn: [
							"Sturdy and unbreakable is modern goods after manufacturers’ efforts; the passage treats that as what coarsens people.",
							"That is the “reverse phenomenon,” a bad side.",
							"Correct. Precisely because they are weak, they require careful handling.",
							"No one demands more strength, but that is not the content of the “good side.”",
						],
					},
					{
						label: "6",
						jp: "②{実|じつ}にすばらしいものだとあるが、{筆者|ひっしゃ}によると、それはなぜか。",
						cn: "②说「实在了不起」，据笔者，那是为什么？",
						en: "② They are “truly splendid” — according to the writer, why?",
						choices: [
							{
								jp: "{障子|しょうじ}は{進|すす}んだ{技術|ぎじゅつ}により、{部分修理|ぶぶんしゅうり}できるようになったから。",
								cn: "因为障子靠先进技术已经可以局部修理了。",
								en: "Because shoji, thanks to advanced technology, have become partially repairable.",
							},
							{
								jp: "{障子|しょうじ}は{一箇所|いっかしょ}{破|やぶ}れたぐらいでは{修理|しゅうり}する{必要|ひつよう}がないから。",
								cn: "因为障子破了一处还不需要修理。",
								en: "Because shoji do not need repair just because one spot is torn.",
							},
							{
								jp: "{障子|しょうじ}の{修理|しゅうり}は、{手間|てま}がかからず{合理的|ごうりてき}であるから。",
								cn: "因为修理障子不费工夫、很合理。",
								en: "Because repairing shoji takes little trouble and is rational.",
							},
							{
								jp: "{障子|しょうじ}は、{壊|こわ}れて{修理|しゅうり}したあとのほうが{美|うつく}しくなるから。",
								cn: "因为障子坏了再修之后会变得更美。",
								en: "Because after they break and are repaired, shoji become more beautiful.",
							},
						],
						answer: 4,
						explanation:
							"别册：理由写在 C 段。B 只提出「从修理的立场看实在了不起」，并拿整单元更换来对比；真正说明「了不起」的是 C：破了贴上红叶色纸，比修理前更美，从 100 修到 130。1 把先进技术安在了障子上，文中先进技术是电脑和汽车。2 相反，破了是要修的。3 「合理、省工夫」是整单元更换那种现代姿态，正是障子的反面。",
						explanationEn:
							"The booklet: the reason is in section C. B only claims they are splendid from the standpoint of repair, contrasting whole-unit replacement; what actually explains “splendid” is C: paste maple-leaf paper on the tear, and they become more beautiful than before — from 100 to 130. 1 attributes advanced technology to shoji; in the text that technology is computers and cars. 2 is the opposite — a tear is repaired. 3 “rational, less trouble” is the modern whole-unit attitude, the opposite of shoji.",
						choiceNotes: [
							"先进技术属于电脑、汽车；障子并不是靠新技术才能局部修。",
							"破了一处也是要修的，而且一开始只修裂口。",
							"「省工夫、合理」是整单元更换的现代做法，与障子相反。",
							"正确。C 段：修好之后比以前更美（100→130）。",
						],
						choiceNotesEn: [
							"Advanced technology belongs to computers and cars; shoji are not made partially repairable by new tech.",
							"A tear is repaired — at first only the split itself.",
							"“Less trouble, more rational” is whole-unit replacement, the opposite of shoji.",
							"Correct. Section C: after repair they are more beautiful than before (100 → 130).",
						],
					},
					{
						label: "7",
						jp: "{左|ひだり}の{文章|ぶんしょう}のどこかに{次|つぎ}の{文章|ぶんしょう}が{入|はい}るが、それはどこか。\n「{今日|こんにち}、{機械|きかい}はどんどん{進歩|しんぽ}して、{壊|こわ}れたからといって{素人|しろうと}が{手|て}を{出|だ}すことはできない。{専門家|せんもんか}にしか{直|なお}せないものほど、{進歩的|しんぽてき}で{価値|かち}あるものと{思|おも}いがちだ。もちろんその{考|かんが}えもあながち{間違|まちが}いではない。だが、{素人|しろうと}にすぐ{直|なお}せるようなものを{軽|かる}く{見|み}るようになると{間違|まちが}ってくる。」",
						cn: "下面这段话会插入左边文章的某处，是哪里？\n「如今机械不断进步，坏了也不能由外行动手。越是只有专家才能修好的东西，人们越容易觉得它进步、有价值。当然这种想法也未必全错。可是，一旦开始轻视外行马上就能修好的东西，那就错了。」",
						en: "The following paragraph belongs somewhere in the passage on the left. Where?\n“Today machines keep advancing, and just because something is broken an amateur cannot lay a hand on it. The more something can be fixed only by a specialist, the more we tend to think it progressive and valuable. Of course that idea is not entirely wrong. But we go wrong if we come to look down on things an amateur can fix at once.”",
						choices: [
							{ jp: "AとBの{間|あいだ}", cn: "A 与 B 之间", en: "between A and B" },
							{ jp: "BとCの{間|あいだ}", cn: "B 与 C 之间", en: "between B and C" },
							{ jp: "CとDの{間|あいだ}", cn: "C 与 D 之间", en: "between C and D" },
							{ jp: "Dの{後|うし}ろ", cn: "D 的后面", en: "after D" },
						],
						answer: 3,
						explanation:
							"插入文：「今日、機械はどんどん進歩して、壊れたからといって素人が手を出すことはできない。専門家にしか直せないものほど、進歩的で価値あるものと思いがちだ。もちろんその考えもあながち間違いではない。だが、素人にすぐ直せるようなものを軽く見るようになると間違ってくる。」别册：D 是结论，题中这段是引出结论的文章。C 讲完障子越修越美之后，用这段批评「看不起外行修得了的东西」，再接到 D「修理使人与物一体、产生爱情」。所以在 C 与 D 之间。",
						explanationEn:
							"The inserted paragraph: machines have advanced so amateurs cannot touch them; we tend to think only what experts can fix is progressive and valuable; that is not entirely wrong, but looking down on what amateurs can fix at once is where we go wrong. The booklet: D is the conclusion; the given sentence is the one that leads into it. After C (shoji become more beautiful when repaired), this criticizes looking down on things amateurs can fix, then D: repair makes machine and human one, and is the source of affection. So between C and D.",
						choiceNotes: [
							"A 还在讲「弱才要求小心对待」，插这段会打断。",
							"B 刚对比整单元更换，下一段 C 应直接讲障子怎么修。",
							"正确。这段为 D 的结论做铺垫。",
							"D 已经是收束，后面不再接论证。",
						],
						choiceNotesEn: [
							"A is still on “weakness demands care”; inserting here would break it.",
							"B has just contrasted whole-unit replacement; C should follow directly on how shoji are repaired.",
							"Correct. This paragraph paves the way for D’s conclusion.",
							"D is already the closing; no further argument follows.",
						],
					},
					{
						label: "8",
						jp: "{筆者|ひっしゃ}はこの{文章|ぶんしょう}で{何|なに}を{言|い}いたいのか。",
						cn: "笔者在这篇文章里想说的是什么？",
						en: "What does the writer want to say in this passage?",
						choices: [
							{
								jp: "{素人|しろうと}の{修理|しゅうり}も、{専門家|せんもんか}が{直|なお}すことと{同様|どうよう}、{重要|じゅうよう}なことである。",
								cn: "外行的修理和专家来修同样重要。",
								en: "Repair by amateurs is just as important as repair by specialists.",
							},
							{
								jp: "ものを{修理|しゅうり}することによって、ものを{大切|たいせつ}にする{気持|きも}ちが{育|そだ}つものだ。",
								cn: "通过修理东西，珍惜东西的心情会成长起来。",
								en: "By repairing things, a feeling of treasuring them is fostered.",
							},
							{
								jp: "ものを{修理|しゅうり}することは、{実|じつ}は{進歩的|しんぽてき}で{合理的|ごうりてき}なことだ。",
								cn: "修理东西其实是进步而合理的。",
								en: "Repairing things is in fact progressive and rational.",
							},
							{
								jp: "ものを{修理|しゅうり}するときは、{修理後|しゅうりご}のほうがよりよくなるようにすべきである。",
								cn: "修理东西时，应该让修好之后变得更好。",
								en: "When repairing things, one should make them better after the repair than before.",
							},
						],
						answer: 2,
						explanation:
							"别册：「ものを直す」→「ものに愛着を感じる」→「ものを大切にする」。A：弱的东西让人学会小心；C：越修越美、产生感动；D：修理是对器具产生真正爱情的源泉，机械与人成为一体。贯穿的是：修理会培养珍惜东西的心情。1 把插入句的「素人」抬成全文主张。3 「進歩的で合理的」正是文中批评的整单元更换姿态。4 是障子修理的结果，不是对人的要求。",
						explanationEn:
							"The booklet: “mend things” → “feel attachment to things” → “treasure things.” A: weak things teach care; C: repair makes them more beautiful and moves people; D: repair is the source of true affection for tools, machine and human becoming one. Through all of this: repairing fosters a feeling of treasuring things. 1 elevates “amateurs” from the inserted paragraph into the whole claim. 3 “progressive and rational” is the whole-unit attitude the passage criticizes. 4 is a result of shoji repair, not a demand on people.",
						choiceNotes: [
							"「素人也能修」是插入段的铺垫，不是全文中心。",
							"正确。修理使人珍惜东西、对器具产生爱情。",
							"「进步、合理」是整单元更换的说法，文中对此持批评。",
							"修好更美是障子的特点，不是笔者要求「应该修得更好」。",
						],
						choiceNotesEn: [
							"“Amateurs can fix it” is the inserted paragraph’s setup, not the whole point.",
							"Correct. Repairing fosters treasuring things and affection for tools.",
							"“Progressive and rational” is the whole-unit slogan; the passage criticizes it.",
							"Becoming more beautiful is a trait of shoji repair, not a demand that we “should” improve things.",
						],
					},
				],
			},
		],
	},

	vocab: [
		{ jp: "猛獣", kana: "もうじゅう", cn: "猛兽", en: "fierce beast", pos: "名詞" },
		{ jp: "とっさに", cn: "刹那间、立刻", en: "in an instant", pos: "副詞" },
		{ jp: "知恵", kana: "ちえ", cn: "智慧", en: "wisdom", pos: "名詞" },
		{ jp: "加減する", kana: "かげんする", cn: "调节", en: "to adjust (an amount)", pos: "動詞" },
		{ jp: "考慮", kana: "こうりょ", cn: "考虑", en: "consideration", pos: "名詞・動詞" },
		{ jp: "白ける", kana: "しらける", cn: "冷场", en: "to fall flat; to go awkward", pos: "動詞" },
		{ jp: "しどろもどろ", cn: "结结巴巴", en: "in a stammering mess", pos: "副詞・な形" },
		{ jp: "かねてから", cn: "事先、早就", en: "beforehand; for some time", pos: "副詞" },
		{ jp: "ツボ", cn: "要害、笑点", en: "the spot; a punch line", pos: "名詞" },
		{ jp: "ウケる", cn: "受欢迎、逗乐成功", en: "to go over (well)", pos: "動詞" },
		{ jp: "朝礼", kana: "ちょうれい", cn: "早会", en: "morning assembly", pos: "名詞" },
		{ jp: "取引先", kana: "とりひきさき", cn: "客户", en: "client; business counterpart", pos: "名詞" },
		{ jp: "ネタ", cn: "段子、谈话材料", en: "material (for a story)", pos: "名詞" },
		{ jp: "客観的", kana: "きゃっかんてき", cn: "客观的", en: "objective", pos: "な形" },
		{ jp: "肝心", kana: "かんじん", cn: "关键、要紧", en: "crucial", pos: "な形" },
		{ jp: "ブラッシュアップ", cn: "打磨、提高", en: "brush-up; further improvement", pos: "名詞・動詞" },
		{ jp: "障子", kana: "しょうじ", cn: "障子、纸拉门", en: "shoji (paper sliding screen)", pos: "名詞" },
		{ jp: "欠陥商品", kana: "けっかんしょうひん", cn: "缺陷商品", en: "defective product", pos: "名詞" },
		{ jp: "強度", kana: "きょうど", cn: "强度", en: "strength (of a material)", pos: "名詞" },
		{ jp: "粗暴", kana: "そぼう", cn: "粗暴", en: "rough; coarse", pos: "な形" },
		{ jp: "養う", kana: "やしなう", cn: "养成、培养", en: "to foster; to nourish", pos: "動詞" },
		{ jp: "ゆえに", cn: "因此、正因为", en: "because of…; therefore", pos: "接続" },
		{ jp: "作法", kana: "さほう", cn: "规矩、礼法", en: "etiquette; form", pos: "名詞" },
		{ jp: "合理的", kana: "ごうりてき", cn: "合理的", en: "rational", pos: "な形" },
		{ jp: "廃棄する", kana: "はいきする", cn: "废弃", en: "to discard", pos: "動詞" },
		{ jp: "桝", kana: "ます", cn: "（障子的）一格", en: "a lattice square (of shoji)", pos: "名詞" },
		{ jp: "かたどる", cn: "做成……的形状", en: "to cut / form in the shape of", pos: "動詞" },
		{ jp: "感じ入る", kana: "かんじいる", cn: "深受感动", en: "to be deeply impressed", pos: "動詞" },
		{ jp: "愛情", kana: "あいじょう", cn: "爱情、爱惜", en: "affection", pos: "名詞" },
		{ jp: "源", kana: "みなもと", cn: "源泉", en: "source", pos: "名詞" },
		{ jp: "素人", kana: "しろうと", cn: "外行", en: "amateur; layperson", pos: "名詞" },
	],

	grammar: [
		{
			pattern: "〜としたら",
			formation: "普通形 ＋ としたら",
			meaning: "假如……的话。提出假设。",
			meaningEn: "if… (hypothetically).",
			example: {
				jp: "{目|め}の{前|まえ}に{猛獣|もうじゅう}が{現|あらわ}れたとしたら、{全力|ぜんりょく}で{逃|に}げ{出|だ}すだろう。",
				cn: "假如眼前出现猛兽，大概会全力逃走。",
				en: "If a fierce beast appeared in front of you, you would probably flee with all your might.",
			},
		},
		{
			pattern: "〜がゆえに（こそ）",
			formation: "い形／な形／名詞 ＋ がゆえに",
			meaning: "正因为……。书面语，强调原因。",
			meaningEn: "precisely because…. Written style; emphasizes the reason.",
			example: {
				jp: "{弱|よわ}いがゆえにこそ、{取|と}り{扱|あつか}う{者|もの}に{丁寧|ていねい}な{扱|あつか}いを{要求|ようきゅう}する。",
				cn: "正因为弱，才要求使用者小心对待。",
				en: "Precisely because they are weak, they demand careful handling of the user.",
			},
		},
		{
			pattern: "〜ばかりか",
			formation: "普通形 ＋ ばかりか",
			meaning: "岂止……，连……都。后项程度更进一步。",
			meaningEn: "not only… but even…. The following item goes further.",
			example: {
				jp: "そればかりか、{破|やぶ}れた{桝|ます}の{紙|かみ}{全体|ぜんたい}を{切|き}り{取|と}るようなことさえ、{初|はじ}めはしない。",
				cn: "岂止如此，就连把破了的那一格纸整张剪下这种事，一开始也不会做。",
				en: "More than that, you do not even, at first, cut out the whole sheet in the torn lattice square.",
			},
		},
	],
};
