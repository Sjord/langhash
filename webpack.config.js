module.exports = {
    entry: {
        langhash: './src/langhash',
        extension: './src/extension',
        standalone: './src/standalone'
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/dist'
    }
};
