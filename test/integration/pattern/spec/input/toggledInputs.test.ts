import { SecretTestSelector } from '../../../../../src/indexForTest'
import {
    clickElement,
    elementInnerText,
    refreshForSpecControlsTest,
    SPEC_CONTROLS_PATTERN_TOGGLED_SPEC_MODIFIED_VALUE,
    TOGGLED_SPEC_KEY,
} from '../../../../support'

const modifyToggledInput: () => Promise<void> =
    async (): Promise<void> => {
        await clickElement(`input#${TOGGLED_SPEC_KEY}`)
    }

const toggledInputIsModified: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${TOGGLED_SPEC_KEY}.${SecretTestSelector.SUBMITTED_SPEC}`))
            .toBe(`${SPEC_CONTROLS_PATTERN_TOGGLED_SPEC_MODIFIED_VALUE}`, 'toggled input was not modified')
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
