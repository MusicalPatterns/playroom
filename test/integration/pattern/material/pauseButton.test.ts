import { clickTimeControl, isPaused, isPlaying, quickRefresh, selectLongDurationPattern } from '../../../support'

describe('pause button', (): void => {
    beforeEach(async (done: DoneFn): Promise<void> => {
        await quickRefresh()
        await selectLongDurationPattern()
        await clickTimeControl('play')
        await isPlaying()

        done()
    })

    it('clicking pause stops playing', async (done: DoneFn): Promise<void> => {
        await clickTimeControl('pause')
        await isPaused()

        done()
    })
})
