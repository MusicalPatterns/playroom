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

const playJustLongEnoughToBeAlmostAboutToWrapAround: () => Promise<void> =
    async (): Promise<void> => {
        const totalTime: Ms = await patternDuration()
        await sleep(difference(totalTime, A_BIT_LONGER))
    }

const playJustLongEnoughMoreToWrapAround: () => Promise<void> =
    async (): Promise<void> => {
        await sleep(sum(A_BIT_LONGER, LONG_ENOUGH_FOR_TIME_TO_PASS))
    }

describe('timeline', () => {
    describe('wrapping', () => {
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

        it('time wraps back around to the beginning upon reaching the end of a pattern', async (done: DoneFn) => {
            const initialTime: Ms = await currentTime()

            await playJustLongEnoughToBeAlmostAboutToWrapAround()
            const beforeWrappingTime: Ms = await currentTime()
            expect(beforeWrappingTime)
                .toBeGreaterThan(
                    from.Ms(initialTime),
                    'tried to play long enough to be just about to wrap around, but was still at the initial time',
                )

            await playJustLongEnoughMoreToWrapAround()
            const afterWrappingTime: Ms = await currentTime()
            expect(afterWrappingTime)
                .toBeLessThan(
                    from.Ms(beforeWrappingTime),
                    'tried to play just long enough more to wrap around, but the time was still after the most recent measurement',
                )

            done()
        })
    })
})
