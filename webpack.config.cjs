const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const TerserPlugin = require("terser-webpack-plugin");

// Common rules for both server and client
const babelLoader = {
  rules: [
    {
      test: /.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env",
            ["@babel/preset-react", { runtime: "automatic" }],
          ],
        },
      },
    },
  ],
};

const resolve = {
  extensions: [".js", ".jsx"],
};

// Server Configuration
const serverConfig = {
  target: "node",
  mode: "production",
  entry: "./src/server/server.jsx",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "server.cjs",
  },
  module: babelLoader,
  resolve,
  externals: [nodeExternals()],
  optimization: {
    minimize: true,
  },
};

// Client Configuration
const clientConfig = {
  target: "web",
  mode: "production",
  entry: "./src/client/index.jsx",
  output: {
    path: path.join(__dirname, "/dist"),
    publicPath: "/",
    filename: "[name].[contenthash].js",
  },
  module: {
    rules: [
      ...babelLoader.rules,
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
        ],
      },
    ],
  },
  devtool: false,
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin()
    ],
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      template: `${__dirname}/src/client/index.html`,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
  ],
  resolve,
};

module.exports = [serverConfig, clientConfig];
