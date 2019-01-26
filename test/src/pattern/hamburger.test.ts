import { ElementHandle } from 'puppeteer'
import { elementExists, findElement, selectTestPattern, simulateDesktopViewport, simulateMobileViewport } from '../../support'

describe('hamburger', () => {
    it('collapses and expands the left panel', async (done: DoneFn) => {
        expect(await elementExists('#pattern-panel.open'))
            .toBeTruthy()

        const hamburger: ElementHandle = await findElement('#hamburger')
        await hamburger.click()

        expect(await elementExists('#pattern-panel.closed'))
            .toBeTruthy()

        await hamburger.click()

        expect(await elementExists('#pattern-panel.open'))
            .toBeTruthy()

        done()
    })

    it('collapses the panel when you select a pattern if the viewport is smaller than 1000px wide', async (done: DoneFn) => {
        await simulateMobileViewport()

        expect(await elementExists('#pattern-panel.open'))
            .toBeTruthy()

        await selectTestPattern()

        expect(await elementExists('#pattern-panel.closed'))
            .toBeTruthy()

        await simulateDesktopViewport()

        const hamburger: ElementHandle = await findElement('#hamburger')
        await hamburger.click()

        done()
    })
})
