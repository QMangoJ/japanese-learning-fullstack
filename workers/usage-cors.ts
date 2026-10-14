const USAGE_PATH = "/api/usage";

export function isUsageRequest(request: Request): boolean {
	return new URL(request.url).pathname === USAGE_PATH;
}

export function withUsageCors(response: Response): Response {
	const headers = new Headers(response.headers);
	headers.set("Access-Control-Allow-Origin", "*");
	headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
	headers.set("Access-Control-Allow-Headers", "Content-Type");
	headers.set("Access-Control-Max-Age", "86400");
	headers.set("Cross-Origin-Resource-Policy", "cross-origin");
	return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}
