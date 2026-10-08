import { reactRouter } from "@react-router/dev/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { swCacheVersionPlugin } from "./sw-cache-version";

const isE2E = process.env.E2E === "1";
// Set REMOTE_BINDINGS=1 to proxy remote-only bindings while developing.
const remoteBindings = process.env.REMOTE_BINDINGS === "1";

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
			remoteBindings,
		}),
		tailwindcss(),
		reactRouter(),
		tsconfigPaths(),
		swCacheVersionPlugin(),
	],
});
