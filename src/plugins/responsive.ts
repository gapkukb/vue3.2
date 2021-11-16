import { App } from 'vue-demi';

type BP = keyof typeof breakpoints;

const breakpoints = {
	sm: 576,
	md: 768,
	lg: 992,
	xl: 1200,
};
let mobileFirst = true;
/**
 * 设置断点参数，如果你不需要某一个断点，设置为falsy即可
 */
export function setBreakpoints(options: Partial<typeof breakpoints & { mobileFirst: boolean }>) {
	mobileFirst = options.mobileFirst !== false;
	Object.assign(breakpoints, options);
}

/**
 * 响应式编程
 */
export default {
	install(app: App) {
		const bps = (Object.keys(breakpoints) as BP[]).filter((i) => breakpoints[i]).sort((x, y) => breakpoints[x] - breakpoints[y]);

		const prefix = mobileFirst ? 'min-width' : 'max-width';

		bps.forEach((name, index) => {
			const bp = breakpoints[name as BP];
			var mql = window.matchMedia(`screen and (${prefix}: ${bp}px)`);

			mql.onchange = function (e) {
				let detail;
				if ((e.matches && mobileFirst) || (!e.matches && !mobileFirst)) {
					detail = name;
				} else {
					detail = bps[index - 1] || 'default';
				}
				const bpEvent = new CustomEvent('breakpoint', { detail });
				document.dispatchEvent(bpEvent);
			};
		});
	},
};

document.addEventListener('breakpoint',function (e) {

});
