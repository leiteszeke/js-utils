const path = require('path');
const webpack = require('webpack');

const PATHS = {
  src: path.join(__dirname, './src'),
  build: path.join(__dirname, './build'),
};

module.exports = {
  mode: 'production',
  entry: {
    utils: PATHS.src + '/index.ts',
  },
  output: {
    path: PATHS.build,
    filename: 'index.js',
    library: 'JsUtils',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: "(typeof self !== 'undefined' ? self : this)",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [{ loader: 'babel-loader' }, { loader: 'ts-loader' }],
        exclude: /demo/,
      },
    ],
  },
  plugins: [
    new webpack.IgnorePlugin(/test\.ts$/),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
};
