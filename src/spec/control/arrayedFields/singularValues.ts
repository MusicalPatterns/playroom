import {
    ArrayedValidationResult,
    ArrayedValue,
    SingularValidationResult,
    SingularValue,
} from '@musical-patterns/pattern'
import { apply, indexOfLastElement, isUndefined, Ordinal } from '@musical-patterns/utilities'

const computeSingularSubmittedValue:
    (arrayedSubmittedValue: ArrayedValue, index: Ordinal) => SingularValue =
    (arrayedSubmittedValue: ArrayedValue, index: Ordinal): SingularValue => {
        if (index > indexOfLastElement(arrayedSubmittedValue)) {
            return undefined
        }

        return apply.Ordinal(arrayedSubmittedValue, index)
    }

const computeSingularValidationResult:
    (arrayedValidationResult: ArrayedValidationResult, index: Ordinal) => SingularValidationResult =
    (arrayedValidationResult: ArrayedValidationResult, index: Ordinal): SingularValidationResult => {
        if (isUndefined(arrayedValidationResult) || index > indexOfLastElement(arrayedValidationResult)) {
            return undefined
        }

        return apply.Ordinal(arrayedValidationResult, index)
    }

export {
    computeSingularSubmittedValue,
    computeSingularValidationResult,
}
