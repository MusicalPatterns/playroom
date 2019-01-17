import { clickElement, fillInElement, findElement } from 'puppet-strings'
import { testGlobals } from '../../setup'
import {
    elementExists,
    PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY,
    PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY,
    press,
    refreshWithTestPatternSelected,
    submitSelectByPressingEnter,
    VALID_TEST_MODIFICATION,
    TEST_PATTERN_SPEC_OPTIONED_PROPERTY_ONE_INITIAL_VALUE,
    TEST_PATTERN_SPEC_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE,
} from '../../support'

describe('submit button', () => {
    beforeEach(async done => {
        await refreshWithTestPatternSelected()
        done()
    })

    describe('ranged controls', () => {
        it('enables the submit button for a control after you type anything', async done => {
            expect(await elementExists(`button#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}:disabled`))
                .toBeTruthy()

            const control = await findElement(testGlobals.tab, `input[type=number]#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}`)
            await fillInElement(control, VALID_TEST_MODIFICATION)

            expect(await elementExists(`button#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}:enabled`))
                .toBeTruthy()

            done()
        })

        it('resets the submit button to disabled when you click it', async done => {
            expect(await elementExists(`button#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}:disabled`))
                .toBeTruthy()

            const control = await findElement(testGlobals.tab, `input[type=number]#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}`)
            await fillInElement(control, VALID_TEST_MODIFICATION)

            expect(await elementExists(`button#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}:enabled`))
                .toBeTruthy()

            const button = await findElement(testGlobals.tab, `button#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}`)
            await clickElement(button)

            expect(await elementExists(`button#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}:disabled`))
                .toBeTruthy()

            done()
        })

        it('resets the submit button to disabled when you submit its control via the keyboard', async done => {
            expect(await elementExists(`button#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}:disabled`))
                .toBeTruthy()

            const control = await findElement(testGlobals.tab, `input[type=number]#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}`)
            await fillInElement(control, VALID_TEST_MODIFICATION)

            expect(await elementExists(`button#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}:enabled`))
                .toBeTruthy()

            await clickElement(control)
            await press('Enter')

            expect(await elementExists(`button#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}:disabled`))
                .toBeTruthy()

            done()
        })

        it('resets the submit button to disabled when you return its control back to what you have already submitted', async done => {
            expect(await elementExists(`button#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}:disabled`))
                .toBeTruthy()

            const control = await findElement(testGlobals.tab, `input[type=number]#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}`)
            await fillInElement(control, VALID_TEST_MODIFICATION)

            expect(await elementExists(`button#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}:enabled`))
                .toBeTruthy()

            await clickElement(control)
            await press('Backspace')

            expect(await elementExists(`button#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}:disabled`))
                .toBeTruthy()

            done()
        })
    })

    describe('optioned controls', () => {
        it('enables the submit button for a control after you change it', async done => {
            expect(await elementExists(`button#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}:disabled`))
                .toBeTruthy()

            await testGlobals.page.select(`select#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}`, TEST_PATTERN_SPEC_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)

            expect(await elementExists(`button#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}:enabled`))
                .toBeTruthy()

            done()
        })

        it('resets the submit button to disabled when you click it', async done => {
            expect(await elementExists(`button#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}:disabled`))
                .toBeTruthy()

            await testGlobals.page.select(`select#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}`, TEST_PATTERN_SPEC_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)

            expect(await elementExists(`button#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}:enabled`))
                .toBeTruthy()

            const button = await findElement(testGlobals.tab, `button#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}`)
            await clickElement(button)

            expect(await elementExists(`button#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}:disabled`))
                .toBeTruthy()

            done()
        })

        it('resets the submit button to disabled when you submit its control via the keyboard', async done => {
            expect(await elementExists(`button#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}:disabled`))
                .toBeTruthy()

            await testGlobals.page.select(`select#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}`, TEST_PATTERN_SPEC_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)

            expect(await elementExists(`button#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}:enabled`))
                .toBeTruthy()

            await submitSelectByPressingEnter()

            expect(await elementExists(`button#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}:disabled`))
                .toBeTruthy()

            done()
        })

        it('resets the submit button to disabled when you return its control back to what you have already submitted', async done => {
            expect(await elementExists(`button#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}:disabled`))
                .toBeTruthy()

            await testGlobals.page.select(`select#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}`, TEST_PATTERN_SPEC_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)

            expect(await elementExists(`button#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}:enabled`))
                .toBeTruthy()

            await testGlobals.page.select(`select#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}`, TEST_PATTERN_SPEC_OPTIONED_PROPERTY_ONE_INITIAL_VALUE)

            expect(await elementExists(`button#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}:disabled`))
                .toBeTruthy()

            done()
        })
    })
})
