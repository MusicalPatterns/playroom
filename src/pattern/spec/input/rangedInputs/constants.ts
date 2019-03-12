// tslint:disable no-magic-numbers

import { apply, NEGATIVE, to, Translation } from '@musical-patterns/utilities'

const NON_INTEGER_STEP: number = 0.1

const DEFAULT_BOUND: number = 10000
const ABSOLUTE_TRANSLATION_TO_EXCLUDE_MIN_OR_MAX: Translation = to.Translation(0.001)
const TRANSLATION_TO_EXCLUDE_MIN: Translation = ABSOLUTE_TRANSLATION_TO_EXCLUDE_MIN_OR_MAX
const TRANSLATION_TO_EXCLUDE_MAX: Translation = apply.Scalar(ABSOLUTE_TRANSLATION_TO_EXCLUDE_MIN_OR_MAX, NEGATIVE)

export {
    DEFAULT_BOUND,
    TRANSLATION_TO_EXCLUDE_MIN,
    TRANSLATION_TO_EXCLUDE_MAX,
    NON_INTEGER_STEP,
}
