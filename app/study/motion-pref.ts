/** Shared motion gates. Missing matchMedia (jsdom, old WebViews) means "no extra motion". */
export function motionMatches(query: string) {
	return typeof matchMedia === "function" && matchMedia(query).matches;
}

export function prefersReducedMotion() {
	return motionMatches("(prefers-reduced-motion: reduce)");
}

/** Pointer tilt is only for devices that actually hover with a fine pointer. */
export function fineHover() {
	return motionMatches("(hover: hover) and (pointer: fine)");
}
