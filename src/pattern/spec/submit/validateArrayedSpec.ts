import {
    ArrayedDomSpecValue,
    ArrayedValidation,
    Configuration,
    SingularDomSpecValue,
    SingularValidation,
    Validation,
} from '@musical-patterns/pattern'
import { isUndefined } from '@musical-patterns/utilities'
import { isSingularValidation } from '../typeGuards'
import { validateSpec } from './validateSpec'

const validateArrayedSpec: (arrayedDisplayedValue: ArrayedDomSpecValue, configuration: Configuration) => Validation =
    (arrayedDisplayedValue: ArrayedDomSpecValue, configuration: Configuration): Validation => {
        let isValid: boolean = true
        const results: ArrayedValidation = arrayedDisplayedValue.map(
            (singularDisplayedValue: SingularDomSpecValue): SingularValidation => {
                const validation: Validation = validateSpec(singularDisplayedValue, configuration)
                if (!isSingularValidation(validation)) {
                    throw new Error('validation for singular value was not singular')
                }
                if (!isUndefined(validation)) {
                    isValid = false
                }

                return validation
            })

        if (isValid) {
            return undefined
        }
        else {
            return results
        }
    }

export {
    validateArrayedSpec,
}
