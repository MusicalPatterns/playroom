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
    beforeEach(async (): Promise<void> => {
        await quickRefresh()
        await selectSpecControlsPattern()
    })

    it('clicking the logo shows the about page', async (): Promise<void> => {
        await selectAboutPageByClickingLogo()
        await titleIs('About')
    })

    it('clicking the logo completely removes the spec panel', async (): Promise<void> => {
        await selectAboutPageByClickingLogo()
        expect(await elementExists('#spec-panel'))
            .toBeFalsy('spec panel was still shown')
    })

    it('clicking the logo hides the performer panel', async (): Promise<void> => {
        await selectAboutPageByClickingLogo()
        expect(await elementExists('#performer-panel.closed'))
            .toBeTruthy('performer panel was not hidden')
    })

    it('clicking the logo hides the right column', async (): Promise<void> => {
        await selectAboutPageByClickingLogo()
        expect(await elementExists('#middle-plus-right-column.right-column-closed'))
            .toBeTruthy('right column was not hidden')
    })

    it('no longer shows the about page if you select a pattern from the list after clicking the logo', async (): Promise<void> => {
        await selectAboutPageByClickingLogo()

        await selectSpecControlsPattern()
        await titleIs('Playroom Test Spec Controls')
    })

    describe('when the viewport is smaller than 1000px wide', (): void => {
        beforeEach(async (): Promise<void> => {
            await refreshPage()
            await simulateMobileViewport()
        })

        afterEach(async (): Promise<void> => {
            await simulateDesktopViewport()
            await clickElement('#hamburger')
        })

        it('collapses the left column when you click the logo', async (): Promise<void> => {
            await leftColumnIs('open')

            await selectAboutPageWithoutAlsoSimulatingDesktopViewport()
            await leftColumnIs('closed')
        })
    })

    it('can also access the about page by clicking on the symbol in the logo', async (): Promise<void> => {
        await selectAboutPageBySymbol()
        await titleIs('About')
    })

    describe('when a pattern is playing', (): void => {
        beforeEach(async (): Promise<void> => {
            await quickRefresh()
            await selectLongDurationPattern()
            await clickTimeControl('play')
            await sleep(LONG_ENOUGH_FOR_TIME_TO_PASS)
        })

        afterEach(async (): Promise<void> => {
            if (await elementExists('#pause')) {
                await clickTimeControl('pause')
            }
        })

        it('when you navigate to the about page, keeps playing in the background', async (): Promise<void> => {
            await sleep(A_BIT_LONGER)
            await selectAboutPageByClickingLogo()

            await isPlaying()
        })
    })
})
