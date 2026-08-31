export function fixedViewportOffset(viewportHeight: number, viewportOffsetTop: number, fixedBottom: number, windowHeight: number) {
	if (![viewportHeight, viewportOffsetTop, fixedBottom, windowHeight].every(Number.isFinite)
		|| viewportHeight <= 0 || fixedBottom <= 0 || windowHeight <= 0) return 0;
	// Measure an untransformed bottom:0 anchor, not a top:0 element's 100%
	// height: native fixed positioning may already follow the browser toolbar.
	// During iOS rubber-banding, visualViewport can temporarily extend beyond
	// the window. Never translate controls past that actual visible boundary.
	const visibleBottom = Math.min(viewportHeight + viewportOffsetTop, windowHeight);
	// Preserve the previous contraction safeguard: native fixed already follows
	// a shrinking viewport, so a negative correction would lift the bar twice.
	return Math.max(0, visibleBottom - fixedBottom);
}
