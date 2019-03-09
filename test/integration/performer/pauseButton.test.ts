import { isPaused, isPlaying, quickRefresh, selectLongDurationPattern } from '../../support'
import { clickTimeControl } from '../../support/time'

describe('pause button', () => {
    beforeEach(async (done: DoneFn) => {
        await quickRefresh()
        await selectLongDurationPattern()
        await clickTimeControl('play')
        await isPlaying()

        done()
    })

    it('clicking pause stops playing', async (done: DoneFn) => {
        await clickTimeControl('pause')
        await isPaused()

        done()
    })
})
