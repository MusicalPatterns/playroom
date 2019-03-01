import { elementExists, openSpecControlsIfNotOpen, refreshPage, resetSpecByTogglingToOtherPatternThenBackToTestPattern } from '../../support'

describe('expanding and collapsing spec controls', () => {
    beforeEach(async (done: DoneFn) => {
        await refreshPage()
        await resetSpecByTogglingToOtherPatternThenBackToTestPattern()
        done()
    })

    it('the controls begin closed', async (done: DoneFn) => {
        expect(await elementExists('#spec-panel.closed'))
            .toBeTruthy()

        done()
    })

    it('when the controls are closed, the sections, controls themselves, and reset button are not visible', async (done: DoneFn) => {
        expect(await elementExists('#spec-panel-body.closed'))
            .toBeTruthy()

        done()
    })

    describe('after clicking the caret', () => {
        beforeEach(async (done: DoneFn) => {
            await openSpecControlsIfNotOpen()
            done()
        })

        it('the controls open', async (done: DoneFn) => {
            expect(await elementExists('#spec-panel.open'))
                .toBeTruthy()

            done()
        })

        it('the sections, controls themselves, and reset button are visible', async (done: DoneFn) => {
            expect(await elementExists('#spec-panel-body.open'))
                .toBeTruthy()

            done()
        })
    })
})
