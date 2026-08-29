export function fixedViewportOffset(viewportHeight: number, viewportOffsetTop: number, layoutHeight: number) {
	if (![viewportHeight, viewportOffsetTop, layoutHeight].every(Number.isFinite) || layoutHeight <= 0) return 0;
	return viewportHeight - layoutHeight + viewportOffsetTop;
}
