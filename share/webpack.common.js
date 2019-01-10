const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = {
    entry: './src/playroom.ts',
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
        extensions: [ '.ts', '.tsx', '.js', '.json' ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Musical Patterns',
        }),
        new CopyWebpackPlugin([
            {
                from: 'node_modules/@musical-patterns/playroom/dist/*.wav',
                to: path.join(__dirname, './dist'),
                flatten: true,
            },
            {
                from: 'node_modules/@musical-patterns/playroom/dist/*.eot',
                to: path.join(__dirname, './dist'),
                flatten: true,
            },
            {
                from: 'node_modules/@musical-patterns/playroom/dist/*.woff2',
                to: path.join(__dirname, './dist'),
                flatten: true,
            },
            {
                from: 'node_modules/@musical-patterns/playroom/dist/*.woff',
                to: path.join(__dirname, './dist'),
                flatten: true,
            },
            {
                from: 'node_modules/@musical-patterns/playroom/dist/*.ttf',
                to: path.join(__dirname, './dist'),
                flatten: true,
            },
            {
                from: 'node_modules/@musical-patterns/playroom/dist/*.svg',
                to: path.join(__dirname, './dist'),
                flatten: true,
            },
        ]),
        new FaviconsWebpackPlugin('./node_modules/@musical-patterns/playroom/assets/favicon.png'),
    ],
}
