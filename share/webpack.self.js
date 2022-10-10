const { DefinePlugin } = require('webpack')
const { version } = require('./package')

module.exports = {
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    esModule: false,
                },
            },
            {
                test: /\.(jpg|png|svg|gif)/,
                type: 'asset/resource'
            },
        ],
    },
    plugins: [
        new DefinePlugin({
            'process.env.PUBLISH_DATE': JSON.stringify(new Date()),
            'process.env.PATTERN_VERSION': JSON.stringify(version),
        }),
    ],
}
