import {
    LONG_DURATION_PATTERN_ID,
    ONLY_PATTERN_PARTICULAR_SPEC_PATTERN_ID,
    ONLY_STANDARD_SPEC_PATTERN_ID,
    POST_PATTERN_ID,
    PRESETS_PATTERN_ID,
    SPEC_CONTROLS_PATTERN_ID,
    TIME_CONTROLS_PATTERN_ID,
    VALIDATION_PATTERN_ID,
} from './constants'
import { clickElement } from './generic'
import { waitLongEnoughForAnimationToComplete } from './wait'

const selectSpecControlsPattern: () => Promise<void> =
    async (): Promise<void> => {
        await clickElement(`#${SPEC_CONTROLS_PATTERN_ID}`)
        await waitLongEnoughForAnimationToComplete()
    }

const selectPostPattern: () => Promise<void> =
    async (): Promise<void> => {
        await clickElement(`#${POST_PATTERN_ID}`)
        await waitLongEnoughForAnimationToComplete()
    }

const selectLongDurationPattern: () => Promise<void> =
    async (): Promise<void> => {
        await clickElement(`#${LONG_DURATION_PATTERN_ID}`)
        await waitLongEnoughForAnimationToComplete()
    }

const selectTimeControlsPattern: () => Promise<void> =
    async (): Promise<void> => {
        await clickElement(`#${TIME_CONTROLS_PATTERN_ID}`)
        await waitLongEnoughForAnimationToComplete()
    }

const selectValidationPattern: () => Promise<void> =
    async (): Promise<void> => {
        await clickElement(`#${VALIDATION_PATTERN_ID}`)
        await waitLongEnoughForAnimationToComplete()
    }

const selectPresetsPattern: () => Promise<void> =
    async (): Promise<void> => {
        await clickElement(`#${PRESETS_PATTERN_ID}`)
        await waitLongEnoughForAnimationToComplete()
    }

const selectOnlyStandardSpecPattern: () => Promise<void> =
    async (): Promise<void> => {
        await clickElement(`#${ONLY_STANDARD_SPEC_PATTERN_ID}`)
        await waitLongEnoughForAnimationToComplete()
    }

const selectOnlyPatternParticularSpecPattern: () => Promise<void> =
    async (): Promise<void> => {
        await clickElement(`#${ONLY_PATTERN_PARTICULAR_SPEC_PATTERN_ID}`)
        await waitLongEnoughForAnimationToComplete()
    }

export {
    selectSpecControlsPattern,
    selectPostPattern,
    selectLongDurationPattern,
    selectTimeControlsPattern,
    selectValidationPattern,
    selectPresetsPattern,
    selectOnlyStandardSpecPattern,
    selectOnlyPatternParticularSpecPattern,
}
