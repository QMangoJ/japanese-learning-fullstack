/**
 * 专题词汇（topic vocabulary）的数据结构与校验。
 *
 * 数据放在 public/data/topics/：
 *   index.json        专题目录 { version: 1, topics: TopicIndexEntry[] }
 *   <slug>.json       单个专题 TopicFile
 * 结构说明见 public/data/topics/README.md。本文件不 import 任何东西，
 * 方便 scripts/*.mts 用 `node --experimental-strip-types` 直接复用同一套校验。
 */

export type TopicSubtopic = {
	/** 卡片 subtopic 字段引用的值（中文标签，例如「股票」）。 */
	zh: string;
	ja?: string;
	en?: string;
};

export type TopicCard = {
	/** 专题内唯一且稳定的 id（复习进度按它记），例如 "fin-001"。改动卡片内容时不要改 id。 */
	id: string;
	jp: string;
	kana: string;
	zh: string;
	en?: string;
	example_jp: string;
	example_zh: string;
	example_en?: string;
	/** 例句整句假名读音（可选）。 */
	example_kana?: string;
	/** 例句注音，只允许 <ruby>漢字<rt>かな</rt></ruby>；去掉注音后必须等于 example_jp。 */
	example_ruby?: string;
	subtopic: string;
	level?: string;
	/** 例句的使用场景（可选），例如「朋友从试衣间出来时」。 */
	scene?: string;
	note?: string;
};

export type TopicFile = {
	version: 1;
	slug: string;
	title_zh: string;
	title_ja: string;
	title_en?: string;
	description_zh?: string;
	description_en?: string;
	subtopics: TopicSubtopic[];
	cards: TopicCard[];
};

export type TopicIndexEntry = {
	slug: string;
	title_zh: string;
	title_ja: string;
	title_en?: string;
	count: number;
	subtopics?: string[];
};

export type TopicIndex = { version: 1; topics: TopicIndexEntry[] };

export const TOPIC_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const TOPIC_CARD_ID = /^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$/;
const RUBY_ONLY = /<ruby>([^<]+)<rt>([^<]+)<\/rt><\/ruby>/g;
const KANA = /^[\u3040-\u309f\u30a0-\u30ff\u30fc・ー\s]+$/;
const MAX_TEXT = 1_000;

const CARD_KEYS = new Set([
	"id",
	"jp",
	"kana",
	"zh",
	"en",
	"example_jp",
	"example_zh",
	"example_en",
	"example_kana",
	"example_ruby",
	"subtopic",
	"level",
	"scene",
	"note",
]);

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}

function text(value: unknown, required: boolean): value is string {
	if (value === undefined) return !required;
	return typeof value === "string" && value.length <= MAX_TEXT && (!required || value.trim().length > 0) && value === value.trim();
}

/** 去掉 <ruby> 注音后的纯文本。 */
export function stripRuby(html: string): string {
	return html.replace(RUBY_ONLY, "$1");
}

/** example_ruby 只能含 ruby 标签，其他尖括号一律不允许。 */
export function isRubySubset(html: string): boolean {
	return !/[<>]/.test(html.replace(RUBY_ONLY, ""));
}

export function validateTopicCard(card: unknown, subtopics: Set<string>, where: string): string[] {
	const errors: string[] = [];
	if (!isRecord(card)) return [`${where}: card must be an object`];
	for (const key of Object.keys(card)) if (!CARD_KEYS.has(key)) errors.push(`${where}: unknown field "${key}"`);
	if (typeof card.id !== "string" || !TOPIC_CARD_ID.test(card.id)) errors.push(`${where}: id must match ${TOPIC_CARD_ID}`);
	for (const key of ["jp", "kana", "zh", "example_jp", "example_zh", "subtopic"] as const) {
		if (!text(card[key], true)) errors.push(`${where}: ${key} is required (non-empty, trimmed string)`);
	}
	for (const key of ["en", "example_en", "example_kana", "example_ruby", "level", "scene", "note"] as const) {
		if (!text(card[key], false)) errors.push(`${where}: ${key} must be a trimmed string when present`);
	}
	if (typeof card.kana === "string" && card.kana && !KANA.test(card.kana)) errors.push(`${where}: kana must be kana only ("${card.kana}")`);
	if (typeof card.example_kana === "string" && card.example_kana && !/^[\u3040-\u30ff\u30fc\s、。！？「」『』（）・…ー0-9０-９%％a-zA-Z.,!?]+$/.test(card.example_kana)) {
		errors.push(`${where}: example_kana must not contain kanji`);
	}
	if (typeof card.subtopic === "string" && !subtopics.has(card.subtopic)) errors.push(`${where}: subtopic "${card.subtopic}" is not listed in subtopics`);
	if (typeof card.example_ruby === "string") {
		if (!isRubySubset(card.example_ruby)) errors.push(`${where}: example_ruby may only contain <ruby>…<rt>…</rt></ruby>`);
		else if (stripRuby(card.example_ruby) !== card.example_jp) errors.push(`${where}: example_ruby without readings must equal example_jp`);
	}
	return errors;
}

export function validateTopicFile(data: unknown, expectedSlug?: string): string[] {
	if (!isRecord(data)) return ["topic file must be an object"];
	const errors: string[] = [];
	const slug = typeof data.slug === "string" ? data.slug : "?";
	if (data.version !== 1) errors.push(`${slug}: version must be 1`);
	if (typeof data.slug !== "string" || !TOPIC_SLUG.test(data.slug)) errors.push(`${slug}: slug must be kebab-case`);
	if (expectedSlug && data.slug !== expectedSlug) errors.push(`${slug}: slug must match file name "${expectedSlug}"`);
	if (!text(data.title_zh, true)) errors.push(`${slug}: title_zh is required`);
	if (!text(data.title_ja, true)) errors.push(`${slug}: title_ja is required`);
	for (const key of ["title_en", "description_zh", "description_en"] as const) {
		if (!text(data[key], false)) errors.push(`${slug}: ${key} must be a string when present`);
	}
	const subtopics = new Set<string>();
	if (!Array.isArray(data.subtopics) || !data.subtopics.length) errors.push(`${slug}: subtopics must be a non-empty array`);
	else
		data.subtopics.forEach((sub, i) => {
			if (!isRecord(sub) || !text(sub.zh, true) || !text(sub.ja, false) || !text(sub.en, false)) {
				errors.push(`${slug}: subtopics[${i}] needs zh (and optional ja/en strings)`);
				return;
			}
			if (subtopics.has(sub.zh as string)) errors.push(`${slug}: duplicate subtopic "${sub.zh}"`);
			subtopics.add(sub.zh as string);
		});
	if (!Array.isArray(data.cards) || !data.cards.length) {
		errors.push(`${slug}: cards must be a non-empty array`);
		return errors;
	}
	const ids = new Set<string>();
	const words = new Set<string>();
	data.cards.forEach((card, i) => {
		const where = `${slug}.cards[${i}]${isRecord(card) && typeof card.id === "string" ? ` (${card.id})` : ""}`;
		errors.push(...validateTopicCard(card, subtopics, where));
		if (!isRecord(card)) return;
		if (typeof card.id === "string") {
			if (ids.has(card.id)) errors.push(`${where}: duplicate id`);
			ids.add(card.id);
		}
		const word = `${card.jp}|${card.kana}`;
		if (words.has(word)) errors.push(`${where}: duplicate word ${card.jp}（${card.kana}）`);
		words.add(word);
	});
	return errors;
}

export function validateTopicIndex(data: unknown): string[] {
	if (!isRecord(data)) return ["index must be an object"];
	const errors: string[] = [];
	if (data.version !== 1) errors.push("index: version must be 1");
	if (!Array.isArray(data.topics)) return [...errors, "index: topics must be an array"];
	const slugs = new Set<string>();
	data.topics.forEach((t, i) => {
		const where = `index.topics[${i}]`;
		if (!isRecord(t)) {
			errors.push(`${where}: must be an object`);
			return;
		}
		if (typeof t.slug !== "string" || !TOPIC_SLUG.test(t.slug)) errors.push(`${where}: slug must be kebab-case`);
		else if (slugs.has(t.slug)) errors.push(`${where}: duplicate slug ${t.slug}`);
		else slugs.add(t.slug);
		if (!text(t.title_zh, true) || !text(t.title_ja, true) || !text(t.title_en, false)) errors.push(`${where}: title_zh / title_ja are required`);
		if (typeof t.count !== "number" || !Number.isInteger(t.count) || t.count < 0) errors.push(`${where}: count must be a non-negative integer`);
		if (t.subtopics !== undefined && !(Array.isArray(t.subtopics) && t.subtopics.every((s) => typeof s === "string"))) {
			errors.push(`${where}: subtopics must be an array of strings`);
		}
	});
	return errors;
}

/** index 的条目应和专题文件一致（标题、数量、子主题）。 */
export function indexEntryFor(topic: TopicFile): TopicIndexEntry {
	const entry: TopicIndexEntry = { slug: topic.slug, title_zh: topic.title_zh, title_ja: topic.title_ja, count: topic.cards.length };
	if (topic.title_en) entry.title_en = topic.title_en;
	entry.subtopics = topic.subtopics.map((s) => s.zh);
	return entry;
}

export function isTopicIndex(data: unknown): data is TopicIndex {
	return validateTopicIndex(data).length === 0;
}

export function isTopicFile(data: unknown, slug?: string): data is TopicFile {
	return validateTopicFile(data, slug).length === 0;
}

/** due-review 里用的 id。 */
export function topicDueId(slug: string, cardId: string) {
	return `topic:${slug}:${cardId}`;
}

/* ---------- import (TSV / CSV / Markdown table → cards) ---------- */

const HEADER_ALIASES: Record<string, keyof TopicCard> = {
	id: "id",
	jp: "jp",
	japanese: "jp",
	日语: "jp",
	日本語: "jp",
	单词: "jp",
	単語: "jp",
	词汇: "jp",
	表达: "jp",
	kana: "kana",
	reading: "kana",
	假名: "kana",
	读音: "kana",
	假名读音: "kana",
	读音假名: "kana",
	例句日语: "example_jp",
	例句日文: "example_jp",
	例句英语: "example_en",
	読み: "kana",
	よみ: "kana",
	かな: "kana",
	zh: "zh",
	cn: "zh",
	chinese: "zh",
	中文: "zh",
	意思: "zh",
	中文意思: "zh",
	释义: "zh",
	en: "en",
	english: "en",
	英文: "en",
	英语: "en",
	example_jp: "example_jp",
	example: "example_jp",
	例句: "example_jp",
	日语例句: "example_jp",
	例文: "example_jp",
	example_zh: "example_zh",
	example_cn: "example_zh",
	例句中文: "example_zh",
	例句翻译: "example_zh",
	中文例句: "example_zh",
	例句意思: "example_zh",
	example_en: "example_en",
	example_kana: "example_kana",
	例句假名: "example_kana",
	example_ruby: "example_ruby",
	例句注音: "example_ruby",
	subtopic: "subtopic",
	topic: "subtopic",
	主题: "subtopic",
	分类: "subtopic",
	子主题: "subtopic",
	类别: "subtopic",
	level: "level",
	等级: "level",
	scene: "scene",
	场景: "scene",
	使用场景: "scene",
	难度: "level",
	note: "note",
	notes: "note",
	备注: "note",
	说明: "note",
	补充: "note",
};

export function headerKey(raw: string): keyof TopicCard | null {
	const key = raw.replace(/^\uFEFF/, "").trim().toLowerCase().replace(/\s+/g, "_");
	const bare = raw.replace(/^\uFEFF/, "").replace(/[\s()（）［］[\]【】:：]/g, "");
	return HEADER_ALIASES[key] || HEADER_ALIASES[raw.trim()] || HEADER_ALIASES[bare] || null;
}

/** RFC 4180 风格的 CSV/TSV 解析（支持引号、引号内换行、"" 转义）。 */
export function parseDelimited(source: string, delimiter: "," | "\t"): string[][] {
	const rows: string[][] = [];
	let row: string[] = [];
	let cell = "";
	let quoted = false;
	const s = source.replace(/^\uFEFF/, "");
	for (let i = 0; i < s.length; i++) {
		const ch = s[i];
		if (quoted) {
			if (ch === '"') {
				if (s[i + 1] === '"') {
					cell += '"';
					i++;
				} else quoted = false;
			} else cell += ch;
			continue;
		}
		if (ch === '"' && cell === "") quoted = true;
		else if (ch === delimiter) {
			row.push(cell);
			cell = "";
		} else if (ch === "\n" || ch === "\r") {
			if (ch === "\r" && s[i + 1] === "\n") i++;
			row.push(cell);
			rows.push(row);
			row = [];
			cell = "";
		} else cell += ch;
	}
	if (cell !== "" || row.length) {
		row.push(cell);
		rows.push(row);
	}
	return rows.filter((r) => r.some((c) => c.trim() !== ""));
}

/** 去掉 Markdown 转义（Google Docs 导出会写成 S\\&P500 之类）和加粗记号。 */
export function unescapeMarkdown(value: string): string {
	return value
		.replace(/\\+([\\&*_`[\]()#+\-.!~|<>{}=])/g, "$1")
		.replace(/\*\*(.+?)\*\*/g, "$1")
		.trim();
}

export type TableSection = { heading: string | null; rows: string[][] };

/**
 * Markdown（Google Docs「下载 → Markdown」，或 Drive 连接器读出的文本）：
 * 每个 ## 标题下的表格是一组，标题作为 subtopic。
 */
export function parseMarkdownSections(source: string): TableSection[] {
	const sections: TableSection[] = [];
	let heading: string | null = null;
	let current: TableSection | null = null;
	for (const line of source.split(/\r?\n/)) {
		const t = line.trim();
		const h = /^#{1,6}\s+(.+)$/.exec(t);
		if (h) {
			heading = unescapeMarkdown(h[1]);
			current = null;
			continue;
		}
		if (!t.startsWith("|")) {
			if (t) current = null;
			continue;
		}
		const cells = t
			.replace(/^\|/, "")
			.replace(/\|$/, "")
			.split(/(?<!\\)\|/)
			.map(unescapeMarkdown);
		if (cells.every((c) => /^:?-+:?$/.test(c))) continue;
		if (cells.every((c) => c === "")) continue;
		if (!current) {
			current = { heading, rows: [] };
			sections.push(current);
		}
		current.rows.push(cells);
	}
	return sections;
}

export function parseMarkdownTables(source: string): string[][] {
	return parseMarkdownSections(source).flatMap((s) => s.rows);
}

export function detectRows(source: string, fileName = ""): string[][] {
	return detectSections(source, fileName).flatMap((s) => s.rows);
}

export function detectSections(source: string, fileName = ""): TableSection[] {
	const lower = fileName.toLowerCase();
	if (lower.endsWith(".md") || /^\s*\|.*\|\s*$/m.test(source)) return parseMarkdownSections(source);
	const delimiter = lower.endsWith(".csv") ? "," : lower.endsWith(".tsv") || source.split(/\r?\n/)[0]?.includes("\t") ? "\t" : ",";
	return [{ heading: null, rows: parseDelimited(source, delimiter) }];
}

/** 每张表各自找表头；没有表头的表沿用上一张的表头。subtopic 列为空时用该组标题。 */
export function sectionsToDrafts(sections: TableSection[]): { drafts: ImportedRow[]; unknownHeaders: string[]; groups: { heading: string | null; count: number }[] } {
	const drafts: ImportedRow[] = [];
	const unknown = new Set<string>();
	const groups: { heading: string | null; count: number }[] = [];
	let header: string[] | null = null;
	for (const section of sections) {
		let rows = section.rows;
		const at = rows.findIndex((r) => r.map(headerKey).includes("jp"));
		if (at >= 0) {
			header = rows[at];
			rows = rows.slice(at);
		} else if (header) rows = [header, ...rows];
		else continue;
		const result = rowsToDrafts(rows);
		result.unknownHeaders.forEach((h) => unknown.add(h));
		for (const d of result.drafts) if (!d.subtopic && section.heading) d.subtopic = section.heading;
		drafts.push(...result.drafts);
		groups.push({ heading: section.heading, count: result.drafts.length });
	}
	return { drafts, unknownHeaders: [...unknown], groups };
}

/** 「株式[かぶしき]を買[か]う」→ ruby HTML。没有方括号时原样返回。 */
export function bracketRubyToHtml(value: string): string {
	return value.replace(/([\u3400-\u9fff\u3005々〆ヶ]+)[[［]([\u3040-\u30ff\u30fc]+)[\]］]/g, "<ruby>$1<rt>$2</rt></ruby>");
}

export type ImportedRow = Partial<Record<keyof TopicCard, string>>;

/** 把表格行（第一行是表头）转成卡片草稿；返回无法识别的表头供提示。 */
export function rowsToDrafts(rows: string[][]): { drafts: ImportedRow[]; unknownHeaders: string[] } {
	// 允许文档前面有标题等非表格行：取第一个能识别出 jp 列的行作表头。
	const headerAt = rows.findIndex((r) => r.map(headerKey).includes("jp"));
	if (headerAt < 0) throw new Error("找不到表头：至少要有 jp / 日语 / 单词 这一列");
	const header = rows[headerAt].map(headerKey);
	const unknownHeaders = rows[headerAt].filter((_, i) => !header[i]).map((h) => h.trim()).filter(Boolean);
	const drafts: ImportedRow[] = [];
	for (const row of rows.slice(headerAt + 1)) {
		if (row.map(headerKey).includes("jp")) continue; // 重复的表头（多张表）
		const draft: ImportedRow = {};
		header.forEach((key, i) => {
			const value = (row[i] ?? "").trim();
			if (key && value) draft[key] = value;
		});
		if (!draft.jp) continue;
		if (draft.example_ruby) {
			draft.example_ruby = bracketRubyToHtml(draft.example_ruby);
			if (!draft.example_jp) draft.example_jp = stripRuby(draft.example_ruby);
		} else if (draft.example_jp && /[[［][\u3040-\u30ff]+[\]］]/.test(draft.example_jp)) {
			draft.example_ruby = bracketRubyToHtml(draft.example_jp);
			draft.example_jp = stripRuby(draft.example_ruby);
		}
		drafts.push(draft);
	}
	return { drafts, unknownHeaders };
}

function nextIdFactory(prefix: string, used: Iterable<string>) {
	let max = 0;
	const re = new RegExp(`^${prefix}-(\\d+)$`);
	for (const id of used) {
		const m = re.exec(id);
		if (m) max = Math.max(max, Number(m[1]));
	}
	return () => `${prefix}-${String(++max).padStart(3, "0")}`;
}

/**
 * 合并导入的卡片。同一个词（jp+kana，或 id 相同）沿用旧 id，复习进度不丢。
 * mode "merge"：保留没出现在导入表里的旧卡片；"replace"：只保留导入表里的词。
 */
export function mergeTopicCards(
	existing: TopicCard[],
	drafts: ImportedRow[],
	opts: { mode: "merge" | "replace"; idPrefix: string; defaultSubtopic?: string },
): { cards: TopicCard[]; added: number; updated: number; removed: number } {
	const byId = new Map(existing.map((c) => [c.id, c]));
	const byWord = new Map(existing.map((c) => [`${c.jp}|${c.kana}`, c]));
	const byJp = new Map(existing.map((c) => [c.jp, c]));
	const nextId = nextIdFactory(opts.idPrefix, existing.map((c) => c.id));
	const touched = new Set<string>();
	const out: TopicCard[] = opts.mode === "merge" ? existing.map((c) => ({ ...c })) : [];
	let added = 0;
	let updated = 0;
	// 同一次导入里后面的行（例如 overrides 文件）只补充 / 覆盖它给出的字段。
	const runByWord = new Map<string, string>();
	for (const d of drafts) {
		const word = `${d.jp}|${d.kana ?? ""}`;
		const runId = (d.id && touched.has(d.id) ? d.id : undefined) || runByWord.get(word) || (!d.kana ? [...runByWord].find(([k]) => k.startsWith(`${d.jp}|`))?.[1] : undefined);
		if (runId) {
			const at = out.findIndex((c) => c.id === runId);
			const base = out[at];
			const merged = { ...base, ...d, id: runId } as TopicCard;
			if (d.example_jp && d.example_jp !== base.example_jp && !d.example_ruby) delete merged.example_ruby;
			if (d.example_jp && d.example_jp !== base.example_jp && !d.example_kana) delete merged.example_kana;
			out[at] = orderCard(merged);
			continue;
		}
		const prev = (d.id && byId.get(d.id)) || byWord.get(word) || (!d.kana ? byJp.get(d.jp!) : undefined);
		const card = { ...(prev || {}), ...d } as TopicCard;
		if (!card.subtopic && opts.defaultSubtopic) card.subtopic = opts.defaultSubtopic;
		if (prev && d.example_jp && d.example_jp !== prev.example_jp && !d.example_ruby) delete card.example_ruby;
		if (prev && d.example_jp && d.example_jp !== prev.example_jp && !d.example_kana) delete card.example_kana;
		card.id = prev?.id || d.id || nextId();
		if (touched.has(card.id)) continue;
		touched.add(card.id);
		runByWord.set(`${card.jp}|${card.kana ?? ""}`, card.id);
		const ordered = orderCard(card);
		const at = out.findIndex((c) => c.id === card.id);
		if (at >= 0) out[at] = ordered;
		else out.push(ordered);
		if (prev) updated++;
		else added++;
	}
	const removed = opts.mode === "replace" ? existing.filter((c) => !touched.has(c.id)).length : 0;
	return { cards: out, added, updated, removed };
}

const ORDER: (keyof TopicCard)[] = ["id", "jp", "kana", "zh", "en", "subtopic", "level", "scene", "example_jp", "example_ruby", "example_kana", "example_zh", "example_en", "note"];

function orderCard(card: TopicCard): TopicCard {
	const out: Record<string, string> = {};
	for (const key of ORDER) {
		const value = card[key];
		if (typeof value === "string" && value.trim()) out[key] = value.trim();
	}
	return out as unknown as TopicCard;
}
