// noinspection JSUnusedGlobalSymbols
module.exports = {
  'stories': [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  'addons': [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    {
      name: '@storybook/preset-scss',
      options: [],
    },
  ],
  'framework': '@storybook/react',
  webpackFinal: (config) => {
    // config.node = { fs: 'empty' };
    // config.resolve.fallback.fs = false;
    // config.resolve.alias = {
    // 	...config.resolve.alias,
    // 	'fs': path.resolve(__dirname, 'fsMock.js')
    // };

    // Add SVGR Loader
    // =======================================================

    // Merge our rule with existing assetLoader rules
    config.module.rules.unshift({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [{ loader: '@svgr/webpack' }, 'url-loader'],
    });

    // ========================================================

    return config;
  },
};