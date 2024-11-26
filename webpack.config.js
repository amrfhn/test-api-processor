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
   externalsPresets: { node: true },   // <-- here
   externals: [nodeExternals()],
   // externals: { // Exclude it from Webpack
   //    // "uglify-js": "commonjs uglify-js",
   //    //    "esbuild": "commonjs esbuild",
   //    //    "@swc/core": "commonjs @swc/core",
   //    //    "esbuild/package.json": "commonjs esbuild/package.json",
   //    //    "@swc/core/package.json": "commonjs @swc/core/package.json",
   //    //    "uglify-js/package.json": "commonjs uglify-js/package.json",
   //    //    "bson-ext": "commonjs bson-ext",
   //    //    "kerberos": "commonjs kerberos",
   //    //    "@mongodb-js/zstd": "commonjs @mongodb-js/zstd",
   //    //    "snappy": "commonjs snappy",
   //    //    "snappy/package.json": "commonjs snappy/package.json",
   //    //    "aws4": "commonjs aws4",
   // },
};
