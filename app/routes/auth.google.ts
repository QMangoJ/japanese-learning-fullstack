import type { AppLoadContext } from "react-router";

import { startGoogleLogin } from "../auth/google";

export async function loader({ request, context }: { request: Request; context: AppLoadContext }) {
	return startGoogleLogin(request, context.cloudflare.env);
}
