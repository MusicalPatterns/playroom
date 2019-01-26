const { PLAYROOM_PORT } = require('@musical-patterns/utilities')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const common = require('./webpack.common')
const merge = require('webpack-merge')

module.exports = merge(common, {
    entry: './src/playroom.ts',
    devtool: 'eval-source-map',
    devServer: {
        port: PLAYROOM_PORT,
        open: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Musical Patterns - Playroom QA',
            meta: { viewport: 'width=device-width' },
        }),
        new FaviconsWebpackPlugin('./assets/favicon.png'),
    ],
})
