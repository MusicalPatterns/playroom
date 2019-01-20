import { clickElement, fillInElement, findElement } from 'puppet-strings'
import { SecretSelectorsForTest } from '../../../src/indexForTest'
import { testGlobals } from '../../setup'
import {
    elementInnerText,
    modify,
    SPEC_RANGED_PROPERTY_ONE_KEY,
    SPEC_RANGED_PROPERTY_TWO_KEY,
    SPEC_OPTIONED_PROPERTY_ONE_KEY,
    SPEC_OPTIONED_PROPERTY_TWO_KEY,
    refreshWithTestPatternSelected,
    submitSelectByPressingEnter,
    VALID_TEST_MODIFICATION,
    SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_TWO_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE,
    SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_TWO_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_TWO_MODIFIED_VALUE,
    SPEC_TOGGLED_PROPERTY_KEY,
    SPEC_CONTROLS_PATTERN_TOGGLED_PROPERTY_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_TOGGLED_PROPERTY_MODIFIED_VALUE,
} from '../../support'

describe('submitting spec changes', () => {
    beforeEach(async done => {
        await refreshWithTestPatternSelected()
        done()
    })

    describe('ranged controls', () => {
        it('does not immediately submit when you type into a control', async done => {
            const control = await findElement(testGlobals.tab, `input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`)
            await fillInElement(control, VALID_TEST_MODIFICATION)

            expect(await elementInnerText(`#${SPEC_RANGED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(`${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE}`)

            done()
        })

        it('submits a control when you press enter', async done => {
            const control = await findElement(testGlobals.tab, `input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`)
            await modify(control)

            expect(await elementInnerText(`#${SPEC_RANGED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(`${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE}${VALID_TEST_MODIFICATION}`)

            done()
        })

        it('submits a control when you press the submit button', async done => {
            const control = await findElement(testGlobals.tab, `input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`)
            await fillInElement(control, VALID_TEST_MODIFICATION)
            const button = await findElement(testGlobals.tab, `button#${SPEC_RANGED_PROPERTY_ONE_KEY}`)
            await clickElement(button)

            expect(await elementInnerText(`#${SPEC_RANGED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(`${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE}${VALID_TEST_MODIFICATION}`)

            done()
        })

        it('does not submit all the controls when you press enter (only the one you are focused on)', async done => {
            const controlNotToBeSubmitted = await findElement(testGlobals.tab, `input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`)
            await fillInElement(controlNotToBeSubmitted, VALID_TEST_MODIFICATION)

            await testGlobals.page.select(`select#${SPEC_OPTIONED_PROPERTY_ONE_KEY}`, SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)

            const controlToSubmit = await findElement(testGlobals.tab, `input[type=number]#${SPEC_RANGED_PROPERTY_TWO_KEY}`)
            await modify(controlToSubmit)

            expect(await elementInnerText(`#${SPEC_RANGED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(`${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE}`)
            expect(await elementInnerText(`#${SPEC_OPTIONED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_INITIAL_VALUE)
            expect([
                // due to some race condition in Puppeteer, some commits it's one way, some another...
                `${VALID_TEST_MODIFICATION}${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_TWO_INITIAL_VALUE}`,
                `${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_TWO_INITIAL_VALUE}${VALID_TEST_MODIFICATION}`,
            ]).toContain(await elementInnerText(`#${SPEC_RANGED_PROPERTY_TWO_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))

            done()
        })

        it('does not submit all the controls when you press a submit button (only the one the button is for)', async done => {
            const controlNotToBeSubmitted = await findElement(testGlobals.tab, `input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`)
            await fillInElement(controlNotToBeSubmitted, VALID_TEST_MODIFICATION)

            await testGlobals.page.select(`select#${SPEC_OPTIONED_PROPERTY_ONE_KEY}`, SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)

            const controlToSubmit = await findElement(testGlobals.tab, `input[type=number]#${SPEC_RANGED_PROPERTY_TWO_KEY}`)
            await fillInElement(controlToSubmit, VALID_TEST_MODIFICATION)
            const button = await findElement(testGlobals.tab, `button#${SPEC_RANGED_PROPERTY_TWO_KEY}`)
            await clickElement(button)

            expect(await elementInnerText(`#${SPEC_RANGED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(`${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE}`)
            expect(await elementInnerText(`#${SPEC_OPTIONED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_INITIAL_VALUE)
            expect(await elementInnerText(`#${SPEC_RANGED_PROPERTY_TWO_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(`${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_TWO_INITIAL_VALUE}${VALID_TEST_MODIFICATION}`)

            done()
        })

        it('preserves earlier spec changes you have made when you submit a second control', async done => {
            const previouslySubmittedControl = await findElement(testGlobals.tab, `input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`)
            await modify(previouslySubmittedControl)

            await testGlobals.page.select(`select#${SPEC_OPTIONED_PROPERTY_ONE_KEY}`, SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)
            await submitSelectByPressingEnter()

            const controlUnderTest = await findElement(testGlobals.tab, `input[type=number]#${SPEC_RANGED_PROPERTY_TWO_KEY}`)
            await modify(controlUnderTest)

            expect(await elementInnerText(`#${SPEC_RANGED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(`${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE}${VALID_TEST_MODIFICATION}`)
            expect(await elementInnerText(`#${SPEC_OPTIONED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)
            expect(await elementInnerText(`#${SPEC_RANGED_PROPERTY_TWO_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(`${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_TWO_INITIAL_VALUE}${VALID_TEST_MODIFICATION}`)

            done()
        })

        it('keeps the controls in the same order after submitting a change', async done => {
            let controlIds = await testGlobals.page.evaluate(() =>
                Array.from(document.querySelectorAll('#pattern-spec-controls input[type=number]')).map(element => element.id),
            )
            expect(controlIds)
                .toEqual([ SPEC_RANGED_PROPERTY_ONE_KEY, SPEC_RANGED_PROPERTY_TWO_KEY ])

            const control = await findElement(testGlobals.tab, `input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`)
            await fillInElement(control, VALID_TEST_MODIFICATION)

            controlIds = await testGlobals.page.evaluate(() =>
                Array.from(document.querySelectorAll('#pattern-spec-controls input[type=number]')).map(element => element.id),
            )
            expect(controlIds)
                .toEqual([ SPEC_RANGED_PROPERTY_ONE_KEY, SPEC_RANGED_PROPERTY_TWO_KEY ])

            done()
        })
    })

    describe('optioned controls', () => {
        it('does not immediately submit when you choose a new value from a control', async done => {
            await testGlobals.page.select(`select#${SPEC_OPTIONED_PROPERTY_ONE_KEY}`, SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)

            expect(await elementInnerText(`#${SPEC_OPTIONED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_INITIAL_VALUE)

            done()
        })

        it('submits a control when you press enter', async done => {
            await testGlobals.page.select(`select#${SPEC_OPTIONED_PROPERTY_ONE_KEY}`, SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)
            await submitSelectByPressingEnter()

            expect(await elementInnerText(`#${SPEC_OPTIONED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)

            done()
        })

        it('submits a control when you press the submit button', async done => {
            await testGlobals.page.select(`select#${SPEC_OPTIONED_PROPERTY_ONE_KEY}`, SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)
            const buttonForSelect = await findElement(testGlobals.tab, `button#${SPEC_OPTIONED_PROPERTY_ONE_KEY}`)
            await clickElement(buttonForSelect)

            expect(await elementInnerText(`#${SPEC_OPTIONED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)

            done()
        })

        it('does not submit all the controls when you press enter (only the one you are focused on)', async done => {
            const controlNotToBeSubmitted = await findElement(testGlobals.tab, `input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`)
            await fillInElement(controlNotToBeSubmitted, VALID_TEST_MODIFICATION)

            await testGlobals.page.select(`select#${SPEC_OPTIONED_PROPERTY_TWO_KEY}`, SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_TWO_MODIFIED_VALUE)

            await testGlobals.page.select(`select#${SPEC_OPTIONED_PROPERTY_ONE_KEY}`, SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)
            await submitSelectByPressingEnter()

            expect(await elementInnerText(`#${SPEC_RANGED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(`${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE}`)
            expect(await elementInnerText(`#${SPEC_OPTIONED_PROPERTY_TWO_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_TWO_INITIAL_VALUE)
            expect(await elementInnerText(`#${SPEC_OPTIONED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)

            done()
        })

        it('does not submit all the controls when you press a submit button (only the one the button is for)', async done => {
            const controlNotToBeSubmitted = await findElement(testGlobals.tab, `input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`)
            await fillInElement(controlNotToBeSubmitted, VALID_TEST_MODIFICATION)

            await testGlobals.page.select(`select#${SPEC_OPTIONED_PROPERTY_TWO_KEY}`, SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_TWO_MODIFIED_VALUE)

            await testGlobals.page.select(`select#${SPEC_OPTIONED_PROPERTY_ONE_KEY}`, SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)
            const buttonForSelect = await findElement(testGlobals.tab, `button#${SPEC_OPTIONED_PROPERTY_ONE_KEY}`)
            await clickElement(buttonForSelect)

            expect(await elementInnerText(`#${SPEC_RANGED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(`${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE}`)
            expect(await elementInnerText(`#${SPEC_OPTIONED_PROPERTY_TWO_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_TWO_INITIAL_VALUE)
            expect(await elementInnerText(`#${SPEC_OPTIONED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)

            done()
        })

        it('preserves earlier spec changes you have made when you submit a second control', async done => {
            const previouslySubmittedControl = await findElement(testGlobals.tab, `input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`)
            await modify(previouslySubmittedControl)

            await testGlobals.page.select(`select#${SPEC_OPTIONED_PROPERTY_ONE_KEY}`, SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)
            const buttonForPreviouslySubmittedSelect = await findElement(testGlobals.tab, `button#${SPEC_OPTIONED_PROPERTY_ONE_KEY}`)
            await clickElement(buttonForPreviouslySubmittedSelect)

            await testGlobals.page.select(`select#${SPEC_OPTIONED_PROPERTY_TWO_KEY}`, SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_TWO_MODIFIED_VALUE)
            const buttonForSelectUnderTest = await findElement(testGlobals.tab, `button#${SPEC_OPTIONED_PROPERTY_TWO_KEY}`)
            await clickElement(buttonForSelectUnderTest)

            expect(await elementInnerText(`#${SPEC_RANGED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(`${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE}${VALID_TEST_MODIFICATION}`)
            expect(await elementInnerText(`#${SPEC_OPTIONED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)
            expect(await elementInnerText(`#${SPEC_OPTIONED_PROPERTY_TWO_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_TWO_MODIFIED_VALUE)

            done()
        })
    })

    describe('toggled controls', () => {
        it('does not immediately submit when you choose a new value from a control', async done => {
            const checkbox = await findElement(testGlobals.tab, `input#${SPEC_TOGGLED_PROPERTY_KEY}`)
            await clickElement(checkbox)

            expect(await elementInnerText(`#${SPEC_TOGGLED_PROPERTY_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(JSON.stringify(SPEC_CONTROLS_PATTERN_TOGGLED_PROPERTY_INITIAL_VALUE))

            done()
        })

        it('submits a control when you press enter', async done => {
            const checkbox = await findElement(testGlobals.tab, `input#${SPEC_TOGGLED_PROPERTY_KEY}`)
            await clickElement(checkbox)
            const buttonForCheckbox = await findElement(testGlobals.tab, `button#${SPEC_TOGGLED_PROPERTY_KEY}`)
            await clickElement(buttonForCheckbox)

            expect(await elementInnerText(`#${SPEC_TOGGLED_PROPERTY_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(JSON.stringify(SPEC_CONTROLS_PATTERN_TOGGLED_PROPERTY_MODIFIED_VALUE))

            done()
        })
    })
})
