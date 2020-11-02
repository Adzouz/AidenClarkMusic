const path = require('path');
const templatePath = path.resolve(__dirname + '/../public/index.html');

module.exports = function getHtmlWebpackPluginConfig(env, lang) {
  const filename = `${lang}/index.html`;

  return Object.assign(
    {},
    {
      inject: true,
      template: templatePath,
      filename: env === 'production' ? filename : 'index.html',
      templateParameters: (compilation, assets, assetTags, options) => {
        return {
          compilation,
          webpackConfig: compilation.options,
          htmlWebpackPlugin: {
            tags: assetTags,
            files: assets,
            options
          },
          locale: lang
        };
      }
    },
    env === 'production'
      ? {
          minify: {
            removeComments: false,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true
          }
        }
      : undefined
  );
};
