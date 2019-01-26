const library = require('./webpack.library')
const merge = require('webpack-merge')

module.exports = merge(library, {
    mode: 'development',
    devtool: 'eval-source-map',
})
