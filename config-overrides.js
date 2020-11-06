const PrerenderSPAPlugin = require('prerender-spa-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const getHtmlWebpackPluginConfig = require('./config/htmlPluginConfig');
const path = require('path');

module.exports = (config, env) => {
  config.output.filename = 'app.js';

  // Override HtmlWebpackPlugin config for Dev & Prod
  const HtmlWebpackPluginIndex = config.plugins.findIndex(
    plugin => plugin instanceof HtmlWebpackPlugin
  );

  config.plugins.splice(HtmlWebpackPluginIndex, 1);
  const htmlPlugins = generateHTMLPlugins(env);
  config.plugins = htmlPlugins.concat(config.plugins);

  if (env === 'production') {
    config.module.rules.forEach(rule => {
      // console.log('rule: ', rule);
      if (rule.hasOwnProperty('oneOf')) {
        rule.oneOf[0].options.name = '[name].[ext]';
        rule.oneOf[0].test.push(/\.svg$/);
        rule.oneOf[0].options.limit = -1;
        rule.oneOf[3].use[0].options.publicPath = './';
        rule.oneOf[4].use[0].options.publicPath = './';
        rule.oneOf[5].use[0].options.publicPath = './';
        rule.oneOf[6].use[0].options.publicPath = './';
        rule.oneOf[7].options.name = '[name].[ext]';
      }
    });

    /**
     * Add SCSS variable from Webpack config
     */

    const prerenderSPAPlugins = generatePrerenderSPAPlugins();
    config.plugins = config.plugins.concat(prerenderSPAPlugins);

    config.optimization.runtimeChunk = false;
    config.optimization.splitChunks = {
      cacheGroups: {
        default: false
      }
    };
    config.output.filename = 'app.js';

    config.plugins.forEach(plugin => {
      if (plugin instanceof MiniCssExtractPlugin) {
        plugin.options.filename = '[name].css';
        plugin.options.publicPath = './';
      }
    });
  }

  return config;
};

function generateHTMLPlugins(env) {
  return [new HtmlWebpackPlugin(getHtmlWebpackPluginConfig(env))];
}

function generatePrerenderSPAPlugins() {
  const options = {
    routes: ['/', '/music', '/music/m-royal', '/music/keep-control'],
    staticDir: path.join(__dirname, 'build'),
  };

  return [new PrerenderSPAPlugin(options)];
}
