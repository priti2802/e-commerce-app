const webpack = require("webpack");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "source-map",
  devServer: {
    port: 4001,
    hot: false, // enable hot module replacement
    historyApiFallback: true,
    open: true, // enable open app in browser
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "*",
    },
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: "process/browser.js",
      compress: {
        warnings: false,
        drop_console: true,
      },
    }),
    new webpack.DefinePlugin({
      "process.env.REACT_APP_NAME": JSON.stringify("E-Commerce Web App"),
      "process.env.REACT_APP_TYPE": JSON.stringify("development"),
      "process.env.REACT_APP_API_URL": JSON.stringify(
        "http://localhost:3001/api/v1"
      ),
    }),
    new ReactRefreshWebpackPlugin(),
  ],
};
