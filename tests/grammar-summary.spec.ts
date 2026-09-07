import { expect, test } from "@playwright/test";

test.describe("daily grammar summary", () => {
	test.beforeEach(async ({ page }) => {
		await page.route("**/api/me", route => route.fulfill({ json: { user: null, configured: false } }));
	});

	test("shows cross-level comparisons outside the textbook with examples and responsive columns", async ({ page }, testInfo) => {
		await page.goto("/study/day/5-4");
		const related = page.getByTestId("grammar-related");
		await expect(related.locator("article")).toHaveCount(6);
		await related.evaluate(el => el.scrollIntoView({ block: "start" }));
		await expect(related.getByText("～にわたって", { exact: true })).toBeVisible();
		await expect(related.getByText("N2 · 参考", { exact: true })).toBeVisible();
		await expect(related.getByText("请最迟在星期五提交。", { exact: true })).toBeVisible();
		await expect(related.locator("details")).toHaveCount(0);
		expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
		await page.screenshot({ path: testInfo.outputPath("related-zh.png") });
		await page.locator('[data-lang="en"]').click();
		await related.evaluate(el => el.scrollIntoView({ block: "start" }));
		await expect(related).toContainText("Please submit it by Friday.");
		await expect(related).not.toContainText("请最迟");
		expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
		await page.screenshot({ path: testInfo.outputPath("related-en.png") });
	});

	test("stays at the bottom with all content visible, reviews the right point and switches language", async ({ page }, testInfo) => {
		await page.goto("/study/day/5-2");
		const summary = page.getByTestId("grammar-summary");
		await expect(summary).toBeVisible();
		await summary.scrollIntoViewIfNeeded();
		await summary.evaluate(el => el.scrollIntoView({ block: "start" }));
		await expect(summary.locator(".grammar-summary__rows > article")).toHaveCount(4);
		expect(await page.locator(".daily-q").last().evaluate((el) => !!(el.compareDocumentPosition(document.querySelector('[data-testid="grammar-summary"]')!) & Node.DOCUMENT_POSITION_FOLLOWING))).toBe(true);
		await expect(summary.locator("details")).toHaveCount(0);
		await expect(summary.locator(".grammar-summary__example-body").first()).toBeVisible();
		await expect(summary.locator(".grammar-summary__related > article")).toHaveCount(6);
		await expect(summary.getByText("～てしまう", { exact: true })).toBeVisible();
		expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
		await summary.evaluate(el => el.scrollIntoView({ block: "start" }));
		await page.screenshot({ path: testInfo.outputPath("summary-zh.png") });
		await summary.getByRole("button", { name: "回看语法: ～かける／～かけの／～かけだ" }).click();
		await expect(page).toHaveURL(/\/study\/day\/5-2\/p2$/);
		await expect(page.locator("#pt-5-2-2")).toBeInViewport();
		await page.locator('[data-lang="en"]').click();
		await expect(summary.getByRole("heading", { name: "Grammar summary" })).toBeVisible();
		await expect(summary).not.toContainText("口语 · 很常用");
		await summary.evaluate(el => el.scrollIntoView({ block: "start" }));
		expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
		await page.screenshot({ path: testInfo.outputPath("summary-en.png") });
	});

	test("fits narrow screens in dark mode with the example translation expanded", async ({ page }, testInfo) => {
		await page.setViewportSize({ width: 320, height: 740 });
		await page.goto("/study/day/2-5");
		const summary = page.getByTestId("grammar-summary");
		await expect(summary).toBeVisible();
		await page.evaluate(() => document.documentElement.classList.replace("theme-light", "theme-dark"));
		await expect(summary.locator(".grammar-summary__example-body").first()).toBeVisible();
		await summary.evaluate(el => el.scrollIntoView({ block: "start" }));
		expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
		await page.screenshot({ path: testInfo.outputPath("summary-dark-narrow.png") });
	});

	test("has summaries across all six weeks but not on weekends or other modules", async ({ page }) => {
		for (let week = 1; week <= 6; week++) {
			await page.goto(`/study/day/${week}-6`);
			await expect(page.getByTestId("grammar-summary")).toBeVisible();
			await expect(page.locator(`#grammar-summary-${week}-6`)).toHaveText("语法总结");
		}
		await page.goto("/study/day/1-7");
		await expect(page.locator(".q").first()).toBeVisible();
		await expect(page.getByTestId("grammar-summary")).toHaveCount(0);
		await page.goto("/study/day/5-2");
		await expect(page.getByTestId("grammar-summary")).toBeVisible();
		const tab = page.locator('#typebar [data-ty="vocab"], #skillbar [data-ty="vocab"]');
		if (await tab.first().isVisible()) await tab.first().click();
		else await page.locator('#side [data-gotype="vocab"]').click();
		await expect(page.locator(".vrow, .week-card").first()).toBeVisible();
		await expect(page.getByTestId("grammar-summary")).not.toBeVisible();
	});
});
