import { from, Milliseconds } from '@musical-patterns/utilities'

const sleep: (ms: Milliseconds) => Promise<void> =
    async (ms: Milliseconds): Promise<void> =>
        new Promise((resolve: VoidFunction): void => {
            setTimeout(resolve, from.Milliseconds(ms))
        })

export {
    sleep,
}
