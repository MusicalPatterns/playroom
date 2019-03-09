import { Ms, sleep } from '@musical-patterns/utilities'
import {
    currentTime,
    EVEN_A_BIT_LONGER,
    hasBeenReset,
    isPlaying,
    LONG_ENOUGH_FOR_TIME_TO_PASS,
    quickRefresh,
    selectLongDurationPattern,
} from '../../support'
import { clickTimeControl } from '../../support/time'

describe('rewind button', () => {
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

    it('clicking rewind resets time to the beginning, but keeps playing', async (done: DoneFn) => {
        await sleep(EVEN_A_BIT_LONGER)
        const timeOfPressingRewind: Ms = await currentTime()
        await clickTimeControl('rewind')
        await hasBeenReset({ toBefore: timeOfPressingRewind })
        await isPlaying()

        done()
    })
})
