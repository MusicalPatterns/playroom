import { clickElement, fillInElement, findElement } from 'puppet-strings'
import { PatternSpecInputStates } from '../../../src/indexForTest'
import { testGlobals } from '../../setup'
import {
    elementExists,
    loseFocus,
    PATTERN_SPEC_CONTINUOUS_PROPERTY_ONE_KEY,
    PATTERN_SPEC_DISCRETE_PROPERTY_ONE_KEY,
    press,
    refreshWithTestPatternSelected,
    TEST_MODIFICATION,
    TEST_PATTERN_SPEC_DISCRETE_PROPERTY_ONE_INITIAL_VALUE,
    TEST_PATTERN_SPEC_DISCRETE_PROPERTY_ONE_MODIFIED_VALUE,
} from '../../support'

describe('unsubmitted inputs', () => {
    beforeEach(async done => {
        await refreshWithTestPatternSelected()
        done()
    })

    it('marks pattern spec inputs as unsubmitted when you alter their contents but then leave focus without submitting', async done => {
        const input = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_CONTINUOUS_PROPERTY_ONE_KEY}`)
        await fillInElement(input, TEST_MODIFICATION)

        await loseFocus()

        expect(await elementExists(`input#${PATTERN_SPEC_CONTINUOUS_PROPERTY_ONE_KEY}.${PatternSpecInputStates.UNSUBMITTED}`))
            .toBeTruthy()

        done()
    })

    it('does not mark a pattern spec input as unsubmitted if you fiddle with it but leave it the same as what you have already submitted', async done => {
        const inputOne = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_CONTINUOUS_PROPERTY_ONE_KEY}`)
        await fillInElement(inputOne, TEST_MODIFICATION)
        await clickElement(inputOne)
        await press('Backspace')

        await loseFocus()

        expect(await elementExists(`input#${PATTERN_SPEC_CONTINUOUS_PROPERTY_ONE_KEY}.${PatternSpecInputStates.VALID_AND_SUBMITTED}`))
            .toBeTruthy()

        done()
    })

    describe('same works for pattern spec selects', () => {
        it('marks pattern spec inputs as unsubmitted when you alter their contents but then leave focus without submitting', async done => {
            await testGlobals.page.select(`select#${PATTERN_SPEC_DISCRETE_PROPERTY_ONE_KEY}`, TEST_PATTERN_SPEC_DISCRETE_PROPERTY_ONE_MODIFIED_VALUE)

            await loseFocus(`select#${PATTERN_SPEC_DISCRETE_PROPERTY_ONE_KEY}`)

            expect(await elementExists(`select#${PATTERN_SPEC_DISCRETE_PROPERTY_ONE_KEY}.${PatternSpecInputStates.UNSUBMITTED}`))
                .toBeTruthy()

            done()
        })

        it('does not mark a pattern spec input as unsubmitted if you fiddle with it but leave it the same as what you have already submitted', async done => {
            await testGlobals.page.select(`select#${PATTERN_SPEC_DISCRETE_PROPERTY_ONE_KEY}`, TEST_PATTERN_SPEC_DISCRETE_PROPERTY_ONE_MODIFIED_VALUE)
            await testGlobals.page.select(`select#${PATTERN_SPEC_DISCRETE_PROPERTY_ONE_KEY}`, TEST_PATTERN_SPEC_DISCRETE_PROPERTY_ONE_INITIAL_VALUE)

            await loseFocus(`select#${PATTERN_SPEC_DISCRETE_PROPERTY_ONE_KEY}`)

            expect(await elementExists(`select#${PATTERN_SPEC_DISCRETE_PROPERTY_ONE_KEY}.${PatternSpecInputStates.VALID_AND_SUBMITTED}`))
                .toBeTruthy()

            done()
        })
    })
})
