import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { parseEnListeningRoute, validateEnListening, youtubeEmbedSrc, type EnListeningArticle, type EnListeningIndex } from "../../app/study/en-listening";

const dir = join(process.cwd(), "public/data/en-listening");
const index = JSON.parse(readFileSync(join(dir, "index.json"), "utf8")) as EnListeningIndex;
const articles: EnListeningArticle[] = index.articles.map((entry) =>
	JSON.parse(readFileSync(join(dir, `${entry.id}.json`), "utf8")) as EnListeningArticle,
);

describe("english listening", () => {
	it("parses the list route and an article id, and ignores other hashes", () => {
		expect(parseEnListeningRoute("#/en-listening")).toEqual({});
		expect(parseEnListeningRoute("#/en-listening/en-phone-manner")).toEqual({ id: "en-phone-manner" });
		expect(parseEnListeningRoute("#/it-listening")).toBeNull();
		expect(parseEnListeningRoute("#/en-listening/")).toBeNull();
	});

	it("builds a YouTube embed that starts and ends on the segment", () => {
		expect(youtubeEmbedSrc("abc", 12, 80)).toBe("https://www.youtube.com/embed/abc?start=12&end=80&rel=0");
	});

	it("keeps the catalog, the 20-day plan, and the official TOEIC links consistent", () => {
		expect(validateEnListening(index, articles)).toEqual([]);
	});

	it("has one file per article and no stray json", () => {
		const files = readdirSync(dir).filter((name) => name.endsWith(".json") && name !== "index.json").sort();
		expect(files).toEqual(index.articles.map((a) => `${a.id}.json`).sort());
	});

	it("does not ship audio files or a speech-synthesis hook", () => {
		const blob = JSON.stringify({ index, articles });
		expect(blob).not.toMatch(/\.mp3|\.wav|speechSynthesis|openai\.com|tts/i);
	});
});
