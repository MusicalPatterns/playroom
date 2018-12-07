import { findElement } from 'puppet-strings'
import { testGlobals } from '../../setup'
import {
    elementValue,
    PATTERN_SPEC_HEADER,
    selectTestPattern,
    TEST_PATTERN_SPEC_PROPERTY_ONE_VALUE,
    TEST_PATTERN_SPEC_PROPERTY_TWO_VALUE,
    TEST_PATTERN_SPEC_PROPERTY_ONE_KEY,
    TEST_PATTERN_SPEC_PROPERTY_TWO_KEY,
    modify,
} from '../../support'

describe('pattern list', () => {
    beforeEach(async done => {
        await selectTestPattern()
        done()
    })

    it('shows a header for the pattern after you select it', async done => {
        await findElement(testGlobals.tab, 'h3', PATTERN_SPEC_HEADER)
        done()
    })

    describe('submitting a selection from the pattern list', () => {
        it('resets all submitted pattern spec changes you have made', async done => {
            await modify(await findElement(testGlobals.tab, `input#${TEST_PATTERN_SPEC_PROPERTY_ONE_KEY}`))
            await modify(await findElement(testGlobals.tab, `input#${TEST_PATTERN_SPEC_PROPERTY_TWO_KEY}`))

            await selectTestPattern()

            expect(await elementValue(`input#${TEST_PATTERN_SPEC_PROPERTY_ONE_KEY}`))
                .toBe(`${TEST_PATTERN_SPEC_PROPERTY_ONE_VALUE}`)
            expect(await elementValue(`input#${TEST_PATTERN_SPEC_PROPERTY_TWO_KEY}`))
                .toBe(`${TEST_PATTERN_SPEC_PROPERTY_TWO_VALUE}`)

            done()
        })
    })
})
