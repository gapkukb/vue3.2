import { isNavigationFailure, Router, START_LOCATION } from 'vue-router';
import { redirectRouteNameLoggedIn, redirectRouteNameLoggedOut, PAGES } from './names';
// 顶部进度条，页面切换时
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { declareClass } from '@babel/types';

const token = localStorage.getItem('ACCESS_TOKEN');

export default function interceptor(router: Router) {
	// 权限拦截
	// 支持异步函数拦截
	router.beforeEach(async (to, from, next) => {
		NProgress.start();
		// if(from === START_LOCATION){
		// 	// 初始导航
		// }

		// 验证当前路由所有匹配中，是否有需要鉴权的
		if (to.matched.some((route) => route.meta.auth)) {
			if (token) {
				// 已登录且当前路由是登录或者注册的路由，则重定向到默认主页
				const { name } = router.currentRoute.value;
				if (name === PAGES.LOGIN || name === PAGES.REGISTER) {
					next({
						name: redirectRouteNameLoggedIn,
						query: {
							redirect: to.fullPath,
						},
					});
				} else {
					next();
				}
			} else {
				// 未登录，则携带当前页面的路由信息，跳转到登录页面，登陆完成后，重定向回来
				next({
					name: PAGES.LOGIN,
					replace:true,
					query: {
						redirect: to.fullPath,
					},
				});
			}
		} else {
			next();
		}
	});
	router.afterEach((to, from, failure) => {
		NProgress.done();
		if (isNavigationFailure(failure)) {
			console.error('failed navigation', failure);
		}
		if (!to.meta.title) throw new Error('未设置页面标题');

		document.title = to.meta.title;
	});

	router.beforeResolve((to) => {
		console.log(to);
		// 组件已经被解析，但还未渲染，返回false则停止渲染
		if (to.meta.requiresAuth && !isAuthenticated) return false;
	});
}

declare const isAuthenticated: boolean;
