const sleep: (ms: number) => Promise<void> =
    async (ms: number): Promise<void> =>
        new Promise<void>((resolve: () => void): void => {
            setTimeout(resolve, ms)
        })

export {
    sleep,
}
