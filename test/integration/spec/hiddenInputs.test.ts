import {
    elementExists,
    refreshForSpecControlsTest,
    selectPostPattern,
    SPEC_ARRAYED_PROPERTY_KEY,
    SPEC_ARRAYED_PROPERTY_WITH_INITIAL_ELEMENT_VALUE_KEY,
    SPEC_RANGED_PROPERTY_TWO_KEY,
} from '../../support'

describe('hidden inputs', () => {
    beforeEach(async (done: DoneFn) => {
        await refreshForSpecControlsTest()

        done()
    })

    it('some controls hide the range input', async (done: DoneFn) => {
        expect(await elementExists(`input[type=number]#${SPEC_RANGED_PROPERTY_TWO_KEY}`))
            .toBeTruthy('number input did not exist')
        expect(await elementExists(`input[type=range]#${SPEC_RANGED_PROPERTY_TWO_KEY}`))
            .toBeFalsy('ranged input existed')

        done()
    })

    it('some controls hide the number input', async (done: DoneFn) => {
        await selectPostPattern()

        expect(await elementExists(`input[type=number]#${SPEC_RANGED_PROPERTY_TWO_KEY}`))
            .toBeFalsy('number input existed')
        expect(await elementExists(`input[type=range]#${SPEC_RANGED_PROPERTY_TWO_KEY}`))
            .toBeTruthy('ranged input did not exist')

        done()
    })

    it('also works for arrayed controls - they can hide the range input', async (done: DoneFn) => {
        expect(await elementExists(`input[type=number]#${SPEC_ARRAYED_PROPERTY_KEY}-0`))
            .toBeTruthy('number input did not exist')
        expect(await elementExists(`input[type=range]#${SPEC_ARRAYED_PROPERTY_KEY}-0`))
            .toBeFalsy('ranged input existed')

        done()
    })

    it('also works for arrayed controls - they can hide the number input', async (done: DoneFn) => {
        expect(await elementExists(`input[type=number]#${SPEC_ARRAYED_PROPERTY_WITH_INITIAL_ELEMENT_VALUE_KEY}-0`))
            .toBeFalsy('number input existed')
        expect(await elementExists(`input[type=range]#${SPEC_ARRAYED_PROPERTY_WITH_INITIAL_ELEMENT_VALUE_KEY}-0`))
            .toBeTruthy('ranged input did not exist')

        done()
    })
})
