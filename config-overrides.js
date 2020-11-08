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
    routes: ['/', '/about', '/music', '/music/m-royal', '/music/keep-control'],
    staticDir: path.join(__dirname, 'build'),
  };

  return [new PrerenderSPAPlugin(options)];
}
