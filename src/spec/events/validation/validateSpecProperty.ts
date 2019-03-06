import {
    ArrayedDomSpecValue,
    DomSpecValue,
    InvalidSpecMessage,
    RangedConstraint,
    SpecPropertyAttributes,
    SpecPropertyType,
    StringedConstraint,
} from '@musical-patterns/pattern'
import { Maybe } from '@musical-patterns/utilities'
import { validateArrayedSpecProperty } from './validateArrayedSpecProperty'
import { validByRangedConstraint } from './validByRangedConstraint'
import { validByStringedConstraint } from './validByStringedConstraint'

const validationRequired: (propertyAttributes: Maybe<SpecPropertyAttributes>) => boolean =
    (propertyAttributes: Maybe<SpecPropertyAttributes>): boolean => {
        if (!propertyAttributes) {
            return false
        }

        return !(propertyAttributes.specPropertyType === SpecPropertyType.OPTIONED ||
            propertyAttributes.specPropertyType === SpecPropertyType.TOGGLED)
    }

const validateSpecProperty:
    (domSpecValue: DomSpecValue, propertyAttributes: Maybe<SpecPropertyAttributes>) => InvalidSpecMessage =
    (domSpecValue: DomSpecValue, propertyAttributes: Maybe<SpecPropertyAttributes>): InvalidSpecMessage => {
        if (!validationRequired(propertyAttributes)) {
            return undefined
        }
        const { constraint, specPropertyType } = propertyAttributes as SpecPropertyAttributes

        if (domSpecValue instanceof Array) {
            return validateArrayedSpecProperty(
                domSpecValue as ArrayedDomSpecValue,
                propertyAttributes as SpecPropertyAttributes,
            )
        }

        if (specPropertyType === SpecPropertyType.STRINGED) {
            return validByStringedConstraint(domSpecValue as string, constraint as Maybe<StringedConstraint>)
        }

        let numericValue: number
        try {
            numericValue = JSON.parse(domSpecValue as string)
        }
        catch (e) {
            return 'this property is formatted in a way which cannot be parsed'
        }

        return validByRangedConstraint(numericValue, constraint as Maybe<RangedConstraint>)
    }

export {
    validateSpecProperty,
}
