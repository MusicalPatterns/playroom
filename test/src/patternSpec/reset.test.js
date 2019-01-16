import { clickElement, fillInElement, findElement } from 'puppet-strings'
import { PatternSpecControlStates } from '../../../src/indexForTest'
import { testGlobals } from '../../setup'
import {
    elementExists,
    elementValue,
    INVALID_TEST_MODIFICATION,
    loseFocus,
    modify,
    PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY,
    PATTERN_SPEC_RANGED_PROPERTY_TWO_KEY,
    PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY,
    press,
    refreshWithTestPatternSelected,
    TEST_MODIFICATION,
    TEST_PATTERN_SPEC_RANGED_PROPERTY_ONE_INITIAL_VALUE,
    TEST_PATTERN_SPEC_RANGED_PROPERTY_TWO_INITIAL_VALUE,
    TEST_PATTERN_SPEC_OPTIONED_PROPERTY_ONE_INITIAL_VALUE,
    TEST_PATTERN_SPEC_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE,
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
        const control = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}`)
        await modify(control)

        expect(await elementExists(`button#reset:enabled`))
            .toBeTruthy()

        done()
    })

    it('reset button is disabled when the control is altered back to the defaults', async done => {
        const control = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}`)
        await modify(control)

        expect(await elementExists(`button#reset:enabled`))
            .toBeTruthy()

        await clickElement(control)
        await press('Backspace')
        await press('Enter')

        expect(await elementExists(`button#reset:disabled`))
            .toBeTruthy()

        done()
    })

    it('resets the pattern spec to the pattern\'s defaults', async done => {
        const controlOne = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}`)
        await modify(controlOne)
        const controlTwo = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_RANGED_PROPERTY_TWO_KEY}`)
        await modify(controlTwo)
        await testGlobals.page.select(`select#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}`, TEST_PATTERN_SPEC_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)

        expect(await elementValue(`input#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}`))
            .toBe(`${TEST_PATTERN_SPEC_RANGED_PROPERTY_ONE_INITIAL_VALUE}${TEST_MODIFICATION}`)
        expect(await elementValue(`input#${PATTERN_SPEC_RANGED_PROPERTY_TWO_KEY}`))
            .toBe(`${TEST_PATTERN_SPEC_RANGED_PROPERTY_TWO_INITIAL_VALUE}${TEST_MODIFICATION}`)
        expect(await elementValue(`select#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}`))
            .toBe(TEST_PATTERN_SPEC_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)

        await pushResetButton()

        expect(await elementValue(`input#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}`))
            .toBe(`${TEST_PATTERN_SPEC_RANGED_PROPERTY_ONE_INITIAL_VALUE}`)
        expect(await elementValue(`input#${PATTERN_SPEC_RANGED_PROPERTY_TWO_KEY}`))
            .toBe(`${TEST_PATTERN_SPEC_RANGED_PROPERTY_TWO_INITIAL_VALUE}`)
        expect(await elementValue(`select#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}`))
            .toBe(TEST_PATTERN_SPEC_OPTIONED_PROPERTY_ONE_INITIAL_VALUE)

        done()
    })

    it('if there were any unsubmitted controls, they no longer appear as unsubmitted', async done => {
        const controlToBeUnsubmitted = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}`)
        await fillInElement(controlToBeUnsubmitted, TEST_MODIFICATION)
        await loseFocus()
        expect(await elementExists(`input#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}.${PatternSpecControlStates.UNSUBMITTED}`))
            .toBeTruthy()

        await testGlobals.page.select(`select#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}`, TEST_PATTERN_SPEC_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)
        await loseFocus(`select#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}`)
        expect(await elementExists(`select#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}.${PatternSpecControlStates.UNSUBMITTED}`))
            .toBeTruthy()

        const controlToBeSubmittedSuchThatResetButtonIsEnabled = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_RANGED_PROPERTY_TWO_KEY}`)
        await modify(controlToBeSubmittedSuchThatResetButtonIsEnabled)
        await pushResetButton()

        expect(await elementExists(`input#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}.${PatternSpecControlStates.VALID_AND_SUBMITTED}`))
            .toBeTruthy()
        expect(await elementExists(`select#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}.${PatternSpecControlStates.VALID_AND_SUBMITTED}`))
            .toBeTruthy()

        done()
    })

    it('if there were any invalid controls, they no longer appear as invalid', async done => {
        const controlToBeInvalid = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}`)
        await fillInElement(controlToBeInvalid, INVALID_TEST_MODIFICATION)
        const button = await findElement(testGlobals.tab, `button#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}`)
        await clickElement(button)
        expect(await elementExists(`input#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}.${PatternSpecControlStates.INVALID}`))
            .toBeTruthy()

        const inputToBeSubmittedSuchThatResetButtonIsEnabled = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_RANGED_PROPERTY_TWO_KEY}`)
        await modify(inputToBeSubmittedSuchThatResetButtonIsEnabled)
        await pushResetButton()

        expect(await elementExists(`input#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}.${PatternSpecControlStates.VALID_AND_SUBMITTED}`))
            .toBeTruthy()

        done()
    })
})
