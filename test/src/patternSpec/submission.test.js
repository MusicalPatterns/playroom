import { clickElement, fillInElement, findElement } from 'puppet-strings'
import { SecretSelectorsForTest } from '../../../src/indexForTest'
import { testGlobals } from '../../setup'
import {
    elementInnerText,
    modify,
    PATTERN_SPEC_CONTINUOUS_PROPERTY_ONE_KEY,
    PATTERN_SPEC_CONTINUOUS_PROPERTY_TWO_KEY,
    PATTERN_SPEC_DISCRETE_PROPERTY_ONE_KEY,
    PATTERN_SPEC_DISCRETE_PROPERTY_TWO_KEY,
    refreshWithTestPatternSelected,
    submitSelectByPressingEnter,
    TEST_MODIFICATION,
    TEST_PATTERN_SPEC_CONTINUOUS_PROPERTY_ONE_INITIAL_VALUE,
    TEST_PATTERN_SPEC_CONTINUOUS_PROPERTY_TWO_INITIAL_VALUE,
    TEST_PATTERN_SPEC_DISCRETE_PROPERTY_ONE_INITIAL_VALUE,
    TEST_PATTERN_SPEC_DISCRETE_PROPERTY_ONE_MODIFIED_VALUE,
    TEST_PATTERN_SPEC_DISCRETE_PROPERTY_TWO_INITIAL_VALUE,
    TEST_PATTERN_SPEC_DISCRETE_PROPERTY_TWO_MODIFIED_VALUE,
} from '../../support'

describe('submitting pattern spec changes', () => {
    beforeEach(async done => {
        await refreshWithTestPatternSelected()
        done()
    })

    it('does not immediately submit when you type into a pattern spec input', async done => {
        const input = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_CONTINUOUS_PROPERTY_ONE_KEY}`)
        await fillInElement(input, TEST_MODIFICATION)

        expect(await elementInnerText(`.${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_INPUT}#${PATTERN_SPEC_CONTINUOUS_PROPERTY_ONE_KEY}`))
            .toBe(`${TEST_PATTERN_SPEC_CONTINUOUS_PROPERTY_ONE_INITIAL_VALUE}`)

        done()
    })

    it('submits a pattern spec input when you press enter', async done => {
        const input = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_CONTINUOUS_PROPERTY_ONE_KEY}`)
        await modify(input)

        expect(await elementInnerText(`.${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_INPUT}#${PATTERN_SPEC_CONTINUOUS_PROPERTY_ONE_KEY}`))
            .toBe(`${TEST_PATTERN_SPEC_CONTINUOUS_PROPERTY_ONE_INITIAL_VALUE}${TEST_MODIFICATION}`)

        done()
    })

    it('submits a pattern spec input when you press the submit button', async done => {
        const input = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_CONTINUOUS_PROPERTY_ONE_KEY}`)
        await fillInElement(input, TEST_MODIFICATION)
        const button = await findElement(testGlobals.tab, `button#${PATTERN_SPEC_CONTINUOUS_PROPERTY_ONE_KEY}`)
        await clickElement(button)

        expect(await elementInnerText(`.${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_INPUT}#${PATTERN_SPEC_CONTINUOUS_PROPERTY_ONE_KEY}`))
            .toBe(`${TEST_PATTERN_SPEC_CONTINUOUS_PROPERTY_ONE_INITIAL_VALUE}${TEST_MODIFICATION}`)

        done()
    })

    it('does not submit all the pattern spec inputs when you press enter (only the one you are focused on)', async done => {
        const inputNotToBeSubmitted = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_CONTINUOUS_PROPERTY_ONE_KEY}`)
        await fillInElement(inputNotToBeSubmitted, TEST_MODIFICATION)

        await testGlobals.page.select(`select#${PATTERN_SPEC_DISCRETE_PROPERTY_ONE_KEY}`, TEST_PATTERN_SPEC_DISCRETE_PROPERTY_ONE_MODIFIED_VALUE)

        const inputToSubmit = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_CONTINUOUS_PROPERTY_TWO_KEY}`)
        await modify(inputToSubmit)

        expect(await elementInnerText(`.${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_INPUT}#${PATTERN_SPEC_CONTINUOUS_PROPERTY_ONE_KEY}`))
            .toBe(`${TEST_PATTERN_SPEC_CONTINUOUS_PROPERTY_ONE_INITIAL_VALUE}`)
        expect(await elementInnerText(`.${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_INPUT}#${PATTERN_SPEC_DISCRETE_PROPERTY_ONE_KEY}`))
            .toBe(TEST_PATTERN_SPEC_DISCRETE_PROPERTY_ONE_INITIAL_VALUE)
        expect([
            // due to some race condition in Puppeteer, some commits it's one way, some another...
            `${TEST_MODIFICATION}${TEST_PATTERN_SPEC_CONTINUOUS_PROPERTY_TWO_INITIAL_VALUE}`,
            `${TEST_PATTERN_SPEC_CONTINUOUS_PROPERTY_TWO_INITIAL_VALUE}${TEST_MODIFICATION}`,
        ]).toContain(await elementInnerText(`.${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_INPUT}#${PATTERN_SPEC_CONTINUOUS_PROPERTY_TWO_KEY}`))

        done()
    })

    it('does not submit all the pattern spec inputs when you press a submit button (only the one the button is for)', async done => {
        const inputNotToBeSubmitted = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_CONTINUOUS_PROPERTY_ONE_KEY}`)
        await fillInElement(inputNotToBeSubmitted, TEST_MODIFICATION)

        await testGlobals.page.select(`select#${PATTERN_SPEC_DISCRETE_PROPERTY_ONE_KEY}`, TEST_PATTERN_SPEC_DISCRETE_PROPERTY_ONE_MODIFIED_VALUE)

        const inputToSubmit = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_CONTINUOUS_PROPERTY_TWO_KEY}`)
        await fillInElement(inputToSubmit, TEST_MODIFICATION)
        const button = await findElement(testGlobals.tab, `button#${PATTERN_SPEC_CONTINUOUS_PROPERTY_TWO_KEY}`)
        await clickElement(button)

        expect(await elementInnerText(`.${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_INPUT}#${PATTERN_SPEC_CONTINUOUS_PROPERTY_ONE_KEY}`))
            .toBe(`${TEST_PATTERN_SPEC_CONTINUOUS_PROPERTY_ONE_INITIAL_VALUE}`)
        expect(await elementInnerText(`.${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_INPUT}#${PATTERN_SPEC_DISCRETE_PROPERTY_ONE_KEY}`))
            .toBe(TEST_PATTERN_SPEC_DISCRETE_PROPERTY_ONE_INITIAL_VALUE)
        expect(await elementInnerText(`.${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_INPUT}#${PATTERN_SPEC_CONTINUOUS_PROPERTY_TWO_KEY}`))
            .toBe(`${TEST_PATTERN_SPEC_CONTINUOUS_PROPERTY_TWO_INITIAL_VALUE}${TEST_MODIFICATION}`)

        done()
    })

    it('preserves earlier pattern spec changes you have made when you submit a second pattern spec input', async done => {
        const previouslySubmittedInput = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_CONTINUOUS_PROPERTY_ONE_KEY}`)
        await modify(previouslySubmittedInput)

        await testGlobals.page.select(`select#${PATTERN_SPEC_DISCRETE_PROPERTY_ONE_KEY}`, TEST_PATTERN_SPEC_DISCRETE_PROPERTY_ONE_MODIFIED_VALUE)
        await submitSelectByPressingEnter()

        const inputUnderTest = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_CONTINUOUS_PROPERTY_TWO_KEY}`)
        await modify(inputUnderTest)

        expect(await elementInnerText(`.${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_INPUT}#${PATTERN_SPEC_CONTINUOUS_PROPERTY_ONE_KEY}`))
            .toBe(`${TEST_PATTERN_SPEC_CONTINUOUS_PROPERTY_ONE_INITIAL_VALUE}${TEST_MODIFICATION}`)
        expect(await elementInnerText(`.${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_INPUT}#${PATTERN_SPEC_DISCRETE_PROPERTY_ONE_KEY}`))
            .toBe(TEST_PATTERN_SPEC_DISCRETE_PROPERTY_ONE_MODIFIED_VALUE)
        expect(await elementInnerText(`.${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_INPUT}#${PATTERN_SPEC_CONTINUOUS_PROPERTY_TWO_KEY}`))
            .toBe(`${TEST_PATTERN_SPEC_CONTINUOUS_PROPERTY_TWO_INITIAL_VALUE}${TEST_MODIFICATION}`)

        done()
    })

    it('keeps the pattern spec inputs in the same order after submitting a change', async done => {
        let inputIds = await testGlobals.page.evaluate(() =>
            Array.from(document.querySelectorAll('#pattern-spec-inputs input')).map(element => element.id),
        )
        expect(inputIds)
            .toEqual([ PATTERN_SPEC_CONTINUOUS_PROPERTY_ONE_KEY, PATTERN_SPEC_CONTINUOUS_PROPERTY_TWO_KEY ])

        const input = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_CONTINUOUS_PROPERTY_ONE_KEY}`)
        await fillInElement(input, TEST_MODIFICATION)

        inputIds = await testGlobals.page.evaluate(() =>
            Array.from(document.querySelectorAll('#pattern-spec-inputs input')).map(element => element.id),
        )
        expect(inputIds)
            .toEqual([ PATTERN_SPEC_CONTINUOUS_PROPERTY_ONE_KEY, PATTERN_SPEC_CONTINUOUS_PROPERTY_TWO_KEY ])

        done()
    })

    describe('does the same for discrete type selects', () => {
        it('does not immediately submit when you choose a new value from a pattern spec select', async done => {
            await testGlobals.page.select(`select#${PATTERN_SPEC_DISCRETE_PROPERTY_ONE_KEY}`, TEST_PATTERN_SPEC_DISCRETE_PROPERTY_ONE_MODIFIED_VALUE)

            expect(await elementInnerText(`.${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_INPUT}#${PATTERN_SPEC_DISCRETE_PROPERTY_ONE_KEY}`))
                .toBe(TEST_PATTERN_SPEC_DISCRETE_PROPERTY_ONE_INITIAL_VALUE)

            done()
        })

        it('submits a pattern spec select when you press enter', async done => {
            await testGlobals.page.select(`select#${PATTERN_SPEC_DISCRETE_PROPERTY_ONE_KEY}`, TEST_PATTERN_SPEC_DISCRETE_PROPERTY_ONE_MODIFIED_VALUE)
            await submitSelectByPressingEnter()

            expect(await elementInnerText(`.${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_INPUT}#${PATTERN_SPEC_DISCRETE_PROPERTY_ONE_KEY}`))
                .toBe(TEST_PATTERN_SPEC_DISCRETE_PROPERTY_ONE_MODIFIED_VALUE)

            done()
        })

        it('submits a pattern spec select when you press the submit button', async done => {
            await testGlobals.page.select(`select#${PATTERN_SPEC_DISCRETE_PROPERTY_ONE_KEY}`, TEST_PATTERN_SPEC_DISCRETE_PROPERTY_ONE_MODIFIED_VALUE)
            const buttonForSelect = await findElement(testGlobals.tab, `button#${PATTERN_SPEC_DISCRETE_PROPERTY_ONE_KEY}`)
            await clickElement(buttonForSelect)

            expect(await elementInnerText(`.${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_INPUT}#${PATTERN_SPEC_DISCRETE_PROPERTY_ONE_KEY}`))
                .toBe(TEST_PATTERN_SPEC_DISCRETE_PROPERTY_ONE_MODIFIED_VALUE)

            done()
        })

        it('does not submit all the pattern spec selects when you press enter (only the one you are focused on)', async done => {
            const inputNotToBeSubmitted = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_CONTINUOUS_PROPERTY_ONE_KEY}`)
            await fillInElement(inputNotToBeSubmitted, TEST_MODIFICATION)

            await testGlobals.page.select(`select#${PATTERN_SPEC_DISCRETE_PROPERTY_TWO_KEY}`, TEST_PATTERN_SPEC_DISCRETE_PROPERTY_TWO_MODIFIED_VALUE)

            await testGlobals.page.select(`select#${PATTERN_SPEC_DISCRETE_PROPERTY_ONE_KEY}`, TEST_PATTERN_SPEC_DISCRETE_PROPERTY_ONE_MODIFIED_VALUE)
            await submitSelectByPressingEnter()

            expect(await elementInnerText(`.${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_INPUT}#${PATTERN_SPEC_CONTINUOUS_PROPERTY_ONE_KEY}`))
                .toBe(`${TEST_PATTERN_SPEC_CONTINUOUS_PROPERTY_ONE_INITIAL_VALUE}`)
            expect(await elementInnerText(`.${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_INPUT}#${PATTERN_SPEC_DISCRETE_PROPERTY_TWO_KEY}`))
                .toBe(TEST_PATTERN_SPEC_DISCRETE_PROPERTY_TWO_INITIAL_VALUE)
            expect(await elementInnerText(`.${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_INPUT}#${PATTERN_SPEC_DISCRETE_PROPERTY_ONE_KEY}`))
                .toBe(TEST_PATTERN_SPEC_DISCRETE_PROPERTY_ONE_MODIFIED_VALUE)

            done()
        })

        it('does not submit all the pattern spec selects when you press a submit button (only the one the button is for)', async done => {
            const inputNotToBeSubmitted = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_CONTINUOUS_PROPERTY_ONE_KEY}`)
            await fillInElement(inputNotToBeSubmitted, TEST_MODIFICATION)

            await testGlobals.page.select(`select#${PATTERN_SPEC_DISCRETE_PROPERTY_TWO_KEY}`, TEST_PATTERN_SPEC_DISCRETE_PROPERTY_TWO_MODIFIED_VALUE)

            await testGlobals.page.select(`select#${PATTERN_SPEC_DISCRETE_PROPERTY_ONE_KEY}`, TEST_PATTERN_SPEC_DISCRETE_PROPERTY_ONE_MODIFIED_VALUE)
            const buttonForSelect = await findElement(testGlobals.tab, `button#${PATTERN_SPEC_DISCRETE_PROPERTY_ONE_KEY}`)
            await clickElement(buttonForSelect)

            expect(await elementInnerText(`.${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_INPUT}#${PATTERN_SPEC_CONTINUOUS_PROPERTY_ONE_KEY}`))
                .toBe(`${TEST_PATTERN_SPEC_CONTINUOUS_PROPERTY_ONE_INITIAL_VALUE}`)
            expect(await elementInnerText(`.${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_INPUT}#${PATTERN_SPEC_DISCRETE_PROPERTY_TWO_KEY}`))
                .toBe(TEST_PATTERN_SPEC_DISCRETE_PROPERTY_TWO_INITIAL_VALUE)
            expect(await elementInnerText(`.${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_INPUT}#${PATTERN_SPEC_DISCRETE_PROPERTY_ONE_KEY}`))
                .toBe(TEST_PATTERN_SPEC_DISCRETE_PROPERTY_ONE_MODIFIED_VALUE)

            done()
        })

        it('preserves earlier pattern spec changes you have made when you submit a second pattern spec select', async done => {
            const previouslySubmittedInput = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_CONTINUOUS_PROPERTY_ONE_KEY}`)
            await modify(previouslySubmittedInput)

            await testGlobals.page.select(`select#${PATTERN_SPEC_DISCRETE_PROPERTY_ONE_KEY}`, TEST_PATTERN_SPEC_DISCRETE_PROPERTY_ONE_MODIFIED_VALUE)
            const buttonForPreviouslySubmittedSelect = await findElement(testGlobals.tab, `button#${PATTERN_SPEC_DISCRETE_PROPERTY_ONE_KEY}`)
            await clickElement(buttonForPreviouslySubmittedSelect)

            await testGlobals.page.select(`select#${PATTERN_SPEC_DISCRETE_PROPERTY_TWO_KEY}`, TEST_PATTERN_SPEC_DISCRETE_PROPERTY_TWO_MODIFIED_VALUE)
            const buttonForSelectUnderTest = await findElement(testGlobals.tab, `button#${PATTERN_SPEC_DISCRETE_PROPERTY_TWO_KEY}`)
            await clickElement(buttonForSelectUnderTest)

            expect(await elementInnerText(`.${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_INPUT}#${PATTERN_SPEC_CONTINUOUS_PROPERTY_ONE_KEY}`))
                .toBe(`${TEST_PATTERN_SPEC_CONTINUOUS_PROPERTY_ONE_INITIAL_VALUE}${TEST_MODIFICATION}`)
            expect(await elementInnerText(`.${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_INPUT}#${PATTERN_SPEC_DISCRETE_PROPERTY_ONE_KEY}`))
                .toBe(TEST_PATTERN_SPEC_DISCRETE_PROPERTY_ONE_MODIFIED_VALUE)
            expect(await elementInnerText(`.${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_INPUT}#${PATTERN_SPEC_DISCRETE_PROPERTY_TWO_KEY}`))
                .toBe(TEST_PATTERN_SPEC_DISCRETE_PROPERTY_TWO_MODIFIED_VALUE)

            done()
        })
    })
})
