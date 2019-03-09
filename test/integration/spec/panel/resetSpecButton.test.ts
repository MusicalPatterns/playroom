import { ElementHandle } from 'puppeteer'
import { FieldValidityClassName } from '../../../../src/indexForTest'
import {
    BAD_FORMAT_INVALID_TEST_MODIFICATION,
    clickElement,
    deleteCharacterFromInput,
    elementChecked,
    elementExists,
    elementValue,
    findElement,
    OPTIONED_PROPERTY_ONE_KEY,
    RANGED_PROPERTY_ONE_KEY,
    RANGED_PROPERTY_TWO_KEY,
    refreshForSpecControlsTest,
    selectOption,
    SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE,
    SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_TWO_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_STRINGED_PROPERTY_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_TOGGLED_PROPERTY_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_TOGGLED_PROPERTY_MODIFIED_VALUE,
    STRINGED_PROPERTY_KEY,
    TOGGLED_PROPERTY_KEY,
    VALID_TEST_MODIFICATION,
} from '../../../support'

const clickResetSpecButton: () => Promise<void> =
    async (): Promise<void> => {
        await clickElement('button#reset-spec')
    }

const resetSpecButtonIsDisabled: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`button#reset-spec:disabled`))
            .toBeTruthy('reset spec button was not disabled')
    }

const resetSpecButtonIsEnabled: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`button#reset-spec:enabled`))
            .toBeTruthy('reset spec button was not enabled')
    }

const modifyControl: () => Promise<void> =
    async (): Promise<void> => {
        const control: ElementHandle = await findElement(`input[type=number]#${RANGED_PROPERTY_ONE_KEY}`)
        await control.type(VALID_TEST_MODIFICATION)
    }

const returnControlBackToItsDefault: () => Promise<void> =
    async (): Promise<void> => {
        await deleteCharacterFromInput(`input[type=number]#${RANGED_PROPERTY_ONE_KEY}`)
    }

const modifyAllTheThings: () => Promise<void> =
    async (): Promise<void> => {
        const rangedControlOne: ElementHandle = await findElement(
            `input[type=number]#${RANGED_PROPERTY_ONE_KEY}`,
        )
        await rangedControlOne.type(VALID_TEST_MODIFICATION)
        const rangedControlTwo: ElementHandle = await findElement(
            `input[type=number]#${RANGED_PROPERTY_TWO_KEY}`,
        )
        await rangedControlTwo.type(VALID_TEST_MODIFICATION)
        await selectOption(
            `select#${OPTIONED_PROPERTY_ONE_KEY}`,
            SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE,
        )
        await clickElement(`input#${TOGGLED_PROPERTY_KEY}`)
        const stringedControl: ElementHandle = await findElement(`input[type=text]#${STRINGED_PROPERTY_KEY}`)
        await stringedControl.type(VALID_TEST_MODIFICATION)
    }

const expectAllTheThingsToBeModified: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementValue(`input[type=number]#${RANGED_PROPERTY_ONE_KEY}`))
            .toBe(
                `${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE}${VALID_TEST_MODIFICATION}`,
                'ranged property one was not in a modified state',
            )
        expect(await elementValue(`input[type=number]#${RANGED_PROPERTY_TWO_KEY}`))
            .toBe(
                `${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_TWO_INITIAL_VALUE}${VALID_TEST_MODIFICATION}`,
                'ranged property two was not in a modified state',
            )
        expect(await elementValue(`select#${OPTIONED_PROPERTY_ONE_KEY}`))
            .toBe(
                SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE,
                'optioned property one was not in a modified state',
            )
        expect(await elementChecked(`input#${TOGGLED_PROPERTY_KEY}`))
            .toBe(
                SPEC_CONTROLS_PATTERN_TOGGLED_PROPERTY_MODIFIED_VALUE,
                'toggled property was not in a modified state',
            )
        expect(await elementValue(`input[type=text]#${STRINGED_PROPERTY_KEY}`))
            .toBe(
                `${SPEC_CONTROLS_PATTERN_STRINGED_PROPERTY_INITIAL_VALUE}${VALID_TEST_MODIFICATION}`,
                'stringed property was not in a modified state',
            )
    }

const expectAllTheThingsToBeBackToTheirInitialStates: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementValue(`input[type=number]#${RANGED_PROPERTY_ONE_KEY}`))
            .toBe(
                `${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE}`,
                'ranged property one was not back to initial state',
            )
        expect(await elementValue(`input[type=number]#${RANGED_PROPERTY_TWO_KEY}`))
            .toBe(
                `${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_TWO_INITIAL_VALUE}`,
                'ranged property two was not back to initial state',
            )
        expect(await elementValue(`select#${OPTIONED_PROPERTY_ONE_KEY}`))
            .toBe(
                SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_INITIAL_VALUE,
                'optioned property one was not back to initial state',
            )
        expect(await elementChecked(`input#${TOGGLED_PROPERTY_KEY}`))
            .toBe(
                SPEC_CONTROLS_PATTERN_TOGGLED_PROPERTY_INITIAL_VALUE,
                'toggled property was not back to initial state',
            )
        expect(await elementValue(`input[type=text]#${STRINGED_PROPERTY_KEY}`))
            .toBe(
                SPEC_CONTROLS_PATTERN_STRINGED_PROPERTY_INITIAL_VALUE,
                'stringed property was not back to initial state',
            )
    }

const modifyControlToBeInvalid: () => Promise<void> =
    async (): Promise<void> => {
        const controlToBeInvalid: ElementHandle = await findElement(`input[type=number]#${RANGED_PROPERTY_ONE_KEY}`)
        await controlToBeInvalid.type(BAD_FORMAT_INVALID_TEST_MODIFICATION)
        expect(await elementExists(`input[type=number]#${RANGED_PROPERTY_ONE_KEY}.${FieldValidityClassName.INVALID}`))
            .toBeTruthy('control was not invalid')
    }

const modifyAnotherControlJustSoThatTheResetButtonIsEnabled: () => Promise<void> =
    async (): Promise<void> => {
        const inputToBeChangedSuchThatResetButtonIsEnabled: ElementHandle = await findElement(`input[type=number]#${RANGED_PROPERTY_TWO_KEY}`)
        await inputToBeChangedSuchThatResetButtonIsEnabled.type(VALID_TEST_MODIFICATION)
    }

const controlIsBackToValid: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`input[type=number]#${RANGED_PROPERTY_ONE_KEY}.${FieldValidityClassName.VALID}`))
            .toBeTruthy('control was not back to valid')
    }

describe('reset button', () => {
    beforeEach(async (done: DoneFn) => {
        await refreshForSpecControlsTest()
        done()
    })

    it('reset button is disabled initially', async (done: DoneFn) => {
        await resetSpecButtonIsDisabled()

        done()
    })

    it('reset button is enabled when any control is modified', async (done: DoneFn) => {
        await modifyControl()
        await resetSpecButtonIsEnabled()

        done()
    })

    it('reset button is disabled when the control is modified back to the defaults', async (done: DoneFn) => {
        await modifyControl()
        await resetSpecButtonIsEnabled()

        await returnControlBackToItsDefault()

        await resetSpecButtonIsDisabled()

        done()
    })

    it(`resets the spec to the pattern's defaults`, async (done: DoneFn) => {
        await modifyAllTheThings()
        await expectAllTheThingsToBeModified()

        await clickResetSpecButton()
        await expectAllTheThingsToBeBackToTheirInitialStates()

        done()
    })

    it('if there were any invalid controls, they no longer appear as invalid', async (done: DoneFn) => {
        await modifyControlToBeInvalid()

        await modifyAnotherControlJustSoThatTheResetButtonIsEnabled()

        await clickResetSpecButton()
        await controlIsBackToValid()

        done()
    })
})
