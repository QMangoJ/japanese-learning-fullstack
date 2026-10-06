import { describe, expect, it } from "vitest";

import summary from "../../app/data/common-verb-summary.json";
import { conjugateVerb, type VerbGroup } from "../../app/study/verb-forms";

const groups = summary.examples.groups;

function groupOf(name: string): VerbGroup {
	if (name === "一类") return "I";
	if (name === "二类") return "II";
	return "III";
}

describe("verb conjugation", () => {
	it("keeps the classroom exceptions", () => {
		const iku = conjugateVerb("行く", "いく", "I");
		expect(iku.te).toBe("行って");
		expect(iku.ta).toBe("行った");
		expect(iku.nai).toBe("行かない");
		expect(iku.imperative).toBe("行け");
		expect(iku.passive).toBe("行かれる");
		expect(iku.causative).toBe("行かせる");
		expect(conjugateVerb("いく", "いく", "I").te).toBe("いって");

		const kau = conjugateVerb("買う", "かう", "I");
		expect(kau.nai).toBe("買わない");
		expect(kau.nai).not.toBe("買あない");
		expect(kau.ba).toBe("買えば");
		expect(kau.imperative).toBe("買え");
		expect(kau.passive).toBe("買われる");
		expect(kau.causative).toBe("買わせる");

		const hanasu = conjugateVerb("話す", "はなす", "I");
		expect(hanasu.nai).toBe("話さない");
		expect(hanasu.passive).toBe("話される");
		expect(hanasu.causative).toBe("話させる");
		expect(hanasu.causative).not.toContain("ささせ");

		const oyogu = conjugateVerb("泳ぐ", "およぐ", "I");
		expect(oyogu.te).toBe("泳いで");
		expect(oyogu.ta).toBe("泳いだ");
		expect(oyogu.nai).toBe("泳がない");
		expect(oyogu.causative).toBe("泳がせる");

		expect(conjugateVerb("待つ", "まつ", "I").ta).toBe("待った");
		expect(conjugateVerb("遊ぶ", "あそぶ", "I").ta).toBe("遊んだ");
		expect(conjugateVerb("申し込む", "もうしこむ", "I")).toMatchObject({
			nai: "申し込まない",
			ta: "申し込んだ",
			ba: "申し込めば",
			imperative: "申し込め",
			passive: "申し込まれる",
			causative: "申し込ませる",
		});

		const kaeru = conjugateVerb("帰る", "かえる", "I");
		expect(kaeru.nai).toBe("帰らない");
		expect(kaeru.te).toBe("帰って");
		expect(kaeru.ba).toBe("帰れば");
		expect(kaeru.potential).toBe("帰れる");
		expect(kaeru.imperative).toBe("帰れ");

		const shinu = conjugateVerb("しぬ", "しぬ", "I");
		expect(shinu).toMatchObject({
			masu: "しにます",
			nai: "しなない",
			te: "しんで",
			ta: "しんだ",
			ba: "しねば",
			imperative: "しね",
			passive: "しなれる",
			causative: "しなせる",
		});
	});

	it("separates group II and the two group III verbs", () => {
		const taberu = conjugateVerb("食べる", "たべる", "II");
		expect(taberu.nai).toBe("食べない");
		expect(taberu.ba).toBe("食べれば");
		expect(taberu.imperative).toBe("食べろ");
		expect(taberu.potential).toBe("食べられる");
		expect(taberu.passive).toBe(taberu.potential);
		expect(taberu.causative).toBe("食べさせる");

		const suru = conjugateVerb("する", "する", "III");
		expect(suru.potential).toBe("できる");
		expect(suru.passive).toBe("される");
		expect(suru.causative).toBe("させる");
		expect(suru.imperative).toBe("しろ");
		expect(suru.nai).toBe("しない");
		expect(suru.potential).not.toBe(suru.passive);

		const kuru = conjugateVerb("来る", "くる", "III");
		expect(kuru.volitional).toBe("来よう");
		expect(kuru.nai).toBe("こない");
		expect(kuru.ta).toBe("きた");
		expect(kuru.ba).toBe("くれば");
		expect(kuru.imperative).toBe("こい");
		expect(kuru.potential).toBe("こられる");
		expect(kuru.passive).toBe("こられる");
		expect(kuru.causative).toBe("こさせる");

		expect(conjugateVerb("発表する", "はっぴょうする", "III")).toMatchObject({
			masu: "発表します",
			nai: "発表しない",
			potential: "発表できる",
			passive: "発表される",
			causative: "発表させる",
			imperative: "発表しろ",
		});
		expect(conjugateVerb("連れて来る", "つれてくる", "III")).toMatchObject({
			nai: "連れてこない",
			ta: "連れてきた",
			ba: "連れてくれば",
			volitional: "連れてこよう",
			imperative: "連れてこい",
			passive: "連れてこられる",
			causative: "連れてこさせる",
		});
	});

	it("matches the classroom example columns", () => {
		for (const group of groups) {
			const kind = groupOf(group.name_cn);
			for (const row of group.rows) {
				const forms = conjugateVerb(row[0], row[1], kind);
				const kana = conjugateVerb(row[1], row[1], kind);
				if (kind === "III") {
					expect(forms.masu).toBe(row[2]);
					expect(forms.te).toBe(row[3]);
					expect(forms.potential).toBe(row[4]);
					expect(forms.volitional).toBe(row[5]);
				} else {
					expect(kana.masu).toBe(row[2]);
					expect(kana.te).toBe(row[3]);
					expect(kana.potential).toBe(row[4]);
					expect(row[5].endsWith(kana.volitional.slice(-2))).toBe(true);
				}
				expect(forms.nai.length).toBeGreaterThan(0);
				expect(forms.ta.length).toBeGreaterThan(0);
			}
		}
	});
});
