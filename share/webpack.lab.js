const dev = require('./webpack.dev')
const merge = require('webpack-merge')

module.exports = merge(dev, {
    mode: 'production',
})
