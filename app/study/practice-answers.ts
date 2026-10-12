// Parse the book's per-day answer key string (e.g. "Ⅰ：①b ②a　Ⅱ：⑦2") into per-question answers.
const CIRCLED = "①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳㉑㉒㉓㉔㉕㉖㉗㉘㉙㉚";

function cleanToken(v: string): string {
	let s = v.trim();
	for (let i = 0; i < 3; i++) {
		s = s
			.replace(/[\s\u3000／/]*(?:[ⅠⅡⅢⅣⅤⅥ]|もんだい\s*\d+|問題\s*\d+|左|右)?\s*[：:]?\s*$/u, "")
			.replace(/[\s\u3000／/]+$/u, "")
			.trim();
	}
	return s;
}

function baseOf(n: unknown): string {
	return String(n).split("-")[0];
}

/** Returns a map from item.n (as string) to answer text from the book key. */
export function parsePracticeAnswers(answers: string | undefined | null, sections: any[]): Map<string, string> {
	const out = new Map<string, string>();
	if (!answers) return out;
	const tokens: string[] = [];
	let cur: string | null = null;
	for (const ch of String(answers)) {
		if (CIRCLED.includes(ch)) {
			if (cur !== null) tokens.push(cleanToken(cur));
			cur = "";
		} else if (cur !== null) cur += ch;
	}
	if (cur !== null) tokens.push(cleanToken(cur));
	const groups: { base: string; items: any[] }[] = [];
	for (const sec of sections || []) {
		for (const it of sec.items || []) {
			const b = baseOf(it.n);
			const last = groups[groups.length - 1];
			if (last && last.base === b) last.items.push(it);
			else groups.push({ base: b, items: [it] });
		}
	}
	if (tokens.length !== groups.length) return out;
	groups.forEach((g, i) => {
		const tok = tokens[i];
		if (!tok) return;
		if (g.items.length === 1 && !String(g.items[0].n).includes("-")) {
			out.set(String(g.items[0].n), tok);
			return;
		}
		// sub-questions "7-1","7-2": token like "1d 適宜 2k 宣伝" or "1j 2f"
		const parts = tok.split(/(?:^|\s+)(?=\d[a-z]?\b|\d[a-z])/u).filter(Boolean);
		const bySub = new Map<string, string>();
		for (const p of parts) {
			const m = p.match(/^(\d+)\s*(.*)$/u);
			if (m) bySub.set(m[1], m[2].trim());
		}
		for (const it of g.items) {
			const sub = String(it.n).split("-")[1];
			const v = sub ? bySub.get(sub) : undefined;
			if (v) out.set(String(it.n), v);
			else if (!sub) out.set(String(it.n), tok);
		}
	});
	return out;
}

/** Expand a raw key like "b" or "3" into "b. おんぶ" / "3. 流し" using the item's options. */
export function describePracticeAnswer(raw: string, item: any, box?: string[]): string {
	const r = raw.trim();
	const bm = r.match(/^([a-z])(?:\s+(.*))?$/u);
	if (bm && box && box.length) {
		const hit = box.find((x) => String(x).trim().startsWith(`${bm[1]}.`));
		if (hit) return String(hit).replace(/<[^>]+>/g, "").trim();
	}
	const opts: string[] | undefined = item?.opts || item?.options;
	if (opts && /^\d+$/.test(r)) {
		const o = opts[+r - 1];
		return o ? `${r}. ${String(o).replace(/<[^>]+>/g, "")}` : r;
	}
	if (/^[a-d]$/.test(r)) {
		const choices = item?.choices;
		const idx = r.charCodeAt(0) - 97;
		if (choices && choices[idx]?.jp) return `${r}. ${choices[idx].jp}${choices[idx].reading ? `（${choices[idx].reading}）` : ""}`;
		const q = String(item?.q || "");
		const m = q.match(new RegExp(`${r}\\.\\s*([^\\s\\u3000）)]+)`, "u"));
		if (m) return `${r}. ${m[1]}`;
	}
	return r;
}

/** The other option(s) of an a/b choice, for the "why not" line. */
export function otherChoices(raw: string, item: any): string[] {
	const r = raw.trim();
	if (!/^[a-d]$/.test(r)) return [];
	const q = String(item?.q || "");
	const res: string[] = [];
	for (const m of q.matchAll(/([a-d])\.\s*([^\s\u3000）)]+)/gu)) if (m[1] !== r) res.push(`${m[1]}. ${m[2]}`);
	return res;
}

export type DailyChoiceQuiz = {
	opts: string[];
	opts_r?: string[];
	/** 1-based option indexes that count as correct. */
	accept: number[];
};

type ChoiceItem = {
	q?: string;
	q_r?: string;
	opts?: string[];
	opts_r?: string[];
	options?: string[];
	options_r?: string[];
};

const MARK_RE = /^[○〇◯×✕✖✗]/u;
const BOTH_RE = /^(?:ab|ba|a[・·･／/]b|b[・·･／/]a)$/u;

function stripChoiceLabel(value: string): string {
	const text = String(value ?? "");
	const match = text.match(/^\s*[0-9０-９]{1,2}[.．、]?\s+(\S[\s\S]*)$/u);
	return (match ? match[1] : text).trim();
}

function inlinePairs(text: string | undefined): { a: string; b: string }[] {
	if (!text) return [];
	const re = /（\s*a[.．]\s*([^）]*?)\s+b[.．]\s*([^）]*?)\s*）/gu;
	return [...text.matchAll(re)]
		.map((match) => ({ a: match[1].trim(), b: match[2].trim() }))
		.filter((pair) => pair.a && pair.b);
}

function abAccept(answer: string): number[] | null {
	const clean = answer.replace(/\s+/gu, "");
	if (clean === "a") return [1];
	if (clean === "b") return [2];
	if (BOTH_RE.test(clean)) return [1, 2];
	return null;
}

function numberAccept(answer: string, count: number): number[] | null {
	const clean = answer.replace(/\s+/gu, "");
	if (!/^[1-9]$/.test(clean)) return null;
	const n = Number(clean);
	return n >= 1 && n <= count ? [n] : null;
}

/**
 * Clickable options for one grammar れんしゅう choice.
 * Order items, multi-blank items, and items with no matched key stay null
 * so the page can keep the static option row.
 */
export function dailyChoiceQuiz(
	sectionType: string | undefined,
	item: ChoiceItem,
	answer: string | null | undefined,
	infoType?: string,
): DailyChoiceQuiz | null {
	if (sectionType !== "choice" || infoType === "order") return null;
	const raw = String(answer ?? "").trim();
	if (!raw) return null;
	if (/→/u.test(raw) && !MARK_RE.test(raw)) return null;

	const source = item.opts?.length ? item.opts : item.options;
	if (source?.length) {
		const opts = source.map(stripChoiceLabel);
		const richSource = item.opts?.length ? item.opts_r : item.options_r;
		const opts_r = richSource?.length === source.length ? richSource.map(stripChoiceLabel) : undefined;
		const numbered = numberAccept(raw, opts.length);
		const byText = opts.findIndex((opt) => opt === raw || stripChoiceLabel(opt) === raw);
		const accept = numbered || (byText >= 0 ? [byText + 1] : null);
		if (!accept) return null;
		return { opts, ...(opts_r ? { opts_r } : {}), accept };
	}

	const pairs = inlinePairs(item.q);
	if (pairs.length > 1) return null;
	if (pairs.length === 1) {
		const accept = abAccept(raw);
		if (!accept) return null;
		const rich = inlinePairs(item.q_r);
		const opts_r = rich.length === 1 ? [rich[0].a, rich[0].b] : undefined;
		return { opts: [pairs[0].a, pairs[0].b], ...(opts_r ? { opts_r } : {}), accept };
	}

	const mark = raw.match(MARK_RE);
	if (!mark) return null;
	const wrong = "×✕✖✗".includes(mark[0]);
	return { opts: ["〇", "×"], accept: [wrong ? 2 : 1] };
}
