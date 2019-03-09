import { sleep } from '@musical-patterns/utilities'
import {
    isPaused,
    isPlaying,
    LONG_ENOUGH_FOR_TIME_TO_PASS,
    quickRefresh,
    selectLongDurationPattern,
    selectTimeControlsPattern,
} from '../../support'
import { clickTimeControl } from '../../support/time'

describe('time controls', () => {
    it('starts off paused', async (done: DoneFn) => {
        await quickRefresh()
        await selectTimeControlsPattern()
        await isPaused()

        done()
    })

    describe('after pressing play', () => {
        beforeEach(async (done: DoneFn) => {
            await quickRefresh()
            await selectLongDurationPattern()
            await clickTimeControl('play')
            await sleep(LONG_ENOUGH_FOR_TIME_TO_PASS)

            done()
        })

        afterEach(async (done: DoneFn) => {
            await clickTimeControl('pause')

            done()
        })

        it('begins incrementing the time', async (done: DoneFn) => {
            await isPlaying()

            done()
        })
    })
})
