/**
 * 「英语听力」模块。
 *
 * 数据在 public/data/en-listening/，按 IT 听力的目录 + 单篇 JSON 懒加载，
 * 不打进 /study 首包。句子是英文原句、中文意思、生词 {w, zh}，
 * 有用的说法用 note，不用日语 grammarPoints。
 *
 * 音频只嵌公开 YouTube 片段（start/end），不生成、不托管 TTS。
 *
 * 路由：#/en-listening 与 #/en-listening/<id>
 */

export type EnListeningVocab = {
	w: string;
	zh: string;
};

export type EnListeningSentence = {
	speaker?: string;
	en: string;
	zh: string;
	vocab?: EnListeningVocab[];
	/** 这一句里值得带走的说法或句型，短注。 */
	note?: string;
};

export type EnListeningIndexEntry = {
	id: string;
	/** 来源视频原标题（oEmbed），不翻译。 */
	title_zh: string;
	title_en: string;
	videoTitle: string;
	/** 列表副标题：这段在练什么。 */
	textbookTitle_zh: string;
	series_zh: string;
	source: string;
	channelUrl?: string;
	youtube: string;
	videoId: string;
	/** 嵌入片段，秒。end 不含在播放里（YouTube end 参数）。 */
	startSec: number;
	endSec: number;
	/** 片段长度，等于 endSec - startSec。 */
	durationSec: number;
	sentenceCount: number;
};

export type EnListeningArticle = EnListeningIndexEntry & {
	note_zh?: string;
	sentences: EnListeningSentence[];
};

export type EnListeningOfficialLink = {
	label_zh: string;
	url: string;
	note_zh: string;
};

export type EnListeningPlanDay = {
	/** YYYY-MM-DD，东京练习窗口 2026-11-11 .. 2026-11-30。 */
	date: string;
	id: string;
	/** new = 第一遍；review = 再听一遍。 */
	pass: "new" | "review";
};

export type EnListeningIndex = {
	version: 1;
	articles: EnListeningIndexEntry[];
	official: EnListeningOfficialLink[];
	plan: EnListeningPlanDay[];
};

const ID_RE = /^[a-z0-9][a-z0-9-]*$/;

/** "#/en-listening" → {}；"#/en-listening/<id>" → { id }；其他 → null。 */
export function parseEnListeningRoute(key: string): { id?: string } | null {
	if (key === "#/en-listening") return {};
	const m = key.match(/^#\/en-listening\/([a-z0-9][a-z0-9-]*)$/);
	if (m) return { id: m[1] };
	return null;
}

export function youtubeEmbedSrc(videoId: string, startSec: number, endSec: number): string {
	const q = new URLSearchParams({
		start: String(startSec),
		end: String(endSec),
		rel: "0",
	});
	return `https://www.youtube.com/embed/${encodeURIComponent(videoId)}?${q}`;
}

export function isEnListeningIndex(v: unknown): v is EnListeningIndex {
	if (typeof v !== "object" || v === null) return false;
	const idx = v as EnListeningIndex;
	return (
		idx.version === 1 &&
		Array.isArray(idx.articles) &&
		idx.articles.every((a) => a && typeof a.id === "string" && typeof a.videoId === "string" && typeof a.youtube === "string") &&
		Array.isArray(idx.official) &&
		Array.isArray(idx.plan)
	);
}

export function isEnListeningArticle(v: unknown): v is EnListeningArticle {
	if (typeof v !== "object" || v === null) return false;
	const a = v as EnListeningArticle;
	return typeof a.id === "string" && Array.isArray(a.sentences) && a.sentences.every((s) => s && typeof s.en === "string" && typeof s.zh === "string");
}

/** 数据自检。空数组表示通过。测试和构建前脚本都可以用。 */
export function validateEnListening(index: EnListeningIndex, articles: EnListeningArticle[]): string[] {
	const errors: string[] = [];
	const byId = new Map(articles.map((a) => [a.id, a]));
	if (index.articles.length < 8 || index.articles.length > 12) {
		errors.push(`expected about 10 articles, got ${index.articles.length}`);
	}
	const ids = new Set<string>();
	for (const entry of index.articles) {
		if (!ID_RE.test(entry.id)) errors.push(`${entry.id}: bad id`);
		if (ids.has(entry.id)) errors.push(`${entry.id}: duplicate`);
		ids.add(entry.id);
		const clip = entry.endSec - entry.startSec;
		if (!(entry.startSec >= 0 && entry.endSec > entry.startSec)) errors.push(`${entry.id}: bad range`);
		if (clip < 180 || clip > 360) errors.push(`${entry.id}: clip ${clip}s is outside 3–6 min`);
		if (entry.durationSec !== clip) errors.push(`${entry.id}: durationSec ${entry.durationSec} != ${clip}`);
		if (!entry.youtube.includes(entry.videoId)) errors.push(`${entry.id}: youtube url missing video id`);
		if (!entry.videoTitle || entry.title_zh !== entry.videoTitle || entry.title_en !== entry.videoTitle) {
			errors.push(`${entry.id}: title should be the original video title`);
		}
		const article = byId.get(entry.id);
		if (!article) {
			errors.push(`${entry.id}: missing file`);
			continue;
		}
		if (article.sentences.length !== entry.sentenceCount) {
			errors.push(`${entry.id}: sentenceCount ${entry.sentenceCount} != ${article.sentences.length}`);
		}
		article.sentences.forEach((s, i) => {
			if (!s.en.trim() || !s.zh.trim()) errors.push(`${entry.id}#${i + 1}: empty en/zh`);
			for (const v of s.vocab ?? []) {
				if (!v.w.trim() || !v.zh.trim()) errors.push(`${entry.id}#${i + 1}: bad vocab`);
			}
		});
	}
	if (byId.size !== index.articles.length) errors.push("article files and index length differ");
	if (index.official.length < 2) errors.push("official TOEIC links missing");
	for (const link of index.official) {
		if (!/^https:\/\/(www\.)?(iibc-global\.org|ets\.org)\//.test(link.url)) {
			errors.push(`official link not on iibc-global.org or ets.org: ${link.url}`);
		}
	}
	const dates: string[] = [];
	const start = Date.parse("2026-11-11T00:00:00Z");
	for (let i = 0; i < 20; i++) {
		const d = new Date(start + i * 86400000);
		dates.push(d.toISOString().slice(0, 10));
	}
	if (index.plan.length !== 20) errors.push(`plan should cover 20 days, got ${index.plan.length}`);
	index.plan.forEach((day, i) => {
		if (day.date !== dates[i]) errors.push(`plan[${i}] date ${day.date} != ${dates[i]}`);
		if (!ids.has(day.id)) errors.push(`plan ${day.date} unknown id ${day.id}`);
		if (day.pass !== "new" && day.pass !== "review") errors.push(`plan ${day.date} bad pass`);
	});
	const news = index.plan.filter((d) => d.pass === "new").map((d) => d.id);
	if (new Set(news).size !== index.articles.length) errors.push("each segment should be new once in the plan");
	return errors;
}
