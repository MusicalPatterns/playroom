import { musicalAs, sleep } from '@musical-patterns/utilities'

const waitLongEnoughForAnimationToComplete: () => Promise<void> =
    async (): Promise<void> => {
        await sleep(musicalAs.Duration(300))
    }

export {
    waitLongEnoughForAnimationToComplete,
}
