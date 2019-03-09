import { Ms, sleep } from '@musical-patterns/utilities'
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
} from '../../support'

describe('keyboard controls', () => {
    beforeEach(async (done: DoneFn) => {
        await quickRefresh()
        await selectLongDurationPattern()
        done()
    })

    it('starts off paused', async (done: DoneFn) => {
        await isPaused()

        done()
    })

    describe('after pressing space bar', () => {
        beforeEach(async (done: DoneFn) => {
            if (await elementExists('#play')) {
                await press('Space')
            }
            done()
        })

        afterEach(async (done: DoneFn) => {
            if (await elementExists('#pause')) {
                await press('Space')
            }
            done()
        })

        it('begins incrementing the time', async (done: DoneFn) => {
            await isPlaying()

            done()
        })

        it('pressing space bar pauses', async (done: DoneFn) => {
            await press('Space')
            await isPaused()

            done()
        })

        it('pressing escape key stops (resets the time to the beginning and stops playing)', async (done: DoneFn) => {
            await press('Escape')
            await hasBeenReset()
            await isPaused()

            done()
        })

        it('pressing home key rewinds (resets time to the beginning and keeps playing)', async (done: DoneFn) => {
            await sleep(A_BIT_LONGER)
            const timeOfPressingRewind: Ms = await currentTime()

            await press('Home')
            await hasBeenReset({ toBefore: timeOfPressingRewind })
            await isPlaying()

            done()
        })
    })
})
