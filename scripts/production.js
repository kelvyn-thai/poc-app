const HtmlWebpackInjectPreload = require("@principalstudio/html-webpack-inject-preload");

module.exports = function override(config, env) {
  // do stuff with the webpack config...
//   config.plugins.push(
//     new HtmlWebpackInjectPreload({
//       files: [
//         {
//           match: /.*\.woff2$/,
//           attributes: { as: "font", type: "font/woff2", crossorigin: true },
//         },
//         {
//           match: /.*\.css$/,
//           attributes: { as: "style" },
//         },
//       ],
//     })
//   );
  return config;
};
