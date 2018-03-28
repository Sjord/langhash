module.exports = {
    entry: {
        extension: './src/extension',
        standalone: './src/standalone'
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/dist'
    }
};
