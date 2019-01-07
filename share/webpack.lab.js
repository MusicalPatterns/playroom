const dev = require('./webpack.dev')
const merge = require('webpack-merge')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = merge(dev, {
    mode: 'production',
    plugins: [
        new FaviconsWebpackPlugin('assets/favicon.png'),
    ]
})
