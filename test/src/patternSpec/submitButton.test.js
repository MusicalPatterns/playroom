import { clickElement, fillInElement, findElement } from 'puppet-strings'
import { testGlobals } from '../../setup'
import {
    elementExists,
    PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY,
    PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY,
    press,
    refreshWithTestPatternSelected,
    submitSelectByPressingEnter,
    TEST_MODIFICATION,
    TEST_PATTERN_SPEC_OPTIONED_PROPERTY_ONE_INITIAL_VALUE,
    TEST_PATTERN_SPEC_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE,
} from '../../support'

describe('submit button', () => {
    beforeEach(async done => {
        await refreshWithTestPatternSelected()
        done()
    })

    it('enables the submit button for a pattern spec input after you type anything', async done => {
        expect(await elementExists(`button#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}:disabled`))
            .toBeTruthy()

        const input = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}`)
        await fillInElement(input, TEST_MODIFICATION)

        expect(await elementExists(`button#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}:enabled`))
            .toBeTruthy()

        done()
    })

    it('resets the submit button to disabled when you click it', async done => {
        expect(await elementExists(`button#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}:disabled`))
            .toBeTruthy()

        const input = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}`)
        await fillInElement(input, TEST_MODIFICATION)

        expect(await elementExists(`button#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}:enabled`))
            .toBeTruthy()

        const button = await findElement(testGlobals.tab, `button#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}`)
        await clickElement(button)

        expect(await elementExists(`button#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}:disabled`))
            .toBeTruthy()

        done()
    })

    it('resets the submit button to disabled when you submit its pattern spec input via the keyboard', async done => {
        expect(await elementExists(`button#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}:disabled`))
            .toBeTruthy()

        const input = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}`)
        await fillInElement(input, TEST_MODIFICATION)

        expect(await elementExists(`button#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}:enabled`))
            .toBeTruthy()

        await clickElement(input)
        await press('Enter')

        expect(await elementExists(`button#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}:disabled`))
            .toBeTruthy()

        done()
    })

    it('resets the submit button to disabled when you return its pattern spec input back to what you have already submitted', async done => {
        expect(await elementExists(`button#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}:disabled`))
            .toBeTruthy()

        const input = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}`)
        await fillInElement(input, TEST_MODIFICATION)

        expect(await elementExists(`button#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}:enabled`))
            .toBeTruthy()

        await clickElement(input)
        await press('Backspace')

        expect(await elementExists(`button#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}:disabled`))
            .toBeTruthy()

        done()
    })

    describe('the same is true of optioned controls', () => {
        it('enables the submit button for a pattern spec input after you change it', async done => {
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

        it('resets the submit button to disabled when you submit its pattern spec input via the keyboard', async done => {
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

        it('resets the submit button to disabled when you return its pattern spec input back to what you have already submitted', async done => {
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
