var cooking = require('cooking');

cooking.set({
    entry: {
        eyedropper: './src/index.js',
        vendor: ['regularjs']
    },
    moduleName: 'eyeDropper',
    devServer: {
        port: 8888,
        publicPath: './example/'
    },
    chunk: ['vendor'],
    dist: './dist',
    format: 'cjs',
    hash: true,
    clean: true,
    sourceMap: true
});

module.exports = cooking.resolve();
