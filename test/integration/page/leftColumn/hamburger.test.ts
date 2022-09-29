import { clickElement, leftColumnIs, refreshPage } from '../../../support'

describe('hamburger', (): void => {
    it('collapses and expands the left column', async (): Promise<void> => {
        await refreshPage()
        await leftColumnIs('open')

        await clickElement('#hamburger')
        await leftColumnIs('closed')

        await clickElement('#hamburger')
        await leftColumnIs('open')
    })
})
