import { RangedConstraint } from '@musical-patterns/pattern'
import { apply, isUndefined, Maybe, negative, round, Translation } from '@musical-patterns/utilities'
import { DEFAULT_BOUND, NON_INTEGER_STEP, TRANSLATION_TO_EXCLUDE_MAX, TRANSLATION_TO_EXCLUDE_MIN } from './constants'

const computeAdjustedMinOrMax:
    (minOrMax: number, exclude: boolean, translation: Translation, integer: boolean) => number =
    (minOrMax: number, exclude: boolean, translation: Translation, integer: boolean): number => {
        const maybeExcludedMinOrMax: number = exclude ?
            apply.Translation(minOrMax, TRANSLATION_TO_EXCLUDE_MAX) :
            minOrMax

        return integer ?
            round(maybeExcludedMinOrMax) :
            maybeExcludedMinOrMax
    }

const computeMinAndMax: (constraint: Maybe<RangedConstraint>) => { max: number, min: number } =
    (constraint: Maybe<RangedConstraint>): { max: number, min: number } => {
        const {
            excludeMax = false,
            excludeMin = false,
            integer = false,
            max = DEFAULT_BOUND,
            min = negative(DEFAULT_BOUND),
        } = constraint || {}

        return {
            max: computeAdjustedMinOrMax(max, excludeMax, TRANSLATION_TO_EXCLUDE_MAX, integer),
            min: computeAdjustedMinOrMax(min, excludeMin, TRANSLATION_TO_EXCLUDE_MIN, integer),
        }
    }

const computeStep: (constraint: Maybe<RangedConstraint>) => number =
    (constraint: Maybe<RangedConstraint>): number => {
        if (isUndefined(constraint)) {
            return NON_INTEGER_STEP
        }
        const maybeIntegerConstraint: Maybe<boolean> = constraint.integer
        const isInteger: boolean = isUndefined(maybeIntegerConstraint) ? false : maybeIntegerConstraint

        return isInteger ? 1 : NON_INTEGER_STEP
    }

export {
    computeMinAndMax,
    computeStep,
}
