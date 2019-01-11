const HtmlWebpackPlugin = require('html-webpack-plugin')
const common = require('./webpack.common')
const merge = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')

module.exports = merge(common, {
    entry: './test/support/infrastructure/entryForTest.js',
    devServer: {
        disableHostCheck: true,
        port: 8081,
    },
    output: {
        libraryTarget: 'var',
        path: path.join(__dirname, './test-dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Musical Patterns - Playroom Test',
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('test'),
        }),
    ],
})
