import { SecretTestSelector } from '../../../../../src/indexForTest'
import {
    elementInnerText,
    OPTIONED_SPEC_TWO_KEY,
    refreshForSpecControlsTest,
    selectOption,
    SPEC_CONTROLS_PATTERN_OPTIONED_SPEC_TWO_MODIFIED_VALUE,
} from '../../../../support'

const modifyOptionedInput: () => Promise<void> =
    async (): Promise<void> => {
        await selectOption(
            `select#${OPTIONED_SPEC_TWO_KEY}`,
            SPEC_CONTROLS_PATTERN_OPTIONED_SPEC_TWO_MODIFIED_VALUE,
        )
    }

const optionedInputIsModified: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${OPTIONED_SPEC_TWO_KEY}.${SecretTestSelector.SUBMITTED_SPEC}`))
            .toBe(SPEC_CONTROLS_PATTERN_OPTIONED_SPEC_TWO_MODIFIED_VALUE, 'optioned input was not modified')
    }

describe('optioned input', (): void => {
    describe('submitting', (): void => {
        beforeEach(async (done: DoneFn): Promise<void> => {
            await refreshForSpecControlsTest()
            done()
        })

        it('immediately submits when you modify it', async (done: DoneFn): Promise<void> => {
            await modifyOptionedInput()
            await optionedInputIsModified()

            done()
        })
    })
})
