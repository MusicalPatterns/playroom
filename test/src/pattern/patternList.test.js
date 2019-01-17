import { clickElement, fillInElement, findElement } from 'puppet-strings'
import { PatternSpecControlStates, SecretSelectorsForTest } from '../../../src/indexForTest'
import { testGlobals } from '../../setup'
import {
    elementExists,
    elementInnerText,
    elementValue,
    BAD_FORMAT_INVALID_TEST_MODIFICATION,
    loseFocus,
    modify,
    OTHER_TEST_PATTERN_SPEC_RANGED_PROPERTY_ONE_INITIAL_VALUE,
    OTHER_TEST_PATTERN_SPEC_RANGED_PROPERTY_TWO_INITIAL_VALUE,
    OTHER_TEST_PATTERN_SPEC_OPTIONED_PROPERTY_ONE_INITIAL_VALUE,
    OTHER_TEST_PATTERN_SPEC_OPTIONED_PROPERTY_TWO_INITIAL_VALUE,
    PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY,
    PATTERN_SPEC_RANGED_PROPERTY_TWO_KEY,
    PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY,
    PATTERN_SPEC_OPTIONED_PROPERTY_TWO_KEY,
    refreshWithTestPatternSelected,
    selectOtherTestPattern,
    selectTestPattern,
    submitSelectByPressingEnter,
    VALID_TEST_MODIFICATION,
    TEST_PATTERN_ID,
    TEST_PATTERN_SPEC_RANGED_PROPERTY_ONE_INITIAL_VALUE,
    TEST_PATTERN_SPEC_RANGED_PROPERTY_TWO_INITIAL_VALUE,
    TEST_PATTERN_SPEC_OPTIONED_PROPERTY_ONE_INITIAL_VALUE,
    TEST_PATTERN_SPEC_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE,
    TEST_PATTERN_SPEC_OPTIONED_PROPERTY_TWO_INITIAL_VALUE,
    TEST_PATTERN_TITLE,
} from '../../support'

describe('pattern list', () => {
    beforeEach(async done => {
        await refreshWithTestPatternSelected()
        done()
    })

    it('shows a header for the pattern after you select it', async done => {
        await findElement(testGlobals.tab, 'h1', TEST_PATTERN_TITLE)

        done()
    })

    it('the selected pattern is highlighted', async done => {
        expect(await elementExists(`#${TEST_PATTERN_ID}.selected`))
            .toBeTruthy()

        done()
    })

    describe('submitting a selection from the pattern list', () => {
        describe('when it is a different pattern than the current selection', () => {
            it('changes the pattern spec to the new pattern\'s defaults', async done => {
                expect(await elementValue(`input[type=number]#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}`))
                    .toBe(`${TEST_PATTERN_SPEC_RANGED_PROPERTY_ONE_INITIAL_VALUE}`)
                expect(await elementValue(`input[type=number]#${PATTERN_SPEC_RANGED_PROPERTY_TWO_KEY}`))
                    .toBe(`${TEST_PATTERN_SPEC_RANGED_PROPERTY_TWO_INITIAL_VALUE}`)
                expect(await elementValue(`select#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}`))
                    .toBe(`${TEST_PATTERN_SPEC_OPTIONED_PROPERTY_ONE_INITIAL_VALUE}`)
                expect(await elementValue(`select#${PATTERN_SPEC_OPTIONED_PROPERTY_TWO_KEY}`))
                    .toBe(`${TEST_PATTERN_SPEC_OPTIONED_PROPERTY_TWO_INITIAL_VALUE}`)

                await selectOtherTestPattern()

                expect(await elementValue(`input[type=number]#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}`))
                    .toBe(`${OTHER_TEST_PATTERN_SPEC_RANGED_PROPERTY_ONE_INITIAL_VALUE}`)
                expect(await elementValue(`input[type=number]#${PATTERN_SPEC_RANGED_PROPERTY_TWO_KEY}`))
                    .toBe(`${OTHER_TEST_PATTERN_SPEC_RANGED_PROPERTY_TWO_INITIAL_VALUE}`)
                expect(await elementValue(`select#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}`))
                    .toBe(`${OTHER_TEST_PATTERN_SPEC_OPTIONED_PROPERTY_ONE_INITIAL_VALUE}`)
                expect(await elementValue(`select#${PATTERN_SPEC_OPTIONED_PROPERTY_TWO_KEY}`))
                    .toBe(`${OTHER_TEST_PATTERN_SPEC_OPTIONED_PROPERTY_TWO_INITIAL_VALUE}`)

                done()
            })

            it('if there were any unsubmitted controls, they no longer appear as unsubmitted', async done => {
                const control = await findElement(testGlobals.tab, `input[type=number]#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}`)
                await fillInElement(control, VALID_TEST_MODIFICATION)
                await loseFocus()
                expect(await elementExists(`input[type=number]#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}.${PatternSpecControlStates.UNSUBMITTED}`))
                    .toBeTruthy()

                await testGlobals.page.select(`select#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}`, TEST_PATTERN_SPEC_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)
                await loseFocus(`select#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}`)
                expect(await elementExists(`select#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}.${PatternSpecControlStates.UNSUBMITTED}`))
                    .toBeTruthy()

                await selectOtherTestPattern()

                expect(await elementExists(`input[type=number]#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}.${PatternSpecControlStates.VALID_AND_SUBMITTED}`))
                    .toBeTruthy()
                expect(await elementExists(`select#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}.${PatternSpecControlStates.VALID_AND_SUBMITTED}`))
                    .toBeTruthy()

                done()
            })

            it('if there were any invalid controls, they no longer appear as invalid', async done => {
                const control = await findElement(testGlobals.tab, `input[type=number]#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}`)
                await fillInElement(control, BAD_FORMAT_INVALID_TEST_MODIFICATION)
                const button = await findElement(testGlobals.tab, `button#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}`)
                await clickElement(button)
                expect(await elementExists(`input[type=number]#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}.${PatternSpecControlStates.INVALID}`))
                    .toBeTruthy()

                await selectOtherTestPattern()

                expect(await elementExists(`input[type=number]#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}.${PatternSpecControlStates.VALID_AND_SUBMITTED}`))
                    .toBeTruthy()

                done()
            })
        })

        it('does not reset the pattern spec changes you have made if it is the pattern which is already selected', async done => {
            await modify(await findElement(testGlobals.tab, `input[type=number]#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}`))
            await testGlobals.page.select(`select#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}`, TEST_PATTERN_SPEC_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)
            await submitSelectByPressingEnter()

            await selectTestPattern()

            expect(await elementValue(`input[type=number]#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}`))
                .toBe(`${TEST_PATTERN_SPEC_RANGED_PROPERTY_ONE_INITIAL_VALUE}${VALID_TEST_MODIFICATION}`)
            expect(await elementInnerText(`.${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_CONTROL}#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}`))
                .toBe(TEST_PATTERN_SPEC_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)

            done()
        })
    })
})
