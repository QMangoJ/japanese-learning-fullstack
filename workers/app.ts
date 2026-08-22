import { createRequestHandler } from "react-router";

import { isAudioAssetRequest, serveAudioAsset } from "./audio-range";

declare module "react-router" {
	export interface AppLoadContext {
		cloudflare: {
			env: Env;
			ctx: ExecutionContext;
		};
	}
}

const requestHandler = createRequestHandler(
	() => import("virtual:react-router/server-build"),
	import.meta.env.MODE,
);

export default {
	fetch(request, env, ctx) {
		if (isAudioAssetRequest(request)) return serveAudioAsset(request, env.ASSETS);
		return requestHandler(request, {
			cloudflare: { env, ctx },
		});
	},
} satisfies ExportedHandler<Env>;
