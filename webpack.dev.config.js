const webpack = require("webpack");
const merge = require("webpack-merge");

const commonConfig = require("./webpack.common.config");

module.exports = merge(commonConfig, {
  mode: "development",
  plugins: [ new webpack.HotModuleReplacementPlugin() ],
  devtool: "cheap-module-eval-source-map",
  devServer: {
    hot: true,
    open: true,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.(s?css|sass)$/,
        use: [
          "css-hot-loader",
          "style-loader",
          {
            loader: "typings-for-css-modules-loader",
            options: {
              modules: true,
              namedExport: true,
              localIdentName: "[name]_[local]--[hash:base64:5]"
            }
          },
          "sass-loader",
          "postcss-loader"
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              name: "[name].[ext]",
              outputPath: "images/"
            }
          }
        ]
      }
    ]
  }
});
