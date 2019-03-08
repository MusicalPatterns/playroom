import {
    clickElement,
    elementExists,
    elementInnerText,
    leftColumnIs,
    quickRefresh,
    selectAboutPage,
    selectSpecControlsPattern,
    simulateDesktopViewport,
    simulateMobileViewport,
    waitLongEnoughForAnimationToComplete,
} from '../../support'

const selectAboutPageWithoutAlsoSimulatingDesktopViewport: () => Promise<void> =
    async (): Promise<void> => {
        await clickElement('#title h1')
        await waitLongEnoughForAnimationToComplete()
    }

const selectAboutPageBySymbol: () => Promise<void> =
    async (): Promise<void> => {
        await clickElement('#title svg')
        await waitLongEnoughForAnimationToComplete()
    }

const titleIs: (expectedTitle: string) => Promise<void> =
    async (expectedTitle: string): Promise<void> => {
        expect(await elementInnerText('#middle-plus-right-column h1'))
            .toBe(expectedTitle)
    }

describe('about page', () => {
    beforeEach(async (done: DoneFn) => {
        await quickRefresh()
        await selectSpecControlsPattern()

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
            .toBeFalsy('spec panel was still shown')

        done()
    })

    it('hides the performer panel', async (done: DoneFn) => {
        await selectAboutPage()
        expect(await elementExists('#performer-panel.closed'))
            .toBeTruthy('performer panel was not hidden')

        done()
    })

    it('hides the right column', async (done: DoneFn) => {
        await selectAboutPage()
        expect(await elementExists('#middle-plus-right-column.right-column-closed'))
            .toBeTruthy('right column was not hidden')

        done()
    })

    it('no longer shows the about page after you select a pattern from the list', async (done: DoneFn) => {
        await selectAboutPage()

        await selectSpecControlsPattern()
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
            await clickElement('#hamburger')

            done()
        })

        it('collapses the left column when you select a pattern', async (done: DoneFn) => {
            await leftColumnIs('open')

            await selectAboutPageWithoutAlsoSimulatingDesktopViewport()
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
