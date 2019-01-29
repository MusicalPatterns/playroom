const { PLAYROOM_TEST_PORT } = require('@musical-patterns/utilities')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const common = require('./webpack.common')
const dev = require('./webpack.dev')
const self = require('./webpack.self')
const merge = require('webpack-merge')
const { DefinePlugin } = require('webpack')

module.exports = merge(self, common, dev, {
    entry: './src/start.ts',
    devServer: {
        port: PLAYROOM_TEST_PORT,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Musical Patterns',
        }),
        new DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('test'),
        }),
    ],
})
