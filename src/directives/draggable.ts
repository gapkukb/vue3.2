import { CustomDirective } from '@/directives';

type NewHTMLElement = HTMLElement & { frame: HTMLElement | Window };

let timestamp = Date.now();

function bind(this: NewHTMLElement, e: MouseEvent) {
	e.preventDefault();

	let { width, height, left, top } = this.getBoundingClientRect();
	const { clientX, clientY } = e;
	let limit = {
		t: 0,
		b: window.innerHeight - height,
		l: 0,
		r: document.documentElement.clientWidth - width,
	};

	if (this.frame !== window) {
		const info = (this.frame as HTMLElement).getBoundingClientRect();
		limit.t = info.top;
		limit.b = info.top + info.height - height;
		limit.l = info.left;
		limit.r = info.left + info.width - width;
	}

	document.onmousemove = (e) => {
		const n = Date.now();
		if (n - timestamp < 1000 / 60) return;
		timestamp = n;

		e.preventDefault();
		const deltaX = e.clientX - clientX;
		const deltaY = e.clientY - clientY;

		this.style.left = `${Math.max(limit.l, Math.min(left + deltaX, limit.r))}px`;
		this.style.top = `${Math.max(limit.t, Math.min(top + deltaY, limit.b))}px`;
	};
	document.onmouseup = () => {
		document.onmousemove = document.onmouseup = null;
	};
}

export default {
	name: 'draggable',
	mounted(el, { modifiers }) {
		el.style.cursor = 'move';
		el.style.position = 'fixed';
		el.frame = modifiers.parent ? window : el.parentElement!;
		el.addEventListener('mousedown', bind as EventListener);
	},
	beforeUnmount(el) {
		el.removeEventListener('mousedown', bind as EventListener);
	},
} as CustomDirective<NewHTMLElement, string>;
