console.log('babel.config.js');
module.exports = {
	presets: ['@vue/cli-plugin-babel/preset'],
	plugins: [
		// icon-pack
		[
			'import',
			{
				libraryName: '@icon-park/vue-next',
				libraryDirectory: 'es/icons',
				camel2DashComponentName: false,
			},
		],
		// element-ui
		// [
		//     'import',
		//     {
		//         libraryName: 'element-plus',
		//         customStyleName: (name) => `element-plus/lib/theme-chalk/${name}.css`,
		//     },
		// ],
		// antd
		// [
		//     'import',
		//     {
		//         libraryName: 'ant-design-vue',
		//         libraryDirectory: 'es',
		//         style: 'css',
		//     },
		// ],
		//'vant'
		// [
		//     'import',
		//     {
		//         libraryName: 'vant',
		//         libraryDirectory: 'es',
		//         style: true,
		//     },
		// ],
	],
};
