import {
    clickTimeControl,
    hasBeenReset,
    isPaused,
    isPlaying,
    quickRefresh,
    selectLongDurationPattern,
} from '../../../support'

describe('stop button', (): void => {
    beforeEach(async (done: DoneFn): Promise<void> => {
        await quickRefresh()
        await selectLongDurationPattern()
        await clickTimeControl('play')
        await isPlaying()

        done()
    })

    it('clicking stop stops playing, plus resets the time to the beginning', async (done: DoneFn): Promise<void> => {
        await clickTimeControl('stop')
        await hasBeenReset()
        await isPaused()

        done()
    })
})
