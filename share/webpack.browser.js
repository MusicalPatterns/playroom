const common = require('./webpack.common')
const merge = require('webpack-merge')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = merge(common, {
    entry: './src/playroom.ts',
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Musical Patterns',
            meta: { viewport: 'width=device-width' },
        }),
        new CopyWebpackPlugin([
            {
                from: 'node_modules/@musical-patterns/playroom/dist/*.wav',
                to: path.join(__dirname, './dist'),
                flatten: true,
            },
        ]),
        new FaviconsWebpackPlugin('./node_modules/@musical-patterns/playroom/assets/favicon.png'),
    ],
})
