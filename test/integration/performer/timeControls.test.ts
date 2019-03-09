import { elementExists, refreshPage } from '../../support'

describe('time controls', () => {
    it('are disabled if you have not yet selected a pattern', async (done: DoneFn) => {
        await refreshPage()
        expect(await elementExists(`#rewind:disabled`))
            .toBeTruthy('rewind was not disabled')
        expect(await elementExists(`#stop:disabled`))
            .toBeTruthy('stop was not disabled')
        expect(await elementExists(`#play:disabled`))
            .toBeTruthy('play was not disabled')

        done()
    })
})
