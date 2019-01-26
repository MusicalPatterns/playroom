import { from, Millisecond, to } from '@musical-patterns/utilities'
import {
    A_BIT_LONGER,
    currentTime,
    elementExists,
    LONG_ENOUGH_FOR_TIME_TO_HAVE_BEEN_RESET,
    LONG_ENOUGH_FOR_TIME_TO_PASS,
    press,
    refreshWithTestPatternSelected,
    sleep,
} from '../../support'

describe('keyboard controls', () => {
    beforeEach(async (done: DoneFn) => {
        await refreshWithTestPatternSelected()
        done()
    })

    it('start off paused', async (done: DoneFn) => {
        await sleep(LONG_ENOUGH_FOR_TIME_TO_PASS)
        const initialTime: Millisecond = await currentTime()
        await sleep(LONG_ENOUGH_FOR_TIME_TO_PASS)
        expect(await currentTime())
            .toBe(initialTime)

        done()
    })

    describe('after pressing space bar', () => {
        beforeEach(async (done: DoneFn) => {
            if (await elementExists('#play')) {
                await press('Space')
            }
            done()
        })

        afterEach(async (done: DoneFn) => {
            if (await elementExists('#pause')) {
                await press('Space')
            }
            done()
        })

        it('begins incrementing the time', async (done: DoneFn) => {
            const initialTime: Millisecond = await currentTime()
            await sleep(LONG_ENOUGH_FOR_TIME_TO_PASS)
            expect(await currentTime())
                .toBeGreaterThan(from.Millisecond(initialTime))

            done()
        })

        it('pauses the music when you press space bar', async (done: DoneFn) => {
            await sleep(LONG_ENOUGH_FOR_TIME_TO_PASS)

            await press('Space')

            const pausedTime: Millisecond = await currentTime()
            await sleep(LONG_ENOUGH_FOR_TIME_TO_PASS)
            expect(await currentTime())
                .toBe(pausedTime)

            done()
        })

        it('resets the time to the beginning and stops playing when you press escape key', async (done: DoneFn) => {
            await sleep(LONG_ENOUGH_FOR_TIME_TO_PASS)

            await press('Escape')

            await sleep(LONG_ENOUGH_FOR_TIME_TO_HAVE_BEEN_RESET)
            const timeAfterResetting: Millisecond = await currentTime()
            expect(timeAfterResetting)
                .toBe(to.Millisecond(0))

            await sleep(LONG_ENOUGH_FOR_TIME_TO_PASS)
            expect(await currentTime())
                .toBe(to.Millisecond(0))

            done()
        })

        it('pressing home key sets time to the beginning but keeps playing', async (done: DoneFn) => {
            await sleep(A_BIT_LONGER)
            const plentyOfTime: Millisecond = await currentTime()

            await press('Home')

            await sleep(LONG_ENOUGH_FOR_TIME_TO_HAVE_BEEN_RESET)
            const timeAfterResetting: Millisecond = await currentTime()
            expect(timeAfterResetting)
                .toBeLessThan(from.Millisecond(plentyOfTime))

            await sleep(LONG_ENOUGH_FOR_TIME_TO_PASS)
            expect(await currentTime())
                .toBeGreaterThan(from.Millisecond(timeAfterResetting))

            done()
        })
    })
})
