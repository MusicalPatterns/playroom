import { clickElement, fillInElement, findElement } from 'puppet-strings'
import { testGlobals } from '../../setup'
import {
    elementExists,
    elementValue,
    INVALID_TEST_MODIFICATION,
    loseFocus,
    modify,
    PATTERN_SPEC_PROPERTY_ONE_KEY,
    PATTERN_SPEC_PROPERTY_TWO_KEY,
    standardTestReset,
    TEST_MODIFICATION,
    TEST_PATTERN_SPEC_PROPERTY_ONE_VALUE,
    TEST_PATTERN_SPEC_PROPERTY_TWO_VALUE,
    press,
} from '../../support'
import { PatternSpecInputStates } from '../../../src/indexForTest'

const pushResetButton = async () => {
    const reset = await findElement(testGlobals.tab, '#reset')
    await clickElement(reset)
}

describe('reset button', () => {
    beforeEach(async done => {
        await standardTestReset()
        done()
    })

    it('reset button is disabled initially', async done => {
        expect(await elementExists(`button#reset:disabled`))
            .toBeTruthy()
        done()
    })

    it('reset button is enabled when any pattern spec input is altered', async done => {
        const input = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_PROPERTY_ONE_KEY}`)
        await modify(input)

        expect(await elementExists(`button#reset:enabled`))
            .toBeTruthy()

        done()
    })

    it('reset button is disabled when pattern spec input is altered back to the defaults', async done => {
        const input = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_PROPERTY_ONE_KEY}`)
        await modify(input)

        expect(await elementExists(`button#reset:enabled`))
            .toBeTruthy()

        await clickElement(input)
        await press('Backspace')
        await press('Enter')

        expect(await elementExists(`button#reset:disabled`))
            .toBeTruthy()

        done()
    })

    it('resets the pattern spec to the pattern\'s defaults', async done => {
        const inputOne = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_PROPERTY_ONE_KEY}`)
        await modify(inputOne)
        const inputTwo = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_PROPERTY_TWO_KEY}`)
        await modify(inputTwo)
        expect(await elementValue(`input#${PATTERN_SPEC_PROPERTY_ONE_KEY}`))
            .toBe(`${TEST_PATTERN_SPEC_PROPERTY_ONE_VALUE}${TEST_MODIFICATION}`)
        expect(await elementValue(`input#${PATTERN_SPEC_PROPERTY_TWO_KEY}`))
            .toBe(`${TEST_PATTERN_SPEC_PROPERTY_TWO_VALUE}${TEST_MODIFICATION}`)

        await pushResetButton()

        expect(await elementValue(`input#${PATTERN_SPEC_PROPERTY_ONE_KEY}`))
            .toBe(`${TEST_PATTERN_SPEC_PROPERTY_ONE_VALUE}`)
        expect(await elementValue(`input#${PATTERN_SPEC_PROPERTY_TWO_KEY}`))
            .toBe(`${TEST_PATTERN_SPEC_PROPERTY_TWO_VALUE}`)

        done()
    })

    it('if there were any unsubmitted inputs, they no longer appear as unsubmitted', async done => {
        const inputToBeUnsubmitted = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_PROPERTY_ONE_KEY}`)
        await fillInElement(inputToBeUnsubmitted, TEST_MODIFICATION)
        await loseFocus()
        await findElement(testGlobals.tab, `input#${PATTERN_SPEC_PROPERTY_ONE_KEY}.${PatternSpecInputStates.UNSUBMITTED}`)

        const inputToBeSubmittedSuchThatResetButtonIsEnabled = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_PROPERTY_TWO_KEY}`)
        await modify(inputToBeSubmittedSuchThatResetButtonIsEnabled)
        await pushResetButton()

        await findElement(testGlobals.tab, `input#${PATTERN_SPEC_PROPERTY_ONE_KEY}.${PatternSpecInputStates.VALID_AND_SUBMITTED}`)

        done()
    })

    it('if there were any invalid inputs, they no longer appear as invalid', async done => {
        const inputToBeInvalid = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_PROPERTY_ONE_KEY}`)
        await fillInElement(inputToBeInvalid, INVALID_TEST_MODIFICATION)
        const button = await findElement(testGlobals.tab, `button#${PATTERN_SPEC_PROPERTY_ONE_KEY}`)
        await clickElement(button)
        await findElement(testGlobals.tab, `input#${PATTERN_SPEC_PROPERTY_ONE_KEY}.${PatternSpecInputStates.INVALID}`)

        const inputToBeSubmittedSuchThatResetButtonIsEnabled = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_PROPERTY_TWO_KEY}`)
        await modify(inputToBeSubmittedSuchThatResetButtonIsEnabled)
        await pushResetButton()

        await findElement(testGlobals.tab, `input#${PATTERN_SPEC_PROPERTY_ONE_KEY}.${PatternSpecInputStates.VALID_AND_SUBMITTED}`)

        done()
    })
})
