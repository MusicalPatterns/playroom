// tslint:disable no-duplicate-string

import { indexOfLastCharacter } from '@musical-patterns/utilities'
import { ElementHandle } from 'puppeteer'
import { FieldValidityClassName, SecretTestSelectors } from '../../../../src/indexForTest'
import {
    deleteCharacterFromInput,
    elementExists,
    elementInnerText,
    elementValue,
    findElement,
    RANGED_PROPERTY_TWO_KEY,
    refreshForSpecControlsTest,
    SPEC_CONTROLS_PATTERN_STRINGED_PROPERTY_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_STRINGED_PROPERTY_ONE_MIN_LENGTH,
    STRINGED_PROPERTY_KEY,
    VALID_TEST_MODIFICATION,
} from '../../../support'

const MODIFICATION_WITHIN_MAX_LENGTH: string = 'H'
const ADDITIONAL_MODIFICATION_CAUSING_EXCESSION_OF_MAX_LENGTH: string = 'I'

const modifyStringedInput: () => Promise<void> =
    async (): Promise<void> => {
        const stringedInput: ElementHandle = await findElement(`input[type=text]#${STRINGED_PROPERTY_KEY}`)
        await stringedInput.type(VALID_TEST_MODIFICATION)
    }

const stringedInputIsModified: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${STRINGED_PROPERTY_KEY}.${SecretTestSelectors.SUBMITTED_SPEC}`))
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
        expect(await elementExists(`input[type=text]#${STRINGED_PROPERTY_KEY}.${FieldValidityClassName.INVALID}`))
            .toBeTruthy('stringed input was not marked as invalid')
    }

const stringedInputIsMarkedAsValid: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`input[type=text]#${STRINGED_PROPERTY_KEY}.${FieldValidityClassName.VALID}`))
            .toBeTruthy('stringed input was not marked as valid')
    }

const stringedInputWasNotSubmitted: () => Promise<void> =
    async (): Promise<void> => {
        const stringedInputSubmittedValue: string = await elementInnerText(
            `#${STRINGED_PROPERTY_KEY}.${SecretTestSelectors.SUBMITTED_SPEC}`,
        )
        expect(stringedInputSubmittedValue)
            .toBe(
                SPEC_CONTROLS_PATTERN_STRINGED_PROPERTY_INITIAL_VALUE,
                'stringed input was not in its initial state',
            )
    }

const stringedInputIsInItsLastValidStateBeforeItWouldHaveGottenTooLong: () => Promise<void> =
    async (): Promise<void> => {
        const stringedInputSubmittedValue: string = await elementInnerText(
            `#${STRINGED_PROPERTY_KEY}.${SecretTestSelectors.SUBMITTED_SPEC}`,
        )
        expect(stringedInputSubmittedValue)
            .toBe(
                `${SPEC_CONTROLS_PATTERN_STRINGED_PROPERTY_INITIAL_VALUE}${MODIFICATION_WITHIN_MAX_LENGTH}`,
                `stringed input was not in the last valid state before it would have gotten too long`,
            )
    }

const stringedInputDisplayValueIsInItsLastValidStateBeforeItWouldHaveGottenTooLong: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementValue(`input[type=text]#${STRINGED_PROPERTY_KEY}`))
            .toBe(
                `${SPEC_CONTROLS_PATTERN_STRINGED_PROPERTY_INITIAL_VALUE}${MODIFICATION_WITHIN_MAX_LENGTH}`,
                'stringed control display value was not in the last valid state before it would have gotten too long',
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

const stringedInputHasNoInvalidMessage: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`#${STRINGED_PROPERTY_KEY} .invalid-message`))
            .toBeFalsy(
                'stringed input had an invalid message',
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

const undoStringedInputTooShortModification: () => Promise<void> =
    async (): Promise<void> => {
        const stringedInput: ElementHandle = await findElement(`input[type=text]#${STRINGED_PROPERTY_KEY}`)
        await stringedInput.type(VALID_TEST_MODIFICATION)
    }

const modifyStringedInputToBeTooShort: () => Promise<void> =
    async (): Promise<void> => {
        await deleteCharacterFromInput(`input[type=text]#${STRINGED_PROPERTY_KEY}`)
    }

const attemptToModifyStringedInputToBeTooLong: () => Promise<void> =
    async (): Promise<void> => {
        const stringedInput: ElementHandle = await findElement(`input[type=text]#${STRINGED_PROPERTY_KEY}`)
        await stringedInput.type(MODIFICATION_WITHIN_MAX_LENGTH)
        await stringedInput.type(ADDITIONAL_MODIFICATION_CAUSING_EXCESSION_OF_MAX_LENGTH)
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
                await stringedInputIsMarkedAsValid()

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
    })

    describe('cannot become too long', () => {
        beforeEach(async (done: DoneFn) => {
            await refreshForSpecControlsTest()
            await attemptToModifyStringedInputToBeTooLong()

            done()
        })

        it('the input is not marked as invalid', async (done: DoneFn) => {
            await stringedInputIsMarkedAsValid()

            done()
        })

        it('does not show an invalid message', async (done: DoneFn) => {
            await stringedInputHasNoInvalidMessage()

            done()
        })

        it('the submitted state is the last valid state before it would have gotten too long', async (done: DoneFn) => {
            await stringedInputIsInItsLastValidStateBeforeItWouldHaveGottenTooLong()

            done()
        })

        it('displays the last valid state before it would have gotten too long in the input', async (done: DoneFn) => {
            await stringedInputDisplayValueIsInItsLastValidStateBeforeItWouldHaveGottenTooLong()

            done()
        })
    })
})
