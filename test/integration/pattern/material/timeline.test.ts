import { difference, from, Ms, sleep, sum } from '@musical-patterns/utilities'
import {
    A_BIT_LONGER,
    clickTimeControl,
    currentTime,
    LONG_ENOUGH_FOR_TIME_TO_PASS,
    patternDuration,
    quickRefresh,
    selectTimeControlsPattern,
} from '../../../support'

const playJustLongEnoughToBeAlmostAboutToRepeat: () => Promise<void> =
    async (): Promise<void> => {
        const totalTime: Ms = await patternDuration()
        await sleep(difference(totalTime, A_BIT_LONGER))
    }

const playJustLongEnoughMoreToRepeat: () => Promise<void> =
    async (): Promise<void> => {
        await sleep(sum(A_BIT_LONGER, LONG_ENOUGH_FOR_TIME_TO_PASS))
    }

describe('timeline', () => {
    describe('repeating', () => {
        beforeEach(async (done: DoneFn) => {
            await quickRefresh()
            await selectTimeControlsPattern()
            await clickTimeControl('play')
            done()
        })

        afterEach(async (done: DoneFn) => {
            await clickTimeControl('pause')

            done()
        })

        it('time repeats from the beginning upon reaching the end of a pattern', async (done: DoneFn) => {
            const initialTime: Ms = await currentTime()

            await playJustLongEnoughToBeAlmostAboutToRepeat()
            const beforeRepeatingTime: Ms = await currentTime()
            expect(beforeRepeatingTime)
                .toBeGreaterThan(
                    from.Ms(initialTime),
                    'tried to play long enough to be just about to repeat, but was still at the initial time',
                )

            await playJustLongEnoughMoreToRepeat()
            const afterRepeatingTime: Ms = await currentTime()
            expect(afterRepeatingTime)
                .toBeLessThan(
                    from.Ms(beforeRepeatingTime),
                    'tried to play just long enough more to repeat, but the time was still after the most recent measurement',
                )

            done()
        })
    })
})
