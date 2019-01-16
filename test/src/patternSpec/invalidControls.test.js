import { clickElement, fillInElement, findElement } from 'puppet-strings'
import { PatternSpecControlStates, SecretSelectorsForTest } from '../../../src/indexForTest'
import { testGlobals } from '../../setup'
import {
    elementExists,
    elementInnerText,
    INVALID_TEST_MODIFICATION,
    PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY,
    refreshWithTestPatternSelected,
    TEST_PATTERN_SPEC_RANGED_PROPERTY_ONE_INITIAL_VALUE,
} from '../../support'

describe('invalid controls', () => {
    let control
    beforeEach(async done => {
        await refreshWithTestPatternSelected()

        control = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}`)
        await fillInElement(control, INVALID_TEST_MODIFICATION)

        done()
    })

    it('does not mark a control as invalid if you only type invalid data but do not submit it; only marks it as unsubmitted', async done => {
        expect(await elementExists(`input#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}.${PatternSpecControlStates.UNSUBMITTED}`))
            .toBeTruthy()

        done()
    })

    describe('after submitting', () => {
        beforeEach(async done => {
            const button = await findElement(testGlobals.tab, `button#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}`)
            await clickElement(button)

            done()
        })

        it('marks a control as invalid when you submit invalid data, and it does not crash or attempt to recompile with this invalid data', async done => {
            expect(await elementExists(`input#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}.${PatternSpecControlStates.INVALID}`))
                .toBeTruthy()

            expect(await elementInnerText(`.${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_CONTROL}#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}`))
                .toBe(`${TEST_PATTERN_SPEC_RANGED_PROPERTY_ONE_INITIAL_VALUE}`)

            done()
        })

        it('resets the control to valid (unsubmitted) state after typing anything into it', async done => {
            expect(await elementExists(`input#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}.${PatternSpecControlStates.INVALID}`))
                .toBeTruthy()

            await fillInElement(control, INVALID_TEST_MODIFICATION)

            expect(await elementExists(`input#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}.${PatternSpecControlStates.UNSUBMITTED}`))
                .toBeTruthy()

            done()
        })
    })
})
