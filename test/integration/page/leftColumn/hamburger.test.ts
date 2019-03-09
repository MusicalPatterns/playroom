import { clickElement, leftColumnIs, refreshPage } from '../../../support'

describe('hamburger', () => {
    it('collapses and expands the left column', async (done: DoneFn) => {
        await refreshPage()
        await leftColumnIs('open')

        await clickElement('#hamburger')
        await leftColumnIs('closed')

        await clickElement('#hamburger')
        await leftColumnIs('open')

        done()
    })
})
