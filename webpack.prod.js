const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const TerserPlugin = require('terser-webpack-plugin');
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin(), '...'],
  },
});

// module.exports = merge(common, {
//   mode: 'production',
//   optimization: {
//     minimize: true,
//     minimizer: [/* new OptimizeCSSAssetsPlugin({}) */new CssMinimizerPlugin(),, new TerserPlugin(), `...` /* '...' */],
//   },
// });