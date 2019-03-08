import { difference, from, Ms, sleep, sum } from '@musical-patterns/utilities'
import { ElementHandle } from 'puppeteer'
import {
    A_BIT_LONGER,
    clickElement,
    currentTime,
    elementExists,
    EVEN_A_BIT_LONGER,
    findElement,
    hasBeenReset,
    isPaused,
    isPlaying,
    LONG_ENOUGH_FOR_TIME_TO_PASS,
    openSpecControlsIfNotOpen,
    patternDuration,
    quickRefresh,
    RANGED_PROPERTY_ONE_KEY,
    refreshPage,
    selectAboutPage,
    selectLongDurationPattern,
    selectTimeControlsPattern,
    VALID_TEST_MODIFICATION,
} from '../../support'

const modifySpec: () => Promise<void> =
    async (): Promise<void> => {
        const input: ElementHandle = await findElement(`input[type=number]#${RANGED_PROPERTY_ONE_KEY}`)
        await input.type(VALID_TEST_MODIFICATION)
    }

const timeControlsAreDisabled: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`#rewind:disabled`))
            .toBeTruthy('rewind was not disabled')
        expect(await elementExists(`#stop:disabled`))
            .toBeTruthy('stop was not disabled')
        expect(await elementExists(`#play:disabled`))
            .toBeTruthy('play was not disabled')
    }

const click: (control: string) => Promise<void> =
    async (control: string): Promise<void> => {
        await clickElement(`#${control}`)
    }

const isAfter: (previousTime: Ms) => Promise<void> =
    async (previousTime: Ms): Promise<void> => {
        const newTime: Ms = await currentTime()

        expect(newTime)
            .toBeGreaterThan(from.Ms(previousTime), `time ${newTime} was not after ${previousTime}`)
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
            await click('play')
            await sleep(LONG_ENOUGH_FOR_TIME_TO_PASS)

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

        it('keeps playing when you modify the spec but does not reset time to the beginning', async (done: DoneFn) => {
            const timeOfModifyingSpec: Ms = await currentTime()

            await openSpecControlsIfNotOpen()
            await modifySpec()
            await isAfter(timeOfModifyingSpec)
            await isPlaying()

            done()
        })

        it('resets the time to the beginning and stops when you navigate to the about page', async (done: DoneFn) => {
            await sleep(A_BIT_LONGER)
            await selectAboutPage()

            await hasBeenReset()
            await isPaused()

            done()
        })

        it('resets the time to the beginning and stops playing when you press stop', async (done: DoneFn) => {
            await sleep(LONG_ENOUGH_FOR_TIME_TO_PASS)
            await click('stop')

            await hasBeenReset()
            await isPaused()

            done()
        })

        it('pressing rewind sets time to the beginning but keeps playing', async (done: DoneFn) => {
            await sleep(EVEN_A_BIT_LONGER)
            const timeOfPressingRewind: Ms = await currentTime()
            await click('rewind')
            await hasBeenReset({ toBefore: timeOfPressingRewind })
            await isPlaying()

            done()
        })
    })

    describe('after pressing play (when you need it to not be the pattern with a long duration)', () => {
        beforeEach(async (done: DoneFn) => {
            await quickRefresh()
            await selectTimeControlsPattern()
            await click('play')
            done()
        })

        afterEach(async (done: DoneFn) => {
            if (await elementExists('#pause')) {
                await click('pause')
            }
            done()
        })

        it('resets the time to the beginning but keeps playing when you select a new pattern', async (done: DoneFn) => {
            await sleep(A_BIT_LONGER)
            const timeOfSelectingNewPattern: Ms = await currentTime()

            await selectLongDurationPattern()
            await hasBeenReset({ toBefore: timeOfSelectingNewPattern })
            await isPlaying()

            done()
        })

        it('wraps time back around to the beginning', async (done: DoneFn) => {
            const initialTime: Ms = await currentTime()

            await playJustLongEnoughToBeAlmostAboutToWrapAround()
            const beforeWrappingTime: Ms = await currentTime()
            expect(beforeWrappingTime)
                .toBeGreaterThan(from.Ms(initialTime))

            await playJustLongEnoughMoreToWrapAround()
            const afterWrappingTime: Ms = await currentTime()
            expect(afterWrappingTime)
                .toBeLessThan(from.Ms(beforeWrappingTime))

            done()
        })
    })
})
