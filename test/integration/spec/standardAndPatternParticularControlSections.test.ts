import {
    elementExists,
    openSpecControlsIfNotOpen,
    selectOnlyPatternParticularSpecPattern,
    selectOnlyStandardSpecPattern,
    selectSpecControlsPattern,
} from '../../support'

const SECTION_HEADING: string = '#spec-controls h3'

describe('standard and pattern-particular control sections', () => {
    it('shows sub-headings when both types of controls are present', async (done: DoneFn) => {
        await selectSpecControlsPattern()
        await openSpecControlsIfNotOpen()

        expect(await elementExists(SECTION_HEADING))
            .toBeTruthy('section headings were not shown')

        done()
    })

    it('shows no sub-heading when only standard controls are present', async (done: DoneFn) => {
        await selectOnlyStandardSpecPattern()
        await openSpecControlsIfNotOpen()

        expect(await elementExists(SECTION_HEADING))
            .toBeFalsy('section headings were shown')

        done()
    })

    it('shows no sub-heading when only pattern-particular controls are present', async (done: DoneFn) => {
        await selectOnlyPatternParticularSpecPattern()
        await openSpecControlsIfNotOpen()

        expect(await elementExists(SECTION_HEADING))
            .toBeFalsy('section headings were shown')

        done()
    })
})
