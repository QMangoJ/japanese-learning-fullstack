import tsconfigPaths from "vite-tsconfig-paths";
import stylex from "@stylexjs/unplugin";
import { defineConfig } from "vitest/config";

export default defineConfig({
	// Astryx spike: components under test use stylex.create(), which throws at
	// runtime unless compiled — run the same StyleX transform as the app build.
	plugins: [stylex.vite(), tsconfigPaths()],
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
