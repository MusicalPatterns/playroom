import {
    clickTimeControl,
    hasBeenReset,
    isPaused,
    isPlaying,
    quickRefresh,
    selectLongDurationPattern,
} from '../../../support'

describe('stop button', (): void => {
    beforeEach(async (): Promise<void> => {
        await quickRefresh()
        await selectLongDurationPattern()
        await clickTimeControl('play')
        await isPlaying()
    })

    it('clicking stop stops playing, plus resets the time to the beginning', async (): Promise<void> => {
        await clickTimeControl('stop')
        await hasBeenReset()
        await isPaused()
    })
})
