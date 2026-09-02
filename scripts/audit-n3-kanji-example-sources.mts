import { readdir, readFile, writeFile } from "node:fs/promises";
import { extname, join, relative, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const root = resolve(import.meta.dirname, "..");
const kanji = JSON.parse(await readFile(join(root, "public/data/kanji.e43232869e.json"), "utf8"));

const stripRuby = (value: string) => value
	.replace(/\{([^|{}]+)\|[^{}]+\}/g, "$1")
	.replace(/<ruby>(.*?)<rt>.*?<\/rt><\/ruby>/g, "$1")
	.replace(/<[^>]+>/g, "")
	.replace(/[（(][^）)]*[）)]/g, "")
	.trim();

type Candidate = { jp: string; cn: string; en?: string; source: string };
const candidates: Candidate[] = [];
const seen = new Set<unknown>();

function add(jp: unknown, cn: unknown, en: unknown, source: string) {
	if (typeof jp !== "string" || typeof cn !== "string") return;
	const clean = stripRuby(jp);
	if (clean.length < 5 || !/[。？！!?]$/.test(clean) || cn.includes("**")) return;
	const cleanCn = cn.replace(/[＊*]/g, "").replace(/[（(]※\d*[）)]/g, "").trim();
	const cleanEn = typeof en === "string" ? en.replace(/[＊*]/g, "").replace(/[（(]※\d*[）)]/g, "").trim() : undefined;
	if (cleanCn.length > clean.length * 1.5 + 8) return;
	candidates.push({ jp: clean.replace(/[＊*]/g, ""), cn: cleanCn, en: cleanEn, source });
}

function walk(value: unknown, source: string) {
	if (!value || typeof value !== "object" || seen.has(value)) return;
	seen.add(value);
	if (Array.isArray(value)) {
		for (const item of value) walk(item, source);
		return;
	}
	const item = value as Record<string, unknown>;
	add(item.jp, item.cn, item.en, source);
	if (item.example && typeof item.example === "object") walk(item.example, source);
	for (const child of Object.values(item)) walk(child, source);
}

async function filesUnder(directory: string): Promise<string[]> {
	const out: string[] = [];
	for (const entry of await readdir(directory, { withFileTypes: true })) {
		const path = join(directory, entry.name);
		if (entry.isDirectory()) out.push(...await filesUnder(path));
		else out.push(path);
	}
	return out;
}

for (const file of await filesUnder(join(root, "app/data"))) {
	if (extname(file) === ".ts" && !file.endsWith("types.ts")) {
		try {
			const module = await import(pathToFileURL(file).href);
			walk(module, relative(root, file));
		} catch {
			// A source module may be browser-only; the remaining modules still provide useful candidates.
		}
	}
}
for (const file of await filesUnder(join(root, "public/data"))) {
	if (extname(file) !== ".json") continue;
	try {
		walk(JSON.parse(await readFile(file, "utf8")), relative(root, file));
	} catch {
		// Ignore non-JSON artifacts in the generated data folder.
	}
}

const words = [...new Map(kanji.weeks.flatMap((week: any) => week.days)
	.flatMap((day: any) => day.kanji || [])
	.flatMap((entry: any) => entry.words || [])
	.map((word: any) => [word.jp, word])).values()] as { jp: string }[];

const TRANSLATION_OVERRIDES: Record<string, { cn: string; en: string }> = {
	回数券: { cn: "比较回数券的总金额。", en: "Compare the total prices of the coupon books." },
	金額: { cn: "比较回数券的总金额。", en: "Compare the total prices of the coupon books." },
	比べる: { cn: "比较回数券的总金额。", en: "Compare the total prices of the coupon books." },
	教科書: { cn: "考试范围是教科书第 5 课到第 9 课。", en: "The exam covers Lessons 5 through 9 of the textbook." },
};

const matched = words.map((word) => {
	const surface = stripRuby(word.jp).replace(/[〇〜]/g, "");
	const matchesWordForm = (candidate: Candidate) => {
		if (word.jp.includes("(な)") || word.jp.includes("（な）")) {
			return new RegExp(`${surface}(?:な|に|だ|で|さ|ね|よ|、|。|！|？)`).test(candidate.jp);
		}
		if (word.jp.includes("(の)") || word.jp.includes("（の）")) return candidate.jp.includes(`${surface}の`);
		return candidate.jp.includes(surface);
	};
	const sourceRank = (candidate: Candidate) =>
		candidate.source.includes("reading-n3") ? 0
			: candidate.source.includes("listening-n3") ? 1
				: candidate.source.includes("common-jita") ? 2
					: candidate.source.includes("grammar.d15") ? 3
						: candidate.source.includes("n4grammar") ? 4 : 9;
	const options = surface.length < 2 ? [] : candidates
		.filter((candidate) => matchesWordForm(candidate) && candidate.jp.length <= 55 && candidate.en && sourceRank(candidate) < 9)
		.sort((a, b) => {
			return sourceRank(a) - sourceRank(b) || a.jp.length - b.jp.length;
		});
	return { word: word.jp, options: options.slice(0, 3) };
});

if (process.argv.includes("--write")) {
	const selected = Object.fromEntries(matched
		.filter((item) => item.options.length)
		.map((item) => {
			const option = item.options[0];
			const override = TRANSLATION_OVERRIDES[item.word];
			return [item.word, { jp: option.jp, cn: override?.cn || option.cn, en: override?.en || option.en || "", source: option.source }];
		}));
	await writeFile(
		join(root, "app/data/n3-kanji-word-source-examples.json"),
		`${JSON.stringify(selected, null, 2)}\n`,
		"utf8",
	);
	console.log(`Wrote ${Object.keys(selected).length} source-backed examples.`);
} else {

	console.log(JSON.stringify({
		words: words.length,
		candidates: candidates.length,
		matched: matched.filter((item) => item.options.length).length,
		unmatched: matched.filter((item) => !item.options.length).map((item) => item.word),
		samples: matched.filter((item) => item.options.length).slice(0, 80),
	}, null, 2));
}
