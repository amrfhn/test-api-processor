const path = require('path')
const webpack = require('webpack')
const nodeExternals = require("webpack-node-externals")

module.exports = {
   entry: [
      'webpack-hot-middleware/client', // Add HMR client
      './src/index.js', // Your application entry point
   ],
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: '/', // Required for webpack-dev-middleware
   },
   mode: 'development',
   target: 'node', // Ensure it's targeting Node.js
   module: {
      rules: [
         {
            test: /\.js$/,
            exclude: /node_modules/,
            use: 'babel-loader',
         },
      ],
   },
   watchOptions: {
      poll: true, // Enable polling for file watching
      ignored: /node_modules/,
   },
   plugins: [
      new webpack.HotModuleReplacementPlugin(), // Enable HMR globally,
   ],
   stats: {
      warningsFilter: [
         /Critical dependency: the request of a dependency is an expression/,
         /Critical dependency: require function is used in a way in which dependencies cannot be statically extracted/
      ],
   },
   externalsPresets: { node: true },
   externals: [nodeExternals()],
};
