const { DefinePlugin } = require('webpack')

module.exports = {
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                exclude: /test/,
            },
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
    resolve: {
        extensions: [ '.ts', '.tsx', '.js', '.json' ],
    },
    plugins: [
        new DefinePlugin({
            'process.env.PUBLISH_DATE': JSON.stringify(new Date()),
        }),
    ]
}
