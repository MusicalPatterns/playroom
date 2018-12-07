import { clickElement, evalInTab, fillInElement, findElement } from 'puppet-strings'
import { testGlobals } from '../../setup'

const selectAnExamplePattern = async () => {
    const exampleSong = await findElement(testGlobals.tab, 'li#TEST')
    await clickElement(exampleSong)
}

const elementValue = selector => evalInTab(testGlobals.tab, [ selector ], `[selector] = arguments; return document.querySelector(selector).value`)

describe('ui integration', () => {
    beforeEach(async done => {
        await selectAnExamplePattern()
        done()
    })

    it('shows a header for the pattern after you select it', async done => {
        await findElement(testGlobals.tab, 'h3', 'pattern spec')
        done()
    })

    describe('submitting pattern changes', () => {
        it('resets all submitted pattern spec changes you have made when you select a pattern', async done => {
            const input = await findElement(testGlobals.tab, 'input#patternPitchScalar')
            await fillInElement(input, '2')
            await clickElement(input)
            await testGlobals.page.keyboard.press('Enter')

            const otherInput = await findElement(testGlobals.tab, 'input#patternDurationScalar')
            await fillInElement(otherInput, '2')
            await clickElement(otherInput)
            await testGlobals.page.keyboard.press('Enter')

            await selectAnExamplePattern()

            expect(await elementValue('input#patternPitchScalar'))
                .toBe('4186')
            expect(await elementValue('input#patternDurationScalar'))
                .toBe('100')

            done()
        })
    })
})
