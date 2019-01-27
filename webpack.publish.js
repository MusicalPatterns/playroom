const common = require('./webpack.common')
const prod = require('./webpack.prod')
const library = require('./webpack.library')
const merge = require('webpack-merge')

module.exports = merge(common, prod, library)
