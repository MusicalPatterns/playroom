const { PLAYROOM_TEST_PORT } = require('@musical-patterns/utilities')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const common = require('./webpack.common')
const dev = require('./webpack.dev')
const merge = require('webpack-merge')
const { DefinePlugin } = require('webpack')

module.exports = merge(common, dev, {
    entry: './src/playroom.ts',
    devServer: {
        port: PLAYROOM_TEST_PORT,
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
