import { ElementHandle } from 'puppeteer'
import { elementExists, findElement, selectTestPattern, simulateDesktopViewport, simulateMobileViewport } from '../../support'

const PATTERN_PANEL: string = '#pattern-panel'

describe('hamburger', () => {
    it('collapses and expands the left panel', async (done: DoneFn) => {
        expect(await elementExists(`${PATTERN_PANEL}.open`))
            .toBeTruthy()

        const hamburger: ElementHandle = await findElement('#hamburger')
        await hamburger.click()

        expect(await elementExists(`${PATTERN_PANEL}.closed`))
            .toBeTruthy()

        await hamburger.click()

        expect(await elementExists(`${PATTERN_PANEL}.open`))
            .toBeTruthy()

        done()
    })

    it('collapses the panel when you select a pattern if the viewport is smaller than 1000px wide', async (done: DoneFn) => {
        await simulateMobileViewport()

        expect(await elementExists(`${PATTERN_PANEL}.open`))
            .toBeTruthy()

        await selectTestPattern()

        expect(await elementExists(`${PATTERN_PANEL}.closed`))
            .toBeTruthy()

        await simulateDesktopViewport()

        const hamburger: ElementHandle = await findElement('#hamburger')
        await hamburger.click()

        done()
    })
})
