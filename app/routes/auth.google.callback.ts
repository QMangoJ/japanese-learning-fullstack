import type { AppLoadContext } from "react-router";

import { finishGoogleLogin } from "../auth/google";

export async function loader({ request, context }: { request: Request; context: AppLoadContext }) {
	return finishGoogleLogin(request, context.cloudflare.env);
}
