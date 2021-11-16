import { CustomDirective } from '@/directives';
import { loadImage } from '@/directives/img';

// IntersectionObserver 不兼容ie，需要自行添加polyfill
const io = new IntersectionObserver((entries) => {
	entries
		.filter((i) => i.isIntersecting)
		.forEach((entry) => {
			const el = entry.target as any;
			el.dataset.unobserve = '1';
			loadImage(el);
			io.unobserve(el);
		});
});

export default {
	name: 'lazy',
	beforeMount(el, { value }) {
		el.dataset.src = value || el.src;
		io.observe(el);
	},
	updated(el, { value, oldValue }) {
		// if (value === oldValue) return;
		// el.dataset.src = value || el.src;
		// if (el.dataset.unobserve) {
		// 	loadImage(el as any)
		// }
	},
	unmounted(el) {
		io.unobserve(el);
	},
} as CustomDirective<HTMLImageElement, string>;
