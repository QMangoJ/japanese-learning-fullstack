import { defineConfig } from "@playwright/test";

const port = Number(process.env.E2E_PORT || 5173);
const baseURL = process.env.E2E_BASE_URL || `http://localhost:${port}`;

export default defineConfig({
	testDir: "./tests",
	timeout: 45_000,
	expect: { timeout: 15_000 },
	fullyParallel: false,
	retries: 0,
	reporter: "list",
	use: {
		baseURL,
		channel: "chrome",
		headless: true,
		trace: "retain-on-failure",
		screenshot: "only-on-failure",
	},
	webServer: {
		command: "npm run dev",
		url: baseURL,
		reuseExistingServer: true,
		timeout: 120_000,
	},
	projects: [
		{
			name: "mobile-chrome",
			use: {
				channel: "chrome",
				viewport: { width: 390, height: 844 },
				isMobile: true,
				hasTouch: true,
			},
		},
		{
			name: "desktop-chrome",
			use: { viewport: { width: 1280, height: 800 }, channel: "chrome" },
		},
	],
});
