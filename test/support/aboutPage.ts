import { clickElement, simulateDesktopViewport } from './generic'
import { waitLongEnoughForAnimationToComplete } from './wait'

const selectAboutPageByClickingLogo: () => Promise<void> =
    async (): Promise<void> => {
        await simulateDesktopViewport()
        await clickElement('#logo h1')
        await waitLongEnoughForAnimationToComplete()
    }

export {
    selectAboutPageByClickingLogo,
}
