import { RouteMeta } from 'vue-router';

export {};

type RoleEnum = 'admin' | 'root' | 'everyone' | 'group';

declare module 'vue-router' {
	export interface RouteMeta
		extends Partial<{
			/** 导航菜单图标 */
			icon: string;
			/** 是否需要登录权限 */
			auth: boolean;
			/** 可以访问的角色权限 */
			roles: RoleEnum[];
			/** 是否启用页面缓存 */
			keepAlive: boolean;
			/** 是否在导航菜单中隐藏该路由 ，比如某些编辑页面，就不需要导航菜单入口 */
			hidden: boolean;
			/** 导航菜单排序 */
			order: number;
			/** 导航菜单名称，无效时则使用 title 字段 */
			name: string;
			/** 是否渲染子菜单 */
			renderSubMenu: boolean;
			/**
			 *  当子路由只有一个选项时，当前路由是作为列表展示，还是作为路由跳转
			 *  如：默认情况下，如果有子路由，点击时则表现为收起/打开子菜单 ，点击子菜单才会跳转
			 *  当子路由只有一个且onlyone = true时 点击时表现为直接跳转
			 * */
			renderSubMenuOnlyChild: boolean;
			/** 是否显示子菜单,优先级高于 renderOnlyChild */
			showSubMenu: boolean;
			/** 页面标题 */
			title: string;
		}> {}
}
