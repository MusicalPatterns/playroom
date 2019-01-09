import { clickElement, fillInElement, findElement } from 'puppet-strings'
import { testGlobals } from '../../setup'
import {
    elementValue,
    INVALID_TEST_MODIFICATION,
    loseFocus,
    modify,
    PATTERN_SPEC_PROPERTY_ONE_KEY,
    PATTERN_SPEC_PROPERTY_TWO_KEY,
    reset,
    selectTestPattern,
    TEST_MODIFICATION,
    TEST_PATTERN_SPEC_PROPERTY_ONE_VALUE,
    TEST_PATTERN_SPEC_PROPERTY_TWO_VALUE,
} from '../../support'

describe('reset button', () => {
    beforeAll(async done => {
        await selectTestPattern()
        await reset()
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

        await reset()

        expect(await elementValue(`input#${PATTERN_SPEC_PROPERTY_ONE_KEY}`))
            .toBe(`${TEST_PATTERN_SPEC_PROPERTY_ONE_VALUE}`)
        expect(await elementValue(`input#${PATTERN_SPEC_PROPERTY_TWO_KEY}`))
            .toBe(`${TEST_PATTERN_SPEC_PROPERTY_TWO_VALUE}`)

        done()
    })

    it('if there were any unsubmitted inputs, they no longer appear as unsubmitted', async done => {
        const input = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_PROPERTY_ONE_KEY}`)
        await fillInElement(input, TEST_MODIFICATION)
        await loseFocus()
        await findElement(testGlobals.tab, `input#${PATTERN_SPEC_PROPERTY_ONE_KEY}.unsubmitted`)

        await reset()

        await findElement(testGlobals.tab, `input#${PATTERN_SPEC_PROPERTY_ONE_KEY}.submitted`)

        done()
    })

    it('if there were any invalid inputs, they no longer appear as invalid', async done => {
        const input = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_PROPERTY_ONE_KEY}`)
        await fillInElement(input, INVALID_TEST_MODIFICATION)
        const button = await findElement(testGlobals.tab, `button#${PATTERN_SPEC_PROPERTY_ONE_KEY}`)
        await clickElement(button)
        await findElement(testGlobals.tab, `input#${PATTERN_SPEC_PROPERTY_ONE_KEY}.invalid`)

        await reset()

        await findElement(testGlobals.tab, `input#${PATTERN_SPEC_PROPERTY_ONE_KEY}.submitted`)

        done()
    })
})
