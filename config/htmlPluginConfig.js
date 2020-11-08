const path = require('path');
const templatePath = path.resolve(__dirname + '/../public/index.html');

module.exports = function getHtmlWebpackPluginConfig(env) {
  return Object.assign(
    {},
    {
      inject: true,
      template: templatePath,
      filename: 'index.html',
      templateParameters: (compilation, assets, assetTags, options) => {
        return {
          compilation,
          webpackConfig: compilation.options,
          htmlWebpackPlugin: {
            tags: assetTags,
            files: assets,
            options
          }
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
