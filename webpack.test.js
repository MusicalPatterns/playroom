const HtmlWebpackPlugin = require('html-webpack-plugin')
const common = require('./webpack.common')
const merge = require('webpack-merge')

module.exports = merge(common, {
    entry: './test/support/infrastructure/entryForTest.js',
    devServer: {
        port: 8081,
    },
    output: {
        libraryTarget: 'var',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Musical Patterns - Testing Playroom',
        }),
    ],
})
