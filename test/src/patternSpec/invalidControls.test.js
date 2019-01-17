import { clickElement, fillInElement, findElement } from 'puppet-strings'
import { PatternSpecControlStates, SecretSelectorsForTest } from '../../../src/indexForTest'
import { testGlobals } from '../../setup'
import {
    BAD_FORMAT_INVALID_TEST_MODIFICATION,
    elementExists,
    elementInnerText,
    OUT_OF_RANGE_INVALID_TEST_MODIFICATION,
    PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY,
    refreshWithTestPatternSelected,
    TEST_PATTERN_SPEC_RANGED_PROPERTY_ONE_INITIAL_VALUE,
} from '../../support'

describe('invalid controls', () => {
    let control

    describe('bad format', () => {
        beforeEach(async done => {
            await refreshWithTestPatternSelected()

            control = await findElement(testGlobals.tab, `input[type=number]#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}`)
            await fillInElement(control, BAD_FORMAT_INVALID_TEST_MODIFICATION)

            done()
        })

        it('does not mark a control as invalid if you only type invalid data but do not submit it; only marks it as unsubmitted', async done => {
            expect(await elementExists(`input[type=number]#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}.${PatternSpecControlStates.UNSUBMITTED}`))
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
                expect(await elementExists(`input[type=number]#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}.${PatternSpecControlStates.INVALID}`))
                    .toBeTruthy()

                expect(await elementInnerText(`.${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_CONTROL}#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}`))
                    .toBe(`${TEST_PATTERN_SPEC_RANGED_PROPERTY_ONE_INITIAL_VALUE}`)

                done()
            })

            it('resets the control to valid (unsubmitted) state after typing anything into it', async done => {
                expect(await elementExists(`input[type=number]#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}.${PatternSpecControlStates.INVALID}`))
                    .toBeTruthy()

                await fillInElement(control, OUT_OF_RANGE_INVALID_TEST_MODIFICATION)

                expect(await elementExists(`input[type=number]#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}.${PatternSpecControlStates.UNSUBMITTED}`))
                    .toBeTruthy()

                done()
            })
        })
    })

    describe('out of range', () => {
        beforeEach(async done => {
            await refreshWithTestPatternSelected()

            control = await findElement(testGlobals.tab, `input[type=number]#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}`)
            await fillInElement(control, OUT_OF_RANGE_INVALID_TEST_MODIFICATION)

            done()
        })

        it('does not mark a control as invalid if you only type invalid data but do not submit it; only marks it as unsubmitted', async done => {
            expect(await elementExists(`input[type=number]#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}.${PatternSpecControlStates.UNSUBMITTED}`))
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
                expect(await elementExists(`input[type=number]#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}.${PatternSpecControlStates.INVALID}`))
                    .toBeTruthy()

                expect(await elementInnerText(`.${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_CONTROL}#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}`))
                    .toBe(`${TEST_PATTERN_SPEC_RANGED_PROPERTY_ONE_INITIAL_VALUE}`)

                done()
            })

            it('resets the control to valid (unsubmitted) state after typing anything into it', async done => {
                expect(await elementExists(`input[type=number]#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}.${PatternSpecControlStates.INVALID}`))
                    .toBeTruthy()

                await fillInElement(control, BAD_FORMAT_INVALID_TEST_MODIFICATION)

                expect(await elementExists(`input[type=number]#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}.${PatternSpecControlStates.UNSUBMITTED}`))
                    .toBeTruthy()

                done()
            })
        })
    })
})
