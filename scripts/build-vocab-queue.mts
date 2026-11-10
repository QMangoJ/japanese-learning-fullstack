/**
 * Build the unified vocabulary queue word list (public/data/vocab-queue.json).
 *
 * Run: npm run generate:vocab-queue
 * (Inputs for the account-bound sources are refreshed by
 *  scripts/fetch-vocab-queue-inputs.py — favourites / mistakes / study aids
 *  from KV, plus the transcribed 番番词书 TSV.)
 *
 * Sources, in priority order (Daniel, 2026-11-11):
 *   tier 1  work:        topics frontend → job-interview
 *   tier 2  IT listening mistake-words (public/data/it-listening/mistake-words.json)
 *   tier 3  classroom:   lesson-review.json word items from the「Danielさん」doc
 *                        (the Preply doc's 327 words are NOT queued — candidate only)
 *   tier 4  collected:   app favourites → personal mistakes book → 番番词书 (140)
 *   tier 5  N2 decks:    n2vocab (1258) → n2kanji (657, kanji+example-word cards)
 *
 * Explicitly excluded (Daniel 2026-11-11): 漢字マスターN4 kanji-exam word list,
 * life topics (bank-atm / clothes-shopping / cafe-menu / 口语）, japan-investing.
 *
 * Cross-source duplicates collapse to one entry: the higher-priority source
 * wins, missing reading/gloss fields are filled from the loser, and source
 * labels merge. Word ids are a stable hash of (normalized word + reading) so
 * SRS state survives rebuilds. Mistakes that cannot be normalized honestly
 * (no gloss source, extraction failed, not a word item at all) are NOT
 * silently dropped: they land in docs/vocab-queue-pending.md with a reason.
 */
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { mistakeStudyParts, mistakeTranslationSource } from "../app/study/mistake-translations.ts";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const INPUTS = join(ROOT, "scripts", "vocab-queue-inputs");

type RawWord = {
	w: string;
	r: string;
	zh: string;
	en?: string;
	ex?: string;
	exZh?: string;
};

type Candidate = RawWord & { tier: number; src: string; ord: number; srcKey: string };
type Pending = { source: string; ref: string; excerpt: string; reason: string };

function readJson<T>(path: string): T {
	return JSON.parse(readFileSync(path, "utf8")) as T;
}

function sha256(text: string): string {
	return createHash("sha256").update(text).digest("hex");
}

/** Extract the reading from <ruby>漢字<rt>かんじ</rt></ruby> markup; plain text passes through. */
export function rubyToReading(markup: string | undefined): string {
	if (!markup) return "";
	let out = "";
	let rest = markup;
	const re = /<ruby>(.*?)<rt>(.*?)<\/rt><\/ruby>/g;
	let last = 0;
	let m: RegExpExecArray | null;
	while ((m = re.exec(markup))) {
		out += rest.slice(last, m.index).replace(/<[^>]+>/g, "");
		out += m[2];
		last = m.index + m[0].length;
	}
	out += rest.slice(last).replace(/<[^>]+>/g, "");
	return out.trim();
}

function isKana(text: string): boolean {
	if (!text) return false;
	return [...text].every((c) => {
		const code = c.codePointAt(0) ?? 0;
		return (code >= 0x3040 && code <= 0x30ff) || c === "・" || c === "／" || c === "/";
	});
}

/** Dedupe key: trimmed, first synonym segment, no trailing （な）/ leading 〜. */
export function normKey(word: string): string {
	let key = String(word || "").replace(/\s+/g, " ").trim();
	key = key.split(/[／/]/)[0].trim();
	key = key.replace(/^[〜～・]+/, "").replace(/[（(]な[）)]$/, "").replace(/。$/, "").trim();
	return key;
}

function wordId(word: string, reading: string): string {
	return `w:${sha256(`${normKey(word)}|${reading || ""}`).slice(0, 12)}`;
}

// ---------- dataset lookup index (readings / glosses for favs & mistakes) ----------

type IndexEntry = { r: string; zh: string; en: string };
const index = new Map<string, IndexEntry>();

function indexPut(surface: string, entry: Partial<IndexEntry>) {
	const key = normKey(surface);
	if (!key) return;
	const prev = index.get(key) ?? { r: "", zh: "", en: "" };
	index.set(key, {
		r: prev.r || entry.r || "",
		zh: prev.zh || entry.zh || "",
		en: prev.en || entry.en || "",
	});
}

function indexGet(surface: string): IndexEntry | undefined {
	return index.get(normKey(surface));
}

/** Recursively harvest {jp, jp_r|reading, cn, en} items and {pattern, usage_cn} points from any dataset JSON. */
function harvest(node: unknown) {
	if (Array.isArray(node)) {
		for (const child of node) harvest(child);
		return;
	}
	if (!node || typeof node !== "object") return;
	const obj = node as Record<string, unknown>;
	if (typeof obj.jp === "string" && (typeof obj.cn === "string" || typeof obj.en === "string")) {
		const reading =
			typeof obj.reading === "string" ? obj.reading : rubyToReading(typeof obj.jp_r === "string" ? obj.jp_r : "");
		indexPut(obj.jp, {
			r: reading && reading !== obj.jp ? reading : isKana(obj.jp) ? obj.jp : reading,
			zh: typeof obj.cn === "string" ? obj.cn : "",
			en: typeof obj.en === "string" ? obj.en : "",
		});
	}
	if (typeof obj.pattern === "string" && typeof obj.usage_cn === "string") {
		indexPut(obj.pattern, {
			r: typeof obj.reading === "string" ? obj.reading : "",
			zh: obj.usage_cn,
			en: typeof obj.usage_en === "string" ? obj.usage_en : "",
		});
	}
	if (typeof obj.char === "string" && Array.isArray(obj.words)) {
		for (const w of obj.words as Record<string, unknown>[]) {
			if (typeof w.jp === "string") {
				indexPut(w.jp, {
					r: typeof w.reading === "string" ? w.reading : rubyToReading(typeof w.jp_r === "string" ? w.jp_r : ""),
					zh: typeof w.cn === "string" ? w.cn : "",
					en: typeof w.en === "string" ? w.en : "",
				});
			}
		}
		if (Array.isArray(obj.readings) && obj.readings.length) {
			indexPut(obj.char, { r: (obj.readings as string[]).join("・") });
		}
	}
	for (const value of Object.values(obj)) harvest(value);
}

function buildIndex() {
	const dataDir = join(ROOT, "public", "data");
	for (const file of readdirSync(dataDir)) {
		if (/^(n\d)?(vocab|kanji|grammar)\..*\.json$/.test(file) || file === "lesson-review.json") {
			try {
				harvest(readJson(join(dataDir, file)));
			} catch {
				/* skip unreadable dataset */
			}
		}
	}
	const topicsDir = join(dataDir, "topics");
	for (const file of readdirSync(topicsDir)) {
		if (!file.endsWith(".json") || file === "index.json") continue;
		try {
			const topic = readJson<{ cards?: Record<string, unknown>[] }>(join(topicsDir, file));
			for (const card of topic.cards ?? []) {
				if (typeof card.jp === "string") {
					indexPut(card.jp, {
						r: typeof card.kana === "string" ? card.kana : rubyToReading(card.jp_ruby as string),
						zh: typeof card.zh === "string" ? card.zh : "",
						en: typeof card.en === "string" ? card.en : "",
					});
				}
			}
		} catch {
			/* skip */
		}
	}
	try {
		const itl = readJson<{ entries: Record<string, unknown>[] }>(join(dataDir, "it-listening", "mistake-words.json"));
		for (const e of itl.entries ?? []) {
			if (typeof e.w === "string") indexPut(e.w, { r: String(e.r ?? ""), zh: String(e.zh ?? "") });
		}
	} catch {
		/* skip */
	}
	try {
		const readings = readJson<Record<string, string>>(join(ROOT, "app", "data", "lesson-review-kanji-readings.json"));
		for (const [surface, reading] of Object.entries(readings)) indexPut(surface, { r: reading });
	} catch {
		/* skip */
	}
}

// ---------- sources ----------

const pending: Pending[] = [];
const candidates: Candidate[] = [];
const counts: Record<string, { gross: number; added: number; merged: number }> = {};
function bump(srcKey: string, field: "gross" | "added" | "merged") {
	counts[srcKey] = counts[srcKey] ?? { gross: 0, added: 0, merged: 0 };
	counts[srcKey][field] += 1;
}

let tierOrd = new Map<number, number>();
function nextOrd(tier: number): number {
	const next = (tierOrd.get(tier) ?? 0) + 1;
	tierOrd.set(tier, next);
	return next;
}

function push(c: Omit<Candidate, "ord">) {
	bump(c.srcKey, "gross");
	candidates.push({ ...c, ord: nextOrd(c.tier) });
}

function topicWords(file: string, src: string, srcKey: string) {
	const topic = readJson<{ cards: Record<string, unknown>[] }>(join(ROOT, "public", "data", "topics", file));
	for (const card of topic.cards ?? []) {
		const jp = String(card.jp ?? "").trim();
		if (!jp) continue;
		push({
			w: jp,
			r: String(card.kana ?? "") || rubyToReading(card.jp_ruby as string),
			zh: String(card.zh ?? ""),
			en: typeof card.en === "string" ? card.en : undefined,
			ex: typeof card.example_jp === "string" ? card.example_jp : undefined,
			exZh: typeof card.example_zh === "string" ? card.example_zh : undefined,
			tier: 1,
			src,
			srcKey,
		});
	}
}

function itlMistakeWords() {
	const data = readJson<{ entries: Record<string, unknown>[] }>(
		join(ROOT, "public", "data", "it-listening", "mistake-words.json"),
	);
	for (const e of data.entries ?? []) {
		const w = String(e.w ?? "").trim();
		if (!w) continue;
		push({ w, r: String(e.r ?? ""), zh: String(e.zh ?? ""), tier: 2, src: "IT听力错词本", srcKey: "itlMistakes" });
	}
}

function classroomWords() {
	const data = readJson<{ days: { source: string; items: Record<string, unknown>[] }[] }>(
		join(ROOT, "public", "data", "lesson-review.json"),
	);
	for (const day of data.days ?? []) {
		if (day.source !== "Danielさん") continue;
		for (const item of day.items ?? []) {
			if (item.kind !== "word") continue;
			const jp = String(item.jp ?? "").trim();
			if (!jp || jp.length > 40) continue;
			if ((!item.cn && !item.en) || jp.startsWith("（")) {
				pending.push({
					source: "课堂复习",
					ref: `lesson-review:${jp}`,
					excerpt: jp.slice(0, 80),
					reason: "课堂文档条目词面/释义缺失（文档原文如此，疑似表格列错位）",
				});
				continue;
			}
			const reading = rubyToReading(item.jp_r as string) || indexGet(jp)?.r || "";
			push({
				w: jp,
				r: reading === jp && !isKana(jp) ? "" : reading,
				zh: String(item.cn ?? ""),
				en: typeof item.en === "string" ? item.en : undefined,
				ex: typeof item.example === "string" ? item.example : undefined,
				exZh: typeof item.exampleCn === "string" ? item.exampleCn : undefined,
				tier: 3,
				src: "课堂复习",
				srcKey: "classroom",
			});
		}
	}
}

type Fav = { module: string; jp?: string; cn?: string; kind?: string };
function favourites() {
	const favs = readJson<Record<string, Fav>>(join(INPUTS, "favs.json"));
	for (const [key, fav] of Object.entries(favs)) {
		const jp = String(fav.jp ?? "").trim();
		const cn = String(fav.cn ?? "").trim();
		if (!jp) {
			pending.push({ source: "收藏", ref: key, excerpt: "", reason: "收藏条目无词面" });
			continue;
		}
		if (fav.kind === "exam-question" || jp.includes("正确答案") || jp.length > 60) {
			pending.push({ source: "收藏", ref: key, excerpt: jp.slice(0, 80), reason: "收藏的是整道题目/长句，不是单词条目" });
			continue;
		}
		if (fav.module === "selection") {
			// 划词收藏：cn 是占位文案（划词收藏 · 单词），释义只能来自数据集查表。
			const surfaces = [jp, jp.replace(/^[\d\s.、，]+/, "")];
			let hit: IndexEntry | undefined;
			let surface = jp;
			for (const s of surfaces) {
				hit = indexGet(s);
				if (hit?.zh) {
					surface = s;
					break;
				}
				hit = undefined;
			}
			if (!hit?.zh) {
				pending.push({ source: "收藏", ref: key, excerpt: jp.slice(0, 80), reason: "划词收藏文本残缺或无释义来源" });
				continue;
			}
			push({ w: surface, r: hit.r, zh: hit.zh, en: hit.en || undefined, tier: 4, src: "收藏", srcKey: "favourites" });
			continue;
		}
		if (!cn) {
			pending.push({ source: "收藏", ref: key, excerpt: jp.slice(0, 80), reason: "收藏条目无中文释义" });
			continue;
		}
		const hit = indexGet(jp);
		push({ w: jp, r: hit?.r ?? "", zh: cn, en: hit?.en || undefined, tier: 4, src: "收藏", srcKey: "favourites" });
	}
}

type Mistake = { id: string; type: string; text: string; deleted?: boolean };
type StudyAid = { reading?: string; cn?: string; example?: string; exampleCn?: string };

function chineseLine(text: string): string {
	for (const line of text.split("\n").slice(1)) {
		const t = line.trim();
		if (t && /[一-鿿]/.test(t) && !/[ぁ-ヿ]/.test(t)) return t;
	}
	return "";
}

function mistakesBook() {
	const mistakes = readJson<Mistake[]>(join(INPUTS, "mistakes.json"));
	const aids = readJson<Record<string, StudyAid>>(join(INPUTS, "study-aids.json"));
	const active = mistakes.filter((m) => !m.deleted);
	// Dataset surfaces sorted longest-first for fill-in / reading extraction.
	const surfaces = [...index.keys()].sort((a, b) => b.length - a.length);

	for (const m of active) {
		const aid = aids[sha256(mistakeTranslationSource(m))];
		const parts = mistakeStudyParts(m);
		const excerpt = m.text.replace(/\s+/g, " ").slice(0, 80);
		const fail = (reason: string) => pending.push({ source: "错词本", ref: `${m.type}:${m.id}`, excerpt, reason });

		if (m.type === "word") {
			const w = parts.jp.split("\n")[0].trim();
			if (!w) {
				fail("词面为空");
				continue;
			}
			const hit = indexGet(w);
			const zh = aid?.cn || hit?.zh || "";
			if (!zh) {
				fail("无释义来源（学习辅助与数据集均未命中）");
				continue;
			}
			push({
				w,
				r: aid?.reading || hit?.r || "",
				zh,
				en: hit?.en || undefined,
				ex: aid?.example,
				exZh: aid?.exampleCn,
				tier: 4,
				src: "错词本",
				srcKey: "mistakes",
			});
			continue;
		}

		if (m.type === "grammar") {
			const w = parts.jp.split("\n")[0].trim();
			if (!w) {
				fail("语法条目为空");
				continue;
			}
			const hit = indexGet(w);
			const zh = aid?.cn || chineseLine(parts.jp) || hit?.zh || "";
			if (!zh) {
				fail("无释义来源（学习辅助与数据集均未命中）");
				continue;
			}
			push({
				w,
				r: aid?.reading || hit?.r || "",
				zh,
				en: hit?.en || undefined,
				ex: aid?.example,
				exZh: aid?.exampleCn,
				tier: 4,
				src: "错词本",
				srcKey: "mistakes",
			});
			continue;
		}

		if (m.type === "q") {
			const answer = parts.cn.trim().replace(/^\d+\s+/, "");
			const prompt = parts.jp.trim();
			if (!answer) {
				fail("题目无正确答案记录，无法还原词条");
				continue;
			}
			if (/^[A-Da-d]$/.test(answer) || prompt.includes("{") || prompt.startsWith("1 リスト")) {
				fail("阅读理解/听力大题，不是单词条目");
				continue;
			}
			// (a) The answer itself is the entry (choice questions / phrase answers).
			if (prompt.includes(answer) && answer.length >= 2 && !/^[ぁ-ヿー]+$/.test(answer)) {
				const hit = indexGet(answer);
				const zh = hit?.zh || aid?.cn || "";
				if (!zh) {
					fail("选项短语无释义来源");
					continue;
				}
				push({ w: answer, r: hit?.r || "", zh, tier: 4, src: "错词本", srcKey: "mistakes" });
				continue;
			}
			// (b) Reading question: dataset word whose reading == answer and whose surface is in the prompt.
			if (isKana(answer)) {
				const hitKey = surfaces.find((s) => {
					const e = index.get(s);
					return e && e.r === answer && prompt.includes(s);
				});
				if (hitKey) {
					const e = index.get(hitKey)!;
					if (e.zh) {
						push({ w: hitKey, r: answer, zh: e.zh, en: e.en || undefined, tier: 4, src: "错词本", srcKey: "mistakes" });
						continue;
					}
				}
				// (a2) kana answer that is itself a grammar pattern in the prompt (choice options in kana).
				if (prompt.includes(answer)) {
					const hit = indexGet(answer);
					if (hit?.zh) {
						push({ w: answer, r: hit.r || "", zh: hit.zh, tier: 4, src: "错词本", srcKey: "mistakes" });
						continue;
					}
				}
				fail("读音题未能在数据集里定位到对应词");
				continue;
			}
			// (c) Fill-in: complete the sentence, then find the longest dataset word containing the answer.
			const filled = prompt.replace(/[（(][　\s]*[）)]/, answer);
			if (filled !== prompt) {
				const hitKey = surfaces.find((s) => s.length >= 2 && s.includes(answer) && filled.includes(s));
				if (hitKey) {
					const e = index.get(hitKey)!;
					if (e.zh) {
						push({ w: hitKey, r: e.r, zh: e.zh, en: e.en || undefined, tier: 4, src: "错词本", srcKey: "mistakes" });
						continue;
					}
				}
				const hit = indexGet(answer);
				if (hit?.zh && answer.length >= 2) {
					push({ w: answer, r: hit.r, zh: hit.zh, tier: 4, src: "错词本", srcKey: "mistakes" });
					continue;
				}
				fail("填空题未能还原出词条");
				continue;
			}
			// (d) Kanji-writing question: the prompt is all kana, the answer IS the word.
			if (answer.length >= 2 && !isKana(answer)) {
				const hit = indexGet(answer);
				if (hit?.zh) {
					push({ w: answer, r: hit.r, zh: hit.zh, en: hit.en || undefined, tier: 4, src: "错词本", srcKey: "mistakes" });
					continue;
				}
			}
			fail("题型无法归类，未能还原词条");
			continue;
		}

		fail(`未知条目类型 ${m.type}`);
	}
}

function banfanWords() {
	const tsv = readFileSync(join(INPUTS, "banfan-words.tsv"), "utf8");
	for (const line of tsv.split("\n")) {
		if (!line.trim() || line.startsWith("#")) continue;
		const fields = line.split("\t");
		if (fields.length < 5) continue;
		const [, , w, r, zh] = fields;
		if (!w?.trim()) continue;
		push({ w: w.trim(), r: (r ?? "").trim(), zh: (zh ?? "").trim(), tier: 4, src: "番番词书", srcKey: "banfan" });
	}
}

function n2Vocab() {
	const data = readJson<{ weeks: { days: { sections?: { type: string; items: Record<string, unknown>[] }[] }[] }[] }>(
		join(ROOT, "public", "data", "n2vocab.90123e4b43.json"),
	);
	for (const week of data.weeks ?? []) {
		for (const day of week.days ?? []) {
			for (const section of day.sections ?? []) {
				if (section.type !== "words") continue;
				for (const item of section.items ?? []) {
					const jp = String(item.jp ?? "").trim();
					if (!jp) continue;
					const reading = rubyToReading(item.jp_r as string);
					push({
						w: jp,
						r: reading === jp && !isKana(jp) ? "" : reading,
						zh: String(item.cn ?? ""),
						en: typeof item.en === "string" ? item.en : undefined,
						tier: 5,
						src: "N2词汇",
						srcKey: "n2vocab",
					});
				}
			}
		}
	}
}

function n2Kanji() {
	const data = readJson<{ weeks: { days: { kanji: Record<string, unknown>[] }[] }[] }>(
		join(ROOT, "public", "data", "n2kanji.29f929e8a8.json"),
	);
	for (const week of data.weeks ?? []) {
		for (const day of week.days ?? []) {
			for (const entry of day.kanji ?? []) {
				const char = String(entry.char ?? "").trim();
				if (!char) continue;
				const words = (entry.words as Record<string, unknown>[]) ?? [];
				const zh = words
					.slice(0, 3)
					.map((w) => `${String(w.jp ?? "")}：${String(w.cn ?? "")}`)
					.join("；");
				push({
					w: char,
					r: ((entry.readings as string[]) ?? []).join("・"),
					zh,
					en: typeof words[0]?.en === "string" ? (words[0].en as string) : undefined,
					ex: typeof words[0]?.jp === "string" ? (words[0].jp as string) : undefined,
					exZh: typeof words[0]?.cn === "string" ? (words[0].cn as string) : undefined,
					tier: 5,
					src: "N2汉字",
					srcKey: "n2kanji",
				});
			}
		}
	}
}

// ---------- merge & emit ----------

buildIndex();
topicWords("frontend.json", "前端专题", "frontend");
topicWords("job-interview.json", "面试专题", "interview");
itlMistakeWords();
classroomWords();
favourites();
mistakesBook();
banfanWords();
n2Vocab();
n2Kanji();

type FinalWord = RawWord & { id: string; tier: number; src: string; ord: number };
const byKey = new Map<string, { word: FinalWord; srcKey: string }>();
let mergedTotal = 0;
for (const c of candidates) {
	const key = normKey(c.w);
	const existing = byKey.get(key);
	if (!existing) {
		byKey.set(key, {
			word: { id: wordId(c.w, c.r), w: c.w, r: c.r, zh: c.zh, en: c.en, ex: c.ex, exZh: c.exZh, tier: c.tier, src: c.src, ord: c.ord },
			srcKey: c.srcKey,
		});
		bump(c.srcKey, "added");
		continue;
	}
	mergedTotal += 1;
	bump(c.srcKey, "merged");
	const w = existing.word;
	if (!w.r && c.r) w.r = c.r;
	if (!w.zh && c.zh) w.zh = c.zh;
	if (!w.en && c.en) w.en = c.en;
	if (!w.ex && c.ex) w.ex = c.ex;
	if (!w.exZh && c.exZh) w.exZh = c.exZh;
	if (!w.src.split("・").includes(c.src)) w.src = `${w.src}・${c.src}`;
	// Refresh the id when the reading was filled in by the loser (id = hash of word+reading).
	w.id = wordId(w.w, w.r);
}

const words = [...byKey.values()]
	.map((e) => e.word)
	.sort((a, b) => a.tier - b.tier || a.ord - b.ord || a.id.localeCompare(b.id));

const payload = {
	version: 1,
	generatedAt: new Date().toISOString(),
	quota: 50,
	counts: { ...counts, total: words.length, mergedTotal, pending: pending.length },
	words,
};
writeFileSync(join(ROOT, "public", "data", "vocab-queue.json"), `${JSON.stringify(payload, null, 1)}\n`);

const pendingLines = [
	"# 单词队列 · 待确认清单",
	"",
	`生成于 ${payload.generatedAt}（scripts/build-vocab-queue.mts）。`,
	"",
	"以下条目未能规范化入队：没有可靠释义来源、文本残缺到无法还原、或本身不是单词条目。",
	"没有一条被默默丢弃，也没有一条被硬编释义。确认后可人工补进词表或直接删除。",
	"",
];
for (const source of ["错词本", "收藏", "课堂复习"]) {
	const rows = pending.filter((p) => p.source === source);
	if (!rows.length) continue;
	pendingLines.push(`## ${source}（${rows.length} 条）`, "");
	for (const p of rows) pendingLines.push(`- \`${p.ref}\` ${p.excerpt} —— ${p.reason}`);
	pendingLines.push("");
}
writeFileSync(join(ROOT, "docs", "vocab-queue-pending.md"), pendingLines.join("\n"));

console.log(JSON.stringify(payload.counts, null, 1));
console.log(`total words: ${words.length}, pending: ${pending.length}`);
