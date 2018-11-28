const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: './src/app.tsx',
    mode: 'production',
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
        mainFields: ['patternModule', 'browser', 'module', 'main'],
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: 'node_modules/@musical-patterns/performer/dist/*.wav',
            to: path.join(__dirname, './dist'),
            flatten: true,
        }]),
    ],
    output: {
        library: 'playroom',
        libraryTarget: 'umd',
    },
}
