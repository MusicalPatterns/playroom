import { Ms, Point, sleep } from '@musical-patterns/utilities'
import { ElementHandle } from 'puppeteer'
import { FieldValidityClassName, SecretTestSelector } from '../../../../../src/indexForTest'
import {
    A_BIT_LONGER,
    clickTimeControl,
    currentTime,
    deleteCharacterFromInput,
    elementExists,
    elementInnerText,
    findElement,
    hasBeenReset,
    isAfter,
    isPlaying,
    LONG_ENOUGH_FOR_TIME_TO_PASS,
    loseFocus,
    openSpecControlsIfNotOpen,
    OPTIONED_SPEC_ONE_KEY,
    quickRefresh,
    RANGED_SPEC_ONE_KEY,
    RANGED_SPEC_TWO_KEY,
    selectLongDurationPattern,
    selectOnlyPatternParticularSpecsPattern,
    selectOnlyStandardSpecsPattern,
    selectOption,
    selectRestartPattern,
    selectSpecControlsPattern,
    selectValidationPattern,
    SPEC_CONTROLS_PATTERN_OPTIONED_SPEC_ONE_MODIFIED_VALUE,
    SPEC_CONTROLS_PATTERN_RANGED_SPEC_ONE_INITIAL_VALUE,
    VALID_TEST_MODIFICATION,
} from '../../../../support'

const SECTION_HEADING: string = '#spec-controls h3'
const MODIFICATION_WHICH_STILL_LEAVES_THINGS_CUSTOM_INVALID_BUT_WILL_ALSO_BE_FIXED_BY_THE_FIX_THE_TEST_USES: string = '0'

const rangedInputIsMarkedAsInvalid: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`input[type=number]#${RANGED_SPEC_TWO_KEY}.${FieldValidityClassName.INVALID}`))
            .toBeTruthy('ranged input was not marked as invalid')
    }

const otherInputIsAlsoMarkedAsInvalid: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`input[type=number]#${RANGED_SPEC_ONE_KEY}.${FieldValidityClassName.INVALID}`))
            .toBeTruthy('other input was not market as invalid')
    }

const rangedInputIsMarkedAsValid: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`input[type=number]#${RANGED_SPEC_TWO_KEY}.${FieldValidityClassName.VALID}`))
            .toBeTruthy('ranged input was not marked as valid')
    }

const otherInputIsAlsoMarkedAsValid: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`input[type=number]#${RANGED_SPEC_ONE_KEY}.${FieldValidityClassName.VALID}`))
            .toBeTruthy('other ranged control input was not marked as valid')
    }

const enterCustomInvalidityStateAndStoreFinalStillValidValue: () => Promise<string> =
    async (): Promise<string> => {
        await deleteCharacterFromInput(`input[type=number]#${RANGED_SPEC_TWO_KEY}`)
        const finalStillValidValue: string = await elementInnerText(
            `#${RANGED_SPEC_TWO_KEY}.${SecretTestSelector.SUBMITTED_SPEC}`,
        )
        await deleteCharacterFromInput(`input[type=number]#${RANGED_SPEC_TWO_KEY}`)
        const SELECT_ANYTHING_ELSE: string = '#first-row .right'
        await loseFocus(SELECT_ANYTHING_ELSE)

        return finalStillValidValue
    }

const theSubmittedValueIsTheFinalStillValidValue: (finalStillValidValue: string) => Promise<void> =
    async (finalStillValidValue: string): Promise<void> => {
        expect(await elementInnerText(`#${RANGED_SPEC_TWO_KEY}.${SecretTestSelector.SUBMITTED_SPEC}`))
            .toBe(finalStillValidValue, 'the submitted value was not the final still valid value')
    }

const invalidMessagesForAllControlsInvolvedInCustomInvalidity: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${RANGED_SPEC_ONE_KEY} .invalid-message`))
            .toBe(
                'duration must be less than pitch, obvs',
                'ranged spec one did not have the custom invalid message',
            )
        expect(await elementInnerText(`#${RANGED_SPEC_TWO_KEY} .invalid-message`))
            .toBe(
                'pitch must be more than duration, obvs',
                'ranged spec two did not have the custom invalid message',
            )
    }

const fixCustomValidity: () => Promise<void> =
    async (): Promise<void> => {
        const control: ElementHandle = await findElement(`input[type=number]#${RANGED_SPEC_TWO_KEY}`)
        const MODIFICATION_RETURNING_INPUT_TO_CUSTOM_VALID_STATE: string = '86'
        await control.type(MODIFICATION_RETURNING_INPUT_TO_CUSTOM_VALID_STATE)
    }

const modifyAControlNotInvolvedInTheCustomValidityCheck: () => Promise<void> =
    async (): Promise<void> => {
        await selectOption(
            `select#${OPTIONED_SPEC_ONE_KEY}`,
            SPEC_CONTROLS_PATTERN_OPTIONED_SPEC_ONE_MODIFIED_VALUE,
        )
    }

const modifySpecs: () => Promise<void> =
    async (): Promise<void> => {
        const input: ElementHandle = await findElement(`input[type=number]#${RANGED_SPEC_ONE_KEY}`)
        await input.type(VALID_TEST_MODIFICATION)
    }

const modifyTheOtherInvalidControl: () => Promise<void> =
    async (): Promise<void> => {
        const otherControl: ElementHandle = await findElement(`input[type=number]#${RANGED_SPEC_ONE_KEY}`)
        await otherControl.type(MODIFICATION_WHICH_STILL_LEAVES_THINGS_CUSTOM_INVALID_BUT_WILL_ALSO_BE_FIXED_BY_THE_FIX_THE_TEST_USES)
    }

const modificationToTheOtherControlThatWasInvalidHasBeenSubmitted: () => Promise<void> =
    async (): Promise<void> => {
        const otherControlSubmittedValue: string = await elementInnerText(
            `#${RANGED_SPEC_ONE_KEY}.${SecretTestSelector.SUBMITTED_SPEC}`,
        )
        expect(otherControlSubmittedValue)
            .toBe(`${SPEC_CONTROLS_PATTERN_RANGED_SPEC_ONE_INITIAL_VALUE}${MODIFICATION_WHICH_STILL_LEAVES_THINGS_CUSTOM_INVALID_BUT_WILL_ALSO_BE_FIXED_BY_THE_FIX_THE_TEST_USES}`)
    }

describe('spec controls', () => {
    it('shows sub-headings when both standard and pattern-particular controls are present', async (done: DoneFn) => {
        await selectSpecControlsPattern()
        await openSpecControlsIfNotOpen()

        expect(await elementExists(SECTION_HEADING))
            .toBeTruthy('section headings were not shown')

        done()
    })

    it('shows no sub-heading when only standard controls are present', async (done: DoneFn) => {
        await selectOnlyStandardSpecsPattern()
        await openSpecControlsIfNotOpen()

        expect(await elementInnerText(SECTION_HEADING))
            .toBe('')

        done()
    })

    it('shows no sub-heading when only pattern-particular controls are present', async (done: DoneFn) => {
        await selectOnlyPatternParticularSpecsPattern()
        await openSpecControlsIfNotOpen()

        expect(await elementInnerText(SECTION_HEADING))
            .toBe('')

        done()
    })

    describe('breaking custom validity across controls', () => {
        let finalStillValidValue: string
        beforeEach(async (done: DoneFn) => {
            await quickRefresh()
            await selectValidationPattern()
            await openSpecControlsIfNotOpen()
            finalStillValidValue = await enterCustomInvalidityStateAndStoreFinalStillValidValue()

            done()
        })

        it('marks all involved controls as invalid', async (done: DoneFn) => {
            await rangedInputIsMarkedAsInvalid()
            await otherInputIsAlsoMarkedAsInvalid()

            done()
        })

        it('it does not submit the invalid value which could crash things', async (done: DoneFn) => {
            await theSubmittedValueIsTheFinalStillValidValue(finalStillValidValue)

            done()
        })

        it('shows invalid messages for all involved controls', async (done: DoneFn) => {
            await invalidMessagesForAllControlsInvolvedInCustomInvalidity()

            done()
        })

        it('preserves the invalid states if you modify another control', async (done: DoneFn) => {
            await modifyAControlNotInvolvedInTheCustomValidityCheck()
            await rangedInputIsMarkedAsInvalid()
            await otherInputIsAlsoMarkedAsInvalid()

            done()
        })

        it('resets all involved controls to valid state after typing a fix', async (done: DoneFn) => {
            await fixCustomValidity()
            await rangedInputIsMarkedAsValid()
            await otherInputIsAlsoMarkedAsValid()

            done()
        })

        it('if you have modified the other spec while both were invalid, it submits both it and the one you changed', async (done: DoneFn) => {
            await modifyTheOtherInvalidControl()
            await fixCustomValidity()
            await modificationToTheOtherControlThatWasInvalidHasBeenSubmitted()

            done()
        })
    })

    describe('when a pattern is playing', () => {
        beforeEach(async (done: DoneFn) => {
            await quickRefresh()
            await selectLongDurationPattern()
            await clickTimeControl('play')
            await sleep(LONG_ENOUGH_FOR_TIME_TO_PASS)

            done()
        })

        afterEach(async (done: DoneFn) => {
            if (await elementExists('#pause')) {
                await clickTimeControl('pause')
            }
            done()
        })

        it('keeps playing when you modify the spec but does not reset time to the beginning', async (done: DoneFn) => {
            const timeOfModifyingSpecs: Point<Ms> = await currentTime()

            await openSpecControlsIfNotOpen()
            await modifySpecs()
            await isAfter(timeOfModifyingSpecs)
            await isPlaying()

            done()
        })
    })

    describe('when a pattern is playing that restarts upon spec modification', () => {
        beforeEach(async (done: DoneFn) => {
            await quickRefresh()
            await selectRestartPattern()
            await clickTimeControl('play')
            await sleep(LONG_ENOUGH_FOR_TIME_TO_PASS)

            done()
        })

        afterEach(async (done: DoneFn) => {
            if (await elementExists('#pause')) {
                await clickTimeControl('pause')
            }
            done()
        })

        it('keeps playing when you modify the spec and resets time to the beginning', async (done: DoneFn) => {
            await openSpecControlsIfNotOpen()
            await sleep(A_BIT_LONGER)
            const timeOfModifyingSpecs: Point<Ms> = await currentTime()
            await modifySpecs()
            await hasBeenReset({ toBefore: timeOfModifyingSpecs })
            await isPlaying()

            done()
        })
    })
})
