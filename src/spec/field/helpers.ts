import { SingularValidationResult } from '@musical-patterns/pattern'
import { camelCaseToLowerCase, isUndefined } from '@musical-patterns/utilities'
import { ComputeFieldLabelParameters, FieldParentProps, FieldValidityClassName } from './types'

const computeFieldId: (parameters: FieldParentProps) => string =
    ({ property, fieldIndex }: FieldParentProps): string =>
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
