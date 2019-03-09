import { SingularValidationResult } from '@musical-patterns/pattern'
import { isUndefined } from '@musical-patterns/utilities'
import { FieldValidity } from '../../types'

const getFieldValidityClassName: (singularValidationResult: SingularValidationResult) => FieldValidity =
    (singularValidationResult: SingularValidationResult): FieldValidity =>
        isUndefined(singularValidationResult) ? FieldValidity.VALID : FieldValidity.INVALID

export {
    getFieldValidityClassName,
}
