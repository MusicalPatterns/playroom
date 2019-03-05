import {
    InvalidSpecMessage,
    RangedConstraint, RangedSpecPropertyAttributes,
    SpecPropertyAttributes,
    SpecPropertyType, StringedConstraint,
} from '@musical-patterns/pattern'
import { Maybe } from '@musical-patterns/utilities'
import { SpecValue } from '../../../types'
import { validateArrayedSpecProperty } from './validateArrayedSpecProperty'
import { validByRangedConstraint } from './validByRangedConstraint'
import { validByStringedConstraint } from './validByStringedConstraint'

const validationRequired: (propertyAttributes: Maybe<SpecPropertyAttributes>) => boolean =
    (propertyAttributes: Maybe<SpecPropertyAttributes>): boolean => {
        if (!propertyAttributes) {
            return false
        }

        return !(propertyAttributes.specPropertyType === SpecPropertyType.OPTIONED ||
            propertyAttributes.specPropertyType === SpecPropertyType.TOGGLED);
    }

const validateSpecProperty:
    (specValue: SpecValue, propertyAttributes: Maybe<SpecPropertyAttributes>) => InvalidSpecMessage =
    (specValue: SpecValue, propertyAttributes: Maybe<SpecPropertyAttributes>): InvalidSpecMessage => {
        if (!validationRequired(propertyAttributes)) {
            return undefined
        }
        const { constraint, specPropertyType } = propertyAttributes as SpecPropertyAttributes

        if (specValue instanceof Array) {
            return validateArrayedSpecProperty(specValue, propertyAttributes as SpecPropertyAttributes)
        }

        if (specPropertyType === SpecPropertyType.STRINGED) {
            return validByStringedConstraint(specValue as string, constraint as Maybe<StringedConstraint>)
        }

        let numericValue: number
        try {
            // @ts-ignore
            numericValue = JSON.parse(specValue)
        }
        catch (e) {
            return 'this property is formatted in a way which cannot be parsed'
        }

        return validByRangedConstraint(numericValue, constraint as Maybe<RangedConstraint>)
    }

export {
    validateSpecProperty,
}
