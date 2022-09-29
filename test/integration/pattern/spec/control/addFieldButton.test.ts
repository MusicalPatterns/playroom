import { ElementHandle } from 'puppeteer'
import { FieldValidityClassName, SecretTestSelector } from '../../../../../src/indexForTest'
import {
    ARRAYED_SPEC_KEY,
    ARRAYED_SPEC_WITH_INITIAL_FIELD_VALUE_KEY,
    clickAddFieldButton,
    clickElement,
    clickRemoveFieldButton,
    elementAttribute,
    elementCount,
    elementExists,
    elementInnerText,
    findElement,
    noInvalidMessagesAreShown,
    refreshForSpecControlsTest,
    SPEC_CONTROLS_PATTERN_ARRAYED_SPEC_WITH_INITIAL_FIELD_VALUE_INITIAL_FIELD_VALUE,
    SPEC_CONTROLS_PATTERN_ARRAYED_SPEC_WITH_INITIAL_FIELD_VALUE_INITIAL_VALUE,
    VALID_TEST_MODIFICATION,
} from '../../../../support'

const clickAddForTheArrayedSpecControlWithTheInitialFieldValue: () => Promise<void> =
    async (): Promise<void> => {
        await clickElement(`#${ARRAYED_SPEC_WITH_INITIAL_FIELD_VALUE_KEY} .add-field`)
    }

const thereIsAnAdditionalField: (originalFieldCount: number) => Promise<void> =
    async (originalFieldCount: number): Promise<void> => {
        const updatedFieldCount: number = await elementCount(`#${ARRAYED_SPEC_KEY} input[type=number]`)
        expect(updatedFieldCount)
            .toBe(
                originalFieldCount + 1,
                `there was not an additional field; original field count was ${originalFieldCount} and updated was ${updatedFieldCount}`,
            )
    }

const thereIsAnAdditionalFieldForTheArrayedSpecControlWithTheInitialFieldValue: (originalFieldCount: number) => Promise<void> =
    async (originalFieldCount: number): Promise<void> => {
        const updatedFieldCount: number = await elementCount(`#${ARRAYED_SPEC_WITH_INITIAL_FIELD_VALUE_KEY} input[type=range]`)
        expect(updatedFieldCount)
            .toBe(
                originalFieldCount + 1,
                `there was not an additional field; original field count was ${originalFieldCount} and updated was ${updatedFieldCount}`,
            )
    }

const andTheNewFieldHasTheNextIdAfterTheOthers: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`#${ARRAYED_SPEC_KEY}-5`))
            .toBeTruthy('the new field did not have the id after the others')
    }

const andTheNewFieldHasTheNextIdAfterTheOthersForTheArrayedSpecControlWithTheInitialFieldValue: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`#${ARRAYED_SPEC_WITH_INITIAL_FIELD_VALUE_KEY}-3`))
            .toBeTruthy('the new field did not have the id after the others')
    }

const newFieldExistsButHasNotBeenSubmitted: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${ARRAYED_SPEC_KEY}-5.${SecretTestSelector.SUBMITTED_SPEC}`))
            .toBe('', 'the new field was submitted')
    }

const andTheOtherNewFieldExistsButHasNotBeenSubmitted: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${ARRAYED_SPEC_KEY}-6.${SecretTestSelector.SUBMITTED_SPEC}`))
            .toBe('', 'the other new field was submitted')
    }

const modifyNewField: () => Promise<void> =
    async (): Promise<void> => {
        const newField: ElementHandle = await findElement(`#${ARRAYED_SPEC_KEY}-5 input[type=number]`)
        await newField.type(VALID_TEST_MODIFICATION)
    }

const invalidateNewField: () => Promise<void> =
    async (): Promise<void> => {
        const newField: ElementHandle = await findElement(`#${ARRAYED_SPEC_KEY}-5 input[type=number]`)
        await newField.type('3e')
    }

const newFieldHasBeenSubmitted: () => Promise<void> =
    async (): Promise<void> => {
        const updatedFieldValue: string = await elementInnerText(
            `#${ARRAYED_SPEC_KEY}-5.${SecretTestSelector.SUBMITTED_SPEC}`,
        )
        expect(updatedFieldValue)
            .toBe(VALID_TEST_MODIFICATION, `the new field was not submitted`)
    }

const modifyTheFirstOfTheTwoNewFields: () => Promise<void> =
    async (): Promise<void> => {
        await modifyNewField()
    }

const modifyTheSecondOfTheTwoNewFields: () => Promise<void> =
    async (): Promise<void> => {
        const newField: ElementHandle = await findElement(`#${ARRAYED_SPEC_KEY}-6 input[type=number]`)
        await newField.type(VALID_TEST_MODIFICATION)
    }

const theSecondOfTheTwoNewFieldsTheOneYouModifiedIsValidWhileTheFirstOfTheTwoNewFieldsIsBrieflyInvalid: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`input[type=number]#${ARRAYED_SPEC_KEY}-5.${FieldValidityClassName.INVALID}`))
            .toBeTruthy('the first new field was not invalid')
        expect(await elementExists(`input[type=number]#${ARRAYED_SPEC_KEY}-6.${FieldValidityClassName.VALID}`))
            .toBeTruthy('the second new field was not valid')
    }

const theFirstOfTheTwoNewFieldsTheOneYouModifiedIsValidWhileTheSecondOfTheTwoNewFieldsIsBrieflyInvalid: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`input[type=number]#${ARRAYED_SPEC_KEY}-5.${FieldValidityClassName.VALID}`))
            .toBeTruthy('the first new field was not valid')
        expect(await elementExists(`input[type=number]#${ARRAYED_SPEC_KEY}-6.${FieldValidityClassName.INVALID}`))
            .toBeTruthy('the second new field was not invalid')
    }

const bothNewFieldsAreValidAndSubmitted: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`input[type=number]#${ARRAYED_SPEC_KEY}-5.${FieldValidityClassName.VALID}`))
            .toBeTruthy('first new field was not valid')
        expect(await elementExists(`input[type=number]#${ARRAYED_SPEC_KEY}-6.${FieldValidityClassName.VALID}`))
            .toBeTruthy('second new field was not valid')
        expect(await elementInnerText(`#${ARRAYED_SPEC_KEY}-5.${SecretTestSelector.SUBMITTED_SPEC}`))
            .toBe(VALID_TEST_MODIFICATION, 'first new field was not submitted')
        expect(await elementInnerText(`#${ARRAYED_SPEC_KEY}-6.${SecretTestSelector.SUBMITTED_SPEC}`))
            .toBe(VALID_TEST_MODIFICATION, 'second new field was not submitted')
    }

const theSubmittedValueForTheArrayedSpecControlWithTheInitialFieldValueAsAWholeIsInItsInitialState: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(
            `#${ARRAYED_SPEC_WITH_INITIAL_FIELD_VALUE_KEY}.${SecretTestSelector.SUBMITTED_SPEC}`,
        ))
            .toBe(JSON.stringify(SPEC_CONTROLS_PATTERN_ARRAYED_SPEC_WITH_INITIAL_FIELD_VALUE_INITIAL_VALUE))
    }

const theSubmittedValueForTheArrayedSpecControlWithTheInitialFieldValueAsAWholeHasANewElementAtTheEndAndItHasTheInitialFieldValue: () => Promise<void> =
    async (): Promise<void> => {
        const submittedValueForTheArrayedSpecControlWithTheInitialFieldValueAsAWhole: string = await elementInnerText(
            `#${ARRAYED_SPEC_WITH_INITIAL_FIELD_VALUE_KEY}.${SecretTestSelector.SUBMITTED_SPEC}`,
        )
        expect(submittedValueForTheArrayedSpecControlWithTheInitialFieldValueAsAWhole)
            .toBe(
                JSON.stringify(
                    SPEC_CONTROLS_PATTERN_ARRAYED_SPEC_WITH_INITIAL_FIELD_VALUE_INITIAL_VALUE.concat([
                        SPEC_CONTROLS_PATTERN_ARRAYED_SPEC_WITH_INITIAL_FIELD_VALUE_INITIAL_FIELD_VALUE,
                    ]),
                ),
                `the submitted value for the arrayed spec control with the initial element value as a whole \
                did not have a new element at the end with the initial element value`,
            )
    }

const addFieldButtonIsDisabled: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`#${ARRAYED_SPEC_KEY} .add-field:disabled`))
            .toBeTruthy('add field button was not disabled')
    }

const addFieldButtonHasHoverTextExplainingArrayedConstraintMaxLengthHasBeenReached: () => Promise<void> =
    async (): Promise<void> => {
        const addFieldButtonHoverText: string = await elementAttribute(`#${ARRAYED_SPEC_KEY} .add-field:disabled`, 'title') as string
        expect(addFieldButtonHoverText)
            .toBe('This arrayed spec control has a maximum length of 7.')
    }

describe('add field button', (): void => {
    beforeEach(async (): Promise<void> => {
        await refreshForSpecControlsTest()
    })

    describe('for arrayed spec controls with no initial element value', (): void => {
        it('clicking the add field button displays a new blank field at the end of the arrayed spec control', async (): Promise<void> => {
            const originalFieldCount: number = await elementCount(`#${ARRAYED_SPEC_KEY} input[type=number]`)

            await clickAddFieldButton()
            await thereIsAnAdditionalField(originalFieldCount)
            await andTheNewFieldHasTheNextIdAfterTheOthers()
        })

        it('does not submit the new field until you add something valid to it', async (): Promise<void> => {
            await clickAddFieldButton()
            await newFieldExistsButHasNotBeenSubmitted()

            await modifyNewField()
            await newFieldHasBeenSubmitted()
        })

        describe('adding two fields at once', (): void => {
            beforeEach(async (): Promise<void> => {
                await clickAddFieldButton()
                await clickAddFieldButton()
            })

            it('lets you do it', async (): Promise<void> => {
                await newFieldExistsButHasNotBeenSubmitted()
                await andTheOtherNewFieldExistsButHasNotBeenSubmitted()
            })

            it('does not show invalid messages right away', async (): Promise<void> => {
                await noInvalidMessagesAreShown()
            })

            it('lets you modify the first new field before you modify the first', async (): Promise<void> => {
                await modifyTheSecondOfTheTwoNewFields()
                await theSecondOfTheTwoNewFieldsTheOneYouModifiedIsValidWhileTheFirstOfTheTwoNewFieldsIsBrieflyInvalid()
                await newFieldExistsButHasNotBeenSubmitted()
                await andTheOtherNewFieldExistsButHasNotBeenSubmitted()

                await modifyTheFirstOfTheTwoNewFields()
                await bothNewFieldsAreValidAndSubmitted()
            })

            it('lets you modify the first new field before you modify the second', async (): Promise<void> => {
                await modifyTheFirstOfTheTwoNewFields()
                await theFirstOfTheTwoNewFieldsTheOneYouModifiedIsValidWhileTheSecondOfTheTwoNewFieldsIsBrieflyInvalid()
                await newFieldExistsButHasNotBeenSubmitted()
                await andTheOtherNewFieldExistsButHasNotBeenSubmitted()

                await modifyTheSecondOfTheTwoNewFields()
                await bothNewFieldsAreValidAndSubmitted()
            })
        })

        it('does not start out with an invalid message if had existed before with an invalid message then was removed', async (): Promise<void> => {
            await clickAddFieldButton()
            await invalidateNewField()
            await clickRemoveFieldButton()
            await clickAddFieldButton()
            await noInvalidMessagesAreShown()
        })
    })

    describe('for arrayed spec controls with an initial field value', (): void => {
        it('clicking the add field button displays a new field at the end of the arrayed spec control with that initial value, even if it is zero', async (): Promise<void> => {
            const originalFieldCount: number = await elementCount(`#${ARRAYED_SPEC_WITH_INITIAL_FIELD_VALUE_KEY} input[type=range]`)

            await clickAddForTheArrayedSpecControlWithTheInitialFieldValue()
            await thereIsAnAdditionalFieldForTheArrayedSpecControlWithTheInitialFieldValue(originalFieldCount)
            await andTheNewFieldHasTheNextIdAfterTheOthersForTheArrayedSpecControlWithTheInitialFieldValue()
        })

        it('immediately submits the arrayed spec control with the new field with the initial value added to the end', async (): Promise<void> => {
            await theSubmittedValueForTheArrayedSpecControlWithTheInitialFieldValueAsAWholeIsInItsInitialState()

            await clickAddForTheArrayedSpecControlWithTheInitialFieldValue()
            await theSubmittedValueForTheArrayedSpecControlWithTheInitialFieldValueAsAWholeHasANewElementAtTheEndAndItHasTheInitialFieldValue()
        })
    })

    it('does not allow you to add elements past the maximum length of the arrayed constraint', async (): Promise<void> => {
        await clickAddFieldButton()
        await clickAddFieldButton()
        await addFieldButtonIsDisabled()
        await addFieldButtonHasHoverTextExplainingArrayedConstraintMaxLengthHasBeenReached()
    })
})
