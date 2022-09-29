import { clickTimeControl, isPaused, isPlaying, quickRefresh, selectLongDurationPattern } from '../../../support'

describe('pause button', (): void => {
    beforeEach(async (): Promise<void> => {
        await quickRefresh()
        await selectLongDurationPattern()
        await clickTimeControl('play')
        await isPlaying()
    })

    it('clicking pause stops playing', async (): Promise<void> => {
        await clickTimeControl('pause')
        await isPaused()
    })
})
