import { ElementHandle } from 'puppeteer'
import {
    elementExists,
    findElement,
    ONLY_PATTERN_PARTICULAR_SPEC_PATTERN_ID,
    ONLY_STANDARD_SPEC_PATTERN_ID,
    SPEC_CONTROLS_PATTERN_ID,
} from '../../support'

describe('standard and pattern-particular control sections', () => {
    it('shows sub-headings when both types of controls are present', async (done: DoneFn) => {
        const testPattern: ElementHandle = await findElement(`#${SPEC_CONTROLS_PATTERN_ID}`)
        await testPattern.click()

        expect(await elementExists('.spec-control-section-heading'))
            .toBeTruthy()

        done()
    })

    it('shows no sub-heading when only standard controls are present', async (done: DoneFn) => {
        const testPattern: ElementHandle = await findElement(`#${ONLY_STANDARD_SPEC_PATTERN_ID}`)
        await testPattern.click()

        expect(await elementExists('.spec-control-section-heading'))
            .toBeFalsy()

        done()
    })

    it('shows no sub-heading when only pattern-particular controls are present', async (done: DoneFn) => {
        const testPattern: ElementHandle = await findElement(`#${ONLY_PATTERN_PARTICULAR_SPEC_PATTERN_ID}`)
        await testPattern.click()

        expect(await elementExists('.spec-control-section-heading'))
            .toBeFalsy()

        done()
    })
})
