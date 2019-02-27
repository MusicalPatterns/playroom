// tslint:disable no-duplicate-string

import { ElementHandle } from 'puppeteer'
import { SecretSelectorsForTest, SpecControlStates } from '../../../src/indexForTest'
import {
    BAD_FORMAT_INVALID_TEST_MODIFICATION,
    elementExists,
    elementInnerText,
    elementValue,
    findElement,
    loseFocus,
    OUT_OF_RANGE_INVALID_TEST_MODIFICATION,
    press,
    refreshWithTestPatternSelected,
    selectOption,
    SPEC_ARRAYED_PROPERTY_KEY,
    SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE,
    SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_MAX_VALUE,
    SPEC_OPTIONED_PROPERTY_ONE_KEY,
    SPEC_RANGED_PROPERTY_ONE_KEY,
    SPEC_RANGED_PROPERTY_TWO_KEY,
    VALID_TEST_MODIFICATION,
    VALIDATION_PATTERN_ID,
} from '../../support'

describe('invalid controls', () => {
    let control: ElementHandle
    let lastStillValidValue: string

    const modifyControlToBeBadlyFormatted: () => Promise<void> =
        async (): Promise<void> => {
            control = await findElement(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`)
            await control.type(BAD_FORMAT_INVALID_TEST_MODIFICATION)
        }

    const modifyControlToBeOutOfRange: () => Promise<void> =
        async (): Promise<void> => {
            control = await findElement(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`)
            await control.type(OUT_OF_RANGE_INVALID_TEST_MODIFICATION)
        }

    const modifyOtherControlValidly: () => Promise<void> =
        async (): Promise<void> => {
            control = await findElement(`input[type=number]#${SPEC_RANGED_PROPERTY_TWO_KEY}`)
            await control.type(VALID_TEST_MODIFICATION)
        }

    const inputIsMarkedAsInvalid: () => Promise<void> =
        async (): Promise<void> => {
            expect(await elementExists(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}.${SpecControlStates.INVALID}`))
                .toBeTruthy()
        }

    const otherInputIsAlsoMarkedAsInvalid: () => Promise<void> =
        async (): Promise<void> => {
            expect(await elementExists(`input[type=number]#${SPEC_RANGED_PROPERTY_TWO_KEY}.${SpecControlStates.INVALID}`))
                .toBeTruthy()
        }

    const inputIsMarkedAsValid: () => Promise<void> =
        async (): Promise<void> => {
            expect(await elementExists(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}.${SpecControlStates.VALID}`))
                .toBeTruthy()
        }

    const otherInputIsAlsoMarkedAsValid: () => Promise<void> =
        async (): Promise<void> => {
            expect(await elementExists(`input[type=number]#${SPEC_RANGED_PROPERTY_TWO_KEY}.${SpecControlStates.VALID}`))
                .toBeTruthy()
        }

    const inputWasNotSubmitted: () => Promise<void> =
        async (): Promise<void> => {
            expect(await elementInnerText(`#${SPEC_RANGED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(`${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE}`)
        }

    const inputDisplayValueIsWiped: () => Promise<void> =
        async (): Promise<void> => {
            expect(await elementValue(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`))
                .toBe('')
        }

    const inputDisplayValueIsTheOutOfRangeValue: () => Promise<void> =
        async (): Promise<void> => {
            expect(await elementValue(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`))
                .toBe(`${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE}${OUT_OF_RANGE_INVALID_TEST_MODIFICATION}`)
        }

    const inputHasBadFormatMessage: () => Promise<void> =
        async (): Promise<void> => {
            expect(await elementInnerText(`#${SPEC_RANGED_PROPERTY_ONE_KEY} .invalid-message`))
                .toBe('this property is formatted in a way which cannot be parsed')
        }

    const inputHasOutOfRangeMessage: () => Promise<void> =
        async (): Promise<void> => {
            expect(await elementInnerText(`#${SPEC_RANGED_PROPERTY_ONE_KEY} .invalid-message`))
                .toBe(`must be less than ${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_MAX_VALUE}`)
        }

    const undoModification: () => Promise<void> =
        async (): Promise<void> => {
            await control.click()
            await press('Backspace')
        }

    const selectCustomValidationPattern: () => Promise<void> =
        async (): Promise<void> => {
            await refreshWithTestPatternSelected()
            const testPattern: ElementHandle = await findElement(`#${VALIDATION_PATTERN_ID}`)
            await testPattern.click()
        }

    const enterCustomInvalidityState: () => Promise<void> =
        async (): Promise<void> => {
            control = await findElement(`input[type=number]#${SPEC_RANGED_PROPERTY_TWO_KEY}`)
            await control.click()
            await press('Backspace')
            lastStillValidValue = await elementInnerText(`#${SPEC_RANGED_PROPERTY_TWO_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`)
            await press('Backspace')
            await loseFocus()
        }

    const theSubmittedValueIsTheLastStillValidValue: () => Promise<void> =
        async (): Promise<void> => {
            expect(await elementInnerText(`#${SPEC_RANGED_PROPERTY_TWO_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(lastStillValidValue)
        }

    const invalidMessagesForAllControlsInvolvedInCustomInvalidity: () => Promise<void> =
        async (): Promise<void> => {
            expect(await elementInnerText(`#${SPEC_RANGED_PROPERTY_TWO_KEY} .invalid-message`))
                .toBe('pitch must be more than duration, obvs')
            expect(await elementInnerText(`#${SPEC_RANGED_PROPERTY_ONE_KEY} .invalid-message`))
                .toBe('duration must be less than pitch, obvs')
        }

    const modifyAControlToFixCustomValidity: () => Promise<void> =
        async (): Promise<void> => {
            const MODIFICATION_RETURNING_INPUT_TO_CUSTOM_VALID_STATE: string = '86'
            await control.type(MODIFICATION_RETURNING_INPUT_TO_CUSTOM_VALID_STATE)
        }

    const modifyAControlNotInvolvedInTheCustomValidityCheck: () => Promise<void> =
        async (): Promise<void> => {
            await selectOption(`select#${SPEC_OPTIONED_PROPERTY_ONE_KEY}`, SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)
        }

    const invalidateJustOneFieldOfAnArrayedControl: () => Promise<void> =
        async (): Promise<void> => {
            control = await findElement(`input[type=number]#${SPEC_ARRAYED_PROPERTY_KEY}-2`)
            await control.type(BAD_FORMAT_INVALID_TEST_MODIFICATION)
        }

    const justThatOneFieldIsMarkedIsInvalidAndTheOtherFieldsOfThatArrayedControlAreStillMarkedAsValid: () => Promise<void> =
        async (): Promise<void> => {
            expect(await elementExists(`input[type=number]#${SPEC_ARRAYED_PROPERTY_KEY}-0.${SpecControlStates.VALID}`))
                .toBeTruthy()
            expect(await elementExists(`input[type=number]#${SPEC_ARRAYED_PROPERTY_KEY}-1.${SpecControlStates.VALID}`))
                .toBeTruthy()
            expect(await elementExists(`input[type=number]#${SPEC_ARRAYED_PROPERTY_KEY}-2.${SpecControlStates.INVALID}`))
                .toBeTruthy()
            expect(await elementExists(`input[type=number]#${SPEC_ARRAYED_PROPERTY_KEY}-3.${SpecControlStates.VALID}`))
                .toBeTruthy()
            expect(await elementExists(`input[type=number]#${SPEC_ARRAYED_PROPERTY_KEY}-4.${SpecControlStates.VALID}`))
                .toBeTruthy()
        }

    const clickRemove: () => Promise<void> =
        async (): Promise<void> => {
            const removeButton: ElementHandle = await findElement(`#${SPEC_ARRAYED_PROPERTY_KEY} .remove`)
            await removeButton.click()
        }

    const everyFieldHasAnInvalidMessage: () => Promise<void> =
        async (): Promise<void> => {
            const expectedInvalidMessage: string = 'arrays can only be odd in length, duoy'
            expect(await elementInnerText(`#${SPEC_ARRAYED_PROPERTY_KEY}-0 .invalid-message`))
                .toBe(expectedInvalidMessage)
            expect(await elementInnerText(`#${SPEC_ARRAYED_PROPERTY_KEY}-1 .invalid-message`))
                .toBe(expectedInvalidMessage)
            expect(await elementInnerText(`#${SPEC_ARRAYED_PROPERTY_KEY}-2 .invalid-message`))
                .toBe(expectedInvalidMessage)
            expect(await elementInnerText(`#${SPEC_ARRAYED_PROPERTY_KEY}-3 .invalid-message`))
                .toBe(expectedInvalidMessage)
        }

    describe('bad format', () => {
        beforeEach(async (done: DoneFn) => {
            await refreshWithTestPatternSelected()
            await modifyControlToBeBadlyFormatted()

            done()
        })

        it('marks the input as invalid', async (done: DoneFn) => {
            await inputIsMarkedAsInvalid()

            done()
        })

        it('it does not submit the invalid data which could crash things', async (done: DoneFn) => {
            await inputWasNotSubmitted()

            done()
        })

        it('wipes out the displayed value', async (done: DoneFn) => {
            await inputDisplayValueIsWiped()

            done()
        })

        it('shows an invalid message', async (done: DoneFn) => {
            await inputHasBadFormatMessage()

            done()
        })

        it('resets the control to valid after typing something valid into it', async (done: DoneFn) => {
            await undoModification()
            await inputIsMarkedAsValid()

            done()
        })

        it('preserves the invalid state, displayed value, and invalid message, and still withholds submitting, if you make a change to another control', async (done: DoneFn) => {
            await modifyOtherControlValidly()
            await inputIsMarkedAsInvalid()
            await inputWasNotSubmitted()
            await inputDisplayValueIsWiped()
            await inputHasBadFormatMessage()

            done()
        })
    })

    describe('out of range', () => {
        beforeEach(async (done: DoneFn) => {
            await refreshWithTestPatternSelected()
            await modifyControlToBeOutOfRange()

            done()
        })

        it('marks the input as invalid', async (done: DoneFn) => {
            await inputIsMarkedAsInvalid()

            done()
        })

        it('it does not submit the invalid data which could crash things', async (done: DoneFn) => {
            await inputWasNotSubmitted()

            done()
        })

        it('displays the out of range value in the input', async (done: DoneFn) => {
            await inputDisplayValueIsTheOutOfRangeValue()

            done()
        })

        it('shows an invalid message', async (done: DoneFn) => {
            await inputHasOutOfRangeMessage()

            done()
        })

        it('resets the control to valid after typing something valid into it', async (done: DoneFn) => {
            await undoModification()
            await inputIsMarkedAsValid()

            done()
        })

        it('preserves the invalid state, displayed value, and invalid message, and still withholds submitting, if you make a change to another control', async (done: DoneFn) => {
            await modifyOtherControlValidly()
            await inputIsMarkedAsInvalid()
            await inputDisplayValueIsTheOutOfRangeValue()
            await inputWasNotSubmitted()
            await inputHasOutOfRangeMessage()

            done()
        })
    })

    describe('arrayed controls', () => {
        beforeEach(async (done: DoneFn) => {
            await refreshWithTestPatternSelected()
            await invalidateJustOneFieldOfAnArrayedControl()

            done()
        })

        it('only marks the specific element which is invalid', async (done: DoneFn) => {
            await justThatOneFieldIsMarkedIsInvalidAndTheOtherFieldsOfThatArrayedControlAreStillMarkedAsValid()

            done()
        })
    })

    describe('breaking custom validity', () => {
        beforeEach(async (done: DoneFn) => {
            await selectCustomValidationPattern()

            done()
        })

        describe('across controls', () => {
            beforeEach(async (done: DoneFn) => {
                await enterCustomInvalidityState()

                done()
            })

            it('marks all involved controls as invalid', async (done: DoneFn) => {
                await inputIsMarkedAsInvalid()
                await otherInputIsAlsoMarkedAsInvalid()

                done()
            })

            it('it does not submit the invalid data which could crash things', async (done: DoneFn) => {
                await theSubmittedValueIsTheLastStillValidValue()

                done()
            })

            it('shows invalid messages for all involved controls', async (done: DoneFn) => {
                await invalidMessagesForAllControlsInvolvedInCustomInvalidity()

                done()
            })

            it('resets all involved controls to valid state after typing a fix', async (done: DoneFn) => {
                await modifyAControlToFixCustomValidity()
                await inputIsMarkedAsValid()
                await otherInputIsAlsoMarkedAsValid()

                done()
            })

            it('preserves the invalid states if you make a change to another control', async (done: DoneFn) => {
                await modifyAControlNotInvolvedInTheCustomValidityCheck()
                await inputIsMarkedAsInvalid()
                await otherInputIsAlsoMarkedAsInvalid()

                done()
            })
        })

        describe('within arrayed controls', () => {
            it('runs validation when removing an element', async (done: DoneFn) => {
                await clickRemove()
                await everyFieldHasAnInvalidMessage()

                done()
            })
        })
    })
})
