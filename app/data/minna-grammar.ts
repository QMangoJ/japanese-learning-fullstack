/**
 * みんなの日本語 语法讲解。
 *
 * 现在只收初級II 第2版第35–50课（初級到第50课结束）。
 * 中級以后追加：再 push 一本 `stage: "chukyu"` 的 MinnaBook，课号用那一册自己的课序。
 * 文型划分对照公开课次表（たのすけ「26～50課の学習項目」、みんなでNihonGO、
 * 日本の言葉と文化 的初級2文型一覧）。例句是复习用的原创句，不是教材原文。
 *
 * 汉字用 {汉字|读音}。N3/N2 及以上的词另外放进 glosses（读音 + 中文）。
 */

export type MinnaStage = "shokyu" | "chukyu";

export type MinnaGloss = {
	surface: string;
	reading: string;
	zh: string;
};

export type MinnaExample = {
	jp: string;
	zh: string;
	en: string;
	glosses?: MinnaGloss[];
};

export type MinnaPoint = {
	id: string;
	pattern: string;
	/** 检索用读音，假名。 */
	reading: string;
	connection: string;
	zh: string;
	en: string;
	examples: MinnaExample[];
};

export type MinnaLesson = {
	number: number;
	titleZh: string;
	titleEn: string;
	goalZh: string;
	goalEn: string;
	points: MinnaPoint[];
};

export type MinnaBook = {
	id: string;
	stage: MinnaStage;
	volume: number;
	edition: number;
	titleZh: string;
	titleJa: string;
	titleEn: string;
	lessons: MinnaLesson[];
};

export type MinnaSearchRecord = {
	module: "minna";
	bookId: string;
	w: number;
	d: number;
	i: number;
	key: string;
	reading: string;
	extra: string;
	sub: string;
	dayTitle: string;
};

const RUBY = /\{([^{}|]+)\|([^{}]+)\}/g;

export function plainMinna(text: string) {
	return text.replace(RUBY, "$1");
}

function zhSentenceCount(text: string) {
	return text.split(/[。！？]/).map((part) => part.trim()).filter(Boolean).length;
}

function isKana(text: string) {
	return /^[\u3040-\u30ff\u30a0-\u30ffー・\s]+$/.test(text);
}

/** 结构检查。空数组表示可以通过。中級的书走同一套规则。 */
export function validateMinnaCatalog(books: readonly MinnaBook[]): string[] {
	const errors: string[] = [];
	const bookIds = new Set<string>();
	const pointIds = new Set<string>();
	if (!books.length) errors.push("catalog is empty");
	books.forEach((book, bi) => {
		const where = `books[${bi}]`;
		if (!book.id || bookIds.has(book.id)) errors.push(`${where}: id missing or duplicated`);
		bookIds.add(book.id);
		if (book.stage !== "shokyu" && book.stage !== "chukyu") errors.push(`${book.id}: stage must be shokyu or chukyu`);
		if (!Number.isInteger(book.volume) || book.volume < 1) errors.push(`${book.id}: volume`);
		if (!Number.isInteger(book.edition) || book.edition < 1) errors.push(`${book.id}: edition`);
		if (!book.titleZh || !book.titleJa || !book.titleEn) errors.push(`${book.id}: title`);
		if (!book.lessons.length) errors.push(`${book.id}: lessons empty`);
		const seenLessons = new Set<number>();
		book.lessons.forEach((lesson) => {
			const at = `${book.id} L${lesson.number}`;
			if (!Number.isInteger(lesson.number) || lesson.number < 1 || seenLessons.has(lesson.number)) errors.push(`${at}: lesson number`);
			seenLessons.add(lesson.number);
			if (!lesson.titleZh || !lesson.titleEn || !lesson.goalZh || !lesson.goalEn) errors.push(`${at}: title or goal`);
			if (!lesson.points.length) errors.push(`${at}: no grammar points`);
			lesson.points.forEach((point) => {
				const pid = `${at} ${point.id}`;
				if (!point.id || pointIds.has(point.id)) errors.push(`${pid}: id`);
				pointIds.add(point.id);
				if (!point.pattern || !point.connection || !point.zh || !point.en) errors.push(`${pid}: text`);
				if (!point.reading || !isKana(point.reading)) errors.push(`${pid}: reading`);
				const sentences = zhSentenceCount(point.zh);
				if (sentences < 1 || sentences > 3) errors.push(`${pid}: zh should be 1-3 sentences (${sentences})`);
				if (point.examples.length < 1 || point.examples.length > 2) errors.push(`${pid}: need 1-2 examples`);
				const markup = point.pattern + point.examples.map((example) => example.jp).join("");
				const opens = markup.split("{").length - 1;
				const closes = markup.split("}").length - 1;
				if (opens !== closes || markup.includes("{}")) errors.push(`${pid}: ruby braces`);
				point.examples.forEach((example, ei) => {
					const ex = `${pid} ex${ei}`;
					if (!example.jp || !example.zh || !example.en) errors.push(`${ex}: empty`);
					const plain = plainMinna(example.jp);
					for (const gloss of example.glosses ?? []) {
						if (!gloss.surface || !gloss.zh) errors.push(`${ex}: gloss`);
						if (!gloss.reading || !isKana(gloss.reading)) errors.push(`${ex}: gloss reading ${gloss.surface}`);
						if (!plain.includes(gloss.surface)) errors.push(`${ex}: gloss ${gloss.surface} not in sentence`);
						if (!example.jp.includes(`{${gloss.surface}|${gloss.reading}}`)) errors.push(`${ex}: gloss ${gloss.surface} ruby`);
					}
				});
			});
		});
	});
	return errors;
}

export function minnaSearchRecords(books: readonly MinnaBook[] = MINNA_BOOKS): MinnaSearchRecord[] {
	const rows: MinnaSearchRecord[] = [];
	for (const book of books) {
		for (const lesson of book.lessons) {
			lesson.points.forEach((point, i) => {
				const examples = point.examples.map((example) => `${plainMinna(example.jp)} ${example.zh} ${example.en}`).join(" ");
				const gloss = point.examples.flatMap((example) => example.glosses ?? []).map((item) => `${item.surface} ${item.reading} ${item.zh}`).join(" ");
				rows.push({
					module: "minna",
					bookId: book.id,
					w: lesson.number,
					d: i,
					i,
					key: plainMinna(point.pattern),
					reading: point.reading,
					extra: `${point.connection} ${point.zh} ${point.en} ${examples} ${gloss}`,
					sub: point.zh,
					dayTitle: `${book.titleZh} 第${lesson.number}课`,
				});
			});
		}
	}
	return rows;
}

const shokyu2: MinnaBook = {
	id: "shokyu-2",
	stage: "shokyu",
	volume: 2,
	edition: 2,
	titleZh: "大家的日本语 初級 II",
	titleJa: "みんなの日本語 初級II",
	titleEn: "Minna no Nihongo Shokyu II",
	lessons: [
		{
			number: 35,
			titleZh: "假定条件・求建议",
			titleEn: "Hypothetical conditions, asking for advice",
			goalZh: "能说实现某事所需的假定条件；也能在某种条件下给出判断，或向人求指示、建议。",
			goalEn: "State a hypothetical condition needed for something to happen, give a judgment under a condition, and ask for advice or instructions.",
			points: [
				{
					id: "l35-ba",
					pattern: "V{条件形|じょうけんけい}（ば）、〜",
					reading: "じょうけんけい ば",
					connection: "条件形的做法：1组动词把词尾う段改成え段＋ば（書く→書けば、急ぐ→急げば）；2组去掉る＋れば（食べる→食べれば）；3组 する→すれば、来る→くれば。否定是ない形＋ければ（なければ）。「ば」前面是条件，后面是结果、判断或建议；后面不能是已经确定的过去事实，那时用「たら」。",
					zh: "「ば」表示假定条件：只要前项成立，后项就成立。常用来讲规律、给建议、做判断。",
					en: "The ば conditional states a hypothetical condition: if the first part holds, the second follows. It suits general truths, judgments, and advice.",
					examples: [
						{
							jp: "{地下鉄|ちかてつ}に{乗|の}れば、{新宿|しんじゅく}まで15{分|ふん}で{行|い}けます。",
							zh: "坐地铁的话，15分钟就能到新宿。",
							en: "If you take the subway, you can get to Shinjuku in 15 minutes.",
						},
						{
							jp: "{毎晩|まいばん}{復習|ふくしゅう}すれば、{試験|しけん}の{前|まえ}に{慌|あわ}てません。",
							zh: "每天晚上复习的话，考试前就不会慌。",
							en: "If you review every evening, you will not panic before the exam.",
							glosses: [{ surface: "慌", reading: "あわ", zh: "慌张（慌てる）" }],
						},
					],
				},
				{
					id: "l35-kereba-nara",
					pattern: "イAければ／ナA・Nなら、〜",
					reading: "ければ なら",
					connection: "い形容词去掉い＋ければ（安い→安ければ），否定是「くなければ」。な形容词和名词直接＋なら（静かなら、学生なら），否定是「じゃなければ／でなければ」。",
					zh: "形容词和名词不直接接「ば」：i形容词用「ければ」，na形容词和名词用「なら」。",
					en: "Adjectives and nouns do not take ば directly: i-adjectives use ければ, and na-adjectives and nouns use なら.",
					examples: [
						{
							jp: "{値段|ねだん}が{安|やす}ければ、もう{一台|いちだい}{買|か}います。",
							zh: "如果价格便宜，我就再买一台。",
							en: "If the price is low, I will buy one more.",
						},
						{
							jp: "{明日|あした}が{休|やす}みなら、{一緒|いっしょ}に{映画|えいが}を{見|み}に{行|い}きませんか。",
							zh: "如果明天休息，要不要一起去看电影？",
							en: "If tomorrow is a day off, shall we go see a movie together?",
						},
					],
				},
				{
					id: "l35-ba-ii",
					pattern: "〜んですが、{疑問詞|ぎもんし}＋Vばいいですか",
					reading: "ぎもんし ばいいですか",
					connection: "问「该怎么做才好」时用。先用「〜んですが」铺垫自己的情况，再问「どこで／何を／どう＋动词条件形＋いいですか」。",
					zh: "想请人告诉自己该做什么、怎么做时，用疑问词加条件形再加「いいですか」。",
					en: "To ask what you should do, put a question word before the conditional and add いいですか.",
					examples: [
						{
							jp: "{傘|かさ}を{忘|わす}れたんですが、どこで{買|か}えばいいですか。",
							zh: "我把伞忘带了，请问在哪儿买好？",
							en: "I forgot my umbrella — where should I buy one?",
						},
						{
							jp: "{熱|ねつ}が{下|さ}がらないんですが、どんな{薬|くすり}を{飲|の}めばいいですか。",
							zh: "烧一直退不下来，该吃什么药好？",
							en: "My fever will not go down — what medicine should I take?",
						},
					],
				},
				{
					id: "l35-nara",
					pattern: "Nなら、〜",
					reading: "なら",
					connection: "接在名词后面，先接住对方的话题，再给出自己的建议、信息或判断。话题是场所、食物、店名等时特别常用。和假定条件的「なら」不同，这里重点在「说到……的话」。",
					zh: "「名词＋なら」是先接过话题再说话：说到这个，我的建议是……。给人推荐、提供信息时很自然。",
					en: "Noun plus なら picks up the topic and adds your recommendation or information: if it is X you are after, then...",
					examples: [
						{
							jp: "{安|やす}いホテルなら、{駅前|えきまえ}のビジネスホテルがいいですよ。",
							zh: "要说便宜的酒店，车站前的商务酒店不错。",
							en: "If you want a cheap hotel, the business hotel in front of the station is good.",
						},
						{
							jp: "{静|しず}かなカフェなら、{図書館|としょかん}の{隣|となり}の{店|みせ}がおすすめです。",
							zh: "要说安静的咖啡馆，图书馆旁边的那家值得推荐。",
							en: "For a quiet café, I recommend the one next to the library.",
						},
					],
				},
				{
					id: "l35-ba-hodo",
					pattern: "〜ば〜ほど／〜なら〜なほど",
					reading: "ば ほど なら なほど",
					connection: "同一个词重复两次：动词和い形容词用「ば」形＋原形＋ほど（読めば読むほど、安ければ安いほど）；な形容词用「なら」＋「な」＋ほど（静かなら静かなほど）。表示程度随着前项一起变化。",
					zh: "「越……越……」：前项程度越高，后项越是如此。动词、i形容词用「ば～ほど」，na形容词用「なら～なほど」。",
					en: "The more the first part, the more the second: verbs and i-adjectives use ば…ほど, na-adjectives use なら…なほど.",
					examples: [
						{
							jp: "{日本語|にほんご}は{話|はな}せば{話|はな}すほど{上手|じょうず}になります。",
							zh: "日语越说越熟练。",
							en: "The more you speak Japanese, the better you get.",
						},
						{
							jp: "{説明|せつめい}は{短|みじか}ければ{短|みじか}いほど{分|わ}かりやすいです。",
							zh: "说明越短越容易懂。",
							en: "The shorter the explanation, the easier it is to follow.",
						},
					],
				},
			],
		},
		{
			number: 36,
			titleZh: "目标・变化・努力",
			titleEn: "Goals, changes, and steady effort",
			goalZh: "能说到达目标和努力目标；也能说人的能力、事物的状况发生了变化。",
			goalEn: "State goals you aim to reach and describe changes in ability or circumstances.",
			points: [
				{
					id: "l36-youni-mokuteki",
					pattern: "V{辞書形|じしょけい}／ない{形|けい}＋ように、〜",
					reading: "じしょけい ないけい ように",
					connection: "目的放在前面，后面是为此采取的行动。前面多是自己不能直接控制的结果：可能形、ない形、見える／聞こえる等；主体也可以不同（子どもが風邪を引かないように、窓を閉めた）。同主体、意志动作的目的才可以换成「ために」。",
					zh: "「ように」说目的：为了达到某个状态而做后面的事。目标常是自己控制不了的结果，比如不迟到、不生病、能看懂。",
					en: "ように states a purpose aimed at a state you cannot directly will into being, such as not being late or being able to read.",
					examples: [
						{
							jp: "{電車|でんしゃ}に{遅|おく}れないように、{早|はや}めに{家|いえ}を{出|で}ました。",
							zh: "为了不赶不上电车，我提早出了门。",
							en: "I left home early so as not to miss the train.",
						},
						{
							jp: "{漢字|かんじ}が{読|よ}めるように、{毎日|まいにち}{少|すこ}しずつ{覚|おぼ}えています。",
							zh: "为了能读汉字，我每天一点一点地记。",
							en: "I memorize a little every day so that I can read kanji.",
						},
					],
				},
				{
					id: "l36-youni-narimashita",
					pattern: "V{辞書形|じしょけい}＋ようになりました／Vない＋なくなりました",
					reading: "ようになりました なくなりました",
					connection: "表示和以前比，能力或状态变了。肯定用「辞书形＋ようになりました」；否定用ない形去掉い＋なくなりました（飲まない→飲まなくなりました）。",
					zh: "以前做不到、现在做得到了，用「ようになりました」；以前会、现在不再了，用「なくなりました」。",
					en: "ようになりました marks a new ability or state; なくなりました marks one that has gone away.",
					examples: [
						{
							jp: "{半年|はんとし}{勉強|べんきょう}して、{日本語|にほんご}で{電話|でんわ}できるようになりました。",
							zh: "学了半年，现在能用日语打电话了。",
							en: "After six months of study, I can now make phone calls in Japanese.",
						},
						{
							jp: "{引|ひ}っ{越|こ}してから、{夜|よる}の{騒音|そうおん}が{気|き}にならなくなりました。",
							zh: "搬家以后，夜里的噪音不再让我在意了。",
							en: "Since moving, the nighttime noise no longer bothers me.",
							glosses: [
								{ surface: "騒音", reading: "そうおん", zh: "噪音" },
							],
						},
					],
				},
				{
					id: "l36-youni-shiteimasu",
					pattern: "V{辞書形|じしょけい}／ない{形|けい}＋ようにしています",
					reading: "じしょけい ないけい ようにしています",
					connection: "自己有意识地持续努力保持某个习惯。和「ようになりました」（已经变了的结果）不同，这里强调现在还在坚持。否定目标用「ない形＋ようにしています」。",
					zh: "「ようにしています」是自己定下规矩并一直坚持：为了健康早睡、为了省钱不乱买东西。",
					en: "ようにしています describes a rule you keep for yourself on purpose, an ongoing effort rather than a finished change.",
					examples: [
						{
							jp: "{健康|けんこう}のために、{毎晩|まいばん}11{時|じ}までに{寝|ね}るようにしています。",
							zh: "为了健康，我坚持每晚11点前睡觉。",
							en: "For my health, I make a point of getting to bed by eleven.",
						},
						{
							jp: "{無駄|むだ}な{物|もの}を{買|か}わないように、リストを{作|つく}ってから{買|か}い{物|もの}しています。",
							zh: "为了不买多余的东西，我先列清单再购物。",
							en: "I make a list before shopping so I do not buy things I do not need.",
							glosses: [{ surface: "無駄", reading: "むだ", zh: "多余、浪费" }],
						},
					],
				},
				{
					id: "l36-youni-shitekudasai",
					pattern: "V{辞書形|じしょけい}／ない{形|けい}＋ようにしてください",
					reading: "じしょけい ないけい ようにしてください",
					connection: "对别人提出持续性的要求或提醒，语气像交代规矩，工作场合和告示里常见。否定用「ない形＋ようにしてください」。",
					zh: "请对方以后一直注意某件事时用「ようにしてください」，像交代规矩，比一次性的「てください」更正式。",
					en: "ようにしてください asks someone to keep doing (or not doing) something as a standing rule.",
					examples: [
						{
							jp: "{会議|かいぎ}の{前|まえ}に、{資料|しりょう}を{共有|きょうゆう}フォルダに{入|い}れるようにしてください。",
							zh: "开会前，请把资料放进共享文件夹。",
							en: "Please put the materials in the shared folder before meetings.",
							glosses: [
								{ surface: "資料", reading: "しりょう", zh: "资料" },
								{ surface: "共有", reading: "きょうゆう", zh: "共享" },
							],
						},
						{
							jp: "{廊下|ろうか}では{走|はし}らないようにしてください。",
							zh: "请不要在走廊里跑。",
							en: "Please do not run in the corridor.",
							glosses: [{ surface: "廊下", reading: "ろうか", zh: "走廊" }],
						},
					],
				},
			],
		},
		{
			number: 37,
			titleZh: "被动句",
			titleEn: "The passive voice",
			goalZh: "能从说话人的视角讲自己受到的行为和受困扰的经历；也能用被动句说明事物的状况和事实。",
			goalEn: "Talk from your own viewpoint about things done to you, and describe facts and situations with the passive.",
			points: [
				{
					id: "l37-ukemi",
					pattern: "{人|ひと}は{人|ひと}にV{受身形|うけみけい}",
					reading: "うけみけい",
					connection: "受身形的做法：1组う段→あ段＋れる（怒る→怒られる、言う→言われる）；2组る→られる（褒める→褒められる）；3组する→される、来る→来（こ）られる。直接受身里，我是动作的直接对象，行为人用「に」。",
					zh: "被动句把「我受到的动作」放在前面说。被老师批评、被上司提问，都用这个形。",
					en: "The passive puts the person affected first; the doer is marked with に.",
					examples: [
						{
							jp: "{会議中|かいぎちゅう}に{部長|ぶちょう}に{質問|しつもん}されて、うまく{答|こた}えられませんでした。",
							zh: "开会时被部长提问，我没能答好。",
							en: "I was asked a question by the department head during the meeting and could not answer well.",
							glosses: [
								{ surface: "部長", reading: "ぶちょう", zh: "部长" },
								{ surface: "質問", reading: "しつもん", zh: "提问" },
							],
						},
						{
							jp: "{駅|えき}で{知|し}らない{人|ひと}に{声|こえ}をかけられて、{少|すこ}し{驚|おどろ}きました。",
							zh: "在车站被陌生人搭话，吓了一跳。",
							en: "A stranger spoke to me at the station and it startled me a little.",
							glosses: [{ surface: "驚", reading: "おどろ", zh: "吃惊（驚く）" }],
						},
					],
				},
				{
					id: "l37-mochimono",
					pattern: "{人|ひと}は{人|ひと}に{物|もの}をV{受身形|うけみけい}",
					reading: "うけみけい",
					connection: "东西还是我的，但被别人动了：所有者作主语，东西用「を」，多半带受困扰的语气。行为人用「に」；身体部位等用「を」保留（足を踏まれる）。",
					zh: "自己的东西被人碰了、拿了，用这个句型：我（所有者）被谁把东西怎么样了。常常表示受了影响。",
					en: "When someone does something to your belongings, you stay the subject and the thing keeps を.",
					examples: [
						{
							jp: "{電車|でんしゃ}の{中|なか}で、{隣|となり}の{人|ひと}に{足|あし}を{踏|ふ}まれました。",
							zh: "在电车里被旁边的人踩了脚。",
							en: "Someone next to me stepped on my foot in the train.",
							glosses: [{ surface: "踏", reading: "ふ", zh: "踩（踏む）" }],
						},
						{
							jp: "{弟|おとうと}にパソコンを{壊|こわ}されて、レポートが{書|か}けませんでした。",
							zh: "弟弟把我的电脑弄坏了，报告没写成。",
							en: "My younger brother broke my computer, so I could not write the report.",
							glosses: [{ surface: "壊", reading: "こわ", zh: "弄坏（壊す）" }],
						},
					],
				},
				{
					id: "l37-mono",
					pattern: "{物|もの}が／は{人|ひと}・{団体|だんたい}によってV{受身形|うけみけい}",
					reading: "うけみけい",
					connection: "事物作主语时，行为人不重要或众所周知，常省略；要特别点出创造者、发现者时用「によって」。历史事实、建筑、作品的说明里最常见。",
					zh: "介绍建筑、作品、发明时，主语是事物本身；做出它的人或团体用「によって」点出来。",
					en: "With things as the subject, the doer is often omitted; によって names the creator or discoverer when that matters.",
					examples: [
						{
							jp: "この{橋|はし}は1923{年|ねん}に{建|た}てられました。",
							zh: "这座桥建于1923年。",
							en: "This bridge was built in 1923.",
						},
						{
							jp: "この{絵|え}は{有名|ゆうめい}な{画家|がか}によって{描|か}かれました。",
							zh: "这幅画是位著名画家画的。",
							en: "This painting was drawn by a famous painter.",
							glosses: [{ surface: "画家", reading: "がか", zh: "画家" }],
						},
					],
				},
				{
					id: "l37-zairyou",
					pattern: "{原料|げんりょう}から／{材料|ざいりょう}で＋{作|つく}られています",
					reading: "げんりょう ざいりょう つくられています",
					connection: "原料是加工后看不出原形的东西（ぶどう→ワイン），用「から作られています」；材料是还能看出原形的东西（木→机），用「で作られています」。「〜られています」表示一直如此的事实。",
					zh: "说某物是用什么做成的：原料用「から」，材料用「で」；「作られています」是长期事实。",
					en: "から marks an ingredient transformed beyond recognition; で marks a visible material. られています states a standing fact.",
					examples: [
						{
							jp: "ワインはぶどうから{作|つく}られています。",
							zh: "葡萄酒是用葡萄酿成的。",
							en: "Wine is made from grapes.",
						},
						{
							jp: "この{机|つくえ}は{古|ふる}い{木|き}で{作|つく}られています。",
							zh: "这张桌子是用旧木头做的。",
							en: "This desk is made of old wood.",
						},
					],
				},
			],
		},
		{
			number: 38,
			titleZh: "名词化・强调",
			titleEn: "Nominalizing with no: impressions, emphasis",
			goalZh: "能对行为说感想、评价、喜好和擅长与否；能说忘了做该做的事；能确认对方知不知道某条信息；能强调想传达的内容。",
			goalEn: "Give impressions and likes about actions, say you forgot to do something, check whether someone knows a fact, and emphasize your point.",
			points: [
				{
					id: "l38-no-wa",
					pattern: "V{辞書形|じしょけい}＋のは＋{形容詞|けいようし}です",
					reading: "じしょけい のは けいようし",
					connection: "「の」把动作变成名词，感想、评价放后面：のは楽しいです／大変です／大事です。评价、喜好里用「が」的形容词（好き、上手等）不放这里，看下一条。",
					zh: "想对「做某事」本身发表感想时，用「のは＋形容词」：一个人旅行是开心的，记住汉字是难的。",
					en: "のは turns the action into a topic you can evaluate: traveling alone is fun; getting up early is tough.",
					examples: [
						{
							jp: "{一人|ひとり}で{旅行|りょこう}するのは{自由|じゆう}で{楽|たの}しいです。",
							zh: "一个人旅行自由又开心。",
							en: "Traveling alone is free and fun.",
							glosses: [{ surface: "自由", reading: "じゆう", zh: "自由" }],
						},
						{
							jp: "{朝|あさ}{早|はや}く{起|お}きるのは{大変|たいへん}ですが、{気持|きも}ちがいいです。",
							zh: "早起很辛苦，但感觉很好。",
							en: "Getting up early is tough, but it feels good.",
							glosses: [{ surface: "大変", reading: "たいへん", zh: "辛苦、费劲" }],
						},
					],
				},
				{
					id: "l38-no-ga",
					pattern: "V{辞書形|じしょけい}＋のが＋{形容詞|けいようし}です",
					reading: "じしょけい のが けいようし",
					connection: "喜好、擅长、速度类形容词（好き／嫌い／上手／下手／速い／遅い）用「のが」。和「のは」的区别：のは是对整件事的感想、评价；のが多是对习惯、能力的描述。",
					zh: "说喜欢做某事、擅长做某事时，用「のが」：我喜欢做饭，他游泳很快。",
					en: "のが goes with adjectives of liking, skill, and speed: 好き, 上手, 下手, 速い.",
					examples: [
						{
							jp: "{私|わたし}は{料理|りょうり}をするのが{好|す}きです。",
							zh: "我喜欢做饭。",
							en: "I like cooking.",
						},
						{
							jp: "{彼|かれ}は{泳|およ}ぐのが{速|はや}いです。",
							zh: "他游泳很快。",
							en: "He is a fast swimmer.",
						},
					],
				},
				{
					id: "l38-no-wo",
					pattern: "V{辞書形|じしょけい}＋のを{忘|わす}れました",
					reading: "じしょけい のを わすれました",
					connection: "该做的事忘了做：把「做某事」用「の」名词化后作「忘れる」的宾语。注意区别：把东西忘在某处是「傘を忘れました」，忘做某事是「のを忘れました」。",
					zh: "忘了做某事，用「のを忘れました」。忘带东西是「傘を忘れました」，两件事别混。",
					en: "のを忘れました means you forgot to do something; を忘れました alone means you left an object behind.",
					examples: [
						{
							jp: "{先生|せんせい}にメールを{送|おく}るのを{忘|わす}れました。",
							zh: "我忘了给老师发邮件。",
							en: "I forgot to email the teacher.",
						},
						{
							jp: "{電気|でんき}を{消|け}すのを{忘|わす}れて、{出|で}かけてしまいました。",
							zh: "忘了关灯就出门了。",
							en: "I went out forgetting to turn off the lights.",
						},
					],
				},
				{
					id: "l38-no-wo-shitteimasu",
					pattern: "{普通形|ふつうけい}＋のを{知|し}っていますか",
					reading: "ふつうけい のを しっていますか",
					connection: "确认对方是否知道某个事实：事实用普通形短句＋「の」。回答不知道要说「いいえ、知りません」，不用「知っていません」。陈述句也可以用「のを知っています／知りませんでした」。",
					zh: "问别人知不知道某件事，用「～のを知っていますか」。回答不知道要说「知りません」，这是固定说法。",
					en: "Ask whether someone knows a fact with のを知っていますか; the negative answer is 知りません.",
					examples: [
						{
							jp: "{来月|らいげつ}から{電車|でんしゃ}の{料金|りょうきん}が{上|あ}がるのを{知|し}っていますか。",
							zh: "你知道下个月起电车要涨价吗？",
							en: "Do you know that train fares go up next month?",
							glosses: [{ surface: "料金", reading: "りょうきん", zh: "费用、票价" }],
						},
						{
							jp: "{彼女|かのじょ}が{来年|らいねん}{結婚|けっこん}するのを{知|し}りませんでした。",
							zh: "我之前不知道她明年要结婚。",
							en: "I did not know she is getting married next year.",
							glosses: [{ surface: "結婚", reading: "けっこん", zh: "结婚" }],
						},
					],
				},
				{
					id: "l38-kyouchou",
					pattern: "{普通形|ふつうけい}＋のは＋〜です（{強調|きょうちょう}）",
					reading: "ふつうけい のは きょうちょう",
					connection: "把想强调的部分放到「のは」的后面：是谁、何时、在哪里做了什么，强调点一目了然。な形容词和名词要用「なのは」（静かなのは、学生なのは）。",
					zh: "想强调「是谁、在哪儿、什么时候」时，把强调的部分放进「のは～です」：做这个蛋糕的是我妹妹。",
					en: "The のは…です frame spotlights one element — who, when, or where — by placing it after のは.",
					examples: [
						{
							jp: "このケーキを{作|つく}ったのは{妹|いもうと}です。",
							zh: "做这个蛋糕的是我妹妹。",
							en: "It was my younger sister who made this cake.",
						},
						{
							jp: "{私|わたし}が{日本|にほん}へ{来|き}たのは3{年前|ねんまえ}です。",
							zh: "我来日本是三年前。",
							en: "It was three years ago that I came to Japan.",
						},
					],
				},
			],
		},
		{
			number: 39,
			titleZh: "原因・理由",
			titleEn: "Causes and polite reasons",
			goalZh: "能说明因为某个原因产生了某种感情或事态；也能礼貌地陈述理由、辩解和说明情况。",
			goalEn: "Explain how a cause led to a feeling or situation, and give reasons and explanations politely.",
			points: [
				{
					id: "l39-te",
					pattern: "Vて／Vなくて、イAくて、〜",
					reading: "て なくて くて",
					connection: "て形在这里不是「然后」，而是原因。前项多是自然发生、自己控制不了的事；后项多是感情、状态或已经发生的结果，后项不能是命令、请求或意志表达。",
					zh: "「て」也能表原因：因为前项，后项（多半是感情或结果）发生了。后面不能接请求或命令。",
					en: "て can give a cause, usually for a feeling or a result that already happened; requests and commands cannot follow.",
					examples: [
						{
							jp: "{事故|じこ}で{電車|でんしゃ}が{止|と}まって、{会議|かいぎ}に{遅|おく}れました。",
							zh: "因为事故电车停了，我开会迟到了。",
							en: "The train stopped because of an accident, and I was late for the meeting.",
							glosses: [{ surface: "事故", reading: "じこ", zh: "事故" }],
						},
						{
							jp: "{試験|しけん}に{合格|ごうかく}して、とてもうれしかったです。",
							zh: "考试合格了，非常高兴。",
							en: "I passed the exam and was very happy.",
							glosses: [{ surface: "合格", reading: "ごうかく", zh: "合格、通过" }],
						},
					],
				},
				{
					id: "l39-de",
					pattern: "ナAで／Nで、〜",
					reading: "で",
					connection: "な形容词和名词的原因形式是「で」（有名で、雨で、病気で）。和动词て形、i形容词くて并列，是同一组表原因的接续。后项同样多为已发生的结果。",
					zh: "名词和na形容词的原因形式是「で」：因为下雨、因为有名、因为生病。",
					en: "Nouns and na-adjectives use で for cause: because of rain, because it is famous, because of illness.",
					examples: [
						{
							jp: "{台風|たいふう}で、{飛行機|ひこうき}が{欠航|けっこう}になりました。",
							zh: "因为台风，航班取消了。",
							en: "The flight was canceled because of the typhoon.",
							glosses: [
								{ surface: "台風", reading: "たいふう", zh: "台风" },
								{ surface: "欠航", reading: "けっこう", zh: "航班取消" },
							],
						},
						{
							jp: "この{町|まち}は{温泉|おんせん}で{有名|ゆうめい}です。",
							zh: "这座小镇以温泉出名。",
							en: "This town is famous for its hot springs.",
							glosses: [{ surface: "温泉", reading: "おんせん", zh: "温泉" }],
						},
					],
				},
				{
					id: "l39-node",
					pattern: "{普通形|ふつうけい}＋ので、〜",
					reading: "ふつうけい ので",
					connection: "礼貌地讲理由的形式。な形容词、名词用「なので」（静かなので、雨なので）。后项可以是请求、建议、意志（て形表原因时不行）。说明情况、委婉辩解时比「から」更柔和、客观。",
					zh: "「ので」是礼貌、客观的理由说法，后面可以接请求和打算。说明情况、委婉辩解时比「から」更合适。",
					en: "ので gives a reason politely and objectively, and unlike the て cause it can precede requests and intentions; na-adjectives and nouns take なので.",
					examples: [
						{
							jp: "{明日|あした}は{朝|あさ}{早|はや}いので、{今夜|こんや}は{早|はや}く{寝|ね}ます。",
							zh: "明天要早起，所以今晚早点睡。",
							en: "Tomorrow starts early, so I will go to bed early tonight.",
						},
						{
							jp: "{電車|でんしゃ}が{遅|おく}れたので、{申|もう}し{訳|わけ}ありませんが、10{分|ふん}ほど{遅|おく}れます。",
							zh: "电车晚点了，非常抱歉，我要迟到10分钟左右。",
							en: "The train was delayed, so I am sorry, but I will be about ten minutes late.",
						},
					],
				},
			],
		},
		{
			number: 40,
			titleZh: "嵌入疑问・试着做",
			titleEn: "Embedded questions, trying something",
			goalZh: "把问句放进另一个句子里，说出自己还不确定的事，以及据此做出的判断或行动。也能说「先试一次」。",
			goalEn: "Put a question inside another sentence, and say you will try something once.",
			points: [
				{
					id: "l40-ka",
					pattern: "{疑問詞|ぎもんし}＋普通形＋か",
					reading: "ぎもんし ふつうけい か",
					connection: "有疑问词时用。动词、い形容词用普通形；な形容词和名词去掉「だ」（静かだ→静かか、雨だ→雨か）。疑问词在句中或句尾都可以。后面常接「わかりません／知っていますか／教えてください」。不要写成「～かどうか」。",
					zh: "带疑问词的问句要嵌进句子时，改成普通形，句末只留「か」，不再用「ですか」。疑问词本身放在句尾时也是「～か」，比如「会ったのはいつか」。",
					en: "When the embedded question has a question word, use the plain form plus か, not ですか. This still holds when the question word itself is the predicate.",
					examples: [
						{
							jp: "{部長|ぶちょう}がいつ{出張|しゅっちょう}から{戻|もど}るか、{秘書|ひしょ}に{聞|き}きました。",
							zh: "我问了秘书，部长什么时候出差回来。",
							en: "I asked the secretary when the department head gets back from the business trip.",
							glosses: [
								{ surface: "部長", reading: "ぶちょう", zh: "部长" },
								{ surface: "出張", reading: "しゅっちょう", zh: "出差" },
								{ surface: "秘書", reading: "ひしょ", zh: "秘书" },
							],
						},
						{
							jp: "{会場|かいじょう}へはどう{行|い}ったか、{全然|ぜんぜん}{覚|おぼ}えていません。",
							zh: "完全不记得是怎么去会场的。",
							en: "I have no memory of how I got to the venue.",
							glosses: [
								{ surface: "会場", reading: "かいじょう", zh: "会场" },
								{ surface: "全然", reading: "ぜんぜん", zh: "完全（后接否定）" },
							],
						},
					],
				},
				{
					id: "l40-kadouka",
					pattern: "普通形＋かどうか",
					reading: "かどうか",
					connection: "没有疑问词、只问「是不是」时用。动词和い形容词用普通形，肯定否定都可以；な形容词、名词去掉「だ」（静かかどうか、学生かどうか）。希望「没有问题」时，常用否定形「ないかどうか」。不能和疑问词一起用。",
					zh: "是非问句嵌进句子里，用「かどうか」，表示「是不是……还不确定」。想确认坏事没有发生时，常说否定形，重点在「没有」。",
					en: "Use かどうか for a yes-no question inside a sentence. The negative form is common when you hope the unwanted thing did not happen.",
					examples: [
						{
							jp: "{明日|あした}の{会議|かいぎ}に{出|で}られるかどうか、{今夜|こんや}{中|じゅう}に{連絡|れんらく}します。",
							zh: "今晚之内联系，说明天的会能不能参加。",
							en: "I will let you know tonight whether I can attend tomorrow's meeting.",
							glosses: [{ surface: "会議", reading: "かいぎ", zh: "会议" }],
						},
						{
							jp: "{提出|ていしゅつ}した{表|ひょう}に、{数字|すうじ}の{間違|まちが}いがないかどうか、もう{一度|いちど}{見|み}てください。",
							zh: "请再看一次，交上去的表里数字有没有错。",
							en: "Please look once more to see whether the numbers in the submitted sheet are wrong.",
							glosses: [{ surface: "提出", reading: "ていしゅつ", zh: "提交" }],
						},
					],
				},
				{
					id: "l40-temimasu",
					pattern: "Vて＋みます",
					reading: "てみます",
					connection: "动词て形＋みます。过去是「てみました」，想试是「てみたいです」。",
					zh: "表示自己先做一次，看看结果怎样，并不表示以后一直这么做。常和「一度」「ちょっと」一起用，和第36课「ようにします」那种养成习惯不同。",
					en: "Do the action once to see what happens. It is a trial, not a habit you are trying to build.",
					examples: [
						{
							jp: "{靴|くつ}のサイズが{合|あ}うかどうか{心配|しんぱい}なので、{店|みせ}で{一度|いちど}{履|は}いてみます。",
							zh: "担心鞋码不合，所以在店里先穿一次试试。",
							en: "I am not sure of the size, so I will try the shoes on once in the shop.",
						},
						{
							jp: "{昨日|きのう}{初|はじ}めて、{駅|えき}の{新|あたら}しい{出口|でぐち}から{出|で}てみました。",
							zh: "昨天第一次试着从车站的新出口出去。",
							en: "Yesterday I tried the station's new exit for the first time.",
						},
					],
				},
			],
		},
		{
			number: 41,
			titleZh: "授受：上下与亲疏",
			titleEn: "Giving and receiving by status",
			goalZh: "按上下、内外选用「いただきます／くださいます／やります」，也能更客气地请别人为自己做事。",
			goalEn: "Choose giving and receiving verbs by status, and ask for a favor politely.",
			points: [
				{
					id: "l41-itadakimasu",
					pattern: "{人|ひと}に＋{物|もの}を＋いただきます",
					reading: "いただきます",
					connection: "接受者是我或我方。给的人用「に」，东西用「を」。过去「いただきました」。",
					zh: "我从上级、长辈或关系较远的人那里收到东西，比第24课的「もらいます」更客气。主语是接受的一方，给的人不是主语。",
					en: "I receive something from a superior or an outsider. More polite than もらいます. The giver takes に.",
					examples: [
						{
							jp: "{入社|にゅうしゃ}の{日|ひ}に、{部長|ぶちょう}に{万年筆|まんねんひつ}をいただきました。",
							zh: "入职那天，部长送了我一支钢笔。",
							en: "On my first day, the department head gave me a fountain pen.",
							glosses: [
								{ surface: "入社", reading: "にゅうしゃ", zh: "入职" },
								{ surface: "部長", reading: "ぶちょう", zh: "部长" },
								{ surface: "万年筆", reading: "まんねんひつ", zh: "钢笔" },
							],
						},
						{
							jp: "{お客様|おきゃくさま}に、{地方|ちほう}の{お菓子|かし}をいただきました。",
							zh: "客人送了我们当地的点心。",
							en: "A visitor gave us sweets from their region.",
							glosses: [{ surface: "地方", reading: "ちほう", zh: "地方、外地" }],
						},
					],
				},
				{
					id: "l41-kudasaimasu",
					pattern: "{人|ひと}が＋（{私|わたし}に）＋{物|もの}を＋くださいます",
					reading: "くださいます",
					connection: "给的人用「が／は」，是上级或外方。接受者是我或我方，用「に」，常常省略。",
					zh: "上级或外人给我方东西，并抬高给的人。和「くれます」是同一方向，但「くださいます」更尊敬对方。",
					en: "A superior or outsider gives something to me. Same direction as くれます, with more respect for the giver.",
					examples: [
						{
							jp: "{社長|しゃちょう}が{新入社員|しんにゅうしゃいん}に、{記念|きねん}の{写真|しゃしん}をくださいました。",
							zh: "社长送给新职员一张纪念照片。",
							en: "The president gave the new employees a commemorative photo.",
							glosses: [
								{ surface: "新入社員", reading: "しんにゅうしゃいん", zh: "新职员" },
								{ surface: "記念", reading: "きねん", zh: "纪念" },
							],
						},
						{
							jp: "{先生|せんせい}が{推薦状|すいせんじょう}をくださいました。",
							zh: "老师给了我推荐信。",
							en: "My teacher gave me a letter of recommendation.",
							glosses: [{ surface: "推薦状", reading: "すいせんじょう", zh: "推荐信" }],
						},
					],
				},
				{
					id: "l41-yarimasu",
					pattern: "{人|ひと}・{動物|どうぶつ}に＋{物|もの}を＋やります",
					reading: "やります",
					connection: "给的人是我。接受者用「に」，多是动物、植物，或地位明显更低的人。",
					zh: "我说自己给出去。对象是动物、植物时很自然；用在人身上会显得居高临下，对同事和客人要用「あげます」。",
					en: "I give something. Natural for animals and plants. For people it sounds condescending; use あげます for colleagues.",
					examples: [
						{
							jp: "{毎朝|まいあさ}、{庭|にわ}の{猫|ねこ}に{水|みず}をやります。",
							zh: "每天早上给院子里的猫水喝。",
							en: "Every morning I give water to the cat in the yard.",
						},
						{
							jp: "{弟|おとうと}は{植木|うえき}に{肥料|ひりょう}をたくさんやりました。",
							zh: "弟弟给盆栽施了很多肥。",
							en: "My younger brother gave the potted plant a lot of fertilizer.",
							glosses: [
								{ surface: "植木", reading: "うえき", zh: "盆栽、栽种的树" },
								{ surface: "肥料", reading: "ひりょう", zh: "肥料" },
							],
						},
					],
				},
				{
					id: "l41-te-itadakimasu",
					pattern: "{人|ひと}に＋Vて＋いただきます",
					reading: "ていただきます",
					connection: "动词て形＋いただきます。为我做事的人用「に」。",
					zh: "上级或外人为我做了某事，我表示领受，比「てもらいます」更客气。动作是对方发出的，人用「に」，不要用「を」。",
					en: "Someone above me, or an outsider, does something for me. More polite than てもらいます. That person takes に.",
					examples: [
						{
							jp: "{契約書|けいやくしょ}の{内容|ないよう}を、{法務|ほうむ}の{人|ひと}に{説明|せつめい}していただきました。",
							zh: "请法务的人给我说明了合同的内容。",
							en: "Someone in the legal section explained the contract to me.",
							glosses: [
								{ surface: "契約書", reading: "けいやくしょ", zh: "合同" },
								{ surface: "内容", reading: "ないよう", zh: "内容" },
								{ surface: "法務", reading: "ほうむ", zh: "法务" },
							],
						},
						{
							jp: "{昨日|きのう}は{先輩|せんぱい}に{駅|えき}まで{送|おく}っていただきました。",
							zh: "昨天前辈把我送到了车站。",
							en: "Yesterday a senior colleague gave me a ride to the station.",
						},
					],
				},
				{
					id: "l41-te-kudasaimasu",
					pattern: "{人|ひと}が＋Vて＋くださいます",
					reading: "てくださいます",
					connection: "动词て形＋くださいます。动作者是上级或外方，用「が／は」。",
					zh: "和「ていただきます」可以说同一件事，但这里突出对方的好意，并抬高对方。比「てくれます」更尊敬做事的人。",
					en: "The same favor as ていただきます, told so that the giver's kindness stands out. More respectful than てくれます.",
					examples: [
						{
							jp: "{係|かかり}の{人|ひと}が、{迷|まよ}っていた{私|わたし}に{道|みち}を{教|おし}えてくださいました。",
							zh: "负责人给迷路的我指了路。",
							en: "The person in charge showed me the way when I was lost.",
							glosses: [
								{ surface: "係", reading: "かかり", zh: "负责某事的人" },
								{ surface: "迷", reading: "まよ", zh: "迷路、犹豫（迷う）" },
							],
						},
						{
							jp: "{部長|ぶちょう}が、{私|わたし}の{資料|しりょう}{作|づく}りを{手伝|てつだ}ってくださいました。",
							zh: "部长帮我做了资料。",
							en: "The department head helped me prepare the documents.",
							glosses: [
								{ surface: "部長", reading: "ぶちょう", zh: "部长" },
								{ surface: "資料", reading: "しりょう", zh: "资料" },
							],
						},
					],
				},
				{
					id: "l41-te-yarimasu",
					pattern: "{人|ひと}・{動物|どうぶつ}に＋Vて＋やります",
					reading: "てやります",
					connection: "动词て形＋やります。受益者用「に」。",
					zh: "我为动物、植物或地位明显更低的人做某事。对人容易失礼，同事之间用「てあげます」。",
					en: "I do something for an animal, a plant, or someone much lower in status. For colleagues, use てあげます.",
					examples: [
						{
							jp: "{怪我|けが}をした{小鳥|ことり}に、{水|みず}を{用意|ようい}してやりました。",
							zh: "给受伤的小鸟准备了水。",
							en: "I put out water for an injured bird.",
							glosses: [{ surface: "小鳥", reading: "ことり", zh: "小鸟" }],
						},
						{
							jp: "{弟|おとうと}は{植木|うえき}の{枯|か}れた{葉|は}を{取|と}ってやりました。",
							zh: "弟弟给盆栽摘掉了枯叶。",
							en: "My brother picked the dead leaves off the plant for it.",
							glosses: [
								{ surface: "植木", reading: "うえき", zh: "盆栽、栽种的树" },
								{ surface: "枯", reading: "か", zh: "枯萎（枯れる）" },
							],
						},
					],
				},
				{
					id: "l41-kudasaimasenka",
					pattern: "Vて＋くださいませんか",
					reading: "てくださいませんか",
					connection: "动词て形＋くださいませんか。请对方做的是对「我」有益的事。",
					zh: "请对方为自己做某事，比「てください」柔和。和第26课的「ていただけませんか」相比，这句少一分自谦，多一分对对方动作的尊敬。",
					en: "Ask someone to do a favor. Softer than てください, and it honors their action more than it humbles yours.",
					examples: [
						{
							jp: "{届|とど}いた{荷物|にもつ}を、{受付|うけつけ}まで{運|はこ}んでくださいませんか。",
							zh: "能把送到的行李搬到前台吗？",
							en: "Could you carry the delivery to the reception desk?",
							glosses: [{ surface: "受付", reading: "うけつけ", zh: "前台" }],
						},
						{
							jp: "この{欄|らん}の{書|か}き{方|かた}を{教|おし}えてくださいませんか。",
							zh: "能告诉我这一栏怎么填吗？",
							en: "Could you tell me how to fill in this column?",
							glosses: [{ surface: "欄", reading: "らん", zh: "栏目、格子" }],
						},
					],
				},
			],
		},
		{
			number: 42,
			titleZh: "目的与花费",
			titleEn: "Purpose and cost",
			goalZh: "说出为了什么而做，也能评价东西的用途，以及要花的时间或钱。",
			goalEn: "State a purpose, a use, and the time or money something takes.",
			points: [
				{
					id: "l42-tameni",
					pattern: "Vる／Nの＋ために",
					reading: "ために",
					connection: "动词用辞书形，名词加「の」，再＋ために。后面是为此而做的动作。不接过去形。",
					zh: "表示为了某个目的而行动。前面是目的，后面是所做的事。名词一定要加「の」，比如「健康のために」。",
					en: "In order to do something, or for the sake of a noun. Nouns need の. The verb before ために stays in the dictionary form.",
					examples: [
						{
							jp: "{来年|らいねん}{資格|しかく}を{取|と}るために、{夜|よる}は{一時間|いちじかん}{問題集|もんだいしゅう}をやっています。",
							zh: "为了明年拿到资格，晚上会做一小时习题。",
							en: "To get the qualification next year, I work on a problem book for an hour at night.",
							glosses: [
								{ surface: "資格", reading: "しかく", zh: "资格" },
								{ surface: "問題集", reading: "もんだいしゅう", zh: "习题集" },
							],
						},
						{
							jp: "{子供|こども}の{入学|にゅうがく}のために、{毎月|まいつき}{少|すこ}しずつ{別|べつ}の{口座|こうざ}へ{移|うつ}しています。",
							zh: "为了孩子入学，每月往另一个账户转一点钱。",
							en: "For the child's school entrance, I move a little into a separate account each month.",
							glosses: [
								{ surface: "入学", reading: "にゅうがく", zh: "入学" },
								{ surface: "口座", reading: "こうざ", zh: "账户" },
							],
						},
					],
				},
				{
					id: "l42-noni-use",
					pattern: "Vるの／N＋に",
					reading: "のに",
					connection: "动词辞书形＋の＋に，或名词直接＋に。后面多是「使います／いいです／便利です／必要です」。",
					zh: "表示用途或合不合适：做这件事要用它，或它适合这件事。这里的「の」把动词变成名词，再加助词「に」，不是第45课表示转折的「のに」。",
					en: "Marks what something is used for. の turns the verb into a noun before the particle に. This is not the concessive のに in lesson 45.",
					examples: [
						{
							jp: "この{薄|うす}い{手袋|てぶくろ}は、{画面|がめん}を{触|さわ}るのに{便利|べんり}です。",
							zh: "这副薄手套碰屏幕很方便。",
							en: "These thin gloves are handy for touching a screen.",
							glosses: [
								{ surface: "手袋", reading: "てぶくろ", zh: "手套" },
								{ surface: "画面", reading: "がめん", zh: "屏幕" },
							],
						},
						{
							jp: "{予備|よび}の{電池|でんち}は、{停電|ていでん}のときに{使|つか}います。",
							zh: "备用电池在停电时用。",
							en: "The spare batteries are for when the power goes out.",
							glosses: [
								{ surface: "予備", reading: "よび", zh: "备用" },
								{ surface: "停電", reading: "ていでん", zh: "停电" },
							],
						},
					],
				},
				{
					id: "l42-kakarimasu",
					pattern: "Vるの／N＋に＋{時間|じかん}・{お金|おかね}がかかります",
					reading: "かかります",
					connection: "动词辞书形＋の＋に，或名词＋に，再接「時間／お金がかかります」。数量后加「は」表示至少，加「も」表示觉得多。",
					zh: "说完成一件事要花多少时间或钱。「一時間はかかります」是至少一小时，「一時間もかかります」是居然要这么久。",
					en: "How much time or money an action takes. は means at least that much; も means it feels like a lot.",
					examples: [
						{
							jp: "{自宅|じたく}から{新|あたら}しい{事務所|じむしょ}まで{通|かよ}うのに、{片道|かたみち}で{四十分|よんじっぷん}はかかります。",
							zh: "从家里到新事务所，单程至少要四十分钟。",
							en: "Getting to the new office from home takes at least forty minutes one way.",
							glosses: [
								{ surface: "自宅", reading: "じたく", zh: "自己家" },
								{ surface: "事務所", reading: "じむしょ", zh: "事务所" },
								{ surface: "片道", reading: "かたみち", zh: "单程" },
							],
						},
						{
							jp: "この{棚|たな}を{組み立てる|くみたてる}のに、{説明書|せつめいしょ}を{見|み}ながら{二時間|にじかん}もかかりました。",
							zh: "看着说明书装这个架子，居然花了两个小时。",
							en: "Assembling this shelf while reading the instructions took a whole two hours.",
							glosses: [
								{ surface: "棚", reading: "たな", zh: "架子" },
								{ surface: "組み立てる", reading: "くみたてる", zh: "组装" },
								{ surface: "説明書", reading: "せつめいしょ", zh: "说明书" },
							],
						},
					],
				},
			],
		},
		{
			number: 43,
			titleZh: "看起来・去了就回",
			titleEn: "Appearance and going to do something",
			goalZh: "凭眼前的样子推测马上要发生的事或事物的性质，也能说先去办完一件事再回来。",
			goalEn: "Guess from what you see, and say you will go do something and come back.",
			points: [
				{
					id: "l43-v-sou",
					pattern: "Vます語幹＋そうです",
					reading: "そうです",
					connection: "动词ます词干＋そうです。一类去「ます」，二类去「ます」，来ます→来、します→し。不接否定和过去。",
					zh: "看着眼前的迹象，觉得某件事马上要发生。依据是眼睛看到的，不是听来的消息。和第47课接在普通形后面的传闻「そうです」不同，这里没有「だ」，而且接在ます词干上。",
					en: "From what you can see, the action looks about to happen. This is not the hearsay そうです of lesson 47, which follows a full plain form.",
					examples: [
						{
							jp: "{棚|たな}の{端|はし}の{箱|はこ}が{落|お}ちそうです。",
							zh: "架子边上的箱子好像要掉下来。",
							en: "The box at the edge of the shelf looks ready to fall.",
							glosses: [
								{ surface: "棚", reading: "たな", zh: "架子" },
								{ surface: "端", reading: "はし", zh: "边缘" },
							],
						},
						{
							jp: "{川|かわ}の{水|みず}が{橋|はし}のすぐ{下|した}まで{来|き}て、{溢|あふ}れそうです。",
							zh: "河水已经到了桥下，好像要漫出来。",
							en: "The river has reached just under the bridge and looks about to overflow.",
							glosses: [{ surface: "溢", reading: "あふ", zh: "漫出（溢れる）" }],
						},
					],
				},
				{
					id: "l43-a-sou",
					pattern: "{い形容詞|いけいようし}語幹／{な形容詞|なけいようし}語幹＋そうです",
					reading: "そうです",
					connection: "い形容词去掉い：おいしそうです。いい→よさそうです，ない→なさそうです。な形容词去掉だ：便利そうです。不要说「おいしいそうです」，那是传闻。",
					zh: "根据外观推测性质或状态，自己还没有确认。词要改成词干再接「そうです」。传闻才保留完整普通形，样态和传闻的接法不能混。",
					en: "It looks as if it has that quality, judging by appearance. Drop い or だ first. おいしいそうです would be hearsay, not appearance.",
					examples: [
						{
							jp: "{新|あたら}しい{椅子|いす}は、{座|すわ}り{心地|ごこち}がよさそうです。",
							zh: "新椅子看起来坐着会很舒服。",
							en: "The new chair looks comfortable to sit in.",
							glosses: [{ surface: "心地", reading: "ごこち", zh: "感受、舒服与否" }],
						},
						{
							jp: "{隣|となり}の{店|みせ}の{定食|ていしょく}は、{量|りょう}が{多|おお}そうです。",
							zh: "隔壁店的套餐看起来分量很多。",
							en: "The set meal next door looks like a large portion.",
							glosses: [
								{ surface: "定食", reading: "ていしょく", zh: "套餐" },
								{ surface: "量", reading: "りょう", zh: "分量" },
							],
						},
					],
				},
				{
					id: "l43-tekimasu",
					pattern: "Vて＋{来|き}ます",
					reading: "てきます",
					connection: "动词て形＋来ます。",
					zh: "先到别处做完某事，再回到说话的地方。重点是「去一下就回来」，不是变化开始。常和「ちょっと」一起用。",
					en: "Go somewhere, finish the errand, and come back to where you are now.",
					examples: [
						{
							jp: "{切手|きって}が{切|き}れたので、{郵便局|ゆうびんきょく}へ{買|か}って{来|き}ます。",
							zh: "邮票用完了，我去邮局买了就回来。",
							en: "We are out of stamps, so I will go buy some at the post office and come back.",
							glosses: [{ surface: "切", reading: "き", zh: "用尽（切れる）" }],
						},
						{
							jp: "{昼|ひる}までに{薬|くすり}を{受け取って|うけとって}{来|き}ますから、ここで{待|ま}っていてください。",
							zh: "中午之前我去把药取回来，请在这里等我。",
							en: "I will pick up the medicine and come back by noon, so please wait here.",
							glosses: [{ surface: "受け取って", reading: "うけとって", zh: "领取（て形）" }],
						},
					],
				},
			],
		},
		{
			number: 44,
			titleZh: "过度、难易、决定",
			titleEn: "Too much, ease, and decisions",
			goalZh: "说某事过分，评价好不好做，也能把东西改成某种状态，或在选项里做决定。",
			goalEn: "Say something is excessive or hard to do, change a state, or choose an option.",
			points: [
				{
					id: "l44-sugimasu",
					pattern: "Vます語幹／{い形容詞|いけいようし}語幹／{な形容詞|なけいようし}語幹＋すぎます",
					reading: "すぎます",
					connection: "动词ます词干、い形容词去掉い、な形容词去掉だ，再＋すぎます。",
					zh: "超过合适的程度，说话人觉得过分、不好。可以是动作太多，也可以是性质太强。只是数字上超过某个点，用「を過ぎます」，不用这个。",
					en: "Beyond a desirable degree, and the speaker finds it bad. を過ぎます is for passing a point in time or number, not for this feeling.",
					examples: [
						{
							jp: "{昨夜|さくや}は{資料|しりょう}を{直|なお}しすぎて、{今朝|けさ}{頭|あたま}が{痛|いた}いです。",
							zh: "昨晚资料改得太久，今天早上头疼。",
							en: "I revised the documents too long last night, and my head hurts this morning.",
							glosses: [
								{ surface: "昨夜", reading: "さくや", zh: "昨夜" },
								{ surface: "資料", reading: "しりょう", zh: "资料" },
							],
						},
						{
							jp: "{今週|こんしゅう}の{会議|かいぎ}は{報告|ほうこく}ばかりで、{長|なが}すぎます。",
							zh: "这周的会净是汇报，太长了。",
							en: "This week's meeting is nothing but reports, and it is too long.",
							glosses: [{ surface: "報告", reading: "ほうこく", zh: "汇报" }],
						},
					],
				},
				{
					id: "l44-yasui-nikui",
					pattern: "Vます語幹＋やすいです／にくいです",
					reading: "やすい にくい",
					connection: "动词ます词干＋やすい／にくい。后面当い形容词活用，如「やすく」「にくかった」。",
					zh: "从好不好做、容不容易发生来评价东西或事情。「やすい」是容易，「にくい」是难。评价的是事情本身，不是某个人努不努力。",
					en: "Easy or hard for the action to happen. It evaluates the thing or situation, not how hard a particular person is trying.",
					examples: [
						{
							jp: "この{説明|せつめい}は{図|ず}が{少|すく}なくて、{初|はじ}めての{人|ひと}には{理解|りかい}しにくいです。",
							zh: "这个说明图很少，第一次看的人不容易懂。",
							en: "This explanation has few diagrams, so it is hard for a newcomer to follow.",
							glosses: [
								{ surface: "図", reading: "ず", zh: "图" },
								{ surface: "理解", reading: "りかい", zh: "理解" },
							],
						},
						{
							jp: "{白|しろ}い{机|つくえ}は、{汚|よご}れが{目|め}につきやすいです。",
							zh: "白桌子容易看出脏。",
							en: "Dirt shows easily on a white desk.",
							glosses: [
								{ surface: "汚", reading: "よご", zh: "脏（汚れ）" },
								{ surface: "目", reading: "め", zh: "显眼（目につく）" },
							],
						},
					],
				},
				{
					id: "l44-ku-ni-shimasu",
					pattern: "{い形容詞|いけいようし}く／{な形容詞|なけいようし}・{名詞|めいし}に＋します",
					reading: "くします にします",
					connection: "い形容词把い改成く；な形容词和名词加に。对象用「を」，再＋します。",
					zh: "人把某物改成某种状态，是「使之变得……」。自己慢慢变成那样，用第36课的「～くなります」，不要用「します」。",
					en: "Someone changes a thing into that state. If it changes by itself, lesson 36 uses くなります instead.",
					examples: [
						{
							jp: "{来客|らいきゃく}の{前|まえ}に、{部屋|へや}を{暖|あたた}かくして、{音楽|おんがく}も{小|ちい}さくしました。",
							zh: "客人来之前把房间弄暖和，音乐也调小了。",
							en: "Before the visitors arrived, I warmed the room and turned the music down.",
							glosses: [{ surface: "来客", reading: "らいきゃく", zh: "来客" }],
						},
						{
							jp: "{受付|うけつけ}の{照明|しょうめい}を{明|あか}るくして、{待合|まちあい}を{静|しず}かにしました。",
							zh: "把前台的灯调亮，让等候的地方安静下来。",
							en: "I made the reception lighting brighter and the waiting area quiet.",
							glosses: [
								{ surface: "受付", reading: "うけつけ", zh: "前台" },
								{ surface: "照明", reading: "しょうめい", zh: "照明" },
								{ surface: "待合", reading: "まちあい", zh: "等候处" },
							],
						},
					],
				},
				{
					id: "l44-ni-shimasu-choice",
					pattern: "{名詞|めいし}＋にします",
					reading: "にします",
					connection: "名词＋にします。问句是「何にしますか」。",
					zh: "在几个选项里做出决定，点餐、选方案时很常见。这里的「に」是选定的结果，不是把一个东西改造成另一种东西。",
					en: "You pick one option, as when ordering. The に is the choice you settle on, not a physical change.",
					examples: [
						{
							jp: "{私|わたし}は{砂糖|さとう}なしの{温|あたた}かい{牛乳|ぎゅうにゅう}にします。",
							zh: "我要不加糖的热牛奶。",
							en: "I will have warm milk with no sugar.",
						},
						{
							jp: "{午後|ごご}の{打ち合わせ|うちあわせ}は、オンラインにしましょう。",
							zh: "下午的碰头会就定成线上吧。",
							en: "Let's make this afternoon's meeting online.",
							glosses: [{ surface: "打ち合わせ", reading: "うちあわせ", zh: "碰头会" }],
						},
					],
				},
			],
		},
		{
			number: 45,
			titleZh: "如果那样・明明却",
			titleEn: "In the case of, and although",
			goalZh: "先假定一种情况再说怎么处理，也能对出乎意料的结果表示不满。",
			goalEn: "Say what to do in a given case, and show disappointment when the result defies the setup.",
			points: [
				{
					id: "l45-baai",
					pattern: "普通形＋{場合|ばあい}は",
					reading: "ばあい",
					connection: "动词辞书形、ない形、た形，い形容词普通形，后面加「場合は」。な形容词加「な」，名词加「の」（静かな場合、雨の場合）。",
					zh: "先摆出一种情况，再说那时该怎么做。比「たら」更常出现在通知和手册里。名词用「の場合」，不要说「雨だ場合」。",
					en: "If that case comes up, do this. Common in notices. Nouns take の, not だ.",
					examples: [
						{
							jp: "{終電|しゅうでん}に{間|ま}に{合|あ}わない{場合|ばあい}は、{会社|かいしゃ}の{前|まえ}のホテルに{泊|と}まってください。",
							zh: "如果赶不上末班车，请住在公司前面的酒店。",
							en: "If you miss the last train, stay at the hotel in front of the office.",
							glosses: [{ surface: "終電", reading: "しゅうでん", zh: "末班电车" }],
						},
						{
							jp: "{発熱|はつねつ}の{場合|ばあい}は、{出社|しゅっしゃ}しないで{朝|あさ}のうちに{連絡|れんらく}してください。",
							zh: "如果发烧，不要来公司，请在早上联系。",
							en: "If you have a fever, do not come in; contact us in the morning.",
							glosses: [
								{ surface: "発熱", reading: "はつねつ", zh: "发烧" },
								{ surface: "出社", reading: "しゅっしゃ", zh: "到公司上班" },
							],
						},
					],
				},
				{
					id: "l45-noni",
					pattern: "普通形＋のに",
					reading: "のに",
					connection: "动词、い形容词用普通形。な形容词加「な」，名词也加「な」（静かなのに、学生なのに）。后面是和预期相反的结果。",
					zh: "后面的结果和前面的预期相反，带有意外或不满。和第42课表示用途的「Vるのに」不同：转折的「のに」是一个接续，名词和な形容词前面要加「な」。",
					en: "The result goes against what the first clause led you to expect, often with disappointment. Nouns and na-adjectives take な, unlike the purpose pattern in lesson 42.",
					examples: [
						{
							jp: "{昨日|きのう}{予約|よやく}したのに、{店|みせ}に{着|つ}いたら{席|せき}が{空|あ}いていませんでした。",
							zh: "昨天都预约了，到店里却没有空位。",
							en: "I had reserved yesterday, but when I arrived there was no free table.",
							glosses: [{ surface: "予約", reading: "よやく", zh: "预约" }],
						},
						{
							jp: "{彼|かれ}は{経験|けいけん}が{浅|あさ}いのに、{一人|ひとり}で{夜勤|やきん}を{任|まか}されています。",
							zh: "他经验不多，却被独自安排值夜班。",
							en: "He has little experience, and yet he has been put on the night shift alone.",
							glosses: [
								{ surface: "経験", reading: "けいけん", zh: "经验" },
								{ surface: "浅", reading: "あさ", zh: "浅（浅い）" },
								{ surface: "夜勤", reading: "やきん", zh: "夜班" },
								{ surface: "任", reading: "まか", zh: "交给（任せる）" },
							],
						},
					],
				},
			],
		},
		{
			number: 46,
			titleZh: "正要、刚刚、应该",
			titleEn: "About to, just did, and should be",
			goalZh: "说动作正要开始、正在做或刚刚做完，也能根据已知事实说「按理应该如此」。",
			goalEn: "Place an action just before, during, or after it happens, and state what should be true.",
			points: [
				{
					id: "l46-ru-tokoro",
					pattern: "Vる＋ところです",
					reading: "るところ",
					connection: "动词辞书形＋ところです。常和「今から」「これから」一起用。",
					zh: "动作还没开始，正要做。这里的「ところ」不是地方，而是事情进行到的那一步。",
					en: "Just about to start. ところ here is the stage of the action, not a place.",
					examples: [
						{
							jp: "{今|いま}から{倉庫|そうこ}の{在庫|ざいこ}を{数|かぞ}えるところなので、{十分|じっぷん}あとで{電話|でんわ}できますか。",
							zh: "我正要去数仓库的库存，十分钟后能打电话吗？",
							en: "I am just about to count the warehouse stock. Can you call in ten minutes?",
							glosses: [
								{ surface: "倉庫", reading: "そうこ", zh: "仓库" },
								{ surface: "在庫", reading: "ざいこ", zh: "库存" },
							],
						},
					],
				},
				{
					id: "l46-teiru-tokoro",
					pattern: "Vている＋ところです",
					reading: "ているところ",
					connection: "动词て形＋いるところです。",
					zh: "动作正在进行的当口。比单独的「ています」更强调「正好在这一步」，别人这时来找，常会这么回答。",
					en: "Right in the middle of the action. Stronger than ています alone when someone catches you at that moment.",
					examples: [
						{
							jp: "{今|いま}{名刺|めいし}の{原稿|げんこう}を{直|なお}しているところです。",
							zh: "我正在改名片的稿子。",
							en: "I am in the middle of correcting the name-card draft.",
							glosses: [
								{ surface: "名刺", reading: "めいし", zh: "名片" },
								{ surface: "原稿", reading: "げんこう", zh: "稿子" },
							],
						},
					],
				},
				{
					id: "l46-ta-tokoro",
					pattern: "Vた＋ところです",
					reading: "たところ",
					connection: "动词た形＋ところです。",
					zh: "动作刚刚结束，几乎还是这一刻，通常只有几分钟。和「たばかり」相比，它更紧，不能用来讲昨天的事。",
					en: "It happened just this moment. Much tighter than たばかり; it does not stretch to yesterday.",
					examples: [
						{
							jp: "{田中|たなか}さんは{今|いま}{駅|えき}に{着|つ}いたところで、{改札|かいさつ}の{前|まえ}で{待|ま}っています。",
							zh: "田中刚到车站，正在检票口前面等。",
							en: "Tanaka has just arrived at the station and is waiting in front of the ticket gate.",
							glosses: [{ surface: "改札", reading: "かいさつ", zh: "检票口" }],
						},
					],
				},
				{
					id: "l46-ta-bakari",
					pattern: "Vた＋ばかりです",
					reading: "たばかり",
					connection: "动词た形＋ばかりです。",
					zh: "做完还没有过多久，说话人觉得这段时间很短。可以是今天早上，甚至上周，只要心里觉得「才刚」。时间距离比「たところ」松。",
					en: "Not much time has passed, in the speaker's feeling. It can be hours or days, unlike たところ.",
					examples: [
						{
							jp: "この{部署|ぶしょ}に{移|うつ}って{来|き}たばかりなので、まだ{得意先|とくいさき}の{名前|なまえ}が{頭|あたま}に{入|はい}っていません。",
							zh: "才调到这个部门，客户的名字还没记熟。",
							en: "I only just transferred to this section, so the clients' names are not in my head yet.",
							glosses: [
								{ surface: "部署", reading: "ぶしょ", zh: "部门" },
								{ surface: "得意先", reading: "とくいさき", zh: "老客户" },
							],
						},
					],
				},
				{
					id: "l46-hazu",
					pattern: "普通形＋はずです",
					reading: "はず",
					connection: "动词、い形容词用普通形。な形容词加「な」，名词加「の」（静かなはず、雨のはず）。否定可以说「ないはずです」或「はずがありません」。",
					zh: "根据已经知道的事实，觉得某事理应如此，把握比较大，但还不是亲眼确认。比「かもしれません」更确信。",
					en: "Given what you already know, it should be so. More confident than かもしれません, but not something you have just checked.",
					examples: [
						{
							jp: "{鍵|かぎ}は{受付|うけつけ}の{人|ひと}が{預|あず}かったので、{引|ひ}き{出|だ}しの{中|なか}にあるはずです。",
							zh: "钥匙是前台收下的，应该在抽屉里。",
							en: "Reception took the key, so it should be in the drawer.",
							glosses: [
								{ surface: "受付", reading: "うけつけ", zh: "前台" },
								{ surface: "預", reading: "あず", zh: "代为保管（預かる）" },
							],
						},
						{
							jp: "{彼|かれ}は{昨日|きのう}{出国|しゅっこく}したので、{今日|きょう}の{会議|かいぎ}には{出|で}ないはずです。",
							zh: "他昨天出国了，今天的会应该不会出席。",
							en: "He left the country yesterday, so he should not be at today's meeting.",
							glosses: [{ surface: "出国", reading: "しゅっこく", zh: "出国" }],
						},
					],
				},
			],
		},
		{
			number: 47,
			titleZh: "听说・看来",
			titleEn: "Hearsay and impression",
			goalZh: "把从别处听来的消息转述出去，也能根据自己的见闻做出还不算确定的判断。",
			goalEn: "Pass on information you heard, and state a judgment from what you perceive.",
			points: [
				{
					id: "l47-sou-hearsay",
					pattern: "{情報|じょうほう}によると、普通形＋そうです",
					reading: "そうです",
					connection: "消息来源用「によると／では」。动词、い形容词用普通形；な形容词和名词要留着「だ」（静かだそうです、雨だそうです）。否定和过去都在「そう」前面。",
					zh: "把听到或读到的消息原样转述，自己没有核实。不要和第43课的样态搞混：传闻接完整普通形，な形容词和名词必须带「だ」；样态接词干，而且没有「だ」。",
					en: "You are reporting what you heard or read. Na-adjectives and nouns keep だ. Lesson 43's appearance そうです attaches to the stem and has no だ.",
					examples: [
						{
							jp: "{社内|しゃない}の{掲示|けいじ}によると、{来月|らいげつ}から{金曜|きんよう}は{在宅|ざいたく}でもいいそうです。",
							zh: "据公司里的通知，从下月起星期五可以在家办公。",
							en: "According to the office notice, working from home on Fridays will be allowed from next month.",
							glosses: [
								{ surface: "社内", reading: "しゃない", zh: "公司内部" },
								{ surface: "掲示", reading: "けいじ", zh: "布告、张贴的通知" },
								{ surface: "在宅", reading: "ざいたく", zh: "在家" },
							],
						},
						{
							jp: "{天気|てんき}{予報|よほう}では、{週末|しゅうまつ}は{風|かぜ}が{強|つよ}いそうです。",
							zh: "天气预报说，周末风会很大。",
							en: "The weather forecast says the wind will be strong this weekend.",
							glosses: [{ surface: "予報", reading: "よほう", zh: "预报" }],
						},
					],
				},
				{
					id: "l47-you",
					pattern: "普通形＋ようです",
					reading: "ようです",
					connection: "动词、い形容词用普通形。な形容词加「な」，名词加「の」（静かなようです、雨のようです）。",
					zh: "说话人根据自己看到、听到的迹象做判断，还不是确定的事实。比「はずです」更依赖眼前的观察，依据也不限于第43课那种外观。",
					en: "It seems so from signs you perceived yourself. Less settled than はず, and the evidence can be broader than appearance alone.",
					examples: [
						{
							jp: "{隣|となり}の{人|ひと}はイヤホンをしたまま{何度|なんど}も{うなずく|うなずく}ので、{面接|めんせつ}を{受|う}けているようです。",
							zh: "旁边的人戴着耳机一个劲点头，好像在面试。",
							en: "The person next to me keeps nodding with earphones on, so they seem to be in an interview.",
							glosses: [
								{ surface: "うなずく", reading: "うなずく", zh: "点头" },
								{ surface: "面接", reading: "めんせつ", zh: "面试" },
							],
						},
						{
							jp: "{廊下|ろうか}が{静|しず}かなので、{午前|ごぜん}の{説明会|せつめいかい}は{終|お}わったようです。",
							zh: "走廊很安静，上午的说明会好像结束了。",
							en: "The hall is quiet, so the morning briefing seems to have finished.",
							glosses: [
								{ surface: "廊下", reading: "ろうか", zh: "走廊" },
								{ surface: "説明会", reading: "せつめいかい", zh: "说明会" },
							],
						},
					],
				},
			],
		},
		{
			number: 48,
			titleZh: "让别人做・请允许我做",
			titleEn: "Causative and asking permission",
			goalZh: "让下级或孩子做某事，包括勉强和允许；也能很客气地请对方允许自己做。",
			goalEn: "Make or let someone act, and humbly ask permission to do something yourself.",
			points: [
				{
					id: "l48-vi-causative",
					pattern: "{人|ひと}を＋{自動詞|じどうし}の{使役|しえき}",
					reading: "しえき",
					connection: "一类：う段改あ段＋せる（待つ→待たせる）。二类：词干＋させる（起きる→起きさせる）。来る→来させる，する→させる。自动词没有宾语，被使役的人用「を」。ます形是「待たせます」。",
					zh: "让某人做原本不带宾语的动作。上下文可以是命令，也可以是允许。对下级、孩子比较自然；对上级要用「ていただきます」，不要用使役。",
					en: "Make or let someone do an intransitive verb. That person takes を. Do not use this toward a superior.",
					examples: [
						{
							jp: "{主任|しゅにん}は、{遅|おく}れて{来|き}た{社員|しゃいん}を{入口|いりぐち}で{待|ま}たせました。",
							zh: "主任让迟到的职员在入口等着。",
							en: "The supervisor made the employee who arrived late wait at the entrance.",
							glosses: [{ surface: "主任", reading: "しゅにん", zh: "主任" }],
						},
						{
							jp: "{眠|ねむ}たそうだったので、{子供|こども}を{授業|じゅぎょう}から{早|はや}く{帰|かえ}らせました。",
							zh: "孩子看起来很困，所以让他提前下课回去了。",
							en: "The child looked sleepy, so I let him leave class early.",
						},
					],
				},
				{
					id: "l48-vt-causative",
					pattern: "{人|ひと}に＋{物|もの}を＋{他動詞|たどうし}の{使役|しえき}",
					reading: "しえき",
					connection: "变形和自动词使役相同。人用「に」，事物用「を」。不要说「人を ものを させます」。",
					zh: "让某人做带宾语的动作，比如写、搬、记。同样可以是强迫，也可以是交给对方去做。事物已经占了「を」，人就要改用「に」。",
					en: "Make or let someone do a transitive verb. The person takes に and the thing takes を.",
					examples: [
						{
							jp: "{店長|てんちょう}は{新人|しんじん}に、{今日|きょう}の{売上|うりあげ}を{表|ひょう}に{書|か}かせました。",
							zh: "店长让新人把今天的销售额写进表里。",
							en: "The shop manager had the new employee write today's sales into the sheet.",
							glosses: [
								{ surface: "店長", reading: "てんちょう", zh: "店长" },
								{ surface: "新人", reading: "しんじん", zh: "新人" },
								{ surface: "売上", reading: "うりあげ", zh: "销售额" },
							],
						},
						{
							jp: "{母|はは}は{私|わたし}に、{届|とど}いた{荷物|にもつ}を{自分|じぶん}で{開|あ}けさせました。",
							zh: "妈妈让我自己打开送到的包裹。",
							en: "My mother had me open the delivered package myself.",
						},
					],
				},
				{
					id: "l48-sete",
					pattern: "{使役|しえき}て形＋いただけませんか",
					reading: "せていただけませんか",
					connection: "使役て形＋いただけませんか。話す→話させて、早退する→早退させて。",
					zh: "很客气地请求对方允许自己做某事。主语是我，不是命令对方。比「てもいいですか」更谦，对上级和客户常用。",
					en: "Humbly ask permission to do it yourself. You are not telling the other person to act.",
					examples: [
						{
							jp: "{来週|らいしゅう}の{火曜|かよう}、{午後|ごご}だけ{早退|そうたい}させていただけませんか。",
							zh: "下周星期二，能否允许我下午提前下班？",
							en: "Next Tuesday, may I leave early, just in the afternoon?",
							glosses: [{ surface: "早退", reading: "そうたい", zh: "早退" }],
						},
						{
							jp: "この{件|けん}は、{私|わたし}から{先方|せんぽう}に{説明|せつめい}させていただけませんか。",
							zh: "这件事能否让我来向对方说明？",
							en: "May I be the one to explain this matter to the other party?",
							glosses: [
								{ surface: "件", reading: "けん", zh: "事情" },
								{ surface: "先方", reading: "せんぽう", zh: "对方" },
							],
						},
					],
				},
			],
		},
		{
			number: 49,
			titleZh: "尊敬语",
			titleEn: "Respectful language",
			goalZh: "按上下和内外，用尊敬语描述上级或客人的动作，并客气地请对方做某事。",
			goalEn: "Describe a superior's actions respectfully, and ask them to do something politely.",
			points: [
				{
					id: "l49-rareru",
					pattern: "V＋（ら）れます",
					reading: "られます",
					connection: "一类：う段改あ段＋れます（書く→書かれます）。二类：ます词干＋られます（食べる→食べられます）。来る→来られます，する→されます。",
					zh: "尊敬语的一种，抬高动作的人。形式和被动一样，要看主语是对方或上级的动作，才是尊敬。不要用在自己身上，也不要和「お～になります」叠在一起。",
					en: "A respectful form that honors the person who acts. It looks like the passive, so the subject has to be the other person, never yourself.",
					examples: [
						{
							jp: "{社長|しゃちょう}は{毎週|まいしゅう}{月曜|げつよう}に{工場|こうじょう}を{回|まわ}られます。",
							zh: "社长每周一巡视工厂。",
							en: "The president walks around the factory every Monday.",
							glosses: [{ surface: "工場", reading: "こうじょう", zh: "工厂" }],
						},
						{
							jp: "{お客様|おきゃくさま}が{待合|まちあい}で{新聞|しんぶん}を{読|よ}まれています。",
							zh: "客人在等候的地方看报纸。",
							en: "The guest is reading a newspaper in the waiting area.",
							glosses: [{ surface: "待合", reading: "まちあい", zh: "等候处" }],
						},
					],
				},
				{
					id: "l49-o-ni-narimasu",
					pattern: "お＋Vます語幹＋になります",
					reading: "になります",
					connection: "和语动词的ます词干：戻ります→お戻りになります。汉语动词多用「ご～になります」。行く、来る、いる、言う、食べる、見る、する，更常用特别尊敬语，而不是这个规则形。",
					zh: "比「（ら）れます」更礼貌，用来描述上级或客人的动作。自己的动作不能用。高频不规则动词优先用下一则的特别形。",
					en: "More polite than （ら）れます for a superior's action. Never for yourself. Very common verbs prefer the special respectful verbs.",
					examples: [
						{
							jp: "{部長|ぶちょう}は{今日|きょう}{大阪|おおさか}からお{戻|もど}りになります。",
							zh: "部长今天从大阪回来。",
							en: "The department head returns from Osaka today.",
							glosses: [{ surface: "部長", reading: "ぶちょう", zh: "部长" }],
						},
					],
				},
				{
					id: "l49-special",
					pattern: "{特別|とくべつ}な{尊敬語|そんけいご}",
					reading: "そんけいご",
					connection: "直接换词：いる・行く・来る→いらっしゃいます。言う→おっしゃいます。する→なさいます。食べる・飲む→召し上がります。見る→ご覧になります。知っている→ご存じです。くれる→くださいます（第41课）。",
					zh: "这批高频动词有专用尊敬语，比规则形更自然。说上级或客人的这些动作时优先换词。「ご存じです」是「您知道」，问句是「ご存じですか」。",
					en: "A fixed respectful verb replaces the ordinary one. Prefer these for いる, 行く, 来る, 言う, する, 食べる, 飲む, 見る, and 知っている.",
					examples: [
						{
							jp: "{先生|せんせい}は{午後|ごご}も{研究室|けんきゅうしつ}にいらっしゃいます。",
							zh: "老师下午也在研究室。",
							en: "The professor will be in the lab this afternoon as well.",
							glosses: [{ surface: "研究室", reading: "けんきゅうしつ", zh: "研究室" }],
						},
						{
							jp: "{社長|しゃちょう}は、この{計画|けいかく}を{前|まえ}からご{存|ぞん}じです。",
							zh: "社长早就知道这个计划。",
							en: "The president has known about this plan for some time.",
							glosses: [{ surface: "計画", reading: "けいかく", zh: "计划" }],
						},
					],
				},
				{
					id: "l49-o-kudasai",
					pattern: "お＋Vます語幹＋ください／ご＋{漢語|かんご}＋ください",
					reading: "ください",
					connection: "和语：お待ちください、お掛けください。汉语サ变动词语干：ご確認ください。不要说「ご待ちください」。",
					zh: "客气地请对方做某事，常见于广播、商店和邮件。比「てください」更适合对客人，也比重敬的命令柔和。",
					en: "A polite request to a guest or customer. お for Japanese verbs, ご for Chinese compounds. Do not mix them.",
					examples: [
						{
							jp: "{番号|ばんごう}が{呼|よ}ばれるまで、こちらでお{待|ま}ちください。",
							zh: "请在这边等到叫号。",
							en: "Please wait here until your number is called.",
						},
						{
							jp: "{添付|てんぷ}の{住所|じゅうしょ}に{誤|あやま}りがないか、ご{確認|かくにん}ください。",
							zh: "请确认附件里的地址有没有错。",
							en: "Please check whether the address in the attachment is wrong.",
							glosses: [
								{ surface: "添付", reading: "てんぷ", zh: "附件" },
								{ surface: "誤", reading: "あやま", zh: "错误（誤り）" },
								{ surface: "確認", reading: "かくにん", zh: "确认" },
							],
						},
					],
				},
			],
		},
		{
			number: 50,
			titleZh: "谦让语与礼貌语",
			titleEn: "Humble and polite language",
			goalZh: "初級的最后一课：压低自己的动作，并看清尊敬、谦让、礼貌语各自管什么。",
			goalEn: "Lower your own actions, and keep respectful, humble, and polite speech distinct.",
			points: [
				{
					id: "l50-o-shimasu",
					pattern: "お＋Vます語幹＋します／ご＋{漢語|かんご}＋します",
					reading: "します",
					connection: "和语ます词干：お持ちします。汉语：ご案内します、ご説明します。动作是我为上级或客人做的。",
					zh: "谦让语的规则形，压低自己的动作，表示我为对方做。如果这件事和对方无关，只是说自己的行动，不要套这个形，改用特别谦让语或普通ます形。",
					en: "The regular humble form: I do it for the other person. Do not use it for an action that has nothing to do with them.",
					examples: [
						{
							jp: "{荷物|にもつ}は{私|わたし}が{車|くるま}までお{持|も}ちします。",
							zh: "行李我来拿到车上。",
							en: "I will carry the bags to the car.",
						},
						{
							jp: "{入口|いりぐち}から{会場|かいじょう}まで、{私|わたし}がご{案内|あんない}します。",
							zh: "从入口到会场，我来带路。",
							en: "I will show you from the entrance to the hall.",
							glosses: [
								{ surface: "会場", reading: "かいじょう", zh: "会场" },
								{ surface: "案内", reading: "あんない", zh: "带领、介绍" },
							],
						},
					],
				},
				{
					id: "l50-humble-other",
					pattern: "{特別|とくべつ}な{謙譲語|けんじょうご}（{相手|あいて}のための{行為|こうい}）",
					reading: "けんじょうご",
					connection: "去拜访、去问→伺います。见面→お目にかかります。看、读→拝見します。给对方→差し上げます。这些词本身已经是谦让语。",
					zh: "动作指向对方，或是为了对方而做，就换用这组专用谦让语。对象是上级或客户。初級先把这些换词记熟，再看它们和规则形怎么一起用。",
					en: "Fixed humble verbs for actions aimed at the other person: visiting, meeting, looking, and giving. Learn the replacement verb before stacking お～します on top.",
					examples: [
						{
							jp: "{明日|あした}の{十時|じゅうじ}に、{事務所|じむしょ}へ{伺|うかが}います。",
							zh: "明天十点我到事务所拜访。",
							en: "I will call at the office at ten tomorrow.",
							glosses: [
								{ surface: "事務所", reading: "じむしょ", zh: "事务所" },
								{ surface: "伺", reading: "うかが", zh: "拜访、请教（伺う）" },
							],
						},
						{
							jp: "{送|おく}っていただいた{原稿|げんこう}を、ただいま{拝見|はいけん}しました。",
							zh: "您发来的稿子，我刚刚看过了。",
							en: "I have just looked at the draft you sent.",
							glosses: [
								{ surface: "原稿", reading: "げんこう", zh: "稿子" },
								{ surface: "拝見", reading: "はいけん", zh: "拜读、看（谦让）" },
							],
						},
					],
				},
				{
					id: "l50-humble-self",
					pattern: "{特別|とくべつ}な{謙譲語|けんじょうご}（{自分|じぶん}の{行為|こうい}）",
					reading: "けんじょうご",
					connection: "行く・来る→参ります。いる→おります。言う→申します。する→いたします。食べる・飲む・もらう→いただきます。思う・知る→存じます。",
					zh: "在正式场合说自己的动作，即使不是直接给对方做，也换成这组词。电话里自报姓名、说自己不在座位，用的就是这一类。",
					en: "Humble verbs for your own actions in formal speech, even when you are not doing the action for the listener.",
					examples: [
						{
							jp: "{私|わたし}は{営業|えいぎょう}の{佐藤|さとう}と{申|もう}します。{今日|きょう}は{大阪|おおさか}から{参|まい}りました。",
							zh: "我是营业部的佐藤，今天从大阪过来。",
							en: "My name is Sato, from sales. I came from Osaka today.",
							glosses: [{ surface: "営業", reading: "えいぎょう", zh: "销售、营业" }],
						},
						{
							jp: "その{件|けん}は{私|わたし}も{存|ぞん}じておりますので、{午後|ごご}に{資料|しりょう}を{用意|ようい}いたします。",
							zh: "那件事我也知道，下午会把资料准备好。",
							en: "I am aware of that matter, so I will prepare the documents this afternoon.",
							glosses: [
								{ surface: "件", reading: "けん", zh: "事情" },
								{ surface: "存", reading: "ぞん", zh: "知道（存じる）" },
								{ surface: "資料", reading: "しりょう", zh: "资料" },
							],
						},
					],
				},
				{
					id: "l50-teinei",
					pattern: "{丁寧語|ていねいご}",
					reading: "ていねいご",
					connection: "です／ます是基础礼貌。更正式时，名词＋でございます，あります→ございます。对自己对别人都能用。",
					zh: "礼貌语不区分上下，只是把话说得客气。第49课的尊敬语抬高对方，谦让语压低自己，礼貌语是外面的一层客气。店员待客时，三层经常同时出现。",
					en: "Polite speech does not raise or lower anyone; it only makes the sentence courteous. It often wraps both respectful and humble forms.",
					examples: [
						{
							jp: "こちらが{本日|ほんじつ}の{会場|かいじょう}でございます。",
							zh: "这边是今天的会场。",
							en: "This is today's venue.",
							glosses: [
								{ surface: "本日", reading: "ほんじつ", zh: "本日、今天" },
								{ surface: "会場", reading: "かいじょう", zh: "会场" },
							],
						},
						{
							jp: "{受付|うけつけ}にお{飲|の}み{物|もの}がございます。",
							zh: "前台有饮料。",
							en: "There are drinks at reception.",
							glosses: [{ surface: "受付", reading: "うけつけ", zh: "前台" }],
						},
					],
				},
			],
		},
	],
};

export const MINNA_BOOKS: MinnaBook[] = [shokyu2];

export function minnaBook(id: string | null | undefined) {
	if (!id) return MINNA_BOOKS[0] ?? null;
	return MINNA_BOOKS.find((book) => book.id === id) ?? null;
}
