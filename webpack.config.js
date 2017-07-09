var path = require('path');

module.exports = {
  entry: './src/js/app.js',
  output: {
    path: path.resolve(__dirname, 'src/js'),
    filename: 'bundle.js'
  }
};
