import { sleep } from '@musical-patterns/utilities'
import {
    clickTimeControl,
    isPaused,
    isPlaying,
    LONG_ENOUGH_FOR_TIME_TO_PASS,
    quickRefresh,
    selectLongDurationPattern,
    selectTimeControlsPattern,
} from '../../../support'

describe('time controls', (): void => {
    it('starts off paused', async (done: DoneFn): Promise<void> => {
        await quickRefresh()
        await selectTimeControlsPattern()
        await isPaused()

        done()
    })

    describe('after pressing play', (): void => {
        beforeEach(async (done: DoneFn): Promise<void> => {
            await quickRefresh()
            await selectLongDurationPattern()
            await clickTimeControl('play')
            await sleep(LONG_ENOUGH_FOR_TIME_TO_PASS)

            done()
        })

        afterEach(async (done: DoneFn): Promise<void> => {
            await clickTimeControl('pause')

            done()
        })

        it('begins incrementing the time', async (done: DoneFn): Promise<void> => {
            await isPlaying()

            done()
        })
    })
})
