import { CustomDirective } from '@/directives';

function settle(_el: HTMLElement, { value, oldValue }: { value: number; oldValue: number }) {
	let el = _el.tagName.toLowerCase() === 'input' ? (_el as HTMLInputElement) : (_el.querySelector('input') as HTMLInputElement);
	if (el) {
		let t = el.value;
		el.value = '';
		el.value = t;
		el.focus();
	}
}

export default {
	name: 'focus',
	mounted: settle as any,
} as CustomDirective<any,string>;
