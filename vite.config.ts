import { reactRouter } from "@react-router/dev/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const isE2E = process.env.E2E === "1";

export default defineConfig({
	server: {
		watch: {
			ignored: ["**/tmp/**"],
		},
	},
	plugins: [
		cloudflare({
			viteEnvironment: { name: "ssr" },
			inspectorPort: isE2E ? false : undefined,
		}),
		tailwindcss(),
		reactRouter(),
		tsconfigPaths(),
	],
});
