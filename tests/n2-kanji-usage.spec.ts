import { expect, test } from "@playwright/test";

test("N2 kanji examples preserve N3 layout, translations and pronunciation actions", async ({ page }, info) => {
	await page.route("**/api/me", route => route.fulfill({ json: { user: null, configured: false } }));
	await page.goto("/study");
	const n2 = page.locator("#side .side-seg button", { hasText: /^N2$/ });
	if (await n2.isVisible()) await n2.click();
	else {
		await page.locator("#lvChip").click();
		await page.locator(".sheet-item", { hasText: "N2" }).click();
	}
	const desktop = page.locator('#side [data-gotype="kanji"]');
	if (await desktop.isVisible()) await desktop.click();
	else await page.locator('#typebar [data-ty="kanji"], #skillbar [data-ty="kanji"]').filter({ visible: true }).first().click();
	await expect(page.locator(".week-card").first()).toBeVisible();
	await page.goto("/study/day/1-1");
	await expect(page.locator(".kanji-card")).toBeVisible();
	const words = page.locator(".kanji-card .vrow");
	await expect(page.locator(".kanji-word-usage")).toHaveCount(await words.count());
	const target = words.filter({ has: page.locator(".vjp-text", { hasText: /静.*まる/ }) });
	await expect(target.locator(".kanji-word-example")).toContainText("拍手が静まる");
	await expect(target.locator(".kanji-word-example-translation")).toHaveText("等掌声平息后再继续。");
	let spoken = "";
	await page.exposeFunction("recordKanjiSpeech", (text: string) => { spoken = text; });
	await page.evaluate(() => Object.defineProperty(speechSynthesis, "speak", {
		configurable: true,
		value: (utterance: SpeechSynthesisUtterance) => {
			void (window as unknown as { recordKanjiSpeech: (text: string) => Promise<void> }).recordKanjiSpeech(utterance.text);
		},
	}));
	await target.locator(".kanji-word-usage .sayb").click();
	await expect.poll(() => spoken).toBe("拍手が静まるまで待ちます。");
	await target.scrollIntoViewIfNeeded();
	await page.screenshot({ path: info.outputPath("n2-kanji-zh.png") });
	expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
	await page.locator('[data-lang="en"]').click();
	await expect(target.locator(".kanji-word-example-translation")).toHaveText("I'll wait until the applause dies down.");
	await page.goto("/study/day/1-4");
	const note = words.filter({ has: page.locator(".vjp-text", { hasText: /1.*万円.*札/ }) });
	await expect(note.locator(".kanji-word-example rt")).toHaveText("いちまんえんさつ");
	await note.scrollIntoViewIfNeeded();
	await page.screenshot({ path: info.outputPath("n2-kanji-en.png") });
	for (let day = 1; day <= 6; day++) {
		await page.goto(`/study/day/2-${day}`);
		await expect(words.first()).toBeVisible();
		await expect(page.locator(".kanji-word-usage")).toHaveCount(await words.count());
		expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
	}
	await page.goto("/study/day/3-1");
	await expect(page.locator(".kanji-word-usage").first()).toBeVisible();
	await expect(page.locator(".kanji-word-usage")).toHaveCount(await words.count());
	await page.goto("/study/day/1-7");
	await expect(page.locator(".q").first()).toBeVisible();
	await expect(page.locator(".kanji-word-usage")).toHaveCount(0);
});
