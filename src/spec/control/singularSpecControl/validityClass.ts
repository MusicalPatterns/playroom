import { SingularValidationResult } from '@musical-patterns/pattern'
import { isUndefined } from '@musical-patterns/utilities'
import { SpecControlStates } from '../../types'

const getValidityClass: (singularValidationResult: SingularValidationResult) => SpecControlStates =
    (singularValidationResult: SingularValidationResult): SpecControlStates =>
        isUndefined(singularValidationResult) ? SpecControlStates.VALID : SpecControlStates.INVALID

export {
    getValidityClass,
}
