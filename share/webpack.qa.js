const { PLAYROOM_PORT } = require('@musical-patterns/utilities')
const path = require('path')
const browser = require('./webpack.browser')
const merge = require('webpack-merge')

module.exports = merge(browser, {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        disableHostCheck: true,
        contentBase: path.join(__dirname, './dist'),
        open: true,
        port: PLAYROOM_PORT,
    },
})
