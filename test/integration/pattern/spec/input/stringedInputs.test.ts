// tslint:disable no-duplicate-string

import { ElementHandle } from 'puppeteer'
import { FieldValidityClassName, SecretTestSelector } from '../../../../../src/indexForTest'
import {
    deleteCharacterFromInput,
    elementExists,
    elementInnerText,
    elementValue,
    findElement,
    RANGED_SPEC_TWO_KEY,
    refreshForSpecControlsTest,
    SPEC_CONTROLS_PATTERN_STRINGED_SPEC_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_STRINGED_SPEC_ONE_MAX_LENGTH,
    SPEC_CONTROLS_PATTERN_STRINGED_SPEC_ONE_MIN_LENGTH,
    STRINGED_SPEC_KEY,
    VALID_TEST_MODIFICATION,
} from '../../../../support'

const MODIFICATION_CAUSING_STRINGED_INPUT_TO_EXCEED_ITS_MAX_LENGTH: string = 'HI'
const PART_OF_MODIFICATION_WITHIN_MAX_LENGTH_OF_STRINGED_INPUT: string =
    MODIFICATION_CAUSING_STRINGED_INPUT_TO_EXCEED_ITS_MAX_LENGTH.slice(0, 1)

const modifyStringedInput: () => Promise<void> =
    async (): Promise<void> => {
        const stringedInput: ElementHandle = await findElement(`input[type=text]#${STRINGED_SPEC_KEY}`)
        await stringedInput.type(VALID_TEST_MODIFICATION)
    }

const stringedInputIsModified: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${STRINGED_SPEC_KEY}.${SecretTestSelector.SUBMITTED_SPEC}`))
            .toBe(
                `${SPEC_CONTROLS_PATTERN_STRINGED_SPEC_INITIAL_VALUE}${VALID_TEST_MODIFICATION}`,
                'stringed control was not modified',
            )
    }

const modifyInputForAnotherControlValidly: () => Promise<void> =
    async (): Promise<void> => {
        const inputForAnotherControl: ElementHandle = await findElement(
            `input[type=number]#${RANGED_SPEC_TWO_KEY}`,
        )
        await inputForAnotherControl.type(VALID_TEST_MODIFICATION)
    }

const stringedInputIsMarkedAsInvalid: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`input[type=text]#${STRINGED_SPEC_KEY}.${FieldValidityClassName.INVALID}`))
            .toBeTruthy('stringed input was not marked as invalid')
    }

const stringedContolInputIsMarkedAsValid: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`input[type=text]#${STRINGED_SPEC_KEY}.${FieldValidityClassName.VALID}`))
            .toBeTruthy('stringed input was not marked as valid')
    }

const stringedInputTooLongValueWasNotSubmittedAndItIsAtTheFinalValidValueBeforeItGotTooLong: () => Promise<void> =
    async (): Promise<void> => {
        const stringedInputSubmittedValue: string = await elementInnerText(
            `#${STRINGED_SPEC_KEY}.${SecretTestSelector.SUBMITTED_SPEC}`,
        )
        expect(stringedInputSubmittedValue)
            .toBe(
                `${SPEC_CONTROLS_PATTERN_STRINGED_SPEC_INITIAL_VALUE}${PART_OF_MODIFICATION_WITHIN_MAX_LENGTH_OF_STRINGED_INPUT}`,
                `stringed input was not at the final valid value before it got too long`,
            )
    }

const stringedInputWasNotSubmitted: () => Promise<void> =
    async (): Promise<void> => {
        const stringedInputSubmittedValue: string = await elementInnerText(
            `#${STRINGED_SPEC_KEY}.${SecretTestSelector.SUBMITTED_SPEC}`,
        )
        expect(stringedInputSubmittedValue)
            .toBe(
                `${SPEC_CONTROLS_PATTERN_STRINGED_SPEC_INITIAL_VALUE}`,
                `stringed input was submitted`,
            )
    }

const stringedInputDisplayValueIsTheTooLongValue: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementValue(`input[type=text]#${STRINGED_SPEC_KEY}`))
            .toBe(
                `${SPEC_CONTROLS_PATTERN_STRINGED_SPEC_INITIAL_VALUE}${MODIFICATION_CAUSING_STRINGED_INPUT_TO_EXCEED_ITS_MAX_LENGTH}`,
                'stringed control display value was not the too long value',
            )
    }

const stringedInputDisplayValueIsTheTooShortValue: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementValue(`input[type=text]#${STRINGED_SPEC_KEY}`))
            .toBe(
                SPEC_CONTROLS_PATTERN_STRINGED_SPEC_INITIAL_VALUE.slice(
                    0,
                    SPEC_CONTROLS_PATTERN_STRINGED_SPEC_INITIAL_VALUE.length - 1,
                ),
                'stringed input display value was not the too short value',
            )
    }

const stringedInputHasTooLongMessage: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${STRINGED_SPEC_KEY} .invalid-message`))
            .toBe(
                `must be ${SPEC_CONTROLS_PATTERN_STRINGED_SPEC_ONE_MAX_LENGTH} characters or less`,
                'stringed input did not have too-long invalid message',
            )
    }

const stringedInputHasTooShortMessage: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${STRINGED_SPEC_KEY} .invalid-message`))
            .toBe(
                `must be ${SPEC_CONTROLS_PATTERN_STRINGED_SPEC_ONE_MIN_LENGTH} characters or more`,
                'stringed input did not have too-short invalid message',
            )
    }

const undoStringedInputTooLongModification: () => Promise<void> =
    async (): Promise<void> => {
        await deleteCharacterFromInput(`input[type=text]#${STRINGED_SPEC_KEY}`)
        await deleteCharacterFromInput(`input[type=text]#${STRINGED_SPEC_KEY}`)
    }

const undoStringedInputTooShortModification: () => Promise<void> =
    async (): Promise<void> => {
        const stringedInput: ElementHandle = await findElement(`input[type=text]#${STRINGED_SPEC_KEY}`)
        await stringedInput.type(VALID_TEST_MODIFICATION)
    }

const modifyStringedInputToBeTooShort: () => Promise<void> =
    async (): Promise<void> => {
        await deleteCharacterFromInput(`input[type=text]#${STRINGED_SPEC_KEY}`)
    }

const modifyStringedInputToBeTooLong: () => Promise<void> =
    async (): Promise<void> => {
        const stringedInput: ElementHandle = await findElement(`input[type=text]#${STRINGED_SPEC_KEY}`)
        await stringedInput.type(MODIFICATION_CAUSING_STRINGED_INPUT_TO_EXCEED_ITS_MAX_LENGTH)
    }

describe('stringed input', (): void => {
    describe('submitting', (): void => {
        beforeEach(async (): Promise<void> => {
            await refreshForSpecControlsTest()
        })

        it('immediately submits when you modify it', async (): Promise<void> => {
            await modifyStringedInput()
            await stringedInputIsModified()
        })
    })

    describe('invalid state', (): void => {
        describe('too short', (): void => {
            beforeEach(async (): Promise<void> => {
                await refreshForSpecControlsTest()
                await modifyStringedInputToBeTooShort()
            })

            it('marks the input as invalid', async (): Promise<void> => {
                await stringedInputIsMarkedAsInvalid()
            })

            it('it does not submit the invalid value which could crash things', async (): Promise<void> => {
                await stringedInputWasNotSubmitted()
            })

            it('displays the too-short value in the input', async (): Promise<void> => {
                await stringedInputDisplayValueIsTheTooShortValue()
            })

            it('shows an invalid message', async (): Promise<void> => {
                await stringedInputHasTooShortMessage()
            })

            it('resets the input to valid after typing something valid into it', async (): Promise<void> => {
                await undoStringedInputTooShortModification()
                await stringedContolInputIsMarkedAsValid()
            })

            it('preserves the invalid state, displayed value, and invalid message, and still withholds submitting, if you modify an input for another control', async (): Promise<void> => {
                await modifyInputForAnotherControlValidly()
                await stringedInputIsMarkedAsInvalid()
                await stringedInputDisplayValueIsTheTooShortValue()
                await stringedInputWasNotSubmitted()
                await stringedInputHasTooShortMessage()
            })
        })

        describe('too long', (): void => {
            beforeEach(async (): Promise<void> => {
                await refreshForSpecControlsTest()
                await modifyStringedInputToBeTooLong()
            })

            it('marks the input as invalid', async (): Promise<void> => {
                await stringedInputIsMarkedAsInvalid()
            })

            it('it does not submit the invalid value which could crash things', async (): Promise<void> => {
                await stringedInputTooLongValueWasNotSubmittedAndItIsAtTheFinalValidValueBeforeItGotTooLong()
            })

            it('displays the too-long value in the input', async (): Promise<void> => {
                await stringedInputDisplayValueIsTheTooLongValue()
            })

            it('shows an invalid message', async (): Promise<void> => {
                await stringedInputHasTooLongMessage()
            })

            it('resets the input to valid after typing something valid into it', async (): Promise<void> => {
                await undoStringedInputTooLongModification()
                await stringedContolInputIsMarkedAsValid()
            })

            it('preserves the invalid state, displayed value, and invalid message, and still withholds submitting, if you modify an input for another control', async (): Promise<void> => {
                await modifyInputForAnotherControlValidly()
                await stringedInputIsMarkedAsInvalid()
                await stringedInputDisplayValueIsTheTooLongValue()
                await stringedInputTooLongValueWasNotSubmittedAndItIsAtTheFinalValidValueBeforeItGotTooLong()
                await stringedInputHasTooLongMessage()
            })
        })
    })
})
