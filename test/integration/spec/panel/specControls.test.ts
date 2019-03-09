import { Ms, sleep } from '@musical-patterns/utilities'
import { ElementHandle } from 'puppeteer'
import { FieldValidity, SecretSelectorsForTest } from '../../../../src/indexForTest'
import {
    currentTime,
    deleteCharacterFromInput,
    elementExists,
    elementInnerText,
    findElement,
    isPlaying,
    LONG_ENOUGH_FOR_TIME_TO_PASS,
    loseFocus,
    openSpecControlsIfNotOpen,
    OPTIONED_PROPERTY_ONE_KEY,
    quickRefresh,
    RANGED_PROPERTY_ONE_KEY,
    RANGED_PROPERTY_TWO_KEY,
    selectLongDurationPattern,
    selectOnlyPatternParticularSpecPattern,
    selectOnlyStandardSpecPattern,
    selectOption,
    selectSpecControlsPattern,
    selectValidationPattern,
    SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE,
    VALID_TEST_MODIFICATION,
} from '../../../support'
import { clickTimeControl, isAfter } from '../../../support/time'

const SECTION_HEADING: string = '#spec-controls h3'

const rangedInputIsMarkedAsInvalid: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`input[type=number]#${RANGED_PROPERTY_ONE_KEY}.${FieldValidity.INVALID}`))
            .toBeTruthy('ranged input was not marked as invalid')
    }

const otherInputIsAlsoMarkedAsInvalid: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`input[type=number]#${RANGED_PROPERTY_TWO_KEY}.${FieldValidity.INVALID}`))
            .toBeTruthy('other input was not market as invalid')
    }

const rangedInputIsMarkedAsValid: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`input[type=number]#${RANGED_PROPERTY_ONE_KEY}.${FieldValidity.VALID}`))
            .toBeTruthy('ranged input was not marked as valid')
    }

const otherInputIsAlsoMarkedAsValid: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`input[type=number]#${RANGED_PROPERTY_TWO_KEY}.${FieldValidity.VALID}`))
            .toBeTruthy('other ranged control input was not marked as valid')
    }

const enterCustomInvalidityStateAndGetLastStillValidValue: () => Promise<string> =
    async (): Promise<string> => {
        await deleteCharacterFromInput(`input[type=number]#${RANGED_PROPERTY_TWO_KEY}`)
        const lastStillValidValue: string = await elementInnerText(`#${RANGED_PROPERTY_TWO_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC}`)
        await deleteCharacterFromInput(`input[type=number]#${RANGED_PROPERTY_TWO_KEY}`)
        const SELECT_ANYTHING_ELSE: string = '#first-row .right'
        await loseFocus(SELECT_ANYTHING_ELSE)

        return lastStillValidValue
    }

const theSubmittedValueIsTheLastStillValidValue: (lastStillValidValue: string) => Promise<void> =
    async (lastStillValidValue: string): Promise<void> => {
        expect(await elementInnerText(`#${RANGED_PROPERTY_TWO_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC}`))
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

const modifySpec: () => Promise<void> =
    async (): Promise<void> => {
        const input: ElementHandle = await findElement(`input[type=number]#${RANGED_PROPERTY_ONE_KEY}`)
        await input.type(VALID_TEST_MODIFICATION)
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
        await selectOnlyStandardSpecPattern()
        await openSpecControlsIfNotOpen()

        expect(await elementExists(SECTION_HEADING))
            .toBeFalsy('section headings were shown')

        done()
    })

    it('shows no sub-heading when only pattern-particular controls are present', async (done: DoneFn) => {
        await selectOnlyPatternParticularSpecPattern()
        await openSpecControlsIfNotOpen()

        expect(await elementExists(SECTION_HEADING))
            .toBeFalsy('section headings were shown')

        done()
    })

    describe('breaking custom validity across controls', () => {
        let lastStillValidValue: string
        beforeEach(async (done: DoneFn) => {
            await quickRefresh()
            await selectValidationPattern()
            await openSpecControlsIfNotOpen()
            lastStillValidValue = await enterCustomInvalidityStateAndGetLastStillValidValue()

            done()
        })

        it('marks all involved controls as invalid', async (done: DoneFn) => {
            await rangedInputIsMarkedAsInvalid()
            await otherInputIsAlsoMarkedAsInvalid()

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
            await rangedInputIsMarkedAsValid()
            await otherInputIsAlsoMarkedAsValid()

            done()
        })

        it('preserves the invalid states if you modify another control', async (done: DoneFn) => {
            await modifyAControlNotInvolvedInTheCustomValidityCheck()
            await rangedInputIsMarkedAsInvalid()
            await otherInputIsAlsoMarkedAsInvalid()

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
            const timeOfModifyingSpec: Ms = await currentTime()

            await openSpecControlsIfNotOpen()
            await modifySpec()
            await isAfter(timeOfModifyingSpec)
            await isPlaying()

            done()
        })
    })
})
