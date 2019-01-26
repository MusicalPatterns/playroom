import { ElementHandle } from 'puppeteer'
import { elementExists, elementInnerText, findElement, refresh, refreshWithTestPatternSelected } from '../../support'

describe('immersive audio', () => {
    it('starts out disabled', async (done: DoneFn) => {
        await refresh()
        expect(await elementExists('#toggle-immersive-audio:disabled'))
            .toBeTruthy()

        done()
    })

    describe('after selecting a pattern', () => {
        beforeEach(async (done: DoneFn) => {
            await refreshWithTestPatternSelected()
            done()
        })

        it('starts outside of immersive audio', async (done: DoneFn) => {
            expect(await elementInnerText('#toggle-immersive-audio'))
                .toBe('enter immersive audio')

            done()
        })

        it('changes the button to exit after entering', async (done: DoneFn) => {
            const toggleImmersiveAudioButton: ElementHandle = await findElement('#toggle-immersive-audio')
            await toggleImmersiveAudioButton.click()

            expect(await elementInnerText('#toggle-immersive-audio'))
                .toBe('exit immersive audio')

            done()
        })
    })
})
