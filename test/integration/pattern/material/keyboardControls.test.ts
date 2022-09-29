import { Ms, Point, sleep } from '@musical-patterns/utilities'
import {
    A_BIT_LONGER,
    currentTime,
    elementExists,
    hasBeenReset,
    isPaused,
    isPlaying,
    press,
    quickRefresh,
    selectLongDurationPattern,
} from '../../../support'

describe('keyboard controls', (): void => {
    beforeEach(async (): Promise<void> => {
        await quickRefresh()
        await selectLongDurationPattern()
    })

    it('starts off paused', async (): Promise<void> => {
        await isPaused()
    })

    describe('after pressing space bar', (): void => {
        beforeEach(async (): Promise<void> => {
            if (await elementExists('#play')) {
                await press('Space')
            }
        })

        afterEach(async (): Promise<void> => {
            if (await elementExists('#pause')) {
                await press('Space')
            }
        })

        it('begins incrementing the time', async (): Promise<void> => {
            await isPlaying()
        })

        it('pressing space bar pauses', async (): Promise<void> => {
            await press('Space')
            await isPaused()
        })

        it('pressing escape key stops (resets the time to the beginning and stops playing)', async (): Promise<void> => {
            await press('Escape')
            await hasBeenReset()
            await isPaused()
        })

        it('pressing home key rewinds (resets time to the beginning and keeps playing)', async (): Promise<void> => {
            await sleep(A_BIT_LONGER)
            const timeOfPressingRewind: Point<Ms> = await currentTime()

            await press('Home')
            await hasBeenReset({ toBefore: timeOfPressingRewind })
            await isPlaying()
        })
    })
})
