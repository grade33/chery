const path = require('path');

const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('css-minimizer-webpack-plugin');

const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: process.env.NODE_ENV,
  devtool: isDev ? 'source-map' : false,
  entry: {
    main: path.resolve(__dirname, 'src/scripts/app.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/scripts/[name].js',
    assetModuleFilename: (pathData) => {
      const relativePath = path
        .relative(
          path.resolve(__dirname, 'src'),
          path.dirname(pathData.filename)
        )
        .replace(/\\/g, '/');
      return `${relativePath}/[name][ext]`;
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/assets'),
    },
  },
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(scss|sass|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      }
    ],
  },
  plugins: [
    new ESLintPlugin(),
    new MiniCssExtractPlugin({
      filename: 'assets/styles/libs.css',
    }),
  ],
};
