import {
    ArrayedDomValue,
    ArrayedValidationResult,
    PropertyAttributes,
    SingularDomValue,
    SingularValidationResult,
    ValidationResult,
} from '@musical-patterns/pattern'
import { isUndefined } from '@musical-patterns/utilities'
import { isSingularValidationResult } from '../typeGuards'
import { validateProperty } from './validateProperty'

const validateArrayedProperty:
    (arrayedDisplayedValue: ArrayedDomValue, propertyAttributes: PropertyAttributes) => ValidationResult =
    (arrayedDisplayedValue: ArrayedDomValue, propertyAttributes: PropertyAttributes): ValidationResult => {
        let isValid: boolean = true
        const results: ArrayedValidationResult = arrayedDisplayedValue.map(
            (singularDisplayedValue: SingularDomValue): SingularValidationResult => {
                const validationResult: ValidationResult = validateProperty(singularDisplayedValue, propertyAttributes)
                if (!isSingularValidationResult(validationResult)) {
                    throw new Error('validation result for singular value was not singular')
                }
                if (!isUndefined(validationResult)) {
                    isValid = false
                }

                return validationResult
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
