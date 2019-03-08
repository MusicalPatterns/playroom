import {
    ArrayedDomSpecValue,
    ArrayedPropertyInvalidSpecMessage,
    InvalidSpecMessage,
    SingularDomSpecValue,
    SingularPropertyInvalidSpecMessage,
    SpecPropertyAttributes,
} from '@musical-patterns/pattern'
import { isUndefined } from '@musical-patterns/utilities'
import { validateSpecProperty } from './validateSpecProperty'

const validateArrayedSpecProperty:
    (arrayedDomSpecValue: ArrayedDomSpecValue, propertyAttributes: SpecPropertyAttributes) => InvalidSpecMessage =
    (arrayedDomSpecValue: ArrayedDomSpecValue, propertyAttributes: SpecPropertyAttributes): InvalidSpecMessage => {
        let valid: boolean = true
        const results: ArrayedPropertyInvalidSpecMessage = arrayedDomSpecValue.map(
            (singularDomSpecValue: SingularDomSpecValue): SingularPropertyInvalidSpecMessage => {
                const subResult: SingularPropertyInvalidSpecMessage =
                    validateSpecProperty(singularDomSpecValue, propertyAttributes) as SingularPropertyInvalidSpecMessage
                if (!isUndefined(subResult)) {
                    valid = false
                }

                return subResult
            })

        if (valid) {
            return undefined
        }
        else {
            return results
        }
    }

export {
    validateArrayedSpecProperty,
}
