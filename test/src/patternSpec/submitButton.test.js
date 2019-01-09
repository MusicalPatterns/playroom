import { clickElement, fillInElement, findElement } from 'puppet-strings'
import { testGlobals } from '../../setup'
import {
    elementExists,
    PATTERN_SPEC_PROPERTY_ONE_KEY,
    press,
    standardTestReset,
    TEST_MODIFICATION,
} from '../../support'

describe('submit button', () => {
    beforeEach(async done => {
        await standardTestReset()
        done()
    })

    it('enables the submit button for a pattern spec input after you type anything', async done => {
        expect(await elementExists(`button#${PATTERN_SPEC_PROPERTY_ONE_KEY}:disabled`))
            .toBeTruthy()

        const input = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_PROPERTY_ONE_KEY}`)
        await fillInElement(input, TEST_MODIFICATION)

        expect(await elementExists(`button#${PATTERN_SPEC_PROPERTY_ONE_KEY}:enabled`))
            .toBeTruthy()

        done()
    })

    it('resets the submit button to disabled when you click it', async done => {
        expect(await elementExists(`button#${PATTERN_SPEC_PROPERTY_ONE_KEY}:disabled`))
            .toBeTruthy()

        const input = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_PROPERTY_ONE_KEY}`)
        await fillInElement(input, TEST_MODIFICATION)

        expect(await elementExists(`button#${PATTERN_SPEC_PROPERTY_ONE_KEY}:enabled`))
            .toBeTruthy()

        const button = await findElement(testGlobals.tab, `button#${PATTERN_SPEC_PROPERTY_ONE_KEY}`)
        await clickElement(button)

        expect(await elementExists(`button#${PATTERN_SPEC_PROPERTY_ONE_KEY}:disabled`))
            .toBeTruthy()

        done()
    })

    it('resets the submit button to disabled when you submit its pattern spec input via the keyboard', async done => {
        expect(await elementExists(`button#${PATTERN_SPEC_PROPERTY_ONE_KEY}:disabled`))
            .toBeTruthy()

        const input = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_PROPERTY_ONE_KEY}`)
        await fillInElement(input, TEST_MODIFICATION)

        expect(await elementExists(`button#${PATTERN_SPEC_PROPERTY_ONE_KEY}:enabled`))
            .toBeTruthy()

        await clickElement(input)
        await press('Enter')

        expect(await elementExists(`button#${PATTERN_SPEC_PROPERTY_ONE_KEY}:disabled`))
            .toBeTruthy()

        done()
    })

    it('resets the submit button to disabled when you return its pattern spec input back to what you have already submitted', async done => {
        expect(await elementExists(`button#${PATTERN_SPEC_PROPERTY_ONE_KEY}:disabled`))
            .toBeTruthy()

        const input = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_PROPERTY_ONE_KEY}`)
        await fillInElement(input, TEST_MODIFICATION)

        expect(await elementExists(`button#${PATTERN_SPEC_PROPERTY_ONE_KEY}:enabled`))
            .toBeTruthy()

        await clickElement(input)
        await press('Backspace')

        expect(await elementExists(`button#${PATTERN_SPEC_PROPERTY_ONE_KEY}:disabled`))
            .toBeTruthy()

        done()
    })
})
