import { clickElement, fillInElement, findElement } from 'puppet-strings'
import { PatternSpecInputStates, SecretSelectorsForTest } from '../../../src/indexForTest'
import { testGlobals } from '../../setup'
import {
    elementExists,
    elementInnerText,
    INVALID_TEST_MODIFICATION,
    PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY,
    refreshWithTestPatternSelected,
    TEST_PATTERN_SPEC_RANGED_PROPERTY_ONE_INITIAL_VALUE,
} from '../../support'

describe('invalid inputs', () => {
    let input
    beforeEach(async done => {
        await refreshWithTestPatternSelected()

        input = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}`)
        await fillInElement(input, INVALID_TEST_MODIFICATION)

        done()
    })

    it('does not mark a pattern spec input as invalid if you only type invalid data but do not submit it; only marks it as unsubmitted', async done => {
        expect(await elementExists(`input#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}.${PatternSpecInputStates.UNSUBMITTED}`))
            .toBeTruthy()

        done()
    })

    describe('after submitting', () => {
        beforeEach(async done => {
            const button = await findElement(testGlobals.tab, `button#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}`)
            await clickElement(button)

            done()
        })

        it('marks a pattern spec input as invalid when you submit invalid data, and it does not crash or attempt to recompile with this invalid data', async done => {
            expect(await elementExists(`input#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}.${PatternSpecInputStates.INVALID}`))
                .toBeTruthy()

            expect(await elementInnerText(`.${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_INPUT}#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}`))
                .toBe(`${TEST_PATTERN_SPEC_RANGED_PROPERTY_ONE_INITIAL_VALUE}`)

            done()
        })

        it('resets the pattern spec input to valid (unsubmitted) state after typing anything into it', async done => {
            expect(await elementExists(`input#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}.${PatternSpecInputStates.INVALID}`))
                .toBeTruthy()

            await fillInElement(input, INVALID_TEST_MODIFICATION)

            expect(await elementExists(`input#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}.${PatternSpecInputStates.UNSUBMITTED}`))
                .toBeTruthy()

            done()
        })
    })
})
