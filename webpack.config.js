require('babel-polyfill');
var path = require('path');
var webpack = require('webpack');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');

var env = process.env.NODE_ENV || 'development';

var config = {
  devtool: env === 'development' ? 'eval' : 'nosources-source-map',
  entry: {
    bundle: path.resolve(__dirname, 'js', 'main.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/dist/',
  },
  plugins: [
    new ProgressBarPlugin(),
  ],
  resolve: {
    modules: [
      path.join(__dirname, 'js'),
      'node_modules',
    ]
  },
  module: {
    rules: [{
        test: /\.(js)$/,
        use: ['babel-loader'],
      }, {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer')()
              ]
            }
          }
        ],
      }, {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer')()
              ]
            }
          }
        ],
      }]
  }
};

if (env === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,
        ascii_only: true
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  );
}

module.exports = config;
