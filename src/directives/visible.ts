import { CustomDirective } from '@/directives';

function settle(el: HTMLElement, { value = true, oldValue }: { value: boolean; oldValue: boolean }) {
	el.style.visibility = value ? '' : 'hidden';
}
export default {
	name: 'visible',
	mounted: settle,
	updated: settle,
} as CustomDirective<HTMLElement, boolean>;
