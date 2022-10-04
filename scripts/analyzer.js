const webpackConfig = require("react-scripts/config/webpack.config")(
  "production"
);
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
webpackConfig.plugins.push(new BundleAnalyzerPlugin());
webpackConfig.plugins.push(
  new ProgressBarPlugin({
    format: `analyzing... [:bar] [:percent] [:elapsed seconds] - :msg`,
  })
);

module.exports = webpackConfig;
