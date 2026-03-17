const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const baseConfig = require('./webpack.config.base.js'); // 注意这里一定要带 .js

module.exports = merge(baseConfig, {
  devtool: false,
  mode: 'production',
  target: 'electron-main',
  entry: './app/main.dev.js',

  output: {
    path: path.join(__dirname, '..'),
    filename: './app/main.prod.js',
  },

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
    ],
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
      DEBUG_PROD: false,
      START_MINIMIZED: false,
      E2E_BUILD: false,
    }),
  ],
});