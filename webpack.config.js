const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const webpackConfig = {
  mode: process.env.NODE_ENV,
  entry: {
    app: path.join(__dirname, "src", "index.js"),
    actions: path.join(__dirname, "src", "actions.js"),
  },
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "public"),
    publicPath: "",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.s?a?c?ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "imgs/",
            },
          },
          {
            loader: "css-loader",
            options: {
              url: false,
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: `imgs/[name].[ext]`,
          },
        },
      },
    ],
  },
  plugins: [
    new BrowserSyncPlugin({
      proxy: {
        target: "http://localhost/calendio/public",
      },
      files: ["**/*.html"],
      cors: false,
      reloadDelay: 0,
      open: false,
    }),
    new MiniCssExtractPlugin({
      filename: "css/styles.css",
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src/index.html"),
      filename: "index.html",
      inject: true,
      scriptLoading: "defer",
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "src/imgs", to: "imgs" }],
    }),
  ],
};

module.exports = webpackConfig;
