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
    it('starts off paused', async (): Promise<void> => {
        await quickRefresh()
        await selectTimeControlsPattern()
        await isPaused()
    })

    describe('after pressing play', (): void => {
        beforeEach(async (): Promise<void> => {
            await quickRefresh()
            await selectLongDurationPattern()
            await clickTimeControl('play')
            await sleep(LONG_ENOUGH_FOR_TIME_TO_PASS)
        })

        afterEach(async (): Promise<void> => {
            await clickTimeControl('pause')
        })

        it('begins incrementing the time', async (): Promise<void> => {
            await isPlaying()
        })
    })
})
