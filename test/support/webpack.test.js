const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './test/support/entryForTest.js',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                exclude: /test/,
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    devServer: {
        port: 8081,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Musical Patterns - Testing Playroom',
        }),
    ],
}
