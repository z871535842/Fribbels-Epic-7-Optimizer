const path = require('path');
const webpack = require('webpack');
// 使用 require 完美绕过 "import type: json" 的报错
const pkg = require('../app/package.json');
const externals = pkg.dependencies || {};

module.exports = {
  externals: Object.keys(externals),

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { cacheDirectory: true },
        },
      },
    ],
  },

  output: {
    path: path.join(__dirname, '..', 'app'),
    libraryTarget: 'commonjs2',
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    modules: [path.join(__dirname, '..', 'app'), 'node_modules'],
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
    }),
  ],
};