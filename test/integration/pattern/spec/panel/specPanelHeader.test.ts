import { elementExists, openSpecControlsIfNotOpen, refreshPage, selectSpecControlsPattern } from '../../../../support'

describe('spec panel header', (): void => {
    beforeEach(async (done: DoneFn): Promise<void> => {
        await refreshPage()
        await selectSpecControlsPattern()
        done()
    })

    describe('at the beginning', (): void => {
        it('the spec panel begins closed', async (done: DoneFn): Promise<void> => {
            expect(await elementExists('#spec-panel.closed'))
                .toBeTruthy('spec panel was not closed')

            done()
        })

        it('when the spec controls are closed, the sections, controls themselves, and reset button are not visible', async (done: DoneFn): Promise<void> => {
            expect(await elementExists('#spec-panel-body.closed'))
                .toBeTruthy('spec panel body was not closed')

            done()
        })
    })

    describe('after clicking the spec panel header', (): void => {
        beforeEach(async (done: DoneFn): Promise<void> => {
            await openSpecControlsIfNotOpen()
            done()
        })

        it('the spec panel opens', async (done: DoneFn): Promise<void> => {
            expect(await elementExists('#spec-panel.open'))
                .toBeTruthy('spec panel was not open')

            done()
        })

        it('the sections, controls themselves, and reset button become visible', async (done: DoneFn): Promise<void> => {
            expect(await elementExists('#spec-panel-body.open'))
                .toBeTruthy('spec panel body was not open')

            done()
        })
    })
})
