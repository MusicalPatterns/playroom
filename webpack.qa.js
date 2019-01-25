const { PLAYROOM_PORT } = require('@musical-patterns/utilities')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const common = require('./webpack.common')
const merge = require('webpack-merge')
const path = require('path')

module.exports = merge(common, {
    entry: './test/support/infrastructure/playroom.js',
    devtool: 'eval-source-map',
    devServer: {
        disableHostCheck: true,
        port: PLAYROOM_PORT,
        open: true,
    },
    output: {
        libraryTarget: 'var',
        path: path.join(__dirname, './test-qa'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Musical Patterns - Playroom QA',
            meta: { viewport: 'width=device-width' },
        }),
        new FaviconsWebpackPlugin('./assets/favicon.png'),
    ],
})
