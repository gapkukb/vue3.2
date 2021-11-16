import { CustomDirective } from '@/directives';
import './ellipsis.styl';

function get(value: number) {
	return 'ellipsis' + (value === 1 ? '-1' : '');
}
function settle(el: HTMLElement, { value, oldValue }: { value: number; oldValue: number }) {
	oldValue && el.classList.remove(get(oldValue));
	el.classList.add(get(value));

	if (value > 1) {
		el.style.setProperty('--lines', value + '');
	} else {
		el.style.removeProperty('--lines');
	}
}
export default {
	name: 'lines',
	mounted: settle as any,
	updated: settle as any,
} as CustomDirective<any, string>;
