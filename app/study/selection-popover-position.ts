type SelectionRect = Pick<DOMRect, "bottom" | "left" | "top" | "width">;

type SelectionPopoverPositionOptions = {
	rect: SelectionRect;
	viewportWidth: number;
	viewportHeight: number;
	mobile: boolean;
	width?: number;
	height?: number;
	padding?: number;
};

export function selectionPopoverPosition({
	rect,
	viewportWidth,
	viewportHeight,
	mobile,
	width = 286,
	height = 160,
	padding = 12,
}: SelectionPopoverPositionOptions) {
	const left = Math.max(padding, Math.min(viewportWidth - width - padding, rect.left + (rect.width - width) / 2));
	// iOS places its text-selection menu above the selected text. Leave enough room
	// for that system menu before rendering our own save panel.
	const selectionGap = mobile ? 66 : 10;
	const above = rect.top - height - selectionGap;
	const top = above >= padding ? above : Math.min(viewportHeight - height - padding, rect.bottom + 10);

	return {
		left: Math.round(left),
		top: Math.max(padding, Math.round(top)),
	};
}
