import { indexOfFinalElement } from '@musical-patterns/utilities'
import { SecretTestSelector } from '../../../../../src/indexForTest'
import {
    ARRAYED_SPEC_KEY,
    clickAddFieldButton,
    clickRemoveFieldButton,
    elementCount,
    elementExists,
    elementInnerText,
    noInvalidMessagesAreShown,
    refreshForSpecControlsTest,
    selectValidationPattern,
    SPEC_CONTROLS_PATTERN_ARRAYED_SPEC_INITIAL_VALUE,
} from '../../../../support'

const thereIsOneFewerField: (originalFieldCount: number) => Promise<void> =
    async (originalFieldCount: number): Promise<void> => {
        const updatedFieldCount: number = await elementCount(`#${ARRAYED_SPEC_KEY} input[type=number]`)
        expect(updatedFieldCount)
            .toBe(
                originalFieldCount - 1,
                `there was not one fewer field; original field count was ${originalFieldCount} and updated was ${updatedFieldCount}`,
            )
    }

const andTheIdThatIsMissingWasTheFinalId: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`#${ARRAYED_SPEC_KEY}-4`))
            .toBeFalsy('the id that was missing was not the final id')
    }

const theSubmittedValueForTheArrayedSpecControlAsAWholeIsInItsInitialState: () => Promise<void> =
    async (): Promise<void> => {
        const submittedValueForTheArrayedSpecControlAsAWhole: string = await elementInnerText(
            `#${ARRAYED_SPEC_KEY}.${SecretTestSelector.SUBMITTED_SPEC}`,
        )
        expect(submittedValueForTheArrayedSpecControlAsAWhole)
            .toBe(
                JSON.stringify(SPEC_CONTROLS_PATTERN_ARRAYED_SPEC_INITIAL_VALUE),
                `the submitted value for the arrayed spec control as a whole was not in its initial state`,
            )
    }

const theSubmittedValueForTheArrayedSpecControlAsAWholeIsInItsInitialStateJustWithItsFinalElementGone: () => Promise<void> =
    async (): Promise<void> => {
        const submittedValueForTheArrayedSpecControlAsAWhole: string = await elementInnerText(
            `#${ARRAYED_SPEC_KEY}.${SecretTestSelector.SUBMITTED_SPEC}`,
        )
        expect(submittedValueForTheArrayedSpecControlAsAWhole)
            .toBe(
                JSON.stringify(
                    SPEC_CONTROLS_PATTERN_ARRAYED_SPEC_INITIAL_VALUE.slice(
                        0,
                        indexOfFinalElement(SPEC_CONTROLS_PATTERN_ARRAYED_SPEC_INITIAL_VALUE),
                    ),
                ),
                `the submitted value for the arrayed spec control as a whole was not in its initial state just with its final element gone`,
            )
    }

const removeAllTheFields: () => Promise<void> =
    async (): Promise<void> => {
        await clickRemoveFieldButton()
        await clickRemoveFieldButton()
        await clickRemoveFieldButton()
        await clickRemoveFieldButton()
        await clickRemoveFieldButton()
    }

const removeFieldButtonIsDisabled: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`#${ARRAYED_SPEC_KEY} .remove-field:disabled`))
            .toBeTruthy('remove field button was not disabled')
    }

const everyFieldHasAnInvalidMessage: () => Promise<void> =
    async (): Promise<void> => {
        const expectedInvalidMessage: string = 'arrays can only be odd in length, duoy'
        expect(await elementInnerText(`#${ARRAYED_SPEC_KEY}-0 .invalid-message`))
            .toBe(expectedInvalidMessage, `field 0 did not have an invalid message`)
        expect(await elementInnerText(`#${ARRAYED_SPEC_KEY}-1 .invalid-message`))
            .toBe(expectedInvalidMessage, `field 1 did not have an invalid message`)
        expect(await elementInnerText(`#${ARRAYED_SPEC_KEY}-2 .invalid-message`))
            .toBe(expectedInvalidMessage, `field 2 did not have an invalid message`)
        expect(await elementInnerText(`#${ARRAYED_SPEC_KEY}-3 .invalid-message`))
            .toBe(expectedInvalidMessage, `field 3 did not have an invalid message`)
    }

describe('remove field button', () => {
    beforeEach(async (done: DoneFn) => {
        await refreshForSpecControlsTest()
        done()
    })

    it('clicking the remove field button removes the final field from the arrayed spec control', async (done: DoneFn) => {
        const originalFieldCount: number = await elementCount(`#${ARRAYED_SPEC_KEY} input[type=number]`)

        await clickRemoveFieldButton()
        await thereIsOneFewerField(originalFieldCount)
        await andTheIdThatIsMissingWasTheFinalId()

        done()
    })

    it('removing the field immediately submits the modification to the arrayed spec control', async (done: DoneFn) => {
        await theSubmittedValueForTheArrayedSpecControlAsAWholeIsInItsInitialState()

        await clickRemoveFieldButton()
        await theSubmittedValueForTheArrayedSpecControlAsAWholeIsInItsInitialStateJustWithItsFinalElementGone()

        done()
    })

    it('removing the field does not show invalid messages if the removed element was not yet defined', async (done: DoneFn) => {
        await theSubmittedValueForTheArrayedSpecControlAsAWholeIsInItsInitialState()

        await clickAddFieldButton()
        await clickAddFieldButton()
        await clickRemoveFieldButton()
        await noInvalidMessagesAreShown()

        done()
    })

    it('disables the remove field button when there are no fields remaining in the arrayed spec control', async (done: DoneFn) => {
        await removeAllTheFields()
        await removeFieldButtonIsDisabled()

        done()
    })

    it('runs validation when removing an element', async (done: DoneFn) => {
        await selectValidationPattern()
        await clickRemoveFieldButton()
        await everyFieldHasAnInvalidMessage()

        done()
    })
})