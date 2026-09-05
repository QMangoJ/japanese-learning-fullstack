import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const jsonFiles = [
	"public/data/grammar.d15be04258.json",
	"public/data/vocab.856eb48e32.json",
	"public/data/kanji.e43232869e.json",
	"public/data/n4grammar.40e138ccdb.json",
	"public/data/n4vocab.026f711eb7.json",
	"public/data/n4kanji.655356d8e2.json",
	"public/data/n2grammar.4e6157570a.json",
	"public/data/n2vocab.4e440284d9.json",
	"public/data/n2kanji.d9739ca8d4.json",
	"public/data/common.aa13cae172.json",
	"public/data/n3-grammar-daily-explanations.json",
	"public/data/n3-grammar-explanations.json",
	"public/data/n2-grammar-daily-explanations.json",
	"public/data/n2-grammar-explanations.json",
	"public/data/n4-grammar-daily-explanations.json",
	"public/data/n4-grammar-explanations.json",
];

const errors = [];
const ruby = /<ruby>(.*?)<rt>.*?<\/rt><\/ruby>/gs;
const tags = /<[^>]+>/g;
const visible = (value) => value.replace(ruby, "$1").replace(tags, "");

function visit(node, file, path = "$") {
	if (Array.isArray(node)) {
		node.forEach((value, index) => visit(value, file, `${path}[${index}]`));
		return;
	}
	if (!node || typeof node !== "object") return;
	for (const [key, annotated] of Object.entries(node)) {
		if (key.endsWith("_r")) {
			const plain = node[key.slice(0, -2)];
			if (typeof plain === "string" && typeof annotated === "string" && visible(annotated) !== plain.replace(tags, "")) {
				errors.push(`${file}:${path}.${key}: ruby changed the visible source text`);
			}
			if (Array.isArray(plain) && Array.isArray(annotated)) {
				if (plain.length !== annotated.length) errors.push(`${file}:${path}.${key}: ruby array length differs from source`);
				for (let index = 0; index < Math.min(plain.length, annotated.length); index += 1) {
					if (typeof plain[index] === "string" && typeof annotated[index] === "string" && visible(annotated[index]) !== plain[index].replace(tags, "")) {
						errors.push(`${file}:${path}.${key}[${index}]: ruby changed the visible source text`);
					}
				}
			}
		}
		visit(annotated, file, `${path}.${key}`);
	}
}

const forbiddenText = [
	[/\*\*|__/g, "Markdown emphasis leaked into study text"],
	[/。。/g, "duplicated punctuation"],
	[/不符合本题(?:语境|句意)|代入后(?:的接续或语义)?不成立/g, "non-specific answer explanation"],
];
const forbiddenRuby = [
	[/<ruby>見<rt>けん<\/rt><\/ruby><ruby>違/g, "見違える must begin with み"],
	[/<ruby>上<rt>あが<\/rt><\/ruby>と<ruby>下/g, "物の上 must read うえ"],
	[/<ruby>乗<rt>じょう<\/rt><\/ruby>った/g, "乗った must begin with の"],
	[/<ruby>上向<rt>じょうこう<\/rt><\/ruby>/g, "上向く must read うわむく"],
	[/チケット<ruby>代<rt>か<\/rt><\/ruby>/g, "チケット代 must read だい"],
	[/<ruby>着<rt>ちゃく<\/rt><\/ruby>やす/g, "着やすい must read きやすい"],
	[/<ruby>日午後<rt>かごご<\/rt><\/ruby>/g, "日 and 午後 must not share the reading かごご"],
];

for (const file of jsonFiles) {
	const text = readFileSync(resolve(root, file), "utf8");
	const data = JSON.parse(text);
	visit(data, file);
	for (const [pattern, message] of [...forbiddenText, ...forbiddenRuby]) {
		pattern.lastIndex = 0;
		if (pattern.test(text)) errors.push(`${file}: ${message}`);
	}
}

if (errors.length) {
	console.error(`Semantic content check failed (${errors.length}):`);
	for (const error of errors.slice(0, 100)) console.error(`- ${error}`);
	process.exit(1);
}

console.log(`Semantic content check passed (${jsonFiles.length} structured datasets).`);
