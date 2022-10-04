const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = function override(config, env) {
  // do stuff with the webpack config...
  config.plugins.push(new BundleAnalyzerPlugin());
  config.plugins.push(
    new ProgressBarPlugin({
      format: `analyzing... [:bar3] [:percent] [:elapsed seconds] - :msg`,
    })
  );
  return config;
};
