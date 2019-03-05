// tslint:disable no-duplicate-string

import { indexOfLastCharacter } from '@musical-patterns/utilities'
import { ElementHandle } from 'puppeteer'
import { SecretSelectorsForTest, SpecControlStates } from '../../../src/indexForTest'
import {
    BAD_FORMAT_INVALID_TEST_MODIFICATION,
    elementExists,
    elementInnerText,
    elementValue,
    findElement,
    openSpecControlsIfNotOpen,
    OUT_OF_RANGE_INVALID_TEST_MODIFICATION,
    press,
    resetSpecByTogglingToOtherPatternThenBackToTestPattern,
    selectOption,
    simulateDesktopViewport,
    SPEC_ARRAYED_PROPERTY_KEY,
    SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE,
    SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_MAX_VALUE,
    SPEC_CONTROLS_PATTERN_STRINGED_PROPERTY_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_STRINGED_PROPERTY_ONE_MAX_LENGTH, SPEC_CONTROLS_PATTERN_STRINGED_PROPERTY_ONE_MIN_LENGTH,
    SPEC_OPTIONED_PROPERTY_ONE_KEY,
    SPEC_RANGED_PROPERTY_ONE_KEY,
    SPEC_RANGED_PROPERTY_TWO_KEY,
    SPEC_STRINGED_PROPERTY_KEY,
    VALID_TEST_MODIFICATION,
    VALIDATION_PATTERN_ID,
} from '../../support'

const MODIFICATION_CAUSING_STRINGED_CONTROL_TO_EXCEED_ITS_MAX_LENGTH: string = 'HI'
const PART_OF_MODIFICATION_WITHIN_STRINGED_CONTROLS_MAX_LENGTH: string = MODIFICATION_CAUSING_STRINGED_CONTROL_TO_EXCEED_ITS_MAX_LENGTH.slice(0, 1)

const modifyRangedControlToBeBadlyFormatted: () => Promise<void> =
    async (): Promise<void> => {
        const control: ElementHandle = await findElement(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`)
        await control.type(BAD_FORMAT_INVALID_TEST_MODIFICATION)
    }

const modifyRangedControlToBeOutOfRange: () => Promise<void> =
    async (): Promise<void> => {
        const control: ElementHandle = await findElement(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`)
        await control.type(OUT_OF_RANGE_INVALID_TEST_MODIFICATION)
    }

const modifyAnotherControlValidly: () => Promise<void> =
    async (): Promise<void> => {
        const control: ElementHandle = await findElement(`input[type=number]#${SPEC_RANGED_PROPERTY_TWO_KEY}`)
        await control.type(VALID_TEST_MODIFICATION)
    }

const rangedControlInputIsMarkedAsInvalid: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}.${SpecControlStates.INVALID}`))
            .toBeTruthy()
    }

const stringedControlInputIsMarkedAsInvalid: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`input[type=text]#${SPEC_STRINGED_PROPERTY_KEY}.${SpecControlStates.INVALID}`))
            .toBeTruthy()
    }

const otherControlInputIsAlsoMarkedAsInvalid: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`input[type=number]#${SPEC_RANGED_PROPERTY_TWO_KEY}.${SpecControlStates.INVALID}`))
            .toBeTruthy()
    }

const rangedContolInputIsMarkedAsValid: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}.${SpecControlStates.VALID}`))
            .toBeTruthy('ranged control input was not marked as valid')
    }

const otherControlInputIsAlsoMarkedAsValid: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`input[type=number]#${SPEC_RANGED_PROPERTY_TWO_KEY}.${SpecControlStates.VALID}`))
            .toBeTruthy('other ranged control input was not marked as valid')
    }

const stringedContolInputIsMarkedAsValid: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`input[type=text]#${SPEC_STRINGED_PROPERTY_KEY}.${SpecControlStates.VALID}`))
            .toBeTruthy('stringed control input was not marked as valid')
    }

const rangedControlWasNotSubmitted: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${SPEC_RANGED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
            .toBe(`${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE}`)
    }

const stringedControlWasNotSubmittedAndIsAtTheLastValidValueBeforeItGotTooLong: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${SPEC_STRINGED_PROPERTY_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
            .toBe(`${SPEC_CONTROLS_PATTERN_STRINGED_PROPERTY_INITIAL_VALUE}${PART_OF_MODIFICATION_WITHIN_STRINGED_CONTROLS_MAX_LENGTH}`)
    }

const stringedControlWasNotSubmitted: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${SPEC_STRINGED_PROPERTY_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
            .toBe(`${SPEC_CONTROLS_PATTERN_STRINGED_PROPERTY_INITIAL_VALUE}`)
    }

const rangedControlDisplayValueIsWiped: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementValue(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`))
            .toBe('')
    }

const rangedControlDisplayValueIsTheOutOfRangeValue: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementValue(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`))
            .toBe(`${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE}${OUT_OF_RANGE_INVALID_TEST_MODIFICATION}`)
    }

const rangedControlInputHasBadFormatMessage: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${SPEC_RANGED_PROPERTY_ONE_KEY} .invalid-spec-message`))
            .toBe('this property is formatted in a way which cannot be parsed')
    }

const stringedControlDisplayValueIsTheTooLongValue: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementValue(`input[type=text]#${SPEC_STRINGED_PROPERTY_KEY}`))
            .toBe(`${SPEC_CONTROLS_PATTERN_STRINGED_PROPERTY_INITIAL_VALUE}${MODIFICATION_CAUSING_STRINGED_CONTROL_TO_EXCEED_ITS_MAX_LENGTH}`)
    }

const stringedControlDisplayValueIsTheTooShortValue: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementValue(`input[type=text]#${SPEC_STRINGED_PROPERTY_KEY}`))
            .toBe(`${SPEC_CONTROLS_PATTERN_STRINGED_PROPERTY_INITIAL_VALUE.slice(0, indexOfLastCharacter(SPEC_CONTROLS_PATTERN_STRINGED_PROPERTY_INITIAL_VALUE))}`)
    }

const rangedControlInputHasOutOfRangeMessage: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${SPEC_RANGED_PROPERTY_ONE_KEY} .invalid-spec-message`))
            .toBe(`must be less than ${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_MAX_VALUE}`)
    }

const stringedControlInputHasTooLongMessage: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${SPEC_STRINGED_PROPERTY_KEY} .invalid-spec-message`))
            .toBe(`must be ${SPEC_CONTROLS_PATTERN_STRINGED_PROPERTY_ONE_MAX_LENGTH} characters or less`)
    }

const stringedControlInputHasTooShortMessage: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${SPEC_STRINGED_PROPERTY_KEY} .invalid-spec-message`))
            .toBe(`must be ${SPEC_CONTROLS_PATTERN_STRINGED_PROPERTY_ONE_MIN_LENGTH} characters or more`)
    }

const undoRangedControlEitherModification: () => Promise<void> =
    async (): Promise<void> => {
        const control: ElementHandle = await findElement(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`)
        await control.click()
        await press('Backspace')
    }

const undoStringedControlTooLongModification: () => Promise<void> =
    async (): Promise<void> => {
        const control: ElementHandle = await findElement(`input[type=text]#${SPEC_STRINGED_PROPERTY_KEY}`)
        await control.click()
        await press('Backspace')
        await press('Backspace')
    }

const undoStringedControlTooShortModification: () => Promise<void> =
    async (): Promise<void> => {
        const control: ElementHandle = await findElement(`input[type=text]#${SPEC_STRINGED_PROPERTY_KEY}`)
        await control.type(VALID_TEST_MODIFICATION)
    }

const selectCustomValidationPattern: () => Promise<void> =
    async (): Promise<void> => {
        await simulateDesktopViewport()
        await resetSpecByTogglingToOtherPatternThenBackToTestPattern()
        const testPattern: ElementHandle = await findElement(`#${VALIDATION_PATTERN_ID}`)
        await testPattern.click()
    }

const enterCustomInvalidityStateAndGetLastStillValidValue: () => Promise<string> =
    async (): Promise<string> => {
        const control: ElementHandle = await findElement(`input[type=number]#${SPEC_RANGED_PROPERTY_TWO_KEY}`)
        await control.click()
        await press('Backspace')
        const lastStillValidValue: string = await elementInnerText(`#${SPEC_RANGED_PROPERTY_TWO_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`)
        await press('Backspace')
        const anythingElse: ElementHandle = await findElement('#first-row .right')
        await anythingElse.click()

        return lastStillValidValue
    }

const theSubmittedValueIsTheLastStillValidValue: (lastStillValidValue: string) => Promise<void> =
    async (lastStillValidValue: string): Promise<void> => {
        expect(await elementInnerText(`#${SPEC_RANGED_PROPERTY_TWO_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
            .toBe(lastStillValidValue)
    }

const invalidMessagesForAllControlsInvolvedInCustomInvalidity: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${SPEC_RANGED_PROPERTY_TWO_KEY} .invalid-spec-message`))
            .toBe('pitch must be more than duration, obvs')
        expect(await elementInnerText(`#${SPEC_RANGED_PROPERTY_ONE_KEY} .invalid-spec-message`))
            .toBe('duration must be less than pitch, obvs')
    }

const fixCustomValidity: () => Promise<void> =
    async (): Promise<void> => {
        const control: ElementHandle = await findElement(`input[type=number]#${SPEC_RANGED_PROPERTY_TWO_KEY}`)
        const MODIFICATION_RETURNING_INPUT_TO_CUSTOM_VALID_STATE: string = '86'
        await control.type(MODIFICATION_RETURNING_INPUT_TO_CUSTOM_VALID_STATE)
    }

const modifyAControlNotInvolvedInTheCustomValidityCheck: () => Promise<void> =
    async (): Promise<void> => {
        await selectOption(`select#${SPEC_OPTIONED_PROPERTY_ONE_KEY}`, SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)
    }

const invalidateJustOneFieldOfAnArrayedControl: () => Promise<void> =
    async (): Promise<void> => {
        const control: ElementHandle = await findElement(`input[type=number]#${SPEC_ARRAYED_PROPERTY_KEY}-2`)
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
        expect(await elementInnerText(`#${SPEC_ARRAYED_PROPERTY_KEY}-0 .invalid-spec-message`))
            .toBe(expectedInvalidMessage)
        expect(await elementInnerText(`#${SPEC_ARRAYED_PROPERTY_KEY}-1 .invalid-spec-message`))
            .toBe(expectedInvalidMessage)
        expect(await elementInnerText(`#${SPEC_ARRAYED_PROPERTY_KEY}-2 .invalid-spec-message`))
            .toBe(expectedInvalidMessage)
        expect(await elementInnerText(`#${SPEC_ARRAYED_PROPERTY_KEY}-3 .invalid-spec-message`))
            .toBe(expectedInvalidMessage)
    }

const modifyStringedControlToBeTooShort: () => Promise<void> =
    async (): Promise<void> => {
        const control: ElementHandle = await findElement(`input[type=text]#${SPEC_STRINGED_PROPERTY_KEY}`)
        await control.click()
        await press('Backspace')
    }

const modifyStringedControlToBeTooLong: () => Promise<void> =
    async (): Promise<void> => {
        const control: ElementHandle = await findElement(`input[type=text]#${SPEC_STRINGED_PROPERTY_KEY}`)
        await control.type(MODIFICATION_CAUSING_STRINGED_CONTROL_TO_EXCEED_ITS_MAX_LENGTH)
    }

describe('invalid controls', () => {
    describe('ranged controls - bad format', () => {
        beforeEach(async (done: DoneFn) => {
            await resetSpecByTogglingToOtherPatternThenBackToTestPattern()
            await openSpecControlsIfNotOpen()
            await modifyRangedControlToBeBadlyFormatted()

            done()
        })

        it('marks the input as invalid', async (done: DoneFn) => {
            await rangedControlInputIsMarkedAsInvalid()

            done()
        })

        it('it does not submit the invalid data which could crash things', async (done: DoneFn) => {
            await rangedControlWasNotSubmitted()

            done()
        })

        it('wipes out the displayed value', async (done: DoneFn) => {
            await rangedControlDisplayValueIsWiped()

            done()
        })

        it('shows an invalid message', async (done: DoneFn) => {
            await rangedControlInputHasBadFormatMessage()

            done()
        })

        it('resets the control to valid after typing something valid into it', async (done: DoneFn) => {
            await undoRangedControlEitherModification()
            await rangedContolInputIsMarkedAsValid()

            done()
        })

        it('preserves the invalid state, displayed value, and invalid message, and still withholds submitting, if you make a change to another control', async (done: DoneFn) => {
            await modifyAnotherControlValidly()
            await rangedControlInputIsMarkedAsInvalid()
            await rangedControlWasNotSubmitted()
            await rangedControlDisplayValueIsWiped()
            await rangedControlInputHasBadFormatMessage()

            done()
        })
    })

    describe('ranged controls - out of range', () => {
        beforeEach(async (done: DoneFn) => {
            await resetSpecByTogglingToOtherPatternThenBackToTestPattern()
            await modifyRangedControlToBeOutOfRange()

            done()
        })

        it('marks the input as invalid', async (done: DoneFn) => {
            await rangedControlInputIsMarkedAsInvalid()

            done()
        })

        it('it does not submit the invalid data which could crash things', async (done: DoneFn) => {
            await rangedControlWasNotSubmitted()

            done()
        })

        it('displays the out of range value in the input', async (done: DoneFn) => {
            await rangedControlDisplayValueIsTheOutOfRangeValue()

            done()
        })

        it('shows an invalid message', async (done: DoneFn) => {
            await rangedControlInputHasOutOfRangeMessage()

            done()
        })

        it('resets the control to valid after typing something valid into it', async (done: DoneFn) => {
            await undoRangedControlEitherModification()
            await rangedContolInputIsMarkedAsValid()

            done()
        })

        it('preserves the invalid state, displayed value, and invalid message, and still withholds submitting, if you make a change to another control', async (done: DoneFn) => {
            await modifyAnotherControlValidly()
            await rangedControlInputIsMarkedAsInvalid()
            await rangedControlDisplayValueIsTheOutOfRangeValue()
            await rangedControlWasNotSubmitted()
            await rangedControlInputHasOutOfRangeMessage()

            done()
        })
    })

    describe('stringed controls - too short', () => {
        beforeEach(async (done: DoneFn) => {
            await resetSpecByTogglingToOtherPatternThenBackToTestPattern()
            await modifyStringedControlToBeTooShort()

            done()
        })

        it('marks the input as invalid', async (done: DoneFn) => {
            await stringedControlInputIsMarkedAsInvalid()

            done()
        })

        it('it does not submit the invalid data which could crash things', async (done: DoneFn) => {
            await stringedControlWasNotSubmitted()

            done()
        })

        it('displays the too-long value in the input', async (done: DoneFn) => {
            await stringedControlDisplayValueIsTheTooShortValue()

            done()
        })

        it('shows an invalid message', async (done: DoneFn) => {
            await stringedControlInputHasTooShortMessage()

            done()
        })

        it('resets the control to valid after typing something valid into it', async (done: DoneFn) => {
            await undoStringedControlTooShortModification()
            await stringedContolInputIsMarkedAsValid()

            done()
        })

        it('preserves the invalid state, displayed value, and invalid message, and still withholds submitting, if you make a change to another control', async (done: DoneFn) => {
            await modifyAnotherControlValidly()
            await stringedControlInputIsMarkedAsInvalid()
            await stringedControlDisplayValueIsTheTooShortValue()
            await stringedControlWasNotSubmitted()
            await stringedControlInputHasTooShortMessage()

            done()
        })
    })

    describe('stringed controls - too long', () => {
        beforeEach(async (done: DoneFn) => {
            await resetSpecByTogglingToOtherPatternThenBackToTestPattern()
            await modifyStringedControlToBeTooLong()

            done()
        })

        it('marks the input as invalid', async (done: DoneFn) => {
            await stringedControlInputIsMarkedAsInvalid()

            done()
        })

        it('it does not submit the invalid data which could crash things', async (done: DoneFn) => {
            await stringedControlWasNotSubmittedAndIsAtTheLastValidValueBeforeItGotTooLong()

            done()
        })

        it('displays the too-long value in the input', async (done: DoneFn) => {
            await stringedControlDisplayValueIsTheTooLongValue()

            done()
        })

        it('shows an invalid message', async (done: DoneFn) => {
            await stringedControlInputHasTooLongMessage()

            done()
        })

        it('resets the control to valid after typing something valid into it', async (done: DoneFn) => {
            await undoStringedControlTooLongModification()
            await stringedContolInputIsMarkedAsValid()

            done()
        })

        it('preserves the invalid state, displayed value, and invalid message, and still withholds submitting, if you make a change to another control', async (done: DoneFn) => {
            await modifyAnotherControlValidly()
            await stringedControlInputIsMarkedAsInvalid()
            await stringedControlDisplayValueIsTheTooLongValue()
            await stringedControlWasNotSubmittedAndIsAtTheLastValidValueBeforeItGotTooLong()
            await stringedControlInputHasTooLongMessage()

            done()
        })
    })

    describe('arrayed controls', () => {
        beforeEach(async (done: DoneFn) => {
            await resetSpecByTogglingToOtherPatternThenBackToTestPattern()
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
            let lastStillValidValue: string
            beforeEach(async (done: DoneFn) => {
                lastStillValidValue = await enterCustomInvalidityStateAndGetLastStillValidValue()

                done()
            })

            it('marks all involved controls as invalid', async (done: DoneFn) => {
                await rangedControlInputIsMarkedAsInvalid()
                await otherControlInputIsAlsoMarkedAsInvalid()

                done()
            })

            it('it does not submit the invalid data which could crash things', async (done: DoneFn) => {
                await theSubmittedValueIsTheLastStillValidValue(lastStillValidValue)

                done()
            })

            it('shows invalid messages for all involved controls', async (done: DoneFn) => {
                await invalidMessagesForAllControlsInvolvedInCustomInvalidity()

                done()
            })

            it('resets all involved controls to valid state after typing a fix', async (done: DoneFn) => {
                await fixCustomValidity()
                await rangedContolInputIsMarkedAsValid()
                await otherControlInputIsAlsoMarkedAsValid()

                done()
            })

            it('preserves the invalid states if you make a change to another control', async (done: DoneFn) => {
                await modifyAControlNotInvolvedInTheCustomValidityCheck()
                await rangedControlInputIsMarkedAsInvalid()
                await otherControlInputIsAlsoMarkedAsInvalid()

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
