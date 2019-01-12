const common = require('./webpack.common')
const merge = require('webpack-merge')
const { DefinePlugin } = require('webpack')

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
    plugins: [
        new DefinePlugin({
            'process.env.PUBLISH_DATE': JSON.stringify(new Date()),
        }),
    ]
})
