const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { port } = require('./webpack.port')

module.exports = {
    entry: './src/start.ts',
    devServer: {
        open: true,
        port,
    },
    plugins: [
        new FaviconsWebpackPlugin('./node_modules/@musical-patterns/cli/assets/favicon.png'),
        new HtmlWebpackPlugin({
            title: 'Musical Patterns',
            meta: { viewport: 'width=device-width' },
        }),
    ],
}
