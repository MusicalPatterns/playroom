import { RangedConstraint } from '@musical-patterns/pattern'
import { apply, Maybe, negative } from '@musical-patterns/utilities'
import { DEFAULT_BOUND, NON_INTEGER_STEP, TRANSLATION_TO_EXCLUDE_MAX, TRANSLATION_TO_EXCLUDE_MIN } from './constants'

const computeMinAndMax: (constraint: Maybe<RangedConstraint>) => { max: number, min: number } =
    (constraint: Maybe<RangedConstraint>): { max: number, min: number } => {
        const {
            excludeMax = false,
            excludeMin = false,
            max = DEFAULT_BOUND,
            min = negative(DEFAULT_BOUND),
        } = constraint || {}

        return {
            max: excludeMax ? apply.Translation(max, TRANSLATION_TO_EXCLUDE_MAX) : max,
            min: excludeMin ? apply.Translation(min, TRANSLATION_TO_EXCLUDE_MIN) : min,
        }
    }

const computeStep: (constraint: Maybe<RangedConstraint>) => number =
    (constraint: Maybe<RangedConstraint>): number => {
        let result = constraint && constraint.integer ? 1 : NON_INTEGER_STEP

        console.log('ok got constraint', constraint, 'so we are going with', result)
        return result
    }

export {
    computeMinAndMax,
    computeStep,
}
