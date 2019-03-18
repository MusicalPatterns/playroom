import {
    ArrayedDomSpecValue,
    ArrayedSpecValue,
    ArrayedValidation,
    DomSpecValue,
    isArrayedDomSpecValue,
    isArrayedSpecValue,
    isArrayedValidation,
    isSingularDomSpecValue,
    isSingularSpecValue,
    isSingularValidation,
    SingularDomSpecValue,
    SingularSpecValue,
    SingularValidation,
    SpecValue,
    Validation,
} from '@musical-patterns/pattern'
import { apply, indexOfFinalElement, isUndefined, Ordinal } from '@musical-patterns/utilities'
import {
    ComputeSingularDisplayedValueParameters,
    ComputeSingularSubmittedValueParameters,
    ComputeSingularValidationParameters,
} from './types'

const computeSingularSubmittedValueFromArrayedSubmittedValue:
    (arrayedSubmittedValue: ArrayedSpecValue, fieldIndex: Ordinal) => SingularSpecValue =
    (arrayedSubmittedValue: ArrayedSpecValue, fieldIndex: Ordinal): SingularSpecValue => {
        if (fieldIndex > indexOfFinalElement(arrayedSubmittedValue)) {
            return undefined
        }

        return apply.Ordinal(arrayedSubmittedValue, fieldIndex)
    }

const computeSingularDisplayedValueFromArrayedDisplayedValue:
    (arrayedDisplayedValue: ArrayedDomSpecValue, fieldIndex: Ordinal) => SingularDomSpecValue =
    (arrayedDisplayedValue: ArrayedDomSpecValue, fieldIndex: Ordinal): SingularDomSpecValue => {
        if (fieldIndex > indexOfFinalElement(arrayedDisplayedValue)) {
            return undefined
        }

        return apply.Ordinal(arrayedDisplayedValue, fieldIndex)
    }

const computeSingularValidationFromArrayedValidation:
    (arrayedValidation: ArrayedValidation, fieldIndex: Ordinal) => SingularValidation =
    (arrayedValidation: ArrayedValidation, fieldIndex: Ordinal): SingularValidation => {
        if (isUndefined(arrayedValidation) || fieldIndex > indexOfFinalElement(arrayedValidation)) {
            return undefined
        }

        return apply.Ordinal(arrayedValidation, fieldIndex)
    }

const computeSingularSubmittedValue:
    (computeSingularSubmittedValueParameters: ComputeSingularSubmittedValueParameters) => SingularSpecValue =
    ({ submittedSpecs, specKey, fieldIndex }: ComputeSingularSubmittedValueParameters): SingularSpecValue => {
        const submittedValue: SpecValue = submittedSpecs && submittedSpecs[ specKey ]

        return !isUndefined(fieldIndex) && isArrayedSpecValue(submittedValue) ?
            computeSingularSubmittedValueFromArrayedSubmittedValue(submittedValue, fieldIndex) :
            isSingularSpecValue(submittedValue) ? submittedValue : undefined
    }

const computeSingularDisplayedValue:
    (computeSingularDisplayedValueParameters: ComputeSingularDisplayedValueParameters) => SingularDomSpecValue =
    ({ displayedSpecs, specKey, fieldIndex }: ComputeSingularDisplayedValueParameters): SingularDomSpecValue => {
        const displayedValue: DomSpecValue = displayedSpecs && displayedSpecs[ specKey ]

        return !isUndefined(fieldIndex) && isArrayedDomSpecValue(displayedValue) ?
            computeSingularDisplayedValueFromArrayedDisplayedValue(displayedValue, fieldIndex) :
            isSingularDomSpecValue(displayedValue) ? displayedValue : undefined
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
