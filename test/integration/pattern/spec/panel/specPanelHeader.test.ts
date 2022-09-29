import { elementExists, openSpecControlsIfNotOpen, refreshPage, selectSpecControlsPattern } from '../../../../support'

describe('spec panel header', (): void => {
    beforeEach(async (): Promise<void> => {
        await refreshPage()
        await selectSpecControlsPattern()
    })

    describe('at the beginning', (): void => {
        it('the spec panel begins closed', async (): Promise<void> => {
            expect(await elementExists('#spec-panel.closed'))
                .toBeTruthy('spec panel was not closed')
        })

        it('when the spec controls are closed, the sections, controls themselves, and reset button are not visible', async (): Promise<void> => {
            expect(await elementExists('#spec-panel-body.closed'))
                .toBeTruthy('spec panel body was not closed')
        })
    })

    describe('after clicking the spec panel header', (): void => {
        beforeEach(async (): Promise<void> => {
            await openSpecControlsIfNotOpen()
        })

        it('the spec panel opens', async (): Promise<void> => {
            expect(await elementExists('#spec-panel.open'))
                .toBeTruthy('spec panel was not open')
        })

        it('the sections, controls themselves, and reset button become visible', async (): Promise<void> => {
            expect(await elementExists('#spec-panel-body.open'))
                .toBeTruthy('spec panel body was not open')
        })
    })
})
