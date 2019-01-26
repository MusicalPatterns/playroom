const { PLAYROOM_PORT } = require('@musical-patterns/utilities')
const browser = require('./webpack.browser')
const merge = require('webpack-merge')

module.exports = merge(browser, {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        open: true,
        port: PLAYROOM_PORT,
    },
})
