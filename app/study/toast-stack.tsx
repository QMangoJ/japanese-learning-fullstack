import { useSyncExternalStore } from "react";

import { getServerToasts, getToasts, subscribeToasts } from "./toast";

export function ToastStack() {
	const toasts = useSyncExternalStore(subscribeToasts, getToasts, getServerToasts);
	const visible = toasts.length ? [...toasts].reverse() : toasts;
	return (
		<div className="toast-stack" aria-live="polite" aria-relevant="additions">
			{visible.map((toast) => (
				<div className="toast-item" key={toast.id} role="status">
					{toast.text}
				</div>
			))}
		</div>
	);
}
