import { Ms, Point, sleep } from '@musical-patterns/utilities'
import { ElementHandle } from 'puppeteer'
import { FieldValidityClassName } from '../../../../../src/indexForTest'
import {
    A_BIT_LONGER,
    BAD_FORMAT_INVALID_TEST_MODIFICATION,
    clickElement,
    clickTimeControl,
    currentTime,
    deleteCharacterFromInput,
    elementChecked,
    elementExists,
    elementValue,
    findElement,
    hasBeenReset,
    isAfter,
    isPlaying,
    LONG_ENOUGH_FOR_TIME_TO_PASS,
    openSpecControlsIfNotOpen,
    OPTIONED_SPEC_ONE_KEY,
    quickRefresh,
    RANGED_SPEC_ONE_KEY,
    RANGED_SPEC_TWO_KEY,
    refreshForSpecControlsTest,
    selectLongDurationPattern,
    selectOption,
    selectRestartPattern,
    SPEC_CONTROLS_PATTERN_OPTIONED_SPEC_ONE_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_OPTIONED_SPEC_ONE_MODIFIED_VALUE,
    SPEC_CONTROLS_PATTERN_RANGED_SPEC_ONE_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_RANGED_SPEC_TWO_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_STRINGED_SPEC_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_TOGGLED_SPEC_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_TOGGLED_SPEC_MODIFIED_VALUE,
    STRINGED_SPEC_KEY,
    TOGGLED_SPEC_KEY,
    VALID_TEST_MODIFICATION,
} from '../../../../support'

const clickResetSpecsButton: () => Promise<void> =
    async (): Promise<void> => {
        await clickElement('button#reset-spec')
    }

const resetSpecsButtonIsDisabled: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`button#reset-spec:disabled`))
            .toBeTruthy('reset spec button was not disabled')
    }

const resetSpecsButtonIsEnabled: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`button#reset-spec:enabled`))
            .toBeTruthy('reset spec button was not enabled')
    }

const modifyControl: () => Promise<void> =
    async (): Promise<void> => {
        const control: ElementHandle = await findElement(`input[type=number]#${RANGED_SPEC_TWO_KEY}`)
        await control.type(VALID_TEST_MODIFICATION)
    }

const returnControlBackToItsDefault: () => Promise<void> =
    async (): Promise<void> => {
        await deleteCharacterFromInput(`input[type=number]#${RANGED_SPEC_TWO_KEY}`)
    }

const modifyAllTheThings: () => Promise<void> =
    async (): Promise<void> => {
        const rangedControlOne: ElementHandle = await findElement(
            `input[type=number]#${RANGED_SPEC_ONE_KEY}`,
        )
        await rangedControlOne.type(VALID_TEST_MODIFICATION)
        const rangedControlTwo: ElementHandle = await findElement(
            `input[type=number]#${RANGED_SPEC_TWO_KEY}`,
        )
        await rangedControlTwo.type(VALID_TEST_MODIFICATION)
        await selectOption(
            `select#${OPTIONED_SPEC_ONE_KEY}`,
            SPEC_CONTROLS_PATTERN_OPTIONED_SPEC_ONE_MODIFIED_VALUE,
        )
        await clickElement(`input#${TOGGLED_SPEC_KEY}`)
        const stringedControl: ElementHandle = await findElement(`input[type=text]#${STRINGED_SPEC_KEY}`)
        await stringedControl.type(VALID_TEST_MODIFICATION)
    }

const expectAllTheThingsToBeModified: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementValue(`input[type=number]#${RANGED_SPEC_ONE_KEY}`))
            .toBe(
                `${SPEC_CONTROLS_PATTERN_RANGED_SPEC_ONE_INITIAL_VALUE}${VALID_TEST_MODIFICATION}`,
                'ranged spec one was not in a modified state',
            )
        expect(await elementValue(`input[type=number]#${RANGED_SPEC_TWO_KEY}`))
            .toBe(
                `${SPEC_CONTROLS_PATTERN_RANGED_SPEC_TWO_INITIAL_VALUE}${VALID_TEST_MODIFICATION}`,
                'ranged spec two was not in a modified state',
            )
        expect(await elementValue(`select#${OPTIONED_SPEC_ONE_KEY}`))
            .toBe(
                SPEC_CONTROLS_PATTERN_OPTIONED_SPEC_ONE_MODIFIED_VALUE,
                'optioned spec one was not in a modified state',
            )
        expect(await elementChecked(`input#${TOGGLED_SPEC_KEY}`))
            .toBe(
                SPEC_CONTROLS_PATTERN_TOGGLED_SPEC_MODIFIED_VALUE,
                'toggled spec was not in a modified state',
            )
        expect(await elementValue(`input[type=text]#${STRINGED_SPEC_KEY}`))
            .toBe(
                `${SPEC_CONTROLS_PATTERN_STRINGED_SPEC_INITIAL_VALUE}${VALID_TEST_MODIFICATION}`,
                'stringed spec was not in a modified state',
            )
    }

const expectAllTheThingsToBeBackToTheirInitialStates: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementValue(`input[type=number]#${RANGED_SPEC_ONE_KEY}`))
            .toBe(
                `${SPEC_CONTROLS_PATTERN_RANGED_SPEC_ONE_INITIAL_VALUE}`,
                'ranged spec one was not back to initial state',
            )
        expect(await elementValue(`input[type=number]#${RANGED_SPEC_TWO_KEY}`))
            .toBe(
                `${SPEC_CONTROLS_PATTERN_RANGED_SPEC_TWO_INITIAL_VALUE}`,
                'ranged spec two was not back to initial state',
            )
        expect(await elementValue(`select#${OPTIONED_SPEC_ONE_KEY}`))
            .toBe(
                SPEC_CONTROLS_PATTERN_OPTIONED_SPEC_ONE_INITIAL_VALUE,
                'optioned spec one was not back to initial state',
            )
        expect(await elementChecked(`input#${TOGGLED_SPEC_KEY}`))
            .toBe(
                SPEC_CONTROLS_PATTERN_TOGGLED_SPEC_INITIAL_VALUE,
                'toggled spec was not back to initial state',
            )
        expect(await elementValue(`input[type=text]#${STRINGED_SPEC_KEY}`))
            .toBe(
                SPEC_CONTROLS_PATTERN_STRINGED_SPEC_INITIAL_VALUE,
                'stringed spec was not back to initial state',
            )
    }

const modifyControlToBeInvalid: () => Promise<void> =
    async (): Promise<void> => {
        const controlToBeInvalid: ElementHandle = await findElement(`input[type=number]#${RANGED_SPEC_TWO_KEY}`)
        await controlToBeInvalid.type(BAD_FORMAT_INVALID_TEST_MODIFICATION)
        expect(await elementExists(`input[type=number]#${RANGED_SPEC_TWO_KEY}.${FieldValidityClassName.INVALID}`))
            .toBeTruthy('control was not invalid')
    }

const modifyAnotherControlJustSoThatTheResetButtonIsEnabled: () => Promise<void> =
    async (): Promise<void> => {
        const inputToBeChangedSuchThatResetButtonIsEnabled: ElementHandle = await findElement(`input[type=number]#${RANGED_SPEC_ONE_KEY}`)
        await inputToBeChangedSuchThatResetButtonIsEnabled.type(VALID_TEST_MODIFICATION)
    }

const controlIsBackToValid: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`input[type=number]#${RANGED_SPEC_ONE_KEY}.${FieldValidityClassName.VALID}`))
            .toBeTruthy('control was not back to valid')
    }

describe('reset specs button', (): void => {
    beforeEach(async (): Promise<void> => {
        await refreshForSpecControlsTest()
    })

    it('reset specs button is disabled initially', async (): Promise<void> => {
        await resetSpecsButtonIsDisabled()
    })

    it('reset specs button is enabled when any control is modified', async (): Promise<void> => {
        await modifyControl()
        await resetSpecsButtonIsEnabled()
    })

    it('reset specs button is disabled when the control is modified back to the defaults', async (): Promise<void> => {
        await modifyControl()
        await resetSpecsButtonIsEnabled()

        await returnControlBackToItsDefault()

        await resetSpecsButtonIsDisabled()
    })

    it(`resets the specs to the pattern's defaults`, async (): Promise<void> => {
        await modifyAllTheThings()
        await expectAllTheThingsToBeModified()

        await clickResetSpecsButton()
        await expectAllTheThingsToBeBackToTheirInitialStates()
    })

    it('if there were any invalid controls, they no longer appear as invalid', async (): Promise<void> => {
        await modifyControlToBeInvalid()

        await modifyAnotherControlJustSoThatTheResetButtonIsEnabled()

        await clickResetSpecsButton()
        await controlIsBackToValid()
    })

    describe('when a pattern is playing', (): void => {
        beforeEach(async (): Promise<void> => {
            await quickRefresh()
            await selectLongDurationPattern()
            await clickTimeControl('play')
            await sleep(LONG_ENOUGH_FOR_TIME_TO_PASS)
        })

        afterEach(async (): Promise<void> => {
            if (await elementExists('#pause')) {
                await clickTimeControl('pause')
            }
        })

        it('keeps playing when you reset the spec but does not reset time to the beginning', async (): Promise<void> => {
            await openSpecControlsIfNotOpen()
            await modifyControl()
            await resetSpecsButtonIsEnabled()
            const timeOfResettingSpec: Point<Ms> = await currentTime()
            await clickResetSpecsButton()
            await isAfter(timeOfResettingSpec)
            await isPlaying()
        })
    })

    describe('when a pattern is playing that restarts upon spec modification', (): void => {
        beforeEach(async (): Promise<void> => {
            await quickRefresh()
            await selectRestartPattern()
            await clickTimeControl('play')
            await sleep(LONG_ENOUGH_FOR_TIME_TO_PASS)
        })

        afterEach(async (): Promise<void> => {
            if (await elementExists('#pause')) {
                await clickTimeControl('pause')
            }
        })

        it('keeps playing when you reset the spec and resets time to the beginning', async (): Promise<void> => {
            await openSpecControlsIfNotOpen()
            await modifyControl()
            await resetSpecsButtonIsEnabled()
            await sleep(A_BIT_LONGER)
            const timeOfResettingSpecs: Point<Ms> = await currentTime()
            await clickResetSpecsButton()
            await hasBeenReset({ toBefore: timeOfResettingSpecs })
            await isPlaying()
        })
    })
})
