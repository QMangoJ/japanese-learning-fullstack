import { readdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const sibling = resolve(root, "..", "日语学习");

const BY_JP = new Map([
	["1カップ＝200cc", "1 cup = 200 cc"],
	["1リットル＝1000cc", "1 liter = 1,000 cc"],
	["100グラム〔g〕", "100 grams"],
	["一昨日（=おととい）", "the day before yesterday"],
	["昨日（=きのう）", "yesterday"],
	["今日", "today"],
	["明日（=あした）", "tomorrow"],
	["あさって", "the day after tomorrow"],
	["昨年", "last year"],
	["一昨年", "the year before last"],
	["A「お国はどちらですか。」＝お生まれはどちらですか。＝どちらのご出身ですか。 B「イギリス出身です。」", 'A: “Where are you from?” B: “I\'m from the UK.”'],
	["A「お住まいはどちらですか。」 B「この近くです。」", 'A: “Where do you live?” B: “Nearby.”'],
	["A「先日は、ありがとうございました。」 B「とんでもないです。こちらこそ。」", 'A: “Thank you for the other day.” B: “Not at all — thank you.”'],
	["A「どうぞお上がりください。」 B「おじゃまします。」", 'A: “Please come in.” B: “Excuse me for intruding.”'],
	["「こちらでおかけになってお待ちください。」", "Please have a seat here and wait."],
	["A「お茶をお持ちします。」 B「どうぞおかまいなく。」", 'A: “I\'ll bring some tea.” B: “Please don\'t go to any trouble.”'],
	["A「どうぞお召し上がりください。」 B「では、遠慮なくいただきます。」", 'A: “Please help yourself.” B: “Then I\'ll take you up on that.”'],
	["A「ご無沙汰しています。お元気でいらっしゃいますか。」 B「ええ、おかげさまで。」", 'A: “It\'s been a long time. How have you been?” B: “Very well, thank you.”'],
	["A「田中さんのご主人、亡くなったそうですよ。」 B「そうですか。お気の毒に。」", 'A: “I hear Tanaka\'s husband passed away.” B: “Oh — I\'m so sorry.”'],
	["（手紙などで）「お目にかかるのを楽しみにしています。」", "(In a letter) I look forward to seeing you."],
	["社員「お先に失礼します。」 部長「ご苦労さま。／お疲れさま。」", 'Staff: “I\'ll be leaving now.” Manager: “Thanks for your work.”'],
	["部長「お先に。」 社員「お疲れさまでした。」", 'Manager: “I\'m off.” Staff: “Thank you for your hard work.”'],
	["患者「お世話になりました。」 看護師「お大事に。」", 'Patient: “Thank you for taking care of me.” Nurse: “Please take care.”'],
	["日本へ行く", "go to Japan → come to Japan"],
	["おべんとうをもって行く", "take a boxed lunch (there) → bring a boxed lunch (here)"],
	["日本へかぞくをつれて行く", "take one's family to Japan → bring one's family to Japan"],
	["駅へともだちをむかえに行く", "go to the station to meet a friend → come to the station to meet a friend"],
	["そうじする（掃除する）", "clean → vacuum cleaner"],
	["せんたくする（洗濯する）", "do laundry → washing machine"],
	["食事中", "in the middle of a meal"],
	["勉強中", "in the middle of studying"],
	["仕事中", "in the middle of work"],
	["使用中", "in use"],
	["りんごにしよう！あ、やっぱりケーキにしょう！", "Let's have an apple! Oh, let's have cake after all!"],
	["りんごにしよう！あ、やっぱりケーキにしよう！", "Let's have an apple! Oh, let's have cake after all!"],
	["たいへん！", "Oh no!"],
	["いけない！", "Uh-oh! / That's bad!"],
	["どうしよう！", "What should I do?"],
	["あ、あった！", "Ah, I found it!"],
	["よかったね！", "That's great!"],
	["（友だちに）悪いけどおくれるよ。", "(To a friend) Sorry, I'll be late."],
	["（先生に）すみませんが、おくれます。", "(To a teacher) I'm sorry, but I'll be late."],
	["重い→重さ", "heavy → weight"],
	["大きい→大きさ", "big → size"],
	["高い→高さ", "high / expensive → height"],
	["広い→広さ", "wide → width / area"],
	["長い→長さ", "long → length"],
	["太い→太さ", "thick → thickness"],
	["まる（丸）", "circle → round"],
	["しかく（四角）", "square → square-shaped"],
	["さんかく（三角）", "triangle → triangular"],
	["ごめんください。", "Hello? / Anyone home?"],
	["けっこうです。", "No thank you. / I'm fine."],
	["おきのどくに（お気の毒に）。", "I'm sorry to hear that."],
	["よろこんで（喜んで）。", "I'd be happy to."],
	["ひさしぶり。", "Long time no see."],
	["おかげさまで（お陰さまで）。", "Thanks to you. / Fortunately."],
	["おだいじに（お大事に）。", "Please take care of yourself."],
	["おいでになる", "honorific of 行く / いる / 来る (go / be / come)"],
	["ごらんになる（ご覧になる）", "honorific of 見る (look / see)"],
	["おっしゃる", "honorific of 言う (say)"],
	["めしあがる（召し上がる）", "honorific of 食べる (eat)"],
	["おまちする（お待ちする）", "humble of 待つ (wait)"],
	["まいる（参る）", "humble of 行く / 来る (go / come)"],
	["もうす（申す）", "humble of 言う (say)"],
	["うかがう（伺う）", "humble of 聞く / 訪問する (ask / visit)"],
	["はいけんする（拝見する）", "humble of 見る (look)"],
	["いただく（頂く）", "humble of もらう / 食べる (receive / eat)"],
]);

function patchItems(node) {
	let n = 0;
	if (!node || typeof node !== "object") return 0;
	if (Array.isArray(node)) {
		for (const item of node) n += patchItems(item);
		return n;
	}
	if (typeof node.jp === "string" && !node.en && BY_JP.has(node.jp)) {
		node.en = BY_JP.get(node.jp);
		n += 1;
	}
	for (const value of Object.values(node)) n += patchItems(value);
	return n;
}

async function patchFile(path) {
	const data = JSON.parse(await readFile(path, "utf8"));
	const changed = patchItems(data);
	if (changed) {
		const pretty = path.includes("src-data");
		await writeFile(path, JSON.stringify(data, null, pretty ? 2 : 0) + "\n");
	}
	return changed;
}

const files = [
	resolve(root, "public/data/vocab.856eb48e32.json"),
	resolve(root, "public/data/n4vocab.026f711eb7.json"),
	resolve(sibling, "public/data/vocab.856eb48e32.json"),
	resolve(sibling, "public/data/n4vocab.026f711eb7.json"),
];

let total = 0;
for (const file of files) {
	try {
		const n = await patchFile(file);
		total += n;
		console.log(`${n} ${file}`);
	} catch (error) {
		console.log(`skip ${file}: ${error.message}`);
	}
}

for (const dir of [resolve(sibling, "src-data/n3-vocab"), resolve(sibling, "src-data/n4-vocab")]) {
	try {
		for (const name of await readdir(dir)) {
			if (!name.endsWith(".json")) continue;
			const n = await patchFile(resolve(dir, name));
			if (n) console.log(`${n} ${dir}/${name}`);
			total += n;
		}
	} catch (error) {
		console.log(`skip ${dir}: ${error.message}`);
	}
}

console.log(`Patched ${total} vocab English fields.`);
