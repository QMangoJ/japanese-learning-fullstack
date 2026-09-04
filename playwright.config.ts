import { defineConfig } from "@playwright/test";

const port = Number(process.env.E2E_PORT || 5173);
const baseURL = process.env.E2E_BASE_URL || `http://127.0.0.1:${port}`;

export default defineConfig({
	testDir: "./tests",
	testMatch: "**/*.spec.ts",
	timeout: 45_000,
	expect: { timeout: 15_000 },
	fullyParallel: false,
	retries: 0,
	reporter: "list",
	use: {
		baseURL,
		headless: true,
		trace: "retain-on-failure",
		screenshot: "only-on-failure",
	},
	webServer: {
		command: `CHOKIDAR_USEPOLLING=1 E2E=1 npm run dev -- --host 127.0.0.1 --port ${port}`,
		url: baseURL,
		reuseExistingServer: true,
		timeout: 120_000,
	},
	projects: [
		{
			name: "mobile-chrome",
			use: {
				browserName: "chromium",
				viewport: { width: 390, height: 844 },
				isMobile: true,
				hasTouch: true,
			},
		},
		{
			name: "desktop-chrome",
			use: { viewport: { width: 1280, height: 800 }, browserName: "chromium" },
		},
		{
			name: "mobile-webkit",
			use: {
				browserName: "webkit",
				viewport: { width: 390, height: 844 },
				isMobile: true,
				hasTouch: true,
			},
		},
	],
});
