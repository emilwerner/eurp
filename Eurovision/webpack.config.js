const path = require('path');

module.exports = {
  entry: {
        app: './client/index.js'     
  },
  output: {
     path: path.resolve(__dirname, 'build'),
     filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }     
    ]
  }
}