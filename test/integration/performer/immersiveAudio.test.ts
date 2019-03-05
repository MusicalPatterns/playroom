import { ElementHandle } from 'puppeteer'
import {
    elementExists,
    elementInnerText,
    findElement,
    refreshPage,
    resetSpecByTogglingToOtherPatternThenBackToTestPattern,
} from '../../support'

const IMMERSIVE_AUDIO_TOGGLE: string = '#toggle-immersive-audio'

describe('immersive audio', () => {
    it('starts out not yet enabled', async (done: DoneFn) => {
        await refreshPage()
        expect(await elementExists('#toggle-immersive-audio:disabled'))
            .toBeTruthy('immersive audio was not disabled')

        done()
    })

    describe('after selecting a pattern', () => {
        beforeEach(async (done: DoneFn) => {
            await resetSpecByTogglingToOtherPatternThenBackToTestPattern()
            done()
        })

        it('starts outside of immersive audio', async (done: DoneFn) => {
            expect(await elementInnerText(IMMERSIVE_AUDIO_TOGGLE))
                .toBe('enter immersive audio', 'immersive audio was not shown to be enterable')

            done()
        })

        it('changes the button to exit after entering', async (done: DoneFn) => {
            const toggleImmersiveAudioButton: ElementHandle = await findElement(IMMERSIVE_AUDIO_TOGGLE)
            await toggleImmersiveAudioButton.click()

            expect(await elementInnerText(IMMERSIVE_AUDIO_TOGGLE))
                .toBe('exit immersive audio', 'immersive audio was not show to be exitable')

            done()
        })
    })
})
