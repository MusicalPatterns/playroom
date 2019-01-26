const { PLAYROOM_TEST_PORT } = require('@musical-patterns/utilities')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const common = require('./webpack.common')
const merge = require('webpack-merge')
const path = require('path')
const { DefinePlugin } = require('webpack')

module.exports = merge(common, {
    entry: './src/playroom.ts',
    devServer: {
        disableHostCheck: true,
        port: PLAYROOM_TEST_PORT,
    },
    output: {
        libraryTarget: 'var',
        path: path.join(__dirname, './test-dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Musical Patterns - Playroom Test',
        }),
        new DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('test'),
        }),
    ],
})
