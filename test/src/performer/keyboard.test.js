import { clickElement, findElement } from 'puppet-strings'
import { testGlobals } from '../../setup'
import {
    A_BIT_LONGER,
    currentTime,
    elementExists, LONG_ENOUGH_FOR_TIME_TO_HAVE_BEEN_RESET,
    LONG_ENOUGH_FOR_TIME_TO_PASS,
    press,
    refreshWithTestPatternSelected,
    sleep,
} from '../../support'

describe('keyboard controls', () => {
    beforeEach(async done => {
        await refreshWithTestPatternSelected()
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

    describe('after pressing space bar', () => {
        beforeEach(async done => {
            if (await elementExists('#play')) {
                await press('Space')
            }
            done()
        })

        afterEach(async done => {
            if (await elementExists('#pause')) {
                await press('Space')
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

        it('pauses the music when you press space bar', async done => {
            await sleep(LONG_ENOUGH_FOR_TIME_TO_PASS)

            await press('Space')

            const pausedTime = await currentTime()
            await sleep(LONG_ENOUGH_FOR_TIME_TO_PASS)
            expect(await currentTime())
                .toBe(pausedTime)

            done()
        })

        it('resets the time to the beginning and stops playing when you press escape key', async done => {
            await sleep(LONG_ENOUGH_FOR_TIME_TO_PASS)

            await press('Escape')

            await sleep(LONG_ENOUGH_FOR_TIME_TO_HAVE_BEEN_RESET)
            let timeAfterResetting = await currentTime()
            expect(timeAfterResetting)
                .toBe(0)

            await sleep(LONG_ENOUGH_FOR_TIME_TO_PASS)
            expect(await currentTime())
                .toBe(0)

            done()
        })

        it('pressing home key sets time to the beginning but keeps playing', async done => {
            await sleep(A_BIT_LONGER)
            const plentyOfTime = await currentTime()

            await press('Home')

            await sleep(LONG_ENOUGH_FOR_TIME_TO_HAVE_BEEN_RESET)
            let timeAfterResetting = await currentTime()
            expect(timeAfterResetting)
                .toBeLessThan(plentyOfTime)

            await sleep(LONG_ENOUGH_FOR_TIME_TO_PASS)
            expect(await currentTime())
                .toBeGreaterThan(timeAfterResetting)

            done()
        })
    })
})
