import { expect, test } from "@playwright/test";

test("N2 question audio starts and pauses from a trusted click", async ({ page }) => {
	await page.route("**/api/me", route => route.fulfill({ json: { user: null, configured: false } }));
	await page.goto("/study");
	const level = page.locator("#side .side-seg button", { hasText: /^N2$/ });
	if (await level.isVisible()) await level.click();
	else {
		await page.locator("#lvChip").click();
		await page.locator(".sheet-item", { hasText: "N2" }).click();
	}
	const desktop = page.locator('#side [data-gotype="listening"]');
	if (await desktop.isVisible()) await desktop.click();
	else await page.locator('#typebar [data-ty="listening"], #skillbar [data-ty="listening"]').filter({ visible: true }).first().click();
	await page.goto("/study/day/1-1");
	const cue = page.locator('button[aria-label^="CD 1 ·"]').last();
	await expect(cue).toBeVisible();
	const track = Number((await cue.getAttribute("aria-label"))!.match(/CD 1 · (\d+)/)![1]);
	await cue.click();
	const audio = page.locator("audio");
	await expect(audio).toHaveAttribute("src", `/audio/n2/cd1/CD01_${String(track).padStart(2, "0")}.mp3`);
	await expect.poll(() => audio.evaluate((el: HTMLAudioElement) => !el.paused && Number.isFinite(el.duration) && el.duration > 0)).toBe(true);
	await cue.click();
	await expect.poll(() => audio.evaluate((el: HTMLAudioElement) => el.paused)).toBe(true);
});
