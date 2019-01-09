import { clickElement, fillInElement, findElement } from 'puppet-strings'
import { testGlobals } from '../../setup'
import {
    elementInnerText,
    INVALID_TEST_MODIFICATION,
    PATTERN_SPEC_PROPERTY_ONE_KEY,
    reset,
    selectTestPattern,
    TEST_PATTERN_SPEC_PROPERTY_ONE_VALUE,
} from '../../support'
import { PatternSpecInputStates } from '../../../src/indexForTest'

describe('invalid inputs', () => {
    beforeAll(async done => {
        await selectTestPattern()
        done()
    })

    let input
    beforeEach(async done => {
        await reset()

        input = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_PROPERTY_ONE_KEY}`)
        await fillInElement(input, INVALID_TEST_MODIFICATION)

        done()
    })

    it('does not mark a pattern spec input as invalid if you only type invalid data but do not submit it; only marks it as unsubmitted', async done => {
        await findElement(testGlobals.tab, `input#${PATTERN_SPEC_PROPERTY_ONE_KEY}.${PatternSpecInputStates.UNSUBMITTED}`)

        done()
    })

    describe('after submitting', () => {
        beforeEach(async done => {
            const button = await findElement(testGlobals.tab, `button#${PATTERN_SPEC_PROPERTY_ONE_KEY}`)
            await clickElement(button)

            done()
        })

        it('marks a pattern spec input as invalid when you submit invalid data, and it does not crash or attempt to recompile with this invalid data', async done => {
            await findElement(testGlobals.tab, `input#${PATTERN_SPEC_PROPERTY_ONE_KEY}.${PatternSpecInputStates.INVALID}`)

            expect(await elementInnerText(`.secret-submitted#${PATTERN_SPEC_PROPERTY_ONE_KEY}`))
                .toBe(`${TEST_PATTERN_SPEC_PROPERTY_ONE_VALUE}`)

            done()
        })

        it('resets the pattern spec input to valid (unsubmitted) state after typing anything into it', async done => {
            await findElement(testGlobals.tab, `input#${PATTERN_SPEC_PROPERTY_ONE_KEY}.${PatternSpecInputStates.INVALID}`)

            await fillInElement(input, INVALID_TEST_MODIFICATION)

            await findElement(testGlobals.tab, `input#${PATTERN_SPEC_PROPERTY_ONE_KEY}.${PatternSpecInputStates.UNSUBMITTED}`)

            done()
        })
    })
})
