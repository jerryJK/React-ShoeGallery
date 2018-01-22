
var path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin({
    filename: '[name].css',
    disable: process.env.NODE_ENV === "development"
});

module.exports = {

  entry: {
    test: './js/main.jsx',
  },

  output: {
    filename: 'out.js',
    path: path.resolve(__dirname, 'dist'),
  },
  watch:true,
  //devtool: 'source-map',
  module: {
    rules: [{
      test: /\.jsx$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env', 'stage-2', 'react']
        }
      }
    },
    {
      test: /\.scss$/,
      use:['css-hot-loader'].concat(extractSass.extract({
        use: [{
          loader: 'css-loader',options: {
            //sourceMap:true
          }
        }, {
          loader: 'sass-loader', options: {
            //sourceMap: true
          }
        }],
        fallback: 'style-loader'
      }))
    }]
  },
  plugins: [
    extractSass
  ]
};
