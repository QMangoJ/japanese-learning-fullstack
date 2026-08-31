import type { ReadingDay } from "../reading-n3/types";

// 第4週 7日目 実戦問題 — printed pages 72–75
export const w4d7: ReadingDay = {
	week: 4,
	day: 7,
	label: "実戦問題",
	labelKana: "じっせんもんだい",
	labelEn: "Practice Exercise",
	printedPages: [72, 73, 74, 75],
	answerSource: "book",

	practice: {
		timeLimitMinutes: 20,
		scoring: "問題1：1問15点×4問／問題2：1問20点×2問／100点",
		groups: [
			{
				label: "問題1",
				instruction:
					"{次|つぎ}の{文章|ぶんしょう}を{読|よ}んで、{後|あと}の{問|と}いに{対|たい}する{答|こた}えとして{最|もっと}もよいものを1・2・3・4から{一|ひと}つ{選|えら}びなさい。",
				instructionCn: "阅读下面的文章，从 1・2・3・4 中选出最合适的一个作为后面问题的答案。",
				instructionEn: "Read the following passage and choose the best answer to each question from 1, 2, 3, or 4.",
				blocks: [
					{
						type: "paragraph",
						indent: true,
						jp: "{最近|さいきん}うれしかったのは、{新幹線|しんかんせん}で{隣|となり}に{座|すわ}ったのが{四十代|よんじゅうだい}の{男|おとこ}だったことだ。",
						cn: "最近让我高兴的是，新干线上坐在旁边的是一位四十多岁的男人。",
						en: "What made me happy recently was that the person who sat next to me on the shinkansen was a man in his forties.",
					},
					{
						type: "paragraph",
						indent: true,
						jp: "わたしだって{人並|ひとな}みに（{注|ちゅう}1）{中年男|ちゅうねんおとこ}は{嫌|きら}いだ。{以前|いぜん}は、{隣|となり}に{女|おんな}が{座|すわ}ってくれることを{希望|きぼう}していた。{新幹線|しんかんせん}に{乗|の}るときは、たいてい{仕事|しごと}をしようと{思|おも}っているから、{気|き}になるような{女|おんな}が{隣|となり}に{座|すわ}ったら、{仕事|しごと}に{身|み}が{入|はい}らない（{注|ちゅう}2）はずだ。いいかえれば、{仕事|しごと}をしなくてすむはずだ。だが{実際|じっさい}には、①そういう{希望|きぼう}が{実現|じつげん}したことはほとんどない。",
						cn: "我也和普通人一样讨厌中年男人。以前，我希望旁边坐的是女人。坐新干线时多半想干活，要是身边坐了个让人心动的女人，工作肯定集中不了。反过来说，也就可以不用干活了。可实际上，①那种希望几乎从未实现过。",
						en: "I too, like anyone else, dislike middle-aged men. I used to hope a woman would sit next to me. When I take the shinkansen I usually mean to work, so if an attractive woman sat next to me I would of course be unable to concentrate. In other words, I would get out of having to work. But in fact, ① that hope has almost never come true.",
					},
					{
						type: "paragraph",
						indent: true,
						jp: "{悪|わる}いことに、{世|よ}の{中|なか}には{女以外|おんないがい}の{人間|にんげん}も{存在|そんざい}しており、{中|なか}にはわたしの{甘|あま}い{夢|ゆめ}を{打|う}ち{砕|くだ}く（{注|ちゅう}3）ような{人間|にんげん}もいる。{一番|いちばん}{多|おお}いのは、{前後|ぜんご}の{席|せき}で{騒|さわ}ぐ{子|こ}どもである。{子|こ}どもの{声|こえ}は{大|おお}きいのは{分|わ}かる。{生物学的|せいぶつがくてき}にいっても、{万一|まんいち}の{場合|ばあい}に{親|おや}の{注意|ちゅうい}を{引|ひ}くような{声|こえ}を{出|だ}す{必要|ひつよう}があるのだ。だが、{隣|となり}に{親|おや}がいるのになぜ{大|おお}きい{声|こえ}を{出|だ}す{必要|ひつよう}があるのか（{本当|ほんとう}の{親|おや}ではないのか？）。{周|まわ}りの{乗客|じょうきゃく}に{迷惑|めいわく}をかけるために{大|おお}きい{声|こえ}をもっているとしか{思|おも}えない。{子|こ}どもが{近|ちか}くにいるときは、まず{仕事|しごと}にならない。{何|なに}よりも、ぐっすり{眠|ねむ}れない。",
						cn: "糟糕的是，世上除了女人还有别的人，其中不乏会粉碎我这甜蜜梦想的。最多的是前后座位上吵闹的孩子。小孩子声音大，这我懂。从生物学上说，万一出事也需要发出能引起父母注意的声音。可旁边就有父母，为什么还非要大声不可呢（难道不是亲爹亲妈？）。只能认为那大嗓门就是为了给周围乘客添麻烦。附近有孩子时，工作根本干不成。最要命的是，觉也睡不踏实。",
						en: "Worse, human beings other than women also exist in this world, and among them are some who smash my sweet dream. The most common are children making a racket in the seats in front and behind. I understand that children’s voices are loud. Biologically too they need a voice that will catch a parent’s attention in an emergency. But if a parent is right there, why do they need to be loud (are those not the real parents?)? I can only think they have loud voices in order to bother the passengers around them. When children are nearby, work is out of the question. Above all, you cannot sleep soundly.",
					},
					{
						type: "paragraph",
						indent: true,
						jp: "そういう{経験|けいけん}が{何回|なんかい}も{重|かさ}なり、わたしは②{喫煙車両|きつえんしゃりょう}（{注|ちゅう}4）に{座|すわ}ることにした。{子|こ}どもは{少|すく}ないから{最悪|さいあく}の{事態|じたい}は{避|さ}けられる……はずだった。",
						cn: "这样的经历叠了好几回，我决定改坐②吸烟车厢。孩子少，最糟的局面总能躲开……本该如此。",
						en: "After that experience piled up again and again, I decided to sit in ② the smoking car. There would be fewer children, so the worst could be avoided… or so I thought.",
					},
					{
						type: "paragraph",
						indent: true,
						jp: "{最初|さいしょ}に{喫煙車両|きつえんしゃりょう}に{乗|の}ったとき、どこかの{体育会系|たいいくかいけい}（{注|ちゅう}5）の{大学生|だいがくせい}の{団体|だんたい}が{周|まわ}りを{取|と}り{囲|かこ}むようにすわり、{子|こ}ども{以上|いじょう}に{大|おお}きい{声|こえ}で{騒|さわ}ぎまくった。",
						cn: "第一次坐进吸烟车厢，不知哪个体育社团的大学生团体把我团团围住坐下，用比孩子还大的嗓门闹个不停。",
						en: "The first time I rode in a smoking car, a group of university jocks from somewhere sat all around me and made a racket even louder than children.",
					},
					{
						type: "paragraph",
						indent: true,
						jp: "{次|つぎ}に{乗|の}ったときは、{高齢|こうれい}の{男|おとこ}が{隣|となり}に{座|すわ}った。{老人|ろうじん}なら{騒|さわ}ぐ{元気|げんき}もあるまいと{思|おも}ったが、{老人|ろうじん}は{隣|となり}に{座|すわ}るなり、{降|お}りるまでの{数時間|すうじかん}、{途切|とぎ}れることなく（{注|ちゅう}6）{激|はげ}しい{咳|せき}をし{続|つづ}けた。{風邪|かぜ}なのか、{肺|はい}ガン（{注|ちゅう}7）なのか{知|し}らないが、{今|いま}にも{倒|たお}れそうで{気|き}が{気|き}でなく（{注|ちゅう}8）、{仕事|しごと}どころではなかった。",
						cn: "下一次坐上时，旁边坐了个上了年纪的男人。我以为老人总没力气吵了吧，可他一坐下，直到下车的几个小时里，剧烈咳嗽一刻不停。不知是感冒还是肺癌，眼看就要倒下，我心里七上八下，哪还谈得上工作。",
						en: "The next time I rode, an elderly man sat next to me. I thought an old man would hardly have the energy to make a racket, but the moment he sat down he coughed violently without a break for the several hours until he got off. I don’t know if it was a cold or lung cancer, but he looked about to collapse, I was beside myself with worry, and work was out of the question.",
					},
					{
						type: "paragraph",
						indent: true,
						jp: "この{経験|けいけん}の{後|あと}、わたしは{甘|あま}い{希望|きぼう}を{捨|す}てた。{考|かんが}えてみれば、{周|まわ}りに{暴力団|ぼうりょくだん}（{注|ちゅう}9）の{団体|だんたい}が{陣取|じんど}る（{注|ちゅう}10）{可能性|かのうせい}もあるのだ。そういう{事態|じたい}に{比|くら}べれば、③{中年男|ちゅうねんおとこ}は{歓迎|かんげい}すべき{隣人|りんじん}だ。{中年男|ちゅうねんおとこ}でよかった。{到着|とうちゃく}までの{四時間|よじかん}、④ぐっすり{眠|ねむ}ることができた。",
						cn: "这番经历之后，我丢掉了甜蜜的希望。细想起来，周围坐上一帮暴力团也不是没可能。和那种局面比起来，③中年男人倒是该欢迎的邻居。幸好是中年男人。直到抵达的四个小时里，④我睡了个踏实觉。",
						en: "After that experience I gave up my sweet hopes. Come to think of it, a gang of yakuza might well plant themselves around me. Compared with that, ③ a middle-aged man is a neighbor to be welcomed. I was glad it was a middle-aged man. For the four hours until arrival, ④ I was able to sleep soundly.",
					},
					{
						type: "source",
						jp: "（{土屋賢二|つちやけんじ}『ツチヤ{学部長|がくぶちょう}の{弁明|べんめい}』{講談社|こうだんしゃ}）",
						cn: "（土屋贤二《土屋学部长的辩白》，讲谈社）",
						en: "(Tsuchiya Kenji, Tsuchiya Gakubuchō no Benmei, Kōdansha)",
					},
				],
				footnotes: [
					{ marker: "（注1）", term: "人並みに", jp: "普通の人と同じように", cn: "和普通人一样", en: "like anyone else; as much as the next person" },
					{ marker: "（注2）", term: "身が入らない", jp: "集中できない", cn: "集中不了", en: "cannot concentrate" },
					{ marker: "（注3）", term: "打ち砕く", jp: "たたいて壊す", cn: "打碎、粉碎", en: "to smash; to shatter" },
					{ marker: "（注4）", term: "喫煙車両", jp: "タバコを吸うことができる電車の車両", cn: "可以抽烟的列车车厢", en: "a train car where smoking is allowed" },
					{ marker: "（注5）", term: "体育会系", jp: "スポーツのクラブに入っているような強そうな感じ", cn: "体育社团那种壮实、气势汹汹的感觉", en: "the jock type; like someone in a sports club" },
					{ marker: "（注6）", term: "途切れることなく", jp: "途中で終わらないで、続いて", cn: "一刻不停、连续不断", en: "without a break; continuously" },
					{ marker: "（注7）", term: "肺ガン", jp: "病気の名前", cn: "肺癌（病名）", en: "lung cancer (name of an illness)" },
					{ marker: "（注8）", term: "気が気でなく", jp: "とても心配で", cn: "心里七上八下、非常担心", en: "beside oneself with worry" },
					{ marker: "（注9）", term: "暴力団", jp: "暴力によって目的を達しようとする団体", cn: "靠暴力达到目的的团体、黑帮", en: "an organized crime group; yakuza" },
					{ marker: "（注10）", term: "陣取る", jp: "（この場合）座る", cn: "（此处）占据、坐下", en: "(here) to sit; to take up a position" },
				],
				questions: [
					{
						label: "1",
						jp: "①そういう{希望|きぼう}とはどういう{希望|きぼう}か。",
						cn: "①「那种希望」是怎样的希望？",
						en: "What hope is ① “that hope”?",
						choices: [
							{ jp: "{隣|となり}に{中年男|ちゅうねんおとこ}が{座|すわ}ってほしい。", cn: "希望旁边坐的是中年男人。", en: "He wants a middle-aged man to sit next to him." },
							{ jp: "{隣|となり}に{女|おんな}が{座|すわ}ってほしい。", cn: "希望旁边坐的是女人。", en: "He wants a woman to sit next to him." },
							{ jp: "{騒|さわ}ぐ{子|こ}どもに{座|すわ}ってほしくない。", cn: "不希望吵闹的孩子坐在旁边。", en: "He does not want noisy children to sit there." },
							{ jp: "{隣|となり}にだれも{座|すわ}ってほしくない。", cn: "不希望旁边坐任何人。", en: "He does not want anyone to sit next to him." },
						],
						answer: 2,
						explanation:
							"别册指出 3〜4 行：「気になるような女が隣に座ったら、仕事に身が入らないはずだ。」前文「以前は、隣に女が座ってくれることを希望していた」。①「そういう希望」=希望旁边坐女人。选 2。这是反语式的「希望」：坐了心动的女人就可以名正言顺不干活。1 是现在高兴的事实，不是当时的希望。3、4 是后来的抱怨，不是①所指。",
						explanationEn:
							"The supplement points to lines 3–4: if an attractive woman sat next to him he would be unable to concentrate. Just before: “I used to hope a woman would sit next to me.” So ① “that hope” = wanting a woman beside him. Choice 2. It is an ironic hope: an attractive neighbor would give him an excuse not to work. 1 is what actually made him glad this time, not the old hope. 3 and 4 are later complaints, not what ① refers to.",
						choiceNotes: [
							"旁边坐中年男人是最近高兴的事实，不是①的「希望」。",
							"正确。「隣に女が座ってくれることを希望していた」。",
							"讨厌吵闹的孩子是后文，不是①所指的希望。",
							"文中没有说希望旁边空着。",
						],
						choiceNotesEn: [
							"A middle-aged man next to him is what made him glad this time, not the “hope” of ①.",
							"Correct. He “used to hope a woman would sit next to him.”",
							"Disliking noisy children comes later; it is not the hope of ①.",
							"The passage never says he wants the next seat empty.",
						],
					},
					{
						label: "2",
						jp: "なぜ②{喫煙車両|きつえんしゃりょう}に{座|すわ}ることにしたのか。",
						cn: "为什么决定改坐②吸烟车厢？",
						en: "Why did he decide to sit in ② the smoking car?",
						choices: [
							{ jp: "タバコを{吸|す}うつもりだから。", cn: "因为打算抽烟。", en: "Because he intended to smoke." },
							{ jp: "{気|き}になる{女|おんな}が{隣|となり}に{座|すわ}るかもしれないから。", cn: "因为让人心动的女人也许会坐到旁边。", en: "Because an attractive woman might sit next to him." },
							{ jp: "{喫煙車両|きつえんしゃりょう}のほうが{筆者|ひっしゃ}の{年齢|ねんれい}に{近|ちか}い{人|ひと}が{多|おお}いから。", cn: "因为吸烟车厢里和笔者年龄接近的人更多。", en: "Because the smoking car has more people close to the writer’s age." },
							{ jp: "{禁煙車両|きんえんしゃりょう}は{子|こ}どもがうるさいから。", cn: "因为禁烟车厢里孩子太吵。", en: "Because children are noisy in the non-smoking cars." },
						],
						answer: 4,
						explanation:
							"「子どもが近くにいるときは、まず仕事にならない。何よりも、ぐっすり眠れない。」之后「そういう経験が何回も重なり、喫煙車両に座ることにした。子どもは少ないから最悪の事態は避けられる」。改坐吸烟车厢是为了躲开吵闹的孩子，也就是禁烟车厢孩子太吵。选 4。1 文中没说自己要抽烟。2 是以前的希望，不是改车厢的理由。3 没提年龄。别册也强调：笔者最烦的是周围吵。",
						explanationEn:
							"After “when children are nearby, work is out of the question. Above all you cannot sleep,” he says that experience piled up, so he sat in the smoking car: “there would be fewer children.” He moved to avoid noisy kids — i.e. non-smoking cars are noisy with children. Choice 4. 1: he never says he wants to smoke. 2 is the old hope, not why he changed cars. 3 never mentions age. The supplement: what bothers him most is noise around him.",
						choiceNotes: [
							"文中没有说自己要抽烟。",
							"那是以前希望旁边坐女人的理由，不是改坐吸烟车厢的理由。",
							"文中没有比较年龄。",
							"正确。禁烟车厢孩子吵，所以改去孩子少的吸烟车厢。",
						],
						choiceNotesEn: [
							"He never says he intends to smoke.",
							"That is why he used to hope a woman would sit next to him, not why he changed cars.",
							"Age is never compared.",
							"Correct. Non-smoking cars have noisy children, so he moved to the smoking car where there are fewer of them.",
						],
					},
					{
						label: "3",
						jp: "なぜ③{中年男|ちゅうねんおとこ}は{歓迎|かんげい}すべき{隣人|りんじん}だと{思|おも}ったのか。",
						cn: "为什么觉得③中年男人是该欢迎的邻居？",
						en: "Why did he come to think ③ a middle-aged man is a neighbor to be welcomed?",
						choices: [
							{ jp: "{暴力団|ぼうりょくだん}である{可能性|かのうせい}が{少|すく}ないから。", cn: "因为是暴力团的可能性较小。", en: "Because they are unlikely to be yakuza." },
							{ jp: "{騒|さわ}がないで{静|しず}かにしているから。", cn: "因为不吵不闹、安安静静。", en: "Because they keep quiet and do not make a racket." },
							{ jp: "{老人|ろうじん}よりも{健康|けんこう}だから。", cn: "因为比老人健康。", en: "Because they are healthier than old men." },
							{ jp: "いい{人|ひと}が{多|おお}くて{仲良|なかよ}くできるから。", cn: "因为好人多、能相处融洽。", en: "Because many of them are nice and easy to get along with." },
						],
						answer: 2,
						explanation:
							"别册：笔者觉得周围吵最受不了。吵闹的孩子、体育社团大学生、不停咳嗽的老人……相比之下，中年男人安静，才能「ぐっすり眠ることができた」。选 2。暴力团只是夸张的最坏设想，不是欢迎中年男人的理由。3 健康、4 人好，文中都没说。16 行「あるまい」＝あるはずがない，老人「按理不该有力气吵」，结果却咳个不停。",
						explanationEn:
							"The supplement: what bothers the writer most is noise around him. Noisy children, university jocks, an old man who coughs without a break… by contrast a middle-aged man is quiet, so he “was able to sleep soundly.” Choice 2. Yakuza are a hyperbolic worst case, not the reason middle-aged men are welcome. 3 (health) and 4 (being nice) are never said. Line 16 arumai = aru hazu ga nai: an old man “could hardly have the energy to make a racket” — and then coughed the whole way.",
						choiceNotes: [
							"暴力团是夸张的最坏设想，不是欢迎中年男人的直接原因。",
							"正确。最烦周围吵，中年男人安静才能睡着。",
							"文中没有比较健康。老人的问题是咳嗽吵、让人担心。",
							"文中没有说中年男人是好人、能相处。",
						],
						choiceNotesEn: [
							"Yakuza are a hyperbolic worst case, not the direct reason middle-aged men are welcome.",
							"Correct. Noise bothers him most; a quiet middle-aged man lets him sleep.",
							"Health is never compared. The old man’s problem is coughing and making him worry.",
							"The passage never says middle-aged men are nice or easy to get along with.",
						],
					},
					{
						label: "4",
						jp: "{筆者|ひっしゃ}は④ぐっすり{眠|ねむ}ることができたことについてどう{思|おも}っているか。",
						cn: "对于④能够睡得很踏实这件事，笔者是怎么想的？",
						en: "How does the writer feel about ④ being able to sleep soundly?",
						choices: [
							{ jp: "{静|しず}かだったので{眠|ねむ}ることができてよかった。", cn: "因为安静所以能睡着，太好了。", en: "It was quiet, so he was glad he could sleep." },
							{ jp: "うるさかったが{眠|ねむ}ることができてよかった。", cn: "虽然吵，但能睡着就好。", en: "It was noisy, but he was glad he could still sleep." },
							{ jp: "{眠|ねむ}ることができたが{中年男|ちゅうねんおとこ}はやっぱりいやだ。", cn: "虽然睡着了，但中年男人还是讨厌。", en: "He could sleep, but he still dislikes middle-aged men." },
							{ jp: "{眠|ねむ}ることができたがもう{少|すこ}し{静|しず}かにしてほしかった。", cn: "虽然睡着了，但还是希望再安静一点。", en: "He could sleep, but he wished it had been a bit quieter." },
						],
						answer: 1,
						explanation:
							"结尾：「中年男でよかった。到着までの四時間、ぐっすり眠ることができた。」开头也说最近高兴的就是旁边坐了四十多岁的男人。因为安静才睡得着，选 1。2、4 都还在说吵，和「よかった」不符。3 和开头的高兴、结尾的「歓迎すべき隣人」矛盾。",
						explanationEn:
							"The ending: “I was glad it was a middle-aged man. For the four hours until arrival I was able to sleep soundly.” The opening too: what made him happy was a man in his forties next to him. He slept because it was quiet — choice 1. 2 and 4 still talk of noise, which does not match “glad.” 3 contradicts the opening happiness and “a neighbor to be welcomed.”",
						choiceNotes: [
							"正确。安静才能睡着，所以「中年男でよかった」。",
							"结尾没有写当时还吵。",
							"已经把中年男人当成该欢迎的邻居，不是「还是讨厌」。",
							"没有写还嫌不够安静。",
						],
						choiceNotesEn: [
							"Correct. Quiet enough to sleep, so “glad it was a middle-aged man.”",
							"The ending does not say it was still noisy.",
							"He has already called middle-aged men neighbors to be welcomed, not “still dislike.”",
							"He never says he wished it were quieter still.",
						],
					},
				],
			},
			{
				label: "問題2",
				instruction:
					"AとBの{両方|りょうほう}を{読|よ}んで、{後|あと}の{問|と}いに{対|たい}する{答|こた}えとして、{最|もっと}もよいものを1・2・3・4から{一|ひと}つ{選|えら}びなさい。",
				instructionCn: "阅读 A 和 B 两篇，从 1・2・3・4 中选出最合适的一个作为后面问题的答案。",
				instructionEn: "Read both A and B and choose the best answer to each question from 1, 2, 3, or 4.",
				blocks: [
					{
						type: "title",
						jp: "A　{百貨店|ひゃっかてん}へのラブコール",
						cn: "A　给百货店的情书",
						en: "A  A love call to department stores",
					},
					{
						type: "paragraph",
						indent: true,
						jp: "ある{日曜日|にちようび}、{安|やす}いブランドのいわゆるファストファッションの{店|みせ}に{行|い}った。{開店|かいてん}すぐの{時間|じかん}だったのに{駐輪場|ちゅうりんじょう}はいっぱいで{止|と}められず{帰|かえ}った。{次|つぎ}の{日曜日|にちようび}、やはり{開店|かいてん}すぐにもう{一度|いちど}{行|い}ってみた。{車|くるま}はなんとか{止|と}められたが、{店内|てんない}はものすごい{混雑|こんざつ}で、{買|か}いたかったものを{一枚|いちまい}{手|て}に{取|と}るまでに{疲|つか}れてしまった。{何|なに}か{変|へん}だ。この{人|ひと}たちは{本当|ほんとう}に{必要|ひつよう}で{買|か}っているのだろうか。{以来|いらい}、{私|わたし}はあの{店|みせ}に{行|い}かなくなった。",
						cn: "某个星期天，我去了一家所谓快时尚的便宜品牌店。才刚开门，自行车停放处就已经满了，停不上只好回去。下一个星期天，还是刚开门又去了一次。车总算停上了，可店里挤得要命，还没把想买的那一件拿到手就已经累垮了。有点不对劲。这些人真的是因为需要才买的吗？从那以后，我就再也没去那家店。",
						en: "One Sunday I went to a cheap so-called fast-fashion store. It was just after opening, yet the bike lot was full and I couldn’t park, so I went home. The next Sunday I tried again, again just after opening. I managed to park the car, but the store was so packed that I was exhausted before I even picked up the one item I wanted. Something is off. Are these people really buying because they need to? Since then I have not gone back to that store.",
					},
					{
						type: "paragraph",
						indent: true,
						jp: "この{不況下|ふきょうか}で{安|やす}いファストファッションブランドに{人気|にんき}が{集中|しゅうちゅう}し、{百貨店|ひゃっかてん}は{次々|つぎつぎ}と{消|き}えている。{私|わたし}もデパートに{対|たい}して、{高|たか}くてちょっと{古臭|ふるくさ}くて、{商品|しょうひん}を{手|て}に{取|と}りにくい、という{印象|いんしょう}を{抱|いだ}いていたのだが、{最近|さいきん}はデパートが{恋|こい}しくなっている。{特|とく}にゆったりとした{空間|くうかん}のあるリッチなデパートに{行|い}くと、{落|お}ち{着|つ}くし、{高|たか}いものが{並|なら}んでいても、{見|み}て{回|まわ}るだけで{楽|たの}しめる。なんとか、デパートに{元気|げんき}に{生|い}き{残|のこ}ってほしいものだ。",
						cn: "在这不景气之下，人气集中到便宜的快时尚品牌上，百货店一家接一家消失。我对百货店也曾抱着又贵、有点过时、商品不好拿来看的印象，可最近却开始想念百货店了。尤其是走进空间宽敞的高档百货店，心情会安定下来，即便摆着的是贵的东西，光是逛一逛也开心。真希望百货店能好好地活下去。",
						en: "In this recession, popularity has concentrated on cheap fast-fashion brands, and department stores are disappearing one after another. I too used to think of department stores as expensive, a bit old-fashioned, and hard to pick merchandise up in — but lately I have been missing them. Especially in a rich department store with unhurried space, I feel at ease, and even if expensive things are lined up I can enjoy just looking around. I do hope department stores will survive in good health.",
					},
					{
						type: "title",
						jp: "B　ファストファッション",
						cn: "B　快时尚",
						en: "B  Fast fashion",
					},
					{
						type: "paragraph",
						indent: true,
						jp: "ファストファッションがこの{不況下|ふきょうか}で{消費者|しょうひしゃ}の{心|こころ}をつかんでいる。{低価格|ていかかく}で{機能性|きのうせい}にもすぐれ、おしゃれで{気軽|きがる}に{使|つか}えるのが{人気|にんき}の{理由|りゆう}だ。{国内|こくない}のブランドが{海外|かいがい}に{進出|しんしゅつ}し、また{海外|かいがい}のブランドも{次々|つぎつぎ}と{入|はい}ってきている。また、{店|みせ}は{大型店|おおがたてん}だけでなく、{今|いま}ではデパートの{中|なか}にまで{進出|しんしゅつ}している。",
						cn: "快时尚在这不景气之下抓住了消费者的心。价格低、功能性也好，又时髦又能随随便便穿，这就是受欢迎的理由。国内品牌走向海外，海外品牌也一个接一个进来。而且店铺不只有大型店，如今已经进到百货店里面了。",
						en: "Fast fashion has captured consumers’ hearts in this recession. Low prices, good functionality, stylishness, and being easy to wear are why it is popular. Domestic brands are expanding overseas, and overseas brands are coming in one after another as well. And the shops are not only big-box stores; they have now even moved into department stores.",
					},
					{
						type: "paragraph",
						indent: true,
						jp: "さて、このファストファッション{熱|ねつ}はいつまで{続|つづ}くのだろうか。だれもが{同|おな}じような{価値観|かちかん}を{持|も}ってはいない。{実際|じっさい}、{私|わたし}が{仕事着|しごとぎ}にしたい、と{思|おも}うような{機能|きのう}やデザイン、{品質|ひんしつ}をあわせ{持|も}ち、このぐらいなら{払|はら}ってもいいと{思|おも}える{価格|かかく}の{服|ふく}はなかなか{見当|みあ}たらない。{年代|ねんだい}に{応|おう}じて、あるいは{時|とき}と{場所|ばしょ}、{場合|ばあい}に{応|おう}じて、さまざまな{価値|かち}のある{商品|しょうひん}が{求|もと}められるはずだ。そろそろ{別|べつ}の{切|き}り{口|くち}のブランドを{考|かんが}えていかないと{消費者|しょうひしゃ}に{飽|あ}きられてしまうのではないだろうか。",
						cn: "那么，这股快时尚热还能持续到什么时候呢。并不是人人都抱着同样的价值观。实际上，我自己想当工作装来穿、功能、设计和品质都到位、价格又觉得付得起的衣服，就很难找。按年龄，或按时间、地点、场合，本该需要各种各样有价值的商品。再不开始想别的切入点的品牌，只怕消费者要腻了吧。",
						en: "Now then: how long will this fast-fashion fever last? Not everyone holds the same values. In fact I can hardly find clothes that have the function, design, and quality I would want as workwear, at a price I would be willing to pay. Depending on age, or on time, place, and occasion, products of various kinds of value ought to be wanted. If they do not start thinking of brands with a different angle, consumers will surely get bored, won’t they?",
					},
				],
				questions: [
					{
						label: "5",
						jp: "AとBに{共通|きょうつう}する{内容|ないよう}はどれか。",
						cn: "A 和 B 的共同点是哪一项？",
						en: "Which content do A and B share?",
						choices: [
							{ jp: "{百貨店|ひゃっかてん}にもファストファッションの{店|みせ}にもそれぞれ{良|よ}さがある。", cn: "百货店和快时尚店各自都有好处。", en: "Department stores and fast-fashion shops each have their own merits." },
							{ jp: "ファストファッションの{人気|にんき}が{続|つづ}くと{百貨店|ひゃっかてん}が{消|き}えてしまう。", cn: "快时尚一直受欢迎的话，百货店就会消失。", en: "If fast fashion stays popular, department stores will disappear." },
							{ jp: "{生|い}き{残|のこ}っている{百貨店|ひゃっかてん}にはファストファッションの{店|みせ}がある。", cn: "活下来的百货店里有快时尚店。", en: "The department stores that have survived have fast-fashion shops in them." },
							{ jp: "ファストファッションの{人気|にんき}が{続|つづ}くことに{疑問|ぎもん}を{持|も}っている。", cn: "都对快时尚的人气能否持续抱有疑问。", en: "Both question whether fast fashion’s popularity will continue." },
						],
						answer: 4,
						explanation:
							"A 写「何か変だ。この人たちは本当に必要で買っているのだろうか」，B 写「このファストファッション熱はいつまで続くのだろうか」。两边都在怀疑这股热潮能否一直持续。选 4。1 只有 A 明确写百货店的好处。2 只有 A 说百货店在消失。3 只有 B 写快时尚已经进到百货店里。",
						explanationEn:
							"A asks “Are these people really buying because they need to?” and B asks “How long will this fast-fashion fever last?” Both doubt whether the boom will go on. Choice 4. 1: only A clearly praises department stores. 2: only A says department stores are disappearing. 3: only B says fast fashion has moved into department stores.",
						choiceNotes: [
							"A 写百货店的好处；B 没有说两边各有好处。",
							"只有 A 说百货店在消失；B 没有这样写。",
							"只有 B 写快时尚进到百货店里；A 没有。",
							"正确。两边都怀疑快时尚的人气能否持续。",
						],
						choiceNotesEn: [
							"A writes the merits of department stores; B does not say each side has its merits.",
							"Only A says department stores are disappearing; B does not.",
							"Only B says fast fashion has moved into department stores; A does not.",
							"Correct. Both question whether fast fashion’s popularity will last.",
						],
					},
					{
						label: "6",
						jp: "{正|ただ}しいものはどれか。",
						cn: "正确的是哪一项？",
						en: "Which of the following is correct?",
						choices: [
							{ jp: "AもBもファストファッションの{人気|にんき}が{不況|ふきょう}と{関係|かんけい}があると{思|おも}っている。", cn: "A 和 B 都认为快时尚的人气和不景气有关系。", en: "Both A and B think fast fashion’s popularity is related to the recession." },
							{ jp: "AもBもファストファッションと{百貨店|ひゃっかてん}は{正反対|せいはんたい}の{価値|かち}があると{思|おも}っている。", cn: "A 和 B 都认为快时尚和百货店的价值正相反。", en: "Both A and B think fast fashion and department stores have opposite values." },
							{ jp: "Aは{客|きゃく}の{立場|たちば}から、Bは{店|みせ}の{立場|たちば}から{意見|いけん}を{書|か}いている。", cn: "A 从顾客立场、B 从店铺立场写意见。", en: "A writes from the customer’s standpoint, B from the store’s." },
							{ jp: "Aはファストファッションに{否定的|ひていてき}だが、Bは{好意的|こういてき}だ。", cn: "A 对快时尚持否定态度，B 则是好意的。", en: "A is negative toward fast fashion, but B is favorable." },
						],
						answer: 1,
						explanation:
							"A：「この不況下で安いファストファッションブランドに人気が集中し」。B：「ファストファッションがこの不況下で消費者の心をつかんでいる」。两边都把快时尚的人气和不景气连在一起。选 1。别册：2 并没有说两者「正相反」；3 不能断定 B 就是店家立场；4 B 虽然列举了受欢迎的理由，但后半在怀疑热潮能持续多久，称不上单纯好意。",
						explanationEn:
							"A: “In this recession, popularity has concentrated on cheap fast-fashion brands.” B: “Fast fashion has captured consumers’ hearts in this recession.” Both link the boom to the recession. Choice 1. The supplement: 2 never says the two are “opposites”; 3 you cannot say B is written from the store’s side; 4 B lists reasons for popularity but then doubts how long the fever will last, so it is not simply favorable.",
						choiceNotes: [
							"正确。两边都写「この不況下で」快时尚受欢迎。",
							"别册：并没有说两者价值正相反。",
							"别册：不能断定 B 就是店家立场。B 也在用「私が仕事着にしたい」。",
							"B 前半说明受欢迎的理由，后半却怀疑热潮能否持续，不是单纯好意。",
						],
						choiceNotesEn: [
							"Correct. Both write that fast fashion is popular “in this recession.”",
							"The supplement: they never say the two have opposite values.",
							"The supplement: you cannot say B is from the store’s side. B also uses “clothes I would want as workwear.”",
							"B explains the popularity, then doubts how long the fever will last — not simply favorable.",
						],
					},
				],
			},
		],
	},

	vocab: [
		{ jp: "新幹線", kana: "しんかんせん", cn: "新干线", en: "the shinkansen", pos: "名詞" },
		{ jp: "人並みに", kana: "ひとなみに", cn: "和普通人一样", en: "like anyone else", pos: "副詞" },
		{ jp: "身が入らない", kana: "みがはいらない", cn: "集中不了", en: "cannot concentrate", pos: "表現" },
		{ jp: "打ち砕く", kana: "うちくだく", cn: "打碎、粉碎", en: "to smash", pos: "動詞" },
		{ jp: "喫煙車両", kana: "きつえんしゃりょう", cn: "吸烟车厢", en: "a smoking car", pos: "名詞" },
		{ jp: "体育会系", kana: "たいいくかいけい", cn: "体育社团型、壮实气盛", en: "the jock type", pos: "名詞" },
		{ jp: "途切れる", kana: "とぎれる", cn: "中断", en: "to break off; to be interrupted", pos: "動詞" },
		{ jp: "気が気でない", kana: "きがきでない", cn: "心里七上八下", en: "beside oneself with worry", pos: "表現" },
		{ jp: "暴力団", kana: "ぼうりょくだん", cn: "暴力团、黑帮", en: "an organized crime group", pos: "名詞" },
		{ jp: "陣取る", kana: "じんどる", cn: "占据、坐下", en: "to take up a position", pos: "動詞" },
		{ jp: "百貨店", kana: "ひゃっかてん", cn: "百货店", en: "a department store", pos: "名詞" },
		{ jp: "ファストファッション", cn: "快时尚", en: "fast fashion", pos: "名詞" },
		{ jp: "不況", kana: "ふきょう", cn: "不景气、经济萧条", en: "a recession", pos: "名詞" },
		{ jp: "駐輪場", kana: "ちゅうりんじょう", cn: "自行车停放处", en: "a bicycle parking lot", pos: "名詞" },
		{ jp: "混雑", kana: "こんざつ", cn: "拥挤", en: "crowding; congestion", pos: "名詞" },
		{ jp: "古臭い", kana: "ふるくさい", cn: "过时、陈旧", en: "old-fashioned", pos: "い形" },
		{ jp: "価値観", kana: "かちかん", cn: "价值观", en: "sense of values", pos: "名詞" },
		{ jp: "切り口", kana: "きりくち", cn: "切入点、角度", en: "an angle; an approach", pos: "名詞" },
		{ jp: "生き残る", kana: "いきのこる", cn: "活下来、幸存", en: "to survive", pos: "動詞" },
	],

	grammar: [
		{
			pattern: "〜はずだ／〜はずだった",
			formation: "普通形＋はずだ",
			meaning: "按理应该……。〜はずだった＝本以为会……（结果往往相反）。",
			meaningEn: "it ought to be that …. ~hazu datta = I thought it would … (often it did not).",
			example: {
				jp: "{子|こ}どもは{少|すく}ないから{最悪|さいあく}の{事態|じたい}は{避|さ}けられる……はずだった。",
				cn: "孩子少，最糟的局面总能躲开……本该如此。",
				en: "There would be fewer children, so the worst could be avoided… or so I thought.",
			},
		},
		{
			pattern: "〜まい",
			formation: "動詞辞書形＋まい／動詞ない形＋まい",
			meaning: "不会……吧、按理不该……。否定的推测。＝〜ないだろう／〜はずがない。",
			meaningEn: "probably will not … / can hardly …. Negative conjecture. = nai darō / hazu ga nai.",
			example: {
				jp: "{老人|ろうじん}なら{騒|さわ}ぐ{元気|げんき}もあるまい。",
				cn: "老人总没力气吵了吧。",
				en: "An old man would hardly have the energy to make a racket.",
			},
		},
		{
			pattern: "〜どころではない",
			formation: "名詞／動詞辞書形＋どころではない",
			meaning: "哪里谈得上……、根本不是……的时候。",
			meaningEn: "this is no time for … / … is out of the question.",
			example: {
				jp: "{仕事|しごと}どころではなかった。",
				cn: "哪还谈得上工作。",
				en: "Work was out of the question.",
			},
		},
		{
			pattern: "〜なり",
			formation: "動詞辞書形＋なり",
			meaning: "一……就立刻……。",
			meaningEn: "as soon as … / the moment ….",
			example: {
				jp: "{隣|となり}に{座|すわ}るなり、{激|はげ}しい{咳|せき}をし{続|つづ}けた。",
				cn: "一在旁边坐下，就剧烈咳嗽个不停。",
				en: "The moment he sat down next to me he kept coughing violently.",
			},
		},
		{
			pattern: "いわゆる",
			meaning: "所谓的……。提示一个通行的叫法。",
			meaningEn: "so-called …. Flags a common label.",
			example: {
				jp: "いわゆるファストファッションの{店|みせ}",
				cn: "所谓快时尚的店",
				en: "a so-called fast-fashion store",
			},
		},
	],
};
