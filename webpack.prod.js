const merge = require('webpack-merge');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            }
        ]
    },
    devtool: 'cheap-module-source-map',
    plugins: [
        new ExtractTextPlugin('styles.css'),
        new OptimizeCssAssetsPlugin(),
        new StyleExtHtmlWebpackPlugin(),
        new UglifyJSPlugin(),
        new HTMLWebpackPlugin({
            title: 'Awesome music player',
            template: 'src/templates/index.html',
            minify: {
                caseSensitive: true,
                html5: true,
                minifyCSS: true,
                minifyJS: true,
                removeComments: true,
                useShortDoctype: true,
            },
        }),
    ],    
});
