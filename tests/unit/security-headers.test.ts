import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

import { applySecurityHeaders, SECURITY_HEADERS } from "../../workers/security-headers";

describe("baseline security headers", () => {
	it("keeps static asset and Worker policies in sync", () => {
		const rules = readFileSync(resolve(import.meta.dirname, "../../public/_headers"), "utf8");
		const [path, ...lines] = rules.trim().split("\n");
		expect(path).toBe("/*");
		const headers = Object.fromEntries(lines.map((line) => {
			const separator = line.indexOf(":");
			return [line.slice(0, separator).trim(), line.slice(separator + 1).trim()];
		}));
		expect(headers).toEqual(SECURITY_HEADERS);
	});

	it("preserves auth redirect cookies and private cache policy", () => {
		const headers = new Headers({ Location: "/study", "Cache-Control": "no-store" });
		headers.append("Set-Cookie", "session=example; Path=/; Secure; HttpOnly; SameSite=Lax");
		headers.append("Set-Cookie", "oauth_state=; Max-Age=0; Path=/; Secure; HttpOnly");
		const secured = applySecurityHeaders(new Response(null, { status: 302, headers }));
		expect(secured.status).toBe(302);
		expect(secured.body).toBeNull();
		expect(secured.headers.get("Location")).toBe("/study");
		expect(secured.headers.get("Cache-Control")).toBe("no-store");
		expect(secured.headers.getSetCookie()).toEqual(headers.getSetCookie());
	});

	it.each([204, 304, 416])("preserves bodyless responses (%s)", (status) => {
		const secured = applySecurityHeaders(new Response(null, { status }));
		expect(secured.status).toBe(status);
		expect(secured.body).toBeNull();
	});

	it("adds every configured header without changing the response", async () => {
		const original = new Response("partial audio", {
			status: 206,
			statusText: "Partial Content",
			headers: {
				"Accept-Ranges": "bytes",
				"Cache-Control": "public, max-age=3600",
				"Content-Range": "bytes 0-12/40",
				"Content-Type": "audio/mpeg",
			},
		});

		const secured = applySecurityHeaders(original);

		expect(secured.status).toBe(206);
		expect(secured.statusText).toBe("Partial Content");
		expect(secured.headers.get("Accept-Ranges")).toBe("bytes");
		expect(secured.headers.get("Cache-Control")).toBe("public, max-age=3600");
		expect(secured.headers.get("Content-Range")).toBe("bytes 0-12/40");
		expect(secured.headers.get("Content-Type")).toContain("audio/mpeg");
		expect(await secured.text()).toBe("partial audio");

		for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
			expect(secured.headers.get(name)).toBe(value);
		}
	});

	it("overrides unsafe upstream values with the application policy", () => {
		const secured = applySecurityHeaders(
			new Response(null, {
				headers: {
					"X-Frame-Options": "SAMEORIGIN",
					"X-XSS-Protection": "1; mode=block",
				},
			}),
		);

		expect(secured.headers.get("X-Frame-Options")).toBe("DENY");
		expect(secured.headers.get("X-XSS-Protection")).toBe("0");
	});
});
