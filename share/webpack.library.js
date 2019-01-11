const common = require('./webpack.common')
const merge = require('webpack-merge')

module.exports = merge(common, {
    entry: './src/index.ts',
    mode: 'production',
    output: {
        library: 'pattern',
        libraryTarget: 'umd',
    },
    externals: [
        '@musical-patterns/compiler',
        '@musical-patterns/pattern',
        '@musical-patterns/registry',
        '@musical-patterns/utilities',
    ],
})
