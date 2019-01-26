import { ElementHandle } from 'puppeteer'
import { page } from '../../setup'
import { DEFAULT_VIEWPORT_HEIGHT, DEFAULT_VIEWPORT_WIDTH, elementExists, findElement, selectTestPattern } from '../../support'

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
        await page.setViewport({ width: 800, height: DEFAULT_VIEWPORT_HEIGHT })

        expect(await elementExists('#pattern-panel.open'))
            .toBeTruthy()

        await selectTestPattern()

        expect(await elementExists('#pattern-panel.closed'))
            .toBeTruthy()

        await page.setViewport({ width: DEFAULT_VIEWPORT_WIDTH, height: DEFAULT_VIEWPORT_HEIGHT })
        const hamburger: ElementHandle = await findElement('#hamburger')
        await hamburger.click()

        done()
    })
})
