import {
    clickElement,
    elementExists,
    elementInnerText,
    quickRefresh,
    refreshPage,
    selectSpecControlsPattern,
} from '../../../support'

const IMMERSIVE_AUDIO_TOGGLE: string = '#toggle-immersive-audio'

describe('toggle immersive audio button', (): void => {
    it('starts out not yet enabled', async (done: DoneFn): Promise<void> => {
        await refreshPage()
        expect(await elementExists('#toggle-immersive-audio:disabled'))
            .toBeTruthy('toggle immersive audio button was not disabled')

        done()
    })

    describe('after selecting a pattern', (): void => {
        beforeEach(async (done: DoneFn): Promise<void> => {
            await quickRefresh()
            await selectSpecControlsPattern()
            done()
        })

        it('starts outside of immersive audio', async (done: DoneFn): Promise<void> => {
            expect(await elementInnerText(IMMERSIVE_AUDIO_TOGGLE))
                .toBe('enter immersive audio', 'immersive audio was not shown to be enterable')

            done()
        })

        it(`sets the button to read 'exit' after entering`, async (done: DoneFn): Promise<void> => {
            await clickElement(IMMERSIVE_AUDIO_TOGGLE)

            expect(await elementInnerText(IMMERSIVE_AUDIO_TOGGLE))
                .toBe('exit immersive audio', 'immersive audio was not show to be exitable')

            done()
        })
    })
})
