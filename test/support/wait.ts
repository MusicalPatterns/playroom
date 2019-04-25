import { as, Ms, sleep } from '@musical-patterns/utilities'

const waitLongEnoughForAnimationToComplete: () => Promise<void> =
    async (): Promise<void> => {
        await sleep(as.Delta<Ms>(300))
    }

export {
    waitLongEnoughForAnimationToComplete,
}
