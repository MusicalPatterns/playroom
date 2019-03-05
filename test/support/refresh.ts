import { page } from '../setup'
import { APP_URL } from './constants'
import { simulateDesktopViewport } from './generic'
import { selectOtherTestPattern, selectTestPattern } from './selectTestPattern'

const refreshPage: () => Promise<void> =
    async (): Promise<void> => {
        await page.goto(APP_URL)
        await simulateDesktopViewport()
    }

const resetSpecByTogglingToOtherPatternThenBackToTestPattern: () => Promise<void> =
    async (): Promise<void> => {
        await simulateDesktopViewport()
        await selectOtherTestPattern()
        await selectTestPattern()
    }

export {
    refreshPage,
    resetSpecByTogglingToOtherPatternThenBackToTestPattern,
}
