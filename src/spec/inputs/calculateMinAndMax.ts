import { RangedConstraint } from '@musical-patterns/pattern'
import { apply, Maybe, negative } from '@musical-patterns/utilities'
import { DEFAULT_SPEC_BOUND, TRANSLATION_TO_EXCLUDE_MAX, TRANSLATION_TO_EXCLUDE_MIN } from './constants'

const calculateMinAndMax: (constraint: Maybe<RangedConstraint>) => { max: number, min: number } =
    (constraint: Maybe<RangedConstraint>): { max: number, min: number } => {
        const {
            excludeMax = false,
            excludeMin = false,
            max = DEFAULT_SPEC_BOUND,
            min = negative(DEFAULT_SPEC_BOUND),
        } = constraint || {}

        return {
            max: excludeMax ? apply.Translation(max, TRANSLATION_TO_EXCLUDE_MAX) : max,
            min: excludeMin ? apply.Translation(min, TRANSLATION_TO_EXCLUDE_MIN) : min,
        }
    }

export {
    calculateMinAndMax,
}
