import { SingularValidation } from '@musical-patterns/pattern'
import { camelCaseToUpperCase, isUndefined, Maybe, Ordinal } from '@musical-patterns/utilities'
import { ComputeFieldLabelParameters, FieldParentProps, FieldValidityClassName } from './types'

const computeFieldId: (parameters: { fieldIndex?: Ordinal, specKey: string }) => string =
    ({ specKey, fieldIndex }: FieldParentProps): string =>
        isUndefined(fieldIndex) ? specKey : `${specKey}-${fieldIndex}`

const computeFieldLabel: (parameters: {
    fieldIndex?: Ordinal,
    formattedName: Maybe<string>,
    specKey: string,
}) => string =
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
