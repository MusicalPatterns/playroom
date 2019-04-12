import { apply, difference, from, Ms, ONE_HALF, Scalar, sleep, sum, to } from '@musical-patterns/utilities'
import {
    A_BIT_LONGER,
    clickTimeControl,
    currentTime,
    LONG_ENOUGH_FOR_TIME_TO_PASS,
    patternDuration,
    quickRefresh,
    selectFinitePattern,
    selectRepetendPattern,
    selectTimeControlsPattern,
} from '../../../support'

const playJustLongEnoughToBeAlmostAboutToRepeat: () => Promise<void> =
    async (): Promise<void> => {
        const totalTime: Ms = await patternDuration()
        await sleep(from.Translation(difference(totalTime, A_BIT_LONGER)))
    }

const playJustLongEnoughMoreToRepeat: () => Promise<void> =
    async (): Promise<void> => {
        await sleep(sum(A_BIT_LONGER, LONG_ENOUGH_FOR_TIME_TO_PASS))
    }

const playLongEnoughToHaveReachedTheEnd: () => Promise<void> =
    async (): Promise<void> => {
        const totalTime: Ms = await patternDuration()
        await sleep(sum(totalTime, A_BIT_LONGER))
    }

const playLongerToProveItIsStillStuckAtTheEndTime: () => Promise<void> =
    async (): Promise<void> => {
        await sleep(LONG_ENOUGH_FOR_TIME_TO_PASS)
    }

describe('timeline', () => {
    describe('for some patterns, time repeats from the beginning upon reaching the end', () => {
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

        it('works', async (done: DoneFn) => {
            const initialTime: Ms = await currentTime()

            await playJustLongEnoughToBeAlmostAboutToRepeat()
            const beforeRepeatingTime: Ms = await currentTime()
            expect(beforeRepeatingTime)
                .toBeGreaterThanTyped(
                    initialTime,
                    'tried to play long enough to be just about to repeat, but was still at the initial time',
                )

            await playJustLongEnoughMoreToRepeat()
            const afterRepeatingTime: Ms = await currentTime()
            expect(afterRepeatingTime)
                .toBeLessThanTyped(
                    beforeRepeatingTime,
                    'tried to play just long enough more to repeat, but the time was still after the most recent measurement',
                )

            expect(afterRepeatingTime)
                .toBeLessThanTyped(
                    apply.Scalar(await patternDuration(), ONE_HALF as Scalar<Ms>),
                    'pattern did not repeat from the beginning, because it was past halfway done after repeating',
                )

            done()
        })
    })

    describe('for some patterns, time repeats from a point in the middle upon reaching the end', () => {
        beforeEach(async (done: DoneFn) => {
            await quickRefresh()
            await selectRepetendPattern()
            await clickTimeControl('play')
            done()
        })

        afterEach(async (done: DoneFn) => {
            await clickTimeControl('pause')

            done()
        })

        it('works', async (done: DoneFn) => {
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
                .toBeLessThanTyped(
                    beforeRepeatingTime,
                    'tried to play just long enough more to repeat, but the time was still after the most recent measurement',
                )

            expect(afterRepeatingTime)
                .toBeGreaterThanTyped(
                    apply.Scalar(await patternDuration(), ONE_HALF as Scalar<Ms>),
                    'pattern did not repeat from the segno time, because it was before the halfway point after repeating',
                )

            done()
        })
    })

    describe('for some patterns, upon reaching the end, time stops, the pattern is finished', () => {
        beforeEach(async (done: DoneFn) => {
            await quickRefresh()
            await selectFinitePattern()
            await clickTimeControl('play')
            done()
        })

        afterEach(async (done: DoneFn) => {
            await clickTimeControl('pause')

            done()
        })

        it('works', async (done: DoneFn) => {
            const initialTime: Ms = await currentTime()

            await playLongEnoughToHaveReachedTheEnd()
            const endTime: Ms = await currentTime()
            expect(endTime)
                .toBeGreaterThan(
                    from.Ms(initialTime),
                    'does not seem to have played',
                )

            await playLongerToProveItIsStillStuckAtTheEndTime()
            const afterPlayingMoreTime: Ms = await currentTime()
            expect(afterPlayingMoreTime)
                .toEqual(
                    endTime,
                    'did not stay at the same time after having reached the end',
                )

            done()
        })
    })
})
