import { clickElement, leftColumnIs, refreshPage } from '../../../support'

describe('hamburger', (): void => {
    it('collapses and expands the left column', async (done: DoneFn): Promise<void> => {
        await refreshPage()
        await leftColumnIs('open')

        await clickElement('#hamburger')
        await leftColumnIs('closed')

        await clickElement('#hamburger')
        await leftColumnIs('open')

        done()
    })
})
