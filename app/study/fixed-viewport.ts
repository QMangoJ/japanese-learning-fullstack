export function fixedViewportOffset(viewportHeight: number, viewportOffsetTop: number, layoutHeight: number) {
	if (![viewportHeight, viewportOffsetTop, layoutHeight].every(Number.isFinite) || layoutHeight <= 0) return 0;
	// iOS may briefly report a shorter visual viewport while its browser chrome
	// expands during downward scrolling. Native position: fixed already follows
	// that contraction, so applying the negative delta again lifts the controls.
	return Math.max(0, viewportHeight - layoutHeight + viewportOffsetTop);
}
