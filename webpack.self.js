module.exports = {
    module: {
        rules: [
            {
                test: /\.svg$/,
                use: 'svg-react-loader',
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(eot|woff|woff2|ttf)/,
                loader: 'url-loader',
            },
        ]
    },
    resolve: {
        extensions: [ '.scss', '.svg' ],
    },
}
