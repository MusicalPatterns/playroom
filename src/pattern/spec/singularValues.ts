import {
    ArrayedDomSpecValue,
    ArrayedValidation,
    ArrayedValue,
    DomSpecValue,
    SingularDomSpecValue,
    SingularValidation,
    SingularValue,
    SpecValue,
    Validation,
} from '@musical-patterns/pattern'
import { apply, indexOfLastElement, isUndefined, Ordinal } from '@musical-patterns/utilities'
import {
    isArrayedDisplayedValue,
    isArrayedSubmittedValue,
    isArrayedValidation,
    isSingularDisplayedValue,
    isSingularSubmittedValue,
    isSingularValidation,
} from './typeGuards'
import {
    ComputeSingularDisplayedValueParameters,
    ComputeSingularSubmittedValueParameters,
    ComputeSingularValidationParameters,
} from './types'

const computeSingularSubmittedValueFromArrayedSubmittedValue:
    (arrayedSubmittedValue: ArrayedValue, fieldIndex: Ordinal) => SingularValue =
    (arrayedSubmittedValue: ArrayedValue, fieldIndex: Ordinal): SingularValue => {
        if (fieldIndex > indexOfLastElement(arrayedSubmittedValue)) {
            return undefined
        }

        return apply.Ordinal(arrayedSubmittedValue, fieldIndex)
    }

const computeSingularDisplayedValueFromArrayedDisplayedValue:
    (arrayedDisplayedValue: ArrayedDomSpecValue, fieldIndex: Ordinal) => SingularDomSpecValue =
    (arrayedDisplayedValue: ArrayedDomSpecValue, fieldIndex: Ordinal): SingularDomSpecValue => {
        if (fieldIndex > indexOfLastElement(arrayedDisplayedValue)) {
            return undefined
        }

        return apply.Ordinal(arrayedDisplayedValue, fieldIndex)
    }

const computeSingularValidationFromArrayedValidation:
    (arrayedValidation: ArrayedValidation, fieldIndex: Ordinal) => SingularValidation =
    (arrayedValidation: ArrayedValidation, fieldIndex: Ordinal): SingularValidation => {
        if (isUndefined(arrayedValidation) || fieldIndex > indexOfLastElement(arrayedValidation)) {
            return undefined
        }

        return apply.Ordinal(arrayedValidation, fieldIndex)
    }

const computeSingularSubmittedValue:
    (computeSingularSubmittedValueParameters: ComputeSingularSubmittedValueParameters) => SingularValue =
    ({ submittedSpecs, specKey, fieldIndex }: ComputeSingularSubmittedValueParameters): SingularValue => {
        const submittedValue: SpecValue = submittedSpecs && submittedSpecs[ specKey ]

        return !isUndefined(fieldIndex) && isArrayedSubmittedValue(submittedValue) ?
            computeSingularSubmittedValueFromArrayedSubmittedValue(submittedValue, fieldIndex) :
            isSingularSubmittedValue(submittedValue) ? submittedValue : undefined
    }

const computeSingularDisplayedValue:
    (computeSingularDisplayedValueParameters: ComputeSingularDisplayedValueParameters) => SingularDomSpecValue =
    ({ displayedSpecs, specKey, fieldIndex }: ComputeSingularDisplayedValueParameters): SingularDomSpecValue => {
        const displayedValue: DomSpecValue = displayedSpecs && displayedSpecs[ specKey ]

        return !isUndefined(fieldIndex) && isArrayedDisplayedValue(displayedValue) ?
            computeSingularDisplayedValueFromArrayedDisplayedValue(displayedValue, fieldIndex) :
            isSingularDisplayedValue(displayedValue) ? displayedValue : undefined
    }

const computeSingularValidation:
    (computeSingularValidationParameters: ComputeSingularValidationParameters) => SingularValidation =
    ({ validations, specKey, fieldIndex }: ComputeSingularValidationParameters): SingularValidation => {
        const validation: Validation = validations && validations[ specKey ]

        return !isUndefined(fieldIndex) && isArrayedValidation(validation) ?
            computeSingularValidationFromArrayedValidation(validation, fieldIndex) :
            isSingularValidation(validation) ? validation : undefined
    }

export {
    computeSingularValidation,
    computeSingularDisplayedValue,
    computeSingularSubmittedValue,
}
