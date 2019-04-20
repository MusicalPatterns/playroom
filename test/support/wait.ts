import { as, sleep } from '@musical-patterns/utilities'

const waitLongEnoughForAnimationToComplete: () => Promise<void> =
    async (): Promise<void> => {
        await sleep(as.Ms(300))
    }

export {
    waitLongEnoughForAnimationToComplete,
}
