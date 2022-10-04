process.env.NODE_ENV = "production";
const webpack = require("webpack");
const webpackAnalyzer = require("./analyzer");
webpack(Object.assign({}, webpackAnalyzer), (err, stats) => {
  if (err || stats.hasErrors()) {
    console.error(err);
  }
});
