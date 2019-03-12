import {
    clickTimeControl,
    hasBeenReset,
    isPaused,
    isPlaying,
    quickRefresh,
    selectLongDurationPattern,
} from '../../../support'

describe('stop button', () => {
    beforeEach(async (done: DoneFn) => {
        await quickRefresh()
        await selectLongDurationPattern()
        await clickTimeControl('play')
        await isPlaying()

        done()
    })

    it('clicking stop stops playing, plus resets the time to the beginning', async (done: DoneFn) => {
        await clickTimeControl('stop')
        await hasBeenReset()
        await isPaused()

        done()
    })
})
