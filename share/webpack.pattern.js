const path = require('path')
const common = require('./webpack.common')
const merge = require('webpack-merge')

module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        disableHostCheck: true,
        contentBase: path.join(__dirname, './dist'),
        open: true,
        port: 8080,
    },
})
