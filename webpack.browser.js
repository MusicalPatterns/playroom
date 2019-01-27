const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { PLAYROOM_PORT } = require('@musical-patterns/utilities')

module.exports = {
    entry: './src/start.ts',
    devServer: {
        open: true,
        port: PLAYROOM_PORT,
    },
    plugins: [
        new FaviconsWebpackPlugin('./assets/favicon.png'),
        new HtmlWebpackPlugin({
            title: 'Musical Patterns',
            meta: { viewport: 'width=device-width' },
        }),
    ],
}
