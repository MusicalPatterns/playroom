import { clickElement, findElement } from 'puppet-strings'
import { elementExists, elementInnerText, sleep, standardTestReset } from '../../support'
import { testGlobals } from '../../setup'

describe('immersive audio', () => {
    it('starts out disabled', async done => {
        expect(elementExists('#toggle-immersive-audio:disabled'))
            .toBeTruthy()

        done()
    })

    describe('after selecting a pattern', () => {
        beforeEach(async done => {
            await standardTestReset()
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
