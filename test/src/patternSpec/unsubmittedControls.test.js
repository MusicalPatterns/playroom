import { clickElement, fillInElement, findElement } from 'puppet-strings'
import { PatternSpecControlStates } from '../../../src/indexForTest'
import { testGlobals } from '../../setup'
import {
    elementExists,
    loseFocus,
    PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY,
    PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY,
    press,
    refreshWithTestPatternSelected,
    TEST_MODIFICATION,
    TEST_PATTERN_SPEC_OPTIONED_PROPERTY_ONE_INITIAL_VALUE,
    TEST_PATTERN_SPEC_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE,
} from '../../support'

describe('unsubmitted controls', () => {
    beforeEach(async done => {
        await refreshWithTestPatternSelected()
        done()
    })

    describe('ranged controls', () => {
        it('marks as unsubmitted when you alter their contents but then leave focus without submitting', async done => {
            const control = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}`)
            await fillInElement(control, TEST_MODIFICATION)

            await loseFocus()

            expect(await elementExists(`input#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}.${PatternSpecControlStates.UNSUBMITTED}`))
                .toBeTruthy()

            done()
        })

        it('does not mark as unsubmitted if you fiddle with it but leave it the same as what you have already submitted', async done => {
            const controlOne = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}`)
            await fillInElement(controlOne, TEST_MODIFICATION)
            await clickElement(controlOne)
            await press('Backspace')

            await loseFocus()

            expect(await elementExists(`input#${PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY}.${PatternSpecControlStates.VALID_AND_SUBMITTED}`))
                .toBeTruthy()

            done()
        })
    })

    describe('optioned controls', () => {
        it('marks as unsubmitted when you alter their contents but then leave focus without submitting', async done => {
            await testGlobals.page.select(`select#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}`, TEST_PATTERN_SPEC_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)

            await loseFocus(`select#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}`)

            expect(await elementExists(`select#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}.${PatternSpecControlStates.UNSUBMITTED}`))
                .toBeTruthy()

            done()
        })

        it('does not mark as unsubmitted if you fiddle with it but leave it the same as what you have already submitted', async done => {
            await testGlobals.page.select(`select#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}`, TEST_PATTERN_SPEC_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)
            await testGlobals.page.select(`select#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}`, TEST_PATTERN_SPEC_OPTIONED_PROPERTY_ONE_INITIAL_VALUE)

            await loseFocus(`select#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}`)

            expect(await elementExists(`select#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}.${PatternSpecControlStates.VALID_AND_SUBMITTED}`))
                .toBeTruthy()

            done()
        })
    })
})
