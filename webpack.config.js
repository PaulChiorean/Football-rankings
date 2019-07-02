module.exports = {
    mode: 'development',
    entry: 'index.js',
    output: {
        filename: "main.js",
        publicPath: "dist",
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
};
