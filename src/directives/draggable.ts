import { CustomDirective } from '@/directives';

function bind(this: HTMLElement, e: MouseEvent) {
	e.preventDefault();
	let { width, height, left, top } = this.getBoundingClientRect();
	const { clientX, clientY } = e;

	document.onmousemove = (e) => {
		e.preventDefault();
		const deltaX = e.clientX - clientX;
		const deltaY = e.clientY - clientY;

		this.style.left = `${left + deltaX}px`;
		this.style.top = `${left + deltaY}px`;
	};
	document.onmouseup = () => {
		document.onmousemove = document.onmouseup = null;
	};
}

export default {
	name: 'draggable',
	mounted(el) {
		el.style.cursor = 'move';
		// el.style.position = 'fixed';

		el.addEventListener('mousedown', bind);
	},
	beforeUnmount(el) {
		el.removeEventListener('mousedown', bind);
	},
} as CustomDirective<HTMLElement, string>;
