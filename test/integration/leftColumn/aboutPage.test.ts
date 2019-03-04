import { ElementHandle } from 'puppeteer'
import {
    elementExists,
    elementInnerText,
    findElement,
    leftColumnIs,
    refreshPage,
    selectTestPattern,
    simulateDesktopViewport,
    simulateMobileViewport,
} from '../../support'

const selectAboutPage: () => Promise<void> =
    async (): Promise<void> => {
        const title: ElementHandle = await findElement('#title h1')
        await title.click()
    }

const selectAboutPageBySymbol: () => Promise<void> =
    async (): Promise<void> => {
        const title: ElementHandle = await findElement('#title svg')
        await title.click()
    }

const titleIs: (expectedTitle: string) => Promise<void> =
    async (expectedTitle: string): Promise<void> => {
        expect(await elementInnerText('#middle-plus-right-columns h1'))
            .toBe(expectedTitle)
    }

describe('about page', () => {
    beforeEach(async (done: DoneFn) => {
        await refreshPage()

        done()
    })

    it('shows the about page', async (done: DoneFn) => {
        await selectAboutPage()
        await titleIs('About')

        done()
    })

    it('completely removes the spec panel', async (done: DoneFn) => {
        await selectAboutPage()
        expect(await elementExists('#spec-panel'))
            .toBeFalsy()

        done()
    })

    it('hides the performer panel', async (done: DoneFn) => {
        await selectAboutPage()
        expect(await elementExists('#performer-panel.closed'))
            .toBeTruthy()

        done()
    })

    it('hides the right column', async (done: DoneFn) => {
        await selectAboutPage()
        expect(await elementExists('#middle-plus-right-columns.right-column-closed'))
            .toBeTruthy()

        done()
    })

    it('no longer shows the about page after you select a pattern from the list', async (done: DoneFn) => {
        await selectAboutPage()

        await selectTestPattern()
        await titleIs('Playroom Test Spec Controls')

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

            await selectAboutPage()
            await leftColumnIs('closed')

            done()
        })
    })

    it('can also access the about page by clicking on the symbol in the title', async (done: DoneFn) => {
        await selectAboutPageBySymbol()
        await titleIs('About')

        done()
    })
})
