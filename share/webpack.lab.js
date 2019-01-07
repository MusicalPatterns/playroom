const common = require('./webpack.common')
const merge = require('webpack-merge')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new FaviconsWebpackPlugin('assets/favicon.png'),
    ]
})
