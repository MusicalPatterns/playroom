import { from, Ms } from '@musical-patterns/utilities'

const sleep: (ms: Ms) => Promise<void> =
    async (ms: Ms): Promise<void> =>
        new Promise((resolve: VoidFunction): void => {
            setTimeout(resolve, from.Ms(ms))
        })

export {
    sleep,
}
