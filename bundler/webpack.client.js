import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserJSPlugin from 'terser-webpack-plugin';
import LoadablePlugin from '@loadable/webpack-plugin';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import webpackCommon from './webpack.common';
import { env, paths } from '../utils';
import { getDefinedVars } from '../env.loader';

const config = webpackCommon('client');

const { isDev } = env;
const isAnalyze = Boolean(process.env.ANALYZE_MODE) === true;
const entryFile = './client.js';

const clientConfig = {
  target: 'web',
  name: 'client',
  context: paths.app,
  mode: config.mode,
  devtool: config.devtool,
  cache: {
    type: 'filesystem',
    allowCollectingMemory: true
  },
  resolve: {
    ...config.resolve,
    fallback: {
      fs: false
    }
  },
  entry: isDev
    ? [
        'webpack-hot-middleware/client?path=/__webpack_hmr&reload=true',
        entryFile
      ]
    : entryFile,
  output: {
    path: config.outputPath,
    publicPath: config.publicPath,
    filename: isDev ? '[name].js' : '[name].[contenthash:8].js',
    chunkFilename: isDev ? '[id].chunk.js' : '[id].chunk.[contenthash:8].js'
  },
  optimization: isDev
    ? {
        // @see: https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        // @see: https://webpack.js.org/plugins/css-minimizer-webpack-plugin/#options
        minimizer: [new TerserJSPlugin(), new CssMinimizerPlugin()],
        runtimeChunk: {
          name: entrypoint => `runtime~${entrypoint.name}`
        },
        splitChunks: {
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendor',
              chunks: 'all'
            }
          }
        }
      }
    : {},
  // for more about performance hints
  // @see: https://webpack.js.org/configuration/performance/#performance
  performance: isDev
    ? { hints: false }
    : {
        maxEntrypointSize: 400000,
        maxAssetSize: 400000,
        assetFilter: assetFilename => {
          return !/\.map$/.test(assetFilename);
        }
      },
  module: {
    rules: [
      config.getBabelRule(),
      config.getImagesRule(),
      config.getFontsRule(),
      config.getCssModulesRule(MiniCssExtractPlugin),
      config.getStylesRule(MiniCssExtractPlugin)
    ]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new webpack.DefinePlugin(getDefinedVars().stringified),
    new NodePolyfillPlugin({ excludeAliases: ['console'] }),
    new LoadablePlugin(),
    new MiniCssExtractPlugin({
      filename: isDev ? '[name].css' : '[name].[contenthash:8].css',
      chunkFilename: isDev ? '[id].chunk.css' : '[id].chunk.[contenthash:8].css'
    })
  ]
};

if (isDev) {
  clientConfig.plugins = [
    ...clientConfig.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      MODE: JSON.stringify('development')
    })
  ];
} else {
  clientConfig.plugins = [
    ...clientConfig.plugins,
    // for more webpack bundle analyzer options,
    // @see: https://github.com/webpack-contrib/webpack-bundle-analyzer#options-for-plugin
    new BundleAnalyzerPlugin({
      analyzerMode: isAnalyze ? 'server' : 'disabled',
      openAnalyzer: isAnalyze
    })
  ];
}

export default clientConfig;
