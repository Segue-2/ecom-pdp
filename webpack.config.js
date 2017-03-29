var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var nodeExternals = require('webpack-node-externals');

var isProduction = process.env.NODE_ENV === 'production';
var productionPluginDefine = isProduction ? [
  new webpack.DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify('production')}})
] : [];
var clientLoaders = isProduction ? productionPluginDefine.concat([
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false }, sourceMap: false })
]) : [];

var commonLoaders = [
  {
    test: /\.json$/,
    loader: 'json-loader'
  }
];

const path = require('path');
module.exports = [
  {
    entry: './config/server.js',
    output: {
       path: path.resolve(__dirname, 'dist'),
      filename: 'server.js',
      libraryTarget: 'commonjs2',
      publicPath: '/'
    },
    target: 'node',
    node: {
      console: false,
      global: false,
      process: false,
      Buffer: false,
      __filename: false,
      __dirname: false
    },
    externals: nodeExternals(),
    plugins: productionPluginDefine,
    module: {
      rules: [
      {
        test: /\.(js|jsx)$/,
         use: 'babel-loader'
      }
    ]
    },
    resolve: {
      extensions: ['.js', '.jsx']
    }
  },
  {
    entry: './config/client.js',
    output: {
       path: path.resolve(__dirname, 'dist/assets'),
      publicPath: '/',
      filename: 'bundle.js'
    },
    plugins: clientLoaders.concat([
      new ExtractTextPlugin({ filename: 'index.css', disable: false, allChunks: true })
    ]),
    module: {
       rules: [
      {
        test: /\.(js|jsx)$/,
         use: 'babel-loader'
      }
    ]
    },
    resolve: {
      extensions: ['.js', '.jsx']
    }
  }
];
