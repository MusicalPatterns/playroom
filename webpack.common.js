module.exports = {
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                exclude: /test/,
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
                loader: 'url-loader',
            },
        ],
    },
    resolve: {
        extensions: [ '.ts', '.tsx', '.js', '.json', '.scss', '.svg' ],
    },
}
