import { sleep } from '@musical-patterns/utilities'
import {
    A_BIT_LONGER,
    clickElement,
    elementExists,
    elementInnerText,
    isPlaying,
    leftColumnIs,
    LONG_ENOUGH_FOR_TIME_TO_PASS,
    quickRefresh,
    refreshPage,
    selectAboutPageByClickingLogo,
    selectLongDurationPattern,
    selectSpecControlsPattern,
    simulateDesktopViewport,
    simulateMobileViewport,
    waitLongEnoughForAnimationToComplete,
} from '../../../support'
import { clickTimeControl } from '../../../support/time'

const selectAboutPageWithoutAlsoSimulatingDesktopViewport: () => Promise<void> =
    async (): Promise<void> => {
        await clickElement('#logo h1')
        await waitLongEnoughForAnimationToComplete()
    }

const selectAboutPageBySymbol: () => Promise<void> =
    async (): Promise<void> => {
        await clickElement('#logo svg')
        await waitLongEnoughForAnimationToComplete()
    }

const titleIs: (expectedTitle: string) => Promise<void> =
    async (expectedTitle: string): Promise<void> => {
        expect(await elementInnerText('#middle-plus-right-column h1'))
            .toBe(expectedTitle)
    }

describe('logo', (): void => {
    beforeEach(async (done: DoneFn): Promise<void> => {
        await quickRefresh()
        await selectSpecControlsPattern()

        done()
    })

    it('clicking the logo shows the about page', async (done: DoneFn): Promise<void> => {
        await selectAboutPageByClickingLogo()
        await titleIs('About')

        done()
    })

    it('clicking the logo completely removes the spec panel', async (done: DoneFn): Promise<void> => {
        await selectAboutPageByClickingLogo()
        expect(await elementExists('#spec-panel'))
            .toBeFalsy('spec panel was still shown')

        done()
    })

    it('clicking the logo hides the performer panel', async (done: DoneFn): Promise<void> => {
        await selectAboutPageByClickingLogo()
        expect(await elementExists('#performer-panel.closed'))
            .toBeTruthy('performer panel was not hidden')

        done()
    })

    it('clicking the logo hides the right column', async (done: DoneFn): Promise<void> => {
        await selectAboutPageByClickingLogo()
        expect(await elementExists('#middle-plus-right-column.right-column-closed'))
            .toBeTruthy('right column was not hidden')

        done()
    })

    it('no longer shows the about page if you select a pattern from the list after clicking the logo', async (done: DoneFn): Promise<void> => {
        await selectAboutPageByClickingLogo()

        await selectSpecControlsPattern()
        await titleIs('Playroom Test Spec Controls')

        done()
    })

    describe('when the viewport is smaller than 1000px wide', (): void => {
        beforeEach(async (done: DoneFn): Promise<void> => {
            await refreshPage()
            await simulateMobileViewport()

            done()
        })

        afterEach(async (done: DoneFn): Promise<void> => {
            await simulateDesktopViewport()
            await clickElement('#hamburger')

            done()
        })

        it('collapses the left column when you click the logo', async (done: DoneFn): Promise<void> => {
            await leftColumnIs('open')

            await selectAboutPageWithoutAlsoSimulatingDesktopViewport()
            await leftColumnIs('closed')

            done()
        })
    })

    it('can also access the about page by clicking on the symbol in the logo', async (done: DoneFn): Promise<void> => {
        await selectAboutPageBySymbol()
        await titleIs('About')

        done()
    })

    describe('when a pattern is playing', (): void => {
        beforeEach(async (done: DoneFn): Promise<void> => {
            await quickRefresh()
            await selectLongDurationPattern()
            await clickTimeControl('play')
            await sleep(LONG_ENOUGH_FOR_TIME_TO_PASS)

            done()
        })

        afterEach(async (done: DoneFn): Promise<void> => {
            if (await elementExists('#pause')) {
                await clickTimeControl('pause')
            }
            done()
        })

        it('when you navigate to the about page, keeps playing in the background', async (done: DoneFn): Promise<void> => {
            await sleep(A_BIT_LONGER)
            await selectAboutPageByClickingLogo()

            await isPlaying()

            done()
        })
    })
})
