const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/client/js/app.js', // Entry point
  output: {
    filename: 'bundle.js', // Output file name
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/client/views/index.html', // Path to your HTML file
      filename: 'index.html', // Output file name
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css', // Output CSS file name
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/, // Handle CSS files
        use: [MiniCssExtractPlugin.loader, 'css-loader'], // Extract CSS into a separate file
      },
      {
        test: /\.js$/, // Handle JavaScript files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  mode: 'development',
};