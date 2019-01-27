module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'index.js',
        library: 'pattern',
        libraryTarget: 'umd',
    },
    externals: [
        '@musical-patterns/compiler',
        '@musical-patterns/pattern',
        '@musical-patterns/utilities',
    ],
}
