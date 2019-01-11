import { clickElement, fillInElement, findElement } from 'puppet-strings'
import { PatternSpecInputStates } from '../../../src/indexForTest'
import { testGlobals } from '../../setup'
import {
    elementExists,
    elementValue,
    INVALID_TEST_MODIFICATION,
    loseFocus,
    modify,
    OTHER_TEST_PATTERN_SPEC_PROPERTY_ONE_VALUE,
    OTHER_TEST_PATTERN_SPEC_PROPERTY_TWO_VALUE,
    TEST_PATTERN_TITLE,
    PATTERN_SPEC_PROPERTY_ONE_KEY,
    PATTERN_SPEC_PROPERTY_TWO_KEY,
    selectOtherTestPattern,
    selectTestPattern,
    standardTestReset,
    TEST_MODIFICATION,
    TEST_PATTERN_ID,
    TEST_PATTERN_SPEC_PROPERTY_ONE_VALUE,
    TEST_PATTERN_SPEC_PROPERTY_TWO_VALUE,
} from '../../support'

describe('pattern list', () => {
    beforeEach(async done => {
        await standardTestReset()
        done()
    })

    it('shows a header for the pattern after you select it', async done => {
        await findElement(testGlobals.tab, 'h1', TEST_PATTERN_TITLE)
        done()
    })

    it('the selected pattern is highlighted', async done => {
        expect(elementExists(`#${TEST_PATTERN_ID}.selected`))
            .toBeTruthy()

        done()
    })

    describe('submitting a selection from the pattern list', () => {
        describe('when it is a different pattern than the current selection', () => {
            it('changes the pattern spec to the new pattern\'s defaults', async done => {
                expect(await elementValue(`input#${PATTERN_SPEC_PROPERTY_ONE_KEY}`))
                    .toBe(`${TEST_PATTERN_SPEC_PROPERTY_ONE_VALUE}`)
                expect(await elementValue(`input#${PATTERN_SPEC_PROPERTY_TWO_KEY}`))
                    .toBe(`${TEST_PATTERN_SPEC_PROPERTY_TWO_VALUE}`)

                await selectOtherTestPattern()

                expect(await elementValue(`input#${PATTERN_SPEC_PROPERTY_ONE_KEY}`))
                    .toBe(`${OTHER_TEST_PATTERN_SPEC_PROPERTY_ONE_VALUE}`)
                expect(await elementValue(`input#${PATTERN_SPEC_PROPERTY_TWO_KEY}`))
                    .toBe(`${OTHER_TEST_PATTERN_SPEC_PROPERTY_TWO_VALUE}`)

                done()
            })

            it('if there were any unsubmitted inputs, they no longer appear as unsubmitted', async done => {
                const input = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_PROPERTY_ONE_KEY}`)
                await fillInElement(input, TEST_MODIFICATION)
                await loseFocus()
                await findElement(testGlobals.tab, `input#${PATTERN_SPEC_PROPERTY_ONE_KEY}.${PatternSpecInputStates.UNSUBMITTED}`)

                await selectOtherTestPattern()

                await findElement(testGlobals.tab, `input#${PATTERN_SPEC_PROPERTY_ONE_KEY}.${PatternSpecInputStates.VALID_AND_SUBMITTED}`)

                done()
            })

            it('if there were any invalid inputs, they no longer appear as invalid', async done => {
                const input = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_PROPERTY_ONE_KEY}`)
                await fillInElement(input, INVALID_TEST_MODIFICATION)
                const button = await findElement(testGlobals.tab, `button#${PATTERN_SPEC_PROPERTY_ONE_KEY}`)
                await clickElement(button)
                await findElement(testGlobals.tab, `input#${PATTERN_SPEC_PROPERTY_ONE_KEY}.${PatternSpecInputStates.INVALID}`)

                await selectOtherTestPattern()

                await findElement(testGlobals.tab, `input#${PATTERN_SPEC_PROPERTY_ONE_KEY}.${PatternSpecInputStates.VALID_AND_SUBMITTED}`)

                done()
            })
        })

        it('does not reset the pattern spec changes you have made if it is the pattern which is already selected', async done => {
            await modify(await findElement(testGlobals.tab, `input#${PATTERN_SPEC_PROPERTY_ONE_KEY}`))
            await modify(await findElement(testGlobals.tab, `input#${PATTERN_SPEC_PROPERTY_TWO_KEY}`))

            await selectTestPattern()

            expect(await elementValue(`input#${PATTERN_SPEC_PROPERTY_ONE_KEY}`))
                .toBe(`${TEST_PATTERN_SPEC_PROPERTY_ONE_VALUE}${TEST_MODIFICATION}`)
            expect(await elementValue(`input#${PATTERN_SPEC_PROPERTY_TWO_KEY}`))
                .toBe(`${TEST_PATTERN_SPEC_PROPERTY_TWO_VALUE}${TEST_MODIFICATION}`)

            done()
        })
    })
})
