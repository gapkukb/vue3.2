import { RouteRecord, RouteRecordRaw } from 'vue-router';
import Basic from '@/layout/basic/index.vue';
import { PAGES } from './names';

// 主要按功能分为三组，分别是主要页面，次要页面，异常页面
// 主要页面都是通过basic下的router-view渲染，其他页面通过app.vue下的router-view渲染
// 主要页面集合，可以是公用了头部，底部，侧边栏的页面
// 也可以按照鉴权划分，放需要鉴权的页面
export const frame: RouteRecordRaw[] = [
	{
		path: '/',
		redirect: '/home',
		component: Basic,
		meta: {
			name: '阿西吧',
		},
		children: [
			{
				path: 'home',
				name: PAGES.HOME,
				component: ()=>import('@/pages/home/index.vue'),
				meta: {
					title: '示例',
				},
			},
			{
				path: 'home2',
				name: 'home2',
				redirect: '/home2-1',
				meta: {
					name: '阿西吧',
				},
				children: [
					{
						path: '/home2/home2-1',
						component: ()=>import('@/pages/home/index.vue'),
						meta: {
							title: '示例',
						},
					},
					{
						path: 'home2-2',
						component: ()=>import('@/pages/home/index.vue'),
						meta: {
							title: '示例',
						},
					},
					{
						path: 'home2-3',
						component: ()=>import('@/pages/home/index.vue'),
						meta: {
							title: '示例',
						},
					},
				],
			},
		],
	},
];

// 不需要公用的头部底部侧边栏的页面
// 或者放不需要鉴权的页面
export const sides: RouteRecordRaw[] = [
	{
		path: '/login',
		name: PAGES.LOGIN,
		component: () => import('@/pages/login/index.vue'),
		meta: {
			title: '登录',
			hidden: true,
		},
	},
	{
		path: '/register',
		name: PAGES.REGISTER,
		component: () => import('@/pages/register/index.vue'),
		meta: {
			title: '注册',
			hidden: true,
		},
	},
];

export const errors: RouteRecordRaw[] = [
	{
		path: '/*',
		name: PAGES.ERROR_404,
		component: () => import('@/pages/errors/404.vue'),
		meta: {
			title: '404',
			hidden: true,
		},
	},
];

export default [...frame, ...sides, ...errors];
