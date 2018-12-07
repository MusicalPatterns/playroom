import {
    elementInnerText,
    INVALID_TEST_MODIFICATION,
    selectTestPattern,
    TEST_PATTERN_SPEC_PROPERTY_ONE_KEY,
    TEST_PATTERN_SPEC_PROPERTY_ONE_VALUE,
} from '../../support'
import { clickElement, fillInElement, findElement } from 'puppet-strings'
import { testGlobals } from '../../setup'

describe('invalid inputs', () => {
    let input
    beforeEach(async done => {
        await selectTestPattern()

        input = await findElement(testGlobals.tab, `input#${TEST_PATTERN_SPEC_PROPERTY_ONE_KEY}`)
        await fillInElement(input, INVALID_TEST_MODIFICATION)

        done()
    })

    it('does not mark a pattern spec input as invalid if you only type invalid data but do not submit it; only marks it as unsubmitted', async done => {
        await findElement(testGlobals.tab, `input#${TEST_PATTERN_SPEC_PROPERTY_ONE_KEY}.unsubmitted`)

        done()
    })

    describe('after submitting', () => {
        beforeEach(async done => {
            const button = await findElement(testGlobals.tab, `button#${TEST_PATTERN_SPEC_PROPERTY_ONE_KEY}`)
            await clickElement(button)

            done()
        })

        it('marks a pattern spec input as invalid when you submit invalid data, and it does not crash or attempt to recompile with this invalid data', async done => {
            await findElement(testGlobals.tab, `input#${TEST_PATTERN_SPEC_PROPERTY_ONE_KEY}.invalid`)

            expect(await elementInnerText(`.secret-submitted#${TEST_PATTERN_SPEC_PROPERTY_ONE_KEY}`))
                .toBe(`${TEST_PATTERN_SPEC_PROPERTY_ONE_VALUE}`)

            done()
        })

        it('resets the pattern spec input to valid (unsubmitted) state after typing anything into it', async done => {
            await findElement(testGlobals.tab, `input#${TEST_PATTERN_SPEC_PROPERTY_ONE_KEY}.invalid`)

            await fillInElement(input, INVALID_TEST_MODIFICATION)

            await findElement(testGlobals.tab, `input#${TEST_PATTERN_SPEC_PROPERTY_ONE_KEY}.unsubmitted`)

            done()
        })
    })
})
