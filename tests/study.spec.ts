import { expect, test, type Page } from "@playwright/test";

async function dismissViteOverlay(page: Page) {
	await page.evaluate(() => document.querySelector("vite-error-overlay")?.remove());
}

async function waitForStudy(page: Page) {
	await page.goto("/study");
	await dismissViteOverlay(page);
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

	test("switches to a persisted dark theme", async ({ page }) => {
		await waitForStudy(page);
		await expect(page.locator("#themeToggle")).toBeVisible();
		await page.locator("#themeToggle").click();
		await expect(page.locator("html")).toHaveClass(/theme-dark/);
		const bg = await page.locator("body").evaluate((el) => getComputedStyle(el).backgroundColor);
		expect(bg).not.toBe("rgb(246, 247, 249)");
		await page.reload();
		await expect(page.locator("#topbar")).toBeVisible();
		await expect(page.locator("html")).toHaveClass(/theme-dark/);
		await page.locator("#themeToggle").click();
		await expect(page.locator("html")).toHaveClass(/theme-light/);
	});

	test("does not leave a trial-bar gap when not in trial mode", async ({ page }) => {
		await waitForStudy(page);
		await expect(page.locator(".trial-context")).toHaveCount(0);
		const box = await topbarBox(page);
		expect(box.top).toBeLessThan(1);
	});
});

test.describe("study navigation", () => {
	test("shows English on N4 vocab and N4 weekly-test explanations", async ({ page }, testInfo) => {
		await waitForStudy(page);
		if (testInfo.project.name === "desktop-chrome") {
			await page.locator(".side-seg button", { hasText: "N4" }).click();
		} else {
			await page.locator("#lvChip").click();
			await page.locator(".sheet-item", { hasText: "N4" }).click();
		}
		await expect(page.locator("#title")).toContainText(/N4/);
		await pickType(page, "vocab");
		if (await page.locator(".day-item").first().isVisible()) await page.locator(".day-item").first().click();
		await expect(page.locator(".ven").first()).toBeVisible({ timeout: 15_000 });

		await page.goto("/study");
		await expect(page.locator(".week-card").first()).toBeVisible({ timeout: 20_000 });
		if (testInfo.project.name === "desktop-chrome") {
			await page.locator("#side [data-gotype='grammar']").click();
		} else if (await page.locator("#typebar button[data-ty='grammar']").isVisible()) {
			await page.locator("#typebar button[data-ty='grammar']").click();
		}
		await expect(page.locator(".week-card").first()).toBeVisible({ timeout: 15_000 });
		const examDay = page.locator(".day-item", { hasText: /7日目|Day 7|实战|Test/ }).first();
		if (await examDay.isVisible()) await examDay.click();
		else await page.locator("#wk-1 .day-item").last().click();
		await expect(page.locator("h2.page").first()).toBeVisible({ timeout: 15_000 });
		await page.locator(".opt-btn").first().click();
		await expect(page.locator(".an-trans, .qz-note").first()).toBeVisible();
	});

	test("shows N4 vocab weekend explanations after answering", async ({ page }, testInfo) => {
		await waitForStudy(page);
		if (testInfo.project.name === "desktop-chrome") {
			await page.locator(".side-seg button", { hasText: "N4" }).click();
		} else {
			await page.locator("#lvChip").click();
			await page.locator(".sheet-item", { hasText: "N4" }).click();
		}
		await pickType(page, "vocab");
		await expect(page.locator(".week-card").first()).toBeVisible({ timeout: 15_000 });
		const examDay = page.locator(".day-item", { hasText: /7日目|Day 7|实战|Test/ }).first();
		if (await examDay.isVisible()) await examDay.click();
		else await page.locator(".day-item").last().click();
		await expect(page.locator(".opt-btn").first()).toBeVisible({ timeout: 15_000 });
		await page.locator(".opt-btn").first().click();
		await expect(page.locator(".an-trans").first()).toBeVisible();
		await expect(page.locator(".an-trans").first()).toContainText(/高兴|happy/i);
	});

	test("shows N3 vocab weekend explanations after answering", async ({ page }) => {
		await waitForStudy(page);
		await pickType(page, "vocab");
		await expect(page.locator(".week-card").first()).toBeVisible({ timeout: 15_000 });
		const examDay = page.locator(".day-item", { hasText: /7日目|Day 7|实战|Test/ }).first();
		if (await examDay.isVisible()) await examDay.click();
		else await page.locator(".day-item").last().click();
		await expect(page.locator(".opt-btn").first()).toBeVisible({ timeout: 15_000 });
		await page.locator(".opt-btn").first().click();
		await expect(page.locator(".an-trans").first()).toBeVisible();
		await expect(page.locator(".an-trans").first()).toContainText(/煮饭|cooked rice/i);
	});

	test("shows English usage and examples on N3 grammar days", async ({ page }) => {
		await waitForStudy(page);
		await page.locator(".day-item").first().click();
		await expect(page.locator(".point").first()).toBeVisible({ timeout: 15_000 });
		const english = page.locator(".point .usage .en").first();
		await expect(english).toBeVisible();
		await expect(english).toHaveText(/[A-Za-z]{4,}/);
		await expect(page.locator(".ex .en").first()).toBeVisible();
	});

	test("shows sentence translations on N2 vocab daily exercises", async ({ page }) => {
		await waitForStudy(page);
		const sideN2 = page.locator("#side .side-seg button", { hasText: /^N2$/ });
		if (await sideN2.isVisible()) await sideN2.click();
		else {
			await page.locator("#lvChip").click();
			await page.getByRole("button", { name: /^N2/ }).click();
		}
		await pickType(page, "vocab");
		await expect(page.locator(".week-card").first()).toBeVisible({ timeout: 20_000 });
		if (await page.locator(".day-item").first().isVisible()) await page.locator(".day-item").first().click();
		await expect(page.locator(".daily-q").first()).toBeVisible({ timeout: 15_000 });
		await page.getByRole("button", { name: /显示原句翻译|Show sentence translation/ }).first().click();
		await expect(page.locator(".daily-explain").first()).toContainText(/层|公寓|10/);
	});

	test("keeps scroll when toggling 注音 / 日语 / 翻译", async ({ page }) => {
		await waitForStudy(page);
		await pickType(page, "vocab");
		await page.goto("/study/day/1-1");
		await expect(page.locator(".mem-bar").first()).toBeVisible({ timeout: 15_000 });

		await page.evaluate(() => window.scrollTo(0, 900));
		const before = await page.evaluate(() => window.scrollY);
		expect(before).toBeGreaterThan(200);

		for (const label of [/注音|Readings/, /日语|Japanese/, /翻译|Meaning/]) {
			await page.locator(".mem-bar").getByRole("button", { name: label }).click();
			const after = await page.evaluate(() => window.scrollY);
			expect(after).toBeGreaterThan(200);
			expect(Math.abs(after - before)).toBeLessThan(40);
		}
	});

	test("keeps scroll when answering N3 vocab weekly-test options", async ({ page }) => {
		await waitForStudy(page);
		await pickType(page, "vocab");
		await page.goto("/study/day/1-7");
		await expect(page.locator(".opt-btn").first()).toBeVisible({ timeout: 15_000 });

		const target = page.locator(".q").nth(12).locator(".opt-btn").first();
		await target.scrollIntoViewIfNeeded();
		const before = await page.evaluate(() => window.scrollY);
		expect(before).toBeGreaterThan(80);
		await target.click();
		await expect(page.locator(".qz-result").first()).toBeVisible();
		const after = await page.evaluate(() => window.scrollY);
		expect(after).toBeGreaterThan(80);
	});

	test("returns from a grammar day to the catalog in one tap", async ({ page }) => {
		await waitForStudy(page);
		await page.locator(".day-item").first().click();
		await expect(page.locator("h2.page").first()).toBeVisible({ timeout: 15_000 });
		await page.getByRole("button", { name: /目录|Catalog/ }).first().click();
		await expect(page.locator(".week-card").first()).toBeVisible({ timeout: 15_000 });
	});

	test("opens the verb-form reference without crashing", async ({ page }) => {
		await waitForStudy(page);
		await openStudyNav(page, "ref");
		await expect(page.locator("#title")).toContainText(/接续|Connection/);

		const henkei = page.locator("#side .side-item", { hasText: /变形|Verb forms/ });
		if (await henkei.isVisible()) await henkei.click();
		else {
			await page.locator('.bottom button[data-nav="common"]').click();
			await page.getByRole("button", { name: /变形|Verb forms/ }).click();
		}
		await expect(page.locator("#title")).toContainText(/変形|Verb Conjugation|变形|音便/);
		await expect(page.getByRole("heading", { name: "五段動詞のテ形・タ形（音便）" })).toBeVisible();
		await expect(page.getByText(/Oops|unexpected error/i)).toHaveCount(0);
	});

	test("opens catalog, a day, vocab, and kanji", async ({ page }) => {
		await waitForStudy(page);
		await expect(page.locator("#title")).toContainText(/语法|Grammar/);

		await page.locator(".day-item").first().click();
		await expect(page.locator("h2.page").first()).toBeVisible({ timeout: 15_000 });
		await expect(page.locator(".point").first()).toBeVisible();

		await pickType(page, "vocab");
		await expect(page.locator(".vrow, .week-card").first()).toBeVisible({ timeout: 15_000 });
		await expect(page.locator("#title")).toContainText(/词汇|Vocabulary|週|Week|日/);

		await pickType(page, "kanji");
		await expect(page.locator(".krow, .week-card").first()).toBeVisible({ timeout: 15_000 });
		await expect(page.locator("#title")).toContainText(/汉字|Kanji|週|Week|日/);

		const after = await topbarBox(page);
		expect(after.top).toBeLessThan(1);
	});

	test("opens N3 reading and listening as regular modules", async ({ page }) => {
		await waitForStudy(page);

		await pickType(page, "reading");
		await expect(page.locator("#title")).toContainText(/读解|Reading|週|Week|日/);
		if (await page.locator(".day-item").first().isVisible()) await page.locator(".day-item").first().click();
		await expect(page.locator(".rb, h2.page, .rb-point__title").first()).toBeVisible({ timeout: 15_000 });

		await pickType(page, "listening");
		await expect(page.locator("#title")).toContainText(/听解|Listening|章|Ch\.|节/);
		if (await page.locator(".day-item").first().isVisible()) await page.locator(".day-item").first().click();
		await expect(page.locator(".listening-detail, .listening-player").first()).toBeVisible({ timeout: 15_000 });
		await expect(page.locator(".listening-lesson, .listening-player").first()).toBeVisible({ timeout: 15_000 });
		await expect(page.getByRole("button", { name: /下一节|Next/ })).toBeVisible();
		await expect(page.locator("button.daynav-fab.next")).toBeVisible();
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

	test("hides the typebar on tool pages and hides skills off N3", async ({ page }, testInfo) => {
		await waitForStudy(page);
		await openStudyNav(page, "mistakes");
		await expect(page.locator("#typebar")).toHaveCount(0);

		if (testInfo.project.name === "desktop-chrome") {
			await page.locator(".side-seg button", { hasText: "N4" }).click();
			await expect(page.locator("#side [data-gotype='reading']")).toHaveCount(0);
			await expect(page.locator("#side [data-gotype='listening']")).toHaveCount(0);
			return;
		}
		await page.locator('.bottom button[data-nav="home"]').click();
		await expect(page.locator("#typebar")).toBeVisible();
		await page.locator("#lvChip").click();
		await page.locator(".sheet-item", { hasText: "N4" }).click();
		await expect(page.locator("#skillbar")).toHaveCount(0);
		await expect(page.locator("#typebar button[data-ty='reading']")).toHaveCount(0);
	});
});

test.describe("study language", () => {
	test("keeps English visible on grammar, vocab, and kanji", async ({ page }) => {
		await waitForStudy(page);
		await page.locator(".day-item").first().click();
		await expect(page.locator(".point .usage .en").first()).toBeVisible({ timeout: 15_000 });

		await pickType(page, "vocab");
		await expect(page.locator(".vrow, .week-card").first()).toBeVisible({ timeout: 15_000 });
		if (await page.locator(".day-item").first().isVisible()) await page.locator(".day-item").first().click();
		await expect(page.locator(".ven").first()).toBeVisible({ timeout: 15_000 });
		await expect(page.locator(".ven").first()).toHaveText(/[A-Za-z]{3,}/);

		await pickType(page, "kanji");
		await expect(page.locator(".krow, .week-card").first()).toBeVisible({ timeout: 15_000 });
		if (await page.locator(".day-item").first().isVisible()) await page.locator(".day-item").first().click();
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

	test("keeps the same week and day when switching modules", async ({ page }) => {
		await waitForStudy(page);
		await page.locator(".day-item").first().click();
		await expect(page.locator("h2.page").first()).toBeVisible({ timeout: 15_000 });
		const before = await page.locator("#title").textContent();
		await pickType(page, "vocab");
		await expect(page.locator(".vrow, h2.page").first()).toBeVisible({ timeout: 15_000 });
		await expect(page.locator("#title")).toHaveText(before || /週|Week|日/);
	});

	test("opens the connection reference from the general sheet", async ({ page }) => {
		await waitForStudy(page);
		await openStudyNav(page, "ref");
		await expect(page.locator("#title")).toContainText(/接续|Connection/);
		await expect(page.locator(".card, table, .conn").first()).toBeVisible();
	});
});
