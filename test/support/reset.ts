import { ElementHandle } from 'puppeteer'
import { findElement } from './generic'

const reset: () => Promise<void> =
    async (): Promise<void> => {
        const resetButton: ElementHandle = await findElement('button#reset')
        await resetButton.click()
    }

export {
    reset,
}
