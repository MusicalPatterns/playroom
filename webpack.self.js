module.exports = {
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader',
            },
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
                type: 'asset/resource',
            },
        ],
    },
    resolve: {
        extensions: [ '.scss', '.svg' ],
    },
}
