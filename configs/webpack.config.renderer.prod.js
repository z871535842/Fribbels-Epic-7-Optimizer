const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const baseConfig = require('./webpack.config.base.js');

module.exports = merge(baseConfig, {
  devtool: 'source-map',
  mode: 'production',
  target: 'electron-renderer',
  entry: [
    'core-js',
    'regenerator-runtime/runtime',
    path.join(__dirname, '..', 'app/index.tsx'),
  ],
  output: {
    path: path.join(__dirname, '..', 'app/dist'),
    publicPath: './dist/',
    filename: 'renderer.prod.js',
    hashFunction: 'xxhash64', 
  },
  module: {
    rules: [
      {
        test: /\.global\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader, options: { publicPath: './' } },
          { loader: 'css-loader', options: { sourceMap: false,esModule: false } },
        ],
      },
      {
        test: /^((?!\.global).)*\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: {
              modules: { localIdentName: '[name]__[local]__[hash:base64:5]' },
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.global\.(scss|sass)$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader', options: { sourceMap: true, importLoaders: 1 } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
      {
        test: /^((?!\.global).)*\.(scss|sass)$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: {
              modules: { localIdentName: '[name]__[local]__[hash:base64:5]' },
              importLoaders: 1,
              sourceMap: true,
            },
          },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|png|svg|jpg|jpeg|gif|webp)$/i,
        type: 'asset',
        parser: { dataUrlCondition: { maxSize: 10000 } }
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({ parallel: true }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: { map: { inline: false, annotation: true } },
      }),
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
      DEBUG_PROD: false,
      E2E_BUILD: false,
    }),
    new MiniCssExtractPlugin({ filename: 'style.css' }),
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.OPEN_ANALYZER === 'true' ? 'server' : 'disabled',
    }),
  ],
});