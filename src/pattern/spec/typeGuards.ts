import {
    ArrayedDomSpecValue,
    ArrayedSpecValue,
    ArrayedValidation,
    DomSpecValue,
    SingularDomSpecValue,
    SingularSpecValue,
    SingularValidation,
    SpecValue,
    Validation,
} from '@musical-patterns/pattern'
import { isUndefined } from '@musical-patterns/utilities'

const isArrayedSubmittedValue: (submittedValue: SpecValue) => submittedValue is ArrayedSpecValue =
    (submittedValue: SpecValue): submittedValue is ArrayedSpecValue =>
        submittedValue instanceof Array

const isArrayedDisplayedValue: (displayedValue: DomSpecValue) => displayedValue is ArrayedDomSpecValue =
    (displayedValue: DomSpecValue): displayedValue is ArrayedDomSpecValue =>
        displayedValue instanceof Array

const isArrayedValidation: (validation: Validation) => validation is ArrayedValidation =
    (validation: Validation): validation is ArrayedValidation =>
        isUndefined(validation) || validation instanceof Array

const isSingularSubmittedValue: (submittedValue: SpecValue) => submittedValue is SingularSpecValue =
    (submittedValue: SpecValue): submittedValue is SingularSpecValue =>
        !isArrayedSubmittedValue(submittedValue)

const isSingularDisplayedValue: (displayedValue: DomSpecValue) => displayedValue is SingularDomSpecValue =
    (displayedValue: DomSpecValue): displayedValue is SingularDomSpecValue =>
        !isArrayedDisplayedValue(displayedValue)

const isSingularValidation: (validation: Validation) => validation is SingularValidation =
    (validation: Validation): validation is SingularValidation =>
        isUndefined(validation) || !isArrayedValidation(validation)

export {
    isArrayedSubmittedValue,
    isArrayedDisplayedValue,
    isArrayedValidation,
    isSingularDisplayedValue,
    isSingularSubmittedValue,
    isSingularValidation,
}
