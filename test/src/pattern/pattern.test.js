import {
    clickElement,
    closeBrowser,
    evalInTab,
    fillInElement,
    findElement,
    openChrome,
    openTab,
} from 'puppet-strings'
import { startTestPlayroom, stopTestPlayroom } from '../../support'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000

let browser, tab, page

const selectAnExamplePattern = async () => {
    const exampleSong = await findElement(tab, 'li#TEST')
    await clickElement(exampleSong)
}

const elementValue = selector => evalInTab(tab, [ selector ], `[selector] = arguments; return document.querySelector(selector).value`)

describe('ui integration', () => {
    beforeAll(async (done) => {
        await startTestPlayroom()
        browser = await openChrome({ headless: false })
        tab = await openTab(browser, 'http://localhost:8081')
        page = tab.puppeteer.page
        done()
    }, 60000)

    afterAll(async (done) => {
        await closeBrowser(browser)
        await stopTestPlayroom()
        done()
    })

    beforeEach(async done => {
        await selectAnExamplePattern()
        done()
    })

    it('shows a header for the pattern after you select it', async done => {
        await findElement(tab, 'h3', 'pattern spec')
        done()
    })

    describe('submitting pattern changes', () => {
        it('resets all submitted pattern spec changes you have made when you select a pattern', async done => {
            const input = await findElement(tab, 'input#patternPitchScalar')
            await fillInElement(input, '2')
            await clickElement(input)
            await page.keyboard.press('Enter')

            const otherInput = await findElement(tab, 'input#patternDurationScalar')
            await fillInElement(otherInput, '2')
            await clickElement(otherInput)
            await page.keyboard.press('Enter')

            await selectAnExamplePattern()

            expect(await elementValue('input#patternPitchScalar'))
                .toBe('4186')
            expect(await elementValue('input#patternDurationScalar'))
                .toBe('100')

            done()
        })
    })
})
