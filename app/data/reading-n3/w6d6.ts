import type { ReadingDay } from "./types";

// 第6週 6日目 社会に関する文章 — printed pages 102–103
// 別冊 p.7（第6週の解答）は今回のスキャンに含まれていないため、答えは本文から導出。
export const w6d6: ReadingDay = {
	week: 6,
	day: 6,
	label: "社会に関する文章",
	labelKana: "しゃかいにかんするぶんしょう",
	labelEn: "Sentences on Social Issues",
	printedPages: [102, 103],
	answerSource: "derived",

	point: {
		title: "{複雑|ふくざつ}な{文章|ぶんしょう}を{単純|たんじゅん}にして{理解|りかい}しよう！",
		titleCn: "把复杂的句子简化后再理解！",
		titleEn: "Learn to simplify sentences!",
		figure: {
			alt: "「私はそういうふうに見えないかもしれないし、なりたくなったわけではないが教師です。」という長い文が、矢印の下で「私は教師です。」と単純化されている図",
			cn: "长句「私はそういうふうに見えないかもしれないし、なりたくなったわけではないが教師です。」经过简化，只剩下主干：「私は教師です。」",
			en: "The long sentence “私はそういうふうに見えないかもしれないし、なりたくなったわけではないが教師です。” is simplified until only the core remains: “私は教師です.”",
		},
		tips: [
			{
				jp: "{難|むずか}しく{見|み}える{文|ぶん}も、{飾|かざ}りの{部分|ぶぶん}を{省|はぶ}くと{単純|たんじゅん}な{文章|ぶんしょう}になります。",
				cn: "看起来很难的句子，**去掉修饰成分后就变得很简单**。先找出「主语＋谓语」这个主干，再把定语、插入语一层层加回去。",
				en: "Even a sentence that looks hard becomes simple once you drop the decorations. First find the core — subject + predicate — then add the modifiers and asides back one layer at a time.",
			},
		],
		expressions: [
			{ jp: "バイト", cn: "打工、临时工", en: "a part-time job" },
			{ jp: "パート", cn: "钟点工", en: "part-time" },
			{ jp: "正社員", kana: "せいしゃいん", cn: "正式员工", en: "a permanent employee" },
			{ jp: "派遣社員", kana: "はけんしゃいん", cn: "派遣员工", en: "temporary staff" },
			{ jp: "常勤", kana: "じょうきん", cn: "专职", en: "full-time" },
			{ jp: "非常勤", kana: "ひじょうきん", cn: "兼职", en: "part-time" },
			{ jp: "就職する", kana: "しゅうしょくする", cn: "就业、找到工作", en: "to get a job" },
			{ jp: "フリーター", cn: "自由打工者", en: "a job-hopping part-time worker" },
			{ jp: "雇う", kana: "やとう", cn: "雇用", en: "to hire" },
			{ jp: "採用", kana: "さいよう", cn: "录用、招聘", en: "employment / recruiting" },
		],
	},

	renshu: {
		instruction: "{次|つぎ}の{男|おとこ}の{人|ひと}の{言葉|ことば}を{読|よ}んで、{後|あと}の{文|ぶん}から{正|ただ}しいものを{選|えら}ぼう。",
		instructionCn: "阅读下面这个男子说的话，从后面的句子中选出正确的。（答案在下一页）",
		instructionEn: "Read what the man says below and choose the correct statements from the sentences that follow. (Answers are on the next page.)",
		blocks: [
			{
				type: "speech",
				speaker: "{男|おとこ}の{人|ひと}",
				speakerCn: "男子",
				speakerEn: "The man",
				jp: "ぼくは2{年前|ねんまえ}に{大学|だいがく}を{卒業|そつぎょう}したのですが、まだちゃんと{就職|しゅうしょく}していません。いわゆるフリーターなんです。{友|とも}だちにもフリーター、{多|おお}いですよ。ぼくのようなフリーターが{増|ふ}えると、{将来|しょうらい}、{日本|にほん}の{国|くに}が{大変|たいへん}なことになるって{言|い}われるんですが、ぼくだってできれば{正社員|せいしゃいん}になりたいと{思|おも}っているんです。やっぱりバイトだけでは{将来|しょうらい}の{生活|せいかつ}が{不安|ふあん}ですからね。でも{不況|ふきょう}（※）だし、いい{会社|かいしゃ}は{雇|やと}ってくれないんですよ。",
				cn: "我两年前大学毕业，可到现在还没正经就业。就是所谓的自由打工者。我朋友里自由打工者也很多。人家说像我这样的自由打工者一多，将来日本这个国家可就麻烦了；可我自己也是想当正式员工的啊。毕竟光靠打零工，将来的生活让人不安嘛。可是又赶上不景气，好公司根本不肯雇我。",
				en: "I graduated from university two years ago, but I still don’t have a proper job. I’m what’s called a freeter. A lot of my friends are freeters too. People say that if freeters like me increase, Japan will be in trouble in the future — but I’d like to become a regular employee if I could. After all, just living on part-time work makes you anxious about the future. But it’s a slump, and good companies won’t hire me.",
			},
		],
		footnotes: [{ marker: "※", term: "不況", jp: "economic slump", cn: "不景气、经济萧条", en: "economic slump" }],
		choices: [
			{ jp: "この{男|おとこ}の{人|ひと}は{今|いま}アルバイトをしている。", cn: "这个男子现在在打工。", en: "This man is doing part-time work now." },
			{ jp: "この{男|おとこ}の{人|ひと}はちゃんと{就職|しゅうしょく}したいと{思|おも}っている。", cn: "这个男子希望能正经就业。", en: "This man wants a proper job." },
			{
				jp: "フリーターが{増|ふ}えると{日本|にほん}の{国|くに}にとってよくないと{言|い}われている。",
				cn: "人们说自由打工者增多对日本这个国家不好。",
				en: "People say that an increase in freeters is bad for Japan.",
			},
			{ jp: "この{男|おとこ}の{人|ひと}のバイト{代|だい}は{安|やす}い。", cn: "这个男子的打工工资很低。", en: "This man’s part-time pay is low." },
			{
				jp: "この{男|おとこ}の{人|ひと}は{自分|じぶん}の{生活|せいかつ}より{日本|にほん}の{将来|しょうらい}を{心配|しんぱい}している。",
				cn: "比起自己的生活，这个男子更担心日本的未来。",
				en: "This man is more worried about Japan’s future than about his own life.",
			},
		],
		answers: [1, 2, 3],
		hint: {
			jp: "「バイトだけでは{将来|しょうらい}の{生活|せいかつ}が{不安|ふあん}」＝{心配|しんぱい}しているのは{自分|じぶん}の{生活|せいかつ}。バイト{代|だい}については{何|なに}も{言|い}っていない。",
			cn: "「光靠打零工将来生活让人不安」说明他担心的是**自己的**生活；关于打工工资高低文中完全没提。",
			en: "“Just living on part-time work makes you anxious about the future” means what he is worried about is his own life. He never says anything about how high or low his pay is.",
		},
	},

	mondai: {
		instruction: "{次|つぎ}の{文章|ぶんしょう}を{読|よ}んで、{後|あと}の{問|と}いに{答|こた}えなさい。",
		instructionCn: "阅读下面的文章，回答后面的问题。（原书答案在别册 p.7）",
		instructionEn: "Read the passage below and answer the questions that follow. (Answers are in the supplement, p. 7.)",
		blocks: [
			{
				type: "paragraph",
				indent: true,
				jp: "フリーターとは、{学生|がくせい}や{主婦|しゅふ}を{除|のぞ}く（※1）15{歳|さい}から34{歳|さい}の{人|ひと}たちのうち、{主|おも}にパートやアルバイトなど、{正社員以外|せいしゃいんいがい}で{働|はたら}いている{人|ひと}たちのことを{言|い}う＊1。このフリーターの{数|かず}は2003{年|ねん}には217{万人|まんにん}に{達|たっ}したが、その10{年前|ねんまえ}と{比|くら}べて{約|やく}2{倍|ばい}に{増|ふ}えたことで、その{呼|よ}び{名|な}とともに{話題|わだい}となった。",
				cn: "所谓「自由打工者（フリーター）」，是指除学生和主妇之外、年龄在 15 岁至 34 岁之间，主要以计时工、临时工等正式员工以外的形式工作的人＊1。这类人的数量在 2003 年达到了 217 万人，与 10 年前相比增加了约 2 倍，连同这个称呼一起成了社会话题。",
				en: "A “freeter” is someone, excluding students and housewives, between the ages of 15 and 34 who works mainly as a part-timer or casual worker — that is, in a form other than a regular employee＊1. The number of freeters reached 2.17 million in 2003, and because it had roughly doubled compared with ten years earlier, the name itself became a topic of discussion.",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "フリーターが{増|ふ}えたのは、{若|わか}い{人|ひと}たちの{働|はたら}こうとする{気持|きも}ちや{就職|しゅうしょく}しようという{意識|いしき}の{低下|ていか}などが{原因|げんいん}とも{言|い}われたが、{何|なん}といっても10{年以上続|ねんいじょうつづ}いた{不況|ふきょう}のせいであった＊2。{企業|きぎょう}（※2）は{年々採用|ねんねんさいよう}を{減|へ}らし、また、{賃金|ちんぎん}（※3）をできるだけ{安|やす}く{抑|おさ}える{努力|どりょく}をしてきた。つまり、{企業|きぎょう}が{安|やす}い{労働力|ろうどうりょく}を{求|もと}めた{結果|けっか}、フリーターが{増加|ぞうか}したと{言|い}える＊3。",
				cn: "关于自由打工者增多的原因，也有人说是年轻人工作意愿和就业意识的下降等；但归根结底，还是持续了 10 年以上的经济不景气造成的＊2。企业逐年削减录用名额，并且努力把工资压得尽可能低。也就是说，可以说正是企业追求廉价劳动力的结果，导致了自由打工者的增加＊3。",
				en: "Some said the increase in freeters was caused by a drop in young people’s will to work and their awareness of getting a job — but above all it was because of a slump that had lasted more than ten years＊2. Firms cut hiring year after year, and they also worked to keep wages as low as they could. In other words, you can say that freeters increased as a result of firms looking for cheap labor＊3.",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "フリーターが{増|ふ}えると{消費|しょうひ}も{税収|ぜいしゅう}（※4）も{減|へ}る。そうなると、{日本|にほん}の{経済成長率|けいざいせいちょうりつ}（※5）も{大|おお}きく{低下|ていか}し、さまざまな{社会問題|しゃかいもんだい}が{起|お}きてくる。2003{年以降|ねんいこう}、{景気|けいき}が{回復|かいふく}して、フリーターの{数|かず}も{下降|かこう}したが、{景気|けいき}の{低迷|ていめい}とともに{再|ふたた}び{数年|すうねん}ぶりに{上昇|じょうしょう}し{始|はじ}めている＊4。",
				cn: "自由打工者一多，消费和税收都会减少。这样一来，日本的经济增长率也会大幅下滑，各种社会问题将随之而来。2003 年以后，随着经济复苏，自由打工者的人数一度下降，但伴随景气低迷，时隔数年又开始回升＊4。",
				en: "If freeters increase, both consumption and tax revenues fall. Then Japan’s rate of economic growth also falls sharply, and various social problems arise. After 2003, as the economy recovered, the number of freeters also declined — but along with a sluggish economy it has started to rise again for the first time in several years＊4.",
			},
		],
		footnotes: [
			{ marker: "※1", term: "除く", jp: "to remove / exclude", cn: "除去、不包括", en: "to remove / exclude" },
			{ marker: "※2", term: "企業", jp: "an enterprise", cn: "企业", en: "an enterprise" },
			{ marker: "※3", term: "賃金", jp: "wages", cn: "工资", en: "wages" },
			{ marker: "※4", term: "税収", jp: "tax revenues", cn: "税收", en: "tax revenues" },
			{ marker: "※5", term: "経済成長率", jp: "rate of economic growth", cn: "经济增长率", en: "rate of economic growth" },
		],
		pageNotes: [
			{
				jp: "＊1 'Freeters' are people between the ages of 15 and 34, excluding students and housewives, who are engaged in part-time or casual work.",
				cn: "＊1 自由打工者是指除学生、主妇之外，年龄在 15〜34 岁、以计时工或临时工形式工作的人。",
				en: "＊1 'Freeters' are people between the ages of 15 and 34, excluding students and housewives, who are engaged in part-time or casual work.",
			},
			{ jp: "＊2 It was the result of Japan having been in a recession for over 10 years.", cn: "＊2 这是日本持续 10 年以上不景气造成的结果。", en: "＊2 It was the result of Japan having been in a recession for over 10 years." },
			{
				jp: "＊3 the number of 'freeters' has increased as a result of enterprises hiring cheaper labor",
				cn: "＊3 自由打工者增加，是企业雇用廉价劳动力的结果。",
				en: "＊3 the number of 'freeters' has increased as a result of enterprises hiring cheaper labor",
			},
			{
				jp: "＊4 with the economic climate becoming sluggish again, the number of 'freeters' is starting to climb back up for the first time in several years",
				cn: "＊4 随着经济再度低迷，自由打工者人数时隔数年又开始回升。",
				en: "＊4 with the economic climate becoming sluggish again, the number of 'freeters' is starting to climb back up for the first time in several years",
			},
		],
		questions: [
			{
				label: "問1",
				jp: "フリーターの{数|かず}が{増|ふ}えたいちばんの{原因|げんいん}は{何|なに}か。",
				cn: "自由打工者人数增加的最主要原因是什么？",
				en: "What is the main reason the number of freeters increased?",
				choices: [
					{ jp: "{若者|わかもの}に{働|はたら}く{意志|いし}がないこと", cn: "年轻人没有工作意愿", en: "Young people have no will to work" },
					{ jp: "{労働人口|ろうどうじんこう}が{増加|ぞうか}し{過|す}ぎたこと", cn: "劳动人口增加过多", en: "The working population increased too much" },
					{ jp: "{会社|かいしゃ}の{賃金|ちんぎん}が{安|やす}すぎること", cn: "公司的工资太低", en: "Company wages are too low" },
					{
						jp: "{不況|ふきょう}で{会社|かいしゃ}が{新入社員|しんにゅうしゃいん}の{採用|さいよう}を{減|へ}らしたこと",
						cn: "因不景气，公司减少了新员工的录用",
						en: "Because of the slump, companies cut hiring of new employees",
					},
				],
				answer: 4,
				explanation:
					"第二段用「〜とも言われたが、**何といっても**〜であった」这个句式把两种原因分了主次：年轻人意识下降只是「也有人说」，而真正的主因是「10年以上続いた不況」。紧接着解释这个不景气如何起作用——「企業は年々採用を減らし」。把主因和机制合起来看，就是「因不景气企业减少录用」，所以 4 正确。",
				explanationEn:
					"The second paragraph uses “some said …, **but above all** it was …” to rank two causes: a drop in young people’s awareness is only “some said,” and the real main cause is “a slump that had lasted more than ten years.” It then explains how that slump worked — “firms cut hiring year after year.” Put the main cause and the mechanism together and you get “because of the slump, companies cut hiring,” so 4 is correct.",
				choiceNotes: [
					"「若い人たちの働こうとする気持ち…の低下」前面有「とも言われたが」，是被否定的次要说法。",
					"文中完全没有提到劳动人口的增减。",
					"压低工资是企业的做法之一，但直接导致人数增加的是「採用を減らし」；而且工资低本身也是不景气的结果。",
					"正确。「何といっても…不況のせいであった」＋「企業は年々採用を減らし」。",
				],
				choiceNotesEn: [
					"“A drop in young people’s will to work” is introduced with “some said …, but,” so it is the lesser claim being set aside.",
					"The text never mentions a rise or fall in the working population.",
					"Holding wages down is one thing firms did, but what directly increased the numbers is “cut hiring”; and low wages themselves are a result of the slump.",
					"Correct. “Above all it was because of the slump” + “firms cut hiring year after year.”",
				],
			},
			{
				label: "問2",
				jp: "この{文章|ぶんしょう}で{筆者|ひっしゃ}が{最|もっと}も{言|い}いたいことは{何|なに}か。",
				cn: "在这篇文章中，笔者最想说的是什么？",
				en: "What does the writer most want to say in this passage?",
				choices: [
					{
						jp: "フリーターが{増加|ぞうか}していくと{日本|にほん}の{将来|しょうらい}は{大変|たいへん}だ。",
						cn: "自由打工者不断增加的话，日本的未来会很艰难。",
						en: "If freeters keep increasing, Japan’s future will be hard.",
					},
					{ jp: "これからもフリーターは{増|ふ}え{続|つづ}けるだろう。", cn: "今后自由打工者还会继续增加吧。", en: "Freeters will probably keep increasing from now on." },
					{
						jp: "{会社|かいしゃ}はフリーターに{労働力|ろうどうりょく}を{求|もと}めるべきではない。",
						cn: "公司不应该向自由打工者索取劳动力。",
						en: "Companies should not look to freeters for labor.",
					},
					{ jp: "フリーターをしている{若|わか}い{人|ひと}の{将来|しょうらい}が{心配|しんぱい}だ。", cn: "担心做自由打工者的年轻人的未来。", en: "The writer is worried about the future of young people who are freeters." },
				],
				answer: 1,
				explanation:
					"文章的落点在最后一段：「フリーターが増えると消費も税収も減る。そうなると、日本の経済成長率も大きく低下し、さまざまな社会問題が起きてくる」，而且结尾指出人数「再び…上昇し始めている」——也就是说，这个隐忧正在重演。整段的指向都是**对日本整体前景的担忧**，所以 1 正确。",
				explanationEn:
					"The landing point of the piece is the last paragraph: “If freeters increase, both consumption and tax revenues fall. Then Japan’s rate of economic growth also falls sharply, and various social problems arise,” and the ending notes that the numbers “have started to rise again” — in other words, this worry is coming back. The whole paragraph points to concern about Japan’s overall future, so 1 is correct.",
				choiceNotes: [
					"正确。最后一段把「フリーター増加 → 消費・税収減 → 経済成長率低下 → 社会問題」串成一条链。",
					"文中只说「再び上昇し始めている」，并没有预测今后会一直增加。",
					"文章是在分析原因（企业追求廉价劳动力），并没有提出「不应该」这样的主张。",
					"笔者担心的是国家的经济与社会问题，不是个别年轻人的前途。",
				],
				choiceNotesEn: [
					"Correct. The last paragraph chains “more freeters → less consumption and tax → lower growth → social problems.”",
					"The text only says “has started to rise again”; it does not predict they will keep increasing forever.",
					"The passage is analyzing a cause (firms looking for cheap labor); it does not claim that they “should not.”",
					"What the writer is worried about is the country’s economy and social problems, not the future of individual young people.",
				],
			},
		],
	},

	vocab: [
		{ jp: "フリーター", cn: "自由打工者", en: "a freeter; a job-hopping part-timer", pos: "名詞" },
		{ jp: "主婦", kana: "しゅふ", cn: "主妇", en: "a housewife", pos: "名詞" },
		{ jp: "除く", kana: "のぞく", cn: "除去、不包括", en: "to exclude", pos: "動詞" },
		{ jp: "正社員", kana: "せいしゃいん", cn: "正式员工", en: "a regular / permanent employee", pos: "名詞" },
		{ jp: "達する", kana: "たっする", cn: "达到", en: "to reach", pos: "動詞" },
		{ jp: "呼び名", kana: "よびな", cn: "称呼、名称", en: "a name; what something is called", pos: "名詞" },
		{ jp: "話題", kana: "わだい", cn: "话题", en: "a topic of discussion", pos: "名詞" },
		{ jp: "意識", kana: "いしき", cn: "意识", en: "awareness", pos: "名詞" },
		{ jp: "低下", kana: "ていか", cn: "下降", en: "a decline", pos: "名詞・動詞" },
		{ jp: "不況", kana: "ふきょう", cn: "不景气", en: "a slump; a recession", pos: "名詞" },
		{ jp: "企業", kana: "きぎょう", cn: "企业", en: "a firm; an enterprise", pos: "名詞" },
		{ jp: "採用", kana: "さいよう", cn: "录用", en: "hiring; recruiting", pos: "名詞・動詞" },
		{ jp: "賃金", kana: "ちんぎん", cn: "工资", en: "wages", pos: "名詞" },
		{ jp: "抑える", kana: "おさえる", cn: "压低、抑制", en: "to hold down; to keep low", pos: "動詞" },
		{ jp: "労働力", kana: "ろうどうりょく", cn: "劳动力", en: "labor; the workforce", pos: "名詞" },
		{ jp: "増加する", kana: "ぞうかする", cn: "增加", en: "to increase", pos: "動詞" },
		{ jp: "消費", kana: "しょうひ", cn: "消费", en: "consumption", pos: "名詞・動詞" },
		{ jp: "税収", kana: "ぜいしゅう", cn: "税收", en: "tax revenues", pos: "名詞" },
		{ jp: "経済成長率", kana: "けいざいせいちょうりつ", cn: "经济增长率", en: "rate of economic growth", pos: "名詞" },
		{ jp: "景気", kana: "けいき", cn: "景气、经济状况", en: "the economy; business conditions", pos: "名詞" },
		{ jp: "回復する", kana: "かいふくする", cn: "恢复", en: "to recover", pos: "動詞" },
		{ jp: "低迷", kana: "ていめい", cn: "低迷", en: "sluggishness", pos: "名詞・動詞" },
		{ jp: "上昇", kana: "じょうしょう", cn: "上升", en: "a rise", pos: "名詞・動詞" },
		{ jp: "雇う", kana: "やとう", cn: "雇用", en: "to hire", pos: "動詞" },
	],

	grammar: [
		{
			pattern: "〜とは〜のことを{言|い}う",
			meaning: "所谓……是指……。下定义的固定句式，说明文开头常见。",
			meaningEn: "What we call … is …. A set pattern for definitions, common at the start of an explanation.",
			example: {
				jp: "フリーターとは、……{正社員以外|せいしゃいんいがい}で{働|はたら}いている{人|ひと}たちのことを{言|い}う。",
				cn: "所谓自由打工者，是指……以正式员工以外的形式工作的人。",
				en: "A freeter is someone who works in a form other than a regular employee.",
			},
			note: "这类长定义句就要用本课的方法简化：主干是「フリーターとは〜人たちのことを言う」，中间全是修饰。",
			noteEn: "Long definition sentences like this are what this lesson is for: the core is “a freeter is … people,” and everything in the middle is a modifier.",
		},
		{
			pattern: "〜とも{言|い}われたが、{何|なん}といっても〜",
			meaning: "也有人说……，但归根结底是……。用来区分次要原因与主要原因。",
			meaningEn: "Some said …, but above all it was …. Used to separate a lesser cause from the main one.",
			example: {
				jp: "……{原因|げんいん}とも{言|い}われたが、{何|なん}といっても10{年以上続|ねんいじょうつづ}いた{不況|ふきょう}のせいであった。",
				cn: "也有人说是……的原因，但归根结底是持续 10 年以上的不景气造成的。",
				en: "Some said it was caused by …, but above all it was because of a slump that had lasted more than ten years.",
			},
			note: "問1 的关键。「〜とも言われたが」后面的才是笔者认可的主因。",
			noteEn: "The key to Question 1. What comes after “〜とも言われたが” is the main cause the writer accepts.",
		},
		{
			pattern: "つまり〜と{言|い}える",
			meaning: "也就是说，可以说……。用来把前面的说明归纳成结论。",
			meaningEn: "In other words, you can say …. Used to sum up the explanation as a conclusion.",
			example: {
				jp: "つまり、{企業|きぎょう}が{安|やす}い{労働力|ろうどうりょく}を{求|もと}めた{結果|けっか}、フリーターが{増加|ぞうか}したと{言|い}える。",
				cn: "也就是说，可以说是企业追求廉价劳动力的结果导致了自由打工者的增加。",
				en: "In other words, you can say that freeters increased as a result of firms looking for cheap labor.",
			},
		},
		{
			pattern: "〜を{除|のぞ}く",
			meaning: "除……之外。用于限定范围。",
			meaningEn: "Excluding …. Used to limit the range.",
			example: { jp: "{学生|がくせい}や{主婦|しゅふ}を{除|のぞ}く15{歳|さい}から34{歳|さい}の{人|ひと}たち", cn: "除学生和主妇之外的 15 至 34 岁的人", en: "people from 15 to 34, excluding students and housewives" },
		},
		{
			pattern: "〜とともに",
			formation: "名詞 ＋ とともに",
			meaning: "随着……、与……一起。",
			meaningEn: "Along with … / together with ….",
			example: { jp: "{景気|けいき}の{低迷|ていめい}とともに{再|ふたた}び{上昇|じょうしょう}し{始|はじ}めている", cn: "伴随景气低迷又开始回升", en: "along with a sluggish economy it has started to rise again" },
		},
		{
			pattern: "〜ぶりに",
			meaning: "时隔……。",
			meaningEn: "For the first time in ….",
			example: { jp: "{数年|すうねん}ぶりに{上昇|じょうしょう}し{始|はじ}めている", cn: "时隔数年又开始上升", en: "has started to rise for the first time in several years" },
		},
		{
			pattern: "そうなると",
			meaning: "这样一来。承接前文的假设，引出后果。",
			meaningEn: "Then / if that happens. Picks up the previous hypothesis and leads to a result.",
			example: { jp: "そうなると、{日本|にほん}の{経済成長率|けいざいせいちょうりつ}も{大|おお}きく{低下|ていか}し", cn: "这样一来，日本的经济增长率也会大幅下滑", en: "then Japan’s rate of economic growth also falls sharply" },
		},
	],
};
