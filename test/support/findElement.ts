import { ElementHandle } from 'puppeteer'
import { page } from '../setup'

const findElement: (selector: string) => Promise<ElementHandle> =
    async (selector: string): Promise<ElementHandle> =>
        page.waitForSelector(selector)

export {
    findElement,
}
