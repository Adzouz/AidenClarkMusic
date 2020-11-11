const PrerenderSPAPlugin = require('prerender-spa-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const getHtmlWebpackPluginConfig = require('./config/htmlPluginConfig');
const path = require('path');

// List of pages to generate in the build
const routesToGenerate = ['/', '/about', '/music', '/music/m-royal', '/music/keep-control'];

module.exports = (config, env) => {
  config.output.filename = 'app.js';

  const HtmlWebpackPluginIndex = config.plugins.findIndex(
    plugin => plugin instanceof HtmlWebpackPlugin
  );

  config.plugins.splice(HtmlWebpackPluginIndex, 1);
  const htmlPlugins = [new HtmlWebpackPlugin(getHtmlWebpackPluginConfig(env))];
  config.plugins = htmlPlugins.concat(config.plugins);

  if (env === 'production') {
    const optionsPrerender = {
      routes: routesToGenerate,
      staticDir: path.join(__dirname, 'build'),
    };

    config.plugins = config.plugins.concat([new PrerenderSPAPlugin(optionsPrerender)]);

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
