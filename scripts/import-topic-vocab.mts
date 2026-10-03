/**
 * 把词表导入为专题词汇 JSON（public/data/topics/<slug>.json），并更新 index.json。
 *
 *   node --experimental-strip-types scripts/import-topic-vocab.mts --topic <slug> [options] <file> [<file> ...]
 *
 * 输入文件（可以多个，按顺序合并；后面文件里的同一个词只补充 / 覆盖它给出的列，可用来放 overrides）：
 *   .docx  Google Docs「下载 → Microsoft Word」，或 Drive 连接器下载的文件。每个标题（Heading）下的表格是一组，标题作为 subtopic。
 *   .md    Google Docs「下载 → Markdown」，或 Drive 连接器 read_file_content 读出的文本。## 标题同样作为 subtopic。
 *   .tsv / .csv  Google Sheets 导出等；第一行表头，可带 subtopic 列。
 * 表头可以是英文字段名（jp, kana, zh, example_jp, example_zh, subtopic, level, note, en, example_kana, example_ruby, id）
 * 或常见中文表头（日语 / 假名读音 / 中文意思 / 例句（日语） / 例句（中文） / 主题 / 备注 …）。每张表的表头行会自动跳过。
 * 例句或 example_ruby 列里可以写「株式[かぶしき]を買[か]う」，会转成注音。
 *
 * 选项：
 *   --mode replace|merge   replace（默认）：结果只含导入的词；merge：保留 JSON 里已有、但这次没导入的词
 *   --title-zh / --title-ja / --title-en / --description-zh   新建专题时必填 title-zh、title-ja
 *   --id-prefix <p>        新卡片 id 前缀（默认取 slug 第一段），形如 inv-001；已有的词沿用旧 id，复习进度不丢
 *   --subtopic <名>        没有分组标题也没有 subtopic 列时使用
 *   --expect <n>           导入后卡片总数必须等于 n
 *   --expect-group "名=n"  某个 subtopic 的卡片数必须等于 n（可重复）
 *   --dry-run              只打印结果，不写文件
 */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";

import {
	indexEntryFor,
	mergeTopicCards,
	sectionsToDrafts,
	detectSections,
	validateTopicFile,
	validateTopicIndex,
	TOPIC_SLUG,
	type TableSection,
	type TopicFile,
	type TopicIndex,
	type ImportedRow,
} from "../app/study/topic-vocab.ts";

const DIR = join(process.cwd(), "public/data/topics");

function decodeXml(value: string) {
	return value
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
		.replace(/&quot;/g, '"')
		.replace(/&apos;/g, "'")
		.replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
		.replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
		.replace(/&amp;/g, "&");
}

function paragraphText(xml: string) {
	return [...xml.matchAll(/<w:t(?:\s[^>]*)?>([^<]*)<\/w:t>|<w:tab\/>|<w:br\/>/g)]
		.map((m) => (m[1] !== undefined ? decodeXml(m[1]) : " "))
		.join("");
}

/** .docx → 按标题分组的表格。 */
export function docxSections(file: string): TableSection[] {
	const xml = execFileSync("unzip", ["-p", file, "word/document.xml"], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
	const sections: TableSection[] = [];
	let heading: string | null = null;
	for (const m of xml.matchAll(/<w:tbl>[\s\S]*?<\/w:tbl>|<w:p[ >][\s\S]*?<\/w:p>/g)) {
		const block = m[0];
		if (block.startsWith("<w:tbl>")) {
			const rows = [...block.matchAll(/<w:tr[ >][\s\S]*?<\/w:tr>/g)].map((tr) =>
				[...tr[0].matchAll(/<w:tc>[\s\S]*?<\/w:tc>/g)].map((tc) =>
					[...tc[0].matchAll(/<w:p[ >][\s\S]*?<\/w:p>/g)].map((p) => paragraphText(p[0])).join("\n").trim(),
				),
			);
			sections.push({ heading, rows: rows.filter((r) => r.some((c) => c)) });
		} else if (/<w:pStyle w:val="(?:Heading|Title)/.test(block)) {
			const t = paragraphText(block).trim();
			if (t) heading = t;
		}
	}
	return sections;
}

function readSections(file: string): TableSection[] {
	if (file.toLowerCase().endsWith(".docx")) return docxSections(file);
	return detectSections(readFileSync(file, "utf8"), basename(file));
}

function parseArgs(argv: string[]) {
	const opts: Record<string, string | string[] | boolean> = { mode: "replace" };
	const files: string[] = [];
	const groups: string[] = [];
	for (let i = 0; i < argv.length; i++) {
		const a = argv[i];
		if (a === "--dry-run") opts.dryRun = true;
		else if (a === "--expect-group") groups.push(argv[++i]);
		else if (a.startsWith("--")) opts[a.slice(2)] = argv[++i];
		else files.push(a);
	}
	opts.groups = groups;
	return { opts, files };
}

function main() {
	const { opts, files } = parseArgs(process.argv.slice(2));
	const slug = String(opts.topic || "");
	if (!TOPIC_SLUG.test(slug)) throw new Error("--topic <kebab-case-slug> is required");
	if (!files.length) throw new Error("give at least one input file (.docx / .md / .tsv / .csv)");
	const mode = opts.mode === "merge" ? "merge" : "replace";
	const path = join(DIR, `${slug}.json`);
	const existing: TopicFile | null = existsSync(path) ? JSON.parse(readFileSync(path, "utf8")) : null;
	if (!existing && (!opts["title-zh"] || !opts["title-ja"])) throw new Error("new topic: --title-zh and --title-ja are required");

	const drafts: ImportedRow[] = [];
	for (const file of files) {
		const result = sectionsToDrafts(readSections(file));
		if (result.unknownHeaders.length) console.warn(`! ${file}: ignored columns ${result.unknownHeaders.join(", ")}`);
		console.log(`· ${basename(file)}: ${result.drafts.length} rows${result.groups.length > 1 ? " — " + result.groups.map((g) => `${g.heading ?? "?"} ${g.count}`).join(", ") : ""}`);
		drafts.push(...result.drafts);
	}
	const { cards, added, updated, removed } = mergeTopicCards(existing?.cards || [], drafts, {
		mode,
		idPrefix: String(opts["id-prefix"] || slug.split("-")[0]),
		defaultSubtopic: typeof opts.subtopic === "string" ? opts.subtopic : undefined,
	});

	// 子主题：按卡片首次出现的顺序；沿用已有的 ja/en 标签。
	const known = new Map((existing?.subtopics || []).map((s) => [s.zh, s]));
	const order: string[] = [];
	for (const c of cards) if (c.subtopic && !order.includes(c.subtopic)) order.push(c.subtopic);
	if (mode === "merge") for (const s of existing?.subtopics || []) if (!order.includes(s.zh)) order.push(s.zh);
	const subtopics = order.map((zh) => known.get(zh) || { zh });
	const fresh = order.filter((zh) => !known.has(zh));
	if (fresh.length) console.warn(`! new subtopics (add ja/en labels in ${slug}.json if you like): ${fresh.join(", ")}`);

	const topic: TopicFile = {
		version: 1,
		slug,
		title_zh: String(opts["title-zh"] || existing?.title_zh),
		title_ja: String(opts["title-ja"] || existing?.title_ja),
		...(opts["title-en"] || existing?.title_en ? { title_en: String(opts["title-en"] || existing?.title_en) } : {}),
		...(opts["description-zh"] || existing?.description_zh ? { description_zh: String(opts["description-zh"] || existing?.description_zh) } : {}),
		...(existing?.description_en ? { description_en: existing.description_en } : {}),
		subtopics,
		cards,
	};

	const errors = validateTopicFile(topic, slug);
	if (opts.expect && cards.length !== Number(opts.expect)) errors.push(`expected ${opts.expect} cards, got ${cards.length}`);
	for (const spec of opts.groups as string[]) {
		const at = spec.lastIndexOf("=");
		const name = spec.slice(0, at);
		const want = Number(spec.slice(at + 1));
		const got = cards.filter((c) => c.subtopic === name).length;
		if (got !== want) errors.push(`expected ${want} cards in "${name}", got ${got}`);
	}
	console.log(`${slug}: ${cards.length} cards (added ${added}, updated ${updated}, removed ${removed})`);
	for (const s of subtopics) console.log(`  ${s.zh}: ${cards.filter((c) => c.subtopic === s.zh).length}`);
	if (errors.length) {
		console.error(errors.map((e) => `✗ ${e}`).join("\n"));
		process.exit(1);
	}
	if (opts.dryRun) return;

	writeFileSync(path, JSON.stringify(topic, null, "\t") + "\n");
	const indexPath = join(DIR, "index.json");
	const index: TopicIndex = existsSync(indexPath) ? JSON.parse(readFileSync(indexPath, "utf8")) : { version: 1, topics: [] };
	const entry = indexEntryFor(topic);
	const at = index.topics.findIndex((t) => t.slug === slug);
	if (at >= 0) index.topics[at] = entry;
	else index.topics.push(entry);
	const indexErrors = validateTopicIndex(index);
	if (indexErrors.length) throw new Error(indexErrors.join("\n"));
	writeFileSync(indexPath, JSON.stringify(index, null, "\t") + "\n");
	console.log(`✓ wrote ${path} and index.json`);
}

main();
