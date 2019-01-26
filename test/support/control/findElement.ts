import { ElementHandle } from 'puppeteer'
import { testGlobals } from '../../setup'

const findElement: (selector: string) => Promise<ElementHandle> =
    async (selector: string): Promise<ElementHandle> =>
        testGlobals.page.waitForSelector(selector)

export {
    findElement,
}
