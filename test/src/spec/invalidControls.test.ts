import { ElementHandle } from 'puppeteer'
import { SecretSelectorsForTest, SpecControlStates } from '../../../src/indexForTest'
import {
    BAD_FORMAT_INVALID_TEST_MODIFICATION,
    elementExists,
    elementInnerText,
    elementValue,
    findElement,
    loseFocus,
    OUT_OF_RANGE_INVALID_TEST_MODIFICATION,
    press,
    refreshWithTestPatternSelected,
    selectOption,
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
    let control: ElementHandle

    describe('bad format', () => {
        beforeEach(async (done: DoneFn) => {
            await refreshWithTestPatternSelected()

            control = await findElement(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`)
            await control.type(BAD_FORMAT_INVALID_TEST_MODIFICATION)

            done()
        })

        it('marks as invalid, and it does not crash or attempt to recompile with this invalid data', async (done: DoneFn) => {
            expect(await elementExists(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}.${SpecControlStates.INVALID}`))
                .toBeTruthy()

            expect(await elementInnerText(`#${SPEC_RANGED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(`${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE}`)

            done()
        })

        it('shows an invalid message', async (done: DoneFn) => {
            expect(await elementInnerText(`#${SPEC_RANGED_PROPERTY_ONE_KEY} .invalid-message`))
                .toBe('this property is formatted in a way which cannot be parsed')

            done()
        })

        it('resets the control to valid after typing something valid into it', async (done: DoneFn) => {
            expect(await elementExists(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}.${SpecControlStates.INVALID}`))
                .toBeTruthy()

            await control.click()
            await press('Backspace')

            expect(await elementExists(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}.${SpecControlStates.VALID}`))
                .toBeTruthy()

            done()
        })

        it('preserves the invalid state and displayed value if you make a change to another control', async (done: DoneFn) => {
            control = await findElement(`input[type=number]#${SPEC_RANGED_PROPERTY_TWO_KEY}`)
            await control.type(VALID_TEST_MODIFICATION)

            expect(await elementExists(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}.${SpecControlStates.INVALID}`))
                .toBeTruthy()
            expect(await elementValue(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`))
                .toBe('')

            done()
        })
    })

    describe('out of range', () => {
        beforeEach(async (done: DoneFn) => {
            await refreshWithTestPatternSelected()

            control = await findElement(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`)
            await control.type(OUT_OF_RANGE_INVALID_TEST_MODIFICATION)

            done()
        })

        it('marks as invalid, and it does not crash or attempt to recompile with this invalid data', async (done: DoneFn) => {
            expect(await elementExists(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}.${SpecControlStates.INVALID}`))
                .toBeTruthy()

            expect(await elementInnerText(`#${SPEC_RANGED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(`${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE}`)

            done()
        })

        it('shows an invalid message', async (done: DoneFn) => {
            expect(await elementInnerText(`#${SPEC_RANGED_PROPERTY_ONE_KEY} .invalid-message`))
                .toBe(`must be less than ${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_MAX_VALUE}`)

            done()
        })

        it('resets the control to valid after typing something valid into it', async (done: DoneFn) => {
            expect(await elementExists(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}.${SpecControlStates.INVALID}`))
                .toBeTruthy()

            await control.click()
            await press('Backspace')

            expect(await elementExists(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}.${SpecControlStates.VALID}`))
                .toBeTruthy()

            done()
        })

        it('preserves the invalid state if you make a change to another control', async (done: DoneFn) => {
            control = await findElement(`input[type=number]#${SPEC_RANGED_PROPERTY_TWO_KEY}`)
            await control.type(VALID_TEST_MODIFICATION)

            expect(await elementExists(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}.${SpecControlStates.INVALID}`))
                .toBeTruthy()
            expect(await elementValue(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`))
                .toBe(`${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE}${OUT_OF_RANGE_INVALID_TEST_MODIFICATION}`)

            done()
        })
    })

    describe('custom validity', () => {
        let lastStillValidValue: string
        beforeEach(async (done: DoneFn) => {
            await refreshWithTestPatternSelected()
            const testPattern: ElementHandle = await findElement(`#${VALIDATION_PATTERN_ID}`)
            await testPattern.click()

            control = await findElement(`input[type=number]#${SPEC_RANGED_PROPERTY_TWO_KEY}`)
            await control.click()
            await press('Backspace')
            lastStillValidValue = await elementInnerText(`#${SPEC_RANGED_PROPERTY_TWO_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`)
            await press('Backspace')
            await loseFocus()

            done()
        })

        it('marks all involved controls as invalid, and it does not crash or attempt to recompile with the new data that caused the invalidity', async (done: DoneFn) => {
            expect(await elementExists(`input[type=number]#${SPEC_RANGED_PROPERTY_TWO_KEY}.${SpecControlStates.INVALID}`))
                .toBeTruthy()
            expect(await elementExists(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}.${SpecControlStates.INVALID}`))
                .toBeTruthy()

            expect(await elementInnerText(`#${SPEC_RANGED_PROPERTY_TWO_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(lastStillValidValue)

            done()
        })

        it('shows invalid messages for all involved controls', async (done: DoneFn) => {
            expect(await elementInnerText(`#${SPEC_RANGED_PROPERTY_TWO_KEY} .invalid-message`))
                .toBe('pitch must be more than duration, obvs')
            expect(await elementInnerText(`#${SPEC_RANGED_PROPERTY_ONE_KEY} .invalid-message`))
                .toBe('duration must be less than pitch, obvs')

            done()
        })

        it('resets all involved controls to valid state after typing a fix', async (done: DoneFn) => {
            expect(await elementExists(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}.${SpecControlStates.INVALID}`))
                .toBeTruthy()
            expect(await elementExists(`input[type=number]#${SPEC_RANGED_PROPERTY_TWO_KEY}.${SpecControlStates.INVALID}`))
                .toBeTruthy()

            const ANYTHING_VALID_BUT_DIFFERENT_THAN_THE_INITIAL: string = '87'
            await control.type(ANYTHING_VALID_BUT_DIFFERENT_THAN_THE_INITIAL)

            expect(await elementExists(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}.${SpecControlStates.VALID}`))
                .toBeTruthy()
            expect(await elementExists(`input[type=number]#${SPEC_RANGED_PROPERTY_TWO_KEY}.${SpecControlStates.VALID}`))
                .toBeTruthy()

            done()
        })

        it('preserves the invalid states if you make a change to another control', async (done: DoneFn) => {
            await selectOption(`select#${SPEC_OPTIONED_PROPERTY_ONE_KEY}`, SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)

            expect(await elementExists(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}.${SpecControlStates.INVALID}`))
                .toBeTruthy()
            expect(await elementExists(`input[type=number]#${SPEC_RANGED_PROPERTY_TWO_KEY}.${SpecControlStates.INVALID}`))
                .toBeTruthy()

            done()
        })
    })

    describe('arrayed controls', () => {
        it('only marks the specific element which is invalid', async (done: DoneFn) => {
            await refreshWithTestPatternSelected()

            control = await findElement(`input[type=number]#${SPEC_ARRAYED_PROPERTY_KEY}-2`)
            await control.type(BAD_FORMAT_INVALID_TEST_MODIFICATION)

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

        it('runs validation when removing an element', async (done: DoneFn) => {
            await refreshWithTestPatternSelected()
            const testPattern: ElementHandle = await findElement(`#${VALIDATION_PATTERN_ID}`)
            await testPattern.click()

            const removeButton: ElementHandle = await findElement(`#${SPEC_ARRAYED_PROPERTY_KEY} .remove`)
            await removeButton.click()

            const expectedInvalidMessage: string = 'arrays can only be odd in length, duoy'
            expect(await elementInnerText(`#${SPEC_ARRAYED_PROPERTY_KEY}-0 .invalid-message`))
                .toBe(expectedInvalidMessage)
            expect(await elementInnerText(`#${SPEC_ARRAYED_PROPERTY_KEY}-1 .invalid-message`))
                .toBe(expectedInvalidMessage)
            expect(await elementInnerText(`#${SPEC_ARRAYED_PROPERTY_KEY}-2 .invalid-message`))
                .toBe(expectedInvalidMessage)
            expect(await elementInnerText(`#${SPEC_ARRAYED_PROPERTY_KEY}-3 .invalid-message`))
                .toBe(expectedInvalidMessage)

            done()
        })
    })
})
