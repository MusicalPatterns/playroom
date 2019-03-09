import { clickElement, simulateDesktopViewport } from './generic'
import { waitLongEnoughForAnimationToComplete } from './wait'

const selectAboutPageByClickingTitle: () => Promise<void> =
    async (): Promise<void> => {
        await simulateDesktopViewport()
        await clickElement('#title h1')
        await waitLongEnoughForAnimationToComplete()
    }

export {
    selectAboutPageByClickingTitle,
}
