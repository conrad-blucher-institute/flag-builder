const path = require('path');

module.exports = {
  entry: './Client/src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'ClientBuild'),
  },
  optimization: {
    minimize: false
  },
  mode: 'development'
};