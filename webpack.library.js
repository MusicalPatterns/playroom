module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'index.js',
        libraryTarget: 'umd',
    },
    externals: [
        '@musical-patterns/compiler',
        '@musical-patterns/pattern',
        '@musical-patterns/utilities',
    ],
}
