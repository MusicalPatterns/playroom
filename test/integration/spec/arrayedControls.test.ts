import { indexOfLastElement } from '@musical-patterns/utilities'
import { ElementHandle } from 'puppeteer'
import { SecretSelectorsForTest, SpecControlStates } from '../../../src/indexForTest'
import {
    clickElement,
    elementCount,
    elementExists,
    elementInnerText,
    findElement,
    refreshForSpecControlsTest,
    SPEC_ARRAYED_PROPERTY_KEY,
    SPEC_ARRAYED_PROPERTY_WITH_INITIAL_ELEMENT_VALUE_KEY,
    SPEC_CONTROLS_PATTERN_ARRAYED_PROPERTY_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_ARRAYED_PROPERTY_WITH_INITIAL_ELEMENT_VALUE_INITIAL_ELEMENT_VALUE,
    SPEC_CONTROLS_PATTERN_ARRAYED_PROPERTY_WITH_INITIAL_ELEMENT_VALUE_INITIAL_VALUE,
    VALID_TEST_MODIFICATION,
} from '../../support'

const clickAdd: () => Promise<void> =
    async (): Promise<void> => {
        await clickElement(`#${SPEC_ARRAYED_PROPERTY_KEY} .add`)
    }

const clickAddForTheArrayedControlWithTheInitialElementValue: () => Promise<void> =
    async (): Promise<void> => {
        await clickElement(`#${SPEC_ARRAYED_PROPERTY_WITH_INITIAL_ELEMENT_VALUE_KEY} .add`)
    }

const clickRemove: () => Promise<void> =
    async (): Promise<void> => {
        await clickElement(`#${SPEC_ARRAYED_PROPERTY_KEY} .remove`)
    }

const thereIsAnAdditionalField: (originalFieldCount: number) => Promise<void> =
    async (originalFieldCount: number): Promise<void> => {
        const updatedFieldCount: number = await elementCount(`#${SPEC_ARRAYED_PROPERTY_KEY} input[type=number]`)
        expect(updatedFieldCount)
            .toBe(originalFieldCount + 1, `there was not an additional field; original field count was ${originalFieldCount} and updated was ${updatedFieldCount}`)
    }

const thereIsAnAdditionalFieldForTheArrayedControlWithTheInitialElementValue: (originalFieldCount: number) => Promise<void> =
    async (originalFieldCount: number): Promise<void> => {
        const updatedFieldCount: number = await elementCount(`#${SPEC_ARRAYED_PROPERTY_WITH_INITIAL_ELEMENT_VALUE_KEY} input[type=number]`)
        expect(updatedFieldCount)
            .toBe(originalFieldCount + 1, `there was not an additional field; original field count was ${originalFieldCount} and updated was ${updatedFieldCount}`)
    }

const thereIsOneFewerField: (originalFieldCount: number) => Promise<void> =
    async (originalFieldCount: number): Promise<void> => {
        const updatedFieldCount: number = await elementCount(`#${SPEC_ARRAYED_PROPERTY_KEY} input[type=number]`)
        expect(updatedFieldCount)
            .toBe(originalFieldCount - 1, `there was not one fewer field; original field count was ${originalFieldCount} and updated was ${updatedFieldCount}`)
    }

const andTheNewFieldHasTheNextIdAfterTheOthers: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`#${SPEC_ARRAYED_PROPERTY_KEY}-5`))
            .toBeTruthy('the new field did not have the id after the others')
    }

const andTheNewFieldHasTheNextIdAfterTheOthersForTheArrayedControlWithTheInitialElementValue: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`#${SPEC_ARRAYED_PROPERTY_WITH_INITIAL_ELEMENT_VALUE_KEY}-3`))
            .toBeTruthy('the new field did not have the id after the others')
    }

const andTheIdThatIsMissingWasTheLastId: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`#${SPEC_ARRAYED_PROPERTY_KEY}-4`))
            .toBeFalsy('the id that was missing was not the last id')
    }

const newFieldExistsButHasNotBeenSubmitted: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${SPEC_ARRAYED_PROPERTY_KEY}-5 .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
            .toBe('', 'the new field was submitted')
    }

const andTheOtherNewFieldExistsButHasNotBeenSubmitted: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${SPEC_ARRAYED_PROPERTY_KEY}-6 .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
            .toBe('', 'the other new field was submitted')
    }

const modifyNewField: () => Promise<void> =
    async (): Promise<void> => {
        const newControl: ElementHandle = await findElement(`#${SPEC_ARRAYED_PROPERTY_KEY}-5 input[type=number]`)
        await newControl.type(VALID_TEST_MODIFICATION)
    }

const invalidateNewField: () => Promise<void> =
    async (): Promise<void> => {
        const newControl: ElementHandle = await findElement(`#${SPEC_ARRAYED_PROPERTY_KEY}-5 input[type=number]`)
        await newControl.type('3e')
    }

const newFieldHasBeenSubmitted: () => Promise<void> =
    async (): Promise<void> => {
        const updatedFieldValue: string = await elementInnerText(`#${SPEC_ARRAYED_PROPERTY_KEY}-5 .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`)
        expect(updatedFieldValue)
            .toBe(VALID_TEST_MODIFICATION, `the new field was not submitted`)
    }

const modifyTheFirstOfTheTwoNewFields: () => Promise<void> =
    async (): Promise<void> => {
        await modifyNewField()
    }

const modifyTheSecondOfTheTwoNewFields: () => Promise<void> =
    async (): Promise<void> => {
        const newField: ElementHandle = await findElement(`#${SPEC_ARRAYED_PROPERTY_KEY}-6 input[type=number]`)
        await newField.type(VALID_TEST_MODIFICATION)
    }

const theSecondOfTheTwoNewFieldsTheOneYouModifiedIsValidWhileTheFirstOfTheTwoNewFieldsIsBrieflyInvalid: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`input[type=number]#${SPEC_ARRAYED_PROPERTY_KEY}-5.${SpecControlStates.INVALID}`))
            .toBeTruthy('the first new field was not invalid')
        expect(await elementExists(`input[type=number]#${SPEC_ARRAYED_PROPERTY_KEY}-6.${SpecControlStates.VALID}`))
            .toBeTruthy('the second new field was not valid')
    }

const theFirstOfTheTwoNewFieldsTheOneYouModifiedIsValidWhileTheSecondOfTheTwoNewFieldsIsBrieflyInvalid: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`input[type=number]#${SPEC_ARRAYED_PROPERTY_KEY}-5.${SpecControlStates.VALID}`))
            .toBeTruthy('the first new field was not valid')
        expect(await elementExists(`input[type=number]#${SPEC_ARRAYED_PROPERTY_KEY}-6.${SpecControlStates.INVALID}`))
            .toBeTruthy('the second new field was not invalid')
    }

const bothNewFieldsAreValidAndSubmitted: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`input[type=number]#${SPEC_ARRAYED_PROPERTY_KEY}-5.${SpecControlStates.VALID}`))
            .toBeTruthy('first new field was not valid')
        expect(await elementExists(`input[type=number]#${SPEC_ARRAYED_PROPERTY_KEY}-6.${SpecControlStates.VALID}`))
            .toBeTruthy('second new field was not valid')
        expect(await elementInnerText(`#${SPEC_ARRAYED_PROPERTY_KEY}-5 .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
            .toBe(VALID_TEST_MODIFICATION, 'first new field was not submitted')
        expect(await elementInnerText(`#${SPEC_ARRAYED_PROPERTY_KEY}-6 .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
            .toBe(VALID_TEST_MODIFICATION, 'second new field was not submitted')
    }

const theSubmittedValueForTheArrayedControlWithTheInitialElementValueAsAWholeIsInItsInitialState: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${SPEC_ARRAYED_PROPERTY_WITH_INITIAL_ELEMENT_VALUE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
            .toBe(JSON.stringify(SPEC_CONTROLS_PATTERN_ARRAYED_PROPERTY_WITH_INITIAL_ELEMENT_VALUE_INITIAL_VALUE))
    }

const theSubmittedValueForTheArrayedControlAsAWholeIsInItsInitialState: () => Promise<void> =
    async (): Promise<void> => {
        const submittedValueForTheArrayedControlAsAWhole: string = await elementInnerText(
            `#${SPEC_ARRAYED_PROPERTY_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`,
        )
        expect(submittedValueForTheArrayedControlAsAWhole)
            .toBe(
                JSON.stringify(SPEC_CONTROLS_PATTERN_ARRAYED_PROPERTY_INITIAL_VALUE),
                `the submitted value for the arrayed control as a whole was not in its initial state`,
            )
    }

const theSubmittedValueForTheArrayedControlWithTheInitialElementValueAsAWholeHasANewElementAtTheEndAndItHasTheInitialElementValue: () => Promise<void> =
    async (): Promise<void> => {
        const submittedValueForTheArrayedControlWithTheInitialElementValueAsAWhole: string = await elementInnerText(
            `#${SPEC_ARRAYED_PROPERTY_WITH_INITIAL_ELEMENT_VALUE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`,
        )
        expect(submittedValueForTheArrayedControlWithTheInitialElementValueAsAWhole)
            .toBe(
                JSON.stringify(
                    SPEC_CONTROLS_PATTERN_ARRAYED_PROPERTY_WITH_INITIAL_ELEMENT_VALUE_INITIAL_VALUE.concat([
                        SPEC_CONTROLS_PATTERN_ARRAYED_PROPERTY_WITH_INITIAL_ELEMENT_VALUE_INITIAL_ELEMENT_VALUE,
                    ]),
                ),
                `the submitted value for the arrayed control with the initial element value as a whole did not have a new element at the end with the initial element value`,
            )
    }

const theSubmittedValueForTheArrayedControlAsAWholeIsInItsInitialStateJustWithItsLastElementGone: () => Promise<void> =
    async (): Promise<void> => {
        const submittedValueForTheArrayedControlAsAWhole: string = await elementInnerText(
            `#${SPEC_ARRAYED_PROPERTY_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`,
        )
        expect(submittedValueForTheArrayedControlAsAWhole)
            .toBe(
                JSON.stringify(SPEC_CONTROLS_PATTERN_ARRAYED_PROPERTY_INITIAL_VALUE.slice(0, indexOfLastElement(SPEC_CONTROLS_PATTERN_ARRAYED_PROPERTY_INITIAL_VALUE))),
                `the submitted value for the arrayed control as a whole was not in its initial state just with its last element gone`,
            )
    }

const removeAllTheFields: () => Promise<void> =
    async (): Promise<void> => {
        await clickRemove()
        await clickRemove()
        await clickRemove()
        await clickRemove()
        await clickRemove()
    }

const removeIsDisabled: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`#${SPEC_ARRAYED_PROPERTY_KEY} .remove:disabled`))
            .toBeTruthy('remove was not disabled')
    }

const noInvalidMessagesAreShown: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`#${SPEC_ARRAYED_PROPERTY_KEY} .invalid-spec-message`))
            .toBeFalsy('at least one invalid message was shown')
    }

describe('arrayed controls', () => {
    beforeEach(async (done: DoneFn) => {
        await refreshForSpecControlsTest()
        done()
    })

    describe('adding', () => {
        describe('for arrayed controls with no initial element value', () => {
            it('clicking the add button displays a new blank field at the end of the arrayed control', async (done: DoneFn) => {
                const originalFieldCount: number = await elementCount(`#${SPEC_ARRAYED_PROPERTY_KEY} input[type=number]`)

                await clickAdd()
                await thereIsAnAdditionalField(originalFieldCount)
                await andTheNewFieldHasTheNextIdAfterTheOthers()

                done()
            })

            it('does not submit the new field until you add something valid to it', async (done: DoneFn) => {
                await clickAdd()
                await newFieldExistsButHasNotBeenSubmitted()

                await modifyNewField()
                await newFieldHasBeenSubmitted()

                done()
            })

            describe('adding two fields at once', () => {
                beforeEach(async (done: DoneFn) => {
                    await clickAdd()
                    await clickAdd()

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
                await clickAdd()
                await invalidateNewField()
                await clickRemove()
                await clickAdd()
                await noInvalidMessagesAreShown()

                done()
            })
        })

        describe('for arrayed controls with an initial element value', () => {
            it('clicking the add button displays a new field at the end of the arrayed control with that initial value', async (done: DoneFn) => {
                const originalFieldCount: number = await elementCount(`#${SPEC_ARRAYED_PROPERTY_WITH_INITIAL_ELEMENT_VALUE_KEY} input[type=number]`)

                await clickAddForTheArrayedControlWithTheInitialElementValue()
                await thereIsAnAdditionalFieldForTheArrayedControlWithTheInitialElementValue(originalFieldCount)
                await andTheNewFieldHasTheNextIdAfterTheOthersForTheArrayedControlWithTheInitialElementValue()

                done()
            })

            it('immediately submits the arrayed control with the new element with the initial value added to the end', async (done: DoneFn) => {
                await theSubmittedValueForTheArrayedControlWithTheInitialElementValueAsAWholeIsInItsInitialState()

                await clickAddForTheArrayedControlWithTheInitialElementValue()
                await theSubmittedValueForTheArrayedControlWithTheInitialElementValueAsAWholeHasANewElementAtTheEndAndItHasTheInitialElementValue()

                done()
            })
        })
    })

    describe('removing', () => {
        it('clicking the remove button removes the last field from the arrayed control', async (done: DoneFn) => {
            const originalFieldCount: number = await elementCount(`#${SPEC_ARRAYED_PROPERTY_KEY} input[type=number]`)

            await clickRemove()
            await thereIsOneFewerField(originalFieldCount)
            await andTheIdThatIsMissingWasTheLastId()

            done()
        })

        it('removing the field immediately submits the change to the arrayed control', async (done: DoneFn) => {
            await theSubmittedValueForTheArrayedControlAsAWholeIsInItsInitialState()

            await clickRemove()
            await theSubmittedValueForTheArrayedControlAsAWholeIsInItsInitialStateJustWithItsLastElementGone()

            done()
        })

        it('removing the field does not show invalid messages if the removed element was not yet defined', async (done: DoneFn) => {
            await theSubmittedValueForTheArrayedControlAsAWholeIsInItsInitialState()

            await clickAdd()
            await clickAdd()
            await clickRemove()
            await noInvalidMessagesAreShown()

            done()
        })

        it('disables the remove button when there are no fields remaining in the arrayed control', async (done: DoneFn) => {
            await removeAllTheFields()
            await removeIsDisabled()

            done()
        })
    })
})
