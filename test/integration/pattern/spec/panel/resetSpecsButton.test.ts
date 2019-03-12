import { ElementHandle } from 'puppeteer'
import { FieldValidityClassName } from '../../../../../src/indexForTest'
import {
    BAD_FORMAT_INVALID_TEST_MODIFICATION,
    clickElement,
    deleteCharacterFromInput,
    elementChecked,
    elementExists,
    elementValue,
    findElement,
    OPTIONED_SPEC_ONE_KEY,
    RANGED_SPEC_ONE_KEY,
    RANGED_SPEC_TWO_KEY,
    refreshForSpecControlsTest,
    selectOption,
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
        const control: ElementHandle = await findElement(`input[type=number]#${RANGED_SPEC_ONE_KEY}`)
        await control.type(VALID_TEST_MODIFICATION)
    }

const returnControlBackToItsDefault: () => Promise<void> =
    async (): Promise<void> => {
        await deleteCharacterFromInput(`input[type=number]#${RANGED_SPEC_ONE_KEY}`)
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
        const controlToBeInvalid: ElementHandle = await findElement(`input[type=number]#${RANGED_SPEC_ONE_KEY}`)
        await controlToBeInvalid.type(BAD_FORMAT_INVALID_TEST_MODIFICATION)
        expect(await elementExists(`input[type=number]#${RANGED_SPEC_ONE_KEY}.${FieldValidityClassName.INVALID}`))
            .toBeTruthy('control was not invalid')
    }

const modifyAnotherControlJustSoThatTheResetButtonIsEnabled: () => Promise<void> =
    async (): Promise<void> => {
        const inputToBeChangedSuchThatResetButtonIsEnabled: ElementHandle = await findElement(`input[type=number]#${RANGED_SPEC_TWO_KEY}`)
        await inputToBeChangedSuchThatResetButtonIsEnabled.type(VALID_TEST_MODIFICATION)
    }

const controlIsBackToValid: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`input[type=number]#${RANGED_SPEC_ONE_KEY}.${FieldValidityClassName.VALID}`))
            .toBeTruthy('control was not back to valid')
    }

describe('reset specs button', () => {
    beforeEach(async (done: DoneFn) => {
        await refreshForSpecControlsTest()
        done()
    })

    it('reset specs button is disabled initially', async (done: DoneFn) => {
        await resetSpecsButtonIsDisabled()

        done()
    })

    it('reset specs button is enabled when any control is modified', async (done: DoneFn) => {
        await modifyControl()
        await resetSpecsButtonIsEnabled()

        done()
    })

    it('reset specs button is disabled when the control is modified back to the defaults', async (done: DoneFn) => {
        await modifyControl()
        await resetSpecsButtonIsEnabled()

        await returnControlBackToItsDefault()

        await resetSpecsButtonIsDisabled()

        done()
    })

    it(`resets the specs to the pattern's defaults`, async (done: DoneFn) => {
        await modifyAllTheThings()
        await expectAllTheThingsToBeModified()

        await clickResetSpecsButton()
        await expectAllTheThingsToBeBackToTheirInitialStates()

        done()
    })

    it('if there were any invalid controls, they no longer appear as invalid', async (done: DoneFn) => {
        await modifyControlToBeInvalid()

        await modifyAnotherControlJustSoThatTheResetButtonIsEnabled()

        await clickResetSpecsButton()
        await controlIsBackToValid()

        done()
    })
})
