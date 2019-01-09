import { clickElement, fillInElement, findElement } from 'puppet-strings'
import { testGlobals } from '../../setup'
import {
    elementInnerText,
    modify,
    PATTERN_SPEC_PROPERTY_ONE_KEY,
    PATTERN_SPEC_PROPERTY_TWO_KEY,
    standardTestReset,
    TEST_MODIFICATION,
    TEST_PATTERN_SPEC_PROPERTY_ONE_VALUE,
    TEST_PATTERN_SPEC_PROPERTY_TWO_VALUE,
} from '../../support'

describe('submitting pattern spec changes', () => {
    beforeEach(async done => {
        await standardTestReset()
        done()
    })

    it('does not immediately submit when you type into a pattern spec input', async done => {
        const input = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_PROPERTY_ONE_KEY}`)
        await fillInElement(input, TEST_MODIFICATION)

        expect(await elementInnerText(`.secret-submitted#${PATTERN_SPEC_PROPERTY_ONE_KEY}`))
            .toBe(`${TEST_PATTERN_SPEC_PROPERTY_ONE_VALUE}`)

        done()
    })

    it('submits a pattern spec input when you press enter', async done => {
        const input = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_PROPERTY_ONE_KEY}`)
        await modify(input)

        expect(await elementInnerText(`.secret-submitted#${PATTERN_SPEC_PROPERTY_ONE_KEY}`))
            .toBe(`${TEST_PATTERN_SPEC_PROPERTY_ONE_VALUE}${TEST_MODIFICATION}`)

        done()
    })

    it('submits a pattern spec input when you press the submit button', async done => {
        const input = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_PROPERTY_ONE_KEY}`)
        await fillInElement(input, TEST_MODIFICATION)
        const button = await findElement(testGlobals.tab, `button#${PATTERN_SPEC_PROPERTY_ONE_KEY}`)
        await clickElement(button)

        expect(await elementInnerText(`.secret-submitted#${PATTERN_SPEC_PROPERTY_ONE_KEY}`))
            .toBe(`${TEST_PATTERN_SPEC_PROPERTY_ONE_VALUE}${TEST_MODIFICATION}`)

        done()
    })

    it('does not submit all the pattern spec inputs when you press enter (only the one you are focused on)', async done => {
        const inputOne = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_PROPERTY_ONE_KEY}`)
        await fillInElement(inputOne, TEST_MODIFICATION)

        const inputTwo = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_PROPERTY_TWO_KEY}`)
        await modify(inputTwo)

        expect(await elementInnerText(`.secret-submitted#${PATTERN_SPEC_PROPERTY_ONE_KEY}`))
            .toBe(`${TEST_PATTERN_SPEC_PROPERTY_ONE_VALUE}`)
        expect(await elementInnerText(`.secret-submitted#${PATTERN_SPEC_PROPERTY_TWO_KEY}`))
            .toBe(`${TEST_PATTERN_SPEC_PROPERTY_TWO_VALUE}${TEST_MODIFICATION}`)

        done()
    })

    it('does not submit all the pattern spec inputs when you press a submit button (only the one the button is for)', async done => {
        const inputOne = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_PROPERTY_ONE_KEY}`)
        await fillInElement(inputOne, TEST_MODIFICATION)

        const inputTwo = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_PROPERTY_TWO_KEY}`)
        await fillInElement(inputTwo, TEST_MODIFICATION)
        const button = await findElement(testGlobals.tab, `button#${PATTERN_SPEC_PROPERTY_TWO_KEY}`)
        await clickElement(button)

        expect(await elementInnerText(`.secret-submitted#${PATTERN_SPEC_PROPERTY_ONE_KEY}`))
            .toBe(`${TEST_PATTERN_SPEC_PROPERTY_ONE_VALUE}`)
        expect(await elementInnerText(`.secret-submitted#${PATTERN_SPEC_PROPERTY_TWO_KEY}`))
            .toBe(`${TEST_PATTERN_SPEC_PROPERTY_TWO_VALUE}${TEST_MODIFICATION}`)

        done()
    })

    it('preserves earlier pattern spec changes you have made when you submit a second pattern spec input', async done => {
        const inputOne = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_PROPERTY_ONE_KEY}`)
        await modify(inputOne)

        const inputTwo = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_PROPERTY_TWO_KEY}`)
        await modify(inputTwo)

        expect(await elementInnerText(`.secret-submitted#${PATTERN_SPEC_PROPERTY_ONE_KEY}`))
            .toBe(`${TEST_PATTERN_SPEC_PROPERTY_ONE_VALUE}${TEST_MODIFICATION}`)
        expect(await elementInnerText(`.secret-submitted#${PATTERN_SPEC_PROPERTY_TWO_KEY}`))
            .toBe(`${TEST_PATTERN_SPEC_PROPERTY_TWO_VALUE}${TEST_MODIFICATION}`)

        done()
    })

    it('keeps the pattern spec inputs in the same order after submitting a change', async done => {
        let inputIds = await testGlobals.page.evaluate(() =>
            Array.from(document.querySelectorAll('#pattern-spec-inputs input')).map(element => element.id),
        )
        expect(inputIds)
            .toEqual([ PATTERN_SPEC_PROPERTY_ONE_KEY, PATTERN_SPEC_PROPERTY_TWO_KEY ])

        const input = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_PROPERTY_ONE_KEY}`)
        await fillInElement(input, TEST_MODIFICATION)

        inputIds = await testGlobals.page.evaluate(() =>
            Array.from(document.querySelectorAll('#pattern-spec-inputs input')).map(element => element.id),
        )
        expect(inputIds)
            .toEqual([ PATTERN_SPEC_PROPERTY_ONE_KEY, PATTERN_SPEC_PROPERTY_TWO_KEY ])

        done()
    })
})
