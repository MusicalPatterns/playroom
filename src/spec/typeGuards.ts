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

const isArrayedSubmittedValue: (submittedValue: Value) => submittedValue is ArrayedValue =
    (submittedValue: Value): submittedValue is ArrayedValue =>
        submittedValue instanceof Array

const isArrayedDisplayedValue: (displayedValue: DomValue) => displayedValue is ArrayedDomValue =
    (displayedValue: DomValue): displayedValue is ArrayedDomValue =>
        displayedValue instanceof Array

const isArrayedValidationResult: (validationResult: ValidationResult) => validationResult is ArrayedValidationResult =
    (validationResult: ValidationResult): validationResult is ArrayedValidationResult =>
        validationResult instanceof Array

const isSingularSubmittedValue: (submittedValue: Value) => submittedValue is SingularValue =
    (submittedValue: Value): submittedValue is SingularValue =>
        !isArrayedSubmittedValue(submittedValue)

const isSingularDisplayedValue: (displayedValue: DomValue) => displayedValue is SingularDomValue =
    (displayedValue: DomValue): displayedValue is SingularDomValue =>
        !isArrayedDisplayedValue(displayedValue)

const isSingularValidationResult: (validationResult: ValidationResult) => validationResult is SingularValidationResult =
    (validationResult: ValidationResult): validationResult is SingularValidationResult =>
        !isArrayedValidationResult(validationResult)

export {
    isArrayedSubmittedValue,
    isArrayedDisplayedValue,
    isArrayedValidationResult,
    isSingularDisplayedValue,
    isSingularSubmittedValue,
    isSingularValidationResult,
}
