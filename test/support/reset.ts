import { ElementHandle } from 'puppeteer'
import { findElement } from './generic'

const reset: () => Promise<void> =
    async (): Promise<void> => {
        const resetButton: ElementHandle = await findElement('#reset')
        await resetButton.click()
    }

export {
    reset,
}
