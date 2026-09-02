import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [tsconfigPaths()],
	esbuild: { jsx: "automatic" },
	test: {
		environment: "jsdom",
		maxWorkers: 2,
		include: ["tests/unit/**/*.test.{ts,tsx}"],
		setupFiles: ["tests/unit/setup.ts"],
		coverage: {
			provider: "v8",
			reporter: ["text", "html", "json-summary"],
			include: ["app/study/store.ts", "app/routes/study-common.tsx", "app/study/days.tsx"],
			thresholds: {
				"app/study/store.ts": {
					lines: 55,
					functions: 55,
					statements: 55,
				},
			},
		},
	},
});
