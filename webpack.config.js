process.traceDeprecation = true;
const path = require('path');
const HashPlugin = require('hash-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = {
  //entry: path.join(__dirname, 'webpack', 'main'),
  mode: 'production',
  entry: {
    'main': './assets/js/src/all.js',
    //'slim': './assets/js/slim/slim.js'
  },
  output: {
    filename: '[name].[hash].bundle.js',
    path: path.resolve(__dirname, 'assets', 'js', 'dist'),
    publicPath: '/assets/js/dist/'
  },
  optimization: {
    namedModules: true,
    namedChunks: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ],
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new HashPlugin({ path: './_data/', fileName: 'hash.yml' }),
    new CleanWebpackPlugin({ path: './assets/js/dist/' })
  ],
  resolve: {
    extensions: ['.json', '.js', '.jsx']
  }
};

module.exports = config;
