import { ElementHandle } from 'puppeteer'
import {
    elementExists,
    findElement,
    refreshPage,
    selectTestPattern,
    simulateDesktopViewport,
    simulateMobileViewport,
} from '../../support'

const sidePanelIs: (openOrClosed: string) => Promise<void> =
    async (openOrClosed: string): Promise<void> => {
        expect(await elementExists(`${SIDE_PANEL}.${openOrClosed}`))
            .toBeTruthy()
    }

const clickHamburger: () => Promise<void> =
    async (): Promise<void> => {
        const hamburger: ElementHandle = await findElement('#hamburger')
        await hamburger.click()
    }

const SIDE_PANEL: string = '#side-panel'

describe('side panel', () => {
    beforeEach(async (done: DoneFn) => {
        await refreshPage()
        done()
    })

    it('the hamburger collapses and expands the side panel', async (done: DoneFn) => {
        await sidePanelIs('open')

        await clickHamburger()
        await sidePanelIs('closed')

        await clickHamburger()
        await sidePanelIs('open')

        done()
    })

    describe('when the viewport is smaller than 1000px wide', () => {
        beforeEach(async (done: DoneFn) => {
            await simulateMobileViewport()

            done()
        })

        afterEach(async (done: DoneFn) => {
            await simulateDesktopViewport()

            done()
        })

        it('collapses the side panel when you select a pattern', async (done: DoneFn) => {
            await sidePanelIs('open')

            await selectTestPattern()
            await sidePanelIs('closed')

            done()
        })
    })
})
