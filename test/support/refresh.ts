import { page } from '../setup'
import { selectAboutPageByClickingTitle } from './aboutPage'
import { openSpecControlsIfNotOpen } from './caret'
import { APP_URL } from './constants'
import { simulateDesktopViewport } from './generic'
import { selectSpecControlsPattern } from './selectPattern'

const refreshPage: () => Promise<void> =
    async (): Promise<void> => {
        await page.goto(APP_URL)
        await simulateDesktopViewport()
    }

const quickRefresh: () => Promise<void> =
    async (): Promise<void> => {
        await selectAboutPageByClickingTitle()
    }

const refreshForSpecControlsTest: () => Promise<void> =
    async (): Promise<void> => {
        await quickRefresh()
        await selectSpecControlsPattern()
        await openSpecControlsIfNotOpen()
    }

export {
    refreshPage,
    quickRefresh,
    refreshForSpecControlsTest,
}
