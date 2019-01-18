import { clickElement, fillInElement, findElement } from 'puppet-strings'
import { PatternSpecControlStates, SecretSelectorsForTest } from '../../../src/indexForTest'
import { testGlobals } from '../../setup'
import {
    BAD_FORMAT_INVALID_TEST_MODIFICATION,
    elementExists,
    elementInnerText, loseFocus,
    OUT_OF_RANGE_INVALID_TEST_MODIFICATION,
    PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY,
    PATTERN_SPEC_RANGED_PROPERTY_TWO_KEY,
    press,
    refreshWithTestPatternSelected,
    SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_MAX_VALUE,
    SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_TWO_INITIAL_VALUE,
    VALIDATION_PATTERN_ID,
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

        it('does not show an invalid message', async done => {
            expect(await elementExists(`#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY} .invalid-message`))
                .toBeFalsy()

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

                expect(await elementInnerText(`#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_CONTROL}`))
                    .toBe(`${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE}`)

                done()
            })

            it('shows an invalid message', async done => {
                expect(await elementInnerText(`#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY} .invalid-message`))
                    .toBe('this property is formatted in a way which cannot be parsed')

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

                expect(await elementInnerText(`#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_CONTROL}`))
                    .toBe(`${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE}`)

                done()
            })

            it('shows an invalid message', async done => {
                expect(await elementInnerText(`#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY} .invalid-message`))
                    .toBe(`must be less than or equal to ${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_MAX_VALUE}`)

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

    describe('custom validity', () => {
        beforeEach(async done => {
            await refreshWithTestPatternSelected()
            const testPattern = await findElement(testGlobals.tab, `#${VALIDATION_PATTERN_ID}`)
            await clickElement(testPattern)

            control = await findElement(testGlobals.tab, `input[type=number]#${PATTERN_SPEC_RANGED_PROPERTY_TWO_KEY}`)
            await clickElement(control)
            await press('Backspace')
            await press('Backspace')
            await loseFocus()

            done()
        })

        it('does not mark a control as invalid if you only type invalid data but do not submit it; only marks it as unsubmitted', async done => {
            expect(await elementExists(`input[type=number]#${PATTERN_SPEC_RANGED_PROPERTY_TWO_KEY}.${PatternSpecControlStates.UNSUBMITTED}`))
                .toBeTruthy()

            done()
        })

        describe('after submitting', () => {
            beforeEach(async done => {
                const button = await findElement(testGlobals.tab, `button#${PATTERN_SPEC_RANGED_PROPERTY_TWO_KEY}`)
                await clickElement(button)

                done()
            })

            it('marks all involved controls as invalid when you submit invalid data, and it does not crash or attempt to recompile with the new data that caused the invalidity', async done => {
                expect(await elementExists(`input[type=number]#${PATTERN_SPEC_RANGED_PROPERTY_TWO_KEY}.${PatternSpecControlStates.INVALID}`))
                    .toBeTruthy()
                expect(await elementExists(`input[type=number]#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}.${PatternSpecControlStates.INVALID}`))
                    .toBeTruthy()

                expect(await elementInnerText(`#${PATTERN_SPEC_RANGED_PROPERTY_TWO_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_CONTROL}`))
                    .toBe(`${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_TWO_INITIAL_VALUE}`)

                done()
            })

            it('shows invalid messages for all involved controls', async done => {
                expect(await elementInnerText(`#${PATTERN_SPEC_RANGED_PROPERTY_TWO_KEY} .invalid-message`))
                    .toBe('pitch must be more than duration, obvs')
                expect(await elementInnerText(`#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY} .invalid-message`))
                    .toBe('duration must be less than pitch, obvs')

                done()
            })

            it('resets the control to valid (unsubmitted) state after typing anything into it', async done => {
                expect(await elementExists(`input[type=number]#${PATTERN_SPEC_RANGED_PROPERTY_TWO_KEY}.${PatternSpecControlStates.INVALID}`))
                    .toBeTruthy()

                await fillInElement(control, BAD_FORMAT_INVALID_TEST_MODIFICATION)

                expect(await elementExists(`input[type=number]#${PATTERN_SPEC_RANGED_PROPERTY_TWO_KEY}.${PatternSpecControlStates.UNSUBMITTED}`))
                    .toBeTruthy()

                done()
            })

            it('resets all involved controls to valid (unsubmitted) state after submitting a fix', async done => {
                expect(await elementExists(`input[type=number]#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}.${PatternSpecControlStates.INVALID}`))
                    .toBeTruthy()
                expect(await elementExists(`input[type=number]#${PATTERN_SPEC_RANGED_PROPERTY_TWO_KEY}.${PatternSpecControlStates.INVALID}`))
                    .toBeTruthy()

                const ANYTHING_VALID_BUT_DIFFERENT_THAN_THE_INITIAL = '87'
                await fillInElement(control, ANYTHING_VALID_BUT_DIFFERENT_THAN_THE_INITIAL)
                const button = await findElement(testGlobals.tab, `button#${PATTERN_SPEC_RANGED_PROPERTY_TWO_KEY}`)
                await clickElement(button)

                expect(await elementExists(`input[type=number]#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}.${PatternSpecControlStates.VALID_AND_SUBMITTED}`))
                    .toBeTruthy()
                expect(await elementExists(`input[type=number]#${PATTERN_SPEC_RANGED_PROPERTY_TWO_KEY}.${PatternSpecControlStates.VALID_AND_SUBMITTED}`))
                    .toBeTruthy()

                done()
            })
        })
    })
})
