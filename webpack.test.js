const HtmlWebpackPlugin = require('html-webpack-plugin')
const common = require('./webpack.common')
const merge = require('webpack-merge')
const path = require('path')

module.exports = merge(common, {
    entry: './test/support/infrastructure/entryForTest.js',
    devServer: {
        port: 8081,
    },
    output: {
        libraryTarget: 'var',
        path: path.join(__dirname, './test-dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Musical Patterns - Testing Playroom',
        }),
    ],
})
