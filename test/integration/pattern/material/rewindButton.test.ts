import { Ms, Point, sleep } from '@musical-patterns/utilities'
import {
    clickTimeControl,
    currentTime,
    EVEN_A_BIT_LONGER,
    hasBeenReset,
    isPlaying,
    LONG_ENOUGH_FOR_TIME_TO_PASS,
    quickRefresh,
    selectLongDurationPattern,
} from '../../../support'

describe('rewind button', (): void => {
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

    it('clicking rewind resets time to the beginning, but keeps playing', async (done: DoneFn): Promise<void> => {
        await sleep(EVEN_A_BIT_LONGER)
        const timeOfPressingRewind: Point<Ms> = await currentTime()
        await clickTimeControl('rewind')
        await hasBeenReset({ toBefore: timeOfPressingRewind })
        await isPlaying()

        done()
    })
})
