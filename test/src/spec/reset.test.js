import { clickElement, fillInElement, findElement } from 'puppet-strings'
import { SpecControlStates } from '../../../src/indexForTest'
import { testGlobals } from '../../setup'
import {
    BAD_FORMAT_INVALID_TEST_MODIFICATION,
    elementChecked,
    elementExists,
    elementValue,
    press,
    refreshWithTestPatternSelected,
    SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE,
    SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_TWO_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_TOGGLED_PROPERTY_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_TOGGLED_PROPERTY_MODIFIED_VALUE,
    SPEC_OPTIONED_PROPERTY_ONE_KEY,
    SPEC_RANGED_PROPERTY_ONE_KEY,
    SPEC_RANGED_PROPERTY_TWO_KEY,
    SPEC_TOGGLED_PROPERTY_KEY,
    VALID_TEST_MODIFICATION,
} from '../../support'

const pushResetButton = async () => {
    const reset = await findElement(testGlobals.tab, '#reset')
    await clickElement(reset)
}

describe('reset button', () => {
    beforeEach(async done => {
        await refreshWithTestPatternSelected()
        done()
    })

    it('reset button is disabled initially', async done => {
        expect(await elementExists(`button#reset:disabled`))
            .toBeTruthy()
        done()
    })

    it('reset button is enabled when any control is altered', async done => {
        const control = await findElement(testGlobals.tab, `input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`)
        await fillInElement(control, VALID_TEST_MODIFICATION)

        expect(await elementExists(`button#reset:enabled`))
            .toBeTruthy()

        done()
    })

    it('reset button is disabled when the control is altered back to the defaults', async done => {
        const control = await findElement(testGlobals.tab, `input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`)
        await fillInElement(control, VALID_TEST_MODIFICATION)

        expect(await elementExists(`button#reset:enabled`))
            .toBeTruthy()

        await clickElement(control)
        await press('Backspace')
        await press('Enter')

        expect(await elementExists(`button#reset:disabled`))
            .toBeTruthy()

        done()
    })

    it('resets the spec to the pattern\'s defaults', async done => {
        const controlOne = await findElement(testGlobals.tab, `input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`)
        await fillInElement(controlOne, VALID_TEST_MODIFICATION)
        const controlTwo = await findElement(testGlobals.tab, `input[type=number]#${SPEC_RANGED_PROPERTY_TWO_KEY}`)
        await fillInElement(controlTwo, VALID_TEST_MODIFICATION)
        await testGlobals.page.select(`select#${SPEC_OPTIONED_PROPERTY_ONE_KEY}`, SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)
        const checkbox = await findElement(testGlobals.tab, `input#${SPEC_TOGGLED_PROPERTY_KEY}`)
        await clickElement(checkbox)

        expect(await elementValue(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`))
            .toBe(`${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE}${VALID_TEST_MODIFICATION}`)
        expect(await elementValue(`input[type=number]#${SPEC_RANGED_PROPERTY_TWO_KEY}`))
            .toBe(`${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_TWO_INITIAL_VALUE}${VALID_TEST_MODIFICATION}`)
        expect(await elementValue(`select#${SPEC_OPTIONED_PROPERTY_ONE_KEY}`))
            .toBe(SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)
        expect(await elementChecked(`input#${SPEC_TOGGLED_PROPERTY_KEY}`))
            .toBe(SPEC_CONTROLS_PATTERN_TOGGLED_PROPERTY_MODIFIED_VALUE)

        await pushResetButton()

        expect(await elementValue(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`))
            .toBe(`${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE}`)
        expect(await elementValue(`input[type=number]#${SPEC_RANGED_PROPERTY_TWO_KEY}`))
            .toBe(`${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_TWO_INITIAL_VALUE}`)
        expect(await elementValue(`select#${SPEC_OPTIONED_PROPERTY_ONE_KEY}`))
            .toBe(SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_INITIAL_VALUE)
        expect(await elementChecked(`input#${SPEC_TOGGLED_PROPERTY_KEY}`))
            .toBe(SPEC_CONTROLS_PATTERN_TOGGLED_PROPERTY_INITIAL_VALUE)

        done()
    })

    it('if there were any invalid controls, they no longer appear as invalid', async done => {
        const controlToBeInvalid = await findElement(testGlobals.tab, `input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`)
        await fillInElement(controlToBeInvalid, BAD_FORMAT_INVALID_TEST_MODIFICATION)
        expect(await elementExists(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}.${SpecControlStates.INVALID}`))
            .toBeTruthy()

        const inputToBeChangedSuchThatResetButtonIsEnabled = await findElement(testGlobals.tab, `input[type=number]#${SPEC_RANGED_PROPERTY_TWO_KEY}`)
        await fillInElement(inputToBeChangedSuchThatResetButtonIsEnabled, VALID_TEST_MODIFICATION)
        await pushResetButton()

        expect(await elementExists(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}.${SpecControlStates.VALID}`))
            .toBeTruthy()

        done()
    })
})
