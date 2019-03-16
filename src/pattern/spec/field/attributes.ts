import { SingularValidation } from '@musical-patterns/pattern'
import { camelCaseToUpperCase, isUndefined } from '@musical-patterns/utilities'
import { ComputeFieldLabelParameters, FieldParentProps, FieldValidityClassName } from './types'

const computeFieldId: (parameters: FieldParentProps) => string =
    ({ specKey, fieldIndex }: FieldParentProps): string =>
        isUndefined(fieldIndex) ? specKey : `${specKey}-${fieldIndex}`

const computeFieldLabel: (parameters: ComputeFieldLabelParameters) => string =
    ({ fieldIndex, formattedName, specKey }: ComputeFieldLabelParameters): string =>
        isUndefined(fieldIndex) ? formattedName || camelCaseToUpperCase(specKey) : `${fieldIndex}`

const computeFieldValidityClassName: (singularValidation: SingularValidation) => FieldValidityClassName =
    (singularValidation: SingularValidation): FieldValidityClassName =>
        isUndefined(singularValidation) ? FieldValidityClassName.VALID : FieldValidityClassName.INVALID

export {
    computeFieldLabel,
    computeFieldId,
    computeFieldValidityClassName,
}
