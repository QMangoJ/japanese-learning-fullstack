/**
 * Baseline browser security headers shared by every Worker response.
 *
 * Content-Security-Policy is intentionally handled separately: the app still
 * uses an inline theme bootstrap script and Google Fonts, so enabling a strict
 * policy here without nonces would break the current UI.
 */
export const SECURITY_HEADERS = {
	"Cross-Origin-Opener-Policy": "same-origin-allow-popups",
	"Cross-Origin-Resource-Policy": "same-origin",
	"Permissions-Policy": "camera=(), geolocation=(), microphone=(), payment=(), usb=()",
	"Referrer-Policy": "strict-origin-when-cross-origin",
	"Strict-Transport-Security": "max-age=31536000",
	"X-Content-Type-Options": "nosniff",
	"X-Frame-Options": "DENY",
	"X-XSS-Protection": "0",
} as const;

export function applySecurityHeaders(response: Response) {
	const securedResponse = new Response(response.body, response);

	for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
		securedResponse.headers.set(name, value);
	}

	return securedResponse;
}
