import { difference, from, Ms, sleep, sum } from '@musical-patterns/utilities'
import {
    A_BIT_LONGER,
    currentTime,
    elementExists,
    EVEN_A_BIT_LONGER,
    hasBeenReset,
    isPaused,
    isPlaying,
    LONG_ENOUGH_FOR_TIME_TO_PASS,
    patternDuration,
    quickRefresh,
    refreshPage,
    selectLongDurationPattern,
    selectTimeControlsPattern,
} from '../../support'
import { clickTimeControl } from '../../support/time'

const timeControlsAreDisabled: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`#rewind:disabled`))
            .toBeTruthy('rewind was not disabled')
        expect(await elementExists(`#stop:disabled`))
            .toBeTruthy('stop was not disabled')
        expect(await elementExists(`#play:disabled`))
            .toBeTruthy('play was not disabled')
    }

const playJustLongEnoughToBeAlmostAboutToWrapAround: () => Promise<void> =
    async (): Promise<void> => {
        const totalTime: Ms = await patternDuration()
        await sleep(difference(totalTime, A_BIT_LONGER))
    }

const playJustLongEnoughMoreToWrapAround: () => Promise<void> =
    async (): Promise<void> => {
        await sleep(sum(A_BIT_LONGER, LONG_ENOUGH_FOR_TIME_TO_PASS))
    }

describe('time controls', () => {
    it('are disabled if you have not yet selected a pattern', async (done: DoneFn) => {
        await refreshPage()
        await timeControlsAreDisabled()

        done()
    })

    it('starts off paused', async (done: DoneFn) => {
        await quickRefresh()
        await selectTimeControlsPattern()
        await isPaused()

        done()
    })

    describe('after pressing play', () => {
        beforeEach(async (done: DoneFn) => {
            await quickRefresh()
            await selectLongDurationPattern()
            await clickTimeControl('play')
            await sleep(LONG_ENOUGH_FOR_TIME_TO_PASS)

            done()
        })

        afterEach(async (done: DoneFn) => {
            if (await elementExists('#pause')) {
                await clickTimeControl('pause')
            }
            done()
        })

        it('begins incrementing the time', async (done: DoneFn) => {
            await isPlaying()

            done()
        })

        it('clicking pause stops playing', async (done: DoneFn) => {
            await clickTimeControl('pause')
            await isPaused()

            done()
        })

        it('clicking stop stops playing, plus resets the time to the beginning', async (done: DoneFn) => {
            await sleep(LONG_ENOUGH_FOR_TIME_TO_PASS)
            await clickTimeControl('stop')

            await hasBeenReset()
            await isPaused()

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

    describe('wrapping', () => {
        beforeEach(async (done: DoneFn) => {
            await quickRefresh()
            await selectTimeControlsPattern()
            await clickTimeControl('play')
            done()
        })

        afterEach(async (done: DoneFn) => {
            if (await elementExists('#pause')) {
                await clickTimeControl('pause')
            }
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
                    'tried to play just long enough more to wrap around, but the time was still after the last measurement',
                )

            done()
        })
    })
})
