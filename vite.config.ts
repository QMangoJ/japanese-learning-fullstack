import { reactRouter } from "@react-router/dev/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import stylex from "@stylexjs/unplugin";
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
		// Astryx spike (branch astryx-spike): compile @stylexjs/stylex usage in
		// app code (currently only the study Sheet). Astryx components themselves
		// ship pre-built CSS; this is for our own StyleX styles and xstyle props.
		stylex.vite({
			// Production: append the collected StyleX rules to the root route's
			// CSS asset (loaded on every page) rather than the plugin default of
			// "first CSS asset", which could be a route chunk the Sheet never sees.
			cssInjectionTarget: (fileName: string) => /(^|\/)root-[^/]*\.css$/.test(fileName),
		}),
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
