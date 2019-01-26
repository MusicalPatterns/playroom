const { PLAYROOM_PORT } = require('@musical-patterns/utilities')
const merge = require('webpack-merge')
const common = require('./webpack.common')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = merge(common, {
    entry: './src/playroom.ts',
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        open: true,
        port: PLAYROOM_PORT,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Musical Patterns',
            meta: { viewport: 'width=device-width' },
        }),
        new FaviconsWebpackPlugin('./node_modules/@musical-patterns/playroom/assets/favicon.png'),
    ],
})
