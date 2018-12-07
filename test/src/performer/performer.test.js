import { clickElement, evalInTab, fillInElement, findElement, navigate } from 'puppet-strings'
import { testGlobals } from '../../setup'
import { sleep } from '../../support'

const selectAnExamplePattern = async () => {
    const exampleSong = await findElement(testGlobals.tab, 'li#TEST')
    await clickElement(exampleSong)
}

const elementExists = selector => evalInTab(testGlobals.tab, [ selector ], `[selector] = arguments; return !!document.querySelector(selector)`)

const elementInnerText = selector => evalInTab(testGlobals.tab, [ selector ], `[selector] = arguments; return document.querySelector(selector).innerText`)

describe('ui integration', () => {
    it('the time controls do not appear if you have not yet selected a pattern', async done => {
        await navigate(testGlobals.tab, 'http://localhost:8081')
        expect(await elementExists('#secret-timer'))
            .toBeFalsy()

        done()
    })

    beforeEach(async done => {
        await selectAnExamplePattern()
        done()
    })

    describe('time controls', () => {
        it('starts off paused', async done => {
            await sleep(100)
            let secretTime = parseInt(await elementInnerText('#secret-timer'))
            await sleep(100)
            expect(parseInt(await elementInnerText('#secret-timer')))
                .toBe(secretTime)

            done()
        })

        it('pauses the music when you click pause after clicking play', async done => {
            const play = await findElement(testGlobals.tab, '#play')
            await clickElement(play)

            await sleep(100)

            const pause = await findElement(testGlobals.tab, '#pause')
            await clickElement(pause)

            const secretTime = parseInt(await elementInnerText('#secret-timer'))
            await sleep(100)
            expect(parseInt(await elementInnerText('#secret-timer')))
                .toBe(secretTime)

            done()
        })

        describe('after pressing play', () => {
            beforeEach(async done => {
                const play = await findElement(testGlobals.tab, '#play')
                await clickElement(play)
                done()
            })

            afterEach(async done => {
                const pause = await findElement(testGlobals.tab, '#pause')
                await clickElement(pause)
                done()
            })

            it('begins incrementing the time', async done => {
                const secretTime = parseInt(await elementInnerText('#secret-timer'))
                await sleep(100)
                expect(parseInt(await elementInnerText('#secret-timer')))
                    .toBeGreaterThan(secretTime)

                done()
            })

            it('resets the time to the beginning but keeps playing when you select a new song', async done => {
                await sleep(1000)
                const secretTime = parseInt(await elementInnerText('#secret-timer'))

                await selectAnExamplePattern()
                await sleep(100)

                let secretTimeAfterResetting = parseInt(await elementInnerText('#secret-timer'))
                expect(secretTimeAfterResetting)
                    .toBeLessThan(secretTime)
                await sleep(100)
                expect(parseInt(await elementInnerText('#secret-timer')))
                    .toBeGreaterThan(secretTimeAfterResetting)

                done()
            })

            it('resets the time to the beginning but keeps playing when you select new pattern spec', async done => {
                await sleep(1000)
                const secretTime = parseInt(await elementInnerText('#secret-timer'))

                const input = await findElement(testGlobals.tab, 'input#patternPitchScalar')
                await fillInElement(input, '2')
                await clickElement(input)
                await testGlobals.page.keyboard.press('Enter')
                await sleep(100)

                let secretTimeAfterResetting = parseInt(await elementInnerText('#secret-timer'))
                expect(secretTimeAfterResetting)
                    .toBeLessThan(secretTime)
                await sleep(100)
                expect(parseInt(await elementInnerText('#secret-timer')))
                    .toBeGreaterThan(secretTimeAfterResetting)

                done()
            })
        })
    })
})
