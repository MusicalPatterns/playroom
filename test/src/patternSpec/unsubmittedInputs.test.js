import { clickElement, fillInElement, findElement } from 'puppet-strings'
import { testGlobals } from '../../setup'
import {
    PATTERN_SPEC_PROPERTY_ONE_KEY,
    PATTERN_SPEC_PROPERTY_TWO_KEY,
    press,
    reset,
    selectTestPattern,
    TEST_MODIFICATION,
} from '../../support'

const loseFocus = async () => {
    const inputTwo = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_PROPERTY_TWO_KEY}`)
    await clickElement(inputTwo)
}

describe('unsubmitted inputs', () => {
    beforeAll(async done => {
        await selectTestPattern()
        done()
    })

    beforeEach(async done => {
        await reset()
        done()
    })

    it('marks pattern spec inputs as unsubmitted when you alter their contents but then leave focus without submitting', async done => {
        const input = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_PROPERTY_ONE_KEY}`)
        await fillInElement(input, TEST_MODIFICATION)

        await loseFocus()

        await findElement(testGlobals.tab, `input#${PATTERN_SPEC_PROPERTY_ONE_KEY}.unsubmitted`)

        done()
    })

    it('does not mark a pattern spec input as unsubmitted if you fiddle with it but leave it the same as what you have already submitted', async done => {
        const inputOne = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_PROPERTY_ONE_KEY}`)
        await fillInElement(inputOne, TEST_MODIFICATION)
        await clickElement(inputOne)
        await press('Backspace')

        await loseFocus()

        await findElement(testGlobals.tab, `input#${PATTERN_SPEC_PROPERTY_ONE_KEY}.submitted`)

        done()
    })
})
