const { DefinePlugin } = require('webpack')

module.exports = {
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader',
            },
            {
                test: /\.(jpg|png|svg)/,
                loader: 'url-loader',
            },
        ],
    },
    plugins: [
        new DefinePlugin({
            'process.env.PUBLISH_DATE': JSON.stringify(new Date()),
        }),
    ]
}
