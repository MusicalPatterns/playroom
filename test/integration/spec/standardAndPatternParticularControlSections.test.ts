import { ElementHandle } from 'puppeteer'
import {
    elementExists,
    findElement,
    ONLY_PATTERN_PARTICULAR_SPEC_PATTERN_ID,
    ONLY_STANDARD_SPEC_PATTERN_ID,
    openSpecControlsIfNotOpen,
    SPEC_CONTROLS_PATTERN_ID,
} from '../../support'

const SECTION_HEADING: string = '#spec-controls h3'

describe('standard and pattern-particular control sections', () => {
    it('shows sub-headings when both types of controls are present', async (done: DoneFn) => {
        const testPattern: ElementHandle = await findElement(`#${SPEC_CONTROLS_PATTERN_ID}`)
        await testPattern.click()
        await openSpecControlsIfNotOpen()

        expect(await elementExists(SECTION_HEADING))
            .toBeTruthy('section headings were not shown')

        done()
    })

    it('shows no sub-heading when only standard controls are present', async (done: DoneFn) => {
        const testPattern: ElementHandle = await findElement(`#${ONLY_STANDARD_SPEC_PATTERN_ID}`)
        await testPattern.click()
        await openSpecControlsIfNotOpen()

        expect(await elementExists(SECTION_HEADING))
            .toBeFalsy('section headings were shown')

        done()
    })

    it('shows no sub-heading when only pattern-particular controls are present', async (done: DoneFn) => {
        const testPattern: ElementHandle = await findElement(`#${ONLY_PATTERN_PARTICULAR_SPEC_PATTERN_ID}`)
        await testPattern.click()
        await openSpecControlsIfNotOpen()

        expect(await elementExists(SECTION_HEADING))
            .toBeFalsy('section headings were shown')

        done()
    })
})
