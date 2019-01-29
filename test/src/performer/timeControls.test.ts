import { from, Milliseconds, to } from '@musical-patterns/utilities'
import { ElementHandle } from 'puppeteer'
import {
    A_BIT_LONGER,
    currentTime,
    elementExists,
    findElement,
    LONG_ENOUGH_FOR_TIME_TO_HAVE_BEEN_RESET,
    LONG_ENOUGH_FOR_TIME_TO_PASS,
    refresh,
    selectOtherTestPattern,
    sleep,
    SPEC_RANGED_PROPERTY_ONE_KEY,
    TIME_CONTROLS_PATTERN_ID,
    totalDuration,
    VALID_TEST_MODIFICATION,
} from '../../support'

describe('time controls', () => {
    it('are disabled if you have not yet selected a pattern', async (done: DoneFn) => {
        await refresh()
        expect(await elementExists(`#rewind:disabled`))
            .toBeTruthy()
        expect(await elementExists(`#stop:disabled`))
            .toBeTruthy()
        expect(await elementExists(`#play:disabled`))
            .toBeTruthy()

        done()
    })

    beforeEach(async (done: DoneFn) => {
        const testPattern: ElementHandle = await findElement(`#${TIME_CONTROLS_PATTERN_ID}`)
        await testPattern.click()
        done()
    })

    it('start off paused', async (done: DoneFn) => {
        await sleep(LONG_ENOUGH_FOR_TIME_TO_PASS)
        const initialTime: Milliseconds = await currentTime()
        await sleep(LONG_ENOUGH_FOR_TIME_TO_PASS)
        expect(await currentTime())
            .toBe(initialTime)

        done()
    })

    describe('after pressing play', () => {
        beforeEach(async (done: DoneFn) => {
            const play: ElementHandle = await findElement('#play')
            await play.click()
            done()
        })

        afterEach(async (done: DoneFn) => {
            if (await elementExists('#pause')) {
                const pause: ElementHandle = await findElement('#pause')
                await pause.click()
            }
            done()
        })

        it('begins incrementing the time', async (done: DoneFn) => {
            const initialTime: Milliseconds = await currentTime()
            await sleep(LONG_ENOUGH_FOR_TIME_TO_PASS)
            expect(await currentTime())
                .toBeGreaterThan(from.Milliseconds(initialTime))

            done()
        })

        it('pauses the music when you click pause', async (done: DoneFn) => {
            await sleep(LONG_ENOUGH_FOR_TIME_TO_PASS)

            const pause: ElementHandle = await findElement('#pause')
            await pause.click()

            const pausedTime: Milliseconds = await currentTime()
            await sleep(LONG_ENOUGH_FOR_TIME_TO_PASS)
            expect(await currentTime())
                .toBe(pausedTime)

            done()
        })

        it('resets the time to the beginning but keeps playing when you select a new pattern', async (done: DoneFn) => {
            await sleep(A_BIT_LONGER)
            const plentyOfTime: Milliseconds = await currentTime()

            await selectOtherTestPattern()

            await sleep(LONG_ENOUGH_FOR_TIME_TO_HAVE_BEEN_RESET)
            const timeAfterResetting: Milliseconds = await currentTime()
            expect(timeAfterResetting)
                .toBeLessThan(from.Milliseconds(plentyOfTime))

            await sleep(LONG_ENOUGH_FOR_TIME_TO_PASS)
            expect(await currentTime())
                .toBeGreaterThan(from.Milliseconds(timeAfterResetting))

            done()
        })

        it('keeps playing when you select new spec but does not reset time to the beginning', async (done: DoneFn) => {
            await sleep(A_BIT_LONGER)
            const plentyOfTime: Milliseconds = await currentTime()

            const input: ElementHandle = await findElement(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`)
            await input.type(VALID_TEST_MODIFICATION)

            await sleep(LONG_ENOUGH_FOR_TIME_TO_HAVE_BEEN_RESET)
            const timeAfterResetting: Milliseconds = await currentTime()
            expect(timeAfterResetting)
                .toBeGreaterThan(from.Milliseconds(plentyOfTime))

            await sleep(LONG_ENOUGH_FOR_TIME_TO_PASS)
            expect(await currentTime())
                .toBeGreaterThan(from.Milliseconds(timeAfterResetting))

            done()
        })

        it('resets the time to the beginning and stops playing when you press stop', async (done: DoneFn) => {
            await sleep(LONG_ENOUGH_FOR_TIME_TO_PASS)

            const stop: ElementHandle = await findElement('#stop')
            await stop.click()

            await sleep(LONG_ENOUGH_FOR_TIME_TO_HAVE_BEEN_RESET)
            const timeAfterResetting: Milliseconds = await currentTime()
            expect(timeAfterResetting)
                .toBe(to.Milliseconds(0))

            await sleep(LONG_ENOUGH_FOR_TIME_TO_PASS)
            expect(await currentTime())
                .toBe(to.Milliseconds(0))

            done()
        })

        it('wraps time back around to the beginning', async (done: DoneFn) => {
            const initialTime: Milliseconds = await currentTime()

            const totalTime: Milliseconds = await totalDuration()
            await sleep(to.Milliseconds(from.Milliseconds(totalTime) - from.Milliseconds(LONG_ENOUGH_FOR_TIME_TO_PASS)))
            const beforeWrappingTime: Milliseconds = await currentTime()
            expect(beforeWrappingTime)
                .toBeGreaterThan(from.Milliseconds(initialTime))

            await sleep(to.Milliseconds(from.Milliseconds(LONG_ENOUGH_FOR_TIME_TO_PASS) + from.Milliseconds(LONG_ENOUGH_FOR_TIME_TO_PASS)))
            expect(await currentTime())
                .toBeLessThan(from.Milliseconds(beforeWrappingTime))

            done()
        })

        it('pressing rewind sets time to the beginning but keeps playing', async (done: DoneFn) => {
            await sleep(A_BIT_LONGER)
            const plentyOfTime: Milliseconds = await currentTime()

            const rewind: ElementHandle = await findElement('#rewind')
            await rewind.click()

            await sleep(LONG_ENOUGH_FOR_TIME_TO_HAVE_BEEN_RESET)
            const timeAfterResetting: Milliseconds = await currentTime()
            expect(timeAfterResetting)
                .toBeLessThan(from.Milliseconds(plentyOfTime))

            await sleep(LONG_ENOUGH_FOR_TIME_TO_PASS)
            expect(await currentTime())
                .toBeGreaterThan(from.Milliseconds(timeAfterResetting))

            done()
        })
    })
})
