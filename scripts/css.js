const webpackConfig = require("react-scripts/config/webpack.config")(
    "production"
  );
  const  PreloadCssPlugin=  require('preload-css-webpack-plugin')
  webpackConfig.plugins.push(new PreloadCssPlugin());
  module.exports = webpackConfig;
  
  
  