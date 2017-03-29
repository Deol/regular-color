var cooking = require('cooking');

cooking.set({
  entry: {
    'eyedropper.min': './src/eyedropper.js',
    vendor: ['regularjs']
  },
  chunk: ['vendor'],
  dist: './dist',
  format: 'var',
  hash: true,
  clean: true,
  sourceMap: true
});

module.exports = cooking.resolve();
