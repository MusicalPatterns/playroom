const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: './src/index.tsx',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.svg$/,
                use: 'svg-react-loader',
            },
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
            {
                test: /\.(eot|woff|woff2|ttf)/,
                loader: 'file-loader',
            },
        ],
    },
    resolve: {
        extensions: [ '.ts', '.tsx', '.js', '.json', '.scss', '.svg' ],
    },
    plugins: [
        new CopyWebpackPlugin([ {
            from: 'node_modules/@musical-patterns/performer/dist/*.wav',
            to: path.join(__dirname, './dist'),
            flatten: true,
        } ]),
    ],
    output: {
        filename: 'index.js',
        library: 'playroom',
        libraryTarget: 'umd',
    },
}
