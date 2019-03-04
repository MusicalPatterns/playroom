import { ElementHandle } from 'puppeteer'
import {
    findElement,
    leftColumnIs,
    refreshPage,
    selectTestPattern,
    simulateDesktopViewport,
    simulateMobileViewport,
} from '../../support'

const clickHamburger: () => Promise<void> =
    async (): Promise<void> => {
        const hamburger: ElementHandle = await findElement('#hamburger')
        await hamburger.click()
    }

describe('left column', () => {
    beforeEach(async (done: DoneFn) => {
        await refreshPage()
        done()
    })

    it('the hamburger collapses and expands the left column', async (done: DoneFn) => {
        await leftColumnIs('open')

        await clickHamburger()
        await leftColumnIs('closed')

        await clickHamburger()
        await leftColumnIs('open')

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

        it('collapses the left column when you select a pattern', async (done: DoneFn) => {
            await leftColumnIs('open')

            await selectTestPattern()
            await leftColumnIs('closed')

            done()
        })
    })
})
