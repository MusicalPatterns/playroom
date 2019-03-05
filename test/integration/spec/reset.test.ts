import { ElementHandle } from 'puppeteer'
import { SpecControlStates } from '../../../src/indexForTest'
import {
    BAD_FORMAT_INVALID_TEST_MODIFICATION,
    elementChecked,
    elementExists,
    elementValue,
    findElement,
    openSpecControlsIfNotOpen,
    press,
    reset,
    resetSpecByTogglingToOtherPatternThenBackToTestPattern,
    selectOption,
    simulateDesktopViewport,
    SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE,
    SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_TWO_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_STRINGED_PROPERTY_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_TOGGLED_PROPERTY_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_TOGGLED_PROPERTY_MODIFIED_VALUE,
    SPEC_OPTIONED_PROPERTY_ONE_KEY,
    SPEC_RANGED_PROPERTY_ONE_KEY,
    SPEC_RANGED_PROPERTY_TWO_KEY,
    SPEC_STRINGED_PROPERTY_KEY,
    SPEC_TOGGLED_PROPERTY_KEY,
    VALID_TEST_MODIFICATION,
} from '../../support'

const resetIsDisabled: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`button#reset:disabled`))
            .toBeTruthy('reset was not disabled')
    }

const resetIsEnabled: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`button#reset:enabled`))
            .toBeTruthy('reset was not enabled')
    }

const modifyControl: () => Promise<void> =
    async (): Promise<void> => {
        const control: ElementHandle = await findElement(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`)
        await control.type(VALID_TEST_MODIFICATION)
    }

const returnControlBackToItsDefault: () => Promise<void> =
    async (): Promise<void> => {
        const control: ElementHandle = await findElement(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`)
        await control.click()
        await press('Backspace')
    }

const modifyAllTheThings: () => Promise<void> =
    async (): Promise<void> => {
        const rangedControlOne: ElementHandle = await findElement(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`)
        await rangedControlOne.type(VALID_TEST_MODIFICATION)
        const rangedControlTwo: ElementHandle = await findElement(`input[type=number]#${SPEC_RANGED_PROPERTY_TWO_KEY}`)
        await rangedControlTwo.type(VALID_TEST_MODIFICATION)
        await selectOption(`select#${SPEC_OPTIONED_PROPERTY_ONE_KEY}`, SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)
        const checkbox: ElementHandle = await findElement(`input#${SPEC_TOGGLED_PROPERTY_KEY}`)
        await checkbox.click()
        const stringedControl: ElementHandle = await findElement(`input[type=text]#${SPEC_STRINGED_PROPERTY_KEY}`)
        await stringedControl.type(VALID_TEST_MODIFICATION)
    }

const expectAllTheThingsToBeModified: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementValue(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`))
            .toBe(`${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE}${VALID_TEST_MODIFICATION}`, 'ranged property one was not in a modified state')
        expect(await elementValue(`input[type=number]#${SPEC_RANGED_PROPERTY_TWO_KEY}`))
            .toBe(`${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_TWO_INITIAL_VALUE}${VALID_TEST_MODIFICATION}`, 'ranged property two was not in a modified state')
        expect(await elementValue(`select#${SPEC_OPTIONED_PROPERTY_ONE_KEY}`))
            .toBe(SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE, 'optioned property one was not in a modified state')
        expect(await elementChecked(`input#${SPEC_TOGGLED_PROPERTY_KEY}`))
            .toBe(SPEC_CONTROLS_PATTERN_TOGGLED_PROPERTY_MODIFIED_VALUE, 'toggled property was not in a modified state')
        expect(await elementValue(`input[type=text]#${SPEC_STRINGED_PROPERTY_KEY}`))
            .toBe(`${SPEC_CONTROLS_PATTERN_STRINGED_PROPERTY_INITIAL_VALUE}${VALID_TEST_MODIFICATION}`, 'stringed property was not in a modified state')
    }

const expectAllTheThingsToBeBackToTheirInitialStates: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementValue(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`))
            .toBe(`${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE}`, 'ranged property one was not back to initial state')
        expect(await elementValue(`input[type=number]#${SPEC_RANGED_PROPERTY_TWO_KEY}`))
            .toBe(`${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_TWO_INITIAL_VALUE}`, 'ranged property two was not back to initial state')
        expect(await elementValue(`select#${SPEC_OPTIONED_PROPERTY_ONE_KEY}`))
            .toBe(SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_INITIAL_VALUE, 'optioned property one was not back to initial state')
        expect(await elementChecked(`input#${SPEC_TOGGLED_PROPERTY_KEY}`))
            .toBe(SPEC_CONTROLS_PATTERN_TOGGLED_PROPERTY_INITIAL_VALUE, 'toggled property was not back to initial state')
        expect(await elementValue(`input[type=text]#${SPEC_STRINGED_PROPERTY_KEY}`))
            .toBe(`${SPEC_CONTROLS_PATTERN_STRINGED_PROPERTY_INITIAL_VALUE}`, 'stringed property was not back to initial state')
    }

const modifyControlToBeInvalid: () => Promise<void> =
    async (): Promise<void> => {
        const controlToBeInvalid: ElementHandle = await findElement(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`)
        await controlToBeInvalid.type(BAD_FORMAT_INVALID_TEST_MODIFICATION)
        expect(await elementExists(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}.${SpecControlStates.INVALID}`))
            .toBeTruthy('control was not invalid')
    }

const modifyAnotherControlJustSoThatTheResetButtonIsEnabled: () => Promise<void> =
    async (): Promise<void> => {
        const inputToBeChangedSuchThatResetButtonIsEnabled: ElementHandle = await findElement(`input[type=number]#${SPEC_RANGED_PROPERTY_TWO_KEY}`)
        await inputToBeChangedSuchThatResetButtonIsEnabled.type(VALID_TEST_MODIFICATION)
    }

const controlIsBackToValid: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}.${SpecControlStates.VALID}`))
            .toBeTruthy('control was not back to valid')
    }

describe('reset button', () => {
    beforeEach(async (done: DoneFn) => {
        await simulateDesktopViewport()
        await resetSpecByTogglingToOtherPatternThenBackToTestPattern()
        await openSpecControlsIfNotOpen()
        done()
    })

    it('reset button is disabled initially', async (done: DoneFn) => {
        await resetIsDisabled()

        done()
    })

    it('reset button is enabled when any control is modified', async (done: DoneFn) => {
        await modifyControl()
        await resetIsEnabled()

        done()
    })

    it('reset button is disabled when the control is modified back to the defaults', async (done: DoneFn) => {
        await modifyControl()
        await resetIsEnabled()

        await returnControlBackToItsDefault()

        await resetIsDisabled()

        done()
    })

    it('resets the spec to the pattern\'s defaults', async (done: DoneFn) => {
        await modifyAllTheThings()
        await expectAllTheThingsToBeModified()

        await reset()
        await expectAllTheThingsToBeBackToTheirInitialStates()

        done()
    })

    it('if there were any invalid controls, they no longer appear as invalid', async (done: DoneFn) => {
        await modifyControlToBeInvalid()

        await modifyAnotherControlJustSoThatTheResetButtonIsEnabled()

        await reset()
        await controlIsBackToValid()

        done()
    })
})
