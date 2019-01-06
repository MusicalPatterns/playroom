const dev = require('./webpack.dev')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(dev, {
    entry: './src/playroom.ts',
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Musical Patterns - Playroom for pattern',
        }),
    ],
})
