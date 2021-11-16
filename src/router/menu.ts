import { RouteMeta } from 'vue-router';
import router from '.';
import defaultMeta from './meta';
import Routes from './routes';

export interface Menu extends RouteMeta {
	path: string;
	node: string;
	depth: number;
	children: Menu[];
	routeName?: string | symbol;
}

function crateMenuItem() {
	return {
		icon: '',
		auth: false,
		roles: [],
		keepAlive: false,
		hidden: false,
		order: 0,
		name: '',
		renderSubMenu: true,
		renderSubMenuOnlyChild: false,
		showSubMenu: false,
		title: '',
		children: [],
	} as unknown as Menu;
}

// 路由规则，一级路由必须以 "/" 开头，二级路由可以不以"/"开头，router生成时会自动拼接父级 path.
export default function createMenu(
	routes: typeof Routes,
	collection: Menu[] = [],
	root = '',
	rootNode: number | string = '',
	depth: number = 0,
) {
	++depth;
	routes.forEach((route, index) => {
		let path = route.path;
		// 非/开头视为相对路径，进行拼接,否则直接使用
		if (path.charAt(0) !== '/') {
			path = root + '/' + path;
		}
		const meta = Object.assign(crateMenuItem(), route.meta);
		meta.routeName = route.name;
		meta.path = path;
		if (rootNode) {
			meta.node = rootNode + '-' + index;
		} else {
			meta.node = index + '';
		}
		meta.depth = depth;

		collection!.push(meta);
		if (route.children) {
			meta.children = [];
			createMenu(route.children, meta.children as any, path === '/' ? '' : path, meta.node, depth);
		}
	});

	return collection;
}
