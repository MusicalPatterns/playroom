// tslint:disable no-duplicate-string

import { indexOfLastCharacter } from '@musical-patterns/utilities'
import { ElementHandle } from 'puppeteer'
import { FieldValidity, SecretTestSelectors } from '../../../../src/indexForTest'
import {
    deleteCharacterFromInput,
    elementExists,
    elementInnerText,
    elementValue,
    findElement,
    RANGED_PROPERTY_TWO_KEY,
    refreshForSpecControlsTest,
    SPEC_CONTROLS_PATTERN_STRINGED_PROPERTY_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_STRINGED_PROPERTY_ONE_MAX_LENGTH,
    SPEC_CONTROLS_PATTERN_STRINGED_PROPERTY_ONE_MIN_LENGTH,
    STRINGED_PROPERTY_KEY,
    VALID_TEST_MODIFICATION,
} from '../../../support'

const MODIFICATION_CAUSING_STRINGED_INPUT_TO_EXCEED_ITS_MAX_LENGTH: string = 'HI'
const PART_OF_MODIFICATION_WITHIN_MAX_LENGTH_OF_STRINGED_INPUT: string =
    MODIFICATION_CAUSING_STRINGED_INPUT_TO_EXCEED_ITS_MAX_LENGTH.slice(0, 1)

const modifyStringedInput: () => Promise<void> =
    async (): Promise<void> => {
        const stringedInput: ElementHandle = await findElement(`input[type=text]#${STRINGED_PROPERTY_KEY}`)
        await stringedInput.type(VALID_TEST_MODIFICATION)
    }

const stringedInputIsModified: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${STRINGED_PROPERTY_KEY} .${SecretTestSelectors.SUBMITTED_SPEC}`))
            .toBe(
                `${SPEC_CONTROLS_PATTERN_STRINGED_PROPERTY_INITIAL_VALUE}${VALID_TEST_MODIFICATION}`,
                'stringed control was not modified',
            )
    }

const modifyInputForAnotherControlValidly: () => Promise<void> =
    async (): Promise<void> => {
        const inputForAnotherControl: ElementHandle = await findElement(
            `input[type=number]#${RANGED_PROPERTY_TWO_KEY}`,
        )
        await inputForAnotherControl.type(VALID_TEST_MODIFICATION)
    }

const stringedInputIsMarkedAsInvalid: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`input[type=text]#${STRINGED_PROPERTY_KEY}.${FieldValidity.INVALID}`))
            .toBeTruthy('stringed input was not marked as invalid')
    }

const stringedContolInputIsMarkedAsValid: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`input[type=text]#${STRINGED_PROPERTY_KEY}.${FieldValidity.VALID}`))
            .toBeTruthy('stringed input was not marked as valid')
    }

const stringedInputTooLongValueWasNotSubmittedAndItIsAtTheLastValidValueBeforeItGotTooLong: () => Promise<void> =
    async (): Promise<void> => {
        const stringedInputSubmittedValue: string = await elementInnerText(
            `#${STRINGED_PROPERTY_KEY} .${SecretTestSelectors.SUBMITTED_SPEC}`,
        )
        expect(stringedInputSubmittedValue)
            .toBe(
                `${SPEC_CONTROLS_PATTERN_STRINGED_PROPERTY_INITIAL_VALUE}${PART_OF_MODIFICATION_WITHIN_MAX_LENGTH_OF_STRINGED_INPUT}`,
                `stringed input was not at the last valid value before it got too long`,
            )
    }

const stringedInputWasNotSubmitted: () => Promise<void> =
    async (): Promise<void> => {
        const stringedInputSubmittedValue: string = await elementInnerText(
            `#${STRINGED_PROPERTY_KEY} .${SecretTestSelectors.SUBMITTED_SPEC}`,
        )
        expect(stringedInputSubmittedValue)
            .toBe(
                `${SPEC_CONTROLS_PATTERN_STRINGED_PROPERTY_INITIAL_VALUE}`,
                `stringed input was submitted`,
            )
    }

const stringedInputDisplayValueIsTheTooLongValue: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementValue(`input[type=text]#${STRINGED_PROPERTY_KEY}`))
            .toBe(
                `${SPEC_CONTROLS_PATTERN_STRINGED_PROPERTY_INITIAL_VALUE}${MODIFICATION_CAUSING_STRINGED_INPUT_TO_EXCEED_ITS_MAX_LENGTH}`,
                'stringed control display value was not the too long value',
            )
    }

const stringedInputDisplayValueIsTheTooShortValue: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementValue(`input[type=text]#${STRINGED_PROPERTY_KEY}`))
            .toBe(
                SPEC_CONTROLS_PATTERN_STRINGED_PROPERTY_INITIAL_VALUE.slice(
                    0,
                    indexOfLastCharacter(SPEC_CONTROLS_PATTERN_STRINGED_PROPERTY_INITIAL_VALUE),
                ),
                'stringed input display value was not the too short value',
            )
    }

const stringedInputHasTooLongMessage: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${STRINGED_PROPERTY_KEY} .invalid-message`))
            .toBe(
                `must be ${SPEC_CONTROLS_PATTERN_STRINGED_PROPERTY_ONE_MAX_LENGTH} characters or less`,
                'stringed input did not have too-long invalid message',
            )
    }

const stringedInputHasTooShortMessage: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${STRINGED_PROPERTY_KEY} .invalid-message`))
            .toBe(
                `must be ${SPEC_CONTROLS_PATTERN_STRINGED_PROPERTY_ONE_MIN_LENGTH} characters or more`,
                'stringed input did not have too-short invalid message',
            )
    }

const undoStringedInputTooLongModification: () => Promise<void> =
    async (): Promise<void> => {
        await deleteCharacterFromInput(`input[type=text]#${STRINGED_PROPERTY_KEY}`)
        await deleteCharacterFromInput(`input[type=text]#${STRINGED_PROPERTY_KEY}`)
    }

const undoStringedInputTooShortModification: () => Promise<void> =
    async (): Promise<void> => {
        const stringedInput: ElementHandle = await findElement(`input[type=text]#${STRINGED_PROPERTY_KEY}`)
        await stringedInput.type(VALID_TEST_MODIFICATION)
    }

const modifyStringedInputToBeTooShort: () => Promise<void> =
    async (): Promise<void> => {
        await deleteCharacterFromInput(`input[type=text]#${STRINGED_PROPERTY_KEY}`)
    }

const modifyStringedInputToBeTooLong: () => Promise<void> =
    async (): Promise<void> => {
        const stringedInput: ElementHandle = await findElement(`input[type=text]#${STRINGED_PROPERTY_KEY}`)
        await stringedInput.type(MODIFICATION_CAUSING_STRINGED_INPUT_TO_EXCEED_ITS_MAX_LENGTH)
    }

describe('stringed input', () => {
    describe('submitting', () => {
        beforeEach(async (done: DoneFn) => {
            await refreshForSpecControlsTest()
            done()
        })

        it('immediately submits when you modify it', async (done: DoneFn) => {
            await modifyStringedInput()
            await stringedInputIsModified()

            done()
        })
    })

    describe('invalid state', () => {
        describe('too short', () => {
            beforeEach(async (done: DoneFn) => {
                await refreshForSpecControlsTest()
                await modifyStringedInputToBeTooShort()

                done()
            })

            it('marks the input as invalid', async (done: DoneFn) => {
                await stringedInputIsMarkedAsInvalid()

                done()
            })

            it('it does not submit the invalid data which could crash things', async (done: DoneFn) => {
                await stringedInputWasNotSubmitted()

                done()
            })

            it('displays the too-short value in the input', async (done: DoneFn) => {
                await stringedInputDisplayValueIsTheTooShortValue()

                done()
            })

            it('shows an invalid message', async (done: DoneFn) => {
                await stringedInputHasTooShortMessage()

                done()
            })

            it('resets the input to valid after typing something valid into it', async (done: DoneFn) => {
                await undoStringedInputTooShortModification()
                await stringedContolInputIsMarkedAsValid()

                done()
            })

            it('preserves the invalid state, displayed value, and invalid message, and still withholds submitting, if you modify an input for another control', async (done: DoneFn) => {
                await modifyInputForAnotherControlValidly()
                await stringedInputIsMarkedAsInvalid()
                await stringedInputDisplayValueIsTheTooShortValue()
                await stringedInputWasNotSubmitted()
                await stringedInputHasTooShortMessage()

                done()
            })
        })

        describe('too long', () => {
            beforeEach(async (done: DoneFn) => {
                await refreshForSpecControlsTest()
                await modifyStringedInputToBeTooLong()

                done()
            })

            it('marks the input as invalid', async (done: DoneFn) => {
                await stringedInputIsMarkedAsInvalid()

                done()
            })

            it('it does not submit the invalid data which could crash things', async (done: DoneFn) => {
                await stringedInputTooLongValueWasNotSubmittedAndItIsAtTheLastValidValueBeforeItGotTooLong()

                done()
            })

            it('displays the too-long value in the input', async (done: DoneFn) => {
                await stringedInputDisplayValueIsTheTooLongValue()

                done()
            })

            it('shows an invalid message', async (done: DoneFn) => {
                await stringedInputHasTooLongMessage()

                done()
            })

            it('resets the input to valid after typing something valid into it', async (done: DoneFn) => {
                await undoStringedInputTooLongModification()
                await stringedContolInputIsMarkedAsValid()

                done()
            })

            it('preserves the invalid state, displayed value, and invalid message, and still withholds submitting, if you modify an input for another control', async (done: DoneFn) => {
                await modifyInputForAnotherControlValidly()
                await stringedInputIsMarkedAsInvalid()
                await stringedInputDisplayValueIsTheTooLongValue()
                await stringedInputTooLongValueWasNotSubmittedAndItIsAtTheLastValidValueBeforeItGotTooLong()
                await stringedInputHasTooLongMessage()

                done()
            })
        })
    })
})
