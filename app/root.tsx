import {
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "react-router";
import { useEffect, useState } from "react";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
	{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
	{ rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
	{ rel: "manifest", href: "/manifest.webmanifest" },
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous",
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
	},
];

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="zh-CN">
			<head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
				/>
				<script
					dangerouslySetInnerHTML={{
						__html: `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}var r=document.documentElement;r.classList.add("theme-"+t);r.style.colorScheme=t}catch(e){}})();`,
					}}
				/>
				<meta name="theme-color" content="#f6f7f9" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-title" content="日本語上手" />
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	const [online, setOnline] = useState(true);

	useEffect(() => {
		const preventGesture = (event: Event) => event.preventDefault();
		const preventMultiTouch = (event: TouchEvent) => {
			if (event.touches.length > 1) event.preventDefault();
		};
		document.addEventListener("gesturestart", preventGesture, { passive: false });
		document.addEventListener("gesturechange", preventGesture, { passive: false });
		document.addEventListener("touchmove", preventMultiTouch, { passive: false });
		return () => {
			document.removeEventListener("gesturestart", preventGesture);
			document.removeEventListener("gesturechange", preventGesture);
			document.removeEventListener("touchmove", preventMultiTouch);
		};
	}, []);

	useEffect(() => {
		setOnline(navigator.onLine);
		const onOnline = () => setOnline(true);
		const onOffline = () => setOnline(false);
		window.addEventListener("online", onOnline);
		window.addEventListener("offline", onOffline);
		return () => {
			window.removeEventListener("online", onOnline);
			window.removeEventListener("offline", onOffline);
		};
	}, []);

	useEffect(() => {
		if (!import.meta.env.PROD || !("serviceWorker" in navigator)) return;
		let cancelled = false;
		let cacheTimer: number | undefined;
		void navigator.serviceWorker.register("/sw.js", { scope: "/" }).then(async () => {
			const registration = await navigator.serviceWorker.ready;
			if (cancelled) return;
			cacheTimer = window.setTimeout(() => {
				const allowed = (raw: string) => {
					const url = new URL(raw, window.location.href);
					return url.origin === window.location.origin &&
						!url.pathname.startsWith("/api/") &&
						!url.pathname.startsWith("/auth/") &&
						(url.pathname.startsWith("/assets/") ||
							url.pathname.startsWith("/data/") ||
							url.pathname === "/study.css" ||
							url.pathname === "/manifest.webmanifest" ||
							url.pathname === "/favicon.svg" ||
							url.pathname.startsWith("/icon-") ||
							url.pathname.startsWith("/apple-touch-icon") ||
							url.pathname === window.location.pathname);
				};
				const urls = new Set<string>([window.location.href]);
				for (const entry of performance.getEntriesByType("resource")) {
					if (allowed(entry.name)) urls.add(entry.name);
				}
				registration.active?.postMessage({ type: "CACHE_URLS", urls: [...urls] });
			}, 0);
		}).catch(() => {
			/* The app remains fully usable when service workers are unavailable. */
		});
		return () => {
			cancelled = true;
			if (cacheTimer !== undefined) window.clearTimeout(cacheTimer);
		};
	}, []);

	return (
		<>
			<Outlet />
			{online ? null : (
				<div className="offline-status" role="status" aria-live="polite">
					<span aria-hidden="true">↓</span>
					离线模式 · Offline
				</div>
			)}
		</>
	);
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	let message = "Oops!";
	let details = "An unexpected error occurred.";
	let stack: string | undefined;

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : "Error";
		details =
			error.status === 404
				? "The requested page could not be found."
				: error.statusText || details;
	} else if (import.meta.env.DEV && error && error instanceof Error) {
		details = error.message;
		stack = error.stack;
	}

	return (
		<main className="pt-16 p-4 container mx-auto">
			<h1>{message}</h1>
			<p>{details}</p>
			{stack && (
				<pre className="w-full p-4 overflow-x-auto">
					<code>{stack}</code>
				</pre>
			)}
		</main>
	);
}
