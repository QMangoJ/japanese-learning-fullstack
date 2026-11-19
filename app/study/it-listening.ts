/**
 * 「IT 听力」模块（IT业务篇听力文章）。
 *
 * 数据放在 public/data/it-listening/：
 *   index.json        文章目录 { version: 1, articles: ItListeningIndexEntry[] }
 *   <id>.json         一篇文章（目录字段 + sentences）
 * 结构说明见 public/data/it-listening/README.md。
 *
 * 路由：#/it-listening（列表）、#/it-listening/<id>（详情）、
 * #/it-listening/<id>/memorize（背诵清单，数据文件 memorize-<id>.json 存在才有），
 * 与专题词汇的 #/topics/<slug> 同一套哈希路由惯例。
 */

export type ItListeningVocab = {
	w: string;
	r: string;
	pos?: string;
	zh: string;
	/** 外来语来源（可选）：「<来源语言中文名> <原词>」，如 "英语 user"、"德语 Arbeit"。
	 * 仅当词为外来语且来源明确时才填；和制英语、来源不确定的一律不填。 */
	origin?: string;
};

export type ItListeningGrammarPoint = {
	/** JLPT 级别（N5..N1），沿用 news-learning 的 grammarPoints 体例。 */
	level?: string;
	/** 语法点名，如「〜てもらいます」安排分工（非请求）。 */
	name: string;
	/** 中文解析：接续/构成 + 在本句的含义 + 场景/注意（news 的 explanationZh 深度）。 */
	explanationZh: string;
};

export type ItListeningRubySegment = {
	/** 片段文本；带 r 的片段应是汉字串，纯假名/标点片段不带 r。 */
	t: string;
	/** 该片段（汉字）的读音，假名书写；无读音的片段省略此字段。 */
	r?: string;
};

export type ItListeningSentence = {
	speaker?: string;
	/** 说话人名字的注音分段（可选）：与 ruby 同结构，片段 t 拼接 == speaker。
	 * 名字含汉字时给（如 大沢→おおさわ）；纯片假名名字（リー 等）不给。 */
	speakerRuby?: ItListeningRubySegment[];
	jp: string;
	/** 注音分段（可选）：各片段 t 依次拼接应与 jp 完全一致；渲染时带 r 的片段以 ruby 呈现。 */
	ruby?: ItListeningRubySegment[];
	zh: string;
	/** 旧式单段语法注（Unit 14 语法层升级前的文章在用），渲染保留兼容。 */
	grammar?: string;
	/** 新式逐句语法点（news-learning 体例）：每句至少一条，纯应答句给极简语用注。 */
	grammarPoints?: ItListeningGrammarPoint[];
	/** 整句结构拆解（news 的 keySentences.structureZh）：成分＋中文 gloss。 */
	structure?: string;
	vocab?: ItListeningVocab[];
	/** 回答例（可选，目前仅 real-wp-online-mock 的面试官问题句带）：按学习者本人情况写的示范回答。 */
	modelAnswer?: ItListeningModelAnswer;
	/** 本句在视频中的起始秒（可选，视频绝对时间）：与字幕轨逐词对齐得到的文章才有，
	 * 用于跟随高亮与点句跳转。同篇内单调不减。 */
	startSec?: number;
};

export type ItListeningModelAnswer = {
	jp: string;
	/** 注音分段：各片段 t 依次拼接应与 jp 完全一致（与句子 ruby 同规则）。 */
	ruby?: ItListeningRubySegment[];
	zh: string;
	/** 答题要点（中文元指导）：面试官在看什么 / 推荐结构 / 雷区。 */
	points?: ItListeningAnswerPoints;
};

export type ItListeningAnswerPoints = {
	/** 面试官在看什么：这道题在日本企业面试里的真实意图/评价点。 */
	intent: string;
	/** 推荐结构：先结论还是先经历、长度感等。 */
	structure: string;
	/** 雷区：日本语境下容易踩的答法与更稳妥的方向。 */
	pitfalls: string;
};

/** 文末小结区块的例句：origin=article 必须是本篇某句原文的子串（不许伪造原句）；
 * origin=general 是通用例句，数据与页面上都会明确标注「通用例句」。 */
export type ItListeningPatternExample = {
	jp: string;
	/** 注音分段：各片段 t 依次拼接应与 jp 完全一致（与句子 ruby 同规则）。 */
	ruby?: ItListeningRubySegment[];
	zh: string;
	origin: "article" | "general";
	/** 出处/语境（中文），如「本篇原句 · 确认志望动机时」「通用例句（本篇未出现此用法）」。 */
	ref: string;
};

/** 「ということ 家族」这类句型家族的一个成员：句型 + 一句话用法 + 例句。 */
export type ItListeningPatternEntry = {
	form: string;
	usage: string;
	examples: ItListeningPatternExample[];
};

export type ItListeningPatternGroup = {
	/** 小标题（中文）。 */
	heading: string;
	/** 说明段落（中文）：句型骨架、作用等，一条一段。 */
	body: string[];
	/** 给学习者的借用提示（中文，可选）。 */
	tip?: string;
	/** 例句直接挂在组下（复述句型组用）。 */
	examples?: ItListeningPatternExample[];
	/** 家族成员清单（家族组用）。 */
	entries?: ItListeningPatternEntry[];
};

/** 文章末尾的小结区块（可选，目前仅 real-wp-online-mock 带）：把全文反复出现的话术模式收成一页。 */
export type ItListeningPatterns = {
	title: string;
	intro?: string;
	groups: ItListeningPatternGroup[];
};

export type ItListeningIndexEntry = {
	id: string;
	/** 文章标题 = 来源视频原标题（多篇同视频时带「 — Unit N 区分段」后缀消歧）。 */
	title_zh: string;
	title_ja: string;
	/** 旧教材单元标题（迁移前 title_zh/title_ja 的原值）：列表/详情页以副标题行保留。 */
	textbookTitle_zh?: string;
	textbookTitle_ja?: string;
	series_zh?: string;
	series_ja?: string;
	unit?: number;
	track?: string;
	source: string;
	channelUrl?: string;
	/** 来源视频链接与 ID。実体験（本人柜台实战句等）无视频来源的文章不带这两个字段，页面据此不渲染播放器。 */
	youtube?: string;
	videoId?: string;
	/** 来源 YouTube 视频的真实标题（oEmbed 取回）：同一视频拆出的多篇文章共享同一标题，
	 * 列表/详情页展示用，方便按视频对上文章。 */
	videoTitle?: string;
	durationSec?: number;
	sentenceCount: number;
};

export type ItListeningArticle = ItListeningIndexEntry & {
	note_zh?: string;
	sentences: ItListeningSentence[];
	/** 文末话术模式小结（可选）。 */
	patterns?: ItListeningPatterns;
};

export type ItListeningIndex = { version: 1; articles: ItListeningIndexEntry[] };

/** 错词本条目（public/data/it-listening/mistake-words.json）：精听错词 + 篇目生词的合并清单。 */
export type MistakeWord = {
	w: string;
	r: string;
	pos?: string;
	zh: string;
	/** 外来语来源（可选）：「<来源语言中文名> <原词>」，与生词 origin 同规格。 */
	origin?: string;
	/** 出错类型/备注：精听时没听出/听错的词写当时的错法。 */
	note?: string;
	/** true = 精听错词（页面标「错」徽标）。 */
	missed?: boolean;
	/** 来源篇目，如 "Unit 14"。 */
	source: string;
	/** 添加日期 YYYY-MM-DD，真实存入数据并在页面显示。 */
	added: string;
};

export type MistakeWordsFile = { version: 1; title_zh: string; note_zh?: string; entries: MistakeWord[] };

/** 背诵清单条目：jp/zh 必须与文章定稿对应句逐字一致（构建测试硬校验）。 */
export type ItListeningMemorizeItem = {
	/** 原句编号：文章 sentences 的 1 起下标。 */
	sentenceRef: number;
	jp: string;
	/** 整行读音（文章 ruby 分段拼成），按词组以半角空格断开，方便断词跟读。 */
	reading: string;
	zh: string;
	/** 用在哪：使用场景一句话（中文）。 */
	use: string;
};

export type ItListeningMemorizeGroup = { title: string; items: ItListeningMemorizeItem[] };

/** 背诵清单（public/data/it-listening/memorize-<文章id>.json，可选、数据驱动）：
 * 从文章定稿里挑出的可直接套用的表达，按场景分组。只有存在该文件的文章才显示入口。 */
export type ItListeningMemorizeFile = {
	version: 1;
	articleId: string;
	title_zh: string;
	note_zh?: string;
	groups: ItListeningMemorizeGroup[];
};

export function isItListeningMemorizeFile(v: unknown): v is ItListeningMemorizeFile {
	if (typeof v !== "object" || v === null) return false;
	const f = v as ItListeningMemorizeFile;
	return (
		typeof f.articleId === "string" &&
		typeof f.title_zh === "string" &&
		Array.isArray(f.groups) &&
		f.groups.length > 0 &&
		f.groups.every(
			(g) =>
				g &&
				typeof g.title === "string" &&
				Array.isArray(g.items) &&
				g.items.length > 0 &&
				g.items.every(
					(it) =>
						it &&
						typeof it.sentenceRef === "number" &&
						typeof it.jp === "string" &&
						typeof it.reading === "string" &&
						typeof it.zh === "string" &&
						typeof it.use === "string",
				),
		)
	);
}

/** 面试问答背诵区的一面（问题或回答）：日文 + 注音分段（与句子 ruby 同规则）。 */
export type InterviewQaSide = {
	jp: string;
	ruby?: ItListeningRubySegment[];
};

export type InterviewQaStatus = "final" | "template" | "draft" | "undecided";

/** 背诵区条目：模拟面试的一个问题 + 按学习者本人情况写的回答（可选一段追问）。 */
export type InterviewQaItem = {
	/** 中文短名，如「自我介绍」。 */
	label: string;
	/** 定稿可直接背 / 模板需替换方括号 / 草稿方向已定 / 口径未定先别背。 */
	status: InterviewQaStatus;
	q: InterviewQaSide;
	a: InterviewQaSide & { zh: string };
	/** 答题结构一句话（中文，可选）：背诵时先想结构再开口。 */
	structure?: string;
	/** 答题要点（可选）：出题意图与避坑（中文），与 structure 一起在答案展开后成组显示。 */
	points?: { intent: string; pitfalls: string };
	/** 中文小注（可选）：模板替换提示、口径未定警告等。 */
	note?: string;
	/** 追问（可选，目前仅「为什么来日本」带「喜欢日本哪里」）。 */
	followUp?: { q: InterviewQaSide; a: InterviewQaSide & { zh: string } };
};

/** 面试问答背诵区（public/data/it-listening/interview-qa.json）：
 * 模拟面试 18 问的回答例 +「为什么来日本」，按面试流程分组，专门背诵用。 */
export type InterviewQaFile = {
	version: 1;
	title_zh: string;
	note_zh?: string;
	groups: { title: string; items: InterviewQaItem[] }[];
};

export function isInterviewQaFile(v: unknown): v is InterviewQaFile {
	if (typeof v !== "object" || v === null) return false;
	const f = v as InterviewQaFile;
	const side = (s: unknown): boolean => {
		if (typeof s !== "object" || s === null) return false;
		const x = s as InterviewQaSide;
		return typeof x.jp === "string" && (x.ruby === undefined || Array.isArray(x.ruby));
	};
	return (
		typeof f.title_zh === "string" &&
		Array.isArray(f.groups) &&
		f.groups.length > 0 &&
		f.groups.every(
			(g) =>
				g &&
				typeof g.title === "string" &&
				Array.isArray(g.items) &&
				g.items.length > 0 &&
				g.items.every(
					(it) =>
						it &&
						typeof it.label === "string" &&
						["final", "template", "draft", "undecided"].includes(it.status) &&
						side(it.q) &&
						side(it.a) &&
						typeof (it.a as { zh?: unknown }).zh === "string" &&
						(it.followUp === undefined || (side(it.followUp.q) && side(it.followUp.a))),
				),
		)
	);
}

export function isMistakeWordsFile(v: unknown): v is MistakeWordsFile {
	if (typeof v !== "object" || v === null) return false;
	const f = v as MistakeWordsFile;
	return (
		Array.isArray(f.entries) &&
		f.entries.every(
			(e) => e && typeof e.w === "string" && typeof e.r === "string" && typeof e.zh === "string" && typeof e.added === "string",
		)
	);
}

/**
 * 解说文本（grammarPoints 的 name / explanationZh、structure）里的轻量 ruby 标记：
 * 日语汉字片段写成 {漢字|よみ}，渲染时解析成 <ruby>；没有标记的文本原样返回一段。
 * 例："「{持参|じさん}する」は「{持|も}って{行|い}く」の鄭重語"。
 */
export function parseRubyMarkup(text: string): ItListeningRubySegment[] {
	const segs: ItListeningRubySegment[] = [];
	const re = /\{([^{}|]+)\|([^{}]+)\}/g;
	let last = 0;
	let m: RegExpExecArray | null;
	while ((m = re.exec(text)) !== null) {
		if (m.index > last) segs.push({ t: text.slice(last, m.index) });
		segs.push({ t: m[1], r: m[2] });
		last = m.index + m[0].length;
	}
	if (last < text.length) segs.push({ t: text.slice(last) });
	return segs.length ? segs : [{ t: text }];
}

/** "#/it-listening" → {}；"#/it-listening/<id>" → { id }；
 * "#/it-listening/<id>/memorize" → { id, memorize: true }（背诵清单视图）；其他 → null。 */
export function parseItListeningRoute(key: string): { id?: string; memorize?: boolean } | null {
	if (key === "#/it-listening") return {};
	const mm = key.match(/^#\/it-listening\/([a-z0-9][a-z0-9-]*)\/memorize$/);
	if (mm) return { id: mm[1], memorize: true };
	const m = key.match(/^#\/it-listening\/([a-z0-9][a-z0-9-]*)$/);
	if (m) return { id: m[1] };
	return null;
}

export function isItListeningIndex(v: unknown): v is ItListeningIndex {
	if (typeof v !== "object" || v === null) return false;
	const idx = v as ItListeningIndex;
	return (
		Array.isArray(idx.articles) &&
		idx.articles.every((a) => a && typeof a.id === "string" && (a.youtube === undefined || typeof a.youtube === "string"))
	);
}

export function isItListeningArticle(v: unknown): v is ItListeningArticle {
	if (typeof v !== "object" || v === null) return false;
	const a = v as ItListeningArticle;
	return typeof a.id === "string" && Array.isArray(a.sentences) && a.sentences.every((s) => s && typeof s.jp === "string" && typeof s.zh === "string");
}
