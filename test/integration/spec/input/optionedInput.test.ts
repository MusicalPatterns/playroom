import { SecretTestSelectors } from '../../../../src/indexForTest'
import {
    elementInnerText,
    OPTIONED_PROPERTY_TWO_KEY,
    refreshForSpecControlsTest,
    selectOption,
    SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_TWO_MODIFIED_VALUE,
} from '../../../support'

const modifyOptionedInput: () => Promise<void> =
    async (): Promise<void> => {
        await selectOption(
            `select#${OPTIONED_PROPERTY_TWO_KEY}`,
            SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_TWO_MODIFIED_VALUE,
        )
    }

const optionedInputIsModified: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${OPTIONED_PROPERTY_TWO_KEY} .${SecretTestSelectors.SUBMITTED_SPEC}`))
            .toBe(SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_TWO_MODIFIED_VALUE, 'optioned input was not modified')
    }

describe('optioned input', () => {
    describe('submitting', () => {
        beforeEach(async (done: DoneFn) => {
            await refreshForSpecControlsTest()
            done()
        })

        it('immediately submits when you modify it', async (done: DoneFn) => {
            await modifyOptionedInput()
            await optionedInputIsModified()

            done()
        })
    })
})
