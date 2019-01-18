import { clickElement, findElement } from 'puppet-strings'
import { testGlobals } from '../../setup'
import {
    elementExists,
    ONLY_PATTERN_SPECIFIC_SPEC_PATTERN_ID,
    ONLY_STANDARD_SPEC_PATTERN_ID,
    SPEC_CONTROLS_PATTERN_ID,
} from '../../support'

describe('standard and pattern-specific control sections', () => {
    it('shows sub-headings when both types of controls are present', async done => {
        const testPattern = await findElement(testGlobals.tab, `#${SPEC_CONTROLS_PATTERN_ID}`)
        await clickElement(testPattern)

        expect(await elementExists('.pattern-spec-control-section-heading'))
            .toBeTruthy()

        done()
    })

    it('shows no sub-heading when only standard controls are present', async done => {
        const testPattern = await findElement(testGlobals.tab, `#${ONLY_STANDARD_SPEC_PATTERN_ID}`)
        await clickElement(testPattern)

        expect(await elementExists('.pattern-spec-control-section-heading'))
            .toBeFalsy()

        done()
    })

    it('shows no sub-heading when only pattern-specific controls are present', async done => {
        const testPattern = await findElement(testGlobals.tab, `#${ONLY_PATTERN_SPECIFIC_SPEC_PATTERN_ID}`)
        await clickElement(testPattern)

        expect(await elementExists('.pattern-spec-control-section-heading'))
            .toBeFalsy()

        done()
    })
})
