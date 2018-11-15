const webpack = require("webpack");
const merge = require("webpack-merge");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const commonConfig = require("./webpack.common.config");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(commonConfig, {
  mode: "production",
  devtool: "source-map",
  module: {
    rules: [
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
          },
          {
            loader: "img-loader",
            options: {
              plugins: [
                require("imagemin-gifsicle")({
                  interlaced: false
                }),
                require("imagemin-mozjpeg")({
                  progressive: true,
                  arithmetic: false
                }),
                require("imagemin-pngquant")({
                  floyd: 0.5,
                  speed: 2
                }),
                require("imagemin-svgo")({
                  plugins: [ { removeTitle: true }, { convertPathData: false } ]
                })
              ]
            }
          }
        ]
      },
      {
        test: /\.(s?css|sass)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[hash:6]"
            }
          },
          "sass-loader",
          "postcss-loader"
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([ "dist" ]),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].css"
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new BundleAnalyzerPlugin()
  ],
  optimization: {
    usedExports: true,
    sideEffects: true,
    concatenateModules: true,
    minimizer: [
      new TerserWebpackPlugin({
        sourceMap: true,
        parallel: true,
        terserOptions: {
          mangle: true,
          toplevel: true
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }
});
