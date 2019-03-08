// tslint:disable no-duplicate-string

import { indexOfLastCharacter } from '@musical-patterns/utilities'
import { ElementHandle } from 'puppeteer'
import { SecretSelectorsForTest, SpecControlStates } from '../../../src/indexForTest'
import {
    ARRAYED_PROPERTY_KEY,
    BAD_FORMAT_INVALID_TEST_MODIFICATION,
    clickElement,
    deleteCharacterFromInput,
    elementExists,
    elementInnerText,
    elementValue,
    findElement,
    loseFocus,
    openSpecControlsIfNotOpen,
    OPTIONED_PROPERTY_ONE_KEY,
    OUT_OF_RANGE_INVALID_TEST_MODIFICATION,
    quickRefresh,
    RANGED_PROPERTY_ONE_KEY,
    RANGED_PROPERTY_TWO_KEY,
    refreshForSpecControlsTest,
    selectOption,
    selectValidationPattern,
    SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE,
    SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_MAX_VALUE,
    SPEC_CONTROLS_PATTERN_STRINGED_PROPERTY_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_STRINGED_PROPERTY_ONE_MAX_LENGTH,
    SPEC_CONTROLS_PATTERN_STRINGED_PROPERTY_ONE_MIN_LENGTH,
    STRINGED_PROPERTY_KEY,
    VALID_TEST_MODIFICATION,
} from '../../support'

const MODIFICATION_CAUSING_STRINGED_CONTROL_TO_EXCEED_ITS_MAX_LENGTH: string = 'HI'
const PART_OF_MODIFICATION_WITHIN_STRINGED_CONTROLS_MAX_LENGTH: string = MODIFICATION_CAUSING_STRINGED_CONTROL_TO_EXCEED_ITS_MAX_LENGTH.slice(0, 1)

const modifyRangedControlToBeBadlyFormatted: () => Promise<void> =
    async (): Promise<void> => {
        const control: ElementHandle = await findElement(`input[type=number]#${RANGED_PROPERTY_ONE_KEY}`)
        await control.type(BAD_FORMAT_INVALID_TEST_MODIFICATION)
    }

const modifyRangedControlToBeOutOfRange: () => Promise<void> =
    async (): Promise<void> => {
        const control: ElementHandle = await findElement(`input[type=number]#${RANGED_PROPERTY_ONE_KEY}`)
        await control.type(OUT_OF_RANGE_INVALID_TEST_MODIFICATION)
    }

const modifyAnotherControlValidly: () => Promise<void> =
    async (): Promise<void> => {
        const control: ElementHandle = await findElement(`input[type=number]#${RANGED_PROPERTY_TWO_KEY}`)
        await control.type(VALID_TEST_MODIFICATION)
    }

const rangedControlInputIsMarkedAsInvalid: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`input[type=number]#${RANGED_PROPERTY_ONE_KEY}.${SpecControlStates.INVALID}`))
            .toBeTruthy('ranged input was not marked as invalid')
    }

const stringedControlInputIsMarkedAsInvalid: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`input[type=text]#${STRINGED_PROPERTY_KEY}.${SpecControlStates.INVALID}`))
            .toBeTruthy('stringed input was not marked as invalid')
    }

const otherControlInputIsAlsoMarkedAsInvalid: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`input[type=number]#${RANGED_PROPERTY_TWO_KEY}.${SpecControlStates.INVALID}`))
            .toBeTruthy('other input was not market as invalid')
    }

const rangedContolInputIsMarkedAsValid: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`input[type=number]#${RANGED_PROPERTY_ONE_KEY}.${SpecControlStates.VALID}`))
            .toBeTruthy('ranged control input was not marked as valid')
    }

const otherControlInputIsAlsoMarkedAsValid: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`input[type=number]#${RANGED_PROPERTY_TWO_KEY}.${SpecControlStates.VALID}`))
            .toBeTruthy('other ranged control input was not marked as valid')
    }

const stringedContolInputIsMarkedAsValid: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`input[type=text]#${STRINGED_PROPERTY_KEY}.${SpecControlStates.VALID}`))
            .toBeTruthy('stringed control input was not marked as valid')
    }

const rangedControlWasNotSubmitted: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${RANGED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
            .toBe(`${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE}`, 'ranged input was submitted')
    }

const stringedControlTooLongValueWasNotSubmittedAndItIsAtTheLastValidValueBeforeItGotTooLong: () => Promise<void> =
    async (): Promise<void> => {
        const stringedControlSubmittedValue: string = await elementInnerText(
            `#${STRINGED_PROPERTY_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`,
        )
        expect(stringedControlSubmittedValue)
            .toBe(
                `${SPEC_CONTROLS_PATTERN_STRINGED_PROPERTY_INITIAL_VALUE}${PART_OF_MODIFICATION_WITHIN_STRINGED_CONTROLS_MAX_LENGTH}`,
                `stringed control was not at the last valid value before it got too long`,
            )
    }

const stringedControlWasNotSubmitted: () => Promise<void> =
    async (): Promise<void> => {
        const stringedControlSubmittedValue: string = await elementInnerText(
            `#${STRINGED_PROPERTY_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`,
        )
        expect(stringedControlSubmittedValue)
            .toBe(
                `${SPEC_CONTROLS_PATTERN_STRINGED_PROPERTY_INITIAL_VALUE}`,
                `stringed control was submitted`,
            )
    }

const rangedControlDisplayValueIsWiped: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementValue(`input[type=number]#${RANGED_PROPERTY_ONE_KEY}`))
            .toBe('', 'ranged control display value was not wiped')
    }

const rangedControlDisplayValueIsTheOutOfRangeValue: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementValue(`input[type=number]#${RANGED_PROPERTY_ONE_KEY}`))
            .toBe(
                `${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE}${OUT_OF_RANGE_INVALID_TEST_MODIFICATION}`,
                'ranged control display value was not the out of range value',
            )
    }

const rangedControlInputHasBadFormatMessage: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${RANGED_PROPERTY_ONE_KEY} .invalid-message`))
            .toBe('this property is formatted in a way which cannot be parsed', 'ranged control input did not have the bad format message')
    }

const stringedControlDisplayValueIsTheTooLongValue: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementValue(`input[type=text]#${STRINGED_PROPERTY_KEY}`))
            .toBe(`${SPEC_CONTROLS_PATTERN_STRINGED_PROPERTY_INITIAL_VALUE}${MODIFICATION_CAUSING_STRINGED_CONTROL_TO_EXCEED_ITS_MAX_LENGTH}`, 'stringed control display value was not the too long value')
    }

const stringedControlDisplayValueIsTheTooShortValue: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementValue(`input[type=text]#${STRINGED_PROPERTY_KEY}`))
            .toBe(
                `${SPEC_CONTROLS_PATTERN_STRINGED_PROPERTY_INITIAL_VALUE.slice(0, indexOfLastCharacter(SPEC_CONTROLS_PATTERN_STRINGED_PROPERTY_INITIAL_VALUE))}`,
                'stringed control display value was not the too short value',
            )
    }

const rangedControlInputHasOutOfRangeMessage: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${RANGED_PROPERTY_ONE_KEY} .invalid-message`))
            .toBe(`must be less than ${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_MAX_VALUE}`, 'ranged control input did not have out-of-range invalid message')
    }

const stringedControlInputHasTooLongMessage: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${STRINGED_PROPERTY_KEY} .invalid-message`))
            .toBe(`must be ${SPEC_CONTROLS_PATTERN_STRINGED_PROPERTY_ONE_MAX_LENGTH} characters or less`, 'stringed control input did not have too-long invalid message')
    }

const stringedControlInputHasTooShortMessage: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${STRINGED_PROPERTY_KEY} .invalid-message`))
            .toBe(`must be ${SPEC_CONTROLS_PATTERN_STRINGED_PROPERTY_ONE_MIN_LENGTH} characters or more`, 'stringed control input did not have too-short invalid message')
    }

const undoRangedControlEitherModification: () => Promise<void> =
    async (): Promise<void> => {
        await deleteCharacterFromInput(`input[type=number]#${RANGED_PROPERTY_ONE_KEY}`)
    }

const undoStringedControlTooLongModification: () => Promise<void> =
    async (): Promise<void> => {
        await deleteCharacterFromInput(`input[type=text]#${STRINGED_PROPERTY_KEY}`)
        await deleteCharacterFromInput(`input[type=text]#${STRINGED_PROPERTY_KEY}`)
    }

const undoStringedControlTooShortModification: () => Promise<void> =
    async (): Promise<void> => {
        const control: ElementHandle = await findElement(`input[type=text]#${STRINGED_PROPERTY_KEY}`)
        await control.type(VALID_TEST_MODIFICATION)
    }

const enterCustomInvalidityStateAndGetLastStillValidValue: () => Promise<string> =
    async (): Promise<string> => {
        await deleteCharacterFromInput(`input[type=number]#${RANGED_PROPERTY_TWO_KEY}`)
        const lastStillValidValue: string = await elementInnerText(`#${RANGED_PROPERTY_TWO_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`)
        await deleteCharacterFromInput(`input[type=number]#${RANGED_PROPERTY_TWO_KEY}`)
        const SELECT_ANYTHING_ELSE: string = '#first-row .right'
        await loseFocus(SELECT_ANYTHING_ELSE)

        return lastStillValidValue
    }

const theSubmittedValueIsTheLastStillValidValue: (lastStillValidValue: string) => Promise<void> =
    async (lastStillValidValue: string): Promise<void> => {
        expect(await elementInnerText(`#${RANGED_PROPERTY_TWO_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
            .toBe(lastStillValidValue, 'the submitted value was not the last still valid value')
    }

const invalidMessagesForAllControlsInvolvedInCustomInvalidity: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${RANGED_PROPERTY_ONE_KEY} .invalid-message`))
            .toBe('duration must be less than pitch, obvs', 'spec ranged property one did not have the custom invalid message')
        expect(await elementInnerText(`#${RANGED_PROPERTY_TWO_KEY} .invalid-message`))
            .toBe('pitch must be more than duration, obvs', 'spec ranged property two did not have the custom invalid message')
    }

const fixCustomValidity: () => Promise<void> =
    async (): Promise<void> => {
        const control: ElementHandle = await findElement(`input[type=number]#${RANGED_PROPERTY_TWO_KEY}`)
        const MODIFICATION_RETURNING_INPUT_TO_CUSTOM_VALID_STATE: string = '86'
        await control.type(MODIFICATION_RETURNING_INPUT_TO_CUSTOM_VALID_STATE)
    }

const modifyAControlNotInvolvedInTheCustomValidityCheck: () => Promise<void> =
    async (): Promise<void> => {
        await selectOption(`select#${OPTIONED_PROPERTY_ONE_KEY}`, SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)
    }

const invalidateJustOneFieldOfAnArrayedSpecControl: () => Promise<void> =
    async (): Promise<void> => {
        const control: ElementHandle = await findElement(`input[type=number]#${ARRAYED_PROPERTY_KEY}-2`)
        await control.type(BAD_FORMAT_INVALID_TEST_MODIFICATION)
    }

const justThatOneFieldIsMarkedIsInvalidAndTheOtherFieldsOfThatArrayedSpecControlAreStillMarkedAsValid: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`input[type=number]#${ARRAYED_PROPERTY_KEY}-0.${SpecControlStates.VALID}`))
            .toBeTruthy('one of the other fields of the arrayed control was not valid')
        expect(await elementExists(`input[type=number]#${ARRAYED_PROPERTY_KEY}-1.${SpecControlStates.VALID}`))
            .toBeTruthy('one of the other fields of the arrayed control was not valid')
        expect(await elementExists(`input[type=number]#${ARRAYED_PROPERTY_KEY}-2.${SpecControlStates.INVALID}`))
            .toBeTruthy('that one feild of the arrayed control was not marked as invalid')
        expect(await elementExists(`input[type=number]#${ARRAYED_PROPERTY_KEY}-3.${SpecControlStates.VALID}`))
            .toBeTruthy('one of the other fields of the arrayed control was not valid')
        expect(await elementExists(`input[type=number]#${ARRAYED_PROPERTY_KEY}-4.${SpecControlStates.VALID}`))
            .toBeTruthy('one of the other fields of the arrayed control was not valid')
    }

const clickRemove: () => Promise<void> =
    async (): Promise<void> => {
        await clickElement(`#${ARRAYED_PROPERTY_KEY} .remove`)
    }

const everyFieldHasAnInvalidMessage: () => Promise<void> =
    async (): Promise<void> => {
        const expectedInvalidMessage: string = 'arrays can only be odd in length, duoy'
        expect(await elementInnerText(`#${ARRAYED_PROPERTY_KEY}-0 .invalid-message`))
            .toBe(expectedInvalidMessage, 'a field did not have an invalid message')
        expect(await elementInnerText(`#${ARRAYED_PROPERTY_KEY}-1 .invalid-message`))
            .toBe(expectedInvalidMessage, 'a field did not have an invalid message')
        expect(await elementInnerText(`#${ARRAYED_PROPERTY_KEY}-2 .invalid-message`))
            .toBe(expectedInvalidMessage, 'a field did not have an invalid message')
        expect(await elementInnerText(`#${ARRAYED_PROPERTY_KEY}-3 .invalid-message`))
            .toBe(expectedInvalidMessage, 'a field did not have an invalid message')
    }

const modifyStringedControlToBeTooShort: () => Promise<void> =
    async (): Promise<void> => {
        await deleteCharacterFromInput(`input[type=text]#${STRINGED_PROPERTY_KEY}`)
    }

const modifyStringedControlToBeTooLong: () => Promise<void> =
    async (): Promise<void> => {
        const control: ElementHandle = await findElement(`input[type=text]#${STRINGED_PROPERTY_KEY}`)
        await control.type(MODIFICATION_CAUSING_STRINGED_CONTROL_TO_EXCEED_ITS_MAX_LENGTH)
    }

describe('invalid controls', () => {
    describe('ranged controls - bad format', () => {
        beforeEach(async (done: DoneFn) => {
            await refreshForSpecControlsTest()
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
            await refreshForSpecControlsTest()
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
            await refreshForSpecControlsTest()
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

        it('displays the too-short value in the input', async (done: DoneFn) => {
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
            await refreshForSpecControlsTest()
            await modifyStringedControlToBeTooLong()

            done()
        })

        it('marks the input as invalid', async (done: DoneFn) => {
            await stringedControlInputIsMarkedAsInvalid()

            done()
        })

        it('it does not submit the invalid data which could crash things', async (done: DoneFn) => {
            await stringedControlTooLongValueWasNotSubmittedAndItIsAtTheLastValidValueBeforeItGotTooLong()

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
            await stringedControlTooLongValueWasNotSubmittedAndItIsAtTheLastValidValueBeforeItGotTooLong()
            await stringedControlInputHasTooLongMessage()

            done()
        })
    })

    describe('arrayed controls', () => {
        beforeEach(async (done: DoneFn) => {
            await refreshForSpecControlsTest()
            await invalidateJustOneFieldOfAnArrayedSpecControl()

            done()
        })

        it('only marks the specific element which is invalid', async (done: DoneFn) => {
            await justThatOneFieldIsMarkedIsInvalidAndTheOtherFieldsOfThatArrayedSpecControlAreStillMarkedAsValid()

            done()
        })
    })

    describe('breaking custom validity', () => {
        beforeEach(async (done: DoneFn) => {
            await quickRefresh()
            await selectValidationPattern()
            await openSpecControlsIfNotOpen()

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
