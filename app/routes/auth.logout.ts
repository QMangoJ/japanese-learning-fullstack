import type { AppLoadContext } from "react-router";

import { clearSessionCookies, isSecureRequest, redirectWithCookies, safeNextPath } from "../auth/session";

export async function loader({ request }: { request: Request; context: AppLoadContext }) {
	const url = new URL(request.url);
	const next = safeNextPath(url.searchParams.get("next"));
	return redirectWithCookies(next, clearSessionCookies(isSecureRequest(request)));
}

export async function action({ request }: { request: Request; context: AppLoadContext }) {
	const url = new URL(request.url);
	const next = safeNextPath(url.searchParams.get("next"));
	return redirectWithCookies(next, clearSessionCookies(isSecureRequest(request)));
}
