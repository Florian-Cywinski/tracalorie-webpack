const path = require('path');   // To import (require()) the node.js build in 'path' module (to use absolute pathnames etc.)
const HtmlWebpackPlugin = require('html-webpack-plugin'); // To import (require()) the node.js build in 'html-webpack-plugin' module we've just installed
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),  // __dirname, 'dist' -> from the current directory we want to point to the dist folder - so the path for output = dist folder
    filename: 'bundle.js',  // To change the file name if we want - by default it is main.js
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/, // To check for every file that ends with .css
        use: [MiniCssExtractPlugin.loader, 'css-loader'],  // To apply the style loader and the css loader we've installed
      },
      {
        test: /\.js$/,  // To check for every file that ends with .js
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack App',
      filename: 'index.html',
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin()
  ],
};
