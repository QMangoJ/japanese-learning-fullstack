import { expect, test, type Page } from "@playwright/test";

async function dismissViteOverlay(page: Page) {
	await page.evaluate(() => document.querySelector("vite-error-overlay")?.remove());
}

async function stubGuestAccount(page: Page, configured: boolean) {
	await page.route("**/api/me", async (route) => {
		if (route.request().method() !== "GET") {
			await route.continue();
			return;
		}
		await route.fulfill({
			status: 200,
			contentType: "application/json",
			body: JSON.stringify({ user: null, configured }),
		});
	});
}

async function waitForStudy(page: Page, opts: { configured?: boolean } = {}) {
	await stubGuestAccount(page, opts.configured === true);
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

	test("can favorite an N3 grammar weekly-test question", async ({ page }) => {
		await waitForStudy(page);
		await page.goto("/study/day/1-7");
		const star = page.locator(".exam-fav-btn").first();
		await expect(star).toBeVisible({ timeout: 15_000 });
		await star.click();
		const dialog = page.locator("#loginDialog");
		if (await dialog.count()) {
			await expect(dialog).toBeVisible();
			return;
		}
		await expect(star).toHaveClass(/on/);
		await expect(star).toContainText(/已收藏|Saved/);
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

	test("keeps mistake filters aligned at desktop and mobile widths", async ({ page }, testInfo) => {
		await waitForStudy(page);
		await openStudyNav(page, "mistakes");
		await expect(page.locator(".mistake-filter-panel")).toBeVisible();

		const grids = page.locator(".mistake-filter-grid");
		await expect(grids).toHaveCount(2);
		const expectedColumns = testInfo.project.name === "mobile-chrome" ? 2 : 4;
		for (const grid of await grids.all()) {
			const columns = await grid.evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(" ").length);
			expect(columns).toBe(expectedColumns);
			await expect(grid.locator("button")).toHaveCount(4);
		}

		const widths = await page.locator(".mistake-study-entry").evaluate((entry) => ({
			entry: entry.getBoundingClientRect().width,
			button: (entry.querySelector("button") as HTMLElement).getBoundingClientRect().width,
		}));
		expect(Math.abs(widths.entry - widths.button)).toBeLessThan(1);
		expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(await page.evaluate(() => document.documentElement.clientWidth));
	});

	test("reveals all Kanji self-test answers without completing the questions", async ({ page }) => {
		await waitForStudy(page);
		const side = page.locator("#side .side-item", { hasText: /汉字自测|Kanji Self-test/ });
		if (await side.isVisible()) await side.click();
		else {
			await page.locator('.bottom button[data-nav="common"]').click();
			await page.getByRole("button", { name: /汉字自测|Kanji Self-test/ }).click();
		}

		await page.getByRole("button", { name: /10题|10 questions/ }).click();
		await page.getByRole("button", { name: /开始随机练习|Start randomized practice/ }).click();
		await page.getByRole("button", { name: /显示全部答案|Show all answers/ }).click();
		await expect(page.locator(".kanji-exam-correction.answer-key")).toHaveCount(10);
		await expect(page.getByText(/还需完成 10 题|10 remaining/)).toBeVisible();
		await expect(page.getByRole("button", { name: /隐藏全部答案|Hide all answers/ })).toBeVisible();
		expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(await page.evaluate(() => document.documentElement.clientWidth));
	});

	test("removes individual Kanji incorrect-history items", async ({ page }) => {
		await page.addInitScript(() => {
			localStorage.setItem("jp-kanji-exam-english-support-v1", "0");
			localStorage.setItem("jp-kanji-exam-history-v1", JSON.stringify([
				{
					id: "browser-attempt",
					batchId: "school-ch2",
					batchTitle: "学校汉字 · 第2章",
					mode: "mixed",
					correct: 8,
					total: 10,
					completedAt: "2026-08-30T08:00:00.000Z",
					wrongQuestions: [
						{ questionId: "wrong-1", lessonTitle: "2章-1 レジ", kind: "reading", prompt: "あの店です。", target: "店", answer: "みせ", userAnswer: "てん" },
						{ questionId: "wrong-2", lessonTitle: "2章-1 レジ", kind: "writing", prompt: "きっさてん", target: "てん", answer: "店", userAnswer: "点" },
					],
				},
			]));
		});
		await waitForStudy(page);
		const side = page.locator("#side .side-item", { hasText: /汉字自测|Kanji Self-test/ });
		if (await side.isVisible()) await side.click();
		else {
			await page.locator('.bottom button[data-nav="common"]').click();
			await page.getByRole("button", { name: /汉字自测|Kanji Self-test/ }).click();
		}

		const attempt = page.locator(".kanji-exam-history details").first();
		await attempt.locator("summary").click();
		await expect(attempt.getByText(/错题（2）|Incorrect \(2\)/)).toBeVisible();
		await expect(attempt.locator(".kanji-exam-review-meaning")).toHaveCount(2);
		await expect(attempt.locator(".kanji-exam-review-meaning").first()).toContainText("shop; store");
		await expect(attempt.locator(".kanji-exam-review-meaning").last()).toContainText("Kanji meaning");
		await expect(attempt.locator('.kanji-exam-review-meaning [lang="zh-Hans"]')).toHaveText(["店铺；商店", "店铺；商店"]);
		await expect(attempt.locator('.kanji-exam-review-meaning [lang="en"]')).toHaveText(["shop; store", "shop; store"]);
		await attempt.getByRole("button", { name: /删除错题：あの店です。|Remove incorrect item: あの店です。/ }).click();
		await expect(attempt.getByText(/错题（1）|Incorrect \(1\)/)).toBeVisible();
		await expect(attempt.locator("summary>span strong")).toHaveText("80");
		const savedAttempt = await page.evaluate(() => JSON.parse(localStorage.getItem("jp-kanji-exam-history-v1") || "[]")[0]);
		expect(savedAttempt).toMatchObject({ correct: 8, total: 10 });
		expect(savedAttempt.wrongQuestions).toHaveLength(1);
		await expect(attempt.locator(".kanji-exam-review-meaning")).toHaveCount(1);
		expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(await page.evaluate(() => document.documentElement.clientWidth));
	});

	test("shows Kanji result meanings and keeps them in recent incorrect items", async ({ page }) => {
		await page.addInitScript(() => localStorage.setItem("jp-kanji-exam-english-support-v1", "0"));
		await waitForStudy(page);
		const side = page.locator("#side .side-item", { hasText: /汉字自测|Kanji Self-test/ });
		if (await side.isVisible()) await side.click();
		else {
			await page.locator('.bottom button[data-nav="common"]').click();
			await page.getByRole("button", { name: /汉字自测|Kanji Self-test/ }).click();
		}
		await page.getByRole("button", { name: /10题|10 questions/ }).click();
		await page.getByRole("button", { name: /开始随机练习|Start randomized practice/ }).click();
		await expect(page.locator(".kanji-exam-english-support")).toHaveCount(0);
		for (const input of await page.locator(".kanji-exam-question input").all()) await input.fill("wrong");
		await page.getByRole("button", { name: /交卷并查看答案|Submit and see answers/ }).click();
		await expect(page.locator(".kanji-exam-result")).toContainText(/答对 0 题，答错 10 题|0 correct, 10 incorrect/);
		await expect(page.locator(".kanji-exam-review-meaning")).toHaveCount(10);
		await expect(page.locator(".kanji-exam-review-meaning").first()).toBeVisible();
		const meanings = await page.locator('.kanji-exam-review-meaning [lang="en"]').allTextContents();
		const chineseMeanings = await page.locator('.kanji-exam-review-meaning [lang="zh-Hans"]').allTextContents();
		expect(meanings).toHaveLength(10);
		expect(chineseMeanings).toHaveLength(10);
		expect(meanings.every((meaning) => meaning && meaning !== "Meaning not yet reviewed")).toBe(true);
		expect(chineseMeanings.every((meaning) => /\p{Script=Han}/u.test(meaning) && meaning !== "词义待补充")).toBe(true);
		expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(await page.evaluate(() => document.documentElement.clientWidth));
		await page.getByRole("button", { name: /完成并返回题库|Finish and return/ }).click();
		await page.locator(".kanji-exam-history summary").first().click();
		await expect(page.locator(".kanji-exam-history .kanji-exam-review-meaning")).toHaveCount(10);
		expect(await page.locator('.kanji-exam-history .kanji-exam-review-meaning [lang="en"]').allTextContents()).toEqual(meanings);
		expect(await page.locator('.kanji-exam-history .kanji-exam-review-meaning [lang="zh-Hans"]').allTextContents()).toEqual(chineseMeanings);
		expect(await page.evaluate(() => localStorage.getItem("jp-kanji-exam-english-support-v1"))).toBe("0");
		expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(await page.evaluate(() => document.documentElement.clientWidth));
	});

	test("opens the transitive/intransitive verb pairs", async ({ page }) => {
		await waitForStudy(page);
		const side = page.locator("#side .side-item", { hasText: /自他动词|Verb pairs/ });
		if (await side.isVisible()) await side.click();
		else {
			await page.locator('.bottom button[data-nav="common"]').click();
			await page.getByRole("button", { name: /自他动词|Verb pairs/ }).click();
		}
		await expect(page.locator("#title")).toContainText(/自动词|他动词|自動詞|Transitive/);
		await expect(page.getByText("他动词 · を").first()).toBeVisible();
		await expect(page.getByText("自动词 · が").first()).toBeVisible();
		await expect(page.locator(".jita-eg").first()).toContainText("ドアを");
		await expect(page.locator(".jita-eg").nth(1)).toContainText("ドアが");
		await expect(page.getByText("打开门。")).toBeVisible();
		await expect(page.getByText("门开着。")).toBeVisible();
		await expect(page.locator(".jita-masu").first()).toContainText("けます");
		await expect(page.locator(".jita-word ruby rt").first()).toHaveText("あ");
		const pair = page.locator(".jita-pair").first();
		const left = await pair.locator(".jita-col--ta").boundingBox();
		const right = await pair.locator(".jita-col--ji").boundingBox();
		expect(left).not.toBeNull();
		expect(right).not.toBeNull();
		expect(Math.abs(left!.y - right!.y)).toBeLessThan(1);
		expect(right!.x).toBeGreaterThan(left!.x + left!.width);
		expect(right!.x - left!.x - left!.width).toBeLessThanOrEqual(8);
		expect((await pair.boundingBox())!.height).toBeLessThan(300);
		await expect(pair.getByRole("button", { name: /朗读|Read aloud/ })).toHaveCount(2);
		expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(await page.evaluate(() => document.documentElement.clientWidth));
		await expect(page.locator(".jita-pair")).toHaveCount(50);
		const continued = page.locator(".jita-pair").filter({ has: page.locator(".jita-kana", { hasText: "（つづける）" }) });
		await continued.scrollIntoViewIfNeeded();
		await expect(continued.locator(".jita-kana").nth(1)).toHaveText("（つづく）");
		await expect(continued.locator(".jita-word ruby rt")).toHaveText(["つづ", "つづ"]);
		await expect(continued.locator(".jita-masu").nth(0)).toContainText("けます");
		await expect(continued.locator(".jita-masu").nth(1)).toContainText("きます");
		await expect(continued.getByText("我会继续学习日语。")).toBeVisible();
		await expect(continued.getByText("雨已经连续下了三天。")).toBeVisible();
		await expect(continued.getByRole("button", { name: /朗读|Read aloud/ })).toHaveCount(2);

		await page.getByRole("button", { name: "English", exact: true }).click();
		await expect(page.locator(".jita-kind").first()).toContainText("Transitive");
		await expect(page.locator(".jita-eg .cn").first()).not.toBeEmpty();
		await expect(continued.getByText("I will continue studying Japanese.")).toBeVisible();
		await expect(continued.getByText("It has been raining for three days.")).toBeVisible();
		const continuedLeft = (await continued.locator(".jita-col--ta").boundingBox())!;
		const continuedRight = (await continued.locator(".jita-col--ji").boundingBox())!;
		expect(Math.abs(continuedLeft.y - continuedRight.y)).toBeLessThan(1);
		expect(continuedRight.x).toBeGreaterThan(continuedLeft.x + continuedLeft.width);
		expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(await page.evaluate(() => document.documentElement.clientWidth));
	});

	test("opens the spoken-contraction reference", async ({ page }) => {
		await waitForStudy(page);
		const side = page.locator("#side .side-item", { hasText: /口语|Casual/ });
		if (await side.isVisible()) await side.click();
		else {
			await page.locator('.bottom button[data-nav="common"]').click();
			await page.getByRole("button", { name: /口语|Casual/ }).click();
		}
		await expect(page.locator("#title")).toContainText(/口语|Spoken|縮約|缩约/);
		await expect(page.getByText("〜ちゃった / 〜じゃった")).toBeVisible();
		await expect(page.getByRole("columnheader", { name: /口语|Spoken/ }).first()).toBeVisible();
		await expect(page.getByRole("columnheader", { name: /完整形|Full form/ }).first()).toBeVisible();
		await expect(page.getByText("食べなくちゃ")).toBeVisible();
		await expect(page.getByText("こっち来て")).toBeVisible();
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

	test("listening player seeks on chapter 1 section 5 track 14", async ({ page }) => {
		await waitForStudy(page);
		await pickType(page, "listening");
		await page.goto("/study/day/1-5");
		await dismissViteOverlay(page);
		await expect(page.locator("#topbar")).toBeVisible();
		const cue = page.locator('button[aria-label^="CD 1 · 14"]');
		await expect(cue).toBeVisible({ timeout: 15_000 });
		await cue.evaluate((button: HTMLButtonElement) => button.click());
		await expect(page.locator("audio")).toHaveAttribute("src", /CD01_14\.mp3$/);
		const seek = page.locator(".listening-seek");
		await expect(seek).toBeVisible({ timeout: 15_000 });
		const durationLabel = page.locator(".listening-player__timeline span").last();
		await expect(durationLabel).not.toHaveText("0:00", { timeout: 20_000 });
		const box = await seek.boundingBox();
		expect(box).toBeTruthy();
		await page.mouse.click(box!.x + box!.width * 0.7, box!.y + box!.height / 2);
		await expect.poll(async () => page.locator("audio").evaluate((el: HTMLAudioElement) => el.currentTime)).toBeGreaterThan(1);
		await page.locator("audio").evaluate((el: HTMLAudioElement) => {
			el.pause();
			el.currentTime = 8;
		});
		await page.getByRole("button", { name: "往前 3 秒" }).click();
		await expect.poll(async () => page.locator("audio").evaluate((el: HTMLAudioElement) => el.currentTime)).toBeCloseTo(5, 1);
	});

	test("listening player keeps its touch-safe controls inside the mobile viewport", async ({ page }) => {
		await waitForStudy(page);
		await pickType(page, "listening");
		await page.goto("/study/day/4-3");
		await dismissViteOverlay(page);
		await expect(page.locator(".listening-player")).toBeVisible({ timeout: 15_000 });

		const layout = await page.evaluate(() => {
			const viewportWidth = document.documentElement.clientWidth;
			const play = document.querySelector(".listening-player__toggle")!.getBoundingClientRect();
			const rewind = document.querySelector(".listening-player__rewind")!.getBoundingClientRect();
			const player = document.querySelector(".listening-player")!.getBoundingClientRect();
			return {
				viewportWidth,
				documentWidth: document.documentElement.scrollWidth,
				playerLeft: player.left,
				playerRight: player.right,
				controlGap: rewind.left - play.right,
				overflowing: Array.from(document.querySelectorAll<HTMLElement>("body *"))
					.map((element) => {
						const rect = element.getBoundingClientRect();
						return { tag: element.tagName, className: element.className, left: rect.left, right: rect.right, width: rect.width };
					})
					.filter((rect) => rect.left < -1 || rect.right > viewportWidth + 1 || rect.width > viewportWidth + 1)
					.slice(0, 12),
			};
		});

		expect(layout.documentWidth, JSON.stringify(layout.overflowing)).toBeLessThanOrEqual(layout.viewportWidth);
		expect(layout.playerLeft).toBeGreaterThanOrEqual(0);
		expect(layout.playerRight).toBeLessThanOrEqual(layout.viewportWidth);
		expect(layout.controlGap).toBeGreaterThanOrEqual(20);
	});

	test("places the mobile listening player above the bottom navigation", async ({ page }, testInfo) => {
		test.skip(testInfo.project.name !== "mobile-chrome", "mobile placement only");
		await waitForStudy(page);
		await pickType(page, "listening");
		await page.goto("/study/day/4-3");
		await dismissViteOverlay(page);
		await expect(page.locator(".listening-player")).toBeVisible({ timeout: 15_000 });
		await page.evaluate(() => window.scrollTo(0, 900));
		await page.waitForTimeout(250);

		const layout = await page.evaluate(() => {
			const player = document.querySelector<HTMLElement>(".listening-player")!;
			const nav = document.querySelector<HTMLElement>("nav.bottom")!;
			const dayNav = document.querySelector<HTMLElement>("button.daynav-fab.next")!;
			const readerMain = document.querySelector<HTMLElement>(".reader-main")!;
			const playerRect = player.getBoundingClientRect();
			const navRect = nav.getBoundingClientRect();
			const dayNavRect = dayNav.getBoundingClientRect();
			return {
				position: getComputedStyle(player).position,
				gapAboveBottomNav: navRect.top - playerRect.bottom,
				dayNavGap: playerRect.top - dayNavRect.bottom,
				playerBottom: playerRect.bottom,
				viewportHeight: window.innerHeight,
				readerPaddingBottom: Number.parseFloat(getComputedStyle(readerMain).paddingBottom),
			};
		});

		expect(layout.position).toBe("fixed");
		expect(layout.gapAboveBottomNav).toBeGreaterThanOrEqual(7);
		expect(layout.gapAboveBottomNav).toBeLessThanOrEqual(9);
		expect(layout.dayNavGap).toBeGreaterThanOrEqual(6);
		expect(layout.playerBottom).toBeLessThan(layout.viewportHeight);
		expect(layout.readerPaddingBottom).toBeGreaterThanOrEqual(180);
	});

	test("bottom navigation remains at the viewport edge after scrolling a long listening lesson", async ({ page }, testInfo) => {
		test.skip(testInfo.project.name !== "mobile-chrome", "mobile bottom navigation only");
		await waitForStudy(page);
		await pickType(page, "listening");
		await page.goto("/study/day/5-1");
		await dismissViteOverlay(page);
		await expect(page.locator("nav.bottom")).toBeVisible({ timeout: 15_000 });
		await page.evaluate(() => window.scrollTo(0, Math.min(1800, document.documentElement.scrollHeight)));
		await page.waitForTimeout(250);

		const position = await page.evaluate(() => {
			const nav = document.querySelector("nav.bottom")!.getBoundingClientRect();
			return {
				bottom: nav.bottom,
				viewportHeight: window.innerHeight,
				offset: Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--fixed-viewport-y")) || 0,
			};
		});

		expect(Math.abs(position.bottom - position.viewportHeight)).toBeLessThanOrEqual(1);
		expect(position.offset).toBeGreaterThanOrEqual(0);
	});

	for (const module of ["verb pairs", "grammar", "listening"] as const) {
		test(`bottom controls stay visible during reverse scroll and viewport bounce: ${module}`, async ({ page }, testInfo) => {
			test.skip(testInfo.project.name !== "mobile-chrome", "mobile fixed controls only");
			await waitForStudy(page);
			if (module === "verb pairs") {
				await page.locator('.bottom button[data-nav="common"]').click();
				await page.getByRole("button", { name: /自他动词|Verb pairs/ }).click();
				await expect(page.locator(".jita-pair").first()).toBeVisible();
			} else {
				if (module === "listening") await pickType(page, "listening");
				await page.goto(module === "listening" ? "/study/day/4-3" : "/study/day/1-1");
				await dismissViteOverlay(page);
				await expect(page.locator(module === "listening" ? ".listening-player" : ".point").first()).toBeVisible();
			}

			await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
			// iOS can report transient visualViewport offsets/height growth while
			// native bottom:0 is already following the screen edge. Do not add it twice.
			for (const metrics of [{ top: 80, extraHeight: 0 }, { top: 0, extraHeight: 48 }, { top: -40, extraHeight: 0 }, { top: 0, extraHeight: -100 }, { top: 0, extraHeight: 0 }]) {
				await page.evaluate(async ({ top, extraHeight }) => {
					window.scrollBy(0, -150);
					const viewport = window.visualViewport!;
					Object.defineProperties(viewport, {
						offsetTop: { configurable: true, value: top },
						height: { configurable: true, value: window.innerHeight + extraHeight },
					});
					viewport.dispatchEvent(new Event("resize"));
					viewport.dispatchEvent(new Event("scroll"));
					await new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
				}, metrics);
				const layout = await page.evaluate(() => {
					const nav = document.querySelector("nav.bottom")!.getBoundingClientRect();
					const player = document.querySelector(".listening-player")?.getBoundingClientRect();
					return { bottom: nav.bottom, height: window.innerHeight, playerGap: player ? nav.top - player.bottom : null };
				});
				expect(Math.abs(layout.bottom - layout.height), JSON.stringify(metrics)).toBeLessThanOrEqual(1);
				// The nav's 1px top border is included in its bounding rectangle.
				if (layout.playerGap !== null) {
					expect(layout.playerGap).toBeGreaterThanOrEqual(7);
					expect(layout.playerGap).toBeLessThanOrEqual(9);
				}
			}
			await page.evaluate(() => {
				Reflect.deleteProperty(window.visualViewport!, "offsetTop");
				Reflect.deleteProperty(window.visualViewport!, "height");
			});
			for (const size of [{ width: 390, height: 640 }, { width: 844, height: 390 }, { width: 390, height: 844 }]) {
				await page.setViewportSize(size);
				await expect.poll(() => page.locator("nav.bottom").evaluate((nav) => Math.abs(nav.getBoundingClientRect().bottom - window.innerHeight))).toBeLessThanOrEqual(1);
			}
			if (module === "verb pairs") {
				// Emulate a browser whose native fixed edge genuinely lags behind:
				// the fallback must still correct a real gap, then clear on scroll.
				await page.evaluate(() => {
					document.getElementById("fixedViewportProbe")!.style.bottom = "48px";
					document.querySelector<HTMLElement>("nav.bottom")!.style.bottom = "48px";
					window.dispatchEvent(new Event("resize"));
				});
				await expect.poll(() => page.locator("nav.bottom").evaluate((nav) => Math.abs(nav.getBoundingClientRect().bottom - window.innerHeight))).toBeLessThanOrEqual(1);
				await expect.poll(() => page.evaluate(() => document.documentElement.style.getPropertyValue("--fixed-viewport-y"))).toBe("48px");
				await page.evaluate(() => {
					document.getElementById("fixedViewportProbe")!.style.removeProperty("bottom");
					document.querySelector<HTMLElement>("nav.bottom")!.style.removeProperty("bottom");
					window.dispatchEvent(new Event("scroll"));
				});
				await expect.poll(() => page.evaluate(() => document.documentElement.style.getPropertyValue("--fixed-viewport-y"))).toBe("0px");
			}
			await page.screenshot({ path: testInfo.outputPath("stable-bottom-after-reverse-scroll.png") });
		});
	}

	test("listening keyboard controls playback and seeks without changing sections", async ({ page }) => {
		await waitForStudy(page);
		await pickType(page, "listening");
		await page.goto("/study/day/2-1");
		await dismissViteOverlay(page);
		await expect(page.locator("#title")).toContainText(/第2章 1节|Ch\. 2/);
		const audio = page.locator("audio");
		await expect(audio).toHaveAttribute("src", /CD01_19\.mp3$/);

		await page.keyboard.press("Space");
		await expect.poll(async () => audio.evaluate((el: HTMLAudioElement) => el.paused)).toBe(false);
		await page.keyboard.press("Enter");
		await expect.poll(async () => audio.evaluate((el: HTMLAudioElement) => el.paused)).toBe(true);

		await audio.evaluate((el: HTMLAudioElement) => {
			el.currentTime = 10;
		});
		await page.keyboard.press("ArrowLeft");
		await expect.poll(async () => audio.evaluate((el: HTMLAudioElement) => el.currentTime)).toBeCloseTo(7, 1);
		await page.keyboard.press("ArrowRight");
		await expect.poll(async () => audio.evaluate((el: HTMLAudioElement) => el.currentTime)).toBeCloseTo(10, 1);
		await expect(page).toHaveURL(/\/study\/day\/2-1$/);
		await page.getByRole("button", { name: /下一节|Next/ }).focus();
		await page.keyboard.press("ArrowRight");
		await expect(page).toHaveURL(/\/study\/day\/2-1$/);
		await expect(page.locator("#title")).toContainText(/第2章 1节|Ch\. 2/);
	});

	test("shows each listening answer, transcript, and translation under its own question", async ({ page }) => {
		await waitForStudy(page);
		await pickType(page, "listening");
		await page.goto("/study/day/1-5");
		await dismissViteOverlay(page);

		const questions = page.locator(".listening-lesson__q");
		await expect(questions).toHaveCount(6);
		const photoQuestion = questions.filter({ has: page.getByRole("heading", { name: "問題Ⅱ 2番", exact: true }) });
		await expect(photoQuestion.locator(".listening-question-support details")).toHaveCount(3);
		await photoQuestion.getByText(/译文|Translation/, { exact: true }).click();
		await expect(photoQuestion).toContainText(/拍张照片|take a photo/i);
		await expect(photoQuestion).not.toContainText(/30分钟|30 minutes/i);
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

	test("hides the typebar on tool pages, shows N2 listening, and hides skills off N4", async ({ page }, testInfo) => {
		await waitForStudy(page);
		await openStudyNav(page, "mistakes");
		await expect(page.locator("#typebar")).toHaveCount(0);

		if (testInfo.project.name === "desktop-chrome") {
			await page.locator(".side-seg button", { hasText: "N2" }).click();
			await expect(page.locator("#side [data-gotype='reading']")).toHaveCount(0);
			await expect(page.locator("#side [data-gotype='listening']")).toBeVisible();
			await page.locator(".side-seg button", { hasText: "N4" }).click();
			await expect(page.locator("#side [data-gotype='reading']")).toHaveCount(0);
			await expect(page.locator("#side [data-gotype='listening']")).toHaveCount(0);
			return;
		}
		await page.locator('.bottom button[data-nav="home"]').click();
		await expect(page.locator("#typebar")).toBeVisible();
		await page.locator("#lvChip").click();
		await page.locator(".sheet-item", { hasText: "N2" }).click();
		await expect(page.locator("#skillbar button[data-ty='listening']")).toBeVisible();
		await expect(page.locator("#skillbar button[data-ty='reading']")).toHaveCount(0);
		await page.locator("#lvChip").click();
		await page.locator(".sheet-item", { hasText: "N4" }).click();
		await expect(page.locator("#skillbar")).toHaveCount(0);
		await expect(page.locator("#typebar button[data-ty='reading']")).toHaveCount(0);
	});

	test("opens N2 listening as reconstructed text with answers and transcripts", async ({ page }, testInfo) => {
		await waitForStudy(page);
		if (testInfo.project.name === "desktop-chrome") {
			await page.locator(".side-seg button", { hasText: "N2" }).click();
			await page.locator("#side [data-gotype='listening']").click();
		} else {
			await page.locator("#lvChip").click();
			await page.locator(".sheet-item", { hasText: "N2" }).click();
			await pickType(page, "listening");
		}
		await expect(page.locator("#title")).toContainText(/听解|Listening|章|Ch\.|节/);
		await expect(page.locator(".week-card").first()).toBeVisible({ timeout: 20_000 });
		if (await page.locator(".day-item").first().isVisible()) await page.locator(".day-item").first().click();
		else await page.goto("/study/day/1-1");
		await dismissViteOverlay(page);
		await expect(page.locator(".listening-lesson").first()).toBeVisible({ timeout: 15_000 });
		await expect(page.locator("audio")).toHaveAttribute("src", /\/audio\/n2\/cd1\/CD01_02\.mp3$/);
		const firstQuestion = page.locator(".listening-lesson__q").first();
		await expect(firstQuestion.getByText("答案")).toBeVisible();
		await firstQuestion.getByText("答案").click();
		await expect(firstQuestion).toContainText(/マッチ/);
		await firstQuestion.getByText("听力原文").click();
		await expect(firstQuestion).toContainText(/トラック/);
		await firstQuestion.getByText("译文").click();
		await expect(firstQuestion).toContainText(/搬家的卡车/);
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

	test("study-mode hide toggles keep the Japanese and translation columns", async ({ page }) => {
		await waitForStudy(page);
		await openStudyNav(page, "mistakes");
		const note = `e2e-study-col-${Date.now()}`;
		await page.locator("[data-mtype='q']").click();
		await page.locator("#mistakeInput").fill(note);
		await page.locator("[data-mistake-add]").click();
		await page.locator("[data-mstudy='1']").click();
		await expect(page.locator(".study-row").first()).toBeVisible();

		const before = await page.locator(".study-jp, .study-cn").evaluateAll((els) =>
			els.map((el) => {
				const box = el.getBoundingClientRect();
				return { w: box.width, h: box.height, x: box.x };
			}),
		);
		expect(before).toHaveLength(2);
		expect(before[0].w).toBeGreaterThan(40);
		expect(before[1].w).toBeGreaterThan(40);

		await page.locator('[data-study-hide="cn"]').click();
		const afterCn = await page.locator(".study-jp, .study-cn").evaluateAll((els) =>
			els.map((el) => {
				const box = el.getBoundingClientRect();
				const style = getComputedStyle(el);
				return { w: box.width, h: box.height, x: box.x, visibility: style.visibility, display: style.display };
			}),
		);
		expect(afterCn[1].visibility).toBe("hidden");
		expect(afterCn[1].display).not.toBe("none");
		expect(Math.abs(afterCn[0].w - before[0].w)).toBeLessThan(4);
		expect(Math.abs(afterCn[1].w - before[1].w)).toBeLessThan(4);
		expect(Math.abs(afterCn[0].x - before[0].x)).toBeLessThan(4);
		expect(Math.abs(afterCn[1].x - before[1].x)).toBeLessThan(4);

		await page.locator('[data-study-hide="jp"]').click();
		const afterBoth = await page.locator(".study-jp, .study-cn").evaluateAll((els) =>
			els.map((el) => {
				const box = el.getBoundingClientRect();
				return { w: box.width, visibility: getComputedStyle(el).visibility };
			}),
		);
		expect(afterBoth[0].visibility).toBe("hidden");
		expect(afterBoth[1].visibility).toBe("hidden");
		expect(Math.abs(afterBoth[0].w - before[0].w)).toBeLessThan(4);
		expect(Math.abs(afterBoth[1].w - before[1].w)).toBeLessThan(4);
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

test.describe("accounts", () => {
	test("exposes a guest /api/me payload and keeps cloud notebooks private", async ({ request }) => {
		const me = await request.get("/api/me");
		expect(me.ok()).toBeTruthy();
		const body = await me.json();
		expect(body.user).toBeNull();
		expect(typeof body.configured).toBe("boolean");

		const favs = await request.get("/api/favorites");
		const mistakes = await request.get("/api/mistakes");
		expect(favs.status()).toBe(401);
		expect(mistakes.status()).toBe(401);
	});

	test("study stays usable without signing in", async ({ page }) => {
		await waitForStudy(page);
		await expect(page.locator("#topbar")).toBeVisible();
		await expect(page.locator(".week-card").first()).toBeVisible();
		const login = page.locator("#accountLogin");
		if (await login.count()) {
			await expect(login).toHaveAttribute("href", "/auth/google");
		}
	});

	test("guest opening favorites or mistakes is asked to sign in", async ({ page }) => {
		await waitForStudy(page, { configured: true });
		const guest = page.locator("#guestLoginDialog");
		if (await guest.isVisible()) await guest.getByRole("button", { name: /稍后再说|Not now/ }).click();
		await openStudyNav(page, "mistakes");
		const dialog = page.locator("#loginDialog");
		await expect(dialog).toBeVisible();
		await expect(dialog.locator("h2")).toContainText(/错题本需要登录|Sign in to use your notebook/);
		await expect(page.locator("#loginDialogGo")).toHaveAttribute("href", /\/auth\/google\?next=/);
		await expect(page.locator("#loginDialogGo")).toHaveAttribute("href", /study%2Fmistakes|study\/mistakes/);
		await dialog.getByRole("button", { name: /取消|Cancel/ }).click();
		await expect(dialog).toHaveCount(0);

		await openStudyNav(page, "favs");
		await expect(page.locator("#loginDialog")).toBeVisible();
		await expect(page.locator("#loginDialog h2")).toContainText(/收藏需要登录|Sign in to save favorites/);
		await expect(page.locator("#loginDialogGo")).toHaveAttribute("href", /study%2Ffavs|study\/favs/);
	});

	test("suggests Google sign-in when a guest enters study", async ({ page }) => {
		await waitForStudy(page, { configured: true });
		const dialog = page.locator("#guestLoginDialog");
		await expect(dialog).toBeVisible();
		await expect(dialog.locator("h2")).toContainText(/建议登录|Sign in recommended/);
		await expect(page.locator("#guestLoginGo")).toHaveAttribute("href", /\/auth\/google\?next=/);
		await dialog.getByRole("button", { name: /稍后再说|Not now/ }).click();
		await expect(dialog).toHaveCount(0);
		await expect(page.locator(".week-card").first()).toBeVisible();
		await page.reload();
		await dismissViteOverlay(page);
		await expect(page.locator("#accountLogin")).toBeVisible({ timeout: 15_000 });
		await expect(page.locator("#guestLoginDialog")).toHaveCount(0);
	});

	test("google start route is reachable", async ({ request }) => {
		const res = await request.get("/auth/google", { maxRedirects: 0 });
		expect([302, 503]).toContain(res.status());
		if (res.status() === 302) {
			expect(res.headers()["location"] || "").toContain("accounts.google.com");
		} else {
			expect(await res.text()).toMatch(/尚未配置|not configured/i);
		}
	});
});
