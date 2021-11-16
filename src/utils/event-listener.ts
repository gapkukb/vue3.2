type T = Parameters<HTMLElement['addEventListener']>;
var supportsPassive = false;
//@ts-ignore
document.createElement('i').addEventListener('_', null, {
	//@ts-ignore
	get passive() {
		supportsPassive = true;
	},
});

export function on(el: HTMLElement, eventName: T[0], handler: T[1]) {
	el.addEventListener(eventName, handler, supportsPassive ? { passive: true } : false);
	return function () {
		off(el, eventName, handler);
	};
}

export function off(el: HTMLElement, eventName: T[0], handler: T[1]) {
	el.removeEventListener(eventName, handler);
}
