// tslint:disable:no-magic-numbers

import { apply, NEGATIVE, Offset, to } from '@musical-patterns/utilities'

const DEFAULT_SPEC_BOUND: number = 10000
const ABSOLUTE_OFFSET_TO_EXCLUDE_MIN_OR_MAX: Offset = to.Offset(0.001)
const OFFSET_TO_EXCLUDE_MIN: Offset = ABSOLUTE_OFFSET_TO_EXCLUDE_MIN_OR_MAX
const OFFSET_TO_EXCLUDE_MAX: Offset = apply.Scalar(ABSOLUTE_OFFSET_TO_EXCLUDE_MIN_OR_MAX, NEGATIVE)

export {
    DEFAULT_SPEC_BOUND,
    OFFSET_TO_EXCLUDE_MIN,
    OFFSET_TO_EXCLUDE_MAX,
}
