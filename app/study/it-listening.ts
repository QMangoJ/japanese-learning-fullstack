/**
 * 「IT 听力」模块（IT业务篇听力文章）。
 *
 * 数据放在 public/data/it-listening/：
 *   index.json        文章目录 { version: 1, articles: ItListeningIndexEntry[] }
 *   <id>.json         一篇文章（目录字段 + sentences）
 * 结构说明见 public/data/it-listening/README.md。
 *
 * 路由：#/it-listening（列表）与 #/it-listening/<id>（详情），
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
};

export type ItListeningIndexEntry = {
	id: string;
	title_zh: string;
	title_ja: string;
	series_zh?: string;
	series_ja?: string;
	unit?: number;
	track?: string;
	source: string;
	channelUrl?: string;
	youtube: string;
	videoId: string;
	durationSec?: number;
	sentenceCount: number;
};

export type ItListeningArticle = ItListeningIndexEntry & {
	note_zh?: string;
	sentences: ItListeningSentence[];
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

/** "#/it-listening" → { id: undefined }；"#/it-listening/<id>" → { id }；其他 → null。 */
export function parseItListeningRoute(key: string): { id?: string } | null {
	if (key === "#/it-listening") return {};
	const m = key.match(/^#\/it-listening\/([a-z0-9][a-z0-9-]*)$/);
	if (m) return { id: m[1] };
	return null;
}

export function isItListeningIndex(v: unknown): v is ItListeningIndex {
	if (typeof v !== "object" || v === null) return false;
	const idx = v as ItListeningIndex;
	return Array.isArray(idx.articles) && idx.articles.every((a) => a && typeof a.id === "string" && typeof a.youtube === "string");
}

export function isItListeningArticle(v: unknown): v is ItListeningArticle {
	if (typeof v !== "object" || v === null) return false;
	const a = v as ItListeningArticle;
	return typeof a.id === "string" && Array.isArray(a.sentences) && a.sentences.every((s) => s && typeof s.jp === "string" && typeof s.zh === "string");
}
