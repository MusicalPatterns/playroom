const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const common = require('./webpack.common')
const merge = require('webpack-merge')
const path = require('path')

module.exports = merge(common, {
    entry: './test/support/infrastructure/entryForTest.js',
    devtool: 'eval-source-map',
    devServer: {
        disableHostCheck: true,
        port: 8083,
        open: true,
    },
    output: {
        libraryTarget: 'var',
        path: path.join(__dirname, './test-qa'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Musical Patterns - Playroom QA',
            meta: { viewport: 'width=device-width, initial-scale=1' },
        }),
        new CopyWebpackPlugin([
            {
                from: 'node_modules/@musical-patterns/performer/dist/*.wav',
                to: path.join(__dirname, './test-qa'),
                flatten: true,
            },
            {
                from: 'node_modules/@musical-patterns/pattern-playroom-test/dist/*.jpg',
                to: path.join(__dirname, './test-qa'),
                flatten: true,
            },
            {
                from: 'node_modules/@musical-patterns/pattern-playroom-test/dist/*.png',
                to: path.join(__dirname, './test-qa'),
                flatten: true,
            },
            {
                from: 'node_modules/@musical-patterns/pattern-playroom-test/dist/*.svg',
                to: path.join(__dirname, './test-qa'),
                flatten: true,
            },
        ]),
        new FaviconsWebpackPlugin('./assets/favicon.png'),
    ],
})
