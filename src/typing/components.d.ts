// 全局组件typescript声明 ，以获得代码提示和高亮
// declare module '@vue/runtime-core' works for vue 3
// declare module 'vue' works for vue2 + vue 3
import { Icon } from '@icon-park/vue-next/lib/runtime';
import { SvgIcon } from '@/components';
import { PAGES } from '@/router/names';
import amoutlize from '@/plugins/amoutlize';
import require from '@/plugins/require';

type IconPark = `Icon${string}`;
declare module 'vue' {
	export interface GlobalComponents {
		//   MyComponent: {} // 如果不支持ts的组件，可直接使用{}
		//   Button: typeof import('element-ui')['Button']
		[iconName: IconPark]: Icon;
		SvgIcon: typeof SvgIcon;
	}

	export interface ComponentCustomProperties {
		PAGES: typeof PAGES;
		$amoutlize: typeof amoutlize;
		$require: typeof require;
	}
}
