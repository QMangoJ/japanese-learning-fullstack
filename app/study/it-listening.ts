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

export type ItListeningSentence = {
	speaker?: string;
	jp: string;
	zh: string;
	grammar?: string;
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
