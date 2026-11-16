import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { isBizMail, isBizMailIndex, parseBizMailRoute, splitNote, stripRuby, type BizMail, type BizMailIndex } from "../../app/study/biz-mail";
import { BizMailPage } from "../../app/study/BizMailPage";

const dir = join(process.cwd(), "public/data/biz-mail");
const index = JSON.parse(readFileSync(join(dir, "index.json"), "utf8")) as BizMailIndex;
const mails: BizMail[] = index.mails.map((entry) => JSON.parse(readFileSync(join(dir, `${entry.id}.json`), "utf8")) as BizMail);

const VELOCE_ORIGINAL = `JIDENGHAO様
平素よりカフェ・ベローチェ 神楽坂店をご愛顧いただき、誠にありがとうございます。
また、店の雰囲気やコーヒーにつきまして温かいお言葉を頂戴いたしましたこと、心より感謝申し上げます。
この度は、店内で使用しておりますトレーの滑りやすさにつきまして、他のお客様のご様子にも心を配られた温かい視点からのご提案をお寄せいただき、誠にありがとうございます。具体的な商品の例までお調べのうえご教示くださいましたお心遣いに、深く御礼申し上げます。
頂戴いたしましたご意見および滑り止めマット導入のご提案につきましては、関連部署へ共有のうえ、安全性や衛生面、運用面も含め、今後の店舗運営および備品改善に向けた貴重なご意見として検討させていただきます。
日頃からお店を大切に見守ってくださるお客様のお声が、私どもにとって何よりの励みでございます。今後とも、快適で安心してお過ごしいただける空間づくりに努めてまいります。
この度は貴重なお声をお寄せいただき、誠にありがとうございました。
（C-United株式会社 総務部 お客様問い合わせ窓口）`;

function fullText(mail: BizMail) {
	const paras: number[] = [];
	for (const s of mail.sentences) if (!paras.includes(s.para)) paras.push(s.para);
	return paras.map((p) => mail.sentences.filter((s) => s.para === p).map((s) => s.jp).join("")).join("\n");
}

describe("biz mail data", () => {
	it("parses list and detail routes only", () => {
		expect(parseBizMailRoute("#/biz-mail")).toEqual({});
		expect(parseBizMailRoute("#/biz-mail/veloce-tray-reply")).toEqual({ id: "veloce-tray-reply" });
		expect(parseBizMailRoute("#/biz-mail/")).toBeNull();
		expect(parseBizMailRoute("#/keigo")).toBeNull();
	});

	it("has one valid file per index entry and nothing stray", () => {
		expect(isBizMailIndex(index)).toBe(true);
		const files = readdirSync(dir).filter((name) => name.endsWith(".json") && name !== "index.json").sort();
		expect(files).toEqual(index.mails.map((m) => `${m.id}.json`).sort());
		for (const [i, mail] of mails.entries()) {
			expect(isBizMail(mail)).toBe(true);
			expect(mail.id).toBe(index.mails[i].id);
			expect(index.mails[i].sentenceCount).toBe(mail.sentences.length);
		}
	});

	it("keeps furigana markup identical to the original text and gives readings to every vocab word", () => {
		for (const mail of mails) {
			for (const s of mail.sentences) {
				if (s.ruby) expect(stripRuby(s.ruby)).toBe(s.jp);
				expect(s.zh.trim()).not.toBe("");
			}
			for (const v of mail.vocab ?? []) {
				expect(v.r).toMatch(/^[ぁ-ゖー]+$/);
				expect(v.zh.trim()).not.toBe("");
			}
		}
	});

	it("reproduces the Veloce reply word for word", () => {
		const veloce = mails.find((m) => m.id === "veloce-tray-reply")!;
		expect(fullText(veloce)).toBe(VELOCE_ORIGINAL);
		const tags = veloce.sentences.flatMap((s) => s.notes ?? []).join("");
		expect(tags).toContain("【尊】");
		expect(tags).toContain("【谦】");
		expect(tags).toContain("【丁】");
		expect(veloce.why?.paragraphs.join("")).toContain("关键看这个动作是谁做的");
	});

	it("splits keigo tags and bold markers out of a note line", () => {
		expect(splitNote("ご教示くださる【尊】：承蒙您告知")).toEqual([{ text: "ご教示くださる" }, { tag: "尊" }, { text: "：承蒙您告知" }]);
		expect(splitNote("「ご教示**くださいました**」")).toEqual([{ text: "「ご教示" }, { bold: "くださいました" }, { text: "」" }]);
	});
});

describe("biz mail page", () => {
	afterEach(() => vi.unstubAllGlobals());

	it("shows the letter, then hides the Japanese in recite mode until a sentence is tapped", async () => {
		const veloce = mails.find((m) => m.id === "veloce-tray-reply")!;
		vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, json: async () => veloce })));
		render(<BizMailPage mailId="veloce-tray-reply" />);
		await screen.findByText(veloce.title_zh);
		expect(screen.getAllByTestId("bm-sentence")).toHaveLength(veloce.sentences.length);
		expect(screen.getByText(veloce.why!.q_zh)).toBeTruthy();
		expect(document.querySelectorAll(".bm-tag--ken").length).toBeGreaterThan(0);

		fireEvent.click(screen.getByRole("button", { name: /背诵模式/ }));
		await waitFor(() => expect(screen.getAllByText("点击显示原文")).toHaveLength(veloce.sentences.length));
		expect(document.querySelector(".bm-full")).toBeNull();
		fireEvent.click(screen.getAllByText("点击显示原文")[1]);
		expect(screen.getAllByText("点击显示原文")).toHaveLength(veloce.sentences.length - 1);
		expect(screen.getByText(`已看 1 / ${veloce.sentences.length} 句`)).toBeTruthy();
	});
});
