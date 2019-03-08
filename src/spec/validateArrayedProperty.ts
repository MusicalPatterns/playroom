import {
    ArrayedDomValue,
    ArrayedValidationResult,
    PropertyAttributes,
    SingularDomValue,
    SingularValidationResult,
    ValidationResult,
} from '@musical-patterns/pattern'
import { isUndefined } from '@musical-patterns/utilities'
import { validateProperty } from './validateProperty'

const validateArrayedProperty:
    (arrayedDisplayedValue: ArrayedDomValue, propertyAttributes: PropertyAttributes) => ValidationResult =
    (arrayedDisplayedValue: ArrayedDomValue, propertyAttributes: PropertyAttributes): ValidationResult => {
        let isValid: boolean = true
        const results: ArrayedValidationResult = arrayedDisplayedValue.map(
            (singularDisplayedValue: SingularDomValue): SingularValidationResult => {
                const singularValidationResult: SingularValidationResult =
                    validateProperty(singularDisplayedValue, propertyAttributes) as SingularValidationResult
                if (!isUndefined(singularValidationResult)) {
                    isValid = false
                }

                return singularValidationResult
            })

        if (isValid) {
            return undefined
        }
        else {
            return results
        }
    }

export {
    validateArrayedProperty,
}
