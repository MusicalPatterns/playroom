import { ElementHandle } from 'puppeteer'
import { findElement } from './findElement'

const loseFocus: (selector?: string) => Promise<void> =
    async (selector?: string): Promise<void> => {
        if (selector) {
            const element: ElementHandle = await findElement(selector)
            await element.click()
        }

        const anythingElse: ElementHandle = await findElement('h1')
        await anythingElse.click()
    }

export {
    loseFocus,
}
