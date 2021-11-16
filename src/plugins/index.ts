import require from '@/plugins/require';
import { PAGES } from '@/router/names';
import { App } from 'vue-demi';
import amoutlize from './amoutlize';

// 同步导入，相当于 require.context
// const imports = import.meta.globEager('./*');

// 插件必须是函数，插件名 pluginName ， 如果不存在则取函数名

interface Plugin {
	(...args: any[]): any;
	pluginName?: string;
}

export default {
	install(app: App) {
		// ([amoutlize] as Plugin[]).forEach((plugin) => {
		// 	app.config.globalProperties[plugin.pluginName || plugin.name] = plugin;
		// });
		app.config.globalProperties.PAGES = PAGES;
		app.config.globalProperties.$amoutlize = amoutlize;
		app.config.globalProperties.$require = require;
	},
};
