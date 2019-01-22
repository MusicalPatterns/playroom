import { clickElement, fillInElement, findElement } from 'puppet-strings'
import { SecretSelectorsForTest, SpecControlStates } from '../../../src/indexForTest'
import { testGlobals } from '../../setup'
import {
    BAD_FORMAT_INVALID_TEST_MODIFICATION,
    elementExists,
    elementInnerText,
    elementValue,
    loseFocus,
    OUT_OF_RANGE_INVALID_TEST_MODIFICATION,
    press,
    refreshWithTestPatternSelected,
    SPEC_ARRAYED_PROPERTY_KEY,
    SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE,
    SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_MAX_VALUE,
    SPEC_OPTIONED_PROPERTY_ONE_KEY,
    SPEC_RANGED_PROPERTY_ONE_KEY,
    SPEC_RANGED_PROPERTY_TWO_KEY,
    VALID_TEST_MODIFICATION,
    VALIDATION_PATTERN_ID,
} from '../../support'

describe('invalid controls', () => {
    let control

    describe('bad format', () => {
        beforeEach(async done => {
            await refreshWithTestPatternSelected()

            control = await findElement(testGlobals.tab, `input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`)
            await fillInElement(control, BAD_FORMAT_INVALID_TEST_MODIFICATION)

            done()
        })

        it('marks as invalid, and it does not crash or attempt to recompile with this invalid data', async done => {
            expect(await elementExists(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}.${SpecControlStates.INVALID}`))
                .toBeTruthy()

            expect(await elementInnerText(`#${SPEC_RANGED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(`${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE}`)

            done()
        })

        it('shows an invalid message', async done => {
            expect(await elementInnerText(`#${SPEC_RANGED_PROPERTY_ONE_KEY} .invalid-message`))
                .toBe('this property is formatted in a way which cannot be parsed')

            done()
        })

        it('resets the control to valid after typing something valid into it', async done => {
            expect(await elementExists(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}.${SpecControlStates.INVALID}`))
                .toBeTruthy()

            await fillInElement(control, `${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE}`)

            expect(await elementExists(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}.${SpecControlStates.VALID}`))
                .toBeTruthy()

            done()
        })

        it('preserves the invalid state and displayed value if you make a change to another control', async done => {
            control = await findElement(testGlobals.tab, `input[type=number]#${SPEC_RANGED_PROPERTY_TWO_KEY}`)
            await fillInElement(control, VALID_TEST_MODIFICATION)

            expect(await elementExists(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}.${SpecControlStates.INVALID}`))
                .toBeTruthy()
            expect(await elementValue(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`))
                .toBe('')

            done()
        })
    })

    describe('out of range', () => {
        beforeEach(async done => {
            await refreshWithTestPatternSelected()

            control = await findElement(testGlobals.tab, `input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`)
            await fillInElement(control, OUT_OF_RANGE_INVALID_TEST_MODIFICATION)

            done()
        })

        it('marks as invalid, and it does not crash or attempt to recompile with this invalid data', async done => {
            expect(await elementExists(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}.${SpecControlStates.INVALID}`))
                .toBeTruthy()

            expect(await elementInnerText(`#${SPEC_RANGED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(`${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE}`)

            done()
        })

        it('shows an invalid message', async done => {
            expect(await elementInnerText(`#${SPEC_RANGED_PROPERTY_ONE_KEY} .invalid-message`))
                .toBe(`must be less than or equal to ${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_MAX_VALUE}`)

            done()
        })

        it('resets the control to valid after typing something valid into it', async done => {
            expect(await elementExists(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}.${SpecControlStates.INVALID}`))
                .toBeTruthy()

            await clickElement(control)
            await press('Backspace')

            expect(await elementExists(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}.${SpecControlStates.VALID}`))
                .toBeTruthy()

            done()
        })

        it('preserves the invalid state if you make a change to another control', async done => {
            control = await findElement(testGlobals.tab, `input[type=number]#${SPEC_RANGED_PROPERTY_TWO_KEY}`)
            await fillInElement(control, VALID_TEST_MODIFICATION)

            expect(await elementExists(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}.${SpecControlStates.INVALID}`))
                .toBeTruthy()
            expect(await elementValue(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`))
                .toBe(`${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE}${OUT_OF_RANGE_INVALID_TEST_MODIFICATION}`)

            done()
        })
    })

    describe('custom validity', () => {
        let lastStillValidValue
        beforeEach(async done => {
            await refreshWithTestPatternSelected()
            const testPattern = await findElement(testGlobals.tab, `#${VALIDATION_PATTERN_ID}`)
            await clickElement(testPattern)

            control = await findElement(testGlobals.tab, `input[type=number]#${SPEC_RANGED_PROPERTY_TWO_KEY}`)
            await clickElement(control)
            await press('Backspace')
            lastStillValidValue = await elementInnerText(`#${SPEC_RANGED_PROPERTY_TWO_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`)
            await press('Backspace')
            await loseFocus()

            done()
        })

        it('marks all involved controls as invalid, and it does not crash or attempt to recompile with the new data that caused the invalidity', async done => {
            expect(await elementExists(`input[type=number]#${SPEC_RANGED_PROPERTY_TWO_KEY}.${SpecControlStates.INVALID}`))
                .toBeTruthy()
            expect(await elementExists(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}.${SpecControlStates.INVALID}`))
                .toBeTruthy()

            expect(await elementInnerText(`#${SPEC_RANGED_PROPERTY_TWO_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(lastStillValidValue)

            done()
        })

        it('shows invalid messages for all involved controls', async done => {
            expect(await elementInnerText(`#${SPEC_RANGED_PROPERTY_TWO_KEY} .invalid-message`))
                .toBe('pitch must be more than duration, obvs')
            expect(await elementInnerText(`#${SPEC_RANGED_PROPERTY_ONE_KEY} .invalid-message`))
                .toBe('duration must be less than pitch, obvs')

            done()
        })

        it('resets all involved controls to valid state after typing a fix', async done => {
            expect(await elementExists(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}.${SpecControlStates.INVALID}`))
                .toBeTruthy()
            expect(await elementExists(`input[type=number]#${SPEC_RANGED_PROPERTY_TWO_KEY}.${SpecControlStates.INVALID}`))
                .toBeTruthy()

            const ANYTHING_VALID_BUT_DIFFERENT_THAN_THE_INITIAL = '87'
            await fillInElement(control, ANYTHING_VALID_BUT_DIFFERENT_THAN_THE_INITIAL)

            expect(await elementExists(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}.${SpecControlStates.VALID}`))
                .toBeTruthy()
            expect(await elementExists(`input[type=number]#${SPEC_RANGED_PROPERTY_TWO_KEY}.${SpecControlStates.VALID}`))
                .toBeTruthy()

            done()
        })

        it('preserves the invalid states if you make a change to another control', async done => {
            await testGlobals.page.select(`select#${SPEC_OPTIONED_PROPERTY_ONE_KEY}`, SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)

            expect(await elementExists(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}.${SpecControlStates.INVALID}`))
                .toBeTruthy()
            expect(await elementExists(`input[type=number]#${SPEC_RANGED_PROPERTY_TWO_KEY}.${SpecControlStates.INVALID}`))
                .toBeTruthy()

            done()
        })
    })

    describe('arrayed controls', () => {
        it('only marks the specific element which is invalid', async done => {
            await refreshWithTestPatternSelected()

            const control = await findElement(testGlobals.tab, `input[type=number]#${SPEC_ARRAYED_PROPERTY_KEY}-2`)
            await fillInElement(control, BAD_FORMAT_INVALID_TEST_MODIFICATION)

            expect(await elementExists(`input[type=number]#${SPEC_ARRAYED_PROPERTY_KEY}-0.${SpecControlStates.VALID}`))
                .toBeTruthy()
            expect(await elementExists(`input[type=number]#${SPEC_ARRAYED_PROPERTY_KEY}-1.${SpecControlStates.VALID}`))
                .toBeTruthy()
            expect(await elementExists(`input[type=number]#${SPEC_ARRAYED_PROPERTY_KEY}-2.${SpecControlStates.INVALID}`))
                .toBeTruthy()
            expect(await elementExists(`input[type=number]#${SPEC_ARRAYED_PROPERTY_KEY}-3.${SpecControlStates.VALID}`))
                .toBeTruthy()
            expect(await elementExists(`input[type=number]#${SPEC_ARRAYED_PROPERTY_KEY}-4.${SpecControlStates.VALID}`))
                .toBeTruthy()

            done()
        })
    })
})
