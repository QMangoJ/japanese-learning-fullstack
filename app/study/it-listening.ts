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
