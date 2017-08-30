const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = {
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    entry: {
        mainApp: './src/index.js'
    },
    devtool: 'inline-source-map',
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
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ],
            },
            {
                test: /(^|\.)worker\.js$/,
                exclude: /node_modules/,
                use: [{ loader: 'worker-loader', options: { } }]
            },
            {
                test: /\.(svg|png|gif|jpg)/,
                use: ['file-loader']
            },
        ]
    },
    devServer: { contentBase: './dist' },
    plugins: [
        new CleanWebpackPlugin([ 'dist' ]),
        new HtmlWebpackPlugin({
            title: 'Spotify MP3 Application',
            template: 'src/templates/index.html',
        }),
        new DashboardPlugin(),
    ],
};