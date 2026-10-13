import type { ReadingDay } from "../reading-n3/types";

// 第4週 3日目 エッセイ③ — printed pages 64–65
export const w4d3: ReadingDay = {
	week: 4,
	day: 3,
	label: "エッセイ③",
	labelKana: "えっせい",
	labelEn: "Essays ③",
	printedPages: [64, 65],
	answerSource: "book",

	point: {
		title: "{二重否定|にじゅうひてい}に{注意|ちゅうい}！",
		titleCn: "注意双重否定！",
		titleEn: "Be careful with the double negative sentences!",
		figure: {
			alt: "「ない」という言葉が空中にたくさん浮かび、キャラクターが困惑しているイラスト。二重否定は肯定になる、と説明されている",
			cn: "空中飘浮着许多「ない」这个词，角色一脸困惑的插图。说明：双重否定会变为肯定。",
			en: "Lots of nai float in the air while a character looks confused. The caption: a double negative makes a positive.",
		},
		tips: [
			{
				jp: "{例えば|たとえば}こんな{表現|ひょうげん}があります。",
				cn: "例如有这样的表达。",
				en: "There are expressions like these, for example.",
			},
			{
				jp: "〜しないことはない（＝〜することがある／{必|かなら}ず〜する）",
				cn: "〜しないことはない（＝〜することがある／必ず〜する）（并非不〜（＝有时会〜／一定会〜））",
				en: "it is not that one doesn’t … (= sometimes / definitely does …)",
			},
			{
				jp: "〜ないとは{言|い}えない（＝〜かもしれない）",
				cn: "〜ないとは言えない（＝〜かもしれない）（不能说不〜（＝也许〜））",
				en: "you cannot say that … will not happen (= it might …)",
			},
			{
				jp: "〜ないわけにはいかない（＝どうしても〜しなければならない）",
				cn: "〜ないわけにはいかない（＝どうしても〜しなければならない）（不能不〜（＝无论如何都必须〜））",
				en: "cannot very well not … (= have no choice but to …)",
			},
			{
				jp: "〜ずにはいられない（＝どうしても〜してしまう）",
				cn: "〜ずにはいられない（＝どうしても〜してしまう）（忍不住要〜（＝无论如何都还是会〜））",
				en: "cannot help doing …",
			},
			{
				jp: "★{二重|にじゅう}に{否定|ひてい}するということは{肯定|こうてい}になります。",
				cn: "★进行双重否定，意思就会变成肯定。",
				en: "★A double negative makes a positive.",
			},
		],
		expressions: [
			{ jp: "〜しないことはない", cn: "并非不〜", en: "it is not that one doesn’t …" },
			{ jp: "〜ないとは言えない", cn: "不能说不〜", en: "you cannot say it won’t … (= it might)" },
			{ jp: "〜ないわけにはいかない", cn: "不能不〜", en: "cannot very well not …" },
			{ jp: "〜ずにはいられない", cn: "忍不住要〜", en: "cannot help doing …" },
			{ jp: "手数料", kana: "てすうりょう", cn: "手续费", en: "a fee; a commission" },
			{ jp: "振り込み", kana: "ふりこみ", cn: "汇款、转账", en: "a bank transfer" },
			{ jp: "口座", kana: "こうざ", cn: "账户", en: "a bank account" },
			{ jp: "両替", kana: "りょうがえ", cn: "兑换、换钱", en: "changing money" },
		],
	},

	renshu: {
		instruction: "{次|つぎ}の{会話文|かいわぶん}を{読|よ}んで、{後|あと}の{文|ぶん}から{正|ただ}しいものを{選|えら}ぼう。",
		instructionCn: "阅读下面的对话，从后面的句子中选出正确的吧。",
		instructionEn: "Read the conversation below and choose the correct statements from the sentences that follow. (Answers are on the next page.)",
		blocks: [
			{
				type: "speech",
				speaker: "{店員|てんいん}",
				speakerCn: "店员",
				speakerEn: "Clerk",
				jp: "1{円玉|えんだま}、たまってきたのでそこの{銀行|ぎんこう}で{両替|りょうがえ}してきましょうか。",
				cn: "1日元硬币攒了不少，所以我去那边的银行兑换一下好吗？",
				en: "We’ve collected a lot of 1-yen coins — shall I go change them at the bank over there?",
			},
			{
				type: "speech",
				speaker: "{店長|てんちょう}",
				speakerCn: "店长",
				speakerEn: "Manager",
				jp: "あ、{両替|りょうがえ}ねえ。{手数料|てすうりょう}（{注|ちゅう}1）がかかるからやめようよ。1{円玉|えんだま}100{枚|まい}を{両替|りょうがえ}する{場合|ばあい}は200{円|えん}{払|はら}わないといけないんだよ。",
				cn: "啊，兑换啊。因为要收手续费（注1），还是算了吧。兑换100枚1日元硬币的话，必须付200日元哦。",
				en: "Ah, changing money. There’s a fee, so let’s not. If you change a hundred 1-yen coins, you have to pay 200 yen.",
			},
			{
				type: "speech",
				speaker: "{店員|てんいん}",
				speakerCn: "店员",
				speakerEn: "Clerk",
				jp: "え？　{手数料|てすうりょう}のほうが{高|たか}くつくっていうことですか。そんなばかな……。",
				cn: "诶？你是说手续费反而更贵吗？太荒唐了……。",
				en: "What? You mean the fee ends up costing more? That’s ridiculous…",
			},
			{
				type: "speech",
				speaker: "{店長|てんちょう}",
				speakerCn: "店长",
				speakerEn: "Manager",
				jp: "そうだよ、{振|ふ}り{込|こ}み（{注|ちゅう}2）{手数料|てすうりょう}もどんどん{上|あ}がるし……、そのうち、そこの{銀行|ぎんこう}も{口座|こうざ}（{注|ちゅう}3）の{管理料|かんりりょう}を{取|と}るかもしれないね。{実際|じっさい}そういう{銀行|ぎんこう}、あるし。",
				cn: "是啊，转账（注2）手续费也一个劲地往上涨……，迟早，那边的银行说不定也会收账户（注3）的管理费呢。实际上，那样的银行，是有的。",
				en: "That’s right. Transfer fees keep going up too… before long that bank might start charging an account-management fee as well. In fact there are banks that already do.",
			},
			{
				type: "speech",
				speaker: "{店員|てんいん}",
				speakerCn: "店员",
				speakerEn: "Clerk",
				jp: "えー？　お{金|かね}を{預|あず}けておくだけで、{増|ふ}えるどころか{減|へ}っていくんですか！",
				cn: "诶——？光是把钱存着，别说增加，反而会越来越少吗！",
				en: "What? Just by leaving money there it goes down instead of up?!",
			},
		],
		footnotes: [
			{ marker: "（注1）", term: "手数料", jp: "a commission", cn: "手续费", en: "a commission" },
			{ marker: "（注2）", term: "振り込み", jp: "a transfer", cn: "汇款、转账", en: "a transfer" },
			{ marker: "（注3）", term: "口座", jp: "a bank account", cn: "账户", en: "a bank account" },
		],
		choices: [
			{ jp: "{店長|てんちょう}は{両替|りょうがえ}することに{反対|はんたい}している。", cn: "店长反对兑换。", en: "The manager is against changing the coins." },
			{ jp: "1{円玉|えんだま}を{両替|りょうがえ}するのは{手続|てつづ}きが{面倒|めんどう}である。", cn: "兑换1日元硬币，手续很麻烦。", en: "Changing 1-yen coins is a hassle procedurally." },
			{ jp: "{毎回|まいかい}、{両替額|りょうがえがく}より{手数料|てすうりょう}のほうが{高|たか}くつく。", cn: "每次，手续费都比兑换金额花得更多。", en: "Every time, the fee costs more than the amount being changed." },
			{ jp: "{銀行|ぎんこう}にお{金|かね}を{預|あず}けておいても{減|へ}っていく{場合|ばあい}がある。", cn: "即使把钱存在银行里，也有不断减少的情况。", en: "Even if you leave money in the bank, there are cases where it goes down." },
			{ jp: "{店長|てんちょう}は{近|ちか}くの{銀行|ぎんこう}に{口座管理料|こうざかんりりょう}を{支払|しはら}っている。", cn: "店长在向附近的银行支付账户管理费。", en: "The manager is paying an account-management fee to the nearby bank." },
		],
		answers: [1, 4],
	},

	mondai: {
		instruction: "{次|つぎ}の{文章|ぶんしょう}を{読|よ}んで、{後|あと}の{問|と}いに{答|こた}えなさい。",
		instructionCn: "阅读下面的文章，回答后面的问题。",
		instructionEn: "Read the passage below and answer the questions that follow. (Answers are in the separate booklet, p. 5.)",
		blocks: [
			{
				type: "paragraph",
				indent: true,
				jp: "{先日|せんじつ}、テレビショッピング（{注|ちゅう}1）で{買|か}ったものの{代金|だいきん}を{振|ふ}り{込|こ}むために{銀行|ぎんこう}へ{行|い}った。3{万円|まんえん}を{振|ふ}り{込|こ}んだのだが、{手数料|てすうりょう}が840{円|えん}かかった。{高|たか}い。ここのところ＊、{銀行|ぎんこう}のいろいろな{手数料|てすうりょう}は、{気|き}がつかないうちにどんどん{高|たか}くなっている。{両替|りょうがえ}をしても、ある{枚数|まいすう}{以上|いじょう}は{手数料|てすうりょう}を{取|と}られる。{両替額|りょうがえがく}より{手数料|てすうりょう}のほうが{高|たか}いという{場合|ばあい}も{起|お}きるのだ。{払|はら}いたくないが、{払|はら}わないわけにはいかない。",
				cn: "前几天，为了把在电视购物（注1）买的东西的货款转账过去，我去了银行。转了3万日元，可手续费却花了840日元。太贵了。近来＊，银行的各种手续费，在不知不觉中一个劲地变贵了。即使兑换，达到一定枚数以上就要被收取手续费。手续费比兑换金额更高的情况，也是会发生的。不想付，但又不能不付。",
				en: "The other day I went to the bank to transfer payment for something I had bought on TV shopping. I transferred 30,000 yen, but the fee was 840 yen. Expensive. Lately, various bank fees have been climbing before you notice. Even when you change coins, above a certain number they take a fee. There are even cases where the fee is higher than the amount being changed. I don’t want to pay, but I have no choice.",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "{以前|いぜん}は、{振|ふ}り{込|こ}みをする{場合|ばあい}は、{同|おな}じ{銀行間|ぎんこうかん}においては{無料|むりょう}だった。{今|いま}は{同|おな}じ{支店間|してんかん}であっても{手数料|てすうりょう}がかかる{場合|ばあい}がある。{最近|さいきん}では、{口座|こうざ}を{持|も}っただけでその{管理料|かんりりょう}を{取|と}る{銀行|ぎんこう}もあると{聞|き}く。{海外|かいがい}の{銀行|ぎんこう}ではよくあるらしいが、{私|わたし}が{利用|りよう}している{銀行|ぎんこう}も{将来|しょうらい}{管理料|かんりりょう}を{払|はら}うことになるのかもしれない。そうなると、{気|き}がついたら{自分|じぶん}の{口座|こうざ}の{残高|ざんだか}（{注|ちゅう}2）が0（ゼロ）になっているということもありえる＊＊だろう。{冗談|じょうだん}ではなく、{現在|げんざい}の{私|わたし}の{通帳|つうちょう}の{残高|ざんだか}では、①そうならないとは{言|い}えないのだ。",
				cn: "以前，办理转账时，同一银行之间是免费的。现在，即使是同一分行之间，也有要收手续费的情况。最近听说，还有仅仅凭持有账户就要收取管理费的银行。这种事在海外的银行似乎很常见，不过我正在使用的银行，将来也许也会变得要支付管理费。如果变成那样，等注意到的时候，自己账户的余额（注2）已经变成0（零）了，这种事也是有可能＊＊的吧。不是开玩笑，以我现在存折的余额，①不能说不会变成那样的。",
				en: "In the past, transfers between the same bank were free. Now there are cases where even transfers between the same branch cost a fee. Lately I hear some banks charge a management fee just for holding an account. That seems common at banks overseas, and the bank I use may end up charging a management fee in the future too. If so, it is possible that I could look up and find my balance at 0. This is no joke: with the balance in my passbook now, ①I cannot say that would not happen.",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "{金利|きんり}（{注|ちゅう}3）が{低|ひく}いというより、ほとんどないと{言|い}ってもいいくらいの{現在|げんざい}、{手数料|てすうりょう}はともかく、（　②　）。",
				cn: "在利率（注3）与其说是低、不如说几乎可以说没有的现在，手续费暂且不论，（　②　）。",
				en: "Interest rates now are not so much low as almost nonexistent; fees aside, (　②　).",
			},
		],
		footnotes: [
			{ marker: "（注1）", term: "テレビショッピング", jp: "TV shopping", cn: "电视购物", en: "TV shopping" },
			{ marker: "（注2）", term: "残高", jp: "a bank balance", cn: "余额", en: "a bank balance" },
			{ marker: "（注3）", term: "金利", jp: "an interest rate", cn: "利率", en: "an interest rate" },
		],
		pageNotes: [
			{ jp: "* recently", cn: "* 最近", en: "recently" },
			{ jp: "** is possible", cn: "** 有可能", en: "is possible" },
		],
		questions: [
			{
				label: "問1",
				jp: "①そうならないとは{言|い}えないとあるが、{最|もっと}も{近|ちか}い{意味|いみ}はどれか。",
				cn: "文中说①不能说不会变成那样，最接近的意思是哪一个？",
				en: "① says “I cannot say that would not happen.” Which meaning is closest?",
				choices: [
					{ jp: "{必|かなら}ずそうなる", cn: "一定会变成那样", en: "it will definitely happen" },
					{ jp: "そうなるかもしれない", cn: "也许会变成那样", en: "it might happen" },
					{ jp: "そうなるかどうかわからない", cn: "不知道会不会变成那样", en: "it is unclear whether it will happen" },
					{ jp: "{絶対|ぜったい}にそうならない", cn: "绝对不会变成那样", en: "it will absolutely not happen" },
				],
				answer: 2,
				explanation:
					"本课要点：〜ないとは言えない ＝ 〜かもしれない。前一句刚说余额变成 0「もありえるだろう」，接着「そうならないとは言えない」是同一意思的双重否定，选 2。1「必ず」过强。3「かどうかわからない」只是说不知道，没有「有可能」的倾向。4 意思完全反了。",
				explanationEn:
					"The lesson: nai to wa ienai = kamo shirenai. The sentence before already said a zero balance “is possible,” and “I cannot say that would not happen” is the same idea as a double negative — choice 2. 1 “definitely” is too strong. 3 is mere ignorance, without the lean toward “it might.” 4 is the opposite.",
				choiceNotes: [
					"「必ず」太强。双重否定在这里是「有可能」，不是「一定」。",
					"正确。〜ないとは言えない ＝ 〜かもしれない。",
					"「不知道会不会」只是中立，没有「也许会」的意思。",
					"意思完全相反。",
				],
				choiceNotesEn: [
					"Kanarazu is too strong. The double negative here means “it might,” not “it will.”",
					"Correct. Nai to wa ienai = it might.",
					"“I don’t know whether” is neutral, without the sense of “it might.”",
					"The opposite meaning.",
				],
			},
			{
				label: "問2",
				jp: "（　②　）の{中|なか}に{入|はい}る{最|もっと}も{適当|てきとう}なものはどれか。",
				cn: "最适合填入（　②　）的是哪一个？",
				en: "Which is the most appropriate to fill in (　②　)?",
				choices: [
					{ jp: "{口座|こうざ}を{持|も}ちたくないものである", cn: "是不想持有账户的", en: "is something I don’t want to hold an account for" },
					{ jp: "{管理料|かんりりょう}まで{払|はら}いたくないものである", cn: "是连管理费也不想付的", en: "is something I don’t even want to pay a management fee for" },
					{ jp: "{通帳|つうちょう}の{残高|ざんだか}を{知|し}りたくないものである", cn: "是不想知道存折余额的", en: "is something I don’t want to know the passbook balance of" },
					{ jp: "{振|ふ}り{込|こ}みはしたくないものである", cn: "是不想转账的", en: "is something I don’t want to make transfers with" },
				],
				answer: 2,
				explanation:
					"结尾：「金利がほとんどない現在、手数料はともかく、（②）」。前文刚担心将来可能要交账户管理费，余额会变成 0。手续费已经不得不付（払わないわけにはいかない），「手数料はともかく」之后要推进一层：连管理费也不想付。选 2。1 太极端（不是不想开户）。3、4 不是这段的落点。",
				explanationEn:
					"The ending: “interest is almost nothing now; fees aside, (②).” The passage has just worried that a management fee may be charged and the balance could hit 0. Transfer fees already cannot be avoided; after “fees aside” the next step is not even wanting to pay a management fee — choice 2. 1 is too extreme (not “I don’t want an account”). 3 and 4 are not where the paragraph lands.",
				choiceNotes: [
					"作者还在用这家银行的账户，不是「不想持有账户」。",
					"正确。利息几乎没有，手续费暂且不论，连管理费也不想付。",
					"前文没有说不想知道余额。",
					"转账是已经在做、又不得不付手续费的事，不是空白处的结论。",
				],
				choiceNotesEn: [
					"The writer still uses this bank account; it is not “I don’t want to hold an account.”",
					"Correct. Interest is almost nothing; fees aside, I don’t even want to pay a management fee.",
					"The passage never says the writer doesn’t want to know the balance.",
					"Transfers are already being made, and the fee cannot be avoided; that is not the punchline of the blank.",
				],
			},
		],
	},

	vocab: [
		{ jp: "振り込む", kana: "ふりこむ", cn: "汇入、转账", en: "to transfer (money)", pos: "動詞" },
		{ jp: "代金", kana: "だいきん", cn: "货款、价款", en: "payment; the price of goods", pos: "名詞" },
		{ jp: "手数料", kana: "てすうりょう", cn: "手续费", en: "a fee; a commission", pos: "名詞" },
		{ jp: "両替", kana: "りょうがえ", cn: "兑换、换钱", en: "changing money", pos: "名詞・動詞" },
		{ jp: "口座", kana: "こうざ", cn: "账户", en: "a bank account", pos: "名詞" },
		{ jp: "管理料", kana: "かんりりょう", cn: "管理费", en: "a management fee", pos: "名詞" },
		{ jp: "残高", kana: "ざんだか", cn: "余额", en: "a (bank) balance", pos: "名詞" },
		{ jp: "通帳", kana: "つうちょう", cn: "存折", en: "a bank passbook", pos: "名詞" },
		{ jp: "金利", kana: "きんり", cn: "利率、利息", en: "an interest rate", pos: "名詞" },
		{ jp: "支店", kana: "してん", cn: "分行、分店", en: "a branch", pos: "名詞" },
		{ jp: "冗談", kana: "じょうだん", cn: "玩笑", en: "a joke", pos: "名詞" },
		{ jp: "高くつく", kana: "たかくつく", cn: "结果更贵、代价更高", en: "to end up costing more", pos: "表現" },
	],

	grammar: [
		{
			pattern: "〜ないわけにはいかない",
			formation: "動詞ない形＋わけにはいかない",
			meaning: "不能不……、必须……。双重否定表示义务。",
			meaningEn: "cannot very well not … / have no choice but to …. A double negative expressing obligation.",
			example: {
				jp: "{払|はら}いたくないが、{払|はら}わないわけにはいかない。",
				cn: "不想付，但又不能不付。",
				en: "I don’t want to pay, but I have no choice.",
			},
		},
		{
			pattern: "〜ないとは言えない",
			formation: "普通形＋ないとは言えない",
			meaning: "不能说不……＝也许会……。双重否定表示可能性。",
			meaningEn: "you cannot say that … will not happen = it might. Double negative for possibility.",
			example: {
				jp: "そうならないとは{言|い}えないのだ。",
				cn: "不能说不会变成那样的。",
				en: "I cannot say that would not happen.",
			},
		},
		{
			pattern: "〜はともかく",
			formation: "名詞＋はともかく",
			meaning: "……暂且不论、先不说……。把前项搁下，强调后项。",
			meaningEn: "… aside / leaving … aside. Sets the first item aside to stress what follows.",
			example: {
				jp: "{手数料|てすうりょう}はともかく、{管理料|かんりりょう}まで{払|はら}いたくない。",
				cn: "手续费暂且不论，连管理费也不想付。",
				en: "Fees aside, I don’t even want to pay a management fee.",
			},
		},
	],
};
