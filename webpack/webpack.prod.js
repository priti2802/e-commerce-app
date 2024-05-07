const webpack = require("webpack");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
  mode: "production",
  devServer: {
    port: 5002,
    hot: true, // enable hot module replacement
    historyApiFallback: true,
    open: true, // enable open app in browser
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
      "process.env.REACT_APP_TYPE": JSON.stringify("production"),
      "process.env.REACT_APP_API_URL": JSON.stringify(
        "http://localhost:5002/api/v1"
      ),
    }),
    new ReactRefreshWebpackPlugin(),
  ],
};
