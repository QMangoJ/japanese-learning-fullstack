import { expect, test, type Page } from "@playwright/test";

async function waitForStudy(page: Page) {
	await page.goto("/study");
	await expect(page.locator("#topbar")).toBeVisible();
	await expect(page.locator(".week-card, h2.page, .empty").first()).toBeVisible();
	await expect(page.locator(".week-card").first()).toBeVisible({ timeout: 20_000 });
}

async function topbarBox(page: Page) {
	return page.locator("#topbar").evaluate((el) => {
		const rect = el.getBoundingClientRect();
		const style = getComputedStyle(el);
		return {
			top: rect.top,
			height: rect.height,
			position: style.position,
			stickyTop: style.top,
		};
	});
}

test.describe("study header", () => {
	test("sits at the top of the viewport before and after scroll", async ({ page }) => {
		await waitForStudy(page);

		const before = await topbarBox(page);
		expect(before.position).toBe("sticky");
		expect(before.top).toBeLessThan(1);

		await page.evaluate(() => window.scrollTo(0, 900));
		await page.waitForTimeout(200);

		const after = await topbarBox(page);
		expect(after.top).toBeLessThan(1);
		expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(200);
	});

	test("stays pinned on a grammar day", async ({ page }) => {
		await waitForStudy(page);
		await page.locator(".day-item").first().click();
		await expect(page.locator("h2.page").first()).toBeVisible({ timeout: 15_000 });

		await page.evaluate(() => window.scrollTo(0, 700));
		await page.waitForTimeout(200);

		const box = await topbarBox(page);
		expect(box.top).toBeLessThan(1);
		await expect(page.locator("#title")).toContainText(/週|Week|日/);
	});

	test("does not leave a trial-bar gap when not in trial mode", async ({ page }) => {
		await waitForStudy(page);
		await expect(page.locator(".trial-context")).toHaveCount(0);
		const box = await topbarBox(page);
		expect(box.top).toBeLessThan(1);
	});
});

test.describe("study navigation", () => {
	test("opens catalog, a day, vocab, and kanji", async ({ page }) => {
		await waitForStudy(page);
		await expect(page.locator("#title")).toContainText(/语法|Grammar/);

		await page.locator(".day-item").first().click();
		await expect(page.locator("h2.page").first()).toBeVisible({ timeout: 15_000 });
		await expect(page.locator(".point").first()).toBeVisible();

		const pickType = async (ty: "vocab" | "kanji") => {
			const tab = page.locator(`#typebar button[data-ty="${ty}"]`);
			const side = page.locator(`#side [data-gotype="${ty}"]`);
			if (await tab.isVisible()) await tab.click();
			else await side.click();
		};

		await pickType("vocab");
		await expect(page.locator(".week-card").first()).toBeVisible({ timeout: 15_000 });
		await expect(page.locator("#title")).toContainText(/词汇|Vocabulary/);

		await pickType("kanji");
		await expect(page.locator(".week-card").first()).toBeVisible({ timeout: 15_000 });
		await expect(page.locator("#title")).toContainText(/汉字|Kanji/);

		const after = await topbarBox(page);
		expect(after.top).toBeLessThan(1);
	});

	test("opens N3 reading and listening as regular modules", async ({ page }) => {
		await waitForStudy(page);

		const pickType = async (ty: "reading" | "listening") => {
			const tab = page.locator(`#typebar button[data-ty="${ty}"]`);
			const side = page.locator(`#side [data-gotype="${ty}"]`);
			if (await tab.isVisible()) await tab.click();
			else await side.click();
		};

		await pickType("reading");
		await expect(page.locator("#title")).toContainText(/读解|Reading/);
		await expect(page.locator(".week-card").first()).toBeVisible({ timeout: 15_000 });
		await page.locator(".day-item").first().click();
		await expect(page.locator(".rb, h2.page, .rb-point__title").first()).toBeVisible({ timeout: 15_000 });

		await pickType("listening");
		await expect(page.locator("#title")).toContainText(/听解|Listening/);
		await expect(page.locator(".week-card").first()).toBeVisible({ timeout: 15_000 });
		await page.locator(".day-item").first().click();
		await expect(page.locator(".listening-detail, .listening-player").first()).toBeVisible({ timeout: 15_000 });
	});
});
