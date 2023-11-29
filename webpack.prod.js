const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

const prod = {
  mode: "production",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};

module.exports = merge(common, prod);
