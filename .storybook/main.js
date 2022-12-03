const path = require('path');

module.exports = {
	"stories": [
		"../src/**/*.stories.mdx",
		"../src/**/*.stories.@(js|jsx|ts|tsx)"
	],
	"addons": [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-interactions",
		{
			name: "@storybook/preset-scss",
			options: []
		}
	],
	"framework": "@storybook/react",
	webpackFinal: (config) => {
		// config.node = { fs: 'empty' };
		// config.resolve.fallback.fs = false;
		// config.resolve.alias = {
		// 	...config.resolve.alias,
		// 	'fs': path.resolve(__dirname, 'fsMock.js')
		// };
		return config;
	},
}
