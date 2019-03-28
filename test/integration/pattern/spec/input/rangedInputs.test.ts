import { ElementHandle } from 'puppeteer'
import { FieldValidityClassName, SecretTestSelector } from '../../../../../src/indexForTest'
import {
    ARRAYED_SPEC_KEY,
    BAD_FORMAT_INVALID_TEST_MODIFICATION,
    deleteCharacterFromInput,
    elementExists,
    elementIds,
    elementInnerText,
    elementValue,
    findElement,
    OPTIONED_SPEC_ONE_KEY,
    OUT_OF_RANGE_INVALID_TEST_MODIFICATION,
    RANGED_SPEC_ONE_KEY,
    RANGED_SPEC_TWO_KEY,
    refreshForSpecControlsTest,
    selectOption,
    SPEC_CONTROLS_PATTERN_OPTIONED_SPEC_ONE_MODIFIED_VALUE,
    SPEC_CONTROLS_PATTERN_RANGED_SPEC_ONE_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_RANGED_SPEC_ONE_MAX_VALUE,
    SPEC_CONTROLS_PATTERN_RANGED_SPEC_TWO_INITIAL_VALUE,
    VALID_TEST_MODIFICATION,
} from '../../../../support'

const modifyRangedInput: () => Promise<void> =
    async (): Promise<void> => {
        const rangedInput: ElementHandle = await findElement(`input[type=number]#${RANGED_SPEC_ONE_KEY}`)
        await rangedInput.type(VALID_TEST_MODIFICATION)
    }

const rangedInputIsModified: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${RANGED_SPEC_ONE_KEY}.${SecretTestSelector.SUBMITTED_SPEC}`))
            .toBe(
                `${SPEC_CONTROLS_PATTERN_RANGED_SPEC_ONE_INITIAL_VALUE}${VALID_TEST_MODIFICATION}`,
                'ranged input was not modified',
            )
    }

const controlsAreInOrder: () => Promise<void> =
    async (): Promise<void> => {
        const controlIds: string[] = await elementIds('#spec-panel input[type=number]')
        expect(controlIds)
            .toEqual(
                [
                    `${ARRAYED_SPEC_KEY}-0`,
                    `${ARRAYED_SPEC_KEY}-1`,
                    `${ARRAYED_SPEC_KEY}-2`,
                    `${ARRAYED_SPEC_KEY}-3`,
                    `${ARRAYED_SPEC_KEY}-4`,
                    RANGED_SPEC_ONE_KEY,
                    RANGED_SPEC_TWO_KEY,
                ],
                'the controls were not in order',
            )
    }

const modifyInputsForSomeOtherControls: () => Promise<void> =
    async (): Promise<void> => {
        const previouslySubmittedControlInput: ElementHandle = await findElement(
            `input[type=number]#${RANGED_SPEC_TWO_KEY}`,
        )
        await previouslySubmittedControlInput.type(VALID_TEST_MODIFICATION)

        await selectOption(
            `select#${OPTIONED_SPEC_ONE_KEY}`,
            SPEC_CONTROLS_PATTERN_OPTIONED_SPEC_ONE_MODIFIED_VALUE,
        )
    }

const theInputsForThoseOtherControlsAreStillModified: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(
            `#${RANGED_SPEC_TWO_KEY}.${SecretTestSelector.SUBMITTED_SPEC}`,
        ))
            .toBe(
                `${SPEC_CONTROLS_PATTERN_RANGED_SPEC_TWO_INITIAL_VALUE}${VALID_TEST_MODIFICATION}`,
                'the other control that was a ranged control - its input was not still modified',
            )
        expect(await elementInnerText(`#${OPTIONED_SPEC_ONE_KEY}.${SecretTestSelector.SUBMITTED_SPEC}`))
            .toBe(
                SPEC_CONTROLS_PATTERN_OPTIONED_SPEC_ONE_MODIFIED_VALUE,
                'the other control that was an optioned control - its input was not still modified',
            )
    }

const modifyRangedInputToBeBadlyFormatted: () => Promise<void> =
    async (): Promise<void> => {
        const rangedInput: ElementHandle = await findElement(`input[type=number]#${RANGED_SPEC_ONE_KEY}`)
        await rangedInput.type(BAD_FORMAT_INVALID_TEST_MODIFICATION)
    }

const modifyRangedInputToBeOutOfRange: () => Promise<void> =
    async (): Promise<void> => {
        const rangedInput: ElementHandle = await findElement(`input[type=number]#${RANGED_SPEC_ONE_KEY}`)
        await rangedInput.type(OUT_OF_RANGE_INVALID_TEST_MODIFICATION)
    }

const modifyInputForAnotherControlValidly: () => Promise<void> =
    async (): Promise<void> => {
        const inputForAnotherControl: ElementHandle = await findElement(
            `input[type=number]#${RANGED_SPEC_TWO_KEY}`,
        )
        await inputForAnotherControl.type(VALID_TEST_MODIFICATION)
    }

const rangedInputIsMarkedAsInvalid: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`input[type=number]#${RANGED_SPEC_ONE_KEY}.${FieldValidityClassName.INVALID}`))
            .toBeTruthy('ranged input was not marked as invalid')
    }

const rangedInputIsMarkedAsValid: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`input[type=number]#${RANGED_SPEC_ONE_KEY}.${FieldValidityClassName.VALID}`))
            .toBeTruthy('ranged input was not marked as valid')
    }

const rangedInputWasNotSubmitted: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${RANGED_SPEC_ONE_KEY}.${SecretTestSelector.SUBMITTED_SPEC}`))
            .toBe(`${SPEC_CONTROLS_PATTERN_RANGED_SPEC_ONE_INITIAL_VALUE}`, 'ranged input was submitted')
    }

const rangedInputDisplayValueIsWiped: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementValue(`input[type=number]#${RANGED_SPEC_ONE_KEY}`))
            .toBe('', 'ranged input display value was not wiped')
    }

const rangedInputDisplayValueIsTheOutOfRangeValue: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementValue(`input[type=number]#${RANGED_SPEC_ONE_KEY}`))
            .toBe(
                `${SPEC_CONTROLS_PATTERN_RANGED_SPEC_ONE_INITIAL_VALUE}${OUT_OF_RANGE_INVALID_TEST_MODIFICATION}`,
                'ranged input display value was not the out of range value',
            )
    }

const rangedInputHasBadFormatMessage: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${RANGED_SPEC_ONE_KEY} .invalid-message`))
            .toBe(
                'this input is formatted in a way which cannot be parsed',
                'ranged input did not have the bad format message',
            )
    }

const rangedInputHasOutOfRangeMessage: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${RANGED_SPEC_ONE_KEY} .invalid-message`))
            .toBe(
                `must be less than ${SPEC_CONTROLS_PATTERN_RANGED_SPEC_ONE_MAX_VALUE}`,
                'ranged input did not have out-of-range invalid message',
            )
    }

const undoRangedInputEitherModification: () => Promise<void> =
    async (): Promise<void> => {
        await deleteCharacterFromInput(`input[type=number]#${RANGED_SPEC_ONE_KEY}`)
    }

describe('ranged input', () => {
    describe('submitting', () => {
        beforeEach(async (done: DoneFn) => {
            await refreshForSpecControlsTest()
            done()
        })

        it('immediately submits when you modify it', async (done: DoneFn) => {
            await modifyRangedInput()
            await rangedInputIsModified()

            done()
        })

        it('preserves earlier spec modifications when you modify another control', async (done: DoneFn) => {
            await modifyInputsForSomeOtherControls()

            await modifyRangedInput()
            await theInputsForThoseOtherControlsAreStillModified()

            done()
        })

        it('keeps the controls in the same order after modifying', async (done: DoneFn) => {
            await controlsAreInOrder()

            await modifyRangedInput()
            await controlsAreInOrder()

            done()
        })
    })

    describe('invalid state', () => {
        describe('bad format', () => {
            beforeEach(async (done: DoneFn) => {
                await refreshForSpecControlsTest()
                await modifyRangedInputToBeBadlyFormatted()

                done()
            })

            it('marks the input as invalid', async (done: DoneFn) => {
                await rangedInputIsMarkedAsInvalid()

                done()
            })

            it('it does not submit the invalid value which could crash things', async (done: DoneFn) => {
                await rangedInputWasNotSubmitted()

                done()
            })

            it('wipes out the displayed value', async (done: DoneFn) => {
                await rangedInputDisplayValueIsWiped()

                done()
            })

            it('shows an invalid message', async (done: DoneFn) => {
                await rangedInputHasBadFormatMessage()

                done()
            })

            it('resets the input to valid after typing something valid into it', async (done: DoneFn) => {
                await undoRangedInputEitherModification()
                await rangedInputIsMarkedAsValid()

                done()
            })

            it('preserves the invalid state, displayed value, and invalid message, and still withholds submitting, if you modify an input for another control', async (done: DoneFn) => {
                await modifyInputForAnotherControlValidly()
                await rangedInputIsMarkedAsInvalid()
                await rangedInputWasNotSubmitted()
                await rangedInputDisplayValueIsWiped()
                await rangedInputHasBadFormatMessage()

                done()
            })
        })

        describe('out of range', () => {
            beforeEach(async (done: DoneFn) => {
                await refreshForSpecControlsTest()
                await modifyRangedInputToBeOutOfRange()

                done()
            })

            it('marks the input as invalid', async (done: DoneFn) => {
                await rangedInputIsMarkedAsInvalid()

                done()
            })

            it('it does not submit the invalid value which could crash things', async (done: DoneFn) => {
                await rangedInputWasNotSubmitted()

                done()
            })

            it('displays the out of range value in the input', async (done: DoneFn) => {
                await rangedInputDisplayValueIsTheOutOfRangeValue()

                done()
            })

            it('shows an invalid message', async (done: DoneFn) => {
                await rangedInputHasOutOfRangeMessage()

                done()
            })

            it('resets the input to valid after typing something valid into it', async (done: DoneFn) => {
                await undoRangedInputEitherModification()
                await rangedInputIsMarkedAsValid()

                done()
            })

            it('preserves the invalid state, displayed value, and invalid message, and still withholds submitting, if you modify an input for another control', async (done: DoneFn) => {
                await modifyInputForAnotherControlValidly()
                await rangedInputIsMarkedAsInvalid()
                await rangedInputDisplayValueIsTheOutOfRangeValue()
                await rangedInputWasNotSubmitted()
                await rangedInputHasOutOfRangeMessage()

                done()
            })
        })
    })
})