import { createRequestHandler } from "react-router";

import { isAudioAssetRequest, serveAudioAsset } from "./audio-range";
import { applySecurityHeaders } from "./security-headers";

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
	async fetch(request, env, ctx) {
		const response = isAudioAssetRequest(request)
			? await serveAudioAsset(request, env.ASSETS)
			: await requestHandler(request, {
					cloudflare: { env, ctx },
				});

		return applySecurityHeaders(response);
	},
} satisfies ExportedHandler<Env>;
