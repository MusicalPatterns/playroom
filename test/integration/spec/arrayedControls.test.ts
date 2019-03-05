import { ElementHandle } from 'puppeteer'
import { SecretSelectorsForTest, SpecControlStates } from '../../../src/indexForTest'
import {
    elementCount,
    elementExists,
    elementInnerText,
    findElement,
    openSpecControlsIfNotOpen,
    refreshPage,
    resetSpecByTogglingToOtherPatternThenBackToTestPattern,
    SPEC_ARRAYED_PROPERTY_KEY,
    SPEC_ARRAYED_PROPERTY_WITH_INITIAL_ELEMENT_VALUE_KEY,
    SPEC_CONTROLS_PATTERN_ARRAYED_PROPERTY_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_ARRAYED_PROPERTY_WITH_INITIAL_ELEMENT_VALUE_INITIAL_ELEMENT_VALUE,
    SPEC_CONTROLS_PATTERN_ARRAYED_PROPERTY_WITH_INITIAL_ELEMENT_VALUE_INITIAL_VALUE,
    VALID_TEST_MODIFICATION,
} from '../../support'

const clickAdd: () => Promise<void> =
    async (): Promise<void> => {
        const addButton: ElementHandle = await findElement(`#${SPEC_ARRAYED_PROPERTY_KEY} .add`)
        await addButton.click()
    }

const clickAddForTheArrayedControlWithTheInitialElementValue: () => Promise<void> =
    async (): Promise<void> => {
        const addButton: ElementHandle = await findElement(`#${SPEC_ARRAYED_PROPERTY_WITH_INITIAL_ELEMENT_VALUE_KEY} .add`)
        await addButton.click()
    }

const clickRemove: () => Promise<void> =
    async (): Promise<void> => {
        const removeButton: ElementHandle = await findElement(`#${SPEC_ARRAYED_PROPERTY_KEY} .remove`)
        await removeButton.click()
    }

const thereIsAnAdditionalField: (originalFieldCount: number) => Promise<void> =
    async (originalFieldCount: number): Promise<void> => {
        const updatedFieldCount: number = await elementCount(`#${SPEC_ARRAYED_PROPERTY_KEY} input[type=number]`)
        expect(updatedFieldCount)
            .toBe(originalFieldCount + 1)
    }

const thereIsAnAdditionalFieldForTheArrayedControlWithTheInitialElementValue: (originalFieldCount: number) => Promise<void> =
    async (originalFieldCount: number): Promise<void> => {
        const updatedFieldCount: number = await elementCount(`#${SPEC_ARRAYED_PROPERTY_WITH_INITIAL_ELEMENT_VALUE_KEY} input[type=number]`)
        expect(updatedFieldCount)
            .toBe(originalFieldCount + 1)
    }

const thereIsOneLessField: (originalFieldCount: number) => Promise<void> =
    async (originalFieldCount: number): Promise<void> => {
        const updatedFieldCount: number = await elementCount(`#${SPEC_ARRAYED_PROPERTY_KEY} input[type=number]`)
        expect(updatedFieldCount)
            .toBe(originalFieldCount - 1)
    }

const andItHasTheNextIdAfterTheOthers: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`#${SPEC_ARRAYED_PROPERTY_KEY}-5`))
            .toBeTruthy()
    }

const andItHasTheNextIdAfterTheOthersForTheArrayedControlWithTheInitialElementValue: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`#${SPEC_ARRAYED_PROPERTY_WITH_INITIAL_ELEMENT_VALUE_KEY}-3`))
            .toBeTruthy()
    }

const andTheIdThatIsMissingWasTheLastId: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`#${SPEC_ARRAYED_PROPERTY_KEY}-4`))
            .toBeFalsy()
    }

const newFieldExistsButHasNotBeenSubmitted: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${SPEC_ARRAYED_PROPERTY_KEY}-5 .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
            .toBe('')
    }

const andTheOtherNewFieldExistsButHasNotBeenSubmitted: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${SPEC_ARRAYED_PROPERTY_KEY}-6 .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
            .toBe('')
    }

const modifyNewField: () => Promise<void> =
    async (): Promise<void> => {
        const newControl: ElementHandle = await findElement(`#${SPEC_ARRAYED_PROPERTY_KEY}-5 input[type=number]`)
        await newControl.type(VALID_TEST_MODIFICATION)
    }

const newFieldHasBeenSubmitted: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${SPEC_ARRAYED_PROPERTY_KEY}-5 .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
            .toBe(VALID_TEST_MODIFICATION)
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
            .toBeTruthy()
        expect(await elementExists(`input[type=number]#${SPEC_ARRAYED_PROPERTY_KEY}-6.${SpecControlStates.VALID}`))
            .toBeTruthy()
    }

const theFirstOfTheTwoNewFieldsTheOneYouModifiedIsValidWhileTheSecondOfTheTwoNewFieldsIsBrieflyInvalid: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`input[type=number]#${SPEC_ARRAYED_PROPERTY_KEY}-5.${SpecControlStates.VALID}`))
            .toBeTruthy()
        expect(await elementExists(`input[type=number]#${SPEC_ARRAYED_PROPERTY_KEY}-6.${SpecControlStates.INVALID}`))
            .toBeTruthy()
    }

const bothNewFieldsAreValidAndSubmitted: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`input[type=number]#${SPEC_ARRAYED_PROPERTY_KEY}-5.${SpecControlStates.VALID}`))
            .toBeTruthy()
        expect(await elementExists(`input[type=number]#${SPEC_ARRAYED_PROPERTY_KEY}-6.${SpecControlStates.VALID}`))
            .toBeTruthy()
        expect(await elementInnerText(`#${SPEC_ARRAYED_PROPERTY_KEY}-5 .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
            .toBe(VALID_TEST_MODIFICATION)
        expect(await elementInnerText(`#${SPEC_ARRAYED_PROPERTY_KEY}-6 .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
            .toBe(VALID_TEST_MODIFICATION)
    }

const theSubmittedValueForTheArrayedControlWithTheInitialElementValueAsAWholeIsInItsInitialState: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${SPEC_ARRAYED_PROPERTY_WITH_INITIAL_ELEMENT_VALUE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
            .toBe(JSON.stringify(SPEC_CONTROLS_PATTERN_ARRAYED_PROPERTY_WITH_INITIAL_ELEMENT_VALUE_INITIAL_VALUE))
    }

const theSubmittedValueForTheArrayedControlAsAWholeIsInItsInitialState: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${SPEC_ARRAYED_PROPERTY_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
            .toBe(JSON.stringify(SPEC_CONTROLS_PATTERN_ARRAYED_PROPERTY_INITIAL_VALUE))
    }

const theSubmittedValueForTheArrayedControlWithTheInitialElementValueAsAWholeHasANewElementAtTheEndAndItHasTheInitialElementValue: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${SPEC_ARRAYED_PROPERTY_WITH_INITIAL_ELEMENT_VALUE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
            .toBe(JSON.stringify(SPEC_CONTROLS_PATTERN_ARRAYED_PROPERTY_WITH_INITIAL_ELEMENT_VALUE_INITIAL_VALUE.concat([ SPEC_CONTROLS_PATTERN_ARRAYED_PROPERTY_WITH_INITIAL_ELEMENT_VALUE_INITIAL_ELEMENT_VALUE ])))
    }

const theSubmittedValueForTheArrayedControlAsAWholeIsInItsInitialStateJustWithItsLastElementGone: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${SPEC_ARRAYED_PROPERTY_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
            .toBe(JSON.stringify(SPEC_CONTROLS_PATTERN_ARRAYED_PROPERTY_INITIAL_VALUE.slice(0, SPEC_CONTROLS_PATTERN_ARRAYED_PROPERTY_INITIAL_VALUE.length - 1)))
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
            .toBeTruthy()
    }

const invalidMessagesAreNotShown: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`#${SPEC_ARRAYED_PROPERTY_KEY} .invalid-spec-message`))
            .toBeFalsy()
    }

describe('arrayed controls', () => {
    beforeEach(async (done: DoneFn) => {
        await refreshPage()
        await resetSpecByTogglingToOtherPatternThenBackToTestPattern()
        await openSpecControlsIfNotOpen()
        done()
    })

    describe('adding', () => {
        describe('for arrayed controls with no initial element value', () => {
            it('clicking the add button displays a new blank field at the end of the arrayed control', async (done: DoneFn) => {
                const originalFieldCount: number = await elementCount(`#${SPEC_ARRAYED_PROPERTY_KEY} input[type=number]`)

                await clickAdd()
                await thereIsAnAdditionalField(originalFieldCount)
                await andItHasTheNextIdAfterTheOthers()

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
                    await invalidMessagesAreNotShown()

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
        })

        describe('for arrayed controls with an initial element value', () => {
            it('clicking the add button displays a new field at the end of the arrayed control with that initial value', async (done: DoneFn) => {
                const originalFieldCount: number = await elementCount(`#${SPEC_ARRAYED_PROPERTY_WITH_INITIAL_ELEMENT_VALUE_KEY} input[type=number]`)

                await clickAddForTheArrayedControlWithTheInitialElementValue()
                await thereIsAnAdditionalFieldForTheArrayedControlWithTheInitialElementValue(originalFieldCount)
                await andItHasTheNextIdAfterTheOthersForTheArrayedControlWithTheInitialElementValue()

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
            await thereIsOneLessField(originalFieldCount)
            await andTheIdThatIsMissingWasTheLastId()

            done()
        })

        it('removing the field immediately submits the change to the arrayed control', async (done: DoneFn) => {
            await theSubmittedValueForTheArrayedControlAsAWholeIsInItsInitialState()

            await clickRemove()
            await theSubmittedValueForTheArrayedControlAsAWholeIsInItsInitialStateJustWithItsLastElementGone()

            done()
        })

        it('disables the remove button when there are no fields remaining in the arrayed control', async (done: DoneFn) => {
            await removeAllTheFields()
            await removeIsDisabled()

            done()
        })
    })
})
