const PrerenderSPAPlugin = require('prerender-spa-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const getHtmlWebpackPluginConfig = require('./config/htmlPluginConfig');
const data = require('./src/data/content.json');
const path = require('path');
const devLocale = process.env.REACT_APP_DEV_LOCALE;

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
        rule.oneOf[3].use[0].options.publicPath = './';
        rule.oneOf[4].use[0].options.publicPath = './';
        rule.oneOf[5].use[0].options.publicPath = './';
        rule.oneOf[6].use[0].options.publicPath = './';
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
  if (env === 'production') {
    return data.map(locale => {
      const config = getHtmlWebpackPluginConfig(env, locale.lang);
      return new HtmlWebpackPlugin(config);
    });
  }

  return [new HtmlWebpackPlugin(getHtmlWebpackPluginConfig(env, devLocale))];
}

function generatePrerenderSPAPlugins() {
  return data.map(locale => {
    const options = {
      indexPath: path.join(__dirname, 'build', locale.lang, 'index.html'),
      routes: ['/' + locale.lang],
      staticDir: path.join(__dirname, 'build'),
      renderer: new Renderer({
        injectProperty: '__PRERENDER_INJECTED',
        inject: {
          renderer: true
        }
      }),
      postProcess(context) {
        console.log(
          'Post processing HTML: ',
          context.originalRoute.toUpperCase()
        );

        return context;
      }
    };

    return new PrerenderSPAPlugin(options);
  });
}
