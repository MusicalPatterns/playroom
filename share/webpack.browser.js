const common = require('./webpack.common')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = merge(common, {
    entry: './src/playroom.ts',
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Musical Patterns',
            meta: { viewport: 'width=device-width' },
        }),
        new FaviconsWebpackPlugin('./node_modules/@musical-patterns/playroom/assets/favicon.png'),
    ],
})
