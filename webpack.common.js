const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: {
        mainApp: './src/index.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|babel)/,
                exclude: /node_modules/,
                use: [
                    { loader: 'babel-loader' }
                ]
            },
            {
                test: /(^|\.)worker\.js$/,
                exclude: /node_modules/,
                use: [
                    'worker-loader',
                    'babel-loader',
                ]
            },
            {
                test: /\.(svg|png|gif|jpg)/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 90000000
                        }
                    }
                ]
            },
        ]
    },
    plugins: []
}