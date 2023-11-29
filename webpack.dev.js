const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

const dev = {
  mode: "development",
  module: {
    rules: [],
  },
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
  },
};

module.exports = merge(common, dev);
