const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals');
const BannerPlugin = require('banner-webpack-plugin')

// https://nodejs.org/api/path.html
const path = require('path');

// Constant with our paths
const paths = {
  DIST: path.resolve(__dirname, 'dist'),
  JS: path.resolve(__dirname, 'src'),
};

// Webpack configuration
module.exports = {
  devtool: 'sourcemap',
  entry: {
    app: path.join(paths.JS, 'app.js'),
    // cli: path.join(paths.JS, 'cli.js'),
    // test: path.join(paths.JS, 'test.js')
  },
  output: {
    path: paths.DIST,
    filename: '[name].js'
  },
  target: 'node', // in order to ignore built-in modules like path, fs, etc.
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  node: {
    console: false,
    global: true,
    process: true,
    __filename: "mock",
    __dirname: "mock",
    Buffer: true,
    setImmediate: true

    // See "Other node core libraries" for additional options.
  },
  plugins: [
    new webpack.IgnorePlugin(/\.(css|less)$/),
    new BannerPlugin('require("source-map-support").install();',
                             { raw: true, entryOnly: false })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
    ],
  },
  // Enable importing JS files without specifying their's extenstion -> ADDED IN THIS STEP
  //
  // So we can write:
  // import MyComponent from './my-component';
  //
  // Instead of:
  // import MyComponent from './my-component.jsx';
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'lib': path.resolve(__dirname, 'lib'),
      'config': path.resolve(__dirname, 'config')
    }
  },
};
