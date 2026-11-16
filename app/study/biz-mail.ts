/**
 * 「商务邮件背诵」模块：真实的日本公司商务邮件，逐句注音 + 翻译 + 敬语拆解，可遮住原文默背。
 *
 * 数据放在 public/data/biz-mail/（按需 fetch，不进首屏包）：
 *   index.json   目录 { version: 1, mails: BizMailIndexEntry[] }
 *   <id>.json    一封邮件（BizMail）
 * 加新邮件：放一个 <id>.json，再在 index.json 里加一条，不用改代码。
 *
 * 路由：#/biz-mail（列表）、#/biz-mail/<id>（详情）。
 */

export type BizMailIndexEntry = {
	id: string;
	title_zh: string;
	title_ja?: string;
	from?: string;
	kind_zh?: string;
	date?: string;
	scene_zh?: string;
	sentenceCount: number;
};

export type BizMailIndex = { version: 1; mails: BizMailIndexEntry[] };

export type BizMailSentence = {
	/** 原文段落序号（0 起）：同段的句子在「全文」里接在一起。 */
	para: number;
	/** 原文（纯文本）。 */
	jp: string;
	/** 注音标记：{漢字|よみ}，去掉标记后必须与 jp 完全一致。 */
	ruby?: string;
	zh: string;
	/** 逐句敬语 / 词语拆解，每条一行；行内【尊】【谦】【丁】会渲染成标签。 */
	notes?: string[];
	/** notes 是后来补充的（不是原始学习笔记）。 */
	notesAdded?: boolean;
};

export type BizMailVocab = { w: string; r: string; zh: string; added?: boolean };

export type BizMail = {
	version: 1;
	id: string;
	title_zh: string;
	title_ja?: string;
	from?: string;
	kind_zh?: string;
	date?: string;
	scene_zh?: string;
	intro_zh?: string;
	legend_zh?: string;
	credit_zh?: string;
	sentences: BizMailSentence[];
	vocab?: BizMailVocab[];
	patterns?: { p: string; zh: string }[];
	examples?: { scene: string; jp: string }[];
	why?: { q_zh: string; paragraphs: string[] };
};

export type KeigoTag = "尊" | "谦" | "丁";
export type NotePart = { text: string } | { tag: KeigoTag } | { bold: string };

/** 把一行笔记切成 文本 / 【尊】【谦】【丁】标签 / **粗体** 片段。 */
export function splitNote(line: string): NotePart[] {
	const parts: NotePart[] = [];
	const re = /【(尊|谦|丁)】|\*\*([^*]+)\*\*/g;
	let last = 0;
	let m: RegExpExecArray | null;
	while ((m = re.exec(line)) !== null) {
		if (m.index > last) parts.push({ text: line.slice(last, m.index) });
		if (m[1]) parts.push({ tag: m[1] as KeigoTag });
		else parts.push({ bold: m[2] });
		last = m.index + m[0].length;
	}
	if (last < line.length) parts.push({ text: line.slice(last) });
	return parts;
}

/** 去掉 {漢字|よみ} 注音标记，得到纯文本。 */
export function stripRuby(markup: string): string {
	return markup.replace(/\{([^{}|]+)\|[^{}]+\}/g, "$1");
}

/** "#/biz-mail" → {}；"#/biz-mail/<id>" → { id }；其他 → null。 */
export function parseBizMailRoute(key: string): { id?: string } | null {
	if (key === "#/biz-mail") return {};
	const m = key.match(/^#\/biz-mail\/([a-z0-9][a-z0-9-]*)$/);
	return m ? { id: m[1] } : null;
}

export function isBizMailIndex(v: unknown): v is BizMailIndex {
	if (typeof v !== "object" || v === null) return false;
	const idx = v as BizMailIndex;
	return Array.isArray(idx.mails) && idx.mails.every((x) => x && typeof x.id === "string" && typeof x.title_zh === "string");
}

export function isBizMail(v: unknown): v is BizMail {
	if (typeof v !== "object" || v === null) return false;
	const a = v as BizMail;
	return (
		typeof a.id === "string" &&
		Array.isArray(a.sentences) &&
		a.sentences.every((s) => s && typeof s.jp === "string" && typeof s.zh === "string" && typeof s.para === "number")
	);
}
