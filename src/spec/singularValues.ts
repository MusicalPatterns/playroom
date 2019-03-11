import {
    ArrayedDomValue,
    ArrayedValidationResult,
    ArrayedValue,
    DomValue,
    SingularDomValue,
    SingularValidationResult,
    SingularValue,
    ValidationResult,
    Value,
} from '@musical-patterns/pattern'
import { apply, indexOfLastElement, isUndefined, Ordinal } from '@musical-patterns/utilities'
import {
    isArrayedDisplayedValue,
    isArrayedSubmittedValue,
    isArrayedValidationResult,
    isSingularDisplayedValue,
    isSingularSubmittedValue,
    isSingularValidationResult,
} from './typeGuards'
import {
    ComputeSingularDisplayedValueParameters,
    ComputeSingularSubmittedValueParameters,
    ComputeSingularValidationResultParameters,
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
    (arrayedDisplayedValue: ArrayedDomValue, fieldIndex: Ordinal) => SingularDomValue =
    (arrayedDisplayedValue: ArrayedDomValue, fieldIndex: Ordinal): SingularDomValue => {
        if (fieldIndex > indexOfLastElement(arrayedDisplayedValue)) {
            return undefined
        }

        return apply.Ordinal(arrayedDisplayedValue, fieldIndex)
    }

const computeSingularValidationResultFromArrayedValidationResult:
    (arrayedValidationResult: ArrayedValidationResult, fieldIndex: Ordinal) => SingularValidationResult =
    (arrayedValidationResult: ArrayedValidationResult, fieldIndex: Ordinal): SingularValidationResult => {
        if (isUndefined(arrayedValidationResult) || fieldIndex > indexOfLastElement(arrayedValidationResult)) {
            return undefined
        }

        return apply.Ordinal(arrayedValidationResult, fieldIndex)
    }

const computeSingularSubmittedValue:
    (computeSingularSubmittedValueParameters: ComputeSingularSubmittedValueParameters) => SingularValue =
    ({ submittedSpec, property, fieldIndex }: ComputeSingularSubmittedValueParameters): SingularValue => {
        const submittedValue: Value = submittedSpec && submittedSpec[ property ]

        return !isUndefined(fieldIndex) && isArrayedSubmittedValue(submittedValue) ?
            computeSingularSubmittedValueFromArrayedSubmittedValue(submittedValue, fieldIndex) :
            isSingularSubmittedValue(submittedValue) ? submittedValue : undefined
    }

const computeSingularDisplayedValue:
    (computeSingularDisplayedValueParameters: ComputeSingularDisplayedValueParameters) => SingularDomValue =
    ({ displayedSpec, property, fieldIndex }: ComputeSingularDisplayedValueParameters): SingularDomValue => {
        const displayedValue: DomValue = displayedSpec && displayedSpec[ property ]

        return !isUndefined(fieldIndex) && isArrayedDisplayedValue(displayedValue) ?
            computeSingularDisplayedValueFromArrayedDisplayedValue(displayedValue, fieldIndex) :
            isSingularDisplayedValue(displayedValue) ? displayedValue : undefined
    }

const computeSingularValidationResult:
    (computeSingularValidationResultParameters: ComputeSingularValidationResultParameters) => SingularValidationResult =
    (
        { validationResults, property, fieldIndex }: ComputeSingularValidationResultParameters,
    ): SingularValidationResult => {
        const validationResult: ValidationResult = validationResults && validationResults[ property ]

        return !isUndefined(fieldIndex) && isArrayedValidationResult(validationResult) ?
            computeSingularValidationResultFromArrayedValidationResult(validationResult, fieldIndex) :
            isSingularValidationResult(validationResult) ? validationResult : undefined
    }

export {
    computeSingularValidationResult,
    computeSingularDisplayedValue,
    computeSingularSubmittedValue,
}
