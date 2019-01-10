const browser = require('./webpack.browser')
const merge = require('webpack-merge')

module.exports = merge(browser, {
    mode: 'production',
})
