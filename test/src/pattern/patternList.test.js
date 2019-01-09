import { findElement } from 'puppet-strings'
import { testGlobals } from '../../setup'
import {
    elementValue,
    modify,
    OTHER_TEST_PATTERN_SPEC_PROPERTY_ONE_VALUE,
    OTHER_TEST_PATTERN_SPEC_PROPERTY_TWO_VALUE,
    PATTERN_SPEC_HEADER,
    selectTestPattern,
    reset,
    TEST_MODIFICATION,
    PATTERN_SPEC_PROPERTY_ONE_KEY,
    TEST_PATTERN_SPEC_PROPERTY_ONE_VALUE,
    PATTERN_SPEC_PROPERTY_TWO_KEY,
    TEST_PATTERN_SPEC_PROPERTY_TWO_VALUE,
} from '../../support'
import { selectOtherTestPattern } from '../../support/control/selectTestPattern'

describe('pattern list', () => {
    beforeEach(async done => {
        await selectTestPattern()
        await reset()
        done()
    })

    it('shows a header for the pattern after you select it', async done => {
        await findElement(testGlobals.tab, 'h3', PATTERN_SPEC_HEADER)
        done()
    })

    describe('submitting a selection from the pattern list', () => {
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
