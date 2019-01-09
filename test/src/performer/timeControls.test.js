import { clickElement, findElement, navigate } from 'puppet-strings'
import { testGlobals } from '../../setup'
import {
    APP_URL,
    elementExists,
    elementInnerText,
    modify,
    PATTERN_SPEC_PROPERTY_ONE_KEY,
    reset,
    selectTestPattern,
    selectTestPatternAndReset,
    sleep,
} from '../../support'
import { selectOtherTestPattern } from '../../support/control/selectTestPattern'

const LONG_ENOUGH_FOR_TIME_TO_PASS = 100
const LONG_ENOUGH_FOR_TIME_TO_HAVE_BEEN_RESET = 100
const A_BIT_LONGER = 1000

const currentTime = async () => parseInt(await elementInnerText('#secret-timer'))

describe('time controls', () => {
    it('do not appear if you have not yet selected a pattern', async done => {
        await navigate(testGlobals.tab, APP_URL)
        expect(await elementExists('#secret-timer'))
            .toBeFalsy()

        done()
    })

    beforeEach(async done => {
        await selectTestPattern()
        await reset()
        done()
    })

    it('start off paused', async done => {
        await sleep(LONG_ENOUGH_FOR_TIME_TO_PASS)
        let initialTime = await currentTime()
        await sleep(LONG_ENOUGH_FOR_TIME_TO_PASS)
        expect(await currentTime())
            .toBe(initialTime)

        done()
    })

    describe('after pressing play', () => {
        beforeEach(async done => {
            const play = await findElement(testGlobals.tab, '#play')
            await clickElement(play)
            done()
        })

        afterEach(async done => {
            if (await elementExists('#pause')) {
                const pause = await findElement(testGlobals.tab, '#pause')
                await clickElement(pause)
            }
            done()
        })

        it('begins incrementing the time', async done => {
            const initialTime = await currentTime()
            await sleep(LONG_ENOUGH_FOR_TIME_TO_PASS)
            expect(await currentTime())
                .toBeGreaterThan(initialTime)

            done()
        })

        it('pauses the music when you click pause', async done => {
            await sleep(LONG_ENOUGH_FOR_TIME_TO_PASS)

            const pause = await findElement(testGlobals.tab, '#pause')
            await clickElement(pause)

            const pausedTime = await currentTime()
            await sleep(LONG_ENOUGH_FOR_TIME_TO_PASS)
            expect(await currentTime())
                .toBe(pausedTime)

            done()
        })

        it('resets the time to the beginning but keeps playing when you select a new pattern', async done => {
            await sleep(A_BIT_LONGER)
            const plentyOfTime = await currentTime()

            await selectOtherTestPattern()

            await sleep(LONG_ENOUGH_FOR_TIME_TO_HAVE_BEEN_RESET)
            let timeAfterResetting = await currentTime()
            expect(timeAfterResetting)
                .toBeLessThan(plentyOfTime)

            await sleep(LONG_ENOUGH_FOR_TIME_TO_PASS)
            expect(await currentTime())
                .toBeGreaterThan(timeAfterResetting)

            done()
        })

        it('resets the time to the beginning but keeps playing when you select new pattern spec', async done => {
            await sleep(A_BIT_LONGER)
            const plentyOfTime = await currentTime()

            const input = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_PROPERTY_ONE_KEY}`)
            await modify(input)

            await sleep(LONG_ENOUGH_FOR_TIME_TO_HAVE_BEEN_RESET)
            let timeAfterResetting = await currentTime()
            expect(timeAfterResetting)
                .toBeLessThan(plentyOfTime)

            await sleep(LONG_ENOUGH_FOR_TIME_TO_PASS)
            expect(await currentTime())
                .toBeGreaterThan(timeAfterResetting)

            done()
        })

        it('resets the time to the beginning and stops playing when you press stop', async done => {
            await sleep(LONG_ENOUGH_FOR_TIME_TO_PASS)

            const stop = await findElement(testGlobals.tab, '#stop')
            await clickElement(stop)

            await sleep(LONG_ENOUGH_FOR_TIME_TO_HAVE_BEEN_RESET)
            let timeAfterResetting = await currentTime()
            expect(timeAfterResetting)
                .toBe(0)

            await sleep(LONG_ENOUGH_FOR_TIME_TO_PASS)
            expect(await currentTime())
                .toBe(0)

            done()
        })

        it('wraps time back around to the beginning', async done => {
            const initialTime = await currentTime()

            const totalDuration = parseInt(await elementInnerText('#secret-total-duration'))
            await sleep(totalDuration - LONG_ENOUGH_FOR_TIME_TO_PASS)
            const beforeWrappingTime = await currentTime()
            expect(beforeWrappingTime).toBeGreaterThan(initialTime)

            await sleep(LONG_ENOUGH_FOR_TIME_TO_PASS + LONG_ENOUGH_FOR_TIME_TO_PASS)
            expect(await currentTime()).toBeLessThan(beforeWrappingTime)

            done()
        })
    })
})
