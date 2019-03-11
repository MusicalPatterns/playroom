import { sleep, to } from '@musical-patterns/utilities'

const waitLongEnoughForAnimationToComplete: () => Promise<void> =
    async (): Promise<void> => {
        await sleep(to.Ms(300))
    }

export {
    waitLongEnoughForAnimationToComplete,
}
