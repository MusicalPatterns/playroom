import { SpecPropertyAttributes } from '@musical-patterns/pattern'
import { DomValueOrChecked } from '../../../types'
import { ArrayedPropertyInvalidSpecMessage, InvalidSpecMessage, SingularPropertyInvalidSpecMessage } from '../../types'
import { validateSpecProperty } from './validateSpecProperty'

const validateArrayedSpecProperty:
    (specValueArray: DomValueOrChecked[], propertyAttributes: SpecPropertyAttributes) => InvalidSpecMessage =
    (specValueArray: DomValueOrChecked[], propertyAttributes: SpecPropertyAttributes): InvalidSpecMessage => {
        let valid: boolean = true
        const results: ArrayedPropertyInvalidSpecMessage = specValueArray.map(
            (subValue: DomValueOrChecked): SingularPropertyInvalidSpecMessage => {
                const subResult: SingularPropertyInvalidSpecMessage =
                    validateSpecProperty(subValue, propertyAttributes) as SingularPropertyInvalidSpecMessage
                if (subResult) {
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
