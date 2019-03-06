import { sleep, to } from '@musical-patterns/utilities'

const waitForHeadfulQaing: () => Promise<void> =
    async (): Promise<void> => {
        await sleep(to.Ms(3000))
    }

const waitLongEnoughForAnimationToComplete: () => Promise<void> =
    async (): Promise<void> => {
        await sleep(to.Ms(300))
    }

export {
    waitForHeadfulQaing,
    waitLongEnoughForAnimationToComplete,
}
