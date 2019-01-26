import { Response } from 'puppeteer'
import { testGlobals } from '../../setup'
import { APP_URL } from '../constants'
import { selectOtherTestPattern, selectTestPattern } from './selectTestPattern'

const refresh: () => Promise<Response | null> =
    async (): Promise<Response | null> =>
        testGlobals.page.goto(APP_URL)

const refreshWithTestPatternSelected: () => Promise<void> =
    async (): Promise<void> => {
        await selectOtherTestPattern()
        await selectTestPattern()
    }

export {
    refresh,
    refreshWithTestPatternSelected,
}
