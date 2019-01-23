import { clickElement, findElement } from 'puppet-strings'
import { testGlobals } from '../../setup'
import { POST_PATTERN_ID, SPEC_RANGED_PROPERTY_TWO_KEY } from '../../support'
import { elementExists, refreshWithTestPatternSelected } from '../../support/control'

describe('hidden inputs', () => {
    it('can hide the range input', async done => {
        await refreshWithTestPatternSelected()

        expect(await elementExists(`input[type=number]#${SPEC_RANGED_PROPERTY_TWO_KEY}`))
            .toBeTruthy()
        expect(await elementExists(`input[type=range]#${SPEC_RANGED_PROPERTY_TWO_KEY}`))
            .toBeFalsy()

        done()
    })

    it('can hide the number input', async done => {
        await refreshWithTestPatternSelected()
        const otherTestPattern = await findElement(testGlobals.tab, `#${POST_PATTERN_ID}`)
        await clickElement(otherTestPattern)

        expect(await elementExists(`input[type=number]#${SPEC_RANGED_PROPERTY_TWO_KEY}`))
            .toBeFalsy()
        expect(await elementExists(`input[type=range]#${SPEC_RANGED_PROPERTY_TWO_KEY}`))
            .toBeTruthy()

        done()
    })
})
