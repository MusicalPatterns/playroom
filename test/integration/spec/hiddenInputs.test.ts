import { ElementHandle } from 'puppeteer'
import {
    elementExists,
    findElement,
    openSpecControlsIfNotOpen,
    POST_PATTERN_ID,
    resetSpecByTogglingToOtherPatternThenBackToTestPattern,
    SPEC_RANGED_PROPERTY_TWO_KEY,
} from '../../support'

describe('hidden inputs', () => {
    beforeEach(async (done: DoneFn) => {
        await resetSpecByTogglingToOtherPatternThenBackToTestPattern()
        await openSpecControlsIfNotOpen()
        done()
    })

    it('some controls hide the range input', async (done: DoneFn) => {
        expect(await elementExists(`input[type=number]#${SPEC_RANGED_PROPERTY_TWO_KEY}`))
            .toBeTruthy()
        expect(await elementExists(`input[type=range]#${SPEC_RANGED_PROPERTY_TWO_KEY}`))
            .toBeFalsy()

        done()
    })

    it('some controls hide the number input', async (done: DoneFn) => {
        const otherTestPattern: ElementHandle = await findElement(`#${POST_PATTERN_ID}`)
        await otherTestPattern.click()

        expect(await elementExists(`input[type=number]#${SPEC_RANGED_PROPERTY_TWO_KEY}`))
            .toBeFalsy()
        expect(await elementExists(`input[type=range]#${SPEC_RANGED_PROPERTY_TWO_KEY}`))
            .toBeTruthy()

        done()
    })
})
