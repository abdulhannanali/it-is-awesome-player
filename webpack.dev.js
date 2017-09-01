const merge = require('webpack-merge');
const common = require('./webpack.common');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: 'Awesome music player',
            template: 'src/templates/index.html'
        }),
    ],
    devServer: {
        contentBase: './dist'
    }
});
