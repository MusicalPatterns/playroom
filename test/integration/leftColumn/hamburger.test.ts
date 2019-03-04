import { ElementHandle } from 'puppeteer'
import { findElement, leftColumnIs, refreshPage } from '../../support'

const clickHamburger: () => Promise<void> =
    async (): Promise<void> => {
        const hamburger: ElementHandle = await findElement('#hamburger')
        await hamburger.click()
    }

describe('left column', () => {
    beforeEach(async (done: DoneFn) => {
        await refreshPage()
        done()
    })

    it('the hamburger collapses and expands the left column', async (done: DoneFn) => {
        await leftColumnIs('open')

        await clickHamburger()
        await leftColumnIs('closed')

        await clickHamburger()
        await leftColumnIs('open')

        done()
    })
})
