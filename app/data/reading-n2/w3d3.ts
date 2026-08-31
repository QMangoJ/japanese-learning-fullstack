import type { ReadingDay } from "../reading-n3/types";

// 第3週 3日目 意見文③ — printed pages 48–49
export const w3d3: ReadingDay = {
	week: 3,
	day: 3,
	label: "意見文③",
	labelKana: "いけんぶん",
	labelEn: "Opinions ③",
	printedPages: [48, 49],
	answerSource: "book",

	point: {
		title: "{筆者|ひっしゃ}が{最|もっと}も{言|い}いたいことを{理解|りかい}しよう！",
		titleCn: "找出笔者最想表达的意思！",
		titleEn: "Try to understand what the author wants to say most!",
		figure: {
			alt: "キャラクターが「何が言いたいのー！？」と叫び、もう一体が本を読んで頭の上に記号を浮かべているイラスト",
			cn: "一个角色喊「到底想说什么啊！？」，另一个在看书，头上冒出各种符号",
			en: "One character cries “What are you trying to say?!”; another reads a book with symbols floating overhead",
		},
		tips: [
			{
				jp: "{筆者|ひっしゃ}の{言|い}いたいことを{読|よ}み{取|と}るときは……",
				cn: "把握笔者想说的话时……",
				en: "When you read for what the writer wants to say…",
			},
			{
				jp: "{常識|じょうしき}や{一般的|いっぱんてき}な{意見|いけん}ではなく、{筆者|ひっしゃ}が{文章|ぶんしょう}の{中|なか}でいちばん{言|い}いたいことを{考|かんが}えましょう。",
				cn: "不要顾及常识或一般性意见，而应思考笔者在文章中最想表达的意思。",
				en: "Think about what the author really wants to say and try to go beyond commonly shared opinions.",
			},
		],
		expressions: [
			{ jp: "{一般的|いっぱんてき}な{意見|いけん}", kana: "いっぱんてきないけん", cn: "一般性意见（未必是笔者最想说的）", en: "a commonly held opinion" },
			{ jp: "{常識|じょうしき}", kana: "じょうしき", cn: "常识（不要只停留在常识）", en: "common sense" },
			{ jp: "{自分|じぶん}の{気持|きも}ち", kana: "きもち", cn: "自己的心情（不要用自己的感觉代替笔者）", en: "one’s own feelings" },
		],
	},

	renshu: {
		instruction: "{次|つぎ}の{会話文|かいわぶん}を{読|よ}んで、{後|あと}の{文|ぶん}から{正|ただ}しいものを{選|えら}ぼう。",
		instructionCn: "阅读下面的对话，从后面的句子中选出正确的。（答案在下一页）",
		instructionEn: "Read the conversation below and choose the correct statements from the sentences that follow. (Answers are on the next page.)",
		blocks: [
			{
				type: "speech",
				speaker: "Aさん",
				speakerCn: "A",
				speakerEn: "A",
				jp: "{近|ちか}ごろ、この{辺|へん}も{物騒|ぶっそう}（注1）になってきたね。",
				cn: "最近这一带也不太平了啊。",
				en: "This area has been getting dangerous lately, hasn’t it.",
			},
			{
				type: "speech",
				speaker: "Bさん",
				speakerCn: "B",
				speakerEn: "B",
				jp: "{本当|ほんとう}に。この{間|あいだ}もコンビニ{強盗|ごうとう}（注2）があったしね。",
				cn: "真是的。前不久便利店也发生了抢劫。",
				en: "It really has. There was a convenience-store robbery the other day too.",
			},
			{
				type: "speech",
				speaker: "Aさん",
				speakerCn: "A",
				speakerEn: "A",
				jp: "あの{犯人|はんにん}の{高校生|こうこうせい}、{家|いえ}はお{金持|かねも}ちでお{金|かね}には{不自由|ふじゆう}していなかった（注3）らしいよ。",
				cn: "那个犯人是高中生，家里好像很有钱，并不缺钱花。",
				en: "That high-school culprit apparently came from a wealthy family and wasn’t short of money.",
			},
			{
				type: "speech",
				speaker: "Bさん",
				speakerCn: "B",
				speakerEn: "B",
				jp: "じゃ、どうしてそんなことしたのかな。",
				cn: "那他为什么要干那种事呢？",
				en: "Then why did he do it?",
			},
			{
				type: "speech",
				speaker: "Aさん",
				speakerCn: "A",
				speakerEn: "A",
				jp: "{ただ|ただ}スリルを{味|あじ}わいたかった（注4）んだって。",
				cn: "听说只是想体验一下刺激。",
				en: "He just wanted to enjoy a thrill, apparently.",
			},
			{
				type: "speech",
				speaker: "Bさん",
				speakerCn: "B",
				speakerEn: "B",
				jp: "え？　そんな{理由|りゆう}ってないんじゃないの？",
				cn: "诶？那也算理由吗？",
				en: "What? That isn’t a reason, is it?",
			},
		],
		footnotes: [
			{ marker: "（注1）", term: "物騒", jp: "ぶっそう", cn: "不安定、不安全", en: "dangerous" },
			{ marker: "（注2）", term: "強盗", jp: "ごうとう", cn: "强盗、抢劫", en: "burglary; robbery" },
			{ marker: "（注3）", term: "不自由しない", jp: "ふじゆうしない", cn: "不愁吃不愁穿", en: "to have enough money" },
			{ marker: "（注4）", term: "スリルを味わう", jp: "スリルをあじわう", cn: "体验惊险刺激", en: "to enjoy a thrill" },
		],
		hint: {
			jp: "{最終行|さいしゅうぎょう}「そんな{理由|りゆう}ってないんじゃないの？」（＝そんな{理由|りゆう}は{理由|りゆう}としておかしい）",
			cn: "最后一行「那种也能叫理由吗？」＝那种理由作为理由是说不过去的。",
			en: "The last line “That isn’t a reason, is it?” means such a reason does not count as a proper reason.",
		},
		choices: [
			{ jp: "{最近|さいきん}この{近|ちか}くは{危険|きけん}な{出来事|できごと}が{多|おお}い。", cn: "最近这一带危险的事情很多。", en: "Lately there have been many dangerous incidents around here." },
			{ jp: "コンビニ{強盗|ごうとう}の{犯人|はんにん}はまだ{捕|つか}まっていない。", cn: "便利店抢劫的犯人还没被抓住。", en: "The convenience-store robber has not been caught yet." },
			{ jp: "{犯人|はんにん}の{高校生|こうこうせい}はお{金持|かねも}ちの{家|いえ}に{強盗|ごうとう}に{入|はい}った。", cn: "那个高中生犯人抢的是有钱人的家。", en: "The high-school culprit robbed a wealthy household." },
			{ jp: "{犯人|はんにん}はお{金|かね}が{目的|もくてき}でコンビニ{強盗|ごうとう}をした。", cn: "犯人是以钱为目的抢劫便利店的。", en: "The culprit robbed the convenience store for money." },
			{ jp: "{犯人|はんにん}はスリルを{楽|たの}しむためにコンビニ{強盗|ごうとう}をした。", cn: "犯人是为了享受刺激而抢劫便利店的。", en: "The culprit robbed the convenience store in order to enjoy a thrill." },
		],
		answers: [1, 5],
	},

	mondai: {
		instruction: "{次|つぎ}の{文章|ぶんしょう}を{読|よ}んで、{後|あと}の{問|と}いに{答|こた}えなさい。",
		instructionCn: "阅读下面的文章，回答后面的问题。（答案在别册 p.4）",
		instructionEn: "Read the following text and answer the questions that follow. (Answers are in the separate booklet, p. 4.)",
		blocks: [
			{
				type: "paragraph",
				indent: true,
				jp: "{日本|にほん}のことわざに「{盗人|ぬすびと}にも{三分|さんぶ}の{理|り}」というのがある。この{場合|ばあい}、「{三分|さんぶ}」は10{分|ぶん}の3、「{理|り}」は{物事|ものごと}の{理由|りゆう}を{表|あらわ}す。つまり「たとえ{泥棒|どろぼう}であっても30％くらいは{納得|なっとく}のできる{理由|りゆう}がある*（だから、どんなことにも{無理|むり}に{理由|りゆう}をつけることはできる）」という{意味|いみ}だ。",
				cn: "日本有句谚语叫「盗贼也有三分理」。这里的「三分」是十分之三，「理」表示事情的理由。也就是说「即便是小偷，也有大约 30% 说得通的理由*（所以无论什么事都可以硬安上一个理由）」。",
				en: "There is a Japanese proverb, “Even a thief has 30 percent of a reason.” Here “three tenths” means 30 percent, and “ri” means a reason for something. In other words, “even a thief has a reason that is about 30 percent understandable* (so you can force a reason onto anything).”",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "ところが①{近|ちか}ごろの{犯罪|はんざい}はどうだろう。",
				cn: "可是，①近来的犯罪又如何呢。",
				en: "But what about ①crime these days?",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "{何|なに}の{不自由|ふじゆう}もなさそうな{普通|ふつう}の{少年少女|しょうねんしょうじょ}が、{特|とく}に{欲|ほ}しくもないものを{万引き|まんびき}したり（注1）、ただ{退屈|たいくつ}だからという{理由|りゆう}で{物|もの}を{壊|こわ}したりする。「なぜそういうことをした」と{聞|き}いても、{彼|かれ}らは「{別|べつ}に」「なんとなく」などと{答|こた}えることが{多|おお}い。{先日|せんじつ}のコンビニ{強盗|ごうとう}した{高校生|こうこうせい}も、ただスリルを{楽|たの}しむためにやったということだ。また、{最近|さいきん}は「{騒|さわ}ぐと{殺|ころ}す」というような{言葉|ことば}もなく、いきなり{暴行|ぼうこう}（注2）あるいは{殺害|さつがい}し（注3）、{金|かね}などを{奪|うば}う{犯罪|はんざい}も{多|おお}い。これなどは{被害者|ひがいしゃ}をまったく{人間扱い|にんげんあつかい}せず、{効率|こうりつ}（注4）のみを{考|かんが}えたやり{方|かた}である**。",
				cn: "看起来什么都不缺的普通少男少女，去偷自己并不特别想要的东西（注1），或者仅仅因为无聊就毁坏物品。问「为什么要做那种事」，他们多半回答「没什么」「就是那样」。前不久抢劫便利店的高中生，据说也只是为了享受刺激才干的。另外，最近很多犯罪连「再喊就杀了你」这类话都没有，突然施暴（注2）或杀害（注3），再抢走钱财。这些完全不把被害人当人看，只考虑效率（注4）的做法**。",
				en: "Ordinary boys and girls who seem to want for nothing shoplift things they do not especially want (note 1), or smash things just because they are bored. Asked why they did it, they often answer “no reason” or “just because.” The high-school student who robbed a convenience store the other day also did it simply to enjoy a thrill. And lately there are many crimes that snatch money after an assault (note 2) or a killing (note 3) with no words even like “make a sound and I’ll kill you.” That is a way of doing things that does not treat the victim as a human being at all, and thinks only of efficiency (note 4).**",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "「{理|り}」などというものは、どこを{探|さが}しても「{三分|さんぶ}」どころか、（②）。",
				cn: "所谓「理」，任你怎么找，别说「三分」，（②）。",
				en: "As for “a reason,” however hard you look, far from “30 percent,” (②).",
			},
		],
		footnotes: [
			{ marker: "（注1）", term: "万引きする", jp: "まんびきする", cn: "扒窃、顺手牵羊", en: "to shoplift" },
			{ marker: "（注2）", term: "暴行する", jp: "ぼうこうする", cn: "施暴", en: "to assault" },
			{ marker: "（注3）", term: "殺害する", jp: "さつがいする", cn: "杀害", en: "to murder" },
			{ marker: "（注4）", term: "効率", jp: "こうりつ", cn: "效率", en: "efficiency" },
		],
		pageNotes: [
			{
				jp: "＊たとえ{泥棒|どろぼう}であっても30％くらいは{納得|なっとく}のできる{理由|りゆう}がある",
				cn: "即便是小偷也有三分令人同情的理由",
				en: "Among the reasons for stealing provided by robbers, 30% is reasonable",
			},
			{
				jp: "＊＊{被害者|ひがいしゃ}をまったく{人間扱い|にんげんあつかい}せず、{効率|こうりつ}のみを{考|かんが}えたやり{方|かた}",
				cn: "这些是完全不把受害人看待，而遂只想到效率的做法。",
				en: "In this case, the suspect showed no respect for the victim as a human and just quickly took what he wanted.",
			},
		],
		questions: [
			{
				label: "問1",
				jp: "{筆者|ひっしゃ}が①{近|ちか}ごろの{犯罪|はんざい}について{最|もっと}も{言|い}いたいのはどれか。",
				cn: "关于①近来的犯罪，笔者最想说的是哪一项？",
				en: "What does the writer most want to say about ①crime these days?",
				choices: [
					{ jp: "{昔|むかし}とは{違|ちが}って、{今|いま}は{理由|りゆう}のない{犯罪|はんざい}が{多|おお}い。", cn: "和过去不同，现在没有理由的犯罪很多。", en: "Unlike the past, there is a lot of crime now with no reason." },
					{ jp: "{昔|むかし}とは{違|ちが}って、{今|いま}の{犯罪者|はんざいしゃ}はお{金|かね}が{目的|もくてき}ではない。", cn: "和过去不同，现在的犯罪者不以钱为目的。", en: "Unlike the past, criminals now are not after money." },
					{ jp: "{昔|むかし}に{比|くら}べて、{今|いま}は{強盗|ごうとう}や{殺人|さつじん}などの{犯罪|はんざい}が{多|おお}い。", cn: "和过去相比，现在抢劫、杀人等犯罪很多。", en: "Compared with the past, there is more robbery and murder now." },
					{ jp: "{昔|むかし}に{比|くら}べて、{今|いま}の{犯罪者|はんざいしゃ}は{普通|ふつう}の{若者|わかもの}が{多|おお}い。", cn: "和过去相比，现在的犯罪者里普通年轻人很多。", en: "Compared with the past, many criminals now are ordinary young people." },
				],
				answer: 1,
				explanation:
					"本课要点是抓「笔者最想说的话」，不要停在常识。开头用「盗人にも三分の理」垫底，中间举「なんとなく」「スリルのため」「言葉もなくいきなり」等例子，结尾说「理」连三分都找不到。贯穿全文的主张是：近来很多犯罪没有理由。选 1。别册也注：一行目的「盗人」读「ぬすびと」，也可读「ぬすっと」。",
				explanationEn:
					"This lesson’s point is to catch what the writer most wants to say, not a piece of common sense. The proverb “even a thief has 30 percent of a reason” is the setup; the examples are “just because,” “for a thrill,” and assault with no words at all; the close says you cannot find even 30 percent of a reason. The claim that runs through the whole text is that much crime now has no reason. Choose 1. The answer key also notes that 盗人 in line 1 is read nusubito (also nusutto).",
				choiceNotes: [
					"正确。与谚语对比，现在的犯罪连「三分的理」都没有。",
					"文中也写到「金などを奪う犯罪」。不是「都不以钱为目的」。",
					"抢劫、杀人只是举例，不是最想强调的一点。",
					"「普通の少年少女」是例子之一，不是全文主旨。",
				],
				choiceNotesEn: [
					"Correct. Set against the proverb, crime now does not even have “30 percent of a reason.”",
					"The text also mentions crimes that snatch money. It is not “none of them are after money.”",
					"Robbery and murder are examples, not the main point.",
					"“Ordinary boys and girls” is one example, not the claim of the whole passage.",
				],
			},
			{
				label: "問2",
				jp: "（②）に{入|はい}る{言葉|ことば}として{最|もっと}も{適当|てきとう}なものはどれか。",
				cn: "填入（②）最合适的是哪一项？",
				en: "Which words fit best in (②)?",
				choices: [
					{ jp: "1％くらいはあると{言|い}えるだろう", cn: "大概还能说有那么 1% 吧", en: "you could say there is about 1 percent" },
					{ jp: "1％くらいは{見|み}つかるかもしれない", cn: "也许还能找到大约 1%", en: "you might find about 1 percent" },
					{ jp: "まったく{見|み}つからないのである", cn: "是完全找不到的", en: "you cannot find any at all" },
					{ jp: "まったくないとは{言|い}えないのである", cn: "也不能说完全没有", en: "you cannot say there is none at all" },
				],
				answer: 3,
				explanation:
					"「三分どころか」是否定「三分」之后再往更差的方向说。前文已写他们答「別に」「なんとなく」，等于没有理由。所以不是「还有 1%」，而是「完全找不到」，选 3。1、2 还在承认有一点理，4 「不能说完全没有」方向反了。",
				explanationEn:
					"“Far from 30 percent” rejects “30 percent” and then goes further in the negative direction. They already answer “no reason” / “just because,” i.e. there is no reason. So it is not “there is still 1 percent”; it is “you cannot find any at all.” Choose 3. 1 and 2 still grant a little reason; 4 “you cannot say there is none” goes the wrong way.",
				choiceNotes: [
					"「どころか」后面应比「三分」更没有理，不能改成「还有 1%」。",
					"同样还在说「找得到一点」，与全文相反。",
					"正确。连三分都没有，是完全找不到。",
					"双重否定等于承认还有理，和「どころか」的方向相反。",
				],
				choiceNotesEn: [
					"After dokoroka the next idea should be even less “reason” than 30 percent, not “there is still 1 percent.”",
					"This still says you can find a little, which is the opposite of the passage.",
					"Correct. Not even 30 percent — none at all.",
					"The double negative still allows some reason, the wrong direction for dokoroka.",
				],
			},
		],
	},

	vocab: [
		{ jp: "筆者", kana: "ひっしゃ", cn: "笔者、作者", en: "the writer; the author", pos: "名詞" },
		{ jp: "常識", kana: "じょうしき", cn: "常识", en: "common sense", pos: "名詞" },
		{ jp: "物騒", kana: "ぶっそう", cn: "不安定、不安全", en: "unsafe; dangerous", pos: "な形" },
		{ jp: "強盗", kana: "ごうとう", cn: "强盗、抢劫", en: "robbery", pos: "名詞" },
		{ jp: "犯人", kana: "はんにん", cn: "犯人", en: "culprit; offender", pos: "名詞" },
		{ jp: "不自由", kana: "ふじゆう", cn: "不自由、短缺", en: "want; inconvenience", pos: "名詞・な形" },
		{ jp: "スリル", cn: "刺激、惊险", en: "a thrill", pos: "名詞" },
		{ jp: "味わう", kana: "あじわう", cn: "体验、品味", en: "to taste; to experience", pos: "動詞" },
		{ jp: "盗人", kana: "ぬすびと", cn: "盗贼（也可读ぬすっと）", en: "a thief", pos: "名詞" },
		{ jp: "ことわざ", cn: "谚语", en: "a proverb", pos: "名詞" },
		{ jp: "納得", kana: "なっとく", cn: "理解、接受", en: "acceptance; being convinced", pos: "名詞・動詞" },
		{ jp: "万引き", kana: "まんびき", cn: "扒窃", en: "shoplifting", pos: "名詞・動詞" },
		{ jp: "退屈", kana: "たいくつ", cn: "无聊", en: "boredom; boring", pos: "名詞・な形" },
		{ jp: "暴行", kana: "ぼうこう", cn: "暴行", en: "assault", pos: "名詞・動詞" },
		{ jp: "殺害", kana: "さつがい", cn: "杀害", en: "murder; killing", pos: "名詞・動詞" },
		{ jp: "被害者", kana: "ひがいしゃ", cn: "被害人", en: "victim", pos: "名詞" },
		{ jp: "効率", kana: "こうりつ", cn: "效率", en: "efficiency", pos: "名詞" },
	],

	grammar: [
		{
			pattern: "たとえ〜ても",
			formation: "たとえ＋ても／でも",
			meaning: "即使……也……。后项不受前项影响。",
			meaningEn: "even if…. The second part holds regardless of the first.",
			example: {
				jp: "たとえ{泥棒|どろぼう}であっても30％くらいは{納得|なっとく}のできる{理由|りゆう}がある。",
				cn: "即便是小偷，也有大约 30% 说得通的理由。",
				en: "Even a thief has a reason that is about 30 percent understandable.",
			},
		},
		{
			pattern: "〜どころか",
			formation: "名詞／普通形＋どころか",
			meaning: "岂止……（后面程度更甚）。这里用于「三分都找不到」。",
			meaningEn: "far from…. Here: far from 30 percent, there is none.",
			example: {
				jp: "「{三分|さんぶ}」どころか、まったく{見|み}つからないのである。",
				cn: "别说「三分」，是完全找不到。",
				en: "Far from “30 percent,” you cannot find any at all.",
			},
		},
		{
			pattern: "〜ために",
			formation: "動詞辞書形／名詞＋のために",
			meaning: "为了……。表示目的。",
			meaningEn: "in order to…; for the purpose of….",
			example: {
				jp: "ただスリルを{楽|たの}しむためにやった。",
				cn: "只是为了享受刺激才干的。",
				en: "He did it simply in order to enjoy a thrill.",
			},
		},
	],
};
