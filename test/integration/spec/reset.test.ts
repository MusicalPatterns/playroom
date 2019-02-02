import { ElementHandle } from 'puppeteer'
import { SpecControlStates } from '../../../src/indexForTest'
import {
    BAD_FORMAT_INVALID_TEST_MODIFICATION,
    elementChecked,
    elementExists,
    elementValue,
    findElement,
    press,
    refreshWithTestPatternSelected,
    reset,
    selectOption,
    SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE,
    SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_TWO_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_TOGGLED_PROPERTY_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_TOGGLED_PROPERTY_MODIFIED_VALUE,
    SPEC_OPTIONED_PROPERTY_ONE_KEY,
    SPEC_RANGED_PROPERTY_ONE_KEY,
    SPEC_RANGED_PROPERTY_TWO_KEY,
    SPEC_TOGGLED_PROPERTY_KEY,
    VALID_TEST_MODIFICATION,
} from '../../support'

describe('reset button', () => {
    beforeEach(async (done: DoneFn) => {
        await refreshWithTestPatternSelected()
        done()
    })

    it('reset button is disabled initially', async (done: DoneFn) => {
        expect(await elementExists(`button#reset:disabled`))
            .toBeTruthy()
        done()
    })

    it('reset button is enabled when any control is altered', async (done: DoneFn) => {
        const control: ElementHandle = await findElement(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`)
        await control.type(VALID_TEST_MODIFICATION)

        expect(await elementExists(`button#reset:enabled`))
            .toBeTruthy()

        done()
    })

    it('reset button is disabled when the control is altered back to the defaults', async (done: DoneFn) => {
        const control: ElementHandle = await findElement(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`)
        await control.type(VALID_TEST_MODIFICATION)

        expect(await elementExists(`button#reset:enabled`))
            .toBeTruthy()

        await control.click()
        await press('Backspace')
        await press('Enter')

        expect(await elementExists(`button#reset:disabled`))
            .toBeTruthy()

        done()
    })

    it('resets the spec to the pattern\'s defaults', async (done: DoneFn) => {
        const controlOne: ElementHandle = await findElement(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`)
        await controlOne.type(VALID_TEST_MODIFICATION)
        const controlTwo: ElementHandle = await findElement(`input[type=number]#${SPEC_RANGED_PROPERTY_TWO_KEY}`)
        await controlTwo.type(VALID_TEST_MODIFICATION)
        await selectOption(`select#${SPEC_OPTIONED_PROPERTY_ONE_KEY}`, SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)
        const checkbox: ElementHandle = await findElement(`input#${SPEC_TOGGLED_PROPERTY_KEY}`)
        await checkbox.click()

        expect(await elementValue(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`))
            .toBe(`${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE}${VALID_TEST_MODIFICATION}`)
        expect(await elementValue(`input[type=number]#${SPEC_RANGED_PROPERTY_TWO_KEY}`))
            .toBe(`${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_TWO_INITIAL_VALUE}${VALID_TEST_MODIFICATION}`)
        expect(await elementValue(`select#${SPEC_OPTIONED_PROPERTY_ONE_KEY}`))
            .toBe(SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)
        expect(await elementChecked(`input#${SPEC_TOGGLED_PROPERTY_KEY}`))
            .toBe(SPEC_CONTROLS_PATTERN_TOGGLED_PROPERTY_MODIFIED_VALUE)

        await reset()

        expect(await elementValue(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`))
            .toBe(`${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE}`)
        expect(await elementValue(`input[type=number]#${SPEC_RANGED_PROPERTY_TWO_KEY}`))
            .toBe(`${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_TWO_INITIAL_VALUE}`)
        expect(await elementValue(`select#${SPEC_OPTIONED_PROPERTY_ONE_KEY}`))
            .toBe(SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_INITIAL_VALUE)
        expect(await elementChecked(`input#${SPEC_TOGGLED_PROPERTY_KEY}`))
            .toBe(SPEC_CONTROLS_PATTERN_TOGGLED_PROPERTY_INITIAL_VALUE)

        done()
    })

    it('if there were any invalid controls, they no longer appear as invalid', async (done: DoneFn) => {
        const controlToBeInvalid: ElementHandle = await findElement(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`)
        await controlToBeInvalid.type(BAD_FORMAT_INVALID_TEST_MODIFICATION)
        expect(await elementExists(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}.${SpecControlStates.INVALID}`))
            .toBeTruthy()

        const inputToBeChangedSuchThatResetButtonIsEnabled: ElementHandle = await findElement(`input[type=number]#${SPEC_RANGED_PROPERTY_TWO_KEY}`)
        await inputToBeChangedSuchThatResetButtonIsEnabled.type(VALID_TEST_MODIFICATION)
        await reset()

        expect(await elementExists(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}.${SpecControlStates.VALID}`))
            .toBeTruthy()

        done()
    })
})
