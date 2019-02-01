import { RangedConstraint } from '@musical-patterns/pattern'
import { apply, Maybe } from '@musical-patterns/utilities'
import { DEFAULT_SPEC_BOUND, OFFSET_TO_EXCLUDE_MIN_OR_MAX } from './constants'

const minAndMaxPropsFromConstraint: (constraint: Maybe<RangedConstraint>) => { max: number, min: number } =
    (constraint: Maybe<RangedConstraint>): { max: number, min: number } => {
        const {
            excludeMax = false,
            excludeMin = false,
            max = DEFAULT_SPEC_BOUND,
            min = DEFAULT_SPEC_BOUND,
        } = constraint || {}

        return {
            max: excludeMax ? apply.Offset(max, -OFFSET_TO_EXCLUDE_MIN_OR_MAX) : max,
            min: excludeMin ? apply.Offset(min, OFFSET_TO_EXCLUDE_MIN_OR_MAX) : min,
        }
    }

export {
    minAndMaxPropsFromConstraint,
}
