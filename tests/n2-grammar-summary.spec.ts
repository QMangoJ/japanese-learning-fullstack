import { expect, test } from "@playwright/test";

test.describe("N2 daily grammar summaries", () => {
	test.beforeEach(async ({ page }) => {
		await page.route("**/api/me", route => route.fulfill({ json: { user: null, configured: false } }));
		await page.goto("/study");
		const desktop = page.locator("#side .side-seg button", { hasText: /^N2$/ });
		if (await desktop.isVisible()) await desktop.click();
		else {
			await page.locator("#lvChip").click();
			await page.locator(".sheet-item", { hasText: "N2" }).click();
		}
		await expect(page.locator(".week-card").first()).toBeVisible();
	});
	test("renders the compact summary, keeps correct N2 review links and translates to English", async ({ page }, info) => {
		await page.goto("/study/day/2-5");
		const summary = page.getByTestId("grammar-summary");
		await expect(summary).toHaveAttribute("data-level", "N2");
		await expect(summary.locator(".grammar-summary__rows article")).toHaveCount(4);
		await expect(summary.locator("details, a[href], .grammar-summary__sources")).toHaveCount(0);
		await expect(summary.locator(".grammar-summary__meaning")).toHaveCount(6);
		await summary.evaluate(el => el.scrollIntoView({ block: "start" }));
		await page.screenshot({ path: info.outputPath("n2-summary-zh.png") });
		expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
		await summary.getByRole("button", { name: "回看语法: ～としたら／～とすれば" }).click();
		await expect(page).toHaveURL(/\/study\/day\/2-5\/p1$/);
		await expect(page.locator("#pt-2-5-1")).toBeInViewport();
		await page.locator('[data-lang="en"]').click();
		await expect(summary).toContainText("If that were true, it would be like a dream.");
		await expect(summary).not.toContainText("Even if I go, I can only stay an hour.");
		await expect(summary).not.toContainText("意思：");
		await summary.evaluate(el => el.scrollIntoView({ block: "start" }));
		await page.screenshot({ path: info.outputPath("n2-summary-en.png") });
	});
	test("fits 320px dark screens and excludes weekends and vocab", async ({ page }, info) => {
		await page.setViewportSize({ width: 320, height: 740 });
		await page.goto("/study/day/5-1");
		const summary = page.getByTestId("grammar-summary");
		await expect(summary).toBeVisible();
		await page.evaluate(() => document.documentElement.classList.replace("theme-light", "theme-dark"));
		await summary.evaluate(el => el.scrollIntoView({ block: "start" }));
		expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
		await page.screenshot({ path: info.outputPath("n2-summary-dark-320.png") });
		await page.goto("/study/day/8-7");
		await expect(page.locator(".q").first()).toBeVisible();
		await expect(page.getByTestId("grammar-summary")).toHaveCount(0);
		await page.goto("/study/day/8-6");
		await expect(page.getByTestId("grammar-summary")).toHaveAttribute("data-level", "N2");
		await page.locator('#typebar [data-ty="vocab"], #skillbar [data-ty="vocab"]').filter({ visible: true }).first().click();
		await expect(page.getByTestId("grammar-summary")).not.toBeVisible();
	});
	test("covers all eight weeks and survives a reload without switching to N3", async ({ page }) => {
		for (let week = 1; week <= 8; week++) {
			await page.goto(`/study/day/${week}-6`);
			await expect(page.locator(`#grammar-summary-n2-${week}-6`)).toHaveText("语法总结");
		}
		await page.reload();
		await expect(page.getByTestId("grammar-summary")).toHaveAttribute("data-level", "N2");
	});
});
