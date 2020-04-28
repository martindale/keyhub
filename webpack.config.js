'use strict';

const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: (process.env['NODE_ENV'] === 'production') ? 'production' : 'development',
  entry: './scripts/app.js',
  // devtool: 'source-map',
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'assets/scripts'),
    filename: 'app.js',
    chunkFilename: '[id]-[chunkhash].js'
  },
  plugins: [
    // new LessLoader(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        APP_ENV: JSON.stringify('browser')
      }
    })
  ],
  resolve: {
    alias: {
      "../../theme.config$": path.join(__dirname, "/components/semantic/theme.config"),
      "../semantic-ui/site": path.join(__dirname, "/components/semantic/site")
    }
  }
};
