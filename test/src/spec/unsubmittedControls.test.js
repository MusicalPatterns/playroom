import { clickElement, fillInElement, findElement } from 'puppet-strings'
import { SpecControlStates } from '../../../src/indexForTest'
import { testGlobals } from '../../setup'
import {
    elementExists,
    loseFocus,
    SPEC_RANGED_PROPERTY_ONE_KEY,
    SPEC_OPTIONED_PROPERTY_ONE_KEY,
    press,
    refreshWithTestPatternSelected,
    VALID_TEST_MODIFICATION,
    SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE,
} from '../../support'

describe('unsubmitted controls', () => {
    beforeEach(async done => {
        await refreshWithTestPatternSelected()
        done()
    })

    describe('ranged controls', () => {
        it('marks as unsubmitted when you alter their contents but then leave focus without submitting', async done => {
            const control = await findElement(testGlobals.tab, `input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`)
            await fillInElement(control, VALID_TEST_MODIFICATION)

            await loseFocus()

            expect(await elementExists(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}.${SpecControlStates.UNSUBMITTED}`))
                .toBeTruthy()

            done()
        })

        it('does not mark as unsubmitted if you fiddle with it but leave it the same as what you have already submitted', async done => {
            const controlOne = await findElement(testGlobals.tab, `input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`)
            await fillInElement(controlOne, VALID_TEST_MODIFICATION)
            await clickElement(controlOne)
            await press('Backspace')

            await loseFocus()

            expect(await elementExists(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}.${SpecControlStates.VALID_AND_SUBMITTED}`))
                .toBeTruthy()

            done()
        })
    })

    describe('optioned controls', () => {
        it('marks as unsubmitted when you alter their contents but then leave focus without submitting', async done => {
            await testGlobals.page.select(`select#${SPEC_OPTIONED_PROPERTY_ONE_KEY}`, SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)

            await loseFocus(`select#${SPEC_OPTIONED_PROPERTY_ONE_KEY}`)

            expect(await elementExists(`select#${SPEC_OPTIONED_PROPERTY_ONE_KEY}.${SpecControlStates.UNSUBMITTED}`))
                .toBeTruthy()

            done()
        })

        it('does not mark as unsubmitted if you fiddle with it but leave it the same as what you have already submitted', async done => {
            await testGlobals.page.select(`select#${SPEC_OPTIONED_PROPERTY_ONE_KEY}`, SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)
            await testGlobals.page.select(`select#${SPEC_OPTIONED_PROPERTY_ONE_KEY}`, SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_INITIAL_VALUE)

            await loseFocus(`select#${SPEC_OPTIONED_PROPERTY_ONE_KEY}`)

            expect(await elementExists(`select#${SPEC_OPTIONED_PROPERTY_ONE_KEY}.${SpecControlStates.VALID_AND_SUBMITTED}`))
                .toBeTruthy()

            done()
        })
    })

    xdescribe('toggled controls', () => {
        it('i am not actually going to do this because i am pretty sure i am going to get rid of this feature soon', () => {

        })
    })
})
