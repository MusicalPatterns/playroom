import { SingularValidationResult } from '@musical-patterns/pattern'
import { camelCaseToLowerCase, isUndefined } from '@musical-patterns/utilities'
import { ComputeFieldIdParameters, ComputeFieldLabelParameters, FieldValidityClassName } from './types'

const computeFieldId: (parameters: ComputeFieldIdParameters) => string =
    ({ property, fieldIndex }: ComputeFieldIdParameters): string =>
        isUndefined(fieldIndex) ? property : `${property}-${fieldIndex}`

const computeFieldLabel: (parameters: ComputeFieldLabelParameters) => string =
    ({ fieldIndex, formattedName, property }: ComputeFieldLabelParameters): string =>
        isUndefined(fieldIndex) ? formattedName || camelCaseToLowerCase(property) : `${fieldIndex}`

const computeFieldValidityClassName: (singularValidationResult: SingularValidationResult) => FieldValidityClassName =
    (singularValidationResult: SingularValidationResult): FieldValidityClassName =>
        isUndefined(singularValidationResult) ? FieldValidityClassName.VALID : FieldValidityClassName.INVALID

export {
    computeFieldLabel,
    computeFieldId,
    computeFieldValidityClassName,
}
