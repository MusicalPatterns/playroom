import { ElementHandle } from 'puppeteer'
import { FieldValidityClassName, SecretTestSelectors } from '../../../../src/indexForTest'
import {
    ARRAYED_PROPERTY_KEY,
    ARRAYED_PROPERTY_WITH_INITIAL_FIELD_VALUE_KEY,
    clickAddFieldButton,
    clickElement,
    clickRemoveFieldButton,
    elementCount,
    elementExists,
    elementInnerText,
    findElement,
    noInvalidMessagesAreShown,
    refreshForSpecControlsTest,
    SPEC_CONTROLS_PATTERN_ARRAYED_PROPERTY_WITH_INITIAL_FIELD_VALUE_INITIAL_FIELD_VALUE,
    SPEC_CONTROLS_PATTERN_ARRAYED_PROPERTY_WITH_INITIAL_FIELD_VALUE_INITIAL_VALUE,
    VALID_TEST_MODIFICATION,
} from '../../../support'

const clickAddForTheArrayedSpecControlWithTheInitialFieldValue: () => Promise<void> =
    async (): Promise<void> => {
        await clickElement(`#${ARRAYED_PROPERTY_WITH_INITIAL_FIELD_VALUE_KEY} .add-field`)
    }

const thereIsAnAdditionalField: (originalFieldCount: number) => Promise<void> =
    async (originalFieldCount: number): Promise<void> => {
        const updatedFieldCount: number = await elementCount(`#${ARRAYED_PROPERTY_KEY} input[type=number]`)
        expect(updatedFieldCount)
            .toBe(
                originalFieldCount + 1,
                `there was not an additional field; original field count was ${originalFieldCount} and updated was ${updatedFieldCount}`,
            )
    }

const thereIsAnAdditionalFieldForTheArrayedSpecControlWithTheInitialFieldValue: (originalFieldCount: number) => Promise<void> =
    async (originalFieldCount: number): Promise<void> => {
        const updatedFieldCount: number = await elementCount(`#${ARRAYED_PROPERTY_WITH_INITIAL_FIELD_VALUE_KEY} input[type=range]`)
        expect(updatedFieldCount)
            .toBe(
                originalFieldCount + 1,
                `there was not an additional field; original field count was ${originalFieldCount} and updated was ${updatedFieldCount}`,
            )
    }

const andTheNewFieldHasTheNextIdAfterTheOthers: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`#${ARRAYED_PROPERTY_KEY}-5`))
            .toBeTruthy('the new field did not have the id after the others')
    }

const andTheNewFieldHasTheNextIdAfterTheOthersForTheArrayedSpecControlWithTheInitialFieldValue: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`#${ARRAYED_PROPERTY_WITH_INITIAL_FIELD_VALUE_KEY}-3`))
            .toBeTruthy('the new field did not have the id after the others')
    }

const newFieldExistsButHasNotBeenSubmitted: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${ARRAYED_PROPERTY_KEY}-5.${SecretTestSelectors.SUBMITTED_SPEC}`))
            .toBe('', 'the new field was submitted')
    }

const andTheOtherNewFieldExistsButHasNotBeenSubmitted: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${ARRAYED_PROPERTY_KEY}-6.${SecretTestSelectors.SUBMITTED_SPEC}`))
            .toBe('', 'the other new field was submitted')
    }

const modifyNewField: () => Promise<void> =
    async (): Promise<void> => {
        const newField: ElementHandle = await findElement(`#${ARRAYED_PROPERTY_KEY}-5 input[type=number]`)
        await newField.type(VALID_TEST_MODIFICATION)
    }

const invalidateNewField: () => Promise<void> =
    async (): Promise<void> => {
        const newField: ElementHandle = await findElement(`#${ARRAYED_PROPERTY_KEY}-5 input[type=number]`)
        await newField.type('3e')
    }

const newFieldHasBeenSubmitted: () => Promise<void> =
    async (): Promise<void> => {
        const updatedFieldValue: string = await elementInnerText(
            `#${ARRAYED_PROPERTY_KEY}-5.${SecretTestSelectors.SUBMITTED_SPEC}`,
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
        const newField: ElementHandle = await findElement(`#${ARRAYED_PROPERTY_KEY}-6 input[type=number]`)
        await newField.type(VALID_TEST_MODIFICATION)
    }

const theSecondOfTheTwoNewFieldsTheOneYouModifiedIsValidWhileTheFirstOfTheTwoNewFieldsIsBrieflyInvalid: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`input[type=number]#${ARRAYED_PROPERTY_KEY}-5.${FieldValidityClassName.INVALID}`))
            .toBeTruthy('the first new field was not invalid')
        expect(await elementExists(`input[type=number]#${ARRAYED_PROPERTY_KEY}-6.${FieldValidityClassName.VALID}`))
            .toBeTruthy('the second new field was not valid')
    }

const theFirstOfTheTwoNewFieldsTheOneYouModifiedIsValidWhileTheSecondOfTheTwoNewFieldsIsBrieflyInvalid: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`input[type=number]#${ARRAYED_PROPERTY_KEY}-5.${FieldValidityClassName.VALID}`))
            .toBeTruthy('the first new field was not valid')
        expect(await elementExists(`input[type=number]#${ARRAYED_PROPERTY_KEY}-6.${FieldValidityClassName.INVALID}`))
            .toBeTruthy('the second new field was not invalid')
    }

const bothNewFieldsAreValidAndSubmitted: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`input[type=number]#${ARRAYED_PROPERTY_KEY}-5.${FieldValidityClassName.VALID}`))
            .toBeTruthy('first new field was not valid')
        expect(await elementExists(`input[type=number]#${ARRAYED_PROPERTY_KEY}-6.${FieldValidityClassName.VALID}`))
            .toBeTruthy('second new field was not valid')
        expect(await elementInnerText(`#${ARRAYED_PROPERTY_KEY}-5.${SecretTestSelectors.SUBMITTED_SPEC}`))
            .toBe(VALID_TEST_MODIFICATION, 'first new field was not submitted')
        expect(await elementInnerText(`#${ARRAYED_PROPERTY_KEY}-6.${SecretTestSelectors.SUBMITTED_SPEC}`))
            .toBe(VALID_TEST_MODIFICATION, 'second new field was not submitted')
    }

const theSubmittedValueForTheArrayedSpecControlWithTheInitialFieldValueAsAWholeIsInItsInitialState: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(
            `#${ARRAYED_PROPERTY_WITH_INITIAL_FIELD_VALUE_KEY}.${SecretTestSelectors.SUBMITTED_SPEC}`,
        ))
            .toBe(JSON.stringify(SPEC_CONTROLS_PATTERN_ARRAYED_PROPERTY_WITH_INITIAL_FIELD_VALUE_INITIAL_VALUE))
    }

const theSubmittedValueForTheArrayedSpecControlWithTheInitialFieldValueAsAWholeHasANewElementAtTheEndAndItHasTheInitialFieldValue: () => Promise<void> =
    async (): Promise<void> => {
        const submittedValueForTheArrayedSpecControlWithTheInitialFieldValueAsAWhole: string = await elementInnerText(
            `#${ARRAYED_PROPERTY_WITH_INITIAL_FIELD_VALUE_KEY}.${SecretTestSelectors.SUBMITTED_SPEC}`,
        )
        expect(submittedValueForTheArrayedSpecControlWithTheInitialFieldValueAsAWhole)
            .toBe(
                JSON.stringify(
                    SPEC_CONTROLS_PATTERN_ARRAYED_PROPERTY_WITH_INITIAL_FIELD_VALUE_INITIAL_VALUE.concat([
                        SPEC_CONTROLS_PATTERN_ARRAYED_PROPERTY_WITH_INITIAL_FIELD_VALUE_INITIAL_FIELD_VALUE,
                    ]),
                ),
                `the submitted value for the arrayed spec control with the initial element value as a whole \
                did not have a new element at the end with the initial element value`,
            )
    }

describe('add field button', () => {
    beforeEach(async (done: DoneFn) => {
        await refreshForSpecControlsTest()
        done()
    })

    describe('for arrayed spec controls with no initial element value', () => {
        it('clicking the add field button displays a new blank field at the end of the arrayed spec control', async (done: DoneFn) => {
            const originalFieldCount: number = await elementCount(`#${ARRAYED_PROPERTY_KEY} input[type=number]`)

            await clickAddFieldButton()
            await thereIsAnAdditionalField(originalFieldCount)
            await andTheNewFieldHasTheNextIdAfterTheOthers()

            done()
        })

        it('does not submit the new field until you add something valid to it', async (done: DoneFn) => {
            await clickAddFieldButton()
            await newFieldExistsButHasNotBeenSubmitted()

            await modifyNewField()
            await newFieldHasBeenSubmitted()

            done()
        })

        describe('adding two fields at once', () => {
            beforeEach(async (done: DoneFn) => {
                await clickAddFieldButton()
                await clickAddFieldButton()

                done()
            })

            it('lets you do it', async (done: DoneFn) => {
                await newFieldExistsButHasNotBeenSubmitted()
                await andTheOtherNewFieldExistsButHasNotBeenSubmitted()

                done()
            })

            it('does not show invalid messages right away', async (done: DoneFn) => {
                await noInvalidMessagesAreShown()

                done()
            })

            it('lets you modify the first new field before you modify the first', async (done: DoneFn) => {
                await modifyTheSecondOfTheTwoNewFields()
                await theSecondOfTheTwoNewFieldsTheOneYouModifiedIsValidWhileTheFirstOfTheTwoNewFieldsIsBrieflyInvalid()
                await newFieldExistsButHasNotBeenSubmitted()
                await andTheOtherNewFieldExistsButHasNotBeenSubmitted()

                await modifyTheFirstOfTheTwoNewFields()
                await bothNewFieldsAreValidAndSubmitted()

                done()
            })

            it('lets you modify the first new field before you modify the second', async (done: DoneFn) => {
                await modifyTheFirstOfTheTwoNewFields()
                await theFirstOfTheTwoNewFieldsTheOneYouModifiedIsValidWhileTheSecondOfTheTwoNewFieldsIsBrieflyInvalid()
                await newFieldExistsButHasNotBeenSubmitted()
                await andTheOtherNewFieldExistsButHasNotBeenSubmitted()

                await modifyTheSecondOfTheTwoNewFields()
                await bothNewFieldsAreValidAndSubmitted()

                done()
            })
        })

        it('does not start out with an invalid message if had existed before with an invalid message then was removed', async (done: DoneFn) => {
            await clickAddFieldButton()
            await invalidateNewField()
            await clickRemoveFieldButton()
            await clickAddFieldButton()
            await noInvalidMessagesAreShown()

            done()
        })
    })

    describe('for arrayed spec controls with an initial element value', () => {
        it('clicking the add field button displays a new field at the end of the arrayed spec control with that initial value', async (done: DoneFn) => {
            const originalFieldCount: number = await elementCount(`#${ARRAYED_PROPERTY_WITH_INITIAL_FIELD_VALUE_KEY} input[type=range]`)

            await clickAddForTheArrayedSpecControlWithTheInitialFieldValue()
            await thereIsAnAdditionalFieldForTheArrayedSpecControlWithTheInitialFieldValue(originalFieldCount)
            await andTheNewFieldHasTheNextIdAfterTheOthersForTheArrayedSpecControlWithTheInitialFieldValue()

            done()
        })

        it('immediately submits the arrayed spec control with the new element with the initial value added to the end', async (done: DoneFn) => {
            await theSubmittedValueForTheArrayedSpecControlWithTheInitialFieldValueAsAWholeIsInItsInitialState()

            await clickAddForTheArrayedSpecControlWithTheInitialFieldValue()
            await theSubmittedValueForTheArrayedSpecControlWithTheInitialFieldValueAsAWholeHasANewElementAtTheEndAndItHasTheInitialFieldValue()

            done()
        })
    })
})
