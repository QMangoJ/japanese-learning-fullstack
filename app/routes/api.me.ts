import type { AppLoadContext } from "react-router";

import { isAuthConfigured } from "../auth/google";
import { getPublicSessionUser, json } from "../auth/http";

export async function loader({ request, context }: { request: Request; context: AppLoadContext }) {
	const env = context.cloudflare.env;
	const configured = isAuthConfigured(env);
	if (!configured) return json({ user: null, configured: false });
	const user = await getPublicSessionUser(request, env);
	return json({ user, configured: true });
}
