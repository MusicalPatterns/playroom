import { clickElement, findElement } from 'puppet-strings'
import { testGlobals } from '../../setup'
import { elementExists, elementInnerText, refresh, refreshWithTestPatternSelected } from '../../support'

describe('immersive audio', () => {
    it('starts out disabled', async done => {
        await refresh()
        expect(await elementExists('#toggle-immersive-audio:disabled'))
            .toBeTruthy()

        done()
    })

    describe('after selecting a pattern', () => {
        beforeEach(async done => {
            await refreshWithTestPatternSelected()
            done()
        })

        it('starts outside of immersive audio', async done => {
            expect(await elementInnerText('#toggle-immersive-audio'))
                .toBe('enter immersive audio')

            done()
        })

        it('changes the button to exit after entering', async done => {
            const toggleImmersiveAudioButton = await findElement(testGlobals.tab, '#toggle-immersive-audio')
            await clickElement(toggleImmersiveAudioButton)

            expect(await elementInnerText('#toggle-immersive-audio'))
                .toBe('exit immersive audio')

            done()
        })
    })
})
