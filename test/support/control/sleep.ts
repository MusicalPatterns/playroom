import { from, Millisecond } from '@musical-patterns/utilities'

const sleep: (ms: Millisecond) => Promise<void> =
    async (ms: Millisecond): Promise<void> =>
        new Promise((resolve: VoidFunction): void => {
            setTimeout(resolve, from.Millisecond(ms))
        })

export {
    sleep,
}
