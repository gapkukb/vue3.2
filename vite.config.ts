import path from 'path';
import { defineConfig, UserConfigExport, ConfigEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import svgIcons from 'vite-plugin-svg-icons';
import components from 'unplugin-vue-components/vite';
// import {VantResolver} from 'unplugin-vue-components/resolvers';
import AutoImport from 'unplugin-auto-import/vite';
import { viteMockServe } from 'vite-plugin-mock';
import compression from 'vite-plugin-compression';

// tsconfigPaths 根据tsconfig.json的baseurl作为项目的根，对于非相对路径的导入，先寻找baseurl下的，如果未找到再找node_modules
// 启动和编译很慢，根据需求开启
// import tsconfigPaths from 'vite-tsconfig-paths'
// https://vitejs.dev/config/

export default ({ command }: ConfigEnv): UserConfigExport => ({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	plugins: [
		vue(),
		// tsconfigPaths(),
		svgIcons({
			iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
			symbolId: 'icon-[dir]-[name]',
		}),
		// unplugin-vue-components
		// 自动按需引入组件，Tree-shakable，只注册你使用的组件,
		// 不仅支持 vue3，同时也支持 vue2，并且支持 Vite、Webpack、Vue CLI、Rollup
		// 默认是自动进行局部注册，如果希望是全局注册，插件内置了解析器对部分ui库的支持，也可以自定义 - unplugin-vue-components/resolvers
		components({
			resolvers: [
				// 内置解析器
				// VantResolver(),
				// 自定义解析器
				(name) => {
					// 组件名称始终时PascalCase的，即使在template中使用的是 kaba-case 写法
					if (name.startsWith('Icon')) return { importName: name.slice(4), path: '@icon-park/vue-next' };
				},
			],
		}),
		// 自动导入流行插件库的hooks，可以自行扩展, 每次启动时vite服务时会重新生成src/typing/autoimport.d.ts文件
		AutoImport({
			imports: ['vue', 'vue-router', 'vue-i18n', '@vueuse/head', '@vueuse/core'],
			dts:path.resolve(__dirname,"src/typing/autoImport.d.ts"),
		}),
		viteMockServe({
			// 数据存储的位置
			mockPath: 'mocks',
			// 是否启用本地 xxx.ts 文件，不要在生产环境中打开它.设置为 false 将禁用 mock 功能
			localEnabled: command === 'serve',
			ignore: /\.d\.ts$/,
		}),
		compression(),
	],
});
