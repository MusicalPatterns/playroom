import {
    ARRAYED_SPEC_KEY,
    ARRAYED_SPEC_WITH_INITIAL_FIELD_VALUE_KEY,
    elementExists,
    RANGED_SPEC_TWO_KEY,
    refreshForSpecControlsTest,
    selectPostPattern,
} from '../../../../support'

describe('inputs', () => {
    beforeEach(async (done: DoneFn) => {
        await refreshForSpecControlsTest()

        done()
    })

    it('some ranged fields hide the range input', async (done: DoneFn) => {
        expect(await elementExists(`input[type=number]#${RANGED_SPEC_TWO_KEY}`))
            .toBeTruthy('number input did not exist')
        expect(await elementExists(`input[type=range]#${RANGED_SPEC_TWO_KEY}`))
            .toBeFalsy('ranged input existed')

        done()
    })

    it('some ranged fields hide the number input', async (done: DoneFn) => {
        await selectPostPattern()

        expect(await elementExists(`input[type=number]#${RANGED_SPEC_TWO_KEY}`))
            .toBeFalsy('number input existed')
        expect(await elementExists(`input[type=range]#${RANGED_SPEC_TWO_KEY}`))
            .toBeTruthy('ranged input did not exist')

        done()
    })

    it('also works for arrayed spec controls - their fields can hide the range input', async (done: DoneFn) => {
        expect(await elementExists(`input[type=number]#${ARRAYED_SPEC_KEY}-0`))
            .toBeTruthy('number input did not exist')
        expect(await elementExists(`input[type=range]#${ARRAYED_SPEC_KEY}-0`))
            .toBeFalsy('ranged input existed')

        done()
    })

    it('also works for arrayed spec controls - their fields can hide the number input', async (done: DoneFn) => {
        expect(await elementExists(`input[type=number]#${ARRAYED_SPEC_WITH_INITIAL_FIELD_VALUE_KEY}-0`))
            .toBeFalsy('number input existed')
        expect(await elementExists(`input[type=range]#${ARRAYED_SPEC_WITH_INITIAL_FIELD_VALUE_KEY}-0`))
            .toBeTruthy('ranged input did not exist')

        done()
    })
})
