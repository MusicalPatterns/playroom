import { ElementHandle } from 'puppeteer'
import {
    elementExists,
    findElement,
    POST_PATTERN_ID,
    refreshWithTestPatternSelected,
    SPEC_RANGED_PROPERTY_TWO_KEY,
} from '../../support'

describe('hidden inputs', () => {
    it('some controls hide the range input', async (done: DoneFn) => {
        await refreshWithTestPatternSelected()

        expect(await elementExists(`input[type=number]#${SPEC_RANGED_PROPERTY_TWO_KEY}`))
            .toBeTruthy()
        expect(await elementExists(`input[type=range]#${SPEC_RANGED_PROPERTY_TWO_KEY}`))
            .toBeFalsy()

        done()
    })

    it('some controls hide the number input', async (done: DoneFn) => {
        await refreshWithTestPatternSelected()
        const otherTestPattern: ElementHandle = await findElement(`#${POST_PATTERN_ID}`)
        await otherTestPattern.click()

        expect(await elementExists(`input[type=number]#${SPEC_RANGED_PROPERTY_TWO_KEY}`))
            .toBeFalsy()
        expect(await elementExists(`input[type=range]#${SPEC_RANGED_PROPERTY_TWO_KEY}`))
            .toBeTruthy()

        done()
    })
})
