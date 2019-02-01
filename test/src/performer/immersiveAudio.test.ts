import { ElementHandle } from 'puppeteer'
import { elementExists, elementInnerText, findElement, refreshPage, refreshWithTestPatternSelected } from '../../support'

const IMMERSIVE_AUDIO_TOGGLE: string = '#toggle-immersive-audio'

describe('immersive audio', () => {
    it('starts out disabled', async (done: DoneFn) => {
        await refreshPage()
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
            expect(await elementInnerText(IMMERSIVE_AUDIO_TOGGLE))
                .toBe('enter immersive audio')

            done()
        })

        it('changes the button to exit after entering', async (done: DoneFn) => {
            const toggleImmersiveAudioButton: ElementHandle = await findElement(IMMERSIVE_AUDIO_TOGGLE)
            await toggleImmersiveAudioButton.click()

            expect(await elementInnerText(IMMERSIVE_AUDIO_TOGGLE))
                .toBe('exit immersive audio')

            done()
        })
    })
})
