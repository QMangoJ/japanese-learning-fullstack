import type { ReadingDay } from "./types";

// 第1週 6日目 募集② — printed pages 22–23
const floorPlan = `<svg viewBox="0 0 300 240" role="img" aria-label="2Kの間取り図">
  <g stroke="currentColor" stroke-width="1.6" fill="none">
    <rect x="20" y="20" width="260" height="200"/>
    <path d="M20 120 H150 M150 20 V220 M215 20 V120 M20 190 H280"/>
  </g>
  <g font-size="11" text-anchor="middle" fill="currentColor">
    <text x="85" y="70">キッチン</text>
    <text x="183" y="55">バス</text>
    <text x="248" y="55">トイレ</text>
    <text x="85" y="160">和室6畳</text>
    <text x="215" y="160">洋室8畳</text>
    <text x="150" y="208">ベランダ</text>
  </g>
  <circle cx="262" cy="38" r="12" fill="none" stroke="currentColor" stroke-width="1.2"/>
  <path d="M262 28 L266 40 L262 37 L258 40 Z" fill="currentColor"/>
</svg>`;

export const w1d6: ReadingDay = {
	week: 1,
	day: 6,
	label: "募集②",
	labelKana: "ぼしゅう",
	labelEn: "Invitation for Applications ②",
	printedPages: [22, 23],
	answerSource: "book",

	point: {
		title: "{家|いえ}やアパートの{案内|あんない}で{使|つか}われている{特別|とくべつ}な{言葉|ことば}を{覚|おぼ}えよう！",
		titleCn: "记住租房、公寓广告里特有的词汇！",
		titleEn: "Let's look at some special language used in real estate advertisements!",
		figure: {
			alt: "「1K・2LDK・3LDKって何のこと？」という疑問と、アパート1K 3.2万円／マンション2LDK 9万円／マンション3LDK 12万円の3つの物件。「数字は部屋の数で、Kはキッチン、Dはダイニング（食事をする部屋）、Lはリビングルームのことです。読み方に注意しましょう。」",
			cn: "「1K・2LDK・3LDK 是什么意思？」——数字表示房间数量，K 是厨房（キッチン），D 是餐厅（ダイニング＝吃饭的房间），L 是客厅（リビングルーム）。注意读法。",
			en: "“What do 1K, 2LDK, and 3LDK mean?” The number is the number of rooms; K is kitchen, D is dining room, L is living room. Watch how they are read.",
		},
		tips: [
			{
				jp: "{数字|すうじ}は{部屋|へや}の{数|かず}、Kはキッチン、Dはダイニング（{食事|しょくじ}をする{部屋|へや}）、Lはリビングルームのことです。{読|よ}み{方|かた}に{注意|ちゅうい}しましょう。",
				cn: "数字＝房间数量，K＝厨房，D＝餐厅，L＝客厅。「2K」读作「にケー」，「2LDK」读作「にエルディーケー」。",
				en: "The number is the number of rooms; K = kitchen, D = dining room, L = living room. 2K is read ni-kē; 2LDK is ni-eru-dī-kē.",
			},
		],
		expressions: [
			{ jp: "マンション", cn: "（钢筋结构的）公寓、大楼", en: "an apartment; well built" },
			{ jp: "間取り", kana: "まどり", cn: "房间布局", en: "a floor plan" },
			{ jp: "和室", kana: "わしつ", cn: "日式房间（榻榻米）", en: "a Japanese style room" },
			{ jp: "洋室", kana: "ようしつ", cn: "西式房间", en: "a Western-style room" },
			{ jp: "敷金", kana: "しききん", cn: "押金（退租时原则上退还）", en: "a deposit, paid back when you surrender the room" },
			{ jp: "礼金", kana: "れいきん", cn: "谢礼金（付给房东，不退还；有时不需要）", en: "a one-time payment to the owner, not returned" },
			{ jp: "管理費", kana: "かんりひ", cn: "物业管理费（每月）", en: "a monthly management fee" },
			{ jp: "専有面積", kana: "せんゆうめんせき", cn: "专有面积、套内面积", en: "floor space" },
			{ jp: "〜㎡", kana: "へいほうメートル", cn: "平方米（口语常读作「へいべい」）", en: "square meters" },
			{ jp: "一軒家", kana: "いっけんや", cn: "独门独户的房子", en: "a house" },
			{ jp: "6畳", kana: "ろくじょう", cn: "6 张榻榻米大小", en: "a 6-tatami mat room" },
			{ jp: "エアコン", cn: "空调", en: "an air-conditioner" },
			{ jp: "築15年", kana: "ちくじゅうごねん", cn: "房龄 15 年", en: "built 15 years ago" },
			{ jp: "家賃", kana: "やちん", cn: "房租", en: "rent" },
		],
	},

	renshu: {
		instruction: "{次|つぎ}の{会話文|かいわぶん}を{読|よ}んで、{後|あと}の{文|ぶん}から{正|ただ}しいものを{選|えら}ぼう。",
		instructionCn: "阅读下面的对话，从后面的句子中选出正确的。（答案在下一页）",
		instructionEn: "Read the conversation below and choose the correct statements from the sentences that follow. (Answers are on the next page.)",
		blocks: [
			{
				type: "speech",
				speaker: "{妻|つま}",
				speakerCn: "妻子",
				speakerEn: "Wife",
				jp: "このマンションはどう？　{駅|えき}から{徒歩|とほ}5{分|ふん}って{書|か}いてあるし、{広|ひろ}さもちょうどいいんじゃない？　{家賃|やちん}もそんなに{高|たか}くないし。",
				cn: "这套公寓怎么样？上面写着离车站步行 5 分钟，大小也正合适吧？房租也不算太贵。",
				en: "How about this apartment? It says it’s a 5-minute walk from the station, and the size is just right, isn’t it? The rent isn’t that high either.",
			},
			{
				type: "speech",
				speaker: "{夫|おっと}",
				speakerCn: "丈夫",
				speakerEn: "Husband",
				jp: "そうだね。{敷金|しききん}は3ヵ{月分|げつぶん}だけれど、{礼金|れいきん}はなしって{書|か}いてあるし、いいかもしれない。でも、{本当|ほんとう}は{一軒家|いっけんや}のほうがいいんだけどなあ。",
				cn: "是啊。押金是 3 个月的房租，不过上面写着不用谢礼金，也许不错。不过说实话，我还是更想住独栋房子啊。",
				en: "Yeah. The deposit is three months’ rent, but it says there’s no key money, so it might be fine. Still, I’d really rather live in a detached house.",
			},
		],
		choices: [
			{ jp: "{夫婦|ふうふ}は{住|す}むところをさがしている。", cn: "这对夫妇正在找住的地方。", en: "The couple is looking for a place to live." },
			{ jp: "{夫婦|ふうふ}は{今|いま}、マンションを{見学|けんがく}している。", cn: "这对夫妇现在正在实地参观公寓。", en: "The couple is now viewing an apartment in person." },
			{ jp: "このマンションを{借|か}りる{場合|ばあい}、{敷金|しききん}は3ヵ{月前|げつまえ}に{払|はら}わなければならない。", cn: "租这套公寓的话，押金必须提前 3 个月支付。", en: "If they rent this apartment, they must pay the deposit three months in advance." },
			{ jp: "このマンションを{借|か}りる{場合|ばあい}、{礼金|れいきん}を{払|はら}わなくてもいい。", cn: "租这套公寓的话，可以不用付谢礼金。", en: "If they rent this apartment, they do not have to pay key money." },
			{ jp: "{夫|おっと}はマンションより{一軒家|いっけんや}に{住|す}みたいと{思|おも}っている。", cn: "比起公寓，丈夫更想住独栋房子。", en: "The husband would rather live in a detached house than in an apartment." },
		],
		answers: [1, 4, 5],
		hint: {
			jp: "「{敷金|しききん}3ヵ{月|げつ}」は「{家賃|やちん}3ヵ{月分|げつぶん}の{金額|きんがく}」のこと。「3ヵ{月前|げつまえ}に{払|はら}う」ではない。",
			cn: "「敷金 3 ヵ月」指的是「相当于 3 个月房租的金额」，不是「提前 3 个月付」。另外两人是在看广告，不是在实地参观。",
			en: "“Deposit: 3 months” means an amount equal to three months’ rent, not “pay three months in advance.” Also, they are looking at an ad, not viewing the place in person.",
		},
	},

	mondai: {
		instruction: "{次|つぎ}の{募集広告|ぼしゅうこうこく}を{読|よ}んで、{後|あと}の{問|と}いに{答|こた}えなさい。",
		instructionCn: "阅读下面的租房广告，回答后面的问题。（答案在别册 p.2）",
		instructionEn: "Read the rental advertisement below and answer the questions that follow. (Answers are in the separate booklet, p. 2.)",
		blocks: [
			{
				type: "title",
				jp: "マンション　2K",
				cn: "公寓　2K（两室一厨）",
				en: "Apartment — 2K (two rooms + kitchen)",
				sub: { jp: "{中央線中野駅徒歩|ちゅうおうせんなかのえきとほ}5{分|ふん}", cn: "中央线中野站步行 5 分钟", en: "5 minutes on foot from Nakano Station on the Chūō Line" },
			},
			{
				type: "table",
				rows: [
					[
						{ jp: "{家賃|やちん}", cn: "房租", en: "Rent", header: true, align: "center" },
						{ jp: "9.6{万円|まんえん}", cn: "9.6 万日元", en: "96,000 yen" },
					],
					[
						{ jp: "{敷金|しききん}", cn: "押金", en: "Deposit", header: true, align: "center" },
						{ jp: "3ヵ{月|げつ}", cn: "3 个月（＝3 个月房租的金额）", en: "3 months (= three months’ rent)" },
					],
					[
						{ jp: "{礼金|れいきん}", cn: "谢礼金", en: "Key money", header: true, align: "center" },
						{ jp: "なし", cn: "无", en: "None" },
					],
					[
						{ jp: "{管理費|かんりひ}", cn: "管理费", en: "Management fee", header: true, align: "center" },
						{ jp: "{月|つき}4,000{円|えん}", cn: "每月 4,000 日元", en: "4,000 yen a month" },
					],
					[
						{ jp: "{専有面積|せんゆうめんせき}", cn: "专有面积", en: "Floor space", header: true, align: "center" },
						{ jp: "52.05㎡", cn: "52.05 平方米", en: "52.05 m²" },
					],
					[
						{ jp: "{階数|かいすう}", cn: "楼层", en: "Floor", header: true, align: "center" },
						{ jp: "4{階建|かいだ}て3{階|かい}", cn: "4 层楼的第 3 层", en: "3rd floor of a 4-story building" },
					],
					[
						{ jp: "{築年数|ちくねんすう}", cn: "房龄", en: "Age of building", header: true, align: "center" },
						{ jp: "{築|ちく}15{年|ねん}", cn: "建成 15 年", en: "Built 15 years ago" },
					],
				],
			},
			{
				type: "figure",
				alt: "2Kの間取り図：キッチン、バス、トイレ、和室6畳、洋室8畳、ベランダ",
				cn: "2K 户型图：厨房、浴室、卫生间、和室 6 叠、洋室 8 叠、阳台。",
				en: "2K floor plan: kitchen, bath, toilet, 6-tatami Japanese-style room, 8-tatami Western-style room, balcony.",
				svg: floorPlan,
			},
			{
				type: "list",
				marker: "・",
				items: [
					{ jp: "{使|つか}いやすい{間取|まど}り!!", cn: "格局好用!!", en: "A convenient floor plan!!" },
					{ jp: "バス・トイレ{別|べつ}＊　エアコン{付|つき}", cn: "浴室与卫生间分开＊　配有空调", en: "Separate bath and toilet＊　Air-conditioner included" },
					{ jp: "ペット{不可|ふか}", cn: "不可养宠物", en: "No pets" },
				],
			},
		],
		pageNotes: [{ jp: "＊ a separate bathroom and toilet", cn: "＊浴室和卫生间是分开的", en: "a separate bathroom and toilet" }],
		questions: [
			{
				label: "問1",
				jp: "この{広告|こうこく}でわからないのはどれか。",
				cn: "从这则广告中无法得知的是哪一项？",
				en: "Which of the following can you not tell from this advertisement?",
				choices: [
					{ jp: "エアコンがいくつついているか。", cn: "配了几台空调。", en: "How many air-conditioners there are." },
					{ jp: "{敷金|しききん}をいくらはらえばいいか。", cn: "押金要付多少钱。", en: "How much the deposit is." },
					{ jp: "この{部屋|へや}が{何階|なんがい}にあるか。", cn: "这个房间在几层。", en: "Which floor this room is on." },
					{ jp: "このマンションが{何年前|なんねんまえ}に{建|た}てられたか。", cn: "这栋公寓是几年前建的。", en: "How many years ago this apartment was built." },
				],
				answer: 1,
				explanation:
					"广告只写了「エアコン付」——配有空调，但完全没有提到台数，所以 1 是无法得知的。其余三项都能从广告算出或直接读出。这类题要一项一项回到广告上核对。",
				explanationEn:
					"The ad only says “air-conditioner included”—it never mentions how many, so 1 cannot be known. The other three can be calculated or read directly. Check each option against the ad.",
				choiceNotes: [
					"正确（＝无法得知）。只写了「エアコン付」，没写数量。",
					"「敷金／3ヵ月」＋「家賃／9.6 万円」→ 9.6 万 × 3 ＝ 28.8 万日元，可以算出。",
					"「4 階建て 3 階」→ 在第 3 层，写得很清楚。",
					"「築 15 年」→ 15 年前建的。",
				],
				choiceNotesEn: [
					"Correct (= cannot be known). It only says “air-conditioner included,” with no number.",
					"Deposit / 3 months + rent / 96,000 yen → 96,000 × 3 = 288,000 yen. You can calculate it.",
					"“3rd floor of a 4-story building” states the floor clearly.",
					"“Built 15 years ago” tells you when it was built.",
				],
			},
			{
				label: "問2",
				jp: "この{広告|こうこく}の{内容|ないよう}と{合|あ}っているものはどれか。",
				cn: "下列哪一项与这则广告的内容相符？",
				en: "Which of the following matches the content of this advertisement?",
				choices: [
					{ jp: "{毎月払|まいつきはら}うのは96,000{円|えん}である。", cn: "每月要付的是 96,000 日元。", en: "The monthly payment is 96,000 yen." },
					{ jp: "{敷金|しききん}は96,000{円|えん}の3{倍分|ばいぶん}を{払|はら}わなければならない。", cn: "押金必须付 96,000 日元的 3 倍。", en: "You must pay a deposit of three times 96,000 yen." },
					{ jp: "エアコンの{代金|だいきん}を{払|はら}わなければならない。", cn: "必须支付空调的费用。", en: "You must pay for the air-conditioner." },
					{ jp: "{洋室|ようしつ}より{和室|わしつ}のほうが{広|ひろ}い。", cn: "和室比洋室宽敞。", en: "The Japanese-style room is larger than the Western-style room." },
				],
				answer: 2,
				explanation:
					"「敷金／3ヵ月」表示押金＝3 个月房租的金额。房租是 9.6 万日元＝96,000 日元，所以押金是 96,000 × 3。2 与广告一致。",
				explanationEn:
					"“Deposit / 3 months” means the deposit equals three months’ rent. Rent is 96,000 yen, so the deposit is 96,000 × 3. 2 matches the ad.",
				choiceNotes: [
					"每月要付的是房租 96,000 日元＋管理费 4,000 日元＝100,000 日元。别忘了管理费。",
					"正确。敷金 3 ヵ月 ＝ 96,000 日元的 3 倍。",
					"「エアコン付」＝已经附带空调，不需要另外付钱。",
					"户型图上是「和室 6 畳」「洋室 8 畳」，洋室更大。",
				],
				choiceNotesEn: [
					"The monthly payment is rent 96,000 yen + management fee 4,000 yen = 100,000 yen. Don’t forget the management fee.",
					"Correct. A 3-month deposit = three times 96,000 yen.",
					"“Air-conditioner included” means it already comes with the unit; you don’t pay extra.",
					"The floor plan shows a 6-tatami Japanese room and an 8-tatami Western room, so the Western room is larger.",
				],
			},
		],
	},

	vocab: [
		{ jp: "家賃", kana: "やちん", cn: "房租", en: "rent", pos: "名詞" },
		{ jp: "敷金", kana: "しききん", cn: "押金", en: "security deposit", pos: "名詞" },
		{ jp: "礼金", kana: "れいきん", cn: "谢礼金", en: "key money (non-refundable)", pos: "名詞" },
		{ jp: "管理費", kana: "かんりひ", cn: "管理费", en: "management fee", pos: "名詞" },
		{ jp: "専有面積", kana: "せんゆうめんせき", cn: "专有面积", en: "floor space; exclusive area", pos: "名詞" },
		{ jp: "間取り", kana: "まどり", cn: "户型、房间布局", en: "floor plan; layout", pos: "名詞" },
		{ jp: "和室", kana: "わしつ", cn: "日式房间", en: "Japanese-style room", pos: "名詞" },
		{ jp: "洋室", kana: "ようしつ", cn: "西式房间", en: "Western-style room", pos: "名詞" },
		{ jp: "畳", kana: "じょう", cn: "叠（榻榻米面积单位）", en: "tatami-mat (area unit)", pos: "助数詞" },
		{ jp: "築", kana: "ちく", cn: "建成（〜年）", en: "built (… years ago)", pos: "接頭語" },
		{ jp: "一軒家", kana: "いっけんや", cn: "独栋房子", en: "detached house", pos: "名詞" },
		{ jp: "見学する", kana: "けんがくする", cn: "参观", en: "to view; to tour", pos: "動詞" },
		{ jp: "借りる", kana: "かりる", cn: "借、租", en: "to rent; to borrow", pos: "動詞" },
		{ jp: "代金", kana: "だいきん", cn: "货款、费用", en: "payment; charge", pos: "名詞" },
		{ jp: "夫婦", kana: "ふうふ", cn: "夫妻", en: "married couple", pos: "名詞" },
		{ jp: "広さ", kana: "ひろさ", cn: "面积、宽敞程度", en: "size; spaciousness", pos: "名詞" },
		{ jp: "ベランダ", cn: "阳台", en: "balcony", pos: "名詞" },
	],

	grammar: [
		{
			pattern: "〜付（つき）／〜別（べつ）／〜不可（ふか）",
			meaning: "租房广告的固定缩略语。「エアコン付」＝附带空调；「バス・トイレ別」＝浴室和厕所分开；「ペット不可」＝不能养宠物。",
			meaningEn: "Set abbreviations in rental ads. eakon-tsuki = air-conditioner included; basu-toire betsu = separate bath and toilet; petto fuka = no pets.",
			example: { jp: "エアコン{付|つき}／ペット{不可|ふか}", cn: "配有空调／不可养宠物", en: "air-conditioner included / no pets" },
		},
		{
			pattern: "〜ヵ月分",
			formation: "数量詞 ＋ 分（ぶん）",
			meaning: "相当于……的量／金额。「敷金3ヵ月」＝相当于 3 个月房租的押金。",
			meaningEn: "an amount equal to…. “Deposit: 3 months” = a deposit equal to three months’ rent.",
			example: { jp: "{敷金|しききん}は3ヵ{月分|げつぶん}", cn: "押金为 3 个月（房租）的金额", en: "The deposit is three months’ (rent)." },
			note: "本课陷阱：不是「提前 3 个月付」的意思。",
			noteEn: "A common trap: it does not mean “pay three months in advance.”",
		},
		{
			pattern: "〜って書いてある",
			meaning: "上面写着……。「って」是「と」的口语形式，看广告、看告示时的常用说法。",
			meaningEn: "it says… / it’s written that…. tte is the spoken form of to; common when reading ads or notices.",
			example: { jp: "{駅|えき}から{徒歩|とほ}5{分|ふん}って{書|か}いてある", cn: "上面写着离车站步行 5 分钟", en: "It says it’s a 5-minute walk from the station." },
		},
		{
			pattern: "〜んじゃない？",
			meaning: "不是……吗？向对方确认自己的看法，语气比较柔和。",
			meaningEn: "Isn’t it…? Checking your opinion with the listener; a soft tone.",
			example: { jp: "{広|ひろ}さもちょうどいいんじゃない？", cn: "大小也正合适吧？", en: "The size is just right, isn’t it?" },
		},
		{
			pattern: "〜より〜のほうがいい",
			formation: "名詞A より 名詞B のほうがいい",
			meaning: "比起 A，B 更好。比较句型。",
			meaningEn: "B is better than A. A basic comparison pattern.",
			example: { jp: "{本当|ほんとう}は{一軒家|いっけんや}のほうがいい", cn: "说实话还是独栋房子更好", en: "To be honest, a detached house would be better." },
		},
		{
			pattern: "〜なくてもいい",
			formation: "動詞ない形（ない→なくても）＋ いい",
			meaning: "不……也可以、不必……。",
			meaningEn: "you don’t have to… / it’s all right not to….",
			example: { jp: "{礼金|れいきん}を{払|はら}わなくてもいい。", cn: "可以不用付谢礼金。", en: "You don’t have to pay key money." },
		},
		{
			pattern: "〜かもしれない",
			meaning: "也许……、可能……。表示不确定的推测。",
			meaningEn: "might… / maybe…. An uncertain guess.",
			example: { jp: "いいかもしれない。", cn: "也许不错。", en: "It might be good." },
		},
	],
};
