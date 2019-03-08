import { ArrayedValidationResult, ValidationResult } from '@musical-patterns/pattern'

const isArrayedValidationResult:
    (validationResult: ValidationResult) => validationResult is ArrayedValidationResult =
    (validationResult: ValidationResult): validationResult is ArrayedValidationResult =>
        validationResult instanceof Array

export {
    isArrayedValidationResult,
}
