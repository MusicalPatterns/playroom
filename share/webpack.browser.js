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
        }),
        new CopyWebpackPlugin([
            {
                from: 'node_modules/@musical-patterns/playroom/dist/*.wav',
                to: path.join(__dirname, './dist'),
                flatten: true,
            },
            {
                from: 'node_modules/@musical-patterns/playroom/dist/*.eot',
                to: path.join(__dirname, './dist'),
                flatten: true,
            },
            {
                from: 'node_modules/@musical-patterns/playroom/dist/*.woff2',
                to: path.join(__dirname, './dist'),
                flatten: true,
            },
            {
                from: 'node_modules/@musical-patterns/playroom/dist/*.woff',
                to: path.join(__dirname, './dist'),
                flatten: true,
            },
            {
                from: 'node_modules/@musical-patterns/playroom/dist/*.ttf',
                to: path.join(__dirname, './dist'),
                flatten: true,
            },
            {
                from: 'node_modules/@musical-patterns/playroom/dist/*.svg',
                to: path.join(__dirname, './dist'),
                flatten: true,
            },
        ]),
        new FaviconsWebpackPlugin('./node_modules/@musical-patterns/playroom/assets/favicon.png'),
    ],
})
