import { SingularValidationResult } from '@musical-patterns/pattern'
import { camelCaseToLowerCase, isUndefined } from '@musical-patterns/utilities'
import { FieldValidityClassName, GetFieldIdParameters, GetFieldLabelParameters } from './types'

const getFieldId: (parameters: GetFieldIdParameters) => string =
    ({ property, fieldIndex }: GetFieldIdParameters): string =>
        isUndefined(fieldIndex) ? property : `${property}-${fieldIndex}`

const getFieldLabel: (parameters: GetFieldLabelParameters) => string =
    ({ fieldIndex, formattedName, property }: GetFieldLabelParameters): string =>
        isUndefined(fieldIndex) ? formattedName || camelCaseToLowerCase(property) : `${fieldIndex}`

const getFieldValidityClassName: (singularValidationResult: SingularValidationResult) => FieldValidityClassName =
    (singularValidationResult: SingularValidationResult): FieldValidityClassName =>
        isUndefined(singularValidationResult) ? FieldValidityClassName.VALID : FieldValidityClassName.INVALID

export {
    getFieldLabel,
    getFieldId,
    getFieldValidityClassName,
}
