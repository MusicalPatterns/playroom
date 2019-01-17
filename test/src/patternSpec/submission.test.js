import { clickElement, fillInElement, findElement } from 'puppet-strings'
import { SecretSelectorsForTest } from '../../../src/indexForTest'
import { testGlobals } from '../../setup'
import {
    elementInnerText,
    modify,
    PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY,
    PATTERN_SPEC_RANGED_PROPERTY_TWO_KEY,
    PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY,
    PATTERN_SPEC_OPTIONED_PROPERTY_TWO_KEY,
    refreshWithTestPatternSelected,
    submitSelectByPressingEnter,
    VALID_TEST_MODIFICATION,
    TEST_PATTERN_SPEC_RANGED_PROPERTY_ONE_INITIAL_VALUE,
    TEST_PATTERN_SPEC_RANGED_PROPERTY_TWO_INITIAL_VALUE,
    TEST_PATTERN_SPEC_OPTIONED_PROPERTY_ONE_INITIAL_VALUE,
    TEST_PATTERN_SPEC_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE,
    TEST_PATTERN_SPEC_OPTIONED_PROPERTY_TWO_INITIAL_VALUE,
    TEST_PATTERN_SPEC_OPTIONED_PROPERTY_TWO_MODIFIED_VALUE,
} from '../../support'

describe('submitting pattern spec changes', () => {
    beforeEach(async done => {
        await refreshWithTestPatternSelected()
        done()
    })

    describe('ranged controls', () => {
        it('does not immediately submit when you type into a control', async done => {
            const control = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}`)
            await fillInElement(control, VALID_TEST_MODIFICATION)

            expect(await elementInnerText(`.${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_CONTROL}#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}`))
                .toBe(`${TEST_PATTERN_SPEC_RANGED_PROPERTY_ONE_INITIAL_VALUE}`)

            done()
        })

        it('submits a control when you press enter', async done => {
            const control = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}`)
            await modify(control)

            expect(await elementInnerText(`.${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_CONTROL}#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}`))
                .toBe(`${TEST_PATTERN_SPEC_RANGED_PROPERTY_ONE_INITIAL_VALUE}${VALID_TEST_MODIFICATION}`)

            done()
        })

        it('submits a control when you press the submit button', async done => {
            const control = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}`)
            await fillInElement(control, VALID_TEST_MODIFICATION)
            const button = await findElement(testGlobals.tab, `button#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}`)
            await clickElement(button)

            expect(await elementInnerText(`.${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_CONTROL}#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}`))
                .toBe(`${TEST_PATTERN_SPEC_RANGED_PROPERTY_ONE_INITIAL_VALUE}${VALID_TEST_MODIFICATION}`)

            done()
        })

        it('does not submit all the controls when you press enter (only the one you are focused on)', async done => {
            const controlNotToBeSubmitted = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}`)
            await fillInElement(controlNotToBeSubmitted, VALID_TEST_MODIFICATION)

            await testGlobals.page.select(`select#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}`, TEST_PATTERN_SPEC_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)

            const controlToSubmit = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_RANGED_PROPERTY_TWO_KEY}`)
            await modify(controlToSubmit)

            expect(await elementInnerText(`.${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_CONTROL}#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}`))
                .toBe(`${TEST_PATTERN_SPEC_RANGED_PROPERTY_ONE_INITIAL_VALUE}`)
            expect(await elementInnerText(`.${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_CONTROL}#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}`))
                .toBe(TEST_PATTERN_SPEC_OPTIONED_PROPERTY_ONE_INITIAL_VALUE)
            expect([
                // due to some race condition in Puppeteer, some commits it's one way, some another...
                `${VALID_TEST_MODIFICATION}${TEST_PATTERN_SPEC_RANGED_PROPERTY_TWO_INITIAL_VALUE}`,
                `${TEST_PATTERN_SPEC_RANGED_PROPERTY_TWO_INITIAL_VALUE}${VALID_TEST_MODIFICATION}`,
            ]).toContain(await elementInnerText(`.${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_CONTROL}#${PATTERN_SPEC_RANGED_PROPERTY_TWO_KEY}`))

            done()
        })

        it('does not submit all the controls when you press a submit button (only the one the button is for)', async done => {
            const controlNotToBeSubmitted = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}`)
            await fillInElement(controlNotToBeSubmitted, VALID_TEST_MODIFICATION)

            await testGlobals.page.select(`select#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}`, TEST_PATTERN_SPEC_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)

            const controlToSubmit = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_RANGED_PROPERTY_TWO_KEY}`)
            await fillInElement(controlToSubmit, VALID_TEST_MODIFICATION)
            const button = await findElement(testGlobals.tab, `button#${PATTERN_SPEC_RANGED_PROPERTY_TWO_KEY}`)
            await clickElement(button)

            expect(await elementInnerText(`.${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_CONTROL}#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}`))
                .toBe(`${TEST_PATTERN_SPEC_RANGED_PROPERTY_ONE_INITIAL_VALUE}`)
            expect(await elementInnerText(`.${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_CONTROL}#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}`))
                .toBe(TEST_PATTERN_SPEC_OPTIONED_PROPERTY_ONE_INITIAL_VALUE)
            expect(await elementInnerText(`.${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_CONTROL}#${PATTERN_SPEC_RANGED_PROPERTY_TWO_KEY}`))
                .toBe(`${TEST_PATTERN_SPEC_RANGED_PROPERTY_TWO_INITIAL_VALUE}${VALID_TEST_MODIFICATION}`)

            done()
        })

        it('preserves earlier pattern spec changes you have made when you submit a second control', async done => {
            const previouslySubmittedControl = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}`)
            await modify(previouslySubmittedControl)

            await testGlobals.page.select(`select#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}`, TEST_PATTERN_SPEC_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)
            await submitSelectByPressingEnter()

            const controlUnderTest = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_RANGED_PROPERTY_TWO_KEY}`)
            await modify(controlUnderTest)

            expect(await elementInnerText(`.${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_CONTROL}#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}`))
                .toBe(`${TEST_PATTERN_SPEC_RANGED_PROPERTY_ONE_INITIAL_VALUE}${VALID_TEST_MODIFICATION}`)
            expect(await elementInnerText(`.${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_CONTROL}#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}`))
                .toBe(TEST_PATTERN_SPEC_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)
            expect(await elementInnerText(`.${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_CONTROL}#${PATTERN_SPEC_RANGED_PROPERTY_TWO_KEY}`))
                .toBe(`${TEST_PATTERN_SPEC_RANGED_PROPERTY_TWO_INITIAL_VALUE}${VALID_TEST_MODIFICATION}`)

            done()
        })

        it('keeps the controls in the same order after submitting a change', async done => {
            let controlIds = await testGlobals.page.evaluate(() =>
                Array.from(document.querySelectorAll('#pattern-spec-controls input')).map(element => element.id),
            )
            expect(controlIds)
                .toEqual([ PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY, PATTERN_SPEC_RANGED_PROPERTY_TWO_KEY ])

            const control = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}`)
            await fillInElement(control, VALID_TEST_MODIFICATION)

            controlIds = await testGlobals.page.evaluate(() =>
                Array.from(document.querySelectorAll('#pattern-spec-controls input')).map(element => element.id),
            )
            expect(controlIds)
                .toEqual([ PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY, PATTERN_SPEC_RANGED_PROPERTY_TWO_KEY ])

            done()
        })
    })

    describe('optioned controls', () => {
        it('does not immediately submit when you choose a new value from a control', async done => {
            await testGlobals.page.select(`select#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}`, TEST_PATTERN_SPEC_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)

            expect(await elementInnerText(`.${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_CONTROL}#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}`))
                .toBe(TEST_PATTERN_SPEC_OPTIONED_PROPERTY_ONE_INITIAL_VALUE)

            done()
        })

        it('submits a control when you press enter', async done => {
            await testGlobals.page.select(`select#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}`, TEST_PATTERN_SPEC_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)
            await submitSelectByPressingEnter()

            expect(await elementInnerText(`.${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_CONTROL}#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}`))
                .toBe(TEST_PATTERN_SPEC_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)

            done()
        })

        it('submits a control when you press the submit button', async done => {
            await testGlobals.page.select(`select#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}`, TEST_PATTERN_SPEC_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)
            const buttonForSelect = await findElement(testGlobals.tab, `button#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}`)
            await clickElement(buttonForSelect)

            expect(await elementInnerText(`.${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_CONTROL}#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}`))
                .toBe(TEST_PATTERN_SPEC_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)

            done()
        })

        it('does not submit all the controls when you press enter (only the one you are focused on)', async done => {
            const controlNotToBeSubmitted = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}`)
            await fillInElement(controlNotToBeSubmitted, VALID_TEST_MODIFICATION)

            await testGlobals.page.select(`select#${PATTERN_SPEC_OPTIONED_PROPERTY_TWO_KEY}`, TEST_PATTERN_SPEC_OPTIONED_PROPERTY_TWO_MODIFIED_VALUE)

            await testGlobals.page.select(`select#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}`, TEST_PATTERN_SPEC_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)
            await submitSelectByPressingEnter()

            expect(await elementInnerText(`.${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_CONTROL}#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}`))
                .toBe(`${TEST_PATTERN_SPEC_RANGED_PROPERTY_ONE_INITIAL_VALUE}`)
            expect(await elementInnerText(`.${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_CONTROL}#${PATTERN_SPEC_OPTIONED_PROPERTY_TWO_KEY}`))
                .toBe(TEST_PATTERN_SPEC_OPTIONED_PROPERTY_TWO_INITIAL_VALUE)
            expect(await elementInnerText(`.${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_CONTROL}#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}`))
                .toBe(TEST_PATTERN_SPEC_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)

            done()
        })

        it('does not submit all the controls when you press a submit button (only the one the button is for)', async done => {
            const controlNotToBeSubmitted = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}`)
            await fillInElement(controlNotToBeSubmitted, VALID_TEST_MODIFICATION)

            await testGlobals.page.select(`select#${PATTERN_SPEC_OPTIONED_PROPERTY_TWO_KEY}`, TEST_PATTERN_SPEC_OPTIONED_PROPERTY_TWO_MODIFIED_VALUE)

            await testGlobals.page.select(`select#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}`, TEST_PATTERN_SPEC_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)
            const buttonForSelect = await findElement(testGlobals.tab, `button#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}`)
            await clickElement(buttonForSelect)

            expect(await elementInnerText(`.${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_CONTROL}#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}`))
                .toBe(`${TEST_PATTERN_SPEC_RANGED_PROPERTY_ONE_INITIAL_VALUE}`)
            expect(await elementInnerText(`.${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_CONTROL}#${PATTERN_SPEC_OPTIONED_PROPERTY_TWO_KEY}`))
                .toBe(TEST_PATTERN_SPEC_OPTIONED_PROPERTY_TWO_INITIAL_VALUE)
            expect(await elementInnerText(`.${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_CONTROL}#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}`))
                .toBe(TEST_PATTERN_SPEC_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)

            done()
        })

        it('preserves earlier pattern spec changes you have made when you submit a second control', async done => {
            const previouslySubmittedControl = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}`)
            await modify(previouslySubmittedControl)

            await testGlobals.page.select(`select#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}`, TEST_PATTERN_SPEC_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)
            const buttonForPreviouslySubmittedSelect = await findElement(testGlobals.tab, `button#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}`)
            await clickElement(buttonForPreviouslySubmittedSelect)

            await testGlobals.page.select(`select#${PATTERN_SPEC_OPTIONED_PROPERTY_TWO_KEY}`, TEST_PATTERN_SPEC_OPTIONED_PROPERTY_TWO_MODIFIED_VALUE)
            const buttonForSelectUnderTest = await findElement(testGlobals.tab, `button#${PATTERN_SPEC_OPTIONED_PROPERTY_TWO_KEY}`)
            await clickElement(buttonForSelectUnderTest)

            expect(await elementInnerText(`.${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_CONTROL}#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}`))
                .toBe(`${TEST_PATTERN_SPEC_RANGED_PROPERTY_ONE_INITIAL_VALUE}${VALID_TEST_MODIFICATION}`)
            expect(await elementInnerText(`.${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_CONTROL}#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}`))
                .toBe(TEST_PATTERN_SPEC_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)
            expect(await elementInnerText(`.${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_CONTROL}#${PATTERN_SPEC_OPTIONED_PROPERTY_TWO_KEY}`))
                .toBe(TEST_PATTERN_SPEC_OPTIONED_PROPERTY_TWO_MODIFIED_VALUE)

            done()
        })
    })
})
