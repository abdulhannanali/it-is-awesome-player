const merge = require('webpack-merge');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');

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
    ],    
});
