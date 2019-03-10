import { SecretTestSelector } from '../../../../src/indexForTest'
import {
    clickElement,
    elementInnerText,
    refreshForSpecControlsTest,
    SPEC_CONTROLS_PATTERN_TOGGLED_PROPERTY_MODIFIED_VALUE,
    TOGGLED_PROPERTY_KEY,
} from '../../../support'

const modifyToggledInput: () => Promise<void> =
    async (): Promise<void> => {
        await clickElement(`input#${TOGGLED_PROPERTY_KEY}`)
    }

const toggledInputIsModified: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${TOGGLED_PROPERTY_KEY}.${SecretTestSelector.SUBMITTED_SPEC}`))
            .toBe(`${SPEC_CONTROLS_PATTERN_TOGGLED_PROPERTY_MODIFIED_VALUE}`, 'toggled input was not modified')
    }

describe('toggled input', () => {
    describe('submitting', () => {
        beforeEach(async (done: DoneFn) => {
            await refreshForSpecControlsTest()
            done()
        })

        it('immediately submits when you modify', async (done: DoneFn) => {
            await modifyToggledInput()
            await toggledInputIsModified()

            done()
        })
    })
})
