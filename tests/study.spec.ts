import { expect, test, type Page } from "@playwright/test";

async function waitForStudy(page: Page) {
	await page.goto("/study");
	await expect(page.locator("#topbar")).toBeVisible();
	await expect(page.locator(".week-card, h2.page, .empty").first()).toBeVisible();
	await expect(page.locator(".week-card").first()).toBeVisible({ timeout: 20_000 });
}

async function pickType(page: Page, ty: "grammar" | "vocab" | "kanji" | "reading" | "listening") {
	const tab = page.locator(`#typebar button[data-ty="${ty}"], #skillbar button[data-ty="${ty}"]`);
	const side = page.locator(`#side [data-gotype="${ty}"]`);
	if (await tab.first().isVisible()) await tab.first().click();
	else await side.click();
}

async function openStudyNav(page: Page, nav: "search" | "mistakes" | "favs" | "cards" | "ref") {
	const sideLabels: Record<typeof nav, RegExp> = {
		search: /搜索|Search/,
		mistakes: /错题|Mistakes/,
		favs: /收藏|Favorites/,
		cards: /记忆卡|Flashcards/,
		ref: /接续表|Connections/,
	};
	const side = page.locator("#side .side-item", { hasText: sideLabels[nav] });
	if (await side.isVisible()) {
		await side.click();
		return;
	}
	if (nav === "cards" || nav === "ref") {
		await page.locator('.bottom button[data-nav="common"]').click();
		await page.getByRole("button", { name: sideLabels[nav] }).click();
		return;
	}
	await page.locator(`.bottom button[data-nav="${nav}"]`).click();
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
	test("shows English usage and examples on N3 grammar days", async ({ page }) => {
		await waitForStudy(page);
		await page.locator(".day-item").first().click();
		await expect(page.locator(".point").first()).toBeVisible({ timeout: 15_000 });
		const english = page.locator(".point .usage .en").first();
		await expect(english).toBeVisible();
		await expect(english).toHaveText(/[A-Za-z]{4,}/);
		await expect(page.locator(".ex .en").first()).toBeVisible();
	});

	test("opens catalog, a day, vocab, and kanji", async ({ page }) => {
		await waitForStudy(page);
		await expect(page.locator("#title")).toContainText(/语法|Grammar/);

		await page.locator(".day-item").first().click();
		await expect(page.locator("h2.page").first()).toBeVisible({ timeout: 15_000 });
		await expect(page.locator(".point").first()).toBeVisible();

		await pickType(page, "vocab");
		await expect(page.locator(".week-card").first()).toBeVisible({ timeout: 15_000 });
		await expect(page.locator("#title")).toContainText(/词汇|Vocabulary/);

		await pickType(page, "kanji");
		await expect(page.locator(".week-card").first()).toBeVisible({ timeout: 15_000 });
		await expect(page.locator("#title")).toContainText(/汉字|Kanji/);

		const after = await topbarBox(page);
		expect(after.top).toBeLessThan(1);
	});

	test("opens N3 reading and listening as regular modules", async ({ page }) => {
		await waitForStudy(page);

		await pickType(page, "reading");
		await expect(page.locator("#title")).toContainText(/读解|Reading/);
		await expect(page.locator(".week-card").first()).toBeVisible({ timeout: 15_000 });
		await page.locator(".day-item").first().click();
		await expect(page.locator(".rb, h2.page, .rb-point__title").first()).toBeVisible({ timeout: 15_000 });

		await pickType(page, "listening");
		await expect(page.locator("#title")).toContainText(/听解|Listening/);
		await expect(page.locator(".week-card").first()).toBeVisible({ timeout: 15_000 });
		await page.locator(".day-item").first().click();
		await expect(page.locator(".listening-detail, .listening-player").first()).toBeVisible({ timeout: 15_000 });
	});
});

test.describe("study typebar", () => {
	test("splits core modules and skills into two rows", async ({ page }, testInfo) => {
		await waitForStudy(page);
		await expect(page.locator("#typebar button[data-ty='reading']")).toHaveCount(0);
		if (testInfo.project.name === "desktop-chrome") {
			await expect(page.locator("#side [data-gotype='grammar']")).toBeVisible();
			await expect(page.locator("#side [data-gotype='reading']")).toBeVisible();
			return;
		}
		await expect(page.locator("#typebar button[data-ty='grammar']")).toBeVisible();
		await expect(page.locator("#typebar button[data-ty='vocab']")).toBeVisible();
		await expect(page.locator("#typebar button[data-ty='kanji']")).toBeVisible();
		await expect(page.locator("#skillbar button[data-ty='reading']")).toBeVisible();
		await expect(page.locator("#skillbar button[data-ty='listening']")).toBeVisible();

		const typebarBottom = await page.locator("#typebar").evaluate((el) => el.getBoundingClientRect().bottom);
		const skillbarTop = await page.locator("#skillbar").evaluate((el) => el.getBoundingClientRect().top);
		expect(skillbarTop).toBeGreaterThanOrEqual(typebarBottom - 1);
	});
});

test.describe("study language", () => {
	test("keeps English visible on grammar, vocab, and kanji", async ({ page }) => {
		await waitForStudy(page);
		await page.locator(".day-item").first().click();
		await expect(page.locator(".point .usage .en").first()).toBeVisible({ timeout: 15_000 });

		await pickType(page, "vocab");
		await expect(page.locator(".week-card").first()).toBeVisible({ timeout: 15_000 });
		await page.locator(".day-item").first().click();
		await expect(page.locator(".ven").first()).toBeVisible({ timeout: 15_000 });
		await expect(page.locator(".ven").first()).toHaveText(/[A-Za-z]{3,}/);

		await pickType(page, "kanji");
		await expect(page.locator(".week-card").first()).toBeVisible({ timeout: 15_000 });
		await page.locator(".day-item").first().click();
		await expect(page.locator(".krow, .ven").first()).toBeVisible({ timeout: 15_000 });
		if (await page.locator(".ven").count()) {
			await expect(page.locator(".ven").first()).toBeVisible();
		}

		await page.locator('#langbar button[data-lang="en"]').click();
		await expect(page.locator("#title")).toContainText(/Kanji|Week|Day|汉字/);
	});
});

test.describe("study interactions", () => {
	test("adds, studies, and deletes a mistake without a window bridge", async ({ page }) => {
		await waitForStudy(page);
		await openStudyNav(page, "mistakes");
		await expect(page.locator("#title")).toContainText(/错题|Mistakes|Notes/);

		const note = `e2e-mistake-${Date.now()}`;
		await page.locator("[data-mtype='q']").click();
		await page.locator("#mistakeInput").fill(note);
		await page.locator("[data-mistake-add]").click();
		const item = page.locator(".mistake-item", { hasText: note });
		await expect(item).toBeVisible();

		await page.locator("[data-mtype='word']").click();
		await expect(page.locator("[data-mtype='word']")).toHaveClass(/on/);
		await page.locator("[data-mfilter='q']").click();
		await expect(item).toBeVisible();

		await page.locator("[data-mstudy='1']").click();
		await expect(page.locator(".study-toolbar")).toBeVisible();
		await expect(page.getByText(note)).toBeVisible();
		await page.getByRole("button", { name: /返回列表/ }).click();

		await item.locator("[data-mistake-del]").click();
		await expect(page.locator(".mistake-item", { hasText: note })).toHaveCount(0);
	});

	test("searches grammar and opens a hit", async ({ page }) => {
		await waitForStudy(page);
		await openStudyNav(page, "search");
		await expect(page.locator("#q")).toBeVisible();
		await page.locator("#q").fill("ばかり");
		await expect(page.locator(".result").first()).toBeVisible({ timeout: 15_000 });
		await page.locator(".result").first().click();
		await expect(page.locator("h2.page, .point").first()).toBeVisible({ timeout: 15_000 });
	});

	test("flips a flashcard from the module tools", async ({ page }) => {
		await waitForStudy(page);
		await openStudyNav(page, "cards");
		await expect(page.locator(".fcard").first()).toBeVisible({ timeout: 15_000 });
		await page.locator(".fcard").first().click();
		await expect(page.locator(".fcard .backside, .fcard .hint").first()).toBeVisible();
	});

	test("opens the connection reference from the general sheet", async ({ page }) => {
		await waitForStudy(page);
		await openStudyNav(page, "ref");
		await expect(page.locator("#title")).toContainText(/接续|Connection/);
		await expect(page.locator(".card, table, .conn").first()).toBeVisible();
	});
});
