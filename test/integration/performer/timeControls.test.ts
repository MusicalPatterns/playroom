import { difference, from, Ms, sum } from '@musical-patterns/utilities'
import { ElementHandle } from 'puppeteer'
import {
    A_BIT_LONGER,
    currentTime,
    elementExists,
    findElement,
    hasBeenReset,
    isPaused,
    isPlaying,
    LONG_ENOUGH_FOR_TIME_TO_HAVE_BEEN_RESET,
    LONG_ENOUGH_FOR_TIME_TO_PASS,
    patternDuration,
    refreshPage,
    selectOtherTestPattern,
    sleep,
    SPEC_RANGED_PROPERTY_ONE_KEY,
    TIME_CONTROLS_PATTERN_ID,
    VALID_TEST_MODIFICATION,
} from '../../support'

const modifySpec: () => Promise<void> =
    async (): Promise<void> => {
        const input: ElementHandle = await findElement(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`)
        await input.type(VALID_TEST_MODIFICATION)
    }

const timeControlsAreDisabled: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`#rewind:disabled`))
            .toBeTruthy()
        expect(await elementExists(`#stop:disabled`))
            .toBeTruthy()
        expect(await elementExists(`#play:disabled`))
            .toBeTruthy()
    }

const selectTimeControlsPattern: () => Promise<void> =
    async (): Promise<void> => {
        const testPattern: ElementHandle = await findElement(`#${TIME_CONTROLS_PATTERN_ID}`)
        await testPattern.click()
    }

const click: (control: string) => Promise<void> =
    async (control: string): Promise<void> => {
        const play: ElementHandle = await findElement(`#${control}`)
        await play.click()
    }

const isAfter: (time: Ms) => Promise<void> =
    async (time: Ms): Promise<void> => {
        await sleep(LONG_ENOUGH_FOR_TIME_TO_HAVE_BEEN_RESET)
        const timeAfterResetting: Ms = await currentTime()
        expect(timeAfterResetting)
            .toBeGreaterThan(from.Ms(time))
    }

const playJustLongEnoughToBeAlmostAboutToWrapAround: () => Promise<void> =
    async (): Promise<void> => {
        const totalTime: Ms = await patternDuration()
        await sleep(difference(totalTime, LONG_ENOUGH_FOR_TIME_TO_PASS))
    }

const playJustLongEnoughMoreToWrapAround: () => Promise<void> =
    async (): Promise<void> => {
        await sleep(sum(LONG_ENOUGH_FOR_TIME_TO_PASS, LONG_ENOUGH_FOR_TIME_TO_PASS))
    }

describe('time controls', () => {
    it('are disabled if you have not yet selected a pattern', async (done: DoneFn) => {
        await refreshPage()
        await timeControlsAreDisabled()

        done()
    })

    beforeEach(async (done: DoneFn) => {
        await selectTimeControlsPattern()
        done()
    })

    it('starts off paused', async (done: DoneFn) => {
        await isPaused()

        done()
    })

    describe('after pressing play', () => {
        beforeEach(async (done: DoneFn) => {
            await click('play')
            done()
        })

        afterEach(async (done: DoneFn) => {
            if (await elementExists('#pause')) {
                await click('pause')
            }
            done()
        })

        it('begins incrementing the time', async (done: DoneFn) => {
            await isPlaying()

            done()
        })

        it('pauses the music when you click pause', async (done: DoneFn) => {
            await click('pause')
            await isPaused()

            done()
        })

        it('resets the time to the beginning but keeps playing when you select a new pattern', async (done: DoneFn) => {
            await sleep(A_BIT_LONGER)
            const timeOfSelectingNewPattern: Ms = await currentTime()

            await selectOtherTestPattern()
            await hasBeenReset({ toBefore: timeOfSelectingNewPattern })
            await isPlaying()

            done()
        })

        it('keeps playing when you modify the spec but does not reset time to the beginning', async (done: DoneFn) => {
            await sleep(A_BIT_LONGER)
            const timeOfModifyingSpec: Ms = await currentTime()

            await modifySpec()
            await isAfter(timeOfModifyingSpec)
            await isPlaying()

            done()
        })

        it('resets the time to the beginning and stops playing when you press stop', async (done: DoneFn) => {
            await sleep(LONG_ENOUGH_FOR_TIME_TO_PASS)
            await click('stop')

            await hasBeenReset()
            await isPaused()

            done()
        })

        it('wraps time back around to the beginning', async (done: DoneFn) => {
            const initialTime: Ms = await currentTime()

            await playJustLongEnoughToBeAlmostAboutToWrapAround()
            const beforeWrappingTime: Ms = await currentTime()
            expect(beforeWrappingTime)
                .toBeGreaterThan(from.Ms(initialTime))

            await playJustLongEnoughMoreToWrapAround()
            expect(await currentTime())
                .toBeLessThan(from.Ms(beforeWrappingTime))

            done()
        })

        it('pressing rewind sets time to the beginning but keeps playing', async (done: DoneFn) => {
            await sleep(A_BIT_LONGER)
            const timeOfPressingRewind: Ms = await currentTime()

            await click('rewind')
            await hasBeenReset({ toBefore: timeOfPressingRewind })
            await isPlaying()

            done()
        })
    })
})
